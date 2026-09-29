"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { emptyImage, type GalleryImage } from "@/lib/gallery";
import { uploadGalleryImages } from "@/lib/admin/storage-actions";

/**
 * Editor for a project's screenshot gallery.
 *
 * Mirrors BlockEditor: state lives in React and the serialized array is written
 * to a hidden input, so the surrounding <form> stays a plain
 * progressive-enhancement form. A plain textarea is not a useful fallback for a
 * list of image paths, so instead the hidden input is the single source of truth
 * and the form is only usable once this script hydrates.
 *
 * Uploads go to Supabase Storage through `uploadGalleryImages` and come back as
 * public URLs, which are appended to the same array. Storage is intentionally
 * decoupled from the save: the bytes land in the bucket immediately, but nothing
 * is attached to the project until "Save changes" is pressed.
 */

const MAX_FILES = 12;

type Status =
  | { kind: "idle" }
  | { kind: "uploading"; count: number }
  | { kind: "error"; message: string }
  | { kind: "done"; added: number; failures: string[] };

/** "01_menu-screen.PNG" -> "01 menu screen" */
function altFromFilename(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  const words = base.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  if (!words) return "Project screenshot";
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function GalleryEditor({
  name,
  initial,
  projectSlug,
  storageReady = true,
}: {
  name: string;
  initial: GalleryImage[];
  projectSlug: string;
  /** False when the Storage env vars are missing, so the uploader can hide itself. */
  storageReady?: boolean;
}) {
  const [images, setImages] = useState<GalleryImage[]>(initial);
  const [bulk, setBulk] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function update(index: number, next: GalleryImage) {
    setImages((current) => current.map((img, i) => (i === index ? next : img)));
  }

  function move(index: number, direction: -1 | 1) {
    setImages((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function remove(index: number) {
    setImages((current) => current.filter((_, i) => i !== index));
  }

  function addFromBulk() {
    const paths = bulk
      .split(/\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    if (paths.length === 0) return;
    setImages((current) => [
      ...current,
      ...paths.map((p) => ({ src: p, alt: altFromFilename(p.split("/").pop() ?? p), caption: "" })),
    ]);
    setBulk("");
  }

  async function upload(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    if (files.length > MAX_FILES) {
      setStatus({ kind: "error", message: `Upload at most ${MAX_FILES} images at a time.` });
      return;
    }

    setStatus({ kind: "uploading", count: files.length });
    const data = new FormData();
    for (const file of files) data.append("files", file);

    try {
      const result = await uploadGalleryImages(data, projectSlug);
      if (!result.ok) {
        setStatus({ kind: "error", message: result.error });
        return;
      }
      setImages((current) => [...current, ...result.images]);
      setStatus({ kind: "done", added: result.images.length, failures: result.failures });
    } catch {
      // A thrown Server Function means the request itself failed (offline, 500,
      // or an unauthenticated session bouncing through proxy).
      setStatus({ kind: "error", message: "Upload failed. Check your connection and try again." });
    } finally {
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  // Images with no src are dropped on save by parseGallery, so warn in the UI
  // rather than letting an author submit a half-empty row and wonder.
  const incomplete = images.filter((img) => img.src.trim() === "").length;
  const busy = status.kind === "uploading";

  return (
    <div className="space-y-4">
      <input type="hidden" name={name} value={JSON.stringify(images)} />

      {storageReady ? (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            void upload(event.dataTransfer.files);
          }}
          className={`rounded-lg border border-dashed p-4 text-center transition-colors ${
            dragging
              ? "border-black bg-black/5 dark:border-white dark:bg-white/10"
              : "border-black/25 dark:border-white/25"
          }`}
        >
          <input
            ref={fileInput}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
            multiple
            onChange={(event) => void upload(event.target.files)}
            className="sr-only"
            id={`${name}-files`}
          />
          <label
            htmlFor={`${name}-files`}
            className="inline-flex cursor-pointer items-center rounded-full border border-black/30 px-4 py-1.5 text-sm transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/30 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
          >
            {busy ? "Uploading…" : "Choose screenshots"}
          </label>
          <p className="mt-2 text-xs opacity-60">
            or drop PNG / JPEG / WebP / AVIF / GIF here, up to 5 MB each. Files are stored
            in Supabase Storage; alt text and captions come next.
          </p>
        </div>
      ) : null}

      {status.kind === "error" ? (
        <p className="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {status.message}
        </p>
      ) : null}

      {status.kind === "done" ? (
        <p className="rounded border border-black/20 px-3 py-2 text-sm dark:border-white/20">
          Added {status.added} image{status.added === 1 ? "" : "s"} to the gallery.
          {status.failures.length > 0
            ? ` ${status.failures.length} failed: ${status.failures.join("; ")}`
            : ""}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <button
          type="button"
          onClick={() => setImages((current) => [...current, emptyImage()])}
          className="rounded-full border border-black/30 px-3 py-1 transition-colors hover:border-black hover:bg-black hover:text-white dark:border-white/30 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
        >
          + image
        </button>
        <p className="font-mono opacity-60">
          {images.length} image{images.length === 1 ? "" : "s"}
          {incomplete > 0 ? ` · ${incomplete} missing a path (will be dropped)` : ""}
        </p>
      </div>

      {images.length === 0 ? (
        <p className="rounded-lg border border-dashed border-black/25 px-4 py-6 text-center text-sm opacity-60 dark:border-white/25">
          No gallery yet. Shown after the article body on the project page.
        </p>
      ) : null}

      <ol className="space-y-3">
        {images.map((image, index) => (
          <li
            key={index}
            className="rounded-lg border border-black/15 p-3 dark:border-white/15"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs opacity-50">
                {String(index + 1).padStart(2, "0")}
              </span>
              {image.src ? (
                <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded border border-black/15 bg-black/[0.03] dark:border-white/15 dark:bg-white/[0.04]">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                    unoptimized
                  />
                </span>
              ) : null}
              <span className="flex-1" />
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Move image ${index + 1} up`}
                className="rounded border border-black/20 px-2 py-1 text-sm disabled:opacity-30 dark:border-white/25"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === images.length - 1}
                aria-label={`Move image ${index + 1} down`}
                className="rounded border border-black/20 px-2 py-1 text-sm disabled:opacity-30 dark:border-white/25"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Remove image ${index + 1}`}
                className="rounded border border-red-500/50 px-2 py-1 text-sm text-red-600 dark:text-red-400"
              >
                Remove
              </button>
            </div>

            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="font-mono text-xs uppercase tracking-wide opacity-60">
                  Image path or URL
                </span>
                <input
                  value={image.src}
                  onChange={(e) => update(index, { ...image, src: e.target.value })}
                  placeholder="https://<project>.supabase.co/storage/v1/object/public/…"
                  aria-label={`Image ${index + 1} path`}
                  className="mt-1 w-full rounded border border-black/20 bg-transparent px-2.5 py-1.5 font-mono text-sm dark:border-white/25"
                />
              </label>
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-wide opacity-60">
                  Alt text
                </span>
                <input
                  value={image.alt}
                  onChange={(e) => update(index, { ...image, alt: e.target.value })}
                  placeholder="Menu list with prices"
                  aria-label={`Image ${index + 1} alt text`}
                  className="mt-1 w-full rounded border border-black/20 bg-transparent px-2.5 py-1.5 text-[15px] dark:border-white/25"
                />
              </label>
              <label className="block">
                <span className="font-mono text-xs uppercase tracking-wide opacity-60">
                  Caption
                </span>
                <input
                  value={image.caption}
                  onChange={(e) => update(index, { ...image, caption: e.target.value })}
                  placeholder="Shown under the image"
                  aria-label={`Image ${index + 1} caption`}
                  className="mt-1 w-full rounded border border-black/20 bg-transparent px-2.5 py-1.5 text-[15px] dark:border-white/25"
                />
              </label>
            </div>
          </li>
        ))}
      </ol>

      <details className="rounded-lg border border-dashed border-black/25 p-3 dark:border-white/25">
        <summary className="cursor-pointer text-sm opacity-70">
          Paste one image path or URL per line
        </summary>
        <p className="mt-2 text-xs opacity-60">
          For images hosted elsewhere. Uploads are the usual route; this is the escape
          hatch.
        </p>
        <textarea
          value={bulk}
          onChange={(e) => setBulk(e.target.value)}
          rows={4}
          className="mt-2 w-full resize-y rounded border border-black/20 bg-transparent px-2.5 py-1.5 font-mono text-sm dark:border-white/25"
        />
        <button
          type="button"
          onClick={addFromBulk}
          disabled={bulk.trim() === ""}
          className="mt-2 rounded-full border border-black/30 px-4 py-1.5 text-sm disabled:opacity-30 dark:border-white/30"
        >
          Append
        </button>
      </details>
    </div>
  );
}
