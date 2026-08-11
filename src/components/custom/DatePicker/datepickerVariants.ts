import { cva } from "class-variance-authority";
import {
  INPUT_COLORS,
  INPUT_TRANSITION,
  getInputBoxStyle,
  type InputVisualState,
} from "@/components/custom/Input/inputVariants";

export type DatePickerTriggerState = "default" | "open" | "disabled" | "readonly";
export type DatePickerSize = "xs" | "sm" | "md" | "lg";

/**
 * Pixel spec from the DatePicker design page ("Size scale"). Trigger heights
 * match Input and Select exactly — 28 / 32 / 40 / 48 — so a picker, a field and
 * a select can share a row. The day cell scales with the trigger so the panel
 * never feels cramped at XS or loose at LG.
 *
 * Applied as inline styles rather than Tailwind utilities so the control keeps
 * its exact metrics in consuming apps whose Tailwind build does not scan this
 * package for arbitrary-value classes.
 */
export const DATEPICKER_SIZES: Record<
  DatePickerSize,
  {
    /** Trigger height in px. */
    height: number;
    /** Leading padding in px (before the calendar glyph). */
    padLeft: number;
    /** Trailing padding in px. */
    padRight: number;
    /** Value font size in px. */
    font: number;
    /** Calendar / affix glyph size in px. */
    icon: number;
    /** Day cell edge in px. */
    cell: number;
    /** Day cell font size in px. */
    cellFont: number;
    radius: number;
  }
> = {
  xs: { height: 28, padLeft: 9, padRight: 8, font: 12, icon: 13, cell: 24, cellFont: 9, radius: 8 },
  sm: { height: 32, padLeft: 11, padRight: 9, font: 12, icon: 14, cell: 26, cellFont: 9, radius: 8 },
  md: { height: 40, padLeft: 13, padRight: 11, font: 13, icon: 16, cell: 30, cellFont: 10, radius: 8 },
  lg: { height: 48, padLeft: 15, padRight: 13, font: 14, icon: 17, cell: 34, cellFont: 11, radius: 8 },
};

/** Gap between the calendar glyph, the value and the trailing adornments. */
export const DATEPICKER_GAP = 9;

/** Panel shell + day-cell tokens, straight off the design's "Anatomy" notes. */
export const PANEL = {
  radius: 12,
  padding: 12,
  border: `1px solid ${INPUT_COLORS.border}`,
  background: INPUT_COLORS.surface,
  shadow: "2px 2px 4px rgba(0,0,0,.12)",
  /** Panel fades and lifts 4px, 140ms ease-out. */
  motion: "140ms ease-out",
  /** Hairline between the grid and the footer / between two months. */
  rule: "#EEEEEE",
  /** Nav chevron button — 26px square, radius 4. */
  navSize: 26,
  navRadius: 4,
  /** Wash used by every hover in the panel. */
  hover: "#FAFFF7",
  /** Hover on a nav / jump control, which also takes the forest border. */
  navHoverBg: "#F5FFF0",

  /** 2px gutter between day cells. */
  cellGap: 2,
  cellRadius: 6,
  /** Radius on the outer corners of a range, and on a lone selected day. */
  cellRadiusSelected: 8,

  /** Forest fill means chosen. */
  selectedBg: "#003C1B",
  selectedInk: "#FFFFFF",
  /** Mint band means between — square, so the run reads as one shape. */
  rangeBg: "#DCF3CE",
  rangeInk: "#003C1B",
  /** Lighter mint used for the drag preview. */
  rangePreviewBg: "#EEF8E4",
  /** A ring means today — never a fill, so it cannot compete with the selection. */
  todayRing: "inset 0 0 0 1.5px #8CC42A",
  todayInk: "#1F5E2C",
  /** Keyboard cursor. */
  focusRing: "0 0 0 2px rgba(140,196,42,.55)",

  dayInk: INPUT_COLORS.value,
  /** Weekend days stay selectable, just muted. */
  weekendInk: INPUT_COLORS.placeholder,
  /** Adjacent-month days. */
  outsideInk: "#C6C6C6",
  /** Before min / after max — greyed, still visible so the grid never shifts. */
  outOfBoundsBg: INPUT_COLORS.subtle,
  outOfBoundsInk: "#C6C6C6",

  weekHeadInk: "#787878",
  weekHeadHeight: 22,
  monthLabelInk: INPUT_COLORS.value,
  navInk: "#595959",
  footerInk: "#787878",
} as const;

export { INPUT_COLORS as DATEPICKER_COLORS, INPUT_TRANSITION as DATEPICKER_TRANSITION };

/**
 * The trigger mirrors Input's state model so a form reads as one surface.
 * `open` renders exactly like `focused` — forest border plus the lime halo.
 */
export type DatePickerVisualState = InputVisualState | "open";

export function getTriggerStyle(state: DatePickerVisualState) {
  return getInputBoxStyle(state === "open" ? "focused" : state);
}

/** Flags that decide how one day cell paints. Order of precedence is fixed. */
export interface DayCellFlags {
  selected?: boolean;
  rangeStart?: boolean;
  rangeEnd?: boolean;
  inRange?: boolean;
  /** Preview band drawn while the second click is still pending. */
  rangePreview?: boolean;
  today?: boolean;
  outside?: boolean;
  disabled?: boolean;
  weekend?: boolean;
  focused?: boolean;
}

export interface DayCellStyle {
  background: string;
  color: string;
  fontWeight: number;
  borderRadius: string;
  boxShadow: string;
  opacity?: number;
}

/**
 * The rule from the design: forest fill means chosen, mint band means between,
 * a ring means today. Range ends round only on their outer corners so the run
 * reads as one continuous shape rather than a row of loose pills.
 */
export function getDayCellStyle(flags: DayCellFlags): DayCellStyle {
  const {
    selected,
    rangeStart,
    rangeEnd,
    inRange,
    rangePreview,
    today,
    outside,
    disabled,
    weekend,
    focused,
  } = flags;

  const r = `${PANEL.cellRadius}px`;
  const rSel = `${PANEL.cellRadiusSelected}px`;

  let background = "transparent";
  let color: string = PANEL.dayInk;
  let fontWeight = 500;
  let borderRadius = r;
  let boxShadow = "none";

  if (weekend) color = PANEL.weekendInk;
  if (outside) {
    color = PANEL.outsideInk;
    fontWeight = 400;
  }

  if (rangePreview) {
    background = PANEL.rangePreviewBg;
    color = PANEL.rangeInk;
    borderRadius = "0";
  }

  if (inRange) {
    background = PANEL.rangeBg;
    color = PANEL.rangeInk;
    borderRadius = "0";
  }

  if (rangeStart || rangeEnd) {
    background = PANEL.selectedBg;
    color = PANEL.selectedInk;
    fontWeight = 600;
    // A one-day range gets a single fully rounded cell — no one-cell mint band.
    borderRadius =
      rangeStart && rangeEnd
        ? rSel
        : rangeStart
          ? `${rSel} 0 0 ${rSel}`
          : `0 ${rSel} ${rSel} 0`;
  } else if (selected) {
    background = PANEL.selectedBg;
    color = PANEL.selectedInk;
    fontWeight = 600;
    borderRadius = rSel;
  } else if (today) {
    color = PANEL.todayInk;
    fontWeight = 700;
    boxShadow = PANEL.todayRing;
  }

  if (focused) boxShadow = PANEL.focusRing;

  if (disabled) {
    return {
      background: PANEL.outOfBoundsBg,
      color: PANEL.outOfBoundsInk,
      fontWeight: 400,
      borderRadius: r,
      boxShadow: "none",
    };
  }

  return { background, color, fontWeight, borderRadius, boxShadow };
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
    "flex min-w-0 items-center",
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
      },
      size: { xs: "", sm: "", md: "", lg: "" },
    },
    defaultVariants: { state: "default", size: "md" },
  },
);

export type DayCellVariant =
  | "default"
  | "today"
  | "selected"
  | "inRange"
  | "rangeStart"
  | "rangeEnd"
  | "outsideMonth";

/**
 * Day-cell classes kept for the published API. The panel now paints its cells
 * from {@link getDayCellStyle} inline, so these carry structure only.
 *
 * @deprecated Prefer `getDayCellStyle` — colours here are no longer the source
 * of truth for the rendered calendar.
 */
export const dayCellVariants = cva(
  "flex items-center justify-center cursor-pointer select-none transition-colors",
  {
    variants: {
      variant: {
        default: "",
        today: "",
        selected: "",
        inRange: "rounded-none",
        rangeStart: "",
        rangeEnd: "",
        outsideMonth: "cursor-default",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
