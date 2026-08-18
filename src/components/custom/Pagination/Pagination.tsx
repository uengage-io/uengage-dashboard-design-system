import * as React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import {
  ArrowDown,
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
import type { CustomPaginationProps, PaginationAlign } from "@/types/pagination";
import {
  chevronButtonVariants,
  pageButtonVariants,
  paginationLabelButtonVariants,
  usePagination,
} from "@/utils/pagination";
import { PageJumper } from "./PageJumper";
import { PageSizeSelect } from "./PageSizeSelect";
import {
  formatPaginationRange,
  PAGINATION_COLORS,
  PAGINATION_SIZES,
} from "./paginationTokens";

type PillState = { x: number; y: number; w: number; h: number; animated: boolean };

const alignClass: Record<Exclude<PaginationAlign, "auto">, string> = {
  center: "justify-center",
  between: "justify-between",
  start: "justify-start",
  end: "justify-end",
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  size = "md",
  disabled = false,
  className,
  variant = "numbered",
  boundaryCount = 1,
  total,
  perPage,
  itemLabel = "items",
  rangeLabel,
  showRange,
  perPageOptions,
  onPerPageChange,
  anchorOnPerPageChange = true,
  showJumper,
  hideOnSinglePage = false,
  loading = false,
  align = "auto",
  attached = false,
  keyboardNavigation = true,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  onLoadMore,
  loadedCount,
  loadMoreLabel,
}: CustomPaginationProps) {
  const spec = PAGINATION_SIZES[size];
  const pages = usePagination({
    currentPage,
    totalPages,
    siblingCount,
    boundaryCount,
  });

  const isPrevDisabled = disabled || loading || currentPage <= 1;
  const isNextDisabled = disabled || loading || currentPage >= totalPages;

  /* ── Sliding pill ─────────────────────────────────────────────────────── */

  const containerRef = useRef<HTMLUListElement>(null);
  const buttonRefs = useRef<Map<number, HTMLButtonElement | null>>(new Map());
  const [pill, setPill] = useState<PillState | null>(null);
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measurePill = (animated: boolean) => {
      const btn = buttonRefs.current.get(currentPage);
      if (!btn) {
        setPill(null);
        return;
      }
      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      setPill({
        x: bRect.left - cRect.left,
        y: bRect.top - cRect.top,
        w: bRect.width,
        h: bRect.height,
        animated,
      });
    };

    const shouldAnimate = !firstRender.current;
    firstRender.current = false;
    measurePill(shouldAnimate);

    const observer = new ResizeObserver(() => measurePill(false));
    observer.observe(container);
    return () => observer.disconnect();
  }, [currentPage, totalPages, siblingCount, boundaryCount, size, variant]);

  /* ── Derived state ────────────────────────────────────────────────────── */

  const goTo = (page: number) => {
    if (disabled || loading) return;
    const next = Math.min(Math.max(1, page), Math.max(1, totalPages));
    if (next !== currentPage) onPageChange(next);
  };

  const goPrev = () => (onPrev ? onPrev() : goTo(currentPage - 1));
  const goNext = () => (onNext ? onNext() : goTo(currentPage + 1));

  const sizeOptions = perPageOptions ?? [];
  const perPageOn =
    sizeOptions.length > 0 && typeof perPage === "number" && Boolean(onPerPageChange);
  const jumperOn = (showJumper ?? variant === "jumper") && totalPages > 1;

  const resolvedRange =
    rangeLabel ??
    (variant === "compact" && typeof total !== "number"
      ? `Page ${currentPage.toLocaleString("en-IN")} of ${totalPages.toLocaleString("en-IN")}`
      : typeof perPage === "number"
        ? formatPaginationRange({ currentPage, perPage, total, itemLabel })
        : null);
  const rangeOn = showRange ?? resolvedRange !== null;

  /**
   * Changing the page size keeps the first visible row on screen instead of
   * snapping to page 1 — the operator was looking at something.
   */
  const changePerPage = (next: number) => {
    if (!onPerPageChange) return;
    onPerPageChange(next);
    if (anchorOnPerPageChange && typeof perPage === "number") {
      const anchor = (currentPage - 1) * perPage;
      onPageChange(Math.floor(anchor / next) + 1);
    } else if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  if (
    hideOnSinglePage &&
    totalPages <= 1 &&
    variant !== "cursor" &&
    variant !== "loadMore"
  ) {
    return null;
  }

  /* ── Keyboard ─────────────────────────────────────────────────────────── */

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!keyboardNavigation || disabled || loading) return;
    // Typing in the jump box owns its own arrows.
    if ((event.target as HTMLElement | null)?.closest("input, textarea, select")) {
      return;
    }
    const jump = event.metaKey || event.ctrlKey;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        // ⌘+← lands on page 1 in one hop, rather than a fetch per step.
        jump ? goTo(1) : goPrev();
        break;
      case "ArrowRight":
        event.preventDefault();
        jump ? goTo(totalPages) : goNext();
        break;
      case "Home":
        event.preventDefault();
        goTo(1);
        break;
      case "End":
        event.preventDefault();
        goTo(totalPages);
        break;
      default:
        break;
    }
  };

  /* ── Pieces ───────────────────────────────────────────────────────────── */

  const rangeNode = rangeOn ? (
    <span
      className="ue-tabular"
      // Announced after every jump, so a screen reader hears the new range.
      role="status"
      aria-live="polite"
      style={{
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.4,
        color: PAGINATION_COLORS.fg3,
      }}
    >
      {resolvedRange}
    </span>
  ) : null;

  const leadingNodes = (
    <>
      {rangeNode}
      {perPageOn ? (
        <PageSizeSelect
          value={perPage as number}
          options={sizeOptions}
          onChange={changePerPage}
          size={size}
          disabled={disabled || loading}
        />
      ) : null}
      {jumperOn ? (
        <PageJumper
          currentPage={currentPage}
          totalPages={totalPages}
          onJump={goTo}
          size={size}
          disabled={disabled || loading}
        />
      ) : null}
    </>
  );

  const hasLeading = Boolean(rangeNode) || perPageOn || jumperOn;
  const resolvedAlign: Exclude<PaginationAlign, "auto"> =
    align === "auto" ? (hasLeading ? "between" : "center") : align;

  const spinner = (
    <span
      aria-hidden="true"
      className="animate-spin"
      style={{
        width: spec.icon,
        height: spec.icon,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,.35)",
        borderTopColor: "#FFFFFF",
      }}
    />
  );

  /** Prev / Next with a word beside the arrow — an arrow alone is a mystery button. */
  const labelButton = (
    direction: "prev" | "next",
    label: React.ReactNode,
    isDisabled: boolean,
    tone: "default" | "primary",
    onClick: () => void,
  ) => (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={direction === "prev" ? "Go to previous page" : "Go to next page"}
      className={paginationLabelButtonVariants({
        size,
        state: isDisabled ? "disabled" : tone,
      })}
    >
      {direction === "prev" ? (
        <ChevronLeft size={spec.icon} strokeWidth={2.4} aria-hidden="true" />
      ) : null}
      {label}
      {direction === "next" ? (
        <ChevronRight size={spec.icon} strokeWidth={2.4} aria-hidden="true" />
      ) : null}
    </button>
  );

  /* ── Load more ────────────────────────────────────────────────────────── */

  if (variant === "loadMore") {
    const exhausted =
      typeof total === "number" &&
      typeof loadedCount === "number" &&
      loadedCount >= total;

    return (
      <nav
        aria-label="Pagination"
        className={cn(
          "flex w-full flex-col items-center gap-[9px]",
          attached ? "border-t" : "",
          className,
        )}
        style={{
          padding: `${spec.rowPadY}px ${spec.rowPadX}px`,
          borderTopColor: attached ? PAGINATION_COLORS.rule : undefined,
        }}
      >
        <span
          aria-hidden="true"
          className="h-px w-full"
          style={{ background: PAGINATION_COLORS.rule }}
        />
        <button
          type="button"
          onClick={onLoadMore}
          disabled={disabled || loading || exhausted || !onLoadMore}
          className={cn(
            "inline-flex items-center gap-2 border bg-white font-semibold leading-none outline-none transition-all duration-[120ms]",
            "hover:bg-[#F5FFF0] focus-visible:shadow-[0_0_0_3px_rgba(140,196,42,.38)]",
            "disabled:pointer-events-none disabled:opacity-55",
          )}
          style={{
            height: spec.control + 4,
            padding: "0 14px",
            borderRadius: spec.radius,
            borderColor: PAGINATION_COLORS.loadMoreBorder,
            color: PAGINATION_COLORS.brand,
            fontSize: spec.fontSize,
            cursor: "pointer",
          }}
        >
          {loading ? (
            <span
              aria-hidden="true"
              className="animate-spin"
              style={{
                width: spec.icon,
                height: spec.icon,
                borderRadius: "50%",
                border: `2px solid rgba(0,60,27,.25)`,
                borderTopColor: PAGINATION_COLORS.brandSoft,
              }}
            />
          ) : (
            <ArrowDown size={spec.icon} strokeWidth={2.4} aria-hidden="true" />
          )}
          {loadMoreLabel ??
            (exhausted
              ? "All loaded"
              : `Load ${(perPage ?? 25).toLocaleString("en-IN")} more`)}
        </button>
        {/* Always print how many of how many are loaded. */}
        {typeof loadedCount === "number" ? (
          <span
            className="ue-tabular"
            role="status"
            aria-live="polite"
            style={{
              fontSize: 11,
              fontWeight: 500,
              lineHeight: 1.4,
              color: PAGINATION_COLORS.fg3,
            }}
          >
            {loadedCount.toLocaleString("en-IN")}
            {typeof total === "number" ? ` of ${total.toLocaleString("en-IN")}` : ""} loaded
          </span>
        ) : null}
      </nav>
    );
  }

  /* ── Cursor & compact ─────────────────────────────────────────────────── */

  if (variant === "cursor" || variant === "compact") {
    const cursor = variant === "cursor";
    const prevOff = cursor
      ? disabled || loading || hasPrev === false
      : isPrevDisabled;
    const nextOff = cursor
      ? disabled || loading || hasNext === false
      : isNextDisabled;

    return (
      <nav
        aria-label="Pagination"
        onKeyDown={handleKeyDown}
        className={cn(
          "flex w-full flex-wrap items-center gap-[14px]",
          alignClass[resolvedAlign],
          attached ? "border-t" : "",
          className,
        )}
        style={{
          padding: `${spec.rowPadY}px ${spec.rowPadX}px`,
          borderTopColor: attached ? PAGINATION_COLORS.rule : undefined,
        }}
      >
        {leadingNodes}
        <span
          className="flex items-center"
          style={{ gap: spec.gap, marginLeft: hasLeading ? "auto" : undefined }}
        >
          {labelButton(
            "prev",
            prevLabel ?? (cursor ? "Newer" : "Prev"),
            prevOff,
            "default",
            goPrev,
          )}
          {labelButton(
            "next",
            nextLabel ?? (cursor ? "Older" : "Next"),
            nextOff,
            cursor ? "primary" : "default",
            goNext,
          )}
        </span>
      </nav>
    );
  }

  /* ── Numbered & jumper ────────────────────────────────────────────────── */

  return (
    <P
      aria-label="Pagination"
      onKeyDown={handleKeyDown}
      className={cn(
        "flex w-full flex-wrap items-center gap-[14px]",
        alignClass[resolvedAlign],
        // The bare control keeps its original centred layout.
        !hasLeading && !attached && "mx-auto",
        attached ? "border-t" : "",
        className,
      )}
      style={{
        padding: hasLeading || attached ? `${spec.rowPadY}px ${spec.rowPadX}px` : undefined,
        borderTopColor: attached ? PAGINATION_COLORS.rule : undefined,
      }}
    >
      {leadingNodes}

      <PaginationContent
        ref={containerRef as React.Ref<HTMLUListElement>}
        className="relative flex flex-row flex-wrap items-center justify-center"
        style={{
          gap: spec.gap,
          marginLeft: hasLeading ? "auto" : undefined,
        }}
      >
        {/* Sliding pill — GPU-accelerated via transform. It *is* the fill of the
            current page, so the active button itself stays transparent. */}
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
              background: PAGINATION_COLORS.brand,
              borderRadius: spec.radius,
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
              onClick={() => goTo(1)}
              className={chevronButtonVariants({
                size,
                state: isPrevDisabled ? "disabled" : "default",
              })}
              disabled={isPrevDisabled}
            >
              <ChevronsLeft size={spec.icon} strokeWidth={2.4} />
            </button>
          </PaginationItem>
        )}

        <PaginationItem>
          <button
            type="button"
            aria-label="Go to previous page"
            onClick={goPrev}
            className={chevronButtonVariants({
              size,
              state: isPrevDisabled ? "disabled" : "default",
            })}
            disabled={isPrevDisabled}
          >
            <ChevronLeft size={spec.icon} strokeWidth={2.4} />
          </button>
        </PaginationItem>

        {pages.map((page, index) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${index}`}>
              {/* Never clickable — the first and last page always are. */}
              <span
                aria-hidden
                className="ue-tabular inline-flex select-none items-end justify-center"
                style={{
                  minWidth: spec.control,
                  height: spec.control,
                  fontSize: spec.fontSize,
                  fontWeight: 600,
                  lineHeight: 1.6,
                  color: PAGINATION_COLORS.fg3,
                }}
              >
                …
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
                onClick={() => goTo(page)}
                className={cn(
                  "ue-tabular",
                  pageButtonVariants({
                    size,
                    state: disabled
                      ? "disabled"
                      : page === currentPage
                        ? "active"
                        : "default",
                  }),
                )}
                style={
                  // While the pill is mounted it paints the fill, so the button
                  // underneath must not paint a second one.
                  page === currentPage && pill
                    ? { background: "transparent", borderColor: "transparent" }
                    : undefined
                }
                disabled={disabled || loading}
              >
                {page === currentPage && loading ? spinner : page}
              </button>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <button
            type="button"
            aria-label="Go to next page"
            onClick={goNext}
            className={chevronButtonVariants({
              size,
              state: isNextDisabled ? "disabled" : "default",
            })}
            disabled={isNextDisabled}
          >
            <ChevronRight size={spec.icon} strokeWidth={2.4} />
          </button>
        </PaginationItem>

        {showFirstLast && (
          <PaginationItem>
            <button
              type="button"
              aria-label="Go to last page"
              onClick={() => goTo(totalPages)}
              className={chevronButtonVariants({
                size,
                state: isNextDisabled ? "disabled" : "default",
              })}
              disabled={isNextDisabled}
            >
              <ChevronsRight size={spec.icon} strokeWidth={2.4} />
            </button>
          </PaginationItem>
        )}
      </PaginationContent>
    </P>
  );
}
