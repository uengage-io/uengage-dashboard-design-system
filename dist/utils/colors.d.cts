/**
 * Color tokens — single source of truth for all palette values.
 *
 * Import tokens from here rather than hardcoding hex values in components.
 * Names describe hue/role, not usage, so they stay meaningful wherever reused.
 */
declare const brand: {
    readonly green: {
        readonly paleGreen: "#C8E7B8";
        readonly lightGreen: "#A5C993";
        readonly softGreen: "#7AB368";
        readonly mintGreen: "#2ACB8D";
        readonly green: "#00A86B";
        readonly darkGreen: "#006F42";
        readonly forestGreen: "#1F5E2C";
        readonly deepGreen: "#003C1B";
        readonly darkerGreen: "#002310";
        readonly darkestGreen: "#001E00";
    };
};
type BrandGreen = keyof typeof brand.green;
declare const neutral: {
    readonly 0: "#FFFFFF";
    readonly 50: "#F9FAFB";
    readonly 100: "#F3F4F6";
    readonly 200: "#E5E7EB";
    readonly 300: "#D1D5DB";
    readonly 400: "#9CA3AF";
    readonly 500: "#6B7280";
    readonly 600: "#4B5563";
    readonly 700: "#374151";
    readonly 800: "#1F2937";
    readonly 900: "#111827";
};
type NeutralStep = keyof typeof neutral;
declare const surface: {
    /** Lightest green tint — used for range fills, pill backgrounds. */
    readonly greenSubtle: "#E6F4EA";
    /** Very light green — used for hover states on buttons/pagination. */
    readonly greenHover: "#EFF8EA";
    /** Light green — used for select pill backgrounds. */
    readonly greenPill: "#C8D8B6";
};
declare const status: {
    readonly error: {
        readonly border: "#EF4444";
        readonly text: "#B91C1C";
        readonly bg: "#FEE2E2";
        readonly light: "#FF8181";
    };
    readonly warning: {
        readonly border: "#F59E0B";
        readonly text: "#92400E";
        readonly bg: "#FEF3C7";
        readonly light: "#FCDB04";
    };
    readonly success: {
        readonly border: "#10B981";
        readonly text: "#065F46";
        readonly bg: "#D1FAE5";
    };
    readonly info: {
        readonly border: "#3B82F6";
        readonly text: "#1E40AF";
        readonly bg: "#DBEAFE";
    };
};
declare const interactive: {
    /** Primary brand color — canonical green for checked, active, focused states. */
    readonly primary: "#006F42";
    /** Darker primary for focus outlines on light surfaces. */
    readonly primaryDark: "#1F5E2C";
    /** Lightest checked/active green for indicators (radio dot, toggle thumb). */
    readonly primaryDeep: "#003C1B";
    /** Default border for form fields. */
    readonly border: "#9CA3AF";
    /** Hover/focused border for form fields. */
    readonly borderActive: "#6B7280";
    /** Disabled border. */
    readonly borderDisabled: "#D1D5DB";
    /** Default body text inside form fields. */
    readonly text: "#374151";
    /** Strong text (hover, focused, selected). */
    readonly textStrong: "#111827";
    /** Placeholder text. */
    readonly placeholder: "#C4C9D2";
    /** Disabled text. */
    readonly textDisabled: "#9CA3AF";
    /** Disabled field background. */
    readonly bgDisabled: "#F9FAFB";
    /** Read-only field background. */
    readonly bgReadonly: "#F9FAFB";
};

export { type BrandGreen, type NeutralStep, brand, interactive, neutral, status, surface };
