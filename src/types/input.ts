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

/** 28 / 32 / 40 / 48px. `xs` is for inline table editing, `lg` for standalone forms and mobile. */
export type InputSize = "xs" | "sm" | "md" | "lg";

/**
 * Non-error validation states. `error` still wins over any of these — a field
 * that is both `status="success"` and in error renders as an error.
 */
export type InputStatus = "validating" | "success" | "warning";

export interface CustomInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "width" | "height" | "onChange" | "prefix"
  > {
  size?: InputSize;
  /**
   * `"default"` renders the usual bordered box. `"underline"` drops the box
   * entirely — transparent background, no side/top border, just a bottom
   * rule that turns solid on focus. Matches borderless title-style fields
   * (e.g. a "New ticket" modal's title input) where the placeholder should
   * read directly on the surface behind it.
   */
  variant?: "default" | "underline";
  inputType?: InputType;
  allowPattern?: AllowPattern;
  label?: React.ReactNode;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /**
   * Async/advisory state that is not an error:
   * - `"validating"` — a check is in flight; renders a spinner and keeps the
   *   focus border without the halo.
   * - `"success"` — green border and tick, distinct from merely "no error".
   * - `"warning"` — amber fill, advisory but not blocking.
   *
   * Pair with `statusMessage` to explain it. Ignored while `error` is set.
   */
  status?: InputStatus;
  /** Message shown under the control for the active `status`. Falls back to `helperText`. */
  statusMessage?: string;
  /**
   * Rendered inside the box, ahead of the value, on a subtle fill separated by
   * a hairline (e.g. `"₹"`, `"+91"`). Unlike `leftIcon` it is a boxed affix,
   * not a glyph floating on the field background.
   */
  prefix?: React.ReactNode;
  /** Trailing counterpart to `prefix` (e.g. `"INR"`, `".00"`). */
  suffix?: React.ReactNode;
  /**
   * The value is still being fetched. Renders a muted box with a spinner and
   * blocks interaction, without marking the field disabled for the form.
   */
  loading?: boolean;
  /**
   * Show a `count/maxLength` counter. Defaults to `true` whenever `maxLength`
   * is set. The counter turns amber once the value passes ~83% of the limit.
   */
  showCount?: boolean;
  /** Right-aligns the value — for amounts and other numerics. */
  align?: "left" | "right";
  /**
   * Keep the message row in the layout even when there is nothing to say, so a
   * late validation error never shifts the form. Off by default — turning it on
   * adds roughly one line of height under the control.
   */
  reserveMessageSpace?: boolean;
  /**
   * Style overrides merged onto the control box itself (the bordered element),
   * not the `<input>`. Use for composition — e.g. squaring off one side so a
   * button can attach flush to the field. `style` still lands on the `<input>`.
   */
  boxStyle?: React.CSSProperties;
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
  /** Shows an X button to clear the input value. */
  clearable?: boolean;
  /** Fires when the clear button is clicked. */
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Renders a <textarea> instead of <input>. Incompatible with inputType="password" and suggestions. */
  multiline?: boolean;
  /** Number of visible text rows. Only used when multiline=true. */
  rows?: number;
  /** Controls CSS resize handle. Only used when multiline=true. Defaults to "vertical". */
  resize?: "none" | "vertical" | "horizontal" | "both";
}
