import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.hook } : {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/projects"
        className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
      >
        ← back to projects
      </Link>

      <div className="mt-10 max-w-xl">
        <p className="font-mono text-sm opacity-60">
          {project.year} · {project.role} · {project.tags.join(" · ")}
        </p>
        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {project.title}
        </h1>
      </div>

      <div className="mt-10 max-w-xl">
        <Article blocks={project.content} />
      </div>

      <div className="mt-16 border-t border-black pt-8 dark:border-white">
        <Link
          href="/projects"
          className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
        >
          ← all projects
        </Link>
      </div>
    </article>
  );
}