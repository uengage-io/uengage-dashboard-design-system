import { cva, type VariantProps } from "class-variance-authority";

export const tableWrapperVariants = cva("w-full bg-white", {
  variants: {
    bordered: {
      true: "border border-[#E2E2E2] rounded-xl shadow-[2px_2px_4px_rgba(0,0,0,.04)]",
      false: "",
    },
  },
  defaultVariants: {
    bordered: false,
  },
});

/** 11px uppercase on a #F3F5F9 fill — the header never competes with the data. */
export const tableHeaderRowVariants = cva(
  "bg-[#F3F5F9] text-[#595959] text-[11px] font-semibold uppercase tracking-[0.05em]",
  {
    variants: {
      size: {
        sm: "h-[34px]",
        md: "h-[38px]",
        lg: "h-[42px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const tableBodyRowVariants = cva("transition-colors duration-[120ms]", {
  variants: {
    size: {
      sm: "text-[12px]",
      md: "text-[13px]",
      lg: "text-[13px]",
    },
    clickable: {
      true: "cursor-pointer",
      false: "",
    },
    hover: {
      // A full-row wash, so the eye never loses its line.
      true: "hover:bg-[#FAFFF7]",
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
