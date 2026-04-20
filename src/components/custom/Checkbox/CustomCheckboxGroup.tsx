import * as React from "react";
import { CircleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CustomCheckbox } from "./CustomCheckbox";
import type { CustomCheckboxGroupProps } from "@/types/checkbox";

function CustomCheckboxGroup({
  options,
  value,
  onChange,
  size = "md",
  layout = "vertical",
  columns = 2,
  disabled,
  label,
  helperText,
  error,
  selectAll,
}: CustomCheckboxGroupProps) {
  const reactId = React.useId();
  const groupId = `checkbox-group-${reactId}`;
  const describedById = error
    ? `${groupId}-error`
    : helperText
      ? `${groupId}-helper`
      : undefined;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const currentValue = isControlled ? value : internalValue;

  const setValue = (next: string[]) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const toggle = (optValue: string, nextChecked: boolean) => {
    if (nextChecked) {
      if (currentValue.includes(optValue)) return;
      setValue([...currentValue, optValue]);
    } else {
      setValue(currentValue.filter((v) => v !== optValue));
    }
  };

  const enabledOptions = options.filter((o) => !o.disabled);
  const allChecked =
    enabledOptions.length > 0 &&
    enabledOptions.every((o) => currentValue.includes(o.value));
  const someChecked = enabledOptions.some((o) =>
    currentValue.includes(o.value),
  );
  const indeterminate = someChecked && !allChecked;

  const toggleAll = (next: boolean) => {
    const keptDisabled = options
      .filter((o) => o.disabled && currentValue.includes(o.value))
      .map((o) => o.value);
    if (next) {
      setValue([...enabledOptions.map((o) => o.value), ...keptDisabled]);
    } else {
      setValue(keptDisabled);
    }
  };

  const layoutClass =
    layout === "horizontal"
      ? "flex flex-row flex-wrap gap-x-6 gap-y-3"
      : layout === "grid"
        ? `grid grid-cols-[repeat(${columns},minmax(0,1fr))] gap-x-6 gap-y-3`
        : "flex flex-col gap-3";

  const helperSize =
    size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs";

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <Label htmlFor={groupId} className="text-gray-900">
          {label}
        </Label>
      )}

      {selectAll && (
        <div className="pb-1">
          <CustomCheckbox
            label="Select all"
            size={size}
            disabled={disabled || enabledOptions.length === 0}
            error={Boolean(error)}
            checked={allChecked}
            indeterminate={indeterminate}
            onCheckedChange={toggleAll}
          />
        </div>
      )}

      <div id={groupId} role="group" className={layoutClass}>
        {options.map((opt) => (
          <CustomCheckbox
            key={opt.value}
            label={opt.label}
            size={size}
            disabled={disabled || opt.disabled}
            error={Boolean(error)}
            checked={currentValue.includes(opt.value)}
            onCheckedChange={(c) => toggle(opt.value, c)}
          />
        ))}
      </div>

      {error ? (
        <p
          id={`${groupId}-error`}
          className={cn(
            "inline-flex items-center gap-1 text-red-500",
            helperSize,
          )}
        >
          <CircleAlert className="size-3.5" aria-hidden="true" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p
          id={`${groupId}-helper`}
          className={cn("text-gray-500", helperSize)}
        >
          {helperText}
        </p>
      ) : describedById ? null : null}
    </div>
  );
}

CustomCheckboxGroup.displayName = "CustomCheckboxGroup";

export { CustomCheckboxGroup };
