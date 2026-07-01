import { cva, type VariantProps } from "class-variance-authority";
import { FOCUS_RING } from "@/utils/tokens";

export type ToggleVariantSize = "xs" | "sm" | "md" | "lg";

export const trackVariants = cva(
  [
    "group/uengage-toggle relative inline-flex items-center rounded-full border-2",
    "transition-all duration-200 cursor-pointer select-none shadow-[0_2px_6px_rgba(15,23,42,0.12)]",
    `outline-none ${FOCUS_RING}`,
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-[#F7FAF7] data-[state=unchecked]:border-[#9FB49F]",
    "data-[state=checked]:bg-[#C8D8B6] data-[state=checked]:border-[#1F6B32]",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "h-5 w-9",
        sm: "h-7 w-12",
        md: "h-8 w-[4.2rem]",
        lg: "h-9 w-[4.75rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const thumbVariants = cva(
  [
    "pointer-events-none absolute left-0.5 top-1/2 block rounded-full border border-transparent bg-[#A8B8A2]",
    "-translate-y-1/2 transition-transform duration-200",
    "data-[state=unchecked]:translate-x-0",
    "data-[state=checked]:bg-[#1F6B32] data-[state=checked]:border-[#165126]",
  ].join(" "),
  {
    variants: {
      size: {
        xs: "h-3.5 w-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.18)] data-[state=checked]:translate-x-4",
        sm: "h-5 w-5 shadow-[0_1px_2px_rgba(15,23,42,0.18)] data-[state=checked]:translate-x-5",
        md: "h-6 w-6 shadow-[0_2px_3px_rgba(15,23,42,0.18)] data-[state=checked]:translate-x-8",
        lg: "h-7 w-7 shadow-[0_2px_4px_rgba(15,23,42,0.18)] data-[state=checked]:translate-x-9",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type TrackVariants = VariantProps<typeof trackVariants>;
export type ThumbVariants = VariantProps<typeof thumbVariants>;
