import * as React from "react";
import { cn } from "../../../lib/utils";
import { LAYOUT, toCssSize, type CssSize } from "../../../utils/layoutTokens";

export type GridColumns =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "2:1"
  | "1:2"
  | "3:1"
  | "1:3"
  | "1:1:2"
  | "2:1:1"
  | (string & {});

export type GridLimit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/**
 * Responsive Tailwind classes for each column preset.
 * Mobile-first: columns collapse on small screens and expand at breakpoints.
 */
const RESPONSIVE_COLUMN_CLASSES: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  "5": "grid-cols-2 sm:grid-cols-3 xl:grid-cols-5",
  "6": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6",
  "7": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7",
  "8": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8",
  "2:1": "grid-cols-1 md:[grid-template-columns:2fr_1fr]",
  "1:2": "grid-cols-1 md:[grid-template-columns:1fr_2fr]",
  "3:1": "grid-cols-1 md:[grid-template-columns:3fr_1fr]",
  "1:3": "grid-cols-1 md:[grid-template-columns:1fr_3fr]",
  "1:1:2": "grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:1fr_1fr_2fr]",
  "2:1:1": "grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:2fr_1fr_1fr]",
};

/** Default gap (px) per column preset. */
const GAP_MAP: Record<string, number> = {
  "1": 0,
  "2": 20,
  "3": 20,
  "4": 12,
  "5": 12,
  "6": 0,
  "7": 0,
  "8": 0,
  "2:1": 20,
  "1:2": 20,
  "3:1": 12,
  "1:3": 12,
  "1:1:2": 12,
  "2:1:1": 12,
};

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column layout. A preset name or raw CSS grid-template-columns value. */
  columns?: GridColumns;
  /**
   * Number of equal-width columns per row (1–8). When provided, takes
   * precedence over `columns`.
   */
  limit?: GridLimit;
  /**
   * Gap between columns. When omitted, automatically determined by the
   * column preset (e.g. "2" → 20px, "4" → 12px, "6" → 0).
   * Pass a value to override.
   */
  gap?: CssSize;
  /** Row gap (if different from column gap). */
  rowGap?: CssSize;
}

function Grid({
  columns = "1",
  limit,
  gap,
  rowGap = "20px",
  className,
  style,
  children,
  ...props
}: GridProps) {
  const effectiveColumns = limit ? String(limit) : columns;
  const isPreset = effectiveColumns in RESPONSIVE_COLUMN_CLASSES;
  const resolvedGap = gap ?? GAP_MAP[effectiveColumns] ?? LAYOUT.gap.sm;

  return (
    <div
      data-slot="grid-wrapper"
      className={cn("w-full", className)}
      style={style}
      {...props}
    >
      <div
        data-slot="grid"
        className={cn(
          "grid w-full mt-5",
          isPreset && RESPONSIVE_COLUMN_CLASSES[effectiveColumns],
        )}
        style={{
          ...(isPreset ? {} : { gridTemplateColumns: effectiveColumns }),
          columnGap: toCssSize(resolvedGap),
          rowGap: toCssSize(rowGap ?? resolvedGap),
        }}
      >
        {children}
      </div>
    </div>
  );
}

Grid.displayName = "Grid";

export { Grid };
