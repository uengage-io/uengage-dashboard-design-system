import { cva, type VariantProps } from "class-variance-authority";

const FOCUS = "focus-visible:shadow-[0_0_0_3px_rgba(140,196,42,.38)]";

/**
 * A page control: an outlined box that fills solid `#003C1B` when it is the
 * page you are on — the only filled control on the row.
 */
export const pageButtonVariants = cva(
  `relative z-10 inline-flex items-center justify-center border leading-none font-semibold outline-none transition-all duration-[120ms] focus-visible:z-20 ${FOCUS}`,
  {
    variants: {
      size: {
        sm: "min-w-7 h-7 px-[7px] text-[11px] rounded-[7px]",
        md: "min-w-8 h-8 px-[9px] text-[12px] rounded-lg",
        lg: "min-w-[38px] h-[38px] px-[11px] text-[13px] rounded-lg",
      },
      state: {
        default:
          "cursor-pointer border-[#E2E2E2] bg-white text-[#595959] hover:border-[#1F5E2C] hover:bg-[#F5FFF0] hover:text-[#003C1B] focus-visible:border-[#1F5E2C] focus-visible:text-[#003C1B]",
        active: "cursor-pointer border-[#003C1B] bg-[#003C1B] text-white",
        disabled:
          "pointer-events-none cursor-default border-[#E2E2E2] bg-[#F3F5F9] text-[#C6C6C6]",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

export const chevronButtonVariants = cva(
  `inline-flex items-center justify-center border bg-white outline-none transition-all duration-[120ms] focus-visible:z-20 ${FOCUS}`,
  {
    variants: {
      size: {
        sm: "w-7 h-7 rounded-[7px]",
        md: "w-8 h-8 rounded-lg",
        lg: "w-[38px] h-[38px] rounded-lg",
      },
      state: {
        default:
          "cursor-pointer border-[#E2E2E2] text-[#1F5E2C] hover:border-[#1F5E2C] hover:bg-[#F5FFF0] focus-visible:border-[#1F5E2C]",
        disabled:
          "pointer-events-none cursor-not-allowed border-[#E2E2E2] text-[#C6C6C6] opacity-55",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

/** Prev / Next and Newer / Older — a label beside the arrow, never bare. */
export const paginationLabelButtonVariants = cva(
  `inline-flex items-center gap-[7px] border font-semibold leading-none outline-none transition-all duration-[120ms] ${FOCUS}`,
  {
    variants: {
      size: {
        sm: "h-7 px-[9px] text-[11px] rounded-[7px]",
        md: "h-8 px-[11px] text-[12px] rounded-lg",
        lg: "h-[38px] px-[13px] text-[13px] rounded-lg",
      },
      state: {
        default:
          "cursor-pointer border-[#E2E2E2] bg-white text-[#1F5E2C] hover:border-[#1F5E2C] hover:bg-[#F5FFF0] hover:text-[#003C1B]",
        primary:
          "cursor-pointer border-[#003C1B] bg-[#003C1B] text-white hover:bg-[#00331A]",
        disabled:
          "pointer-events-none cursor-not-allowed border-[#E2E2E2] bg-white text-[#C6C6C6] opacity-55",
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
export type PaginationLabelButtonVariants = VariantProps<
  typeof paginationLabelButtonVariants
>;

/**
 * The page window: `boundaryCount` pages pinned at each end, `siblingCount`
 * either side of the current page, ellipses for the rest.
 *
 * The width never changes as you page — that is the point, so the control does
 * not jump under the cursor.
 */
export function usePagination({
  currentPage,
  totalPages,
  siblingCount = 1,
  boundaryCount = 1,
}: {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  boundaryCount?: number;
}): (number | "...")[] {
  if (totalPages <= 1) return [1];

  // Below this many pages the window would hold every page anyway, and an
  // ellipsis would stand in for a single number — so just list them all.
  const maxWithoutGaps = boundaryCount * 2 + siblingCount * 2 + 3;
  if (totalPages <= maxWithoutGaps) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const head = Array.from({ length: boundaryCount }, (_, i) => i + 1);
  const tail = Array.from(
    { length: boundaryCount },
    (_, i) => totalPages - boundaryCount + 1 + i,
  );

  // Clamped so the run of siblings keeps a constant length at both ends.
  const siblingStart = Math.max(
    boundaryCount + 1,
    Math.min(
      currentPage - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1,
    ),
  );
  const siblingEnd = Math.min(
    totalPages - boundaryCount,
    Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
  );

  const pages: (number | "...")[] = [...head];

  if (siblingStart > boundaryCount + 1) pages.push("...");
  for (let i = siblingStart; i <= siblingEnd; i++) pages.push(i);
  if (siblingEnd < totalPages - boundaryCount) pages.push("...");

  pages.push(...tail);

  return pages;
}
