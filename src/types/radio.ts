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
  columns?: number;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  className?: string;
}
