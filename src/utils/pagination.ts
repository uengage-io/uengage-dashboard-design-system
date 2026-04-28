import { cva, type VariantProps } from "class-variance-authority";

export const pageButtonVariants = cva(
  "relative z-10 inline-flex items-center justify-center rounded-full transition-colors duration-150 ease-in-out outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006F42]",
  {
    variants: {
      size: {
        sm: "w-7 h-7 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
      },
      state: {
        default: "bg-transparent text-[#202020] font-semibold hover:bg-[#EFF8EA]",
        active: "bg-transparent text-white font-bold",
        disabled: "text-gray-300 pointer-events-none",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export const chevronButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006F42]",
  {
    variants: {
      size: {
        sm: "w-7 h-7 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
      },
      state: {
        default: "text-gray-400 hover:bg-[#EFF8EA]",
        disabled: "text-gray-200 pointer-events-none",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export type PageButtonVariants = VariantProps<typeof pageButtonVariants>;
export type ChevronButtonVariants = VariantProps<typeof chevronButtonVariants>;

export function usePagination({
  currentPage,
  totalPages,
  siblingCount = 1,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}): (number | "...")[] {
  if (totalPages <= 1) return [1];

  const siblingStart = Math.max(2, currentPage - siblingCount);
  const siblingEnd = Math.min(totalPages - 1, currentPage + siblingCount);

  const pages: (number | "...")[] = [1];

  if (siblingStart > 2) {
    pages.push("...");
  }

  for (let i = siblingStart; i <= siblingEnd; i++) {
    pages.push(i);
  }

  if (siblingEnd < totalPages - 1) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}
