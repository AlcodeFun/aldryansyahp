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
export function ProjectGallery({
  images,
  heading = "Screenshots",
  grid = "grid-cols-2 sm:grid-cols-3",
  aspect = "aspect-[4/3]",
  fit = "cover",
}: {
  images: GalleryImage[];
  /** Pass null when the surrounding section already has a heading. */
  heading?: string | null;
  grid?: string;
  aspect?: string;
  fit?: "cover" | "contain";
}) {
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
    <section aria-label={heading ?? "Gallery"}>
      {heading ? (
        <h2 className="mb-5 text-2xl font-bold text-heading">{heading}</h2>
      ) : null}

      <ul className={`grid gap-3 ${grid}`}>
        {images.map((image, i) => (
          <li key={`${image.src}-${i}`}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open image ${i + 1} of ${images.length}: ${image.alt}`}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface p-1.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className={`relative w-full overflow-hidden rounded-lg bg-soft ${aspect}`}>
                <Image
                  src={image.src}
                  // The button's aria-label already names the image.
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className={fit === "cover" ? "object-cover object-top" : "object-contain"}
                />
              </div>
              {image.caption ? (
                <p className="px-1.5 pb-1 pt-2 text-sm text-muted">{image.caption}</p>
              ) : null}
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
        className="m-0 h-full max-h-full w-full max-w-full border-0 bg-navy/95 p-0 text-white backdrop:bg-navy/95"
      >
        {current ? (
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-center gap-3 px-4 py-3 text-sm font-semibold">
              <span>
                {(active ?? 0) + 1}/{images.length}
              </span>
              {images.length > 1 ? (
                <>
                  <button type="button" onClick={() => step(-1)} className="cursor-pointer rounded-full border border-white/30 px-3 py-1 hover:bg-yellow hover:text-navy">
                    prev
                  </button>
                  <button type="button" onClick={() => step(1)} className="cursor-pointer rounded-full border border-white/30 px-3 py-1 hover:bg-yellow hover:text-navy">
                    next
                  </button>
                </>
              ) : null}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="ml-auto cursor-pointer rounded-full bg-yellow px-3 py-1 text-navy"
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

            {current.caption ? <p className="shrink-0 px-4 py-3 text-center">{current.caption}</p> : null}
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
