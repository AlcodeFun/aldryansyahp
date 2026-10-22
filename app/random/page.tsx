import type { Metadata } from "next";
import { getRandomNotes } from "@/lib/cms/notes";
import { getPageSettings } from "@/lib/cms/pages";
import { formatDate, renderMeta } from "@/lib/cms/format";
import { EmptyState } from "@/components/empty-state";
import { IndexList, Page, PageTitle } from "@/components/page";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSettings("random");
  return { title: page.seoTitle, description: page.seoDescription };
}

export default async function RandomPage() {
  const [notes, page] = await Promise.all([getRandomNotes(), getPageSettings("random")]);

  return (
    <Page>
      <PageTitle title={page.heading} intro={page.intro} />
      {notes.length === 0 ? (
        <div className="mt-8">
          <EmptyState message={page.emptyMessage} defaultMessage="no notes yet." />
        </div>
      ) : (
        <IndexList
          rows={notes.map((note) => ({
            key: note.id,
            href: `/random/${note.slug}`,
            meta: renderMeta(page.listMetaFormat, {
              date: formatDate(note.date),
              title: note.title,
            }),
            title: note.title,
            text: note.text,
          }))}
        />
      )}
    </Page>
  );
}
