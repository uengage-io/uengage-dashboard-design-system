import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import {
  trackVariants,
  thumbVariants,
  THUMB_PENDING_TRANSLATE,
  PENDING_SPINNER_SIZE,
} from "./toggleVariants";
import type { ToggleVariantSize, ToggleVariantType } from "./toggleVariants";
import { InputLabel } from "@/components/custom/Input/InputLabel";

const PILL_PADDING: Record<ToggleVariantSize, string> = {
  xs: "gap-2 px-2 py-1",
  sm: "gap-2.5 px-2.5 py-1.5",
  md: "gap-3 px-3 py-2",
  lg: "gap-3.5 px-4 py-2.5",
};

/** 12px between the track and its title at every size, per the design. */
const GAP_ONLY: Record<ToggleVariantSize, string> = {
  xs: "gap-2",
  sm: "gap-2.5",
  md: "gap-3",
  lg: "gap-3.5",
};

const TITLE_TEXT: Record<ToggleVariantSize, string> = {
  xs: "text-[12px]",
  sm: "text-[12px]",
  md: "text-[13px]",
  lg: "text-[14px]",
};

export interface ToggleProps extends Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  "onChange" | "defaultChecked" | "checked" | "type"
> {
  /** Size of the toggle */
  size?: ToggleVariantSize;
  /** Color variant of the toggle's off (unchecked) state. Defaults to `"default"` (gray); `"danger"` makes it red. */
  type?: ToggleVariantType;
  /** Field label rendered above the toggle. */
  label?: React.ReactNode;
  /** When true, appends a red asterisk to the label. */
  required?: boolean;
  /** Inline text rendered beside the switch. Position is controlled by `titlePosition`. */
  title?: string;
  /** Where the inline title renders relative to the switch. Defaults to `"right"`. */
  titlePosition?: "left" | "right";
  /** Controlled checked state */
  checked?: boolean;
  /** Initial state for uncontrolled mode */
  defaultChecked?: boolean;
  /** Callback when toggle state changes */
  onChange?: (checked: boolean) => void;
  /** Extra className applied to the outermost wrapper */
  wrapperClassName?: string;
  /** When true, the toggle shows its current state but cannot be changed. */
  readOnly?: boolean;
  /**
   * Parks the knob mid-track with a spinner until the server confirms the
   * flip. The toggle cannot be changed while pending.
   */
  pending?: boolean;
  /** When provided together with bgColor, enables pill look. Border color applied when checked. */
  borderColor?: string;
  /** When provided together with borderColor, enables pill look. Background color applied when checked. */
  bgColor?: string;
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(
  (
    {
      size = "md",
      type = "default",
      label,
      required,
      title,
      titlePosition = "right",
      checked,
      defaultChecked,
      onChange,
      disabled,
      readOnly,
      pending,
      wrapperClassName,
      borderColor,
      bgColor,
      ...props
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isChecked = checked !== undefined ? checked : internalChecked;

    const hasCustomColors = !!(borderColor || bgColor);

    const pillStyle: React.CSSProperties | undefined = hasCustomColors
      ? {
          ...(borderColor ? { borderColor } : {}),
          ...(isChecked && bgColor ? { backgroundColor: bgColor } : {}),
        }
      : undefined;

    const switchEl = (
      <SwitchPrimitive.Root
        ref={ref}
        checked={checked !== undefined ? checked : undefined}
        defaultChecked={checked !== undefined ? undefined : defaultChecked}
        onCheckedChange={
          readOnly || pending
            ? undefined
            : (val) => { setInternalChecked(val); onChange?.(val); }
        }
        disabled={disabled}
        aria-busy={pending || undefined}
        className={cn(
          trackVariants({ size, type }),
          readOnly && "pointer-events-none cursor-default",
          pending &&
            "pointer-events-none cursor-progress bg-[#8CA695] data-[state=checked]:bg-[#8CA695] data-[state=unchecked]:bg-[#8CA695]",
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            thumbVariants({ size, type }),
            pending && THUMB_PENDING_TRANSLATE[size],
          )}
        >
          {pending && (
            <span
              aria-hidden="true"
              className={cn(
                PENDING_SPINNER_SIZE[size],
                "rounded-full border-[1.6px] border-[rgba(0,60,27,0.25)] border-t-[#003C1B]",
                "animate-[spin_0.7s_linear_infinite]",
              )}
            />
          )}
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    );

    const inlineEl = title ? (
      <label
        style={pillStyle}
        className={cn(
          "inline-flex cursor-pointer items-center transition-colors duration-[120ms] ease-linear",
          hasCustomColors
            ? cn("rounded-[10px] border", PILL_PADDING[size], "border-[#E2E2E2]")
            : GAP_ONLY[size],
          disabled && "cursor-not-allowed",
          readOnly && "pointer-events-none cursor-default",
        )}
      >
        {titlePosition === "left" && (
          <span
            className={cn(
              TITLE_TEXT[size],
              "font-medium text-[#202020]",
              disabled && "text-[#9C9C9C]",
            )}
          >
            {title}
          </span>
        )}
        {switchEl}
        {titlePosition === "right" && (
          <span
            className={cn(
              TITLE_TEXT[size],
              "font-medium text-[#202020]",
              disabled && "text-[#9C9C9C]",
            )}
          >
            {title}
          </span>
        )}
      </label>
    ) : hasCustomColors ? (
      <div
        style={pillStyle}
        className={cn(
          "inline-flex items-center transition-colors duration-[120ms] ease-linear rounded-[10px] border",
          PILL_PADDING[size],
          "border-[#E2E2E2]",
          readOnly && "pointer-events-none cursor-default",
        )}
      >
        {switchEl}
      </div>
    ) : (
      switchEl
    );

    if (label) {
      return (
        <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
          <InputLabel size={size === "xs" ? "sm" : size} required={required}>
            {label}
          </InputLabel>
          {inlineEl}
        </div>
      );
    }

    return <>{inlineEl}</>;
  },
);

Toggle.displayName = "Toggle";
