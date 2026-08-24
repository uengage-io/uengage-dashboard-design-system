/**
 * Layout design tokens — single source of truth for page-level spacing.
 *
 * The Layout components (PageContainer, TopHeader, SubHeader) read defaults
 * from here and also accept prop overrides, so consumers can customize
 * per-instance without forking tokens.
 *
 * Numbers are px. Convert to CSS with {@link toCssSize}.
 */
declare const LAYOUT: {
    readonly contentMarginLeft: 16;
    /** Right margin of the content area. */
    readonly contentMarginRight: 12;
    readonly contentMarginTop: 12;
    readonly contentPaddingLeft: 22;
    readonly contentPaddingRight: 20;
    /** Vertical rhythm — spacing between top-level blocks inside the content area. */
    readonly gap: {
        /** Tight grid gap between adjacent cards. */
        readonly xs: 12;
        /** Default gap between top-level sections. */
        readonly sm: 20;
        /** Wider gap between grouped sections. */
        readonly md: 22;
    };
    /** Fixed height of the top page header row. */
    readonly topHeaderHeight: 64;
    readonly topHeaderPadding: 8;
    readonly subHeaderPaddingTop: 16;
    readonly subHeaderPaddingBottom: 16;
};
type LayoutTokens = typeof LAYOUT;
/** A CSS size accepts either a raw number (treated as px) or a string ("100%", "50vh", ...). */
type CssSize = number | string;
/** Convert a {@link CssSize} to a CSS string ("16" → "16px"; strings pass through). */
declare function toCssSize(value: CssSize): string;

export { type CssSize, LAYOUT, type LayoutTokens, toCssSize };
