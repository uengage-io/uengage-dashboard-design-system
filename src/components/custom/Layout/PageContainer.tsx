import * as React from "react";
import { cn } from "../../../lib/utils";
import { LAYOUT, toCssSize, type CssSize } from "../../../utils/layoutTokens";

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLElement> {

  maxWidth?: CssSize;

  /**
   * Extra left padding added ON TOP of the base content margin.
   * Defaults to 0. Useful for pages that need additional sidebar clearance.
   * Automatically scales down on narrow viewports.
   */
  paddingLeft?: CssSize;

  /**
   * Extra right padding added ON TOP of the base content margin.
   * Defaults to 0. Automatically scales down on narrow viewports.
   */
  paddingRight?: CssSize;

  gap?: CssSize;
}

/**
 * Build a responsive extra-padding value.
 * - Strings pass through untouched (caller opted into full control).
 * - 0 returns "0px" (no extra padding).
 * - Positive numbers use CSS min() so they scale down on narrow viewports.
 */
function responsiveExtra(value: CssSize, maxVw: number): string {
  if (typeof value === "string") return value;
  if (value <= 0) return "0px";
  return `min(${value}px, ${maxVw}vw)`;
}

function PageContainer({
  // maxWidth,
  paddingLeft = 0,
  paddingRight = 0,

  className,
  style,
  children,
  ...props
}: PageContainerProps) {
  const extraPL = responsiveExtra(paddingLeft, 6);
  const extraPR = responsiveExtra(paddingRight, 4);

  return (
    <main
      data-slot="page-container"
      className={cn(
        "uengage-ui font-['Figtree'] font-medium",
        "flex w-full min-w-0 flex-col rounded-xl border border-[#E2E2E2] bg-background text-foreground",
        "ml-[16px] mr-[12px] mt-[12px] pl-[22px] pr-[20px]",
        className,
      )}
      style={{
        // ...(maxWidth !== undefined ? { maxWidth: toCssSize(maxWidth) } : null),
        ...(paddingLeft !== 0
          ? { paddingLeft: `calc(${LAYOUT.contentPaddingLeft}px + ${extraPL})` }
          : null),
        ...(paddingRight !== 0
          ? { paddingRight: `calc(${LAYOUT.contentPaddingRight}px + ${extraPR})` }
          : null),
        ...style,
      }}
      {...props}
    >
      {children}
    </main>
  );
}

PageContainer.displayName = "PageContainer";

export { PageContainer };
