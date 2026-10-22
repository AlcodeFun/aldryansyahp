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
 * grid still renders and every tile is a plain button, just inert.
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
    <section aria-labelledby="gallery-heading" className="mt-8">
      <h2 id="gallery-heading" className="text-[1.6rem]">
        Screenshots
      </h2>

      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {images.map((image, i) => (
          <li key={`${image.src}-${i}`}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open image ${i + 1} of ${images.length}: ${image.alt}`}
              className="block w-full cursor-zoom-in sketch overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={image.src}
                  // The button's aria-label already names the image.
                  alt=""
                  fill
                  sizes="(min-width: 640px) 36ch, 100vw"
                  className="object-cover"
                />
              </div>
            </button>
            {image.caption ? (
              <p className="mt-1 text-[16px] text-[var(--muted)]">
                fig. {i + 1}: {image.caption}
              </p>
            ) : null}
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
        className="m-0 h-full max-h-full w-full max-w-full border-0 bg-black p-0 text-white backdrop:bg-black"
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 gap-4 px-4 py-2">
              <span>
                {(active ?? 0) + 1}/{images.length}
              </span>
              {images.length > 1 ? (
                <>
                  <button type="button" onClick={() => step(-1)} className="cursor-pointer underline">
                    prev
                  </button>
                  <button type="button" onClick={() => step(1)} className="cursor-pointer underline">
                    next
                  </button>
                </>
              ) : null}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="ml-auto cursor-pointer underline"
              >
                close (esc)
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

            {current.caption ? <p className="shrink-0 px-4 py-2">{current.caption}</p> : null}
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
