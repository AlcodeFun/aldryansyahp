export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "hr" };

export interface JourneyEntry {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readMinutes: number;
  content: Block[];
}

export const journeyEntries: JourneyEntry[] = [
  {
    slug: "on-slower-software",
    title: "Falling for slower software",
    date: "2026-08-14",
    excerpt:
      "I spent a weekend with software that has no notifications, no streaks, no feed. Here is what it taught me about attention.",
    readMinutes: 4,
    content: [
      {
        type: "p",
        text: "The app did exactly one thing. It opened to a blank page, waited for me to type, and never asked for anything else. No badges, no gamified days, no \"you missed yesterday\" message. I had forgotten software could be this quiet.",
      },
      {
        type: "p",
        text: "I kept waiting for the catch. Every tool these days needs to hook you, retain you, grow you into a metric. This one just… existed. The only signal of progress was the words accumulating on the page, and that was enough.",
      },
      { type: "h2", text: "Resistance, then ease" },
      {
        type: "p",
        text: "The first hour felt wrong. I kept reaching for a toolbar that was not there, hunting for features the product had deliberately left out. Somewhere around the second afternoon, I stopped fighting it and started writing.",
      },
      {
        type: "quote",
        text: "A tool is faster when it gets out of the way — but only if you are willing to walk the empty hallway first.",
      },
      { type: "h2", text: "What I kept" },
      {
        type: "list",
        items: [
          "Fewer features is a product decision, not a shortcut.",
          "Blank space is a design material, just like ink.",
          "The tools we tolerate quietly shape how we think.",
          "Slowness is often just intention wearing a disguise.",
        ],
      },
      { type: "p", text: "I still use the fast, noisy apps. But now I know the quiet ones exist, and I am building one myself." },
    ],
  },
  {
    slug: "notes-on-building-in-public",
    title: "Notes on building in public",
    date: "2026-05-02",
    excerpt:
      "A year of sharing half-finished work taught me that vulnerability is a feature, not a bug.",
    readMinutes: 5,
    content: [
      {
        type: "p",
        text: "A year ago I posted a blurry screenshot of a broken UI and called it \"week one\". I expected to be embarrassed. Instead, eleven strangers wrote back with corrections, ideas, and encouragement. That was the moment building in public stopped being a strategy and became a way to work.",
      },
      { type: "h2", text: "The honest number" },
      {
        type: "p",
        text: "People do not follow the polished launch. They follow the honest number — \"I have 300 users, this feature is broken, here is what I learned\". Perfect work is easy to admire and impossible to join. Broken work invites people in.",
      },
      {
        type: "list",
        items: [
          "Post the version you are embarrassed to share.",
          "Answer every comment that engages with the work.",
          "Write the log of what you tried, including the failures.",
        ],
      },
      { type: "hr" },
      {
        type: "p",
        text: "The hardest part is consistency, not courage. The feed rewards novelty, but the practice rewards showing up. I have learned to treat the archive as the audience, not the algorithm.",
      },
    ],
  },
  {
    slug: "the-year-i-learned-to-say-no",
    title: "The year I learned to say no",
    date: "2026-01-19",
    excerpt:
      "Every \"yes\" is secretly a vote against something. A short account of reclaiming the word.",
    readMinutes: 3,
    content: [
      {
        type: "p",
        text: "I said yes to everything last year. New meetings, new side projects, new small favors that seemed harmless on their own. Somewhere in April I looked at my calendar and realized I had not finished a single personal project in six months.",
      },
      { type: "h2", text: "The math of yes and no" },
      {
        type: "p",
        text: "Saying no to one call is not a rejection. It is a preference declared in advance — a vote for the two evenings of deep work that the call would have erased. I started treating every yes as a budget, not a courtesy.",
      },
      {
        type: "quote",
        text: "No is a complete sentence. It is also a deadline for me, and a gift to everyone else.",
      },
      { type: "h2", text: "What changed" },
      { type: "p", text: "I finished things again. More importantly, the people around me adapted. The requests became better, rarer, and more intentional — because I stopped teaching them that yes was always available." },
    ],
  },
  {
    slug: "small-tools-long-habits",
    title: "Small tools and long habits",
    date: "2025-10-08",
    excerpt:
      "The best productivity app I own is a paper notebook and a consistent evening ritual.",
    readMinutes: 4,
    content: [
      {
        type: "p",
        text: "I have cycled through most serious note-taking apps, and they are all wonderful landfills. The system I actually use is embarrassing in its simplicity: a spiral notebook, a pen, and fifteen minutes before bed.",
      },
      { type: "h2", text: "Why small wins" },
      {
        type: "p",
        text: "Small tools win because they lower the cost of starting. A notebook cannot sync, cannot fail, cannot interrupt. It asks nothing of me except that I stay a little while. Tools with low entry fees compound into habits, while tool with high entry fees become guilt.",
      },
      {
        type: "list",
        items: [
          "Write the day's one thing worth keeping.",
          "Draw a line under yesterday.",
          "Close the notebook. Repeat tomorrow.",
        ],
      },
      { type: "p", text: "Technology is at its best when it is boring enough to disappear, leaving only the habit behind." },
    ],
  },
];

export function getJourneyEntry(slug: string): JourneyEntry | undefined {
  return journeyEntries.find((entry) => entry.slug === slug);
}