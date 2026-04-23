import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { trackVariants, thumbVariants } from "./toggleVariants";
import type { ToggleVariantSize } from "./toggleVariants";

export interface ToggleProps extends Omit<
  React.ComponentProps<typeof SwitchPrimitive.Root>,
  "onChange" | "defaultChecked" | "checked"
> {
  /** Size of the toggle */
  size?: ToggleVariantSize;
  /** Label text to display */
  label?: string;
  /** Position of the label: 'inside' (within track), 'left' or 'right' */
  labelPosition?: "inside" | "left" | "right";
  /** Controlled checked state */
  checked?: boolean;
  /** Initial unchecked state (uncontrolled mode) */
  defaultChecked?: boolean;
  /** Callback when toggle state changes */
  onChange?: (checked: boolean) => void;
  /** Additional className for the wrapper */
  wrapperClassName?: string;
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(
  (
    {
      size = "md",
      label,
      labelPosition = "right",
      checked,
      defaultChecked,
      onChange,
      disabled,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const isControlled = checked !== undefined;
    const hasInsideLabel = Boolean(label) && labelPosition === "inside";

    const handleChange = (e: boolean) => {
      onChange?.(e);
    };

    const switchContent = (
      <SwitchPrimitive.Root
        ref={ref}
        checked={isControlled ? checked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        onCheckedChange={handleChange}
        disabled={disabled}
        className={trackVariants({ size, hasInsideLabel })}
        {...props}
      >
        {hasInsideLabel && (
          <span className="pointer-events-none absolute left-3 right-3 truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1F6B32]">
            {label}
          </span>
        )}
        <SwitchPrimitive.Thumb
          className={thumbVariants({ size, hasInsideLabel })}
        />
      </SwitchPrimitive.Root>
    );

    if (!label || hasInsideLabel) {
      return switchContent;
    }

    return (
      <label
        className={`inline-flex items-center gap-2 cursor-pointer ${
          labelPosition === "left" ? "flex-row-reverse" : ""
        } ${wrapperClassName || ""}`}
      >
        {switchContent}
        <span className="text-sm font-medium text-[#1F2937]">{label}</span>
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
