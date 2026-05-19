const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Returns e.g. "Apr 17, 2026" */
export function formatDate(date: Date | null | undefined): string | null {
  if (!date) return null;
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/** Returns e.g. "Apr 1, 2026 – Apr 17, 2026" */
export function formatRange(from: Date | null | undefined, to: Date | null | undefined): string | null {
  const f = formatDate(from);
  const t = formatDate(to);
  if (!f && !t) return null;
  return `${f ?? "—"} – ${t ?? "—"}`;
}

/** Returns e.g. "May 2026" */
export function formatMonthYear(date: Date | null | undefined): string | null {
  if (!date) return null;
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
