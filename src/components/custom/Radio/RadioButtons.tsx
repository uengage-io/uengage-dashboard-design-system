import * as React from "react";
import { CircleAlert } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Radio } from "./Radio";
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
  helperText,
  error,
  className,
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
      ? "flex flex-row flex-wrap gap-x-6 gap-y-3"
      : layout === "grid"
        ? cn("grid w-full gap-x-6 gap-y-3", gridColsMap[columns])
        : "flex flex-col gap-3";

  const helperSize =
    size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs";

  const toLabel =
    getLabel ?? ((item: T) => (item as unknown as RadioOption).label);
  const toValue =
    getValue ?? ((item: T) => (item as unknown as RadioOption).value);
  const toDisabled =
    getDisabled ?? ((item: T) => (item as unknown as RadioOption).disabled);

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <Label htmlFor={groupId} className="text-gray-900">
          {label}
        </Label>
      )}

      <RadioGroupPrimitive.Root
        id={groupId}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={describedById}
        className={layoutClass}
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
            />
          );
        })}
      </RadioGroupPrimitive.Root>

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
      ) : null}
    </div>
  );
}

RadioGroup.displayName = "CustomRadioGroup";

export { RadioGroup };
