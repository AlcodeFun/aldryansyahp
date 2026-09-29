import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { getRandomNotes, getRandomNoteBySlug } from "@/lib/cms/notes";
import { getPageSettings } from "@/lib/cms/pages";
import { formatDate, renderMeta } from "@/lib/cms/format";

export async function generateStaticParams() {
  const notes = await getRandomNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await getRandomNoteBySlug(slug);
  return note ? { title: note.title, description: note.text } : {};
}

export default async function RandomNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [note, page] = await Promise.all([
    getRandomNoteBySlug(slug),
    getPageSettings("random"),
  ]);

  if (!note) {
    notFound();
  }

  const meta = renderMeta(page.detailMetaFormat, {
    date: formatDate(note.date),
    title: note.title,
  });

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href={page.backHref || "/random"}
        className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
      >
        {page.backLabel}
      </Link>

      <div className="mt-10 max-w-xl">
        {meta ? <p className="font-mono text-sm opacity-60">{meta}</p> : null}
        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {note.title}
        </h1>
      </div>

      <div className="mt-10 max-w-xl">
        <Article blocks={note.content} />
      </div>

      <div className="mt-16 border-t border-black pt-8 dark:border-white">
        <Link
          href={page.backHref || "/random"}
          className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
        >
          {page.allLabel}
        </Link>
      </div>
    </article>
  );
}
