import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
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
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href={page.backHref || "/journey"}
        className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
      >
        {page.backLabel}
      </Link>

      <div className="mt-10 max-w-xl">
        {meta ? <p className="font-mono text-sm opacity-60">{meta}</p> : null}
        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {entry.title}
        </h1>
      </div>

      <div className="mt-10 max-w-xl">
        <Article blocks={entry.content} />
      </div>

      <div className="mt-16 border-t border-black pt-8 dark:border-white">
        <Link
          href={page.backHref || "/journey"}
          className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
        >
          {page.allLabel}
        </Link>
      </div>
    </article>
  );
}
