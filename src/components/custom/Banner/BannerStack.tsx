import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BANNER_TONE_DOT,
  BANNER_TONE_SEVERITY,
  toBannerToneKey,
} from "@/components/ui/banner";
import { Banner } from "./Banner";
import type { BannerStackItem, BannerStackProps } from "./Banner.types";

function severity(item: BannerStackItem) {
  return BANNER_TONE_SEVERITY[toBannerToneKey(item.tone ?? item.variant)];
}

/**
 * Several notices at once — show the most severe in full, and collapse the rest
 * behind a counter carrying their tone dots.
 */
export const BannerStack = React.forwardRef<HTMLDivElement, BannerStackProps>(
  function BannerStack(
    {
      banners,
      max = 1,
      collapseRest = true,
      sortBySeverity = true,
      size,
      appearance = "light",
      gap = 8,
      moreLabel,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const [expanded, setExpanded] = React.useState(false);
    const [dismissed, setDismissed] = React.useState<string[]>([]);

    const live = React.useMemo(
      () => banners.filter((b) => !dismissed.includes(b.id)),
      [banners, dismissed],
    );

    const ordered = React.useMemo(() => {
      if (!sortBySeverity) return live;
      return [...live].sort((a, b) => severity(b) - severity(a));
    }, [live, sortBySeverity]);

    const shown = expanded ? ordered : ordered.slice(0, max);
    const hidden = expanded ? [] : ordered.slice(max);

    const renderBanner = (item: BannerStackItem) => {
      const { id, onDismiss, ...bannerProps } = item;
      return (
        <Banner
          key={id}
          size={size}
          appearance={appearance}
          {...bannerProps}
          dismissId={item.dismissId ?? id}
          onDismiss={() => {
            setDismissed((d) => (d.includes(id) ? d : [...d, id]));
            onDismiss?.();
          }}
        />
      );
    };

    if (ordered.length === 0) return null;

    return (
      <div
        ref={ref}
        className={cn("flex w-full flex-col", className)}
        style={{ gap, ...style }}
        {...rest}
      >
        {shown.map(renderBanner)}

        {collapseRest && hidden.length > 0 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            aria-expanded={false}
            className="flex cursor-pointer items-center rounded-[9px] border border-dashed bg-transparent transition-all duration-120 hover:bg-black/[0.02]"
            style={{
              gap: 8,
              padding: "8px 12px",
              borderColor: appearance === "dark" ? "#3A423E" : "#C6C6C6",
            }}
          >
            <span className="flex flex-none" style={{ gap: 3 }}>
              {hidden.map((b) => (
                <span
                  key={b.id}
                  aria-hidden="true"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: BANNER_TONE_DOT[toBannerToneKey(b.tone ?? b.variant)],
                  }}
                />
              ))}
            </span>
            <span
              className="flex-1 text-left"
              style={{
                fontWeight: 600,
                fontSize: 11,
                lineHeight: 1.4,
                color: appearance === "dark" ? "#94A09A" : "#595959",
              }}
            >
              {moreLabel
                ? moreLabel(hidden.length)
                : `${hidden.length} more notice${hidden.length === 1 ? "" : "s"}`}
            </span>
            <ChevronDown size={11} strokeWidth={2.4} color={appearance === "dark" ? "#94A09A" : "#787878"} />
          </button>
        )}
      </div>
    );
  },
);

BannerStack.displayName = "BannerStack";
