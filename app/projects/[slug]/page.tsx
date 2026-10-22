import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { BackLink, Page } from "@/components/page";
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
      <h1 className="mt-6 text-[2.6rem]">{project.title}</h1>
      {meta ? <p className="mt-2 text-[16px] text-[var(--muted)]">{meta}</p> : null}
      {project.repoUrl ? (
        <p className="mt-1">
          source: <a href={project.repoUrl}>{project.repoUrl.replace(/^https?:\/\//, "")}</a>
        </p>
      ) : null}
      <hr className="my-6" />
      <Article blocks={project.content} />
      <ProjectGallery images={project.gallery} />
      <hr className="my-6" />
      <BackLink href={page.backHref || "/projects"} label={page.allLabel} />
    </Page>
  );
}
