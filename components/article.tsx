import type { Block } from "@/lib/blocks";

export function Article({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2 key={i} className="pt-6 text-2xl font-bold text-heading">
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-yellow bg-surface px-6 py-4 text-xl font-semibold text-heading ring-1 ring-line"
              >
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 bg-coral" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "hr":
            return <hr key={i} className="border-line" />;
        }
      })}
    </div>
  );
}
