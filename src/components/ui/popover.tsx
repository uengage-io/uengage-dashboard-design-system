import * as React from "react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";
import { useZIndex } from "@/lib/zIndexContext";
import { FilterGroupMobileContext } from "@/lib/filterGroupContext";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  style,
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const { popover } = useZIndex();
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "uengage-ui",
          "min-w-[8rem] overflow-hidden rounded-[4px] border border-[#E5E7EB] bg-white p-0 shadow-md outline-none",
          className,
        )}
        style={{ zIndex: popover, ...style }}
        {...props}
      >
        {/* Reset mobile-drawer context so nested Selects (e.g. DatePickerCalendar's
            month/year navigation) render as popovers, not flat tap-lists. */}
        <FilterGroupMobileContext.Provider value={false}>
          {children}
        </FilterGroupMobileContext.Provider>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverTrigger, PopoverContent };
