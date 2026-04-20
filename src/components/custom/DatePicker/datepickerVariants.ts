import { cva } from "class-variance-authority";

export type DatePickerTriggerState = "default" | "open" | "disabled";

export const triggerVariants = cva(
  "inline-flex items-center w-full rounded-[4px] border bg-white text-sm transition-colors",
  {
    variants: {
      state: {
        default: "border-[#D1D5DB] text-[#374151] hover:border-[#9CA3AF]",
        open:    "border-[#006F42] ring-1 ring-[#006F42] text-[#374151]",
        disabled:"border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF] cursor-not-allowed opacity-60 pointer-events-none",
      },
    },
    defaultVariants: { state: "default" },
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

export const dayCellVariants = cva(
  "flex items-center justify-center text-sm rounded-[4px] cursor-pointer select-none transition-colors w-8 h-8",
  {
    variants: {
      variant: {
        default:      "text-[#374151] hover:bg-[#F3F4F6]",
        today:        "text-[#006F42] font-semibold hover:bg-[#F3F4F6]",
        selected:     "bg-[#006F42] text-white hover:bg-[#005a35]",
        inRange:      "bg-[#E6F4EA] text-[#374151] rounded-none",
        rangeStart:   "bg-[#006F42] text-white rounded-r-none hover:bg-[#005a35]",
        rangeEnd:     "bg-[#006F42] text-white rounded-l-none hover:bg-[#005a35]",
        outsideMonth: "text-[#D1D5DB] cursor-default hover:bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
