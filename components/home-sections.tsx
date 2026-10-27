import Image from "next/image";
import Link from "next/link";
import { ProjectGallery } from "@/components/project-gallery";
import { Container, SectionHeading, accentBg, accentText } from "@/components/page";
import {
  about,
  achievements,
  certifications,
  currentRole,
  education,
  experience,
  otherExperience,
  profile,
  projects,
  techStack,
  visualDesign,
} from "@/lib/portfolio";

/** Renders `**bold**` spans from the content file. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-bold text-heading">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.18em] ${className}`}>{children}</p>
  );
}

function Square({ className = "bg-coral" }: { className?: string }) {
  return <span aria-hidden className={`mt-2 h-2 w-2 shrink-0 ${className}`} />;
}

function SectionShell({
  id,
  title,
  accent,
  children,
  className = "",
}: {
  id: string;
  title: string;
  accent?: Parameters<typeof SectionHeading>[0]["accent"];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-20 py-16 sm:py-24 ${className}`}>
      <Container>
        <div id={`${id}-title`}>
          <SectionHeading title={title} accent={accent} />
        </div>
        <div className="mt-10 sm:mt-12">{children}</div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- Hero */

function Stripes() {
  return (
    <div aria-hidden className="absolute inset-y-0 right-0 hidden w-24 lg:flex xl:w-32">
      <span className="w-1/4 bg-navy-2" />
      <span className="w-1/6" />
      <span className="flex-1 bg-yellow" />
    </div>
  );
}

function CodeWindow() {
  const rows = [
    ["w-6 bg-[#e8577b]", "w-14 bg-[#4cb4e8]", "w-7 bg-white/80"],
    ["ml-4 w-10 bg-[#5fbf86]", "w-16 bg-yellow"],
    ["ml-4 w-9 bg-[#4cb4e8]", "w-12 bg-white/80", "w-7 bg-[#e8577b]"],
    ["ml-8 w-18 bg-yellow", "w-9 bg-[#5fbf86]"],
    ["ml-4 w-12 bg-white/80"],
    ["w-6 bg-[#e8577b]", "w-10 bg-[#4cb4e8]"],
  ];
  return (
    <div aria-hidden className="w-64 rounded-lg border border-navy-2 bg-[#0c1a5a] shadow-xl">
      <div className="flex items-center gap-1.5 border-b border-navy-2 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] text-white/50">portfolio.vue</span>
      </div>
      <div className="space-y-2.5 p-3">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-1.5 w-2 bg-navy-2" />
            {row.map((c, j) => (
              <span key={j} className={`h-1.5 rounded-full ${c}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Hero({ rhyme }: { rhyme: { line: string; greeting: string } }) {
  const links = [
    { label: profile.email, href: `mailto:${profile.email}` },
    { label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { label: profile.github.replace(/^https?:\/\//, ""), href: profile.github },
    { label: profile.website.replace(/^https?:\/\//, ""), href: profile.website },
    { label: "LinkedIn", href: profile.linkedin },
  ];

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Stripes />
      <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_auto] lg:pr-40">
        <div>
          <Eyebrow className="text-white/80">{profile.eyebrow}</Eyebrow>
          <span aria-hidden className="mt-4 block h-1.5 w-20 bg-yellow" />
          <h1 className="mt-10 max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-6 text-lg sm:text-xl">
            <span className="font-display font-bold text-yellow">{profile.role}</span>
            <span className="mx-3 text-white/50">|</span>
            <span className="text-white/90">{profile.stackLine}</span>
          </p>
          <p className="mt-6 max-w-xl border-l-4 border-yellow pl-4 text-lg italic text-white/85">
            {rhyme.line},
            <br />
            {rhyme.greeting}
          </p>
          <ul className="mt-8 flex max-w-2xl flex-wrap gap-x-5 gap-y-2 text-sm text-white/85 sm:text-base">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="underline decoration-white/40 underline-offset-4 hover:text-yellow hover:decoration-yellow"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="text-white/70">{profile.location}</li>
          </ul>
        </div>

        <div className="relative mx-auto flex flex-col items-center gap-8">
          <span aria-hidden className="absolute -left-4 top-2 rounded-full bg-yellow px-3 py-1 font-mono text-xs font-bold text-navy">
            &lt;/&gt;
          </span>
          <div className="rounded-full border-4 border-yellow p-2">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={240}
              height={240}
              priority
              className="h-52 w-52 rounded-full bg-white object-cover sm:h-60 sm:w-60"
            />
          </div>
          <span aria-hidden className="absolute -right-4 top-52 rounded-full bg-[#4cc3f7] px-3 py-1 font-mono text-xs font-bold text-navy sm:top-60">
            {"{ }"}
          </span>
          <div className="hidden sm:block">
            <CodeWindow />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- About */

export function About() {
  return (
    <SectionShell id="about" title="About Me" accent="coral">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-between gap-8">
          <ul className="space-y-6 text-lg leading-relaxed">
            {about.points.map((point) => (
              <li key={point} className="flex gap-4">
                <Square />
                <span>
                  <Rich text={point} />
                </span>
              </li>
            ))}
          </ul>
          <p className="bg-soft px-5 py-4">
            <span className="mr-2 font-display font-bold text-heading">Languages</span>
            {about.languages}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {about.stats.map((stat) => (
            <div
              key={stat.value}
              className={`border-l-8 border-coral p-6 shadow-sm ${
                stat.dark ? "bg-teal text-white" : "bg-surface ring-1 ring-line"
              }`}
            >
              <p
                className={`font-display text-5xl font-extrabold ${
                  stat.dark ? "text-coral" : "text-teal dark:text-white"
                }`}
              >
                {stat.value}
              </p>
              <p className={`mt-3 ${stat.dark ? "text-white/90" : "text-muted"}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ----------------------------------------------------------- Education */

function HighlightIcon({ name }: { name: "trophy" | "medal" | "globe" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
    "aria-hidden": true,
  };
  if (name === "trophy")
    return (
      <svg {...common}>
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" />
      </svg>
    );
  if (name === "medal")
    return (
      <svg {...common}>
        <path d="M8 3l2 6M16 3l-2 6" />
        <circle cx="12" cy="15" r="5" />
        <circle cx="12" cy="15" r="2" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function Education() {
  return (
    <SectionShell id="education" title="Education" className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col bg-[#0b2a6b] p-8 text-white sm:p-10">
          <Eyebrow className="text-yellow">Education</Eyebrow>
          <h3 className="mt-2 text-3xl font-bold">{education.school}</h3>
          <p className="mt-1 text-white/80">
            {education.place} · {education.period}
          </p>
          <p className="mt-6 text-lg leading-snug">{education.degree}</p>
          <div className="min-h-10 flex-1" />
          <div className="border-t border-white/20 pt-8">
            <p>
              <span className="font-display text-6xl font-extrabold text-yellow">{education.gpa}</span>
              <span className="ml-3 text-lg text-white/80">{education.gpaOutOf}</span>
            </p>
            <p className="mt-2">{education.honor}</p>
          </div>
        </div>
        <ul className="flex flex-col justify-center divide-y divide-line border-b border-line">
          {education.highlights.map((item) => (
            <li key={item.title} className="flex items-center gap-5 py-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-soft text-heading">
                <HighlightIcon name={item.icon} />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-heading">{item.title}</p>
                <p className="text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------------------------------- Tech stack */

export function TechStack() {
  return (
    <SectionShell id="tech-stack" title="Tech Stack" accent="sky">
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.map((group) => (
          <li key={group.label} className="border-t-[6px] border-sky bg-surface p-6 shadow-sm ring-1 ring-line">
            <Eyebrow className="text-[#4a55a2] dark:text-[#a9b4ff]">{group.label}</Eyebrow>
            <p className="mt-3 text-lg leading-snug">{group.items}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/* -------------------------------------------------------- Current role */

export function CurrentRole() {
  return (
    <SectionShell id="current-role" title="Current Role" accent="yellow" className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
        <div className="bg-forest p-8 text-white sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Eyebrow className="text-yellow">Current role</Eyebrow>
              <h3 className="mt-2 text-2xl font-bold">{currentRole.title}</h3>
              <p className="mt-1 text-white/80">{currentRole.meta}</p>
            </div>
            <Image src={currentRole.logo} alt={currentRole.company} width={48} height={48} className="rounded-xl" />
          </div>
          <div className="mt-8 space-y-8 border-t border-white/20 pt-8">
            {currentRole.stats.map((stat) => (
              <div key={stat.value}>
                <p className="font-display text-5xl font-extrabold text-yellow">{stat.value}</p>
                <p className="mt-1 text-white/90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <ol className="divide-y divide-line">
          {currentRole.work.map((item, i) => (
            <li key={item.title} className="flex gap-5 py-6 first:pt-0">
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display font-bold ${
                  i === 0 ? "bg-yellow text-navy" : "bg-[#d5efdc] text-forest"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-bold text-forest dark:text-[#5fd08f]">{item.title}</h3>
                <p className="mt-1 text-lg leading-relaxed">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------------------------------- Experience */

export function Experience() {
  return (
    <SectionShell id="experience" title="Experience" accent="teal">
      <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {experience.map((job, i) => {
          const last = i === experience.length - 1;
          return (
            <li key={job.company} className="flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <p className={`text-sm font-bold uppercase tracking-wide ${accentText[job.accent]}`}>
                  {job.period}
                </p>
                <Image src={job.logo} alt={`${job.company} logo`} width={36} height={36} className="h-9 w-9 rounded-md object-contain" />
              </div>
              <div className="relative my-4 flex items-center">
                <span className={`relative z-10 h-4 w-4 rounded-full ring-4 ring-bg ${accentBg[job.accent]}`} />
                <span aria-hidden className="h-0.5 flex-1 bg-line" />
              </div>
              <article
                className={`flex flex-1 flex-col border-t-[6px] p-6 shadow-sm ${
                  last ? "border-[#5fd08f] bg-forest text-white" : `bg-surface ring-1 ring-line ${borderFor(job.accent)}`
                }`}
              >
                <h3 className={`text-xl font-bold ${last ? "" : "text-heading"}`}>{job.title}</h3>
                <p className={`mt-1 font-display font-bold ${last ? "text-yellow" : accentText[job.accent]}`}>
                  {job.company}
                </p>
                <p className={`text-sm ${last ? "text-white/80" : "text-muted"}`}>{job.meta}</p>
                <ul className={`mt-5 space-y-3 border-t pt-5 ${last ? "border-white/20" : "border-line"}`}>
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <Square className={last ? "bg-yellow" : accentBg[job.accent]} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 lg:mt-auto lg:pt-6">
                  {job.photo ? (
                    <figure className="overflow-hidden rounded-lg bg-soft">
                      <Image
                        src={job.photo.src}
                        alt={job.photo.caption}
                        width={480}
                        height={320}
                        className="aspect-[3/2] w-full object-cover"
                      />
                      <figcaption className="px-4 py-3 text-center">
                        <span className="block font-bold text-heading">{job.photo.caption}</span>
                        <span className="text-sm text-muted">{job.photo.sub}</span>
                      </figcaption>
                    </figure>
                  ) : job.note ? (
                    <div className="rounded-lg bg-white/10 px-4 py-6 text-center">
                      <p className="font-display text-lg font-bold">{job.note.title}</p>
                      <p className="mt-1 text-sm text-white/80">{job.note.text}</p>
                    </div>
                  ) : null}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}

function borderFor(accent: (typeof experience)[number]["accent"]) {
  return {
    navy: "border-navy",
    coral: "border-coral",
    teal: "border-teal",
    forest: "border-forest",
    plum: "border-plum",
    crimson: "border-crimson",
    yellow: "border-yellow",
    sky: "border-sky",
  }[accent];
}

export function OtherExperience() {
  return (
    <SectionShell id="other-experience" title="Other Experience" accent="crimson" className="bg-surface">
      <div className="grid gap-6 md:grid-cols-2">
        {otherExperience.map((item) => (
          <article key={item.title} className="flex flex-col border-t-[6px] border-crimson shadow-sm ring-1 ring-line">
            <div className="bg-[#1f3358] px-7 py-6 text-white">
              <Eyebrow className="text-crimson">{item.kind}</Eyebrow>
              <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
              <p className="text-white/80">{item.subtitle}</p>
            </div>
            <div className="flex-1 bg-surface px-7 py-6">
              <p className="font-bold text-muted">{item.meta}</p>
              <ul className="mt-4 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <Square className="bg-crimson" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------ Projects */

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-20">
      <div className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-24 lg:flex xl:w-32">
          <span className="w-1/4 bg-navy-2" />
          <span className="w-1/6" />
          <span className="flex-1 bg-yellow" />
        </div>
        <Container>
          <span aria-hidden className="block h-1.5 w-20 bg-yellow" />
          <h2 id="projects-title" className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Selected Projects
          </h2>
          <p className="mt-4 text-lg text-white/80">Software projects, 2023–2026</p>
        </Container>
      </div>

      {projects.map((project, i) => (
        <article
          key={project.slug}
          aria-labelledby={`${project.slug}-title`}
          className={`py-16 sm:py-20 ${i % 2 === 1 ? "bg-surface" : ""}`}
        >
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr]">
            <div className="flex flex-col">
              <p className="text-sm font-bold uppercase tracking-wide text-[#a37700] dark:text-yellow">
                Project {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                <span className="mx-2">·</span>
                {project.year}
                {project.org ? ` · ${project.org}` : ""}
              </p>
              <h3 id={`${project.slug}-title`} className={`mt-2 text-3xl font-extrabold leading-tight ${accentText[project.accent]}`}>
                {project.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed">{project.description}</p>

              <Eyebrow className="mt-8 text-muted">Tech stack</Eyebrow>
              <ul className="mt-3 space-y-3">
                {project.stack.map((tech) => (
                  <li key={tech.name} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft font-display text-sm font-bold ${accentText[project.accent]}`}
                    >
                      {tech.name.charAt(0)}
                    </span>
                    <span>
                      <span className={`block font-display font-bold ${accentText[project.accent]}`}>{tech.name}</span>
                      <span className="text-sm text-muted">{tech.role}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-navy px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white dark:border-yellow dark:text-yellow dark:hover:bg-yellow dark:hover:text-navy"
                  >
                    Source code ↗
                  </a>
                ) : null}
                {project.caseStudy ? (
                  <Link
                    href={project.caseStudy}
                    className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-navy-2 dark:bg-yellow dark:text-navy"
                  >
                    Read the story →
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="space-y-5">
              {project.problem && project.solution ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "The problem", tone: "text-[#a37700] dark:text-yellow", ...project.problem },
                    { label: "The solution", tone: "text-sky", ...project.solution },
                  ].map((box) => (
                    <div key={box.label} className="rounded-xl bg-surface p-6 shadow-sm ring-1 ring-line">
                      <Eyebrow className={box.tone}>{box.label}</Eyebrow>
                      <p className="mt-2 font-display text-lg font-bold text-heading">{box.title}</p>
                      <ul className="mt-3 space-y-2 text-muted">
                        {box.points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span aria-hidden className="text-sky">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
              <ProjectGallery
                images={project.shots}
                heading={null}
                grid={
                  project.slug === "foodish-app"
                    ? "grid-cols-3 sm:grid-cols-6"
                    : project.slug === "janlink"
                      ? "grid-cols-2 sm:grid-cols-4"
                      : "grid-cols-2 sm:grid-cols-3"
                }
                aspect={
                  project.slug === "foodish-app"
                    ? "aspect-[9/19]"
                    : project.slug === "janlink"
                      ? "aspect-[3/4]"
                      : "aspect-[16/10]"
                }
              />
            </div>
          </Container>
        </article>
      ))}
    </section>
  );
}

/* ------------------------------------------------------- Visual design */

export function VisualDesign() {
  return (
    <SectionShell id="visual-design" title="Visual Design" accent="crimson">
      <div className="space-y-10">
        {visualDesign.map((group, i) => (
          <div key={group.title} className="grid gap-5 lg:grid-cols-[0.6fr_1.4fr]">
            <div className={`flex flex-col border-t-[6px] border-coral p-7 text-white ${i === 2 ? "bg-teal" : i === 3 ? "bg-[#21114a]" : "bg-plum"}`}>
              <Eyebrow className="text-coral">
                Visual design · {String(i + 1).padStart(2, "0")} / {String(visualDesign.length).padStart(2, "0")}
              </Eyebrow>
              <h3 className="mt-3 text-2xl font-bold">{group.title}</h3>
              <p className="mt-3 text-white/85">{group.description}</p>
              <dl className="mt-8 space-y-3 text-sm lg:mt-auto lg:pt-8">
                <div>
                  <dt className="font-bold uppercase tracking-wide text-coral">Client</dt>
                  <dd className="text-white/85">{group.client}</dd>
                </div>
                {group.year ? (
                  <div>
                    <dt className="font-bold uppercase tracking-wide text-coral">Year</dt>
                    <dd className="text-white/85">{group.year}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <ProjectGallery
              images={group.works.map((w) => ({ src: w.src, alt: w.title, caption: `${w.title} · ${w.meta}` }))}
              heading={null}
              grid={group.works.length === 1 ? "grid-cols-1" : group.works.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2"}
              aspect={group.portrait ? "aspect-[3/4]" : group.works.length === 1 ? "aspect-[16/10]" : "aspect-square"}
              fit={group.portrait || group.works.length === 1 ? "contain" : "cover"}
            />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* --------------------------------------------- Certifications & awards */

export function Certifications() {
  const groups = [
    { label: "Certifications", items: certifications },
    { label: "Achievements", items: achievements },
  ];
  return (
    <SectionShell id="certifications" title="Certifications & Achievements" accent="yellow" className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
        {groups.map((group) => (
          <div key={group.label}>
            <Eyebrow className="text-[#a37700] dark:text-yellow">{group.label}</Eyebrow>
            <ul className={`mt-4 grid gap-4 ${group.items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
              {group.items.map((item) => (
                <li key={item.title} className="flex flex-col bg-bg p-4 ring-1 ring-line">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-soft">
                    <Image src={item.src} alt={`${item.title} ${item.kind}`} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-contain" />
                  </div>
                  <p className="mt-4 font-display font-bold leading-snug text-heading">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.meta}</p>
                  <a
                    href={item.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm font-bold text-navy underline underline-offset-4 hover:text-sky dark:text-yellow"
                  >
                    View {item.kind} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------- Contact */

export function Contact() {
  const rows = [
    { label: "Email", text: profile.email, href: `mailto:${profile.email}` },
    { label: "Phone", text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { label: "GitHub", text: profile.github.replace(/^https?:\/\//, ""), href: profile.github },
    { label: "Portfolio", text: profile.website.replace(/^https?:\/\//, ""), href: profile.website },
    { label: "LinkedIn", text: profile.name, href: profile.linkedin },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-20 overflow-hidden bg-navy py-20 text-white sm:py-28">
      <Stripes />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:pr-40">
        <div>
          <h2 id="contact-title" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Contact
          </h2>
          <span aria-hidden className="mt-4 block h-1.5 w-20 bg-yellow" />
          <p className="mt-6 text-lg text-white/85">Thank you for your time.</p>
        </div>
        <dl className="space-y-5 bg-navy-2 p-8 sm:p-10">
          {rows.map((row) => (
            <div key={row.label}>
              <dt className="font-display text-sm font-bold uppercase tracking-wide text-yellow">{row.label}</dt>
              <dd className="mt-1 break-words text-lg">
                <a
                  href={row.href}
                  {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="underline underline-offset-4 hover:text-yellow"
                >
                  {row.text}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
