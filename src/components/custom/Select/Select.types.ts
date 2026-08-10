import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Trailing muted text on the option row (e.g. "412 items", "default"). */
  meta?: string;
  /**
   * Group heading this option belongs to. Options sharing a `group` render
   * under one uppercase eyebrow, separated from the next group by a hairline.
   */
  group?: string;
  /**
   * Second line under the label. On a disabled option this is where you say
   * *why* it is disabled — a disabled option should always explain itself.
   */
  description?: string;
  /** Leading avatar/initials chip or icon for a rich row. */
  icon?: React.ReactNode;
}

export type SelectMode = "single" | "multi";

/** Non-error validation states, mirroring Input. */
export type SelectStatus = "success" | "warning";

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
  /**
   * Alias for `mode="multi"`, matching the design's prop name. When both are
   * given, `multiple` wins.
   */
  multiple?: boolean;
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
  label?: React.ReactNode;
  /** When true, appends a red asterisk directly after the label text. */
  required?: boolean;
  /** Helper text rendered below the trigger. */
  helperText?: string;
  /** Error message rendered below the trigger; takes priority over helperText. */
  error?: string;
  /** When true, the trigger shows the current selection but the dropdown cannot be opened. */
  readOnly?: boolean;

  /**
   * When `true`, renders an ascending/descending sort toggle icon on the trigger.
   * Clicking it cycles A→Z / Z→A on the option list.
   */
  sorting?: boolean;

  /**
   * Controls visibility of the search input inside the dropdown.
   * Defaults to `true`. Set to `false` to show only the raw option list.
   */
  search?: boolean;
  /** Alias for `search`, matching the design's prop name. Takes priority when set. */
  searchable?: boolean;

  /**
   * When `true`, each option in the dropdown is prefixed with its position number (1, 2, 3 …).
   * The index reflects the current displayed order (after sorting / fuzzy filtering).
   */
  indexing?: boolean;

  // ── Design refresh ────────────────────────────────────────────
  /**
   * Non-error validation state. `success` gives a green border and tick,
   * `warning` an amber fill. Ignored while `error` is set.
   */
  status?: SelectStatus;
  /** Message shown under the trigger for the active `status`. Falls back to `helperText`. */
  statusMessage?: string;
  /** Leading glyph inside the trigger, ahead of the value. */
  leftIcon?: React.ReactNode;
  /**
   * Options are being fetched. The trigger shows a spinner and the menu shows
   * shimmer rows rather than a centred spinner.
   */
  loading?: boolean;
  /**
   * Hard cap on how many chips a multi select renders before collapsing the
   * rest into a `+N` counter. Without it the trigger measures how many fit.
   */
  maxChips?: number;
  /** Fires as the user types in the dropdown search box — for server-side lookup. */
  onSearch?: (query: string) => void;
  /** Offer a "Create …" row, pinned last, when the query matches no option. */
  creatable?: boolean;
  /** Fires when the create row is chosen. Receives the raw query text. */
  onCreate?: (query: string) => void;
  /** Replaces the default "No results found." body when there is nothing to show. */
  emptyState?: React.ReactNode;
  /** Where the menu opens. `auto` lets it flip above the trigger near the fold. */
  placement?: "auto" | "top" | "bottom";
}
