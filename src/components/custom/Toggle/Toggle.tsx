import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { trackVariants, thumbVariants } from "./toggleVariants";
import type { ToggleVariantSize } from "./toggleVariants";
import { InputLabel } from "@/components/custom/Input/InputLabel";

export interface ToggleProps
  extends Omit<
    React.ComponentProps<typeof SwitchPrimitive.Root>,
    "onChange" | "defaultChecked" | "checked"
  > {
  /** Size of the toggle */
  size?: ToggleVariantSize;
  /** Label text. Position is controlled by `labelPosition`. */
  label?: string;
  /**
   * Where the label renders:
   * - `"top"` — above the toggle as a field label (matches Input label style)
   * - `"right"` — inline, to the right of the switch (default)
   * - `"left"` — inline, to the left of the switch
   */
  labelPosition?: "top" | "left" | "right";
  /** When true, appends a red asterisk to a `"top"` label. */
  required?: boolean;
  /** Controlled checked state */
  checked?: boolean;
  /** Initial state for uncontrolled mode */
  defaultChecked?: boolean;
  /** Callback when toggle state changes */
  onChange?: (checked: boolean) => void;
  /** Extra className applied to the outermost wrapper */
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
      required,
      checked,
      defaultChecked,
      onChange,
      disabled,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const switchEl = (
      <SwitchPrimitive.Root
        ref={ref}
        checked={checked !== undefined ? checked : undefined}
        defaultChecked={checked !== undefined ? undefined : defaultChecked}
        onCheckedChange={onChange}
        disabled={disabled}
        className={trackVariants({ size })}
        {...props}
      >
        <SwitchPrimitive.Thumb className={thumbVariants({ size })} />
      </SwitchPrimitive.Root>
    );

    // ── "top" label position ─────────────────────────────────────────────
    if (labelPosition === "top") {
      return (
        <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
          {label && (
            <InputLabel size={size} required={required}>
              {label}
            </InputLabel>
          )}
          {switchEl}
        </div>
      );
    }

    // ── "left" / "right" label position (inline beside the switch) ───────
    if (!label) return <>{switchEl}</>;

    return (
      <label
        className={cn(
          "inline-flex cursor-pointer items-center gap-2",
          labelPosition === "left" && "flex-row-reverse",
          wrapperClassName,
        )}
      >
        {switchEl}
        <span className="text-sm font-medium text-[#1F2937]">{label}</span>
      </label>
    );
  },
);

Toggle.displayName = "Toggle";
