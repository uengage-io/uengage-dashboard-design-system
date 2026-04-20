import { cva, type VariantProps } from "class-variance-authority";

export const checkboxBoxVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-[4px] border transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a5c38]",
  {
    variants: {
      size: {
        sm: "h-[14px] w-[14px]",
        md: "h-[20px] w-[20px]",
        lg: "h-[26px] w-[26px]",
      },
      state: {
        unchecked: "bg-white border-gray-300",
        checked: "bg-[#1a5c38] border-[#1a5c38] text-white",
        indeterminate: "bg-[#1a5c38] border-[#1a5c38] text-white",
        disabled: "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed",
        error: "bg-white border-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      state: "unchecked",
    },
  },
);

export const checkboxLabelVariants = cva("select-none transition-colors", {
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

export type CheckboxBoxVariants = VariantProps<typeof checkboxBoxVariants>;
export type CheckboxLabelVariants = VariantProps<typeof checkboxLabelVariants>;
