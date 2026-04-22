export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CustomCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  className?: string;
}

export interface CustomCheckboxGroupProps<T = CheckboxOption> {
  options: T[];
  /** Extract the display label from an option. Defaults to `option.label`. */
  getLabel?: (item: T) => string;
  /** Extract the form value from an option. Defaults to `option.value`. */
  getValue?: (item: T) => string;
  /** Extract per-option disabled state. Defaults to `option.disabled`. */
  getDisabled?: (item: T) => boolean | undefined;
  value?: string[];
  onChange?: (value: string[]) => void;
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical" | "grid";
  columns?: number;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  selectAll?: boolean;
}
