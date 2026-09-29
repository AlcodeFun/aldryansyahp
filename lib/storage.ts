/**
 * Supabase Storage client for gallery screenshots.
 *
 * This talks to the Storage REST API with plain `fetch` rather than adding
 * `@supabase/supabase-js`. The surface we need is one upload endpoint and one
 * public-URL convention, and a dependency that bundles a service_role-capable
 * client is not worth it when the only two operations are "put a file" and
 * "build its public URL".
 *
 * SECURITY: the service_role key bypasses row level security entirely, so this
 * module must never be imported from a client component. Keep it server-only;
 * the only caller is the Server Function in `lib/admin/storage-actions.ts`.
 */

const BUCKET = "cms-gallery";

/**
 * Keep in sync with `file_size_limit` on the bucket. The raw request body also
 * carries multipart boundaries and part headers, so `serverActions.bodySizeLimit`
 * in next.config.ts is set higher than this.
 */
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/**
 * The bucket's `allowed_mime_types` is the real gate; this map exists to derive a
 * file extension. Accepting a type the bucket rejects would fail server-side with
 * a much less obvious error.
 */
const MIME_EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export const ACCEPTED_IMAGE_TYPES = Object.keys(MIME_EXTENSIONS).join(",");

export class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
  }
}

function config(): { url: string; key: string } {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new UploadError(
      "Image storage is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.",
    );
  }
  return { url, key };
}

export function isStorageConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** "Screenshot 2024.PNG" -> "screenshot-2024" */
function slugifyFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  const slug = base
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/g, "");
  return slug || "image";
}

/**
 * Sanitize a folder prefix while keeping its levels, so the bucket stays grouped
 * as `projects/<slug>` instead of flattening into one long segment.
 *
 * Splitting on `/` and dropping empties is also what neutralises traversal:
 * `../../etc` keeps only `etc`, and `..` reduces to an empty string.
 */
function safeFolder(value: string): string {
  const segments = value
    .split("/")
    .map((segment) =>
      segment
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .slice(0, 60)
        .replace(/^-+|-+$/g, ""),
    )
    .filter(Boolean)
    .slice(0, 3);
  return segments.join("/") || "project";
}

export type StoredImage = {
  /** Absolute public URL, ready to drop into the gallery JSON. */
  src: string;
  /** Path inside the bucket, for reference or later cleanup. */
  path: string;
};

/**
 * Upload one image and return its public URL.
 *
 * The object key is `<folder>/<random>-<original-name>.<ext>`. The random
 * component means two uploads of `menu.png` never collide, and the readable
 * suffix means the Storage dashboard is browsable instead of a wall of hashes.
 */
export async function uploadImage(file: File, folder: string): Promise<StoredImage> {
  const { url, key } = config();

  const extension = MIME_EXTENSIONS[file.type];
  if (!extension) {
    throw new UploadError(
      `"${file.type || "unknown"}" is not a supported image. Use PNG, JPEG, WebP, AVIF, or GIF.`,
    );
  }
  if (file.size === 0) {
    throw new UploadError(`"${file.name}" is empty.`);
  }
  if (file.size > MAX_IMAGE_BYTES) {
    const mb = (MAX_IMAGE_BYTES / (1024 * 1024)).toFixed(0);
    throw new UploadError(
      `"${file.name}" is ${(file.size / (1024 * 1024)).toFixed(1)} MB. The limit is ${mb} MB.`,
    );
  }

  const unique = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const objectPath = `${safeFolder(folder)}/${unique}-${slugifyFilename(file.name)}.${extension}`;

  const response = await fetch(`${url}/storage/v1/object/${BUCKET}/${objectPath}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": file.type,
      "Cache-Control": "31536000",
    },
    body: await file.arrayBuffer(),
  });

  if (!response.ok) {
    // Supabase answers with { error, statusCode, message }; surface the message
    // so a quota or mime rejection is legible in the admin UI.
    const detail = (await response.json().catch(() => null)) as {
      message?: string;
      error?: string;
    } | null;
    throw new UploadError(
      detail?.message || detail?.error || `Storage rejected the upload (HTTP ${response.status}).`,
    );
  }

  return {
    src: `${url}/storage/v1/object/public/${BUCKET}/${objectPath}`,
    path: objectPath,
  };
}

/**
 * True for a URL served from our own public bucket. Used to keep the admin UI
 * from offering to delete an author-supplied URL we do not host.
 */
export function isManagedStorageUrl(src: string): boolean {
  const base = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  if (!base) return false;
  return src.startsWith(`${base}/storage/v1/object/public/${BUCKET}/`);
}
