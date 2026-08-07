'use strict';

// src/utils/colors.ts
var brand = {
  green: {
    paleGreen: "#C8E7B8",
    lightGreen: "#A5C993",
    softGreen: "#7AB368",
    mintGreen: "#2ACB8D",
    green: "#00A86B",
    darkGreen: "#006F42",
    forestGreen: "#1F5E2C",
    deepGreen: "#003C1B",
    darkerGreen: "#002310",
    darkestGreen: "#001E00"
  }
};
var neutral = {
  0: "#FFFFFF",
  50: "#F9FAFB",
  100: "#F3F4F6",
  200: "#E5E7EB",
  300: "#D1D5DB",
  400: "#9CA3AF",
  500: "#6B7280",
  600: "#4B5563",
  700: "#374151",
  800: "#1F2937",
  900: "#111827"
};
var surface = {
  /** Lightest green tint — used for range fills, pill backgrounds. */
  greenSubtle: "#E6F4EA",
  /** Very light green — used for hover states on buttons/pagination. */
  greenHover: "#EFF8EA",
  /** Light green — used for select pill backgrounds. */
  greenPill: "#C8D8B6"
};
var status = {
  error: {
    border: "#EF4444",
    text: "#B91C1C",
    bg: "#FEE2E2",
    light: "#FF8181"
  },
  warning: {
    border: "#F59E0B",
    text: "#92400E",
    bg: "#FEF3C7",
    light: "#FCDB04"
  },
  success: {
    border: "#10B981",
    text: "#065F46",
    bg: "#D1FAE5"
  },
  info: {
    border: "#3B82F6",
    text: "#1E40AF",
    bg: "#DBEAFE"
  }
};
var interactive = {
  /** Primary brand color — canonical green for checked, active, focused states. */
  primary: brand.green.darkGreen,
  /** Darker primary for focus outlines on light surfaces. */
  primaryDark: brand.green.forestGreen,
  /** Lightest checked/active green for indicators (radio dot, toggle thumb). */
  primaryDeep: brand.green.deepGreen,
  /** Default border for form fields. */
  border: neutral[400],
  /** Hover/focused border for form fields. */
  borderActive: neutral[500],
  /** Disabled border. */
  borderDisabled: neutral[300],
  /** Default body text inside form fields. */
  text: neutral[700],
  /** Strong text (hover, focused, selected). */
  textStrong: neutral[900],
  /** Placeholder text. */
  placeholder: "#C4C9D2",
  /** Disabled text. */
  textDisabled: neutral[400],
  /** Disabled field background. */
  bgDisabled: neutral[50],
  /** Read-only field background. */
  bgReadonly: neutral[50]
};

exports.brand = brand;
exports.interactive = interactive;
exports.neutral = neutral;
exports.status = status;
exports.surface = surface;
//# sourceMappingURL=colors.cjs.map
//# sourceMappingURL=colors.cjs.map