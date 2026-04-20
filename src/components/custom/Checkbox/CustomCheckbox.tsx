import * as React from "react";
import { Check, Minus } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  checkboxBoxVariants,
  checkboxLabelVariants,
} from "@/utils/checkbox";
import type { CustomCheckboxProps } from "@/types/checkbox";

const ICON_SIZE: Record<"sm" | "md" | "lg", string> = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

const GAP: Record<"sm" | "md" | "lg", string> = {
  sm: "gap-1.5",
  md: "gap-2.5",
  lg: "gap-3",
};

function CustomCheckbox({
  checked,
  defaultChecked,
  onCheckedChange,
  size = "md",
  label,
  disabled,
  indeterminate,
  error,
  className,
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

  return (
    <label
      htmlFor={itemId}
      className={cn(
        "group inline-flex cursor-pointer items-center",
        GAP[size],
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
          data-slot="checkbox-indicator"
          className="flex items-center justify-center text-current"
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
          className={cn(checkboxLabelVariants({ size, state: labelState }))}
        >
          {label}
        </Label>
      )}
    </label>
  );
}

CustomCheckbox.displayName = "CustomCheckbox";

export { CustomCheckbox };
