import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { BackLink, Page, SectionHeading } from "@/components/page";
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
      {meta ? (
        <p className="mt-10 text-xs font-bold uppercase tracking-widest text-[#a37700] dark:text-yellow">
          {meta}
        </p>
      ) : null}
      <SectionHeading title={entry.title} as="h1" className="mt-3" />
      <div className="mt-10">
        <Article blocks={entry.content} />
      </div>
      <hr className="my-12 border-line" />
      <BackLink href={page.backHref || "/journey"} label={page.allLabel} />
    </Page>
  );
}
