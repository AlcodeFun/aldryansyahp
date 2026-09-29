"use client";

import { useState } from "react";
import {
  BLOCK_TYPES,
  BLOCK_TYPE_LABELS,
  emptyBlock,
  estimateReadMinutes,
  type Block,
  type BlockType,
} from "@/lib/blocks";

/**
 * Structured editor for the site's block union.
 *
 * State lives in React; the serialized array is written to a hidden input so
 * the surrounding <form> stays a plain progressive-enhancement form that
 * degrades to a textarea if this script never hydrates.
 */
export function BlockEditor({
  name,
  initial,
  readMinutesName,
}: {
  name: string;
  initial: Block[];
  readMinutesName?: string;
}) {
  const [blocks, setBlocks] = useState<Block[]>(initial);
  const [extraText, setExtraText] = useState("");

  function update(index: number, next: Block) {
    setBlocks((current) => current.map((b, i) => (i === index ? next : b)));
  }

  function changeType(index: number, type: BlockType) {
    // Text is always empty on a type switch: carrying a paragraph's body into a
    // list block would silently turn prose into a single bullet.
    update(index, emptyBlock(type));
  }

  function move(index: number, direction: -1 | 1) {
    setBlocks((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function remove(index: number) {
    setBlocks((current) => current.filter((_, i) => i !== index));
  }

  function add(type: BlockType) {
    setBlocks((current) => [...current, emptyBlock(type)]);
  }

  function addFromTextarea() {
    // Blank-line-separated paragraphs become paragraphs; "-" lines become a list.
    const chunks = extraText
      .split(/\n{2,}/)
      .map((c) => c.trim())
      .filter(Boolean);

    if (chunks.length === 0) return;
    const parsed: Block[] = chunks.map((chunk) =>
      chunk.split("\n").every((line) => line.trim().startsWith("- "))
        ? {
            type: "list",
            items: chunk.split("\n").map((line) => line.trim().replace(/^-\s*/, "")),
          }
        : { type: "p", text: chunk },
    );
    setBlocks((current) => [...current, ...parsed]);
    setExtraText("");
  }

  const minutes = estimateReadMinutes(blocks);

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={JSON.stringify(blocks)} />
      {readMinutesName ? (
        <input type="hidden" name={readMinutesName} value={String(minutes)} />
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex flex-wrap gap-2">
          {BLOCK_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => add(type)}
              className="rounded-full border border-black/30 px-3 py-1 transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/30 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
            >
              + {BLOCK_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
        <p className="font-mono opacity-60">
          {blocks.length} blocks · ~{minutes} min read
        </p>
      </div>

      {blocks.length === 0 ? (
        <p className="rounded-lg border border-dashed border-black/25 px-4 py-6 text-center text-sm opacity-60 dark:border-white/25">
          No content yet.
        </p>
      ) : null}

      <ol className="space-y-3">
        {blocks.map((block, index) => (
          <li
            key={index}
            className="rounded-lg border border-black/15 p-3 dark:border-white/15"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs opacity-50">{index + 1}</span>
              <select
                value={block.type}
                onChange={(e) => changeType(index, e.target.value as BlockType)}
                aria-label={`Block ${index + 1} type`}
                className="rounded border border-black/20 bg-transparent px-2 py-1 text-sm dark:border-white/25"
              >
                {BLOCK_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {BLOCK_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>

              <span className="flex-1" />

              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move block up"
                className="rounded border border-black/20 px-2 py-1 text-sm disabled:opacity-30 dark:border-white/25"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === blocks.length - 1}
                aria-label="Move block down"
                className="rounded border border-black/20 px-2 py-1 text-sm disabled:opacity-30 dark:border-white/25"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Remove block"
                className="rounded border border-red-500/50 px-2 py-1 text-sm text-red-600 dark:text-red-400"
              >
                Remove
              </button>
            </div>

            <div className="mt-2">
              {block.type === "hr" ? (
                <hr className="my-1 border-black/20 dark:border-white/25" />
              ) : block.type === "list" ? (
                <ul className="space-y-1.5">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span aria-hidden className="font-mono text-xs opacity-50">
                        –
                      </span>
                      <input
                        value={item}
                        aria-label={`List item ${j + 1}`}
                        onChange={(e) =>
                          update(index, {
                            type: "list",
                            items: block.items.map((x, k) => (k === j ? e.target.value : x)),
                          })
                        }
                        className="w-full rounded border border-black/20 bg-transparent px-2 py-1.5 text-[15px] dark:border-white/25"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          update(index, {
                            type: "list",
                            items: block.items.filter((_, k) => k !== j),
                          })
                        }
                        aria-label={`Remove list item ${j + 1}`}
                        className="rounded border border-black/20 px-2 py-1 text-sm disabled:opacity-30 dark:border-white/25"
                        disabled={block.items.length === 1}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        update(index, { type: "list", items: [...block.items, ""] })
                      }
                      className="rounded border border-black/20 px-2 py-1 text-xs dark:border-white/25"
                    >
                      + item
                    </button>
                  </li>
                </ul>
              ) : (
                <textarea
                  value={block.text}
                  aria-label={`${BLOCK_TYPE_LABELS[block.type]} text`}
                  rows={block.type === "quote" ? 2 : 4}
                  onChange={(e) => update(index, { ...block, text: e.target.value } as Block)}
                  className="w-full resize-y rounded border border-black/20 bg-transparent px-2.5 py-1.5 text-[15px] leading-relaxed dark:border-white/25"
                />
              )}
            </div>
          </li>
        ))}
      </ol>

      <details className="rounded-lg border border-dashed border-black/25 p-3 dark:border-white/25">
        <summary className="cursor-pointer text-sm opacity-70">
          Paste plain text as new blocks
        </summary>
        <p className="mt-2 text-xs opacity-60">
          Blank line between paragraphs. Lines starting with &quot;- &quot; become a
          bulleted list.
        </p>
        <textarea
          value={extraText}
          onChange={(e) => setExtraText(e.target.value)}
          rows={5}
          className="mt-2 w-full resize-y rounded border border-black/20 bg-transparent px-2.5 py-1.5 text-[15px] leading-relaxed dark:border-white/25"
        />
        <button
          type="button"
          onClick={addFromTextarea}
          disabled={extraText.trim() === ""}
          className="mt-2 rounded-full border border-black/30 px-4 py-1.5 text-sm disabled:opacity-30 dark:border-white/30"
        >
          Append
        </button>
      </details>
    </div>
  );
}
