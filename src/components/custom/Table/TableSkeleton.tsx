import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface TableSkeletonProps {
  rows?: number;
  columns: number;
  className?: string;
}

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
            <TableCell key={colIndex} className={cn("py-3")}>
              <Skeleton className="h-4 w-full max-w-[160px]" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
