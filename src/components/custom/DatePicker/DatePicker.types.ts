export interface DateRange {
  from: Date;
  to: Date;
}

export type DatePickerMode = "single" | "range";

export interface DatePickerProps {
  mode?: DatePickerMode;
  value?: Date | DateRange | null;
  onChange?: (value: Date | DateRange | null) => void;
  placeholder?: string;
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}
