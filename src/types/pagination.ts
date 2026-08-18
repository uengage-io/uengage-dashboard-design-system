import type { ReactNode } from "react";

export type PaginationSize = "sm" | "md" | "lg";

/**
 * Chosen by how big the set is and whether the backend can count it.
 * - "numbered"  — (default) known total under ~10k rows. Operators jump to a
 *                 remembered page number, so give them numbers.
 * - "compact"   — prev / next only, for drawers and containers under ~520px.
 *                 The labels stay: an arrow on its own is a mystery button.
 * - "cursor"    — unknown total, where `COUNT(*)` is too expensive. Newer /
 *                 Older, never page numbers — the set shifts under you.
 * - "loadMore"  — appends in place, for card grids and mobile lists where
 *                 losing scroll position hurts.
 * - "jumper"    — numbered controls plus a go-to box, over ~1,000 pages.
 */
export type PaginationVariant =
  | "numbered"
  | "compact"
  | "cursor"
  | "loadMore"
  | "jumper";

/** How the row distributes its content. */
export type PaginationAlign = "auto" | "center" | "between" | "start" | "end";

export interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Pages shown either side of the current one. */
  siblingCount?: number;
  /** Show double-chevron first/last page jumps. */
  showFirstLast?: boolean;
  size?: PaginationSize;
  disabled?: boolean;
  className?: string;

  /* ── Variant ──────────────────────────────────────────────────────────── */

  variant?: PaginationVariant;
  /** Pages always pinned at each end of the window. Defaults to 1. */
  boundaryCount?: number;

  /* ── Range label ──────────────────────────────────────────────────────── */

  /** Total row count. Supply it with `perPage` to get "6–10 of 1,284 orders". */
  total?: number;
  /** Rows per page. Drives the range label and the page-size control. */
  perPage?: number;
  /** The noun being counted — "orders", not "records". */
  itemLabel?: string;
  /** Replaces the generated range label outright. */
  rangeLabel?: ReactNode;
  /** Force the range label on or off. Defaults to on whenever it can be built. */
  showRange?: boolean;

  /* ── Page size ────────────────────────────────────────────────────────── */

  /** Choices offered by the "Rows" menu. Omit or pass `[]` to hide it. */
  perPageOptions?: number[];
  onPerPageChange?: (perPage: number) => void;
  /**
   * Keep the first visible row in view when the page size changes, instead of
   * snapping back to page 1. On by default.
   */
  anchorOnPerPageChange?: boolean;

  /* ── Jump to page ─────────────────────────────────────────────────────── */

  /** Show the "Go to" box. Implied by `variant="jumper"`. */
  showJumper?: boolean;

  /* ── Behaviour ────────────────────────────────────────────────────────── */

  /** Render nothing when there is only one page. */
  hideOnSinglePage?: boolean;
  /** A page is in flight — the current control spins and the row goes inert. */
  loading?: boolean;
  /**
   * Layout of the row. "auto" (default) centres a bare numbered control and
   * spreads the row once there is a range label, page size or jumper.
   */
  align?: PaginationAlign;
  /**
   * Sits inside a table card: a top rule, no border and no radius, so it
   * shares the card's bottom edge.
   */
  attached?: boolean;
  /** ←/→, Home/End and ⌘/Ctrl+← page from anywhere in the control. On by default. */
  keyboardNavigation?: boolean;

  /* ── Cursor variant ───────────────────────────────────────────────────── */

  hasPrev?: boolean;
  hasNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  /** Defaults to "Newer" in cursor mode and "Prev" in compact mode. */
  prevLabel?: ReactNode;
  /** Defaults to "Older" in cursor mode and "Next" in compact mode. */
  nextLabel?: ReactNode;

  /* ── Load more variant ────────────────────────────────────────────────── */

  onLoadMore?: () => void;
  /** How many rows are already loaded — prints "50 of 1,284 loaded". */
  loadedCount?: number;
  /** Defaults to "Load {perPage} more". */
  loadMoreLabel?: ReactNode;
}
