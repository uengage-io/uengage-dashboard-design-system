import { cva, type VariantProps } from "class-variance-authority";

export const tableWrapperVariants = cva("w-full", {
  variants: {
    bordered: {
      true: "border rounded-lg",
      false: "",
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

export const tableHeaderRowVariants = cva(
  "bg-slate-50 text-gray-500 text-xs font-medium",
  {
    variants: {
      size: {
        sm: "py-1.5 sm:py-2",
        md: "py-2 sm:py-3",
        lg: "py-3 sm:py-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const tableBodyRowVariants = cva("transition-colors", {
  variants: {
    size: {
      sm: "py-1.5 sm:py-2 text-xs",
      md: "py-2 sm:py-3 text-sm",
      lg: "py-3 sm:py-4 text-sm sm:text-base",
    },
    clickable: {
      true: "cursor-pointer",
      false: "",
    },
    hover: {
      true: "hover:bg-gray-50",
      false: "hover:bg-transparent",
    },
  },
  defaultVariants: {
    size: "md",
    clickable: false,
    hover: true,
  },
});

export const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full font-medium gap-1 transition-colors border",
  {
    variants: {
      variant: {
        success: "bg-green-100 text-green-700 border-green-300",
        warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
        error: "bg-red-100 text-red-700 border-red-300",
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-2.5 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base",
      },
    },

    defaultVariants: {
      variant: "success",
      size: "md",
    },
  },
);

export type TableWrapperVariants = VariantProps<typeof tableWrapperVariants>;
export type TableHeaderRowVariants = VariantProps<
  typeof tableHeaderRowVariants
>;
export type TableBodyRowVariants = VariantProps<typeof tableBodyRowVariants>;
export type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>;
