import Link from "next/link";
import { getJourneyEntriesAdmin } from "@/lib/cms/journey";
import { deleteJourneyEntry, toggleJourneyPublished } from "@/lib/admin/actions";
import { formatDate } from "@/lib/cms/format";
import {
  Card,
  EmptyRow,
  SavedFlag,
  StatusPill,
} from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHeader } from "@/components/admin/page-header";

export default async function AdminJourneyListPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, entries] = await Promise.all([
    searchParams,
    getJourneyEntriesAdmin(),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Journey"
        description="Long-form writing. Order is by date, newest first, and only published entries reach the public site."
        action={{ href: "/admin/journey/new", label: "New entry" }}
      />
      <SavedFlag show={saved === "1"} />

      <Card>
        {entries.length === 0 ? (
          <EmptyRow>No entries yet. Create the first one.</EmptyRow>
        ) : (
          <ul className="space-y-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-wrap items-start gap-4 rounded-lg border border-black/15 p-4 dark:border-white/15"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/journey/${entry.id}`}
                      className="text-lg font-semibold tracking-tight hover:underline"
                    >
                      {entry.title}
                    </Link>
                    <StatusPill published={entry.published} />
                  </div>
                  <p className="mt-1 font-mono text-xs opacity-60">
                    /{entry.slug} · {formatDate(entry.date)} · {entry.readMinutes} min
                  </p>
                  {entry.excerpt ? (
                    <p className="mt-2 line-clamp-2 text-sm opacity-70">
                      {entry.excerpt}
                    </p>
                  ) : null}
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <form action={toggleJourneyPublished}>
                    <input type="hidden" name="id" value={entry.id} />
                    {entry.published ? (
                      <input type="hidden" name="published" value="false" />
                    ) : null}
                    <SubmitButton
                      pendingLabel="…"
                      className="rounded-full border border-black/30 px-3 py-1 text-sm dark:border-white/30"
                    >
                      {entry.published ? "Unpublish" : "Publish"}
                    </SubmitButton>
                  </form>
                  {entry.published ? (
                    <Link
                      href={`/journey/${entry.slug}`}
                      className="rounded-full border border-black/30 px-3 py-1 text-sm dark:border-white/30"
                    >
                      View ↗
                    </Link>
                  ) : null}
                  <form action={deleteJourneyEntry}>
                    <input type="hidden" name="id" value={entry.id} />
                    <SubmitButton
                      pendingLabel="…"
                      className="rounded-full border border-red-500/50 px-3 py-1 text-sm text-red-600 dark:text-red-400"
                    >
                      Delete
                    </SubmitButton>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
