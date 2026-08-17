import * as React from "react";
import { Check, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BANNER_BAR_PALETTE,
  BANNER_SIZES,
  BannerAction as BannerActionButton,
  BannerClose,
  BannerContent,
  BannerDescription,
  BannerIcon,
  BannerRoot,
  BannerTitle,
  getBannerPalette,
  toBannerToneKey,
} from "@/components/ui/banner";
import type {
  BannerPalette,
  BannerSizeSpec,
  BannerToneKey,
} from "@/components/ui/banner";
import type { BannerAction, BannerProps } from "./Banner.types";

/* -------------------------------------------------------------------------- */
/*  Tone icons — 2px stroke, top-aligned to the first line                     */
/* -------------------------------------------------------------------------- */

const DEFAULT_ICONS: Record<BannerToneKey, React.ReactNode> = {
  info: <Info strokeWidth={2} />,
  warning: <TriangleAlert strokeWidth={2} />,
  danger: <CircleX strokeWidth={2} />,
  success: <Check strokeWidth={2.4} />,
  neutral: <Info strokeWidth={2} />,
};

/** The one banner allowed a gradient button. */
const CALLOUT_BUTTON: Record<
  BannerToneKey,
  { from: string; to: string; hover: string; secondary: string }
> = {
  info: { from: "#1478A8", to: "#0B5E88", hover: "#094E70", secondary: "#0B5E88" },
  warning: { from: "#8A6D06", to: "#6A5300", hover: "#574400", secondary: "#6A5300" },
  danger: { from: "#C4141F", to: "#A8000F", hover: "#8C000C", secondary: "#A8000F" },
  success: { from: "#0A5A2C", to: "#003C1B", hover: "#00331A", secondary: "#1F5E2C" },
  neutral: { from: "#6E6E6E", to: "#595959", hover: "#4A4A4A", secondary: "#595959" },
};

const CALLOUT_TILE: Record<string, number> = { sm: 30, md: 36, lg: 42 };
const CALLOUT_TITLE_FS: Record<string, number> = { sm: 13, md: 14, lg: 16 };

const DISMISS_STORAGE_PREFIX = "ue-banner-dismissed:";

function readDismissed(dismissId?: string) {
  if (!dismissId || typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(DISMISS_STORAGE_PREFIX + dismissId) === "1";
  } catch {
    return false;
  }
}

function persistDismissed(dismissId?: string) {
  if (!dismissId || typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DISMISS_STORAGE_PREFIX + dismissId, "1");
  } catch {
    /* storage unavailable — dismissal is session-only */
  }
}

/** Clears a remembered dismissal so the banner can come back. */
export function resetBannerDismissal(dismissId: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DISMISS_STORAGE_PREFIX + dismissId);
  } catch {
    /* nothing to clear */
  }
}

/* -------------------------------------------------------------------------- */
/*  Action                                                                     */
/* -------------------------------------------------------------------------- */

function ActionNode({
  action,
  spec,
  palette,
  ink,
  fallbackVariant,
}: {
  action: BannerAction;
  spec: BannerSizeSpec;
  palette: BannerPalette;
  ink: string;
  fallbackVariant: "button" | "link";
}) {
  const variant = action.variant ?? fallbackVariant;
  const { label, onClick, disabled, href, target, rel } = action;

  if (variant === "link") {
    const linkStyle: React.CSSProperties = {
      fontWeight: 600,
      fontSize: spec.btnFs,
      lineHeight: 1,
      color: ink,
      background: "transparent",
      border: 0,
      padding: 0,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      flex: "none",
      whiteSpace: "nowrap",
    };
    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          aria-label={action["aria-label"]}
          style={linkStyle}
          className="underline-offset-2 hover:underline"
        >
          {label}
        </a>
      );
    }
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={action["aria-label"]}
        style={linkStyle}
        className="underline-offset-2 hover:underline"
      >
        {label}
      </button>
    );
  }

  const buttonStyle = {
    height: spec.btnH,
    padding: `0 ${spec.btnPadX}px`,
    fontSize: spec.btnFs,
    lineHeight: 1,
    color: ink,
    border: `1px solid ${palette.btnBorder}`,
    whiteSpace: "nowrap",
    ["--banner-btn-bg" as string]: palette.btnBg,
    ["--banner-btn-bg-hover" as string]: palette.btnBgHover,
  } as React.CSSProperties;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={action["aria-label"]}
        style={buttonStyle}
        className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-(--banner-btn-bg) font-semibold transition-colors duration-120 hover:bg-(--banner-btn-bg-hover)"
      >
        {label}
      </a>
    );
  }

  return (
    <BannerActionButton onClick={onClick} disabled={disabled} aria-label={action["aria-label"]} style={buttonStyle}>
      {label}
    </BannerActionButton>
  );
}

/* -------------------------------------------------------------------------- */
/*  Banner                                                                     */
/* -------------------------------------------------------------------------- */

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  function Banner(
    {
      variant,
      tone,
      size,
      placement = "section",
      layout = "default",
      appearance = "light",
      title,
      description,
      message,
      children,
      items,
      maxItems = 3,
      renderMoreItems,
      action,
      secondaryAction,
      actionPlacement = "inline",
      icon,
      showIcon = true,
      dismissible = false,
      dismissId,
      onDismiss,
      open,
      onOpenChange,
      autoDismiss,
      progress,
      progressLabel,
      expiryProgress,
      role,
      className,
      contentClassName,
      backgroundColor,
      borderColor,
      iconColor,
      textColor,
      style,
      ...rest
    },
    ref,
  ) {
    const resolvedTone = tone ?? variant ?? "info";
    const toneKey = toBannerToneKey(resolvedTone);
    const resolvedSize = size ?? (placement === "inline" ? "sm" : "md");
    const spec = BANNER_SIZES[resolvedSize];
    const palette = getBannerPalette(resolvedTone, appearance);

    const ink = textColor ?? palette.ink;
    const bodyInk = textColor ?? palette.body;
    const iconInk = iconColor ?? palette.icon;

    /* ---- visibility ---------------------------------------------------- */

    const [internalOpen, setInternalOpen] = React.useState(true);
    const [remembered, setRemembered] = React.useState(false);

    React.useEffect(() => {
      setRemembered(readDismissed(dismissId));
    }, [dismissId]);

    const isOpen = open ?? (internalOpen && !remembered);

    const close = React.useCallback(() => {
      persistDismissed(dismissId);
      if (open === undefined) setInternalOpen(false);
      onOpenChange?.(false);
      onDismiss?.();
    }, [dismissId, onDismiss, onOpenChange, open]);

    /* ---- auto-expiry ---------------------------------------------------- */

    const closeRef = React.useRef(close);
    closeRef.current = close;

    const [expiry, setExpiry] = React.useState(100);

    React.useEffect(() => {
      if (!autoDismiss || autoDismiss <= 0 || !isOpen) return;
      const start = Date.now();
      setExpiry(100);
      const id = window.setInterval(() => {
        const left = Math.max(0, 100 - ((Date.now() - start) / autoDismiss) * 100);
        setExpiry(left);
        if (left <= 0) {
          window.clearInterval(id);
          closeRef.current();
        }
      }, 60);
      return () => window.clearInterval(id);
    }, [autoDismiss, isOpen]);

    if (!isOpen) return null;

    /* ---- copy ------------------------------------------------------------ */

    const body = children ?? message;
    const heading = title ?? body;
    const detail = title !== undefined && title !== null ? (description ?? body) : description;
    const showDetail = spec.showDescription && detail !== undefined && detail !== null && detail !== "";

    const visibleItems = items?.slice(0, maxItems) ?? [];
    const hiddenItems = Math.max(0, (items?.length ?? 0) - visibleItems.length);

    const isBusy = progress !== undefined && progress !== null;
    const progressValue = typeof progress === "number" ? Math.min(100, Math.max(0, progress)) : null;

    const hasRule = (autoDismiss !== undefined && autoDismiss > 0) || expiryProgress !== undefined;
    const rulePct = expiryProgress ?? expiry;

    const resolvedRole = role ?? (toneKey === "danger" ? "alert" : "status");

    /* ---- global bar ------------------------------------------------------ */

    if (placement === "global") {
      const bar = BANNER_BAR_PALETTE[toneKey];
      const barBg = backgroundColor ?? bar.bg;
      const barInk = textColor ?? bar.ink;
      const barAccent = iconColor ?? bar.accent;

      return (
        <div
          ref={ref}
          role={resolvedRole}
          aria-live={toneKey === "danger" ? "assertive" : "polite"}
          className={cn("flex w-full flex-wrap items-center justify-center", className)}
          style={{
            gap: spec.gap,
            padding: `${spec.padY - 3}px 16px`,
            background: barBg,
            color: barInk,
            ...style,
          }}
          {...rest}
        >
          {showIcon && icon !== null && (
            <BannerIcon size={spec.icon - 2} align="center" style={{ color: barAccent }}>
              {icon ?? DEFAULT_ICONS[toneKey]}
            </BannerIcon>
          )}
          <span
            className={cn("min-w-0", contentClassName)}
            style={{ fontWeight: 600, fontSize: spec.fs, lineHeight: 1.4, color: barInk }}
          >
            {heading}
            {showDetail && (
              <span style={{ fontWeight: 400, color: bar.muted, marginLeft: 6 }}>{detail}</span>
            )}
          </span>
          {action && (
            <ActionNode
              action={action}
              spec={spec}
              palette={palette}
              ink={barAccent}
              fallbackVariant="link"
            />
          )}
          {secondaryAction && (
            <ActionNode
              action={secondaryAction}
              spec={spec}
              palette={palette}
              ink={bar.muted}
              fallbackVariant="link"
            />
          )}
          {dismissible && (
            <BannerClose
              onClick={close}
              className="hover:bg-white/10"
              style={{ width: 20, height: 20, color: bar.muted }}
            >
              <X size={11} strokeWidth={3} />
            </BannerClose>
          )}
        </div>
      );
    }

    /* ---- shared pieces --------------------------------------------------- */

    const leading = !showIcon || icon === null ? null : isBusy ? (
      <span
        aria-hidden="true"
        className="animate-spin"
        style={{
          width: spec.icon,
          height: spec.icon,
          flex: "none",
          marginTop: 1,
          borderRadius: "50%",
          border: `2px solid ${palette.track}`,
          borderTopColor: iconInk,
        }}
      />
    ) : (
      <BannerIcon size={spec.icon} style={{ color: iconInk }}>
        {icon ?? DEFAULT_ICONS[toneKey]}
      </BannerIcon>
    );

    const actions =
      action || secondaryAction ? (
        <div
          className="flex flex-none items-center"
          style={{
            gap: 8,
            alignSelf: actionPlacement === "below" ? "flex-start" : "center",
            marginTop: actionPlacement === "below" ? 2 : undefined,
          }}
        >
          {action && (
            <ActionNode
              action={action}
              spec={spec}
              palette={palette}
              ink={ink}
              fallbackVariant="button"
            />
          )}
          {secondaryAction && (
            <ActionNode
              action={secondaryAction}
              spec={spec}
              palette={palette}
              ink={ink}
              fallbackVariant="link"
            />
          )}
        </div>
      ) : null;

    const closeButton = dismissible ? (
      <BannerClose
        onClick={close}
        className={appearance === "dark" ? "hover:bg-white/10" : undefined}
        style={{
          width: spec.closeSize,
          height: spec.closeSize,
          alignSelf: "flex-start",
          color: ink,
        }}
      >
        <X size={spec.closeIcon} strokeWidth={3} />
      </BannerClose>
    ) : null;

    const rule = hasRule ? (
      <span style={{ display: "block", height: 3, background: palette.track }}>
        <span
          style={{
            display: "block",
            height: "100%",
            width: `${Math.min(100, Math.max(0, rulePct))}%`,
            background: palette.fill,
            transition: "width 80ms linear",
          }}
        />
      </span>
    ) : null;

    /* ---- feature callout ------------------------------------------------- */

    if (layout === "callout") {
      const btn = CALLOUT_BUTTON[toneKey];
      const tile = CALLOUT_TILE[resolvedSize];

      return (
        <BannerRoot
          ref={ref}
          variant={toneKey}
          size={resolvedSize}
          appearance={appearance}
          role={resolvedRole}
          className={className}
          style={{
            ...(backgroundColor && { background: backgroundColor }),
            ...(borderColor && { border: `1px solid ${borderColor}` }),
            ...(textColor && { color: textColor }),
            ...style,
          }}
          {...rest}
        >
          <div className="flex min-w-0 flex-1" style={{ gap: spec.gap + 3, padding: spec.padX }}>
            {showIcon && icon !== null && (
              <span
                aria-hidden="true"
                className="flex items-center justify-center [&>svg]:h-[47%] [&>svg]:w-[47%]"
                style={{
                  width: tile,
                  height: tile,
                  flex: "none",
                  borderRadius: 11,
                  background: appearance === "dark" ? palette.btnBg : "#FFFFFF",
                  border: `1px solid ${borderColor ?? palette.border}`,
                  color: iconInk,
                }}
              >
                {icon ?? DEFAULT_ICONS[toneKey]}
              </span>
            )}
            <BannerContent className={cn("gap-1.5", contentClassName)}>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: CALLOUT_TITLE_FS[resolvedSize],
                  lineHeight: 1.3,
                  color: ink,
                }}
              >
                {heading}
              </span>
              {detail !== undefined && detail !== null && detail !== "" && (
                <BannerDescription
                  style={{
                    fontSize: spec.fs,
                    color: appearance === "dark" ? palette.body : (textColor ?? "#595959"),
                  }}
                >
                  {detail}
                </BannerDescription>
              )}
              {(action || secondaryAction) && (
                <div className="flex items-center" style={{ gap: 8, marginTop: 4 }}>
                  {action && (
                    <button
                      type="button"
                      onClick={action.onClick}
                      disabled={action.disabled}
                      className="flex cursor-pointer items-center justify-center rounded-lg border-0 font-semibold transition-all duration-120 hover:bg-(--banner-cta-hover) hover:bg-none disabled:cursor-not-allowed disabled:opacity-50"
                      style={
                        {
                          height: spec.btnH + 3,
                          padding: `0 ${spec.btnPadX + 2}px`,
                          fontSize: spec.btnFs + 1,
                          lineHeight: 1,
                          color: "#FFFFFF",
                          backgroundColor: btn.to,
                          backgroundImage: `linear-gradient(180deg, ${btn.from}, ${btn.to})`,
                          ["--banner-cta-hover" as string]: btn.hover,
                        } as React.CSSProperties
                      }
                    >
                      {action.label}
                    </button>
                  )}
                  {secondaryAction && (
                    <button
                      type="button"
                      onClick={secondaryAction.onClick}
                      disabled={secondaryAction.disabled}
                      className="flex cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                      style={{
                        height: spec.btnH + 3,
                        padding: `0 ${spec.btnPadX}px`,
                        fontSize: spec.btnFs + 1,
                        lineHeight: 1,
                        color: appearance === "dark" ? palette.ink : btn.secondary,
                      }}
                    >
                      {secondaryAction.label}
                    </button>
                  )}
                </div>
              )}
            </BannerContent>
            {closeButton}
          </div>
          {rule}
        </BannerRoot>
      );
    }

    /* ---- default layout -------------------------------------------------- */

    const stacked = actionPlacement === "below";
    const centreAlign = !showDetail && !isBusy && visibleItems.length === 0 && !stacked;

    return (
      <BannerRoot
        ref={ref}
        variant={toneKey}
        size={resolvedSize}
        appearance={appearance}
        role={resolvedRole}
        className={className}
        style={{
          ...(backgroundColor && { background: backgroundColor }),
          ...(borderColor && { border: `1px solid ${borderColor}` }),
          ...(textColor && { color: textColor }),
          ...style,
        }}
        {...rest}
      >
        <div
          className="flex min-w-0 flex-1"
          style={{
            gap: spec.gap,
            padding: `${spec.padY}px ${spec.padX}px`,
            alignItems: centreAlign ? "center" : "flex-start",
          }}
        >
          {leading}

          <BannerContent className={contentClassName} style={{ gap: isBusy || visibleItems.length ? 6 : 2 }}>
            <BannerTitle style={{ fontSize: spec.fs, color: ink }}>{heading}</BannerTitle>

            {showDetail && (
              <BannerDescription
                style={{
                  fontSize: spec.fs,
                  color: bodyInk,
                  opacity: appearance === "dark" ? 1 : palette.bodyOpacity,
                }}
              >
                {detail}
              </BannerDescription>
            )}

            {visibleItems.length > 0 && (
              <div className="flex flex-col" style={{ gap: 4 }}>
                {visibleItems.map((item, i) => (
                  <span key={i} className="flex items-baseline" style={{ gap: 8 }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: bodyInk,
                        flex: "none",
                        opacity: 0.6,
                        transform: "translateY(-2px)",
                      }}
                    />
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: spec.fs - 1,
                        lineHeight: 1.5,
                        color: bodyInk,
                        opacity: appearance === "dark" ? 1 : 0.86,
                      }}
                    >
                      {item}
                    </span>
                  </span>
                ))}
                {hiddenItems > 0 && (
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: spec.fs - 1,
                      lineHeight: 1.5,
                      color: bodyInk,
                      opacity: appearance === "dark" ? 1 : 0.7,
                      paddingLeft: 11,
                    }}
                  >
                    {renderMoreItems ? renderMoreItems(hiddenItems) : `and ${hiddenItems} more`}
                  </span>
                )}
              </div>
            )}

            {progressValue !== null && (
              <span
                style={{
                  height: 4,
                  borderRadius: 99,
                  background: palette.track,
                  overflow: "hidden",
                  display: "block",
                }}
              >
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    width: `${progressValue}%`,
                    borderRadius: 99,
                    background: palette.fill,
                    transition: "width 200ms linear",
                  }}
                />
              </span>
            )}

            {progressLabel !== undefined && progressLabel !== null && (
              <span
                className="ue-tabular"
                style={{
                  fontWeight: 400,
                  fontSize: spec.fs - 1,
                  lineHeight: 1.4,
                  color: bodyInk,
                  opacity: appearance === "dark" ? 1 : palette.bodyOpacity,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {progressLabel}
              </span>
            )}

            {stacked && actions}
          </BannerContent>

          {!stacked && actions}
          {closeButton}
        </div>
        {rule}
      </BannerRoot>
    );
  },
);

Banner.displayName = "Banner";
