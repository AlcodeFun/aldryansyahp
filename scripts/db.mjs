// =============================================================================
// db.mjs - schema migration + content seeder.
//
//   node scripts/db.mjs migrate   apply db/migrations/*.sql in order
//   node scripts/db.mjs seed      upsert db/seed/seed-data.mjs into the tables
//   node scripts/db.mjs reset     truncate every content table, then seed
//   node scripts/db.mjs status    one-row counts per table
//
// Reads DATABASE_URL from the environment or from .env.local / .env in the
// project root. Bracket access (`process.env["X"]`) on purpose: Next.js only
// inlines statically-analysable `process.env.X` reads, and keeping the pattern
// uniform here avoids surprises if this file is ever imported from the app.
// =============================================================================

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";
import * as seedData from "../db/seed/seed-data.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile() {
  for (const name of [".env.local", ".env"]) {
    const path = join(root, name);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}

loadEnvFile();

const connectionString = process.env["DATABASE_URL"];
if (!connectionString) {
  console.error(
    "DATABASE_URL is not set.\n" +
      "Add it to .env.local in the project root, e.g.\n" +
      "  DATABASE_URL=postgresql://postgres.<ref>:<password>@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres\n" +
      "Percent-encode any special characters in the password.",
  );
  process.exit(1);
}

const sql = postgres(connectionString, { max: 1, prepare: false });

const command = process.argv[2] ?? "migrate";

const TABLES = [
  "site_settings",
  "nav_items",
  "home_hero",
  "home_sections",
  "education",
  "tech_items",
  "journey_entries",
  "projects",
  "random_notes",
  "page_settings",
  "ui_strings",
];

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

/**
 * Map seed-file camelCase objects to column-ordered rows, stamping `position`
 * from array order so the seed file's order is authoritative.
 */
function toRows(rows, toColumn) {
  return rows.map((row, i) => ({ ...toColumn(row), position: i }));
}

/**
 * Columns holding jsonb. Their value must go through `sql.json` so postgres.js
 * emits a JSON document. Pre-stringifying does NOT work: postgres.js re-encodes
 * a string parameter, which lands a JSON *string* in the jsonb column instead
 * of a JSON array.
 *
 * Arrays that are not listed here (e.g. `projects.tags`, a real text[]) are
 * passed through untouched so postgres.js builds a proper `{a,b}` literal.
 */
const JSON_COLUMNS = {
  journey_entries: ["content"],
  projects: ["content", "gallery"],
  random_notes: ["content"],
};

function encode(table, column, value) {
  if ((JSON_COLUMNS[table] ?? []).includes(column)) {
    return sql.json(value ?? []);
  }
  if (value === undefined) return null;
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return sql.json(value);
  }
  return value;
}

/** `insert into t (cols) values ($1, ... $n)` — the values clause is mandatory. */
function insertPrefix(table, columns) {
  const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");
  return `insert into ${table} (${columns.join(", ")}) values (${placeholders})`;
}

/** One [query, params] pair per row, values encoded per column type. */
function insertAll(table, columns, rows) {
  const insert = insertPrefix(table, columns);
  return rows.map((row) => [
    insert,
    columns.map((c) => encode(table, c, row[c])),
  ]);
}

/**
 * Ordered authoring lists (nav, sections, education, tech pills). These have
 * no stable identity - position *is* the identity - so seeding replaces them
 * wholesale to keep the file's order authoritative.
 */
async function replaceAll(table, columns, rows) {
  await sql.unsafe(`delete from ${table}`);
  if (rows.length === 0) return { count: 0 };
  for (const [text, params] of insertAll(table, columns, rows)) {
    await sql.unsafe(text, params);
  }
  return { count: rows.length };
}

/**
 * Document collections (journey, projects, notes, page copy, strings). These
  * keep a natural unique key, so rows are upserted and orphans pruned - an
 * entry edited in the admin is not clobbered by re-running the seeder unless
 * the seed file still carries a same-keyed row.
 */
async function upsertAll(table, keyColumn, columns, rows) {
  // Prune orphans in JS rather than with `<> all($array)`. The array-literal
  // form needs parameter interpolation inside sql.unsafe, which does not
  // survive it cleanly; a seeded table is small, so explicit deletes are fine.
  const wanted = new Set(rows.map((r) => String(r[keyColumn])));
  const existing = await sql.unsafe(
    `select ${keyColumn} as k from ${table}`,
  );
  let removed = 0;
  for (const row of existing) {
    if (wanted.has(String(row.k))) continue;
    await sql.unsafe(`delete from ${table} where ${keyColumn} = $1`, [row.k]);
    removed += 1;
  }

  if (rows.length === 0) {
    await sql.unsafe(`delete from ${table}`);
    return { count: 0, removed: 0 };
  }

  const assignments = columns
    .filter((c) => c !== keyColumn)
    .map((c) => `${c} = excluded.${c}`)
    .join(", ");
  const statement =
    `${insertPrefix(table, columns)} ` +
    `on conflict (${keyColumn}) do update set ${assignments}`;

  for (const [, params] of insertAll(table, columns, rows)) {
    await sql.unsafe(statement, params);
  }
  return { count: rows.length, removed };
}

// ---------------------------------------------------------------------------
// commands
// ---------------------------------------------------------------------------

async function migrate() {
  const dir = join(root, "db", "migrations");
  const files = readdirSync(dir)
    .filter((f) => f.endsWith(".sql"))
    .sort();
  if (files.length === 0) {
    console.log("  (no .sql files in db/migrations)");
    return;
  }
  for (const file of files) {
    process.stdout.write(`  ${file} ... `);
    await sql.unsafe(readFileSync(join(dir, file), "utf8"));
    console.log("ok");
  }
}

async function seed() {
  // Streamed as it happens: if a step throws, the last line printed is the
  // step that failed, which beats a summary that only appears on success.
  const record = (label, result) => {
    console.log(
      `  ${label.padEnd(16)} ${String(result.count).padStart(3)} rows` +
        (result.removed ? `  (-${result.removed} removed)` : ""),
    );
  };

  // Singletons pinned to id = 1.
  await sql.unsafe(
    `insert into site_settings (id, name, username, nickname, role, tagline, location, email, github, twitter, linkedin)
     values (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     on conflict (id) do update set
       name = excluded.name, username = excluded.username, nickname = excluded.nickname,
       role = excluded.role, tagline = excluded.tagline, location = excluded.location,
       email = excluded.email, github = excluded.github, twitter = excluded.twitter,
       linkedin = excluded.linkedin`,
    [
      seedData.siteSettings.name,
      seedData.siteSettings.username,
      seedData.siteSettings.nickname,
      seedData.siteSettings.role,
      seedData.siteSettings.tagline,
      seedData.siteSettings.location,
      seedData.siteSettings.email,
      seedData.siteSettings.github,
      seedData.siteSettings.twitter,
      seedData.siteSettings.linkedin,
    ],
  );
  record("site_settings", { count: 1 });

  await sql.unsafe(
    `insert into home_hero (id, updated_label, line_one, greeting, experience_prefix)
     values (1, $1, $2, $3, $4)
     on conflict (id) do update set
       updated_label = excluded.updated_label, line_one = excluded.line_one,
       greeting = excluded.greeting, experience_prefix = excluded.experience_prefix`,
    [
      seedData.homeHero.updatedLabel,
      seedData.homeHero.lineOne,
      seedData.homeHero.greeting,
      seedData.homeHero.experiencePrefix,
    ],
  );
  record("home_hero", { count: 1 });

  record(
    "nav_items",
    await replaceAll(
      "nav_items",
      ["href", "label", "position"],
      toRows(seedData.navItems, (r) => ({ href: r.href, label: r.label })),
    ),
  );

  record(
    "home_sections",
    await replaceAll(
      "home_sections",
      ["key", "kind", "title", "body", "position"],
      toRows(seedData.homeSections, (r) => ({
        key: r.key,
        kind: r.kind,
        title: r.title,
        body: r.body,
      })),
    ),
  );

  record(
    "education",
    await replaceAll(
      "education",
      ["period", "degree", "school", "gpa", "predicate", "position"],
      toRows(seedData.education, (r) => ({
        period: r.period,
        degree: r.degree,
        school: r.school,
        gpa: r.gpa,
        predicate: r.predicate,
      })),
    ),
  );

  record(
    "tech_items",
    await replaceAll(
      "tech_items",
      ["group_name", "label", "position"],
      toRows(seedData.techItems, (r) => ({
        group_name: r.groupName,
        label: r.label,
      })),
    ),
  );

  record(
    "journey_entries",
    await upsertAll(
      "journey_entries",
      "slug",
      ["slug", "title", "date", "excerpt", "read_minutes", "content", "published", "position"],
      toRows(seedData.journeyEntries, (r) => ({
        slug: r.slug,
        title: r.title,
        date: r.date,
        excerpt: r.excerpt,
        read_minutes: r.readMinutes,
        content: r.content,
        published: true,
      })),
    ),
  );

  record(
    "projects",
    await upsertAll(
      "projects",
      "slug",
      [
        "slug",
        "index_label",
        "title",
        "year",
        "role",
        "tags",
        "hook",
        "content",
        "repo_url",
        "gallery",
        "published",
        "position",
      ],
      toRows(seedData.projects, (r) => ({
        slug: r.slug,
        index_label: r.indexLabel,
        title: r.title,
        year: r.year,
        role: r.role,
        tags: r.tags,
        hook: r.hook,
        content: r.content,
        repo_url: r.repoUrl ?? "",
        gallery: r.gallery ?? [],
        published: true,
      })),
    ),
  );

  record(
    "random_notes",
    await upsertAll(
      "random_notes",
      "slug",
      ["slug", "title", "date", "text", "content", "published", "position"],
      toRows(seedData.randomNotes, (r) => ({
        slug: r.slug,
        title: r.title,
        date: r.date,
        text: r.text,
        content: r.content,
        published: true,
      })),
    ),
  );

  record(
    "page_settings",
    await upsertAll(
      "page_settings",
      "page_key",
      [
        "page_key",
        "seo_title",
        "seo_description",
        "heading",
        "intro",
        "back_label",
        "back_href",
        "all_label",
        "list_meta_format",
        "detail_meta_format",
        "empty_message",
      ],
      seedData.pageSettings.map((r) => ({
        page_key: r.pageKey,
        seo_title: r.seoTitle,
        seo_description: r.seoDescription,
        heading: r.heading,
        intro: r.intro,
        back_label: r.backLabel,
        back_href: r.backHref,
        all_label: r.allLabel,
        list_meta_format: r.listMetaFormat,
        detail_meta_format: r.detailMetaFormat,
        empty_message: r.emptyMessage,
      })),
    ),
  );

  record(
    "ui_strings",
    await upsertAll(
      "ui_strings",
      "key",
      ["key", "value", "group_name"],
      seedData.uiStrings.map((r) => ({
        key: r.key,
        value: r.value,
        group_name: r.groupName,
      })),
    ),
  );
}

async function reset() {
  await sql.unsafe(`truncate ${TABLES.join(", ")} restart identity cascade`);
  await sql.unsafe(`insert into site_settings (id, name, username) values (1, '', '')`);
  await sql.unsafe(`insert into home_hero (id) values (1)`);
  await seed();
}

async function status() {
  for (const t of TABLES) {
    const [{ n }] = await sql.unsafe(`select count(*)::int as n from ${t}`);
    console.log(`  ${t.padEnd(18)} ${String(n).padStart(4)} rows`);
  }
}

try {
  if (command === "migrate") {
    console.log("applying migrations:");
    await migrate();
  } else if (command === "seed") {
    console.log("seeding content:");
    await seed();
  } else if (command === "reset") {
    console.log("resetting content:");
    await reset();
  } else if (command === "status") {
    console.log("row counts:");
    await status();
  } else {
    console.error(`unknown command "${command}" (use migrate | seed | reset | status)`);
    process.exitCode = 1;
  }
  await sql.end();
} catch (error) {
  console.error("\n" + (error instanceof Error ? error.message : String(error)));
  await sql.end();
  process.exit(1);
}
