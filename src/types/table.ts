import type { ReactNode } from "react";

export interface ColumnDef<T> {
  key: keyof T | string;
  header: ReactNode;
  /**
   * Proportional flex weight used to compute percentage-based column widths.
   * Columns divide the table width in ratio to their flex values.
   * e.g. [1, 2, 1] → 25% / 50% / 25%. Defaults to 1 (equal columns).
   */
  flex?: number;
  /** Minimum column width in pixels — prevents the column from shrinking below this on mobile scroll. */
  minWidth?: number;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T, index: number) => ReactNode;
  sortable?: boolean;
  hideOnMobile?: boolean;
  /** Extra Tailwind classes applied to both the <th> and <td> for this column. */
  className?: string;
}

export interface CustomTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyField: keyof T;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  rowClassName?: (row: T) => string;
  stickyHeader?: boolean;
  maxHeight?: string;
  bordered?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  /**
   * How the table renders on small screens (< md / 768px).
   * - "scroll"  — horizontal scroll (default, existing behaviour)
   * - "cards"   — each row becomes a labelled card; columns with hideOnMobile are omitted
   */
  mobileLayout?: "scroll" | "cards";
}
