import * as React from "react";
import { cn } from "../../../lib/utils";
import { type CssSize } from "../../../utils/layoutTokens";

export interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  maxWidth?: CssSize;
  /**
   * Extra left padding added ON TOP of the base content padding.
   * Useful for pages that need sidebar clearance on desktop.
   * Automatically scales down on narrow viewports.
   */
  paddingLeft?: CssSize;
  /**
   * Extra right padding added ON TOP of the base content padding.
   */
  paddingRight?: CssSize;
  gap?: CssSize;
}

/**
 * Responsive extra-padding helper.
 * - Numbers → `min(Xpx, Yvw)` so they naturally shrink on narrow viewports.
 * - Strings → pass through (caller controls the value).
 * - 0 / falsy → "0px".
 */
function responsiveExtra(value: CssSize, maxVw: number): string {
  if (typeof value === "string") return value;
  if (value <= 0) return "0px";
  return `min(${value}px, ${maxVw}vw)`;
}

function PageContainer({
  paddingLeft = 0,
  paddingRight = 0,
  className,
  style,
  children,
  ...props
}: PageContainerProps) {
  const extraPL = responsiveExtra(paddingLeft, 6);
  const extraPR = responsiveExtra(paddingRight, 4);

  // Base padding scales with viewport:
  //   mobile  (~360px): ~14px
  //   desktop (~1280px): 22px / 20px
  // Exposed as CSS custom properties so TopHeader / SubHeader separators can
  // reference them for a full-bleed edge-to-edge line without hard-coding numbers.
  const basePL = "clamp(14px, 3.5vw, 22px)";
  const basePR = "clamp(14px, 3vw, 20px)";

  const resolvedPL =
    paddingLeft !== 0 ? `calc(${basePL} + ${extraPL})` : basePL;
  const resolvedPR =
    paddingRight !== 0 ? `calc(${basePR} + ${extraPR})` : basePR;

  return (
    <main
      data-slot="page-container"
      className={cn(
        "uengage-ui font-['Figtree'] font-medium",
        "flex flex-1 min-w-0 flex-col rounded-xl border border-[#E2E2E2] bg-background text-foreground",
        // Outer margins: left 20px, right 22px, always fixed
        "ml-5 mr-[22px] mt-2 sm:mt-[12px]",
        className,
      )}
      style={
        {
          // Expose base padding as CSS vars so children (TopHeader / SubHeader)
          // can compute full-bleed separator margins without prop-drilling.
          "--pc-pl": basePL,
          "--pc-pr": basePR,
          paddingLeft: resolvedPL,
          paddingRight: resolvedPR,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </main>
  );
}

PageContainer.displayName = "PageContainer";

export { PageContainer };
