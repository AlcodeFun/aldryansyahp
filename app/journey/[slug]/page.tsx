import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { journeyEntries, getJourneyEntry } from "@/lib/content";
import { formatDate } from "@/lib/site";

export function generateStaticParams() {
  return journeyEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJourneyEntry(slug);
  return entry ? { title: entry.title, description: entry.excerpt } : {};
}

export default async function JourneyPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getJourneyEntry(slug);

  if (!entry) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/journey"
        className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
      >
        ← back to the journal
      </Link>

      <div className="mt-10 max-w-xl">
        <p className="font-mono text-sm opacity-60">
          {formatDate(entry.date)} · {entry.readMinutes} min read
        </p>
        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {entry.title}
        </h1>
      </div>

      <div className="mt-10 max-w-xl">
        <Article blocks={entry.content} />
      </div>

      <div className="mt-16 border-t border-black pt-8 dark:border-white">
        <Link
          href="/journey"
          className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
        >
          ← all entries
        </Link>
      </div>
    </article>
  );
}