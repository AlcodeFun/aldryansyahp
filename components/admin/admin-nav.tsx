"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/site", label: "Site" },
  { href: "/admin/home", label: "Home" },
  { href: "/admin/journey", label: "Journey" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/notes", label: "Notes" },
  { href: "/admin/pages", label: "Page copy" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-2 py-3 font-mono text-sm">
      {LINKS.map((link) => {
        const active =
          link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              active
                ? "underline decoration-1 underline-offset-4"
                : "opacity-60 hover:opacity-100"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
