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
  labelPosition?: "left" | "right";
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
    const hasInsideLabel = Boolean(label);

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
        className={trackVariants({ size })}
        {...props}
      >
        {/* Inside label - rendered before thumb so it appears to the right */}
        

        {/* Thumb */}
        <SwitchPrimitive.Thumb
          className={thumbVariants({ size })}
        />
      </SwitchPrimitive.Root>
    );

    // If no external label or position is inside, return just the switch
    if (!label) {
      return switchContent;
    }

    // Render with external label
    return (
      <label
        className={`inline-flex items-center gap-2 cursor-pointer ${
          labelPosition === "left" ? "flex-row-reverse" : ""
        } ${wrapperClassName || ""}`}
      >
        {switchContent}
        <span className="text-sm font-medium">{label}</span>
      </label>
    );
  },
);

Toggle.displayName = "Toggle";

// export { Toggle };
