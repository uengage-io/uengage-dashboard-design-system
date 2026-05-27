import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  radioCircleVariants,
  radioDotVariants,
  radioLabelVariants,
} from "@/utils/radio";
import {
  truncateLabelToWordLimit,
  validateLabelWordLimit,
} from "@/utils/labelValidation";

type Size = "sm" | "md" | "lg";

export interface CustomRadioItemProps extends Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Item>,
  "children"
> {
  label: React.ReactNode;
  size?: Size;
  disabled?: boolean;
  error?: boolean;
  /** When provided, the pill wrapper uses this color for its border when checked. Falls back to default green if omitted. */
  borderColor?: string;
  /** When provided, the pill wrapper uses this color for its background when checked. Falls back to default green tint if omitted. */
  bgColor?: string;
}

const PILL_PADDING: Record<Size, string> = {
  sm: "gap-1.5 px-2.5 py-1.5",
  md: "gap-2 px-3 py-2",
  lg: "gap-2.5 px-4 py-2.5",
};

const GAP_ONLY: Record<Size, string> = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
};

function Radio({
  id,
  label,
  size = "md",
  disabled,
  error,
  value,
  className,
  borderColor,
  bgColor,
  ...rest
}: CustomRadioItemProps) {
  const reactId = React.useId();
  const itemId = id ?? reactId;

  React.useEffect(() => {
    validateLabelWordLimit(label, "Radio");
  }, [label]);

  const state: "default" | "disabled" | "error" = disabled
    ? "disabled"
    : error
      ? "error"
      : "default";

  const labelState: "default" | "checked" | "disabled" = disabled
    ? "disabled"
    : "default";

  const hasCustomColors = !!(borderColor || bgColor);

  return (
    <label
      htmlFor={itemId}
      style={
        hasCustomColors
          ? ({
              ...(borderColor ? { "--radio-checked-border": borderColor } : {}),
              ...(bgColor ? { "--radio-checked-bg": bgColor } : {}),
            } as React.CSSProperties)
          : undefined
      }
      className={cn(
        "group inline-flex cursor-pointer items-center transition-colors",
        hasCustomColors
          ? cn(
              "rounded-xl border",
              PILL_PADDING[size],
              error
                ? "border-red-500"
                : cn(
                    "border-gray-200",
                    borderColor &&
                      "has-[[data-state=checked]]:[border-color:var(--radio-checked-border)]",
                    bgColor &&
                      "has-[[data-state=checked]]:[background-color:var(--radio-checked-bg)]",
                  ),
            )
          : GAP_ONLY[size],
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      <RadioGroupPrimitive.Item
        {...rest}
        id={itemId}
        value={value}
        disabled={disabled}
        data-slot="radio-group-item"
        className={cn(radioCircleVariants({ size, state }))}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className={cn(radioDotVariants({ size }))} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      <Label
        htmlFor={itemId}
        className={cn(
          radioLabelVariants({ size, state: labelState }),
          "whitespace-normal break-words",
          hasCustomColors && "group-has-[[data-state=checked]]:text-[#0F8055]",
        )}
      >
        {truncateLabelToWordLimit(label)}
      </Label>
    </label>
  );
}

Radio.displayName = "Radio";

export { Radio };
