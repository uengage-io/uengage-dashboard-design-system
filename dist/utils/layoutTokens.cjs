'use strict';

// src/utils/layoutTokens.ts
var LAYOUT = {
  contentMarginLeft: 16,
  /** Right margin of the content area. */
  contentMarginRight: 12,
  contentMarginTop: 12,
  contentPaddingLeft: 22,
  contentPaddingRight: 20,
  /** Vertical rhythm — spacing between top-level blocks inside the content area. */
  gap: {
    /** Tight grid gap between adjacent cards. */
    xs: 12,
    /** Default gap between top-level sections. */
    sm: 20,
    /** Wider gap between grouped sections. */
    md: 22
  },
  /** Fixed height of the top page header row. */
  topHeaderHeight: 64,
  topHeaderPadding: 8,
  subHeaderPaddingTop: 16,
  subHeaderPaddingBottom: 16
};
function toCssSize(value) {
  return typeof value === "number" ? `${value}px` : value;
}

exports.LAYOUT = LAYOUT;
exports.toCssSize = toCssSize;
//# sourceMappingURL=layoutTokens.cjs.map
//# sourceMappingURL=layoutTokens.cjs.map