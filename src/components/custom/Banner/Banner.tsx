import * as React from "react";
import { Info, CircleCheck, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BannerRoot,
  BannerIcon,
  BannerContent,
} from "@/components/ui/banner";
import type { BannerProps } from "./Banner.types";

const DEFAULT_ICONS: Record<string, React.ReactNode> = {
  info: <Info />,
  success: <CircleCheck />,
  error: <CircleX />,
};

const CUSTOM_COLOR_KEYS = ["backgroundColor", "borderColor", "iconColor", "textColor"] as const;

function hasCustomColors(props: BannerProps) {
  return CUSTOM_COLOR_KEYS.some((k) => props[k] !== undefined);
}

export function Banner({
  variant = "info",
  message,
  children,
  icon,
  showIcon = true,
  className,
  backgroundColor,
  borderColor,
  iconColor,
  textColor,
  style,
  ...rest
}: BannerProps) {
  const usingCustom = hasCustomColors({ variant, message, children, icon, showIcon, className, backgroundColor, borderColor, iconColor, textColor });

  const customStyle: React.CSSProperties = usingCustom
    ? {
        ...(backgroundColor && { backgroundColor }),
        ...(borderColor && { borderColor }),
        ...(textColor && { color: textColor }),
      }
    : {};

  const resolvedIcon = icon ?? DEFAULT_ICONS[variant ?? "info"];

  return (
    <BannerRoot
      variant={usingCustom ? undefined : variant}
      className={cn(usingCustom && "border-[1.5px]", className)}
      style={{ ...customStyle, ...style }}
      {...rest}
    >
      {showIcon && (
        <BannerIcon
          style={
            iconColor
              ? { color: iconColor, ["--banner-icon" as string]: iconColor }
              : undefined
          }
        >
          {resolvedIcon}
        </BannerIcon>
      )}
      <BannerContent>{children ?? message}</BannerContent>
    </BannerRoot>
  );
}

Banner.displayName = "Banner";
