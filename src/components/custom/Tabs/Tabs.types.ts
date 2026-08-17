import type * as React from "react";

export type TabItem = {
  value: string;
  label: string;
  disabled?: boolean;
  /** Leading icon. Rendered at the size scale's icon box. */
  icon?: React.ReactNode;
  /** Count badge rendered after the label. */
  count?: React.ReactNode;
  /** Amber dot marking unsaved work behind this tab. */
  dirty?: boolean;
  /** Tooltip on a disabled tab saying what unlocks it. */
  disabledReason?: string;
};

/**
 * `primary` is the underline look and `secondary` is the segmented look;
 * `pill` and `vertical` complete the design-system set.
 *
 * The choice is not cosmetic: primary/underline means "different content",
 * secondary/segmented means "same content, filtered".
 *
 * `legacyPrimary` and `legacySecondary` keep the pre-design-system looks — the
 * measured-overflow underline and the animated pill/chip slab — for call sites
 * that still want them.
 */
export type TabsVariant =
  | "primary"
  | "secondary"
  | "pill"
  | "vertical"
  | "legacyPrimary"
  | "legacySecondary";

/** The four looks `DesignTabs` renders internally. Not a public `variant` value. */
export type TabsDesignVariant = "underline" | "segmented" | "pill" | "vertical";

export type TabsSize = "sm" | "md" | "lg";

export type TabsAppearance = "light" | "dark";

/** `manual` needs ↵ / Space to switch; `automatic` follows the arrow keys. */
export type TabsActivation = "automatic" | "manual";

/** `scroll` fades and scrolls the strip; `menu` collapses the tail into a More menu. */
export type TabsOverflowMode = "scroll" | "menu";

export interface CustomTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  /**
   * Visual style.
   * @default "primary"
   */
  variant?: TabsVariant;
  /** Caps how many tabs render before the rest collapse into the overflow menu. */
  visibleTabLimit?: number;
  overflowLabel?: string;
  showBottomBorder?: boolean;
  className?: string;

  /* ---- design-system additions (underline / segmented / pill / vertical) ---- */

  /**
   * Size scale. `lg` only appears once per page, directly under the page title.
   * @default "md"
   */
  size?: TabsSize;
  /**
   * Light surface, or the dark-surface palette where lime replaces forest.
   * @default "light"
   */
  appearance?: TabsAppearance;
  /**
   * `manual` requires ↵ / Space to switch after arrowing to a tab.
   * @default "automatic"
   */
  activation?: TabsActivation;
  /** Stretch the tabs to fill the available width. */
  fitted?: boolean;
  /**
   * How a strip too wide for its container behaves.
   * @default "scroll"
   */
  overflow?: TabsOverflowMode;
  /**
   * Deep-links the active tab to a URL search param, e.g. `"?tab"` or `"view"`.
   * Read on mount, written with `history.replaceState` on change.
   */
  syncToUrl?: string;
  /**
   * Gate a tab change — return `false` (or a promise of it) to keep the current
   * tab, e.g. to confirm unsaved work.
   */
  onBeforeChange?: (
    nextValue: string,
    currentValue: string,
  ) => boolean | Promise<boolean>;
  /** Wrap arrow-key navigation from the last tab back to the first. */
  loop?: boolean;
  /** Extra className for the tab strip itself. */
  listClassName?: string;
  /** Panels. Use `TabPanel` — rendered below the strip, or beside it when vertical. */
  children?: React.ReactNode;
  /** Width of the rail in the `vertical` variant, in px. @default 190 */
  verticalWidth?: number;
}

export interface TabPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  value: string;
  /**
   * Mount the panel on its first visit rather than up front.
   * @default true
   */
  lazy?: boolean;
  /** Keep the panel mounted once seen, preserving scroll and form state. */
  keepMounted?: boolean;
  children?: React.ReactNode;
}
