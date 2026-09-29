import "server-only";
import sql from "@/lib/db";
import { cached, cachedBy, TAGS } from "@/lib/cms/cache";
import { parseBlocks } from "@/lib/blocks";
import { parseGallery } from "@/lib/gallery";
import type { ProjectEntry } from "@/lib/cms/types";

const COLUMNS = `
  id, slug, index_label, title, year, role, tags, hook, content,
  repo_url, gallery, published
`;

type Row = Omit<ProjectEntry, "indexLabel" | "content" | "repoUrl" | "gallery"> & {
  index_label: string;
  content: unknown;
  repo_url: string;
  gallery: unknown;
};

function map(row: Row): ProjectEntry {
  return {
    id: row.id,
    slug: row.slug,
    indexLabel: row.index_label,
    title: row.title,
    year: row.year,
    role: row.role,
    tags: Array.isArray(row.tags) ? row.tags : [],
    hook: row.hook,
    content: parseBlocks(row.content),
    repoUrl: row.repo_url,
    gallery: parseGallery(row.gallery),
    published: row.published,
  };
}

export const getProjects = cached(
  async (): Promise<ProjectEntry[]> => {
    const rows = await sql.unsafe<Row[]>(
      `select ${COLUMNS} from projects
       where published order by position, year desc, slug`,
    );
    return rows.map(map);
  },
  ["project-list"],
  [TAGS.projects],
);

export const getProjectBySlug = cachedBy(
  (args: [string]) => {
    const [slug] = args;
    return async () => {
      const rows = await sql.unsafe<Row[]>(
        `select ${COLUMNS} from projects where slug = $1 and published`,
        [slug],
      );
      const row = rows[0];
      return row ? map(row) : undefined;
    };
  },
  "project",
  (args) => [TAGS.projects, `${TAGS.projects}:${args[0]}`],
);

/** Uncached, includes unpublished rows. Admin screens only. */
export async function getProjectsAdmin(): Promise<ProjectEntry[]> {
  const rows = await sql.unsafe<Row[]>(
    `select ${COLUMNS} from projects order by position, year desc, slug`,
  );
  return rows.map(map);
}

export async function getProjectAdmin(id: string): Promise<ProjectEntry | undefined> {
  const rows = await sql.unsafe<Row[]>(`select ${COLUMNS} from projects where id = $1`, [id]);
  const row = rows[0];
  return row ? map(row) : undefined;
}

export interface ProjectInput {
  slug: string;
  indexLabel: string;
  title: string;
  year: string;
  role: string;
  tags: string[];
  hook: string;
  content: unknown;
  repoUrl: string;
  gallery: unknown;
  published: boolean;
}

export async function createProject(values: ProjectInput): Promise<string> {
  const [next] = await sql<{ n: number }[]>`
    select coalesce(max(position), -1) + 1 as n from projects
  `;
  const [row] = await sql<{ id: string }[]>`
    insert into projects
      (slug, index_label, title, year, role, tags, hook, content,
       repo_url, gallery, published, position)
    values (
      ${values.slug}, ${values.indexLabel}, ${values.title}, ${values.year},
      ${values.role}, ${values.tags}, ${values.hook},
      ${sql.json(parseBlocks(values.content))}, ${values.repoUrl},
      ${sql.json(parseGallery(values.gallery))}, ${values.published}, ${next.n}
    )
    returning id
  `;
  return row.id;
}

export async function updateProject(id: string, values: ProjectInput): Promise<void> {
  await sql`
    update projects set
      slug = ${values.slug}, index_label = ${values.indexLabel}, title = ${values.title},
      year = ${values.year}, role = ${values.role}, tags = ${values.tags},
      hook = ${values.hook}, content = ${sql.json(parseBlocks(values.content))},
      repo_url = ${values.repoUrl}, gallery = ${sql.json(parseGallery(values.gallery))},
      published = ${values.published}
    where id = ${id}
  `;
}

export async function deleteProject(id: string): Promise<void> {
  await sql`delete from projects where id = ${id}`;
}

export async function toggleProjectPublished(id: string, published: boolean): Promise<void> {
  await sql`update projects set published = ${published} where id = ${id}`;
}
