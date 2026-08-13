import { cva } from "class-variance-authority";

/* ────────────────────────────────────────────────────────────────────────────
 * Pixel + colour spec lifted from the Design Console page
 * `File and Color Pickers.dc.html` ("Live upload", "Upload states" and
 * "Upload shapes" sections).
 *
 * As with Input, the metrics ride on inline styles rather than Tailwind
 * utilities so the control keeps its exact pixel spec inside consuming apps
 * whose Tailwind build does not scan this package for arbitrary-value classes.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Resolved lifecycle state of a single file row. */
export type FileUploadStatus =
  /** Picked, nothing has happened to it yet. */
  | "idle"
  /** Accepted but waiting behind other files. */
  | "queued"
  /** Bytes are moving — pairs with `progress`. */
  | "uploading"
  /** Bytes have landed, the server is still validating. */
  | "processing"
  /** Finished successfully. */
  | "done"
  /** The transfer broke mid-flight — retryable. */
  | "failed"
  /** Refused before the transfer started (too large, wrong type) — not retryable. */
  | "rejected"
  /** Landed, but only some of it was usable. */
  | "partial"
  /** Connection dropped; the transfer resumes from where it stopped. */
  | "paused"
  /** The same file already exists — the operator picks skip or replace. */
  | "duplicate"
  /** An image whose pixel dimensions do not match the requirement — offer a crop. */
  | "dimension";

export const FILE_UPLOAD_COLORS = {
  surface: "#FFFFFF",
  subtle: "#F3F5F9",
  canvas: "#FAFFF7",

  border: "#E2E2E2",
  borderSoft: "#EEEEEE",
  borderStrong: "#C6C6C6",

  ink: "#161616",
  inkFg1: "#202020",
  inkFg2: "#595959",
  inkFg3: "#787878",
  muted: "#9C9C9C",

  /** Dashed dropzone rule, resting. */
  dropBorder: "#C4DCB6",
  /** Dropzone fill, resting. */
  dropBg: "#FAFFF7",
  /** Dropzone fill on hover / drag-over. */
  dropBgActive: "#F2FBEB",
  /** Dashed rule goes solid forest on drag-over. */
  dropBorderActive: "#1F5E2C",
  /** Hairline around the dropzone icon tile and the format chips. */
  dropChipBorder: "#D5E8CA",

  forest: "#1F5E2C",
  deep: "#003C1B",
  mint: "#DCF3CE",
  green: "#00A86B",
  greenInk: "#00795A",
  lime: "#8CC42A",
  /** Outline button border on the compact shape. */
  outlineBorder: "#BFD6C6",
  /** Outline button fill on hover. */
  outlineHoverBg: "#F5FFF0",

  infoBg: "#E4F2FB",
  infoInk: "#0B4A6F",
  infoBar: "#4BADE3",

  warnBg: "#FFF6D6",
  warnBorder: "#EFD98A",
  warnInk: "#6A5300",
  warnInkDeep: "#4A3B00",
  warnOutline: "#E0C866",

  dangerBg: "#FBE9EA",
  dangerBorder: "#F2C8CC",
  dangerOutline: "#E4A6AC",
  dangerInk: "#7A0009",
  dangerBar: "#A8000F",

  /** Translucent white used for tiles/badges sitting on a tinted row. */
  onTint: "rgba(255,255,255,.7)",

  /** Gallery cover ribbon. */
  coverBg: "rgba(0,60,27,.86)",
  coverFg: "#DCF3CE",
  galleryTileBg: "#DCF3CE",
  galleryTileBorder: "#CDE3C0",

  /** ── Dark surface (`tone="dark"`) ── */
  darkCanvas: "#0C1712",
  darkDropBg: "#141C17",
  darkDropBorder: "#2C4A38",
  darkTileBg: "#1B3423",
  darkTileFg: "#8CC42A",
  darkTitle: "#E7F0E9",
  darkSub: "#8FB79C",
} as const;

/** Dropzone and swatch transitions run at the design's ease curve. */
export const FILE_UPLOAD_TRANSITION =
  "border-color 140ms cubic-bezier(.2,.8,.3,1), background-color 140ms cubic-bezier(.2,.8,.3,1), box-shadow 140ms cubic-bezier(.2,.8,.3,1)";

/** Progress fills animate their width, never their colour. */
export const PROGRESS_TRANSITION = "width 200ms linear";

export type FileUploadSizeKey = "sm" | "md" | "lg";

export interface FileUploadSizeSpec {
  // ── Dropzone ──
  dropPadY: number;
  dropPadX: number;
  dropGap: number;
  dropRadius: number;
  /** Square icon tile at the top of the dropzone. */
  tile: number;
  tileRadius: number;
  tileIcon: number;
  /** "Drop menu files here". */
  title: number;
  /** "or click to browse". */
  sub: number;
  /** CSV / XLSX / Max 5 MB chips. */
  chip: number;

  // ── File row ──
  rowPadY: number;
  rowPadX: number;
  rowGap: number;
  rowRadius: number;
  rowMinHeight: number;
  /** Square extension tile on the left of the row. */
  extTile: number;
  extRadius: number;
  extFont: number;
  /** Filename. */
  name: number;
  /** Size, note and percentage lines. */
  meta: number;
  /** Progress bar thickness. */
  bar: number;
  /** Retry / Skip / Replace / Crop pills and the status badge. */
  action: number;
  actionFont: number;

  // ── Compact shape ──
  compactPadY: number;
  compactPadX: number;
  compactRadius: number;
  compactButton: number;

  // ── Avatar shape ──
  avatar: number;
  avatarBadge: number;
  avatarInitials: number;

  // ── Gallery shape ──
  galleryPad: number;
  galleryGap: number;
  galleryRadius: number;
  galleryTileRadius: number;
}

export const FILE_UPLOAD_SIZES: Record<FileUploadSizeKey, FileUploadSizeSpec> = {
  sm: {
    dropPadY: 18, dropPadX: 14, dropGap: 7, dropRadius: 10,
    tile: 32, tileRadius: 10, tileIcon: 15, title: 12, sub: 10, chip: 8,
    rowPadY: 9, rowPadX: 10, rowGap: 9, rowRadius: 10, rowMinHeight: 48,
    extTile: 28, extRadius: 8, extFont: 8, name: 11, meta: 9, bar: 3,
    action: 24, actionFont: 9,
    compactPadY: 8, compactPadX: 10, compactRadius: 9, compactButton: 28,
    avatar: 48, avatarBadge: 20, avatarInitials: 15,
    galleryPad: 10, galleryGap: 7, galleryRadius: 9, galleryTileRadius: 8,
  },
  md: {
    dropPadY: 26, dropPadX: 18, dropGap: 9, dropRadius: 12,
    tile: 40, tileRadius: 12, tileIcon: 18, title: 13, sub: 11, chip: 9,
    rowPadY: 11, rowPadX: 12, rowGap: 11, rowRadius: 11, rowMinHeight: 56,
    extTile: 32, extRadius: 9, extFont: 9, name: 12, meta: 10, bar: 4,
    action: 26, actionFont: 10,
    compactPadY: 10, compactPadX: 12, compactRadius: 10, compactButton: 30,
    avatar: 60, avatarBadge: 24, avatarInitials: 19,
    galleryPad: 12, galleryGap: 8, galleryRadius: 10, galleryTileRadius: 9,
  },
  lg: {
    dropPadY: 34, dropPadX: 22, dropGap: 11, dropRadius: 14,
    tile: 48, tileRadius: 14, tileIcon: 22, title: 15, sub: 12, chip: 10,
    rowPadY: 13, rowPadX: 14, rowGap: 13, rowRadius: 12, rowMinHeight: 64,
    extTile: 36, extRadius: 10, extFont: 10, name: 13, meta: 11, bar: 5,
    action: 30, actionFont: 11,
    compactPadY: 12, compactPadX: 14, compactRadius: 11, compactButton: 34,
    avatar: 76, avatarBadge: 28, avatarInitials: 24,
    galleryPad: 14, galleryGap: 9, galleryRadius: 11, galleryTileRadius: 10,
  },
};

/** Visual treatment for one row status, straight off the design's state table. */
export interface FileUploadStatusSpec {
  /** Label above the row in the states gallery. */
  label: string;
  rowBg: string;
  rowBorder: string;
  tileBg: string;
  tileFg: string;
  nameColor: string;
  noteColor: string;
  /** Default note when the caller does not supply one. */
  note?: string;
  /** Whether the row carries a determinate progress bar. */
  bar: boolean;
  barColor: string;
  /** Right-hand pill. `"{pct}"` is substituted with the live percentage. */
  badgeText: string;
  badgeBg: string;
  badgeFg: string;
  /** Action pill rendered next to the badge, if any. */
  action?: "retry" | "crop" | "duplicate";
}

const C = FILE_UPLOAD_COLORS;

export const FILE_UPLOAD_STATUS_STYLES: Record<FileUploadStatus, FileUploadStatusSpec> = {
  idle: {
    label: "Idle",
    rowBg: C.surface, rowBorder: `1px solid ${C.border}`,
    tileBg: C.subtle, tileFg: C.inkFg2,
    nameColor: C.ink, noteColor: C.muted,
    note: "Ready to upload",
    bar: false, barColor: C.green,
    badgeText: "", badgeBg: C.subtle, badgeFg: C.inkFg2,
  },
  queued: {
    label: "Queued",
    rowBg: C.surface, rowBorder: `1px solid ${C.border}`,
    tileBg: C.subtle, tileFg: C.inkFg2,
    nameColor: C.ink, noteColor: C.muted,
    note: "Waiting to upload",
    bar: false, barColor: C.green,
    badgeText: "Queued", badgeBg: C.subtle, badgeFg: C.inkFg2,
  },
  uploading: {
    label: "Uploading",
    rowBg: C.surface, rowBorder: `1px solid ${C.border}`,
    tileBg: C.mint, tileFg: C.deep,
    nameColor: C.ink, noteColor: C.muted,
    bar: true, barColor: C.green,
    badgeText: "{pct}", badgeBg: C.mint, badgeFg: C.deep,
  },
  processing: {
    label: "Processing",
    rowBg: C.surface, rowBorder: `1px solid ${C.border}`,
    tileBg: C.infoBg, tileFg: C.infoInk,
    nameColor: C.ink, noteColor: C.muted,
    note: "Validating…",
    bar: true, barColor: C.infoBar,
    badgeText: "Scanning", badgeBg: C.infoBg, badgeFg: C.infoInk,
  },
  done: {
    label: "Success",
    rowBg: C.surface, rowBorder: `1px solid ${C.border}`,
    tileBg: C.mint, tileFg: C.deep,
    nameColor: C.ink, noteColor: C.greenInk,
    note: "Uploaded",
    bar: false, barColor: C.green,
    badgeText: "Done", badgeBg: C.mint, badgeFg: C.greenInk,
  },
  failed: {
    label: "Upload failed",
    rowBg: C.surface, rowBorder: `1px solid ${C.dangerBorder}`,
    tileBg: C.dangerBg, tileFg: C.dangerInk,
    nameColor: C.ink, noteColor: C.dangerInk,
    note: "Connection dropped — nothing was saved",
    bar: true, barColor: C.dangerBar,
    badgeText: "", badgeBg: C.dangerBg, badgeFg: C.dangerInk,
    action: "retry",
  },
  rejected: {
    label: "Rejected",
    rowBg: C.dangerBg, rowBorder: `1px solid ${C.dangerBorder}`,
    tileBg: C.onTint, tileFg: C.dangerInk,
    nameColor: C.dangerInk, noteColor: C.dangerInk,
    note: "This file was not accepted",
    bar: false, barColor: C.dangerBar,
    badgeText: "Rejected", badgeBg: C.onTint, badgeFg: C.dangerInk,
  },
  partial: {
    label: "Partial import",
    rowBg: C.warnBg, rowBorder: `1px solid ${C.warnBorder}`,
    tileBg: C.onTint, tileFg: C.warnInk,
    nameColor: C.warnInkDeep, noteColor: C.warnInk,
    note: "Some rows were skipped",
    bar: false, barColor: C.warnInk,
    badgeText: "Review", badgeBg: C.onTint, badgeFg: C.warnInk,
  },
  paused: {
    label: "Paused",
    rowBg: C.subtle, rowBorder: `1px solid ${C.border}`,
    tileBg: C.surface, tileFg: C.inkFg3,
    nameColor: C.inkFg2, noteColor: C.inkFg3,
    note: "Paused — waiting for a connection.",
    bar: true, barColor: C.borderStrong,
    badgeText: "Paused", badgeBg: C.surface, badgeFg: C.inkFg2,
  },
  duplicate: {
    label: "Duplicate file",
    rowBg: C.surface, rowBorder: `1px solid ${C.border}`,
    tileBg: C.subtle, tileFg: C.inkFg3,
    nameColor: C.inkFg1, noteColor: C.inkFg3,
    note: "Already uploaded",
    bar: false, barColor: C.green,
    badgeText: "", badgeBg: C.subtle, badgeFg: C.inkFg2,
    action: "duplicate",
  },
  dimension: {
    label: "Wrong dimensions",
    rowBg: C.warnBg, rowBorder: `1px solid ${C.warnBorder}`,
    tileBg: C.onTint, tileFg: C.warnInk,
    nameColor: C.warnInkDeep, noteColor: C.warnInk,
    note: "Wrong dimensions",
    bar: false, barColor: C.warnInk,
    badgeText: "", badgeBg: C.onTint, badgeFg: C.warnInk,
    action: "crop",
  },
};

/** Statuses whose transfer is still in flight — the row keeps a live bar. */
export const IN_FLIGHT_STATUSES: FileUploadStatus[] = ["uploading", "processing", "paused"];

/** Statuses that mean the file never made it. */
export const FAILED_STATUSES: FileUploadStatus[] = ["failed", "rejected"];

export type FileUploadTone = "light" | "dark";

export interface DropzoneStyle {
  background: string;
  border: string;
  boxShadow: string;
  titleColor: string;
  subColor: string;
  tileBg: string;
  tileBorder: string;
  tileFg: string;
  chipBg: string;
  chipBorder: string;
  chipFg: string;
  cursor: string;
  opacity?: number;
}

/**
 * Dropzone box colours for a resolved state. `dragover` is the only state that
 * turns the dashed rule solid — hover only tints the fill and the rule colour,
 * so the dropzone never appears to change shape under the cursor.
 */
export function getDropzoneStyle(
  state: "idle" | "hover" | "dragover" | "error" | "disabled",
  tone: FileUploadTone = "light",
): DropzoneStyle {
  if (tone === "dark") {
    const dark: DropzoneStyle = {
      background: C.darkDropBg,
      border: `1.5px dashed ${C.darkDropBorder}`,
      boxShadow: "none",
      titleColor: C.darkTitle,
      subColor: C.darkSub,
      tileBg: C.darkTileBg,
      tileBorder: "1px solid transparent",
      tileFg: C.darkTileFg,
      chipBg: C.darkTileBg,
      chipBorder: "1px solid transparent",
      chipFg: C.darkTileFg,
      cursor: "pointer",
    };
    if (state === "dragover") {
      return { ...dark, border: `1.5px solid ${C.lime}`, background: "#18221B" };
    }
    if (state === "hover") return { ...dark, background: "#18221B" };
    if (state === "error") {
      return { ...dark, border: `1.5px dashed ${C.dangerOutline}`, subColor: C.dangerOutline };
    }
    if (state === "disabled") return { ...dark, cursor: "not-allowed", opacity: 0.5 };
    return dark;
  }

  const base: DropzoneStyle = {
    background: C.dropBg,
    border: `1.5px dashed ${C.dropBorder}`,
    boxShadow: "none",
    titleColor: C.inkFg1,
    subColor: C.inkFg3,
    tileBg: C.surface,
    tileBorder: `1px solid ${C.dropChipBorder}`,
    tileFg: C.forest,
    chipBg: C.surface,
    chipBorder: `1px solid ${C.dropChipBorder}`,
    chipFg: C.forest,
    cursor: "pointer",
  };

  switch (state) {
    case "hover":
      return { ...base, background: C.dropBgActive, border: `1.5px dashed ${C.dropBorderActive}` };
    case "dragover":
      return {
        ...base,
        background: C.dropBgActive,
        border: `1.5px solid ${C.dropBorderActive}`,
        boxShadow: "0 0 0 3px rgba(140,196,42,.28)",
      };
    case "error":
      return {
        ...base,
        background: C.dangerBg,
        border: `1.5px dashed ${C.dangerBorder}`,
        titleColor: C.dangerInk,
        subColor: C.dangerInk,
        tileBorder: `1px solid ${C.dangerBorder}`,
        tileFg: C.dangerInk,
        chipBorder: `1px solid ${C.dangerBorder}`,
        chipFg: C.dangerInk,
      };
    case "disabled":
      return {
        ...base,
        background: C.subtle,
        border: `1.5px dashed ${C.border}`,
        titleColor: C.muted,
        subColor: C.muted,
        tileFg: C.muted,
        chipFg: C.muted,
        chipBorder: `1px solid ${C.border}`,
        tileBorder: `1px solid ${C.border}`,
        cursor: "not-allowed",
        opacity: 0.7,
      };
    default:
      return base;
  }
}

/** Extension label for the row tile — always upper-case, capped at four glyphs. */
export function getFileExt(name: string): string {
  const raw = name.split(".").pop() ?? "";
  if (!raw || raw === name) return "FILE";
  return raw.slice(0, 4).toUpperCase();
}

/**
 * Truncate in the middle so the extension stays visible — operators identify
 * files by their type as much as by their name.
 */
export function truncateMiddle(name: string, max = 28): string {
  if (name.length <= max) return name;
  const dot = name.lastIndexOf(".");
  const ext = dot > 0 ? name.slice(dot) : "";
  const stem = dot > 0 ? name.slice(0, dot) : name;
  const keep = Math.max(4, max - ext.length - 1);
  return `${stem.slice(0, keep)}…${ext}`;
}

/* ────────────────────────────────────────────────────────────────────────────
 * Legacy exports — retained so existing call sites keep type-checking. The
 * dropzone, icon tile and avatar now take their metrics and colours from the
 * inline specs above.
 * ──────────────────────────────────────────────────────────────────────────── */

/** @deprecated Structural classes only — colours and metrics ride on inline styles. */
export const dropzoneVariants = cva(
  [
    "relative w-full flex flex-col items-center justify-center text-center",
    "select-none outline-none",
    "focus-visible:ring-2 focus-visible:ring-[#1F5E2C] focus-visible:ring-offset-2",
  ],
  {
    variants: {
      size: { sm: "", md: "", lg: "" },
      state: { idle: "", dragover: "", error: "", disabled: "pointer-events-none" },
    },
    defaultVariants: { size: "md", state: "idle" },
  },
);

/** @deprecated Structural classes only — metrics ride on inline styles. */
export const iconWrapperVariants = cva(
  "flex items-center justify-center flex-shrink-0",
  {
    variants: { size: { sm: "", md: "", lg: "" } },
    defaultVariants: { size: "md" },
  },
);

/** @deprecated Structural classes only — metrics ride on inline styles. */
export const avatarContainerVariants = cva(
  [
    "relative rounded-full overflow-hidden flex-shrink-0",
    "focus-visible:ring-2 focus-visible:ring-[#1F5E2C] focus-visible:ring-offset-2",
  ],
  {
    variants: {
      size: { sm: "", md: "", lg: "" },
      state: {
        empty: "cursor-pointer",
        filled: "cursor-pointer",
        disabled: "cursor-not-allowed pointer-events-none opacity-60",
      },
    },
    defaultVariants: { size: "md", state: "empty" },
  },
);

export const ICON_SIZES: Record<string, number> = {
  sm: FILE_UPLOAD_SIZES.sm.tileIcon,
  md: FILE_UPLOAD_SIZES.md.tileIcon,
  lg: FILE_UPLOAD_SIZES.lg.tileIcon,
};

export const AVATAR_ICON_SIZES: Record<string, number> = { sm: 16, md: 20, lg: 26 };

export const PLACEHOLDER_TEXT: {
  image: string;
  file: string;
  avatar: string;
  video: string;
  compact: string;
  gallery: string;
  [key: string]: string;
} = {
  image: "Drop images here",
  file: "Drop files here",
  avatar: "Upload photo",
  video: "Drop videos here",
  compact: "Choose file",
  gallery: "Drop images here",
};

/** Sub-line under the dropzone title. */
export const BROWSE_HINT = "or click to browse";
