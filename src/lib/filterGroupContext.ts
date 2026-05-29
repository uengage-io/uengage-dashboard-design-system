import * as React from "react";

/**
 * Set to `true` when a component is rendered inside the FilterGroup mobile drawer.
 * Components like Select read this to switch to a flat tap-list instead of a popover.
 */
export const FilterGroupMobileContext = React.createContext(false);
