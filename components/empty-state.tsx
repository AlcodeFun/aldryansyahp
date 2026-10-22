export function EmptyState({
  message,
  defaultMessage = "nothing here yet.",
}: {
  message?: string;
  defaultMessage?: string;
}) {
  return <p className="sketch inline-block px-6 py-4 text-[var(--muted)]">{message || defaultMessage}</p>;
}
