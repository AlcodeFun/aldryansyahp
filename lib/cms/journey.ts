import "server-only";
import sql from "@/lib/db";
import { cached, cachedBy, TAGS } from "@/lib/cms/cache";
import { parseBlocks } from "@/lib/blocks";
import type { JourneyEntry } from "@/lib/cms/types";

const COLUMNS = `
  id, slug, title,
  to_char(date, 'YYYY-MM-DD') as date,
  excerpt, read_minutes, content, published
`;

type Row = Omit<JourneyEntry, "readMinutes" | "content"> & {
  read_minutes: number;
  content: unknown;
};

function map(row: Row): JourneyEntry {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date,
    excerpt: row.excerpt,
    readMinutes: row.read_minutes,
    content: parseBlocks(row.content),
    published: row.published,
  };
}

export const getJourneyEntries = cached(
  async (): Promise<JourneyEntry[]> => {
    const rows = await sql.unsafe<Row[]>(
      `select ${COLUMNS} from journey_entries
       where published order by position, date desc, slug`,
    );
    return rows.map(map);
  },
  ["journey-list"],
  [TAGS.journey],
);

export const getJourneyEntryBySlug = cachedBy(
  (args: [string]) => {
    const [slug] = args;
    return async () => {
      const rows = await sql.unsafe<Row[]>(
        `select ${COLUMNS} from journey_entries where slug = $1 and published`,
        [slug],
      );
      const row = rows[0];
      return row ? map(row) : undefined;
    };
  },
  "journey-entry",
  (args) => [TAGS.journey, `${TAGS.journey}:${args[0]}`],
);

/** Uncached, includes unpublished rows. Admin screens only. */
export async function getJourneyEntriesAdmin(): Promise<JourneyEntry[]> {
  const rows = await sql.unsafe<Row[]>(
    `select ${COLUMNS} from journey_entries order by position, date desc, slug`,
  );
  return rows.map(map);
}

export async function getJourneyEntryAdmin(id: string): Promise<JourneyEntry | undefined> {
  const rows = await sql.unsafe<Row[]>(
    `select ${COLUMNS} from journey_entries where id = $1`,
    [id],
  );
  const row = rows[0];
  return row ? map(row) : undefined;
}

export interface JourneyInput {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readMinutes: number;
  content: unknown;
  published: boolean;
}

export async function createJourneyEntry(values: JourneyInput): Promise<string> {
  const [next] = await sql<{ n: number }[]>`
    select coalesce(max(position), -1) + 1 as n from journey_entries
  `;
  const [row] = await sql<{ id: string }[]>`
    insert into journey_entries
      (slug, title, date, excerpt, read_minutes, content, published, position)
    values (
      ${values.slug}, ${values.title}, ${values.date}, ${values.excerpt},
      ${values.readMinutes}, ${sql.json(parseBlocks(values.content))},
      ${values.published}, ${next.n}
    )
    returning id
  `;
  return row.id;
}

export async function updateJourneyEntry(id: string, values: JourneyInput): Promise<void> {
  await sql`
    update journey_entries set
      slug = ${values.slug}, title = ${values.title}, date = ${values.date},
      excerpt = ${values.excerpt}, read_minutes = ${values.readMinutes},
      content = ${sql.json(parseBlocks(values.content))},
      published = ${values.published}
    where id = ${id}
  `;
}

export async function deleteJourneyEntry(id: string): Promise<void> {
  await sql`delete from journey_entries where id = ${id}`;
}

export async function toggleJourneyPublished(id: string, published: boolean): Promise<void> {
  await sql`update journey_entries set published = ${published} where id = ${id}`;
}
