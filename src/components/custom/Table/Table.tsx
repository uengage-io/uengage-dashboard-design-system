import { useCallback, useMemo, useRef, useState } from "react";
import {
  Table as TableRoot,
  TableBody,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { ColumnDef, CustomTableProps, TableSortState } from "@/types/table";
import { tableBodyRowVariants, tableWrapperVariants } from "@/utils/table";
import { TableCell } from "./TableCell";
import { TableEmptyValue } from "./TableCells";
import { TableCheckbox } from "./TableCheckbox";
import { TableHeaderCell } from "./TableHeaderCell";
import { TablePaginationBar } from "./TablePaginationBar";
import { TableSelectionBar } from "./TableSelectionBar";
import { TableSkeleton } from "./TableSkeleton";
import { TableEmptyState, TableErrorState } from "./TableStates";
import {
  getTableRowStateSpec,
  TABLE_COLORS,
  TABLE_SIZES,
} from "./tableTokens";

const NO_SORT: TableSortState = { key: null, direction: null };

function isBlank(value: unknown): boolean {
  return value === null || value === undefined || value === "";
}

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
  sort,
  onSortChange,
  defaultSort,
  manualSort = false,
  selectable = "none",
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  isRowSelectable,
  bulkActions,
  rowActions,
  alwaysShowRowActions = false,
  rowState,
  empty,
  error,
  stickyFirstColumn = false,
  pagination,
  keyboardNavigation,
  loadingRows = 6,
}: CustomTableProps<T>) {
  const spec = TABLE_SIZES[size];

  /* ── Sorting ─────────────────────────────────────────────────────────── */

  const [internalSort, setInternalSort] = useState<TableSortState>(
    defaultSort ?? NO_SORT,
  );
  const activeSort = sort ?? internalSort;
  const sortKey = activeSort.key;
  const sortDir = activeSort.direction;

  const columnByKey = useMemo(() => {
    const map = new Map<string, ColumnDef<T>>();
    columns.forEach((col) => map.set(String(col.key), col));
    return map;
  }, [columns]);

  const sortedData = useMemo(() => {
    if (manualSort || !sortKey || !sortDir) return data;
    const col = columnByKey.get(sortKey);
    if (col?.sortFn) {
      const rows = [...data].sort(col.sortFn);
      return sortDir === "asc" ? rows : rows.reverse();
    }
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
  }, [data, sortKey, sortDir, manualSort, columnByKey]);

  const toggleSort = (key: string) => {
    let next: TableSortState;
    if (sortKey !== key) {
      next = { key, direction: "asc" };
    } else if (sortDir === "asc") {
      next = { key, direction: "desc" };
    } else if (sortDir === "desc") {
      next = NO_SORT;
    } else {
      next = { key, direction: "asc" };
    }
    if (sort === undefined) setInternalSort(next);
    onSortChange?.(next);
  };

  /* ── Selection ───────────────────────────────────────────────────────── */

  const selectionOn = selectable !== "none";
  const getKey = useCallback(
    (row: T, index: number) =>
      String((row as Record<string, unknown>)[keyField as string] ?? index),
    [keyField],
  );

  const [internalSelection, setInternalSelection] = useState<string[]>(
    defaultSelectedKeys ?? [],
  );
  const selection = selectedKeys ?? internalSelection;
  const selectionSet = useMemo(() => new Set(selection), [selection]);

  const commitSelection = useCallback(
    (keys: string[]) => {
      if (selectedKeys === undefined) setInternalSelection(keys);
      if (onSelectionChange) {
        const wanted = new Set(keys);
        const rows = sortedData.filter((row, index) =>
          wanted.has(getKey(row, index)),
        );
        onSelectionChange(keys, rows);
      }
    },
    [selectedKeys, onSelectionChange, sortedData, getKey],
  );

  const canSelectRow = useCallback(
    (row: T) => {
      if (!selectionOn) return false;
      if (getTableRowStateSpec(rowState?.(row)).inert) return false;
      return isRowSelectable ? isRowSelectable(row) : true;
    },
    [selectionOn, rowState, isRowSelectable],
  );

  const selectableKeys = useMemo(
    () =>
      sortedData.reduce<string[]>((keys, row, index) => {
        if (canSelectRow(row)) keys.push(getKey(row, index));
        return keys;
      }, []),
    [sortedData, canSelectRow, getKey],
  );

  const selectedCount = selection.length;
  const allSelected =
    selectableKeys.length > 0 &&
    selectableKeys.every((key) => selectionSet.has(key));
  const someSelected = selectedCount > 0 && !allSelected;

  const toggleRow = (key: string, row: T) => {
    if (!canSelectRow(row)) return;
    if (selectable === "single") {
      commitSelection(selectionSet.has(key) ? [] : [key]);
      return;
    }
    commitSelection(
      selectionSet.has(key)
        ? selection.filter((k) => k !== key)
        : [...selection, key],
    );
  };

  const toggleAll = () => {
    if (selectable !== "multiple") return;
    commitSelection(allSelected ? [] : selectableKeys);
  };

  // Anchor for ⇧-click and ⇧+↑↓ range selection.
  const anchorRef = useRef<number | null>(null);

  const selectRange = (from: number, to: number) => {
    if (selectable !== "multiple") return;
    const [start, end] = from <= to ? [from, to] : [to, from];
    const keys = new Set(selection);
    for (let i = start; i <= end; i++) {
      const row = sortedData[i];
      if (row && canSelectRow(row)) keys.add(getKey(row, i));
    }
    commitSelection([...keys]);
  };

  /* ── Hover / focus ───────────────────────────────────────────────────── */

  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  // Rows are reached through the scroll container rather than per-row refs, so
  // this keeps working on React 18 where a plain <tr> component takes no ref.
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const keyboardOn =
    keyboardNavigation ?? (selectionOn || Boolean(onRowClick));

  const focusRow = (index: number) => {
    const clamped = Math.min(Math.max(0, index), sortedData.length - 1);
    if (clamped < 0) return;
    setFocusedIndex(clamped);
    scrollRef.current
      ?.querySelectorAll<HTMLTableRowElement>("tbody > tr")
      [clamped]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!keyboardOn || sortedData.length === 0) return;

    // Keys typed inside a control living in a cell belong to that control —
    // Space in a text input, arrows in a select, ⌘A to select its text.
    const target = event.target as HTMLElement | null;
    if (
      target?.closest(
        "input, textarea, select, button, a, [contenteditable='true']",
      )
    ) {
      return;
    }

    const index = focusedIndex;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = index < 0 ? 0 : index + (event.key === "ArrowDown" ? 1 : -1);
      if (event.shiftKey && selectable === "multiple") {
        if (anchorRef.current === null) anchorRef.current = index < 0 ? 0 : index;
        selectRange(anchorRef.current, Math.min(Math.max(0, next), sortedData.length - 1));
      } else {
        anchorRef.current = null;
      }
      focusRow(next);
      return;
    }

    if (event.key === "Escape") {
      if (selectedCount === 0) return;
      event.preventDefault();
      anchorRef.current = null;
      commitSelection([]);
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a") {
      if (selectable !== "multiple") return;
      event.preventDefault();
      commitSelection(selectableKeys);
      return;
    }

    if (index < 0) return;
    const row = sortedData[index];
    if (!row) return;

    if (event.key === " " || event.key === "Spacebar") {
      if (!selectionOn) return;
      event.preventDefault();
      anchorRef.current = index;
      toggleRow(getKey(row, index), row);
      return;
    }

    if (event.key === "Enter") {
      if (!onRowClick) return;
      event.preventDefault();
      if (!getTableRowStateSpec(rowState?.(row)).inert) onRowClick(row);
    }
  };

  /* ── Geometry ────────────────────────────────────────────────────────── */

  const selectColWidth = spec.edgePad + 24;
  const actionsColWidth = spec.edgePad + 36;
  const hasActions = Boolean(rowActions);

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
  // Left at 0 when no column declares a minWidth, so the table still falls back
  // to "max-content" rather than being pinned to the extra columns alone.
  const columnsMinWidth = columns.reduce(
    (sum, col) => sum + (col.minWidth ?? 0),
    0,
  );
  const tableMinWidth =
    columnsMinWidth > 0
      ? columnsMinWidth +
        (selectionOn ? selectColWidth : 0) +
        (hasActions ? actionsColWidth : 0)
      : 0;

  /** Left/right padding so the first and last cells clear the table's edge. */
  const cellPadding = (colIndex: number) => ({
    paddingLeft:
      colIndex === 0 && !selectionOn ? spec.edgePad : colIndex === 0 ? 0 : spec.cellPadX,
    paddingRight:
      colIndex === columns.length - 1 && !hasActions
        ? spec.edgePad
        : spec.cellPadX,
  });

  /** Identifier column: explicit flag, else the first one. */
  const isIdentifier = (col: ColumnDef<T>, colIndex: number) =>
    col.identifier ?? colIndex === 0;

  const pinnedOffset = (colIndex: number) =>
    colIndex === 0 && selectionOn ? selectColWidth : 0;

  const isPinned = (colIndex: number) => stickyFirstColumn && colIndex === 0;

  /* ── State routing ───────────────────────────────────────────────────── */

  const showError = Boolean(error);
  const isEmpty = !loading && !showError && sortedData.length === 0;

  const selectedRows = useMemo(
    () => sortedData.filter((row, index) => selectionSet.has(getKey(row, index))),
    [sortedData, selectionSet, getKey],
  );

  /* ── Render ──────────────────────────────────────────────────────────── */

  const headerRow = (
    <TableHeader
      className={cn(
        "[&_tr]:border-b-0",
        stickyHeader && "sticky top-0 z-10",
      )}
    >
      <TableRow className="border-0 hover:bg-transparent">
        {selectionOn ? (
          <TableHeaderCell
            size={size}
            sticky={stickyFirstColumn}
            stickyOffset={0}
            stickyShadow={false}
            style={{
              width: selectColWidth,
              paddingLeft: spec.edgePad,
              paddingRight: 0,
              top: stickyHeader ? 0 : undefined,
            }}
          >
            {selectable === "multiple" ? (
              <TableCheckbox
                checked={allSelected}
                indeterminate={someSelected}
                disabled={selectableKeys.length === 0}
                label="Select all rows"
                onChange={toggleAll}
              />
            ) : (
              <span className="sr-only">Select</span>
            )}
          </TableHeaderCell>
        ) : null}

        {columns.map((col, colIndex) => {
          const colKey = String(col.key);
          return (
            <TableHeaderCell
              key={colKey}
              size={size}
              align={col.align ?? "left"}
              sortable={col.sortable}
              sorted={sortKey === colKey ? sortDir : null}
              onSort={() => toggleSort(colKey)}
              sticky={isPinned(colIndex)}
              stickyOffset={pinnedOffset(colIndex)}
              className={cn(
                col.hideOnMobile && "hidden md:table-cell",
                col.className,
              )}
              style={{
                ...cellPadding(colIndex),
                top: stickyHeader ? 0 : undefined,
              }}
            >
              {col.header}
            </TableHeaderCell>
          );
        })}

        {hasActions ? (
          <TableHeaderCell
            size={size}
            align="right"
            style={{
              width: actionsColWidth,
              paddingLeft: 8,
              paddingRight: spec.edgePad,
              top: stickyHeader ? 0 : undefined,
            }}
          >
            <span className="sr-only">Actions</span>
          </TableHeaderCell>
        ) : null}
      </TableRow>
    </TableHeader>
  );

  const totalColumns =
    columns.length + (selectionOn ? 1 : 0) + (hasActions ? 1 : 0);

  const tableView = (
    <div
      className={cn(
        "scroll-smooth",
        // Any non-"visible" overflow-x forces overflow-y to compute to "auto"
        // too, which would make this div the sticky positioning container
        // instead of the viewport. So when stickyHeader is used without a
        // maxHeight (page-scroll mode), skip overflow-x-auto entirely —
        // the header needs to stick against the real viewport, not this box.
        !(stickyHeader && !maxHeight) && "overflow-x-auto",
        stickyHeader && maxHeight && "overflow-y-auto scroll-smooth",
        mobileLayout === "cards" && "hidden md:block",
      )}
      ref={scrollRef}
      style={scrollStyle}
      onKeyDown={keyboardOn ? handleKeyDown : undefined}
    >
      <TableRoot
        className="w-full"
        // shadcn's Table wraps <table> in its own "overflow-x-auto" div —
        // in page-scroll sticky mode that div would also force overflow-y
        // to compute to "auto" and hijack the sticky containing block, so
        // it needs to be neutralized here too, not just on our own wrapper.
        containerClassName={
          stickyHeader && !maxHeight ? "overflow-visible" : undefined
        }
        style={
          tableMinWidth > 0
            ? { minWidth: `${tableMinWidth}px`, borderCollapse: "collapse" }
            : { minWidth: "max-content", borderCollapse: "collapse" }
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
          {selectionOn ? <col style={{ width: selectColWidth }} /> : null}
          {columns.map((col, i) => (
            <col
              key={String(col.key)}
              style={{
                width: colWidths[i],
                minWidth: col.minWidth ? `${col.minWidth}px` : undefined,
              }}
            />
          ))}
          {hasActions ? <col style={{ width: actionsColWidth }} /> : null}
        </colgroup>

        {headerRow}

        {loading ? (
          <TableSkeleton
            columns={totalColumns}
            rows={loadingRows}
            size={size}
          />
        ) : (
          <TableBody>
            {sortedData.map((row, rowIndex) => {
              const rowKey = getKey(row, rowIndex);
              const state = rowState?.(row);
              const stateSpec = getTableRowStateSpec(state);
              const selected = selectionSet.has(rowKey);
              const hovered = hover && hoverKey === rowKey && !stateSpec.inert;
              const focused = focusedIndex === rowIndex;
              const clickable = Boolean(onRowClick) && !stateSpec.inert;

              // A keyboard-focused row takes the hover wash too — a ring on a
              // <tr> is unreliable under border-collapse, the wash is not.
              const background = selected
                ? TABLE_COLORS.selectedBg
                : (stateSpec.bg ??
                  (hovered || (focused && keyboardOn)
                    ? TABLE_COLORS.hoverBg
                    : "transparent"));
              const opaqueBackground =
                background === "transparent" ? TABLE_COLORS.surface : background;

              const actionsVisible =
                alwaysShowRowActions || hovered || selected || focused;

              return (
                <TableRow
                  key={rowKey}
                  tabIndex={
                    keyboardOn
                      ? focused || (focusedIndex < 0 && rowIndex === 0)
                        ? 0
                        : -1
                      : undefined
                  }
                  aria-selected={selectionOn ? selected : undefined}
                  data-state={selected ? "selected" : undefined}
                  onFocus={keyboardOn ? () => setFocusedIndex(rowIndex) : undefined}
                  onMouseEnter={() => setHoverKey(rowKey)}
                  onMouseLeave={() => setHoverKey(null)}
                  onClick={(event) => {
                    if (stateSpec.inert) return;
                    // ⇧-click range-selects from the last picked row instead of
                    // opening — matching the keyboard's ⇧+↑↓.
                    if (event.shiftKey && selectable === "multiple") {
                      event.preventDefault();
                      selectRange(anchorRef.current ?? rowIndex, rowIndex);
                      return;
                    }
                    anchorRef.current = rowIndex;
                    onRowClick?.(row);
                  }}
                  className={cn(
                    "border-0 outline-none",
                    tableBodyRowVariants({
                      size,
                      clickable,
                      hover: false,
                    }),
                    keyboardOn &&
                      "focus-visible:ring-2 focus-visible:ring-[#8CC42A]/55 focus-visible:ring-inset",
                    rowClassName?.(row),
                  )}
                  style={{
                    // Left unset in the resting state so a background supplied
                    // through `rowClassName` still shows; hover and selection
                    // paint inline and therefore win over it.
                    background: background === "transparent" ? undefined : background,
                    opacity: stateSpec.opacity,
                    cursor: clickable ? "pointer" : undefined,
                  }}
                >
                  {selectionOn ? (
                    <TableCell
                      size={size}
                      height={spec.rowHeight}
                      sticky={stickyFirstColumn}
                      stickyOffset={0}
                      stickyBackground={opaqueBackground}
                      stickyShadow={false}
                      style={{ paddingLeft: spec.edgePad, paddingRight: 0 }}
                    >
                      <TableCheckbox
                        checked={selected}
                        disabled={!canSelectRow(row)}
                        label={`Select row ${rowKey}`}
                        onChange={(event) => {
                          if (event.shiftKey && selectable === "multiple") {
                            selectRange(anchorRef.current ?? rowIndex, rowIndex);
                            return;
                          }
                          anchorRef.current = rowIndex;
                          toggleRow(rowKey, row);
                        }}
                      />
                    </TableCell>
                  ) : null}

                  {columns.map((col, colIndex) => {
                    const colKey = String(col.key);
                    const rawValue = (row as Record<string, unknown>)[colKey];
                    const align = col.align ?? "left";
                    const identifier = isIdentifier(col, colIndex);
                    const content = col.render
                      ? col.render(rawValue, row, rowIndex)
                      : isBlank(rawValue)
                        ? <TableEmptyValue />
                        : (rawValue as React.ReactNode);
                    const pinned = isPinned(colIndex);

                    return (
                      <TableCell
                        key={colKey}
                        size={size}
                        align={align}
                        verticalAlign={col.verticalAlign}
                        // Numbers stack on tabular figures; right-aligned columns
                        // opt in by default because that is why they are right-aligned.
                        tabular={col.tabular ?? align === "right"}
                        identifier={identifier}
                        color={stateSpec.fg}
                        strike={stateSpec.strike}
                        height={spec.rowHeight}
                        sticky={pinned}
                        stickyOffset={pinnedOffset(colIndex)}
                        stickyBackground={opaqueBackground}
                        className={cn(
                          col.hideOnMobile && "hidden md:table-cell",
                          col.className,
                        )}
                        style={cellPadding(colIndex)}
                      >
                        {content}
                      </TableCell>
                    );
                  })}

                  {hasActions ? (
                    <TableCell
                      size={size}
                      align="right"
                      height={spec.rowHeight}
                      style={{ paddingLeft: 8, paddingRight: spec.edgePad }}
                    >
                      <span
                        className="inline-flex justify-end gap-[3px] transition-opacity duration-[120ms]"
                        style={{
                          opacity: actionsVisible ? 1 : 0,
                          // visibility (not just opacity) so hidden actions are
                          // also out of the tab order.
                          visibility: actionsVisible ? "visible" : "hidden",
                        }}
                      >
                        {rowActions?.(row, rowIndex)}
                      </span>
                    </TableCell>
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </TableRoot>
    </div>
  );

  const mobileCards =
    mobileLayout === "cards" ? (
      <div className="md:hidden">
        {loading ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="space-y-2.5 rounded-xl border p-3 sm:p-4"
                style={{ borderColor: TABLE_COLORS.rowRule }}
              >
                {visibleColumns.map((__, j) => (
                  <div key={j} className="flex justify-between gap-3">
                    <span
                      style={{
                        height: 12,
                        width: "25%",
                        borderRadius: 6,
                        background: TABLE_COLORS.shimmer,
                        backgroundSize: "640px 100%",
                        animation: "ue-shimmer 1.3s linear infinite",
                      }}
                    />
                    <span
                      style={{
                        height: 12,
                        width: "40%",
                        borderRadius: 6,
                        background: TABLE_COLORS.shimmer,
                        backgroundSize: "640px 100%",
                        animation: "ue-shimmer 1.3s linear infinite",
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
            {sortedData.map((row, rowIndex) => {
              const rowKey = getKey(row, rowIndex);
              const stateSpec = getTableRowStateSpec(rowState?.(row));
              const selected = selectionSet.has(rowKey);
              const clickable = Boolean(onRowClick) && !stateSpec.inert;

              return (
                <div
                  key={rowKey}
                  onClick={clickable ? () => onRowClick?.(row) : undefined}
                  className={cn(
                    "overflow-hidden rounded-xl border transition-colors",
                    clickable && "cursor-pointer",
                    rowClassName?.(row),
                  )}
                  style={{
                    borderColor: selected
                      ? TABLE_COLORS.selectedRule
                      : TABLE_COLORS.border,
                    background: selected
                      ? TABLE_COLORS.selectedBg
                      : (stateSpec.bg ?? TABLE_COLORS.surface),
                    opacity: stateSpec.opacity,
                  }}
                >
                  {selectionOn || hasActions ? (
                    <div
                      className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4"
                      style={{ borderBottom: `1px solid ${TABLE_COLORS.rowRule}` }}
                    >
                      {selectionOn ? (
                        <TableCheckbox
                          checked={selected}
                          disabled={!canSelectRow(row)}
                          label={`Select row ${rowKey}`}
                          onChange={() => toggleRow(rowKey, row)}
                        />
                      ) : (
                        <span />
                      )}
                      {hasActions ? (
                        <span className="inline-flex gap-[3px]">
                          {rowActions?.(row, rowIndex)}
                        </span>
                      ) : null}
                    </div>
                  ) : null}

                  {visibleColumns.map((col, colIndex) => {
                    const colKey = String(col.key);
                    const rawValue = (row as Record<string, unknown>)[colKey];
                    const content = col.render
                      ? col.render(rawValue, row, rowIndex)
                      : isBlank(rawValue)
                        ? <TableEmptyValue />
                        : (rawValue as React.ReactNode);
                    const isLast = colIndex === visibleColumns.length - 1;
                    const alignment = col.mobileAlign ?? col.align;

                    return (
                      <div
                        key={colKey}
                        className="flex items-start justify-between gap-3 px-3 py-2 sm:px-4 sm:py-2.5"
                        style={
                          isLast
                            ? undefined
                            : { borderBottom: `1px solid ${TABLE_COLORS.rowRule}` }
                        }
                      >
                        <span
                          className="min-w-[72px] max-w-[40%] shrink-0 pt-0.5"
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            color: TABLE_COLORS.fg3,
                          }}
                        >
                          {col.header}
                        </span>
                        <div
                          className={cn(
                            "flex min-w-0 flex-1 items-center justify-end",
                            alignment === "left" && "justify-start",
                            alignment === "center" && "justify-center",
                            (col.tabular ?? col.align === "right") && "ue-tabular",
                          )}
                          style={{
                            fontSize: spec.fontSize,
                            fontWeight: 500,
                            color: stateSpec.fg ?? TABLE_COLORS.fg1,
                            textDecoration: stateSpec.strike ? "line-through" : undefined,
                          }}
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
    ) : null;

  return (
    <div
      className={cn(
        tableWrapperVariants({ bordered }),
        // Clips the header and footer to the rounded shell — but `overflow`
        // makes this div a scroll container, which would stop a page-scroll
        // sticky header from sticking against the viewport. So it is skipped
        // in exactly that mode.
        !(stickyHeader && !maxHeight) && "overflow-hidden",
        // Strip wrapper border on mobile when card view owns its own borders
        mobileLayout === "cards" &&
          bordered &&
          "max-md:border-0 max-md:rounded-none max-md:shadow-none",
        className,
      )}
    >
      {selectionOn && !showError ? (
        <TableSelectionBar
          count={selectedCount}
          rows={selectedRows}
          keys={selection}
          actions={bulkActions}
          onClear={() => commitSelection([])}
          padX={spec.edgePad}
        />
      ) : null}

      {showError ? (
        <TableErrorState {...(error ?? {})} />
      ) : isEmpty ? (
        <TableEmptyState {...(empty ?? {})} message={emptyMessage} />
      ) : (
        <>
          {mobileCards}
          {tableView}
        </>
      )}

      {pagination && !showError ? (
        <TablePaginationBar {...pagination} padX={spec.edgePad} />
      ) : null}
    </div>
  );
}
