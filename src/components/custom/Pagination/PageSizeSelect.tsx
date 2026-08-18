import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PaginationSize } from "@/types/pagination";
import { PAGINATION_COLORS, PAGINATION_SIZES } from "./paginationTokens";

export interface PageSizeSelectProps {
  value: number;
  options: number[];
  onChange: (perPage: number) => void;
  size?: PaginationSize;
  disabled?: boolean;
  /** Text before the control. Pass `null` to drop it. */
  label?: React.ReactNode;
  className?: string;
}

/**
 * A menu rather than a segmented control: four page sizes as segments would
 * out-weigh the pager beside them, and the choice is set once and forgotten.
 * Opens upward, because the footer sits at the bottom of a table.
 */
export function PageSizeSelect({
  value,
  options,
  onChange,
  size = "md",
  disabled = false,
  label = "Rows",
  className,
}: PageSizeSelectProps) {
  const spec = PAGINATION_SIZES[size];
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    // Esc closes the menu and keeps the page — it is not a cancel.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open]);

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

      <span ref={rootRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label="Rows per page"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-[7px] border bg-white outline-none transition-all duration-[120ms] hover:border-[#1F5E2C] focus-visible:border-[#1F5E2C] focus-visible:shadow-[0_0_0_3px_rgba(140,196,42,.38)] disabled:pointer-events-none disabled:opacity-55"
          style={{
            height: spec.control,
            padding: "0 10px",
            borderRadius: spec.radius,
            borderColor: PAGINATION_COLORS.border,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <span
            className="ue-tabular"
            style={{
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1,
              color: PAGINATION_COLORS.fg1,
            }}
          >
            {value}
          </span>
          <ChevronDown
            aria-hidden="true"
            size={12}
            strokeWidth={2.2}
            color={PAGINATION_COLORS.fg3}
            style={{
              transition: "transform 120ms linear",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        {open ? (
          <span
            role="listbox"
            aria-label="Rows per page"
            className="absolute left-0 z-20 flex flex-col gap-0.5"
            style={{
              bottom: "calc(100% + 5px)",
              minWidth: 78,
              padding: 4,
              background: PAGINATION_COLORS.surface,
              border: `1px solid ${PAGINATION_COLORS.border}`,
              borderRadius: 8,
              boxShadow: PAGINATION_COLORS.menuShadow,
              animation: "ue-table-pop 140ms ease-out",
            }}
          >
            {options.map((option) => {
              const selected = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={cn(
                    "ue-tabular cursor-pointer rounded-md border-0 px-[9px] py-[7px] text-left text-xs transition-colors duration-[120ms]",
                    !selected && "hover:bg-[#FAFFF7]",
                  )}
                  style={{
                    background: selected ? PAGINATION_COLORS.brand : "transparent",
                    color: selected ? "#FFFFFF" : PAGINATION_COLORS.fg1,
                    fontWeight: selected ? 600 : 500,
                  }}
                >
                  {option}
                </button>
              );
            })}
          </span>
        ) : null}
      </span>
    </span>
  );
}
