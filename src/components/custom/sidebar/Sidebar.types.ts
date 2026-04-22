import type * as React from "react"

export type SidebarSide = "left" | "right" | "top" | "bottom"
export type SidebarSize = "sm" | "md" | "lg" | "full"

export interface SidebarProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void

  side?: SidebarSide
  size?: SidebarSize

  overlay?: boolean
  closeOnOutsideClick?: boolean
  persistentOnDesktop?: boolean
  trigger?: React.ReactNode

  className?: string
  contentClassName?: string

  children?: React.ReactNode
}
