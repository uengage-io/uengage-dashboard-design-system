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
var BANNER_SIZES = {
  sm: {
    radius: 8,
    padY: 9,
    padX: 12,
    gap: 9,
    icon: 14,
    fs: 11,
    btnH: 26,
    btnPadX: 10,
    btnFs: 10,
    showDescription: false,
    closeSize: 22,
    closeIcon: 11
  },
  md: {
    radius: 10,
    padY: 13,
    padX: 15,
    gap: 11,
    icon: 17,
    fs: 12,
    btnH: 29,
    btnPadX: 12,
    btnFs: 11,
    showDescription: true,
    closeSize: 24,
    closeIcon: 12
  },
  lg: {
    radius: 12,
    padY: 16,
    padX: 18,
    gap: 13,
    icon: 20,
    fs: 13,
    btnH: 34,
    btnPadX: 14,
    btnFs: 12,
    showDescription: true,
    closeSize: 26,
    closeIcon: 13
  }
};
var LIGHT_PALETTE = {
  info: {
    bg: "#E6F4FC",
    border: "#C6E4F5",
    ink: "#0B5E88",
    icon: "#0B5E88",
    body: "#0B5E88",
    bodyOpacity: 0.82,
    btnBorder: "#A9D3EC",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(11,94,136,.16)",
    fill: "#0B5E88"
  },
  warning: {
    bg: "#FFF6D6",
    border: "#EFD98A",
    ink: "#6A5300",
    icon: "#6A5300",
    body: "#6A5300",
    bodyOpacity: 0.82,
    btnBorder: "#E0C866",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(106,83,0,.16)",
    fill: "#6A5300"
  },
  danger: {
    bg: "#FBE2E4",
    border: "#F2C8CC",
    ink: "#A8000F",
    icon: "#A8000F",
    body: "#A8000F",
    bodyOpacity: 0.86,
    btnBorder: "#E4A6AC",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(168,0,15,.16)",
    fill: "#A8000F"
  },
  success: {
    bg: "#FAFFF7",
    border: "#CDE3C0",
    ink: "#003C1B",
    icon: "#003C1B",
    body: "#003C1B",
    bodyOpacity: 0.78,
    btnBorder: "#BFD6C6",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(0,60,27,.14)",
    fill: "#00A86B"
  },
  neutral: {
    bg: "#F3F5F9",
    border: "#E2E2E2",
    ink: "#595959",
    icon: "#595959",
    body: "#595959",
    bodyOpacity: 0.82,
    btnBorder: "#D4D8DE",
    btnBg: "rgba(255,255,255,.7)",
    btnBgHover: "#FFFFFF",
    track: "rgba(89,89,89,.16)",
    fill: "#595959"
  }
};
var DARK_PALETTE = {
  info: {
    bg: "#10293A",
    border: "#1E4560",
    ink: "#A5D8F2",
    icon: "#4BADE3",
    body: "#7FA8BF",
    bodyOpacity: 1,
    btnBorder: "#2A5876",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(165,216,242,.18)",
    fill: "#4BADE3"
  },
  warning: {
    bg: "#2E2611",
    border: "#4A3E1C",
    ink: "#F0DA9A",
    icon: "#F5C518",
    body: "#BFAE73",
    bodyOpacity: 1,
    btnBorder: "#5A4C24",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(240,218,154,.18)",
    fill: "#F5C518"
  },
  danger: {
    bg: "#2A1416",
    border: "#4A2226",
    ink: "#F2A0A6",
    icon: "#F2A0A6",
    body: "#C98A8F",
    bodyOpacity: 1,
    btnBorder: "#5C2A2F",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(242,160,166,.18)",
    fill: "#F2A0A6"
  },
  success: {
    bg: "#1B3423",
    border: "#2C4A38",
    ink: "#DCF3CE",
    icon: "#8CC42A",
    body: "#8FB79C",
    bodyOpacity: 1,
    btnBorder: "#37563F",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(220,243,206,.18)",
    fill: "#8CC42A"
  },
  neutral: {
    bg: "#1A1F1C",
    border: "#2E3532",
    ink: "#D6DBD8",
    icon: "#9CACA3",
    body: "#94A09A",
    bodyOpacity: 1,
    btnBorder: "#3A423E",
    btnBg: "rgba(255,255,255,.08)",
    btnBgHover: "rgba(255,255,255,.16)",
    track: "rgba(214,219,216,.18)",
    fill: "#9CACA3"
  }
};
var BANNER_BAR_PALETTE = {
  info: { bg: "#0B3B54", ink: "#E2F3FC", accent: "#7FD0F5", muted: "#8FB0C2" },
  warning: { bg: "#3B2F05", ink: "#FBF3D9", accent: "#F5C518", muted: "#B7A87A" },
  danger: { bg: "#3A0206", ink: "#FBE2E4", accent: "#F2A0A6", muted: "#B98A8D" },
  success: { bg: "#003C1B", ink: "#E4F3E8", accent: "#8CC42A", muted: "#8FB79C" },
  neutral: { bg: "#202020", ink: "#EEEEEE", accent: "#C6C6C6", muted: "#9C9C9C" }
};
function toBannerToneKey(tone) {
  return tone === "error" ? "danger" : tone ?? "info";
}
function getBannerPalette(tone, appearance = "light") {
  const key = toBannerToneKey(tone);
  return appearance === "dark" ? DARK_PALETTE[key] : LIGHT_PALETTE[key];
}
var BANNER_TONE_SEVERITY = {
  danger: 4,
  warning: 3,
  info: 2,
  success: 1,
  neutral: 0
};
var BANNER_TONE_DOT = {
  info: "#4BADE3",
  warning: "#F5C518",
  danger: "#A8000F",
  success: "#00A86B",
  neutral: "#9C9C9C"
};
var bannerVariants = classVarianceAuthority.cva(
  "relative flex w-full min-w-0 flex-row overflow-hidden text-left",
  {
    variants: {
      variant: {
        info: "",
        success: "",
        error: "",
        danger: "",
        warning: "",
        neutral: ""
      },
      size: {
        sm: "",
        md: "",
        lg: ""
      }
    },
    defaultVariants: { variant: "info", size: "md" }
  }
);
var BannerRoot = React__namespace.forwardRef(
  ({ className, variant, size, appearance = "light", style, ...props }, ref) => {
    const spec = BANNER_SIZES[size ?? "md"];
    const palette = getBannerPalette(variant, appearance);
    const isAlert = toBannerToneKey(variant) === "danger";
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        role: isAlert ? "alert" : "status",
        "aria-live": isAlert ? "assertive" : "polite",
        className: cn(bannerVariants({ variant, size }), className),
        style: {
          background: palette.bg,
          border: `1px solid ${palette.border}`,
          borderRadius: spec.radius,
          color: palette.ink,
          ...style
        },
        ...props
      }
    );
  }
);
BannerRoot.displayName = "Banner";
var BannerIcon = React__namespace.forwardRef(
  ({ className, style, size = BANNER_SIZES.md.icon, align = "start", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      className: cn(
        "block shrink-0 [&>svg]:h-full [&>svg]:w-full",
        className
      ),
      style: {
        width: size,
        height: size,
        flex: "none",
        marginTop: align === "start" ? 1 : 0,
        color: "var(--banner-icon, currentColor)",
        ...style
      },
      "aria-hidden": "true",
      ...props
    }
  )
);
BannerIcon.displayName = "BannerIcon";
var BannerContent = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "div",
  {
    ref,
    className: cn("flex min-w-0 flex-1 flex-col", className),
    ...props
  }
));
BannerContent.displayName = "BannerContent";
var BannerTitle = React__namespace.forwardRef(({ className, style, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "span",
  {
    ref,
    className: cn("min-w-0", className),
    style: { fontWeight: 600, lineHeight: 1.4, textWrap: "pretty", ...style },
    ...props
  }
));
BannerTitle.displayName = "BannerTitle";
var BannerDescription = React__namespace.forwardRef(({ className, style, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "span",
  {
    ref,
    className: cn("min-w-0", className),
    style: { fontWeight: 400, lineHeight: 1.5, textWrap: "pretty", ...style },
    ...props
  }
));
BannerDescription.displayName = "BannerDescription";
var BannerAction = React__namespace.forwardRef(({ className, type = "button", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "button",
  {
    ref,
    type,
    className: cn(
      "flex shrink-0 cursor-pointer items-center justify-center rounded-lg font-semibold",
      "bg-(--banner-btn-bg) transition-colors duration-120 hover:bg-(--banner-btn-bg-hover)",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props
  }
));
BannerAction.displayName = "BannerAction";
var BannerClose = React__namespace.forwardRef(({ className, type = "button", "aria-label": ariaLabel = "Dismiss", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  "button",
  {
    ref,
    type,
    "aria-label": ariaLabel,
    className: cn(
      "flex shrink-0 cursor-pointer items-center justify-center rounded-[7px] border-0 bg-transparent",
      "opacity-60 transition-all duration-120 hover:bg-white/60 hover:opacity-100",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
      className
    ),
    ...props
  }
));
BannerClose.displayName = "BannerClose";

exports.BANNER_BAR_PALETTE = BANNER_BAR_PALETTE;
exports.BANNER_SIZES = BANNER_SIZES;
exports.BANNER_TONE_DOT = BANNER_TONE_DOT;
exports.BANNER_TONE_SEVERITY = BANNER_TONE_SEVERITY;
exports.BannerAction = BannerAction;
exports.BannerClose = BannerClose;
exports.BannerContent = BannerContent;
exports.BannerDescription = BannerDescription;
exports.BannerIcon = BannerIcon;
exports.BannerRoot = BannerRoot;
exports.BannerTitle = BannerTitle;
exports.bannerVariants = bannerVariants;
exports.getBannerPalette = getBannerPalette;
exports.toBannerToneKey = toBannerToneKey;
//# sourceMappingURL=banner.cjs.map
//# sourceMappingURL=banner.cjs.map