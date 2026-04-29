import { cva } from "class-variance-authority";
import { COMPONENT_HEIGHT, TEXT_SIZE } from "@/utils/tokens";

export type DatePickerTriggerState = "default" | "open" | "disabled";

export const triggerVariants = cva(
  "inline-flex items-center w-full rounded-[4px] border border-gray-400 bg-white transition-colors",
  {
    variants: {
      state: {
        default: "text-[#374151] hover:border-gray-500 hover:shadow-sm",
        open: "border-gray-500 ring-1 ring-gray-200 text-[#374151]",
        disabled:
          "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60 pointer-events-none",
      },
      size: {
        sm: `${COMPONENT_HEIGHT.sm} ${TEXT_SIZE.sm}`,
        md: `${COMPONENT_HEIGHT.md} ${TEXT_SIZE.md}`,
        lg: `${COMPONENT_HEIGHT.lg} ${TEXT_SIZE.lg}`,
      },
    },
    defaultVariants: { state: "default", size: "md" },
  },
);

export type DayCellVariant =
  | "default"
  | "today"
  | "selected"
  | "inRange"
  | "rangeStart"
  | "rangeEnd"
  | "outsideMonth";

// Day cell colors reference brand.green.darkGreen (#006F42) for selected/today
export const dayCellVariants = cva(
  "flex items-center justify-center text-sm rounded-[4px] cursor-pointer select-none transition-colors w-8 h-8",
  {
    variants: {
      variant: {
        default: "text-[#374151] hover:bg-[#F3F4F6]",
        today: "text-[#006F42] font-semibold hover:bg-[#F3F4F6]",
        selected: "bg-[#006F42] text-white",
        inRange: "bg-[#E6F4EA] text-[#374151] rounded-none",
        rangeStart: "bg-[#006F42] text-white rounded-r-none",
        rangeEnd: "bg-[#006F42] text-white rounded-l-none",
        outsideMonth: "text-[#D1D5DB] cursor-default hover:bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
