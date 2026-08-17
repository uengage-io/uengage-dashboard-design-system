import type { ReactNode } from "react";

export type TableSize = "sm" | "md" | "lg";

/** Tri-state sort. `null` means "unsorted". */
export type TableSortDirection = "asc" | "desc" | null;

export interface TableSortState {
  key: string | null;
  direction: TableSortDirection;
}

/**
 * How many rows a click can pick.
 * - "none"     — (default) no checkbox column, selection is off.
 * - "single"   — one row at a time; picking another releases the previous one.
 * - "multiple" — checkbox column with a tri-state header box.
 */
export type TableSelectionMode = "none" | "single" | "multiple";

/**
 * Per-row lifecycle tint. A deleted row greys and strikes for one beat before
 * it leaves — rows never disappear silently.
 */
export type TableRowState = "default" | "saving" | "deleted" | "disabled";

/** Chip tones used by status cells. */
export type TableStatusTone =
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "neutral";

export interface ColumnDef<T> {
  key: keyof T | string;
  header: ReactNode;
  /**
   * Proportional flex weight used to compute percentage-based column widths.
   * Columns divide the table width in ratio to their flex values.
   * e.g. [1, 2, 1] → 25% / 50% / 25%. Defaults to 1 (equal columns).
   */
  flex?: number;
  /** Explicit CSS width string (e.g. "20%", "160px") — overrides the flex-derived percentage when set. */
  width?: string;
  /** Minimum column width in pixels — prevents the column from shrinking below this on mobile scroll. */
  minWidth?: number;
  align?: "left" | "center" | "right";
  /** Alignment override for mobile card layout only. Falls back to `align` when not set. */
  mobileAlign?: "left" | "center" | "right";
  /** Vertical alignment of cell content. Defaults to "top". Use "middle" to center content vertically within the row. */
  verticalAlign?: "top" | "middle";
  render?: (value: any, row: T, index: number) => ReactNode;
  sortable?: boolean;
  hideOnMobile?: boolean;
  /** Extra Tailwind classes applied to both the <th> and <td> for this column. */
  className?: string;
  /**
   * Render digits on tabular figures so they stack down the column. Defaults to
   * `true` for right-aligned columns — numbers are the reason the rule exists.
   */
  tabular?: boolean;
  /**
   * Mark this column the identifier: semibold, and the one that stays put when
   * `stickyFirstColumn` is set. Inferred for the first column when unset.
   */
  identifier?: boolean;
  /** Custom sort comparator. Falls back to a value comparison when not given. */
  sortFn?: (a: T, b: T) => number;
}

export interface TableBulkAction<T> {
  label: ReactNode;
  /** "danger" paints the label red; everything else reads as brand green. */
  tone?: "default" | "danger";
  onClick: (rows: T[], keys: string[]) => void;
  disabled?: boolean;
}

export interface TableEmptyConfig {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Buttons or links placed under the description. */
  actions?: ReactNode;
}

export interface TableErrorConfig {
  title?: ReactNode;
  description?: ReactNode;
  /** Correlation id shown in monospace so it can be read out over a call. */
  requestId?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
}

export interface TablePaginationConfig {
  /** 1-based current page. */
  page: number;
  /** Total number of pages. Omit for cursor-style paging. */
  pageCount?: number;
  pageSize?: number;
  /** Page-size choices for the segmented control. Pass `[]` to hide it. */
  pageSizes?: number[];
  /** Total row count across all pages — drives the "Showing 1–25 of 1,584" line. */
  total?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  /** Replaces the generated "Showing x–y of n" line. */
  label?: ReactNode;
  /** Noun used in the generated label. Defaults to "rows". */
  itemLabel?: string;
  /**
   * Above this many pages the footer also offers a "Go to" box, because
   * clicking through is unreasonable. Defaults to 20.
   */
  jumpThreshold?: number;
}

export interface CustomTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyField: keyof T;
  loading?: boolean;
  /** Plain-string empty copy. `empty` takes precedence when both are given. */
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  rowClassName?: (row: T) => string;
  stickyHeader?: boolean;
  maxHeight?: string;
  bordered?: boolean;
  size?: TableSize;
  className?: string;
  /**
   * How the table renders on small screens (< md / 768px).
   * - "scroll" — (default) horizontal scroll; preserves side-by-side column comparison.
   * - "cards"  — each row becomes a labelled card; 1-col on xs, 2-col grid at sm.
   *              Columns with hideOnMobile are omitted. Recommended for mobile-first UIs.
   */
  mobileLayout?: "scroll" | "cards";

  /**
   * When `true` (default), rows highlight on hover.
   * Set to `false` to disable the hover effect entirely.
   */
  hover?: boolean;

  /* ── Sorting ──────────────────────────────────────────────────────────── */

  /** Controlled sort. Leave unset to let the table own its sort state. */
  sort?: TableSortState;
  onSortChange?: (sort: TableSortState) => void;
  /** Initial sort when uncontrolled. */
  defaultSort?: TableSortState;
  /**
   * Set when `data` arrives already sorted by the server — the table then only
   * reports sort changes instead of re-ordering rows itself.
   */
  manualSort?: boolean;

  /* ── Selection ────────────────────────────────────────────────────────── */

  selectable?: TableSelectionMode;
  /** Controlled selection, as stringified `keyField` values. */
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelectionChange?: (keys: string[], rows: T[]) => void;
  /** Rows that cannot be picked (their checkbox renders disabled). */
  isRowSelectable?: (row: T) => boolean;
  /** Actions offered in the bar that slides in above the header on selection. */
  bulkActions?: TableBulkAction<T>[];

  /* ── Row extras ───────────────────────────────────────────────────────── */

  /** Icon buttons pinned to a right-aligned last column, revealed on row hover. */
  rowActions?: (row: T, index: number) => ReactNode;
  /** Keeps the actions column visible instead of fading it in on hover. */
  alwaysShowRowActions?: boolean;
  rowState?: (row: T) => TableRowState;

  /* ── States ───────────────────────────────────────────────────────────── */

  /** Rich empty state. Falls back to `emptyMessage` when omitted. */
  empty?: TableEmptyConfig;
  /** When set, replaces the body with the error panel — data is not shown. */
  error?: TableErrorConfig | null;

  /* ── Layout ───────────────────────────────────────────────────────────── */

  /** Pins the identifier column (and the checkbox) while scrolling sideways. */
  stickyFirstColumn?: boolean;
  /** Footer pager rendered inside the table shell. */
  pagination?: TablePaginationConfig;
  /**
   * Arrow-key row focus, Space to select, ⇧-click to range-select, ⌘/Ctrl+A,
   * Enter to open, Esc to clear. On by default whenever rows are selectable
   * or clickable.
   */
  keyboardNavigation?: boolean;
  /** Number of shimmer rows drawn while `loading`. Defaults to 6. */
  loadingRows?: number;
}
