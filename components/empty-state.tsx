export function EmptyListIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="52" y="14" width="96" height="112" rx="8" opacity="0.35" />
      <path d="M52 92h96" opacity="0.35" />
      <path d="M68 34h48" opacity="0.55" />
      <path d="M68 48h64" opacity="0.28" />
      <path d="M68 60h40" opacity="0.28" />
      <path d="M68 108h64" opacity="0.2" strokeDasharray="4 6" />
      <path d="M68 116h36" opacity="0.2" strokeDasharray="4 6" />
      <path d="M28 44c0-2.2 1.8-4 4-4h8" opacity="0.3" />
      <path d="M28 44v18c0 2.2 1.8 4 4 4h6" opacity="0.3" />
      <path d="M172 60c0 2.2-1.8 4-4 4h-8" opacity="0.3" />
      <path d="M172 60V78c0 2.2-1.8 4-4 4h-6" opacity="0.3" />
      <circle cx="100" cy="130" r="2" opacity="0.5" />
    </svg>
  );
}

export function EmptyState({
  message,
  defaultMessage = "Nothing here yet.",
  hint,
  illustration = "list",
  className,
}: {
  message?: string;
  defaultMessage?: string;
  hint?: string;
  illustration?: "list" | "note";
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center py-10 text-center ${className ?? ""}`}>
      <div className="opacity-70">
        {illustration === "note" ? (
          <svg
            viewBox="0 0 200 140"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-32 w-44 sm:h-40 sm:w-56"
            aria-hidden="true"
          >
            <rect x="46" y="16" width="108" height="108" rx="10" opacity="0.35" />
            <path d="M66 42h56" opacity="0.55" />
            <path d="M66 58h68" opacity="0.28" />
            <path d="M66 70h68" opacity="0.28" />
            <path d="M66 82h44" opacity="0.28" />
            <path d="M66 100h40" opacity="0.2" strokeDasharray="4 6" />
            <path d="M32 66h10" opacity="0.35" />
            <path d="M32 66V96c0 3.3 2.7 6 6 6h10" opacity="0.35" />
            <path d="M168 52h-8" opacity="0.35" />
            <path d="M168 52V38c0-3.3-2.7-6-6-6h-12" opacity="0.35" />
          </svg>
        ) : (
          <EmptyListIllustration className="h-32 w-44 sm:h-40 sm:w-56" />
        )}
      </div>
      <p className="mt-8 text-lg opacity-70">{message || defaultMessage}</p>
      {hint ? (
        <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-50">{hint}</p>
      ) : null}
    </div>
  );
}
