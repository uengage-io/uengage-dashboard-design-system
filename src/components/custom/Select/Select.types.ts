export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type SelectMode = "single" | "multi";

export interface SelectProps<TItem = unknown> {
  // ── Static options (simple case) ──────────────────────────────
  /** Pre-shaped option list. Use this when data already fits { value, label }. */
  options?: SelectOption[];

  // ── Dynamic / structured data (flexible case) ──────────────────
  /**
   * Any array of objects (e.g. raw API response). Provide `getLabel` and
   * `getValue` to tell the component how to map each item.
   */
  items?: TItem[];
  /** Extract the display label from an `items` entry. */
  getLabel?: (item: TItem) => string;
  /** Extract the option value from an `items` entry. */
  getValue?: (item: TItem) => string;
  /** Mark an item as disabled. Defaults to always enabled. */
  getDisabled?: (item: TItem) => boolean;

  value?: string | string[];
  defaultValue?: string | string[];
  mode?: SelectMode;
  /** Trigger size — controls height, padding, and text scale. */
  size?: "xs" | "sm" | "md" | "lg";
  placeholder?: string;
  disabled?: boolean;
  /**
   * Tailwind width class(es) applied to the trigger wrapper. Use any responsive
   * utility (e.g. `"w-full md:w-96 lg:w-[400px]"`). Defaults to `w-full` when
   * omitted. For one-off layout overrides, prefer `className`.
   */
  width?: string;
  className?: string;
  onChange?: (value: string | string[]) => void;
  /** Fires once the first time the trigger is blurred after interacting (Angular-style `touched`). */
  onTouch?: () => void;
  /** Toggle the browser's native spell-check on the dropdown search input. Defaults to `true`. */
  spellCheck?: boolean;
  /** Show the X clear button (and pill remove buttons) when a value is selected. Defaults to `false`. */
  clearable?: boolean;
  /** Field label rendered above the trigger. */
  label?: string;
  /** When true, appends a red asterisk directly after the label text. */
  required?: boolean;
  /** Helper text rendered below the trigger. */
  helperText?: string;
  /** Error message rendered below the trigger; takes priority over helperText. */
  error?: string;
}
