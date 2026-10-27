import Link from "next/link";
import { getSite, getNav } from "@/lib/cms/site";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const [site, nav] = await Promise.all([getSite(), getNav()]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
      {/* The deck's top rule: navy with a yellow tail. */}
      <div aria-hidden className="flex h-1.5">
        <span className="flex-1 bg-navy dark:bg-navy-2" />
        <span className="w-1/6 bg-yellow" />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3 sm:px-8">
        <Link href="/" className="font-display text-lg font-extrabold tracking-tight text-heading">
          {site.username}
        </Link>
        <div className="flex items-center gap-5">
          <NavLinks items={nav} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
