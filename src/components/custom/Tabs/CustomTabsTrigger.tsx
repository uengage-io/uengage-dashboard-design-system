import * as React from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { FOCUS_RING } from "@/utils/tokens";
import {
  tabTriggerVariants,
  tabPillClass,
  tabOverlayClass,
} from "./tabsVariants";

interface CustomTabsTriggerProps
  extends React.ComponentProps<typeof TabsTrigger> {
  variant?: "primary" | "secondary" | "tertiary";
}

const STRIP_SHADCN_DEFAULTS = [
  "after:hidden after:content-none after:bg-transparent after:opacity-0",
  "border-0 shadow-none bg-transparent",
  "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-transparent",
  "focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none",
].join(" ");

function CustomTabsTrigger({
  className,
  children,
  disabled,
  variant = "primary",
  ...props
}: CustomTabsTriggerProps) {
  const state = disabled ? "disabled" : "inactive";

  if (variant === "tertiary") {
    return (
      <TabsTrigger
        disabled={disabled}
        data-tab-value={props.value}
        className={cn(
          "relative z-10 flex-none w-auto cursor-pointer select-none whitespace-nowrap",
          "rounded-full px-2 py-1 sm:px-3 text-[13px] sm:text-[14px] font-semibold",
          "transition-colors duration-300 ease-out outline-none",
          "text-[#595959] hover:text-black data-[state=active]:!text-black!",
          "bg-transparent data-[state=active]:bg-transparent",
          "border-0 shadow-none",
          "data-[state=active]:border-0 data-[state=active]:shadow-none",
          "after:hidden after:content-none",
          FOCUS_RING,
          "disabled:pointer-events-none disabled:text-[#D1D5DB]",
          className,
        )}
        {...props}
      >
        {children}
      </TabsTrigger>
    );
  }

  if (variant === "secondary") {
    return (
      <TabsTrigger
        disabled={disabled}
        data-tab-value={props.value}
        className={cn(
          "group/tab flex-none w-auto",
          tabTriggerVariants({ state }),
          STRIP_SHADCN_DEFAULTS,
          "data-[state=active]:!text-[#0A5A2A]! data-[state=active]:!font-semibold!",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            tabPillClass,
            "transition-colors duration-300 ease-out",
            "text-gray-500 group-hover/tab:text-[#0A5A2A]",
            "group-data-[state=active]/tab:text-[#0A5A2A] group-data-[state=active]/tab:font-semibold",
          )}
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            tabOverlayClass,
            "transition-colors duration-300 ease-out",
            "group-data-[state=active]/tab:bg-[#0A5A2A]/5",
          )}
        />
      </TabsTrigger>
    );
  }

  // "primary" — span+group ensures color wins over shadcn's own data-[state=active] rule
  return (
    <TabsTrigger
      disabled={disabled}
      data-tab-value={props.value}
      className={cn(
        "group/tab relative flex-none w-auto cursor-pointer select-none whitespace-nowrap",
        "p-[10px] text-[15px] font-semibold",
        "transition-colors duration-200 outline-none",
        "bg-transparent data-[state=active]:bg-transparent",
        "border-0 shadow-none after:hidden after:content-none",
        "data-[state=active]:border-0 data-[state=active]:shadow-none",
        FOCUS_RING,
        "disabled:pointer-events-none",
        STRIP_SHADCN_DEFAULTS,
        className,
      )}
      {...props}
    >
      <span className="relative z-10 transition-colors duration-200 text-gray-500 group-hover/tab:text-[#0A5A2A] group-data-[state=active]/tab:text-[#0A5A2A] group-disabled/tab:text-[#D1D5DB]">
        {children}
      </span>
    </TabsTrigger>
  );
}

CustomTabsTrigger.displayName = "CustomTabsTrigger";

export { CustomTabsTrigger };
export type { CustomTabsTriggerProps };
