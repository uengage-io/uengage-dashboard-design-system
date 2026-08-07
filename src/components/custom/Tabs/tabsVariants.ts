import { cva, type VariantProps } from "class-variance-authority";
import { FOCUS_RING } from "@/utils/tokens";

export const tabTriggerVariants = cva(
  [
    "relative flex items-center gap-2 cursor-pointer select-none whitespace-nowrap",
    "rounded-t-lg transition-all duration-200 outline-none",
    "px-3 py-2 sm:px-5 sm:py-3 text-[13px] sm:text-[14px] font-medium",
    FOCUS_RING,
  ].join(" "),
  {
    variants: {
      state: {
        active: "text-[#006F42] font-semibold",
        inactive: "text-gray-500 hover:text-[#006F42] hover:bg-gray-50",
        disabled: "text-[#D1D5DB] pointer-events-none",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  },
);

export const tabPillClass = "relative z-10";

export const tabIndicatorClass =
  "absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-transparent";

export const tabOverlayClass = "absolute inset-0 rounded-t-lg bg-transparent";

export type TabTriggerVariants = VariantProps<typeof tabTriggerVariants>;
