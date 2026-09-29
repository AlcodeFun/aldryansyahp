/**
 * The screenshot gallery model for projects.
 *
 * Kept separate from `lib/blocks.ts` on purpose: a gallery is a list of images
 * with their own alt/caption, not a rich-text block, and it renders after the
 * article body rather than inline with it.
 *
 * Like `parseBlocks`, `parseGallery` is defensive because the input is an
 * untrusted jsonb column that may also be hand-edited in the admin textarea.
 * Entries without a usable `src` are dropped so one bad row cannot render a
 * broken image or throw during render.
 */

// A `type` rather than an `interface` on purpose: postgres.js types
// `sql.json()` as accepting `JSONValue`, and only type aliases get the implicit
// index signature that satisfies it. An interface here fails to typecheck.
export type GalleryImage = {
  /** Local path under /public, or an absolute http(s) URL. */
  src: string;
  /** Required for accessibility; falls back to the caption, then to the src. */
  alt: string;
  /** Optional line shown under the image. */
  caption: string;
};

export function emptyImage(): GalleryImage {
  return { src: "", alt: "", caption: "" };
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Reject anything that is not an absolute http(s) URL or a root-relative path.
 * A relative path like `images/a.png` would resolve against the current route
 * and 404 from a detail page, which is almost never what the author meant.
 */
function isUsableSrc(src: string): boolean {
  if (src.startsWith("//")) return false;
  if (src.startsWith("/")) return true;
  return /^https?:\/\/\S+$/i.test(src);
}

export function parseGallery(value: unknown): GalleryImage[] {
  let source: unknown = value;

  if (typeof source === "string") {
    const trimmed = source.trim();
    if (!trimmed) return [];
    try {
      source = JSON.parse(trimmed);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(source)) return [];

  const images: GalleryImage[] = [];
  for (const raw of source) {
    if (typeof raw !== "object" || raw === null) continue;
    const candidate = raw as Record<string, unknown>;
    const src = asString(candidate.src);
    if (!isUsableSrc(src)) continue;
    const caption = asString(candidate.caption);
    images.push({
      src,
      // Alt text is mandatory in spirit: fall back rather than ship an
      // unlabelled image, but never fall back to an empty string.
      alt: asString(candidate.alt) || caption || src.split("/").pop() || src,
      caption,
    });
  }
  return images;
}
