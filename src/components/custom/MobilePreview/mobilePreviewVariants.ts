export type MobilePreviewSize       = "sm" | "md" | "lg" | "xl";
export type MobilePreviewDevice     = "iphone" | "android" | "generic";
export type MobilePreviewFrameColor = "midnight" | "silver" | "gold" | "white";

/** Portrait frame outer dimensions (w × h) in px. */
export const FRAME_SIZES: Record<MobilePreviewSize, { w: number; h: number }> = {
  sm: { w: 225,  h: 455  },
  md: { w: 285,  h: 585  },
  lg: { w: 335,  h: 693  },
  xl: { w: 390,  h: 812  },
};

/** Frame colour palette: background fill, outer border, and side-button colour. */
export const FRAME_COLORS: Record<
  MobilePreviewFrameColor,
  { bg: string; border: string; button: string; highlight: string }
> = {
  midnight: { bg: "#1c1c1e", border: "#3a3a3c", button: "#111113", highlight: "rgba(255,255,255,0.07)" },
  silver:   { bg: "#d0d0d5", border: "#a8a8ad", button: "#bebec3", highlight: "rgba(255,255,255,0.45)" },
  gold:     { bg: "#c8a96e", border: "#a08040", button: "#b89050", highlight: "rgba(255,255,255,0.3)"  },
  white:    { bg: "#f2f2f4", border: "#cacacf", button: "#dadadf", highlight: "rgba(255,255,255,0.7)"  },
};

/** Outer frame and inner screen border-radius (px). */
export const FRAME_RADIUS: Record<MobilePreviewDevice, { frame: number; screen: number }> = {
  iphone:  { frame: 52, screen: 46 },
  android: { frame: 36, screen: 30 },
  generic: { frame: 22, screen: 16 },
};

/** Bezel gap between outer frame edge and inner screen edge (px). */
export const BEZEL: Record<MobilePreviewDevice, number> = {
  iphone:  7,
  android: 5,
  generic: 4,
};

/** Status-bar height (px) — includes dynamic-island / punch-hole clearance. */
export const STATUS_BAR_H: Record<MobilePreviewDevice, number> = {
  iphone:  52,
  android: 32,
  generic: 28,
};

/** Bottom chrome height (px) — home indicator or navigation bar. */
export const BOTTOM_BAR_H: Record<MobilePreviewDevice, number> = {
  iphone:  34,
  android: 48,
  generic: 0,
};

/** Dynamic-island pill dimensions (px) — iphone only. */
export const DYNAMIC_ISLAND: Record<MobilePreviewDevice, { w: number; h: number } | null> = {
  iphone:  { w: 76, h: 24 },
  android: null,
  generic: null,
};

/** Punch-hole camera circle diameter (px) — android only. */
export const PUNCH_HOLE: Record<MobilePreviewDevice, { size: number } | null> = {
  iphone:  null,
  android: { size: 11 },
  generic: null,
};

/** Width of the simulated hardware side buttons (px). */
export const SIDE_BUTTON_W = 3;

/**
 * Portrait side-button layout as % of frame height.
 * left:  [mute-switch, volume-up, volume-down]
 * right: [power]
 */
export const SIDE_BUTTONS = {
  left: [
    { top: "17%", height: "3.5%" },
    { top: "24%", height: "8%"   },
    { top: "35%", height: "8%"   },
  ],
  right: [
    { top: "25%", height: "11%"  },
  ],
} as const;
