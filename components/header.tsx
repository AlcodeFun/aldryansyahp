import Link from "next/link";
import { site } from "@/lib/site";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
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
          <NavLinks />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}