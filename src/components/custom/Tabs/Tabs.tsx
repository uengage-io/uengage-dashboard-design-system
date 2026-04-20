import * as React from "react";
import { Tabs as T, TabsList } from "@/components/ui/tabs";
import { CustomTabsTrigger } from "@/components/custom/Tabs/CustomTabsTrigger";
import { cn } from "@/lib/utils";
import type { CustomTabsProps } from "@/components/custom/Tabs/Tabs.types";

function Tabs(props: CustomTabsProps) {
  const variant = props.variant ?? "primary";
  return variant === "secondary" ? (
    <SecondaryTabs {...props} />
  ) : (
    <PrimaryTabs {...props} />
  );
}

function PrimaryTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  className,
}: CustomTabsProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const initial = value ?? defaultValue ?? tabs[0]?.value ?? "";
  const [activeValue, setActiveValue] = React.useState<string>(initial);
  const [indicator, setIndicator] = React.useState<{
    left: number;
    width: number;
    ready: boolean;
  }>({ left: 0, width: 0, ready: false });

  React.useEffect(() => {
    if (value !== undefined) setActiveValue(value);
  }, [value]);

  React.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !activeValue) return;
    const btn = wrapper.querySelector(
      `[data-tab-value="${CSS.escape(activeValue)}"]`,
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
  }, [activeValue, tabs.length, tabs.map((t) => t.value).join("|")]);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const handle = () => {
      const btn = wrapper.querySelector(
        `[data-tab-value="${CSS.escape(activeValue)}"]`,
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

  const handleChange = (v: string) => {
    onChange?.(v);
    if (value === undefined) setActiveValue(v);
  };

  return (
    <T
      className={cn("w-full", className)}
      {...(value !== undefined
        ? { value, onValueChange: handleChange }
        : { defaultValue, onValueChange: handleChange })}
    >
      <div
        ref={wrapperRef}
        className="relative w-full overflow-x-auto border-b border-[#E5E7EB] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <TabsList
          variant="line"
          className={cn(
            "flex w-max min-w-full flex-row items-center justify-start",
            "h-auto rounded-none bg-transparent p-0 gap-4",
          )}
        >
          {tabs.map((tab) => (
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
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 h-0.75 rounded-full bg-[#0A5A2A]",
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
    </T>
  );
}

function SecondaryTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  className,
}: CustomTabsProps) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const initial = value ?? defaultValue ?? tabs[0]?.value ?? "";
  const [activeValue, setActiveValue] = React.useState<string>(initial);
  const [chip, setChip] = React.useState<{
    left: number;
    width: number;
    ready: boolean;
  }>({ left: 0, width: 0, ready: false });

  React.useEffect(() => {
    if (value !== undefined) setActiveValue(value);
  }, [value]);

  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !activeValue) return;
    const btn = list.querySelector(
      `[data-tab-value="${CSS.escape(activeValue)}"]`,
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
  }, [activeValue, tabs.length, tabs.map((t) => t.value).join("|")]);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const handle = () => {
      const btn = list.querySelector(
        `[data-tab-value="${CSS.escape(activeValue)}"]`,
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

  const handleChange = (v: string) => {
    onChange?.(v);
    if (value === undefined) setActiveValue(v);
  };

  return (
    <T
      className={cn("inline-flex max-w-full", className)}
      {...(value !== undefined
        ? { value, onValueChange: handleChange }
        : { defaultValue, onValueChange: handleChange })}
    >
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
          {tabs.map((tab) => (
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
      </div>
    </T>
  );
}

Tabs.displayName = "Tabs";

export { Tabs };
