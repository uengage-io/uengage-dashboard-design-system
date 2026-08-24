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
  /** When provided, applies this color to the label text when checked. */
  textColor?: string;
  /** When true, the item shows its current state but cannot be selected. */
  readOnly?: boolean;
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
  readOnly,
  error,
  value,
  className,
  borderColor,
  bgColor,
  textColor,
  ...rest
}: CustomRadioItemProps) {
  const reactId = React.useId();
  const itemId = id ?? reactId;
  const itemRef = React.useRef<HTMLButtonElement>(null);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    validateLabelWordLimit(label, "Radio");
  }, [label]);

  // Track checked state via MutationObserver so we don't rely on CSS :has(),
  // which is only supported in Safari 15.4+. This handles custom-color pill styling.
  React.useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    setIsChecked(el.dataset.state === "checked");
    const observer = new MutationObserver(() => {
      setIsChecked(el.dataset.state === "checked");
    });
    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] });
    return () => observer.disconnect();
  }, []);

  const state: "default" | "disabled" | "error" = disabled
    ? "disabled"
    : error
      ? "error"
      : "default";

  const labelState: "default" | "checked" | "disabled" = disabled
    ? "disabled"
    : "default";

  const effectiveBorderColor = borderColor;
  const effectiveBgColor = bgColor;
  const effectiveTextColor = textColor;

  const hasCustomColors = !!(effectiveBorderColor || effectiveBgColor || effectiveTextColor);

  const labelStyle: React.CSSProperties | undefined = hasCustomColors
    ? {
        ...(isChecked && effectiveBorderColor ? { borderColor: effectiveBorderColor } : {}),
        ...(isChecked && effectiveBgColor ? { backgroundColor: effectiveBgColor } : {}),
      }
    : undefined;

  return (
    <label
      htmlFor={itemId}
      style={labelStyle}
      className={cn(
        "group inline-flex cursor-pointer items-center transition-colors",
        hasCustomColors
          ? cn(
              "rounded-xl border",
              PILL_PADDING[size],
              error ? "border-red-500" : "border-gray-200",
            )
          : GAP_ONLY[size],
        disabled && "cursor-not-allowed opacity-60",
        readOnly && "pointer-events-none cursor-default",
        className,
      )}
    >
      <RadioGroupPrimitive.Item
        {...rest}
        ref={itemRef}
        id={itemId}
        value={value}
        disabled={disabled}
        data-slot="radio-group-item"
        style={
          isChecked && effectiveBorderColor
            ? { borderColor: effectiveBorderColor }
            : undefined
        }
        className={cn(radioCircleVariants({ size, state }))}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="relative flex items-center justify-center"
        >
          <span
            className={cn(radioDotVariants({ size }))}
            style={effectiveBorderColor ? { backgroundColor: effectiveBorderColor } : undefined}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      <Label
        htmlFor={itemId}
        style={effectiveTextColor && isChecked ? { color: effectiveTextColor } : undefined}
        className={cn(
          radioLabelVariants({ size, state: labelState }),
          "whitespace-normal break-words",
        )}
      >
        {truncateLabelToWordLimit(label)}
      </Label>
    </label>
  );
}

Radio.displayName = "Radio";

export { Radio };
