"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";

export function LoginForm({ from }: { from: string }) {
  const [state, action] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="space-y-4">
      {/* proxy.ts set this so we can return the visitor to where they were. */}
      <input type="hidden" name="from" value={from} />
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium opacity-80">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className="w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[15px] outline-none focus:border-black dark:border-white/25 dark:focus:border-white"
        />
      </div>

      {state.error ? (
        <p className="rounded-lg border border-red-500/50 px-3 py-2 text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      ) : null}

      <SubmitButton
        pendingLabel="Checking…"
        className="w-full rounded-full border border-black bg-black px-5 py-2 text-[15px] font-medium text-white transition-colors hover:opacity-80 dark:border-white dark:bg-white dark:text-black"
      >
        Sign in
      </SubmitButton>
    </form>
  );
}
