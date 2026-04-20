import { cva, type VariantProps } from "class-variance-authority";

export type TriggerState = "default" | "open" | "disabled";
export type TriggerSize = "xs" | "sm" | "md" | "lg";

export const triggerVariants = cva(
  [
    "inline-flex w-full items-center justify-between",
    "rounded-[4px] border bg-white",
    "transition-colors duration-150 cursor-pointer select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      state: {
        default: [
          "border-[#E5E7EB] text-[#374151]",
          "hover:border-[#9CA3AF] hover:text-[#111827]",
        ].join(" "),
        open: [
          "border-[#6B7280] text-[#111827]",
          "ring-2 ring-[#6B7280]/20",
        ].join(" "),
        disabled: [
          "border-[#E5E7EB] text-[#9CA3AF]",
          "opacity-50 pointer-events-none",
        ].join(" "),
      },
      size: {
        xs: "h-6 gap-1 px-1.5 text-[11px]",
        sm: "h-8 gap-1 px-2 text-xs",
        md: "h-10 gap-1.5 px-3 text-sm",
        lg: "h-12 gap-2 px-3.5 text-base",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  },
);

export type TriggerVariants = VariantProps<typeof triggerVariants>;
