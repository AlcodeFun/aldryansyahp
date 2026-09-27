export const site = {
  name: "Muhammad Aldryansyah Pamungkas",
  username:"@aldryansyahp",
  nickname: "Aldry",
  role: "Software Engineer",
  tagline:
    "A simple, writing-first portfolio. Part résumé, part journal — everything stays in black and white.",
  location: "[City, Country]",
  email: "you@example.com",
  socials: {
    github: "https://github.com/yourname",
    twitter: "https://x.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "Journey" },
  { href: "/projects", label: "Projects" },
  { href: "/random", label: "Random" },
];

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${year}.${month}.${day}`;
}