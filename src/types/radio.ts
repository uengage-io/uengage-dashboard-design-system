export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CustomRadioGroupProps<T = RadioOption> {
  options: T[];
  /** Extract the display label from an option. Defaults to `option.label`. */
  getLabel?: (item: T) => string;
  /** Extract the form value from an option. Defaults to `option.value`. */
  getValue?: (item: T) => string;
  /** Extract per-option disabled state. Defaults to `option.disabled`. */
  getDisabled?: (item: T) => boolean | undefined;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical" | "grid";
  /** Max columns at the largest breakpoint when `layout="grid"`. Smaller breakpoints scale down (mobile=1, sm=2). */
  columns?: 1 | 2 | 3 | 4;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  /** When provided, applies this border color to each radio pill when its item is selected. */
  borderColor?: string;
  /** When provided, applies this background color to each radio pill when its item is selected. */
  bgColor?: string;
  /** When true, all radio items show their current state but cannot be changed. */
  readOnly?: boolean;
}
