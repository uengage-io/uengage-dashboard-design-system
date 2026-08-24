import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type InputLabelSize = "sm" | "md" | "lg";

export interface InputLabelProps
  extends React.ComponentProps<typeof Label> {
  size?: InputLabelSize;
  required?: boolean;
}

const SIZE_TEXT: Record<InputLabelSize, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
};

function InputLabel({
  size = "md",
  required = false,
  className,
  children,
  ...props
}: InputLabelProps) {
  return (
    <Label
      className={cn(SIZE_TEXT[size], "font-medium text-slate-700", className)}
      {...props}
    >
      <span className="inline">
        {children}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-red-500">*</span>
        )}
      </span>
    </Label>
  );
}

InputLabel.displayName = "InputLabel";

export { InputLabel };
