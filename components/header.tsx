import Link from "next/link";
import { getSite, getNav } from "@/lib/cms/site";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export async function Header() {
  const [site, nav] = await Promise.all([getSite(), getNav()]);

  return (
    <header className="border-b border-black dark:border-white">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="hidden shrink-0 text-lg font-semibold tracking-tight sm:inline"
        >
          {site.username}
        </Link>
        <div className="flex items-center gap-6 sm:gap-8">
          <NavLinks items={nav} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
