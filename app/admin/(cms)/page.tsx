import Link from "next/link";
import sql from "@/lib/db";
import { Card } from "@/components/admin/ui";

const COUNTS = [
  { table: "journey_entries", label: "Journey entries", href: "/admin/journey" },
  { table: "projects", label: "Projects", href: "/admin/projects" },
  { table: "random_notes", label: "Random notes", href: "/admin/notes" },
  { table: "education", label: "Education rows", href: "/admin/home" },
  { table: "tech_items", label: "Tech pills", href: "/admin/home" },
  { table: "nav_items", label: "Nav links", href: "/admin/site" },
  { table: "page_settings", label: "Page copy rows", href: "/admin/pages" },
  { table: "ui_strings", label: "UI strings", href: "/admin/site" },
] as const;

export default async function AdminDashboard() {
  const counts = await Promise.all(
    COUNTS.map(async ({ table }) => {
      const [row] = await sql.unsafe<{ n: number }[]>(
        `select count(*)::int as n from ${table}`,
      );
      return Number(row.n);
    }),
  );

  const total = counts.reduce((sum, n) => sum + n, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-2 max-w-2xl opacity-70">
          Every word on the public site is stored in Postgres and edited from here.
          {total > 0 ? ` ${total} content rows are live.` : ""}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {COUNTS.map((item, i) => (
          <Link
            key={item.table}
            href={item.href}
            className="rounded-xl border border-black/15 p-4 transition-colors hover:border-black/40 dark:border-white/15 dark:hover:border-white/40"
          >
            <p className="font-mono text-3xl">{counts[i]}</p>
            <p className="mt-1 text-sm opacity-70">{item.label}</p>
          </Link>
        ))}
      </div>

      <Card
        title="Seed data"
        description="db/seed/seed-data.mjs holds the original hardcoded copy, extracted verbatim from lib/site.ts, lib/content.ts, lib/projects.ts, lib/notes.ts and app/page.tsx."
      >
        <ul className="list-inside list-disc space-y-1.5 font-mono text-sm opacity-80">
          <li>pnpm db:migrate — create or update the schema</li>
          <li>pnpm db:seed — re-import seed-data.mjs (upserts, prunes orphans)</li>
          <li>pnpm db:reset — wipe all content, then re-seed</li>
          <li>pnpm db:status — row count per table</li>
        </ul>
        <p className="mt-3 text-sm opacity-60">
          Re-running the seed overwrites the singletons and the ordered lists
          (nav, home sections, education, tech pills). Documents are upserted by
          slug, so entries you have since edited in the CMS keep your changes
          unless the seed file still defines the same slug.
        </p>
      </Card>
    </div>
  );
}
