import * as React from "react";

/**
 * Set to `true` when a component is rendered inside the FilterGroup mobile drawer.
 * Components like Select read this to switch to a flat tap-list instead of a popover.
 */
export const FilterGroupMobileContext = React.createContext(false);

/**
 * Props that a controlled DatePicker (open prop defined) registers with FilterGroup
 * when it becomes open inside the mobile drawer. FilterGroup uses these to render
 * the calendar inline — avoiding the Radix Dialog modal dismissal issue where a
 * portal outside the dialog DOM counts as an "outside click".
 */
export interface DrawerCalendarProps {
  mode: "single" | "range" | "month";
  value: unknown;
  onChange?: (v: unknown) => void;
  onOpenChange?: (open: boolean) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const FilterGroupDrawerCalendarContext = React.createContext<
  ((props: DrawerCalendarProps | null) => void) | null
>(null);
