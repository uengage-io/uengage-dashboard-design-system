export const MAX_LABEL_WORDS = 10;

export function countWords(value: unknown): number {
  if (typeof value !== "string") return 0;
  return value.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Returns the label clipped to at most `max` words with a trailing ellipsis
 * when it overflows. Non-string ReactNode labels pass through untouched
 * because their text content can't be measured reliably.
 */
export function truncateLabelToWordLimit<T>(
  label: T,
  max: number = MAX_LABEL_WORDS,
): T | string {
  if (typeof label !== "string") return label;
  const words = label.trim().split(/\s+/).filter(Boolean);
  if (words.length <= max) return label;
  return `${words.slice(0, max).join(" ")}…`;
}

/**
 * Dev-time soft check — logs a warning when a label exceeds `max` words so
 * authors notice they're relying on the truncation fallback. Never throws.
 */
export function validateLabelWordLimit(
  label: unknown,
  component: string,
  max: number = MAX_LABEL_WORDS,
): void {
  if (typeof label !== "string") return;
  const words = countWords(label);
  if (words > max) {
    console.warn(
      `[${component}] label exceeds ${max} words (got ${words}); display will be truncated with an ellipsis.`,
    );
  }
}
