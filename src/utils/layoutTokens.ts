/**
 * Layout design tokens — single source of truth for page-level spacing.
 *
 * The Layout components (PageContainer, TopHeader, SubHeader) read defaults
 * from here and also accept prop overrides, so consumers can customize
 * per-instance without forking tokens.
 *
 * Numbers are px. Convert to CSS with {@link toCssSize}.
 */
export const LAYOUT = {
  contentMarginLeft: 16,
  /** Right margin of the content area. */
  contentMarginRight: 12,
  contentMarginTop:12,
  contentPaddingLeft:22,
  contentPaddingRight:20,
  /** Vertical rhythm — spacing between top-level blocks inside the content area. */
  gap: {
    /** Tight grid gap between adjacent cards. */
    xs: 12,
    /** Default gap between top-level sections. */
    sm: 20,
    /** Wider gap between grouped sections. */
    md: 22,
  },
  /** Fixed height of the top page header row. */
  topHeaderHeight: 64,
  topHeaderPadding:8,
  subHeaderPaddingTop:16,
  subHeaderPaddingBottom:16,

} as const;

export type LayoutTokens = typeof LAYOUT;

/** A CSS size accepts either a raw number (treated as px) or a string ("100%", "50vh", ...). */
export type CssSize = number | string;

/** Convert a {@link CssSize} to a CSS string ("16" → "16px"; strings pass through). */
export function toCssSize(value: CssSize): string {
  return typeof value === "number" ? `${value}px` : value;
}
