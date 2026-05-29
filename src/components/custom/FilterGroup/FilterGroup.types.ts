import * as React from "react";

export interface FilterGroupProps {
  /**
   * Your filter components — <Select />, <SearchBar />, <Input />, <DatePicker />, etc.
   * Each direct child maps 1-to-1 with an entry in `labels`.
   */
  children: React.ReactNode;
  /**
   * Category labels shown in the mobile drawer's left panel, in the same order as children.
   * e.g. ["Outlet", "State", "City", "Date"]
   */
  labels: string[];
  /** Called when the user presses Apply in the mobile drawer. */
  onApply?: () => void;
  /** Called when the user presses Reset in the mobile drawer. */
  onReset?: () => void;
  /** Drawer title and mobile trigger label. Defaults to "Filters". */
  drawerTitle?: string;
  /** Active-filter count badge on the mobile trigger (hidden when 0 or undefined). */
  activeCount?: number;
  /** Extra classes on the desktop filter row. */
  className?: string;
  /** Extra classes on the mobile drawer panel. */
  drawerClassName?: string;
  /** Always render in drawer mode regardless of screen size — useful for demos/testing. */
  forceDrawer?: boolean;
}
