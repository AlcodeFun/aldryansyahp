import Link from "next/link";
import type { ReactNode } from "react";

/** Heading + "new" link used at the top of every collection screen. */
export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl opacity-70">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="rounded-full border border-black bg-black px-5 py-2 text-[15px] font-medium text-white transition-colors hover:opacity-80 dark:border-white dark:bg-white dark:text-black"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-mono text-sm opacity-60 hover:opacity-100 hover:underline">
      {children}
    </Link>
  );
}
