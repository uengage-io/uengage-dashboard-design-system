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
  children,
  ...props
}: TableCellProps) {
  return (
    <ShadcnTableCell
      className={cn(
        tableBodyRowVariants({ size, hover: false }),
        alignClass[align],
        // Allow content to wrap and break long words/URLs that would otherwise
        // force the column wider than its flex-allocated share.
        "whitespace-normal break-words align-top",
        className,
      )}
      {...props}
    >
      {/* Inner div constrains content to the cell width so overflow-wrap works
          correctly inside table cells across all browsers. */}
      <div className="min-w-0 w-full">{children}</div>
    </ShadcnTableCell>
  );
}
