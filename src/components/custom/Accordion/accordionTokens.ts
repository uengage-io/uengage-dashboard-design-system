import type {
  AccordionAppearance,
  AccordionSize,
  AccordionSummaryTone,
  AccordionVariant,
} from "./Accordion.types";

/* -------------------------------------------------------------------------- */
/*  Size scale                                                                 */
/* -------------------------------------------------------------------------- */

export interface AccordionSizeSpec {
  /** Label used by the docs table. */
  name: string;
  /** Header padding. */
  pad: string;
  /** Gap between chevron, tile, title and summary. */
  gap: number;
  /** Panel padding. */
  bodyPad: number;
  /** Chevron box, px. */
  chev: number;
  /** Icon tile box, px. */
  tile: number;
  /** Icon inside the tile, px. */
  tileIcon: number;
  /** Title font size, px. */
  fs: number;
  /** Compact drops the icon tile. */
  showTile: boolean;
  /** Compact drops the subtitle — a title and a summary, nothing else. */
  showSubtitle: boolean;
  spec: string;
  use: string;
}

export const ACCORDION_SIZES: Record<AccordionSize, AccordionSizeSpec> = {
  sm: {
    name: "Compact",
    pad: "10px 12px",
    gap: 9,
    bodyPad: 12,
    chev: 13,
    tile: 22,
    tileIcon: 11,
    fs: 12,
    showTile: false,
    showSubtitle: false,
    spec: "row 40 · pad 10/12",
    use: "Long lists, FAQ stacks, drawer sections",
  },
  md: {
    name: "Default",
    pad: "14px 15px",
    gap: 11,
    bodyPad: 15,
    chev: 15,
    tile: 28,
    tileIcon: 14,
    fs: 13,
    showTile: true,
    showSubtitle: true,
    spec: "row 56 · pad 14/15",
    use: "The standard — settings pages, detail panels",
  },
  lg: {
    name: "Large",
    pad: "18px 18px",
    gap: 13,
    bodyPad: 18,
    chev: 17,
    tile: 34,
    tileIcon: 16,
    fs: 15,
    showTile: true,
    showSubtitle: true,
    spec: "row 68 · pad 18/18",
    use: "Onboarding checklists, 3–4 major steps",
  },
};

/* -------------------------------------------------------------------------- */
/*  Variant shells                                                             */
/* -------------------------------------------------------------------------- */

export interface AccordionShellSpec {
  /** Outer border of the whole stack. */
  border: string | undefined;
  radius: number;
  /** Gap between rows. */
  gap: number;
  clip: boolean;
  bg: string;
}

export interface AccordionItemSpec {
  border: string | undefined;
  radius: number;
  /** Hairline between rows, applied to every row but the last. */
  divider: boolean;
  bg: string;
  shadow: string | undefined;
}

/**
 * `bordered` is the design default — one shell, hairline dividers.
 *
 * `default` and `ghost` are the pre-design-system names, kept so existing call
 * sites keep rendering: `default` maps to `flush` and `ghost` to a flush stack
 * with no dividers. The old `bordered` look — separate boxes with elevation —
 * is now `card`.
 */
export type AccordionVariantKey = "bordered" | "separated" | "flush" | "card" | "ghost";

/** Folds the legacy variant names onto the design set. */
export function toAccordionVariantKey(variant: AccordionVariant): AccordionVariantKey {
  if (variant === "default") return "flush";
  return variant;
}

export function getAccordionShell(
  variant: AccordionVariantKey,
  appearance: AccordionAppearance,
): AccordionShellSpec {
  const dark = appearance === "dark";
  const line = dark ? "#2C4A38" : "#E2E2E2";
  const surface = dark ? "transparent" : "#FFFFFF";

  switch (variant) {
    case "bordered":
      return { border: `1px solid ${line}`, radius: 12, gap: 0, clip: true, bg: surface };
    case "separated":
      return { border: undefined, radius: 0, gap: 10, clip: false, bg: "transparent" };
    case "card":
      return { border: undefined, radius: 0, gap: 12, clip: false, bg: "transparent" };
    case "ghost":
    case "flush":
    default:
      return { border: undefined, radius: 0, gap: 0, clip: false, bg: "transparent" };
  }
}

export function getAccordionItem(
  variant: AccordionVariantKey,
  appearance: AccordionAppearance,
): AccordionItemSpec {
  const dark = appearance === "dark";
  const line = dark ? "#2C4A38" : "#E2E2E2";
  const surface = dark ? "transparent" : "#FFFFFF";

  switch (variant) {
    case "separated":
      return { border: `1px solid ${line}`, radius: 10, divider: false, bg: surface, shadow: undefined };
    case "card":
      return {
        border: `1px solid ${line}`,
        radius: 12,
        divider: false,
        bg: surface,
        shadow: dark ? undefined : "2px 2px 4px rgba(0,0,0,.04)",
      };
    case "ghost":
      return { border: undefined, radius: dark ? 9 : 0, divider: false, bg: "transparent", shadow: undefined };
    case "bordered":
    case "flush":
    default:
      return { border: undefined, radius: dark ? 9 : 0, divider: true, bg: "transparent", shadow: undefined };
  }
}

/* -------------------------------------------------------------------------- */
/*  Palette                                                                    */
/* -------------------------------------------------------------------------- */

export interface AccordionPalette {
  /** Wash behind an open header, so the open row is obvious at a glance. */
  openBg: string;
  hoverBg: string;
  /** Hairline between a header and its panel. */
  divider: string;
  chevronOpen: string;
  chevronClosed: string;
  titleOpen: string;
  titleClosed: string;
  subtitle: string;
  tileOpenBg: string;
  tileOpenFg: string;
  tileClosedBg: string;
  tileClosedFg: string;
  panelFg: string;
  /** Focus ring, drawn inset so it never clips against the shell. */
  ring: string;
  /** Amber dot marking unsaved work. */
  dirtyDot: string;
  spinnerTrack: string;
  spinnerHead: string;
}

const LIGHT: AccordionPalette = {
  openBg: "#FAFFF7",
  hoverBg: "#F5FFF0",
  divider: "#F3F5F9",
  chevronOpen: "#003C1B",
  chevronClosed: "#1F5E2C",
  titleOpen: "#003C1B",
  titleClosed: "#161616",
  subtitle: "#787878",
  tileOpenBg: "#DCF3CE",
  tileOpenFg: "#003C1B",
  tileClosedBg: "#F3F5F9",
  tileClosedFg: "#595959",
  panelFg: "#595959",
  ring: "inset 0 0 0 2px rgba(140,196,42,.55)",
  dirtyDot: "#F5C518",
  spinnerTrack: "rgba(0,60,27,.2)",
  spinnerHead: "#1F5E2C",
};

/** The open row fills #1B3423; the chevron and summary chip go lime. */
const DARK: AccordionPalette = {
  openBg: "#1B3423",
  hoverBg: "#141C17",
  divider: "#26332C",
  chevronOpen: "#8CC42A",
  chevronClosed: "#8FB79C",
  titleOpen: "#DCF3CE",
  titleClosed: "#A6B7AC",
  subtitle: "#8FB79C",
  tileOpenBg: "#2C4A38",
  tileOpenFg: "#DCF3CE",
  tileClosedBg: "#141C17",
  tileClosedFg: "#8FB79C",
  panelFg: "#8FB79C",
  ring: "inset 0 0 0 2px rgba(140,196,42,.55)",
  dirtyDot: "#F5C518",
  spinnerTrack: "rgba(140,196,42,.25)",
  spinnerHead: "#8CC42A",
};

export function getAccordionPalette(
  appearance: AccordionAppearance = "light",
): AccordionPalette {
  return appearance === "dark" ? DARK : LIGHT;
}

/* -------------------------------------------------------------------------- */
/*  Summary chip tones                                                         */
/* -------------------------------------------------------------------------- */

export interface AccordionChipTone {
  bg: string;
  fg: string;
}

const LIGHT_CHIPS: Record<AccordionSummaryTone, AccordionChipTone> = {
  brand: { bg: "#DCF3CE", fg: "#003C1B" },
  success: { bg: "#DCF3CE", fg: "#00795A" },
  neutral: { bg: "#F3F5F9", fg: "#595959" },
  warning: { bg: "#FFF6D6", fg: "#6A5300" },
  danger: { bg: "#FBE2E4", fg: "#A8000F" },
};

const DARK_CHIPS: Record<AccordionSummaryTone, AccordionChipTone> = {
  brand: { bg: "#8CC42A", fg: "#17330A" },
  success: { bg: "#8CC42A", fg: "#17330A" },
  neutral: { bg: "#26332C", fg: "#A6B7AC" },
  warning: { bg: "#4A3E1C", fg: "#F0DA9A" },
  danger: { bg: "#4A2226", fg: "#F2A0A6" },
};

export function getAccordionChip(
  tone: AccordionSummaryTone = "neutral",
  appearance: AccordionAppearance = "light",
): AccordionChipTone {
  return appearance === "dark" ? DARK_CHIPS[tone] : LIGHT_CHIPS[tone];
}

/* -------------------------------------------------------------------------- */
/*  Row states                                                                 */
/* -------------------------------------------------------------------------- */

export interface AccordionStateSpec {
  bg?: string;
  border?: string;
  chevron?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Tints that override the base palette for a row. A disabled row keeps its
 * title and gains a reason — hiding it makes operators think a section
 * disappeared.
 */
export function getAccordionStateSpec(
  state: "default" | "loading" | "error" | "dirty",
  disabled: boolean,
  appearance: AccordionAppearance,
): AccordionStateSpec {
  const dark = appearance === "dark";

  if (disabled) {
    return dark
      ? { bg: "#141C17", chevron: "#4A5C51", title: "#5E6F65", subtitle: "#4A5C51" }
      : { bg: "#F3F5F9", chevron: "#C6C6C6", title: "#9C9C9C", subtitle: "#C6C6C6" };
  }

  switch (state) {
    case "loading":
      return dark
        ? { bg: "#1B3423", border: "1px solid #2C4A38", title: "#DCF3CE" }
        : { bg: "#FAFFF7", border: "1px solid #CDE3C0", title: "#003C1B" };
    case "error":
      return dark
        ? { bg: "#2A1416", border: "1px solid #4A2226", chevron: "#F2A0A6", title: "#F2A0A6", subtitle: "#C98A8F" }
        : { bg: "#FBE9EA", border: "1px solid #F2C8CC", chevron: "#A8000F", title: "#7A0009", subtitle: "#7A0009" };
    case "dirty":
      return dark
        ? { bg: "#2E2611", border: "1px solid #4A3E1C", chevron: "#F0DA9A", title: "#F0DA9A", subtitle: "#BFAE73" }
        : { bg: "#FFF6D6", border: "1px solid #EFD98A", chevron: "#6A5300", title: "#4A3B00", subtitle: "#6A5300" };
    default:
      return {};
  }
}
