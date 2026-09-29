import "server-only";
import sql from "@/lib/db";
import { cached, perRequest, TAGS } from "@/lib/cms/cache";
import { nextPosition, nextPositionInGroup, swapPositions } from "@/lib/cms/order";
import type {
  EducationEntry,
  HomeHero,
  HomePageData,
  HomeSection,
  HomeSectionKind,
  TechGroup,
  TechItem,
} from "@/lib/cms/types";

const HOME_TAGS = [TAGS.home];

export const getHero = cached(
  async (): Promise<HomeHero> => {
    const [row] = await sql<
      { updated_label: string; line_one: string; greeting: string; experience_prefix: string }[]
    >`
      select updated_label, line_one, greeting, experience_prefix
      from home_hero where id = 1
    `;
    return {
      updatedLabel: row?.updated_label ?? "",
      lineOne: row?.line_one ?? "",
      greeting: row?.greeting ?? "",
      experiencePrefix: row?.experience_prefix ?? "",
    };
  },
  ["home-hero"],
  HOME_TAGS,
);

export const getSections = cached(
  async (): Promise<HomeSection[]> =>
    sql<HomeSection[]>`
      select id, key, kind, title, body from home_sections order by position, key
    `,
  ["home-sections"],
  HOME_TAGS,
);

export const getEducation = cached(
  async (): Promise<EducationEntry[]> =>
    sql<EducationEntry[]>`
      select id, period, degree, school, gpa, predicate
      from education order by position, degree
    `,
  ["education"],
  HOME_TAGS,
);

export const getTech = cached(
  async (): Promise<TechItem[]> => {
    const rows = await sql<
      { id: string; group_name: TechGroup; label: string }[]
    >`
      select id, group_name, label from tech_items order by position, label
    `;
    return rows.map((row) => ({
      id: row.id,
      groupName: row.group_name,
      label: row.label,
    }));
  },
  ["tech"],
  HOME_TAGS,
);

/** Everything `/` renders besides the site shell. */
export const getHome = perRequest(async (): Promise<HomePageData> => {
  const [hero, sections, education, tech] = await Promise.all([
    getHero(),
    getSections(),
    getEducation(),
    getTech(),
  ]);
  // The pill row is the "tools I have actually shipped with" list. The `stack`
  // group is stored for reference but is not part of the public homepage.
  return {
    hero,
    sections,
    education,
    tech: tech.filter((item) => item.groupName === "experience"),
  };
});

export async function updateHero(values: HomeHero): Promise<void> {
  await sql`
    update home_hero set
      updated_label = ${values.updatedLabel},
      line_one = ${values.lineOne},
      greeting = ${values.greeting},
      experience_prefix = ${values.experiencePrefix}
    where id = 1
  `;
}

export async function updateSection(
  id: string,
  values: { title: string; body: string; kind: HomeSectionKind },
): Promise<void> {
  await sql`
    update home_sections set title = ${values.title}, body = ${values.body}, kind = ${values.kind}
    where id = ${id}
  `;
}

export async function addEducation(
  values: Omit<EducationEntry, "id">,
): Promise<EducationEntry> {
  const position = await nextPosition("education");
  const [row] = await sql<EducationEntry[]>`
    insert into education (period, degree, school, gpa, predicate, position)
    values (${values.period}, ${values.degree}, ${values.school}, ${values.gpa}, ${values.predicate}, ${position})
    returning id, period, degree, school, gpa, predicate
  `;
  return row;
}

export async function updateEducation(
  id: string,
  values: Omit<EducationEntry, "id">,
): Promise<void> {
  await sql`
    update education set
      period = ${values.period}, degree = ${values.degree}, school = ${values.school},
      gpa = ${values.gpa}, predicate = ${values.predicate}
    where id = ${id}
  `;
}

export async function deleteEducation(id: string): Promise<void> {
  await sql`delete from education where id = ${id}`;
}

export async function reorderEducation(id: string, direction: -1 | 1): Promise<void> {
  await swapPositions("education", id, direction);
}

export async function addTechItem(groupName: TechGroup, label: string): Promise<TechItem> {
  const position = await nextPositionInGroup("tech_items", groupName);
  const [row] = await sql<TechItem[]>`
    insert into tech_items (group_name, label, position)
    values (${groupName}, ${label}, ${position})
    returning id, group_name, label
  `;
  return row;
}

export async function updateTechItem(id: string, label: string): Promise<void> {
  await sql`update tech_items set label = ${label} where id = ${id}`;
}

export async function deleteTechItem(id: string): Promise<void> {
  await sql`delete from tech_items where id = ${id}`;
}

export async function reorderTechItem(id: string, direction: -1 | 1): Promise<void> {
  await swapPositions("tech_items", id, direction);
}
