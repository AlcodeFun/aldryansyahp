import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Article } from "@/components/article";
import { randomNotes, getRandomNote } from "@/lib/notes";
import { formatDate } from "@/lib/site";

export function generateStaticParams() {
  return randomNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getRandomNote(slug);
  return note ? { title: note.title, description: note.text } : {};
}

export default async function RandomNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getRandomNote(slug);

  if (!note) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/random"
        className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
      >
        ← back to random
      </Link>

      <div className="mt-10 max-w-xl">
        <p className="font-mono text-sm opacity-60">
          {formatDate(note.date)} · random thought
        </p>
        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {note.title}
        </h1>
      </div>

      <div className="mt-10 max-w-xl">
        <Article blocks={note.content} />
      </div>

      <div className="mt-16 border-t border-black pt-8 dark:border-white">
        <Link
          href="/random"
          className="text-[15px] opacity-60 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
        >
          ← all random thoughts
        </Link>
      </div>
    </article>
  );
}