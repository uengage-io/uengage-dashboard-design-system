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

export interface CustomCheckboxGroupProps {
  options: CheckboxOption[];
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
