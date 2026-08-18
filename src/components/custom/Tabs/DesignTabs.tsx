import * as React from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { Tabs as T, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TABS_SIZES, getTabsPalette } from "./tabsTokens";
import type { TabsPalette, TabsSizeSpec } from "./tabsTokens";
import type { CustomTabsProps, TabItem, TabsDesignVariant } from "./Tabs.types";

/** Lets `TabPanel` know which tab is live so it can mount lazily. */
export const TabsActiveValueContext = React.createContext<string | null>(null);

/** Strips shadcn's own trigger chrome so the design styles land cleanly. */
const TRIGGER_RESET = [
  "relative h-auto w-auto flex-none border-0 bg-transparent shadow-none outline-none",
  "after:hidden after:content-none",
  "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-transparent",
  "focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none",
  "disabled:pointer-events-auto",
].join(" ");

const SCROLLBAR_HIDDEN =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

/* -------------------------------------------------------------------------- */
/*  State                                                                      */
/* -------------------------------------------------------------------------- */

function firstEnabled(tabs: TabItem[]) {
  return tabs.find((t) => !t.disabled)?.value ?? tabs[0]?.value ?? "";
}

function paramNameOf(syncToUrl: string) {
  return syncToUrl.replace(/^\?/, "") || "tab";
}

function escapeValue(value: string) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }
  return value.replace(/["\\]/g, "\\$&");
}

function useDesignTabValue({
  tabs,
  value,
  defaultValue,
  onChange,
  onBeforeChange,
  syncToUrl,
}: Pick<
  CustomTabsProps,
  "tabs" | "value" | "defaultValue" | "onChange" | "onBeforeChange" | "syncToUrl"
>) {
  const [uncontrolled, setUncontrolled] = React.useState<string>(() => {
    if (syncToUrl && typeof window !== "undefined") {
      const fromUrl = new URLSearchParams(window.location.search).get(
        paramNameOf(syncToUrl),
      );
      if (fromUrl && tabs.some((t) => t.value === fromUrl && !t.disabled)) {
        return fromUrl;
      }
    }
    return value ?? defaultValue ?? firstEnabled(tabs);
  });

  const activeValue = value ?? uncontrolled;

  // Fall back to the first tab when the active one disappears from the list.
  React.useEffect(() => {
    if (value !== undefined) return;
    if (tabs.some((t) => t.value === uncontrolled)) return;
    setUncontrolled(defaultValue ?? firstEnabled(tabs));
  }, [defaultValue, tabs, uncontrolled, value]);

  React.useEffect(() => {
    if (!syncToUrl || typeof window === "undefined" || !activeValue) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get(paramNameOf(syncToUrl)) === activeValue) return;
    url.searchParams.set(paramNameOf(syncToUrl), activeValue);
    window.history.replaceState(window.history.state, "", url.toString());
  }, [activeValue, syncToUrl]);

  const commit = React.useCallback(
    (next: string) => {
      if (value === undefined) setUncontrolled(next);
      onChange?.(next);
    },
    [onChange, value],
  );

  const handleChange = React.useCallback(
    (next: string) => {
      if (!tabs.some((t) => t.value === next && !t.disabled)) return;
      if (next === activeValue) return;
      if (!onBeforeChange) {
        commit(next);
        return;
      }
      const allowed = onBeforeChange(next, activeValue);
      if (allowed instanceof Promise) {
        void allowed.then((ok) => {
          if (ok) commit(next);
        });
        return;
      }
      if (allowed) commit(next);
    },
    [activeValue, commit, onBeforeChange, tabs],
  );

  return { activeValue, handleChange };
}

/** Keeps the first `limit` tabs visible, always including the active one. */
function splitOverflow(tabs: TabItem[], activeValue: string, limit?: number) {
  if (limit === undefined || tabs.length <= limit) {
    return { visibleTabs: tabs, overflowTabs: [] as TabItem[] };
  }
  const safeLimit = Math.min(Math.max(limit, 1), tabs.length - 1);
  const visible = tabs.slice(0, safeLimit);
  const overflow = tabs.slice(safeLimit);

  const activeIsHidden = overflow.some((t) => t.value === activeValue);
  if (!activeIsHidden) return { visibleTabs: visible, overflowTabs: overflow };

  const activeTab = tabs.find((t) => t.value === activeValue) as TabItem;
  const swapped = [...visible];
  const displaced = swapped[safeLimit - 1] as TabItem;
  swapped[safeLimit - 1] = activeTab;
  return {
    visibleTabs: swapped,
    overflowTabs: overflow
      .filter((t) => t.value !== activeValue)
      .concat(displaced),
  };
}

/* -------------------------------------------------------------------------- */
/*  Pieces                                                                     */
/* -------------------------------------------------------------------------- */

function TabIcon({ icon, size }: { icon: React.ReactNode; size: number }) {
  return (
    <span
      aria-hidden="true"
      className="block [&>svg]:h-full [&>svg]:w-full"
      style={{ width: size, height: size, flex: "none" }}
    >
      {icon}
    </span>
  );
}

function DirtyDot({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: 6, height: 6, borderRadius: "50%", background: color, flex: "none" }}
    />
  );
}

function CountBadge({
  count,
  active,
  palette,
  radius,
  padding,
}: {
  count: React.ReactNode;
  active: boolean;
  palette: TabsPalette;
  radius: number;
  padding: string;
}) {
  return (
    <span
      className="ue-tabular"
      style={{
        padding,
        borderRadius: radius,
        fontWeight: 700,
        fontSize: 10,
        lineHeight: 1.4,
        fontVariantNumeric: "tabular-nums",
        background: active ? palette.countActiveBg : palette.countBg,
        color: active ? palette.countActiveFg : palette.countFg,
      }}
    >
      {count}
    </span>
  );
}

/**
 * Measures the active trigger so a single bar can slide between tabs instead of
 * each tab snapping its own border on and off.
 */
/** One easing for every sliding span, so wash, bar and pill travel together. */
const SLIDE_TRANSITION = (animate: boolean) =>
  animate
    ? "transform 260ms cubic-bezier(.2,.8,.3,1), width 260ms cubic-bezier(.2,.8,.3,1), height 260ms cubic-bezier(.2,.8,.3,1), opacity 120ms linear"
    : "opacity 120ms linear";

function useSlidingIndicator(enabled: boolean, activeValue: string, signature: string) {
  const innerRef = React.useRef<HTMLDivElement>(null);
  const settled = React.useRef(false);
  const [indicator, setIndicator] = React.useState({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
    ready: false,
  });

  const measure = React.useCallback(() => {
    const inner = innerRef.current;
    if (!inner || !activeValue) return;
    const btn = inner.querySelector(
      `[data-tab-value="${escapeValue(activeValue)}"]`,
    ) as HTMLElement | null;
    // The active tab can live in the overflow menu, where there is nothing to mark.
    if (!btn) {
      settled.current = false;
      setIndicator((i) => ({ ...i, ready: false }));
      return;
    }
    const innerRect = inner.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    // top/height only matter to the segmented pill, which fills the whole
    // trigger box; the underline bar reads left/width and pins itself to the rule.
    setIndicator({
      left: btnRect.left - innerRect.left,
      width: btnRect.width,
      top: btnRect.top - innerRect.top,
      height: btnRect.height,
      ready: true,
    });
  }, [activeValue]);

  React.useLayoutEffect(() => {
    if (!enabled) return;
    measure();
  }, [enabled, measure, signature]);

  React.useEffect(() => {
    if (!enabled) return;
    const inner = innerRef.current;
    if (!inner) return;
    const ro = new ResizeObserver(measure);
    ro.observe(inner);
    window.addEventListener("resize", measure);
    // Web fonts land after first paint and change every tab's width.
    void (document as Document & { fonts?: FontFaceSet }).fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled, measure]);

  // Skip the transition on the very first placement so the bar does not fly in
  // from the left edge on mount.
  const animate = settled.current;
  if (indicator.ready) settled.current = true;

  return { innerRef, indicator, animate };
}

/** Scrolls the strip and shows a fade + chevron at whichever edge has more tabs. */
function useEdgeScroll(enabled: boolean, activeValue: string) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [edges, setEdges] = React.useState({ left: false, right: false });

  const measure = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 1,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    });
  }, []);

  React.useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [enabled, measure]);

  // Keep the active tab in view when it changes.
  React.useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el || !activeValue) return;
    const btn = el.querySelector(
      `[data-tab-value="${CSS?.escape?.(activeValue) ?? activeValue}"]`,
    ) as HTMLElement | null;
    btn?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [activeValue, enabled]);

  const scrollBy = React.useCallback((delta: number) => {
    ref.current?.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return { ref, edges, scrollBy };
}

function EdgeControl({
  side,
  palette,
  onClick,
}: {
  side: "left" | "right";
  palette: TabsPalette;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-11"
        style={{
          [side]: 0,
          background: `linear-gradient(${side === "left" ? "270deg" : "90deg"}, rgba(0,0,0,0), ${palette.surface} 62%)`,
        }}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClick}
        className="absolute top-1/2 flex h-[22px] w-[22px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-md"
        style={{
          [side]: 2,
          background: palette.surface,
          border: `1px solid ${palette.strip}`,
          color: palette.fg,
        }}
      >
        <Icon size={11} strokeWidth={2.6} />
      </button>
    </>
  );
}

/** The tail of the strip, collapsed into a menu. */
function OverflowMenu({
  overflowTabs,
  overflowLabel,
  activeValue,
  onChange,
  palette,
  spec,
  padding,
}: {
  overflowTabs: TabItem[];
  overflowLabel: string;
  activeValue: string;
  onChange: (value: string) => void;
  palette: TabsPalette;
  spec: TabsSizeSpec;
  /** Matches the trigger padding of the strip it sits in. */
  padding: string;
}) {
  const [open, setOpen] = React.useState(false);
  if (overflowTabs.length === 0) return null;

  const holdsActive = overflowTabs.some((t) => t.value === activeValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex flex-none cursor-pointer items-center gap-[5px] whitespace-nowrap border-0 bg-transparent"
          style={{
            padding,
            fontSize: spec.fs,
            fontWeight: 600,
            color: holdsActive ? palette.fgActive : palette.fg,
          }}
        >
          {overflowLabel}
          <ChevronDown
            size={11}
            strokeWidth={2.4}
            className={cn("transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        collisionPadding={8}
        className="w-[190px] max-w-[calc(100vw-1rem)] rounded-lg p-1 shadow-[2px_2px_4px_rgba(0,0,0,0.12)]"
      >
        <div className="flex flex-col">
          {overflowTabs.map((tab) => {
            const isActive = tab.value === activeValue;
            return (
              <button
                key={tab.value}
                type="button"
                disabled={tab.disabled}
                title={tab.disabled ? tab.disabledReason : undefined}
                onClick={() => {
                  if (tab.disabled) return;
                  onChange(tab.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-md px-[10px] py-[7px] text-left",
                  "text-[12px] font-medium transition-colors duration-150",
                  tab.disabled && "cursor-not-allowed opacity-50",
                )}
                style={{
                  color: tab.disabled ? palette.fgDisabled : "#202020",
                  background: isActive ? palette.vertHoverBg : "transparent",
                }}
              >
                <span className="flex min-w-0 items-center gap-2 truncate">
                  {tab.label}
                  {tab.dirty && <DirtyDot color={palette.dirty} />}
                </span>
                {isActive && (
                  <Check size={14} strokeWidth={2.5} className="shrink-0" style={{ color: palette.fgActive }} />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* -------------------------------------------------------------------------- */
/*  Triggers                                                                   */
/* -------------------------------------------------------------------------- */

interface TriggerProps {
  tab: TabItem;
  active: boolean;
  palette: TabsPalette;
  spec: TabsSizeSpec;
  fitted?: boolean;
  /**
   * The strip is painting a single pill that slides between triggers, so this
   * trigger must not paint its own selected fill. False until the pill has
   * measured, which keeps the selection visible on the first paint.
   */
  sliding?: boolean;
}

function UnderlineTrigger({ tab, active, palette, spec, fitted, sliding }: TriggerProps) {
  const [hover, setHover] = React.useState(false);
  const fg = tab.disabled
    ? palette.fgDisabled
    : active
      ? palette.fgActive
      : hover
        ? palette.fgHover
        : palette.fg;

  return (
    <TabsTrigger
      value={tab.value}
      disabled={tab.disabled}
      data-tab-value={tab.value}
      title={tab.disabled ? tab.disabledReason : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        TRIGGER_RESET,
        // Radius is set inline: top corners only, so the wash rounds while the
        // border-bottom underline stays a straight line.
        "inline-flex items-center justify-center gap-2 whitespace-nowrap",
        "transition-all duration-[160ms] ease-[cubic-bezier(.2,.8,.3,1)]",
        "focus-visible:shadow-[0_0_0_3px_rgba(140,196,42,.38)]",
        fitted && "flex-1",
        tab.disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
      style={{
        padding: spec.underPad,
        fontSize: spec.fs,
        // The selected label carries the weight as well as the colour.
        fontWeight: active ? 700 : 600,
        color: fg,
        // Both the wash and the bar are single sliding spans in the strip; when
        // they have not measured yet the trigger paints its own so the selection
        // is never invisible.
        background: active && !sliding ? palette.underActiveBg : "transparent",
        borderRadius: "7px 7px 0 0",
        // The bar is a sliding span too — this only reserves the 3px it
        // occupies so the label never shifts.
        borderBottom: "3px solid transparent",
        marginBottom: -1,
        opacity: tab.disabled ? 0.5 : 1,
        // Sit above the sliding wash so the label stays readable while it travels.
        position: "relative",
        zIndex: 1,
      }}
    >
      {tab.icon && <TabIcon icon={tab.icon} size={spec.icon} />}
      {tab.label}
      {tab.dirty && <DirtyDot color={palette.dirty} />}
      {tab.count !== undefined && tab.count !== null && (
        <CountBadge count={tab.count} active={active} palette={palette} radius={99} padding="2px 8px" />
      )}
    </TabsTrigger>
  );
}

function SegmentedTrigger({ tab, active, palette, spec, fitted, sliding }: TriggerProps) {
  const [hover, setHover] = React.useState(false);
  // The selected segment carries the forest fill, so its label flips to the
  // on-fill colour rather than staying forest-on-white like the other variants.
  const fg = tab.disabled
    ? palette.fgDisabled
    : active
      ? palette.segActiveFg
      : hover
        ? palette.fgHover
        : palette.fg;

  return (
    <TabsTrigger
      value={tab.value}
      disabled={tab.disabled}
      data-tab-value={tab.value}
      title={tab.disabled ? tab.disabledReason : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        TRIGGER_RESET,
        "inline-flex items-center justify-center gap-[7px] whitespace-nowrap rounded-full",
        // 220ms so the label crossfade tracks the sliding pill rather than
        // flipping to white before it arrives.
        "transition-all duration-[220ms] ease-[cubic-bezier(.2,.8,.3,1)]",
        "focus-visible:shadow-[0_0_0_3px_rgba(140,196,42,.38)]",
        fitted && "flex-1",
        tab.disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
      style={{
        padding: spec.segPad,
        fontSize: spec.fs,
        fontWeight: 600,
        color: fg,
        background:
          active && !sliding
            ? palette.segActiveBg
            : !active && hover && !tab.disabled
              ? palette.segHoverBg
              : "transparent",
        boxShadow: active && !sliding ? palette.segActiveShadow : "none",
        opacity: tab.disabled ? 0.5 : 1,
        // Sit above the sliding pill so the label stays readable while it travels.
        position: "relative",
        zIndex: 1,
      }}
    >
      {tab.icon && <TabIcon icon={tab.icon} size={spec.icon} />}
      {tab.label}
      {tab.dirty && <DirtyDot color={palette.dirty} />}
      {tab.count !== undefined && tab.count !== null && (
        <CountBadge count={tab.count} active={active} palette={palette} radius={99} padding="2px 7px" />
      )}
    </TabsTrigger>
  );
}

function PillTrigger({ tab, active, palette, spec, fitted }: TriggerProps) {
  const [hover, setHover] = React.useState(false);
  const bg = active
    ? palette.pillActiveBg
    : hover && !tab.disabled
      ? palette.pillHoverBg
      : palette.pillBg;
  const border = active
    ? palette.pillActiveBorder
    : hover && !tab.disabled
      ? palette.pillHoverBorder
      : palette.pillBorder;
  const fg = active
    ? palette.pillActiveFg
    : tab.disabled
      ? palette.fgDisabled
      : palette.pillFg;

  return (
    <TabsTrigger
      value={tab.value}
      disabled={tab.disabled}
      data-tab-value={tab.value}
      title={tab.disabled ? tab.disabledReason : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        TRIGGER_RESET,
        "inline-flex items-center justify-center gap-[7px] whitespace-nowrap rounded-full",
        "transition-all duration-[160ms] ease-[cubic-bezier(.2,.8,.3,1)]",
        "focus-visible:shadow-[0_0_0_3px_rgba(140,196,42,.38)]",
        fitted && "flex-1",
        tab.disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
      style={{
        padding: spec.pillPad,
        fontSize: spec.fs,
        fontWeight: 600,
        color: fg,
        background: bg,
        border: `1px solid ${border}`,
        opacity: tab.disabled ? 0.5 : 1,
      }}
    >
      {tab.icon && <TabIcon icon={tab.icon} size={spec.icon} />}
      {tab.label}
      {tab.dirty && <DirtyDot color={palette.dirty} />}
      {tab.count !== undefined && tab.count !== null && (
        <span className="ue-tabular" style={{ fontWeight: 500, opacity: 0.66 }}>
          {tab.count}
        </span>
      )}
    </TabsTrigger>
  );
}

function VerticalTrigger({ tab, active, palette, spec }: TriggerProps) {
  const [hover, setHover] = React.useState(false);
  const fg = tab.disabled
    ? palette.fgDisabled
    : active
      ? palette.fgActive
      : hover
        ? palette.fgHover
        : palette.fg;

  return (
    <TabsTrigger
      value={tab.value}
      disabled={tab.disabled}
      data-tab-value={tab.value}
      title={tab.disabled ? tab.disabledReason : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        TRIGGER_RESET,
        "flex w-full items-center justify-start gap-[9px] rounded-lg text-left",
        "transition-all duration-140 ease-[cubic-bezier(.2,.8,.3,1)]",
        "focus-visible:shadow-[0_0_0_3px_rgba(140,196,42,.38)]",
        tab.disabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
      style={{
        padding: "9px 11px",
        fontSize: spec.fs,
        fontWeight: 600,
        color: fg,
        background: active
          ? palette.vertActiveBg
          : hover && !tab.disabled
            ? palette.vertHoverBg
            : "transparent",
        opacity: tab.disabled ? 0.5 : 1,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 2,
          height: 16,
          borderRadius: 99,
          flex: "none",
          background: active && !tab.disabled ? palette.bar : "transparent",
        }}
      />
      <span className="min-w-0 flex-1 truncate">{tab.label}</span>
      {tab.dirty && <DirtyDot color={palette.dirty} />}
      {tab.count !== undefined && tab.count !== null && (
        <CountBadge count={tab.count} active={active} palette={palette} radius={5} padding="2px 6px" />
      )}
    </TabsTrigger>
  );
}

const TRIGGERS: Record<TabsDesignVariant, React.ComponentType<TriggerProps>> = {
  underline: UnderlineTrigger,
  segmented: SegmentedTrigger,
  pill: PillTrigger,
  vertical: VerticalTrigger,
};

/* -------------------------------------------------------------------------- */
/*  DesignTabs                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * The design-system tab set — underline, segmented, pill and vertical.
 * Built on Radix so arrow keys, Home/End and `activation` come for free.
 */
export function DesignTabs({
  tabs,
  variant,
  size = "md",
  appearance = "light",
  activation = "automatic",
  fitted = false,
  overflow = "scroll",
  overflowLabel = "More",
  visibleTabLimit,
  showBottomBorder = true,
  syncToUrl,
  onBeforeChange,
  loop = true,
  value,
  defaultValue,
  onChange,
  className,
  listClassName,
  children,
  verticalWidth = 190,
}: Omit<CustomTabsProps, "variant"> & { variant: TabsDesignVariant }) {
  const spec = TABS_SIZES[size];
  const palette = getTabsPalette(appearance);
  const Trigger = TRIGGERS[variant];

  const { activeValue, handleChange } = useDesignTabValue({
    tabs,
    value,
    defaultValue,
    onChange,
    onBeforeChange,
    syncToUrl,
  });

  // An explicit visibleTabLimit implies the menu — that is what it meant before
  // the design-system variants existed.
  const useMenu =
    (overflow === "menu" || visibleTabLimit !== undefined) &&
    variant !== "vertical" &&
    variant !== "pill";
  const { visibleTabs, overflowTabs } = React.useMemo(
    () =>
      useMenu
        ? splitOverflow(tabs, activeValue, visibleTabLimit ?? 2)
        : { visibleTabs: tabs, overflowTabs: [] as TabItem[] },
    [activeValue, tabs, useMenu, visibleTabLimit],
  );

  const scrollable = !useMenu && variant !== "vertical" && variant !== "pill";
  const { ref: scrollRef, edges, scrollBy } = useEdgeScroll(scrollable, activeValue);

  // Underline slides a 2px bar; segmented slides the whole selected pill.
  const slides = variant === "underline" || variant === "segmented";
  const { innerRef, indicator, animate } = useSlidingIndicator(
    slides,
    activeValue,
    `${size}|${fitted ? "fit" : "auto"}|${visibleTabs.map((t) => t.value).join(",")}`,
  );
  const slidingFill = slides && indicator.ready;

  const renderTriggers = (list: TabItem[]) =>
    list.map((tab) => (
      <Trigger
        key={tab.value}
        tab={tab}
        active={tab.value === activeValue}
        palette={palette}
        spec={spec}
        fitted={fitted}
        sliding={slidingFill}
      />
    ));

  /* ---- vertical ------------------------------------------------------- */

  if (variant === "vertical") {
    return (
      <TabsActiveValueContext.Provider value={activeValue}>
        <T
          value={activeValue}
          onValueChange={handleChange}
          activationMode={activation}
          orientation="vertical"
          className={cn("w-full flex-row! items-start gap-5", className)}
        >
          <TabsList
            variant="line"
            loop={loop}
            className={cn(
              "h-auto! flex-none flex-col items-stretch justify-start rounded-none bg-transparent p-0",
              listClassName,
            )}
            style={{
              width: verticalWidth,
              gap: 2,
              borderRight: showBottomBorder ? `1px solid ${palette.strip}` : undefined,
              paddingRight: showBottomBorder ? 10 : 0,
            }}
          >
            {renderTriggers(visibleTabs)}
          </TabsList>
          {children && <div className="min-w-[220px] flex-1">{children}</div>}
        </T>
      </TabsActiveValueContext.Provider>
    );
  }

  /* ---- horizontal ------------------------------------------------------ */

  const list = (
    <TabsList
      variant="line"
      loop={loop}
      className={cn(
        "h-auto! items-center justify-start rounded-none bg-transparent p-0",
        fitted ? "flex w-full" : "flex w-max",
        variant === "pill" && "flex-wrap",
        listClassName,
      )}
      style={{
        gap: variant === "underline" ? spec.gap : variant === "pill" ? 8 : 2,
      }}
    >
      {renderTriggers(visibleTabs)}
    </TabsList>
  );

  const menuNode = useMenu ? (
    <OverflowMenu
      overflowTabs={overflowTabs}
      overflowLabel={overflowLabel}
      activeValue={activeValue}
      onChange={handleChange}
      palette={palette}
      spec={spec}
      padding={variant === "segmented" ? spec.segPad : spec.underPad}
    />
  ) : null;

  let strip: React.ReactNode;

  if (variant === "segmented") {
    strip = (
      <div className={cn("flex max-w-full items-center gap-2", fitted && "w-full")}>
        <div
          className={cn("inline-flex min-w-0 overflow-auto", SCROLLBAR_HIDDEN)}
          style={{
            padding: 3,
            background: palette.segTrack,
            border: `1px solid ${palette.segTrackBorder}`,
            // Fully rounded so the track hugs the pill-shaped segments inside it.
            borderRadius: 999,
            width: fitted ? "100%" : "fit-content",
          }}
        >
          <div
            ref={innerRef}
            className={cn("relative flex", fitted ? "w-full" : "w-max")}
          >
            {/* One pill for the whole strip: it travels to the new segment
                instead of the fill blinking from one trigger to the next. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0"
              style={{
                width: indicator.width,
                height: indicator.height,
                borderRadius: 999,
                background: palette.segActiveBg,
                opacity: indicator.ready ? 1 : 0,
                transform: `translate(${indicator.left}px, ${indicator.top}px)`,
                transition: SLIDE_TRANSITION(animate),
              }}
            />
            {list}
          </div>
        </div>
        {menuNode}
      </div>
    );
  } else if (variant === "pill") {
    strip = list;
  } else {
    // underline
    strip = (
      <div className="relative">
        <div
          ref={scrollRef}
          className={cn("overflow-x-auto overflow-y-hidden", SCROLLBAR_HIDDEN)}
          style={{ borderBottom: showBottomBorder ? `1px solid ${palette.strip}` : undefined }}
        >
          {/* The More menu sits inline, directly after the last tab. */}
          <div
            ref={innerRef}
            className="relative flex w-max items-end"
            style={{ gap: spec.gap }}
          >
            {/* The wash travels with the bar, so the selection moves as one
                block instead of the tint blinking between tabs. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0"
              style={{
                width: indicator.width,
                height: indicator.height,
                borderRadius: "7px 7px 0 0",
                background: palette.underActiveBg,
                opacity: indicator.ready ? 1 : 0,
                transform: `translate(${indicator.left}px, ${indicator.top}px)`,
                transition: SLIDE_TRANSITION(animate),
              }}
            />
            {list}
            {menuNode}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 rounded-full"
              style={{
                bottom: -1,
                height: 3,
                width: indicator.width,
                background: palette.bar,
                opacity: indicator.ready ? 1 : 0,
                transform: `translateX(${indicator.left}px)`,
                transition: SLIDE_TRANSITION(animate),
              }}
            />
          </div>
        </div>
        {scrollable && edges.left && (
          <EdgeControl side="left" palette={palette} onClick={() => scrollBy(-180)} />
        )}
        {scrollable && edges.right && (
          <EdgeControl side="right" palette={palette} onClick={() => scrollBy(180)} />
        )}
      </div>
    );
  }

  return (
    <TabsActiveValueContext.Provider value={activeValue}>
      <T
        value={activeValue}
        onValueChange={handleChange}
        activationMode={activation}
        className={cn("w-full gap-4", className)}
      >
        {strip}
        {children}
      </T>
    </TabsActiveValueContext.Provider>
  );
}

DesignTabs.displayName = "DesignTabs";
