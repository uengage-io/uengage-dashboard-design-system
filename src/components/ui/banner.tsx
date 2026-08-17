import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Tokens                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Semantic tones. `error` is kept as a backwards-compatible alias of `danger`
 * so existing `<Banner variant="error" />` call sites keep working.
 */
export type BannerTone =
  | "info"
  | "warning"
  | "danger"
  | "error"
  | "success"
  | "neutral";

/** Canonical tone after `error` has been folded into `danger`. */
export type BannerToneKey = "info" | "warning" | "danger" | "success" | "neutral";

export type BannerSize = "sm" | "md" | "lg";

export type BannerAppearance = "light" | "dark";

export type BannerPlacement = "global" | "page" | "section" | "inline";

export interface BannerPalette {
  /** Tinted surface. */
  bg: string;
  /** 1px border — one step darker than the surface. */
  border: string;
  /** Title ink. */
  ink: string;
  /** Icon stroke. */
  icon: string;
  /** Body ink. On light surfaces this is the title ink at `bodyOpacity`. */
  body: string;
  bodyOpacity: number;
  /** Outline-action border. */
  btnBorder: string;
  btnBg: string;
  btnBgHover: string;
  /** Progress track / fill. */
  track: string;
  fill: string;
}

/** Ink surfaces used by the pinned global bar. */
export interface BannerBarPalette {
  bg: string;
  ink: string;
  accent: string;
  muted: string;
}

export interface BannerSizeSpec {
  radius: number;
  padY: number;
  padX: number;
  gap: number;
  icon: number;
  /** Title and body font size. */
  fs: number;
  btnH: number;
  btnPadX: number;
  btnFs: number;
  /** `sm` drops the body line entirely — one sentence, one action. */
  showDescription: boolean;
  closeSize: number;
  closeIcon: number;
}

export const BANNER_SIZES: Record<BannerSize, BannerSizeSpec> = {
  sm: {
    radius: 8,
    padY: 9,
    padX: 12,
    gap: 9,
    icon: 14,
    fs: 11,
    btnH: 26,
    btnPadX: 10,
    btnFs: 10,
    showDescription: false,
    closeSize: 22,
    closeIcon: 11,
  },
  md: {
    radius: 10,
    padY: 13,
    padX: 15,
    gap: 11,
    icon: 17,
    fs: 12,
    btnH: 29,
    btnPadX: 12,
    btnFs: 11,
    showDescription: true,
    closeSize: 24,
    closeIcon: 12,
  },
  lg: {
    radius: 12,
    padY: 16,
    padX: 18,
    gap: 13,
    icon: 20,
    fs: 13,
    btnH: 34,
    btnPadX: 14,
    btnFs: 12,
    showDescription: true,
    closeSize: 26,
    closeIcon: 13,
  },
};

const LIGHT_PALETTE: Record<BannerToneKey, BannerPalette> = {
  info: {
    bg: "#E6F4FC",
    border: "#C6E4F5",
    ink: "#0B5E88",
    icon: "#0B5E88",
    body: "#0B5E88",
    bodyOpacity: 0.82,
    btnBorder: "#A9D3EC",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(11,94,136,.16)",
    fill: "#0B5E88",
  },
  warning: {
    bg: "#FFF6D6",
    border: "#EFD98A",
    ink: "#6A5300",
    icon: "#6A5300",
    body: "#6A5300",
    bodyOpacity: 0.82,
    btnBorder: "#E0C866",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(106,83,0,.16)",
    fill: "#6A5300",
  },
  danger: {
    bg: "#FBE2E4",
    border: "#F2C8CC",
    ink: "#A8000F",
    icon: "#A8000F",
    body: "#A8000F",
    bodyOpacity: 0.86,
    btnBorder: "#E4A6AC",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(168,0,15,.16)",
    fill: "#A8000F",
  },
  success: {
    bg: "#FAFFF7",
    border: "#CDE3C0",
    ink: "#003C1B",
    icon: "#003C1B",
    body: "#003C1B",
    bodyOpacity: 0.78,
    btnBorder: "#BFD6C6",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(0,60,27,.14)",
    fill: "#00A86B",
  },
  neutral: {
    bg: "#F3F5F9",
    border: "#E2E2E2",
    ink: "#595959",
    icon: "#595959",
    body: "#595959",
    bodyOpacity: 0.82,
    btnBorder: "#D4D8DE",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(89,89,89,.16)",
    fill: "#595959",
  },
};

/** Tints drop to a dark mix of the same hue; ink text becomes the light tint of it. */
const DARK_PALETTE: Record<BannerToneKey, BannerPalette> = {
  info: {
    bg: "#10293A",
    border: "#1E4560",
    ink: "#A5D8F2",
    icon: "#4BADE3",
    body: "#7FA8BF",
    bodyOpacity: 1,
    btnBorder: "#2A5876",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(165,216,242,.18)",
    fill: "#4BADE3",
  },
  warning: {
    bg: "#2E2611",
    border: "#4A3E1C",
    ink: "#F0DA9A",
    icon: "#F5C518",
    body: "#BFAE73",
    bodyOpacity: 1,
    btnBorder: "#5A4C24",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(240,218,154,.18)",
    fill: "#F5C518",
  },
  danger: {
    bg: "#2A1416",
    border: "#4A2226",
    ink: "#F2A0A6",
    icon: "#F2A0A6",
    body: "#C98A8F",
    bodyOpacity: 1,
    btnBorder: "#5C2A2F",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(242,160,166,.18)",
    fill: "#F2A0A6",
  },
  success: {
    bg: "#1B3423",
    border: "#2C4A38",
    ink: "#DCF3CE",
    icon: "#8CC42A",
    body: "#8FB79C",
    bodyOpacity: 1,
    btnBorder: "#37563F",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(220,243,206,.18)",
    fill: "#8CC42A",
  },
  neutral: {
    bg: "#1A1F1C",
    border: "#2E3532",
    ink: "#D6DBD8",
    icon: "#9CACA3",
    body: "#94A09A",
    bodyOpacity: 1,
    btnBorder: "#3A423E",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(214,219,216,.18)",
    fill: "#9CACA3",
  },
};

export const BANNER_BAR_PALETTE: Record<BannerToneKey, BannerBarPalette> = {
  info: { bg: "#0B3B54", ink: "#E2F3FC", accent: "#7FD0F5", muted: "#8FB0C2" },
  warning: { bg: "#3B2F05", ink: "#FBF3D9", accent: "#F5C518", muted: "#B7A87A" },
  danger: { bg: "#3A0206", ink: "#FBE2E4", accent: "#F2A0A6", muted: "#B98A8D" },
  success: { bg: "#003C1B", ink: "#E4F3E8", accent: "#8CC42A", muted: "#8FB79C" },
  neutral: { bg: "#202020", ink: "#EEEEEE", accent: "#C6C6C6", muted: "#9C9C9C" },
};

/** Folds the legacy `error` alias into `danger`. */
export function toBannerToneKey(tone: BannerTone | null | undefined): BannerToneKey {
  return tone === "error" ? "danger" : (tone ?? "info");
}

export function getBannerPalette(
  tone: BannerTone | null | undefined,
  appearance: BannerAppearance = "light",
): BannerPalette {
  const key = toBannerToneKey(tone);
  return appearance === "dark" ? DARK_PALETTE[key] : LIGHT_PALETTE[key];
}

/** Severity order used when a stack has to pick which banner shows in full. */
export const BANNER_TONE_SEVERITY: Record<BannerToneKey, number> = {
  danger: 4,
  warning: 3,
  info: 2,
  success: 1,
  neutral: 0,
};

/** Small dot colour used by the collapsed-stack counter. */
export const BANNER_TONE_DOT: Record<BannerToneKey, string> = {
  info: "#4BADE3",
  warning: "#F5C518",
  danger: "#A8000F",
  success: "#00A86B",
  neutral: "#9C9C9C",
};

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                 */
/* -------------------------------------------------------------------------- */

const bannerVariants = cva(
  "relative flex w-full min-w-0 flex-row overflow-hidden text-left",
  {
    variants: {
      variant: {
        info: "",
        success: "",
        error: "",
        danger: "",
        warning: "",
        neutral: "",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: { variant: "info", size: "md" },
  },
);

export interface BannerRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof bannerVariants> {
  /** Light tinted surface (default) or the dark-surface mix of the same hue. */
  appearance?: BannerAppearance;
}

/**
 * The tinted surface: a semantic `-bg` token with a 1px border one step darker.
 * Never a left accent stripe.
 */
const BannerRoot = React.forwardRef<HTMLDivElement, BannerRootProps>(
  ({ className, variant, size, appearance = "light", style, ...props }, ref) => {
    const spec = BANNER_SIZES[(size ?? "md") as BannerSize];
    const palette = getBannerPalette(variant as BannerTone, appearance);
    const isAlert = toBannerToneKey(variant as BannerTone) === "danger";

    return (
      <div
        ref={ref}
        role={isAlert ? "alert" : "status"}
        aria-live={isAlert ? "assertive" : "polite"}
        className={cn(bannerVariants({ variant, size }), className)}
        style={{
          background: palette.bg,
          border: `1px solid ${palette.border}`,
          borderRadius: spec.radius,
          color: palette.ink,
          ...style,
        }}
        {...props}
      />
    );
  },
);
BannerRoot.displayName = "Banner";

export interface BannerIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Rendered box in px. Defaults to the `md` size icon (17). */
  size?: number;
  /** Nudges the icon onto the optical baseline of the first line. */
  align?: "start" | "center";
}

/** 17px at the `md` size, 2px stroke, top-aligned to the first line. */
const BannerIcon = React.forwardRef<HTMLSpanElement, BannerIconProps>(
  ({ className, style, size = BANNER_SIZES.md.icon, align = "start", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "block shrink-0 [&>svg]:h-full [&>svg]:w-full",
        className,
      )}
      style={{
        width: size,
        height: size,
        flex: "none",
        marginTop: align === "start" ? 1 : 0,
        color: "var(--banner-icon, currentColor)",
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  ),
);
BannerIcon.displayName = "BannerIcon";

const BannerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex min-w-0 flex-1 flex-col", className)}
    {...props}
  />
));
BannerContent.displayName = "BannerContent";

/** 600 weight, full ink. One line, no full stop. */
const BannerTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, style, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("min-w-0", className)}
    style={{ fontWeight: 600, lineHeight: 1.4, textWrap: "pretty", ...style }}
    {...props}
  />
));
BannerTitle.displayName = "BannerTitle";

/** 400 weight, the same ink at 82% — never a separate grey. */
const BannerDescription = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, style, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("min-w-0", className)}
    style={{ fontWeight: 400, lineHeight: 1.5, textWrap: "pretty", ...style }}
    {...props}
  />
));
BannerDescription.displayName = "BannerDescription";

/** Outline action on a translucent white, vertically centred. */
const BannerAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      "flex shrink-0 cursor-pointer items-center justify-center rounded-lg font-semibold",
      "bg-(--banner-btn-bg) transition-colors duration-120 hover:bg-(--banner-btn-bg-hover)",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
BannerAction.displayName = "BannerAction";

const BannerClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = "button", "aria-label": ariaLabel = "Dismiss", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    aria-label={ariaLabel}
    className={cn(
      "flex shrink-0 cursor-pointer items-center justify-center rounded-[7px] border-0 bg-transparent",
      "opacity-60 transition-all duration-120 hover:bg-white/60 hover:opacity-100",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
      className,
    )}
    {...props}
  />
));
BannerClose.displayName = "BannerClose";

export {
  BannerRoot,
  BannerIcon,
  BannerContent,
  BannerTitle,
  BannerDescription,
  BannerAction,
  BannerClose,
  bannerVariants,
};
export type { VariantProps };
