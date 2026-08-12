import * as React from "react";

export type SearchValueType = "string" | "number" | "alphanumeric";

export type SearchBarSize = "sm" | "md" | "lg";

export interface SearchBarProps<T extends string | number = string, TItem = unknown> {
  value?: T;
  defaultValue?: T;
  valueType?: SearchValueType;
  size?: SearchBarSize;
  /** Label displayed above the search bar. */
  label?: React.ReactNode;
  /** When `true`, appends a red asterisk to the label. */
  required?: boolean;
  placeholder?: string;
  /**
   * Tailwind width class(es) applied to the outer wrapper. Use any responsive
   * utility (e.g. `"w-full md:w-96 lg:w-[400px]"`). Defaults to `w-full` when
   * omitted. For one-off layout overrides, prefer `className`.
   */
  width?: string;
  /** Override the default height from `size`. Accepts any CSS size (number = px). */
  
  /** Extra classes merged onto the outer wrapper — use this for layout/width. */
  className?: string;
  /** When true, the input shows its current value but cannot be edited or searched. */
  readOnly?: boolean;
  inputClassName?: string;
  dropdownClassName?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (value: T) => void;
  /** Fires on Enter OR icon click when input is non-empty. */
  onSearch?: (value: T) => void;
  onClear?: () => void;
  /** Fires once the first time the field is blurred (Angular-style `touched` state). */
  onTouch?: () => void;
  /** Toggle the browser's native spell-check. Defaults to `true`. */
  spellCheck?: boolean;
  /** Show the X clear button when the input has a value. Defaults to `false`. */
  clearable?: boolean;

  // ── Static string list (simple case) ──────────────────────────
  /** Pre-mapped string list. Component auto-filters with fuzzy matching. */
  dropdownContent?: string[];

  // ── Dynamic / structured data (flexible case) ──────────────────
  /**
   * Any array of objects (e.g. raw API response). Provide `getLabel` to
   * tell the component how to display each item, and optionally `getValue`
   * to control what string is passed to `onSelect` (defaults to the label).
   */
  dropdownItems?: TItem[];
  /** Extract the display string from a `dropdownItems` entry. */
  getLabel?: (item: TItem) => string;
  /** Extract the select value from a `dropdownItems` entry. Defaults to `getLabel`. */
  getValue?: (item: TItem) => string;

  /**
   * Fires when a dropdown item is picked.
   * @param value  The string value (label, or `getValue` result).
   * @param item   The original raw item when using `dropdownItems`; undefined otherwise.
   */
  onSelect?: (value: string, item?: TItem) => void;

  /** Text shown in dropdown when no items match the search. */
  fallbackText?: string;

  // ── Design-console states (`Search and Filters.dc.html`) ───────
  /**
   * Swaps the leading magnifier for a spinner while a query is in flight. The
   * field deliberately stays typeable — the design's rule is "the field never
   * disables while a query is running".
   */
  searching?: boolean;
  /**
   * Live result count rendered under the field in brand green ("12 results").
   * Set to `0` together with `noResults` for the empty case.
   */
  resultCount?: number;
  /** Singular/plural noun used with `resultCount`. Defaults to `result(s)`. */
  resultNoun?: string;
  /**
   * Puts the control into the amber "no results" state — warning border, amber
   * glyph, amber message.
   */
  noResults?: boolean;
  /**
   * Did-you-mean correction shown in the message row when `noResults` is set.
   * The label renders as a button so the operator can apply it in one click.
   */
  suggestion?: { label: string; onApply?: () => void };
  /** Helper text under the field. Overrides the generated result message. */
  message?: React.ReactNode;
  /**
   * Keyboard shortcut badge pinned to the right of an empty field (e.g. `"⌘K"`).
   * Hidden as soon as the field has a value.
   */
  shortcut?: string;
  /**
   * Recent searches shown on focus, before anything is typed. Each entry is
   * individually removable via `onRemoveRecent`.
   */
  recents?: string[];
  /** Fires when a recent entry's ✕ is clicked. */
  onRemoveRecent?: (value: string) => void;
  /** Fires when a recent entry is picked. Falls back to `onSearch`. */
  onSelectRecent?: (value: string) => void;
  /**
   * Debounce in ms before `onDebouncedChange` fires. The design debounces
   * search at 300ms. `0` disables it.
   */
  debounce?: number;
  /** Debounced companion to `onChange`, gated by `debounce`. */
  onDebouncedChange?: (value: T) => void;
}
