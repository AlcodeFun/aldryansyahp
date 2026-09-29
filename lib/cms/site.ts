import "server-only";
import sql from "@/lib/db";
import { cached, perRequest, TAGS } from "@/lib/cms/cache";
import { swapPositions } from "@/lib/cms/order";
import type { NavItem, SiteSettings } from "@/lib/cms/types";

const SITE_TAGS = [TAGS.site];

export const getSite = cached(
  async (): Promise<SiteSettings> => {
    const [row] = await sql<SiteSettings[]>`
      select name, username, nickname, role, tagline, location, email,
             github, twitter, linkedin
      from site_settings where id = 1
    `;
    return (
      row ?? {
        name: "",
        username: "",
        nickname: "",
        role: "",
        tagline: "",
        location: "",
        email: "aldryansyah30@gmail.com",
        github: "https://github.com/alcodefun",
        twitter: "",
        linkedin: "https://linkedin.com/in/muhammadaldryansyahpamungkas",
      }
    );
  },
  ["site"],
  SITE_TAGS,
);

export const getNav = cached(
  async (): Promise<NavItem[]> =>
    sql<NavItem[]>`
      select id, href, label from nav_items order by position, href
    `,
  ["nav"],
  SITE_TAGS,
);

/** All rows of `ui_strings` collapsed into a lookup object. */
export const getStrings = cached(
  async (): Promise<Record<string, string>> => {
    const rows = await sql<{ key: string; value: string }[]>`
      select key, value from ui_strings
    `;
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  },
  ["strings"],
  SITE_TAGS,
);

export const getNavAndStrings = perRequest(async () => ({
  nav: await getNav(),
  strings: await getStrings(),
}));

export async function updateSite(values: SiteSettings): Promise<void> {
  await sql`
    update site_settings set
      name = ${values.name}, username = ${values.username},
      nickname = ${values.nickname}, role = ${values.role},
      tagline = ${values.tagline}, location = ${values.location},
      email = ${values.email}, github = ${values.github},
      twitter = ${values.twitter}, linkedin = ${values.linkedin}
    where id = 1
  `;
}

export async function upsertStrings(entries: { key: string; value: string }[]): Promise<void> {
  for (const { key, value } of entries) {
    await sql`
      insert into ui_strings (key, value, group_name)
      values (${key}, ${value}, split_part(${key}, '.', 1))
      on conflict (key) do update set value = excluded.value
    `;
  }
}

export async function addNavItem(href: string, label: string): Promise<NavItem> {
  const [next] = await sql<{ n: number }[]>`
    select coalesce(max(position), -1) + 1 as n from nav_items
  `;
  const [row] = await sql<NavItem[]>`
    insert into nav_items (href, label, position)
    values (${href}, ${label}, ${Number(next.n)})
    returning id, href, label
  `;
  return row;
}

export async function updateNavItem(id: string, href: string, label: string): Promise<void> {
  await sql`update nav_items set href = ${href}, label = ${label} where id = ${id}`;
}

export async function deleteNavItem(id: string): Promise<void> {
  await sql`delete from nav_items where id = ${id}`;
}

export async function reorderNavItem(id: string, direction: -1 | 1): Promise<void> {
  await swapPositions("nav_items", id, direction);
}
