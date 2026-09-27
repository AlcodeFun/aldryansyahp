import type { Block } from "@/lib/content";

export function Article({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p
                key={i}
                className="mt-6 text-lg leading-relaxed text-black/85 first:mt-0 dark:text-white/85"
              >
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="mt-14 text-2xl font-semibold tracking-tight"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="mt-8 border-l-2 border-black pl-6 text-xl italic leading-relaxed text-black/75 dark:border-white dark:text-white/75"
              >
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="mt-6 space-y-3">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-4 text-lg leading-relaxed text-black/85 dark:text-white/85"
                  >
                    <span aria-hidden className="font-mono text-base opacity-60">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "hr":
            return (
              <hr
                key={i}
                className="mt-10 mb-2 border-black/20 dark:border-white/25"
              />
            );
        }
      })}
    </div>
  );
}