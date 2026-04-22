import * as React from "react";
import { DayPicker, type DayButton, type Modifiers } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/custom/Select/Select";
import type { SelectOption } from "@/components/custom/Select/Select.types";

/* ── Static data ──────────────────────────────────────────────────────── */

const MONTH_OPTIONS: SelectOption[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
].map((label, i) => ({ label, value: String(i) }));

function buildYearOptions(center: number): SelectOption[] {
  const opts: SelectOption[] = [];
  for (let y = center - 10; y <= center + 10; y++) {
    opts.push({ label: String(y), value: String(y) });
  }
  return opts;
}

/* ── Styled day button ────────────────────────────────────────────────── */

function StyledDayButton({
  day,
  modifiers,
  className,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isEdge = modifiers.range_start || modifiers.range_end;
  const isSingleSelected =
    modifiers.selected && !isEdge && !modifiers.range_middle;
  const isGreenFilled = isSingleSelected || isEdge;

  return (
    <button
      ref={ref}
      type="button"
      disabled={modifiers.disabled}
      className={cn(
        // base circle
        "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006F42] focus-visible:ring-offset-1",
        // green filled circle — single selected or range edge
        isGreenFilled &&
          "bg-[#006F42] text-white font-medium",
        // range middle — transparent, cell bg (#006F42) shows through
        modifiers.range_middle &&
          !isEdge &&
          "w-full rounded-none text-white",
        // today underline — always render; color depends on context
        modifiers.today &&
          (isGreenFilled || (modifiers.range_middle && !isEdge)) &&
          "underline decoration-white underline-offset-2 decoration-2",
        modifiers.today &&
          !isGreenFilled &&
          !modifiers.range_middle &&
          "underline decoration-[#006F42] underline-offset-2 decoration-2 text-[#006F42] font-semibold hover:bg-[#F3F4F6]",
        // default
        !isGreenFilled &&
          !modifiers.today &&
          !modifiers.range_middle &&
          !modifiers.outside &&
          !modifiers.disabled &&
          "text-[#374151] hover:bg-[#F3F4F6]",
        // outside month
        modifiers.outside && "text-[#D1D5DB] hover:bg-transparent",
        // disabled
        modifiers.disabled &&
          "text-[#D1D5DB] opacity-50 cursor-not-allowed pointer-events-none",
        className,
      )}
      {...props}
    />
  );
}

/* ── Component ────────────────────────────────────────────────────────── */

type DayHandler = (
  date: Date,
  modifiers: Modifiers,
  e: React.MouseEvent,
) => void;

interface DatePickerCalendarProps {
  mode?: "single" | "range";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect?: (value: any) => void;
  disabled?: Parameters<typeof DayPicker>[0]["disabled"];
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  onDayClick?: DayHandler;
  onDayMouseEnter?: DayHandler;
  onDayMouseLeave?: DayHandler;
}

export function DatePickerCalendar({
  mode = "single",
  selected,
  onSelect,
  disabled,
  defaultMonth,
  minDate,
  maxDate,
  className,
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave,
}: DatePickerCalendarProps) {
  const today = React.useMemo(() => new Date(), []);

  const initialMonth =
    defaultMonth ??
    (selected instanceof Date
      ? selected
      : (selected as { from?: Date } | null | undefined)?.from) ??
    today;

  const [viewMonth, setViewMonth] = React.useState<Date>(initialMonth);

  const yearOptions = React.useMemo(
    () => buildYearOptions(today.getFullYear()),
    [today],
  );

  const handlePrev = () =>
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));

  const handleNext = () =>
    setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  const handleMonthSelect = (val: string | string[]) =>
    setViewMonth(
      (prev) => new Date(prev.getFullYear(), Number(val as string), 1),
    );

  const handleYearSelect = (val: string | string[]) =>
    setViewMonth((prev) => new Date(Number(val as string), prev.getMonth(), 1));

  const isPrevDisabled =
    !!minDate &&
    new Date(viewMonth.getFullYear(), viewMonth.getMonth()) <=
      new Date(minDate.getFullYear(), minDate.getMonth());

  const isNextDisabled =
    !!maxDate &&
    new Date(viewMonth.getFullYear(), viewMonth.getMonth()) >=
      new Date(maxDate.getFullYear(), maxDate.getMonth());

  return (
    <div className={cn("w-[360px] max-w-full bg-white", className)}>
      {/* ── Navigation header ── */}
      <div className="flex items-center gap-1 px-3 py-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={isPrevDisabled}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] text-[#374151] transition-colors hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous month"
        >
          <ChevronLeft size={14} strokeWidth={2.5} />
        </button>

        <div className="flex flex-1 items-center justify-center gap-1.5">
          <Select
            options={MONTH_OPTIONS}
            value={String(viewMonth.getMonth())}
            onChange={handleMonthSelect}
            size="sm"
            className="w-36"
          />
          <Select
            options={yearOptions}
            value={String(viewMonth.getFullYear())}
            onChange={handleYearSelect}
            size="sm"
            className="w-24"
          />
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={isNextDisabled}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] text-[#374151] transition-colors hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Next month"
        >
          <ChevronRight size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── Day grid ── */}
      <div className="px-3 pb-3">
        <DayPicker
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mode={mode as any}
          selected={selected ?? undefined}
          onSelect={onSelect}
          month={viewMonth}
          onMonthChange={setViewMonth}
          hideNavigation
          showOutsideDays
          disabled={disabled}
          onDayClick={onDayClick}
          onDayMouseEnter={onDayMouseEnter}
          onDayMouseLeave={onDayMouseLeave}
          startMonth={
            minDate
              ? new Date(minDate.getFullYear(), minDate.getMonth())
              : undefined
          }
          endMonth={
            maxDate
              ? new Date(maxDate.getFullYear(), maxDate.getMonth())
              : undefined
          }
          classNames={{
            months: "flex flex-col",
            month: "flex flex-col gap-1",
            month_caption: "hidden",
            weekdays: "flex mb-1",
            // flex-1 so weekday columns match day cell columns exactly
            weekday:
              "flex-1 text-center text-[11px] font-medium text-[#9CA3AF] h-7 flex items-center justify-center select-none",
            weeks: "flex flex-col gap-0.5",
            week: "flex",
            // flex-1 — cells fill row proportionally for seamless band
            day: "flex-1 flex items-center justify-center p-0 relative",
            day_button: "",
            // dark green range band
            range_start:
              "bg-[linear-gradient(to_right,transparent_50%,#006F42_50%)]",
            range_middle: "bg-[#006F42]",
            range_end:
              "bg-[linear-gradient(to_right,#006F42_50%,transparent_50%)]",
            selected: "",
            today: "",
            outside: "",
            disabled: "",
            hidden: "invisible",
          }}
          components={{
            DayButton: StyledDayButton,
          }}
        />
      </div>
    </div>
  );
}
