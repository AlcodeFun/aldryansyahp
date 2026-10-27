export function EmptyState({
  message,
  defaultMessage = "Nothing here yet.",
}: {
  message?: string;
  defaultMessage?: string;
}) {
  return (
    <p className="border-l-4 border-yellow bg-surface px-6 py-5 text-muted ring-1 ring-line">
      {message || defaultMessage}
    </p>
  );
}
