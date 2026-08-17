import type { ComponentProps } from "react";
import { ArrowUp } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { TableSize, TableSortDirection } from "@/types/table";
import { tableHeaderRowVariants } from "@/utils/table";
import { TABLE_COLORS, TABLE_SIZES } from "./tableTokens";

/** Kept as a named export — it predates `TableSortDirection` in the types barrel. */
export type SortDirection = TableSortDirection;

export interface TableHeaderCellProps
  extends Omit<ComponentProps<"th">, "onClick"> {
  size?: TableSize;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sorted?: SortDirection;
  onSort?: () => void;
  /** Draws the pinned-column shadow and takes the cell out of the scroll flow. */
  sticky?: boolean;
  /** Left offset for a pinned cell, px. */
  stickyOffset?: number;
  /** Only the outermost pinned cell draws the shadow, so it reads as one edge. */
  stickyShadow?: boolean;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

const justifyClass = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const;

export function TableHeaderCell({
  size = "md",
  align = "left",
  sortable = false,
  sorted = null,
  onSort,
  sticky = false,
  stickyOffset = 0,
  stickyShadow = true,
  className,
  children,
  style,
  ...props
}: TableHeaderCellProps) {
  const spec = TABLE_SIZES[size];
  const active = sorted !== null;
  const handleClick = sortable ? onSort : undefined;

  return (
    <TableHead
      aria-sort={
        sortable
          ? sorted === "asc"
            ? "ascending"
            : sorted === "desc"
              ? "descending"
              : "none"
          : undefined
      }
      onClick={handleClick}
      className={cn(
        tableHeaderRowVariants({ size }),
        alignClass[align],
        "whitespace-nowrap align-middle",
        sortable && "cursor-pointer select-none",
        className,
      )}
      style={{
        height: spec.headerHeight,
        boxSizing: "border-box",
        paddingLeft: spec.cellPadX,
        paddingRight: spec.cellPadX,
        background: TABLE_COLORS.headerBg,
        borderBottom: `1px solid ${TABLE_COLORS.headerRule}`,
        ...(sticky
          ? {
              position: "sticky",
              left: stickyOffset,
              zIndex: 4,
              boxShadow: stickyShadow ? TABLE_COLORS.pinShadow : undefined,
            }
          : null),
        ...style,
      }}
      {...props}
    >
      <span
        className={cn(
          "flex items-center gap-[5px] min-w-0",
          justifyClass[align],
          // On a right-aligned column the arrow belongs on the label's left, so
          // the header's last glyph still lines up with the digits below it.
          align === "right" && "flex-row-reverse",
        )}
        style={{
          fontSize: 11,
          fontWeight: 600,
          lineHeight: 1.3,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: active ? TABLE_COLORS.headerActiveFg : TABLE_COLORS.headerFg,
          transition: "color 120ms linear",
        }}
      >
        <span className="min-w-0 truncate">{children}</span>
        {sortable ? (
          <ArrowUp
            aria-hidden="true"
            size={11}
            strokeWidth={2.4}
            style={{
              flex: "none",
              opacity: active ? 1 : 0.28,
              transform: sorted === "desc" ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 120ms linear, opacity 120ms linear",
            }}
          />
        ) : null}
      </span>
    </TableHead>
  );
}
