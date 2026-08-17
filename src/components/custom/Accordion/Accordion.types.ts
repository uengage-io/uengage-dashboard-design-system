import type * as React from "react";

/** Per-row state. A row keeps its title in every one of them. */
export type AccordionItemState = "default" | "loading" | "error" | "dirty";

export type AccordionSummaryTone =
  | "brand"
  | "success"
  | "neutral"
  | "warning"
  | "danger";

export interface AccordionItem {
  value: string;
  /** 600 weight, one line, truncates before the summary. */
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  /** Rendered inside the optional mint icon tile. */
  icon?: React.ReactNode;
  /**
   * Extra header content. Rendered outside the toggle's hit area so clicking it
   * never expands the row.
   */
  action?: React.ReactNode;

  /* ---- design-system additions ---- */

  /** Optional second line. Stays visible when collapsed; dropped at `sm`. */
  subtitle?: React.ReactNode;
  /** The collapsed answer — a right-aligned chip. Never truncates. */
  summary?: React.ReactNode;
  /** Palette for the summary chip. @default "neutral" */
  summaryTone?: AccordionSummaryTone;
  /** Tints the row and swaps the chevron for a spinner when `loading`. */
  state?: AccordionItemState;
  /** Why a disabled row is disabled — surfaced as a tooltip. */
  disabledReason?: string;
  /** Same as `action`; both render outside the toggle, separated by a hairline. */
  headerActions?: React.ReactNode;
  /** Mount the panel on first open rather than up front. @default false */
  lazy?: boolean;
  /** Keep the panel mounted once opened, so form state survives a collapse. */
  keepMounted?: boolean;
}

/**
 * `bordered` is the design default — one shell with hairline dividers.
 * `separated` gives each row its own box, `flush` drops the outer border, and
 * `card` is separated plus elevation.
 *
 * `default` and `ghost` are the pre-design-system names, kept so existing call
 * sites keep working: `default` renders as `flush`, `ghost` as a flush stack
 * with no dividers. The old `bordered` look — boxes with elevation — is `card`.
 */
export type AccordionVariant =
  | "bordered"
  | "separated"
  | "flush"
  | "card"
  | "default"
  | "ghost";

export type AccordionSize = "sm" | "md" | "lg";

export type AccordionAppearance = "light" | "dark";

/** The chevron leads by default — never a right-side chevron, per the design. */
export type AccordionChevronPosition = "start" | "end";

interface AccordionBaseProps {
  items: AccordionItem[];
  /** @default "default" */
  variant?: AccordionVariant;
  /** @default "md" */
  size?: AccordionSize;
  className?: string;

  /* ---- design-system additions ---- */

  /** Light surface, or the dark mix where the open row fills #1B3423. */
  appearance?: AccordionAppearance;
  /** @default "start" */
  chevronPosition?: AccordionChevronPosition;
  /** Hide the chevron entirely. @default true */
  showChevron?: boolean;
  /** Force the icon tile on or off. Defaults to the size scale. */
  showIconTile?: boolean;
  /** Renders the Expand all / Collapse all control above the stack. */
  expandAll?: boolean;
  /** Labels for that control. */
  expandAllLabels?: { expand: React.ReactNode; collapse: React.ReactNode };
  /**
   * Indents the stack and drops its shell, for one level of nesting. Two levels
   * is the hard cap — three means the page needs tabs.
   */
  nested?: boolean;
  /**
   * Gate a row opening or closing — return `false` to keep it as it is.
   * Receives the value that changed and whether it was opening.
   */
  onBeforeToggle?: (value: string, opening: boolean) => boolean;
  /** Extra className for each row. */
  itemClassName?: string;
}

interface AccordionSingleProps extends AccordionBaseProps {
  type?: "single";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

interface AccordionMultipleProps extends AccordionBaseProps {
  type: "multiple";
  collapsible?: never;
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
}

export type CustomAccordionProps = AccordionSingleProps | AccordionMultipleProps;
