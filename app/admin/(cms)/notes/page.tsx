import Link from "next/link";
import { getRandomNotesAdmin } from "@/lib/cms/notes";
import { deleteRandomNote, toggleRandomNotePublished } from "@/lib/admin/actions";
import { formatDate } from "@/lib/cms/format";
import { Card, EmptyRow, SavedFlag, StatusPill } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHeader } from "@/components/admin/page-header";

export default async function AdminNotesListPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, notes] = await Promise.all([
    searchParams,
    getRandomNotesAdmin(),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Random notes"
        description="Short dispatches. The public page picks a random published note."
        action={{ href: "/admin/notes/new", label: "New note" }}
      />
      <SavedFlag show={saved === "1"} />

      <Card>
        {notes.length === 0 ? (
          <EmptyRow>No notes yet.</EmptyRow>
        ) : (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li
                key={note.id}
                className="flex flex-wrap items-start gap-4 rounded-lg border border-black/15 p-4 dark:border-white/15"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/notes/${note.id}`}
                      className="text-lg font-semibold tracking-tight hover:underline"
                    >
                      {note.title}
                    </Link>
                    <StatusPill published={note.published} />
                  </div>
                  <p className="mt-1 font-mono text-xs opacity-60">
                    /{note.slug} · {formatDate(note.date)}
                  </p>
                  {note.text ? (
                    <p className="mt-2 line-clamp-2 text-sm opacity-70">{note.text}</p>
                  ) : null}
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <form action={toggleRandomNotePublished}>
                    <input type="hidden" name="id" value={note.id} />
                    {note.published ? (
                      <input type="hidden" name="published" value="false" />
                    ) : null}
                    <SubmitButton
                      pendingLabel="…"
                      className="rounded-full border border-black/30 px-3 py-1 text-sm dark:border-white/30"
                    >
                      {note.published ? "Unpublish" : "Publish"}
                    </SubmitButton>
                  </form>
                  <form action={deleteRandomNote}>
                    <input type="hidden" name="id" value={note.id} />
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
