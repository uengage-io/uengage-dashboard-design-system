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
  /** Field label rendered above the toggle. */
  label?: string;
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
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(
  (
    {
      size = "md",
      label,
      required,
      title,
      titlePosition = "right",
      checked,
      defaultChecked,
      onChange,
      disabled,
      readOnly,
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
        onCheckedChange={readOnly ? undefined : onChange}
        disabled={disabled}
        className={cn(trackVariants({ size }), readOnly && "pointer-events-none cursor-default")}
        {...props}
      >
        <SwitchPrimitive.Thumb className={thumbVariants({ size })} />
      </SwitchPrimitive.Root>
    );

    const inlineEl = title ? (
      <label
        className={cn(
          "inline-flex cursor-pointer items-center gap-2",
          readOnly && "pointer-events-none cursor-default",
        )}
      >
        {titlePosition === "left" && (
          <span className="text-sm font-medium text-[#1F2937]">{title}</span>
        )}
        {switchEl}
        {titlePosition === "right" && (
          <span className="text-sm font-medium text-[#1F2937]">{title}</span>
        )}
      </label>
    ) : switchEl;

    if (label) {
      return (
        <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
          <InputLabel size={size} required={required}>
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
