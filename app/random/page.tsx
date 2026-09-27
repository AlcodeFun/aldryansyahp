import Link from "next/link";
import type { Metadata } from "next";
import { randomNotes } from "@/lib/notes";
import { formatDate } from "@/lib/site";

export const metadata: Metadata = {
  title: "Random",
  description: "Short notes and half-thoughts, in the order I wrote them.",
};

export default function RandomPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Random
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/75 dark:text-white/75">
        Short notes and half-thoughts that never found a longer home. Timestamped
        in the order I wrote them, which is rarely chronological.
      </p>

      <div className="mt-14">
        {randomNotes.map((note, i) => (
          <Link
            key={note.slug}
            href={`/random/${note.slug}`}
            className={`group block py-9 ${
              i > 0 ? "border-t border-black dark:border-white" : ""
            }`}
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <h2 className="flex items-baseline gap-6 text-xl font-semibold tracking-tight group-hover:underline decoration-1 underline-offset-4">
                <span className="font-mono text-sm font-normal opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {note.title}
              </h2>
              <span className="font-mono text-sm opacity-60">
                {formatDate(note.date)}
              </span>
            </div>
            <p className="mt-3 text-lg leading-relaxed text-black/70 sm:pl-[60px] dark:text-white/70">
              {note.text}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}