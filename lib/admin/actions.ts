"use server";

/**
 * Every CMS mutation lives here.
 *
 * Two rules hold for all of them:
 *  1. `assertAdmin()` runs first. Server Functions are reachable by direct POST,
 *     and `proxy.ts` coverage is not a guarantee (see the proxy docs), so the
 *     real check is always in the action.
 *  2. On success the affected cache tag is revalidated and the whole tree is
 *     revalidated, so the public site reflects the edit without a redeploy.
 */

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { assertAdmin, sessionCookieOptions } from "@/lib/admin/session";
import {
  SESSION_COOKIE,
  createSessionToken,
  isAdminConfigured,
  isAdminPassword,
} from "@/lib/admin/token";
import { TAGS } from "@/lib/cms/cache";
import { parseBlocks } from "@/lib/blocks";
import { parseGallery } from "@/lib/gallery";
import * as site from "@/lib/cms/site";
import * as home from "@/lib/cms/home";
import * as journey from "@/lib/cms/journey";
import * as projects from "@/lib/cms/projects";
import * as notes from "@/lib/cms/notes";
import * as pages from "@/lib/cms/pages";
import type { HomeSectionKind, PageSettings, TechGroup } from "@/lib/cms/types";

// ---------------------------------------------------------------------------
// form helpers
// ---------------------------------------------------------------------------

function str(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function raw(data: FormData, key: string): string {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
}

function num(data: FormData, key: string, fallback = 0): number {
  const parsed = Number(str(data, key));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function bool(data: FormData, key: string): boolean {
  return data.get(key) === "on" || data.get(key) === "true";
}

function tags(raw0: string): string[] {
  return raw0
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Keep a slug URL-safe and stable as the author types. */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Prefer an explicit slug, otherwise derive one from the title. */
function resolveSlug(data: FormData, fallback: string): string {
  const explicit = slugify(str(data, "slug"));
  return explicit || slugify(fallback) || `entry-${Date.now()}`;
}

function refresh(tags: string[]): void {
  for (const tag of tags) revalidateTag(tag, "max");
  revalidatePath("/", "layout");
}

// ---------------------------------------------------------------------------
// auth
// ---------------------------------------------------------------------------

export type LoginState = { error?: string };

export async function login(_prev: LoginState, data: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: "ADMIN_PASSWORD is not set on the server." };
  }

  const submitted = raw(data, "password");
  if (!isAdminPassword(submitted)) {
    return { error: "Wrong password." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);

  const from = str(data, "from");
  // Only allow same-origin relative paths back into the admin.
  redirect(from.startsWith("/admin") ? from : "/admin");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// ---------------------------------------------------------------------------
// site + shell
// ---------------------------------------------------------------------------

export async function saveSite(data: FormData): Promise<void> {
  await assertAdmin();
  await site.updateSite({
    name: raw(data, "name"),
    username: raw(data, "username"),
    nickname: raw(data, "nickname"),
    role: raw(data, "role"),
    tagline: raw(data, "tagline"),
    location: raw(data, "location"),
    email: raw(data, "email"),
    github: raw(data, "github"),
    twitter: raw(data, "twitter"),
    linkedin: raw(data, "linkedin"),
  });
  refresh([TAGS.site]);
  redirect("/admin/site?saved=1");
}

export async function saveStrings(data: FormData): Promise<void> {
  await assertAdmin();
  const entries: { key: string; value: string }[] = [];
  for (const [key, value] of data.entries()) {
    if (!key.startsWith("string:")) continue;
    entries.push({ key: key.slice("string:".length), value: String(value) });
  }
  await site.upsertStrings(entries);
  refresh([TAGS.site]);
  redirect("/admin/site?saved=1");
}

export async function addNavItem(data: FormData): Promise<void> {
  await assertAdmin();
  const href = str(data, "href") || "/";
  await site.addNavItem(href, str(data, "label") || href);
  refresh([TAGS.site]);
  redirect("/admin/site");
}

export async function updateNavItem(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (!id) return;
  await site.updateNavItem(id, str(data, "href") || "/", str(data, "label"));
  refresh([TAGS.site]);
  redirect("/admin/site");
}

export async function deleteNavItem(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await site.deleteNavItem(id);
  refresh([TAGS.site]);
  redirect("/admin/site");
}

export async function moveNavItem(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  const direction = str(data, "direction") === "up" ? -1 : 1;
  if (id) await site.reorderNavItem(id, direction);
  refresh([TAGS.site]);
  redirect("/admin/site");
}

// ---------------------------------------------------------------------------
// home page
// ---------------------------------------------------------------------------

export async function saveHero(data: FormData): Promise<void> {
  await assertAdmin();
  await home.updateHero({
    updatedLabel: raw(data, "updatedLabel"),
    lineOne: raw(data, "lineOne"),
    greeting: raw(data, "greeting"),
    experiencePrefix: raw(data, "experiencePrefix"),
  });
  refresh([TAGS.home]);
  redirect("/admin/home?saved=1");
}

export async function saveSection(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (!id) return;
  const kind = str(data, "kind");
  await home.updateSection(id, {
    title: raw(data, "title"),
    body: raw(data, "body"),
    kind: (["text", "heading", "contact"].includes(kind) ? kind : "text") as HomeSectionKind,
  });
  refresh([TAGS.home]);
  redirect("/admin/home?saved=1");
}

export async function addEducation(data: FormData): Promise<void> {
  await assertAdmin();
  await home.addEducation({
    period: raw(data, "period"),
    degree: raw(data, "degree"),
    school: raw(data, "school"),
    gpa: raw(data, "gpa"),
    predicate: raw(data, "predicate"),
  });
  refresh([TAGS.home]);
  redirect("/admin/home");
}

export async function updateEducation(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (!id) return;
  await home.updateEducation(id, {
    period: raw(data, "period"),
    degree: raw(data, "degree"),
    school: raw(data, "school"),
    gpa: raw(data, "gpa"),
    predicate: raw(data, "predicate"),
  });
  refresh([TAGS.home]);
  redirect("/admin/home");
}

export async function deleteEducation(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await home.deleteEducation(id);
  refresh([TAGS.home]);
  redirect("/admin/home");
}

export async function moveEducation(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  const direction = str(data, "direction") === "up" ? -1 : 1;
  if (id) await home.reorderEducation(id, direction);
  refresh([TAGS.home]);
  redirect("/admin/home");
}

export async function addTechItem(data: FormData): Promise<void> {
  await assertAdmin();
  const label = raw(data, "label");
  if (!label) return;
  const group = str(data, "groupName") === "stack" ? "stack" : "experience";
  await home.addTechItem(group as TechGroup, label);
  refresh([TAGS.home]);
  redirect("/admin/home");
}

export async function updateTechItem(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await home.updateTechItem(id, raw(data, "label"));
  refresh([TAGS.home]);
  redirect("/admin/home");
}

export async function deleteTechItem(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await home.deleteTechItem(id);
  refresh([TAGS.home]);
  redirect("/admin/home");
}

export async function moveTechItem(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  const direction = str(data, "direction") === "up" ? -1 : 1;
  if (id) await home.reorderTechItem(id, direction);
  refresh([TAGS.home]);
  redirect("/admin/home");
}

// ---------------------------------------------------------------------------
// journey
// ---------------------------------------------------------------------------

function journeyInput(data: FormData): journey.JourneyInput {
  const title = raw(data, "title");
  return {
    slug: resolveSlug(data, title),
    title,
    date: str(data, "date") || new Date().toISOString().slice(0, 10),
    excerpt: raw(data, "excerpt"),
    readMinutes: Math.max(0, num(data, "readMinutes", 1)),
    content: parseBlocks(raw(data, "content")),
    published: bool(data, "published"),
  };
}

export async function saveJourneyEntry(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  const values = journeyInput(data);
  if (id) {
    await journey.updateJourneyEntry(id, values);
  } else {
    const newId = await journey.createJourneyEntry(values);
    refresh([TAGS.journey, `${TAGS.journey}:${values.slug}`]);
    redirect(`/admin/journey/${newId}`);
  }
  refresh([TAGS.journey, `${TAGS.journey}:${values.slug}`]);
  redirect("/admin/journey?saved=1");
}

export async function deleteJourneyEntry(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await journey.deleteJourneyEntry(id);
  refresh([TAGS.journey]);
  redirect("/admin/journey");
}

export async function toggleJourneyPublished(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await journey.toggleJourneyPublished(id, bool(data, "published"));
  refresh([TAGS.journey]);
  redirect("/admin/journey");
}

// ---------------------------------------------------------------------------
// projects
// ---------------------------------------------------------------------------

function projectInput(data: FormData): projects.ProjectInput {
  const title = raw(data, "title");
  return {
    slug: resolveSlug(data, title),
    indexLabel: raw(data, "indexLabel"),
    title,
    year: raw(data, "year"),
    role: raw(data, "role"),
    tags: tags(raw(data, "tags")),
    hook: raw(data, "hook"),
    content: parseBlocks(raw(data, "content")),
    repoUrl: raw(data, "repoUrl").trim(),
    gallery: parseGallery(raw(data, "gallery")),
    published: bool(data, "published"),
  };
}

export async function saveProject(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  const values = projectInput(data);
  if (id) {
    await projects.updateProject(id, values);
    refresh([TAGS.projects, `${TAGS.projects}:${values.slug}`]);
    redirect("/admin/projects?saved=1");
  }
  const newId = await projects.createProject(values);
  refresh([TAGS.projects, `${TAGS.projects}:${values.slug}`]);
  redirect(`/admin/projects/${newId}`);
}

export async function deleteProject(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await projects.deleteProject(id);
  refresh([TAGS.projects]);
  redirect("/admin/projects");
}

export async function toggleProjectPublished(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await projects.toggleProjectPublished(id, bool(data, "published"));
  refresh([TAGS.projects]);
  redirect("/admin/projects");
}

// ---------------------------------------------------------------------------
// random notes
// ---------------------------------------------------------------------------

function noteInput(data: FormData): notes.NoteInput {
  const title = raw(data, "title");
  return {
    slug: resolveSlug(data, title),
    title,
    date: str(data, "date") || new Date().toISOString().slice(0, 10),
    text: raw(data, "text"),
    content: parseBlocks(raw(data, "content")),
    published: bool(data, "published"),
  };
}

export async function saveRandomNote(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  const values = noteInput(data);
  if (id) {
    await notes.updateRandomNote(id, values);
    refresh([TAGS.notes, `${TAGS.notes}:${values.slug}`]);
    redirect("/admin/notes?saved=1");
  }
  const newId = await notes.createRandomNote(values);
  refresh([TAGS.notes, `${TAGS.notes}:${values.slug}`]);
  redirect(`/admin/notes/${newId}`);
}

export async function deleteRandomNote(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await notes.deleteRandomNote(id);
  refresh([TAGS.notes]);
  redirect("/admin/notes");
}

export async function toggleRandomNotePublished(data: FormData): Promise<void> {
  await assertAdmin();
  const id = str(data, "id");
  if (id) await notes.toggleRandomNotePublished(id, bool(data, "published"));
  refresh([TAGS.notes]);
  redirect("/admin/notes");
}

// ---------------------------------------------------------------------------
// page copy + strings
// ---------------------------------------------------------------------------

export async function savePageSettings(data: FormData): Promise<void> {
  await assertAdmin();
  const pageKey = str(data, "pageKey");
  if (!pageKey) return;

  const values: PageSettings = {
    pageKey,
    seoTitle: raw(data, "seoTitle"),
    seoDescription: raw(data, "seoDescription"),
    heading: raw(data, "heading"),
    intro: raw(data, "intro"),
    backLabel: raw(data, "backLabel"),
    backHref: raw(data, "backHref"),
    allLabel: raw(data, "allLabel"),
    listMetaFormat: raw(data, "listMetaFormat"),
    detailMetaFormat: raw(data, "detailMetaFormat"),
    emptyMessage: raw(data, "emptyMessage"),
  };

  await pages.updatePageSettings(values);
  refresh([TAGS.pages]);
  redirect("/admin/pages?saved=1");
}
