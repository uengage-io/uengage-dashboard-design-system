import type * as React from "react";

export type BannerVariant = "info" | "success" | "error" | "warning";

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual style of the banner.
   * @default "info"
   */
  variant?: BannerVariant;
  /** Text content. Alternatively pass children. */
  message?: React.ReactNode;
  /** Override the default variant icon. Pass `null` to hide without setting `showIcon={false}`. */
  icon?: React.ReactNode;
  /** Whether to render the leading icon.
   * @default true
   */
  showIcon?: boolean;
  /** Custom background color (CSS value). Overrides the variant palette. */
  backgroundColor?: string;
  /** Custom border color (CSS value). Overrides the variant palette. */
  borderColor?: string;
  /** Custom icon color (CSS value). Overrides the variant palette. */
  iconColor?: string;
  /** Custom text color (CSS value). Overrides the variant palette. */
  textColor?: string;
}
