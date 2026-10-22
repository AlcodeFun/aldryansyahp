export function EmptyState({
  message,
  defaultMessage = "nothing here yet.",
}: {
  message?: string;
  defaultMessage?: string;
}) {
  return <p className="font-mono">{message || defaultMessage}</p>;
}
