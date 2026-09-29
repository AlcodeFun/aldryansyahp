import type { Block } from "@/lib/blocks";
import type { GalleryImage } from "@/lib/gallery";

/** Row shapes returned by `lib/cms/*`. Field names mirror the SQL columns. */

export interface SiteSettings {
  name: string;
  username: string;
  nickname: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  github: string;
  twitter: string;
  linkedin: string;
}

export interface NavItem {
  id: string;
  href: string;
  label: string;
}

export type HomeSectionKind = "text" | "heading" | "contact";

export interface HomeSection {
  id: string;
  key: string;
  kind: HomeSectionKind;
  title: string;
  body: string;
}

export interface HomeHero {
  updatedLabel: string;
  lineOne: string;
  greeting: string;
  experiencePrefix: string;
}

export interface EducationEntry {
  id: string;
  period: string;
  degree: string;
  school: string;
  gpa: string;
  predicate: string;
}

export type TechGroup = "experience" | "stack";

export interface TechItem {
  id: string;
  groupName: TechGroup;
  label: string;
}

export interface JourneyEntry {
  id: string;
  slug: string;
  title: string;
  /** ISO `YYYY-MM-DD`, formatted from the `date` column. */
  date: string;
  excerpt: string;
  readMinutes: number;
  content: Block[];
  published: boolean;
}

export interface ProjectEntry {
  id: string;
  slug: string;
  indexLabel: string;
  title: string;
  year: string;
  role: string;
  tags: string[];
  hook: string;
  content: Block[];
  repoUrl: string;
  gallery: GalleryImage[];
  published: boolean;
}

export interface RandomNote {
  id: string;
  slug: string;
  title: string;
  /** ISO `YYYY-MM-DD`, formatted from the `date` column. */
  date: string;
  text: string;
  content: Block[];
  published: boolean;
}

export interface PageSettings {
  pageKey: string;
  seoTitle: string;
  seoDescription: string;
  heading: string;
  intro: string;
  backLabel: string;
  backHref: string;
  allLabel: string;
  /** Template like `{date} · {readMinutes} min`, see `renderMeta`. */
  listMetaFormat: string;
  /** Template like `{year} · {role} · {tags}`, see `renderMeta`. */
  detailMetaFormat: string;
  emptyMessage: string;
}

export interface HomePageData {
  hero: HomeHero;
  sections: HomeSection[];
  education: EducationEntry[];
  tech: TechItem[];
}

/** Everything the public shell needs, in one round of queries. */
export interface ShellData {
  site: SiteSettings;
  nav: NavItem[];
  strings: Record<string, string>;
}
