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
        <div className="flex flex-col gap-2 sm:gap-3 md:hidden">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-white p-3 sm:p-4 space-y-2 sm:space-y-3">
                {visibleColumns.map((_, j) => (
                  <Skeleton key={j} className="h-4 w-full" />
                ))}
              </div>
            ))
          ) : sortedData.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              {emptyMessage}
            </p>
          ) : (
            sortedData.map((row, rowIndex) => {
              const rowKey = String(
                (row as Record<string, unknown>)[keyField as string] ??
                  rowIndex,
              );
              return (
                <div
                  key={rowKey}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={cn(
                    "rounded-lg border border-gray-200 bg-white p-3 sm:p-4",
                    onRowClick &&
                      "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors",
                    rowClassName?.(row),
                  )}
                >
                  {visibleColumns.map((col) => {
                    const colKey = String(col.key);
                    const rawValue = (row as Record<string, unknown>)[colKey];
                    const content = col.render
                      ? col.render(rawValue, row, rowIndex)
                      : (rawValue as React.ReactNode);
                    return (
                      <div
                        key={colKey}
                        className="flex items-start justify-between gap-3 sm:gap-4 border-b border-gray-100 py-1.5 sm:py-2 first:pt-0 last:border-0 last:pb-0"
                      >
                        <span className="shrink-0 text-xs font-medium text-gray-500">
                          {col.header}
                        </span>
                        <div
                          className={cn(
                            "text-sm flex-1 min-w-0",
                            col.align === "center"
                              ? "text-center"
                              : col.align === "right"
                                ? "text-right"
                                : "text-left",
                          )}
                        >
                          {content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── Table view (always on "scroll"; md+ only on "cards") ──────── */}
      <div
        className={cn(
          "overflow-x-auto",
          // Clip table cells to the rounded corners — overflow:auto on this
          // element also clips to border-radius, so no parent overflow-hidden needed.
          bordered && "rounded-lg",
          stickyHeader && "overflow-y-auto",
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
