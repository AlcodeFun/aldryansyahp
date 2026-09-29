import "server-only";
import sql from "@/lib/db";
import { cached, cachedBy, TAGS } from "@/lib/cms/cache";
import { parseBlocks } from "@/lib/blocks";
import type { RandomNote } from "@/lib/cms/types";

const COLUMNS = `
  id, slug, title, to_char(date, 'YYYY-MM-DD') as date, text, content, published
`;

type Row = Omit<RandomNote, "content"> & { content: unknown };

function map(row: Row): RandomNote {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    date: row.date,
    text: row.text,
    content: parseBlocks(row.content),
    published: row.published,
  };
}

export const getRandomNotes = cached(
  async (): Promise<RandomNote[]> => {
    const rows = await sql.unsafe<Row[]>(
      `select ${COLUMNS} from random_notes
       where published order by position, date desc, slug`,
    );
    return rows.map(map);
  },
  ["note-list"],
  [TAGS.notes],
);

export const getRandomNoteBySlug = cachedBy(
  (args: [string]) => {
    const [slug] = args;
    return async () => {
      const rows = await sql.unsafe<Row[]>(
        `select ${COLUMNS} from random_notes where slug = $1 and published`,
        [slug],
      );
      const row = rows[0];
      return row ? map(row) : undefined;
    };
  },
  "note",
  (args) => [TAGS.notes, `${TAGS.notes}:${args[0]}`],
);

/** Uncached, includes unpublished rows. Admin screens only. */
export async function getRandomNotesAdmin(): Promise<RandomNote[]> {
  const rows = await sql.unsafe<Row[]>(
    `select ${COLUMNS} from random_notes order by position, date desc, slug`,
  );
  return rows.map(map);
}

export async function getRandomNoteAdmin(id: string): Promise<RandomNote | undefined> {
  const rows = await sql.unsafe<Row[]>(`select ${COLUMNS} from random_notes where id = $1`, [
    id,
  ]);
  const row = rows[0];
  return row ? map(row) : undefined;
}

export interface NoteInput {
  slug: string;
  title: string;
  date: string;
  text: string;
  content: unknown;
  published: boolean;
}

export async function createRandomNote(values: NoteInput): Promise<string> {
  const [next] = await sql<{ n: number }[]>`
    select coalesce(max(position), -1) + 1 as n from random_notes
  `;
  const [row] = await sql<{ id: string }[]>`
    insert into random_notes (slug, title, date, text, content, published, position)
    values (
      ${values.slug}, ${values.title}, ${values.date}, ${values.text},
      ${sql.json(parseBlocks(values.content))}, ${values.published}, ${next.n}
    )
    returning id
  `;
  return row.id;
}

export async function updateRandomNote(id: string, values: NoteInput): Promise<void> {
  await sql`
    update random_notes set
      slug = ${values.slug}, title = ${values.title}, date = ${values.date},
      text = ${values.text}, content = ${sql.json(parseBlocks(values.content))},
      published = ${values.published}
    where id = ${id}
  `;
}

export async function deleteRandomNote(id: string): Promise<void> {
  await sql`delete from random_notes where id = ${id}`;
}

export async function toggleRandomNotePublished(id: string, published: boolean): Promise<void> {
  await sql`update random_notes set published = ${published} where id = ${id}`;
}
