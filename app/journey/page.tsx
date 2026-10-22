import type { Metadata } from "next";
import { getJourneyEntries } from "@/lib/cms/journey";
import { getPageSettings } from "@/lib/cms/pages";
import { formatDate, renderMeta } from "@/lib/cms/format";
import { EmptyState } from "@/components/empty-state";
import { IndexList, Page, PageTitle } from "@/components/page";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSettings("journey");
  return { title: page.seoTitle, description: page.seoDescription };
}

export default async function JourneyPage() {
  const [entries, page] = await Promise.all([getJourneyEntries(), getPageSettings("journey")]);

  return (
    <Page>
      <PageTitle title={page.heading} intro={page.intro} />
      {entries.length === 0 ? (
        <div className="mt-8">
          <EmptyState message={page.emptyMessage} defaultMessage="no entries yet." />
        </div>
      ) : (
        <IndexList
          rows={entries.map((entry) => ({
            key: entry.id,
            href: `/journey/${entry.slug}`,
            meta: renderMeta(page.listMetaFormat, {
              date: formatDate(entry.date),
              readMinutes: entry.readMinutes,
              title: entry.title,
            }),
            title: entry.title,
            text: entry.excerpt,
          }))}
        />
      )}
    </Page>
  );
}
