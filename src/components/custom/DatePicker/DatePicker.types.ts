export interface DateRange {
  from: Date;
  to: Date;
}

export type DatePickerMode = "single" | "range" | "month";

export interface DatePickerProps {
  mode?: DatePickerMode;
  value?: Date | DateRange | null;
  onChange?: (value: Date | DateRange | null) => void;
  placeholder?: string;
  /** Controls the trigger height via a preset. */
  size?: "sm" | "md" | "lg";
  /**
   * Tailwind width class(es) applied to the trigger wrapper. Use any responsive
   * utility (e.g. `"w-full md:w-96 lg:w-[400px]"`). Defaults to `w-full` when
   * omitted. For one-off layout overrides, prefer `className`.
   */
  width?: string;
  /** Forwarded to the trigger wrapper for parent-driven overrides (margins, borders, etc.). */
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  /** Fires once the first time the trigger is blurred after interacting (Angular-style `touched`). */
  onTouch?: () => void;
}
