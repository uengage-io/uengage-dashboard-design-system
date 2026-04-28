import * as React from "react";
import { useRef, useState, useLayoutEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Pagination as P,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
  pageButtonVariants,
  chevronButtonVariants,
  usePagination,
} from "@/utils/pagination";
import type { CustomPaginationProps } from "@/types/pagination";

const ellipsisSizeClass: Record<"sm" | "md" | "lg", string> = {
  sm: "w-7 h-7 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
};

type PillState = { x: number; y: number; w: number; h: number; animated: boolean };

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  size = "md",
  disabled = false,
  className,
}: CustomPaginationProps) {
  const pages = usePagination({ currentPage, totalPages, siblingCount });
  const isPrevDisabled = disabled || currentPage === 1;
  const isNextDisabled = disabled || currentPage === totalPages;

  const containerRef = useRef<HTMLUListElement>(null);
  const buttonRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());
  const [pill, setPill] = useState<PillState | null>(null);
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    const btn = buttonRefs.current.get(currentPage);
    const container = containerRef.current;
    if (!btn || !container) return;

    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const animated = !firstRender.current;
    firstRender.current = false;

    setPill({
      x: bRect.left - cRect.left,
      y: bRect.top - cRect.top,
      w: bRect.width,
      h: bRect.height,
      animated,
    });
  }, [currentPage, totalPages, siblingCount]);

  return (
    <P className={cn("mx-auto flex w-full justify-center", className)}>
      <PaginationContent
        ref={containerRef as React.Ref<HTMLUListElement>}
        className="relative flex flex-row items-center gap-1"
      >
        {/* Sliding pill — GPU-accelerated via transform */}
        {pill && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate(${pill.x}px, ${pill.y}px)`,
              width: pill.w,
              height: pill.h,
              background: "#003C1B",
              borderRadius: "9999px",
              transition: pill.animated
                ? "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1), height 300ms cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
        )}

        {showFirstLast && (
          <PaginationItem>
            <button
              type="button"
              aria-label="Go to first page"
              onClick={() => onPageChange(1)}
              className={chevronButtonVariants({
                size,
                state: isPrevDisabled ? "disabled" : "default",
              })}
              disabled={isPrevDisabled}
            >
              <ChevronsLeft className="size-4" />
            </button>
          </PaginationItem>
        )}

        <PaginationItem>
          <button
            type="button"
            aria-label="Go to previous page"
            onClick={() => onPageChange(currentPage - 1)}
            className={chevronButtonVariants({
              size,
              state: isPrevDisabled ? "disabled" : "default",
            })}
            disabled={isPrevDisabled}
          >
            <ChevronLeft className="size-4" />
          </button>
        </PaginationItem>

        {pages.map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <span
                aria-hidden
                className={cn(
                  "inline-flex items-center justify-center text-gray-400 select-none",
                  ellipsisSizeClass[size ?? "md"],
                )}
              >
                ...
              </span>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <button
                ref={(el) => {
                  if (el) buttonRefs.current.set(page, el);
                  else buttonRefs.current.delete(page);
                }}
                type="button"
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => onPageChange(page)}
                className={pageButtonVariants({
                  size,
                  state: disabled
                    ? "disabled"
                    : page === currentPage
                      ? "active"
                      : "default",
                })}
                disabled={disabled}
              >
                {page}
              </button>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <button
            type="button"
            aria-label="Go to next page"
            onClick={() => onPageChange(currentPage + 1)}
            className={chevronButtonVariants({
              size,
              state: isNextDisabled ? "disabled" : "default",
            })}
            disabled={isNextDisabled}
          >
            <ChevronRight className="size-4" />
          </button>
        </PaginationItem>

        {showFirstLast && (
          <PaginationItem>
            <button
              type="button"
              aria-label="Go to last page"
              onClick={() => onPageChange(totalPages)}
              className={chevronButtonVariants({
                size,
                state: isNextDisabled ? "disabled" : "default",
              })}
              disabled={isNextDisabled}
            >
              <ChevronsRight className="size-4" />
            </button>
          </PaginationItem>
        )}
      </PaginationContent>
    </P>
  );
}
