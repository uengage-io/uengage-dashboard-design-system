import type { ComponentProps } from "react";
import { TableCell as ShadcnTableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { TableSize } from "@/types/table";
import { tableBodyRowVariants } from "@/utils/table";
import { TABLE_COLORS, TABLE_SIZES } from "./tableTokens";

export interface TableCellProps extends ComponentProps<"td"> {
  size?: TableSize;
  align?: "left" | "center" | "right";
  /**
   * Defaults to "middle" — rows have a fixed height, so centred content is what
   * reads as a row. Pass "top" for cells that stack several lines.
   */
  verticalAlign?: "top" | "middle";
  /** Render digits on tabular figures so they stack down the column. */
  tabular?: boolean;
  /** The identifier column: semibold, and never truncated. */
  identifier?: boolean;
  /** Text colour override — row states (saving, deleted) drive this. */
  color?: string;
  /** Strikes the content through, for a row on its way out. */
  strike?: boolean;
  /** Row height in px. Behaves as a minimum on a table cell. */
  height?: number;
  /** Pins the cell while the table scrolls sideways. */
  sticky?: boolean;
  /** Left offset for a pinned cell, px. */
  stickyOffset?: number;
  /** Background painted behind a pinned cell so scrolled content cannot show through. */
  stickyBackground?: string;
  /** Only the outermost pinned cell draws the shadow, so it reads as one edge. */
  stickyShadow?: boolean;
  /** Horizontal padding override, px. Falls back to the size scale. */
  padX?: number;
  /** Vertical padding override, px. Falls back to the size scale. */
  padY?: number;
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function TableCell({
  size = "md",
  align = "left",
  verticalAlign = "middle",
  tabular = false,
  identifier = false,
  color,
  strike = false,
  height,
  sticky = false,
  stickyOffset = 0,
  stickyBackground,
  stickyShadow = true,
  padX,
  padY,
  className,
  children,
  style,
  ...props
}: TableCellProps) {
  const spec = TABLE_SIZES[size];
  const pad = padX ?? spec.cellPadX;
  // border-box means this sits inside `height`, so a single-line row keeps its
  // exact size and only a stacked cell grows — with room around the content
  // instead of pressing against the rules.
  const padVertical = padY ?? spec.cellPadY;

  return (
    <ShadcnTableCell
      className={cn(
        tableBodyRowVariants({ size, hover: false }),
        alignClass[align],
        // Allow content to wrap and break long words/URLs that would otherwise
        // force the column wider than its flex-allocated share.
        "whitespace-normal break-words [hyphens:none]",
        verticalAlign === "middle" ? "align-middle" : "align-top",
        tabular && "ue-tabular",
        className,
      )}
      style={{
        height,
        // Stated rather than inherited from a preflight the consumer may not
        // load — it is what keeps `height` and the vertical padding agreeing.
        boxSizing: "border-box",
        paddingLeft: pad,
        paddingRight: pad,
        paddingTop: padVertical,
        paddingBottom: padVertical,
        fontSize: spec.fontSize,
        // Horizontal rules only — no vertical grid lines, ever.
        borderBottom: `1px solid ${TABLE_COLORS.rowRule}`,
        color: color ?? (identifier ? TABLE_COLORS.fg1 : undefined),
        fontWeight: identifier ? 600 : undefined,
        textDecoration: strike ? "line-through" : undefined,
        fontVariantNumeric: tabular ? "tabular-nums" : undefined,
        ...(sticky
          ? {
              position: "sticky",
              left: stickyOffset,
              zIndex: 2,
              background: stickyBackground,
              boxShadow: stickyShadow ? TABLE_COLORS.pinShadow : undefined,
            }
          : null),
        ...style,
      }}
      {...props}
    >
      {/* Inner div constrains content to the cell width so overflow-wrap works
          correctly inside table cells across all browsers. */}
      <div className={cn("min-w-0 w-full", identifier && "whitespace-nowrap")}>
        {children}
      </div>
    </ShadcnTableCell>
  );
}
