import Link from "next/link";
import type { Accent } from "@/lib/portfolio";

export const accentBg: Record<Accent, string> = {
  navy: "bg-navy",
  coral: "bg-coral",
  teal: "bg-teal",
  forest: "bg-forest",
  plum: "bg-plum",
  crimson: "bg-crimson",
  yellow: "bg-yellow",
  sky: "bg-sky",
};

export const accentText: Record<Accent, string> = {
  navy: "text-navy dark:text-yellow",
  coral: "text-coral",
  teal: "text-teal dark:text-[#5cc3d6]",
  forest: "text-forest dark:text-[#5fd08f]",
  plum: "text-plum dark:text-[#b593f5]",
  crimson: "text-crimson",
  yellow: "text-[#a37700] dark:text-yellow",
  sky: "text-sky",
};

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Deck-style title: heavy Montserrat with a short accent bar underneath. */
export function SectionHeading({
  title,
  accent = "yellow",
  as: Tag = "h2",
  className = "",
}: {
  title: string;
  accent?: Accent;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      <Tag
        className={`font-extrabold tracking-tight text-heading ${
          Tag === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </Tag>
      <span aria-hidden className={`mt-4 block h-1.5 w-16 ${accentBg[accent]}`} />
    </div>
  );
}

/** Frame for the inner pages (lists, articles, 404). */
export function Page({
  children,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  as?: "div" | "article";
}) {
  return (
    <Tag className="mx-auto w-full max-w-3xl break-words px-5 py-14 sm:px-8 sm:py-20">
      {children}
    </Tag>
  );
}

export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <>
      <SectionHeading title={title} as="h1" />
      {intro ? <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{intro}</p> : null}
    </>
  );
}

export function IndexList({
  rows,
}: {
  rows: { key: string; href: string; meta?: string; title: string; text?: string }[];
}) {
  return (
    <ul className="mt-12 space-y-5">
      {rows.map((row) => (
        <li key={row.key}>
          <Link
            href={row.href}
            className="group block border-t-4 border-navy bg-surface px-6 py-5 shadow-sm ring-1 ring-line transition hover:-translate-y-0.5 hover:border-yellow hover:shadow-md dark:border-yellow"
          >
            {row.meta ? (
              <p className="text-xs font-bold uppercase tracking-widest text-[#a37700] dark:text-yellow">
                {row.meta}
              </p>
            ) : null}
            <p className="mt-1 font-display text-xl font-bold text-heading group-hover:underline">
              {row.title}
            </p>
            {row.text ? <p className="mt-2 leading-relaxed text-muted">{row.text}</p> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <p>
      <Link href={href} className="text-sm font-semibold text-muted hover:text-heading hover:underline">
        {label}
      </Link>
    </p>
  );
}
