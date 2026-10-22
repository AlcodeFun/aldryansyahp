import Link from "next/link";

/** The one page frame every public route uses: left-aligned, ~60 characters wide. */
export function Page({
  children,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  as?: "div" | "article";
}) {
  return <Tag className="raw max-w-[60ch] break-words px-5 py-10">{children}</Tag>;
}

export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <>
      <h1 className="text-[2.6rem]">{title}</h1>
      {intro ? <p className="mt-4 text-[var(--muted)]">{intro}</p> : null}
    </>
  );
}

/** Date-first index: `2026.08.14  Title — excerpt`. */
export function IndexList({
  rows,
}: {
  rows: { key: string; href: string; meta?: string; title: string; text?: string }[];
}) {
  return (
    <ul className="mt-10 space-y-6">
      {rows.map((row) => (
        <li key={row.key} className="sketch sketch-hover px-6 py-5">
          {row.meta ? <p className="text-[16px] text-[var(--muted)]">{row.meta}</p> : null}
          <Link href={row.href} className="text-[1.4rem]">
            {row.title}
          </Link>
          {row.text ? <p className="mt-1 text-[var(--muted)]">{row.text}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <p>
      <Link href={href}>{label}</Link>
    </p>
  );
}
