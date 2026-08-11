import * as React from "react";
import { CalendarIcon, Check, CircleAlert, Lock, X } from "lucide-react";
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
import {
  DATEPICKER_COLORS,
  DATEPICKER_GAP,
  DATEPICKER_SIZES,
  DATEPICKER_TRANSITION,
  PANEL,
  getTriggerStyle,
  triggerVariants,
  type DatePickerVisualState,
} from "./datepickerVariants";
import { formatDate, formatDateTime, formatRange, formatMonthYear } from "./dateHelpers";
import { TimePicker, type TimeValue } from "./TimePicker";
import { InputLabel } from "@/components/custom/Input/InputLabel";
import { InputHelper } from "@/components/custom/Input/InputHelper";
import { getLabelColor } from "@/components/custom/Input/inputVariants";
import type { DatePickerProps, DateRange } from "./DatePicker.types";
import {
  FilterGroupMobileContext,
  FilterGroupDrawerCalendarContext,
} from "@/lib/filterGroupContext";

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

/* ── Trigger adornments ───────────────────────────────────────────────── */

function Spinner({ size }: { size: number }) {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 animate-spin rounded-full"
      style={{
        width: size,
        height: size,
        border: `2px solid ${DATEPICKER_COLORS.border}`,
        borderTopColor: DATEPICKER_COLORS.borderFocus,
      }}
    />
  );
}

/** Shimmer bar shown in place of the value while options are being fetched. */
function LoadingBar() {
  return (
    <span
      aria-hidden="true"
      className="h-[11px] flex-1 animate-pulse rounded-md"
      style={{ background: DATEPICKER_COLORS.subtle }}
    />
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
  open: controlledOpen,
  onOpenChange: onOpenChangeProp,
  showTime = false,
  status,
  statusMessage,
  loading = false,
}: DatePickerProps) {
  const isSingleWithTime = mode === "single" && showTime;
  const spec = DATEPICKER_SIZES[size];
  const [hovered, setHovered] = React.useState(false);
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChangeProp?.(next);
    },
    [controlledOpen, onOpenChangeProp],
  );
  const touchedRef = React.useRef(false);
  const interactedRef = React.useRef(false);

  // ── FilterGroup drawer integration ────────────────────────────────────
  // When this DatePicker has a controlled `open` prop and is rendered inside
  // FilterGroup's mobile drawer, we register ourselves with FilterGroup so it
  // can render the calendar inline (avoiding Radix Dialog modal-dismiss issues
  // where portal clicks outside the dialog DOM close the drawer).
  const isMobileDrawer = React.useContext(FilterGroupMobileContext);
  const registerDrawerCalendar = React.useContext(FilterGroupDrawerCalendarContext);
  const isControlled = controlledOpen !== undefined;

  React.useEffect(() => {
    if (!isMobileDrawer || !isControlled || !registerDrawerCalendar) return;
    if (open) {
      registerDrawerCalendar({ mode, value: committed, onChange: onChange as ((v: unknown) => void) | undefined, onOpenChange: setOpen, minDate, maxDate });
    } else {
      registerDrawerCalendar(null);
    }
    return () => { registerDrawerCalendar(null); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isMobileDrawer, isControlled]);

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


  // ── Single + time draft state ─────────────────────────────────────────
  // draftSingleDate: day picked but not yet applied (single + showTime mode)
  const [draftSingleDate, setDraftSingleDate] = React.useState<Date | null>(
    null,
  );
  const [draftTime, setDraftTime] = React.useState<TimeValue>({
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

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
      if (isSingleWithTime) {
        const base = committed instanceof Date ? committed : null;
        setDraftSingleDate(base);
        setDraftTime({
          hours: base ? base.getHours() : new Date().getHours(),
          minutes: base ? base.getMinutes() : new Date().getMinutes(),
        });
      }
    }
    if (!open && prevOpen.current) {
      // Closing without Apply discards the draft — the trigger keeps the last
      // committed value. This is what the old Cancel button did.
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(null);
      setDraftSingleDate(null);
    }
    prevOpen.current = open;
  }, [open, committed, mode, isSingleWithTime]);

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
      return isSingleWithTime
        ? formatDateTime(committed)
        : formatDate(committed);
    if (mode === "month" && committed instanceof Date)
      return formatMonthYear(committed);
    if (mode === "range" && isDateRange(committed))
      return formatRange(committed.from, committed.to) ?? null;
    return null;
  }, [committed, mode, isSingleWithTime]);

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
      if (isSingleWithTime) {
        return (
          draftSingleDate ?? (committed instanceof Date ? committed : undefined)
        );
      }
      return committed instanceof Date ? committed : undefined;
    }
    return effectiveDisplayRange ?? undefined;
  }, [mode, committed, effectiveDisplayRange, isSingleWithTime, draftSingleDate]);

  // ── Footer hint ───────────────────────────────────────────────────────
  // The design replaces the old From/To boxes with a single hint that counts
  // the selection, so the panel never repeats what the trigger already says.
  const footerHint = React.useMemo((): string => {
    if (isSingleWithTime) {
      return draftSingleDate ? (formatDate(draftSingleDate) ?? "") : "No date";
    }
    const range = effectiveDisplayRange;
    if (!range) return "No range";
    if (!range.to) return "Pick an end date";
    const startOfDay = (d: Date) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const days =
      Math.round((startOfDay(range.to) - startOfDay(range.from)) / 86400000) + 1;
    return `${days} ${days === 1 ? "day" : "days"}`;
  }, [effectiveDisplayRange, isSingleWithTime, draftSingleDate]);

  // ── Event handlers ────────────────────────────────────────────────────

  const handleDayClick = (date: Date, modifiers: Modifiers) => {
    if (modifiers.disabled) return;

    if (mode === "single") {
      if (isSingleWithTime) {
        setDraftSingleDate(date);
        return;
      }
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

  /**
   * Footer Clear — drops the in-panel draft and leaves the panel open so the
   * operator can pick again. Closing without applying discards the draft too
   * (see the open/close effect above), which is what Cancel used to do.
   */
  const handleClearDraftRange = () => {
    setPendingFrom(null);
    setHoverDate(null);
    setDraftRange(null);
  };

  const handleApplySingleTime = () => {
    if (!draftSingleDate) return;
    const combined = new Date(draftSingleDate);
    combined.setHours(draftTime.hours, draftTime.minutes, 0, 0);
    setDraftSingleDate(null);
    setCommitted(combined);
    onChange?.(combined);
    setOpen(false);
  };

  const handleClearDraftTime = () => {
    setDraftSingleDate(null);
  };

  const handleClearTrigger = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCommitted(null);
    setDraftRange(null);
    setPendingFrom(null);
    setHoverDate(null);
    setDraftSingleDate(null);
    onChange?.(null);
  };

  const handleOpenChange = (next: boolean) => {
    if (disabled || readOnly || loading) return;
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

  // ── Visual state ──────────────────────────────────────────────────────
  // Ordering mirrors Input and Select: disabled and readOnly outrank
  // validation, and an error outranks a status.
  const state: DatePickerVisualState = disabled
    ? "disabled"
    : loading
      ? "loading"
      : readOnly
        ? "readonly"
        : error
          ? "error"
          : open
            ? "open"
            : status === "success"
              ? "success"
              : status === "warning"
                ? "warning"
                : hovered
                  ? "hover"
                  : "default";

  const box = getTriggerStyle(state);

  /** The pre-refresh four-state key, kept for `triggerVariants`. */
  const triggerState = disabled
    ? "disabled"
    : readOnly
      ? "readonly"
      : open
        ? "open"
        : "default";

  const glyphColor =
    state === "error"
      ? DATEPICKER_COLORS.errorInk
      : state === "warning"
        ? DATEPICKER_COLORS.warningInk
        : state === "disabled" || state === "loading"
          ? DATEPICKER_COLORS.disabledInk
          : DATEPICKER_COLORS.icon;

  /** Trigger box + value, shared by the drawer branch and the popover branch. */
  const triggerBoxStyle: React.CSSProperties = {
    minHeight: spec.height,
    paddingLeft: spec.padLeft,
    paddingRight: spec.padRight,
    gap: DATEPICKER_GAP,
    borderRadius: spec.radius,
    fontSize: spec.font,
    background: box.background,
    border: box.border,
    boxShadow: box.boxShadow,
    color: box.color,
    cursor: box.cursor ?? "pointer",
    transition: DATEPICKER_TRANSITION,
  };

  const valueNode = (
    <span
      className="ue-tabular min-w-0 flex-1 truncate"
      style={{
        fontVariantNumeric: "tabular-nums",
        fontWeight: 500,
        color: triggerLabel ? box.color : DATEPICKER_COLORS.placeholder,
      }}
    >
      {triggerLabel ?? placeholder}
    </span>
  );

  /** Trailing adornments — clear chip, then the state glyph. */
  const adornments = (
    <div className="flex shrink-0 items-center" style={{ gap: 6 }}>
      {clearable && committed && !readOnly && !disabled && !loading && (
        <button
          type="button"
          tabIndex={-1}
          onClick={handleClearTrigger}
          aria-label="Clear"
          className="flex shrink-0 items-center justify-center rounded-full transition-colors"
          style={{
            width: 18,
            height: 18,
            background: DATEPICKER_COLORS.subtle,
            color: DATEPICKER_COLORS.message,
          }}
        >
          <X size={9} strokeWidth={3.2} />
        </button>
      )}
      {loading && <Spinner size={14} />}
      {state === "readonly" && (
        <Lock size={14} strokeWidth={2} color={DATEPICKER_COLORS.placeholder} />
      )}
      {state === "error" && (
        <CircleAlert size={15} strokeWidth={2.2} color={DATEPICKER_COLORS.errorInk} />
      )}
      {state === "warning" && (
        <CircleAlert size={15} strokeWidth={2.2} color={DATEPICKER_COLORS.warningInk} />
      )}
      {state === "success" && (
        <Check size={15} strokeWidth={2.6} color={DATEPICKER_COLORS.successInk} />
      )}
    </div>
  );

  // In FilterGroup's mobile drawer with a controlled `open` prop, render only the
  // (already user-hidden) trigger — no Popover portal. FilterGroup shows the calendar
  // inline via the registered DrawerCalendarProps (see effect above).
  if (isMobileDrawer && isControlled && registerDrawerCalendar) {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <InputLabel
            size={size}
            required={required}
            tone={
              state === "error" || state === "disabled"
                ? getLabelColor(state)
                : undefined
            }
          >
            {label}
          </InputLabel>
        )}
        <div
          className={cn(
            triggerVariants({ state: triggerState, size }),
            width,
            className,
          )}
          style={triggerBoxStyle}
        >
          <CalendarIcon size={spec.icon} strokeWidth={2} color={glyphColor} />
          {loading ? <LoadingBar /> : valueNode}
          {adornments}
        </div>
        <InputHelper
          size={size}
          state={state === "open" ? "focused" : state}
          helperText={error ?? (status && statusMessage) ?? helperText}
          error={error}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <InputLabel
          size={size}
          required={required}
          tone={
            state === "error" || state === "disabled"
              ? getLabelColor(state)
              : undefined
          }
        >
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
            aria-busy={loading || undefined}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocus={() => {
              interactedRef.current = true;
            }}
            onBlur={handleTriggerBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!disabled && !readOnly && !loading) setOpen(!open);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            className={cn(
              triggerVariants({ state: triggerState, size }),
              width,
              className,
            )}
            style={triggerBoxStyle}
          >
            <CalendarIcon size={spec.icon} strokeWidth={2} color={glyphColor} />
            {loading ? <LoadingBar /> : valueNode}
            {adornments}
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="center"
          className="w-auto max-w-[calc(100vw-1rem)] border-0 p-0 shadow-none"
          collisionPadding={{ top: 64 }}
        >
          <div
            className="overflow-hidden"
            style={{
              borderRadius: PANEL.radius,
              border: PANEL.border,
              background: PANEL.background,
              boxShadow: PANEL.shadow,
            }}
          >
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
              <div className="flex">
                <DatePickerCalendar
                  mode={mode}
                  size={size}
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
                  footer={
                    // Plain single mode commits on click, so it needs no
                    // footer — only range and single+time have a draft to
                    // clear or apply.
                    !(mode === "range" || isSingleWithTime) ? null : (
                    <div
                      className="flex items-center"
                      style={{
                        gap: 9,
                        paddingTop: 9,
                        borderTop: `1px solid ${PANEL.rule}`,
                      }}
                    >
                      <span
                        className="ue-tabular flex-1"
                        style={{
                          fontVariantNumeric: "tabular-nums",
                          fontSize: 11,
                          fontWeight: 500,
                          lineHeight: 1.4,
                          color: PANEL.footerInk,
                        }}
                      >
                        {footerHint}
                      </span>
                      <button
                        type="button"
                        onClick={
                          isSingleWithTime
                            ? handleClearDraftTime
                            : handleClearDraftRange
                        }
                        className="transition-all duration-[120ms]"
                        style={{
                          height: 28,
                          padding: "0 10px",
                          border: `1px solid ${DATEPICKER_COLORS.border}`,
                          borderRadius: PANEL.cellRadius,
                          background: DATEPICKER_COLORS.surface,
                          color: PANEL.navInk,
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Clear
                      </button>
                      <button
                        type="button"
                        onClick={
                          isSingleWithTime ? handleApplySingleTime : handleApply
                        }
                        disabled={
                          isSingleWithTime ? !draftSingleDate : !canApply
                        }
                        className="transition-all duration-[120ms] disabled:cursor-not-allowed disabled:opacity-40"
                        style={{
                          height: 28,
                          padding: "0 12px",
                          border: 0,
                          borderRadius: PANEL.cellRadius,
                          color: "#FFFFFF",
                          backgroundColor: PANEL.selectedBg,
                          backgroundImage: "linear-gradient(180deg,#0A5A2C,#003C1B)",
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Apply
                      </button>
                    </div>
                    )
                  }
                />
                {isSingleWithTime && (
                  <TimePicker value={draftTime} onChange={setDraftTime} />
                )}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <InputHelper
        size={size}
        state={state === "open" ? "focused" : state}
        helperText={error ?? (status && statusMessage) ?? helperText}
        error={error}
      />
    </div>
  );
}

DatePicker.displayName = "DatePicker";
export { DatePicker };
