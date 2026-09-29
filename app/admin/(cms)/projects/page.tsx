import Link from "next/link";
import { getProjectsAdmin } from "@/lib/cms/projects";
import { deleteProject, toggleProjectPublished } from "@/lib/admin/actions";
import { Card, EmptyRow, SavedFlag, StatusPill } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { PageHeader } from "@/components/admin/page-header";

export default async function AdminProjectsListPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ saved }, projects] = await Promise.all([
    searchParams,
    getProjectsAdmin(),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        description="Case studies. The index label is the small “01 / 03”-style number shown beside the title."
        action={{ href: "/admin/projects/new", label: "New project" }}
      />
      <SavedFlag show={saved === "1"} />

      <Card>
        {projects.length === 0 ? (
          <EmptyRow>No projects yet.</EmptyRow>
        ) : (
          <ul className="space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                className="flex flex-wrap items-start gap-4 rounded-lg border border-black/15 p-4 dark:border-white/15"
              >
                <span className="font-mono text-sm opacity-50">
                  {project.indexLabel || "—"}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-lg font-semibold tracking-tight hover:underline"
                    >
                      {project.title}
                    </Link>
                    <StatusPill published={project.published} />
                  </div>
                  <p className="mt-1 font-mono text-xs opacity-60">
                    /{project.slug}
                    {project.year ? ` · ${project.year}` : ""}
                    {project.role ? ` · ${project.role}` : ""}
                  </p>
                  {project.tags.length > 0 ? (
                    <p className="mt-2 font-mono text-xs opacity-60">
                      {project.tags.join(" · ")}
                    </p>
                  ) : null}
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <form action={toggleProjectPublished}>
                    <input type="hidden" name="id" value={project.id} />
                    {project.published ? (
                      <input type="hidden" name="published" value="false" />
                    ) : null}
                    <SubmitButton
                      pendingLabel="…"
                      className="rounded-full border border-black/30 px-3 py-1 text-sm dark:border-white/30"
                    >
                      {project.published ? "Unpublish" : "Publish"}
                    </SubmitButton>
                  </form>
                  {project.published ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="rounded-full border border-black/30 px-3 py-1 text-sm dark:border-white/30"
                    >
                      View ↗
                    </Link>
                  ) : null}
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
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
