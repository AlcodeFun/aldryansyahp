"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/cms/types";

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex flex-wrap gap-x-3">
      {items.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return active ? (
          <span key={item.href} aria-current="page">
            [{item.label.toLowerCase()}]
          </span>
        ) : (
          <Link key={item.href} href={item.href}>
            {item.label.toLowerCase()}
          </Link>
        );
      })}
    </nav>
  );
}
