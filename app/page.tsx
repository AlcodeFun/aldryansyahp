import Link from "next/link";
import { getHome } from "@/lib/cms/home";
import { getSite, getStrings } from "@/lib/cms/site";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import type { EducationEntry, HomeSection, TechItem } from "@/lib/cms/types";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-black dark:border-white">
      <div className="py-12 sm:py-14">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function EducationList({ entries }: { entries: EducationEntry[] }) {
  return (
    <ul className="space-y-8">
      {entries.map((item) => (
        <li key={item.id} className="grid gap-1 sm:grid-cols-[190px_1fr]">
          <span className="font-mono text-sm opacity-60">{item.period}</span>
          <div>
            <p className="text-lg font-semibold tracking-tight">{item.degree}</p>
            <p className="mt-0.5 opacity-70">{item.school}</p>
            {item.gpa ? (
              <p className="mt-0.5 opacity-70">
                GPA: {item.gpa}
                {item.predicate ? ` (${item.predicate})` : ""}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

function TechChips({ items }: { items: TechItem[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2.5">
      {items.map((item) => (
        <span
          key={item.id}
          className="group inline-flex items-center gap-2.5 rounded-full border border-black/60 px-4 py-1.5 font-mono text-[15px] transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/60 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
        >
          <span
            aria-hidden
            className="h-1.5 w-1.5 rotate-45 bg-black/60 transition-colors group-hover:bg-white dark:bg-white/60 dark:group-hover:bg-black"
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function Contact({
  email,
  github,
  linkedin,
  strings,
}: {
  email: string;
  github: string;
  linkedin: string;
  strings: Record<string, string>;
}) {
  return (
    <>
      <div className="mt-2 flex items-center gap-3">
        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/60 transition-all duration-300 hover:bg-black hover:text-white hover:border-black dark:border-white/60 dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        ) : null}
        {linkedin ? (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/60 transition-all duration-300 hover:bg-black hover:text-white hover:border-black dark:border-white/60 dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        ) : null}
        {email ? (
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/60 transition-all duration-300 hover:bg-black hover:text-white hover:border-black dark:border-white/60 dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
          >
            <MailIcon className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-10">
        {email ? (
          <a
            href={`mailto:${email}`}
            className="text-xl underline decoration-1 underline-offset-4 hover:opacity-70"
          >
            {email}
          </a>
        ) : null}
        <div className="flex items-center gap-6 font-mono text-sm opacity-70">
          <Link
            href={strings["home.random_notes_href"] ?? "/random"}
            className="hover:underline"
          >
            {strings["home.random_notes_link"] ?? "random notes"}
          </Link>
          <Link href={strings["home.projects_href"] ?? "/projects"} className="hover:underline">
            {strings["home.projects_link"] ?? "projects"}
          </Link>
        </div>
      </div>
    </>
  );
}

function renderSection(
  section: HomeSection,
  ctx: {
    education: EducationEntry[];
    tech: TechItem[];
    site: { email: string; github: string; linkedin: string };
    strings: Record<string, string>;
  },
) {
  switch (section.key) {
    case "educated_at":
      return <EducationList entries={ctx.education} />;
    case "tech_experiences":
      return <TechChips items={ctx.tech} />;
    case "reach_me":
      return <Contact {...ctx.site} strings={ctx.strings} />;
    default:
      return section.body ? (
        <p className="text-lg text-justify leading-relaxed text-black/85 dark:text-white/85">
          {section.body}
        </p>
      ) : null;
  }
}

export default async function Home() {
  const [{ hero, sections, education, tech }, site, strings] = await Promise.all([
    getHome(),
    getSite(),
    getStrings(),
  ]);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <p className="font-mono text-sm opacity-60">
        {hero.updatedLabel || strings["home.last_updated_prefix"]}{" "}
        {new Date().getFullYear()}
      </p>
      <h1 className="mt-8 text-[44px] font-semibold leading-[0.95] tracking-tight sm:text-[68px]">
        {site.name}
      </h1>
      <h2 className="mt-6 max-w-xl text-[1.5rem] italic leading-snug text-black/80 dark:text-white/80">
        &ldquo;{hero.lineOne}
        <br />
        {hero.greeting}{" "}
        <b className="text-bold text-[2.1rem]">{site.nickname} </b>&rdquo;
        <br /> <br />
        <span className="text-[1.5rem]">
          {" "}
          {hero.experiencePrefix} {site.role}
        </span>{" "}
      </h2>

      <div className="mt-16">
        {sections.map((section) => (
          <Section key={section.id} title={section.title}>
            {renderSection(section, { education, tech, site, strings })}
          </Section>
        ))}
      </div>
    </div>
  );
}
