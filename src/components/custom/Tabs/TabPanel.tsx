import * as React from "react";

import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabsActiveValueContext } from "./DesignTabs";
import type { TabPanelProps } from "./Tabs.types";

/**
 * A tab panel. Cross-fades in rather than jumping.
 *
 * `lazy` (the default) mounts the panel on its first visit; `keepMounted` holds
 * it in the tree afterwards so scroll position and form state survive a switch.
 */
export function TabPanel({
  value,
  lazy = true,
  keepMounted = false,
  className,
  children,
  ...rest
}: TabPanelProps) {
  const activeValue = React.useContext(TabsActiveValueContext);
  const isActive = activeValue === value;

  const [seen, setSeen] = React.useState(isActive);
  React.useEffect(() => {
    if (isActive) setSeen(true);
  }, [isActive]);

  // Outside a DesignTabs there is no context to read, so fall back to Radix's
  // own mount/unmount behaviour.
  const contextless = activeValue === null;

  if (!contextless && lazy && !seen) return null;

  return (
    <TabsContent
      value={value}
      forceMount={keepMounted && !contextless ? true : undefined}
      className={cn(
        "outline-none data-[state=inactive]:hidden",
        "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1 data-[state=active]:duration-200",
        className,
      )}
      {...rest}
    >
      {children}
    </TabsContent>
  );
}

TabPanel.displayName = "TabPanel";
