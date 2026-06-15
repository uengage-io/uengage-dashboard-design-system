import { useMemo, useState } from "react";
import {
  Table as T,
  TableBody,
  TableCell as ShadcnTableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { CustomTableProps } from "@/types/table";
import { tableBodyRowVariants, tableWrapperVariants } from "@/utils/table";
import { TableCell } from "./TableCell";
import { TableHeaderCell, type SortDirection } from "./TableHeaderCell";
import { TableSkeleton } from "./TableSkeleton";

export function Table<T>({
  columns,
  data,
  keyField,
  loading = false,
  emptyMessage = "No results",
  onRowClick,
  rowClassName,
  stickyHeader = false,
  maxHeight,
  bordered = false,
  size = "md",
  mobileLayout = "scroll",
  className,
  hover = true,
}: CustomTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return sortDir === "asc" ? -1 : 1;
      if (bv == null) return sortDir === "asc" ? 1 : -1;
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      return;
    }
    if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    } else {
      setSortDir("asc");
    }
  };

  const scrollStyle = stickyHeader && maxHeight ? { maxHeight } : undefined;

  const visibleColumns = columns.filter((col) => !col.hideOnMobile);

  // Compute proportional percentage widths from flex weights; col.width overrides when set
  const totalFlex = columns.reduce((sum, col) => sum + (col.flex ?? 1), 0);
  const colWidths = columns.map((col) =>
    col.width ?? `${(((col.flex ?? 1) / totalFlex) * 100).toFixed(2)}%`,
  );

  // Sum minWidth values across all columns — used as the table's minimum width
  // so that on narrow viewports the overflow-x-auto wrapper scrolls rather than
  // letting columns crush each other.
  const tableMinWidth = columns.reduce((sum, col) => sum + (col.minWidth ?? 0), 0);

  return (
    <div
      className={cn(
        tableWrapperVariants({ bordered }),
        // Strip wrapper border on mobile when card view owns its own borders
        mobileLayout === "cards" &&
          bordered &&
          "max-md:border-0 max-md:rounded-none",
        className,
      )}
    >
      {/* ── Mobile card view ─────────────────────────────────────────── */}
      {mobileLayout === "cards" && (
        <div className="md:hidden">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm space-y-2.5"
                >
                  <Skeleton className="h-3 w-1/3" />
                  {visibleColumns.map((_, j) => (
                    <div key={j} className="flex justify-between gap-3">
                      <Skeleton className="h-3.5 w-1/4" />
                      <Skeleton className="h-3.5 w-2/5" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : sortedData.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-500">
              {emptyMessage}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {sortedData.map((row, rowIndex) => {
                const rowKey = String(
                  (row as Record<string, unknown>)[keyField as string] ??
                    rowIndex,
                );
                return (
                  <div
                    key={rowKey}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      "rounded-xl border border-gray-100 bg-white shadow-sm",
                      "transition-colors overflow-hidden",
                      hover && onRowClick && "hover:bg-gray-50 active:bg-gray-100",
                      onRowClick && "cursor-pointer",
                      rowClassName?.(row),
                    )}
                  >
                    {visibleColumns.map((col, colIndex) => {
                      const colKey = String(col.key);
                      const rawValue = (row as Record<string, unknown>)[colKey];
                      const content = col.render
                        ? col.render(rawValue, row, rowIndex)
                        : (rawValue as React.ReactNode);
                      const isLast = colIndex === visibleColumns.length - 1;
                      return (
                        <div
                          key={colKey}
                          className={cn(
                            "flex items-start justify-between gap-3 px-3 sm:px-4 py-2 sm:py-2.5",
                            !isLast && "border-b border-gray-50",
                          )}
                        >
                          <span className="shrink-0 text-xs font-medium text-gray-400 pt-0.5 min-w-[72px] max-w-[40%]">
                            {col.header}
                          </span>
                          <div
                            className={cn(
                              "text-sm text-gray-800 font-medium flex-1 min-w-0",
                              "flex justify-end items-center",
                              col.align === "left" && "justify-start",
                              col.align === "center" && "justify-center",
                            )}
                          >
                            {content}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Table view (always on "scroll"; md+ only on "cards") ──────── */}
      <div
        className={cn(
          "overflow-x-auto scroll-smooth",
          // Clip table cells to the rounded corners — overflow:auto on this
          // element also clips to border-radius, so no parent overflow-hidden needed.
          bordered && "rounded-lg",
          stickyHeader && "overflow-y-auto scroll-smooth",
          mobileLayout === "cards" && "hidden md:block",
        )}
        style={scrollStyle}
      >
        <T
          className="w-full"
          style={
            tableMinWidth > 0
              ? { minWidth: `${tableMinWidth}px` }
              : { minWidth: "max-content" }
          }
        >
          {/*
           * colgroup sets proportional width hints (flex-derived %).
           * table-auto (the default) is intentional: with table-fixed, CSS
           * display:none on a <td> does NOT reclaim its <col> width, so
           * hideOnMobile columns leave dead space. table-auto correctly
           * collapses hidden columns and treats <col> widths as hints.
           */}
          <colgroup>
            {columns.map((col, i) => (
              <col
                key={String(col.key)}
                style={{
                  width: colWidths[i],
                  minWidth: col.minWidth ? `${col.minWidth}px` : undefined,
                }}
              />
            ))}
          </colgroup>
          <TableHeader
            className={cn(stickyHeader && "sticky top-0 z-10 bg-slate-50")}
          >
            <TableRow>
              {columns.map((col) => {
                const colKey = String(col.key);
                return (
                  <TableHeaderCell
                    key={colKey}
                    size={size}
                    align={col.align ?? "left"}
                    sortable={col.sortable}
                    sorted={sortKey === colKey ? sortDir : null}
                    onSort={() => toggleSort(colKey)}
                    className={cn(
                      col.hideOnMobile && "hidden md:table-cell",
                      col.className,
                    )}
                  >
                    {col.header}
                  </TableHeaderCell>
                );
              })}
            </TableRow>
          </TableHeader>

          {loading ? (
            <TableSkeleton columns={columns.length} />
          ) : sortedData.length === 0 ? (
            <TableBody>
              <TableRow>
                <ShadcnTableCell
                  colSpan={columns.length}
                  className="py-10 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </ShadcnTableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {sortedData.map((row, rowIndex) => {
                const rowKey = String(
                  (row as Record<string, unknown>)[keyField as string] ??
                    rowIndex,
                );
                return (
                  <TableRow
                    key={rowKey}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={cn(
                      tableBodyRowVariants({
                        size,
                        clickable: Boolean(onRowClick),
                        hover,
                      }),
                      rowClassName?.(row),
                    )}
                  >
                    {columns.map((col) => {
                      const colKey = String(col.key);
                      const rawValue = (row as Record<string, unknown>)[colKey];
                      const content = col.render
                        ? col.render(rawValue, row, rowIndex)
                        : (rawValue as React.ReactNode);
                      return (
                        <TableCell
                          key={colKey}
                          size={size}
                          align={col.align ?? "left"}
                          className={cn(
                            col.hideOnMobile && "hidden md:table-cell",
                            col.className,
                          )}
                        >
                          {content}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </T>
      </div>
    </div>
  );
}
