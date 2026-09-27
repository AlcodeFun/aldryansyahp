import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A few projects, written the way they actually happened.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Projects
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/75 dark:text-white/75">
        A short list of things I have built. Each one is written the way it
        actually happened — as a story, not a case study.
      </p>

      <div className="mt-14">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`group block py-9 ${
              i > 0 ? "border-t border-black dark:border-white" : ""
            }`}
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <span className="text-xl font-semibold tracking-tight group-hover:underline decoration-1 underline-offset-4">
                {project.title}
              </span>
              <span className="font-mono text-sm opacity-60">
                {project.year}
              </span>
            </div>
            <p className="mt-3 text-lg leading-relaxed text-black/70 dark:text-white/70">
              {project.hook}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}