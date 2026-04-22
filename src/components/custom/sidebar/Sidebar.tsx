import * as React from "react"

import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import { sidebarContentVariants, sidebarPersistentVariants } from "./Sidebar.variants"
import type { SidebarProps } from "./Sidebar.types"

function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    const query = `(min-width: ${breakpoint}px)`
    const media = window.matchMedia(query)
    const setFromMedia = () => setIsDesktop(media.matches)

    setFromMedia()
    media.addEventListener("change", setFromMedia)
    return () => media.removeEventListener("change", setFromMedia)
  }, [breakpoint])

  return isDesktop
}

export function Sidebar({
  open,
  defaultOpen = false,
  onOpenChange,
  side = "left",
  size = "md",
  overlay = true,
  closeOnOutsideClick = true,
  persistentOnDesktop = false,
  trigger,
  className,
  contentClassName,
  children,
}: SidebarProps) {
  const isDesktop = useIsDesktop()
  const isControlled = open !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const resolvedOpen = isControlled ? open : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  const shouldRenderPersistent = persistentOnDesktop && isDesktop

  if (shouldRenderPersistent) {
    if (!resolvedOpen) {
      return null
    }

    return (
      <aside
        className={cn(
          sidebarPersistentVariants({ side, size }),
          className,
          contentClassName
        )}
      >
        {children}
      </aside>
    )
  }

  return (
    <Drawer open={resolvedOpen} onOpenChange={handleOpenChange}>
      {trigger ? <DrawerTrigger asChild>{trigger}</DrawerTrigger> : null}
      {overlay ? (
        <DrawerOverlay
          onClick={() => {
            if (closeOnOutsideClick) {
              handleOpenChange(false)
            }
          }}
        />
      ) : null}
      <DrawerContent
        aria-label={`${side} sidebar`}
        onInteractOutside={
          closeOnOutsideClick ? undefined : (event) => event.preventDefault()
        }
        className={cn(
          sidebarContentVariants({ side, size }),
          className,
          contentClassName
        )}
      >
        {children}
      </DrawerContent>
    </Drawer>
  )
}
