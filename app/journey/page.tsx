import Link from "next/link";
import type { Metadata } from "next";
import { journeyEntries } from "@/lib/content";
import { formatDate } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journey",
  description: "A running log of short essays and notes.",
};

export default function JourneyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Journey
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/75 dark:text-white/75">
        A running log of small essays and notes, in the order they happened.
        Click any entry to read the whole thing.
      </p>

      <div className="mt-14">
        {journeyEntries.map((entry, i) => (
          <Link
            key={entry.slug}
            href={`/journey/${entry.slug}`}
            className={`group block py-9 ${
              i > 0 ? "border-t border-black dark:border-white" : ""
            }`}
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <span className="text-xl font-semibold tracking-tight group-hover:underline decoration-1 underline-offset-4">
                {entry.title}
              </span>
              <span className="font-mono text-sm opacity-60">
                {formatDate(entry.date)} · {entry.readMinutes} min
              </span>
            </div>
            <p className="mt-3 text-lg leading-relaxed text-black/70 dark:text-white/70">
              {entry.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}