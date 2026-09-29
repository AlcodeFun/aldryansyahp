import Link from "next/link";
import type { Metadata } from "next";
import { getJourneyEntries } from "@/lib/cms/journey";
import { getPageSettings } from "@/lib/cms/pages";
import { formatDate, renderMeta } from "@/lib/cms/format";
import { EmptyState } from "@/components/empty-state";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSettings("journey");
  return { title: page.seoTitle, description: page.seoDescription };
}

export default async function JourneyPage() {
  const [entries, page] = await Promise.all([getJourneyEntries(), getPageSettings("journey")]);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{page.heading}</h1>
      {page.intro ? (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/75 dark:text-white/75">
          {page.intro}
        </p>
      ) : null}

      <div className="mt-14">
        {entries.length === 0 ? (
          <EmptyState
            message={page.emptyMessage}
            defaultMessage="No entries yet."
            hint="Notes from the road will show up here once they are published."
          />
        ) : (
          entries.map((entry, i) => {
            const meta = renderMeta(page.listMetaFormat, {
              date: formatDate(entry.date),
              readMinutes: entry.readMinutes,
              title: entry.title,
            });
            return (
              <Link
                key={entry.id}
                href={`/journey/${entry.slug}`}
                className={`group block py-9 ${
                  i > 0 ? "border-t border-black dark:border-white" : ""
                }`}
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                  <span className="text-xl font-semibold tracking-tight group-hover:underline decoration-1 underline-offset-4">
                    {entry.title}
                  </span>
                  {meta ? (
                    <span className="font-mono text-sm opacity-60">{meta}</span>
                  ) : null}
                </div>
                <p className="mt-3 text-lg leading-relaxed text-black/70 dark:text-white/70">
                  {entry.excerpt}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
