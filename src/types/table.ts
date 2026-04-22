import type { ReactNode } from "react";

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  minWidth?: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T, index: number) => ReactNode;
  sortable?: boolean;
  hideOnMobile?: boolean;
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
}
