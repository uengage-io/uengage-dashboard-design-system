"use client";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx } from 'react/jsx-runtime';

// src/components/ui/banner.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var bannerVariants = cva(
  "flex items-center gap-[10px] rounded-xl border-[1.5px] px-5 py-3.5 text-sm font-normal leading-snug",
  {
    variants: {
      variant: {
        info: "bg-[#DBEAFE] border-[#60A5FA] text-[#374151] [--banner-icon:#3B82F6]",
        success: "bg-[#DCFCE7] border-[#4ADE80] text-[#374151] [--banner-icon:#22C55E]",
        error: "bg-[#FEE2E2] border-[#F87171] text-[#374151] [--banner-icon:#EF4444]"
      }
    },
    defaultVariants: { variant: "info" }
  }
);
var BannerRoot = React.forwardRef(
  ({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "alert",
      className: cn(bannerVariants({ variant }), className),
      ...props
    }
  )
);
BannerRoot.displayName = "Banner";
var BannerIcon = React.forwardRef(({ className, style, ...props }, ref) => /* @__PURE__ */ jsx(
  "span",
  {
    ref,
    className: cn("shrink-0 [&_svg]:size-[18px]", className),
    style: { color: "var(--banner-icon)", ...style },
    "aria-hidden": "true",
    ...props
  }
));
BannerIcon.displayName = "BannerIcon";
var BannerContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex-1 leading-snug", className), ...props }));
BannerContent.displayName = "BannerContent";

export { BannerContent, BannerIcon, BannerRoot, bannerVariants };
//# sourceMappingURL=banner.js.map
//# sourceMappingURL=banner.js.map