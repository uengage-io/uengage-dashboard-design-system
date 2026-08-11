import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { DayPicker, Modifiers } from 'react-day-picker';
import * as class_variance_authority_types from 'class-variance-authority/types';

type DatePickerTriggerState = "default" | "open" | "disabled" | "readonly";
type DatePickerSize = "xs" | "sm" | "md" | "lg";
/**
 * Structural classes for the trigger. Metrics and colours ride on inline
 * styles, so the control keeps its exact look in apps whose Tailwind build does
 * not scan this package.
 *
 * The `state` and `size` variant keys are preserved from the pre-refresh API —
 * existing calls such as `triggerVariants({ state: "open", size: "md" })` keep
 * type-checking, they simply no longer carry the colours.
 */
declare const triggerVariants: (props?: ({
    state?: "default" | "disabled" | "open" | "readonly" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type DayCellVariant = "default" | "today" | "selected" | "inRange" | "rangeStart" | "rangeEnd" | "outsideMonth";
/**
 * Day-cell classes kept for the published API. The panel now paints its cells
 * from {@link getDayCellStyle} inline, so these carry structure only.
 *
 * @deprecated Prefer `getDayCellStyle` — colours here are no longer the source
 * of truth for the rendered calendar.
 */
declare const dayCellVariants: (props?: ({
    variant?: "default" | "selected" | "rangeStart" | "rangeEnd" | "inRange" | "today" | "outsideMonth" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;

type DayHandler = (date: Date, modifiers: Modifiers, e: React.MouseEvent) => void;
interface DatePickerCalendarProps {
    mode?: "single" | "range";
    selected?: any;
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
declare function DatePickerCalendar({ mode, selected, onSelect, disabled, defaultMonth, minDate, maxDate, className, size, focusDate, footer, onDayClick, onDayMouseEnter, onDayMouseLeave, }: DatePickerCalendarProps): react_jsx_runtime.JSX.Element;
interface MonthPickerCalendarProps {
    selected?: Date | null;
    minDate?: Date;
    maxDate?: Date;
    onSelect: (date: Date) => void;
    className?: string;
}
declare function MonthPickerCalendar({ selected, minDate, maxDate, onSelect, className, }: MonthPickerCalendarProps): react_jsx_runtime.JSX.Element;

export { DatePickerCalendar as D, MonthPickerCalendar as M, type DatePickerTriggerState as a, type DayCellVariant as b, dayCellVariants as d, triggerVariants as t };
