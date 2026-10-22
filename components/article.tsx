import type { Block } from "@/lib/blocks";

export function Article({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2 key={i} className="pt-4 text-[1.4rem] font-bold">
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote key={i} className="ml-8 italic">
                {block.text}
              </blockquote>
            );
          case "list":
            return (
              <ul key={i} className="ml-8 list-disc">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "hr":
            return <hr key={i} />;
        }
      })}
    </div>
  );
}
