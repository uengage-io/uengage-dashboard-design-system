import { cva, type VariantProps } from "class-variance-authority";
import { COMPONENT_HEIGHT, TEXT_SIZE, PLACEHOLDER_SIZE } from "@/utils/tokens";
import type { AllowPattern } from "@/types/input";

export const inputWrapperVariants = cva(
  "relative flex w-full items-center rounded-[4px] border bg-white transition-colors",
  {
    variants: {
      size: {
        sm: `${COMPONENT_HEIGHT.sm} ${TEXT_SIZE.sm}`,
        md: `${COMPONENT_HEIGHT.md} ${TEXT_SIZE.md}`,
        lg: `${COMPONENT_HEIGHT.lg} ${TEXT_SIZE.lg}`,
      },
      state: {
        default: "border-gray-400 hover:border-gray-500 hover:shadow-sm",
        focused: "border-gray-500 ring-1 ring-gray-200",
        error: "border-red-500",
        disabled:
          "bg-gray-50 border-gray-300 text-gray-400 cursor-not-allowed opacity-60",
        readonly: "bg-gray-50 border-gray-300 text-gray-700 cursor-default",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export const inputFieldVariants = cva(
  `h-full w-full bg-transparent border-0 shadow-none outline-none text-inherit placeholder:text-[#C4C9D2] disabled:cursor-not-allowed disabled:opacity-100 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none`,
  {
    variants: {
      size: {
        sm: `px-2.5 py-0 ${PLACEHOLDER_SIZE.sm}`,
        md: `px-3 py-0 ${PLACEHOLDER_SIZE.md}`,
        lg: `px-3.5 py-0 ${PLACEHOLDER_SIZE.lg}`,
      },
      hasLeftIcon: {
        true: "",
        false: "",
      },
      hasRightIcon: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { size: "sm", hasLeftIcon: true, className: "pl-8" },
      { size: "md", hasLeftIcon: true, className: "pl-9" },
      { size: "lg", hasLeftIcon: true, className: "pl-10" },
      { size: "sm", hasRightIcon: true, className: "pr-8" },
      { size: "md", hasRightIcon: true, className: "pr-9" },
      { size: "lg", hasRightIcon: true, className: "pr-10" },
    ],
    defaultVariants: {
      size: "md",
      hasLeftIcon: false,
      hasRightIcon: false,
    },
  },
);

export const inputIconSlotVariants = cva(
  "absolute inset-y-0 flex items-center text-gray-400",
  {
    variants: {
      size: {
        sm: "px-2.5 [&_svg]:size-3.5",
        md: "px-3 [&_svg]:size-4",
        lg: "px-3.5 [&_svg]:size-5",
      },
      side: {
        left: "left-0",
        right: "right-0",
      },
    },
    defaultVariants: {
      size: "md",
      side: "left",
    },
  },
);

export type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>;
export type InputFieldVariants = VariantProps<typeof inputFieldVariants>;
export type InputIconSlotVariants = VariantProps<typeof inputIconSlotVariants>;

export const PATTERN_REGEX: Record<AllowPattern, string> = {
  alphanumeric: "[^a-zA-Z0-9]",
  alpha: "[^a-zA-Z ]",
  numeric: "[^0-9]",
  decimal: "[^0-9.]",
  phone: "[^0-9]",
  none: "(?!)",
};
