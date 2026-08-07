import { cva, type VariantProps } from "class-variance-authority";
import { FOCUS_RING } from "./tokens";

export const pageButtonVariants = cva(
  `relative z-10 inline-flex items-center justify-center leading-none rounded-full transition-colors duration-150 ease-in-out outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "min-w-7 h-7 px-1.5 text-sm",
        md: "min-w-7 h-7 px-1.5 text-sm sm:min-w-10 sm:h-10 sm:px-2 sm:text-base",
        lg: "min-w-10 h-10 px-2 text-base sm:min-w-12 sm:h-12 sm:px-3 sm:text-lg",
      },
      state: {
        default:
          "bg-transparent text-[#202020] font-semibold hover:bg-[#EFF8EA] cursor-pointer",
        active: "bg-transparent text-white font-bold cursor-pointer",
        disabled: "text-gray-300 pointer-events-none cursor-default",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export const chevronButtonVariants = cva(
  `inline-flex items-center justify-center rounded-full transition-colors outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "w-7 h-7 text-sm",
        md: "w-7 h-7 text-sm sm:w-10 sm:h-10 sm:text-base",
        lg: "w-10 h-10 text-base sm:w-12 sm:h-12 sm:text-lg",
      },
      state: {
        default: "text-gray-400 hover:bg-[#EFF8EA] cursor-pointer",
        disabled: "text-gray-200 pointer-events-none cursor-default",
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
