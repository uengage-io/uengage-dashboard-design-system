import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Slot } from "radix-ui";
import { button as buttonColors } from "./buttonColors";

type ColorVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "alertPrimary"
  | "warningPrimary"
  | "alertSecondary";
type ButtonState = "default" | "hover" | "pressed" | "focused" | "disabled";
type ButtonSize = "xs" | "sm" | "md" | "lg";

type StateColors = {
  readonly background: readonly string[] | string;
  readonly border: readonly string[] | string;
  readonly borderWidth: number;
  readonly text: string;
  readonly opacity?: number;
  readonly gradientDirection?: string;
  /** Exact CSS gradient string from Figma — overrides `background` + `gradientDirection` when provided. */
  readonly backgroundGradient?: string;
};

const BASE_CLASSES = [
  "inline-flex flex-row shrink-0 items-center justify-center leading-none",
  "font-['Figtree'] font-medium not-italic",
  "whitespace-nowrap transition-all duration-150 select-none cursor-pointer",
  "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  "disabled:pointer-events-none",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:inline-block",
].join(" ");

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "pt-[6px] pr-[10px] pb-[6px] pl-[8px] gap-[4px] text-[10px] [&_svg]:size-[10px]",
  sm: "pt-[8px] pr-[12px] pb-[8px] pl-[10px] gap-[4px] text-xs [&_svg]:size-[14px]",
  md: "pt-[10px] pr-[14px] pb-[10px] pl-[14px] sm:pt-[12px] sm:pr-[16px] sm:pb-[12px] sm:pl-[16px] gap-[6px] text-sm sm:text-base [&_svg]:size-[15px] sm:[&_svg]:size-[16px]",
  lg: "pt-[14px] pr-[18px] pb-[14px] pl-[18px] sm:pt-[20px] sm:pr-[24px] sm:pb-[20px] sm:pl-[24px] gap-[6px] sm:gap-[8px] text-base sm:text-lg [&_svg]:size-[16px]",
};

const VARIANT_SIZE_OVERRIDES: Partial<
  Record<ColorVariant, Partial<Record<ButtonSize, string>>>
> = {
  alertPrimary: {
    xs: "pt-[2px] pr-[6px] pb-[2px] pl-[6px] gap-[2px] text-[10px] [&_svg]:size-[12px]",
    sm: "pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[2px] text-[12px] [&_svg]:size-[14px]",
    md: "pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] text-[14px] [&_svg]:size-[14px]",
    lg: "pt-[10px] pr-[16px] pb-[10px] pl-[16px] gap-[6px] text-[16px] [&_svg]:size-[16px]",
  },
  alertSecondary: {
    xs: "pt-[2px] pr-[6px] pb-[2px] pl-[6px] gap-[2px] text-[10px] [&_svg]:size-[12px]",
    sm: "pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[2px] text-[12px] [&_svg]:size-[14px]",
    md: "pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] text-[14px] [&_svg]:size-[14px]",
    lg: "pt-[10px] pr-[16px] pb-[10px] pl-[16px] gap-[6px] text-[16px] [&_svg]:size-[16px]",
  },
  warningPrimary: {
    xs: "pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[2px] text-[10px] [&_svg]:size-[12px]",
    sm: "pt-[8px] pr-[12px] pb-[8px] pl-[10px] gap-[4px] text-[12px] [&_svg]:size-[14px]",
    md: "pt-[10px] pr-[14px] pb-[10px] pl-[12px] gap-[4px] text-[14px] [&_svg]:size-[14px]",
    lg: "pt-[14px] pr-[18px] pb-[14px] pl-[16px] gap-[6px] text-[16px] [&_svg]:size-[16px]",
  },
};

/** Kept for backward-compat export — not used internally for className. */
const buttonVariants = cva(BASE_CLASSES, {
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: { size: "md" },
});

function toGradientCSS(value: readonly string[] | string, direction = "to bottom"): string {
  if (typeof value === "string") {
    return `linear-gradient(${value}, ${value})`;
  }
  if (value.length === 1) {
    return `linear-gradient(${value[0]}, ${value[0]})`;
  }
  return `linear-gradient(${direction}, ${value[0]}, ${value[1]})`;
}

function resolveStateColors(
  variant: ColorVariant,
  state: ButtonState,
): StateColors | undefined {
  const variantColors = buttonColors[variant] as
    | Record<string, StateColors>
    | undefined;
  if (!variantColors) return undefined;
  return (variantColors[state] ?? variantColors.default) as
    | StateColors
    | undefined;
}

const VARIANT_BORDER_WIDTH: Partial<Record<ColorVariant, number>> = {
  alertPrimary: 1,
  alertSecondary: 1,
  warningPrimary: 1,
};

const VARIANT_BORDER_RADIUS: Partial<Record<ColorVariant, number>> = {
  alertPrimary: 20,
  alertSecondary: 20,
};

function getButtonStyle(
  variant: ColorVariant,
  state: ButtonState,
): React.CSSProperties {
  const colors = resolveStateColors(variant, state);
  if (!colors) return {};

  const borderWidth = VARIANT_BORDER_WIDTH[variant] ?? colors.borderWidth;
  const borderRadius = VARIANT_BORDER_RADIUS[variant] ?? 30;

  // Tertiary uses plain solid borders — no gradient padding-box/border-box trick.
  // This keeps the background genuinely transparent in every state that declares it.
  if (variant === "tertiary") {
    const bg = colors.backgroundGradient
      ? colors.backgroundGradient
      : colors.background === "transparent"
        ? "transparent"
        : Array.isArray(colors.background)
          ? colors.background[0]
          : colors.background;

    const borderColor =
      colors.border === "transparent"
        ? "transparent"
        : Array.isArray(colors.border)
          ? colors.border[0]
          : colors.border;

    const style: React.CSSProperties = {
      background: bg,
      border: `${borderWidth}px solid ${borderColor}`,
      borderRadius,
      color: colors.text,
      boxShadow: "none",
    };

    if (colors.opacity !== undefined) {
      style.opacity = colors.opacity;
    }

    return style;
  }

  const dir = colors.gradientDirection ?? "to bottom"
  const borderCSS = toGradientCSS(colors.border, dir);
  const innerCSS = colors.backgroundGradient
    ? colors.backgroundGradient
    : colors.background === "transparent"
      ? "linear-gradient(var(--btn-stroke-bg, #fff), var(--btn-stroke-bg, #fff))"
      : toGradientCSS(colors.background, dir);

  const insetShadow = "0px 2px 4px 0px #0000000A inset";
  const liftShadow = "2px 2px 4px 0px #0000001F";
  const noLiftVariants: ColorVariant[] = ["secondary"];
  const boxShadow =
    state === "disabled"
      ? "none"
      : state === "hover" || state === "pressed"
        ? noLiftVariants.includes(variant)
          ? insetShadow
          : `${insetShadow}, ${liftShadow}`
        : insetShadow;

  // When backgroundGradient contains rgba transparency a solid white backing is
  // needed so the border-box layer doesn't bleed through the transparent stop.
  // Must use linear-gradient() — plain color values are invalid as bg-image layers.
  const backgroundValue = colors.backgroundGradient
    ? `${innerCSS} padding-box, linear-gradient(#FFFFFF, #FFFFFF) padding-box, ${borderCSS} border-box`
    : `${innerCSS} padding-box, ${borderCSS} border-box`

  const style: React.CSSProperties = {
    background: backgroundValue,
    border: `${borderWidth}px solid transparent`,
    borderRadius,
    color: colors.text,
    boxShadow,
  };

  if (colors.opacity !== undefined) {
    style.opacity = colors.opacity;
  }

  return style;
}

interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "title">,
    VariantProps<typeof buttonVariants> {
  variant?: ColorVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
  /** Shows a spinner, hides label + icons, blocks clicks, and sets aria-busy. */
  loading?: boolean;
  /** Custom icon rendered while `loading`. Defaults to a spinning `Loader2`. */
  loadingIcon?: React.ReactNode;
  /** Text label. Used when `children` is not provided. */
  title?: React.ReactNode;
}

function Button({
  className,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  loadingIcon,
  asChild = false,
  style,
  title,
  children,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onFocus,
  onBlur,
  ...props
}: ButtonProps) {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const interactionBlocked = disabled || loading;

  const state: ButtonState = disabled
    ? "disabled"
    : pressed
      ? "pressed"
      : hovered
        ? "hover"
        : focused
          ? "focused"
          : "default";

  const gradientStyle = getButtonStyle(variant, state);
  const sizeClass =
    VARIANT_SIZE_OVERRIDES[variant]?.[size] ?? SIZE_CLASSES[size];
  const Comp = asChild ? Slot.Root : "button";
  const tertiaryClass = variant === "tertiary" ? "underline" : "";

  const spinner = loadingIcon ?? (
    <Loader2 className="animate-spin" aria-hidden="true" />
  );
  const content = children ?? title;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-state={state}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      className={`uengage-ui ${BASE_CLASSES} ${sizeClass}${tertiaryClass ? ` ${tertiaryClass}` : ""}${className ? ` ${className}` : ""}`}
      style={{ ...gradientStyle, ...style }}
      disabled={interactionBlocked}
      onPointerEnter={(e: React.PointerEvent<HTMLButtonElement>) => {
        setHovered(true);
        onPointerEnter?.(e);
      }}
      onPointerLeave={(e: React.PointerEvent<HTMLButtonElement>) => {
        setHovered(false);
        setPressed(false);
        onPointerLeave?.(e);
      }}
      onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
        setPressed(true);
        onPointerDown?.(e);
      }}
      onPointerUp={(e: React.PointerEvent<HTMLButtonElement>) => {
        setPressed(false);
        onPointerUp?.(e);
      }}
      onFocus={(e: React.FocusEvent<HTMLButtonElement>) => {
        try {
          if (e.target.matches(":focus-visible")) setFocused(true);
        } catch {
          // Safari < 15.4 throws SyntaxError for :focus-visible in matches()
          setFocused(true);
        }
        onFocus?.(e);
      }}
      onBlur={(e: React.FocusEvent<HTMLButtonElement>) => {
        setFocused(false);
        onBlur?.(e);
      }}
      {...props}
    >
      {loading ? (
        spinner
      ) : (
        <>
          {leftIcon}
          {content}
          {rightIcon}
        </>
      )}
    </Comp>
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps, ColorVariant, ButtonSize, ButtonState };
