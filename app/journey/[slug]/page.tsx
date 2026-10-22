import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { BackLink, Page } from "@/components/page";
import { getJourneyEntries, getJourneyEntryBySlug } from "@/lib/cms/journey";
import { getPageSettings } from "@/lib/cms/pages";
import { formatDate, renderMeta } from "@/lib/cms/format";

export async function generateStaticParams() {
  const entries = await getJourneyEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getJourneyEntryBySlug(slug);
  return entry ? { title: entry.title, description: entry.excerpt } : {};
}

export default async function JourneyPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [entry, page] = await Promise.all([getJourneyEntryBySlug(slug), getPageSettings("journey")]);

  if (!entry) {
    notFound();
  }

  const meta = renderMeta(page.detailMetaFormat, {
    date: formatDate(entry.date),
    readMinutes: entry.readMinutes,
    title: entry.title,
  });

  return (
    <Page as="article">
      <BackLink href={page.backHref || "/journey"} label={page.backLabel} />
      <h1 className="mt-6 text-[2rem] font-bold leading-tight">{entry.title}</h1>
      {meta ? <p className="font-mono text-[15px]">{meta}</p> : null}
      <hr className="my-6" />
      <Article blocks={entry.content} />
      <hr className="my-6" />
      <BackLink href={page.backHref || "/journey"} label={page.allLabel} />
    </Page>
  );
}
