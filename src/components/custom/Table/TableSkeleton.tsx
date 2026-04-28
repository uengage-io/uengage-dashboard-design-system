import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface TableSkeletonProps {
  rows?: number;
  columns: number;
  className?: string;
}

// Staggered widths give a natural shimmer pattern — purely cosmetic.
const SKELETON_WIDTHS = ["w-3/4", "w-2/3", "w-4/5", "w-1/2", "w-5/6"];

export function TableSkeleton({
  rows = 5,
  columns,
  className,
}: TableSkeletonProps) {
  return (
    <TableBody className={className}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((__, colIndex) => (
            <TableCell key={colIndex} className={cn("py-3 align-middle")}>
              <Skeleton
                className={cn(
                  "h-4",
                  SKELETON_WIDTHS[(rowIndex * columns + colIndex) % SKELETON_WIDTHS.length],
                )}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
