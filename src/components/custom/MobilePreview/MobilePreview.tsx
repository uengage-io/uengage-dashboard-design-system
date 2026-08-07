"use client";

import * as React from "react";
import { Signal, Wifi, BatteryFull, ChevronLeft, Circle, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FRAME_SIZES,
  FRAME_COLORS,
  FRAME_RADIUS,
  BEZEL,
  STATUS_BAR_H,
  BOTTOM_BAR_H,
  DYNAMIC_ISLAND,
  PUNCH_HOLE,
  SIDE_BUTTON_W,
  SIDE_BUTTONS,
  type MobilePreviewSize,
  type MobilePreviewDevice,
  type MobilePreviewFrameColor,
} from "./mobilePreviewVariants";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MobilePreviewProps {
  // ── Appearance ───────────────────────────────────────────────────────────────
  /** Device chrome style — affects corner radius, notch, and bottom bar. Defaults to "iphone". */
  device?: MobilePreviewDevice;
  /** Overall size of the preview. Defaults to "md". */
  size?: MobilePreviewSize;
  /** Phone frame colour. Defaults to "midnight". */
  frameColor?: MobilePreviewFrameColor;
  /** Portrait or landscape orientation. Defaults to "portrait". */
  orientation?: "portrait" | "landscape";
  /**
   * CSS scale transform applied to the outermost wrapper.
   * Handy when embedding the preview inside a constrained layout — e.g. `scale={0.7}`.
   * The bounding box in the DOM still reflects the pre-scale size; wrap in an
   * appropriately sized container or combine with `transformOrigin` via `className`.
   */
  scale?: number;

  // ── Feature toggles ──────────────────────────────────────────────────────────
  /** Show the simulated status bar at the top of the screen. Defaults to true. */
  showStatusBar?: boolean;
  /** Render the hardware side buttons on the phone frame. Defaults to true. */
  showSideButtons?: boolean;
  /**
   * Show the bottom chrome — home indicator (iphone) or nav bar (android).
   * Has no effect on the "generic" device (it has no bottom bar). Defaults to true.
   */
  showBottomBar?: boolean;
  /** Allow the content area to scroll vertically. Defaults to true. */
  scrollable?: boolean;

  // ── Status bar customisation ──────────────────────────────────────────────────
  /** Time string shown in the status bar. Defaults to "9:41". */
  statusBarTime?: string;
  /**
   * Replaces the entire left slot of the status bar.
   * Pass `null` to hide it.
   */
  statusBarLeft?: React.ReactNode;
  /**
   * Replaces the entire right slot of the status bar (signal / wifi / battery icons).
   * Pass `null` to hide the default icons.
   */
  statusBarRight?: React.ReactNode;
  /**
   * When true the status-bar text and icons use white instead of the default dark colour.
   * Use this when your content has a dark background that bleeds behind the status bar.
   */
  statusBarInverted?: boolean;
  /** Extra className applied to the status-bar row. */
  statusBarClassName?: string;

  // ── Content ──────────────────────────────────────────────────────────────────
  children?: React.ReactNode;

  // ── Styling ──────────────────────────────────────────────────────────────────
  /** Applied to the outermost wrapper div (includes the side-button clearance area). */
  className?: string;
  /** Applied directly to the phone frame div. */
  frameClassName?: string;
  /**
   * Applied to the inner screen viewport div.
   * Use this to set a custom screen background — e.g. `"bg-gray-950"` for dark-mode apps.
   */
  screenClassName?: string;
  /** Applied to the scrollable content area inside the screen. */
  contentClassName?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

function MobilePreview({
  device         = "iphone",
  size           = "md",
  frameColor     = "midnight",
  orientation    = "portrait",
  scale,
  showStatusBar  = true,
  showSideButtons = true,
  showBottomBar  = true,
  scrollable     = true,
  statusBarTime  = "9:41",
  statusBarLeft,
  statusBarRight,
  statusBarInverted = false,
  statusBarClassName,
  children,
  className,
  frameClassName,
  screenClassName,
  contentClassName,
}: MobilePreviewProps) {

  // ── Derived dimensions ────────────────────────────────────────────────────────
  const dims    = FRAME_SIZES[size];
  const colors  = FRAME_COLORS[frameColor];
  const radii   = FRAME_RADIUS[device];
  const bezel   = BEZEL[device];
  const statusH = STATUS_BAR_H[device];
  const bottomH = BOTTOM_BAR_H[device];

  const frameW  = orientation === "landscape" ? dims.h : dims.w;
  const frameH  = orientation === "landscape" ? dims.w : dims.h;

  const di = DYNAMIC_ISLAND[device];
  const ph = PUNCH_HOLE[device];

  // ── Status-bar icon colour ────────────────────────────────────────────────────
  const barIconClass = statusBarInverted ? "text-white" : "text-gray-900";

  // ── Status-bar slots ──────────────────────────────────────────────────────────
  const leftSlot = statusBarLeft !== undefined
    ? statusBarLeft
    : (
      <span className={cn("text-[11px] font-semibold tracking-tight tabular-nums", barIconClass)}>
        {statusBarTime}
      </span>
    );

  const rightSlot = statusBarRight !== undefined
    ? statusBarRight
    : (
      <div className={cn("flex items-center gap-[3px]", barIconClass)}>
        <Signal       size={11} strokeWidth={2.5} />
        <Wifi         size={11} strokeWidth={2.5} />
        <BatteryFull  size={13} strokeWidth={2}   />
      </div>
    );

  // ── Side-button layout ────────────────────────────────────────────────────────
  // In portrait: left = mute+vol+vol, right = power.
  // In landscape: left = vol+vol (mute omitted for brevity), right = power.
  const leftButtons  = orientation === "portrait" ? SIDE_BUTTONS.left : SIDE_BUTTONS.left.slice(1);
  const rightButtons = SIDE_BUTTONS.right;
  const showButtons  = showSideButtons && device !== "generic";

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div
      className={cn("inline-flex items-start justify-center", className)}
      style={scale !== undefined ? { transform: `scale(${scale})`, transformOrigin: "top center" } : undefined}
    >
      {/*
        Outer positioning wrapper.
        Width is padded by SIDE_BUTTON_W on each side so that absolute-positioned
        side buttons can sit flush against the frame edges without being clipped.
      */}
      <div
        className="relative"
        style={{
          width:   frameW + SIDE_BUTTON_W * 2,
          height:  frameH,
          padding: `0 ${SIDE_BUTTON_W}px`,
        }}
      >

        {/* ── Side buttons ───────────────────────────────────────────────────── */}
        {showButtons && (
          <>
            {leftButtons.map((btn, i) => (
              <div
                key={`lb-${i}`}
                className="absolute"
                style={{
                  left:            0,
                  top:             btn.top,
                  height:          btn.height,
                  width:           SIDE_BUTTON_W,
                  backgroundColor: colors.button,
                  borderRadius:    "2px 0 0 2px",
                  boxShadow:       `inset 0 1px 0 ${colors.highlight}`,
                }}
              />
            ))}
            {rightButtons.map((btn, i) => (
              <div
                key={`rb-${i}`}
                className="absolute"
                style={{
                  right:           0,
                  top:             btn.top,
                  height:          btn.height,
                  width:           SIDE_BUTTON_W,
                  backgroundColor: colors.button,
                  borderRadius:    "0 2px 2px 0",
                  boxShadow:       `inset 0 1px 0 ${colors.highlight}`,
                }}
              />
            ))}
          </>
        )}

        {/* ── Phone frame ────────────────────────────────────────────────────── */}
        <div
          className={cn(
            "relative overflow-hidden flex flex-col",
            frameClassName,
          )}
          style={{
            width:       frameW,
            height:      frameH,
            borderRadius: radii.frame,
            background:   `linear-gradient(160deg, color-mix(in srgb, ${colors.bg} 80%, white 20%) 0%, ${colors.bg} 40%)`,
            border:       `1.5px solid ${colors.border}`,
            boxShadow: [
              `inset 0 1px 0 ${colors.highlight}`,
              "0 0 0 0.5px rgba(0,0,0,0.08)",
              "0 4px 16px rgba(0,0,0,0.18)",
              "0 20px 60px rgba(0,0,0,0.32)",
              "0 40px 80px rgba(0,0,0,0.14)",
            ].join(", "),
          }}
        >
          {/* ── Inner screen ─────────────────────────────────────────────────── */}
          <div
            className={cn(
              "relative flex flex-col overflow-hidden bg-white",
              screenClassName,
            )}
            style={{
              margin:       bezel,
              borderRadius: radii.screen,
              flex:         1,
            }}
          >
            {/* Dynamic island (iphone) */}
            {di && (
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-black z-20 pointer-events-none"
                style={{
                  top:          (statusH - di.h) / 2,
                  width:        di.w,
                  height:       di.h,
                  borderRadius: di.h / 2,
                  boxShadow:    "0 0 0 1.5px rgba(255,255,255,0.08)",
                }}
              />
            )}

            {/* Punch-hole camera (android) */}
            {ph && (
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-black z-20 pointer-events-none"
                style={{
                  top:          (statusH - ph.size) / 2,
                  width:        ph.size,
                  height:       ph.size,
                  borderRadius: "50%",
                  boxShadow:    "0 0 0 1px rgba(255,255,255,0.1)",
                }}
              />
            )}

            {/* ── Status bar ───────────────────────────────────────────────── */}
            {showStatusBar && (
              <div
                className={cn(
                  "relative z-10 flex-shrink-0 flex items-center justify-between px-4",
                  statusBarClassName,
                )}
                style={{ height: statusH }}
              >
                <div className="z-0">{leftSlot}</div>
                <div className="z-0">{rightSlot}</div>
              </div>
            )}

            {/* ── Scrollable content ───────────────────────────────────────── */}
            <div
              className={cn(
                "flex-1 min-h-0",
                scrollable ? "overflow-y-auto" : "overflow-hidden",
                contentClassName,
              )}
              style={{
                // Hide native scrollbar inside the preview chrome
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              } as React.CSSProperties}
            >
              {children}
            </div>

            {/* ── Bottom bar ───────────────────────────────────────────────── */}
            {showBottomBar && bottomH > 0 && (
              <div
                className="relative z-10 flex-shrink-0 flex items-center justify-center"
                style={{ height: bottomH }}
              >
                {device === "iphone" && (
                  <div className="w-[90px] h-[4px] rounded-full bg-black/20" />
                )}
                {device === "android" && (
                  <div className="flex items-center gap-7 text-gray-600">
                    <ChevronLeft size={17} strokeWidth={2}   />
                    <Circle      size={15} strokeWidth={1.75} />
                    <Square      size={13} strokeWidth={1.75} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

MobilePreview.displayName = "MobilePreview";

export { MobilePreview };
