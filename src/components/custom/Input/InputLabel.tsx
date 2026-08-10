import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { INPUT_COLORS } from "./inputVariants";
import type { InputSize } from "@/types/input";

export type InputLabelSize = InputSize;

export interface InputLabelProps extends React.ComponentProps<typeof Label> {
  size?: InputLabelSize;
  required?: boolean;
  /**
   * Overrides the label colour for a signalling state (error / disabled). Left
   * undefined the colour comes from a class, so a caller's `className` can
   * still override it.
   */
  tone?: string;
}

/**
 * Size and default colour ride on classes rather than inline styles so that a
 * caller's `className` (e.g. `"text-gray-900"`) keeps winning through
 * tailwind-merge, as it did before the design refresh.
 */
const SIZE_TEXT: Record<InputLabelSize, string> = {
  xs: "text-[11px]",
  sm: "text-[12px]",
  md: "text-[12px]",
  lg: "text-[13px]",
};

/** Figtree 600 / 12px, Title Case, red asterisk when required. */
function InputLabel({
  size = "md",
  required = false,
  tone,
  className,
  style,
  children,
  ...props
}: InputLabelProps) {
  return (
    <Label
      className={cn(
        "font-semibold leading-[1.3] text-[#161616]",
        SIZE_TEXT[size],
        className,
      )}
      style={tone ? { color: tone, ...style } : style}
      {...props}
    >
      <span className="inline text-pretty">
        {children}
        {required && (
          <span aria-hidden="true" style={{ color: INPUT_COLORS.errorLabel }}>
            *
          </span>
        )}
      </span>
    </Label>
  );
}

InputLabel.displayName = "InputLabel";

export { InputLabel };
