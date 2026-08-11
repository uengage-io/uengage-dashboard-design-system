import * as React from "react";
import { DayPicker, type DayButton, type Modifiers } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Select } from "@/components/custom/Select/Select";
import type { SelectOption } from "@/components/custom/Select/Select.types";
import {
  DATEPICKER_SIZES,
  PANEL,
  getDayCellStyle,
  type DatePickerSize,
} from "@/components/custom/DatePicker/datepickerVariants";

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

function buildYearOptions(center: number, minYear?: number, maxYear?: number): SelectOption[] {
  const from = minYear ?? center - 10;
  const to = maxYear ?? center + 10;
  const opts: SelectOption[] = [];
  for (let y = from; y <= to; y++) {
    opts.push({ label: String(y), value: String(y) });
  }
  return opts;
}

/** Single-letter heads, the way the design draws them. */
const WEEK_HEADS = ["S", "M", "T", "W", "T", "F", "S"];

/* ── Small controls ───────────────────────────────────────────────────── */

/** A month chip in the month-mode grid. */
function JumpCell({
  label,
  selected,
  ring,
  disabled,
  height,
  onClick,
}: {
  label: string;
  selected: boolean;
  ring?: boolean;
  disabled?: boolean;
  height: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="ue-tabular border-0 transition-[background] duration-[120ms] disabled:cursor-not-allowed disabled:opacity-40"
      style={{
        height,
        borderRadius: PANEL.cellRadius,
        fontVariantNumeric: "tabular-nums",
        fontSize: 11,
        fontWeight: selected ? 600 : 500,
        cursor: disabled ? "not-allowed" : "pointer",
        background: selected
          ? PANEL.selectedBg
          : hovered && !disabled
            ? PANEL.hover
            : "transparent",
        color: selected ? PANEL.selectedInk : PANEL.dayInk,
        boxShadow: ring && !selected ? PANEL.todayRing : "none",
      }}
    >
      {label}
    </button>
  );
}

/* ── Styled day button ────────────────────────────────────────────────── */

interface DayButtonExtras {
  size: DatePickerSize;
}

function makeDayButton({ size }: DayButtonExtras) {
  const spec = DATEPICKER_SIZES[size];

  return function StyledDayButton({
    day: _day,
    modifiers,
    className,
    ...props
  }: React.ComponentProps<typeof DayButton>) {
    const ref = React.useRef<HTMLButtonElement>(null);
    const [hovered, setHovered] = React.useState(false);

    React.useEffect(() => {
      if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);

    const isEdge = !!(modifiers.range_start || modifiers.range_end);

    const style = getDayCellStyle({
      selected: !!modifiers.selected && !isEdge && !modifiers.range_middle,
      rangeStart: !!modifiers.range_start,
      rangeEnd: !!modifiers.range_end,
      inRange: !!modifiers.range_middle && !isEdge,
      today: !!modifiers.today,
      outside: !!modifiers.outside,
      disabled: !!modifiers.disabled,
    });

    // The wash only applies to a cell that has no fill of its own.
    const plain = style.background === "transparent";

    return (
      // `props` is spread first so react-day-picker can never clobber the
      // cell's own metrics — a `style` coming through the spread would replace
      // the whole inline style object, not merge into it.
      <button
        {...props}
        ref={ref}
        type="button"
        disabled={modifiers.disabled}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className={cn(
          "ue-tabular relative z-10 flex items-center justify-center border-0 transition-[background-color] duration-[120ms] select-none",
          "focus-visible:outline-none",
          modifiers.disabled && "cursor-not-allowed",
          className,
        )}
        style={{
          width: spec.cell,
          height: spec.cell,
          fontVariantNumeric: "tabular-nums",
          fontSize: spec.cellFont,
          lineHeight: 1,
          cursor: modifiers.disabled ? "not-allowed" : "pointer",
          ...style,
          background:
            plain && hovered && !modifiers.disabled
              ? PANEL.hover
              : style.background,
        }}
      />
    );
  };
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
  /** Scales the day grid with the trigger. Defaults to `md` (30px cells). */
  size?: DatePickerSize;
  /** Pulls the view to this month whenever it changes. */
  focusDate?: Date | null;
  /**
   * Rendered as the last row of the panel column, under the grid's hairline.
   * The design keeps the hint / Clear / Apply row inside the same 12px column
   * as the header and the grid.
   */
  footer?: React.ReactNode;
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
  size = "md",
  focusDate,
  footer,
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave,
}: DatePickerCalendarProps) {
  const today = React.useMemo(() => new Date(), []);
  const spec = DATEPICKER_SIZES[size];

  const clampedToday = maxDate && today > maxDate ? maxDate : minDate && today < minDate ? minDate : today;

  const initialMonth =
    defaultMonth ??
    (selected instanceof Date
      ? selected
      : (selected as { from?: Date } | null | undefined)?.from) ??
    clampedToday;

  const [viewMonth, setViewMonth] = React.useState<Date>(initialMonth);

  const focusKey = focusDate ? focusDate.getFullYear() * 100 + focusDate.getMonth() : null;
  React.useEffect(() => {
    if (focusKey === null) return;
    setViewMonth(new Date(Math.floor(focusKey / 100), focusKey % 100, 1));
  }, [focusKey]);

  // ── Month & year jump panel ─────────────────────────────────────────────
  // Two independent selects, so a jump is one click on each rather than an
  // overlay that hides the grid.
  const yearOptions = React.useMemo(
    () => buildYearOptions(
      today.getFullYear(),
      minDate?.getFullYear(),
      maxDate?.getFullYear(),
    ),
    [today, minDate, maxDate],
  );

  const monthOptions = React.useMemo((): SelectOption[] => {
    const year = viewMonth.getFullYear();
    return MONTH_OPTIONS.map((opt) => {
      const month = Number(opt.value);
      const isDisabled =
        (!!minDate && year === minDate.getFullYear() && month < minDate.getMonth()) ||
        (!!maxDate && year === maxDate.getFullYear() && month > maxDate.getMonth());
      return isDisabled ? { ...opt, disabled: true } : opt;
    });
  }, [viewMonth, minDate, maxDate]);

  const handleMonthSelect = (val: string | string[]) =>
    setViewMonth((prev) => new Date(prev.getFullYear(), Number(val as string), 1));

  const handleYearSelect = (val: string | string[]) =>
    setViewMonth((prev) => new Date(Number(val as string), prev.getMonth(), 1));

  const DayButtonComponent = React.useMemo(() => makeDayButton({ size }), [size]);

  /** 7 fixed columns with the design's 2px gutter — heads and days share it. */
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(7, ${spec.cell}px)`,
    gap: PANEL.cellGap,
  };

  return (
    <div
      className={cn("flex flex-col bg-white", className)}
      style={{ padding: PANEL.padding, gap: 10 }}
    >
      {/* Navigation header — the two dropdowns are the only way to move */}
      <div className="flex items-center justify-center gap-1.5">
        <Select
          options={monthOptions}
          value={String(viewMonth.getMonth())}
          onChange={handleMonthSelect}
          size="xs"
          className="w-[88px]"
        />
        <Select
          options={yearOptions}
          value={String(viewMonth.getFullYear())}
          onChange={handleYearSelect}
          size="xs"
          className="w-[70px]"
        />
      </div>

      {/* ── Day grid ── */}
      <div>
        {/* Weekday header as plain divs — avoids <thead> table-context issues */}
        <div style={gridStyle}>
          {WEEK_HEADS.map((d, i) => (
            <div
              key={`${d}-${i}`}
              className="flex select-none items-center justify-center"
              style={{
                height: PANEL.weekHeadHeight,
                fontSize: 10,
                fontWeight: 600,
                lineHeight: 1,
                color: PANEL.weekHeadInk,
              }}
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
            months: "flex flex-col",
            month: "flex flex-col",
            month_caption: "hidden",
            weeks: "flex flex-col",
            week: "",
            day: "flex items-center justify-center p-0 relative",
            day_button: "",
            range_start: "",
            range_middle: "",
            range_end: "",
            selected: "",
            today: "",
            outside: "",
            disabled: "",
            hidden: "invisible",
          }}
          components={{
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            MonthGrid: ({ children, ...props }: any) => <div {...props}>{children}</div>,
            // The rows carry the same 2px gutter as the columns.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Weeks: ({ children, ...props }: any) => (
              <div
                {...props}
                style={{ display: "flex", flexDirection: "column", gap: PANEL.cellGap }}
              >
                {children}
              </div>
            ),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Week: ({ week: _week, children, ...props }: any) => (
              <div {...props} style={gridStyle}>
                {children}
              </div>
            ),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Day: ({ day: _day, modifiers: _modifiers, children, ...props }: any) => (
              <div {...props}>{children}</div>
            ),
            DayButton: DayButtonComponent,
          }}
        />
      </div>

      {footer}
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

  const yearOptions = React.useMemo(
    () =>
      buildYearOptions(
        today.getFullYear(),
        minDate?.getFullYear(),
        maxDate?.getFullYear(),
      ),
    [today, minDate, maxDate],
  );

  return (
    <div
      className={cn("w-[246px] max-w-full bg-white", className)}
      style={{ padding: PANEL.padding }}
    >
      {/* Year dropdown */}
      <div className="mb-2.5 flex items-center justify-center">
        <Select
          options={yearOptions}
          value={String(viewYear)}
          onChange={(val) => setViewYear(Number(val as string))}
          size="xs"
          className="w-[104px]"
        />
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-3 gap-[5px]">
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
            <JumpCell
              key={label}
              label={label}
              height={32}
              selected={isSelected}
              ring={isToday}
              disabled={isDisabled}
              onClick={() => onSelect(new Date(viewYear, i, 1))}
            />
          );
        })}
      </div>
    </div>
  );
}
