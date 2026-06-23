import * as React from "react";
import { X } from "lucide-react";
import { SidebarZIndexProvider } from "@/lib/zIndexContext";

import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import {
  sidebarContentVariants,
  sidebarPersistentVariants,
} from "./Sidebar.variants";
import type { SidebarProps } from "./Sidebar.types";

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const query = `(min-width: ${breakpoint}px)`;
    const media = window.matchMedia(query);
    const setFromMedia = () => setIsDesktop(media.matches);

    setFromMedia();
    media.addEventListener("change", setFromMedia);
    return () => media.removeEventListener("change", setFromMedia);
  }, [breakpoint]);

  return isDesktop;
}

function SidebarHeader({
  heading,
  closeIcon,
  divider,
  onClose,
}: {
  heading?: React.ReactNode;
  closeIcon?: boolean;
  divider?: boolean;
  onClose: () => void;
}) {
  if (!heading && !closeIcon) return null;

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3">
        {heading ? (
          <span className="text-base font-semibold leading-none">
            {heading}
          </span>
        ) : (
          <span />
        )}
        {closeIcon ? (
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm p-1 text-[#202020] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 " />
          </button>
        ) : null}
      </div>
      {divider ? <div className="border-b" /> : null}
    </>
  );
}

export function Sidebar({
  open,
  defaultOpen = false,
  onOpenChange,
  side = "left",
  size = "md",
  sizePercent,
  overlay = true,
  closeOnOutsideClick = true,
  persistentOnDesktop = false,
  trigger,
  heading,
  closeIcon = false,
  divider = false,
  className,
  contentClassName,
  children,
}: SidebarProps) {
  const isDesktop = useIsDesktop();
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const resolvedOpen = isControlled ? open : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  // Inline styles for percentage-based sizing. vw/vh are inherently responsive
  // and override any CVA width/maxWidth class via specificity.
  // On mobile (< 768px) left/right sidebars always take the full viewport width.
  const customSizeStyle = React.useMemo<React.CSSProperties>(() => {
    if (sizePercent == null) return {};
    const pct = Math.min(100, Math.max(1, sizePercent));
    if (side === "top" || side === "bottom") {
      return { height: `${pct}vh`, maxHeight: "100vh" };
    }
    if (!isDesktop) return { width: "100vw", maxWidth: "100vw" };
    return { width: `${pct}vw`, maxWidth: "100vw" };
  }, [sizePercent, side, isDesktop]);

  // Animation duration scaled to panel width so wider panels don't feel like
  // they're teleporting. --sb-open-dur / --sb-close-dur are read by globals.css.
  // sizePercent overrides the preset — treat 1 vw ≈ 3 ms open, 2 ms close.
  const animDurationStyle = React.useMemo<React.CSSProperties>(() => {
    if (sizePercent != null) {
      const pct = Math.min(100, Math.max(1, sizePercent));
      return {
        "--sb-open-dur": `${Math.round(pct * 3)}ms`,
        "--sb-close-dur": `${Math.round(pct * 2)}ms`,
      } as React.CSSProperties;
    }
    const presets: Record<string, { open: string; close: string }> = {
      sm: { open: "260ms", close: "180ms" },
      md: { open: "300ms", close: "200ms" },
      lg: { open: "340ms", close: "220ms" },
      full: { open: "400ms", close: "260ms" },
    };
    const { open: openDur, close: closeDur } =
      presets[size ?? "md"] ?? presets["md"]!;
    return {
      "--sb-open-dur": openDur,
      "--sb-close-dur": closeDur,
    } as React.CSSProperties;
  }, [size, sizePercent]);

  const shouldRenderPersistent = persistentOnDesktop && isDesktop;

  if (shouldRenderPersistent) {
    if (!resolvedOpen) {
      return null;
    }

    return (
      <SidebarZIndexProvider>
        <aside
          className={cn(
            sidebarPersistentVariants({ side, size }),
            className,
            contentClassName,
          )}
          style={customSizeStyle}
        >
          <SidebarHeader
            heading={heading}
            closeIcon={closeIcon}
            divider={divider}
            onClose={() => handleOpenChange(false)}
          />
          {children}
        </aside>
      </SidebarZIndexProvider>
    );
  }

  return (
    <Drawer open={resolvedOpen} onOpenChange={handleOpenChange} modal={false}>
      {trigger ? <DrawerTrigger asChild>{trigger}</DrawerTrigger> : null}
      {overlay ? (
        <DrawerOverlay
          onClick={() => {
            if (closeOnOutsideClick) {
              handleOpenChange(false);
            }
          }}
        />
      ) : null}
      <DrawerContent
        aria-label={`${side} sidebar`}
        data-side={side}
        onInteractOutside={(event) => {
          // When the overlay is rendered it owns outside-click closing via its
          // onClick. Prevent Radix's built-in dismiss so clicking the overlay
          // never triggers two close cycles back-to-back (which restarts the
          // close animation and causes a visible jerk/flicker).
          if (overlay) {
            event.preventDefault();
            return;
          }
          if (!closeOnOutsideClick) event.preventDefault();
        }}
        className={cn(
          sidebarContentVariants({ side, size }),
          className,
          contentClassName,
        )}
        style={{ ...animDurationStyle, ...customSizeStyle }}
      >
        <SidebarZIndexProvider>
          <SidebarHeader
            heading={heading}
            closeIcon={closeIcon}
            divider={divider}
            onClose={() => handleOpenChange(false)}
          />
          {children}
        </SidebarZIndexProvider>
      </DrawerContent>
    </Drawer>
  );
}
