import type { Metadata } from "next";
import { getProjects } from "@/lib/cms/projects";
import { getPageSettings } from "@/lib/cms/pages";
import { renderMeta } from "@/lib/cms/format";
import { EmptyState } from "@/components/empty-state";
import { IndexList, Page, PageTitle } from "@/components/page";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageSettings("projects");
  return { title: page.seoTitle, description: page.seoDescription };
}

export default async function ProjectsPage() {
  const [projects, page] = await Promise.all([getProjects(), getPageSettings("projects")]);

  return (
    <Page>
      <PageTitle title={page.heading} intro={page.intro} />
      {projects.length === 0 ? (
        <div className="mt-8">
          <EmptyState message={page.emptyMessage} defaultMessage="no projects yet." />
        </div>
      ) : (
        <IndexList
          rows={projects.map((project) => ({
            key: project.id,
            href: `/projects/${project.slug}`,
            meta: renderMeta(page.listMetaFormat, {
              year: project.year,
              role: project.role,
              tags: project.tags.join(" · "),
              indexLabel: project.indexLabel,
            }),
            title: project.title,
            text: project.hook,
          }))}
        />
      )}
    </Page>
  );
}
