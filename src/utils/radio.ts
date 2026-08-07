import { cva, type VariantProps } from "class-variance-authority";
import { FOCUS_RING } from "./tokens";

// Checked color: brand.green.darkGreen (#006F42)
// Dot color: brand.green.deepGreen (#003C1B)
export const radioCircleVariants = cva(
  `aspect-square shrink-0 rounded-full border-2 bg-white transition-colors outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "size-3.5",
        md: "size-[18px]",
        lg: "size-[22px]",
      },
      state: {
        default:
          "border-gray-300 data-[state=checked]:border-[#007A4D]",
        disabled:
          "border-gray-200 opacity-60 cursor-not-allowed",
        error: "border-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export const radioDotVariants = cva(
  "rounded-full bg-[#007A4D] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  {
    variants: {
      size: {
        sm: "size-[5px]",
        md: "size-[7px]",
        lg: "size-[10px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

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
