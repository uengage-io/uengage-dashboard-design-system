import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { TablePaginationConfig } from "@/types/table";
import { TABLE_COLORS } from "./tableTokens";

export interface TablePaginationBarProps extends TablePaginationConfig {
  padX: number;
}

/**
 * First, last, and a window of three around the current page. Above
 * `jumpThreshold` pages a "Go to" box appears, because clicking through
 * sixty-four pages is not a real interaction.
 */
export function buildPageWindow(
  page: number,
  pageCount: number,
): Array<number | "ellipsis"> {
  const window: Array<number | "ellipsis"> = [];
  if (pageCount <= 0) return window;
  if (page > 2) window.push(1);
  if (page > 3) window.push("ellipsis");
  for (let p = Math.max(1, page - 1); p <= Math.min(pageCount, page + 1); p++) {
    window.push(p);
  }
  if (page < pageCount - 2) window.push("ellipsis");
  if (page < pageCount - 1) window.push(pageCount);
  return window;
}

function NavButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex items-center justify-center transition-all duration-[120ms] disabled:cursor-not-allowed"
      style={{
        width: 30,
        height: 30,
        borderRadius: 7,
        border: `1px solid ${TABLE_COLORS.border}`,
        background: TABLE_COLORS.surface,
        color: disabled ? TABLE_COLORS.fgDisabled : TABLE_COLORS.fg2,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.borderColor = TABLE_COLORS.brandSoft;
        e.currentTarget.style.color = TABLE_COLORS.brand;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = TABLE_COLORS.border;
        e.currentTarget.style.color = disabled
          ? TABLE_COLORS.fgDisabled
          : TABLE_COLORS.fg2;
      }}
    >
      {children}
    </button>
  );
}

export function TablePaginationBar({
  page,
  pageCount,
  pageSize = 25,
  pageSizes = [10, 25, 50],
  total,
  onPageChange,
  onPageSizeChange,
  label,
  itemLabel = "rows",
  jumpThreshold = 20,
  padX,
}: TablePaginationBarProps) {
  const [jump, setJump] = useState(String(page));
  useEffect(() => setJump(String(page)), [page]);

  const knownTotal = typeof pageCount === "number" && pageCount > 0;
  const go = (next: number) => {
    const clamped = knownTotal
      ? Math.min(Math.max(1, next), pageCount)
      : Math.max(1, next);
    if (clamped !== page) onPageChange?.(clamped);
  };

  const from = (page - 1) * pageSize + 1;
  const to = typeof total === "number" ? Math.min(page * pageSize, total) : page * pageSize;
  const generatedLabel =
    typeof total === "number"
      ? `Showing ${from.toLocaleString("en-IN")}–${to.toLocaleString("en-IN")} of ${total.toLocaleString("en-IN")} ${itemLabel}`
      : `Showing ${from.toLocaleString("en-IN")}–${to.toLocaleString("en-IN")}`;

  const pages = knownTotal ? buildPageWindow(page, pageCount) : [];
  const showJump = knownTotal && pageCount > jumpThreshold;

  return (
    <div
      className="flex flex-wrap items-center gap-3"
      style={{
        padding: `12px ${padX}px`,
        borderTop: `1px solid ${TABLE_COLORS.rowRule}`,
      }}
    >
      {pageSizes.length > 0 ? (
        <span className="flex items-center gap-2">
          <span
            style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: TABLE_COLORS.fg3 }}
          >
            Rows
          </span>
          <span
            className="flex gap-px"
            style={{ padding: 2, background: TABLE_COLORS.subtle, borderRadius: 7 }}
          >
            {pageSizes.map((n) => {
              const active = n === pageSize;
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onPageSizeChange?.(n)}
                  className="ue-tabular transition-all duration-[120ms]"
                  style={{
                    border: 0,
                    cursor: "pointer",
                    padding: "5px 9px",
                    borderRadius: 5,
                    fontSize: 11,
                    fontWeight: 600,
                    background: active ? TABLE_COLORS.surface : "transparent",
                    color: active ? TABLE_COLORS.brand : TABLE_COLORS.fg2,
                    boxShadow: active ? "1px 1px 3px rgba(0,0,0,.1)" : "none",
                  }}
                >
                  {n}
                </button>
              );
            })}
          </span>
        </span>
      ) : null}

      <span
        className="ue-tabular"
        style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.4, color: TABLE_COLORS.fg3 }}
      >
        {label ?? generatedLabel}
      </span>

      {showJump ? (
        <span className="flex items-center gap-[7px]">
          <span style={{ fontSize: 11, fontWeight: 500, color: TABLE_COLORS.fg3 }}>
            Go to
          </span>
          <input
            aria-label="Go to page"
            className="ue-tabular"
            value={jump}
            onChange={(e) => setJump(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = TABLE_COLORS.border;
              e.currentTarget.style.boxShadow = "none";
              const next = Number(jump);
              if (Number.isFinite(next) && next > 0) go(next);
              else setJump(String(page));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.currentTarget.blur();
            }}
            style={{
              width: 54,
              height: 28,
              padding: "0 8px",
              borderRadius: 7,
              border: `1px solid ${TABLE_COLORS.border}`,
              background: TABLE_COLORS.surface,
              color: TABLE_COLORS.fg1,
              fontSize: 12,
              fontWeight: 600,
              textAlign: "center",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = TABLE_COLORS.brandSoft;
              e.currentTarget.style.boxShadow = TABLE_COLORS.ring;
            }}
          />
        </span>
      ) : null}

      <div className="ml-auto flex items-center gap-[5px]">
        <NavButton label="First page" disabled={page <= 1} onClick={() => go(1)}>
          <ChevronsLeft size={13} strokeWidth={2.4} />
        </NavButton>
        <NavButton label="Previous page" disabled={page <= 1} onClick={() => go(page - 1)}>
          <ChevronLeft size={13} strokeWidth={2.4} />
        </NavButton>

        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span
              key={`gap-${i}`}
              aria-hidden="true"
              style={{
                minWidth: 20,
                textAlign: "center",
                fontSize: 12,
                fontWeight: 600,
                color: TABLE_COLORS.fg3,
              }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={p === page ? "page" : undefined}
              onClick={() => go(p)}
              className="ue-tabular transition-all duration-[120ms]"
              style={{
                minWidth: 30,
                height: 30,
                padding: "0 8px",
                borderRadius: 7,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: p === page ? TABLE_COLORS.brand : TABLE_COLORS.surface,
                color: p === page ? "#FFFFFF" : TABLE_COLORS.fg2,
                border: `1px solid ${p === page ? TABLE_COLORS.brand : TABLE_COLORS.border}`,
              }}
            >
              {p}
            </button>
          ),
        )}

        <NavButton
          label="Next page"
          disabled={knownTotal ? page >= pageCount : false}
          onClick={() => go(page + 1)}
        >
          <ChevronRight size={13} strokeWidth={2.4} />
        </NavButton>
        {knownTotal ? (
          <NavButton
            label="Last page"
            disabled={page >= pageCount}
            onClick={() => go(pageCount)}
          >
            <ChevronsRight size={13} strokeWidth={2.4} />
          </NavButton>
        ) : null}
      </div>
    </div>
  );
}
