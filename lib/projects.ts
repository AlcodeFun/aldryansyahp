import type { Block } from "./content";

export interface ProjectEntry {
  slug: string;
  index: string;
  title: string;
  year: string;
  role: string;
  tags: string[];
  hook: string;
  content: Block[];
}

export const projects: ProjectEntry[] = [
  {
    slug: "shelf-note",
    index: "01",
    title: "Shelf Note — the app I built to stop losing ideas",
    year: "2025",
    role: "Product & Frontend",
    tags: ["Next.js", "TypeScript", "Postgres"],
    hook: "I kept losing ideas between apps, so I built the quiet one I wished existed.",
    content: [
      {
        type: "p",
        text: "This project started as a complaint. I would have a good idea on the train, type it into whatever notes app was nearest, and never find it again. The problem was never storage — it was friction. Every app wanted me to set up folders, tags, and systems before I could save a single sentence.",
      },
      { type: "h2", text: "The conversation that started it" },
      {
        type: "p",
        text: "I described it to a friend as \"a notebook, but empty\". She asked what the first screen should be. I said a blank text field and a save button. She said, \"then why does every other app make it so hard?\" That question became the product brief.",
      },
      { type: "h2", text: "Building it" },
      {
        type: "p",
        text: "The build itself took a weekend and the polish took a year. The stack is deliberately boring — Next.js on the front and Postgres behind it. The interesting work was subtractive: cutting tags, cutting color-coding, cutting anything that made the empty page feel like it owed the attention.",
      },
      {
        type: "quote",
        text: "I did not want to build a beautiful archive. I wanted to build a door that opened for half a second.",
      },
      { type: "h2", text: "Where it landed" },
      {
        type: "p",
        text: "Today Shelf Note is used by a few hundred people who share the same complaint. It does not have a settings page, a dashboard, or a roadmap. It has an input field, a list, and nobody scrambling for your attention. That is the whole product, and I plan to keep it that way.",
      },
    ],
  },
  {
    slug: "paper-trail",
    index: "02",
    title: "Paper Trail — a redesign that started with a conversation",
    year: "2024",
    role: "UX & Interface",
    tags: ["Research", "Figma", "Design Systems"],
    hook: "A two-week redesign built from a single overheard complaint at a coffee shop.",
    content: [
      {
        type: "p",
        text: "Paper Trail was a document tool used by small teams. By the time I joined the project, the interface had accreted twelve years of small decisions, and each one was reasonable in isolation. Together they formed a kind of polite confusion.",
      },
      { type: "h2", text: "The overheard complaint" },
      {
        type: "p",
        text: "At a coffee shop I heard two people using it to review an invoice. \"Where is the page on thing?\" one asked. The other shrugged. Everything they needed was there — it was just organized around how the code was written, not how people think about documents.",
      },
      { type: "h2", text: "The reframe" },
      {
        type: "p",
        text: "We stopped rearranging controls and started renaming the mental model. Instead of \"workspace / folder / asset\", the interface talked about \"your papers\" — what is draft, what is sent, what needs a signature. The migration kept every file exactly where it was; only the words and hierarchy changed.",
      },
      {
        type: "list",
        items: [
          "Replaced 40 tool states with one persistent header.",
          "Cut the settings tree from three levels to one.",
          "Made the document, not the interface, the center of the page.",
        ],
      },
      { type: "h2", text: "Aftermath" },
      { type: "p", text: "Support tickets about \"not finding things\" dropped by more than half, and the second person in that coffee shop — the one who shrugged — was a beta reviewer who wrote back: \"it just makes sense now.\" That sentence was the entire retrospective." },
    ],
  },
  {
    slug: "weekend-project-year",
    index: "03",
    title: "Shipping a weekend project for a year",
    year: "2023",
    role: "Design, Build & Maintenance",
    tags: ["React", "Node", "RDS"],
    hook: "I released a tiny tool on a Sunday and kept it alive for 52 weeks. This is that year.",
    content: [
      {
        type: "p",
        text: "On a Sunday in January I published a 200-line script as a free web page: a calm, single-purpose timer for people who write. I called it a \"weekend project\", which was true of the debut and false of everything after.",
      },
      { type: "h2", text: "The quiet month" },
      {
        type: "p",
        text: "For the first month nobody used it but me. I kept telling myself that was fine — it was never supposed to be a product. Then a stranger wrote an email asking for one small feature, and I realized the difference between a novelty and a tool is that someone needs it on a Tuesday.",
      },
      { type: "h2", text: "Fifty-two small commits" },
      {
        type: "p",
        text: "I committed to one improvement per week. Some weeks that was a color fix. Some weeks it was a new export format. The aggregate of small, boring, consistent work turned a weekend toy into the thing people set as their homepage.",
      },
      {
        type: "quote",
        text: "Most projects do not die in the build. They die in week four, when the novelty invoice comes due.",
      },
      { type: "h2", text: "The lesson" },
      { type: "p", text: "A year later the tool has a small but genuine community, and it taught me the discipline I still use everywhere: release something small, then spend a long time making it quietly better. Shipping is a habit, not an event." },
    ],
  },
];

export function getProject(slug: string): ProjectEntry | undefined {
  return projects.find((project) => project.slug === slug);
}