import * as React from "react";
import { cn } from "../../../lib/utils";
import { Separator } from "../../ui/separator";
import { LAYOUT, toCssSize, type CssSize } from "../../../utils/layoutTokens";

export interface TopHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Module / page title, rendered bold on the left. */
  title: React.ReactNode;
  /**
   * Optional helper element beside the title (e.g. a "How it Works?" link).
   * Accepts any ReactNode so callers pass their own styled <a> / Link.
   */
  helper?: React.ReactNode;
  /** Right-side slot (e.g. a "Quick Actions" Button). */
  action?: React.ReactNode;
  /** Render a bottom divider (shadcn <Separator />). Defaults to true. */
  divider?: boolean;
  /** Horizontal gap between title and helper. Defaults to 10px. */
  titleGap?: CssSize;
}

function TopHeader({
  title,
  helper,
  action,
  divider = true,
  className,
  style,
  ...props
}: TopHeaderProps) {
  return (
    <header
      data-slot="top-header"
      className={cn("uengage-ui flex w-full shrink-0 flex-col", className)}
      style={style}
      {...props}
    >
      <div
        data-slot="top-header-row"
        className="flex w-full items-center justify-between py-[8px]"
      >
        <div
          data-slot="top-header-title"
          className="flex min-w-0 flex-1 overflow-hidden items-center gap-[10px]"
        >
          <h1 className="truncate text-[18px] font-semibold leading-tight text-foreground">
            {title}
          </h1>
          {helper != null && (
            <span className="shrink-0 text-sm leading-none">{helper}</span>
          )}
        </div>

        {action != null && (
          <div
            data-slot="top-header-action"
            className="flex shrink-0 flex-wrap items-center gap-2"
          >
            {action}
          </div>
        )}
      </div>

      {divider && (
        <Separator
          data-slot="top-header-divider"
          style={{
            marginLeft: -LAYOUT.contentPaddingLeft,
            marginRight: -LAYOUT.contentPaddingRight,
            width: `calc(100% + ${LAYOUT.contentPaddingLeft}px + ${LAYOUT.contentPaddingRight}px)`,
          }}
        />
      )}
    </header>
  );
}

TopHeader.displayName = "TopHeader";

export { TopHeader };
