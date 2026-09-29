"use server";

/**
 * Gallery image uploads.
 *
 * Separate from `lib/admin/actions.ts` on purpose: that file owns database
 * mutations, while this one talks to Supabase Storage and returns URLs. The CMS
 * save path stays unaware of storage — the upload only produces a `src` for the
 * gallery JSON, and `saveProject` persists it like any other value.
 *
 * `assertAdmin()` runs first, for the same reason as every other action: Server
 * Functions are reachable by direct POST, and proxy coverage is not a guarantee.
 */

import { assertAdmin } from "@/lib/admin/session";
import { isManagedStorageUrl, uploadImage, UploadError } from "@/lib/storage";
import type { GalleryImage } from "@/lib/gallery";

/** One admin save is a handful of screenshots, not a bulk import. */
const MAX_FILES_PER_UPLOAD = 12;

export type UploadResult =
  | { ok: true; images: GalleryImage[]; failures: string[] }
  | { ok: false; error: string };

/**
 * Duck-typed instead of `instanceof File`: a File that crossed the RSC boundary
 * can come from a different realm, where `instanceof` against this module's
 * `File` is false even though the object is a perfectly good file.
 */
function isFileLike(value: FormDataEntryValue): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "name" in value &&
    "type" in value
  );
}

/** Turn "01_menu-screen.PNG" into "01 menu screen" as a starting alt text. */
function altFromFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  const words = base.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  if (!words) return "Project screenshot";
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export async function uploadGalleryImages(
  formData: FormData,
  projectSlug: string,
): Promise<UploadResult> {
  await assertAdmin();

  const files = formData.getAll("files").filter(isFileLike).filter((f) => f.size > 0);
  if (files.length === 0) {
    return { ok: false, error: "Choose at least one image file." };
  }
  if (files.length > MAX_FILES_PER_UPLOAD) {
    return { ok: false, error: `Upload at most ${MAX_FILES_PER_UPLOAD} images at a time.` };
  }

  const folder = `projects/${projectSlug || "unassigned"}`;
  const images: GalleryImage[] = [];
  const failures: string[] = [];

  // Sequential rather than Promise.all: it keeps the request count to the
  // Storage API predictable, and a dozen screenshots is not a wait worth
  // parallelising at the cost of a dozen simultaneous 5 MB bodies in memory.
  for (const file of files) {
    try {
      const stored = await uploadImage(file, folder);
      images.push({ src: stored.src, alt: altFromFilename(file.name), caption: "" });
    } catch (error) {
      const message =
        error instanceof UploadError ? error.message : `Could not upload "${file.name}".`;
      failures.push(message);
    }
  }

  if (images.length === 0) {
    return { ok: false, error: failures[0] || "No images were uploaded." };
  }

  return { ok: true, images, failures };
}

export type DeleteResult = { ok: true } | { ok: false; error: string };

/**
 * Delete an object from the bucket.
 *
 * Deliberately not wired to the editor's "Remove" button: removing a row only
 * edits local form state, and the row may still be in the saved project. Deleting
 * storage on that click would destroy an image the database still references.
 * Storage is only reclaimed once the project no longer lists the URL, which is a
 * separate sweep this app does not attempt to do automatically.
 */
export async function deleteStoredImage(src: string): Promise<DeleteResult> {
  await assertAdmin();

  if (!isManagedStorageUrl(src)) {
    return { ok: false, error: "That image is not hosted in this project's storage bucket." };
  }

  const base = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  if (!base) return { ok: false, error: "Image storage is not configured." };

  const path = src.slice(`${base}/storage/v1/object/public/`.length);
  if (!path) return { ok: false, error: "Could not work out the storage path." };

  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return { ok: false, error: "Image storage is not configured." };

  const response = await fetch(`${base}/storage/v1/object/${path}`, {
    method: "DELETE",
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });

  if (!response.ok && response.status !== 404) {
    return { ok: false, error: `Storage refused the delete (HTTP ${response.status}).` };
  }
  return { ok: true };
}
