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
    className: cn("mt-0.5 shrink-0 [&_svg]:size-4", className),
    style: { color: "var(--banner-icon)", ...style },
    "aria-hidden": "true",
    ...props
  }
));
BannerIcon.displayName = "BannerIcon";
var BannerContent = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cn("flex-1 min-w-0 break-normal", className), ...props }));
BannerContent.displayName = "BannerContent";

exports.BannerContent = BannerContent;
exports.BannerIcon = BannerIcon;
exports.BannerRoot = BannerRoot;
exports.bannerVariants = bannerVariants;
//# sourceMappingURL=banner.cjs.map
//# sourceMappingURL=banner.cjs.map