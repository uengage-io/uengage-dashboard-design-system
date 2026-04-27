import type { ComponentProps } from "react";
import { TableCell as ShadcnTableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  tableBodyRowVariants,
  type TableBodyRowVariants,
} from "@/utils/table";

export interface TableCellProps extends ComponentProps<"td"> {
  size?: TableBodyRowVariants["size"];
  align?: "left" | "center" | "right";
}

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function TableCell({
  size = "md",
  align = "left",
  className,
  ...props
}: TableCellProps) {
  return (
    <ShadcnTableCell
      className={cn(
        tableBodyRowVariants({ size }),
        alignClass[align],
        "whitespace-normal",
        className,
      )}
      {...props}
    />
  );
}
