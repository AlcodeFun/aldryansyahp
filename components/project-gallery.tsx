"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/lib/gallery";

/**
 * Screenshot gallery for a project: a thumbnail grid that opens a lightbox.
 *
 * Tiles crop (`object-cover`) so the grid stays even whatever the capture's
 * aspect ratio, and the lightbox contains (`object-contain`) so the full
 * screenshot is actually readable once it is open.
 *
 * The lightbox is a native <dialog> opened with showModal(), which buys focus
 * trapping, Escape-to-close, and an inert background for free. Without JS the
 * grid still renders and every tile is a plain link-sized button, just inert.
 */
export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (active === null) {
      if (el.open) el.close();
    } else if (!el.open) {
      el.showModal();
    }
  }, [active]);

  // showModal() does not stop the document behind it from scrolling.
  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  const step = useCallback(
    (direction: -1 | 1) => {
      setActive((current) => {
        if (current === null || images.length === 0) return current;
        // Wrap, so arrowing past the end is not a dead key.
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length],
  );

  if (images.length === 0) return null;

  const current = active === null ? null : images[active];

  return (
    <section aria-labelledby="gallery-heading" className="mt-16">
      <h2 id="gallery-heading" className="text-2xl font-semibold tracking-tight">
        UI gallery
      </h2>

      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((image, i) => (
          <li key={`${image.src}-${i}`}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}: ${image.alt}`}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-black/15 transition-colors hover:border-black/40 focus-visible:border-black focus-visible:outline-none dark:border-white/15 dark:hover:border-white/40"
            >
              <div className="relative aspect-[4/3] w-full bg-black/[0.03] dark:bg-white/[0.04]">
                <Image
                  src={image.src}
                  // Decorative: the button's aria-label already names the image,
                  // so leaving alt on the image would announce it twice.
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Image viewer"
        onClose={() => setActive(null)}
        onClick={(event) => {
          // Clicks that land on the dialog element itself are backdrop clicks.
          if (event.target === event.currentTarget) setActive(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            step(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            step(1);
          }
        }}
        className="m-auto h-full max-h-full w-full max-w-5xl border-0 bg-transparent p-0 backdrop:bg-black/90 open:h-full open:w-full"
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
              <p className="font-mono text-sm tabular-nums opacity-80">
                {String((active ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close viewer"
                className="rounded border border-white/30 px-3 py-1 font-mono text-sm text-white transition-colors hover:bg-white hover:text-black"
              >
                Close ✕
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {current.caption || images.length > 1 ? (
              <div className="shrink-0 px-4 py-4 sm:px-6">
                {current.caption ? (
                  <p className="text-center text-white/85">{current.caption}</p>
                ) : null}

                {images.length > 1 ? (
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous image"
                      className="rounded border border-white/30 px-4 py-1.5 font-mono text-sm text-white transition-colors hover:bg-white hover:text-black"
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next image"
                      className="rounded border border-white/30 px-4 py-1.5 font-mono text-sm text-white transition-colors hover:bg-white hover:text-black"
                    >
                      Next →
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
