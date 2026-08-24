import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./Checkbox";
import { InputLabel } from "@/components/custom/Input/InputLabel";
import { InputHelper } from "@/components/custom/Input/InputHelper";
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
  required,
  helperText,
  error,
  selectAll,
  borderColor,
  bgColor,
  textColor,
  readOnly,
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
      ? "flex flex-row flex-wrap gap-x-3 gap-y-2"
      : layout === "grid"
        ? `grid grid-cols-[repeat(${columns},minmax(0,1fr))] gap-x-3 gap-y-2`
        : "flex flex-col gap-2";

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <InputLabel htmlFor={groupId} size={size} required={required}>
          {label}
        </InputLabel>
      )}

      {selectAll && (
        <div className="pb-1">
          <Checkbox
            label="Select all"
            size={size}
            disabled={disabled || enabledOptions.length === 0}
            readOnly={readOnly}
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
              borderColor={borderColor}
              bgColor={bgColor}
              textColor={textColor}
              readOnly={readOnly}
            />
          );
        })}
      </div>

      <InputHelper
        id={
          error
            ? `${groupId}-error`
            : helperText
              ? `${groupId}-helper`
              : undefined
        }
        size={size}
        helperText={helperText}
        error={error}
      />
    </div>
  );
}

CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
