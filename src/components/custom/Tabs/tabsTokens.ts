import type { TabsAppearance, TabsSize } from "./Tabs.types";

/** Deep brand green — the only colour the active tab carries. */
export const FOREST = "#003C1B";

export interface TabsSizeSpec {
  /** Label font size, px. */
  fs: number;
  /** Gap between underline tabs, px. */
  gap: number;
  /** Padding of an underline tab. */
  underPad: string;
  /** Padding of a segmented tab. */
  segPad: string;
  /** Padding of a pill tab. */
  pillPad: string;
  /** Icon box, px. */
  icon: number;
  /** Human-readable spec, used by the docs story. */
  spec: string;
  name: string;
}

export const TABS_SIZES: Record<TabsSize, TabsSizeSpec> = {
  sm: {
    name: "Small",
    fs: 12,
    gap: 16,
    underPad: "0 0 8px",
    segPad: "6px 11px",
    pillPad: "5px 11px",
    icon: 13,
    spec: "12px · pad 8 · gap 16",
  },
  md: {
    name: "Medium",
    fs: 13,
    gap: 22,
    underPad: "0 0 11px",
    segPad: "8px 14px",
    pillPad: "7px 14px",
    icon: 15,
    spec: "13px · pad 11 · gap 22",
  },
  lg: {
    name: "Large",
    fs: 15,
    gap: 28,
    underPad: "0 0 14px",
    segPad: "10px 17px",
    pillPad: "9px 17px",
    icon: 17,
    spec: "15px · pad 14 · gap 28",
  },
};

export interface TabsPalette {
  /** 1px rule under an underline strip, or beside a vertical rail. */
  strip: string;
  /** Resting label. */
  fg: string;
  /** Hover label. */
  fgHover: string;
  /** Active label. */
  fgActive: string;
  /** Disabled label. */
  fgDisabled: string;
  /** The 2px underline / the 2px vertical marker. */
  bar: string;

  /** Segmented track. */
  segTrack: string;
  segActiveBg: string;
  segActiveShadow: string;
  segHoverBg: string;

  pillBg: string;
  pillFg: string;
  pillBorder: string;
  pillHoverBg: string;
  pillHoverBorder: string;
  pillActiveBg: string;
  pillActiveFg: string;
  pillActiveBorder: string;

  vertActiveBg: string;
  vertHoverBg: string;

  countBg: string;
  countFg: string;
  countActiveBg: string;
  countActiveFg: string;

  /** Panel surface. */
  panelBg: string;
  panelBorder: string;
  panelFg: string;

  /** Amber dot marking unsaved work. */
  dirty: string;
  /** Focus ring. */
  ring: string;
  /** Surface behind the strip, used by the overflow fade. */
  surface: string;
}

const LIGHT: TabsPalette = {
  strip: "#E2E2E2",
  fg: "#595959",
  fgHover: "#1F5E2C",
  fgActive: FOREST,
  fgDisabled: "#C6C6C6",
  bar: FOREST,

  segTrack: "#F3F5F9",
  segActiveBg: "#FFFFFF",
  segActiveShadow: "0 1px 3px rgba(0,0,0,.12)",
  segHoverBg: "#EFF3F0",

  pillBg: "#FFFFFF",
  pillFg: "#161616",
  pillBorder: "#E2E2E2",
  pillHoverBg: "#F5FFF0",
  pillHoverBorder: "#BFD6C6",
  pillActiveBg: FOREST,
  pillActiveFg: "#FFFFFF",
  pillActiveBorder: FOREST,

  vertActiveBg: "#DCF3CE",
  vertHoverBg: "#FAFFF7",

  countBg: "#F3F5F9",
  countFg: "#595959",
  countActiveBg: "#DCF3CE",
  countActiveFg: FOREST,

  panelBg: "#FAFFF7",
  panelBorder: "#EEEEEE",
  panelFg: "#595959",

  dirty: "#F5C518",
  ring: "0 0 0 3px rgba(140,196,42,.38)",
  surface: "#FFFFFF",
};

/** Lime replaces forest for the active bar; segmented's selected pill fills #1B3423. */
const DARK: TabsPalette = {
  strip: "#2C4A38",
  fg: "#8FB79C",
  fgHover: "#DCF3CE",
  fgActive: "#8CC42A",
  fgDisabled: "#4A5C51",
  bar: "#8CC42A",

  segTrack: "#141C17",
  segActiveBg: "#1B3423",
  segActiveShadow: "none",
  segHoverBg: "#18251D",

  pillBg: "transparent",
  pillFg: "#DCF3CE",
  pillBorder: "#2C4A38",
  pillHoverBg: "#1B3423",
  pillHoverBorder: "#37563F",
  pillActiveBg: "#8CC42A",
  pillActiveFg: "#0C1712",
  pillActiveBorder: "#8CC42A",

  vertActiveBg: "#1B3423",
  vertHoverBg: "#141C17",

  countBg: "#141C17",
  countFg: "#8FB79C",
  countActiveBg: "#2C4A38",
  countActiveFg: "#DCF3CE",

  panelBg: "#111A15",
  panelBorder: "#2C4A38",
  panelFg: "#8FB79C",

  dirty: "#F5C518",
  ring: "0 0 0 3px rgba(140,196,42,.38)",
  surface: "#0C1712",
};

export function getTabsPalette(appearance: TabsAppearance = "light"): TabsPalette {
  return appearance === "dark" ? DARK : LIGHT;
}
