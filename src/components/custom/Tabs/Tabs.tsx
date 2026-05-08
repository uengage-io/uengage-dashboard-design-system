import * as React from "react";
import { createPortal } from "react-dom";
import { Tabs as T, TabsList } from "@/components/ui/tabs";
import { CustomTabsTrigger } from "@/components/custom/Tabs/CustomTabsTrigger";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOCUS_RING } from "@/utils/tokens";
import type {
  CustomTabsProps,
  TabItem,
} from "@/components/custom/Tabs/Tabs.types";

const TAB_COLOR = "#0A5A2A";

function getInitialValue(
  tabs: TabItem[],
  value?: string,
  defaultValue?: string,
) {
  return value ?? defaultValue ?? tabs[0]?.value ?? "";
}

function escapeTabValue(value: string) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }

  return value.replace(/["\\]/g, "\\$&");
}

function useTabValue(
  tabs: TabItem[],
  value: string | undefined,
  defaultValue: string | undefined,
  onChange?: (value: string) => void,
) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(() =>
    getInitialValue(tabs, value, defaultValue),
  );
  const activeValue = value ?? uncontrolledValue;

  React.useEffect(() => {
    if (value !== undefined) return;
    if (tabs.some((tab) => tab.value === uncontrolledValue)) return;
    setUncontrolledValue(getInitialValue(tabs, value, defaultValue));
  }, [defaultValue, tabs, uncontrolledValue, value]);

  const handleChange = React.useCallback(
    (nextValue: string) => {
      if (!tabs.some((tab) => tab.value === nextValue && !tab.disabled)) return;
      if (value === undefined) setUncontrolledValue(nextValue);
      onChange?.(nextValue);
    },
    [onChange, tabs, value],
  );

  return { activeValue, handleChange };
}

function getVisibleTabs(
  tabs: TabItem[],
  activeValue: string,
  visibleTabLimit?: number,
) {
  if (visibleTabLimit === undefined || tabs.length <= visibleTabLimit) {
    return { visibleTabs: tabs, overflowTabs: [] as TabItem[] };
  }

  const normalizedLimit = Math.min(
    Math.max(visibleTabLimit, 1),
    tabs.length - 1,
  );
  const initialVisibleTabs = tabs.slice(0, normalizedLimit);
  const initialVisibleValues = new Set(
    initialVisibleTabs.map((tab) => tab.value),
  );

  if (!activeValue || initialVisibleValues.has(activeValue)) {
    return {
      visibleTabs: initialVisibleTabs,
      overflowTabs: tabs.slice(normalizedLimit),
    };
  }

  const activeTab = tabs.find((tab) => tab.value === activeValue);
  if (!activeTab) {
    return {
      visibleTabs: initialVisibleTabs,
      overflowTabs: tabs.slice(normalizedLimit),
    };
  }

  let replacementIndex = -1;
  for (let index = initialVisibleTabs.length - 1; index >= 0; index -= 1) {
    if (initialVisibleTabs[index]?.value !== activeValue) {
      replacementIndex = index;
      break;
    }
  }
  const safeReplacementIndex =
    replacementIndex >= 0 ? replacementIndex : normalizedLimit - 1;
  const replacedTab = initialVisibleTabs[safeReplacementIndex];
  const nextVisibleTabs = [...initialVisibleTabs];
  nextVisibleTabs[safeReplacementIndex] = activeTab;

  const overflowTabs = tabs.filter((tab) => {
    if (tab.value === activeTab.value) return false;
    if (replacedTab && tab.value === replacedTab.value) return true;
    return !nextVisibleTabs.some(
      (visibleTab) => visibleTab.value === tab.value,
    );
  });

  return { visibleTabs: nextVisibleTabs, overflowTabs };
}

// Used by TertiaryTabs (pill/chip variant) overflow
function OverflowTabsSelect({
  overflowTabs,
  overflowLabel,
  activeValue,
  onChange,
  className,
}: {
  overflowTabs: TabItem[];
  overflowLabel: string;
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);

  if (overflowTabs.length === 0) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex shrink-0 items-center whitespace-nowrap transition-colors duration-200",
            "relative z-10 gap-1 rounded-full px-2 py-1 sm:px-3 text-[13px] sm:text-[14px] font-semibold text-[#595959]",
            `hover:text-black ${FOCUS_RING}`,
            className,
          )}
        >
          <span>{overflowLabel}</span>
          <ChevronDown
            size={16}
            strokeWidth={2.25}
            className={cn(
              "text-[#0A5A2A] transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[220px] rounded-[10px] border border-[#E5E7EB] p-1 shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
      >
        <div className="flex flex-col">
          {overflowTabs.map((tab) => {
            const isActive = tab.value === activeValue;

            return (
              <button
                key={tab.value}
                type="button"
                disabled={tab.disabled}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-left text-[13px] sm:text-[14px]",
                  "transition-colors duration-150",
                  isActive
                    ? "bg-[#F0F9F4] font-semibold text-[#0A5A2A]"
                    : "text-[#374151] hover:bg-[#F8FAFC]",
                  tab.disabled && "cursor-not-allowed opacity-50",
                )}
                onClick={() => {
                  if (tab.disabled) return;
                  onChange(tab.value);
                  setOpen(false);
                }}
              >
                <span className="truncate">{tab.label}</span>
                {isActive && (
                  <Check
                    size={16}
                    strokeWidth={2.5}
                    className="shrink-0 text-[#0A5A2A]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ── Line-tab variants (primary + secondary) share the same overflow trigger/panel
//    pattern; variant controls text colours and active-item style.

function LineTabsOverflowTrigger({
  label,
  open,
  onClick,
  btnRef,
  variant,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
  btnRef: React.RefObject<HTMLButtonElement | null>;
  variant: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap transition-colors duration-200",
        isPrimary
          ? "relative flex-none gap-1 p-[10px] text-[15px] font-semibold text-gray-500 hover:text-gray-900"
          : "relative flex-none gap-1 rounded-t-lg px-2 py-3 sm:px-3 sm:py-5 text-[13px] sm:text-[14px] font-medium text-[#595959] hover:text-[#0A5A2A]",
        FOCUS_RING,
      )}
    >
      <span>{label}</span>
      <ChevronDown
        size={16}
        strokeWidth={2.25}
        className={cn(
          isPrimary ? "text-gray-500" : "text-[#0A5A2A]",
          "transition-transform duration-200",
          open && "rotate-180",
        )}
      />
    </button>
  );
}

function LineTabsOverflowPanel({
  overflowTabs,
  activeValue,
  onChange,
  onClose,
  triggerRef,
  variant,
}: {
  overflowTabs: TabItem[];
  activeValue: string;
  onChange: (value: string) => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  variant: "primary" | "secondary";
}) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = React.useState<React.CSSProperties>({});

  React.useLayoutEffect(() => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setPanelStyle({
      position: "fixed",
      top: rect.bottom + 8,
      right: Math.max(0, window.innerWidth - rect.right),
      zIndex: 9999,
    });
  }, [triggerRef]);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      )
        return;
      onClose();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    // Close on scroll so the panel doesn't drift away from the trigger.
    const handleScroll = () => onClose();
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScroll, { capture: true });
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [onClose, triggerRef]);

  const activeItemClass =
    variant === "primary"
      ? "bg-[#F3F4F6] font-semibold text-[#111827]"
      : "bg-[#F0F9F4] font-semibold text-[#0A5A2A]";
  const checkClass =
    variant === "primary" ? "text-[#111827]" : "text-[#0A5A2A]";

  return createPortal(
    <div
      ref={panelRef}
      style={panelStyle}
      className={cn(
        "w-[220px] max-w-[calc(100vw-1rem)]",
        "rounded-[10px] border border-[#E5E7EB] bg-white p-1",
        "shadow-[0_12px_32px_rgba(15,23,42,0.12)]",
        "animate-[uengage-popover-in_140ms_ease-out]",
      )}
    >
      <div className="flex flex-col">
        {overflowTabs.map((tab) => {
          const isActive = tab.value === activeValue;
          return (
            <button
              key={tab.value}
              type="button"
              disabled={tab.disabled}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-left text-[13px] sm:text-[14px]",
                "transition-colors duration-150",
                isActive
                  ? activeItemClass
                  : "text-[#374151] hover:bg-[#F8FAFC]",
                tab.disabled && "cursor-not-allowed opacity-50",
              )}
              onClick={() => {
                if (tab.disabled) return;
                onChange(tab.value);
                onClose();
              }}
            >
              <span className="truncate">{tab.label}</span>
              {isActive && (
                <Check
                  size={16}
                  strokeWidth={2.5}
                  className={cn("shrink-0", checkClass)}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>,
    document.body,
  );
}

function Tabs(props: CustomTabsProps) {
  const variant = props.variant ?? "primary";
  if (variant === "tertiary") return <TertiaryTabs {...props} />;
  if (variant === "secondary") return <SecondaryTabs {...props} />;
  return <PrimaryTabs {...props} />;
}

// Primary: sliding gradient indicator with glow, bold dark text when active
function PrimaryTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  visibleTabLimit,
  overflowLabel = "More Options",
  className,
}: CustomTabsProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const overflowBtnRef = React.useRef<HTMLButtonElement>(null);
  const [overflowOpen, setOverflowOpen] = React.useState(false);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange,
  );
  const [indicator, setIndicator] = React.useState<{
    left: number;
    width: number;
    ready: boolean;
  }>({ left: 0, width: 0, ready: false });

  const { visibleTabs, overflowTabs } = React.useMemo(
    () => getVisibleTabs(tabs, activeValue, visibleTabLimit),
    [activeValue, tabs, visibleTabLimit],
  );

  const handleChangeAndClose = React.useCallback(
    (v: string) => {
      handleChange(v);
      setOverflowOpen(false);
    },
    [handleChange],
  );

  React.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !activeValue) return;
    const btn = wrapper.querySelector(
      `[data-tab-value="${escapeTabValue(activeValue)}"]`,
    ) as HTMLElement | null;
    if (!btn) {
      setIndicator((i) => ({ ...i, ready: false }));
      return;
    }
    setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth, ready: true });
  }, [
    activeValue,
    visibleTabs.length,
    visibleTabs.map((t) => t.value).join("|"),
  ]);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const handle = () => {
      const btn = wrapper.querySelector(
        `[data-tab-value="${escapeTabValue(activeValue)}"]`,
      ) as HTMLElement | null;
      if (!btn) return;
      setIndicator((prev) => ({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        ready: prev.ready,
      }));
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [activeValue]);

  return (
    <T
      value={activeValue}
      onValueChange={handleChangeAndClose}
      className={cn("w-full", className)}
    >
      <div className="relative w-full border-b border-[#E5E7EB]">
        <div
          ref={wrapperRef}
          className="relative flex min-w-0 items-end overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <TabsList
            variant="line"
            className={cn(
              "flex w-max min-w-0 flex-row items-center justify-start",
              "h-auto! rounded-none bg-transparent p-0 gap-6",
            )}
          >
            {visibleTabs.map((tab) => (
              <CustomTabsTrigger
                key={tab.value}
                value={tab.value}
                disabled={tab.disabled}
                variant="primary"
              >
                {tab.label}
              </CustomTabsTrigger>
            ))}
          </TabsList>

          {overflowTabs.length > 0 && (
            <LineTabsOverflowTrigger
              label={overflowLabel}
              open={overflowOpen}
              onClick={() => setOverflowOpen((o) => !o)}
              btnRef={overflowBtnRef}
              variant="primary"
            />
          )}

          {/* Single sliding indicator shared across all tabs */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 h-[8px] rounded-t-full",
              "shadow-[0_-3px_10px_rgba(0,168,107,0.45)]",
              indicator.ready
                ? "transition-all duration-300 ease-out opacity-100"
                : "opacity-0",
            )}
            style={{
              background:
                "linear-gradient(189.6deg, #003C1B -188.01%, #00A86B 92.12%)",
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
          />
        </div>

        {overflowOpen && overflowTabs.length > 0 && (
          <LineTabsOverflowPanel
            overflowTabs={overflowTabs}
            activeValue={activeValue}
            onChange={handleChangeAndClose}
            onClose={() => setOverflowOpen(false)}
            triggerRef={overflowBtnRef}
            variant="primary"
          />
        )}
      </div>
    </T>
  );
}

// Secondary (formerly primary): green active text, thin indicator, subtle overlay
function SecondaryTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  visibleTabLimit,
  overflowLabel = "More Options",
  className,
}: CustomTabsProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const overflowBtnRef = React.useRef<HTMLButtonElement>(null);
  const [overflowOpen, setOverflowOpen] = React.useState(false);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange,
  );
  const [indicator, setIndicator] = React.useState<{
    left: number;
    width: number;
    ready: boolean;
  }>({ left: 0, width: 0, ready: false });

  const { visibleTabs, overflowTabs } = React.useMemo(
    () => getVisibleTabs(tabs, activeValue, visibleTabLimit),
    [activeValue, tabs, visibleTabLimit],
  );

  const handleChangeAndClose = React.useCallback(
    (v: string) => {
      handleChange(v);
      setOverflowOpen(false);
    },
    [handleChange],
  );

  React.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !activeValue) return;
    const btn = wrapper.querySelector(
      `[data-tab-value="${escapeTabValue(activeValue)}"]`,
    ) as HTMLElement | null;
    if (!btn) {
      setIndicator((i) => ({ ...i, ready: false }));
      return;
    }
    setIndicator({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      ready: true,
    });
  }, [
    activeValue,
    visibleTabs.length,
    visibleTabs.map((t) => t.value).join("|"),
  ]);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const handle = () => {
      const btn = wrapper.querySelector(
        `[data-tab-value="${escapeTabValue(activeValue)}"]`,
      ) as HTMLElement | null;
      if (!btn) return;
      setIndicator((prev) => ({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        ready: prev.ready,
      }));
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [activeValue]);

  return (
    <T
      value={activeValue}
      onValueChange={handleChangeAndClose}
      className={cn("w-full", className)}
    >
      <div className="relative w-full border-b border-[#E5E7EB]">
        <div
          ref={wrapperRef}
          className="relative flex min-w-0 items-end gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <TabsList
            variant="line"
            className={cn(
              "flex w-max min-w-0 flex-row items-center justify-start",
              "h-auto! rounded-none bg-transparent p-0 gap-2",
            )}
          >
            {visibleTabs.map((tab) => (
              <CustomTabsTrigger
                key={tab.value}
                value={tab.value}
                disabled={tab.disabled}
                variant="secondary"
              >
                {tab.label}
              </CustomTabsTrigger>
            ))}
          </TabsList>

          {overflowTabs.length > 0 && (
            <LineTabsOverflowTrigger
              label={overflowLabel}
              open={overflowOpen}
              onClick={() => setOverflowOpen((o) => !o)}
              btnRef={overflowBtnRef}
              variant="secondary"
            />
          )}

          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-0 left-0 h-0.75 rounded-full bg-[#0b652d]",
              indicator.ready
                ? "transition-all duration-300 ease-out opacity-100"
                : "opacity-0",
            )}
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
          />
        </div>

        {overflowOpen && overflowTabs.length > 0 && (
          <LineTabsOverflowPanel
            overflowTabs={overflowTabs}
            activeValue={activeValue}
            onChange={handleChangeAndClose}
            onClose={() => setOverflowOpen(false)}
            triggerRef={overflowBtnRef}
            variant="secondary"
          />
        )}
      </div>
    </T>
  );
}

// Tertiary (formerly secondary): pill/chip style with animated background slab
function TertiaryTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  visibleTabLimit,
  overflowLabel = "More Options",
  className,
}: CustomTabsProps) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange,
  );
  const [chip, setChip] = React.useState<{
    left: number;
    width: number;
    ready: boolean;
  }>({ left: 0, width: 0, ready: false });

  const { visibleTabs, overflowTabs } = React.useMemo(
    () => getVisibleTabs(tabs, activeValue, visibleTabLimit),
    [activeValue, tabs, visibleTabLimit],
  );

  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !activeValue) return;
    const btn = list.querySelector(
      `[data-tab-value="${escapeTabValue(activeValue)}"]`,
    ) as HTMLElement | null;
    if (!btn) {
      setChip((c) => ({ ...c, ready: false }));
      return;
    }
    setChip({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      ready: true,
    });
  }, [
    activeValue,
    visibleTabs.length,
    visibleTabs.map((t) => t.value).join("|"),
  ]);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const handle = () => {
      const btn = list.querySelector(
        `[data-tab-value="${escapeTabValue(activeValue)}"]`,
      ) as HTMLElement | null;
      if (!btn) return;
      setChip((prev) => ({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        ready: prev.ready,
      }));
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [activeValue]);

  return (
    <T
      value={activeValue}
      onValueChange={handleChange}
      className={cn("inline-flex max-w-full", className)}
    >
      <div className="flex max-w-full items-center">
        <div
          ref={listRef}
          className={cn(
            "relative inline-flex max-w-full items-center",
            "rounded-full bg-[#dde4f0] p-0.5",
            "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-0.5 bottom-0.5 left-0 rounded-full",
              "bg-[#C8E7B8] border border-[#0A5A2A]",
              chip.ready
                ? "transition-all duration-300 ease-out opacity-100"
                : "opacity-0",
            )}
            style={{
              transform: `translateX(${chip.left}px)`,
              width: chip.width,
            }}
          />
          <TabsList
            variant="line"
            className={cn(
              "inline-flex items-center",
              "rounded-full! bg-transparent! p-0!",
            )}
          >
            {visibleTabs.map((tab) => (
              <CustomTabsTrigger
                key={tab.value}
                value={tab.value}
                disabled={tab.disabled}
                variant="tertiary"
              >
                {tab.label}
              </CustomTabsTrigger>
            ))}
          </TabsList>
          {overflowTabs.length > 0 && (
            <span
              className="mx-1 h-4 w-px shrink-0 bg-[#b8c4d9]"
              aria-hidden="true"
            />
          )}
          <OverflowTabsSelect
            overflowTabs={overflowTabs}
            overflowLabel={overflowLabel}
            activeValue={activeValue}
            onChange={handleChange}
          />
        </div>
      </div>
    </T>
  );
}

Tabs.displayName = "Tabs";

export { Tabs };
