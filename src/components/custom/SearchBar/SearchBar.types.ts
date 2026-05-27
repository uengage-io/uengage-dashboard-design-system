export type SearchValueType = "string" | "number" | "alphanumeric";

export type SearchBarSize = "sm" | "md" | "lg";

export interface SearchBarProps<T extends string | number = string, TItem = unknown> {
  value?: T;
  defaultValue?: T;
  valueType?: SearchValueType;
  size?: SearchBarSize;
  /** Label displayed above the search bar. */
  label?: string;
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
}
