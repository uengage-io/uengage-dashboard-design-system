import type * as React from "react";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search";

export type AllowPattern =
  | "alphanumeric"
  | "alpha"
  | "numeric"
  | "decimal"
  | "phone"
  | "none";

export interface CustomInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "width" | "height"
  > {
  size?: "sm" | "md" | "lg";
  inputType?: InputType;
  allowPattern?: AllowPattern;
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /**
   * Tailwind width class(es) applied to the outer wrapper. Use any responsive
   * utility (e.g. `"w-full md:w-96 lg:w-[400px]"`). Defaults to `w-full` when
   * omitted. For one-off layout overrides, prefer `className`.
   */
  width?: string;
  /** Custom regex the value must match on blur. String is compiled via `new RegExp(...)`. */
  validationRegex?: RegExp | string;
  /** Error message shown when `validationRegex` or native (min/max/minLength/maxLength/required) validity fails. */
  validationMessage?: string;
  /** Fires once the first time the field is blurred (Angular-style `touched` state). */
  onTouch?: () => void;
  /**
   * Optional autocomplete list. Each entry must have `label` (displayed text)
   * and `value` (emitted on select). Fuse.js fuzzy-filters these as the user types.
   */
  suggestions?: Array<{ label: string; value: string }>;
  /** Fires when the user picks a suggestion. Receives the item's `value` field. */
  onSuggestionSelect?: (value: string) => void;
  /** Shows an X button to clear the input value. Turns red on hover. */
  clearable?: boolean;
  /** Fires when the clear button is clicked. */
  onClear?: () => void;
}
