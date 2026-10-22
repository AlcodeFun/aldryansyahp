import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { BackLink, Page } from "@/components/page";
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
    <Page as="article">
      <BackLink href={page.backHref || "/random"} label={page.backLabel} />
      <h1 className="mt-6 text-[2rem] font-bold leading-tight">{note.title}</h1>
      {meta ? <p className="font-mono text-[15px]">{meta}</p> : null}
      <hr className="my-6" />
      <Article blocks={note.content} />
      <hr className="my-6" />
      <BackLink href={page.backHref || "/random"} label={page.allLabel} />
    </Page>
  );
}
