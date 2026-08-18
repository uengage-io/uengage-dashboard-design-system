import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { PaginationSize } from "@/types/pagination";
import { PAGINATION_COLORS, PAGINATION_SIZES } from "./paginationTokens";

export interface PageJumperProps {
  currentPage: number;
  totalPages: number;
  onJump: (page: number) => void;
  size?: PaginationSize;
  disabled?: boolean;
  /** Text before the box. Pass `null` to drop it. */
  label?: React.ReactNode;
  className?: string;
}

/**
 * Over ~1,000 pages a numbered window is meaningless, so the operator types
 * the page instead. Pairs with the numbered controls — it never replaces the
 * range label.
 */
export function PageJumper({
  currentPage,
  totalPages,
  onJump,
  size = "md",
  disabled = false,
  label = "Go to",
  className,
}: PageJumperProps) {
  const spec = PAGINATION_SIZES[size];
  const [draft, setDraft] = useState(String(currentPage));

  // The box mirrors the page until the operator starts typing in it.
  useEffect(() => setDraft(String(currentPage)), [currentPage]);

  const commit = () => {
    const next = Number(draft);
    if (Number.isFinite(next) && next > 0) {
      onJump(Math.min(Math.max(1, next), totalPages));
    } else {
      setDraft(String(currentPage));
    }
  };

  return (
    <span className={cn("flex items-center gap-[7px]", className)}>
      {label ? (
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1,
            color: PAGINATION_COLORS.fg3,
          }}
        >
          {label}
        </span>
      ) : null}

      <input
        aria-label={`Go to page, 1 to ${totalPages}`}
        inputMode="numeric"
        disabled={disabled}
        value={draft}
        onChange={(event) => setDraft(event.target.value.replace(/[^0-9]/g, ""))}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit();
            return;
          }
          // Arrows belong to the field here, not to the pager listening above it.
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.stopPropagation();
          }
        }}
        className="ue-tabular border bg-white text-center outline-none transition-all duration-[120ms] hover:border-[#C6C6C6] focus:border-[#1F5E2C] focus:shadow-[0_0_0_3px_rgba(140,196,42,.28)] disabled:pointer-events-none disabled:opacity-55"
        style={{
          width: 58,
          height: spec.control,
          borderRadius: spec.radius,
          borderColor: PAGINATION_COLORS.border,
          color: PAGINATION_COLORS.fg1,
          fontSize: 12,
          fontWeight: 600,
        }}
      />

      <span
        className="ue-tabular whitespace-nowrap"
        style={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: 1,
          color: PAGINATION_COLORS.fg3,
        }}
      >
        / {totalPages.toLocaleString("en-IN")}
      </span>
    </span>
  );
}
