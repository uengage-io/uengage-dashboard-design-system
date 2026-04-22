import * as React from "react";
import { CircleAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Checkbox } from "./Checkbox";
import type {
  CheckboxOption,
  CustomCheckboxGroupProps,
} from "@/types/checkbox";

function CheckboxGroup<T = CheckboxOption>({
  options,
  getLabel,
  getValue,
  getDisabled,
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
}: CustomCheckboxGroupProps<T>) {
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

  const toLabel =
    getLabel ?? ((item: T) => (item as unknown as CheckboxOption).label);
  const toValue =
    getValue ?? ((item: T) => (item as unknown as CheckboxOption).value);
  const toDisabled =
    getDisabled ?? ((item: T) => (item as unknown as CheckboxOption).disabled);

  const toggle = (optValue: string, nextChecked: boolean) => {
    if (nextChecked) {
      if (currentValue.includes(optValue)) return;
      setValue([...currentValue, optValue]);
    } else {
      setValue(currentValue.filter((v) => v !== optValue));
    }
  };

  const enabledOptions = options.filter((o) => !toDisabled(o));
  const allChecked =
    enabledOptions.length > 0 &&
    enabledOptions.every((o) => currentValue.includes(toValue(o)));
  const someChecked = enabledOptions.some((o) =>
    currentValue.includes(toValue(o)),
  );
  const indeterminate = someChecked && !allChecked;

  const toggleAll = (next: boolean) => {
    const keptDisabled = options
      .filter((o) => toDisabled(o) && currentValue.includes(toValue(o)))
      .map((o) => toValue(o));
    if (next) {
      setValue([...enabledOptions.map((o) => toValue(o)), ...keptDisabled]);
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
          <Checkbox
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
        {options.map((opt) => {
          const optValue = toValue(opt);
          return (
            <Checkbox
              key={optValue}
              label={toLabel(opt)}
              size={size}
              disabled={disabled || Boolean(toDisabled(opt))}
              error={Boolean(error)}
              checked={currentValue.includes(optValue)}
              onCheckedChange={(c) => toggle(optValue, c)}
            />
          );
        })}
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
        <p id={`${groupId}-helper`} className={cn("text-gray-500", helperSize)}>
          {helperText}
        </p>
      ) : describedById ? null : null}
    </div>
  );
}

CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
