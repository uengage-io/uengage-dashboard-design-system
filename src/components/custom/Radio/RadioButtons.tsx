import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { Radio } from "./Radio";
import { InputLabel } from "@/components/custom/Input/InputLabel";
import { InputHelper } from "@/components/custom/Input/InputHelper";
import type { CustomRadioGroupProps, RadioOption } from "@/types/radio";

function RadioGroup<T = RadioOption>({
  options,
  getLabel,
  getValue,
  getDisabled,
  value,
  defaultValue,
  onChange,
  size = "md",
  layout = "vertical",
  columns = 2,
  disabled,
  label,
  required,
  helperText,
  error,
  className,
  borderColor,
  bgColor,
  readOnly,
}: CustomRadioGroupProps<T>) {
  const reactId = React.useId();
  const groupId = `radio-group-${reactId}`;
  const describedById = error
    ? `${groupId}-error`
    : helperText
      ? `${groupId}-helper`
      : undefined;

  // Static class map so Tailwind's JIT detects every variant at build time.
  // Mobile = 1 col, sm = 2 cols, md+ = `columns` (clamped to 1–4).
  const gridColsMap: Record<1 | 2 | 3 | 4, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
  };

  const layoutClass =
    layout === "horizontal"
      ? "flex flex-row flex-wrap gap-x-3 gap-y-2"
      : layout === "grid"
        ? cn("grid w-full gap-x-3 gap-y-2", gridColsMap[columns])
        : "flex flex-col gap-2";

  const toLabel =
    getLabel ?? ((item: T) => (item as unknown as RadioOption).label);
  const toValue =
    getValue ?? ((item: T) => (item as unknown as RadioOption).value);
  const toDisabled =
    getDisabled ?? ((item: T) => (item as unknown as RadioOption).disabled);

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      {label && (
        <InputLabel htmlFor={groupId} size={size} required={required}>
          {label}
        </InputLabel>
      )}

      <RadioGroupPrimitive.Root
        id={groupId}
        value={value}
        defaultValue={defaultValue}
        onValueChange={readOnly ? undefined : onChange}
        disabled={disabled}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedById}
        className={cn(layoutClass, readOnly && "pointer-events-none")}
      >
        {options.map((opt) => {
          const optValue = toValue(opt);
          return (
            <Radio
              key={optValue}
              value={optValue}
              label={toLabel(opt)}
              size={size}
              disabled={disabled || Boolean(toDisabled(opt))}
              error={Boolean(error)}
              borderColor={borderColor}
              bgColor={bgColor}
              readOnly={readOnly}
            />
          );
        })}
      </RadioGroupPrimitive.Root>

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

RadioGroup.displayName = "CustomRadioGroup";

export { RadioGroup };
