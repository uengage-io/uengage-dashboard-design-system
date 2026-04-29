import { cva, type VariantProps } from "class-variance-authority";
import { FOCUS_RING } from "./tokens";

// Checked color: brand.green.darkGreen (#006F42)
// Dot color: brand.green.deepGreen (#003C1B)
export const radioCircleVariants = cva(
  `relative inline-flex shrink-0 items-center justify-center rounded-full border bg-transparent transition-colors outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "h-[14px] w-[14px]",
        md: "h-[18px] w-[18px]",
        lg: "h-[22px] w-[22px]",
      },
      state: {
        default:
          "border-gray-300 bg-transparent data-[state=checked]:border-[#006F42]",
        disabled:
          "border-gray-200 bg-transparent opacity-60 cursor-not-allowed",
        error: "border-red-500 bg-transparent",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export const radioDotVariants = cva("rounded-full bg-[#003C1B]", {
  variants: {
    size: {
      sm: "h-[8px] w-[8px]",
      md: "h-[10px] w-[10px]",
      lg: "h-[12px] w-[12px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const radioLabelVariants = cva("select-none transition-colors", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    state: {
      default: "text-gray-700",
      checked: "text-gray-900",
      disabled: "text-gray-400 cursor-not-allowed",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
});

export type RadioCircleVariants = VariantProps<typeof radioCircleVariants>;
export type RadioDotVariants = VariantProps<typeof radioDotVariants>;
export type RadioLabelVariants = VariantProps<typeof radioLabelVariants>;
