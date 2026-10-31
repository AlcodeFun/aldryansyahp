"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const HIDDEN_KEY = "contact-fab-hidden";
const HIDDEN_EVENT = "contact-fab-hidden";

function subscribe(onChange: () => void) {
  window.addEventListener(HIDDEN_EVENT, onChange);
  return () => window.removeEventListener(HIDDEN_EVENT, onChange);
}

function readHidden(): boolean {
  try {
    return sessionStorage.getItem(HIDDEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Floating "Reach me" button, bottom right on every public page. It opens a
 * small panel with WhatsApp and email. The × on the button hides it for the
 * rest of the browser session.
 */
export function ContactFab({ whatsapp, email }: { whatsapp: string; email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hidden = useSyncExternalStore(subscribe, readHidden, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (hidden || pathname.startsWith("/admin")) return null;

  function hide() {
    try {
      sessionStorage.setItem(HIDDEN_KEY, "1");
    } catch {}
    window.dispatchEvent(new Event(HIDDEN_EVENT));
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open ? (
        <div
          id="contact-fab-panel"
          role="dialog"
          aria-label="Reach me"
          className="w-72 overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-line"
        >
          <div className="flex items-center justify-between bg-navy px-5 py-4 text-white">
            <p className="font-display font-bold">Reach me</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-white/15"
            >
              <CloseIcon />
            </button>
          </div>
          <ul className="space-y-2 p-3">
            <li>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-soft"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25d366] text-white">
                  <WhatsAppIcon />
                </span>
                <span>
                  <span className="block font-display font-bold text-heading">WhatsApp</span>
                  <span className="text-sm text-muted">Chat with me directly</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-soft">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow text-navy">
                  <MailIcon />
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-bold text-heading">Email</span>
                  <span className="block truncate text-sm text-muted">{email}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      ) : null}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="contact-fab-panel"
          className="flex cursor-pointer items-center gap-2 rounded-full bg-yellow py-3 pl-4 pr-5 font-display font-bold text-navy shadow-xl ring-4 ring-navy/10 transition hover:-translate-y-0.5"
        >
          {open ? <CloseIcon /> : <ChatIcon />}
          Reach me
        </button>
        {!open ? (
          <button
            type="button"
            onClick={hide}
            aria-label="Hide the reach me button"
            className="absolute -left-2 -top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-navy text-white shadow-md ring-2 ring-white hover:bg-navy-2"
          >
            <CloseIcon small />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function CloseIcon({ small = false }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={small ? 3 : 2.2}
      strokeLinecap="round"
      className={small ? "h-3 w-3" : "h-5 w-5"}
      aria-hidden
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.88-9.9 9.88Zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.17-1.24-6.16-3.48-8.4Z" />
    </svg>
  );
}
