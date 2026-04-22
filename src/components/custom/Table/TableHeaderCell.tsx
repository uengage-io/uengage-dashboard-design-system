import type { ComponentProps } from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  tableHeaderRowVariants,
  type TableHeaderRowVariants,
} from "@/utils/table";

export type SortDirection = "asc" | "desc" | null;

export interface TableHeaderCellProps
  extends Omit<ComponentProps<"th">, "onClick"> {
  size?: TableHeaderRowVariants["size"];
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sorted?: SortDirection;
  onSort?: () => void;
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
  className,
  children,
  ...props
}: TableHeaderCellProps) {
  const Icon =
    sorted === "asc"
      ? ChevronUp
      : sorted === "desc"
        ? ChevronDown
        : ChevronsUpDown;

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
        sortable && "cursor-pointer select-none hover:text-gray-700",
        className,
      )}
      {...props}
    >
      <span className={cn("inline-flex items-center gap-1", justifyClass[align])}>
        {children}
        {sortable ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      </span>
    </TableHead>
  );
}
