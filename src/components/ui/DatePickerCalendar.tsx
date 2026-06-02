import * as React from "react";
import { DayPicker, type DayButton, type Modifiers } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/custom/Select/Select";
import type { SelectOption } from "@/components/custom/Select/Select.types";

/* ── Static data ──────────────────────────────────────────────────────── */

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

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
        {/* Weekday header as plain divs — avoids <thead> table-context issues */}
        <div className="grid grid-cols-7 mb-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="flex h-7 items-center justify-center text-[11px] font-medium text-[#9CA3AF] select-none"
            >
              {d}
            </div>
          ))}
        </div>

        <DayPicker
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mode={mode as any}
          selected={selected ?? undefined}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSelect={(onSelect ?? (() => {})) as any}
          month={viewMonth}
          onMonthChange={setViewMonth}
          hideNavigation
          hideWeekdays
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
            months: "flex flex-col w-full",
            month: "flex flex-col gap-1 w-full",
            month_caption: "hidden",
            weeks: "flex flex-col gap-0.5 w-full",
            week: "grid grid-cols-7 w-full",
            day: "flex items-center justify-center p-0 relative",
            day_button: "",
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            MonthGrid: ({ children, ...props }: any) => <div {...props}>{children}</div>,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Weeks: ({ children, ...props }: any) => <div {...props}>{children}</div>,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Week: ({ week: _week, children, ...props }: any) => <div {...props}>{children}</div>,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Day: ({ day: _day, modifiers: _modifiers, children, ...props }: any) => <div {...props}>{children}</div>,
            DayButton: StyledDayButton,
          }}
        />
      </div>
    </div>
  );
}

/* ── Month Picker Calendar ────────────────────────────────────────────── */

interface MonthPickerCalendarProps {
  selected?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  onSelect: (date: Date) => void;
  className?: string;
}

export function MonthPickerCalendar({
  selected,
  minDate,
  maxDate,
  onSelect,
  className,
}: MonthPickerCalendarProps) {
  const today = React.useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = React.useState(
    selected?.getFullYear() ?? today.getFullYear(),
  );

  const yearOptions = React.useMemo((): SelectOption[] => {
    const center = today.getFullYear();
    const minYear = minDate ? minDate.getFullYear() : center - 10;
    const maxYear = maxDate ? maxDate.getFullYear() : center + 10;
    const opts: SelectOption[] = [];
    for (let y = minYear; y <= maxYear; y++) {
      opts.push({ label: String(y), value: String(y) });
    }
    return opts;
  }, [today, minDate, maxDate]);

  return (
    <div className={cn("w-[280px] max-w-full bg-white", className)}>
      {/* Year select */}
      <div className="flex items-center justify-center px-3 py-2">
        <Select
          options={yearOptions}
          value={String(viewYear)}
          onChange={(val) => setViewYear(Number(val as string))}
          size="sm"
          className="w-28"
        />
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-3 gap-1.5 px-3 pb-3">
        {MONTH_LABELS.map((label, i) => {
          const isSelected =
            !!selected &&
            selected.getFullYear() === viewYear &&
            selected.getMonth() === i;
          const isToday =
            today.getFullYear() === viewYear && today.getMonth() === i;
          const isDisabled =
            (!!minDate &&
              new Date(viewYear, i) <
                new Date(minDate.getFullYear(), minDate.getMonth())) ||
            (!!maxDate &&
              new Date(viewYear, i) >
                new Date(maxDate.getFullYear(), maxDate.getMonth()));

          return (
            <button
              key={label}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelect(new Date(viewYear, i, 1))}
              className={cn(
                "h-9 rounded-lg text-sm font-medium transition-colors select-none",
                isSelected && "bg-[#006F42] text-white",
                isToday &&
                  !isSelected &&
                  "underline decoration-[#006F42] decoration-2 underline-offset-2 text-[#006F42] font-semibold hover:bg-[#F3F4F6]",
                !isSelected &&
                  !isToday &&
                  !isDisabled &&
                  "text-[#374151] hover:bg-[#F3F4F6]",
                isDisabled && "text-[#D1D5DB] opacity-50 cursor-not-allowed",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
