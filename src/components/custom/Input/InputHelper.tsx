import * as React from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export type InputHelperSize = "sm" | "md" | "lg";

export interface InputHelperProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: InputHelperSize;
  helperText?: string;
  error?: string;
}

const SIZE_TEXT: Record<InputHelperSize, string> = {
  sm: "text-[11px]",
  md: "text-xs",
  lg: "text-sm",
};

const ICON_SIZE: Record<InputHelperSize, string> = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
};

function InputHelper({
  size = "md",
  helperText,
  error,
  className,
  ...props
}: InputHelperProps) {
  if (!error && !helperText) return null;

  const showError = Boolean(error);

  return (
    <p
      role={showError ? "alert" : undefined}
      className={cn(
        "inline-flex items-center gap-1",
        SIZE_TEXT[size],
        showError ? "text-red-500" : "text-slate-500",
        className,
      )}
      {...props}
    >
      {showError && (
        <CircleAlert aria-hidden="true" className={cn(ICON_SIZE[size], "shrink-0")} />
      )}
      <span>{showError ? error : helperText}</span>
    </p>
  );
}

InputHelper.displayName = "InputHelper";

export { InputHelper };
