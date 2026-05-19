import { cva, type VariantProps } from "class-variance-authority";
import { FOCUS_RING } from "@/utils/tokens";

export const accordionRootVariants = cva("w-full", {
  variants: {
    variant: {
      default: "divide-y divide-[#E5E7EB]",
      ghost: "",
      bordered: "flex flex-col gap-2",
    },
  },
  defaultVariants: { variant: "default" },
});

export const accordionItemVariants = cva("group", {
  variants: {
    variant: {
      default: "",
      ghost: "border-b border-[#E5E7EB] last:border-b-0",
      bordered:
        "border border-[#E5E7EB] rounded-xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
    },
  },
  defaultVariants: { variant: "default" },
});

export const accordionTriggerVariants = cva(
  [
    "flex w-full items-center gap-3 font-medium outline-none",
    "transition-colors duration-200 cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-40",
    FOCUS_RING,
  ].join(" "),
  {
    variants: {
      variant: {
        default: "hover:bg-[#F9FAFB] rounded-lg",
        ghost: "hover:text-[#006F42]",
        bordered: "hover:bg-[#F9FAFB]",
      },
      size: {
        sm: "px-3 py-2.5 text-[12px] sm:text-[13px]",
        md: "px-4 py-3 text-[13px] sm:text-[14px]",
        lg: "px-5 py-4 text-[14px] sm:text-[15px]",
      },
      state: {
        open: "text-[#006F42]",
        closed: "text-[#374151]",
      },
    },
    defaultVariants: { variant: "default", size: "md", state: "closed" },
  },
);

export const accordionContentVariants = cva(
  "text-[#6B7280] leading-relaxed",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
        bordered: "",
      },
      size: {
        sm: "px-3 pb-3 text-[11px] sm:text-[12px]",
        md: "px-4 pb-4 text-[12px] sm:text-[13px]",
        lg: "px-5 pb-5 text-[13px] sm:text-[14px]",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export type AccordionRootVariants = VariantProps<typeof accordionRootVariants>;
export type AccordionItemVariants = VariantProps<typeof accordionItemVariants>;
export type AccordionTriggerVariants = VariantProps<typeof accordionTriggerVariants>;
export type AccordionContentVariants = VariantProps<typeof accordionContentVariants>;
