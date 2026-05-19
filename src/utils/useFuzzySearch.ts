import { useMemo } from "react";
import Fuse from "fuse.js";


export function useFuzzySearch<T extends { label: string }>(
  items: T[],
  query: string,
): T[] {
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["label"],
        threshold: 0.35,     
        minMatchCharLength: 1,
        ignoreLocation: true, 
        shouldSort: true,     
      }),
    [items],
  );

  return useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    return fuse.search(q).map((r) => r.item);
  }, [fuse, query, items]);
}
