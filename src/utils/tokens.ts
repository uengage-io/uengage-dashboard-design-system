
export type ComponentSize = "xs" | "sm" | "md" | "lg";


export const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006F42]" as const;

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
