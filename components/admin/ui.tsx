import type { ReactNode } from "react";
import { SubmitButton } from "@/components/admin/submit-button";

/** Shared visual language for every /admin screen. */

export function Card({
  title,
  description,
  actions,
  children,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-black/15 bg-white/40 p-5 dark:border-white/15 dark:bg-white/[0.03] sm:p-6">
      {title || description || actions ? (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {title ? (
              <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-1 max-w-2xl text-sm opacity-70">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

const CONTROL =
  "w-full rounded-lg border border-black/20 bg-transparent px-3 py-2 text-[15px] outline-none transition-colors focus:border-black dark:border-white/25 dark:focus:border-white";

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium opacity-80"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs opacity-60">{hint}</p> : null}
    </div>
  );
}

export function TextInput({
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
  min,
  max,
  step,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
}) {
  return (
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue ?? ""}
      placeholder={placeholder}
      className={CONTROL}
    />
  );
}

export function TextArea({
  name,
  defaultValue,
  rows = 4,
  placeholder,
  hint,
}: {
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1">
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={`${CONTROL} resize-y leading-relaxed`}
      />
      {hint ? <p className="text-xs opacity-60">{hint}</p> : null}
    </div>
  );
}

export function Checkbox({
  name,
  defaultChecked,
  label,
  hint,
}: {
  name: string;
  defaultChecked?: boolean;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 text-sm">
      <input
        id={name}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 accent-black dark:accent-white"
      />
      <span>
        <span className="font-medium">{label}</span>
        {hint ? <span className="mt-0.5 block opacity-60">{hint}</span> : null}
      </span>
    </label>
  );
}

export function SaveButton({
  children = "Save",
  pendingLabel = "Saving…",
}: {
  children?: string;
  pendingLabel?: string;
}) {
  return (
    <SubmitButton
      className="rounded-full border border-black bg-black px-5 py-2 text-[15px] font-medium text-white transition-colors hover:opacity-80 dark:border-white dark:bg-white dark:text-black"
      pendingClassName="opacity-60"
      pendingLabel={pendingLabel}
    >
      {children}
    </SubmitButton>
  );
}

export function SavedFlag({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <p className="rounded-lg border border-black/20 bg-black/5 px-3 py-2 text-sm opacity-80 dark:border-white/20 dark:bg-white/10">
      Saved. The public site picks this up on its next request.
    </p>
  );
}

export function EmptyRow({ children }: { children: ReactNode }) {
  return <p className="py-4 text-sm opacity-60">{children}</p>;
}

export function StatusPill({ published }: { published: boolean }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 font-mono text-xs ${
        published
          ? "border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
          : "border-black/25 opacity-60 dark:border-white/25"
      }`}
    >
      {published ? "published" : "draft"}
    </span>
  );
}
