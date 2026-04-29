import { useMemo } from "react";
import Fuse from "fuse.js";

/**
 * Shared Fuse.js hook used by SearchBar, Select, and Input.
 * Searches across the `label` field of any item array.
 * Returns the full original items sorted by match quality.
 * When query is empty, returns the original array unchanged.
 */
export function useFuzzySearch<T extends { label: string }>(
  items: T[],
  query: string,
): T[] {
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["label"],
        threshold: 0.35,      // 0 = exact only, 1 = match anything — 0.35 catches typos without noise
        minMatchCharLength: 1,
        ignoreLocation: true, // don't penalise matches that start mid-string
        shouldSort: true,     // best-score result first
      }),
    [items],
  );

  return useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    return fuse.search(q).map((r) => r.item);
  }, [fuse, query, items]);
}
