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
  /** Explicit width for the input block. Number → px; string passes through. Overrides the default `w-full`. */
  width?: string | number;
  /** Explicit height for the input wrapper row. Number → px; string passes through. Overrides the size-driven height. */
  height?: string | number;
  /** Custom regex the value must match on blur. String is compiled via `new RegExp(...)`. */
  validationRegex?: RegExp | string;
  /** Error message shown when `validationRegex` or native (min/max/minLength/maxLength/required) validity fails. */
  validationMessage?: string;
}
