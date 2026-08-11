import { cva, type VariantProps } from "class-variance-authority";
import { SELECTION_FOCUS_RING } from "@/utils/tokens";

export type ToggleVariantSize = "xs" | "sm" | "md" | "lg";
export type ToggleVariantType = "default" | "danger";

// Track 28×16 / 32×18 / 38×22 / 46×26, 2px inset, knob travels in 180ms.
export const trackVariants = cva(
  [
    "group/uengage-toggle relative inline-flex shrink-0 items-center rounded-full",
    "cursor-pointer select-none",
    "transition-[background-color,box-shadow] duration-[180ms] ease-[cubic-bezier(.2,.8,.3,1)]",
    `outline-none ${SELECTION_FOCUS_RING}`,
    "data-[state=checked]:bg-[#003C1B]",
    "disabled:cursor-not-allowed",
    "disabled:data-[state=unchecked]:bg-[#E2E2E2]",
    "disabled:data-[state=checked]:bg-[#C6D6CB]",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "h-[16px] w-[28px]",
        sm: "h-[18px] w-[32px]",
        md: "h-[22px] w-[38px]",
        lg: "h-[26px] w-[46px]",
      },
      type: {
        default:
          "data-[state=unchecked]:bg-[#C6C6C6] hover:data-[state=unchecked]:bg-[#AFAFAF]",
        danger: "data-[state=unchecked]:bg-[#A8000F]",
      },
    },
    defaultVariants: {
      size: "md",
      type: "default",
    },
  },
);

export const thumbVariants = cva(
  [
    "pointer-events-none absolute top-1/2 left-[2px] flex items-center justify-center",
    "rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.28)]",
    "-translate-y-1/2 transition-transform duration-[180ms] ease-[cubic-bezier(.2,.8,.3,1)]",
    "data-[state=unchecked]:translate-x-0",
    "group-disabled/uengage-toggle:data-[state=unchecked]:bg-[#F3F5F9]",
    "group-disabled/uengage-toggle:data-[state=checked]:bg-[#EEF3EF]",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "size-[12px] data-[state=checked]:translate-x-[12px]",
        sm: "size-[14px] data-[state=checked]:translate-x-[14px]",
        md: "size-[18px] data-[state=checked]:translate-x-[16px]",
        lg: "size-[22px] data-[state=checked]:translate-x-[20px]",
      },
      // The knob is always white; `type` is kept so callers can keep passing it.
      type: {
        default: "",
        danger: "",
      },
    },
    defaultVariants: {
      size: "md",
      type: "default",
    },
  },
);

/**
 * Pending parks the knob mid-track until the server confirms. Offsets are
 * `(track - knob) / 2 - 2` so the knob sits centred inside the 2px inset.
 */
export const THUMB_PENDING_TRANSLATE: Record<ToggleVariantSize, string> = {
  xs: "data-[state=unchecked]:translate-x-[6px] data-[state=checked]:translate-x-[6px]",
  sm: "data-[state=unchecked]:translate-x-[7px] data-[state=checked]:translate-x-[7px]",
  md: "data-[state=unchecked]:translate-x-[8px] data-[state=checked]:translate-x-[8px]",
  lg: "data-[state=unchecked]:translate-x-[10px] data-[state=checked]:translate-x-[10px]",
};

/** Spinner drawn inside the knob while pending. */
export const PENDING_SPINNER_SIZE: Record<ToggleVariantSize, string> = {
  xs: "size-[6px]",
  sm: "size-[7px]",
  md: "size-[9px]",
  lg: "size-[11px]",
};

export type TrackVariants = VariantProps<typeof trackVariants>;
export type ThumbVariants = VariantProps<typeof thumbVariants>;
