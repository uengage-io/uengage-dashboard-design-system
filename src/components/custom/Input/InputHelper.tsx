import * as React from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { INPUT_SIZES, getMessageColor } from "./inputVariants";
import type { InputVisualState } from "./inputVariants";
import type { InputSize } from "@/types/input";

export type InputHelperSize = InputSize;

export interface InputHelperProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: InputHelperSize;
  helperText?: string;
  error?: string;
  /** Resolved control state — drives the message colour. */
  state?: InputVisualState;
  /**
   * Keep the row in the layout even with nothing to say, so validation never
   * shifts the form. The field enables this only for fields that can actually
   * produce a message.
   */
  reserveSpace?: boolean;
}

/**
 * The message row. Validation always pairs a colour with a message and an
 * icon; advisory statuses carry the colour alone.
 */
function InputHelper({
  size = "md",
  helperText,
  error,
  state = "default",
  reserveSpace = false,
  className,
  style,
  ...props
}: InputHelperProps) {
  const showError = Boolean(error);
  const text = showError ? error : helperText;

  if (!text && !reserveSpace) return null;

  const fontSize = INPUT_SIZES[size].message;

  return (
    <p
      role={showError ? "alert" : undefined}
      className={cn("inline-flex items-start gap-[5px] leading-[1.4]", className)}
      style={{
        fontSize,
        minHeight: Math.round(fontSize * 1.45),
        color: getMessageColor(state, showError),
        ...style,
      }}
      {...props}
    >
      {showError && (
        <CircleAlert
          aria-hidden="true"
          strokeWidth={2.2}
          className="shrink-0"
          style={{ width: fontSize + 1, height: fontSize + 1, marginTop: 1 }}
        />
      )}
      {text && <span>{text}</span>}
    </p>
  );
}

InputHelper.displayName = "InputHelper";

export { InputHelper };
