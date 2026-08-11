import * as React from "react";
import { Check } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  checkboxBoxVariants,
  checkboxLabelVariants,
} from "@/utils/checkbox";
import {
  truncateLabelToWordLimit,
  validateLabelWordLimit,
} from "@/utils/labelValidation";
import type { CustomCheckboxProps } from "@/types/checkbox";

type Size = "xs" | "sm" | "md" | "lg";

/** Tick mark 9 / 10 / 12 / 14, drawn at stroke 3.2 like the design. */
const ICON_SIZE: Record<Size, string> = {
  xs: "size-[9px]",
  sm: "size-[10px]",
  md: "size-[12px]",
  lg: "size-[14px]",
};

/** Indeterminate is a bar, not a minus glyph — 9×2.5 at Medium. */
const DASH_SIZE: Record<Size, string> = {
  xs: "h-[2px] w-[7px]",
  sm: "h-[2px] w-[8px]",
  md: "h-[2.5px] w-[9px]",
  lg: "h-[3px] w-[11px]",
};

const PILL_PADDING: Record<Size, string> = {
  xs: "gap-2 px-2 py-1",
  sm: "gap-2.5 px-2.5 py-1.5",
  md: "gap-[11px] px-3 py-2",
  lg: "gap-3 px-4 py-2.5",
};

/** 11px between the box and its label at every size, per the design. */
const GAP_ONLY: Record<Size, string> = {
  xs: "gap-2",
  sm: "gap-2.5",
  md: "gap-[11px]",
  lg: "gap-3",
};

/**
 * Nudges the box down to sit on the first line of the label — half the
 * difference between the 1.5 line box and the control, where that is positive.
 */
const BOX_FIRST_LINE_OFFSET: Record<Size, string> = {
  xs: "mt-[2px]",
  sm: "mt-[1px]",
  md: "mt-0",
  lg: "mt-0",
};

function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  size = "md",
  label,
  disabled,
  readOnly,
  indeterminate,
  error,
  className,
  borderColor,
  bgColor,
  textColor,
  ...rest
}: CustomCheckboxProps &
  Omit<
    React.ComponentProps<typeof CheckboxPrimitive.Root>,
    | "checked"
    | "defaultChecked"
    | "onCheckedChange"
    | "disabled"
    | "className"
  >) {
  const reactId = React.useId();
  const itemId = rest.id ?? reactId;

  React.useEffect(() => {
    validateLabelWordLimit(label, "CustomCheckbox");
  }, [label]);

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = React.useState<boolean>(
    defaultChecked ?? false,
  );
  const visualChecked = isControlled ? Boolean(checked) : internalChecked;

  const radixChecked: CheckboxPrimitive.CheckedState = indeterminate
    ? "indeterminate"
    : isControlled
      ? Boolean(checked)
      : internalChecked;

  const handleCheckedChange = (next: CheckboxPrimitive.CheckedState) => {
    if (readOnly) return;
    const nextBool = next === true;
    if (!isControlled) setInternalChecked(nextBool);
    onCheckedChange?.(nextBool);
  };

  const isOn = visualChecked || Boolean(indeterminate);

  const boxState:
    | "unchecked"
    | "checked"
    | "indeterminate"
    | "disabled"
    | "disabledChecked"
    | "error" = disabled
    ? isOn
      ? "disabledChecked"
      : "disabled"
    : error
      ? "error"
      : indeterminate
        ? "indeterminate"
        : visualChecked
          ? "checked"
          : "unchecked";

  const labelState: "default" | "checked" | "disabled" | "error" = disabled
    ? "disabled"
    : error
      ? "error"
      : isOn
        ? "checked"
        : "default";

  const effectiveBorderColor = borderColor;
  const effectiveBgColor = bgColor;
  const effectiveTextColor = textColor;

  const hasCustomColors = !!(effectiveBorderColor || effectiveBgColor || effectiveTextColor);
  const isActive = (visualChecked || !!indeterminate) && !error && !disabled && !readOnly;

  return (
    <label
      htmlFor={itemId}
      style={
        hasCustomColors && isActive
          ? {
              ...(effectiveBorderColor ? { borderColor: effectiveBorderColor } : {}),
              ...(effectiveBgColor ? { backgroundColor: effectiveBgColor } : {}),
            }
          : undefined
      }

      className={cn(
        // The box aligns to the first line of the label, not the centre of it,
        // so multi-line labels stay tidy.
        "group inline-flex cursor-pointer items-start transition-colors duration-[120ms] ease-linear",
        hasCustomColors
          ? cn(
              "rounded-[10px] border",
              PILL_PADDING[size],
              error
                ? "border-[#A8000F]"
                : disabled
                  ? "border-[#E2E2E2]"
                  : "border-[#E2E2E2]",
            )
          : GAP_ONLY[size],
        disabled && "cursor-not-allowed",
        readOnly && "pointer-events-none cursor-default",
        className,
      )}
    >
      <CheckboxPrimitive.Root
        {...rest}
        id={itemId}
        checked={radixChecked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        data-slot="checkbox"
        style={
          isActive && effectiveBorderColor
            ? { backgroundColor: effectiveBorderColor, borderColor: effectiveBorderColor }
            : undefined
        }
        className={cn(
          checkboxBoxVariants({ size, state: boxState }),
          BOX_FIRST_LINE_OFFSET[size],
        )}
      >
        <CheckboxPrimitive.Indicator
          forceMount
          data-slot="checkbox-indicator"
          className="grid h-full w-full place-content-center text-current transition-none data-[state=unchecked]:opacity-0"
        >
          {indeterminate ? (
            <span
              className={cn(
                DASH_SIZE[size],
                "rounded-[2px] bg-current",
              )}
            />
          ) : (
            <Check className={cn(ICON_SIZE[size], "stroke-[3.2]")} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <Label
          htmlFor={itemId}
          style={effectiveTextColor && isActive ? { color: effectiveTextColor } : undefined}
          className={cn(
            checkboxLabelVariants({ size, state: labelState }),
            "whitespace-normal break-words leading-[1.5]",
          )}
        >
          {truncateLabelToWordLimit(label)}
        </Label>
      )}
    </label>
  );
}

Checkbox.displayName = "CustomCheckbox";

export { Checkbox };
