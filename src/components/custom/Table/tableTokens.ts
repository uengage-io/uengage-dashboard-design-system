import type { TableRowState, TableSize, TableStatusTone } from "@/types/table";

/* -------------------------------------------------------------------------- */
/*  Size scale                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Row height is the only thing that really changes between sizes. `sm` drops
 * the secondary line under a name; `lg` keeps everything and breathes.
 *
 * These map to the design system's compact / cosy / roomy densities.
 */
export interface TableSizeSpec {
  /** Density label used by docs and stories. */
  name: string;
  /** Body row height, px. */
  rowHeight: number;
  /** Header row height, px. */
  headerHeight: number;
  /** Body font size, px. */
  fontSize: number;
  /** Avatar box in an identity cell, px. */
  avatar: number;
  /** Initials inside the avatar, px. */
  avatarFontSize: number;
  /** Compact drops the secondary line under a name. */
  showMeta: boolean;
  /** Horizontal padding inside a cell, px. */
  cellPadX: number;
  /** Padding against the table's left and right edges, px. */
  edgePad: number;
  /** Roughly how many rows land on one screen — docs copy. */
  rowsPerScreen: string;
  use: string;
}

export const TABLE_SIZES: Record<TableSize, TableSizeSpec> = {
  sm: {
    name: "Compact",
    rowHeight: 36,
    headerHeight: 34,
    fontSize: 12,
    avatar: 22,
    avatarFontSize: 8,
    showMeta: false,
    cellPadX: 12,
    edgePad: 16,
    rowsPerScreen: "~18 rows",
    use: "Reconciliation and audit screens where volume beats detail",
  },
  md: {
    name: "Cosy",
    rowHeight: 48,
    headerHeight: 38,
    fontSize: 13,
    avatar: 28,
    avatarFontSize: 10,
    showMeta: true,
    cellPadX: 14,
    edgePad: 20,
    rowsPerScreen: "~13 rows",
    use: "The default. Fits an avatar and a secondary line",
  },
  lg: {
    name: "Roomy",
    rowHeight: 58,
    headerHeight: 42,
    fontSize: 13,
    avatar: 32,
    avatarFontSize: 11,
    showMeta: true,
    cellPadX: 16,
    edgePad: 22,
    rowsPerScreen: "~11 rows",
    use: "Short lists with thumbnails — menus, outlets, offers",
  },
};

/* -------------------------------------------------------------------------- */
/*  Palette                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Only horizontal rules exist — no vertical grid lines, ever — and there is no
 * zebra striping. Rules plus density do that job with less noise.
 */
export const TABLE_COLORS = {
  surface: "#FFFFFF",

  headerBg: "#F3F5F9",
  headerFg: "#595959",
  headerActiveFg: "#003C1B",
  /** Hairline under the header — one shade darker than the body rules. */
  headerRule: "#E2E2E2",
  /** Hairline between body rows. */
  rowRule: "#F3F5F9",

  /** Full-row wash on hover, 120ms. */
  hoverBg: "#FAFFF7",
  /** Selected rows tint — never an outline. */
  selectedBg: "#DCF3CE",
  selectedRule: "#CDE3C0",

  fg1: "#161616",
  fg2: "#595959",
  fg3: "#9C9C9C",
  fgDisabled: "#C6C6C6",

  border: "#E2E2E2",
  subtle: "#F3F5F9",

  brand: "#003C1B",
  brandSoft: "#1F5E2C",
  brandTint: "#DCF3CE",
  brandFaint: "#F5FFF0",
  brandRule: "#D5E8CA",
  brandGradient: "linear-gradient(180deg,#0A5A2C,#003C1B)",

  danger: "#A8000F",
  dangerDeep: "#7A0009",
  dangerTint: "#FBE9EA",
  dangerRule: "#F2C8CC",

  /** Focus ring shared with the rest of the kit. */
  ring: "0 0 0 3px rgba(140,196,42,.28)",
  /** Soft right shadow on the pinned identifier column. */
  pinShadow: "6px 0 8px -6px rgba(0,0,0,.18)",
  /** Shimmer sweep used by the loading skeleton. */
  shimmer: "linear-gradient(90deg,#F3F5F9 0px,#E9EDF2 130px,#F3F5F9 260px)",
} as const;

/* -------------------------------------------------------------------------- */
/*  Status chip tones                                                          */
/* -------------------------------------------------------------------------- */

export interface TableStatusToneSpec {
  bg: string;
  fg: string;
  dot: string;
}

export const TABLE_STATUS_TONES: Record<TableStatusTone, TableStatusToneSpec> = {
  success: { bg: "#DCF3CE", fg: "#003C1B", dot: "#00A86B" },
  info: { bg: "#E4F2FB", fg: "#0B4A6F", dot: "#4BADE3" },
  warning: { bg: "#FFF6D6", fg: "#6A5300", dot: "#F5C518" },
  danger: { bg: "#FBE9EA", fg: "#7A0009", dot: "#A8000F" },
  neutral: { bg: "#F3F5F9", fg: "#595959", dot: "#9C9C9C" },
};

/* -------------------------------------------------------------------------- */
/*  Row states                                                                 */
/* -------------------------------------------------------------------------- */

export interface TableRowStateSpec {
  /** Base row background before hover and selection are applied. */
  bg?: string;
  fg?: string;
  strike: boolean;
  /** Saving and deleted rows stop responding to hover, click and selection. */
  inert: boolean;
  opacity?: number;
}

export function getTableRowStateSpec(
  state: TableRowState = "default",
): TableRowStateSpec {
  switch (state) {
    case "saving":
      return { bg: TABLE_COLORS.surface, fg: TABLE_COLORS.fg3, strike: false, inert: true };
    case "deleted":
      return {
        bg: TABLE_COLORS.subtle,
        fg: TABLE_COLORS.fgDisabled,
        strike: true,
        inert: true,
      };
    case "disabled":
      return {
        bg: TABLE_COLORS.subtle,
        fg: TABLE_COLORS.fgDisabled,
        strike: false,
        inert: true,
        opacity: 0.7,
      };
    default:
      return { strike: false, inert: false };
  }
}

/** The em-dash stand-in for an empty cell — never a blank cell or "N/A". */
export const TABLE_EMPTY_CELL = "—";
