import { cva, type VariantProps } from "class-variance-authority";
import {
  INPUT_COLORS,
  INPUT_TRANSITION,
  getInputBoxStyle,
  type InputVisualState,
} from "@/components/custom/Input/inputVariants";

export type TriggerState = "default" | "open" | "disabled" | "readonly";
export type TriggerSize = "xs" | "sm" | "md" | "lg";

/**
 * Pixel spec from the Select design page ("Size scale"). Trigger heights match
 * Input exactly — 28 / 32 / 40 / 48 — so a select and a field can sit in the
 * same row. Radius is 8 at every size (unlike Input, whose XS tightens to 6).
 */
export const SELECT_SIZES: Record<
  TriggerSize,
  {
    /** Trigger height in px. */
    height: number;
    /** Leading padding in px (before the value or leftIcon). */
    padLeft: number;
    /** Trailing padding in px (after the chevron). */
    padRight: number;
    /** Vertical padding when chips wrap the trigger onto its own box. */
    padMultiY: number;
    /** Value font size in px. */
    font: number;
    /** Chevron / affix glyph size in px. */
    icon: number;
    /** Menu option row height in px. */
    option: number;
    radius: number;
    label: number;
  }
> = {
  xs: { height: 28, padLeft: 9, padRight: 8, padMultiY: 3, font: 12, icon: 13, option: 28, radius: 8, label: 11 },
  sm: { height: 32, padLeft: 11, padRight: 9, padMultiY: 4, font: 12, icon: 14, option: 30, radius: 8, label: 12 },
  md: { height: 40, padLeft: 13, padRight: 11, padMultiY: 6, font: 13, icon: 15, option: 34, radius: 8, label: 12 },
  lg: { height: 48, padLeft: 15, padRight: 13, padMultiY: 8, font: 14, icon: 17, option: 38, radius: 8, label: 13 },
};

/** Gap between the value and its adornments. Matches Input. */
export const SELECT_GAP = 9;

/** Menu shell + row tokens, straight off the design's "Anatomy" notes. */
export const MENU = {
  /** 4px inset padding around the option list. */
  padding: 4,
  radius: 8,
  optionRadius: 6,
  border: `1px solid ${INPUT_COLORS.border}`,
  background: INPUT_COLORS.surface,
  shadow: "2px 2px 4px rgba(0,0,0,.12)",
  /** Menu fades and lifts 4px, 140ms ease-out. */
  motion: "140ms ease-out",
  /** Hover wash on an option row. */
  optionHover: "#FAFFF7",
  /** Selected row: mint fill with a check, never a blue bar. */
  selectedBg: "#DCF3CE",
  selectedInk: "#003C1B",
  /** A checked row in a multi select gets the lighter wash, not the mint fill. */
  multiSelectedBg: "#FAFFF7",
  checkboxOn: "#003C1B",
  checkboxOff: INPUT_COLORS.borderHover,
  /** Group eyebrow + the hairline that separates groups. */
  groupInk: INPUT_COLORS.message,
  groupRule: "#EEEEEE",
  metaInk: INPUT_COLORS.message,
  /** Long lists cap at 8 rows and scroll. */
  maxRows: 8,
  /** Thin green scrollbar on the option list — never the system default. */
  scrollThumb: "#16914E",
  scrollThumbHover: "#A8D5B5",
  scrollWidth: 4,
} as const;

/**
 * Scrollbar chrome for the option list. Shipped as a `<style>` tag alongside the
 * menu (not via globals.css) so the menu keeps its look in apps that do not
 * build this package's stylesheet — same reasoning as the inline trigger styles.
 */
export const MENU_SCROLLBAR_CSS = `
[data-slot="select-menu-list"] {
  scrollbar-width: thin;
  scrollbar-color: ${MENU.scrollThumb} transparent;
}
[data-slot="select-menu-list"]::-webkit-scrollbar {
  width: ${MENU.scrollWidth}px;
  height: ${MENU.scrollWidth}px;
}
[data-slot="select-menu-list"]::-webkit-scrollbar-track {
  background: transparent;
  margin-block: ${MENU.padding}px;
}
[data-slot="select-menu-list"]::-webkit-scrollbar-thumb {
  background-color: ${MENU.scrollThumb};
  border-radius: 9999px;
  transition: background-color 160ms ease;
}
[data-slot="select-menu-list"]::-webkit-scrollbar-thumb:hover {
  background-color: ${MENU.scrollThumbHover};
}
`;

export { INPUT_COLORS as SELECT_COLORS, INPUT_TRANSITION as SELECT_TRANSITION };

/**
 * The trigger mirrors Input's state model so a form reads as one surface.
 * `open` renders exactly like `focused` — forest border plus the lime halo.
 */
export type SelectVisualState = InputVisualState | "open";

export function getTriggerStyle(state: SelectVisualState) {
  return getInputBoxStyle(state === "open" ? "focused" : state);
}

/**
 * Structural classes for the trigger. Metrics and colours ride on inline
 * styles, so the control keeps its exact look in apps whose Tailwind build does
 * not scan this package.
 *
 * The `state` and `size` variant keys are preserved from the pre-refresh API —
 * existing calls such as `triggerVariants({ state: "open", size: "md" })` keep
 * type-checking, they simply no longer carry the colours.
 */
export const triggerVariants = cva(
  [
    "flex min-w-0 items-center justify-between",
    "cursor-pointer select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      state: {
        default: "",
        open: "",
        disabled: "pointer-events-none",
        readonly: "cursor-default pointer-events-none",
        hover: "",
        focused: "",
        error: "",
        success: "",
        warning: "",
        validating: "",
        loading: "pointer-events-none",
      },
      size: { xs: "", sm: "", md: "", lg: "" },
    },
    defaultVariants: { state: "default", size: "md" },
  },
);

export type TriggerVariants = VariantProps<typeof triggerVariants>;
