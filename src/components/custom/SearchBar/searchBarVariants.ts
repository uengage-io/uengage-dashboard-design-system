import type { SearchBarSize } from "./SearchBar.types";

/**
 * Pixel spec lifted from the Design Console page `Search and Filters.dc.html`
 * ("Live filter bar" size picker + "Search states" grid): 32 / 38 / 44.
 *
 * Applied as inline styles rather than Tailwind utilities so the control keeps
 * its exact metrics in consuming apps whose Tailwind build does not scan this
 * package for arbitrary-value classes — same approach as `inputVariants.ts`.
 */
export const SEARCHBAR_SIZES: Record<
  SearchBarSize,
  {
    /** Control height in px. */
    height: number;
    /** Left padding in px — the leading search glyph sits against it. */
    padLeft: number;
    /** Right padding in px — tighter, because the trailing slot is a circle. */
    padRight: number;
    /** Value/placeholder font size in px. */
    font: number;
    /** Leading glyph size in px, drawn at 2px stroke. */
    icon: number;
    /** Corner radius in px. */
    radius: number;
    /** Diameter of the round clear button in px. */
    clear: number;
    /** Label font size in px. */
    label: number;
    /** Helper/message font size in px. */
    message: number;
  }
> = {
  sm: {
    height: 32,
    padLeft: 11,
    padRight: 9,
    font: 12,
    icon: 14,
    radius: 8,
    clear: 17,
    label: 12,
    message: 11,
  },
  md: {
    height: 38,
    padLeft: 12,
    padRight: 10,
    font: 13,
    icon: 15,
    radius: 8,
    clear: 19,
    label: 12,
    message: 11,
  },
  lg: {
    height: 44,
    padLeft: 14,
    padRight: 12,
    font: 14,
    icon: 17,
    radius: 8,
    clear: 21,
    label: 13,
    message: 11,
  },
};

/** Gap between the glyph, the value and the trailing affixes. Constant. */
export const SEARCHBAR_GAP = 9;

/** Every state transition on the control runs at this curve. */
export const SEARCHBAR_TRANSITION =
  "border-color 120ms linear, box-shadow 120ms linear, background-color 120ms linear";

export const SEARCHBAR_COLORS = {
  surface: "#FFFFFF",
  subtle: "#F3F5F9",
  border: "#E2E2E2",
  borderHover: "#C6C6C6",
  borderFocus: "#1F5E2C",
  /** 3px lime halo that pairs with `borderFocus`. */
  ring: "0 0 0 3px rgba(140,196,42,.28)",
  value: "#161616",
  placeholder: "#9C9C9C",
  message: "#9C9C9C",
  icon: "#1F5E2C",
  /** Caret / accent used by the deep-brand affordances. */
  accent: "#003C1B",
  accentTint: "#DCF3CE",
  hoverTint: "#FAFFF7",

  resultsInk: "#1F5E2C",

  warningBorder: "#EFD98A",
  warningInk: "#6A5300",

  readOnlyBg: "#FAFFF7",

  disabledBg: "#F3F5F9",
  disabledInk: "#C6C6C6",

  divider: "#EEEEEE",
  muted: "#787878",
} as const;

/**
 * The eight states the design enumerates, plus `readonly` which the component
 * already supported. Ordering in `resolveSearchBarState` is deliberate.
 */
export type SearchBarVisualState =
  | "default"
  | "hover"
  | "focused"
  | "typing"
  | "searching"
  | "results"
  | "noResults"
  | "readonly"
  | "disabled";

export function resolveSearchBarState(args: {
  disabled?: boolean;
  readOnly?: boolean;
  searching?: boolean;
  noResults?: boolean;
  hasResults?: boolean;
  hasQuery?: boolean;
  focused?: boolean;
  hovered?: boolean;
}): SearchBarVisualState {
  const {
    disabled,
    readOnly,
    searching,
    noResults,
    hasResults,
    hasQuery,
    focused,
    hovered,
  } = args;
  if (disabled) return "disabled";
  if (readOnly) return "readonly";
  if (noResults) return "noResults";
  if (searching) return "searching";
  if (focused) return hasQuery ? "typing" : "focused";
  if (hasResults && hasQuery) return "results";
  if (hovered) return "hover";
  return "default";
}

export interface SearchBarBoxStyle {
  background: string;
  border: string;
  boxShadow: string;
  /** Colour of the value text. */
  color: string;
  cursor: string;
}

/** Box colours for a resolved state, straight off the design's state table. */
export function getSearchBarBoxStyle(
  state: SearchBarVisualState,
): SearchBarBoxStyle {
  const c = SEARCHBAR_COLORS;
  const hairline = `1px solid ${c.border}`;
  const focusRing = {
    background: c.surface,
    border: `1px solid ${c.borderFocus}`,
    boxShadow: c.ring,
    color: c.value,
    cursor: "text",
  };

  switch (state) {
    case "hover":
      return {
        background: c.surface,
        border: `1px solid ${c.borderHover}`,
        boxShadow: "none",
        color: c.value,
        cursor: "text",
      };
    case "focused":
    case "typing":
    case "searching":
      return focusRing;
    case "results":
      return {
        background: c.surface,
        border: hairline,
        boxShadow: "none",
        color: c.value,
        cursor: "text",
      };
    case "noResults":
      return {
        background: c.surface,
        border: `1px solid ${c.warningBorder}`,
        boxShadow: "none",
        color: c.value,
        cursor: "text",
      };
    case "readonly":
      return {
        background: c.readOnlyBg,
        border: hairline,
        boxShadow: "none",
        color: c.value,
        cursor: "default",
      };
    case "disabled":
      return {
        background: c.disabledBg,
        border: hairline,
        boxShadow: "none",
        color: c.disabledInk,
        cursor: "not-allowed",
      };
    default:
      return {
        background: c.surface,
        border: hairline,
        boxShadow: "none",
        color: c.value,
        cursor: "text",
      };
  }
}

/** The leading glyph tracks the box — amber on no-results, grey on disabled. */
export function getSearchBarIconColor(state: SearchBarVisualState): string {
  if (state === "disabled") return SEARCHBAR_COLORS.disabledInk;
  if (state === "noResults") return SEARCHBAR_COLORS.warningInk;
  return SEARCHBAR_COLORS.icon;
}

/** Placeholder greys out with the rest of the control when disabled. */
export function getSearchBarPlaceholderColor(
  state: SearchBarVisualState,
): string {
  return state === "disabled"
    ? SEARCHBAR_COLORS.disabledInk
    : SEARCHBAR_COLORS.placeholder;
}

/**
 * Message colour — the design pairs a result count with brand green and a
 * did-you-mean with the warning ink, everything else stays hint grey.
 */
export function getSearchBarMessageColor(
  state: SearchBarVisualState,
): string {
  if (state === "noResults") return SEARCHBAR_COLORS.warningInk;
  if (state === "results") return SEARCHBAR_COLORS.resultsInk;
  return SEARCHBAR_COLORS.message;
}
