import { cva, type VariantProps } from "class-variance-authority";
import { SELECTION_FOCUS_RING } from "./tokens";

// Checked fill: brand.green.deepGreen (#003C1B) with a white mark.
// Box 14 / 16 / 20 / 24 with radius 4 / 4 / 5 / 6.
export const checkboxBoxVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center border-2 outline-none",
    "transition-colors duration-[120ms] ease-linear",
    SELECTION_FOCUS_RING,
  ].join(" "),
  {
    variants: {
      size: {
        xs: "h-[14px] w-[14px] rounded-[4px]",
        sm: "h-[16px] w-[16px] rounded-[4px]",
        md: "h-[20px] w-[20px] rounded-[5px]",
        lg: "h-[24px] w-[24px] rounded-[6px]",
      },
      state: {
        unchecked:
          "bg-white border-[#C6C6C6] hover:bg-[#F5FFF0] hover:border-[#1F5E2C]",
        checked: "bg-[#003C1B] border-[#003C1B] text-white",
        indeterminate: "bg-[#003C1B] border-[#003C1B] text-white",
        // Error keeps the box readable in either value: red outline when empty,
        // red fill once it is ticked.
        error:
          "bg-white border-[#A8000F] text-white data-[state=checked]:bg-[#A8000F] data-[state=indeterminate]:bg-[#A8000F]",
        disabled: "bg-[#F3F5F9] border-[#E2E2E2] cursor-not-allowed",
        // Disabled-checked keeps the mark at 40% so the operator can still read
        // what was chosen for them.
        disabledChecked:
          "bg-[#C6D6CB] border-[#C6D6CB] text-white/75 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "md",
      state: "unchecked",
    },
  },
);

export const checkboxLabelVariants = cva(
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
        // The fill carries the selection; the label text does not change colour.
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

export type CheckboxBoxVariants = VariantProps<typeof checkboxBoxVariants>;
export type CheckboxLabelVariants = VariantProps<typeof checkboxLabelVariants>;
