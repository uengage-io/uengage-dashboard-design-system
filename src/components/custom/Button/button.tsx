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
  readonly background: string;
  /** Optional gradient layered on top of `background` — kept out of the
   * transition so it can't leave the solid `background` colour exposed
   * mid-animation (the cause of a white flash on hover/press). */
  readonly backgroundImage?: string;
  readonly border: string;
  readonly borderWidth: number;
  readonly text: string;
  readonly boxShadow?: string;
};

const BASE_CLASSES = [
  "inline-flex flex-row shrink-0 items-center justify-center leading-none",
  "font-['Figtree'] font-medium not-italic",
  "whitespace-nowrap select-none cursor-pointer",
  "transition-[background-color,box-shadow,transform,border-color,color] duration-[140ms] ease-[cubic-bezier(0.2,0.8,0.3,1)]",
  "outline-none",
  "disabled:pointer-events-none disabled:cursor-not-allowed",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:inline-block",
].join(" ");

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "h-[28px] px-[10px] gap-[4px] text-[11px] [&_svg]:size-[14px]",
  sm: "h-[32px] px-[12px] gap-[4px] text-[12px] [&_svg]:size-[15px]",
  md: "h-[40px] px-[16px] gap-[6px] text-[13px] [&_svg]:size-[16px]",
  lg: "h-[48px] px-[20px] gap-[8px] text-[15px] [&_svg]:size-[20px]",
};

/** Tertiary uses a tighter horizontal padding than the other variants — every
 * other size property (height, font, gap, icon) matches SIZE_CLASSES. */
const VARIANT_SIZE_OVERRIDES: Partial<
  Record<ColorVariant, Partial<Record<ButtonSize, string>>>
> = {
  tertiary: {
    xs: "h-[28px] px-[8px] gap-[4px] text-[11px] [&_svg]:size-[14px]",
    sm: "h-[32px] px-[10px] gap-[4px] text-[12px] [&_svg]:size-[15px]",
    md: "h-[40px] px-[13px] gap-[6px] text-[13px] [&_svg]:size-[16px]",
    lg: "h-[48px] px-[16px] gap-[8px] text-[15px] [&_svg]:size-[20px]",
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

const RADIUS_BY_SIZE: Record<ButtonSize, number> = {
  xs: 8,
  sm: 9,
  md: 10,
  lg: 12,
};

function getButtonStyle(
  variant: ColorVariant,
  state: ButtonState,
  size: ButtonSize,
  loading: boolean,
): React.CSSProperties {
  const colors = resolveStateColors(variant, state);
  if (!colors) return {};

  const borderRadius = RADIUS_BY_SIZE[size];
  const boxShadow = loading ? "none" : (colors.boxShadow ?? "none");

  const style: React.CSSProperties = {
    backgroundColor: colors.background,
    backgroundImage: colors.backgroundImage ?? "none",
    border:
      colors.borderWidth > 0
        ? `${colors.borderWidth}px solid ${colors.border}`
        : "none",
    borderRadius,
    color: colors.text,
    boxShadow,
  };

  if (state === "pressed") {
    style.transform = "scale(0.985)";
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

  const gradientStyle = getButtonStyle(variant, state, size, loading);
  const sizeClass =
    VARIANT_SIZE_OVERRIDES[variant]?.[size] ?? SIZE_CLASSES[size];
  const Comp = asChild ? Slot.Root : "button";

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
      className={`uengage-ui ${BASE_CLASSES} ${sizeClass}${className ? ` ${className}` : ""}`}
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
