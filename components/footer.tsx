import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black dark:border-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between gap-2 px-6 py-10 sm:flex-row sm:items-center">
        <p className="font-mono text-sm opacity-70">© {year} {site.name}</p>
        <p className="flex items-center font-mono text-sm opacity-70">
<Link href="/random" className="hover:underline">
              random notes
            </Link>
          <span className="mx-2">·</span>
          <a href={`mailto:${site.email}`} className="hover:underline">
            say hello
          </a>
        </p>
      </div>
    </footer>
  );
}