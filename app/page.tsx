import Link from "next/link";
import { site } from "@/lib/site";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

const education = [
  {
    period: "2021 — 2025",
    degree: "Bachelor of Applied Science in Computer",
    school: "IPB University, Bogor, Indonesia",
    gpa: "3.86/4.00",
    predicate: "Cum Laude",
  },
 
];

const techExperiences = [
  "python",
  "javascript",
  "typescript",
  "golang",
  "php",
  "vue.js",
  "react.js",
  "next.js",
  "laravel",
  "mysql",
  "postgresql",
  "mongodb",
  "supabase",
 
];

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

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <p className="font-mono text-sm opacity-60">
        Last Updated — {new Date().getFullYear()}
      </p>
      <h1 className="mt-8 text-[44px] font-semibold leading-[0.95] tracking-tight sm:text-[68px]">
        {site.name}
      </h1>
      <h2 className="mt-6 max-w-xl text-[1.5rem] italic leading-snug text-black/80 dark:text-white/80">
        &ldquo;Coding all day till eyes go dry
        <br />
        Hello, I am <b className="text-bold text-[2.1rem]">{site.nickname} </b>&rdquo;
        <br /> <br/>
        <span className="text-[1.5rem]"> a 2+ years experince {site.role}</span> 
      </h2>

      <div className="mt-16">
        <Section title="In short">
          <p className="text-lg text-justify leading-relaxed text-black/85 dark:text-white/85">
            As a software engineer, I enjoy about crafting software and the art of trial n error. Interest to build both side of system (backend + frontend). Currently working as Frontend Web Developer @ Nutapos. This site contain deep dive information writed in story telling style about my personal projects, journey, and other things about me </p>
        </Section>
 
        <Section title="Educated At">
          <ul className="space-y-8">
            {education.map((item) => (
              <li
                key={item.degree}
                className="grid gap-1 sm:grid-cols-[190px_1fr]"
              >
                <span className="font-mono text-sm opacity-60">
                  {item.period}
                </span>
                <div>
                  <p className="text-lg font-semibold tracking-tight">
                    {item.degree}
                  </p>
                  <p className="mt-0.5 opacity-70">{item.school}</p>
                  <p className="mt-0.5 opacity-70">
                    GPA: {item.gpa} ({item.predicate})
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
         <Section title="Recent on Me">
          <div className="mt-2 flex items-center gap-3">
             <p className="text-lg text-justify leading-relaxed text-black/85 dark:text-white/85">
              Starting my photobooth business with my partner. Reduce operational zero cost on photobooth app subscription. We develop our photobooth system to integrate the camera and the printer. Research photobooth flow to enhance user experience and time efficiency.
           </p>
            </div>
            </Section>

        <Section title="Tech Tools Experiences">
          <div className="mt-2 flex flex-wrap gap-2.5">
            {techExperiences.map((techExperience) => (
              <span
                key={techExperience}
                className="group inline-flex items-center gap-2.5 rounded-full border border-black/60 px-4 py-1.5 font-mono text-[15px] transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/60 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rotate-45 bg-black/60 transition-colors group-hover:bg-white dark:bg-white/60 dark:group-hover:bg-black"
                />
                {techExperience}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Reach Me">
          <div className="mt-2 flex items-center gap-3">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/60 transition-all duration-300 hover:bg-black hover:text-white hover:border-black dark:border-white/60 dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/60 transition-all duration-300 hover:bg-black hover:text-white hover:border-black dark:border-white/60 dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/60 transition-all duration-300 hover:bg-black hover:text-white hover:border-black dark:border-white/60 dark:hover:bg-white dark:hover:text-black dark:hover:border-white"
            >
              <MailIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-10">
            <a
              href={`mailto:${site.email}`}
              className="text-xl underline decoration-1 underline-offset-4 hover:opacity-70"
            >
              {site.email}
            </a>
            <div className="flex items-center gap-6 font-mono text-sm opacity-70">
              <Link href="/random" className="hover:underline">
                random notes
              </Link>
              <Link href="/projects" className="hover:underline">
                projects
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}