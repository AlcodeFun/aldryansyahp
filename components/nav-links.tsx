"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-5 sm:gap-7">
      {nav.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active
                ? "text-[15px] underline decoration-1 underline-offset-4"
                : "text-[15px] opacity-65 transition-opacity hover:opacity-100 hover:underline decoration-1 underline-offset-4"
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}