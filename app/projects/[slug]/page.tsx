import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { GithubIcon } from "@/components/icons";
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
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href={page.backHref || "/projects"}
        className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
      >
        {page.backLabel}
      </Link>

      <div className="mt-10 max-w-xl">
        {meta ? <p className="font-mono text-sm opacity-60">{meta}</p> : null}
        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/30 px-3 py-1.5 font-mono text-sm transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/30 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
          >
            <GithubIcon className="h-4 w-4" />
            View source on GitHub
          </a>
        ) : null}
      </div>

      <div className="mt-10 max-w-xl">
        <Article blocks={project.content} />
      </div>

      <div className="mt-16 max-w-3xl">
        <ProjectGallery images={project.gallery} />
      </div>

      <div className="mt-16 border-t border-black pt-8 dark:border-white">
        <Link
          href={page.backHref || "/projects"}
          className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
        >
          {page.allLabel}
        </Link>
      </div>
    </article>
  );
}
