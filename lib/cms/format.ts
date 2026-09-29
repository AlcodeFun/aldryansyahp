/** `2026-08-14` → `2026.08.14`, the site's original date style. */
export function formatDate(iso: string): string {
  return iso.replace(/-/g, ".");
}

export type MetaVars = Record<string, string | number | undefined>;

/** Default separator used both inside templates and between parts. */
export const META_SEPARATOR = " · ";

/**
 * Render a page's meta template, e.g. `"{date} · {readMinutes} min read"`.
 *
 * Unknown or empty placeholders are removed together with the separator that
 * followed them, so a project without a role renders `2025 · React · Node`
 * rather than `2025 ·  · React · Node`. A template with nothing left to show
 * yields an empty string, which callers render as no line at all.
 */
export function renderMeta(
  format: string,
  vars: MetaVars,
  separator = META_SEPARATOR,
): string {
  if (!format) return "";

  const filled = format.replace(/\{(\w+)\}/g, (_match, key: string) => {
    const value = vars[key];
    if (value === undefined || value === null || value === "") return "";
    return String(value);
  });

  return filled
    .split(separator)
    .map((part) => part.trim())
    .filter(Boolean)
    .join(separator);
}
