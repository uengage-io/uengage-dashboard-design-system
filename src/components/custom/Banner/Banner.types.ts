import type * as React from "react";
import type {
  BannerAppearance,
  BannerPlacement,
  BannerSize,
  BannerTone,
  BannerToneKey,
} from "@/components/ui/banner";

export type { BannerAppearance, BannerPlacement, BannerSize, BannerTone, BannerToneKey };

/**
 * Visual style of the banner.
 *
 * `info` | `success` | `error` | `warning` are the original four; `danger` and
 * `neutral` were added with the design-system refresh. `error` stays as an
 * alias of `danger`.
 */
export type BannerVariant = BannerTone;

/** Layout arrangement of the same tokens. The tone never changes with the layout. */
export type BannerLayout = "default" | "callout";

/** How an action renders: an outline button, or a bare text link. */
export type BannerActionVariant = "button" | "link";

export interface BannerAction {
  label: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Outline button (default) or a bare text link. */
  variant?: BannerActionVariant;
  disabled?: boolean;
  /** Rendered as an `<a>` instead of a `<button>` when set. */
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "content"> {
  /**
   * Visual style of the banner.
   * @default "info"
   */
  variant?: BannerVariant;
  /** Alias of `variant`, matching the design-system prop name. Wins when both are set. */
  tone?: BannerTone;
  /**
   * Size scale. `sm` drops the description line entirely — one sentence, one
   * action — and suits cards, table toolbars and drawers.
   * @default "md" (or `sm` when `placement="inline"`)
   */
  size?: BannerSize;
  /**
   * Where the banner sits. `global` renders the pinned full-bleed ink bar;
   * `page`, `section` and `inline` all render the tinted surface.
   * @default "section"
   */
  placement?: BannerPlacement;
  /**
   * `callout` renders the feature-callout arrangement — icon tile, display
   * title, and a gradient primary action. One per screen, maximum.
   * @default "default"
   */
  layout?: BannerLayout;
  /** Light tinted surface, or the dark mix of the same hue for dark surfaces. */
  appearance?: BannerAppearance;

  /** The fact. 600 weight, full ink, one line, no full stop. */
  title?: React.ReactNode;
  /** The consequence. 400 weight, the same ink at 82%. */
  description?: React.ReactNode;
  /** Text content. Rendered as the title when no `title` is given. */
  message?: React.ReactNode;
  /** Same as `message`. Takes precedence over it. */
  children?: React.ReactNode;

  /** A short list of causes, capped by `maxItems`. A banner is not an error log. */
  items?: React.ReactNode[];
  /**
   * How many `items` render before the overflow line appears.
   * @default 3
   */
  maxItems?: number;
  /** Rendered in place of the hidden items. Receives how many were dropped. */
  renderMoreItems?: (hiddenCount: number) => React.ReactNode;

  /** Primary action. Vertically centred beside the copy. */
  action?: BannerAction;
  /** Secondary action, rendered after the primary one. */
  secondaryAction?: BannerAction;
  /**
   * `below` drops the actions under the copy instead of squeezing it — use it
   * under ~320px.
   * @default "inline"
   */
  actionPlacement?: "inline" | "below";

  /** Override the default variant icon. Pass `null` to hide without `showIcon={false}`. */
  icon?: React.ReactNode;
  /**
   * Whether to render the leading icon.
   * @default true
   */
  showIcon?: boolean;

  /** Adds the ✕. Only announcements are dismissible — an error the operator must fix has none. */
  dismissible?: boolean;
  /** Remembers the dismissal in `localStorage` so it does not return on every page load. */
  dismissId?: string;
  /** Fired after the banner is dismissed, by the ✕ or by `autoDismiss`. */
  onDismiss?: () => void;
  /** Controlled visibility. When set, the banner never hides itself. */
  open?: boolean;
  /** Fired whenever the banner wants to change its own visibility. */
  onOpenChange?: (open: boolean) => void;

  /**
   * Milliseconds before the banner fades itself out, with a bottom progress
   * rule counting down. Success announcements only — warnings and errors never
   * expire.
   */
  autoDismiss?: number;

  /**
   * 0–100. Swaps the icon for a spinner and renders a progress bar — a
   * long-running job. Pass `true` for an indeterminate spinner with no bar.
   */
  progress?: number | true;
  /** Caption under the progress bar, e.g. `264 of 412 · about 40 seconds left`. */
  progressLabel?: React.ReactNode;

  /** Bottom rule shown as a percentage, independent of `autoDismiss`. */
  expiryProgress?: number;

  /** Overrides the tone-derived `role` (`alert` for danger/error, `status` otherwise). */
  role?: React.AriaRole;

  /** Custom background color (CSS value). Overrides the variant palette. */
  backgroundColor?: string;
  /** Custom border color (CSS value). Overrides the variant palette. */
  borderColor?: string;
  /** Custom icon color (CSS value). Overrides the variant palette. */
  iconColor?: string;
  /** Custom text color (CSS value). Overrides the variant palette. */
  textColor?: string;

  /** Extra className for the copy column. */
  contentClassName?: string;
}

export interface BannerStackItem extends BannerProps {
  /** Stable key. Also used as the `dismissId` when none is given. */
  id: string;
}

export interface BannerStackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  banners: BannerStackItem[];
  /**
   * How many banners render in full. The rest collapse behind a counter.
   * @default 1
   */
  max?: number;
  /**
   * Collapse the overflow behind a counter with their tone dots. When false the
   * overflow is dropped instead.
   * @default true
   */
  collapseRest?: boolean;
  /** Sort by severity (danger → neutral) before applying `max`. @default true */
  sortBySeverity?: boolean;
  /** Size applied to every banner that does not set its own. */
  size?: BannerSize;
  appearance?: BannerAppearance;
  /** Gap between stacked banners, in px. @default 8 */
  gap?: number;
  /** Label for the collapsed counter. Receives the hidden count. */
  moreLabel?: (hiddenCount: number) => React.ReactNode;
}
