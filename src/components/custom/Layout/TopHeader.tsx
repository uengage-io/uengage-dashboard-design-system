import * as React from "react";
import { cn } from "../../../lib/utils";
import { Separator } from "../../ui/separator";
import { toCssSize, type CssSize } from "../../../utils/layoutTokens";

export interface TopHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Module / page title, rendered bold on the left. */
  title: React.ReactNode;
  /**
   * Optional helper element beside the title (e.g. a "How it Works?" link).
   */
  helper?: React.ReactNode;
  /** Right-side slot (e.g. action buttons). */
  action?: React.ReactNode;
  /** Render a bottom divider. Defaults to true. */
  divider?: boolean;
  /** Gap between title and helper. Defaults to 10px. */
  titleGap?: CssSize;
}

function TopHeader({
  title,
  helper,
  action,
  divider = true,
  titleGap = 10,
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
        className="flex w-full flex-col gap-3 py-[6px] sm:flex-row sm:items-center sm:justify-between sm:py-[8px]"
      >
        {/* Title + helper */}
        <div
          data-slot="top-header-title"
          className="flex min-w-0 flex-1 items-center overflow-hidden"
          style={{ gap: toCssSize(titleGap) }}
        >
          {React.isValidElement(title) ? (
            title
          ) : (
            <h1 className="truncate text-base font-semibold leading-tight text-foreground sm:text-[18px]">
              {title}
            </h1>
          )}
          {helper != null && (
            <span className="shrink-0 text-xs leading-none sm:text-sm">{helper}</span>
          )}
        </div>

        {/* Action slot — self-start prevents full-width stretch in the mobile flex-col */}
        {action != null && (
          <div
            data-slot="top-header-action"
            className="flex shrink-0 flex-wrap items-center gap-2 self-start sm:self-auto"
          >
            {action}
          </div>
        )}
      </div>

      {divider && (
        <Separator
          data-slot="top-header-divider"
          style={{
            // Use CSS vars set by PageContainer so the separator always
            // bleeds to the container edge regardless of viewport width.
            marginLeft: "calc(-1 * var(--pc-pl, 22px))",
            marginRight: "calc(-1 * var(--pc-pr, 20px))",
            width: "calc(100% + var(--pc-pl, 22px) + var(--pc-pr, 20px))",
          }}
        />
      )}
    </header>
  );
}

TopHeader.displayName = "TopHeader";

export { TopHeader };
