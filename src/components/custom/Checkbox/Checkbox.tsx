import * as React from "react";
import { Check, Minus } from "lucide-react";
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

const ICON_SIZE: Record<"sm" | "md" | "lg", string> = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

const PILL_PADDING: Record<"sm" | "md" | "lg", string> = {
  sm: "gap-1.5 px-2.5 py-1.5",
  md: "gap-2 px-3 py-2",
  lg: "gap-2.5 px-4 py-2.5",
};

const GAP_ONLY: Record<"sm" | "md" | "lg", string> = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
};

function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  size = "md",
  label,
  disabled,
  indeterminate,
  error,
  className,
  borderColor,
  bgColor,
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
    const nextBool = next === true;
    if (!isControlled) setInternalChecked(nextBool);
    onCheckedChange?.(nextBool);
  };

  const boxState:
    | "unchecked"
    | "checked"
    | "indeterminate"
    | "disabled"
    | "error" = disabled
    ? "disabled"
    : error
      ? "error"
      : indeterminate
        ? "indeterminate"
        : visualChecked
          ? "checked"
          : "unchecked";

  const labelState: "default" | "checked" | "disabled" = disabled
    ? "disabled"
    : visualChecked || indeterminate
      ? "checked"
      : "default";

  const hasCustomColors = !!(borderColor || bgColor);
  const isActive = (visualChecked || !!indeterminate) && !error && !disabled;

  return (
    <label
      htmlFor={itemId}
      style={
        hasCustomColors && isActive
          ? {
              ...(borderColor ? { borderColor } : {}),
              ...(bgColor ? { backgroundColor: bgColor } : {}),
            }
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
                : disabled
                  ? "border-gray-200"
                  : "border-gray-200",
            )
          : GAP_ONLY[size],
        disabled && "cursor-not-allowed",
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
        className={cn(checkboxBoxVariants({ size, state: boxState }))}
      >
        <CheckboxPrimitive.Indicator
          forceMount
          data-slot="checkbox-indicator"
          className="grid h-full w-full place-content-center text-current transition-none data-[state=unchecked]:opacity-0"
        >
          {indeterminate ? (
            <Minus className={cn(ICON_SIZE[size], "stroke-[3]")} />
          ) : (
            <Check className={cn(ICON_SIZE[size], "stroke-[3]")} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <Label
          htmlFor={itemId}
          className={cn(
            checkboxLabelVariants({ size, state: labelState }),
            "whitespace-normal break-words",
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
