import { cva, type VariantProps } from "class-variance-authority";
import { COMPONENT_HEIGHT, TEXT_SIZE, PLACEHOLDER_SIZE } from "@/utils/tokens";

export type TriggerState = "default" | "open" | "disabled";
export type TriggerSize = "xs" | "sm" | "md" | "lg";

export const triggerVariants = cva(
  [
    "flex min-w-0 items-center justify-between",
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
        open: ["border-gray-500 text-[#111827]", "ring-1 ring-gray-200"].join(
          " ",
        ),
        disabled: [
          "border-gray-300 text-gray-400",
          "opacity-50 pointer-events-none",
        ].join(" "),
      },
      size: {
        xs: `h-6 gap-1 px-1.5 ${TEXT_SIZE.xs} ${PLACEHOLDER_SIZE.xs}`,
        sm: `${COMPONENT_HEIGHT.sm} gap-1 px-2 ${TEXT_SIZE.sm} ${PLACEHOLDER_SIZE.sm}`,
        md: `${COMPONENT_HEIGHT.md} gap-1.5 px-3 ${TEXT_SIZE.md} ${PLACEHOLDER_SIZE.md}`,
        lg: `${COMPONENT_HEIGHT.lg} gap-2 px-3.5 ${TEXT_SIZE.lg} ${PLACEHOLDER_SIZE.lg}`,
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  },
);

export type TriggerVariants = VariantProps<typeof triggerVariants>;
