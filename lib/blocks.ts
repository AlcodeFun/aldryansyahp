/**
 * The rich-text model shared by journey entries, projects and random notes.
 *
 * Bodies are stored as a `jsonb` array of these blocks. The union is small on
 * purpose: five block types cover everything the site can render, and keeping
 * it closed means `components/article.tsx` can switch exhaustively.
 */

export const BLOCK_TYPES = ["p", "h2", "quote", "list", "hr"] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "hr" };

/** Human labels for the block editor's type picker. */
export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  p: "Paragraph",
  h2: "Heading",
  quote: "Quote",
  list: "Bulleted list",
  hr: "Divider",
};

export function emptyBlock(type: BlockType = "p"): Block {
  switch (type) {
    case "hr":
      return { type: "hr" };
    case "list":
      return { type: "list", items: [""] };
    default:
      return { type, text: "" };
  }
}

/**
 * Coerce an untrusted value (jsonb column, or a hand-edited admin textarea)
 * into a valid Block[]. Unknown block types are dropped rather than rendered,
 * so a bad row degrades to shorter content instead of a crash.
 */
export function parseBlocks(value: unknown): Block[] {
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

  const blocks: Block[] = [];
  for (const raw of source) {
    if (typeof raw !== "object" || raw === null) continue;
    const candidate = raw as Record<string, unknown>;
    const type = candidate.type;

    if (type === "hr") {
      blocks.push({ type: "hr" });
      continue;
    }

    if (type === "list") {
      const items = Array.isArray(candidate.items)
        ? candidate.items.filter((i): i is string => typeof i === "string")
        : [];
      blocks.push({ type: "list", items });
      continue;
    }

    if ((type === "p" || type === "h2" || type === "quote") && typeof candidate.text === "string") {
      blocks.push({ type, text: candidate.text });
    }
  }
  return blocks;
}

/** Approximate word count, used for the "N min read" hint in the editor. */
export function countWords(blocks: Block[]): number {
  let total = 0;
  for (const block of blocks) {
    if (block.type === "hr") continue;
    const text = block.type === "list" ? block.items.join(" ") : block.text;
    total += text.trim() ? text.trim().split(/\s+/).length : 0;
  }
  return total;
}

/** Rounded-up minutes at ~200 wpm, the usual reading-speed estimate. */
export function estimateReadMinutes(blocks: Block[]): number {
  return Math.max(1, Math.round(countWords(blocks) / 200));
}
