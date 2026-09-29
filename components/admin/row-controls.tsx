"use client";

import type { ReactNode } from "react";
import { SubmitButton } from "@/components/admin/submit-button";

/**
 * Compact icon buttons for a single ordered row: move up, move down, delete.
 * Each button posts the row's id plus its own intent, so one table row needs
 * no client-side state.
 */
export function RowControls({
  id,
  moveAction,
  deleteAction,
  canMoveUp,
  canMoveDown,
  extra,
}: {
  id: string;
  moveAction: (data: FormData) => Promise<void>;
  deleteAction: (data: FormData) => Promise<void>;
  canMoveUp: boolean;
  canMoveDown: boolean;
  extra?: ReactNode;
}) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-1.5">
      {extra}
      <form action={moveAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="up" />
        <SubmitButton
          pendingLabel="…"
          disabled={!canMoveUp}
          aria-label="Move up"
          className="rounded border border-black/20 px-2 py-1 text-sm disabled:opacity-25 dark:border-white/25"
        >
          ↑
        </SubmitButton>
      </form>
      <form action={moveAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="direction" value="down" />
        <SubmitButton
          pendingLabel="…"
          disabled={!canMoveDown}
          aria-label="Move down"
          className="rounded border border-black/20 px-2 py-1 text-sm disabled:opacity-25 dark:border-white/25"
        >
          ↓
        </SubmitButton>
      </form>
      <form action={deleteAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton
          pendingLabel="…"
          aria-label="Delete"
          className="rounded border border-red-500/50 px-2 py-1 text-sm text-red-600 dark:text-red-400"
        >
          ✕
        </SubmitButton>
      </form>
    </div>
  );
}
