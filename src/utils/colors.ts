/**
 * Brand colors — single source of truth.
 *
 * Import tokens from here rather than hardcoding hex values in components.
 * Names describe the color's hue, not its usage, so tokens stay meaningful
 * regardless of where they get reused.
 */
export const brand = {
  green: {
    // Ordered from lightest to darkest
    paleGreen: "#C8E7B8",
    lightGreen: "#A5C993",
    softGreen: "#7AB368",
    mintGreen: "#2ACB8D",
    green: "#00A86B",
    darkGreen: "#006F42",
    forestGreen: "#1F5E2C",
    deepGreen: "#003C1B",
    darkerGreen: "#002310",
    darkestGreen: "#001E00",
  },
} as const;

export type BrandGreen = keyof typeof brand.green;





