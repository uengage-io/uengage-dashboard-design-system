import * as React from "react";
import { cn } from "../../../lib/utils";
import { Separator } from "../../ui/separator";
import { toCssSize, type CssSize } from "../../../utils/layoutTokens";

export interface AppHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  /**
   * Brand / logo slot — rendered in a fixed-width zone on the left.
   * On mobile this zone is hidden so the center slot leads.
   */
  logo?: React.ReactNode;
  /**
   * Width of the logo zone on desktop.
   * Set this to match your sidebar width so the center slot aligns
   * precisely with the page-content left boundary.
   * @default 252
   */
  logoZoneWidth?: CssSize;
  /**
   * Center-left slot — typically a business-selector dropdown.
   * On mobile (logo zone hidden) this becomes the leading element.
   */
  center?: React.ReactNode;
  /** Right-side slot — action icons, wallet balance, user profile, etc. */
  right?: React.ReactNode;
  /** Render a bottom border divider. @default true */
  divider?: boolean;
}

function AppHeader({
  logo,
  logoZoneWidth = 252,
  center,
  right,
  divider = true,
  className,
  style,
  ...props
}: AppHeaderProps) {
  return (
    <header
      data-slot="app-header"
      className={cn(
        "uengage-ui fixed left-0 right-0 top-0 z-30 w-full bg-[#FAFFF7]",
        className,
      )}
      style={style}
      {...props}
    >
      <div
        data-slot="app-header-inner"
        className="flex min-h-[65px] items-center justify-between px-[10px] py-[7px] sm:min-h-[75px] sm:px-[13px] sm:py-[10px]"
      >
        {/* ── Left: logo zone + center slot ── */}
        <div
          data-slot="app-header-left"
          className="flex min-w-0 flex-1 items-center"
        >
          {/* Logo zone — fixed width on desktop so center slot aligns with content */}
          {logo != null && (
            <div
              data-slot="app-header-logo"
              className="hidden shrink-0 items-center md:flex"
              style={{ width: toCssSize(logoZoneWidth) }}
            >
              {logo}
            </div>
          )}

          {/* Center slot — business selector or any contextual element */}
          {center != null && (
            <div
              data-slot="app-header-center"
              className="min-w-0 flex-[0_0_69%] md:w-auto md:flex-none"
            >
              {center}
            </div>
          )}
        </div>

        {/* ── Right slot ── */}
        {right != null && (
          <div
            data-slot="app-header-right"
            className="flex shrink-0 items-center gap-[2vw] md:gap-[2px]"
          >
            {right}
          </div>
        )}
      </div>

      {divider && <Separator data-slot="app-header-divider" />}
    </header>
  );
}

AppHeader.displayName = "AppHeader";

export { AppHeader };
