import { cva, type VariantProps } from "class-variance-authority";
import { SELECTION_FOCUS_RING } from "./tokens";

// Same fill as the checkbox — brand.green.deepGreen (#003C1B) with a white dot.
// The circle carries the meaning: exactly one.
export const radioCircleVariants = cva(
  [
    "relative inline-flex aspect-square shrink-0 items-center justify-center",
    "rounded-full border-2 bg-transparent outline-none",
    "transition-colors duration-[120ms] ease-linear",
    SELECTION_FOCUS_RING,
  ].join(" "),
  {
    variants: {
      size: {
        xs: "size-[14px]",
        sm: "size-[16px]",
        md: "size-[20px]",
        lg: "size-[24px]",
      },
      state: {
        default: [
          "border-[#C6C6C6] hover:border-[#1F5E2C]",
          "data-[state=checked]:bg-[#003C1B] data-[state=checked]:border-[#003C1B]",
          "data-[state=checked]:hover:border-[#003C1B]",
        ].join(" "),
        error:
          "border-[#A8000F] data-[state=checked]:bg-[#A8000F] data-[state=checked]:border-[#A8000F]",
        disabled: [
          "bg-[#F3F5F9] border-[#E2E2E2] cursor-not-allowed",
          "data-[state=checked]:bg-[#C6D6CB] data-[state=checked]:border-[#C6D6CB]",
        ].join(" "),
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export const radioDotVariants = cva("rounded-full bg-white", {
  variants: {
    size: {
      xs: "size-[5px]",
      sm: "size-[6px]",
      md: "size-[7px]",
      lg: "size-[9px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const radioLabelVariants = cva(
  "select-none transition-colors duration-[120ms] ease-linear",
  {
    variants: {
      size: {
        xs: "text-[12px]",
        sm: "text-[12px]",
        md: "text-[13px]",
        lg: "text-[14px]",
      },
      state: {
        default: "text-[#202020]",
        checked: "text-[#202020]",
        disabled: "text-[#9C9C9C] cursor-not-allowed",
        error: "text-[#A8000F]",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export type RadioCircleVariants = VariantProps<typeof radioCircleVariants>;
export type RadioDotVariants = VariantProps<typeof radioDotVariants>;
export type RadioLabelVariants = VariantProps<typeof radioLabelVariants>;
