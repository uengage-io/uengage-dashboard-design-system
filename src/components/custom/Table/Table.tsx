import { useMemo, useState } from "react";
import {
  Table as T,
  TableBody,
  TableCell as ShadcnTableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { CustomTableProps } from "@/types/table";
import {
  tableBodyRowVariants,
  tableWrapperVariants,
} from "@/utils/table";
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

  const scrollStyle =
    stickyHeader && maxHeight ? { maxHeight } : undefined;

  return (
    <div className={cn(tableWrapperVariants({ bordered }), className)}>
      <div
        className={cn(
          "overflow-x-auto",
          stickyHeader && "overflow-y-auto",
        )}
        style={scrollStyle}
      >
        <T>
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
                    style={{ width: col.width, minWidth: col.minWidth }}
                    className={cn(
                      col.hideOnMobile && "hidden md:table-cell",
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
                  (row as Record<string, unknown>)[
                    keyField as string
                  ] ?? rowIndex,
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
                      const rawValue = (row as Record<string, unknown>)[
                        colKey
                      ];
                      const content = col.render
                        ? col.render(rawValue, row, rowIndex)
                        : (rawValue as React.ReactNode);
                      return (
                        <TableCell
                          key={colKey}
                          size={size}
                          align={col.align ?? "left"}
                          style={{
                            width: col.width,
                            minWidth: col.minWidth,
                          }}
                          className={cn(
                            col.hideOnMobile && "hidden md:table-cell",
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
