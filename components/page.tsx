import Link from "next/link";

/** The one page frame every public route uses: left-aligned, ~72 characters wide. */
export function Page({
  children,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  as?: "div" | "article";
}) {
  return <Tag className="raw max-w-[72ch] break-words px-4 py-8">{children}</Tag>;
}

export function PageTitle({ title, intro }: { title: string; intro?: string }) {
  return (
    <>
      <h1 className="text-[2rem] font-bold leading-tight">{title}</h1>
      {intro ? <p className="mt-2">{intro}</p> : null}
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
    <ul className="mt-8 space-y-4">
      {rows.map((row) => (
        <li key={row.key}>
          {row.meta ? <span className="font-mono text-[15px]">{row.meta} </span> : null}
          <Link href={row.href}>{row.title}</Link>
          {row.text ? <span> — {row.text}</span> : null}
        </li>
      ))}
    </ul>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <p className="font-mono text-[15px]">
      <Link href={href}>{label}</Link>
    </p>
  );
}
