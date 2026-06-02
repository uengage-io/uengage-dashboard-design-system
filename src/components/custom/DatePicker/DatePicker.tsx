import * as React from "react";
import { CalendarIcon, X } from "lucide-react";
import type { Modifiers } from "react-day-picker";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DatePickerCalendar,
  MonthPickerCalendar,
} from "../../ui/DatePickerCalendar";
import { triggerVariants } from "./datepickerVariants";
import { formatDate, formatRange, formatMonthYear } from "./dateHelpers";
import { InputLabel } from "@/components/custom/Input/InputLabel";
import { InputHelper } from "@/components/custom/Input/InputHelper";
import type { DatePickerProps, DateRange } from "./DatePicker.types";

/* ── Helpers ──────────────────────────────────────────────────────────── */

function isDateRange(v: unknown): v is DateRange {
  return (
    !!v &&
    typeof v === "object" &&
    "from" in v &&
    "to" in v &&
    ((v as DateRange).from instanceof Date ||
      (v as DateRange).to instanceof Date)
  );
}

function orderedRange(a: Date, b: Date): DateRange {
  return a <= b ? { from: a, to: b } : { from: b, to: a };
}

/* ── From/To display box ──────────────────────────────────────────────── */

function DateBox({
  label,
  active,
}: {
  label: string | null;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-9 flex-1 items-center justify-center rounded-lg border text-sm transition-colors",
        active
          ? "border-[#006F42] text-[#111827]"
          : "border-[#D1D5DB] text-[#9CA3AF]",
        !label && "text-[#C4C9D2]",
      )}
    >
      {label ?? "—"}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */

function DatePicker({
  mode = "single",
  value: controlledValue,
  onChange,
  placeholder = mode === "range" ? "Date Range" : "Select date...",
  size = "md",
  width,
  className,
  disabled = false,
  minDate,
  maxDate,
  onTouch,
  clearable = false,
  label,
  required,
  helperText,
  error,
  readOnly = false,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const touchedRef = React.useRef(false);
  const interactedRef = React.useRef(false);

  // ── Committed value (shown in trigger) ───────────────────────────────
  const [committed, setCommitted] = React.useState<Date | DateRange | null>(
    controlledValue !== undefined ? (controlledValue ?? null) : null,
  );

  React.useEffect(() => {
    if (controlledValue !== undefined) setCommitted(controlledValue ?? null);
  }, [controlledValue]);

  // ── Range draft state machine ─────────────────────────────────────────
  // pendingFrom: first click recorded, awaiting second click
  const [pendingFrom, setPendingFrom] = React.useState<Date | null>(null);
  // draftRange: completed draft (two clicks done), not yet applied
  const [draftRange, setDraftRange] = React.useState<DateRange | null>(null);
  // hoverDate: live preview while pendingFrom is set
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);

  // Reset draft when popover opens so it starts from the committed value
  const prevOpen = React.useRef(false);
  React.useEffect(() => {
    if (open && !prevOpen.current) {
      // Opening: seed draft from committed range if available
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(
        mode === "range" && isDateRange(committed) ? committed : null,
      );
    }
    if (!open && prevOpen.current) {
      // Closing: discard any mid-selection state
      setPendingFrom(null);
      setHoverDate(null);
    }
    prevOpen.current = open;
  }, [open, committed, mode]);

  // ── Disabled date matchers ────────────────────────────────────────────
  const calendarDisabled = React.useMemo(() => {
    const m: ({ before: Date } | { after: Date })[] = [];
    if (minDate) m.push({ before: minDate });
    if (maxDate) m.push({ after: maxDate });
    return m.length > 0 ? m : undefined;
  }, [minDate, maxDate]);

  // ── Trigger label (committed value only) ─────────────────────────────
  const triggerLabel = React.useMemo((): string | null => {
    if (!committed) return null;
    if (mode === "single" && committed instanceof Date)
      return formatDate(committed);
    if (mode === "month" && committed instanceof Date)
      return formatMonthYear(committed);
    if (mode === "range" && isDateRange(committed))
      return formatRange(committed.from, committed.to) ?? null;
    return null;
  }, [committed, mode]);

  // ── Effective display range (draft + hover preview) ──
  // Returns { from, to? } — to may be undefined when only the first click is done.
  const effectiveDisplayRange = React.useMemo((): {
    from: Date;
    to?: Date;
  } | null => {
    if (mode !== "range") return null;
    const existingRange =
      draftRange ?? (isDateRange(committed) ? committed : null);

    if (pendingFrom) {
      // Mid two-click selection: show from→hover (or just from if no hover yet)
      return hoverDate
        ? orderedRange(pendingFrom, hoverDate)
        : { from: pendingFrom };
    }

    return existingRange;
  }, [mode, committed, pendingFrom, draftRange, hoverDate]);

  // ── Calendar selection ────────────────────────────────────────────────
  const calendarSelected = React.useMemo(() => {
    if (mode === "single") {
      return committed instanceof Date ? committed : undefined;
    }
    return effectiveDisplayRange ?? undefined;
  }, [mode, committed, effectiveDisplayRange]);

  // ── From/To box labels ────────────────────────────────────────────────
  const fromLabel = React.useMemo((): string | null => {
    if (!effectiveDisplayRange) return null;
    return formatDate(effectiveDisplayRange.from);
  }, [effectiveDisplayRange]);

  const toLabel = React.useMemo((): string | null => {
    if (!effectiveDisplayRange?.to) return null;
    return formatDate(effectiveDisplayRange.to);
  }, [effectiveDisplayRange]);

  // ── Event handlers ────────────────────────────────────────────────────

  const handleDayClick = (date: Date, modifiers: Modifiers) => {
    if (modifiers.disabled) return;

    if (mode === "single") {
      setCommitted(date);
      onChange?.(date);
      setOpen(false);
      return;
    }

    // Range mode state machine
    if (pendingFrom === null) {
      // Always start a fresh two-click selection
      setPendingFrom(date);
      setDraftRange(null);
      setHoverDate(null);
    } else {
      // Second click: complete the draft range
      const range = orderedRange(pendingFrom, date);
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(range);
    }
  };

  const handleDayMouseEnter = (date: Date) => {
    if (pendingFrom) {
      setHoverDate(date);
      return;
    }
    // Show elongation preview when hovering outside the existing range
    const existingRange =
      draftRange ?? (isDateRange(committed) ? committed : null);
    if (
      existingRange &&
      (date < existingRange.from || date > existingRange.to)
    ) {
      setHoverDate(date);
    } else {
      setHoverDate(null);
    }
  };

  const handleDayMouseLeave = () => {
    setHoverDate(null);
  };

  const handleApply = () => {
    // If still mid-selection (only one click), treat pendingFrom as a single-day range
    const toCommit: DateRange | null = draftRange
      ? draftRange
      : pendingFrom
        ? { from: pendingFrom, to: pendingFrom }
        : null;

    if (!toCommit) return;
    setPendingFrom(null);
    setHoverDate(null);
    setDraftRange(null);
    setCommitted(toCommit);
    onChange?.(toCommit);
    setOpen(false);
  };

  const handleCancel = () => {
    setPendingFrom(null);
    setHoverDate(null);
    setDraftRange(null);
    setOpen(false);
  };

  const handleClearTrigger = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCommitted(null);
    setDraftRange(null);
    setPendingFrom(null);
    setHoverDate(null);
    onChange?.(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (disabled || readOnly) return;
    setOpen(next);
    if (next) {
      interactedRef.current = true;
    } else if (interactedRef.current && !touchedRef.current) {
      touchedRef.current = true;
      onTouch?.();
    }
  };

  const handleTriggerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (open) return;
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    if (!interactedRef.current) return;
    if (touchedRef.current) return;
    touchedRef.current = true;
    onTouch?.();
  };

  // ── Render ────────────────────────────────────────────────────────────

  const canApply = draftRange !== null || pendingFrom !== null;

  const triggerState = disabled
    ? "disabled"
    : readOnly
      ? "readonly"
      : open
        ? "open"
        : "default";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <InputLabel size={size} required={required}>
          {label}
        </InputLabel>
      )}
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            onFocus={() => {
              interactedRef.current = true;
            }}
            onBlur={handleTriggerBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!disabled && !readOnly) setOpen((o) => !o);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            className={cn(
              triggerVariants({ state: triggerState, size }),
              "gap-2 px-3 cursor-pointer select-none",
              width,
              className,
            )}
          >
            <span
              className={cn(
                "flex-1 truncate",
                triggerLabel
                  ? "text-[#111827]"
                  : cn(
                      "text-[#C4C9D2]",
                      size === "lg"
                        ? "text-[14px]"
                        : size === "md"
                          ? "text-[12px]"
                          : "text-[11px]",
                    ),
              )}
            >
              {triggerLabel ?? placeholder}
            </span>

            <div className="flex shrink-0 items-center gap-1">
              {clearable && committed && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={handleClearTrigger}
                  className="flex items-center text-gray-400 transition-colors hover:text-gray-600"
                  aria-label="Clear"
                >
                  <X size={13} strokeWidth={2} className="hover:text-red-500" />
                </button>
              )}
              <CalendarIcon
                size={15}
                strokeWidth={2}
                className="text-gray-600"
              />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="center"
          className="w-auto max-w-[calc(100vw-1rem)] p-0"
          collisionPadding={{ top: 64 }}
          style={{ zIndex: 20 }}
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            {/* ── From / To boxes (range mode only) ── */}
            {mode === "range" && (
              <div className="flex gap-2 px-3 pt-3">
                <DateBox label={fromLabel} active={!!fromLabel} />
                <DateBox label={toLabel} active={false} />
              </div>
            )}

            {/* ── Month picker calendar ── */}
            {mode === "month" && (
              <MonthPickerCalendar
                selected={committed instanceof Date ? committed : null}
                minDate={minDate}
                maxDate={maxDate}
                onSelect={(date) => {
                  setCommitted(date);
                  onChange?.(date);
                  setOpen(false);
                }}
              />
            )}

            {/* ── Day calendar (single / range) ── */}
            {mode !== "month" && (
              <DatePickerCalendar
                mode={mode}
                selected={calendarSelected}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                disabled={calendarDisabled as any}
                minDate={minDate}
                maxDate={maxDate}
                onDayClick={(date, modifiers) =>
                  handleDayClick(date, modifiers)
                }
                onDayMouseEnter={(date) => handleDayMouseEnter(date)}
                onDayMouseLeave={() => handleDayMouseLeave()}
              />
            )}

            {/* ── Cancel / Apply footer (range mode only) ── */}
            {mode === "range" && (
              <div className="flex items-center justify-end gap-2 border-t border-[#F3F4F6] px-3 py-2.5">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-full bg-[#F1F3F4] px-5 py-1.5 text-sm font-medium text-[#374151] transition-colors hover:bg-[#E8EAED]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={!canApply}
                  className={cn(
                    "rounded-full border px-5 py-1.5 text-sm font-medium transition-colors",
                    canApply
                      ? "border-[#006F42] text-[#006F42]"
                      : "border-gray-300 text-gray-400 cursor-not-allowed",
                  )}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <InputHelper size={size} helperText={helperText} error={error} />
    </div>
  );
}

DatePicker.displayName = "DatePicker";
export { DatePicker };
