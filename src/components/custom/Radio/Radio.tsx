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
}

function Radio({
  id, 
  label,
  size = "md",
  disabled,
  error,
  value,
  className,
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

  return (
    <label
      htmlFor={itemId}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-2",
        disabled && "cursor-not-allowed",
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
          "group-has-[[data-state=checked]]:text-[#006F42]",
        )}
      >
        {truncateLabelToWordLimit(label)}
      </Label>
    </label>
  );
}

Radio.displayName = "Radio";

export { Radio };
