"use client";
'use strict';

var React = require('react');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

// src/components/ui/banner.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var bannerVariants = classVarianceAuthority.cva(
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
var BannerRoot = React__namespace.forwardRef(
  ({ className, variant, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var BannerIcon = React__namespace.forwardRef(({ className, style, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var BannerContent = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cn("flex-1 leading-snug", className), ...props }));
BannerContent.displayName = "BannerContent";

exports.BannerContent = BannerContent;
exports.BannerIcon = BannerIcon;
exports.BannerRoot = BannerRoot;
exports.bannerVariants = bannerVariants;
//# sourceMappingURL=banner.cjs.map
//# sourceMappingURL=banner.cjs.map