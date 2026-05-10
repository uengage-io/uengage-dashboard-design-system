import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { DayPicker, Modifiers } from 'react-day-picker';

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
    onDayClick?: DayHandler;
    onDayMouseEnter?: DayHandler;
    onDayMouseLeave?: DayHandler;
}
declare function DatePickerCalendar({ mode, selected, onSelect, disabled, defaultMonth, minDate, maxDate, className, onDayClick, onDayMouseEnter, onDayMouseLeave, }: DatePickerCalendarProps): react_jsx_runtime.JSX.Element;
interface MonthPickerCalendarProps {
    selected?: Date | null;
    minDate?: Date;
    maxDate?: Date;
    onSelect: (date: Date) => void;
}
declare function MonthPickerCalendar({ selected, minDate, maxDate, onSelect, }: MonthPickerCalendarProps): react_jsx_runtime.JSX.Element;

export { DatePickerCalendar, MonthPickerCalendar };
