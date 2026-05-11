import * as React from "react";
import { cn } from "../../../lib/utils";
import { Separator } from "../../ui/separator";
import { LAYOUT, toCssSize, type CssSize } from "../../../utils/layoutTokens";

export type SubHeaderAlign = "start" | "center" | "end";

export interface SubHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Primary section heading. */
  title?: React.ReactNode;
  /**
   * Supporting subtitle. Accepts ReactNode for rich content.
   */
  subtitle?: React.ReactNode;
  /** Right-side slot (e.g. filters, step navigation, CTAs). */
  right?: React.ReactNode;
  /**
   * Vertical alignment of left block vs. right slot on sm+ screens.
   * Defaults to "center".
   */
  align?: SubHeaderAlign;
  /** Render a bottom divider. Defaults to false. */
  divider?: boolean;
  /**
   * Gap between the title/subtitle block and `children`.
   * Defaults to LAYOUT.gap.xs (12px).
   */
  gap?: CssSize;
}

// Alignment only applied at sm+ (on mobile the layout stacks, so align is irrelevant)
const ALIGN_CLASS: Record<SubHeaderAlign, string> = {
  start: "sm:items-start",
  center: "sm:items-center",
  end: "sm:items-end",
};

function SubHeader({
  title,
  subtitle,
  right,
  align = "center",
  divider = false,
  gap = LAYOUT.gap.xs,
  className,
  style,
  children,
  ...props
}: SubHeaderProps) {
  const hasHeading = title != null || subtitle != null;

  return (
    <section
      data-slot="sub-header"
      className={cn("uengage-ui flex w-full flex-col", className)}
      style={style}
      {...props}
    >
      <div
        data-slot="sub-header-row"
        className={cn(
          // Mobile: stack vertically with a small gap
          "flex w-full flex-col gap-3",
          // sm+: side-by-side with space-between
          "sm:flex-row sm:justify-between sm:gap-4",
          ALIGN_CLASS[align],
        )}
        style={{
          paddingTop: "clamp(12px, 2.5vw, 16px)",
          paddingBottom: "clamp(12px, 2.5vw, 16px)",
        }}
      >
        {/* Left: title / subtitle / children */}
        <div
          data-slot="sub-header-main"
          className="flex min-w-0 flex-1 flex-col gap-3"
          style={gap !== LAYOUT.gap.xs ? { gap: toCssSize(gap) } : undefined}
        >
          {hasHeading && (
            <div data-slot="sub-header-heading">
              {title != null && (
                React.isValidElement(title) ? title : (
                  <h2 className="text-sm sm:text-base font-semibold leading-tight text-foreground">
                    {title}
                  </h2>
                )
              )}
              {subtitle != null && (
                React.isValidElement(subtitle) ? subtitle : (
                  <div className="mt-0.5 text-[12px] sm:text-[13px] leading-tight text-muted-foreground">
                    {subtitle}
                  </div>
                )
              )}
            </div>
          )}
          {children != null && (
            <div data-slot="sub-header-content">{children}</div>
          )}
        </div>

        {/* Right slot: wraps below the title on mobile; self-start prevents full-width stretch in flex-col */}
        {right != null && (
          <div
            data-slot="sub-header-right"
            className="flex shrink-0 flex-wrap items-center gap-3 self-start sm:self-auto"
          >
            {right}
          </div>
        )}
      </div>

      {divider && (
        <Separator
          data-slot="sub-header-divider"
          style={{
            marginLeft: "calc(-1 * var(--pc-pl, 22px))",
            marginRight: "calc(-1 * var(--pc-pr, 20px))",
            width: "calc(100% + var(--pc-pl, 22px) + var(--pc-pr, 20px))",
          }}
        />
      )}
    </section>
  );
}

SubHeader.displayName = "SubHeader";

export { SubHeader };
