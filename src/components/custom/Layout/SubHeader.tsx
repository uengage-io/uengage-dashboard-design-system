import * as React from "react";
import { cn } from "../../../lib/utils";
import { Separator } from "../../ui/separator";
import { LAYOUT, toCssSize, type CssSize } from "../../../utils/layoutTokens";

export type SubHeaderAlign = "start" | "center" | "end";

export interface SubHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** Primary section heading (rendered bold). */
  title?: React.ReactNode;
  /**
   * Supporting subtitle. Typed as ReactNode so you can pass rich content —
   * e.g. "Steps 3/5" + an inline progress bar (see screenshot).
   */
  subtitle?: React.ReactNode;
  /** Right-side slot (e.g. Previous / Next Step buttons, filters, CTAs). */
  right?: React.ReactNode;
  /**
   * Vertical alignment of the left block vs. the right slot.
   * Defaults to "center". Use "start" when heights differ a lot.
   */
  align?: SubHeaderAlign;
  /** Render a bottom divider (shadcn <Separator />). Defaults to false. */
  divider?: boolean;
  /** Vertical padding (top + bottom). Defaults to 16px. */
  paddingY?: CssSize;
  /**
   * Gap between the title/subtitle block and `children`
   * (e.g. a tabs/filters row). Defaults to LAYOUT.gap.xs (12px).
   */
  gap?: CssSize;
}

const ALIGN_CLASS: Record<SubHeaderAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
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
      className={cn("flex w-full flex-col", className)}
      style={style}
      {...props}
    >
      <div
        data-slot="sub-header-row"
        className={cn(
          "flex w-full justify-between gap-4",
          ALIGN_CLASS[align],
        )}
        style={{
          paddingTop: toCssSize(LAYOUT.subHeaderPaddingTop),
          paddingBottom: toCssSize(LAYOUT.subHeaderPaddingBottom),
        }}
      >
        <div
          data-slot="sub-header-main"
          className="flex min-w-0 flex-1 flex-col gap-3"
          style={gap !== LAYOUT.gap.xs ? { gap: toCssSize(gap) } : undefined}
        >
          {hasHeading && (
            <div data-slot="sub-header-heading">
              {title != null && (
                <h2 className="text-base font-semibold leading-tight text-foreground">
                  {title}
                </h2>
              )}
              {subtitle != null && (
                <div className="mt-0.5 text-[13px] leading-tight text-muted-foreground">
                  {subtitle}
                </div>
              )}
            </div>
          )}
          {children != null && (
            <div data-slot="sub-header-content">{children}</div>
          )}
        </div>

        {right != null && (
          <div
            data-slot="sub-header-right"
            className="flex shrink-0 items-center gap-3"
          >
            {right}
          </div>
        )}
      </div>

      {divider && (
        <Separator
          data-slot="sub-header-divider"
          style={{
            marginLeft: -LAYOUT.contentPaddingLeft,
            marginRight: -LAYOUT.contentPaddingRight,
            width: `calc(100% + ${LAYOUT.contentPaddingLeft}px + ${LAYOUT.contentPaddingRight}px)`,
          }}
        />
      )}
    </section>
  );
}

SubHeader.displayName = "SubHeader";

export { SubHeader };
