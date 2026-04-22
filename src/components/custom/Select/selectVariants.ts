import { cva, type VariantProps } from "class-variance-authority";

export type TriggerState = "default" | "open" | "disabled";
export type TriggerSize = "xs" | "sm" | "md" | "lg";

export const triggerVariants = cva(
  [
    "flex w-full items-center justify-between",
    "rounded-[4px] border border-gray-400 bg-white",
    "transition-colors duration-150 cursor-pointer select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      state: {
        default: [
          "text-[#374151]",
          "hover:border-gray-500 hover:text-[#111827] hover:shadow-sm",
        ].join(" "),
        open: [
          "border-gray-500 text-[#111827]",
          "ring-1 ring-gray-200",
        ].join(" "),
        disabled: [
          "border-gray-300 text-gray-400",
          "opacity-50 pointer-events-none",
        ].join(" "),
      },
      size: {
        xs: "h-6 gap-1 px-1.5 text-[11px] placeholder:text-[11px]",
        sm: "h-8 gap-1 px-2 text-xs placeholder:text-[11px]",
        md: "h-10 gap-1.5 px-3 text-sm placeholder:text-[12px]",
        lg: "h-12 gap-2 px-3.5 text-base placeholder:text-[14px]",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  },
);

export type TriggerVariants = VariantProps<typeof triggerVariants>;
