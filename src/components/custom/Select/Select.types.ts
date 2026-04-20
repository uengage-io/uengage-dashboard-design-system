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
  className?: string;
  onChange?: (value: string | string[]) => void;
}
