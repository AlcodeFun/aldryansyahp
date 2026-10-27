"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/cms/types";

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold">
      {items.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`border-b-2 py-1 transition-colors ${
              active
                ? "border-yellow text-heading"
                : "border-transparent text-muted hover:text-heading"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
