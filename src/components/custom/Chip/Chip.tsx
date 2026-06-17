import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

export const chipVariants = cva(
  "inline-flex items-center justify-center font-semibold rounded select-none whitespace-nowrap",
  {
    variants: {
      variant: {
        success:  "bg-green-50 text-green-700",
        error:    "bg-red-50 text-red-800",
        warning:  "bg-amber-50 text-amber-700",
        info:     "bg-blue-50 text-blue-700",
        inactive: "bg-gray-100 text-gray-500",
      },
      size: {
        xs: "px-2 py-0.5 text-[10px]",
        sm: "px-2.5 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "success",
      size: "md",
    },
  },
);

export type ChipVariants = VariantProps<typeof chipVariants>;

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ChipProps extends ChipVariants {
  /** Text label displayed inside the chip. */
  label: string;
  /** Custom background color — accepts any valid CSS color value (hex, rgb, hsl, etc.). Overrides the variant background. */
  bgColor?: string;
  /** Custom text color — accepts any valid CSS color value. Overrides the variant text color. */
  textColor?: string;
  /** Extra Tailwind classes. */
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Chip({
  label,
  variant,
  size,
  bgColor,
  textColor,
  className,
}: ChipProps) {
  return (
    <span
      className={cn(chipVariants({ variant, size }), className)}
      style={{
        ...(bgColor ? { backgroundColor: bgColor } : {}),
        ...(textColor ? { color: textColor } : {}),
      }}
    >
      {label}
    </span>
  );
}
