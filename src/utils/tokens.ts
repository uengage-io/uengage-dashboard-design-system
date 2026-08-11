
export type ComponentSize = "xs" | "sm" | "md" | "lg";


export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006F42]" as const;

/**
 * Selection controls (checkbox / radio / toggle) carry a 3px lime halo on the
 * control itself rather than the outline used by text inputs and buttons.
 */
export const SELECTION_FOCUS_RING =
  "focus-visible:shadow-[0_0_0_3px_rgba(140,196,42,0.38)]" as const;

/** Shared palette for the selection controls. */
export const SELECTION_COLORS = {
  /** Checked fill — brand.green.deepGreen */
  fill: "#003C1B",
  /** Resting border / off track */
  off: "#C6C6C6",
  /** Hover border and track */
  hoverBorder: "#1F5E2C",
  hoverTrack: "#AFAFAF",
  /** Hover tint behind an unchecked box */
  hoverTint: "#F5FFF0",
  danger: "#A8000F",
  disabledBg: "#F3F5F9",
  disabledBorder: "#E2E2E2",
  /** Disabled but on — the choice stays readable */
  disabledOn: "#C6D6CB",
  disabledOnKnob: "#EEF3EF",
  pendingTrack: "#8CA695",
  label: "#202020",
  labelDisabled: "#9C9C9C",
} as const;

export const COMPONENT_HEIGHT: Record<ComponentSize, string> = {
  xs: "h-6",
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
} as const;

export const TEXT_SIZE: Record<ComponentSize, string> = {
  xs: "text-[11px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

export const ICON_SIZE: Record<ComponentSize, string> = {
  xs: "[&_svg]:size-3",
  sm: "[&_svg]:size-3.5",
  md: "[&_svg]:size-4",
  lg: "[&_svg]:size-5",
} as const;

export const PLACEHOLDER_SIZE: Record<ComponentSize, string> = {
  xs: "placeholder:text-[10px]",
  sm: "placeholder:text-[11px]",
  md: "placeholder:text-[12px]",
  lg: "placeholder:text-[14px]",
} as const;
