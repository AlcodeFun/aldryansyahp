import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { BackLink, Page, SectionHeading } from "@/components/page";
import { ProjectGallery } from "@/components/project-gallery";
import { getProjects, getProjectBySlug } from "@/lib/cms/projects";
import { getPageSettings } from "@/lib/cms/pages";
import { renderMeta } from "@/lib/cms/format";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return project ? { title: project.title, description: project.hook } : {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, page] = await Promise.all([
    getProjectBySlug(slug),
    getPageSettings("projects"),
  ]);

  if (!project) {
    notFound();
  }

  const meta = renderMeta(page.detailMetaFormat, {
    year: project.year,
    role: project.role,
    tags: project.tags.join(" · "),
    indexLabel: project.indexLabel,
  });

  return (
    <Page as="article">
      <BackLink href={page.backHref || "/projects"} label={page.backLabel} />
      {meta ? (
        <p className="mt-10 text-xs font-bold uppercase tracking-widest text-[#a37700] dark:text-yellow">
          {meta}
        </p>
      ) : null}
      <SectionHeading title={project.title} as="h1" className="mt-3" />
      {project.repoUrl ? (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-navy px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white dark:border-yellow dark:text-yellow dark:hover:bg-yellow dark:hover:text-navy"
        >
          Source code ↗
        </a>
      ) : null}
      <div className="mt-10">
        <Article blocks={project.content} />
      </div>
      {project.gallery.length > 0 ? (
        <div className="mt-14">
          <ProjectGallery images={project.gallery} />
        </div>
      ) : null}
      <hr className="my-12 border-line" />
      <BackLink href={page.backHref || "/projects"} label={page.allLabel} />
    </Page>
  );
}
