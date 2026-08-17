import type { CSSProperties } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { TableSize } from "@/types/table";
import { TABLE_COLORS, TABLE_SIZES } from "./tableTokens";

export interface TableSkeletonProps {
  rows?: number;
  columns: number;
  size?: TableSize;
  className?: string;
}

// Staggered widths give a natural shimmer pattern — purely cosmetic.
const SKELETON_WIDTHS = ["75%", "66%", "82%", "50%", "88%"];

/** The sweeping fill shared by every skeleton bar. */
export const tableShimmerStyle: CSSProperties = {
  background: TABLE_COLORS.shimmer,
  backgroundSize: "640px 100%",
  animation: "ue-shimmer 1.3s linear infinite",
  borderRadius: 8,
  display: "block",
};

export function TableSkeleton({
  rows = 6,
  columns,
  size = "md",
  className,
}: TableSkeletonProps) {
  const spec = TABLE_SIZES[size];
  const barHeight = Math.max(12, Math.round(spec.rowHeight * 0.42));

  return (
    <TableBody className={className}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="hover:bg-transparent">
          {Array.from({ length: columns }).map((__, colIndex) => (
            <TableCell
              key={colIndex}
              className={cn("align-middle")}
              style={{
                height: spec.rowHeight,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: spec.cellPadX,
                paddingRight: spec.cellPadX,
                borderBottom: `1px solid ${TABLE_COLORS.rowRule}`,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  ...tableShimmerStyle,
                  height: barHeight,
                  width:
                    SKELETON_WIDTHS[
                      (rowIndex * columns + colIndex) % SKELETON_WIDTHS.length
                    ],
                }}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
