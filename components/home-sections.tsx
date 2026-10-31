import Image from "next/image";
import { ProjectGallery } from "@/components/project-gallery";
import { Container, SectionHeading, accentBg } from "@/components/page";
import {
  about,
  achievements,
  business,
  certifications,
  currentRole,
  education,
  experience,
  otherExperience,
  profile,
  projects,
  techLogo,
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
  headingLevel = "h2",
}: {
  id: string;
  title: string;
  accent?: Parameters<typeof SectionHeading>[0]["accent"];
  children: React.ReactNode;
  className?: string;
  headingLevel?: "h1" | "h2";
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-20 py-16 sm:py-24 ${className}`}>
      <Container>
        <div id={`${id}-title`}>
          <SectionHeading title={title} accent={accent} as={headingLevel} />
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
    { label: profile.phone, href: profile.whatsapp },
    { label: profile.github.replace(/^https?:\/\//, ""), href: profile.github },
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

        {/* Portrait card: a yellow slab offset behind the photo, with the code
            window overlapping its lower-left corner. */}
        <div className="relative mx-auto mb-6 mr-6 w-60 sm:w-72 lg:mb-16">
          <div aria-hidden className="absolute inset-0 translate-x-5 translate-y-5 rounded-3xl bg-yellow" />
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-white/20">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={488}
              height={488}
              priority
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <span aria-hidden className="absolute -left-5 top-6 rounded-lg bg-yellow px-3 py-1 font-mono text-xs font-bold text-navy shadow-md">
            &lt;/&gt;
          </span>
          <span aria-hidden className="absolute -right-8 top-1/3 rounded-lg bg-[#4cc3f7] px-3 py-1 font-mono text-xs font-bold text-navy shadow-md">
            {"{ }"}
          </span>
          <div className="absolute -bottom-16 -left-24 hidden scale-90 lg:block">
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
          <div className="bg-soft px-5 py-4">
            <p>
              <span className="mr-2 font-display font-bold text-heading">Languages</span>
              {about.languages}
            </p>
            <p className="mt-3 flex items-center gap-3 border-t border-line pt-3">
              <Image src={about.englishTest.logo} alt="Duolingo" width={40} height={40} className="h-10 w-10 shrink-0 rounded-xl" />
              <span className="min-w-0">
                <span className="block text-muted">{about.englishTest.name}</span>
                <span className="block text-sm font-semibold text-heading">{about.englishTest.level}</span>
              </span>
              <span className="ml-auto rounded-full bg-[#58cc02] px-3 py-1 font-display text-sm font-extrabold text-white">
                {about.englishTest.score}
              </span>
            </p>
          </div>
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
          <div className="flex items-start justify-between gap-4">
            <div>
              <Eyebrow className="text-yellow">Education</Eyebrow>
              <h3 className="mt-2 text-3xl font-bold">{education.school}</h3>
              <p className="mt-1 text-white/80">
                {education.place} · {education.period}
              </p>
            </div>
            <Image
              src={education.logo}
              alt="IPB University logo"
              width={72}
              height={72}
              className="h-16 w-16 shrink-0 rounded-full bg-white p-1 shadow-lg sm:h-18 sm:w-18"
            />
          </div>
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
            <TechLogos names={group.logos} className="mt-4" />
            <p className="mt-4 text-lg leading-snug">{group.items}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

/** A row of technology logos on white tiles, so dark logos read in dark mode too. */
function TechLogos({ names, className = "" }: { names: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {names.map((name) => {
        const logo = techLogo(name);
        return logo ? (
          <li key={name} title={name} className="flex h-11 w-11 items-center justify-center rounded-lg bg-white p-2 ring-1 ring-line">
            {/* eslint-disable-next-line @next/next/no-img-element -- small static SVGs */}
            <img src={logo} alt={name} width={28} height={28} className="h-7 w-7 object-contain" />
          </li>
        ) : null;
      })}
    </ul>
  );
}

/* -------------------------------------------------------- Recent on me */

export function RecentOnMe() {
  return (
    <SectionShell id="recent" title="Recent on Me" accent="yellow" className="bg-surface">
      <Eyebrow className="mb-5 text-muted">01 · Current role</Eyebrow>
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

      <Eyebrow className="mb-5 mt-16 text-muted">02 · Business with my partner</Eyebrow>
      <div
        style={{ backgroundColor: business.color }}
        className="grid gap-8 overflow-hidden rounded-3xl text-white shadow-lg lg:grid-cols-[1.3fr_1fr]"
      >
        <div className="p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-xl bg-[#fdf3e1] px-4 py-3 shadow-sm">
              <Image src={business.logo} alt={business.name} width={247} height={47} className="h-9 w-auto" />
            </span>
            <a
              href={business.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${business.name} on Instagram (${business.instagram.handle})`}
              className="group inline-flex items-center gap-3 rounded-xl bg-white/10 py-2 pl-2 pr-4 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)] text-white shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
              </span>
              <span className="text-sm font-semibold">{business.instagram.handle}</span>
            </a>
          </div>
          <Eyebrow className="mt-8 text-yellow">{business.kind}</Eyebrow>
          <h3 className="mt-2 text-3xl font-extrabold">{business.name}</h3>
          <p className="mt-1 text-white/80">{business.meta}</p>
          <ul className="mt-6 space-y-3 border-t border-white/20 pt-6 text-lg">
            {business.points.map((point) => (
              <li key={point} className="flex gap-3">
                <Square className="bg-yellow" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <TechLogos names={business.stack} />
            <a
              href={business.link.href}
              className="inline-flex items-center gap-2 rounded-lg bg-yellow px-4 py-2 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5"
            >
              {business.link.label} →
            </a>
          </div>
        </div>
        <div className="relative min-h-64 lg:min-h-full">
          <Image
            src={business.photo}
            alt="Kelana Photobooth start screen"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#6e1f2c] via-transparent to-transparent lg:via-[#6e1f2c]/10" />
        </div>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------------------------------- Experience */

/** Each role's card is filled with its company colour. */
const JOB_THEME: Record<string, { card: string; accent: string; muted: string; dot: string }> = {
  plum: { card: "bg-[#5b1f86] text-white", accent: "text-[#f3c4ff]", muted: "text-white/75", dot: "bg-[#f3c4ff]" },
  yellow: { card: "bg-[#f6c21c] text-navy", accent: "text-[#7a4b00]", muted: "text-navy/70", dot: "bg-navy" },
  crimson: { card: "bg-[#b8222b] text-white", accent: "text-[#ffd2d2]", muted: "text-white/75", dot: "bg-white" },
  forest: { card: "bg-forest text-white", accent: "text-yellow", muted: "text-white/75", dot: "bg-yellow" },
};

export function Experience({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <SectionShell id="experience" title="Experience" accent="teal" headingLevel={headingLevel}>
      <ol className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {experience.map((job) => {
          const theme = JOB_THEME[job.accent] ?? JOB_THEME.forest;
          return (
            <li key={job.company} className="flex flex-col">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold uppercase tracking-wide text-heading">{job.period}</p>
                <Image src={job.logo} alt={`${job.company} logo`} width={36} height={36} className="h-9 w-9 rounded-md bg-white object-contain" />
              </div>
              <div className="relative my-4 flex items-center">
                <span className={`relative z-10 h-4 w-4 rounded-full ring-4 ring-bg ${accentBg[job.accent]}`} />
                <span aria-hidden className="h-0.5 flex-1 bg-line" />
              </div>
              <article className={`flex flex-1 flex-col rounded-xl p-6 shadow-md ${theme.card}`}>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className={`mt-1 font-display font-bold ${theme.accent}`}>{job.company}</p>
                <p className={`text-sm ${theme.muted}`}>{job.meta}</p>
                <ul className="mt-5 space-y-3 border-t border-current/20 pt-5">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <Square className={theme.dot} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <TechLogos names={job.stack} className="mt-5" />
                <div className="mt-6 lg:mt-auto lg:pt-6">
                  {job.photo ? (
                    <figure className="overflow-hidden rounded-lg bg-black/15">
                      <Image
                        src={job.photo.src}
                        alt={job.photo.caption}
                        width={480}
                        height={320}
                        className="aspect-[3/2] w-full object-cover"
                      />
                      <figcaption className="px-4 py-3 text-center">
                        <span className="block font-bold">{job.photo.caption}</span>
                        <span className={`text-sm ${theme.muted}`}>{job.photo.sub}</span>
                      </figcaption>
                    </figure>
                  ) : job.note ? (
                    <div className="rounded-lg bg-black/15 px-4 py-6 text-center">
                      <p className="font-display text-lg font-bold">{job.note.title}</p>
                      <p className={`mt-1 text-sm ${theme.muted}`}>{job.note.text}</p>
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

export function Projects({ headingLevel: Heading = "h2" }: { headingLevel?: "h1" | "h2" }) {
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
          <Heading id="projects-title" className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Selected Projects
          </Heading>
          <p className="mt-4 text-lg text-white/80">Software projects, 2023–2026</p>
        </Container>
      </div>

      {projects.map((project, i) => (
        <article
          key={project.slug}
          id={project.slug}
          aria-labelledby={`${project.slug}-title`}
          className={`scroll-mt-20 ${i === 0 ? "pb-6 pt-14 sm:pt-20" : i === projects.length - 1 ? "pb-14 pt-6 sm:pb-20" : "py-6"}`}
        >
          <Container>
          {/* Each project sits on a card filled with its own colour, like the
              experience cards. */}
          <div
            style={{ backgroundColor: project.color }}
            className="grid gap-10 rounded-3xl p-6 text-white shadow-lg sm:p-10 lg:grid-cols-[0.8fr_1.4fr]"
          >
            <div className="flex flex-col">
              <p className="text-sm font-bold uppercase tracking-wide text-yellow">
                Project {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                <span className="mx-2">·</span>
                {project.year}
                {project.org ? ` · ${project.org}` : ""}
              </p>
              <h3 id={`${project.slug}-title`} className="mt-2 text-3xl font-extrabold leading-tight text-white">
                {project.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-white/90">{project.description}</p>

              <Eyebrow className="mt-8 text-white/70">Tech stack</Eyebrow>
              <ul className="mt-3 space-y-3">
                {project.stack.map((tech) => {
                  const logo = techLogo(tech.name);
                  return (
                  <li key={tech.name} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white p-2 font-display text-sm font-bold text-navy shadow-sm"
                    >
                      {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element -- small static SVGs
                        <img src={logo} alt="" width={26} height={26} className="h-6.5 w-6.5 object-contain" />
                      ) : (
                        tech.name.charAt(0)
                      )}
                    </span>
                    <span>
                      <span className="block font-display font-bold">{tech.name}</span>
                      <span className="text-sm text-white/70">{tech.role}</span>
                    </span>
                  </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-navy shadow-sm transition-colors hover:bg-yellow"
                  >
                    Source code ↗
                  </a>
                ) : null}
                {project.video ? (
                  <a
                    href={project.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white hover:text-navy"
                  >
                    ▶ Teaser video
                  </a>
                ) : null}
              </div>
            </div>

            <div className="space-y-5">
              {project.problem && project.solution ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "The problem", tone: "text-[#a37700]", ...project.problem },
                    { label: "The solution", tone: "text-sky", ...project.solution },
                  ].map((box) => (
                    <div
                      key={box.label}
                      style={{ backgroundColor: `color-mix(in srgb, ${project.color} 12%, white)` }}
                      className="rounded-xl p-6 text-navy shadow-sm"
                    >
                      <Eyebrow className={box.tone}>{box.label}</Eyebrow>
                      <p className="mt-2 font-display text-lg font-bold">{box.title}</p>
                      <ul className="mt-3 space-y-2 text-[#3d4566]">
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
                frameColor={project.color}
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
          </div>
          </Container>
        </article>
      ))}
    </section>
  );
}

/* ------------------------------------------------------- Visual design */

export function VisualDesign({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <SectionShell id="visual-design" title="Visual Design" accent="crimson" headingLevel={headingLevel}>
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

export function Certifications({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const groups = [
    { label: "Certifications", items: certifications },
    { label: "Achievements", items: achievements },
  ];
  return (
    <SectionShell
      id="certifications"
      title="Certifications & Achievements"
      accent="yellow"
      className="bg-surface"
      headingLevel={headingLevel}
    >
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
                    href={item.href}
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

type ContactIconName = "mail" | "whatsapp" | "github" | "linkedin" | "pin";

function ContactIcon({ name }: { name: ContactIconName }) {
  const stroke = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
    "aria-hidden": true,
  };
  switch (name) {
    case "mail":
      return (
        <svg {...stroke}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.88-9.9 9.88Zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.17-1.24-6.16-3.48-8.4Z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...stroke}>
          <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
  }
}

export function Contact() {
  const rows: { icon: ContactIconName; label: string; text: string; href?: string; tint: string }[] = [
    { icon: "mail", label: "Email", text: profile.email, href: `mailto:${profile.email}`, tint: "bg-yellow text-navy" },
    { icon: "whatsapp", label: "WhatsApp", text: profile.phone, href: profile.whatsapp, tint: "bg-[#25d366] text-white" },
    { icon: "github", label: "GitHub", text: profile.github.replace(/^https?:\/\//, ""), href: profile.github, tint: "bg-white text-navy" },
    { icon: "linkedin", label: "LinkedIn", text: "Muhammad Aldryansyah Pamungkas", href: profile.linkedin, tint: "bg-[#0a66c2] text-white" },
    { icon: "pin", label: "Location", text: profile.location, tint: "bg-coral text-white" },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-20 overflow-hidden bg-navy py-20 text-white sm:py-28"
    >
      <Stripes />
      <Container className="relative lg:pr-40">
        <div>
          <h2 id="contact-title" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Contact
          </h2>
          <span aria-hidden className="mt-4 block h-1.5 w-20 bg-yellow" />
          <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="mt-6 text-lg text-white/85">Thank you for your time.</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-flex items-center gap-3 rounded-xl bg-yellow px-6 py-3 font-display font-bold text-navy shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <ContactIcon name="mail" />
            Send an email
          </a>
          </div>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((row) => {
            const body = (
              <>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${row.tint}`}>
                  <ContactIcon name={row.icon} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xs font-bold uppercase tracking-wider text-yellow">
                    {row.label}
                  </span>
                  <span className="block text-[15px] [overflow-wrap:anywhere]">{row.text}</span>
                </span>
              </>
            );
            const box = "flex items-center gap-4 rounded-2xl bg-navy-2/60 p-4 ring-1 ring-white/10";
            return (
              <li key={row.label}>
                {row.href ? (
                  <a
                    href={row.href}
                    {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`${box} transition hover:-translate-y-0.5 hover:bg-navy-2 hover:ring-yellow/60`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={box}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
