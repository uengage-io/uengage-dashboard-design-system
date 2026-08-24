import type * as React from "react"

export type SidebarSide = "left" | "right" | "right-slide" | "top" | "bottom"
export type SidebarSize = "sm" | "md" | "lg" | "full"

export interface SidebarProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void

  side?: SidebarSide
  size?: SidebarSize
  /** Percentage of the viewport (1–100) the sidebar should occupy.
   *  Overrides `size` when provided. Uses vw for left/right, vh for top/bottom. */
  sizePercent?: number

  overlay?: boolean
  closeOnOutsideClick?: boolean
  persistentOnDesktop?: boolean
  trigger?: React.ReactNode

  heading?: React.ReactNode
  closeIcon?: boolean
  divider?: boolean

  className?: string
  contentClassName?: string

  children?: React.ReactNode
}
