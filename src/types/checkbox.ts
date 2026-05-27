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
  /** When provided, the pill wrapper uses this color for its border when checked/indeterminate. Falls back to default green if omitted. */
  borderColor?: string;
  /** When provided, the pill wrapper uses this color for its background when checked/indeterminate. Falls back to default green tint if omitted. */
  bgColor?: string;
  /** When true, the checkbox is visible and shows its current value but cannot be toggled. */
  readOnly?: boolean;
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
  required?: boolean;
  helperText?: string;
  error?: string;
  selectAll?: boolean;
  /** When provided, applies this border color to each pill when its item is checked. */
  borderColor?: string;
  /** When provided, applies this background color to each pill when its item is checked. */
  bgColor?: string;
  /** When true, all checkboxes show their current state but cannot be toggled. */
  readOnly?: boolean;
}
