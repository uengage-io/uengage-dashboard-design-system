import * as React from "react";

export interface DateRange {
  from: Date;
  to: Date;
}

export type DatePickerMode = "single" | "range" | "month";

export interface DatePickerProps {
  mode?: DatePickerMode;
  value?: Date | DateRange  |null;
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
  /** When true, shows a clear button to reset the selected value. Defaults to false. */
  clearable?: boolean;
  /** Field label rendered above the trigger. */
  label?: React.ReactNode;
  /** When true, appends a red asterisk directly after the label text. */
  required?: boolean;
  /** Helper text rendered below the trigger. */
  helperText?: string;
  /** Error message rendered below the trigger; takes priority over helperText. */
  error?: string;
  /** When true, the trigger shows the current value but the calendar cannot be opened. */
  readOnly?: boolean;
  /**
   * Controlled open state. When provided, the popover open/close is driven
   * externally — e.g. triggered by a "Custom date" option in a dashboard dropdown.
   * Pair with `onOpenChange` to sync state back.
   */
  open?: boolean;
  /** Called whenever the popover wants to open or close. Mirror this back into `open` to stay in sync. */
  onOpenChange?: (open: boolean) => void;
}
