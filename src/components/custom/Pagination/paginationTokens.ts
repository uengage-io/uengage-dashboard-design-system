import type { PaginationSize } from "@/types/pagination";

/* -------------------------------------------------------------------------- */
/*  Size scale                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Match the table the footer belongs to — a compact table under a default
 * footer looks bolted on.
 *
 * These map to the design system's compact / default / large control sizes.
 */
export interface PaginationSizeSpec {
  /** Label used by docs and stories. */
  name: string;
  /** Square control box (arrows) and minimum width of a page button, px. */
  control: number;
  /** Chevron glyph, px. */
  icon: number;
  /** Label size on the controls, px. */
  fontSize: number;
  /** Horizontal padding inside a page button, px. */
  padX: number;
  /** Gap between controls, px. */
  gap: number;
  radius: number;
  /** Padding of the footer row itself — `${y}px ${x}px`. */
  rowPadY: number;
  rowPadX: number;
  spec: string;
  use: string;
}

export const PAGINATION_SIZES: Record<PaginationSize, PaginationSizeSpec> = {
  sm: {
    name: "Compact",
    control: 28,
    icon: 12,
    fontSize: 11,
    padX: 7,
    gap: 5,
    radius: 7,
    rowPadY: 10,
    rowPadX: 13,
    spec: "ctl 28 · pad 10/13",
    use: "Dense tables, nested panels",
  },
  md: {
    name: "Default",
    control: 32,
    icon: 14,
    fontSize: 12,
    padX: 9,
    gap: 6,
    radius: 8,
    rowPadY: 14,
    rowPadX: 16,
    spec: "ctl 32 · pad 14/16",
    use: "The standard table footer",
  },
  lg: {
    name: "Large",
    control: 38,
    icon: 16,
    fontSize: 13,
    padX: 11,
    gap: 7,
    radius: 8,
    rowPadY: 18,
    rowPadX: 18,
    spec: "ctl 38 · pad 18/18",
    use: "Touch surfaces, tablet dashboards",
  },
};

/* -------------------------------------------------------------------------- */
/*  Palette                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The current page is the only filled control on the row — everything else is
 * an outline, so the eye lands on "where am I" first.
 */
export const PAGINATION_COLORS = {
  surface: "#FFFFFF",
  border: "#E2E2E2",
  subtle: "#F3F5F9",
  rule: "#F3F5F9",

  fg1: "#161616",
  fg2: "#595959",
  fg3: "#9C9C9C",
  fgDisabled: "#C6C6C6",

  brand: "#003C1B",
  brandSoft: "#1F5E2C",
  /** Mint wash under a hovered control. */
  hoverBg: "#F5FFF0",
  /** Border of the "Load more" button — softer than the brand line. */
  loadMoreBorder: "#BFD6C6",

  /** Lime halo on focus. */
  ring: "0 0 0 3px rgba(140,196,42,.38)",
  menuShadow: "2px 2px 12px rgba(0,0,0,.12)",
  /** Disabled arrows keep their shape but fade. */
  disabledOpacity: 0.55,
} as const;

/* -------------------------------------------------------------------------- */
/*  Control states — documented in the stories                                 */
/* -------------------------------------------------------------------------- */

export interface PaginationControlState {
  name: string;
  bg: string;
  border: string;
  fg: string;
  ring?: string;
  note: string;
}

export const PAGINATION_CONTROL_STATES: PaginationControlState[] = [
  { name: "Default", bg: "#FFFFFF", border: "1px solid #E2E2E2", fg: "#595959", note: "Reachable page" },
  { name: "Hover", bg: "#F5FFF0", border: "1px solid #1F5E2C", fg: "#003C1B", note: "Mint wash" },
  { name: "Current", bg: "#003C1B", border: "1px solid #003C1B", fg: "#FFFFFF", note: "Filled, aria-current" },
  {
    name: "Focus",
    bg: "#FFFFFF",
    border: "1px solid #1F5E2C",
    fg: "#003C1B",
    ring: PAGINATION_COLORS.ring,
    note: "Lime halo",
  },
  { name: "Loading", bg: "#003C1B", border: "1px solid #003C1B", fg: "#FFFFFF", note: "Page in flight" },
  { name: "Disabled", bg: "#F3F5F9", border: "1px solid #E2E2E2", fg: "#C6C6C6", note: "At the first page" },
  { name: "Ellipsis", bg: "transparent", border: "1px solid transparent", fg: "#9C9C9C", note: "Never clickable" },
];

/* -------------------------------------------------------------------------- */
/*  Range label                                                                */
/* -------------------------------------------------------------------------- */

/**
 * "6–10 of 1,284 orders" — a range with a noun, never just "Page 2". An
 * operator checking whether their filter worked reads this first.
 */
export function formatPaginationRange({
  currentPage,
  perPage,
  total,
  itemLabel = "items",
  locale = "en-IN",
}: {
  currentPage: number;
  perPage: number;
  total?: number;
  itemLabel?: string;
  locale?: string;
}): string {
  const n = (v: number) => v.toLocaleString(locale);
  const first = (currentPage - 1) * perPage + 1;

  if (typeof total !== "number") {
    return `Showing ${n(perPage)} ${itemLabel}`;
  }
  if (total === 0) return `No ${itemLabel}`;

  const last = Math.min(currentPage * perPage, total);
  return `${n(Math.min(first, total))}–${n(last)} of ${n(total)} ${itemLabel}`;
}
