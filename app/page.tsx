import { getHome } from "@/lib/cms/home";
import { getSite, getStrings } from "@/lib/cms/site";
import { Page } from "@/components/page";
import type { EducationEntry, HomeSection, TechItem } from "@/lib/cms/types";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="sketch mt-12 px-7 py-6 sm:px-10 sm:py-8">
      <h2 className="text-[1.6rem]">{title}</h2>
      <div className="mt-3 text-[var(--muted)]">{children}</div>
    </section>
  );
}

function EducationList({ entries }: { entries: EducationEntry[] }) {
  return (
    <ul className="space-y-3">
      {entries.map((item) => (
        <li key={item.id}>
          <span className="text-[var(--ink)]">{item.degree}</span>, {item.school}
          <br />
          <span className="text-[16px]">
            {item.period}
            {item.gpa ? ` / GPA ${item.gpa}` : ""}
            {item.predicate ? ` (${item.predicate})` : ""}
          </span>
        </li>
      ))}
    </ul>
  );
}

// A plain comma list. These are words, not buttons.
function TechList({ items }: { items: TechItem[] }) {
  return <p>{items.map((item) => item.label).join(", ")}</p>;
}

function Contact({
  email,
  github,
  linkedin,
}: {
  email: string;
  github: string;
  linkedin: string;
}) {
  const rows = [
    email ? { label: "email", href: `mailto:${email}`, text: email } : null,
    github ? { label: "github", href: github, text: github } : null,
    linkedin ? { label: "linkedin", href: linkedin, text: linkedin } : null,
  ].filter((row) => row !== null);

  return (
    <table>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td className="pr-4 align-top">{row.label}</td>
            <td className="break-all">
              <a href={row.href}>{row.text.replace(/^https?:\/\/(www\.)?/, "")}</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
      return <TechList items={ctx.tech} />;
    case "reach_me":
      return <Contact {...ctx.site} />;
    default:
      return section.body ? <p>{section.body}</p> : null;
  }
}

export default async function Home() {
  const [{ hero, sections, education, tech }, site, strings] = await Promise.all([
    getHome(),
    getSite(),
    getStrings(),
  ]);

  return (
    <Page>
      <h1 className="text-[2.6rem]">{site.name}</h1>
      <p className="mt-8 text-[1.3rem] text-[var(--muted)]">
        {hero.greeting} {site.nickname}. {hero.experiencePrefix} {site.role}.
      </p>
      <p className="mt-1 text-[1.3rem] text-[var(--muted)]">{hero.lineOne}.</p>
      <p className="mt-2 text-[16px] text-[var(--muted)]">
        {hero.updatedLabel || strings["home.last_updated_prefix"]}{" "}
        {new Date().getFullYear()}
      </p>

      {sections.map((section) => (
        <Section key={section.id} title={section.title}>
          {renderSection(section, { education, tech, site, strings })}
        </Section>
      ))}
    </Page>
  );
}
