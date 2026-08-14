import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
export { VariantProps } from 'class-variance-authority';

/**
 * Semantic tones. `error` is kept as a backwards-compatible alias of `danger`
 * so existing `<Banner variant="error" />` call sites keep working.
 */
type BannerTone = "info" | "warning" | "danger" | "error" | "success" | "neutral";
/** Canonical tone after `error` has been folded into `danger`. */
type BannerToneKey = "info" | "warning" | "danger" | "success" | "neutral";
type BannerSize = "sm" | "md" | "lg";
type BannerAppearance = "light" | "dark";
type BannerPlacement = "global" | "page" | "section" | "inline";
interface BannerPalette {
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
interface BannerBarPalette {
    bg: string;
    ink: string;
    accent: string;
    muted: string;
}
interface BannerSizeSpec {
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
declare const BANNER_SIZES: Record<BannerSize, BannerSizeSpec>;
declare const BANNER_BAR_PALETTE: Record<BannerToneKey, BannerBarPalette>;
/** Folds the legacy `error` alias into `danger`. */
declare function toBannerToneKey(tone: BannerTone | null | undefined): BannerToneKey;
declare function getBannerPalette(tone: BannerTone | null | undefined, appearance?: BannerAppearance): BannerPalette;
/** Severity order used when a stack has to pick which banner shows in full. */
declare const BANNER_TONE_SEVERITY: Record<BannerToneKey, number>;
/** Small dot colour used by the collapsed-stack counter. */
declare const BANNER_TONE_DOT: Record<BannerToneKey, string>;
declare const bannerVariants: (props?: ({
    variant?: "success" | "warning" | "error" | "danger" | "info" | "neutral" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BannerRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, VariantProps<typeof bannerVariants> {
    /** Light tinted surface (default) or the dark-surface mix of the same hue. */
    appearance?: BannerAppearance;
}
/**
 * The tinted surface: a semantic `-bg` token with a 1px border one step darker.
 * Never a left accent stripe.
 */
declare const BannerRoot: React.ForwardRefExoticComponent<BannerRootProps & React.RefAttributes<HTMLDivElement>>;
interface BannerIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Rendered box in px. Defaults to the `md` size icon (17). */
    size?: number;
    /** Nudges the icon onto the optical baseline of the first line. */
    align?: "start" | "center";
}
/** 17px at the `md` size, 2px stroke, top-aligned to the first line. */
declare const BannerIcon: React.ForwardRefExoticComponent<BannerIconProps & React.RefAttributes<HTMLSpanElement>>;
declare const BannerContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/** 600 weight, full ink. One line, no full stop. */
declare const BannerTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
/** 400 weight, the same ink at 82% — never a separate grey. */
declare const BannerDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
/** Outline action on a translucent white, vertically centred. */
declare const BannerAction: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
declare const BannerClose: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;

export { BANNER_BAR_PALETTE, BANNER_SIZES, BANNER_TONE_DOT, BANNER_TONE_SEVERITY, BannerAction, type BannerAppearance, type BannerBarPalette, BannerClose, BannerContent, BannerDescription, BannerIcon, type BannerIconProps, type BannerPalette, type BannerPlacement, BannerRoot, type BannerRootProps, type BannerSize, type BannerSizeSpec, BannerTitle, type BannerTone, type BannerToneKey, bannerVariants, getBannerPalette, toBannerToneKey };
