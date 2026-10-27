import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { BackLink, Page, SectionHeading } from "@/components/page";
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
      {meta ? (
        <p className="mt-10 text-xs font-bold uppercase tracking-widest text-[#a37700] dark:text-yellow">
          {meta}
        </p>
      ) : null}
      <SectionHeading title={note.title} as="h1" className="mt-3" />
      <div className="mt-10">
        <Article blocks={note.content} />
      </div>
      <hr className="my-12 border-line" />
      <BackLink href={page.backHref || "/random"} label={page.allLabel} />
    </Page>
  );
}
