import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Drawer({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DrawerPortal>
      <DialogPrimitive.Overlay
        data-slot="drawer-overlay"
        className={cn(
          "uengage-ui",
          "fixed inset-0 z-[400] bg-black/50 transition-opacity opacity-0",
          "data-[state=open]:opacity-100 data-[state=open]:duration-300 data-[state=open]:ease-out",
          "data-[state=closed]:opacity-0 data-[state=closed]:duration-200 data-[state=closed]:ease-in",
          className
        )}
        {...props}
      />
    </DrawerPortal>
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  const accessibleTitle = props["aria-label"] ?? "Drawer"

  return (
    <DrawerPortal>
      <DialogPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "uengage-ui",
          "fixed z-50 bg-background border shadow-lg outline-none",
          className
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">
          {accessibleTitle}
        </DialogPrimitive.Title>
        {children}
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
