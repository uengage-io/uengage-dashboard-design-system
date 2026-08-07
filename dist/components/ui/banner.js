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
  "flex flex-row items-start gap-3 rounded-xl border border-l-4 p-5 text-sm text-[#131313] font-medium leading-snug min-w-0 break-all",
  {
    variants: {
      variant: {
        info: "bg-blue-100 border-blue-400 [--banner-icon:#2563EB]",
        success: "bg-green-100 border-green-400 [--banner-icon:#16A34A]",
        error: "bg-red-100 border-red-400 [--banner-icon:#DC2626]",
        warning: "bg-amber-100 border-amber-400 [--banner-icon:#D97706]"
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
    className: cn("mt-0.5 shrink-0 [&_svg]:size-4", className),
    style: { color: "var(--banner-icon)", ...style },
    "aria-hidden": "true",
    ...props
  }
));
BannerIcon.displayName = "BannerIcon";
var BannerContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex-1 min-w-0 break-normal", className), ...props }));
BannerContent.displayName = "BannerContent";

export { BannerContent, BannerIcon, BannerRoot, bannerVariants };
//# sourceMappingURL=banner.js.map
//# sourceMappingURL=banner.js.map