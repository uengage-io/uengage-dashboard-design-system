"use client";
'use strict';

var React9 = require('react');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var radixUi = require('radix-ui');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var lucideReact = require('lucide-react');
var Fuse = require('fuse.js');
var cmdk = require('cmdk');
var reactDayPicker = require('react-day-picker');
var ReactDOM = require('react-dom');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

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

var React9__namespace = /*#__PURE__*/_interopNamespace(React9);
var Fuse__default = /*#__PURE__*/_interopDefault(Fuse);
var ReactDOM__namespace = /*#__PURE__*/_interopNamespace(ReactDOM);

// src/lib/zIndexContext.tsx
var ZIndexContext = React9__namespace.createContext({ popover: 20 });
function useZIndex() {
  return React9__namespace.useContext(ZIndexContext);
}
function SidebarZIndexProvider({
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ZIndexContext.Provider, { value: { popover: 50 }, children });
}
function ModalZIndexProvider({
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ZIndexContext.Provider, { value: { popover: 10001 }, children });
}
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? radixUi.Slot.Root : "button";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn("uengage-ui", buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.AlertDialog.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.AlertDialog.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.AlertDialog.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "uengage-ui",
        "fixed inset-0 z-[10000] bg-black/50",
        "data-[state=open]:animate-[uengage-overlay-in_0.25s_ease_both]",
        "data-[state=closed]:animate-[uengage-overlay-out_0.2s_ease_both]",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  size = "default",
  overlayProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(AlertDialogOverlay, { ...overlayProps }),
    /* @__PURE__ */ jsxRuntime.jsx(
      radixUi.AlertDialog.Content,
      {
        "data-slot": "alert-dialog-content",
        "data-size": size,
        className: cn(
          "uengage-ui",
          "group/alert-dialog-content fixed top-[50%] left-[50%] z-[10001] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-lg",
          "data-[state=open]:animate-[uengage-dialog-in_0.4s_ease-out_both]",
          "data-[state=closed]:animate-[uengage-dialog-out_0.18s_ease-in_both]",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6",
        className
      ),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      ),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function AlertDialogMedia({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "alert-dialog-media",
      className: cn(
        "mb-2 inline-flex size-16 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className
      ),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(Button, { variant, size, asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Action,
    {
      "data-slot": "alert-dialog-action",
      className: cn(className),
      ...props
    }
  ) });
}
function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(Button, { variant, size, asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.AlertDialog.Cancel,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      ...props
    }
  ) });
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Separator.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "uengage-ui",
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function Drawer({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Root, { "data-slot": "drawer", ...props });
}
function DrawerTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Trigger, { "data-slot": "drawer-trigger", ...props });
}
function DrawerPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Portal, { "data-slot": "drawer-portal", ...props });
}
function DrawerClose({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Close, { "data-slot": "drawer-close", ...props });
}
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DrawerPortal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "uengage-ui",
        "fixed inset-0 z-40 bg-black/50 transition-opacity opacity-0",
        "data-[state=open]:opacity-100 data-[state=open]:duration-300 data-[state=open]:ease-out",
        "data-[state=closed]:opacity-0 data-[state=closed]:duration-200 data-[state=closed]:ease-in",
        className
      ),
      ...props
    }
  ) });
}
function DrawerContent({
  className,
  children,
  ...props
}) {
  const accessibleTitle = props["aria-label"] ?? "Drawer";
  return /* @__PURE__ */ jsxRuntime.jsx(DrawerPortal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Dialog.Content,
    {
      "data-slot": "drawer-content",
      className: cn(
        "uengage-ui",
        "fixed z-50 bg-background border shadow-lg outline-none",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(radixUi.Dialog.Title, { className: "sr-only", children: accessibleTitle }),
        children
      ]
    }
  ) });
}
function DrawerTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Title,
    {
      "data-slot": "drawer-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function DrawerDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Dialog.Description,
    {
      "data-slot": "drawer-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/custom/Button/buttonColors.ts
var button = {
  primary: {
    default: {
      background: "#003C1B",
      backgroundImage: "linear-gradient(180deg, #0A5A2C 0%, #003C1B 100%)",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 2px 2px 4px rgba(0,60,27,0.2)"
    },
    hover: {
      background: "#00331A",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "0 4px 12px rgba(0,60,27,0.26)"
    },
    pressed: {
      background: "#002813",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "none"
    },
    focused: {
      background: "#003C1B",
      backgroundImage: "linear-gradient(180deg, #0A5A2C 0%, #003C1B 100%)",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "0 0 0 3px rgba(140,196,42,0.45)"
    },
    disabled: {
      background: "#F3F5F9",
      border: "#E2E2E2",
      borderWidth: 1,
      text: "#9C9C9C",
      boxShadow: "none"
    }
  },
  secondary: {
    default: {
      background: "#FFFFFF",
      border: "#BFD6C6",
      borderWidth: 1,
      text: "#003C1B",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.04)"
    },
    hover: {
      background: "#F5FFF0",
      border: "#1F5E2C",
      borderWidth: 1,
      text: "#003C1B",
      boxShadow: "none"
    },
    pressed: {
      background: "#E8F5DE",
      border: "#1F5E2C",
      borderWidth: 1,
      text: "#003C1B",
      boxShadow: "none"
    },
    focused: {
      background: "#FFFFFF",
      border: "#1F5E2C",
      borderWidth: 1,
      text: "#003C1B",
      boxShadow: "0 0 0 3px rgba(140,196,42,0.45)"
    },
    disabled: {
      background: "#EEEEEE",
      border: "#E2E2E2",
      borderWidth: 1,
      text: "#9C9C9C",
      boxShadow: "none"
    }
  },
  tertiary: {
    default: {
      background: "transparent",
      border: "transparent",
      borderWidth: 0,
      text: "#1F5E2C",
      boxShadow: "none"
    },
    hover: {
      background: "#E6F5DC",
      border: "transparent",
      borderWidth: 0,
      text: "#1F5E2C",
      boxShadow: "none"
    },
    pressed: {
      background: "#DCF3CE",
      border: "transparent",
      borderWidth: 0,
      text: "#003C1B",
      boxShadow: "none"
    },
    focused: {
      background: "transparent",
      border: "transparent",
      borderWidth: 0,
      text: "#1F5E2C",
      boxShadow: "0 0 0 3px rgba(140,196,42,0.45)"
    },
    disabled: {
      background: "transparent",
      border: "transparent",
      borderWidth: 0,
      text: "#9C9C9C",
      boxShadow: "none"
    }
  },
  alertPrimary: {
    default: {
      background: "#A8000F",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "2px 2px 4px rgba(168,0,15,0.2)"
    },
    hover: {
      background: "#8E000D",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "0 4px 12px rgba(168,0,15,0.24)"
    },
    pressed: {
      background: "#760009",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "none"
    }
  },
  warningPrimary: {
    default: {
      background: "#FFF6D6",
      border: "#EFD98A",
      borderWidth: 1,
      text: "#6A5300",
      boxShadow: "none"
    },
    hover: {
      background: "#FFEFB8",
      border: "#E0C866",
      borderWidth: 1,
      text: "#6A5300",
      boxShadow: "none"
    },
    pressed: {
      background: "#FBE7A0",
      border: "#E0C866",
      borderWidth: 1,
      text: "#4A3B00",
      boxShadow: "none"
    }
  },
  alertSecondary: {
    default: {
      background: "#FFF7F6",
      border: "#E4A6AC",
      borderWidth: 1,
      text: "#A8000F",
      boxShadow: "none"
    },
    hover: {
      background: "#A8000F",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "2px 2px 4px rgba(168,0,15,0.2)"
    },
    pressed: {
      background: "#760009",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "none"
    }
  }
};
var BASE_CLASSES = [
  "inline-flex flex-row shrink-0 items-center justify-center leading-none",
  "font-['Figtree'] font-medium not-italic",
  "whitespace-nowrap select-none cursor-pointer",
  "transition-[background-color,box-shadow,transform,border-color,color] duration-[140ms] ease-[cubic-bezier(0.2,0.8,0.3,1)]",
  "outline-none",
  "disabled:pointer-events-none disabled:cursor-not-allowed",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:inline-block"
].join(" ");
var SIZE_CLASSES = {
  xs: "h-[28px] px-[10px] gap-[4px] text-[11px] [&_svg]:size-[14px]",
  sm: "h-[32px] px-[12px] gap-[4px] text-[12px] [&_svg]:size-[15px]",
  md: "h-[40px] px-[16px] gap-[6px] text-[13px] [&_svg]:size-[16px]",
  lg: "h-[48px] px-[20px] gap-[8px] text-[15px] [&_svg]:size-[20px]"
};
var VARIANT_SIZE_OVERRIDES = {
  tertiary: {
    xs: "h-[28px] px-[8px] gap-[4px] text-[11px] [&_svg]:size-[14px]",
    sm: "h-[32px] px-[10px] gap-[4px] text-[12px] [&_svg]:size-[15px]",
    md: "h-[40px] px-[13px] gap-[6px] text-[13px] [&_svg]:size-[16px]",
    lg: "h-[48px] px-[16px] gap-[8px] text-[15px] [&_svg]:size-[20px]"
  }
};
var buttonVariants2 = classVarianceAuthority.cva(BASE_CLASSES, {
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: ""
    }
  },
  defaultVariants: { size: "md" }
});
function resolveStateColors(variant, state) {
  const variantColors = button[variant];
  if (!variantColors) return void 0;
  return variantColors[state] ?? variantColors.default;
}
var RADIUS_BY_SIZE = {
  xs: 8,
  sm: 9,
  md: 10,
  lg: 12
};
function getButtonStyle(variant, state, size, loading) {
  const colors = resolveStateColors(variant, state);
  if (!colors) return {};
  const borderRadius = RADIUS_BY_SIZE[size];
  const boxShadow = loading ? "none" : colors.boxShadow ?? "none";
  const style = {
    backgroundColor: colors.background,
    backgroundImage: colors.backgroundImage ?? "none",
    border: colors.borderWidth > 0 ? `${colors.borderWidth}px solid ${colors.border}` : "none",
    borderRadius,
    color: colors.text,
    boxShadow
  };
  if (state === "pressed") {
    style.transform = "scale(0.985)";
  }
  return style;
}
function Button2({
  className,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  loadingIcon,
  asChild = false,
  style,
  title,
  children,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onFocus,
  onBlur,
  ...props
}) {
  const [hovered, setHovered] = React9__namespace.useState(false);
  const [pressed, setPressed] = React9__namespace.useState(false);
  const [focused, setFocused] = React9__namespace.useState(false);
  const interactionBlocked = disabled || loading;
  const state = disabled ? "disabled" : pressed ? "pressed" : hovered ? "hover" : focused ? "focused" : "default";
  const gradientStyle = getButtonStyle(variant, state, size, loading);
  const sizeClass = VARIANT_SIZE_OVERRIDES[variant]?.[size] ?? SIZE_CLASSES[size];
  const Comp = asChild ? radixUi.Slot.Root : "button";
  const spinner = loadingIcon ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "animate-spin", "aria-hidden": "true" });
  const content = children ?? title;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      "data-state": state,
      "data-loading": loading || void 0,
      "aria-busy": loading || void 0,
      className: `uengage-ui ${BASE_CLASSES} ${sizeClass}${className ? ` ${className}` : ""}`,
      style: { ...gradientStyle, ...style },
      disabled: interactionBlocked,
      onPointerEnter: (e) => {
        setHovered(true);
        onPointerEnter?.(e);
      },
      onPointerLeave: (e) => {
        setHovered(false);
        setPressed(false);
        onPointerLeave?.(e);
      },
      onPointerDown: (e) => {
        setPressed(true);
        onPointerDown?.(e);
      },
      onPointerUp: (e) => {
        setPressed(false);
        onPointerUp?.(e);
      },
      onFocus: (e) => {
        try {
          if (e.target.matches(":focus-visible")) setFocused(true);
        } catch {
          setFocused(true);
        }
        onFocus?.(e);
      },
      onBlur: (e) => {
        setFocused(false);
        onBlur?.(e);
      },
      ...props,
      children: loading ? spinner : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        leftIcon,
        content,
        rightIcon
      ] })
    }
  );
}
Button2.displayName = "Button";
function responsiveExtra(value, maxVw) {
  if (typeof value === "string") return value;
  if (value <= 0) return "0px";
  return `min(${value}px, ${maxVw}vw)`;
}
function PageContainer({
  paddingLeft = 0,
  paddingRight = 0,
  className,
  style,
  children,
  ...props
}) {
  const extraPL = responsiveExtra(paddingLeft, 6);
  const extraPR = responsiveExtra(paddingRight, 4);
  const basePL = "clamp(14px, 3.5vw, 22px)";
  const basePR = "clamp(14px, 3vw, 20px)";
  const resolvedPL = paddingLeft !== 0 ? `calc(${basePL} + ${extraPL})` : basePL;
  const resolvedPR = paddingRight !== 0 ? `calc(${basePR} + ${extraPR})` : basePR;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "main",
    {
      "data-slot": "page-container",
      className: cn(
        "uengage-ui font-['Figtree'] font-medium",
        "flex flex-1 min-w-0 flex-col rounded-xl border border-[#E2E2E2] bg-background text-foreground",
        className
      ),
      style: {
        // Expose base padding as CSS vars so children (TopHeader / SubHeader)
        // can compute full-bleed separator margins without prop-drilling.
        "--pc-pl": basePL,
        "--pc-pr": basePR,
        paddingLeft: resolvedPL,
        paddingRight: resolvedPR,
        ...style
      },
      ...props,
      children
    }
  );
}
PageContainer.displayName = "PageContainer";

// src/utils/layoutTokens.ts
var LAYOUT = {
  contentMarginLeft: 16,
  /** Right margin of the content area. */
  contentMarginRight: 12,
  contentMarginTop: 12,
  contentPaddingLeft: 22,
  contentPaddingRight: 20,
  /** Vertical rhythm — spacing between top-level blocks inside the content area. */
  gap: {
    /** Tight grid gap between adjacent cards. */
    xs: 12,
    /** Default gap between top-level sections. */
    sm: 20,
    /** Wider gap between grouped sections. */
    md: 22
  },
  /** Fixed height of the top page header row. */
  topHeaderHeight: 64,
  topHeaderPadding: 8,
  subHeaderPaddingTop: 16,
  subHeaderPaddingBottom: 16
};
function toCssSize(value) {
  return typeof value === "number" ? `${value}px` : value;
}
function TopHeader({
  title,
  helper,
  action,
  divider = true,
  titleGap = 10,
  className,
  style,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "header",
    {
      "data-slot": "top-header",
      className: cn("uengage-ui flex w-full shrink-0 flex-col", className),
      style,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            "data-slot": "top-header-row",
            className: "flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 py-[7px]",
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  "data-slot": "top-header-title",
                  className: "flex min-w-0 flex-1 items-center overflow-hidden",
                  style: { gap: toCssSize(titleGap), minWidth: "160px" },
                  children: [
                    React9__namespace.isValidElement(title) ? title : /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "truncate text-base font-semibold leading-tight text-foreground sm:text-[18px]", children: title }),
                    helper != null && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 text-xs leading-none sm:text-sm", children: helper })
                  ]
                }
              ),
              action != null && /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  "data-slot": "top-header-action",
                  className: "flex shrink-0 flex-wrap items-center gap-2",
                  children: action
                }
              )
            ]
          }
        ),
        divider && /* @__PURE__ */ jsxRuntime.jsx(
          Separator,
          {
            "data-slot": "top-header-divider",
            style: {
              // Use CSS vars set by PageContainer so the separator always
              // bleeds to the container edge regardless of viewport width.
              marginLeft: "calc(-1 * var(--pc-pl, 22px))",
              marginRight: "calc(-1 * var(--pc-pr, 20px))",
              width: "calc(100% + var(--pc-pl, 22px) + var(--pc-pr, 20px))"
            }
          }
        )
      ]
    }
  );
}
TopHeader.displayName = "TopHeader";
var ALIGN_CLASS = {
  start: "items-start",
  center: "items-center",
  end: "items-end"
};
function SubHeader({
  title,
  subtitle,
  right,
  align = "center",
  divider = false,
  gap = LAYOUT.gap.xs,
  className,
  style,
  children,
  ...props
}) {
  const hasHeading = title != null || subtitle != null;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "section",
    {
      "data-slot": "sub-header",
      className: cn("uengage-ui flex w-full flex-col", className),
      style,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            "data-slot": "sub-header-row",
            className: cn(
              "flex w-full flex-wrap justify-between gap-x-4 gap-y-3",
              ALIGN_CLASS[align]
            ),
            style: {
              paddingTop: "clamp(12px, 2.5vw, 16px)",
              paddingBottom: "clamp(12px, 2.5vw, 16px)"
            },
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  "data-slot": "sub-header-main",
                  className: "flex min-w-0 flex-1 flex-col gap-3",
                  style: {
                    ...gap !== LAYOUT.gap.xs ? { gap: toCssSize(gap) } : {},
                    minWidth: "160px"
                  },
                  children: [
                    hasHeading && /* @__PURE__ */ jsxRuntime.jsxs("div", { "data-slot": "sub-header-heading", children: [
                      title != null && (React9__namespace.isValidElement(title) ? title : /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-sm font-semibold leading-tight text-foreground sm:text-base", children: title })),
                      subtitle != null && (React9__namespace.isValidElement(subtitle) ? subtitle : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-0.5 text-[12px] leading-tight text-muted-foreground sm:text-[13px]", children: subtitle }))
                    ] }),
                    children != null && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "sub-header-content", children })
                  ]
                }
              ),
              right != null && /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  "data-slot": "sub-header-right",
                  className: "flex shrink-0 flex-wrap items-center gap-3",
                  children: right
                }
              )
            ]
          }
        ),
        divider && /* @__PURE__ */ jsxRuntime.jsx(
          Separator,
          {
            "data-slot": "sub-header-divider",
            style: {
              marginLeft: "calc(-1 * var(--pc-pl, 22px))",
              marginRight: "calc(-1 * var(--pc-pr, 20px))",
              width: "calc(100% + var(--pc-pl, 22px) + var(--pc-pr, 20px))"
            }
          }
        )
      ]
    }
  );
}
SubHeader.displayName = "SubHeader";
var RESPONSIVE_COLUMN_CLASSES = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  "5": "grid-cols-2 sm:grid-cols-3 xl:grid-cols-5",
  "6": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6",
  "7": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7",
  "8": "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8",
  "2:1": "grid-cols-1 md:[grid-template-columns:2fr_1fr]",
  "1:2": "grid-cols-1 md:[grid-template-columns:1fr_2fr]",
  "3:1": "grid-cols-1 md:[grid-template-columns:3fr_1fr]",
  "1:3": "grid-cols-1 md:[grid-template-columns:1fr_3fr]",
  "1:1:2": "grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:1fr_1fr_2fr]",
  "2:1:1": "grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:2fr_1fr_1fr]"
};
var GAP_MAP = {
  "1": 0,
  "2": 20,
  "3": 20,
  "4": 12,
  "5": 12,
  "6": 0,
  "7": 0,
  "8": 0,
  "2:1": 20,
  "1:2": 20,
  "3:1": 12,
  "1:3": 12,
  "1:1:2": 12,
  "2:1:1": 12
};
function Grid({
  columns = "1",
  limit,
  gap,
  rowGap = "20px",
  className,
  style,
  children,
  ...props
}) {
  const effectiveColumns = limit ? String(limit) : columns;
  const isPreset = effectiveColumns in RESPONSIVE_COLUMN_CLASSES;
  const resolvedGap = gap ?? GAP_MAP[effectiveColumns] ?? LAYOUT.gap.sm;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "grid-wrapper",
      className: cn("w-full", className),
      style,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          "data-slot": "grid",
          className: cn(
            "grid w-full mt-5",
            isPreset && RESPONSIVE_COLUMN_CLASSES[effectiveColumns]
          ),
          style: {
            ...isPreset ? {} : { gridTemplateColumns: effectiveColumns },
            columnGap: toCssSize(resolvedGap),
            rowGap: toCssSize(rowGap ?? resolvedGap)
          },
          children
        }
      )
    }
  );
}
Grid.displayName = "Grid";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "uengage-ui",
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm min-w-0 break-all",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 min-w-0 break-all",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold break-all min-w-0", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-sm text-muted-foreground break-all min-w-0", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end min-w-0 break-all",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6 min-w-0 break-all", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6 min-w-0 break-all", className),
      ...props
    }
  );
}
function Card2({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Card,
    {
      className: cn(
        "border-gray-300 bg-white p-3 sm:p-4 md:p-5 text-sm text-[#202020] shadow-none",
        className
      ),
      ...props
    }
  );
}
function CardHeader2({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { className: cn("text-[#202020]", className), ...props });
}
function CardTitle2({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: cn("text-[#202020]", className), ...props });
}
function CardContent2({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(CardContent, { className: cn("text-[#202020]", className), ...props });
}
function CardFooter2({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(CardFooter, { className: cn("text-[#202020]", className), ...props });
}
Card2.displayName = "Card";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "uengage-ui",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-9 w-full bg-transparent px-3 py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function useFuzzySearch(items, query) {
  const fuse = React9.useMemo(
    () => new Fuse__default.default(items, {
      keys: ["label"],
      threshold: 0.35,
      minMatchCharLength: 1,
      ignoreLocation: true,
      shouldSort: true
    }),
    [items]
  );
  return React9.useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    return fuse.search(q).map((r) => r.item);
  }, [fuse, query, items]);
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Label.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
var INPUT_SIZES = {
  xs: { height: 28, padX: 9, font: 12, icon: 13, radius: 6, label: 11, message: 10 },
  sm: { height: 32, padX: 11, font: 12, icon: 14, radius: 8, label: 12, message: 11 },
  md: { height: 40, padX: 13, font: 13, icon: 16, radius: 8, label: 12, message: 11 },
  lg: { height: 48, padX: 15, font: 14, icon: 18, radius: 8, label: 13, message: 11 }
};
var AFFIX_GAP = 9;
var INPUT_TRANSITION = "border-color 120ms linear, box-shadow 120ms linear, background-color 120ms linear";
var INPUT_COLORS = {
  surface: "#FFFFFF",
  subtle: "#F3F5F9",
  border: "#E2E2E2",
  borderHover: "#C6C6C6",
  borderFocus: "#1F5E2C",
  /** 3px lime halo that pairs with `borderFocus`. */
  ring: "0 0 0 3px rgba(140,196,42,.28)",
  value: "#161616",
  placeholder: "#9C9C9C",
  message: "#9C9C9C",
  icon: "#1F5E2C",
  successBorder: "#00A86B",
  successInk: "#00A86B",
  warningBg: "#FFF6D6",
  warningBorder: "#EFD98A",
  warningInk: "#6A5300",
  errorBg: "#FBE9EA",
  errorBorder: "#A8000F",
  errorInk: "#7A0009",
  errorLabel: "#A8000F",
  readOnlyBg: "#FAFFF7",
  disabledBg: "#F3F5F9",
  disabledInk: "#9C9C9C",
  validatingInk: "#595959"
};
function resolveInputState(args) {
  const { disabled, readOnly, loading, error, status, focused, hovered } = args;
  if (disabled) return "disabled";
  if (loading) return "loading";
  if (readOnly) return "readonly";
  if (error) return "error";
  if (status === "validating") return "validating";
  if (focused) return "focused";
  if (status === "success") return "success";
  if (status === "warning") return "warning";
  if (hovered) return "hover";
  return "default";
}
function getInputBoxStyle(state) {
  const c = INPUT_COLORS;
  const hairline = `1px solid ${c.border}`;
  switch (state) {
    case "hover":
      return {
        background: c.surface,
        border: `1px solid ${c.borderHover}`,
        boxShadow: "none",
        color: c.value
      };
    case "focused":
      return {
        background: c.surface,
        border: `1px solid ${c.borderFocus}`,
        boxShadow: c.ring,
        color: c.value
      };
    case "validating":
      return {
        background: c.surface,
        border: `1px solid ${c.borderFocus}`,
        boxShadow: "none",
        color: c.value
      };
    case "success":
      return {
        background: c.surface,
        border: `1px solid ${c.successBorder}`,
        boxShadow: "none",
        color: c.value
      };
    case "warning":
      return {
        background: c.warningBg,
        border: `1px solid ${c.warningBorder}`,
        boxShadow: "none",
        color: c.value
      };
    case "error":
      return {
        background: c.errorBg,
        border: `1px solid ${c.errorBorder}`,
        boxShadow: "none",
        color: c.errorInk
      };
    case "readonly":
      return {
        background: c.readOnlyBg,
        border: hairline,
        boxShadow: "none",
        color: c.value,
        cursor: "default"
      };
    case "loading":
      return {
        background: c.disabledBg,
        border: hairline,
        boxShadow: "none",
        color: c.disabledInk,
        cursor: "progress"
      };
    case "disabled":
      return {
        background: c.disabledBg,
        border: hairline,
        boxShadow: "none",
        color: c.disabledInk,
        cursor: "not-allowed"
      };
    default:
      return {
        background: c.surface,
        border: hairline,
        boxShadow: "none",
        color: c.value
      };
  }
}
function getLabelColor(state) {
  if (state === "error") return INPUT_COLORS.errorLabel;
  if (state === "disabled") return INPUT_COLORS.disabledInk;
  return INPUT_COLORS.value;
}
function getMessageColor(state, hasError) {
  if (hasError) return INPUT_COLORS.errorInk;
  switch (state) {
    case "success":
      return INPUT_COLORS.successInk;
    case "warning":
      return INPUT_COLORS.warningInk;
    case "validating":
      return INPUT_COLORS.validatingInk;
    default:
      return INPUT_COLORS.message;
  }
}
var INERT_SIZE = { xs: "", sm: "", md: "", lg: "" };
var INERT_STATE = {
  default: "",
  hover: "",
  focused: "",
  error: "",
  success: "",
  warning: "",
  validating: "",
  loading: "",
  disabled: "",
  readonly: ""
};
var inputWrapperVariants = classVarianceAuthority.cva(
  "relative flex w-full min-w-0",
  {
    variants: {
      multiline: {
        false: "items-center",
        true: "items-start"
      },
      appearance: {
        default: "",
        underline: "bg-transparent"
      },
      /** @deprecated Inert — sizing is applied inline. */
      size: INERT_SIZE,
      /** @deprecated Inert — state colours are applied inline. */
      state: INERT_STATE
    },
    defaultVariants: { multiline: false, appearance: "default" }
  }
);
var inputFieldVariants = classVarianceAuthority.cva(
  "w-full min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-100",
  {
    variants: {
      multiline: {
        false: "h-full",
        true: "block"
      },
      align: {
        left: "text-left",
        right: "text-right"
      },
      /** @deprecated Inert — sizing is applied inline. */
      size: INERT_SIZE,
      /** @deprecated Inert — the field no longer carries appearance classes. */
      appearance: { default: "", underline: "" },
      /** @deprecated Inert — affixes are laid out with flexbox, not padding. */
      hasLeftIcon: { true: "", false: "" },
      /** @deprecated Inert — affixes are laid out with flexbox, not padding. */
      hasRightIcon: { true: "", false: "" }
    },
    defaultVariants: { multiline: false, align: "left" }
  }
);
var RESIZE_CLASS = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize"
};
var inputIconSlotVariants = classVarianceAuthority.cva("absolute inset-y-0 flex items-center", {
  variants: {
    side: { left: "left-0", right: "right-0" },
    /** @deprecated Inert — kept so existing calls keep type-checking. */
    size: INERT_SIZE,
    /** @deprecated Inert — kept so existing calls keep type-checking. */
    multiline: { true: "", false: "" }
  },
  defaultVariants: { side: "left" }
});
var PATTERN_REGEX = {
  alphanumeric: "[^a-zA-Z0-9]",
  alpha: "[^a-zA-Z ]",
  numeric: "[^0-9]",
  decimal: "[^0-9.]",
  phone: "[^0-9]",
  none: "(?!)"
};
var SIZE_TEXT = {
  xs: "text-[11px]",
  sm: "text-[12px]",
  md: "text-[12px]",
  lg: "text-[13px]"
};
function InputLabel({
  size = "md",
  required = false,
  tone,
  className,
  style,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Label,
    {
      className: cn(
        "font-semibold leading-[1.3] text-[#161616]",
        SIZE_TEXT[size],
        className
      ),
      style: tone ? { color: tone, ...style } : style,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline text-pretty", children: [
        children,
        required && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", style: { color: INPUT_COLORS.errorLabel }, children: "*" })
      ] })
    }
  );
}
InputLabel.displayName = "InputLabel";

// src/components/custom/SearchBar/searchBarVariants.ts
var SEARCHBAR_SIZES = {
  sm: {
    height: 32,
    padLeft: 11,
    padRight: 9,
    font: 12,
    icon: 14,
    radius: 8,
    clear: 17,
    label: 12,
    message: 11
  },
  md: {
    height: 38,
    padLeft: 12,
    padRight: 10,
    font: 13,
    icon: 15,
    radius: 8,
    clear: 19,
    label: 12,
    message: 11
  },
  lg: {
    height: 44,
    padLeft: 14,
    padRight: 12,
    font: 14,
    icon: 17,
    radius: 8,
    clear: 21,
    label: 13,
    message: 11
  }
};
var SEARCHBAR_GAP = 9;
var SEARCHBAR_TRANSITION = "border-color 120ms linear, box-shadow 120ms linear, background-color 120ms linear";
var SEARCHBAR_COLORS = {
  surface: "#FFFFFF",
  subtle: "#F3F5F9",
  border: "#E2E2E2",
  borderHover: "#C6C6C6",
  borderFocus: "#1F5E2C",
  /** 3px lime halo that pairs with `borderFocus`. */
  ring: "0 0 0 3px rgba(140,196,42,.28)",
  value: "#161616",
  placeholder: "#9C9C9C",
  message: "#9C9C9C",
  icon: "#1F5E2C",
  accentTint: "#DCF3CE",
  hoverTint: "#FAFFF7",
  resultsInk: "#1F5E2C",
  warningBorder: "#EFD98A",
  warningInk: "#6A5300",
  readOnlyBg: "#FAFFF7",
  disabledBg: "#F3F5F9",
  disabledInk: "#C6C6C6",
  muted: "#787878"
};
function resolveSearchBarState(args) {
  const {
    disabled,
    readOnly,
    searching,
    noResults,
    hasResults,
    hasQuery,
    focused,
    hovered
  } = args;
  if (disabled) return "disabled";
  if (readOnly) return "readonly";
  if (noResults) return "noResults";
  if (searching) return "searching";
  if (focused) return hasQuery ? "typing" : "focused";
  if (hasResults && hasQuery) return "results";
  if (hovered) return "hover";
  return "default";
}
function getSearchBarBoxStyle(state) {
  const c = SEARCHBAR_COLORS;
  const hairline = `1px solid ${c.border}`;
  const focusRing = {
    background: c.surface,
    border: `1px solid ${c.borderFocus}`,
    boxShadow: c.ring,
    color: c.value,
    cursor: "text"
  };
  switch (state) {
    case "hover":
      return {
        background: c.surface,
        border: `1px solid ${c.borderHover}`,
        boxShadow: "none",
        color: c.value,
        cursor: "text"
      };
    case "focused":
    case "typing":
    case "searching":
      return focusRing;
    case "results":
      return {
        background: c.surface,
        border: hairline,
        boxShadow: "none",
        color: c.value,
        cursor: "text"
      };
    case "noResults":
      return {
        background: c.surface,
        border: `1px solid ${c.warningBorder}`,
        boxShadow: "none",
        color: c.value,
        cursor: "text"
      };
    case "readonly":
      return {
        background: c.readOnlyBg,
        border: hairline,
        boxShadow: "none",
        color: c.value,
        cursor: "default"
      };
    case "disabled":
      return {
        background: c.disabledBg,
        border: hairline,
        boxShadow: "none",
        color: c.disabledInk,
        cursor: "not-allowed"
      };
    default:
      return {
        background: c.surface,
        border: hairline,
        boxShadow: "none",
        color: c.value,
        cursor: "text"
      };
  }
}
function getSearchBarIconColor(state) {
  if (state === "disabled") return SEARCHBAR_COLORS.disabledInk;
  if (state === "noResults") return SEARCHBAR_COLORS.warningInk;
  return SEARCHBAR_COLORS.icon;
}
function getSearchBarMessageColor(state) {
  if (state === "noResults") return SEARCHBAR_COLORS.warningInk;
  if (state === "results") return SEARCHBAR_COLORS.resultsInk;
  return SEARCHBAR_COLORS.message;
}
function filterValue(raw, valueType) {
  if (valueType === "number") return raw.replace(/[^0-9]/g, "");
  if (valueType === "alphanumeric") return raw.replace(/[^a-zA-Z0-9]/g, "");
  return raw;
}
var LABEL_SIZE = {
  sm: "sm",
  md: "md",
  lg: "lg"
};
function SearchBar({
  value: controlledValue,
  defaultValue,
  valueType = "string",
  size = "md",
  label,
  required,
  placeholder,
  width,
  className,
  inputClassName,
  disabled = false,
  readOnly = false,
  spellCheck = true,
  onChange,
  onSearch,
  onClear,
  onTouch,
  clearable = false,
  dropdownClassName,
  dropdownItems,
  getLabel,
  getValue,
  onSelect,
  fallbackText = "No results found",
  searching = false,
  resultCount,
  resultNoun = "result",
  noResults = false,
  suggestion,
  message,
  shortcut,
  recents,
  onRemoveRecent,
  onSelectRecent,
  debounce = 0,
  onDebouncedChange
}) {
  const [internal, setInternal] = React9__namespace.useState(
    String(controlledValue ?? defaultValue ?? "")
  );
  const [dropdownOpen, setDropdownOpen] = React9__namespace.useState(false);
  const [focused, setFocused] = React9__namespace.useState(false);
  const [hovered, setHovered] = React9__namespace.useState(false);
  const wrapperRef = React9__namespace.useRef(null);
  const touchedRef = React9__namespace.useRef(false);
  const debounceRef = React9__namespace.useRef(
    void 0
  );
  React9__namespace.useEffect(() => {
    if (controlledValue !== void 0) setInternal(String(controlledValue));
  }, [controlledValue]);
  React9__namespace.useEffect(() => () => clearTimeout(debounceRef.current), []);
  const displayValue = internal;
  const resolvedItems = React9__namespace.useMemo(() => {
    if (dropdownItems && getLabel) {
      return dropdownItems.map((item) => ({
        label: getLabel(item),
        value: getValue ? getValue(item) : getLabel(item),
        raw: item
      }));
    }
    return [];
  }, [dropdownItems, getLabel, getValue]);
  const fuseResults = useFuzzySearch(resolvedItems, displayValue);
  const filteredItems = displayValue.trim() ? fuseResults : [];
  const hasDropdown = dropdownItems != null;
  const castValue = (v) => valueType === "number" ? Number(v) : v;
  const handleSelect = (item) => {
    setInternal(item.label);
    onSelect?.(item.value, item.raw ?? void 0);
    setDropdownOpen(false);
  };
  const scheduleDebounced = (next) => {
    if (!onDebouncedChange) return;
    clearTimeout(debounceRef.current);
    if (!debounce) {
      onDebouncedChange(castValue(next));
      return;
    }
    debounceRef.current = setTimeout(
      () => onDebouncedChange(castValue(next)),
      debounce
    );
  };
  const handleChange = (e) => {
    if (readOnly) return;
    const filtered = filterValue(e.target.value, valueType);
    setInternal(filtered);
    onChange?.(castValue(filtered));
    scheduleDebounced(filtered);
    if (hasDropdown) setDropdownOpen(true);
  };
  const hasQuery = displayValue.trim().length > 0;
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!hasQuery) {
        onClear?.();
        return;
      }
      if (filteredItems.length > 0) {
        handleSelect(filteredItems[0]);
      } else {
        onSearch?.(castValue(displayValue));
        setDropdownOpen(false);
      }
    }
    if (e.key === "Escape") setDropdownOpen(false);
  };
  const handleSearchClick = () => {
    if (disabled || readOnly) return;
    if (!hasQuery) {
      onClear?.();
      return;
    }
    if (filteredItems.length > 0) {
      handleSelect(filteredItems[0]);
      return;
    }
    onSearch?.(castValue(displayValue));
    setDropdownOpen(false);
  };
  const handleClear = () => {
    if (disabled || readOnly) return;
    setInternal("");
    onClear?.();
    scheduleDebounced("");
    setDropdownOpen(false);
  };
  const handleBlur = (e) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      setDropdownOpen(false);
      setFocused(false);
      if (!touchedRef.current) {
        touchedRef.current = true;
        onTouch?.();
      }
    }
  };
  const handleRecentPick = (entry) => {
    setInternal(entry);
    onChange?.(castValue(entry));
    scheduleDebounced(entry);
    if (onSelectRecent) onSelectRecent(entry);
    else onSearch?.(castValue(entry));
  };
  const showClear = clearable && displayValue.length > 0;
  const metrics = SEARCHBAR_SIZES[size];
  const state = resolveSearchBarState({
    disabled,
    readOnly,
    searching,
    noResults,
    hasResults: resultCount != null && resultCount > 0,
    hasQuery,
    focused,
    hovered
  });
  const box = getSearchBarBoxStyle(state);
  const iconColor = getSearchBarIconColor(state);
  const messageColor = getSearchBarMessageColor(state);
  const isDropdownVisible = hasDropdown && dropdownOpen && hasQuery;
  const isRecentsVisible = !isDropdownVisible && focused && !hasQuery && !disabled && !readOnly && (recents?.length ?? 0) > 0;
  const showShortcut = Boolean(shortcut) && !hasQuery && !showClear;
  const resolvedMessage = (() => {
    if (message != null) return message;
    if (noResults) {
      if (suggestion) {
        return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          "No match \u2014 did you mean",
          " ",
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: suggestion.onApply,
              className: "font-semibold underline-offset-2 hover:underline",
              style: { color: SEARCHBAR_COLORS.borderFocus },
              children: suggestion.label
            }
          ),
          "?"
        ] });
      }
      return "No match for this query.";
    }
    if (resultCount != null) {
      return `${resultCount.toLocaleString("en-IN")} ${resultCount === 1 ? resultNoun : `${resultNoun}s`}`;
    }
    return null;
  })();
  const panelStyle = {
    border: `1px solid ${SEARCHBAR_COLORS.border}`,
    borderRadius: 11,
    background: SEARCHBAR_COLORS.surface,
    boxShadow: "2px 2px 4px rgba(0,0,0,.12)"
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(
        "uengage-ui flex flex-col gap-1.5 min-w-0",
        width,
        className
      ),
      children: [
        label && /* @__PURE__ */ jsxRuntime.jsx(
          InputLabel,
          {
            size: LABEL_SIZE[size],
            required,
            tone: state === "disabled" ? SEARCHBAR_COLORS.disabledInk : void 0,
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            ref: wrapperRef,
            className: "relative block min-w-0",
            onBlur: handleBlur,
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: "flex w-full items-center",
                  onMouseEnter: () => setHovered(true),
                  onMouseLeave: () => setHovered(false),
                  style: {
                    height: metrics.height,
                    paddingLeft: metrics.padLeft,
                    paddingRight: metrics.padRight,
                    gap: SEARCHBAR_GAP,
                    borderRadius: metrics.radius,
                    fontSize: metrics.font,
                    transition: SEARCHBAR_TRANSITION,
                    background: box.background,
                    border: box.border,
                    boxShadow: box.boxShadow,
                    color: box.color,
                    cursor: box.cursor,
                    ...disabled ? { pointerEvents: "none" } : null
                  },
                  children: [
                    searching ? /* @__PURE__ */ jsxRuntime.jsx(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "shrink-0 animate-spin rounded-full",
                        style: {
                          width: metrics.icon,
                          height: metrics.icon,
                          border: `2px solid ${SEARCHBAR_COLORS.border}`,
                          borderTopColor: SEARCHBAR_COLORS.borderFocus
                        }
                      }
                    ) : /* @__PURE__ */ jsxRuntime.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleSearchClick,
                        disabled,
                        className: "flex shrink-0 items-center justify-center transition-colors",
                        style: {
                          color: iconColor,
                          cursor: disabled || readOnly ? box.cursor : "pointer"
                        },
                        "aria-label": "Search",
                        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { strokeWidth: 2, size: metrics.icon })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      Input,
                      {
                        value: displayValue,
                        placeholder,
                        disabled,
                        readOnly,
                        spellCheck,
                        onChange: handleChange,
                        onFocus: () => setFocused(true),
                        onKeyDown: handleKeyDown,
                        className: cn(
                          "h-full min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none focus-visible:ring-0 disabled:opacity-100",
                          // Placeholder greys further out once the control is disabled.
                          state === "disabled" ? "placeholder:text-[#C6C6C6]" : "placeholder:text-[#9C9C9C]",
                          inputClassName
                        ),
                        style: {
                          fontSize: metrics.font,
                          color: box.color,
                          cursor: box.cursor
                        }
                      }
                    ),
                    showClear && /* @__PURE__ */ jsxRuntime.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleClear,
                        disabled,
                        className: "flex shrink-0 items-center justify-center rounded-full transition-colors",
                        style: {
                          width: metrics.clear,
                          height: metrics.clear,
                          background: SEARCHBAR_COLORS.subtle,
                          color: SEARCHBAR_COLORS.value,
                          cursor: "pointer"
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.background = SEARCHBAR_COLORS.accentTint;
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.background = SEARCHBAR_COLORS.subtle;
                        },
                        "aria-label": "Clear search",
                        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { strokeWidth: 3.2, size: metrics.clear - 10 })
                      }
                    ),
                    showShortcut && /* @__PURE__ */ jsxRuntime.jsx(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "shrink-0 font-semibold leading-none",
                        style: {
                          fontSize: 10,
                          color: SEARCHBAR_COLORS.muted,
                          border: `1px solid ${SEARCHBAR_COLORS.border}`,
                          borderRadius: 5,
                          padding: "3px 6px"
                        },
                        children: shortcut
                      }
                    )
                  ]
                }
              ),
              isRecentsVisible && /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  className: cn(
                    "absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden",
                    dropdownClassName
                  ),
                  style: { ...panelStyle, padding: 5 },
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "span",
                      {
                        className: "block font-semibold uppercase",
                        style: {
                          fontSize: 9,
                          lineHeight: 1.3,
                          letterSpacing: ".08em",
                          color: SEARCHBAR_COLORS.muted,
                          padding: "8px 10px 5px"
                        },
                        children: "Recent"
                      }
                    ),
                    recents.map((entry) => /* @__PURE__ */ jsxRuntime.jsxs(
                      "div",
                      {
                        className: "flex items-center transition-colors",
                        style: {
                          gap: 9,
                          padding: "7px 10px",
                          borderRadius: 6
                        },
                        onMouseEnter: (e) => {
                          e.currentTarget.style.background = SEARCHBAR_COLORS.hoverTint;
                        },
                        onMouseLeave: (e) => {
                          e.currentTarget.style.background = "transparent";
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => handleRecentPick(entry),
                              className: "flex flex-1 items-center text-left",
                              style: { gap: 9, cursor: "pointer" },
                              children: [
                                /* @__PURE__ */ jsxRuntime.jsx(
                                  lucideReact.Clock,
                                  {
                                    size: 12,
                                    strokeWidth: 2,
                                    className: "shrink-0",
                                    style: { color: SEARCHBAR_COLORS.placeholder }
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntime.jsx(
                                  "span",
                                  {
                                    className: "flex-1 truncate font-medium",
                                    style: {
                                      fontSize: 11,
                                      lineHeight: 1.3,
                                      color: SEARCHBAR_COLORS.value
                                    },
                                    children: entry
                                  }
                                )
                              ]
                            }
                          ),
                          onRemoveRecent && /* @__PURE__ */ jsxRuntime.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => onRemoveRecent(entry),
                              className: "flex shrink-0 items-center justify-center",
                              style: {
                                color: SEARCHBAR_COLORS.borderHover,
                                cursor: "pointer"
                              },
                              "aria-label": `Remove ${entry} from recent searches`,
                              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 10, strokeWidth: 3 })
                            }
                          )
                        ]
                      },
                      entry
                    ))
                  ]
                }
              ),
              isDropdownVisible && /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: cn(
                    "absolute left-0 top-full z-50 mt-1.5 max-h-48 w-full overflow-y-auto",
                    dropdownClassName
                  ),
                  style: { ...panelStyle, padding: 5 },
                  children: filteredItems.length > 0 ? filteredItems.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      className: "flex w-full items-center text-left font-medium transition-colors",
                      style: {
                        padding: "7px 10px",
                        borderRadius: 6,
                        fontSize: 11,
                        lineHeight: 1.3,
                        color: SEARCHBAR_COLORS.value
                      },
                      onMouseEnter: (e) => {
                        e.currentTarget.style.background = SEARCHBAR_COLORS.hoverTint;
                      },
                      onMouseLeave: (e) => {
                        e.currentTarget.style.background = "transparent";
                      },
                      onClick: () => handleSelect(item),
                      children: item.label
                    },
                    item.value
                  )) : /* @__PURE__ */ jsxRuntime.jsx(
                    "div",
                    {
                      style: {
                        padding: "7px 10px",
                        fontSize: 11,
                        lineHeight: 1.3,
                        color: SEARCHBAR_COLORS.placeholder
                      },
                      children: fallbackText
                    }
                  )
                }
              )
            ]
          }
        ),
        resolvedMessage != null && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            style: {
              minHeight: 16,
              fontSize: metrics.message,
              lineHeight: 1.4,
              color: messageColor
            },
            children: resolvedMessage
          }
        )
      ]
    }
  );
}
SearchBar.displayName = "SearchBar";
var FilterGroupMobileContext = React9__namespace.createContext(false);
var FilterGroupDrawerCalendarContext = React9__namespace.createContext(null);
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  style,
  children,
  ...props
}) {
  const { popover } = useZIndex();
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Popover.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "uengage-ui",
        "min-w-[8rem] overflow-hidden rounded-[4px] border border-[#E5E7EB] bg-white p-0 shadow-md outline-none",
        className
      ),
      style: { zIndex: popover, ...style },
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(FilterGroupMobileContext.Provider, { value: false, children })
    }
  ) });
}
function InputHelper({
  size = "md",
  helperText,
  error,
  state = "default",
  reserveSpace = false,
  className,
  style,
  ...props
}) {
  const showError = Boolean(error);
  const text = showError ? error : helperText;
  if (!text && !reserveSpace) return null;
  const fontSize = INPUT_SIZES[size].message;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "p",
    {
      role: showError ? "alert" : void 0,
      className: cn("inline-flex items-start gap-[5px] leading-[1.4]", className),
      style: {
        fontSize,
        minHeight: Math.round(fontSize * 1.45),
        color: getMessageColor(state, showError),
        ...style
      },
      ...props,
      children: [
        showError && /* @__PURE__ */ jsxRuntime.jsx(
          lucideReact.CircleAlert,
          {
            "aria-hidden": "true",
            strokeWidth: 2.2,
            className: "shrink-0",
            style: { width: fontSize + 1, height: fontSize + 1, marginTop: 1 }
          }
        ),
        text && /* @__PURE__ */ jsxRuntime.jsx("span", { children: text })
      ]
    }
  );
}
InputHelper.displayName = "InputHelper";
function Command({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command,
    {
      "data-slot": "command",
      className: cn("uengage-ui flex h-full w-full flex-col overflow-hidden bg-white text-[#111827]", className),
      ...props
    }
  );
}
function CommandInput({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "uengage-ui flex items-center border-b border-[#E5E7EB] px-3", children: /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.CommandInput,
    {
      "data-slot": "command-input",
      className: cn(
        "flex h-9 w-full bg-transparent py-2 text-sm text-[#111827] outline-none placeholder:text-[#C4C9D2] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  ) });
}
var CommandList = React9__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  cmdk.CommandList,
  {
    ref,
    "data-slot": "command-list",
    className: cn("max-h-60 overflow-y-auto overflow-x-hidden py-1", className),
    ...props
  }
));
CommandList.displayName = "CommandList";
function CommandEmpty({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.CommandEmpty,
    {
      "data-slot": "command-empty",
      className: cn("px-3 py-6 text-center text-sm text-[#9CA3AF]", className),
      ...props
    }
  );
}
function CommandGroup({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.CommandGroup,
    {
      "data-slot": "command-group",
      className: cn("overflow-hidden", className),
      ...props
    }
  );
}
function CommandItem({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.CommandItem,
    {
      role: "option",
      "data-slot": "command-item",
      className: cn(
        "relative flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-sm text-[#374151] outline-none",
        "hover:bg-[#F3F4F6] data-[selected=true]:bg-[#F3F4F6]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      ),
      ...props
    }
  );
}
function CommandSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.CommandSeparator,
    {
      "data-slot": "command-separator",
      className: cn("my-1 h-px bg-[#E5E7EB]", className),
      ...props
    }
  );
}
var SELECT_SIZES = {
  xs: { height: 28, padLeft: 9, padRight: 8, padMultiY: 3, font: 12, icon: 13, option: 28, radius: 8, label: 11 },
  sm: { height: 32, padLeft: 11, padRight: 9, padMultiY: 4, font: 12, icon: 14, option: 30, radius: 8, label: 12 },
  md: { height: 40, padLeft: 13, padRight: 11, padMultiY: 6, font: 13, icon: 15, option: 34, radius: 8, label: 12 },
  lg: { height: 48, padLeft: 15, padRight: 13, padMultiY: 8, font: 14, icon: 17, option: 38, radius: 8, label: 13 }
};
var SELECT_GAP = 9;
var MENU = {
  /** 4px inset padding around the option list. */
  padding: 4,
  radius: 8,
  optionRadius: 6,
  border: `1px solid ${INPUT_COLORS.border}`,
  background: INPUT_COLORS.surface,
  shadow: "2px 2px 4px rgba(0,0,0,.12)",
  /** Selected row: mint fill with a check, never a blue bar. */
  selectedBg: "#DCF3CE",
  selectedInk: "#003C1B",
  /** A checked row in a multi select gets the lighter wash, not the mint fill. */
  multiSelectedBg: "#FAFFF7",
  checkboxOn: "#003C1B",
  checkboxOff: INPUT_COLORS.borderHover,
  /** Group eyebrow + the hairline that separates groups. */
  groupInk: INPUT_COLORS.message,
  groupRule: "#EEEEEE",
  metaInk: INPUT_COLORS.message,
  /** Long lists cap at 8 rows and scroll. */
  maxRows: 8,
  /** Thin green scrollbar on the option list — never the system default. */
  scrollThumb: "#16914E",
  scrollThumbHover: "#A8D5B5",
  scrollWidth: 4
};
var MENU_SCROLLBAR_CSS = `
[data-slot="select-menu-list"] {
  scrollbar-width: thin;
  scrollbar-color: ${MENU.scrollThumb} transparent;
}
[data-slot="select-menu-list"]::-webkit-scrollbar {
  width: ${MENU.scrollWidth}px;
  height: ${MENU.scrollWidth}px;
}
[data-slot="select-menu-list"]::-webkit-scrollbar-track {
  background: transparent;
  margin-block: ${MENU.padding}px;
}
[data-slot="select-menu-list"]::-webkit-scrollbar-thumb {
  background-color: ${MENU.scrollThumb};
  border-radius: 9999px;
  transition: background-color 160ms ease;
}
[data-slot="select-menu-list"]::-webkit-scrollbar-thumb:hover {
  background-color: ${MENU.scrollThumbHover};
}
`;
function getTriggerStyle(state) {
  return getInputBoxStyle(state === "open" ? "focused" : state);
}
var triggerVariants = classVarianceAuthority.cva(
  [
    "flex min-w-0 items-center justify-between",
    "cursor-pointer select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      state: {
        default: "",
        open: "",
        disabled: "pointer-events-none",
        readonly: "cursor-default pointer-events-none",
        hover: "",
        focused: "",
        error: "",
        success: "",
        warning: "",
        validating: "",
        loading: "pointer-events-none"
      },
      size: { xs: "", sm: "", md: "", lg: "" }
    },
    defaultVariants: { state: "default", size: "md" }
  }
);
var CREATE_VALUE = "__create__";
var PILL_MAX_WIDTH = 140;
var PILL_MIN_WIDTH = 56;
var PILL_GAP = 4;
function CheckboxIcon({ checked }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: "flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[3px]",
      style: {
        background: checked ? MENU.checkboxOn : "transparent",
        border: `1.5px solid ${checked ? MENU.checkboxOn : MENU.checkboxOff}`,
        transition: "background 120ms linear, border-color 120ms linear"
      },
      children: checked && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 9, strokeWidth: 3.5, className: "text-white" })
    }
  );
}
function Spinner({ size }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "shrink-0 animate-spin rounded-full",
      style: {
        width: size,
        height: size,
        border: `2px solid ${INPUT_COLORS.border}`,
        borderTopColor: INPUT_COLORS.borderFocus
      }
    }
  );
}
function LoadingRows({ height }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col gap-1 p-1", "aria-busy": "true", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: "animate-pulse",
      style: {
        height,
        borderRadius: MENU.optionRadius,
        background: INPUT_COLORS.subtle,
        opacity: 1 - i * 0.22
      }
    },
    i
  )) });
}
function Select({
  options,
  items,
  getLabel,
  getValue,
  getDisabled,
  value: controlledValue,
  defaultValue,
  mode = "single",
  multiple,
  size = "md",
  placeholder = "Select...",
  disabled = false,
  width,
  className,
  onChange,
  onTouch,
  spellCheck = true,
  clearable = false,
  label,
  required,
  helperText,
  error,
  readOnly = false,
  sorting = false,
  indexing = false,
  search: searchProp = true,
  searchable,
  status,
  statusMessage,
  leftIcon,
  loading = false,
  maxChips,
  onSearch,
  creatable = false,
  onCreate,
  emptyState,
  placement = "auto"
}) {
  const isMobileDrawer = React9__namespace.useContext(FilterGroupMobileContext);
  const touchedRef = React9__namespace.useRef(false);
  const interactedRef = React9__namespace.useRef(false);
  const resolvedMode = multiple ? "multi" : mode;
  const searchEnabled = searchable ?? searchProp;
  const spec = SELECT_SIZES[size];
  const resolvedOptions = React9__namespace.useMemo(() => {
    if (items && getLabel && getValue) {
      return items.map((item) => ({
        label: getLabel(item),
        value: getValue(item),
        disabled: getDisabled ? getDisabled(item) : false
      }));
    }
    return options ?? [];
  }, [items, getLabel, getValue, getDisabled, options]);
  const [open, setOpen] = React9__namespace.useState(false);
  const [hovered, setHovered] = React9__namespace.useState(false);
  const [searchQuery, setSearchQuery] = React9__namespace.useState("");
  const [sortOrder, setSortOrder] = React9__namespace.useState("asc");
  const listRef = React9__namespace.useRef(null);
  React9__namespace.useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [sortOrder]);
  const sortedOptions = React9__namespace.useMemo(() => {
    if (!sorting) return resolvedOptions;
    return [...resolvedOptions].sort(
      (a, b) => sortOrder === "asc" ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)
    );
  }, [resolvedOptions, sorting, sortOrder]);
  const fuseFilteredOptions = useFuzzySearch(sortedOptions, searchQuery);
  const visibleOptions = React9__namespace.useMemo(() => {
    if (!searchEnabled) return sortedOptions;
    const q = searchQuery.trim();
    if (indexing && /^\d+$/.test(q)) {
      const n = parseInt(q, 10);
      const opt = sortedOptions[n - 1];
      return opt ? [opt] : [];
    }
    return fuseFilteredOptions;
  }, [searchEnabled, searchQuery, indexing, sortedOptions, fuseFilteredOptions]);
  const [selected, setSelected] = React9__namespace.useState(
    controlledValue ?? defaultValue ?? (resolvedMode === "multi" ? [] : "")
  );
  React9__namespace.useEffect(() => {
    if (controlledValue !== void 0) setSelected(controlledValue);
  }, [controlledValue]);
  const selectedArr = resolvedMode === "multi" ? Array.isArray(selected) ? selected : [] : [];
  const enabledOptions = sortedOptions.filter((o) => !o.disabled);
  const allSelected = enabledOptions.length > 0 && enabledOptions.every((o) => selectedArr.includes(o.value));
  const isSelected = (val) => resolvedMode === "single" ? selected === val : selectedArr.includes(val);
  const commit = (next) => {
    if (controlledValue === void 0) setSelected(next);
    onChange?.(next);
  };
  const handleSelect = (val) => {
    if (resolvedMode === "single") {
      commit(val);
      setOpen(false);
    } else {
      commit(
        selectedArr.includes(val) ? selectedArr.filter((v) => v !== val) : [...selectedArr, val]
      );
    }
  };
  const removePill = (val, e) => {
    e.preventDefault();
    e.stopPropagation();
    commit(selectedArr.filter((v) => v !== val));
  };
  const clearAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    commit(resolvedMode === "multi" ? [] : "");
  };
  const pillsContainerRef = React9__namespace.useRef(null);
  const [visibleCount, setVisibleCount] = React9__namespace.useState(null);
  const [rowWidth, setRowWidth] = React9__namespace.useState(0);
  React9__namespace.useLayoutEffect(() => {
    const container = pillsContainerRef.current;
    if (!container || resolvedMode !== "multi") return;
    const measure = () => setRowWidth(container.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [resolvedMode]);
  const badgeReserve = 20 + 7 * String(selectedArr.length).length + PILL_GAP;
  const pillMaxWidth = React9__namespace.useMemo(() => {
    if (rowWidth === 0) return PILL_MAX_WIDTH;
    const budget = selectedArr.length <= 1 ? rowWidth : rowWidth - badgeReserve;
    return Math.max(PILL_MIN_WIDTH, Math.min(PILL_MAX_WIDTH, Math.floor(budget)));
  }, [rowWidth, selectedArr.length, badgeReserve]);
  React9__namespace.useLayoutEffect(() => {
    if (resolvedMode === "multi") setVisibleCount(null);
  }, [selectedArr.join(","), resolvedMode, rowWidth]);
  React9__namespace.useLayoutEffect(() => {
    if (visibleCount !== null) return;
    if (maxChips !== void 0) {
      setVisibleCount(Math.min(maxChips, selectedArr.length));
      return;
    }
    const container = pillsContainerRef.current;
    if (!container || resolvedMode !== "multi" || selectedArr.length === 0) {
      setVisibleCount(selectedArr.length);
      return;
    }
    if (rowWidth === 0) return;
    const containerRight = container.getBoundingClientRect().right;
    const pills = Array.from(
      container.querySelectorAll("[data-pill]")
    );
    let count = pills.length;
    for (let i = 0; i < pills.length; i++) {
      const pillRight = pills[i].getBoundingClientRect().right;
      const hasMore = i < pills.length - 1;
      const limit = hasMore ? containerRight - badgeReserve : containerRight;
      if (pillRight > limit) {
        count = i === 0 ? 1 : i;
        break;
      }
    }
    setVisibleCount(count);
  }, [visibleCount, maxChips, badgeReserve, rowWidth]);
  const displayedPills = visibleCount === null ? selectedArr : selectedArr.slice(0, visibleCount);
  const overflowCount = visibleCount === null ? 0 : selectedArr.length - visibleCount;
  const hasSelection = resolvedMode === "multi" ? selectedArr.length > 0 : !!selected;
  const singleLabel = resolvedMode === "single" ? resolvedOptions.find((o) => o.value === selected)?.label : void 0;
  const state = disabled ? "disabled" : loading ? "loading" : readOnly ? "readonly" : error ? "error" : open ? "open" : status === "success" ? "success" : status === "warning" ? "warning" : hovered ? "hover" : "default";
  const box = getTriggerStyle(state);
  const showChevron = !readOnly && !loading;
  const legacyState = state === "disabled" ? "disabled" : state === "readonly" ? "readonly" : state === "open" ? "open" : "default";
  const handleOpenChange = (next) => {
    if (disabled || readOnly || loading) return;
    setOpen(next);
    if (!next) setSearchQuery("");
    if (next) {
      interactedRef.current = true;
    } else if (interactedRef.current && !touchedRef.current) {
      touchedRef.current = true;
      onTouch?.();
    }
  };
  const handleTriggerBlur = (e) => {
    if (open) return;
    if (e.currentTarget.contains(e.relatedTarget)) return;
    if (!interactedRef.current) return;
    if (touchedRef.current) return;
    touchedRef.current = true;
    onTouch?.();
  };
  const handleSearchChange = (q) => {
    setSearchQuery(q);
    onSearch?.(q);
  };
  if (isMobileDrawer) {
    return /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "divide-y divide-gray-100", children: resolvedOptions.map((opt) => {
      const rowSelected = isSelected(opt.value);
      return /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          disabled: opt.disabled,
          onClick: () => !opt.disabled && handleSelect(opt.value),
          className: cn(
            "flex w-full items-center justify-between px-4 py-4 text-sm transition-colors",
            rowSelected ? "font-semibold text-[#003C1B]" : "font-normal text-gray-800",
            opt.disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-[#FAFFF7] active:bg-[#DCF3CE]"
          ),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: opt.label }),
            rowSelected && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 16, strokeWidth: 2.5, className: "shrink-0 text-[#003C1B]" })
          ]
        }
      ) }, opt.value);
    }) });
  }
  const query = searchQuery.trim();
  const exactMatch = visibleOptions.some(
    (o) => o.label.toLowerCase() === query.toLowerCase()
  );
  const showCreate = creatable && query.length > 0 && !exactMatch;
  const showEmpty = visibleOptions.length === 0 && !showCreate;
  const groups = React9__namespace.useMemo(() => {
    const out = [];
    for (const opt of visibleOptions) {
      const name = opt.group ?? null;
      const last = out[out.length - 1];
      if (last && last.name === name) last.options.push(opt);
      else out.push({ name, options: [opt] });
    }
    return out;
  }, [visibleOptions]);
  const renderOption = (option) => {
    const checked = isSelected(option.value);
    const isMulti = resolvedMode === "multi";
    const rich = Boolean(option.description || option.icon);
    const originalIdx = sortedOptions.findIndex((o) => o.value === option.value);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      CommandItem,
      {
        value: option.value,
        disabled: option.disabled,
        "aria-selected": checked,
        onSelect: () => handleSelect(option.value),
        className: cn(
          "group/opt cursor-pointer data-[disabled=true]:cursor-not-allowed",
          rich ? "items-start" : "items-center"
        ),
        style: {
          minHeight: rich ? 44 : spec.option,
          gap: SELECT_GAP,
          padding: rich ? "7px 10px" : "0 10px",
          borderRadius: MENU.optionRadius,
          fontSize: spec.font,
          lineHeight: 1.3,
          background: checked ? isMulti ? MENU.multiSelectedBg : MENU.selectedBg : "transparent",
          color: checked && !isMulti ? MENU.selectedInk : INPUT_COLORS.value,
          fontWeight: checked && !isMulti ? 600 : 500,
          opacity: option.disabled ? 0.55 : 1
        },
        children: [
          isMulti && /* @__PURE__ */ jsxRuntime.jsx(CheckboxIcon, { checked }),
          indexing && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "shrink-0 tabular-nums", style: { color: MENU.metaInk }, children: [
            originalIdx + 1,
            "."
          ] }),
          option.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex shrink-0 items-center", children: option.icon }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: option.label }),
            option.description && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.font - 2, fontWeight: 400, color: MENU.metaInk }, children: option.description })
          ] }),
          option.meta && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: "shrink-0 whitespace-nowrap",
              style: { fontSize: spec.font - 2, fontWeight: 500, color: MENU.metaInk },
              children: option.meta
            }
          ),
          !isMulti && checked && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 14, strokeWidth: 2.8, className: "shrink-0", color: MENU.selectedInk })
        ]
      },
      option.value
    );
  };
  return (
    // `min-w-0` lets the field shrink inside a flex parent (a sidebar column
    // otherwise refuses to go below the chips' intrinsic width) and
    // `max-w-full` caps it when that parent sizes children to max-content.
    // Without both, the trigger overflows the sidebar before the chip
    // measurement below ever gets a say.
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 max-w-full flex-col gap-1.5", children: [
      label && /* @__PURE__ */ jsxRuntime.jsx(
        InputLabel,
        {
          size,
          required,
          tone: state === "error" || state === "disabled" ? getLabelColor(state) : void 0,
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
        /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            role: "button",
            "data-slot": "select-trigger",
            "data-size": size,
            "data-state": state,
            tabIndex: disabled ? -1 : 0,
            "aria-disabled": disabled,
            "aria-haspopup": "listbox",
            "aria-expanded": open,
            "aria-busy": loading || void 0,
            onPointerEnter: () => setHovered(true),
            onPointerLeave: () => setHovered(false),
            onFocus: () => {
              interactedRef.current = true;
            },
            onBlur: handleTriggerBlur,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!disabled && !readOnly && !loading) setOpen((o) => !o);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            },
            className: cn(
              triggerVariants({ state: legacyState, size }),
              width,
              className
            ),
            style: {
              minHeight: spec.height,
              paddingLeft: spec.padLeft,
              paddingRight: spec.padRight,
              paddingTop: resolvedMode === "multi" ? spec.padMultiY : 0,
              paddingBottom: resolvedMode === "multi" ? spec.padMultiY : 0,
              gap: SELECT_GAP,
              borderRadius: spec.radius,
              fontSize: spec.font,
              background: box.background,
              border: box.border,
              boxShadow: box.boxShadow,
              color: box.color,
              cursor: box.cursor ?? "pointer",
              transition: INPUT_TRANSITION
            },
            children: [
              leftIcon && /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: "flex shrink-0 items-center justify-center [&>svg]:size-full",
                  style: { width: spec.icon + 1, height: spec.icon + 1, color: INPUT_COLORS.icon },
                  children: leftIcon
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  ref: resolvedMode === "multi" ? pillsContainerRef : void 0,
                  className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
                  children: resolvedMode === "multi" ? selectedArr.length > 0 ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                    displayedPills.map((val) => {
                      const opt = resolvedOptions.find((o) => o.value === val);
                      if (!opt) return null;
                      return /* @__PURE__ */ jsxRuntime.jsxs(
                        "span",
                        {
                          "data-pill": true,
                          className: "inline-flex shrink-0 items-center gap-1 rounded-full font-semibold",
                          style: {
                            maxWidth: pillMaxWidth,
                            padding: clearable ? "4px 4px 4px 10px" : "4px 10px",
                            background: MENU.selectedBg,
                            color: MENU.selectedInk,
                            fontSize: spec.font - 2
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: opt.label }),
                            clearable && /* @__PURE__ */ jsxRuntime.jsx(
                              "button",
                              {
                                type: "button",
                                tabIndex: -1,
                                onClick: (e) => removePill(val, e),
                                "aria-label": `Remove ${opt.label}`,
                                className: "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full transition-colors",
                                style: { background: "rgba(0,60,27,.1)", color: MENU.selectedInk },
                                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 8, strokeWidth: 3.4 })
                              }
                            )
                          ]
                        },
                        val
                      );
                    }),
                    overflowCount > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
                      "span",
                      {
                        className: "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
                        style: {
                          padding: "4px 8px",
                          background: INPUT_COLORS.subtle,
                          color: INPUT_COLORS.message,
                          fontSize: spec.font - 2
                        },
                        children: [
                          "+",
                          overflowCount
                        ]
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", style: { color: INPUT_COLORS.placeholder }, children: placeholder }) : /* @__PURE__ */ jsxRuntime.jsx(
                    "span",
                    {
                      className: "truncate",
                      style: {
                        color: singleLabel ? box.color : INPUT_COLORS.placeholder
                      },
                      children: singleLabel ?? placeholder
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex shrink-0 items-center", style: { gap: 6 }, children: [
                clearable && hasSelection && !readOnly && !disabled && /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    tabIndex: -1,
                    onClick: clearAll,
                    "aria-label": "Clear selection",
                    className: "flex shrink-0 items-center justify-center rounded-full transition-colors",
                    style: {
                      width: spec.icon + 4,
                      height: spec.icon + 4,
                      background: INPUT_COLORS.subtle,
                      color: INPUT_COLORS.message
                    },
                    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: spec.icon - 6, strokeWidth: 3 })
                  }
                ),
                sorting && /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    tabIndex: -1,
                    onClick: (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSortOrder((o) => o === "asc" ? "desc" : "asc");
                    },
                    disabled,
                    "aria-label": sortOrder === "asc" ? "Sorted A\u2192Z, click for Z\u2192A" : "Sorted Z\u2192A, click for A\u2192Z",
                    className: "flex items-center transition-colors",
                    style: { color: INPUT_COLORS.message },
                    children: sortOrder === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUpAZ, { size: spec.icon - 1, strokeWidth: 2 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowDownAZ, { size: spec.icon - 1, strokeWidth: 2 })
                  }
                ),
                loading && /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: spec.icon - 2 }),
                state === "readonly" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Lock, { size: spec.icon - 2, strokeWidth: 2, color: INPUT_COLORS.placeholder }),
                state === "error" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleAlert, { size: spec.icon, strokeWidth: 2.2, color: INPUT_COLORS.errorInk }),
                state === "warning" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleAlert, { size: spec.icon, strokeWidth: 2.2, color: INPUT_COLORS.warningInk }),
                state === "success" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: spec.icon, strokeWidth: 2.6, color: INPUT_COLORS.successInk }),
                showChevron && /* @__PURE__ */ jsxRuntime.jsx(
                  lucideReact.ChevronDown,
                  {
                    size: spec.icon,
                    strokeWidth: 2,
                    className: "transition-transform duration-[120ms]",
                    style: {
                      color: disabled ? INPUT_COLORS.borderHover : INPUT_COLORS.placeholder,
                      transform: open ? "rotate(180deg)" : "rotate(0deg)"
                    }
                  }
                )
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          PopoverContent,
          {
            side: placement === "auto" ? "bottom" : placement,
            className: "max-w-[calc(100vw-1rem)] border-0 p-0 shadow-none",
            collisionPadding: { top: 64 },
            style: { width: "var(--radix-popover-trigger-width)" },
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                style: {
                  padding: MENU.padding,
                  borderRadius: MENU.radius,
                  border: MENU.border,
                  background: MENU.background,
                  boxShadow: MENU.shadow
                },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("style", { children: MENU_SCROLLBAR_CSS }),
                  /* @__PURE__ */ jsxRuntime.jsxs(Command, { shouldFilter: false, children: [
                    searchEnabled && !loading && /* @__PURE__ */ jsxRuntime.jsx(
                      CommandInput,
                      {
                        placeholder: "Search...",
                        value: searchQuery,
                        onValueChange: handleSearchChange,
                        spellCheck,
                        style: { fontSize: spec.font }
                      }
                    ),
                    resolvedMode === "multi" && !loading && visibleOptions.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
                      "div",
                      {
                        className: "sticky top-0 z-10 flex items-center justify-between",
                        style: {
                          padding: "6px 10px",
                          background: MENU.background,
                          borderBottom: `1px solid ${MENU.groupRule}`,
                          fontSize: spec.font - 2,
                          color: INPUT_COLORS.message
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "font-semibold", children: [
                            selectedArr.length,
                            " selected"
                          ] }),
                          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntime.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => commit(enabledOptions.map((o) => o.value)),
                                disabled: allSelected,
                                className: "font-semibold disabled:opacity-40",
                                style: { color: MENU.selectedInk },
                                children: "All"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: MENU.groupRule }, children: "|" }),
                            /* @__PURE__ */ jsxRuntime.jsx(
                              "button",
                              {
                                type: "button",
                                onClick: () => commit([]),
                                disabled: selectedArr.length === 0,
                                className: "font-semibold disabled:opacity-40",
                                style: { color: INPUT_COLORS.message },
                                children: "None"
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      CommandList,
                      {
                        ref: listRef,
                        "data-slot": "select-menu-list",
                        style: { maxHeight: MENU.maxRows * spec.option + MENU.padding * 2 },
                        children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoadingRows, { height: spec.option }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                          groups.map((group, gi) => /* @__PURE__ */ jsxRuntime.jsxs(
                            "div",
                            {
                              style: gi > 0 && group.name ? { borderTop: `1px solid ${MENU.groupRule}`, marginTop: 4, paddingTop: 4 } : void 0,
                              children: [
                                group.name && /* @__PURE__ */ jsxRuntime.jsx(
                                  "div",
                                  {
                                    className: "sticky top-0 z-[5] font-semibold uppercase",
                                    style: {
                                      padding: "6px 10px 4px",
                                      background: MENU.background,
                                      fontSize: 10,
                                      letterSpacing: "0.09em",
                                      color: MENU.groupInk
                                    },
                                    children: group.name
                                  }
                                ),
                                group.options.map(renderOption)
                              ]
                            },
                            group.name ?? `__ungrouped_${gi}`
                          )),
                          showCreate && /* @__PURE__ */ jsxRuntime.jsxs(
                            CommandItem,
                            {
                              value: CREATE_VALUE,
                              onSelect: () => {
                                onCreate?.(query);
                                setOpen(false);
                              },
                              className: "cursor-pointer",
                              style: {
                                minHeight: spec.option,
                                gap: SELECT_GAP,
                                padding: "0 10px",
                                marginTop: 4,
                                borderTop: `1px solid ${MENU.groupRule}`,
                                borderRadius: MENU.optionRadius,
                                fontSize: spec.font,
                                fontWeight: 600,
                                color: MENU.selectedInk
                              },
                              children: [
                                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { size: 14, strokeWidth: 2.4, className: "shrink-0" }),
                                /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "truncate", children: [
                                  "Create \u201C",
                                  query,
                                  "\u201D"
                                ] })
                              ]
                            }
                          ),
                          showEmpty && /* @__PURE__ */ jsxRuntime.jsx(
                            "div",
                            {
                              className: "flex flex-col items-start gap-1",
                              style: { padding: "14px 10px", fontSize: spec.font },
                              children: emptyState ?? /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: INPUT_COLORS.message }, children: "No results found." })
                            }
                          )
                        ] })
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        InputHelper,
        {
          size,
          state: state === "open" ? "focused" : state,
          helperText: error ?? (status && statusMessage) ?? helperText,
          error
        }
      )
    ] })
  );
}
Select.displayName = "Select";
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Tabs.Root,
    {
      "data-slot": "tabs",
      "data-orientation": orientation,
      orientation,
      className: cn(
        "uengage-ui",
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      ),
      ...props
    }
  );
}
var tabsListVariants = classVarianceAuthority.cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function TabsList({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Tabs.List,
    {
      "data-slot": "tabs-list",
      "data-variant": variant,
      className: cn("uengage-ui", tabsListVariants({ variant }), className),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Tabs.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "uengage-ui",
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-1.25 group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      ),
      ...props
    }
  );
}

// src/utils/tokens.ts
var FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006F42]";
var SELECTION_FOCUS_RING = "focus-visible:shadow-[0_0_0_3px_rgba(140,196,42,0.38)]";
var tabTriggerVariants = classVarianceAuthority.cva(
  [
    "relative flex items-center gap-2 cursor-pointer select-none whitespace-nowrap",
    "rounded-t-lg transition-all duration-200 outline-none",
    "px-3 py-2 sm:px-5 sm:py-3 text-[13px] sm:text-[14px] font-medium",
    FOCUS_RING
  ].join(" "),
  {
    variants: {
      state: {
        active: "text-[#006F42] font-semibold",
        inactive: "text-gray-500 hover:text-[#006F42] hover:bg-gray-50",
        disabled: "text-[#D1D5DB] pointer-events-none"
      }
    },
    defaultVariants: {
      state: "inactive"
    }
  }
);
var tabPillClass = "relative z-10";
var tabOverlayClass = "absolute inset-0 rounded-t-lg bg-transparent";
var STRIP_SHADCN_DEFAULTS = [
  "after:hidden after:content-none after:bg-transparent after:opacity-0",
  "border-0 shadow-none bg-transparent",
  "data-[state=active]:!bg-transparent data-[state=active]:shadow-none data-[state=active]:border-transparent",
  "focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none"
].join(" ");
function CustomTabsTrigger({
  className,
  children,
  disabled,
  variant = "secondary",
  ...props
}) {
  const state = disabled ? "disabled" : "inactive";
  if (variant === "tertiary") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      TabsTrigger,
      {
        disabled,
        "data-tab-value": props.value,
        className: cn(
          "relative z-10 flex-none w-auto cursor-pointer select-none whitespace-nowrap",
          "rounded-full px-2 py-0.5 sm:px-2.5 text-[12px] sm:text-[13px] font-semibold",
          "transition-colors duration-300 ease-out outline-none",
          "text-[#595959] hover:text-black data-[state=active]:!text-black!",
          "bg-transparent data-[state=active]:!bg-transparent",
          "border-0 shadow-none",
          "data-[state=active]:border-0 data-[state=active]:shadow-none",
          "after:hidden after:content-none",
          FOCUS_RING,
          "disabled:pointer-events-none disabled:text-[#D1D5DB]",
          className
        ),
        ...props,
        children
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    TabsTrigger,
    {
      disabled,
      "data-tab-value": props.value,
      className: cn(
        "group/tab flex-none w-auto",
        tabTriggerVariants({ state }),
        STRIP_SHADCN_DEFAULTS,
        "data-[state=active]:!text-[#0A5A2A]! data-[state=active]:!font-semibold!",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: cn(
              tabPillClass,
              "transition-colors duration-300 ease-out",
              "text-gray-500 group-hover/tab:text-[#0A5A2A]",
              "group-data-[state=active]/tab:text-[#0A5A2A] group-data-[state=active]/tab:font-semibold"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              tabOverlayClass,
              "transition-colors duration-300 ease-out",
              "group-data-[state=active]/tab:bg-[#0A5A2A]/5"
            )
          }
        )
      ]
    }
  );
}
CustomTabsTrigger.displayName = "CustomTabsTrigger";
function getInitialValue(tabs, value, defaultValue) {
  return value ?? defaultValue ?? tabs[0]?.value ?? "";
}
function escapeTabValue(value) {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(value);
  }
  return value.replace(/["\\]/g, "\\$&");
}
function useTabValue(tabs, value, defaultValue, onChange) {
  const [uncontrolledValue, setUncontrolledValue] = React9__namespace.useState(
    () => getInitialValue(tabs, value, defaultValue)
  );
  const activeValue = value ?? uncontrolledValue;
  React9__namespace.useEffect(() => {
    if (value !== void 0) return;
    if (tabs.some((tab) => tab.value === uncontrolledValue)) return;
    setUncontrolledValue(getInitialValue(tabs, value, defaultValue));
  }, [defaultValue, tabs, uncontrolledValue, value]);
  const handleChange = React9__namespace.useCallback(
    (nextValue) => {
      if (!tabs.some((tab) => tab.value === nextValue && !tab.disabled)) return;
      if (value === void 0) setUncontrolledValue(nextValue);
      onChange?.(nextValue);
    },
    [onChange, tabs, value]
  );
  return { activeValue, handleChange };
}
function getVisibleTabs(tabs, activeValue, visibleTabLimit) {
  if (visibleTabLimit === void 0 || tabs.length <= visibleTabLimit) {
    return { visibleTabs: tabs, overflowTabs: [] };
  }
  const normalizedLimit = Math.min(
    Math.max(visibleTabLimit, 1),
    tabs.length - 1
  );
  const initialVisibleTabs = tabs.slice(0, normalizedLimit);
  const initialVisibleValues = new Set(
    initialVisibleTabs.map((tab) => tab.value)
  );
  if (!activeValue || initialVisibleValues.has(activeValue)) {
    return {
      visibleTabs: initialVisibleTabs,
      overflowTabs: tabs.slice(normalizedLimit)
    };
  }
  const activeTab = tabs.find((tab) => tab.value === activeValue);
  if (!activeTab) {
    return {
      visibleTabs: initialVisibleTabs,
      overflowTabs: tabs.slice(normalizedLimit)
    };
  }
  let replacementIndex = -1;
  for (let index = initialVisibleTabs.length - 1; index >= 0; index -= 1) {
    if (initialVisibleTabs[index]?.value !== activeValue) {
      replacementIndex = index;
      break;
    }
  }
  const safeReplacementIndex = replacementIndex >= 0 ? replacementIndex : normalizedLimit - 1;
  const replacedTab = initialVisibleTabs[safeReplacementIndex];
  const nextVisibleTabs = [...initialVisibleTabs];
  nextVisibleTabs[safeReplacementIndex] = activeTab;
  const overflowTabs = tabs.filter((tab) => {
    if (tab.value === activeTab.value) return false;
    if (replacedTab && tab.value === replacedTab.value) return true;
    return !nextVisibleTabs.some(
      (visibleTab) => visibleTab.value === tab.value
    );
  });
  return { visibleTabs: nextVisibleTabs, overflowTabs };
}
function OverflowTabsSelect({
  overflowTabs,
  overflowLabel,
  activeValue,
  onChange,
  className
}) {
  const [open, setOpen] = React9__namespace.useState(false);
  if (overflowTabs.length === 0) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        className: cn(
          "inline-flex shrink-0 items-center whitespace-nowrap transition-colors duration-200",
          "relative z-10 gap-1 rounded-full px-2 py-1 sm:px-3 text-[13px] sm:text-[14px] font-semibold text-[#595959]",
          `hover:text-black ${FOCUS_RING}`,
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: overflowLabel }),
          /* @__PURE__ */ jsxRuntime.jsx(
            lucideReact.ChevronDown,
            {
              size: 16,
              strokeWidth: 2.25,
              className: cn(
                "text-[#0A5A2A] transition-transform duration-200",
                open && "rotate-180"
              )
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      PopoverContent,
      {
        align: "end",
        sideOffset: 8,
        collisionPadding: 8,
        className: "w-[220px] max-w-[calc(100vw-1rem)] rounded-[10px] border border-[#E5E7EB] p-1 shadow-[0_12px_32px_rgba(15,23,42,0.12)]",
        children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col", children: overflowTabs.map((tab) => {
          const isActive = tab.value === activeValue;
          return /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              disabled: tab.disabled,
              className: cn(
                "flex w-full items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-left text-[13px] sm:text-[14px]",
                "transition-colors duration-150",
                isActive ? "bg-[#F0F9F4] font-semibold text-[#0A5A2A]" : "text-[#374151] hover:bg-[#F8FAFC]",
                tab.disabled && "cursor-not-allowed opacity-50"
              ),
              onClick: () => {
                if (tab.disabled) return;
                onChange(tab.value);
                setOpen(false);
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: tab.label }),
                isActive && /* @__PURE__ */ jsxRuntime.jsx(
                  lucideReact.Check,
                  {
                    size: 16,
                    strokeWidth: 2.5,
                    className: "shrink-0 text-[#0A5A2A]"
                  }
                )
              ]
            },
            tab.value
          );
        }) })
      }
    )
  ] });
}
function LineTabsOverflow({
  overflowTabs,
  overflowLabel,
  activeValue,
  onChange
}) {
  const [open, setOpen] = React9__namespace.useState(false);
  if (overflowTabs.length === 0) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        className: cn(
          "inline-flex flex-none items-center gap-1 whitespace-nowrap cursor-pointer select-none",
          "rounded-t-lg px-3 py-2 sm:px-5 sm:py-3 text-[13px] sm:text-[14px] font-medium",
          "text-gray-500 hover:text-[#0A5A2A] hover:bg-gray-50 transition-all duration-200",
          FOCUS_RING
        ),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: overflowLabel }),
          /* @__PURE__ */ jsxRuntime.jsx(
            lucideReact.ChevronDown,
            {
              size: 16,
              strokeWidth: 2.25,
              className: cn(
                "text-[#0A5A2A] transition-transform duration-200",
                open && "rotate-180"
              )
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      PopoverContent,
      {
        align: "end",
        sideOffset: 8,
        collisionPadding: 8,
        className: "w-[220px] max-w-[calc(100vw-1rem)] rounded-[10px] border border-[#E5E7EB] p-1 shadow-[0_12px_32px_rgba(15,23,42,0.12)]",
        children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col", children: overflowTabs.map((tab) => {
          const isActive = tab.value === activeValue;
          return /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              disabled: tab.disabled,
              className: cn(
                "flex w-full items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-left text-[13px] sm:text-[14px]",
                "transition-colors duration-150",
                isActive ? "bg-[#F0F9F4] font-semibold text-[#0A5A2A]" : "text-[#374151] hover:bg-[#F8FAFC]",
                tab.disabled && "cursor-not-allowed opacity-50"
              ),
              onClick: () => {
                if (tab.disabled) return;
                onChange(tab.value);
                setOpen(false);
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: tab.label }),
                isActive && /* @__PURE__ */ jsxRuntime.jsx(
                  lucideReact.Check,
                  {
                    size: 16,
                    strokeWidth: 2.5,
                    className: "shrink-0 text-[#0A5A2A]"
                  }
                )
              ]
            },
            tab.value
          );
        }) })
      }
    )
  ] });
}
function Tabs2(props) {
  const variant = props.variant ?? "primary";
  if (variant === "secondary") return /* @__PURE__ */ jsxRuntime.jsx(TertiaryTabs, { ...props });
  return /* @__PURE__ */ jsxRuntime.jsx(SecondaryTabs, { ...props });
}
function SecondaryTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  visibleTabLimit,
  overflowLabel = "More Options",
  showBottomBorder = true,
  className
}) {
  const outerRef = React9__namespace.useRef(null);
  const measureRef = React9__namespace.useRef(null);
  const wrapperRef = React9__namespace.useRef(null);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange
  );
  const [indicator, setIndicator] = React9__namespace.useState({ left: 0, width: 0, ready: false });
  const [containerWidth, setContainerWidth] = React9__namespace.useState(0);
  const [tabWidths, setTabWidths] = React9__namespace.useState([]);
  const [moreButtonWidth, setMoreButtonWidth] = React9__namespace.useState(120);
  React9__namespace.useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    setContainerWidth(el.getBoundingClientRect().width);
  }, []);
  React9__namespace.useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  React9__namespace.useLayoutEffect(() => {
    if (containerWidth === 0) return;
    const el = measureRef.current;
    if (!el) return;
    const btns = el.querySelectorAll("[data-measure-tab]");
    setTabWidths(
      Array.from(btns).map((btn) => btn.getBoundingClientRect().width)
    );
    const moreBtn = el.querySelector("[data-measure-more]");
    if (moreBtn) setMoreButtonWidth(moreBtn.getBoundingClientRect().width);
  }, [containerWidth, tabs, overflowLabel]);
  const dynamicLimit = React9__namespace.useMemo(() => {
    if (visibleTabLimit !== void 0) return visibleTabLimit;
    if (containerWidth === 0 || tabWidths.length === 0) return void 0;
    const GAP = 8;
    const totalAllTabs = tabWidths.reduce(
      (sum, w, i) => sum + w + (i > 0 ? GAP : 0),
      0
    );
    if (totalAllTabs <= containerWidth) return void 0;
    let total = 0;
    let count = 0;
    for (let i = 0; i < tabs.length; i++) {
      const tabW = (tabWidths[i] ?? 80) + (i > 0 ? GAP : 0);
      const projected = total + tabW + moreButtonWidth + GAP;
      if (projected <= containerWidth) {
        total += tabW;
        count++;
      } else {
        break;
      }
    }
    return count > 0 ? count : 1;
  }, [visibleTabLimit, containerWidth, tabWidths, tabs, moreButtonWidth]);
  const { visibleTabs, overflowTabs } = React9__namespace.useMemo(
    () => getVisibleTabs(tabs, activeValue, dynamicLimit),
    [activeValue, tabs, dynamicLimit]
  );
  const measureIndicator = React9__namespace.useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !activeValue) return;
    const btn = wrapper.querySelector(
      `[data-tab-value="${escapeTabValue(activeValue)}"]`
    );
    if (!btn) {
      setIndicator((i) => ({ ...i, ready: false }));
      return;
    }
    const containerRect = wrapper.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({
      left: btnRect.left - containerRect.left + wrapper.scrollLeft,
      width: btnRect.width,
      ready: true
    });
  }, [activeValue]);
  React9__namespace.useLayoutEffect(() => {
    measureIndicator();
  }, [
    measureIndicator,
    visibleTabs.length,
    visibleTabs.map((t) => t.value + t.label).join("|")
  ]);
  React9__namespace.useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Tabs,
    {
      value: activeValue,
      onValueChange: handleChange,
      className: cn("w-full", className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            ref: measureRef,
            "aria-hidden": true,
            style: { position: "fixed", top: -9999, left: -9999, visibility: "hidden", pointerEvents: "none" },
            className: "flex items-center",
            children: [
              tabs.map((tab) => /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  "data-measure-tab": true,
                  className: "relative flex items-center gap-2 whitespace-nowrap rounded-t-lg px-3 py-2 sm:px-5 sm:py-3 text-[13px] sm:text-[14px] font-medium",
                  children: tab.label
                },
                tab.value
              )),
              /* @__PURE__ */ jsxRuntime.jsxs(
                "span",
                {
                  "data-measure-more": true,
                  className: "inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-t-lg px-3 py-2 sm:px-5 sm:py-3 text-[13px] sm:text-[14px] font-medium",
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx("span", { children: overflowLabel }),
                    /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { size: 16, strokeWidth: 2.25 })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("div", { ref: outerRef, className: "relative w-full", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("inline-flex max-w-full items-end", showBottomBorder && "border-b border-[#E5E7EB]"), children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              ref: wrapperRef,
              className: "relative min-w-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  TabsList,
                  {
                    variant: "line",
                    className: cn(
                      "flex w-max min-w-0 flex-row items-center justify-start",
                      "h-auto! rounded-none bg-transparent p-0 gap-2"
                    ),
                    children: visibleTabs.map((tab) => /* @__PURE__ */ jsxRuntime.jsx(
                      CustomTabsTrigger,
                      {
                        value: tab.value,
                        disabled: tab.disabled,
                        variant: "secondary",
                        children: tab.label
                      },
                      tab.value
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: cn(
                      "pointer-events-none absolute bottom-0 left-0 h-0.75 rounded-full bg-[#0b652d]",
                      indicator.ready ? "transition-all duration-300 ease-out opacity-100" : "opacity-0"
                    ),
                    style: {
                      transform: `translateX(${indicator.left}px)`,
                      width: indicator.width
                    }
                  }
                )
              ]
            }
          ),
          overflowTabs.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
            LineTabsOverflow,
            {
              overflowTabs,
              overflowLabel,
              activeValue,
              onChange: handleChange
            }
          )
        ] }) })
      ]
    }
  );
}
function TertiaryTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  visibleTabLimit,
  overflowLabel = "More Options",
  className
}) {
  const listRef = React9__namespace.useRef(null);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange
  );
  const [chip, setChip] = React9__namespace.useState({ left: 0, width: 0, ready: false });
  const { visibleTabs, overflowTabs } = React9__namespace.useMemo(
    () => getVisibleTabs(tabs, activeValue, visibleTabLimit),
    [activeValue, tabs, visibleTabLimit]
  );
  const measureChip = React9__namespace.useCallback(() => {
    const list = listRef.current;
    if (!list || !activeValue) return;
    const btn = list.querySelector(
      `[data-tab-value="${escapeTabValue(activeValue)}"]`
    );
    if (!btn) {
      setChip((c) => ({ ...c, ready: false }));
      return;
    }
    const containerRect = list.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setChip({
      left: btnRect.left - containerRect.left + list.scrollLeft,
      width: btnRect.width,
      ready: true
    });
  }, [activeValue]);
  React9__namespace.useLayoutEffect(() => {
    measureChip();
  }, [
    measureChip,
    visibleTabs.length,
    visibleTabs.map((t) => t.value + t.label).join("|")
  ]);
  React9__namespace.useEffect(() => {
    window.addEventListener("resize", measureChip);
    return () => window.removeEventListener("resize", measureChip);
  }, [measureChip]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    Tabs,
    {
      value: activeValue,
      onValueChange: handleChange,
      className: cn("inline-flex max-w-full", className),
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex max-w-full items-center", children: /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ref: listRef,
          className: cn(
            "relative inline-flex max-w-full items-center",
            "rounded-full bg-[#F3F5F9] p-0.5",
            "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                "aria-hidden": "true",
                className: cn(
                  "pointer-events-none absolute top-0.5 bottom-0.5 left-0 rounded-full",
                  "bg-[#C8E7B8] border border-[#0A5A2A]",
                  chip.ready ? "transition-all duration-300 ease-out opacity-100" : "opacity-0"
                ),
                style: {
                  transform: `translateX(${chip.left}px)`,
                  width: chip.width
                }
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              TabsList,
              {
                variant: "line",
                className: cn(
                  "inline-flex items-center",
                  "rounded-full! bg-transparent! p-0!"
                ),
                children: visibleTabs.map((tab) => /* @__PURE__ */ jsxRuntime.jsx(
                  CustomTabsTrigger,
                  {
                    value: tab.value,
                    disabled: tab.disabled,
                    variant: "tertiary",
                    children: tab.label
                  },
                  tab.value
                ))
              }
            ),
            overflowTabs.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: "mx-1 h-4 w-px shrink-0 bg-[#b8c4d9]",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              OverflowTabsSelect,
              {
                overflowTabs,
                overflowLabel,
                activeValue,
                onChange: handleChange
              }
            )
          ]
        }
      ) })
    }
  );
}
Tabs2.displayName = "Tabs";
var COUNT_WARN_RATIO = 0.83;
function Spinner2({ size }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "shrink-0 animate-spin rounded-full",
      style: {
        width: size,
        height: size,
        border: `2px solid ${INPUT_COLORS.border}`,
        borderTopColor: INPUT_COLORS.borderFocus
      }
    }
  );
}
function Affix({
  children,
  side,
  padX,
  fontSize
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: "flex shrink-0 items-center self-stretch font-semibold",
      style: {
        padding: `0 ${padX}px`,
        background: INPUT_COLORS.subtle,
        color: side === "left" ? INPUT_COLORS.value : INPUT_COLORS.message,
        fontSize: side === "left" ? fontSize : fontSize - 1,
        [side === "left" ? "borderRight" : "borderLeft"]: `1px solid ${INPUT_COLORS.border}`
      },
      children
    }
  );
}
function Input2({
  size = "md",
  variant = "default",
  inputType = "text",
  allowPattern,
  label,
  helperText,
  error,
  status,
  statusMessage,
  prefix,
  suffix,
  loading = false,
  showCount,
  align = "left",
  boxStyle,
  reserveMessageSpace = false,
  leftIcon,
  rightIcon,
  required,
  width,
  className,
  disabled,
  readOnly,
  validationRegex,
  validationMessage,
  onTouch,
  spellCheck = true,
  id,
  onChange,
  onFocus,
  onBlur,
  suggestions,
  onSuggestionSelect,
  clearable,
  onClear,
  multiline = false,
  rows = 3,
  resize = "vertical",
  ...rest
}) {
  const reactId = React9__namespace.useId();
  const inputId = id ?? reactId;
  const spec = INPUT_SIZES[size];
  const [focused, setFocused] = React9__namespace.useState(false);
  const [hovered, setHovered] = React9__namespace.useState(false);
  const [showPassword, setShowPassword] = React9__namespace.useState(false);
  const [internalError, setInternalError] = React9__namespace.useState(void 0);
  const touchedRef = React9__namespace.useRef(false);
  const isControlled = rest.value !== void 0;
  const [uncontrolledQuery, setUncontrolledQuery] = React9__namespace.useState(
    String(rest.defaultValue ?? "")
  );
  const currentValue = isControlled ? String(rest.value ?? "") : uncontrolledQuery;
  const fuseResults = useFuzzySearch(suggestions ?? [], currentValue);
  const showSuggestions = !multiline && !!suggestions?.length && focused && fuseResults.length > 0 && currentValue.trim().length > 0;
  const wrapperRef = React9__namespace.useRef(null);
  const inputRef = React9__namespace.useRef(null);
  const textareaRef = React9__namespace.useRef(null);
  const runValidation = (el) => {
    if (!el.validity.valid) {
      return validationMessage ?? el.validationMessage ?? "Invalid value";
    }
    if (validationRegex && el.value) {
      const re = typeof validationRegex === "string" ? new RegExp(validationRegex) : validationRegex;
      if (!re.test(el.value)) {
        return validationMessage ?? "Invalid format";
      }
    }
    return void 0;
  };
  const effectiveError = error ?? internalError;
  const interactionBlocked = Boolean(disabled) || loading;
  const state = resolveInputState({
    disabled,
    readOnly,
    loading,
    error: effectiveError,
    status,
    focused,
    hovered
  });
  const box = getInputBoxStyle(state);
  const isUnderline = variant === "underline";
  const isPassword = !multiline && inputType === "password";
  const effectiveType = isPassword && showPassword ? "text" : inputType;
  const showClear = Boolean(clearable) && !interactionBlocked && !readOnly && currentValue.length > 0;
  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledQuery("");
      const ref = multiline ? textareaRef.current : inputRef.current;
      if (ref) ref.value = "";
    }
    onChange?.({ target: { value: "" } });
    onClear?.();
  };
  const handleChange = (e) => {
    if (allowPattern && allowPattern !== "none") {
      const raw = e.target.value;
      const regex = new RegExp(PATTERN_REGEX[allowPattern], "g");
      let stripped = raw.replace(regex, "");
      if (allowPattern === "phone" && stripped.length > 10) stripped = stripped.slice(0, 10);
      if (stripped !== raw) e.target.value = stripped;
    }
    if (internalError) setInternalError(runValidation(e.target));
    if (!isControlled) setUncontrolledQuery(e.target.value);
    onChange?.(e);
  };
  const handleSuggestionSelect = (item) => {
    if (!isControlled) setUncontrolledQuery(item.label);
    onSuggestionSelect?.(item.value);
  };
  const handleFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };
  const handleBlur = (e) => {
    setTimeout(() => {
      if (!wrapperRef.current?.contains(document.activeElement)) setFocused(false);
    }, 100);
    setInternalError(runValidation(e.target));
    if (!touchedRef.current) {
      touchedRef.current = true;
      onTouch?.();
    }
    onBlur?.(e);
  };
  const maxLength = rest.maxLength;
  const counterEnabled = showCount ?? maxLength !== void 0;
  const showCounter = counterEnabled && maxLength !== void 0;
  const count = currentValue.length;
  const counterColor = count > maxLength * COUNT_WARN_RATIO ? INPUT_COLORS.warningInk : INPUT_COLORS.message;
  const counterNode = showCounter ? /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      className: "shrink-0 font-medium tabular-nums",
      style: { fontSize: spec.message, color: counterColor },
      children: [
        count,
        "/",
        maxLength
      ]
    }
  ) : null;
  const passwordToggle = isPassword && rightIcon === void 0 && !interactionBlocked && !readOnly && /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      tabIndex: -1,
      "aria-label": showPassword ? "Hide password" : "Show password",
      onClick: () => setShowPassword((s) => !s),
      className: "flex shrink-0 items-center justify-center rounded-[4px] transition-colors hover:bg-[#F5FFF0]",
      style: { width: spec.icon + 8, height: spec.icon + 8, color: INPUT_COLORS.icon },
      children: showPassword ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.EyeOff, { strokeWidth: 2, size: spec.icon - 1 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Eye, { strokeWidth: 2, size: spec.icon - 1 })
    }
  );
  const statusAdornment = (() => {
    if (state === "loading" || state === "validating") return /* @__PURE__ */ jsxRuntime.jsx(Spinner2, { size: spec.icon - 2 });
    if (state === "readonly")
      return /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Lock, { "aria-hidden": "true", strokeWidth: 2, size: spec.icon - 2, color: INPUT_COLORS.placeholder });
    if (effectiveError)
      return /* @__PURE__ */ jsxRuntime.jsx(
        lucideReact.CircleAlert,
        {
          "aria-hidden": "true",
          strokeWidth: 2.2,
          size: spec.icon - 1,
          color: INPUT_COLORS.errorInk
        }
      );
    if (status === "warning")
      return /* @__PURE__ */ jsxRuntime.jsx(
        lucideReact.CircleAlert,
        {
          "aria-hidden": "true",
          strokeWidth: 2.2,
          size: spec.icon - 1,
          color: INPUT_COLORS.warningInk
        }
      );
    if (status === "success")
      return /* @__PURE__ */ jsxRuntime.jsx(
        lucideReact.Check,
        {
          "aria-hidden": "true",
          strokeWidth: 2.6,
          size: spec.icon - 1,
          color: INPUT_COLORS.successInk
        }
      );
    return null;
  })();
  const clearButton = showClear && /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      tabIndex: -1,
      "aria-label": "Clear",
      onClick: handleClear,
      className: "flex shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#DCF3CE]",
      style: {
        width: spec.icon + 4,
        height: spec.icon + 4,
        background: INPUT_COLORS.subtle,
        color: INPUT_COLORS.message
      },
      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { strokeWidth: 3, size: spec.icon - 6 })
    }
  );
  const glyph = (node) => /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: "flex shrink-0 items-center justify-center [&>svg]:size-full",
      style: { width: spec.icon, height: spec.icon, color: INPUT_COLORS.icon },
      children: node
    }
  );
  const hasTrailing = Boolean(
    counterNode || clearButton || statusAdornment || passwordToggle || rightIcon
  );
  const message = effectiveError ?? (status && statusMessage) ?? helperText;
  const describedById = effectiveError ? `${inputId}-error` : message ? `${inputId}-helper` : void 0;
  const resolvedBoxStyle = isUnderline ? {
    background: "transparent",
    borderBottom: box.border,
    borderRadius: 0,
    color: box.color,
    cursor: box.cursor,
    transition: INPUT_TRANSITION,
    height: multiline ? void 0 : spec.height
  } : {
    background: box.background,
    border: box.border,
    borderRadius: spec.radius,
    boxShadow: box.boxShadow,
    color: box.color,
    cursor: box.cursor,
    transition: INPUT_TRANSITION,
    height: multiline ? void 0 : spec.height
  };
  const fieldStyle = {
    fontSize: spec.font,
    color: box.color,
    lineHeight: multiline ? 1.5 : 1,
    cursor: box.cursor
  };
  const innerPadding = isUnderline ? { paddingLeft: 0, paddingRight: 0 } : {
    paddingLeft: prefix ? spec.padX - 2 : spec.padX,
    paddingRight: suffix ? spec.padX - 2 : spec.padX
  };
  const sharedFieldProps = {
    "data-slot": "input",
    id: inputId,
    disabled,
    readOnly: readOnly || loading,
    spellCheck,
    "aria-invalid": Boolean(effectiveError) || void 0,
    "aria-describedby": describedById,
    "aria-busy": loading || status === "validating" || void 0,
    onChange: handleChange,
    onBlur: handleBlur
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex min-w-0 flex-col gap-1.5", width, className), children: [
    (label || counterNode && multiline) && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2", children: [
      label && /* @__PURE__ */ jsxRuntime.jsx(
        InputLabel,
        {
          htmlFor: inputId,
          size,
          required,
          tone: getLabelColor(state),
          children: label
        }
      ),
      counterNode && multiline && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-auto", children: counterNode })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: wrapperRef, className: "relative", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          "data-slot": "input-box",
          "data-size": size,
          "data-state": state,
          "data-variant": variant,
          className: cn(
            "flex w-full min-w-0",
            multiline ? "items-start" : "items-center",
            !isUnderline && "overflow-hidden",
            interactionBlocked && "pointer-events-none"
          ),
          style: { ...resolvedBoxStyle, ...boxStyle },
          onPointerEnter: () => setHovered(true),
          onPointerLeave: () => setHovered(false),
          children: [
            prefix && !isUnderline && /* @__PURE__ */ jsxRuntime.jsx(Affix, { side: "left", padX: spec.padX - 2, fontSize: spec.font, children: prefix }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              "span",
              {
                className: cn(
                  "flex min-w-0 flex-1",
                  multiline ? "items-start" : "items-center",
                  multiline && "self-stretch"
                ),
                style: {
                  gap: AFFIX_GAP,
                  ...innerPadding,
                  paddingTop: multiline ? spec.padX - 2 : void 0,
                  paddingBottom: multiline ? spec.padX - 2 : void 0
                },
                children: [
                  leftIcon && glyph(leftIcon),
                  multiline ? /* @__PURE__ */ jsxRuntime.jsx(
                    "textarea",
                    {
                      ...rest,
                      ...sharedFieldProps,
                      ref: textareaRef,
                      rows,
                      onFocus: (e) => handleFocus(e),
                      className: cn(
                        inputFieldVariants({ multiline: true, align }),
                        RESIZE_CLASS[resize]
                      ),
                      style: { ...fieldStyle, minHeight: 76 }
                    }
                  ) : /* @__PURE__ */ jsxRuntime.jsx(
                    "input",
                    {
                      ...rest,
                      ...sharedFieldProps,
                      ref: inputRef,
                      type: effectiveType,
                      "aria-autocomplete": suggestions ? "list" : void 0,
                      onWheel: (e) => {
                        if (e.currentTarget.type === "number") e.currentTarget.blur();
                      },
                      onFocus: handleFocus,
                      className: inputFieldVariants({ multiline: false, align }),
                      style: fieldStyle
                    }
                  ),
                  hasTrailing && /* @__PURE__ */ jsxRuntime.jsxs(
                    "span",
                    {
                      className: cn("flex shrink-0 items-center", multiline && "self-start"),
                      style: { gap: 6 },
                      children: [
                        counterNode && !multiline && counterNode,
                        clearButton,
                        statusAdornment,
                        passwordToggle,
                        rightIcon && glyph(rightIcon)
                      ]
                    }
                  )
                ]
              }
            ),
            suffix && !isUnderline && /* @__PURE__ */ jsxRuntime.jsx(Affix, { side: "right", padX: spec.padX - 2, fontSize: spec.font, children: suffix })
          ]
        }
      ),
      showSuggestions && /* @__PURE__ */ jsxRuntime.jsx(
        "ul",
        {
          role: "listbox",
          className: "absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-y-auto p-1",
          style: {
            borderRadius: spec.radius,
            border: `1px solid ${INPUT_COLORS.border}`,
            background: INPUT_COLORS.surface,
            boxShadow: "2px 2px 4px rgba(0,0,0,.12)"
          },
          children: fuseResults.map((item) => /* @__PURE__ */ jsxRuntime.jsx("li", { role: "option", "aria-selected": false, children: /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => handleSuggestionSelect(item),
              className: "w-full rounded-[6px] px-2.5 py-2 text-left font-medium transition-colors hover:bg-[#FAFFF7]",
              style: { fontSize: spec.font, color: INPUT_COLORS.value },
              children: item.label
            }
          ) }, item.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      InputHelper,
      {
        id: describedById,
        size,
        state,
        helperText: message,
        error: effectiveError,
        reserveSpace: reserveMessageSpace
      }
    )
  ] });
}
Input2.displayName = "Input";
var radioCircleVariants = classVarianceAuthority.cva(
  [
    "relative inline-flex aspect-square shrink-0 items-center justify-center",
    "rounded-full border-2 bg-transparent outline-none",
    "transition-colors duration-[120ms] ease-linear",
    SELECTION_FOCUS_RING
  ].join(" "),
  {
    variants: {
      size: {
        xs: "size-[14px]",
        sm: "size-[16px]",
        md: "size-[20px]",
        lg: "size-[24px]"
      },
      state: {
        default: [
          "border-[#C6C6C6] hover:border-[#1F5E2C]",
          "data-[state=checked]:bg-[#003C1B] data-[state=checked]:border-[#003C1B]",
          "data-[state=checked]:hover:border-[#003C1B]"
        ].join(" "),
        error: "border-[#A8000F] data-[state=checked]:bg-[#A8000F] data-[state=checked]:border-[#A8000F]",
        disabled: [
          "bg-[#F3F5F9] border-[#E2E2E2] cursor-not-allowed",
          "data-[state=checked]:bg-[#C6D6CB] data-[state=checked]:border-[#C6D6CB]"
        ].join(" ")
      }
    },
    defaultVariants: {
      size: "md",
      state: "default"
    }
  }
);
var radioDotVariants = classVarianceAuthority.cva("rounded-full bg-white", {
  variants: {
    size: {
      xs: "size-[5px]",
      sm: "size-[6px]",
      md: "size-[7px]",
      lg: "size-[9px]"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var radioLabelVariants = classVarianceAuthority.cva(
  "select-none transition-colors duration-[120ms] ease-linear",
  {
    variants: {
      size: {
        xs: "text-[12px]",
        sm: "text-[12px]",
        md: "text-[13px]",
        lg: "text-[14px]"
      },
      state: {
        default: "text-[#202020]",
        checked: "text-[#202020]",
        disabled: "text-[#9C9C9C] cursor-not-allowed",
        error: "text-[#A8000F]"
      }
    },
    defaultVariants: {
      size: "md",
      state: "default"
    }
  }
);

// src/utils/labelValidation.ts
var MAX_LABEL_WORDS = 10;
function countWords(value) {
  if (typeof value !== "string") return 0;
  return value.trim().split(/\s+/).filter(Boolean).length;
}
function truncateLabelToWordLimit(label, max = MAX_LABEL_WORDS) {
  if (typeof label !== "string") return label;
  const words = label.trim().split(/\s+/).filter(Boolean);
  if (words.length <= max) return label;
  return `${words.slice(0, max).join(" ")}\u2026`;
}
function validateLabelWordLimit(label, component, max = MAX_LABEL_WORDS) {
  if (typeof label !== "string") return;
  const words = countWords(label);
  if (words > max) {
    console.warn(
      `[${component}] label exceeds ${max} words (got ${words}); display will be truncated with an ellipsis.`
    );
  }
}
var PILL_PADDING = {
  xs: "gap-2 px-2 py-1",
  sm: "gap-2.5 px-2.5 py-1.5",
  md: "gap-[11px] px-3 py-2",
  lg: "gap-3 px-4 py-2.5"
};
var GAP_ONLY = {
  xs: "gap-2",
  sm: "gap-2.5",
  md: "gap-[11px]",
  lg: "gap-3"
};
var CIRCLE_FIRST_LINE_OFFSET = {
  xs: "mt-[2px]",
  sm: "mt-[1px]",
  md: "mt-0",
  lg: "mt-0"
};
function Radio({
  id,
  label,
  size = "md",
  disabled,
  readOnly,
  error,
  value,
  className,
  borderColor,
  bgColor,
  textColor,
  ...rest
}) {
  const reactId = React9__namespace.useId();
  const itemId = id ?? reactId;
  const itemRef = React9__namespace.useRef(null);
  const [isChecked, setIsChecked] = React9__namespace.useState(false);
  React9__namespace.useEffect(() => {
    validateLabelWordLimit(label, "Radio");
  }, [label]);
  React9__namespace.useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    setIsChecked(el.dataset.state === "checked");
    const observer = new MutationObserver(() => {
      setIsChecked(el.dataset.state === "checked");
    });
    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] });
    return () => observer.disconnect();
  }, []);
  const state = disabled ? "disabled" : error ? "error" : "default";
  const labelState = disabled ? "disabled" : error ? "error" : isChecked ? "checked" : "default";
  const effectiveBorderColor = borderColor;
  const effectiveBgColor = bgColor;
  const effectiveTextColor = textColor;
  const hasCustomColors2 = !!(effectiveBorderColor || effectiveBgColor || effectiveTextColor);
  const labelStyle = hasCustomColors2 ? {
    ...isChecked && effectiveBorderColor ? { borderColor: effectiveBorderColor } : {},
    ...isChecked && effectiveBgColor ? { backgroundColor: effectiveBgColor } : {}
  } : void 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "label",
    {
      htmlFor: itemId,
      style: labelStyle,
      className: cn(
        "group inline-flex cursor-pointer items-start transition-colors duration-[120ms] ease-linear",
        hasCustomColors2 ? cn(
          "rounded-[10px] border",
          PILL_PADDING[size],
          error ? "border-[#A8000F]" : "border-[#E2E2E2]"
        ) : GAP_ONLY[size],
        disabled && "cursor-not-allowed",
        readOnly && "pointer-events-none cursor-default",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          radixUi.RadioGroup.Item,
          {
            ...rest,
            ref: itemRef,
            id: itemId,
            value,
            disabled,
            "data-slot": "radio-group-item",
            style: isChecked && effectiveBorderColor ? {
              backgroundColor: effectiveBorderColor,
              borderColor: effectiveBorderColor
            } : void 0,
            className: cn(
              radioCircleVariants({ size, state }),
              CIRCLE_FIRST_LINE_OFFSET[size]
            ),
            children: /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.RadioGroup.Indicator,
              {
                forceMount: true,
                "data-slot": "radio-group-indicator",
                className: cn(
                  "flex items-center justify-center transition-transform duration-[120ms] ease-linear",
                  "data-[state=unchecked]:scale-0 data-[state=checked]:scale-100"
                ),
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    className: cn(radioDotVariants({ size }), disabled && "bg-white/75")
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          Label,
          {
            htmlFor: itemId,
            style: effectiveTextColor && isChecked ? { color: effectiveTextColor } : void 0,
            className: cn(
              radioLabelVariants({ size, state: labelState }),
              "whitespace-normal break-words leading-[1.5]"
            ),
            children: truncateLabelToWordLimit(label)
          }
        )
      ]
    }
  );
}
Radio.displayName = "Radio";
function RadioGroup({
  options,
  getLabel,
  getValue,
  getDisabled,
  value,
  defaultValue,
  onChange,
  size = "md",
  layout = "horizontal",
  columns = 2,
  disabled,
  label,
  required,
  helperText,
  error,
  className,
  borderColor,
  bgColor,
  textColor,
  readOnly
}) {
  const reactId = React9__namespace.useId();
  const groupId = `radio-group-${reactId}`;
  const describedById = error ? `${groupId}-error` : helperText ? `${groupId}-helper` : void 0;
  const gridColsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
  };
  const layoutClass = layout === "horizontal" ? "flex flex-row flex-wrap gap-x-3 gap-y-2" : layout === "grid" ? cn("grid w-full gap-x-3 gap-y-2", gridColsMap[columns]) : "flex flex-col gap-2";
  const toLabel = getLabel ?? ((item) => item.label);
  const toValue = getValue ?? ((item) => item.value);
  const toDisabled = getDisabled ?? ((item) => item.disabled);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex w-full flex-col gap-1.5", className), children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(InputLabel, { htmlFor: groupId, size, required, children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      radixUi.RadioGroup.Root,
      {
        id: groupId,
        value,
        defaultValue,
        onValueChange: readOnly ? void 0 : onChange,
        disabled,
        "aria-invalid": Boolean(error) || void 0,
        "aria-describedby": describedById,
        className: cn(layoutClass, readOnly && "pointer-events-none"),
        children: options.map((opt) => {
          const optValue = toValue(opt);
          return /* @__PURE__ */ jsxRuntime.jsx(
            Radio,
            {
              value: optValue,
              label: toLabel(opt),
              size,
              disabled: disabled || Boolean(toDisabled(opt)),
              error: Boolean(error),
              borderColor,
              bgColor,
              textColor,
              readOnly
            },
            optValue
          );
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      InputHelper,
      {
        id: error ? `${groupId}-error` : helperText ? `${groupId}-helper` : void 0,
        size,
        helperText,
        error
      }
    )
  ] });
}
RadioGroup.displayName = "CustomRadioGroup";
var checkboxBoxVariants = classVarianceAuthority.cva(
  [
    "relative inline-flex shrink-0 items-center justify-center border-2 outline-none",
    "transition-colors duration-[120ms] ease-linear",
    SELECTION_FOCUS_RING
  ].join(" "),
  {
    variants: {
      size: {
        xs: "h-[14px] w-[14px] rounded-[4px]",
        sm: "h-[16px] w-[16px] rounded-[4px]",
        md: "h-[20px] w-[20px] rounded-[5px]",
        lg: "h-[24px] w-[24px] rounded-[6px]"
      },
      state: {
        unchecked: "bg-white border-[#C6C6C6] hover:bg-[#F5FFF0] hover:border-[#1F5E2C]",
        checked: "bg-[#003C1B] border-[#003C1B] text-white",
        indeterminate: "bg-[#003C1B] border-[#003C1B] text-white",
        // Error keeps the box readable in either value: red outline when empty,
        // red fill once it is ticked.
        error: "bg-white border-[#A8000F] text-white data-[state=checked]:bg-[#A8000F] data-[state=indeterminate]:bg-[#A8000F]",
        disabled: "bg-[#F3F5F9] border-[#E2E2E2] cursor-not-allowed",
        // Disabled-checked keeps the mark at 40% so the operator can still read
        // what was chosen for them.
        disabledChecked: "bg-[#C6D6CB] border-[#C6D6CB] text-white/75 cursor-not-allowed"
      }
    },
    defaultVariants: {
      size: "md",
      state: "unchecked"
    }
  }
);
var checkboxLabelVariants = classVarianceAuthority.cva(
  "select-none transition-colors duration-[120ms] ease-linear",
  {
    variants: {
      size: {
        xs: "text-[12px]",
        sm: "text-[12px]",
        md: "text-[13px]",
        lg: "text-[14px]"
      },
      state: {
        // The fill carries the selection; the label text does not change colour.
        default: "text-[#202020]",
        checked: "text-[#202020]",
        disabled: "text-[#9C9C9C] cursor-not-allowed",
        error: "text-[#A8000F]"
      }
    },
    defaultVariants: {
      size: "md",
      state: "default"
    }
  }
);
var ICON_SIZE = {
  xs: "size-[9px]",
  sm: "size-[10px]",
  md: "size-[12px]",
  lg: "size-[14px]"
};
var DASH_SIZE = {
  xs: "h-[2px] w-[7px]",
  sm: "h-[2px] w-[8px]",
  md: "h-[2.5px] w-[9px]",
  lg: "h-[3px] w-[11px]"
};
var PILL_PADDING2 = {
  xs: "gap-2 px-2 py-1",
  sm: "gap-2.5 px-2.5 py-1.5",
  md: "gap-[11px] px-3 py-2",
  lg: "gap-3 px-4 py-2.5"
};
var GAP_ONLY2 = {
  xs: "gap-2",
  sm: "gap-2.5",
  md: "gap-[11px]",
  lg: "gap-3"
};
var BOX_FIRST_LINE_OFFSET = {
  xs: "mt-[2px]",
  sm: "mt-[1px]",
  md: "mt-0",
  lg: "mt-0"
};
function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  size = "md",
  label,
  disabled,
  readOnly,
  indeterminate,
  error,
  className,
  borderColor,
  bgColor,
  textColor,
  ...rest
}) {
  const reactId = React9__namespace.useId();
  const itemId = rest.id ?? reactId;
  React9__namespace.useEffect(() => {
    validateLabelWordLimit(label, "CustomCheckbox");
  }, [label]);
  const isControlled = checked !== void 0;
  const [internalChecked, setInternalChecked] = React9__namespace.useState(
    defaultChecked ?? false
  );
  const visualChecked = isControlled ? Boolean(checked) : internalChecked;
  const radixChecked = indeterminate ? "indeterminate" : isControlled ? Boolean(checked) : internalChecked;
  const handleCheckedChange = (next) => {
    if (readOnly) return;
    const nextBool = next === true;
    if (!isControlled) setInternalChecked(nextBool);
    onCheckedChange?.(nextBool);
  };
  const isOn = visualChecked || Boolean(indeterminate);
  const boxState = disabled ? isOn ? "disabledChecked" : "disabled" : error ? "error" : indeterminate ? "indeterminate" : visualChecked ? "checked" : "unchecked";
  const labelState = disabled ? "disabled" : error ? "error" : isOn ? "checked" : "default";
  const effectiveBorderColor = borderColor;
  const effectiveBgColor = bgColor;
  const effectiveTextColor = textColor;
  const hasCustomColors2 = !!(effectiveBorderColor || effectiveBgColor || effectiveTextColor);
  const isActive = (visualChecked || !!indeterminate) && !error && !disabled && !readOnly;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "label",
    {
      htmlFor: itemId,
      style: hasCustomColors2 && isActive ? {
        ...effectiveBorderColor ? { borderColor: effectiveBorderColor } : {},
        ...effectiveBgColor ? { backgroundColor: effectiveBgColor } : {}
      } : void 0,
      className: cn(
        // The box aligns to the first line of the label, not the centre of it,
        // so multi-line labels stay tidy.
        "group inline-flex cursor-pointer items-start transition-colors duration-[120ms] ease-linear",
        hasCustomColors2 ? cn(
          "rounded-[10px] border",
          PILL_PADDING2[size],
          error ? "border-[#A8000F]" : disabled ? "border-[#E2E2E2]" : "border-[#E2E2E2]"
        ) : GAP_ONLY2[size],
        disabled && "cursor-not-allowed",
        readOnly && "pointer-events-none cursor-default",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          radixUi.Checkbox.Root,
          {
            ...rest,
            id: itemId,
            checked: radixChecked,
            onCheckedChange: handleCheckedChange,
            disabled,
            "data-slot": "checkbox",
            style: isActive && effectiveBorderColor ? { backgroundColor: effectiveBorderColor, borderColor: effectiveBorderColor } : void 0,
            className: cn(
              checkboxBoxVariants({ size, state: boxState }),
              BOX_FIRST_LINE_OFFSET[size]
            ),
            children: /* @__PURE__ */ jsxRuntime.jsx(
              radixUi.Checkbox.Indicator,
              {
                forceMount: true,
                "data-slot": "checkbox-indicator",
                className: "grid h-full w-full place-content-center text-current transition-none data-[state=unchecked]:opacity-0",
                children: indeterminate ? /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    className: cn(
                      DASH_SIZE[size],
                      "rounded-[2px] bg-current"
                    )
                  }
                ) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: cn(ICON_SIZE[size], "stroke-[3.2]") })
              }
            )
          }
        ),
        label && /* @__PURE__ */ jsxRuntime.jsx(
          Label,
          {
            htmlFor: itemId,
            style: effectiveTextColor && isActive ? { color: effectiveTextColor } : void 0,
            className: cn(
              checkboxLabelVariants({ size, state: labelState }),
              "whitespace-normal break-words leading-[1.5]"
            ),
            children: truncateLabelToWordLimit(label)
          }
        )
      ]
    }
  );
}
Checkbox.displayName = "CustomCheckbox";
function CheckboxGroup({
  options,
  getLabel,
  getValue,
  getDisabled,
  value,
  onChange,
  size = "md",
  layout = "vertical",
  columns = 2,
  disabled,
  label,
  required,
  helperText,
  error,
  selectAll,
  borderColor,
  bgColor,
  textColor,
  readOnly
}) {
  const reactId = React9__namespace.useId();
  const groupId = `checkbox-group-${reactId}`;
  const isControlled = value !== void 0;
  const [internalValue, setInternalValue] = React9__namespace.useState([]);
  const currentValue = isControlled ? value : internalValue;
  const setValue = (next) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };
  const toLabel = getLabel ?? ((item) => item.label);
  const toValue = getValue ?? ((item) => item.value);
  const toDisabled = getDisabled ?? ((item) => item.disabled);
  const toggle = (optValue, nextChecked) => {
    if (nextChecked) {
      if (currentValue.includes(optValue)) return;
      setValue([...currentValue, optValue]);
    } else {
      setValue(currentValue.filter((v) => v !== optValue));
    }
  };
  const enabledOptions = options.filter((o) => !toDisabled(o));
  const allChecked = enabledOptions.length > 0 && enabledOptions.every((o) => currentValue.includes(toValue(o)));
  const someChecked = enabledOptions.some(
    (o) => currentValue.includes(toValue(o))
  );
  const indeterminate = someChecked && !allChecked;
  const toggleAll = (next) => {
    const keptDisabled = options.filter((o) => toDisabled(o) && currentValue.includes(toValue(o))).map((o) => toValue(o));
    if (next) {
      setValue([...enabledOptions.map((o) => toValue(o)), ...keptDisabled]);
    } else {
      setValue(keptDisabled);
    }
  };
  const layoutClass = layout === "horizontal" ? "flex flex-row flex-wrap gap-x-3 gap-y-2" : layout === "grid" ? `grid grid-cols-[repeat(${columns},minmax(0,1fr))] gap-x-3 gap-y-2` : "flex flex-col gap-2";
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex w-full flex-col gap-1.5", children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(InputLabel, { htmlFor: groupId, size, required, children: label }),
    selectAll && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "pb-1", children: /* @__PURE__ */ jsxRuntime.jsx(
      Checkbox,
      {
        label: "Select all",
        size,
        disabled: disabled || enabledOptions.length === 0,
        readOnly,
        error: Boolean(error),
        checked: allChecked,
        indeterminate,
        onCheckedChange: toggleAll
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { id: groupId, role: "group", className: layoutClass, children: options.map((opt) => {
      const optValue = toValue(opt);
      return /* @__PURE__ */ jsxRuntime.jsx(
        Checkbox,
        {
          label: toLabel(opt),
          size,
          disabled: disabled || Boolean(toDisabled(opt)),
          error: Boolean(error),
          checked: currentValue.includes(optValue),
          onCheckedChange: (c) => toggle(optValue, c),
          borderColor,
          bgColor,
          textColor,
          readOnly
        },
        optValue
      );
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      InputHelper,
      {
        id: error ? `${groupId}-error` : helperText ? `${groupId}-helper` : void 0,
        size,
        helperText,
        error
      }
    )
  ] });
}
CheckboxGroup.displayName = "CheckboxGroup";
var DATEPICKER_SIZES = {
  xs: { height: 28, padLeft: 9, padRight: 8, font: 12, icon: 13, cell: 24, cellFont: 9, radius: 8 },
  sm: { height: 32, padLeft: 11, padRight: 9, font: 12, icon: 14, cell: 26, cellFont: 9, radius: 8 },
  md: { height: 40, padLeft: 13, padRight: 11, font: 13, icon: 16, cell: 30, cellFont: 10, radius: 8 },
  lg: { height: 48, padLeft: 15, padRight: 13, font: 14, icon: 17, cell: 34, cellFont: 11, radius: 8 }
};
var DATEPICKER_GAP = 9;
var PANEL = {
  radius: 12,
  padding: 12,
  border: `1px solid ${INPUT_COLORS.border}`,
  background: INPUT_COLORS.surface,
  shadow: "2px 2px 4px rgba(0,0,0,.12)",
  /** Hairline between the grid and the footer / between two months. */
  rule: "#EEEEEE",
  /** Wash used by every hover in the panel. */
  hover: "#FAFFF7",
  /** 2px gutter between day cells. */
  cellGap: 2,
  cellRadius: 6,
  /** Radius on the outer corners of a range, and on a lone selected day. */
  cellRadiusSelected: 8,
  /** Forest fill means chosen. */
  selectedBg: "#003C1B",
  selectedInk: "#FFFFFF",
  /** Mint band means between — square, so the run reads as one shape. */
  rangeBg: "#DCF3CE",
  rangeInk: "#003C1B",
  /** Lighter mint used for the drag preview. */
  rangePreviewBg: "#EEF8E4",
  /** A ring means today — never a fill, so it cannot compete with the selection. */
  todayRing: "inset 0 0 0 1.5px #8CC42A",
  todayInk: "#1F5E2C",
  /** Keyboard cursor. */
  focusRing: "0 0 0 2px rgba(140,196,42,.55)",
  dayInk: INPUT_COLORS.value,
  /** Weekend days stay selectable, just muted. */
  weekendInk: INPUT_COLORS.placeholder,
  /** Adjacent-month days. */
  outsideInk: "#C6C6C6",
  /** Before min / after max — greyed, still visible so the grid never shifts. */
  outOfBoundsBg: INPUT_COLORS.subtle,
  outOfBoundsInk: "#C6C6C6",
  weekHeadInk: "#787878",
  weekHeadHeight: 22,
  navInk: "#595959",
  footerInk: "#787878"
};
function getTriggerStyle2(state) {
  return getInputBoxStyle(state === "open" ? "focused" : state);
}
function getDayCellStyle(flags) {
  const {
    selected,
    rangeStart,
    rangeEnd,
    inRange,
    rangePreview,
    today,
    outside,
    disabled,
    weekend,
    focused
  } = flags;
  const r = `${PANEL.cellRadius}px`;
  const rSel = `${PANEL.cellRadiusSelected}px`;
  let background = "transparent";
  let color = PANEL.dayInk;
  let fontWeight = 500;
  let borderRadius = r;
  let boxShadow = "none";
  if (weekend) color = PANEL.weekendInk;
  if (outside) {
    color = PANEL.outsideInk;
    fontWeight = 400;
  }
  if (rangePreview) {
    background = PANEL.rangePreviewBg;
    color = PANEL.rangeInk;
    borderRadius = "0";
  }
  if (inRange) {
    background = PANEL.rangeBg;
    color = PANEL.rangeInk;
    borderRadius = "0";
  }
  if (rangeStart || rangeEnd) {
    background = PANEL.selectedBg;
    color = PANEL.selectedInk;
    fontWeight = 600;
    borderRadius = rangeStart && rangeEnd ? rSel : rangeStart ? `${rSel} 0 0 ${rSel}` : `0 ${rSel} ${rSel} 0`;
  } else if (selected) {
    background = PANEL.selectedBg;
    color = PANEL.selectedInk;
    fontWeight = 600;
    borderRadius = rSel;
  } else if (today) {
    color = PANEL.todayInk;
    fontWeight = 700;
    boxShadow = PANEL.todayRing;
  }
  if (focused) boxShadow = PANEL.focusRing;
  if (disabled) {
    return {
      background: PANEL.outOfBoundsBg,
      color: PANEL.outOfBoundsInk,
      fontWeight: 400,
      borderRadius: r,
      boxShadow: "none"
    };
  }
  return { background, color, fontWeight, borderRadius, boxShadow };
}
var triggerVariants2 = classVarianceAuthority.cva(
  [
    "flex min-w-0 items-center",
    "cursor-pointer select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      state: {
        default: "",
        open: "",
        disabled: "pointer-events-none",
        readonly: "cursor-default pointer-events-none"
      },
      size: { xs: "", sm: "", md: "", lg: "" }
    },
    defaultVariants: { state: "default", size: "md" }
  }
);
var dayCellVariants = classVarianceAuthority.cva(
  "flex items-center justify-center cursor-pointer select-none transition-colors",
  {
    variants: {
      variant: {
        default: "",
        today: "",
        selected: "",
        inRange: "rounded-none",
        rangeStart: "",
        rangeEnd: "",
        outsideMonth: "cursor-default"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
var MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
var MONTH_OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
].map((label, i) => ({ label, value: String(i) }));
function buildYearOptions(center, minYear, maxYear) {
  const from = minYear ?? center - 10;
  const to = maxYear ?? center + 10;
  const opts = [];
  for (let y = from; y <= to; y++) {
    opts.push({ label: String(y), value: String(y) });
  }
  return opts;
}
var WEEK_HEADS = ["S", "M", "T", "W", "T", "F", "S"];
function JumpCell({
  label,
  selected,
  ring,
  disabled,
  height,
  onClick
}) {
  const [hovered, setHovered] = React9__namespace.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      onPointerEnter: () => setHovered(true),
      onPointerLeave: () => setHovered(false),
      className: "ue-tabular border-0 transition-[background] duration-[120ms] disabled:cursor-not-allowed disabled:opacity-40",
      style: {
        height,
        borderRadius: PANEL.cellRadius,
        fontVariantNumeric: "tabular-nums",
        fontSize: 11,
        fontWeight: selected ? 600 : 500,
        cursor: disabled ? "not-allowed" : "pointer",
        background: selected ? PANEL.selectedBg : hovered && !disabled ? PANEL.hover : "transparent",
        color: selected ? PANEL.selectedInk : PANEL.dayInk,
        boxShadow: ring && !selected ? PANEL.todayRing : "none"
      },
      children: label
    }
  );
}
function makeDayButton({ size }) {
  const spec = DATEPICKER_SIZES[size];
  return function StyledDayButton({
    day: _day,
    modifiers,
    className,
    ...props
  }) {
    const ref = React9__namespace.useRef(null);
    const [hovered, setHovered] = React9__namespace.useState(false);
    React9__namespace.useEffect(() => {
      if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);
    const isEdge = !!(modifiers.range_start || modifiers.range_end);
    const style = getDayCellStyle({
      selected: !!modifiers.selected && !isEdge && !modifiers.range_middle,
      rangeStart: !!modifiers.range_start,
      rangeEnd: !!modifiers.range_end,
      inRange: !!modifiers.range_middle && !isEdge,
      today: !!modifiers.today,
      outside: !!modifiers.outside,
      disabled: !!modifiers.disabled
    });
    const plain = style.background === "transparent";
    return (
      // `props` is spread first so react-day-picker can never clobber the
      // cell's own metrics — a `style` coming through the spread would replace
      // the whole inline style object, not merge into it.
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          ...props,
          ref,
          type: "button",
          disabled: modifiers.disabled,
          onPointerEnter: () => setHovered(true),
          onPointerLeave: () => setHovered(false),
          className: cn(
            "ue-tabular relative z-10 flex items-center justify-center border-0 transition-[background-color] duration-[120ms] select-none",
            "focus-visible:outline-none",
            modifiers.disabled && "cursor-not-allowed",
            className
          ),
          style: {
            width: spec.cell,
            height: spec.cell,
            fontVariantNumeric: "tabular-nums",
            fontSize: spec.cellFont,
            lineHeight: 1,
            cursor: modifiers.disabled ? "not-allowed" : "pointer",
            ...style,
            background: plain && hovered && !modifiers.disabled ? PANEL.hover : style.background
          }
        }
      )
    );
  };
}
function DatePickerCalendar({
  mode = "single",
  selected,
  onSelect,
  disabled,
  defaultMonth,
  minDate,
  maxDate,
  className,
  size = "md",
  focusDate,
  footer,
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave
}) {
  const today = React9__namespace.useMemo(() => /* @__PURE__ */ new Date(), []);
  const spec = DATEPICKER_SIZES[size];
  const clampedToday = maxDate && today > maxDate ? maxDate : minDate && today < minDate ? minDate : today;
  const initialMonth = defaultMonth ?? (selected instanceof Date ? selected : selected?.from) ?? clampedToday;
  const [viewMonth, setViewMonth] = React9__namespace.useState(initialMonth);
  const focusKey = focusDate ? focusDate.getFullYear() * 100 + focusDate.getMonth() : null;
  React9__namespace.useEffect(() => {
    if (focusKey === null) return;
    setViewMonth(new Date(Math.floor(focusKey / 100), focusKey % 100, 1));
  }, [focusKey]);
  const yearOptions = React9__namespace.useMemo(
    () => buildYearOptions(
      today.getFullYear(),
      minDate?.getFullYear(),
      maxDate?.getFullYear()
    ),
    [today, minDate, maxDate]
  );
  const monthOptions = React9__namespace.useMemo(() => {
    const year = viewMonth.getFullYear();
    return MONTH_OPTIONS.map((opt) => {
      const month = Number(opt.value);
      const isDisabled = !!minDate && year === minDate.getFullYear() && month < minDate.getMonth() || !!maxDate && year === maxDate.getFullYear() && month > maxDate.getMonth();
      return isDisabled ? { ...opt, disabled: true } : opt;
    });
  }, [viewMonth, minDate, maxDate]);
  const handleMonthSelect = (val) => setViewMonth((prev) => new Date(prev.getFullYear(), Number(val), 1));
  const handleYearSelect = (val) => setViewMonth((prev) => new Date(Number(val), prev.getMonth(), 1));
  const DayButtonComponent = React9__namespace.useMemo(() => makeDayButton({ size }), [size]);
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(7, ${spec.cell}px)`,
    gap: PANEL.cellGap
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn("flex flex-col bg-white", className),
      style: { padding: PANEL.padding, gap: 10 },
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Select,
            {
              options: monthOptions,
              value: String(viewMonth.getMonth()),
              onChange: handleMonthSelect,
              size: "xs",
              className: "w-[88px]"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            Select,
            {
              options: yearOptions,
              value: String(viewMonth.getFullYear()),
              onChange: handleYearSelect,
              size: "xs",
              className: "w-[70px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: gridStyle, children: WEEK_HEADS.map((d, i) => /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "flex select-none items-center justify-center",
              style: {
                height: PANEL.weekHeadHeight,
                fontSize: 10,
                fontWeight: 600,
                lineHeight: 1,
                color: PANEL.weekHeadInk
              },
              children: d
            },
            `${d}-${i}`
          )) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            reactDayPicker.DayPicker,
            {
              mode,
              selected: selected ?? void 0,
              onSelect: onSelect ?? (() => {
              }),
              month: viewMonth,
              onMonthChange: setViewMonth,
              hideNavigation: true,
              hideWeekdays: true,
              showOutsideDays: true,
              disabled,
              onDayClick,
              onDayMouseEnter,
              onDayMouseLeave,
              startMonth: minDate ? new Date(minDate.getFullYear(), minDate.getMonth()) : void 0,
              endMonth: maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth()) : void 0,
              classNames: {
                months: "flex flex-col",
                month: "flex flex-col",
                month_caption: "hidden",
                weeks: "flex flex-col",
                week: "",
                day: "flex items-center justify-center p-0 relative",
                day_button: "",
                range_start: "",
                range_middle: "",
                range_end: "",
                selected: "",
                today: "",
                outside: "",
                disabled: "",
                hidden: "invisible"
              },
              components: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                MonthGrid: ({ children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, children }),
                // The rows carry the same 2px gutter as the columns.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Weeks: ({ children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    ...props,
                    style: { display: "flex", flexDirection: "column", gap: PANEL.cellGap },
                    children
                  }
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Week: ({ week: _week, children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, style: gridStyle, children }),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Day: ({ day: _day, modifiers: _modifiers, children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, children }),
                DayButton: DayButtonComponent
              }
            }
          )
        ] }),
        footer
      ]
    }
  );
}
function MonthPickerCalendar({
  selected,
  minDate,
  maxDate,
  onSelect,
  className
}) {
  const today = React9__namespace.useMemo(() => /* @__PURE__ */ new Date(), []);
  const [viewYear, setViewYear] = React9__namespace.useState(
    selected?.getFullYear() ?? today.getFullYear()
  );
  const yearOptions = React9__namespace.useMemo(
    () => buildYearOptions(
      today.getFullYear(),
      minDate?.getFullYear(),
      maxDate?.getFullYear()
    ),
    [today, minDate, maxDate]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn("w-[246px] max-w-full bg-white", className),
      style: { padding: PANEL.padding },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-2.5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(
          Select,
          {
            options: yearOptions,
            value: String(viewYear),
            onChange: (val) => setViewYear(Number(val)),
            size: "xs",
            className: "w-[104px]"
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-3 gap-[5px]", children: MONTH_LABELS.map((label, i) => {
          const isSelected = !!selected && selected.getFullYear() === viewYear && selected.getMonth() === i;
          const isToday = today.getFullYear() === viewYear && today.getMonth() === i;
          const isDisabled = !!minDate && new Date(viewYear, i) < new Date(minDate.getFullYear(), minDate.getMonth()) || !!maxDate && new Date(viewYear, i) > new Date(maxDate.getFullYear(), maxDate.getMonth());
          return /* @__PURE__ */ jsxRuntime.jsx(
            JumpCell,
            {
              label,
              height: 32,
              selected: isSelected,
              ring: isToday,
              disabled: isDisabled,
              onClick: () => onSelect(new Date(viewYear, i, 1))
            },
            label
          );
        }) })
      ]
    }
  );
}

// src/components/custom/DatePicker/dateHelpers.ts
var MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
function formatDate(date) {
  if (!date) return null;
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}
function formatDateTime(date) {
  if (!date) return null;
  const datePart = formatDate(date);
  const hours = date.getHours();
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  return `${datePart}, ${hour12}:${minutes} ${period}`;
}
function formatRange(from, to) {
  const f = formatDate(from);
  const t = formatDate(to);
  if (!f && !t) return null;
  return `${f ?? "\u2014"} \u2013 ${t ?? "\u2014"}`;
}
function formatMonthYear(date) {
  if (!date) return null;
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
var ITEM_HEIGHT = 36;
var VISIBLE_ITEMS = 5;
var COLUMN_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;
function TimeColumn({
  items,
  selected,
  onSelect
}) {
  const containerRef = React9__namespace.useRef(null);
  const settleTimeout = React9__namespace.useRef(
    void 0
  );
  React9__namespace.useEffect(() => {
    const index = items.findIndex((item) => item.value === selected);
    if (containerRef.current && index >= 0) {
      containerRef.current.scrollTop = index * ITEM_HEIGHT;
    }
  }, []);
  const handleScroll = () => {
    if (settleTimeout.current) clearTimeout(settleTimeout.current);
    settleTimeout.current = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const index = Math.min(
        Math.max(Math.round(el.scrollTop / ITEM_HEIGHT), 0),
        items.length - 1
      );
      const item = items[index];
      if (item && item.value !== selected) onSelect(item.value);
    }, 120);
  };
  const scrollItemToCenter = (value) => {
    const index = items.findIndex((item) => item.value === value);
    if (containerRef.current && index >= 0) {
      containerRef.current.scrollTo({
        top: index * ITEM_HEIGHT,
        behavior: "smooth"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: containerRef,
      onScroll: handleScroll,
      className: "time-picker-column relative overflow-y-auto scroll-smooth",
      style: { height: COLUMN_HEIGHT },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: (COLUMN_HEIGHT - ITEM_HEIGHT) / 2 } }),
        items.map((item) => {
          const isSelected = item.value === selected;
          return /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              onClick: () => scrollItemToCenter(item.value),
              style: { height: ITEM_HEIGHT, scrollSnapAlign: "center" },
              className: cn(
                "flex w-full shrink-0 items-center justify-center text-sm tabular-nums transition-all duration-150",
                isSelected ? "scale-105 font-semibold text-[#003C1B]" : "text-[#9C9C9C] hover:text-[#161616]"
              ),
              children: item.label
            },
            item.value
          );
        }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: (COLUMN_HEIGHT - ITEM_HEIGHT) / 2 } })
      ]
    }
  );
}
var HOURS = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1).padStart(2, "0"),
  value: i + 1
}));
var MINUTES = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, "0"),
  value: i
}));
var PERIODS = [
  { label: "AM", value: 0 },
  { label: "PM", value: 1 }
];
function TimePicker({
  value,
  onChange,
  className
}) {
  const hour12 = value.hours % 12 === 0 ? 12 : value.hours % 12;
  const period = value.hours >= 12 ? 1 : 0;
  const setHour12 = (h) => {
    const hours = period === 1 ? h % 12 + 12 : h % 12;
    onChange({ ...value, hours });
  };
  const setMinutes = (minutes) => onChange({ ...value, minutes });
  const setPeriod = (p) => {
    const base = value.hours % 12;
    onChange({ ...value, hours: p === 1 ? base + 12 : base });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(
        "flex w-[176px] flex-col border-l border-[#EEEEEE]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-center gap-1.5 border-b border-[#EEEEEE] py-2.5 text-xs font-medium text-[#161616]", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Clock, { size: 13, strokeWidth: 2, className: "text-[#003C1B]" }),
          "Select time"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative flex justify-center px-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "pointer-events-none absolute inset-x-2 z-0 rounded-md bg-[#DCF3CE]",
              style: {
                top: (COLUMN_HEIGHT - ITEM_HEIGHT) / 2,
                height: ITEM_HEIGHT
              }
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "pointer-events-none absolute inset-x-2 top-0 z-10 h-6 bg-gradient-to-b from-white to-transparent" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "pointer-events-none absolute inset-x-2 bottom-0 z-10 h-6 bg-gradient-to-t from-white to-transparent" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative z-0 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(TimeColumn, { items: HOURS, selected: hour12, onSelect: setHour12 }),
            /* @__PURE__ */ jsxRuntime.jsx(
              TimeColumn,
              {
                items: MINUTES,
                selected: value.minutes,
                onSelect: setMinutes
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(TimeColumn, { items: PERIODS, selected: period, onSelect: setPeriod })
          ] })
        ] })
      ]
    }
  );
}
function isDateRange(v) {
  return !!v && typeof v === "object" && "from" in v && "to" in v && (v.from instanceof Date || v.to instanceof Date);
}
function orderedRange(a, b) {
  return a <= b ? { from: a, to: b } : { from: b, to: a };
}
function Spinner3({ size }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "shrink-0 animate-spin rounded-full",
      style: {
        width: size,
        height: size,
        border: `2px solid ${INPUT_COLORS.border}`,
        borderTopColor: INPUT_COLORS.borderFocus
      }
    }
  );
}
function LoadingBar() {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "h-[11px] flex-1 animate-pulse rounded-md",
      style: { background: INPUT_COLORS.subtle }
    }
  );
}
function DatePicker({
  mode = "single",
  value: controlledValue,
  onChange,
  placeholder = mode === "range" ? "Date Range" : "Select date...",
  size = "md",
  width,
  className,
  disabled = false,
  minDate,
  maxDate,
  onTouch,
  clearable = false,
  label,
  required,
  helperText,
  error,
  readOnly = false,
  open: controlledOpen,
  onOpenChange: onOpenChangeProp,
  showTime = false,
  status,
  statusMessage,
  loading = false
}) {
  const isSingleWithTime = mode === "single" && showTime;
  const spec = DATEPICKER_SIZES[size];
  const [hovered, setHovered] = React9__namespace.useState(false);
  const [internalOpen, setInternalOpen] = React9__namespace.useState(false);
  const open = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const setOpen = React9__namespace.useCallback(
    (next) => {
      if (controlledOpen === void 0) setInternalOpen(next);
      onOpenChangeProp?.(next);
    },
    [controlledOpen, onOpenChangeProp]
  );
  const touchedRef = React9__namespace.useRef(false);
  const interactedRef = React9__namespace.useRef(false);
  const isMobileDrawer = React9__namespace.useContext(FilterGroupMobileContext);
  const registerDrawerCalendar = React9__namespace.useContext(FilterGroupDrawerCalendarContext);
  const isControlled = controlledOpen !== void 0;
  React9__namespace.useEffect(() => {
    if (!isMobileDrawer || !isControlled || !registerDrawerCalendar) return;
    if (open) {
      registerDrawerCalendar({ mode, value: committed, onChange, onOpenChange: setOpen, minDate, maxDate });
    } else {
      registerDrawerCalendar(null);
    }
    return () => {
      registerDrawerCalendar(null);
    };
  }, [open, isMobileDrawer, isControlled]);
  const [committed, setCommitted] = React9__namespace.useState(
    controlledValue !== void 0 ? controlledValue ?? null : null
  );
  React9__namespace.useEffect(() => {
    if (controlledValue !== void 0) setCommitted(controlledValue ?? null);
  }, [controlledValue]);
  const [pendingFrom, setPendingFrom] = React9__namespace.useState(null);
  const [draftRange, setDraftRange] = React9__namespace.useState(null);
  const [hoverDate, setHoverDate] = React9__namespace.useState(null);
  const [draftSingleDate, setDraftSingleDate] = React9__namespace.useState(
    null
  );
  const [draftTime, setDraftTime] = React9__namespace.useState({
    hours: (/* @__PURE__ */ new Date()).getHours(),
    minutes: (/* @__PURE__ */ new Date()).getMinutes()
  });
  const prevOpen = React9__namespace.useRef(false);
  React9__namespace.useEffect(() => {
    if (open && !prevOpen.current) {
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(
        mode === "range" && isDateRange(committed) ? committed : null
      );
      if (isSingleWithTime) {
        const base = committed instanceof Date ? committed : null;
        setDraftSingleDate(base);
        setDraftTime({
          hours: base ? base.getHours() : (/* @__PURE__ */ new Date()).getHours(),
          minutes: base ? base.getMinutes() : (/* @__PURE__ */ new Date()).getMinutes()
        });
      }
    }
    if (!open && prevOpen.current) {
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(null);
      setDraftSingleDate(null);
    }
    prevOpen.current = open;
  }, [open, committed, mode, isSingleWithTime]);
  const calendarDisabled = React9__namespace.useMemo(() => {
    const m = [];
    if (minDate) m.push({ before: minDate });
    if (maxDate) m.push({ after: maxDate });
    return m.length > 0 ? m : void 0;
  }, [minDate, maxDate]);
  const triggerLabel = React9__namespace.useMemo(() => {
    if (!committed) return null;
    if (mode === "single" && committed instanceof Date)
      return isSingleWithTime ? formatDateTime(committed) : formatDate(committed);
    if (mode === "month" && committed instanceof Date)
      return formatMonthYear(committed);
    if (mode === "range" && isDateRange(committed))
      return formatRange(committed.from, committed.to) ?? null;
    return null;
  }, [committed, mode, isSingleWithTime]);
  const effectiveDisplayRange = React9__namespace.useMemo(() => {
    if (mode !== "range") return null;
    const existingRange = draftRange ?? (isDateRange(committed) ? committed : null);
    if (pendingFrom) {
      return hoverDate ? orderedRange(pendingFrom, hoverDate) : { from: pendingFrom };
    }
    return existingRange;
  }, [mode, committed, pendingFrom, draftRange, hoverDate]);
  const calendarSelected = React9__namespace.useMemo(() => {
    if (mode === "single") {
      if (isSingleWithTime) {
        return draftSingleDate ?? (committed instanceof Date ? committed : void 0);
      }
      return committed instanceof Date ? committed : void 0;
    }
    return effectiveDisplayRange ?? void 0;
  }, [mode, committed, effectiveDisplayRange, isSingleWithTime, draftSingleDate]);
  const footerHint = React9__namespace.useMemo(() => {
    if (isSingleWithTime) {
      return draftSingleDate ? formatDate(draftSingleDate) ?? "" : "No date";
    }
    const range = effectiveDisplayRange;
    if (!range) return "No range";
    if (!range.to) return "Pick an end date";
    const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const days = Math.round((startOfDay(range.to) - startOfDay(range.from)) / 864e5) + 1;
    return `${days} ${days === 1 ? "day" : "days"}`;
  }, [effectiveDisplayRange, isSingleWithTime, draftSingleDate]);
  const handleDayClick = (date, modifiers) => {
    if (modifiers.disabled) return;
    if (mode === "single") {
      if (isSingleWithTime) {
        setDraftSingleDate(date);
        return;
      }
      setCommitted(date);
      onChange?.(date);
      setOpen(false);
      return;
    }
    if (pendingFrom === null) {
      setPendingFrom(date);
      setDraftRange(null);
      setHoverDate(null);
    } else {
      const range = orderedRange(pendingFrom, date);
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(range);
    }
  };
  const handleDayMouseEnter = (date) => {
    if (pendingFrom) {
      setHoverDate(date);
      return;
    }
    const existingRange = draftRange ?? (isDateRange(committed) ? committed : null);
    if (existingRange && (date < existingRange.from || date > existingRange.to)) {
      setHoverDate(date);
    } else {
      setHoverDate(null);
    }
  };
  const handleDayMouseLeave = () => {
    setHoverDate(null);
  };
  const handleApply = () => {
    const toCommit = draftRange ? draftRange : pendingFrom ? { from: pendingFrom, to: pendingFrom } : null;
    if (!toCommit) return;
    setPendingFrom(null);
    setHoverDate(null);
    setDraftRange(null);
    setCommitted(toCommit);
    onChange?.(toCommit);
    setOpen(false);
  };
  const handleClearDraftRange = () => {
    setPendingFrom(null);
    setHoverDate(null);
    setDraftRange(null);
  };
  const handleApplySingleTime = () => {
    if (!draftSingleDate) return;
    const combined = new Date(draftSingleDate);
    combined.setHours(draftTime.hours, draftTime.minutes, 0, 0);
    setDraftSingleDate(null);
    setCommitted(combined);
    onChange?.(combined);
    setOpen(false);
  };
  const handleClearDraftTime = () => {
    setDraftSingleDate(null);
  };
  const handleClearTrigger = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCommitted(null);
    setDraftRange(null);
    setPendingFrom(null);
    setHoverDate(null);
    setDraftSingleDate(null);
    onChange?.(null);
  };
  const handleOpenChange = (next) => {
    if (disabled || readOnly || loading) return;
    setOpen(next);
    if (next) {
      interactedRef.current = true;
    } else if (interactedRef.current && !touchedRef.current) {
      touchedRef.current = true;
      onTouch?.();
    }
  };
  const handleTriggerBlur = (e) => {
    if (open) return;
    if (e.currentTarget.contains(e.relatedTarget)) return;
    if (!interactedRef.current) return;
    if (touchedRef.current) return;
    touchedRef.current = true;
    onTouch?.();
  };
  const canApply = draftRange !== null || pendingFrom !== null;
  const state = disabled ? "disabled" : loading ? "loading" : readOnly ? "readonly" : error ? "error" : open ? "open" : status === "success" ? "success" : status === "warning" ? "warning" : hovered ? "hover" : "default";
  const box = getTriggerStyle2(state);
  const triggerState = disabled ? "disabled" : readOnly ? "readonly" : open ? "open" : "default";
  const glyphColor = state === "error" ? INPUT_COLORS.errorInk : state === "warning" ? INPUT_COLORS.warningInk : state === "disabled" || state === "loading" ? INPUT_COLORS.disabledInk : INPUT_COLORS.icon;
  const triggerBoxStyle = {
    minHeight: spec.height,
    paddingLeft: spec.padLeft,
    paddingRight: spec.padRight,
    gap: DATEPICKER_GAP,
    borderRadius: spec.radius,
    fontSize: spec.font,
    background: box.background,
    border: box.border,
    boxShadow: box.boxShadow,
    color: box.color,
    cursor: box.cursor ?? "pointer",
    transition: INPUT_TRANSITION
  };
  const valueNode = /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: "ue-tabular min-w-0 flex-1 truncate",
      style: {
        fontVariantNumeric: "tabular-nums",
        fontWeight: 500,
        color: triggerLabel ? box.color : INPUT_COLORS.placeholder
      },
      children: triggerLabel ?? placeholder
    }
  );
  const adornments = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex shrink-0 items-center", style: { gap: 6 }, children: [
    clearable && committed && !readOnly && !disabled && !loading && /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        tabIndex: -1,
        onClick: handleClearTrigger,
        "aria-label": "Clear",
        className: "flex shrink-0 items-center justify-center rounded-full transition-colors",
        style: {
          width: 18,
          height: 18,
          background: INPUT_COLORS.subtle,
          color: INPUT_COLORS.message
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 9, strokeWidth: 3.2 })
      }
    ),
    loading && /* @__PURE__ */ jsxRuntime.jsx(Spinner3, { size: 14 }),
    state === "readonly" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Lock, { size: 14, strokeWidth: 2, color: INPUT_COLORS.placeholder }),
    state === "error" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleAlert, { size: 15, strokeWidth: 2.2, color: INPUT_COLORS.errorInk }),
    state === "warning" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleAlert, { size: 15, strokeWidth: 2.2, color: INPUT_COLORS.warningInk }),
    state === "success" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 15, strokeWidth: 2.6, color: INPUT_COLORS.successInk })
  ] });
  if (isMobileDrawer && isControlled && registerDrawerCalendar) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      label && /* @__PURE__ */ jsxRuntime.jsx(
        InputLabel,
        {
          size,
          required,
          tone: state === "error" || state === "disabled" ? getLabelColor(state) : void 0,
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: cn(
            triggerVariants2({ state: triggerState, size }),
            width,
            className
          ),
          style: triggerBoxStyle,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CalendarIcon, { size: spec.icon, strokeWidth: 2, color: glyphColor }),
            loading ? /* @__PURE__ */ jsxRuntime.jsx(LoadingBar, {}) : valueNode,
            adornments
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        InputHelper,
        {
          size,
          state: state === "open" ? "focused" : state,
          helperText: error ?? (status && statusMessage) ?? helperText,
          error
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    label && /* @__PURE__ */ jsxRuntime.jsx(
      InputLabel,
      {
        size,
        required,
        tone: state === "error" || state === "disabled" ? getLabelColor(state) : void 0,
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
      /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          role: "button",
          tabIndex: disabled ? -1 : 0,
          "aria-disabled": disabled,
          "aria-haspopup": "dialog",
          "aria-expanded": open,
          "aria-busy": loading || void 0,
          onPointerEnter: () => setHovered(true),
          onPointerLeave: () => setHovered(false),
          onFocus: () => {
            interactedRef.current = true;
          },
          onBlur: handleTriggerBlur,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!disabled && !readOnly && !loading) setOpen(!open);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          },
          className: cn(
            triggerVariants2({ state: triggerState, size }),
            width,
            className
          ),
          style: triggerBoxStyle,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CalendarIcon, { size: spec.icon, strokeWidth: 2, color: glyphColor }),
            loading ? /* @__PURE__ */ jsxRuntime.jsx(LoadingBar, {}) : valueNode,
            adornments
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        PopoverContent,
        {
          align: "center",
          className: "w-auto max-w-[calc(100vw-1rem)] border-0 p-0 shadow-none",
          collisionPadding: { top: 64 },
          children: /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "overflow-hidden",
              style: {
                borderRadius: PANEL.radius,
                border: PANEL.border,
                background: PANEL.background,
                boxShadow: PANEL.shadow
              },
              children: [
                mode === "month" && /* @__PURE__ */ jsxRuntime.jsx(
                  MonthPickerCalendar,
                  {
                    selected: committed instanceof Date ? committed : null,
                    minDate,
                    maxDate,
                    onSelect: (date) => {
                      setCommitted(date);
                      onChange?.(date);
                      setOpen(false);
                    }
                  }
                ),
                mode !== "month" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    DatePickerCalendar,
                    {
                      mode,
                      size,
                      selected: calendarSelected,
                      disabled: calendarDisabled,
                      minDate,
                      maxDate,
                      onDayClick: (date, modifiers) => handleDayClick(date, modifiers),
                      onDayMouseEnter: (date) => handleDayMouseEnter(date),
                      onDayMouseLeave: () => handleDayMouseLeave(),
                      footer: (
                        // Plain single mode commits on click, so it needs no
                        // footer — only range and single+time have a draft to
                        // clear or apply.
                        !(mode === "range" || isSingleWithTime) ? null : /* @__PURE__ */ jsxRuntime.jsxs(
                          "div",
                          {
                            className: "flex items-center",
                            style: {
                              gap: 9,
                              paddingTop: 9,
                              borderTop: `1px solid ${PANEL.rule}`
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntime.jsx(
                                "span",
                                {
                                  className: "ue-tabular flex-1",
                                  style: {
                                    fontVariantNumeric: "tabular-nums",
                                    fontSize: 11,
                                    fontWeight: 500,
                                    lineHeight: 1.4,
                                    color: PANEL.footerInk
                                  },
                                  children: footerHint
                                }
                              ),
                              /* @__PURE__ */ jsxRuntime.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: isSingleWithTime ? handleClearDraftTime : handleClearDraftRange,
                                  className: "transition-all duration-[120ms]",
                                  style: {
                                    height: 28,
                                    padding: "0 10px",
                                    border: `1px solid ${INPUT_COLORS.border}`,
                                    borderRadius: PANEL.cellRadius,
                                    background: INPUT_COLORS.surface,
                                    color: PANEL.navInk,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    cursor: "pointer"
                                  },
                                  children: "Clear"
                                }
                              ),
                              /* @__PURE__ */ jsxRuntime.jsx(
                                "button",
                                {
                                  type: "button",
                                  onClick: isSingleWithTime ? handleApplySingleTime : handleApply,
                                  disabled: isSingleWithTime ? !draftSingleDate : !canApply,
                                  className: "transition-all duration-[120ms] disabled:cursor-not-allowed disabled:opacity-40",
                                  style: {
                                    height: 28,
                                    padding: "0 12px",
                                    border: 0,
                                    borderRadius: PANEL.cellRadius,
                                    color: "#FFFFFF",
                                    backgroundColor: PANEL.selectedBg,
                                    backgroundImage: "linear-gradient(180deg,#0A5A2C,#003C1B)",
                                    fontSize: 11,
                                    fontWeight: 600,
                                    cursor: "pointer"
                                  },
                                  children: "Apply"
                                }
                              )
                            ]
                          }
                        )
                      )
                    }
                  ),
                  isSingleWithTime && /* @__PURE__ */ jsxRuntime.jsx(TimePicker, { value: draftTime, onChange: setDraftTime })
                ] })
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      InputHelper,
      {
        size,
        state: state === "open" ? "focused" : state,
        helperText: error ?? (status && statusMessage) ?? helperText,
        error
      }
    )
  ] });
}
DatePicker.displayName = "DatePicker";
function Table({
  className,
  containerClassName,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: cn(
        "uengage-ui relative w-full overflow-x-auto",
        containerClassName
      ),
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("uengage-ui w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-md bg-accent", className),
      ...props
    }
  );
}
var tableWrapperVariants = classVarianceAuthority.cva("w-full", {
  variants: {
    bordered: {
      true: "border rounded-lg",
      false: ""
    }
  },
  defaultVariants: {
    bordered: false
  }
});
var tableHeaderRowVariants = classVarianceAuthority.cva(
  "bg-slate-50 text-gray-500 text-xs font-medium",
  {
    variants: {
      size: {
        sm: "py-1.5 sm:py-2",
        md: "py-2 sm:py-3",
        lg: "py-3 sm:py-4"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var tableBodyRowVariants = classVarianceAuthority.cva("transition-colors", {
  variants: {
    size: {
      sm: "py-1.5 sm:py-2 text-xs",
      md: "py-2 sm:py-3 text-sm",
      lg: "py-3 sm:py-4 text-sm sm:text-base"
    },
    clickable: {
      true: "cursor-pointer",
      false: ""
    },
    hover: {
      true: "hover:bg-gray-50",
      false: "hover:bg-transparent"
    }
  },
  defaultVariants: {
    size: "md",
    clickable: false,
    hover: true
  }
});
var statusBadgeVariants = classVarianceAuthority.cva(
  "inline-flex items-center rounded-full font-medium gap-1 transition-colors border",
  {
    variants: {
      variant: {
        success: "bg-green-100 text-green-700 border-green-300",
        warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
        error: "bg-red-100 text-red-700 border-red-300"
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-2.5 py-1.5 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-2.5 text-base"
      }
    },
    defaultVariants: {
      variant: "success",
      size: "md"
    }
  }
);
var alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
function TableCell2({
  size = "md",
  align = "left",
  verticalAlign = "top",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TableCell,
    {
      className: cn(
        tableBodyRowVariants({ size, hover: false }),
        alignClass[align],
        // Allow content to wrap and break long words/URLs that would otherwise
        // force the column wider than its flex-allocated share.
        "whitespace-normal break-words [hyphens:none]",
        verticalAlign === "middle" ? "align-middle" : "align-top",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 w-full", children })
    }
  );
}
var alignClass2 = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
var justifyClass = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end"
};
function TableHeaderCell({
  size = "md",
  align = "left",
  sortable = false,
  sorted = null,
  onSort,
  className,
  children,
  ...props
}) {
  const Icon = sorted === "asc" ? lucideReact.ChevronUp : sorted === "desc" ? lucideReact.ChevronDown : lucideReact.ChevronsUpDown;
  const handleClick = sortable ? onSort : void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(
    TableHead,
    {
      "aria-sort": sortable ? sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none" : void 0,
      onClick: handleClick,
      className: cn(
        tableHeaderRowVariants({ size }),
        alignClass2[align],
        "whitespace-normal break-words [hyphens:none] align-middle",
        sortable && "cursor-pointer select-none hover:text-gray-700",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex items-center gap-1 min-w-0", justifyClass[align]), children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 break-words [hyphens:none]", children }),
        sortable ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": "true" }) : null
      ] })
    }
  );
}
var SKELETON_WIDTHS = ["w-3/4", "w-2/3", "w-4/5", "w-1/2", "w-5/6"];
function TableSkeleton({
  rows = 5,
  columns,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(TableBody, { className, children: Array.from({ length: rows }).map((_, rowIndex) => /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: Array.from({ length: columns }).map((__, colIndex) => /* @__PURE__ */ jsxRuntime.jsx(TableCell, { className: cn("py-3 align-middle"), children: /* @__PURE__ */ jsxRuntime.jsx(
    Skeleton,
    {
      className: cn(
        "h-4",
        SKELETON_WIDTHS[(rowIndex * columns + colIndex) % SKELETON_WIDTHS.length]
      )
    }
  ) }, colIndex)) }, rowIndex)) });
}
function Table2({
  columns,
  data,
  keyField,
  loading = false,
  emptyMessage = "No results",
  onRowClick,
  rowClassName,
  stickyHeader = false,
  maxHeight,
  bordered = false,
  size = "md",
  mobileLayout = "scroll",
  className,
  hover = true
}) {
  const [sortKey, setSortKey] = React9.useState(null);
  const [sortDir, setSortDir] = React9.useState(null);
  const sortedData = React9.useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return sortDir === "asc" ? -1 : 1;
      if (bv == null) return sortDir === "asc" ? 1 : -1;
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDir]);
  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      return;
    }
    if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    } else {
      setSortDir("asc");
    }
  };
  const scrollStyle = stickyHeader && maxHeight ? { maxHeight } : void 0;
  const visibleColumns = columns.filter((col) => !col.hideOnMobile);
  const totalFlex = columns.reduce((sum, col) => sum + (col.flex ?? 1), 0);
  const colWidths = columns.map(
    (col) => col.width ?? `${((col.flex ?? 1) / totalFlex * 100).toFixed(2)}%`
  );
  const tableMinWidth = columns.reduce((sum, col) => sum + (col.minWidth ?? 0), 0);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(
        tableWrapperVariants({ bordered }),
        // Strip wrapper border on mobile when card view owns its own borders
        mobileLayout === "cards" && bordered && "max-md:border-0 max-md:rounded-none",
        className
      ),
      children: [
        mobileLayout === "cards" && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "md:hidden", children: loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3", children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            className: "rounded-xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm space-y-2.5",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-3 w-1/3" }),
              visibleColumns.map((_2, j) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-3.5 w-1/4" }),
                /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-3.5 w-2/5" })
              ] }, j))
            ]
          },
          i
        )) }) : sortedData.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "py-10 text-center text-sm text-gray-500", children: emptyMessage }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3", children: sortedData.map((row, rowIndex) => {
          const rowKey = String(
            row[keyField] ?? rowIndex
          );
          return /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              onClick: onRowClick ? () => onRowClick(row) : void 0,
              className: cn(
                "rounded-xl border border-gray-100 bg-white shadow-sm",
                "transition-colors overflow-hidden",
                hover && onRowClick && "hover:bg-gray-50 active:bg-gray-100",
                onRowClick && "cursor-pointer",
                rowClassName?.(row)
              ),
              children: visibleColumns.map((col, colIndex) => {
                const colKey = String(col.key);
                const rawValue = row[colKey];
                const content = col.render ? col.render(rawValue, row, rowIndex) : rawValue;
                const isLast = colIndex === visibleColumns.length - 1;
                return /* @__PURE__ */ jsxRuntime.jsxs(
                  "div",
                  {
                    className: cn(
                      "flex items-start justify-between gap-3 px-3 sm:px-4 py-2 sm:py-2.5",
                      !isLast && "border-b border-gray-50"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 text-xs font-medium text-gray-400 pt-0.5 min-w-[72px] max-w-[40%]", children: col.header }),
                      /* @__PURE__ */ jsxRuntime.jsx(
                        "div",
                        {
                          className: cn(
                            "text-sm text-gray-800 font-medium flex-1 min-w-0",
                            "flex justify-end items-center",
                            (col.mobileAlign ?? col.align) === "left" && "justify-start",
                            (col.mobileAlign ?? col.align) === "center" && "justify-center"
                          ),
                          children: content
                        }
                      )
                    ]
                  },
                  colKey
                );
              })
            },
            rowKey
          );
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: cn(
              "scroll-smooth",
              // Any non-"visible" overflow-x forces overflow-y to compute to "auto"
              // too, which would make this div the sticky positioning container
              // instead of the viewport. So when stickyHeader is used without a
              // maxHeight (page-scroll mode), skip overflow-x-auto entirely —
              // the header needs to stick against the real viewport, not this box.
              !(stickyHeader && !maxHeight) && "overflow-x-auto",
              // Clip table cells to the rounded corners — overflow:auto on this
              // element also clips to border-radius, so no parent overflow-hidden needed.
              bordered && "rounded-lg",
              stickyHeader && maxHeight && "overflow-y-auto scroll-smooth",
              mobileLayout === "cards" && "hidden md:block"
            ),
            style: scrollStyle,
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              Table,
              {
                className: "w-full",
                containerClassName: stickyHeader && !maxHeight ? "overflow-visible" : void 0,
                style: tableMinWidth > 0 ? { minWidth: `${tableMinWidth}px` } : { minWidth: "max-content" },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("colgroup", { children: columns.map((col, i) => /* @__PURE__ */ jsxRuntime.jsx(
                    "col",
                    {
                      style: {
                        width: colWidths[i],
                        minWidth: col.minWidth ? `${col.minWidth}px` : void 0
                      }
                    },
                    String(col.key)
                  )) }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    TableHeader,
                    {
                      className: cn(stickyHeader && "sticky top-0 z-10 bg-slate-50"),
                      children: /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: columns.map((col) => {
                        const colKey = String(col.key);
                        return /* @__PURE__ */ jsxRuntime.jsx(
                          TableHeaderCell,
                          {
                            size,
                            align: col.align ?? "left",
                            sortable: col.sortable,
                            sorted: sortKey === colKey ? sortDir : null,
                            onSort: () => toggleSort(colKey),
                            className: cn(
                              col.hideOnMobile && "hidden md:table-cell",
                              col.className
                            ),
                            children: col.header
                          },
                          colKey
                        );
                      }) })
                    }
                  ),
                  loading ? /* @__PURE__ */ jsxRuntime.jsx(TableSkeleton, { columns: columns.length }) : sortedData.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(TableBody, { children: /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntime.jsx(
                    TableCell,
                    {
                      colSpan: columns.length,
                      className: "py-10 text-center text-sm text-gray-500",
                      children: emptyMessage
                    }
                  ) }) }) : /* @__PURE__ */ jsxRuntime.jsx(TableBody, { children: sortedData.map((row, rowIndex) => {
                    const rowKey = String(
                      row[keyField] ?? rowIndex
                    );
                    return /* @__PURE__ */ jsxRuntime.jsx(
                      TableRow,
                      {
                        onClick: onRowClick ? () => onRowClick(row) : void 0,
                        className: cn(
                          tableBodyRowVariants({
                            size,
                            clickable: Boolean(onRowClick),
                            hover
                          }),
                          rowClassName?.(row)
                        ),
                        children: columns.map((col) => {
                          const colKey = String(col.key);
                          const rawValue = row[colKey];
                          const content = col.render ? col.render(rawValue, row, rowIndex) : rawValue;
                          return /* @__PURE__ */ jsxRuntime.jsx(
                            TableCell2,
                            {
                              size,
                              align: col.align ?? "left",
                              verticalAlign: col.verticalAlign,
                              className: cn(
                                col.hideOnMobile && "hidden md:table-cell",
                                col.className
                              ),
                              children: content
                            },
                            colKey
                          );
                        })
                      },
                      rowKey
                    );
                  }) })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
function StatusBadge({
  variant = "success",
  size = "md",
  label,
  icon,
  iconPosition = "left",
  className
  // width,
}) {
  const iconNode = icon ? /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: "inline-flex items-center flex-shrink-0",
      "aria-hidden": "true",
      children: icon
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      className: cn(
        statusBadgeVariants({ variant, size }),
        // width && `${width}`,
        "justify-center",
        className
      ),
      children: [
        iconPosition === "left" ? iconNode : null,
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: label }),
        iconPosition === "right" ? iconNode : null
      ]
    }
  );
}
var trackVariants = classVarianceAuthority.cva(
  [
    "group/uengage-toggle relative inline-flex shrink-0 items-center rounded-full",
    "cursor-pointer select-none",
    "transition-[background-color,box-shadow] duration-[180ms] ease-[cubic-bezier(.2,.8,.3,1)]",
    `outline-none ${SELECTION_FOCUS_RING}`,
    "data-[state=checked]:bg-[#003C1B]",
    "disabled:cursor-not-allowed",
    "disabled:data-[state=unchecked]:bg-[#E2E2E2]",
    "disabled:data-[state=checked]:bg-[#C6D6CB]"
  ].join(" "),
  {
    variants: {
      size: {
        xs: "h-[16px] w-[28px]",
        sm: "h-[18px] w-[32px]",
        md: "h-[22px] w-[38px]",
        lg: "h-[26px] w-[46px]"
      },
      type: {
        default: "data-[state=unchecked]:bg-[#C6C6C6] hover:data-[state=unchecked]:bg-[#AFAFAF]",
        danger: "data-[state=unchecked]:bg-[#A8000F]"
      }
    },
    defaultVariants: {
      size: "md",
      type: "default"
    }
  }
);
var thumbVariants = classVarianceAuthority.cva(
  [
    "pointer-events-none absolute top-1/2 left-[2px] flex items-center justify-center",
    "rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.28)]",
    "-translate-y-1/2 transition-transform duration-[180ms] ease-[cubic-bezier(.2,.8,.3,1)]",
    "data-[state=unchecked]:translate-x-0",
    "group-disabled/uengage-toggle:data-[state=unchecked]:bg-[#F3F5F9]",
    "group-disabled/uengage-toggle:data-[state=checked]:bg-[#EEF3EF]"
  ].join(" "),
  {
    variants: {
      size: {
        xs: "size-[12px] data-[state=checked]:translate-x-[12px]",
        sm: "size-[14px] data-[state=checked]:translate-x-[14px]",
        md: "size-[18px] data-[state=checked]:translate-x-[16px]",
        lg: "size-[22px] data-[state=checked]:translate-x-[20px]"
      },
      // The knob is always white; `type` is kept so callers can keep passing it.
      type: {
        default: "",
        danger: ""
      }
    },
    defaultVariants: {
      size: "md",
      type: "default"
    }
  }
);
var THUMB_PENDING_TRANSLATE = {
  xs: "data-[state=unchecked]:translate-x-[6px] data-[state=checked]:translate-x-[6px]",
  sm: "data-[state=unchecked]:translate-x-[7px] data-[state=checked]:translate-x-[7px]",
  md: "data-[state=unchecked]:translate-x-[8px] data-[state=checked]:translate-x-[8px]",
  lg: "data-[state=unchecked]:translate-x-[10px] data-[state=checked]:translate-x-[10px]"
};
var PENDING_SPINNER_SIZE = {
  xs: "size-[6px]",
  sm: "size-[7px]",
  md: "size-[9px]",
  lg: "size-[11px]"
};
var PILL_PADDING3 = {
  xs: "gap-2 px-2 py-1",
  sm: "gap-2.5 px-2.5 py-1.5",
  md: "gap-3 px-3 py-2",
  lg: "gap-3.5 px-4 py-2.5"
};
var GAP_ONLY3 = {
  xs: "gap-2",
  sm: "gap-2.5",
  md: "gap-3",
  lg: "gap-3.5"
};
var TITLE_TEXT = {
  xs: "text-[12px]",
  sm: "text-[12px]",
  md: "text-[13px]",
  lg: "text-[14px]"
};
var Toggle = React9__namespace.forwardRef(
  ({
    size = "md",
    type = "default",
    label,
    required,
    title,
    titlePosition = "right",
    checked,
    defaultChecked,
    onChange,
    disabled,
    readOnly,
    pending,
    wrapperClassName,
    borderColor,
    bgColor,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = React9__namespace.useState(defaultChecked ?? false);
    const isChecked = checked !== void 0 ? checked : internalChecked;
    const hasCustomColors2 = !!(borderColor || bgColor);
    const pillStyle = hasCustomColors2 ? {
      ...borderColor ? { borderColor } : {},
      ...isChecked && bgColor ? { backgroundColor: bgColor } : {}
    } : void 0;
    const switchEl = /* @__PURE__ */ jsxRuntime.jsx(
      radixUi.Switch.Root,
      {
        ref,
        checked: checked !== void 0 ? checked : void 0,
        defaultChecked: checked !== void 0 ? void 0 : defaultChecked,
        onCheckedChange: readOnly || pending ? void 0 : (val) => {
          setInternalChecked(val);
          onChange?.(val);
        },
        disabled,
        "aria-busy": pending || void 0,
        className: cn(
          trackVariants({ size, type }),
          readOnly && "pointer-events-none cursor-default",
          pending && "pointer-events-none cursor-progress bg-[#8CA695] data-[state=checked]:bg-[#8CA695] data-[state=unchecked]:bg-[#8CA695]"
        ),
        ...props,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          radixUi.Switch.Thumb,
          {
            className: cn(
              thumbVariants({ size, type }),
              pending && THUMB_PENDING_TRANSLATE[size]
            ),
            children: pending && /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                "aria-hidden": "true",
                className: cn(
                  PENDING_SPINNER_SIZE[size],
                  "rounded-full border-[1.6px] border-[rgba(0,60,27,0.25)] border-t-[#003C1B]",
                  "animate-[spin_0.7s_linear_infinite]"
                )
              }
            )
          }
        )
      }
    );
    const inlineEl = title ? /* @__PURE__ */ jsxRuntime.jsxs(
      "label",
      {
        style: pillStyle,
        className: cn(
          "inline-flex cursor-pointer items-center transition-colors duration-[120ms] ease-linear",
          hasCustomColors2 ? cn("rounded-[10px] border", PILL_PADDING3[size], "border-[#E2E2E2]") : GAP_ONLY3[size],
          disabled && "cursor-not-allowed",
          readOnly && "pointer-events-none cursor-default"
        ),
        children: [
          titlePosition === "left" && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: cn(
                TITLE_TEXT[size],
                "font-medium text-[#202020]",
                disabled && "text-[#9C9C9C]"
              ),
              children: title
            }
          ),
          switchEl,
          titlePosition === "right" && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: cn(
                TITLE_TEXT[size],
                "font-medium text-[#202020]",
                disabled && "text-[#9C9C9C]"
              ),
              children: title
            }
          )
        ]
      }
    ) : hasCustomColors2 ? /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        style: pillStyle,
        className: cn(
          "inline-flex items-center transition-colors duration-[120ms] ease-linear rounded-[10px] border",
          PILL_PADDING3[size],
          "border-[#E2E2E2]",
          readOnly && "pointer-events-none cursor-default"
        ),
        children: switchEl
      }
    ) : switchEl;
    if (label) {
      return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex flex-col gap-1.5", wrapperClassName), children: [
        /* @__PURE__ */ jsxRuntime.jsx(InputLabel, { size: size === "xs" ? "sm" : size, required, children: label }),
        inlineEl
      ] });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: inlineEl });
  }
);
Toggle.displayName = "Toggle";

// src/lib/bodyScrollLock.ts
var lockCount = 0;
var lockedScrollY = 0;
function lockBodyScroll() {
  if (lockCount === 0) {
    lockedScrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = "100%";
  }
  lockCount++;
}
function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, lockedScrollY);
  }
}
var sidebarContentVariants = classVarianceAuthority.cva(
  "fixed z-40 bg-background border shadow-lg outline-none will-change-transform",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 border-r",
        right: "inset-y-0 right-0 border-l",
        "right-slide": "inset-y-0 right-0 border-l",
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t"
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        full: "h-screen w-screen max-h-screen max-w-screen rounded-none"
      }
    },
    compoundVariants: [
      { side: "left", size: "sm", className: "w-64 max-w-[85vw]" },
      { side: "left", size: "md", className: "w-80 max-w-[90vw]" },
      { side: "left", size: "lg", className: "w-96 max-w-[95vw]" },
      { side: "right", size: "sm", className: "w-64 max-w-[85vw]" },
      { side: "right", size: "md", className: "w-80 max-w-[90vw]" },
      { side: "right", size: "lg", className: "w-96 max-w-[95vw]" },
      { side: "right-slide", size: "sm", className: "w-64 max-w-[85vw]" },
      { side: "right-slide", size: "md", className: "w-80 max-w-[90vw]" },
      { side: "right-slide", size: "lg", className: "w-96 max-w-[95vw]" },
      { side: "top", size: "sm", className: "h-48 max-h-[80vh]" },
      { side: "top", size: "md", className: "h-64 max-h-[85vh]" },
      { side: "top", size: "lg", className: "h-80 max-h-[90vh]" },
      { side: "bottom", size: "sm", className: "h-48 max-h-[80vh]" },
      { side: "bottom", size: "md", className: "h-64 max-h-[85vh]" },
      { side: "bottom", size: "lg", className: "h-80 max-h-[90vh]" }
    ],
    defaultVariants: {
      side: "left",
      size: "md"
    }
  }
);
var sidebarPersistentVariants = classVarianceAuthority.cva("bg-background border", {
  variants: {
    side: {
      left: "h-full border-r",
      right: "h-full border-l",
      "right-slide": "h-full border-l",
      top: "w-full border-b",
      bottom: "w-full border-t"
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      full: "h-full w-full"
    }
  },
  compoundVariants: [
    { side: "left", size: "sm", className: "w-64" },
    { side: "left", size: "md", className: "w-80" },
    { side: "left", size: "lg", className: "w-96" },
    { side: "right", size: "sm", className: "w-64" },
    { side: "right", size: "md", className: "w-80" },
    { side: "right", size: "lg", className: "w-96" },
    { side: "right-slide", size: "sm", className: "w-64" },
    { side: "right-slide", size: "md", className: "w-80" },
    { side: "right-slide", size: "lg", className: "w-96" },
    { side: "top", size: "sm", className: "h-48" },
    { side: "top", size: "md", className: "h-64" },
    { side: "top", size: "lg", className: "h-80" },
    { side: "bottom", size: "sm", className: "h-48" },
    { side: "bottom", size: "md", className: "h-64" },
    { side: "bottom", size: "lg", className: "h-80" }
  ],
  defaultVariants: {
    side: "left",
    size: "md"
  }
});
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = React9__namespace.useState(false);
  React9__namespace.useEffect(() => {
    const query = `(min-width: ${breakpoint}px)`;
    const media = window.matchMedia(query);
    const setFromMedia = () => setIsDesktop(media.matches);
    setFromMedia();
    media.addEventListener("change", setFromMedia);
    return () => media.removeEventListener("change", setFromMedia);
  }, [breakpoint]);
  return isDesktop;
}
function SidebarHeader({
  heading,
  closeIcon,
  divider,
  onClose
}) {
  if (!heading && !closeIcon) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
      heading ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-base font-semibold leading-none", children: heading }) : /* @__PURE__ */ jsxRuntime.jsx("span", {}),
      closeIcon ? /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "rounded-sm p-1 text-[#202020] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "aria-label": "Close sidebar",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-5 w-5 " })
        }
      ) : null
    ] }),
    divider ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border-b" }) : null
  ] });
}
function Sidebar({
  open,
  defaultOpen = false,
  onOpenChange,
  side = "left",
  size = "md",
  sizePercent,
  overlay = true,
  closeOnOutsideClick = true,
  persistentOnDesktop = false,
  trigger,
  heading,
  closeIcon = false,
  divider = false,
  className,
  contentClassName,
  children
}) {
  const isDesktop = useIsDesktop();
  const isControlled = open !== void 0;
  const [uncontrolledOpen, setUncontrolledOpen] = React9__namespace.useState(defaultOpen);
  const resolvedOpen = isControlled ? open : uncontrolledOpen;
  const handleOpenChange = React9__namespace.useCallback(
    (nextOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );
  const customSizeStyle = React9__namespace.useMemo(() => {
    if (sizePercent == null) return {};
    const pct = Math.min(100, Math.max(1, sizePercent));
    if (side === "top" || side === "bottom") {
      return { height: `${pct}vh`, maxHeight: "100vh" };
    }
    if (!isDesktop) return { width: "100vw", maxWidth: "100vw" };
    return { width: `${pct}vw`, maxWidth: "100vw" };
  }, [sizePercent, side, isDesktop]);
  const animDurationStyle = React9__namespace.useMemo(() => {
    if (sizePercent != null) {
      const pct = Math.min(100, Math.max(1, sizePercent));
      return {
        "--sb-open-dur": `${Math.round(pct * 3)}ms`,
        "--sb-close-dur": `${Math.round(pct * 2)}ms`
      };
    }
    const presets = {
      sm: { open: "260ms", close: "180ms" },
      md: { open: "300ms", close: "200ms" },
      lg: { open: "340ms", close: "220ms" },
      full: { open: "400ms", close: "260ms" }
    };
    const { open: openDur, close: closeDur } = presets[size ?? "md"] ?? presets["md"];
    return {
      "--sb-open-dur": openDur,
      "--sb-close-dur": closeDur
    };
  }, [size, sizePercent]);
  const shouldRenderPersistent = persistentOnDesktop && isDesktop;
  React9__namespace.useEffect(() => {
    if (!resolvedOpen || shouldRenderPersistent || !overlay) return;
    lockBodyScroll();
    return unlockBodyScroll;
  }, [resolvedOpen, shouldRenderPersistent, overlay]);
  if (shouldRenderPersistent) {
    if (!resolvedOpen) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntime.jsx(SidebarZIndexProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(
      "aside",
      {
        className: cn(
          sidebarPersistentVariants({ side, size }),
          className,
          contentClassName
        ),
        style: customSizeStyle,
        children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            SidebarHeader,
            {
              heading,
              closeIcon,
              divider,
              onClose: () => handleOpenChange(false)
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto", children })
        ] })
      }
    ) });
  }
  const overlayPortal = overlay && typeof document !== "undefined" ? ReactDOM__namespace.createPortal(
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        "aria-hidden": "true",
        className: cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity",
          resolvedOpen ? "opacity-100 duration-300 ease-out pointer-events-auto" : "opacity-0 duration-200 ease-in pointer-events-none"
        ),
        onClick: () => {
          if (closeOnOutsideClick) handleOpenChange(false);
        }
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    overlayPortal,
    /* @__PURE__ */ jsxRuntime.jsxs(Drawer, { open: resolvedOpen, onOpenChange: handleOpenChange, modal: false, children: [
      trigger ? /* @__PURE__ */ jsxRuntime.jsx(DrawerTrigger, { asChild: true, children: trigger }) : null,
      /* @__PURE__ */ jsxRuntime.jsx(
        DrawerContent,
        {
          "aria-label": `${side} sidebar`,
          "data-side": side,
          onInteractOutside: (event) => {
            if (overlay) {
              event.preventDefault();
              return;
            }
            if (!closeOnOutsideClick) {
              event.preventDefault();
            } else {
              handleOpenChange(false);
            }
          },
          className: cn(
            sidebarContentVariants({ side, size }),
            className,
            contentClassName
          ),
          style: { ...animDurationStyle, ...customSizeStyle },
          children: /* @__PURE__ */ jsxRuntime.jsx(SidebarZIndexProvider, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              SidebarHeader,
              {
                heading,
                closeIcon,
                divider,
                onClose: () => handleOpenChange(false)
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-0 flex-1 overflow-y-auto", children })
          ] }) })
        }
      )
    ] })
  ] });
}
var iconBadgeVariants = classVarianceAuthority.cva(
  [
    "relative inline-flex size-14 sm:size-20 items-center justify-center rounded-full",
    "before:absolute before:inset-[-6px] sm:before:inset-[-10px] before:rounded-full before:border"
  ].join(" "),
  {
    variants: {
      variant: {
        success: "bg-emerald-50 text-emerald-600 before:border-emerald-200",
        error: "bg-red-50 text-red-500 before:border-red-200",
        warning: "bg-amber-50 text-amber-500 before:border-amber-200",
        info: "bg-sky-50 text-sky-500 before:border-sky-200",
        question: "bg-violet-50 text-violet-600 before:border-violet-200"
      }
    },
    defaultVariants: { variant: "info" }
  }
);
var VARIANT_ICONS = {
  success: lucideReact.Check,
  error: lucideReact.X,
  warning: lucideReact.AlertTriangle,
  info: lucideReact.Info,
  question: lucideReact.HelpCircle
};
var ICON_ANIM = {
  success: "uengage-icon-success",
  error: "uengage-icon-error",
  warning: "uengage-icon-warning",
  info: "uengage-icon-info",
  question: "uengage-icon-question"
};
function DialogBody({
  icon,
  variant,
  title,
  text,
  description,
  size = "default",
  confirmButtonText = "OK",
  cancelButtonText = "Cancel",
  showCancelButton = false,
  confirmButtonVariant = "primary",
  cancelButtonVariant = "secondary",
  showActions = true,
  footer,
  input,
  inputPlaceholder,
  inputValue,
  onInputChange,
  inputError,
  submitError,
  loading,
  onConfirm,
  onDismiss,
  className,
  onEscapeKeyDown,
  overlayOnClick
}) {
  const resolvedVariant = variant ?? (typeof icon === "string" && icon in VARIANT_ICONS ? icon : "info");
  const Icon = typeof icon === "function" ? icon : VARIANT_ICONS[resolvedVariant] ?? lucideReact.Info;
  const bodyText = text ?? description;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogContent,
    {
      size,
      "aria-label": "Alert dialog",
      className: cn(
        "gap-0 rounded-2xl border-0 shadow-2xl px-4 py-6 sm:px-8 sm:py-10 text-center",
        size === "sm" ? "sm:max-w-xs" : "sm:max-w-md",
        className
      ),
      onEscapeKeyDown,
      overlayProps: overlayOnClick ? { onClick: overlayOnClick } : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-center gap-4 sm:gap-6", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn(iconBadgeVariants({ variant: resolvedVariant }), ICON_ANIM[resolvedVariant]), children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { className: "size-7 sm:size-10", strokeWidth: 2.5, "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(AlertDialogHeader, { className: "gap-2 sm:text-center sm:place-items-center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(AlertDialogTitle, { className: "text-xl sm:text-2xl font-semibold tracking-tight", children: title }),
          bodyText && /* @__PURE__ */ jsxRuntime.jsx(AlertDialogDescription, { className: "text-sm sm:text-base text-muted-foreground", children: bodyText })
        ] }),
        input && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full text-left", children: [
          input === "textarea" ? /* @__PURE__ */ jsxRuntime.jsx(
            "textarea",
            {
              className: "min-h-20 sm:min-h-24 w-full resize-none rounded-xl border bg-background px-3 sm:px-4 py-2 sm:py-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              placeholder: inputPlaceholder,
              value: String(inputValue ?? ""),
              onChange: (e) => onInputChange(e.target.value),
              disabled: loading
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              className: "h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              placeholder: inputPlaceholder,
              value: String(inputValue ?? ""),
              onChange: (e) => onInputChange(e.target.value),
              disabled: loading
            }
          ),
          inputError && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-2 text-sm text-destructive", children: inputError })
        ] }),
        submitError && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-full rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-left text-sm text-destructive", children: submitError }),
        footer ? /* @__PURE__ */ jsxRuntime.jsx(AlertDialogFooter, { className: "w-full sm:justify-center", children: footer }) : showActions !== false ? /* @__PURE__ */ jsxRuntime.jsxs(AlertDialogFooter, { className: "w-full sm:justify-center", children: [
          showCancelButton && /* @__PURE__ */ jsxRuntime.jsx(Button2, { variant: cancelButtonVariant, disabled: loading, onClick: onDismiss, className: "w-full sm:w-auto", children: cancelButtonText }),
          /* @__PURE__ */ jsxRuntime.jsx(Button2, { variant: confirmButtonVariant, loading, onClick: onConfirm, className: "w-full sm:w-auto", children: confirmButtonText })
        ] }) : null
      ] })
    }
  );
}
function AlertDialog2({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  defaultValue,
  inputValidator,
  preConfirm,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  autoCloseMs,
  className,
  ...options
}) {
  const isControlled = openProp !== void 0;
  const [uncontrolledOpen, setUncontrolledOpen] = React9__namespace.useState(defaultOpen);
  const open = isControlled ? openProp : uncontrolledOpen;
  const [inputValue, setInputValue] = React9__namespace.useState(defaultValue ?? "");
  const [inputError, setInputError] = React9__namespace.useState(null);
  const [submitError, setSubmitError] = React9__namespace.useState(null);
  const [loading, setLoading] = React9__namespace.useState(false);
  const setOpen = React9__namespace.useCallback(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  React9__namespace.useEffect(() => {
    if (!open) return;
    setInputValue(defaultValue ?? "");
    setInputError(null);
    setSubmitError(null);
    setLoading(false);
  }, [open]);
  React9__namespace.useEffect(() => {
    if (!open || !autoCloseMs || loading) return;
    const id = window.setTimeout(() => setOpen(false), autoCloseMs);
    return () => window.clearTimeout(id);
  }, [open, autoCloseMs, loading]);
  const dismiss = React9__namespace.useCallback(() => setOpen(false), [setOpen]);
  const confirm = React9__namespace.useCallback(async () => {
    const validationError = inputValidator?.(inputValue);
    if (validationError) {
      setInputError(validationError);
      return;
    }
    if (!preConfirm) {
      setOpen(false);
      return;
    }
    try {
      setLoading(true);
      setSubmitError(null);
      await preConfirm(inputValue);
      setOpen(false);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }, [inputValue, inputValidator, preConfirm, setOpen]);
  return /* @__PURE__ */ jsxRuntime.jsxs(AlertDialog, { open, onOpenChange: setOpen, children: [
    trigger && /* @__PURE__ */ jsxRuntime.jsx(AlertDialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntime.jsx(
      DialogBody,
      {
        ...options,
        defaultValue,
        inputValue,
        onInputChange: (v) => {
          setInputValue(v);
          setInputError(null);
          setSubmitError(null);
        },
        inputError,
        submitError,
        loading,
        onConfirm: confirm,
        onDismiss: dismiss,
        className,
        onEscapeKeyDown: (e) => {
          if (!closeOnEsc) e.preventDefault();
        },
        overlayOnClick: closeOnOverlayClick ? dismiss : void 0
      }
    )
  ] });
}
var SweetAlertContext = React9__namespace.createContext(null);
function useSweetAlert() {
  const ctx = React9__namespace.useContext(SweetAlertContext);
  if (!ctx) throw new Error("useSweetAlert must be used inside <SweetAlertProvider>");
  return ctx;
}
function SweetAlertProvider({ children }) {
  const [queue, setQueue] = React9__namespace.useState([]);
  const counter = React9__namespace.useRef(0);
  const fire = React9__namespace.useCallback(
    (options) => new Promise((resolve) => {
      counter.current += 1;
      setQueue((q) => [...q, { id: counter.current, options, resolve }]);
    }),
    []
  );
  const ctx = React9__namespace.useMemo(() => ({ fire }), [fire]);
  return /* @__PURE__ */ jsxRuntime.jsxs(SweetAlertContext.Provider, { value: ctx, children: [
    children,
    queue[0] && /* @__PURE__ */ jsxRuntime.jsx(
      SweetAlertInstance,
      {
        pending: queue[0],
        onDone: () => setQueue((q) => q.slice(1))
      },
      queue[0].id
    )
  ] });
}
function SweetAlertInstance({
  pending,
  onDone
}) {
  const [open, setOpen] = React9__namespace.useState(true);
  const resolvedRef = React9__namespace.useRef(false);
  const close = React9__namespace.useCallback(() => setOpen(false), []);
  const handlePreConfirm = React9__namespace.useCallback(
    async (value) => {
      await pending.options.preConfirm?.(value);
      resolvedRef.current = true;
      pending.resolve({ isConfirmed: true, isDismissed: false, value });
      close();
    },
    [pending, close]
  );
  const handleOpenChange = React9__namespace.useCallback(
    (next) => {
      if (!next && !resolvedRef.current) {
        resolvedRef.current = true;
        pending.resolve({ isConfirmed: false, isDismissed: true });
        close();
      }
    },
    [pending, close]
  );
  React9__namespace.useEffect(() => {
    if (!open) {
      const id = window.setTimeout(onDone, 200);
      return () => window.clearTimeout(id);
    }
  }, [open, onDone]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialog2,
    {
      ...pending.options,
      open,
      preConfirm: handlePreConfirm,
      onOpenChange: handleOpenChange
    }
  );
}

// src/utils/colors.ts
var brand = {
  green: {
    paleGreen: "#C8E7B8",
    lightGreen: "#A5C993",
    softGreen: "#7AB368",
    mintGreen: "#2ACB8D",
    green: "#00A86B",
    darkGreen: "#006F42",
    forestGreen: "#1F5E2C",
    deepGreen: "#003C1B",
    darkerGreen: "#002310",
    darkestGreen: "#001E00"
  }
};
({
  /** Primary brand color — canonical green for checked, active, focused states. */
  primary: brand.green.darkGreen,
  /** Darker primary for focus outlines on light surfaces. */
  primaryDark: brand.green.forestGreen,
  /** Lightest checked/active green for indicators (radio dot, toggle thumb). */
  primaryDeep: brand.green.deepGreen});
var modalSizeVariants = classVarianceAuthority.cva("bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-hidden flex flex-col w-full", {
  variants: {
    size: {
      small: "max-w-md",
      medium: "max-w-2xl",
      md: "max-w-3xl",
      default: "max-w-4xl",
      large: "max-w-6xl",
      full: "max-w-7xl"
    }
  },
  defaultVariants: { size: "default" }
});
function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "default",
  showCloseButton = true,
  closeIcon,
  headerClassName,
  bodyClassName,
  modalClassName
}) {
  const mouseDownOnBackdropRef = React9__namespace.useRef(false);
  React9__namespace.useEffect(() => {
    if (!isOpen) return;
    lockBodyScroll();
    return unlockBodyScroll;
  }, [isOpen]);
  if (!isOpen) return null;
  const handleBackdropMouseDown = (e) => {
    mouseDownOnBackdropRef.current = e.target === e.currentTarget;
  };
  const handleBackdropClick = (e) => {
    const shouldClose = e.target === e.currentTarget && mouseDownOnBackdropRef.current;
    mouseDownOnBackdropRef.current = false;
    if (shouldClose) onClose();
  };
  const modal = /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: "fixed inset-0 bg-[#00000066] flex items-center justify-center px-4 outline-none",
      style: { zIndex: 9999 },
      onMouseDown: handleBackdropMouseDown,
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn(modalSizeVariants({ size }), modalClassName), children: [
        (title || showCloseButton) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex justify-between items-center border-b border-gray-300 p-2", headerClassName), children: [
          title && /* @__PURE__ */ jsxRuntime.jsx("h5", { className: "text-lg p-2 font-bold", children: title }),
          showCloseButton && /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              className: "rounded-md transition-colors font-bold text-lg cursor-pointer p-2 text-gray-600 hover:text-gray-900",
              onClick: onClose,
              "aria-label": "Close modal",
              children: closeIcon ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "size-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(ModalZIndexProvider, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("flex-1 overflow-y-auto p-4 outline-none", bodyClassName), children }) })
      ] })
    }
  );
  return ReactDOM__namespace.createPortal(modal, document.body);
}
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: cn("mx-auto flex w-full justify-center", className),
      ...props
    }
  );
}
function PaginationContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ul",
    {
      "data-slot": "pagination-content",
      className: cn("flex flex-row items-center gap-1", className),
      ...props
    }
  );
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("li", { "data-slot": "pagination-item", ...props });
}
var pageButtonVariants = classVarianceAuthority.cva(
  `relative z-10 inline-flex items-center justify-center leading-none rounded-full transition-colors duration-150 ease-in-out outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "min-w-7 h-7 px-1.5 text-sm",
        md: "min-w-7 h-7 px-1.5 text-sm sm:min-w-10 sm:h-10 sm:px-2 sm:text-base",
        lg: "min-w-10 h-10 px-2 text-base sm:min-w-12 sm:h-12 sm:px-3 sm:text-lg"
      },
      state: {
        default: "bg-transparent text-[#202020] font-semibold hover:bg-[#EFF8EA] cursor-pointer",
        active: "bg-transparent text-white font-bold cursor-pointer",
        disabled: "text-gray-300 pointer-events-none cursor-default"
      }
    },
    defaultVariants: {
      size: "md",
      state: "default"
    }
  }
);
var chevronButtonVariants = classVarianceAuthority.cva(
  `inline-flex items-center justify-center rounded-full transition-colors outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "w-7 h-7 text-sm",
        md: "w-7 h-7 text-sm sm:w-10 sm:h-10 sm:text-base",
        lg: "w-10 h-10 text-base sm:w-12 sm:h-12 sm:text-lg"
      },
      state: {
        default: "text-gray-400 hover:bg-[#EFF8EA] cursor-pointer",
        disabled: "text-gray-200 pointer-events-none cursor-default"
      }
    },
    defaultVariants: {
      size: "md",
      state: "default"
    }
  }
);
function usePagination({
  currentPage,
  totalPages,
  siblingCount = 1
}) {
  if (totalPages <= 1) return [1];
  const siblingStart = Math.max(2, currentPage - siblingCount);
  const siblingEnd = Math.min(totalPages - 1, currentPage + siblingCount);
  const pages = [1];
  if (siblingStart > 2) {
    pages.push("...");
  }
  for (let i = siblingStart; i <= siblingEnd; i++) {
    pages.push(i);
  }
  if (siblingEnd < totalPages - 1) {
    pages.push("...");
  }
  pages.push(totalPages);
  return pages;
}
var ellipsisSizeClass = {
  sm: "w-7 h-7 text-sm",
  md: "w-7 h-7 text-sm sm:w-10 sm:h-10 sm:text-base",
  lg: "w-10 h-10 text-base sm:w-12 sm:h-12 sm:text-lg"
};
function Pagination2({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  size = "md",
  disabled = false,
  className
}) {
  const pages = usePagination({ currentPage, totalPages, siblingCount });
  const isPrevDisabled = disabled || currentPage === 1;
  const isNextDisabled = disabled || currentPage === totalPages;
  const containerRef = React9.useRef(null);
  const buttonRefs = React9.useRef(/* @__PURE__ */ new Map());
  const [pill, setPill] = React9.useState(null);
  const firstRender = React9.useRef(true);
  React9.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measurePill = (animated) => {
      const btn = buttonRefs.current.get(currentPage);
      if (!btn) return;
      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();
      setPill({
        x: bRect.left - cRect.left,
        y: bRect.top - cRect.top,
        w: bRect.width,
        h: bRect.height,
        animated
      });
    };
    const shouldAnimate = !firstRender.current;
    firstRender.current = false;
    measurePill(shouldAnimate);
    const observer = new ResizeObserver(() => measurePill(false));
    observer.observe(container);
    return () => observer.disconnect();
  }, [currentPage, totalPages, siblingCount]);
  return /* @__PURE__ */ jsxRuntime.jsx(Pagination, { className: cn("mx-auto flex w-full justify-center", className), children: /* @__PURE__ */ jsxRuntime.jsxs(
    PaginationContent,
    {
      ref: containerRef,
      className: "relative flex flex-row flex-wrap items-center justify-center gap-1",
      children: [
        pill && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            "aria-hidden": true,
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate(${pill.x}px, ${pill.y}px)`,
              width: pill.w,
              height: pill.h,
              background: "#003C1B",
              borderRadius: "9999px",
              transition: pill.animated ? "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1), height 300ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
              pointerEvents: "none",
              zIndex: 0
            }
          }
        ),
        showFirstLast && /* @__PURE__ */ jsxRuntime.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Go to first page",
            onClick: () => onPageChange(1),
            className: chevronButtonVariants({
              size,
              state: isPrevDisabled ? "disabled" : "default"
            }),
            disabled: isPrevDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsLeft, { className: "size-4" })
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Go to previous page",
            onClick: () => onPageChange(currentPage - 1),
            className: chevronButtonVariants({
              size,
              state: isPrevDisabled ? "disabled" : "default"
            }),
            disabled: isPrevDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "size-4" })
          }
        ) }),
        pages.map(
          (page, index) => page === "..." ? /* @__PURE__ */ jsxRuntime.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              "aria-hidden": true,
              className: cn(
                "inline-flex items-center justify-center text-gray-400 select-none",
                ellipsisSizeClass[size ?? "md"]
              ),
              children: "..."
            }
          ) }, `ellipsis-${index}`) : /* @__PURE__ */ jsxRuntime.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              ref: (el) => {
                if (el) buttonRefs.current.set(page, el);
                else buttonRefs.current.delete(page);
              },
              type: "button",
              "aria-label": `Go to page ${page}`,
              "aria-current": page === currentPage ? "page" : void 0,
              onClick: () => onPageChange(page),
              className: pageButtonVariants({
                size,
                state: disabled ? "disabled" : page === currentPage ? "active" : "default"
              }),
              disabled,
              children: page
            }
          ) }, page)
        ),
        /* @__PURE__ */ jsxRuntime.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Go to next page",
            onClick: () => onPageChange(currentPage + 1),
            className: chevronButtonVariants({
              size,
              state: isNextDisabled ? "disabled" : "default"
            }),
            disabled: isNextDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "size-4" })
          }
        ) }),
        showFirstLast && /* @__PURE__ */ jsxRuntime.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Go to last page",
            onClick: () => onPageChange(totalPages),
            className: chevronButtonVariants({
              size,
              state: isNextDisabled ? "disabled" : "default"
            }),
            disabled: isNextDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsRight, { className: "size-4" })
          }
        ) })
      ]
    }
  ) });
}
function UengageProvider({ children, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("uengage-ui", className), children });
}

// src/assets/uEngage_icon.png
var uEngage_icon_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAAD7CAYAAABOrvnfAAAEHklEQVR4nO3d0U1jSRCG0WKFSIocCJYcSIoX9mE00uwsxjb4uqv6PyeCEre/rmujGaoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuMTD6gG+8vTy/LF6hku8v761/jnuott5mPjc2w7c7eGeM/HhT9L5PEx69v+sHgDO6Rz7NIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKnvffXt4fVM+xC8IzQNfquc53yuHoAuNS0uDqy4SGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CHI4+oB4BJPL88fq2f4zPvr28PqGa5hw8MPdL2IThE87U2LqjPBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDB34h/0cUEgocggocggocggocggocggocggocggocggocggocggocggocggocggocggocggocggocggr8h/+vNMd5f3x5Wz3BK59k+87h6ALjEtLC6suEhiOBvzGs9nQkegggeggj+AF7r6UrwEKRt8H4NA7fXNvjpvNbTkeAhiOAPZMvTjeAPJno6aR28L+7gtloHvwtbni4EfyeipwPBQxDB35Etz2rtg9/tizvRs1L74HckelYR/CKiZ4URwe/2Wv+b6Lm3EcHvTPTck+AbED33IvgmRM89jPpsnBLFrt9ZsJ4N31DKxcb9jdskaTHY9tySDd9c2gXHsUZuj9QIbHt+yoYf5Onl+SP1suM2xm4MB/8XW59r2PDD2fpcY/R2cNC/Zvvzt9EHQvDHc2nsZfzDFD2rTLwMfYaHb5q4bMYHP/GWhVXGB18lerjUFsEDl9kmeFseztsm+CrRwzlbBQ98bbvgbXk4bbvgq0QPp2wZfJXo4TPbBg/839bB2/LwX1sHXyV6+NP2wVeJHn6LCL5K9FAVFHyV6CEq+CrRky0u+CrRkysy+CrRkyk2+CrRkyc6+CrRkyU++Kpf0QufBIL/g+jZneD/Inp2JvhPiJ5dCf4En+vZkeDPED47EfyFRM8OBH8F257pBP8Nwmcqwf+A6JlG8D9k2zOJg3qAiX83nO+Zdtnb8Aew9elK8AcSPt04jHfmdX8v0y70UcPuyAUwm+D5MZfAHILnEC6BfqbFXiV4rpBy6UwMGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDb+hd78es6KyZOZAAAAABJRU5ErkJggg==";
function Loader(_props) {
  const [mounted, setMounted] = React9__namespace.useState(false);
  React9__namespace.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ue-loader-overlay", role: "status", "aria-label": "Loading", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "ue-loader", children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ue-inner-loader" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      "img",
      {
        src: uEngage_icon_default,
        alt: "uEngage",
        width: 60,
        height: 60,
        draggable: false
      }
    )
  ] }) });
}
Loader.displayName = "Loader";
function AppHeader({
  logo,
  logoZoneWidth = 252,
  center,
  right,
  divider = true,
  className,
  style,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "header",
    {
      "data-slot": "app-header",
      className: cn(
        "uengage-ui fixed left-0 right-0 top-0 z-30 w-full bg-white",
        className
      ),
      style,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            "data-slot": "app-header-inner",
            className: "flex min-h-[56px] items-center justify-between px-[10px] py-[4px] sm:min-h-[64px] sm:px-[13px] sm:py-[6px]",
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "div",
                {
                  "data-slot": "app-header-left",
                  className: "flex min-w-0 flex-1 items-center",
                  children: [
                    logo != null && /* @__PURE__ */ jsxRuntime.jsx(
                      "div",
                      {
                        "data-slot": "app-header-logo",
                        className: "hidden shrink-0 items-center md:flex",
                        style: { width: toCssSize(logoZoneWidth) },
                        children: logo
                      }
                    ),
                    center != null && /* @__PURE__ */ jsxRuntime.jsx(
                      "div",
                      {
                        "data-slot": "app-header-center",
                        className: "min-w-0 flex-[0_0_69%] md:w-auto md:flex-none",
                        children: center
                      }
                    )
                  ]
                }
              ),
              right != null && /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  "data-slot": "app-header-right",
                  className: "flex shrink-0 items-center gap-[2vw] md:gap-[2px]",
                  children: right
                }
              )
            ]
          }
        ),
        divider && /* @__PURE__ */ jsxRuntime.jsx(Separator, { "data-slot": "app-header-divider" })
      ]
    }
  );
}
AppHeader.displayName = "AppHeader";
function AppSidebar({
  products = [],
  modules = [],
  activeProductId,
  activeModulePage,
  onProductSelect,
  onModuleClick,
  collapsed = false,
  offsetTop = 64,
  footer,
  className,
  style,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("style", { children: `
        [data-slot="app-sidebar-modules-scroll"] {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          transition: scrollbar-color 0.3s ease;
        }
        [data-slot="app-sidebar-modules-scroll"]:hover {
          scrollbar-color: #006F42 transparent;
        }
        [data-slot="app-sidebar-modules-scroll"]::-webkit-scrollbar {
          width: 2px;
        }
        [data-slot="app-sidebar-modules-scroll"]::-webkit-scrollbar-track {
          background: transparent;
          margin-block: 6px;
        }
        [data-slot="app-sidebar-modules-scroll"]::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 9999px;
          transition: background-color 0.3s ease;
        }
        [data-slot="app-sidebar-modules-scroll"]:hover::-webkit-scrollbar-thumb {
          background-color: #006F42;
        }
        [data-slot="app-sidebar-modules-scroll"]::-webkit-scrollbar-thumb:hover {
          background-color: #1f6b40;

          }
      ` }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      "aside",
      {
        "data-slot": "app-sidebar",
        "data-collapsed": collapsed,
        className: cn(
          "uengage-ui fixed bottom-0 left-0 z-40 flex w-full flex-col md:w-[240px]",
          "bg-white transition-transform duration-[250ms] ease-in-out",
          collapsed && "-translate-x-full",
          className
        ),
        style: { top: toCssSize(offsetTop), ...style },
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                "data-slot": "app-sidebar-products",
                className: "relative flex w-[35%] flex-col items-end bg-white",
                children: products.map((product) => {
                  const isActive = product.id === activeProductId;
                  return /* @__PURE__ */ jsxRuntime.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-active": isActive,
                      onClick: () => onProductSelect?.(product),
                      className: cn(
                        "mt-2 flex h-[70px] w-[70px] cursor-pointer flex-col items-center justify-center rounded-l-lg transition-colors",
                        isActive ? "bg-[#C8E7B8]" : "hover:bg-[#E3F5E3]"
                      ),
                      children: [
                        product.icon != null && /* @__PURE__ */ jsxRuntime.jsx(
                          "span",
                          {
                            "data-slot": "app-sidebar-product-icon",
                            className: "shrink-0 [&_svg]:h-[13px] [&_svg]:w-[13px]",
                            children: product.icon
                          }
                        ),
                        /* @__PURE__ */ jsxRuntime.jsx(
                          "span",
                          {
                            "data-slot": "app-sidebar-product-name",
                            className: "mt-1.5 text-center text-[0.75rem] font-bold text-[#003C1B]",
                            children: product.name.split(" ").map((word, i) => /* @__PURE__ */ jsxRuntime.jsx("span", { className: "block", children: word }, i))
                          }
                        )
                      ]
                    },
                    product.id
                  );
                })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                "data-slot": "app-sidebar-modules",
                className: "flex h-full w-[65%] flex-col bg-white",
                style: {
                  borderLeft: "1px solid",
                  borderImage: "linear-gradient(134.33deg, #C8E7B8 3.98%, #00A86B 104.92%) 1"
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    "data-slot": "app-sidebar-modules-scroll",
                    className: "mt-2 flex-1 cursor-pointer overflow-y-auto",
                    children: modules.map((module, index) => {
                      const isActive = module.page === activeModulePage;
                      return /* @__PURE__ */ jsxRuntime.jsxs(React9__namespace.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntime.jsx(
                          "button",
                          {
                            type: "button",
                            "data-active": isActive,
                            onClick: () => onModuleClick?.(module),
                            className: cn(
                              "w-[90%] cursor-pointer rounded-r-lg py-[13px] pl-2 text-left text-[14px] text-[#003C1B] transition-all",
                              isActive ? "border-[#003C1B] bg-[#C8E7B8] font-bold" : "font-semibold hover:bg-[#E8F5E3]"
                            ),
                            children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "block w-full whitespace-normal break-normal", children: module.label })
                          }
                        ),
                        !isActive && modules[index + 1]?.page !== activeModulePage && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-[85%] border-b border-[#E0E0E0]" })
                      ] }, module.page);
                    })
                  }
                )
              }
            )
          ] }),
          footer != null && /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              "data-slot": "app-sidebar-footer",
              className: "w-full shrink-0 border-t bg-white",
              children: footer
            }
          )
        ]
      }
    )
  ] });
}
AppSidebar.displayName = "AppSidebar";
var accordionRootVariants = classVarianceAuthority.cva("w-full", {
  variants: {
    variant: {
      default: "divide-y divide-[#E5E7EB]",
      ghost: "",
      bordered: "flex flex-col gap-2"
    }
  },
  defaultVariants: { variant: "default" }
});
var accordionItemVariants = classVarianceAuthority.cva("group", {
  variants: {
    variant: {
      default: "",
      ghost: "border-b border-[#E5E7EB] last:border-b-0",
      bordered: "border border-[#E5E7EB] rounded-xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
    }
  },
  defaultVariants: { variant: "default" }
});
var accordionTriggerVariants = classVarianceAuthority.cva(
  [
    "flex w-full items-center gap-3 font-medium outline-none",
    "transition-colors duration-200 cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-40",
    FOCUS_RING
  ].join(" "),
  {
    variants: {
      variant: {
        default: "hover:bg-[#F9FAFB] rounded-lg",
        ghost: "hover:text-[#006F42]",
        bordered: "hover:bg-[#F9FAFB]"
      },
      size: {
        sm: "px-3 py-2.5 text-[12px] sm:text-[13px]",
        md: "px-4 py-3 text-[13px] sm:text-[14px]",
        lg: "px-5 py-4 text-[14px] sm:text-[15px]"
      },
      state: {
        open: "text-[#006F42]",
        closed: "text-[#374151]"
      }
    },
    defaultVariants: { variant: "default", size: "md", state: "closed" }
  }
);
var accordionContentVariants = classVarianceAuthority.cva(
  "text-[#6B7280] leading-relaxed",
  {
    variants: {
      variant: {
        default: "",
        ghost: "",
        bordered: ""
      },
      size: {
        sm: "px-3 pb-3 text-[11px] sm:text-[12px]",
        md: "px-4 pb-4 text-[12px] sm:text-[13px]",
        lg: "px-5 pb-5 text-[13px] sm:text-[14px]"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
);
function AccordionItems({
  items,
  variant,
  size
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Accordion.Item,
    {
      value: item.value,
      disabled: item.disabled,
      className: accordionItemVariants({ variant }),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(radixUi.Accordion.Header, { className: "flex", children: /* @__PURE__ */ jsxRuntime.jsxs(
          radixUi.Accordion.Trigger,
          {
            className: cn(
              accordionTriggerVariants({ variant, size }),
              "data-[state=open]:text-[#006F42] w-full"
            ),
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2.5 min-w-0", children: [
                item.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 [&_svg]:size-4", children: item.icon }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate text-left", children: item.title })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ml-auto flex items-center gap-2", children: [
                item.action && /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    className: "shrink-0",
                    onClick: (e) => e.stopPropagation(),
                    children: item.action
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  lucideReact.ChevronDown,
                  {
                    className: "size-4 shrink-0 text-[#9CA3AF] transition-transform duration-200 group-data-[state=open]:rotate-180",
                    "aria-hidden": true
                  }
                )
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(radixUi.Accordion.Content, { className: "overflow-hidden will-change-[height] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: accordionContentVariants({ variant, size }), children: item.content }) })
      ]
    },
    item.value
  )) });
}
function Accordion(props) {
  const { items, variant = "default", size = "md", className } = props;
  const rootClass = cn(accordionRootVariants({ variant }), className);
  if (props.type === "multiple") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      radixUi.Accordion.Root,
      {
        type: "multiple",
        value: props.value,
        defaultValue: props.defaultValue,
        onValueChange: props.onChange,
        className: rootClass,
        children: /* @__PURE__ */ jsxRuntime.jsx(AccordionItems, { items, variant, size })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Accordion.Root,
    {
      type: "single",
      collapsible: props.collapsible ?? true,
      value: props.value,
      defaultValue: props.defaultValue,
      onValueChange: props.onChange,
      className: rootClass,
      children: /* @__PURE__ */ jsxRuntime.jsx(AccordionItems, { items, variant, size })
    }
  );
}
Accordion.displayName = "Accordion";
function findDatePickerInTree(node) {
  if (!React9__namespace.isValidElement(node)) return null;
  const props = node.props;
  if (node.type.displayName === "DatePicker" && props.open === void 0) {
    return node;
  }
  const children = props.children;
  if (!children) return null;
  for (const child of React9__namespace.Children.toArray(children)) {
    const found = findDatePickerInTree(child);
    if (found) return found;
  }
  return null;
}
function InlineDatePickerPanel({ child }) {
  const p = child.props;
  const mode = p.mode ?? "single";
  const minDate = p.minDate;
  const maxDate = p.maxDate;
  const onChange = p.onChange;
  const [committed, setCommitted] = React9__namespace.useState(
    p.value ?? null
  );
  React9__namespace.useEffect(() => {
    if (p.value !== void 0) setCommitted(p.value ?? null);
  }, [p.value]);
  const [pendingFrom, setPendingFrom] = React9__namespace.useState(null);
  const [draftRange, setDraftRange] = React9__namespace.useState(null);
  const [hoverDate, setHoverDate] = React9__namespace.useState(null);
  const isRange = (v) => !!v && typeof v === "object" && "from" in v;
  const orderedRange2 = (a, b) => a <= b ? { from: a, to: b } : { from: b, to: a };
  const calendarDisabled = React9__namespace.useMemo(() => {
    const m = [];
    if (minDate) m.push({ before: minDate });
    if (maxDate) m.push({ after: maxDate });
    return m.length ? m : void 0;
  }, [minDate, maxDate]);
  const effectiveRange = React9__namespace.useMemo(() => {
    if (mode !== "range") return null;
    const existing = draftRange ?? (isRange(committed) ? committed : null);
    if (pendingFrom)
      return hoverDate ? orderedRange2(pendingFrom, hoverDate) : { from: pendingFrom };
    return existing;
  }, [mode, committed, pendingFrom, draftRange, hoverDate]);
  const calendarSelected = React9__namespace.useMemo(() => {
    if (mode === "single") return committed instanceof Date ? committed : void 0;
    return effectiveRange ?? void 0;
  }, [mode, committed, effectiveRange]);
  const fromLabel = effectiveRange ? formatDate(effectiveRange.from) : null;
  const toLabel = effectiveRange && "to" in effectiveRange && effectiveRange.to ? formatDate(effectiveRange.to) : null;
  const handleDayClick = (date, modifiers) => {
    if (modifiers.disabled) return;
    if (mode === "single") {
      setCommitted(date);
      onChange?.(date);
      return;
    }
    if (pendingFrom === null) {
      setPendingFrom(date);
      setDraftRange(null);
      setHoverDate(null);
    } else {
      const range = orderedRange2(pendingFrom, date);
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(range);
      setCommitted(range);
      onChange?.(range);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex w-full flex-col", children: [
    mode === "range" && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-2 px-4 pt-4", children: [fromLabel, toLabel].map((lbl, i) => /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: cn(
          "flex h-9 flex-1 items-center justify-center rounded-lg border text-sm transition-colors",
          lbl ? "border-[#006F42] text-[#111827]" : "border-[#D1D5DB] text-[#C4C9D2]"
        ),
        children: lbl ?? "\u2014"
      },
      i
    )) }),
    mode === "month" && /* @__PURE__ */ jsxRuntime.jsx(
      MonthPickerCalendar,
      {
        selected: committed instanceof Date ? committed : null,
        minDate,
        maxDate,
        onSelect: (date) => {
          setCommitted(date);
          onChange?.(date);
        },
        className: "w-full"
      }
    ),
    mode !== "month" && /* @__PURE__ */ jsxRuntime.jsx(
      DatePickerCalendar,
      {
        mode,
        selected: calendarSelected,
        disabled: calendarDisabled,
        minDate,
        maxDate,
        onDayClick: handleDayClick,
        onDayMouseEnter: (date) => {
          if (pendingFrom) {
            setHoverDate(date);
            return;
          }
          const ex = draftRange ?? (isRange(committed) ? committed : null);
          setHoverDate(ex && "to" in ex && (date < ex.from || date > ex.to) ? date : null);
        },
        onDayMouseLeave: () => setHoverDate(null),
        className: "w-full"
      }
    )
  ] });
}
function FilterGroup({
  children,
  labels,
  onApply,
  onReset,
  onClose,
  drawerTitle = "Filters",
  activeCount,
  className,
  drawerClassName,
  forceDrawer = false
}) {
  const [open, setOpen] = React9__namespace.useState(false);
  const [activeIndex, setActiveIndex] = React9__namespace.useState(0);
  const programmaticClose = React9__namespace.useRef(false);
  const childArray = React9__namespace.Children.toArray(children);
  const items = childArray.map((child, i) => ({
    label: labels[i] ?? `Filter ${i + 1}`,
    content: child
  }));
  const activeItem = items[activeIndex] ?? items[0];
  const handleOpenChange = (next) => {
    if (!next && !programmaticClose.current) onClose?.();
    programmaticClose.current = false;
    setOpen(next);
  };
  const handleApply = () => {
    programmaticClose.current = true;
    onApply?.();
    setOpen(false);
  };
  const handleReset = () => {
    programmaticClose.current = true;
    onReset?.();
    setOpen(false);
  };
  const renderRightPanel = (item) => {
    const datePicker = findDatePickerInTree(item.content);
    if (datePicker) {
      return /* @__PURE__ */ jsxRuntime.jsx(InlineDatePickerPanel, { child: datePicker });
    }
    return /* @__PURE__ */ jsxRuntime.jsx(ModalZIndexProvider, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "p-4 [&_span.text-xs]:hidden", children: /* @__PURE__ */ jsxRuntime.jsx(FilterGroupMobileContext.Provider, { value: true, children: item.content }) }) });
  };
  const drawer = /* @__PURE__ */ jsxRuntime.jsxs(Drawer, { open, onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsxRuntime.jsx(DrawerTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
      "button",
      {
        type: "button",
        className: "flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.SlidersHorizontal, { size: 16, className: "text-gray-500" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: drawerTitle }),
          activeCount != null && activeCount > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#006F42] text-white text-[10px] font-bold leading-none", children: activeCount })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(DrawerOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DrawerContent,
      {
        "aria-label": drawerTitle,
        onInteractOutside: (e) => {
          const target = e.target;
          if (target.closest("[data-radix-popper-content-wrapper]")) {
            e.preventDefault();
          }
        },
        className: cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "rounded-t-2xl bg-white",
          "h-[70vh] flex flex-col",
          "translate-y-full data-[state=open]:translate-y-0",
          "transition-transform duration-300 ease-out",
          drawerClassName
        ),
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0", children: [
            /* @__PURE__ */ jsxRuntime.jsx(DrawerTitle, { className: "text-lg font-bold text-gray-900", children: drawerTitle }),
            /* @__PURE__ */ jsxRuntime.jsx(DrawerClose, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                className: "p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors",
                "aria-label": "Close filters",
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 20 })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn(
              "w-28 shrink-0 border-r border-gray-200 overflow-y-auto bg-gray-50",
              "[&::-webkit-scrollbar]:w-1.5",
              "[&::-webkit-scrollbar-track]:bg-gray-100",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-[#006F42]"
            ), style: { scrollbarWidth: "thin", scrollbarColor: "#006F42 #f3f4f6" }, children: items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => setActiveIndex(i),
                className: cn(
                  "w-full text-left px-3 py-4 text-sm border-b border-gray-100 transition-colors",
                  i === activeIndex ? "bg-white text-[#006F42] font-semibold border-l-[3px] border-l-[#006F42]" : "bg-gray-50 text-gray-500 font-normal border-l-[3px] border-l-transparent hover:bg-gray-100"
                ),
                children: item.label
              },
              item.label
            )) }),
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              "[&::-webkit-scrollbar]:w-1.5",
              "[&::-webkit-scrollbar-track]:bg-gray-100",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-[#006F42]"
            ), style: { scrollbarWidth: "thin", scrollbarColor: "#006F42 #f3f4f6" }, children: activeItem && renderRightPanel(activeItem) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-t border-gray-200 shrink-0", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              Button2,
              {
                type: "button",
                variant: "secondary",
                onClick: handleReset,
                className: "flex-1 py-3 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors",
                children: "Reset"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              Button2,
              {
                type: "button",
                onClick: handleApply,
                className: "flex-1 py-3 rounded-full bg-[#006F42] text-white text-sm font-medium hover:bg-[#005a36] active:bg-[#004a2c] transition-colors",
                children: "Apply"
              }
            )
          ] })
        ]
      }
    )
  ] });
  if (forceDrawer) return drawer;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("hidden sm:flex items-center gap-2 flex-wrap", className), children: items.map((item, i) => /* @__PURE__ */ jsxRuntime.jsx(React9__namespace.Fragment, { children: item.content }, i)) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex sm:hidden", children: drawer })
  ] });
}
FilterGroup.displayName = "FilterGroup";
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
var BannerRoot = React9__namespace.forwardRef(
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
var BannerIcon = React9__namespace.forwardRef(({ className, style, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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
var BannerContent = React9__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cn("flex-1 min-w-0 break-normal", className), ...props }));
BannerContent.displayName = "BannerContent";
var DEFAULT_ICONS = {
  info: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Info, {}),
  success: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleCheck, {}),
  error: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleX, {}),
  warning: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.TriangleAlert, {})
};
var CUSTOM_COLOR_KEYS = ["backgroundColor", "borderColor", "iconColor", "textColor"];
function hasCustomColors(props) {
  return CUSTOM_COLOR_KEYS.some((k) => props[k] !== void 0);
}
function Banner({
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
}) {
  const usingCustom = hasCustomColors({ variant, message, children, icon, showIcon, className, backgroundColor, borderColor, iconColor, textColor });
  const customStyle = usingCustom ? {
    ...backgroundColor && { backgroundColor },
    ...borderColor && { borderColor },
    ...textColor && { color: textColor }
  } : {};
  const resolvedIcon = icon ?? DEFAULT_ICONS[variant ?? "info"];
  return /* @__PURE__ */ jsxRuntime.jsxs(
    BannerRoot,
    {
      variant: usingCustom ? void 0 : variant,
      className: cn(className),
      style: { ...customStyle, ...style },
      ...rest,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntime.jsx(
          BannerIcon,
          {
            style: iconColor ? { color: iconColor, ["--banner-icon"]: iconColor } : void 0,
            children: resolvedIcon
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(BannerContent, { children: children ?? message })
      ]
    }
  );
}
Banner.displayName = "Banner";
var SectionContext = React9__namespace.createContext({
  collapsible: false,
  isOpen: true,
  divider: false,
  dividerStyle: "solid"
});
function SectionHeader({
  icon,
  title,
  description,
  action,
  className,
  ...props
}) {
  const { collapsible, isOpen, divider } = React9__namespace.useContext(SectionContext);
  const inner = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-1 min-w-0 flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-[11px] min-w-0 pointer-events-none", children: [
        icon && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            "data-slot": "section-header-icon",
            className: cn(
              "flex-shrink-0 w-[30px] h-[30px] flex items-center justify-center",
              "rounded-md border border-[#C8E7B8] text-[#1F5E2C]",
              "[&>svg]:w-[17px] [&>svg]:h-[17px]",
              collapsible && isOpen ? "bg-[#C8E7B8]" : "bg-[#FAFFF7]"
            ),
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              "data-slot": "section-header-title",
              className: "text-base font-semibold text-[#202020] leading-snug break-words",
              children: title
            }
          ),
          description && /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              "data-slot": "section-header-description",
              className: "text-xs text-[#6B7280] break-words",
              children: description
            }
          )
        ] })
      ] }),
      collapsible && /* @__PURE__ */ jsxRuntime.jsx("div", { "aria-hidden": true, className: "w-7 h-7 flex-shrink-0" }),
      action && /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          "data-slot": "section-header-action",
          className: "pointer-events-auto flex items-center flex-wrap justify-start gap-2 sm:ml-auto",
          onClick: (e) => e.stopPropagation(),
          onKeyDown: (e) => e.stopPropagation(),
          children: action
        }
      )
    ] }),
    collapsible && /* @__PURE__ */ jsxRuntime.jsx(
      "span",
      {
        "data-slot": "section-collapse-indicator",
        className: "absolute right-5 top-3 flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-md text-[#6B7280]",
        "aria-hidden": true,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          lucideReact.ChevronDown,
          {
            size: 16,
            className: cn(
              "transition-transform duration-200",
              isOpen && "rotate-180"
            )
          }
        )
      }
    )
  ] });
  if (collapsible) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(
      radixUi.Collapsible.Trigger,
      {
        "data-slot": "section-header",
        className: cn(
          "relative w-[calc(100%+8px)] flex items-start gap-3 text-left",
          "-mx-1 -mt-1 px-[21px] py-3",
          "data-[state=closed]:-mb-1 data-[state=closed]:pb-[13px]",
          "hover:bg-[#fafff7] transition-colors duration-150",
          "cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7a3b] focus-visible:ring-offset-1",
          className
        ),
        ...props,
        children: inner
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "section-header",
      className: cn(
        "relative flex items-start gap-3 px-5 py-3",
        className
      ),
      ...props,
      children: inner
    }
  );
}
function SectionDivider({
  label,
  orientation = "horizontal",
  height,
  className,
  ...props
}) {
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        "data-slot": "section-divider",
        "data-orientation": "vertical",
        role: "separator",
        "aria-orientation": "vertical",
        className: cn(
          "flex-shrink-0 w-px bg-[#E5E7EB] self-stretch",
          className
        ),
        style: height ? { height } : void 0,
        ...props
      }
    );
  }
  if (label) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        "data-slot": "section-divider",
        "data-orientation": "horizontal",
        className: cn("flex items-center gap-3 -mx-6 px-6", className),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 border-t border-[#E2E2E2]" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs font-medium text-[#6B7280] whitespace-nowrap", children: label }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 border-t border-[#E2E2E2]" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "section-divider",
      "data-orientation": "horizontal",
      role: "separator",
      className: cn(
        "-mx-6 border-t border-[#E2E2E2]",
        className
      ),
      ...props
    }
  );
}
function SectionContent({
  className,
  children,
  ...props
}) {
  const { collapsible, divider, dividerStyle } = React9__namespace.useContext(SectionContext);
  const inner = /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "section-content",
      className: cn("flex flex-col gap-[18px] px-4 pt-4 pb-4", className),
      ...props,
      children
    }
  );
  const headerRule = divider && /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "section-header-rule",
      className: cn(
        "-mx-1 border-t border-[#EEEEEE]",
        dividerStyle === "dashed" && "border-dashed",
        dividerStyle === "dotted" && "border-dotted"
      )
    }
  );
  if (collapsible) {
    return /* @__PURE__ */ jsxRuntime.jsxs(radixUi.Collapsible.Content, { className: "overflow-hidden will-change-[height] data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up", children: [
      headerRule,
      inner
    ] });
  }
  if (divider) {
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      headerRule,
      inner
    ] });
  }
  return inner;
}
function SectionSubsection({
  title,
  titleClassName,
  description,
  separator = true,
  separatorLabel,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { "data-slot": "section-subsection-outer", className: "flex flex-col", children: [
    separator && /* @__PURE__ */ jsxRuntime.jsx(SectionDivider, { label: separatorLabel }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        "data-slot": "section-subsection",
        className: cn("flex flex-col gap-2", separator && "pt-2 pb-2", className),
        ...props,
        children: [
          (title || description) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-0.5", children: [
            title && /* @__PURE__ */ jsxRuntime.jsx("p", { className: cn("text-[11.5px] font-bold uppercase tracking-[.06em] text-[#1F5E2C]", titleClassName), children: title }),
            description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-[#6B7280]", children: description })
          ] }),
          children
        ]
      }
    )
  ] });
}
var COLUMN_CLASSES = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
};
function SectionRow({
  columns = 3,
  dividers = false,
  className,
  style,
  children,
  ...props
}) {
  if (dividers) {
    const items = React9__namespace.Children.toArray(children).filter(Boolean);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        "data-slot": "section-row",
        "data-dividers": "true",
        className: cn("flex items-stretch gap-0", className),
        style,
        ...props,
        children: items.map((child, i) => /* @__PURE__ */ jsxRuntime.jsxs(React9__namespace.Fragment, { children: [
          i > 0 && /* @__PURE__ */ jsxRuntime.jsx(SectionDivider, { orientation: "vertical", className: "mx-5" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex-1 min-w-0", children: child })
        ] }, i))
      }
    );
  }
  const key = String(columns);
  const isPreset = key in COLUMN_CLASSES;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "section-row",
      className: cn(
        "grid gap-x-5 gap-y-[18px]",
        isPreset && COLUMN_CLASSES[key],
        className
      ),
      style: isPreset ? style : { gridTemplateColumns: columns, ...style },
      ...props,
      children
    }
  );
}
var SPAN_CLASSES = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4"
};
function SectionField({ span, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "section-field",
      className: cn(
        "flex flex-col gap-[7px]",
        span && SPAN_CLASSES[span],
        className
      ),
      ...props
    }
  );
}
function SectionTableContent({
  divider = true,
  className,
  children,
  ...props
}) {
  const { collapsible } = React9__namespace.useContext(SectionContext);
  const inner = /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "section-table-content",
      className: cn(
        "overflow-hidden rounded-b-xl",
        divider && "border-t border-[#E5E7EB]",
        className
      ),
      ...props,
      children
    }
  );
  if (collapsible) {
    return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Collapsible.Content, { className: "overflow-hidden will-change-[height] data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up", children: inner });
  }
  return inner;
}
function SectionGroup({
  defaultOpen = 0,
  className,
  children,
  ...props
}) {
  const [openIndex, setOpenIndex] = React9__namespace.useState(defaultOpen);
  const items = React9__namespace.Children.toArray(children).filter(Boolean);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "section-group",
      className: cn("flex flex-col gap-4", className),
      ...props,
      children: items.map((child, i) => {
        if (!React9__namespace.isValidElement(child)) return child;
        return React9__namespace.cloneElement(child, {
          key: i,
          collapsible: true,
          open: openIndex === i,
          onOpenChange: (open) => {
            setOpenIndex(open ? i : null);
          }
        });
      })
    }
  );
}
SectionGroup.displayName = "SectionGroup";
function Section({
  bare = false,
  collapsible = false,
  divider = false,
  dividerStyle = "solid",
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  children,
  ...props
}) {
  const isControlled = openProp !== void 0;
  const [internalOpen, setInternalOpen] = React9__namespace.useState(
    isControlled ? openProp : defaultOpen
  );
  const isOpen = isControlled ? openProp : internalOpen;
  const handleOpenChange = React9__namespace.useCallback(
    (next) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  const cardClass = cn(
    "uengage-ui",
    "flex flex-col gap-0 rounded-xl border border-[#E2E2E2] bg-white",
    "shadow-[2px_2px_4px_0_rgba(0,0,0,0.06)]",
    "overflow-hidden text-sm text-[#202020] p-1",
    className
  );
  const ctx = { collapsible, isOpen, divider, dividerStyle };
  if (bare) {
    return /* @__PURE__ */ jsxRuntime.jsx(SectionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        "data-slot": "section",
        className: cn(
          "flex flex-col gap-0 text-sm text-[#202020]",
          className
        ),
        ...props,
        children
      }
    ) });
  }
  if (collapsible) {
    return /* @__PURE__ */ jsxRuntime.jsx(SectionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsx(radixUi.Collapsible.Root, { open: isOpen, onOpenChange: handleOpenChange, asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(Card, { "data-slot": "section", className: cardClass, ...props, children }) }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(SectionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsx(Card, { "data-slot": "section", className: cardClass, ...props, children }) });
}
Section.displayName = "Section";
var FILE_UPLOAD_COLORS = {
  surface: "#FFFFFF",
  subtle: "#F3F5F9",
  border: "#E2E2E2",
  borderSoft: "#EEEEEE",
  borderStrong: "#C6C6C6",
  ink: "#161616",
  inkFg1: "#202020",
  inkFg2: "#595959",
  inkFg3: "#787878",
  muted: "#9C9C9C",
  /** Dashed dropzone rule, resting. */
  dropBorder: "#C4DCB6",
  /** Dropzone fill, resting. */
  dropBg: "#FAFFF7",
  /** Dropzone fill on hover / drag-over. */
  dropBgActive: "#F2FBEB",
  /** Dashed rule goes solid forest on drag-over. */
  dropBorderActive: "#1F5E2C",
  /** Hairline around the dropzone icon tile and the format chips. */
  dropChipBorder: "#D5E8CA",
  forest: "#1F5E2C",
  deep: "#003C1B",
  mint: "#DCF3CE",
  green: "#00A86B",
  greenInk: "#00795A",
  lime: "#8CC42A",
  /** Outline button border on the compact shape. */
  outlineBorder: "#BFD6C6",
  /** Outline button fill on hover. */
  outlineHoverBg: "#F5FFF0",
  infoBg: "#E4F2FB",
  infoInk: "#0B4A6F",
  infoBar: "#4BADE3",
  warnBg: "#FFF6D6",
  warnBorder: "#EFD98A",
  warnInk: "#6A5300",
  warnInkDeep: "#4A3B00",
  warnOutline: "#E0C866",
  dangerBg: "#FBE9EA",
  dangerBorder: "#F2C8CC",
  dangerOutline: "#E4A6AC",
  dangerInk: "#7A0009",
  dangerBar: "#A8000F",
  /** Translucent white used for tiles/badges sitting on a tinted row. */
  onTint: "rgba(255,255,255,.7)",
  /** Gallery cover ribbon. */
  coverBg: "rgba(0,60,27,.86)",
  coverFg: "#DCF3CE",
  galleryTileBg: "#DCF3CE",
  galleryTileBorder: "#CDE3C0",
  darkDropBg: "#141C17",
  darkDropBorder: "#2C4A38",
  darkTileBg: "#1B3423",
  darkTileFg: "#8CC42A",
  darkTitle: "#E7F0E9",
  darkSub: "#8FB79C"
};
var FILE_UPLOAD_TRANSITION = "border-color 140ms cubic-bezier(.2,.8,.3,1), background-color 140ms cubic-bezier(.2,.8,.3,1), box-shadow 140ms cubic-bezier(.2,.8,.3,1)";
var PROGRESS_TRANSITION = "width 200ms linear";
var FILE_UPLOAD_SIZES = {
  sm: {
    dropPadY: 18,
    dropPadX: 14,
    dropGap: 7,
    dropRadius: 10,
    tile: 32,
    tileRadius: 10,
    tileIcon: 15,
    title: 12,
    sub: 10,
    chip: 8,
    rowPadY: 9,
    rowPadX: 10,
    rowGap: 9,
    rowRadius: 10,
    rowMinHeight: 48,
    extTile: 28,
    extRadius: 8,
    extFont: 8,
    name: 11,
    meta: 9,
    bar: 3,
    action: 24,
    actionFont: 9,
    compactPadY: 8,
    compactPadX: 10,
    compactRadius: 9,
    compactButton: 28,
    avatar: 48,
    avatarBadge: 20,
    avatarInitials: 15,
    galleryPad: 10,
    galleryGap: 7,
    galleryRadius: 9,
    galleryTileRadius: 8
  },
  md: {
    dropPadY: 26,
    dropPadX: 18,
    dropGap: 9,
    dropRadius: 12,
    tile: 40,
    tileRadius: 12,
    tileIcon: 18,
    title: 13,
    sub: 11,
    chip: 9,
    rowPadY: 11,
    rowPadX: 12,
    rowGap: 11,
    rowRadius: 11,
    rowMinHeight: 56,
    extTile: 32,
    extRadius: 9,
    extFont: 9,
    name: 12,
    meta: 10,
    bar: 4,
    action: 26,
    actionFont: 10,
    compactPadY: 10,
    compactPadX: 12,
    compactRadius: 10,
    compactButton: 30,
    avatar: 60,
    avatarBadge: 24,
    avatarInitials: 19,
    galleryPad: 12,
    galleryGap: 8,
    galleryRadius: 10,
    galleryTileRadius: 9
  },
  lg: {
    dropPadY: 34,
    dropPadX: 22,
    dropGap: 11,
    dropRadius: 14,
    tile: 48,
    tileRadius: 14,
    tileIcon: 22,
    title: 15,
    sub: 12,
    chip: 10,
    rowPadY: 13,
    rowPadX: 14,
    rowGap: 13,
    rowRadius: 12,
    rowMinHeight: 64,
    extTile: 36,
    extRadius: 10,
    extFont: 10,
    name: 13,
    meta: 11,
    bar: 5,
    action: 30,
    actionFont: 11,
    compactPadY: 12,
    compactPadX: 14,
    compactRadius: 11,
    compactButton: 34,
    avatar: 76,
    avatarBadge: 28,
    avatarInitials: 24,
    galleryPad: 14,
    galleryGap: 9,
    galleryRadius: 11,
    galleryTileRadius: 10
  }
};
var C = FILE_UPLOAD_COLORS;
var FILE_UPLOAD_STATUS_STYLES = {
  idle: {
    label: "Idle",
    rowBg: C.surface,
    rowBorder: `1px solid ${C.border}`,
    tileBg: C.subtle,
    tileFg: C.inkFg2,
    nameColor: C.ink,
    noteColor: C.muted,
    note: "Ready to upload",
    bar: false,
    barColor: C.green,
    badgeText: "",
    badgeBg: C.subtle,
    badgeFg: C.inkFg2
  },
  queued: {
    label: "Queued",
    rowBg: C.surface,
    rowBorder: `1px solid ${C.border}`,
    tileBg: C.subtle,
    tileFg: C.inkFg2,
    nameColor: C.ink,
    noteColor: C.muted,
    note: "Waiting to upload",
    bar: false,
    barColor: C.green,
    badgeText: "Queued",
    badgeBg: C.subtle,
    badgeFg: C.inkFg2
  },
  uploading: {
    label: "Uploading",
    rowBg: C.surface,
    rowBorder: `1px solid ${C.border}`,
    tileBg: C.mint,
    tileFg: C.deep,
    nameColor: C.ink,
    noteColor: C.muted,
    bar: true,
    barColor: C.green,
    badgeText: "{pct}",
    badgeBg: C.mint,
    badgeFg: C.deep
  },
  processing: {
    label: "Processing",
    rowBg: C.surface,
    rowBorder: `1px solid ${C.border}`,
    tileBg: C.infoBg,
    tileFg: C.infoInk,
    nameColor: C.ink,
    noteColor: C.muted,
    note: "Validating\u2026",
    bar: true,
    barColor: C.infoBar,
    badgeText: "Scanning",
    badgeBg: C.infoBg,
    badgeFg: C.infoInk
  },
  done: {
    label: "Success",
    rowBg: C.surface,
    rowBorder: `1px solid ${C.border}`,
    tileBg: C.mint,
    tileFg: C.deep,
    nameColor: C.ink,
    noteColor: C.greenInk,
    note: "Uploaded",
    bar: false,
    barColor: C.green,
    badgeText: "Done",
    badgeBg: C.mint,
    badgeFg: C.greenInk
  },
  failed: {
    label: "Upload failed",
    rowBg: C.surface,
    rowBorder: `1px solid ${C.dangerBorder}`,
    tileBg: C.dangerBg,
    tileFg: C.dangerInk,
    nameColor: C.ink,
    noteColor: C.dangerInk,
    note: "Connection dropped \u2014 nothing was saved",
    bar: true,
    barColor: C.dangerBar,
    badgeText: "",
    badgeBg: C.dangerBg,
    badgeFg: C.dangerInk,
    action: "retry"
  },
  rejected: {
    label: "Rejected",
    rowBg: C.dangerBg,
    rowBorder: `1px solid ${C.dangerBorder}`,
    tileBg: C.onTint,
    tileFg: C.dangerInk,
    nameColor: C.dangerInk,
    noteColor: C.dangerInk,
    note: "This file was not accepted",
    bar: false,
    barColor: C.dangerBar,
    badgeText: "Rejected",
    badgeBg: C.onTint,
    badgeFg: C.dangerInk
  },
  partial: {
    label: "Partial import",
    rowBg: C.warnBg,
    rowBorder: `1px solid ${C.warnBorder}`,
    tileBg: C.onTint,
    tileFg: C.warnInk,
    nameColor: C.warnInkDeep,
    noteColor: C.warnInk,
    note: "Some rows were skipped",
    bar: false,
    barColor: C.warnInk,
    badgeText: "Review",
    badgeBg: C.onTint,
    badgeFg: C.warnInk
  },
  paused: {
    label: "Paused",
    rowBg: C.subtle,
    rowBorder: `1px solid ${C.border}`,
    tileBg: C.surface,
    tileFg: C.inkFg3,
    nameColor: C.inkFg2,
    noteColor: C.inkFg3,
    note: "Paused \u2014 waiting for a connection.",
    bar: true,
    barColor: C.borderStrong,
    badgeText: "Paused",
    badgeBg: C.surface,
    badgeFg: C.inkFg2
  },
  duplicate: {
    label: "Duplicate file",
    rowBg: C.surface,
    rowBorder: `1px solid ${C.border}`,
    tileBg: C.subtle,
    tileFg: C.inkFg3,
    nameColor: C.inkFg1,
    noteColor: C.inkFg3,
    note: "Already uploaded",
    bar: false,
    barColor: C.green,
    badgeText: "",
    badgeBg: C.subtle,
    badgeFg: C.inkFg2,
    action: "duplicate"
  },
  dimension: {
    label: "Wrong dimensions",
    rowBg: C.warnBg,
    rowBorder: `1px solid ${C.warnBorder}`,
    tileBg: C.onTint,
    tileFg: C.warnInk,
    nameColor: C.warnInkDeep,
    noteColor: C.warnInk,
    note: "Wrong dimensions",
    bar: false,
    barColor: C.warnInk,
    badgeText: "",
    badgeBg: C.onTint,
    badgeFg: C.warnInk,
    action: "crop"
  }
};
function getDropzoneStyle(state, tone = "light") {
  if (tone === "dark") {
    const dark = {
      background: C.darkDropBg,
      border: `1.5px dashed ${C.darkDropBorder}`,
      boxShadow: "none",
      titleColor: C.darkTitle,
      subColor: C.darkSub,
      tileBg: C.darkTileBg,
      tileBorder: "1px solid transparent",
      tileFg: C.darkTileFg,
      chipBg: C.darkTileBg,
      chipBorder: "1px solid transparent",
      chipFg: C.darkTileFg,
      cursor: "pointer"
    };
    if (state === "dragover") {
      return { ...dark, border: `1.5px solid ${C.lime}`, background: "#18221B" };
    }
    if (state === "hover") return { ...dark, background: "#18221B" };
    if (state === "error") {
      return { ...dark, border: `1.5px dashed ${C.dangerOutline}`, subColor: C.dangerOutline };
    }
    if (state === "disabled") return { ...dark, cursor: "not-allowed", opacity: 0.5 };
    return dark;
  }
  const base = {
    background: C.dropBg,
    border: `1.5px dashed ${C.dropBorder}`,
    boxShadow: "none",
    titleColor: C.inkFg1,
    subColor: C.inkFg3,
    tileBg: C.surface,
    tileBorder: `1px solid ${C.dropChipBorder}`,
    tileFg: C.forest,
    chipBg: C.surface,
    chipBorder: `1px solid ${C.dropChipBorder}`,
    chipFg: C.forest,
    cursor: "pointer"
  };
  switch (state) {
    case "hover":
      return { ...base, background: C.dropBgActive, border: `1.5px dashed ${C.dropBorderActive}` };
    case "dragover":
      return {
        ...base,
        background: C.dropBgActive,
        border: `1.5px solid ${C.dropBorderActive}`,
        boxShadow: "0 0 0 3px rgba(140,196,42,.28)"
      };
    case "error":
      return {
        ...base,
        background: C.dangerBg,
        border: `1.5px dashed ${C.dangerBorder}`,
        titleColor: C.dangerInk,
        subColor: C.dangerInk,
        tileBorder: `1px solid ${C.dangerBorder}`,
        tileFg: C.dangerInk,
        chipBorder: `1px solid ${C.dangerBorder}`,
        chipFg: C.dangerInk
      };
    case "disabled":
      return {
        ...base,
        background: C.subtle,
        border: `1.5px dashed ${C.border}`,
        titleColor: C.muted,
        subColor: C.muted,
        tileFg: C.muted,
        chipFg: C.muted,
        chipBorder: `1px solid ${C.border}`,
        tileBorder: `1px solid ${C.border}`,
        cursor: "not-allowed",
        opacity: 0.7
      };
    default:
      return base;
  }
}
function getFileExt(name) {
  const raw = name.split(".").pop() ?? "";
  if (!raw || raw === name) return "FILE";
  return raw.slice(0, 4).toUpperCase();
}
function truncateMiddle(name, max = 28) {
  if (name.length <= max) return name;
  const dot = name.lastIndexOf(".");
  const ext = dot > 0 ? name.slice(dot) : "";
  const stem = dot > 0 ? name.slice(0, dot) : name;
  const keep = Math.max(4, max - ext.length - 1);
  return `${stem.slice(0, keep)}\u2026${ext}`;
}
var dropzoneVariants = classVarianceAuthority.cva(
  [
    "relative w-full flex flex-col items-center justify-center text-center",
    "select-none outline-none",
    "focus-visible:ring-2 focus-visible:ring-[#1F5E2C] focus-visible:ring-offset-2"
  ],
  {
    variants: {
      size: { sm: "", md: "", lg: "" },
      state: { idle: "", dragover: "", error: "", disabled: "pointer-events-none" }
    },
    defaultVariants: { size: "md", state: "idle" }
  }
);
var iconWrapperVariants = classVarianceAuthority.cva(
  "flex items-center justify-center flex-shrink-0",
  {
    variants: { size: { sm: "", md: "", lg: "" } },
    defaultVariants: { size: "md" }
  }
);
var avatarContainerVariants = classVarianceAuthority.cva(
  [
    "relative rounded-full overflow-hidden flex-shrink-0",
    "focus-visible:ring-2 focus-visible:ring-[#1F5E2C] focus-visible:ring-offset-2"
  ],
  {
    variants: {
      size: { sm: "", md: "", lg: "" },
      state: {
        empty: "cursor-pointer",
        filled: "cursor-pointer",
        disabled: "cursor-not-allowed pointer-events-none opacity-60"
      }
    },
    defaultVariants: { size: "md", state: "empty" }
  }
);
var ICON_SIZES = {
  sm: FILE_UPLOAD_SIZES.sm.tileIcon,
  md: FILE_UPLOAD_SIZES.md.tileIcon,
  lg: FILE_UPLOAD_SIZES.lg.tileIcon
};
var AVATAR_ICON_SIZES = { sm: 16, md: 20, lg: 26 };
var PLACEHOLDER_TEXT = {
  image: "Drop images here",
  file: "Drop files here",
  avatar: "Upload photo",
  video: "Drop videos here",
  compact: "Choose file",
  gallery: "Drop images here"
};
var BROWSE_HINT = "or click to browse";
var C2 = FILE_UPLOAD_COLORS;
function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${units[i]}`;
}
function getDefaultAccept(variant) {
  if (variant === "image" || variant === "avatar" || variant === "gallery") return "image/*";
  if (variant === "video") return "video/*";
  return void 0;
}
function makeId() {
  return Math.random().toString(36).slice(2, 9);
}
function deriveInitials(source) {
  if (!source) return null;
  const parts = source.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}
var TABULAR = { fontFeatureSettings: '"tnum" 1, "lnum" 1' };
function FileUpload({
  variant = "file",
  size = "md",
  tone = "light",
  accept,
  multiple = false,
  disabled = false,
  readOnly = false,
  name,
  id,
  maxSize,
  maxFiles,
  allowedFiles,
  formats,
  value,
  items,
  onChange,
  onFilesChange,
  onRemove,
  onRemoveFile,
  onValidationError,
  onRetry,
  onRetryAll,
  onSkip,
  onReplace,
  onCrop,
  label,
  required = false,
  error,
  helperText,
  placeholder,
  description,
  browseHint = BROWSE_HINT,
  dragAndDrop = true,
  showLocalPreview = true,
  clearable = true,
  changeable = true,
  showStatusBadge = true,
  showEmptyListHint = false,
  showDropzone = true,
  batchSummary = false,
  batchCaption,
  initials,
  galleryColumns = 4,
  coverBadge = true,
  icon,
  className,
  dropzoneClassName,
  inputRef: externalInputRef
}) {
  const reactId = React9__namespace.useId();
  const inputId = id ?? reactId;
  const spec = FILE_UPLOAD_SIZES[size] ?? FILE_UPLOAD_SIZES.md;
  const internalInputRef = React9__namespace.useRef(null);
  const attachInputRef = React9__namespace.useCallback(
    (node) => {
      internalInputRef.current = node;
      if (!externalInputRef) return;
      if (typeof externalInputRef === "function") {
        externalInputRef(node);
      } else {
        externalInputRef.current = node;
      }
    },
    [externalInputRef]
  );
  const [isDragOver, setIsDragOver] = React9__namespace.useState(false);
  const [isHover, setIsHover] = React9__namespace.useState(false);
  const [localFiles, setLocalFiles] = React9__namespace.useState([]);
  const [validationErrors, setValidationErrors] = React9__namespace.useState([]);
  const isImageVariant = variant === "image" || variant === "avatar" || variant === "gallery";
  const isPreviewVariant = isImageVariant || variant === "video";
  const normalizedAllowedExts = React9__namespace.useMemo(
    () => allowedFiles?.map((e) => e.startsWith(".") ? e.toLowerCase() : `.${e.toLowerCase()}`),
    [allowedFiles]
  );
  const effectiveAccept = accept ?? (normalizedAllowedExts ? normalizedAllowedExts.join(",") : getDefaultAccept(variant));
  const chips = React9__namespace.useMemo(() => {
    if (formats) return formats;
    const derived = [];
    normalizedAllowedExts?.forEach((e) => derived.push(e.replace(".", "").toUpperCase()));
    if (maxSize) derived.push(`Max ${formatBytes(maxSize, 0)}`);
    return derived;
  }, [formats, normalizedAllowedExts, maxSize]);
  const controlledUrls = React9__namespace.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
  }, [value]);
  const hasControlledValue = controlledUrls.length > 0;
  const displayItems = React9__namespace.useMemo(() => {
    const list = [];
    controlledUrls.forEach((url, i) => list.push({ kind: "url", url, index: i }));
    if (showLocalPreview) {
      localFiles.forEach(
        (lf, i) => list.push({ kind: "file", localFile: lf, index: controlledUrls.length + i })
      );
    }
    return list;
  }, [controlledUrls, localFiles, showLocalPreview]);
  React9__namespace.useEffect(() => {
    if (hasControlledValue && localFiles.length > 0) {
      localFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
      setLocalFiles([]);
    }
  }, [hasControlledValue]);
  React9__namespace.useEffect(() => {
    return () => {
      localFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    };
  }, []);
  const validateAndFilter = (incoming) => {
    const errors = [];
    let valid = incoming;
    if (normalizedAllowedExts && normalizedAllowedExts.length > 0) {
      const rejected = valid.filter((f) => {
        const ext = `.${f.name.split(".").pop()?.toLowerCase() ?? ""}`;
        return !normalizedAllowedExts.includes(ext);
      });
      if (rejected.length > 0) {
        errors.push(
          `${rejected.map((f) => f.name).join(", ")} ${rejected.length === 1 ? "is" : "are"} not allowed. Accepted types: ${normalizedAllowedExts.join(", ")}`
        );
        valid = valid.filter((f) => {
          const ext = `.${f.name.split(".").pop()?.toLowerCase() ?? ""}`;
          return normalizedAllowedExts.includes(ext);
        });
      }
    }
    if (maxSize) {
      const oversized = valid.filter((f) => f.size > maxSize);
      if (oversized.length > 0) {
        oversized.forEach((f) => {
          errors.push(
            `${f.name} (${formatBytes(f.size)}) exceeds the ${formatBytes(maxSize)} limit`
          );
        });
        valid = valid.filter((f) => f.size <= maxSize);
      }
    }
    if (multiple && maxFiles !== void 0) {
      const current = displayItems.length;
      const remaining = maxFiles - current;
      if (valid.length > remaining) {
        const skipped = valid.length - Math.max(0, remaining);
        if (skipped > 0) {
          errors.push(`${skipped} file(s) skipped \u2014 max ${maxFiles} allowed`);
        }
        valid = valid.slice(0, Math.max(0, remaining));
      }
    }
    return { valid, errors };
  };
  const processFiles = React9__namespace.useCallback(
    (incoming) => {
      const fileArray = Array.from(incoming);
      const { valid, errors } = validateAndFilter(fileArray);
      if (errors.length > 0) {
        setValidationErrors(errors);
        onValidationError?.(errors);
      } else {
        setValidationErrors([]);
      }
      if (valid.length === 0) return;
      if (showLocalPreview && isPreviewVariant) {
        const newLocal = valid.map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
          id: makeId()
        }));
        if (multiple) {
          setLocalFiles((prev) => {
            const updated = [...prev, ...newLocal];
            onFilesChange?.(updated);
            return updated;
          });
        } else {
          setLocalFiles((prev) => {
            prev.forEach((f) => URL.revokeObjectURL(f.previewUrl));
            const updated = newLocal.slice(0, 1);
            onFilesChange?.(updated);
            return updated;
          });
        }
      } else if (!isPreviewVariant && multiple) {
        const newLocal = valid.map((file) => ({
          file,
          previewUrl: "",
          id: makeId()
        }));
        setLocalFiles((prev) => {
          const updated = [...prev, ...newLocal];
          onFilesChange?.(updated);
          return updated;
        });
      } else if (!isPreviewVariant) {
        const newLocal = valid.slice(0, 1).map((file) => ({
          file,
          previewUrl: "",
          id: makeId()
        }));
        setLocalFiles(() => {
          onFilesChange?.(newLocal);
          return newLocal;
        });
      }
      onChange?.(valid);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [multiple, maxFiles, maxSize, normalizedAllowedExts, displayItems.length, isImageVariant, showLocalPreview, onChange, onFilesChange, onValidationError]
  );
  const openFilePicker = React9__namespace.useCallback(() => {
    if (disabled || readOnly) return;
    internalInputRef.current?.click();
  }, [disabled, readOnly]);
  const handleInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
    e.target.value = "";
  };
  const handleDragOver = (e) => {
    if (disabled || readOnly || !dragAndDrop) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };
  const handleDrop = (e) => {
    if (disabled || readOnly || !dragAndDrop) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFilePicker();
    }
  };
  const handleRemoveItem = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.kind === "url") {
      if (!multiple && controlledUrls.length === 1) {
        onRemove?.();
      } else {
        onRemoveFile?.(item.index);
      }
    } else {
      URL.revokeObjectURL(item.localFile.previewUrl);
      setLocalFiles((prev) => {
        const updated = prev.filter((f) => f.id !== item.localFile.id);
        onFilesChange?.(updated);
        return updated;
      });
      onRemoveFile?.(item.index);
    }
  };
  const handleClearAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setLocalFiles([]);
    setValidationErrors([]);
    onFilesChange?.([]);
    onRemove?.();
  };
  const dzState = disabled ? "disabled" : isDragOver ? "dragover" : error || validationErrors.length > 0 ? "error" : isHover && !readOnly ? "hover" : "idle";
  const dz = getDropzoneStyle(dzState, tone);
  const combinedError = error ?? validationErrors[0];
  const iconSize = ICON_SIZES[size] ?? spec.tileIcon;
  const avatarIconSize = AVATAR_ICON_SIZES[size] ?? 20;
  const rows = React9__namespace.useMemo(() => {
    if (items) return items;
    return displayItems.map((item) => {
      if (item.kind === "url") {
        const fileName = item.url.split("/").pop() || item.url;
        return { id: `url-${item.index}`, name: fileName, url: item.url, status: "done" };
      }
      return {
        id: item.localFile.id,
        name: item.localFile.file.name,
        size: item.localFile.file.size,
        url: item.localFile.previewUrl || void 0,
        status: "idle"
      };
    });
  }, [items, displayItems]);
  const filledCount = items ? rows.length : displayItems.length;
  const canAddMore = !disabled && !readOnly && (!maxFiles || filledCount < maxFiles);
  const removeRow = (index) => {
    if (items) {
      onRemoveFile?.(index);
      return;
    }
    const target = displayItems[index];
    if (!target) return;
    handleRemoveItem(
      { preventDefault() {
      }, stopPropagation() {
      } },
      target
    );
  };
  const dropzoneInteractionProps = {
    role: "button",
    tabIndex: disabled ? -1 : 0,
    onClick: openFilePicker,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    onKeyDown: handleKeyDown,
    onMouseEnter: () => setIsHover(true),
    onMouseLeave: () => setIsHover(false),
    "aria-label": placeholder ?? PLACEHOLDER_TEXT[variant] ?? PLACEHOLDER_TEXT.file
  };
  const filledDragProps = dragAndDrop && !disabled && !readOnly ? { onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop } : {};
  const renderDropzone = (glyph, title) => /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ...dropzoneInteractionProps,
      className: cn(dropzoneVariants({ size, state: disabled ? "disabled" : "idle" }), dropzoneClassName),
      style: {
        gap: spec.dropGap,
        padding: `${spec.dropPadY}px ${spec.dropPadX}px`,
        borderRadius: spec.dropRadius,
        background: dz.background,
        border: dz.border,
        boxShadow: dz.boxShadow,
        cursor: dz.cursor,
        opacity: dz.opacity,
        transition: FILE_UPLOAD_TRANSITION
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: iconWrapperVariants({ size }),
            style: {
              width: spec.tile,
              height: spec.tile,
              borderRadius: spec.tileRadius,
              background: dz.tileBg,
              border: dz.tileBorder,
              color: dz.tileFg
            },
            children: glyph
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            style: {
              fontSize: spec.title,
              fontWeight: 600,
              lineHeight: 1.3,
              color: dz.titleColor
            },
            children: title
          }
        ),
        browseHint && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.sub, fontWeight: 400, lineHeight: 1.5, color: dz.subColor }, children: browseHint }),
        description && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.sub, fontWeight: 400, lineHeight: 1.5, color: dz.subColor }, children: description }),
        chips.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex flex-wrap items-center justify-center", style: { gap: 6, marginTop: 2 }, children: chips.map((chip) => /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            style: {
              fontSize: spec.chip,
              fontWeight: 600,
              lineHeight: 1.4,
              letterSpacing: ".05em",
              textTransform: "uppercase",
              background: dz.chipBg,
              border: dz.chipBorder,
              color: dz.chipFg,
              padding: "3px 7px",
              borderRadius: 999,
              whiteSpace: "nowrap"
            },
            children: chip
          },
          chip
        )) })
      ]
    }
  );
  const renderRow = (row, index) => {
    const status = row.status ?? "idle";
    const st = FILE_UPLOAD_STATUS_STYLES[status];
    const pct = Math.max(0, Math.min(100, Math.round(row.progress ?? 0)));
    const pctLabel = `${pct}%`;
    const sizeLabel = typeof row.size === "number" ? formatBytes(row.size) : row.size ?? void 0;
    const note = row.note ?? st.note;
    const badgeText = showStatusBadge ? st.badgeText.replace("{pct}", pctLabel) : "";
    const showBar = st.bar;
    const actionPill = (text, onPress, border, color, bg = C2.surface) => /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        onClick: (e) => {
          e.preventDefault();
          e.stopPropagation();
          onPress?.();
        },
        disabled: disabled || readOnly,
        style: {
          height: spec.action,
          padding: "0 9px",
          border: `1px solid ${border}`,
          borderRadius: 7,
          background: bg,
          color,
          fontSize: spec.actionFont,
          fontWeight: 600,
          lineHeight: 1,
          cursor: disabled || readOnly ? "not-allowed" : "pointer",
          flex: "none",
          whiteSpace: "nowrap"
        },
        children: text
      },
      text
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: "flex items-center",
        style: {
          gap: spec.rowGap,
          padding: `${spec.rowPadY}px ${spec.rowPadX}px`,
          borderRadius: spec.rowRadius,
          minHeight: spec.rowMinHeight,
          background: st.rowBg,
          border: st.rowBorder
        },
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: "flex items-center justify-center flex-none",
              style: {
                width: spec.extTile,
                height: spec.extTile,
                borderRadius: spec.extRadius,
                background: st.tileBg,
                color: st.tileFg,
                fontSize: spec.extFont,
                fontWeight: 700,
                lineHeight: 1
              },
              children: row.ext ?? getFileExt(row.name)
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex-1 min-w-0 flex flex-col", style: { gap: 5 }, children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center", style: { gap: 8 }, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: "flex-1 min-w-0 truncate",
                  title: row.name,
                  style: {
                    fontSize: spec.name,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: st.nameColor
                  },
                  children: truncateMiddle(row.name, 34)
                }
              ),
              sizeLabel && /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: "flex-none",
                  style: { ...TABULAR, fontSize: spec.meta, fontWeight: 500, lineHeight: 1, color: C2.inkFg3 },
                  children: sizeLabel
                }
              )
            ] }),
            showBar && /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: "block overflow-hidden",
                style: { height: spec.bar, borderRadius: 99, background: C2.borderSoft },
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    className: "block h-full",
                    style: {
                      width: `${pct}%`,
                      borderRadius: 99,
                      background: st.barColor,
                      transition: PROGRESS_TRANSITION
                    }
                  }
                )
              }
            ),
            note && /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                style: { ...TABULAR, fontSize: spec.meta, fontWeight: 500, lineHeight: 1.4, color: st.noteColor },
                children: note
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center flex-none", style: { gap: 6 }, children: [
            badgeText && /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: "flex-none",
                style: {
                  ...TABULAR,
                  fontSize: spec.actionFont,
                  fontWeight: 600,
                  lineHeight: 1,
                  padding: "5px 9px",
                  borderRadius: 7,
                  background: st.badgeBg,
                  color: st.badgeFg
                },
                children: badgeText
              }
            ),
            !showStatusBadge && (status === "uploading" || status === "processing") && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { ...TABULAR, fontSize: spec.actionFont, fontWeight: 600, color: C2.inkFg3 }, children: pctLabel }),
            !showStatusBadge && status === "done" && /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: "flex items-center justify-center",
                style: { width: 20, height: 20, borderRadius: "50%", background: C2.mint },
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 11, strokeWidth: 3.2, color: C2.greenInk })
              }
            ),
            st.action === "retry" && actionPill("Retry", () => onRetry?.(row, index), C2.dangerOutline, C2.dangerInk),
            st.action === "crop" && actionPill("Crop it", () => onCrop?.(row, index), C2.warnOutline, C2.warnInk, C2.onTint),
            st.action === "duplicate" && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              actionPill("Skip", () => onSkip?.(row, index), C2.border, C2.inkFg2),
              actionPill("Replace", () => onReplace?.(row, index), C2.outlineBorder, C2.deep)
            ] }),
            clearable && !disabled && !readOnly && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeRow(index);
                },
                className: "flex items-center justify-center flex-none transition-colors hover:bg-[#FBE9EA] hover:text-[#A8000F]",
                style: { width: 24, height: 24, borderRadius: 6, background: "transparent", color: C2.inkFg3 },
                "aria-label": `Remove ${row.name}`,
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 11, strokeWidth: 3 })
              }
            )
          ] })
        ]
      },
      row.id ?? `${row.name}-${index}`
    );
  };
  const renderEmptyListHint = () => /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center text-center",
      style: {
        gap: 6,
        border: `1px solid ${C2.borderSoft}`,
        borderRadius: spec.rowRadius,
        padding: `${spec.dropPadY}px ${spec.dropPadX}px`
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.name, fontWeight: 600, lineHeight: 1.3, color: C2.inkFg2 }, children: "Nothing uploaded yet" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.meta, fontWeight: 400, lineHeight: 1.4, color: C2.inkFg3 }, children: "Files appear here as a list with their own progress and errors." })
      ]
    }
  );
  const renderBatchSummary = () => {
    const total = rows.length;
    const doneCount = rows.filter((r) => r.status === "done" || r.status === "partial").length;
    const failedCount = rows.filter(
      (r) => r.status === "failed" || r.status === "rejected"
    ).length;
    const pct = total === 0 ? 0 : Math.round(doneCount / total * 100);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: "overflow-hidden",
        style: { border: `1px solid ${C2.border}`, borderRadius: spec.compactRadius },
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "flex items-center",
              style: {
                gap: 9,
                padding: `${spec.compactPadY}px ${spec.compactPadX}px`,
                background: C2.subtle,
                borderBottom: `1px solid ${C2.borderSoft}`
              },
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs(
                  "span",
                  {
                    className: "flex-1",
                    style: { ...TABULAR, fontSize: spec.name, fontWeight: 600, lineHeight: 1.3, color: C2.ink },
                    children: [
                      doneCount,
                      " of ",
                      total,
                      " uploaded"
                    ]
                  }
                ),
                failedCount > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
                  "span",
                  {
                    style: { ...TABULAR, fontSize: spec.meta, fontWeight: 500, lineHeight: 1.3, color: C2.dangerInk },
                    children: [
                      failedCount,
                      " failed"
                    ]
                  }
                ),
                failedCount > 0 && onRetryAll && /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onRetryAll,
                    disabled: disabled || readOnly,
                    style: {
                      fontSize: spec.name,
                      fontWeight: 600,
                      lineHeight: 1.3,
                      color: C2.forest,
                      background: "transparent",
                      border: 0,
                      cursor: disabled || readOnly ? "not-allowed" : "pointer"
                    },
                    children: "Retry all"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "flex flex-col",
              style: { gap: 8, padding: `${spec.rowPadY}px ${spec.rowPadX}px` },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    className: "block overflow-hidden",
                    style: { height: spec.bar + 1, borderRadius: 99, background: C2.borderSoft },
                    children: /* @__PURE__ */ jsxRuntime.jsx(
                      "span",
                      {
                        className: "block h-full",
                        style: {
                          width: `${pct}%`,
                          borderRadius: 99,
                          background: C2.deep,
                          transition: PROGRESS_TRANSITION
                        }
                      }
                    )
                  }
                ),
                batchCaption && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { ...TABULAR, fontSize: spec.meta, fontWeight: 500, lineHeight: 1.4, color: C2.inkFg3 }, children: batchCaption })
              ]
            }
          )
        ]
      }
    );
  };
  const renderImageVariant = () => {
    if (!multiple) {
      const item = displayItems[0];
      const previewUrl = item ? item.kind === "url" ? item.url : item.localFile.previewUrl : null;
      if (previewUrl) {
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            ...filledDragProps,
            className: "relative w-full overflow-hidden group",
            style: {
              borderRadius: spec.dropRadius,
              border: isDragOver ? `1.5px solid ${C2.dropBorderActive}` : `1px solid ${C2.border}`,
              transition: FILE_UPLOAD_TRANSITION,
              height: size === "sm" ? 96 : size === "lg" ? 176 : 128
            },
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "img",
                {
                  src: previewUrl,
                  alt: "Preview",
                  className: "absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                }
              ),
              isDragOver && !disabled && !readOnly && /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "absolute inset-0 flex items-center justify-center backdrop-blur-[1px] pointer-events-none",
                  style: { background: "rgba(242,251,235,.7)" },
                  children: /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.name, fontWeight: 600, color: C2.forest }, children: "Drop to replace" })
                }
              ),
              icon && !disabled && !readOnly && /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: openFilePicker,
                  onKeyDown: handleKeyDown,
                  className: "absolute bottom-2 right-2 z-10 flex items-center justify-center rounded-full",
                  style: {
                    width: spec.avatarBadge,
                    height: spec.avatarBadge,
                    background: C2.surface,
                    border: `1px solid ${C2.border}`,
                    color: C2.forest,
                    boxShadow: "1px 1px 3px rgba(0,0,0,.12)"
                  },
                  "aria-label": "Change image",
                  children: icon
                }
              ),
              !disabled && !readOnly && (changeable || clearable) && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 p-2.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-200", children: [
                changeable && /* @__PURE__ */ jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: openFilePicker,
                    onKeyDown: handleKeyDown,
                    className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 shadow transition-colors",
                    style: {
                      background: "rgba(255,255,255,.95)",
                      color: C2.deep,
                      fontSize: spec.meta + 1,
                      fontWeight: 600
                    },
                    "aria-label": "Change image",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ImageIcon, { size: 12 }),
                      "Change"
                    ]
                  }
                ),
                clearable && /* @__PURE__ */ jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => item && handleRemoveItem(e, item),
                    className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 shadow transition-colors",
                    style: {
                      background: C2.dangerBar,
                      color: "#FFFFFF",
                      fontSize: spec.meta + 1,
                      fontWeight: 600
                    },
                    "aria-label": "Remove image",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 12 }),
                      "Remove"
                    ]
                  }
                )
              ] }) })
            ]
          }
        );
      }
      return renderDropzone(
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ImageIcon, { size: iconSize, strokeWidth: 2 }),
        placeholder ?? PLACEHOLDER_TEXT.image
      );
    }
    if (displayItems.length === 0) {
      return renderDropzone(
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ImageIcon, { size: iconSize, strokeWidth: 2 }),
        placeholder ?? PLACEHOLDER_TEXT.image
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ...filledDragProps,
        className: "w-full",
        style: {
          borderRadius: spec.compactRadius,
          border: isDragOver ? `1.5px solid ${C2.dropBorderActive}` : `1px solid ${C2.border}`,
          padding: spec.galleryPad,
          transition: FILE_UPLOAD_TRANSITION
        },
        children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap", style: { gap: spec.galleryGap }, children: [
          displayItems.map((item) => {
            const url = item.kind === "url" ? item.url : item.localFile.previewUrl;
            return /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                className: "relative group flex-shrink-0 overflow-hidden",
                style: {
                  width: 80,
                  height: 80,
                  borderRadius: spec.galleryTileRadius,
                  border: `1px solid ${C2.galleryTileBorder}`,
                  background: C2.galleryTileBg
                },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("img", { src: url, alt: `Image ${item.index + 1}`, className: "w-full h-full object-cover" }),
                  !disabled && !readOnly && clearable && /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => handleRemoveItem(e, item),
                      className: "absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                      style: { background: "rgba(0,0,0,.6)" },
                      "aria-label": "Remove",
                      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 10, strokeWidth: 3, className: "text-white" })
                    }
                  )
                ]
              },
              item.kind === "url" ? `url-${item.index}` : item.localFile.id
            );
          }),
          canAddMore && /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              onClick: openFilePicker,
              className: "flex flex-col items-center justify-center flex-shrink-0 transition-colors",
              style: {
                width: 80,
                height: 80,
                gap: 2,
                borderRadius: spec.galleryTileRadius,
                border: `1.5px dashed ${C2.borderStrong}`,
                background: C2.surface,
                color: C2.inkFg3
              },
              "aria-label": "Add image",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { size: 15, strokeWidth: 2.4 }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.chip + 1, fontWeight: 600 }, children: "Add" })
              ]
            }
          )
        ] })
      }
    );
  };
  const renderGalleryVariant = () => /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ...filledDragProps,
      className: "w-full grid",
      style: {
        gridTemplateColumns: `repeat(${galleryColumns}, 1fr)`,
        gap: spec.galleryGap,
        padding: spec.galleryPad,
        borderRadius: spec.galleryRadius,
        border: isDragOver ? `1.5px solid ${C2.dropBorderActive}` : `1px solid ${C2.border}`,
        transition: FILE_UPLOAD_TRANSITION
      },
      children: [
        displayItems.map((item) => {
          const url = item.kind === "url" ? item.url : item.localFile.previewUrl;
          return /* @__PURE__ */ jsxRuntime.jsxs(
            "span",
            {
              className: "relative group flex items-center justify-center overflow-hidden",
              style: {
                aspectRatio: "1",
                borderRadius: spec.galleryTileRadius,
                background: C2.galleryTileBg,
                border: `1px solid ${C2.galleryTileBorder}`
              },
              children: [
                url ? /* @__PURE__ */ jsxRuntime.jsx("img", { src: url, alt: `Image ${item.index + 1}`, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ImageIcon, { size: 15, strokeWidth: 1.7, color: C2.forest, style: { opacity: 0.55 } }),
                coverBadge && item.index === 0 && /* @__PURE__ */ jsxRuntime.jsx(
                  "span",
                  {
                    className: "absolute text-center",
                    style: {
                      bottom: 3,
                      left: 3,
                      right: 3,
                      fontSize: 8,
                      fontWeight: 600,
                      lineHeight: 1.4,
                      letterSpacing: ".04em",
                      textTransform: "uppercase",
                      background: C2.coverBg,
                      color: C2.coverFg,
                      borderRadius: 4,
                      padding: "2px 0"
                    },
                    children: "Cover"
                  }
                ),
                !disabled && !readOnly && clearable && /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => handleRemoveItem(e, item),
                    className: "absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                    style: { background: "rgba(0,0,0,.6)" },
                    "aria-label": "Remove",
                    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 10, strokeWidth: 3, className: "text-white" })
                  }
                )
              ]
            },
            item.kind === "url" ? `url-${item.index}` : item.localFile.id
          );
        }),
        canAddMore && /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            onClick: openFilePicker,
            onDragOver: handleDragOver,
            onDragLeave: handleDragLeave,
            onDrop: handleDrop,
            className: "flex items-center justify-center transition-colors",
            style: {
              aspectRatio: "1",
              borderRadius: spec.galleryTileRadius,
              background: C2.surface,
              border: `1.5px dashed ${C2.borderStrong}`,
              color: C2.borderStrong
            },
            "aria-label": "Add image",
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { size: 15, strokeWidth: 2.4 })
          }
        )
      ]
    }
  );
  const renderCompactVariant = () => {
    const title = placeholder ?? (typeof label === "string" ? label : void 0) ?? PLACEHOLDER_TEXT.compact;
    const sub = description ?? (chips.length > 0 ? chips.join(" \xB7 ") : void 0);
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col", style: { gap: 9 }, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          ...filledDragProps,
          className: "flex items-center w-full",
          style: {
            gap: 10,
            padding: `${spec.compactPadY}px ${spec.compactPadX}px`,
            border: isDragOver ? `1px solid ${C2.dropBorderActive}` : `1px solid ${C2.border}`,
            borderRadius: spec.compactRadius,
            background: disabled ? C2.subtle : C2.surface,
            transition: FILE_UPLOAD_TRANSITION
          },
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex-1 min-w-0 flex flex-col", style: { gap: 2 }, children: [
              /* @__PURE__ */ jsxRuntime.jsxs(
                "span",
                {
                  className: "truncate",
                  style: {
                    fontSize: spec.name,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: disabled ? C2.muted : C2.inkFg1
                  },
                  children: [
                    title,
                    required && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: C2.dangerBar, marginLeft: 3 }, children: "*" })
                  ]
                }
              ),
              sub && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.meta, fontWeight: 400, lineHeight: 1.4, color: C2.inkFg3 }, children: sub })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: openFilePicker,
                disabled: disabled || readOnly,
                onMouseEnter: () => setIsHover(true),
                onMouseLeave: () => setIsHover(false),
                className: "flex-none",
                style: {
                  height: spec.compactButton,
                  padding: "0 12px",
                  border: `1px solid ${isHover && !disabled && !readOnly ? C2.dropBorderActive : C2.outlineBorder}`,
                  borderRadius: 8,
                  background: isHover && !disabled && !readOnly ? C2.outlineHoverBg : C2.surface,
                  color: disabled ? C2.muted : C2.deep,
                  fontSize: spec.meta + 1,
                  fontWeight: 600,
                  lineHeight: 1,
                  cursor: disabled || readOnly ? "not-allowed" : "pointer",
                  transition: FILE_UPLOAD_TRANSITION,
                  whiteSpace: "nowrap"
                },
                children: "Choose file"
              }
            )
          ]
        }
      ),
      rows.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col", style: { gap: 9 }, children: rows.map(renderRow) })
    ] });
  };
  const renderAvatarVariant = () => {
    const item = displayItems[0];
    const previewUrl = item ? item.kind === "url" ? item.url : item.localFile.previewUrl : null;
    const avatarState = disabled ? "disabled" : previewUrl ? "filled" : "empty";
    const title = placeholder ?? (typeof label === "string" ? label : void 0) ?? PLACEHOLDER_TEXT.avatar;
    const fallbackInitials = initials ?? deriveInitials(typeof label === "string" ? label : placeholder);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: "flex items-center w-full",
        style: {
          gap: 14,
          padding: spec.galleryPad + 2,
          border: `1px solid ${C2.border}`,
          borderRadius: spec.compactRadius,
          background: disabled ? C2.subtle : C2.surface
        },
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative flex-shrink-0", style: { width: spec.avatar, height: spec.avatar }, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                ...!previewUrl ? dropzoneInteractionProps : {},
                className: avatarContainerVariants({ size, state: avatarState }),
                style: {
                  width: spec.avatar,
                  height: spec.avatar,
                  background: previewUrl ? C2.surface : C2.deep,
                  color: C2.mint
                },
                children: previewUrl ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx("img", { src: previewUrl, alt: "Avatar", className: "w-full h-full object-cover" }),
                  !disabled && !readOnly && /* @__PURE__ */ jsxRuntime.jsx(
                    "div",
                    {
                      className: "absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full",
                      style: { background: "rgba(0,0,0,.4)" },
                      onClick: openFilePicker,
                      role: "button",
                      tabIndex: 0,
                      onKeyDown: handleKeyDown,
                      "aria-label": "Change photo",
                      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ImageIcon, { size: avatarIconSize, className: "text-white" })
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    className: "w-full h-full flex items-center justify-center",
                    style: { fontSize: spec.avatarInitials, fontWeight: 700, lineHeight: 1 },
                    children: fallbackInitials ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Upload, { size: avatarIconSize })
                  }
                )
              }
            ),
            !disabled && !readOnly && /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: openFilePicker,
                onKeyDown: handleKeyDown,
                className: "absolute z-10 flex items-center justify-center rounded-full",
                style: {
                  bottom: -2,
                  right: -2,
                  width: spec.avatarBadge,
                  height: spec.avatarBadge,
                  background: C2.surface,
                  border: `1px solid ${C2.border}`,
                  color: C2.forest,
                  boxShadow: "1px 1px 3px rgba(0,0,0,.12)"
                },
                "aria-label": "Change photo",
                children: icon ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Camera, { size: Math.round(spec.avatarBadge * 0.46), strokeWidth: 2.2 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1 min-w-0 flex flex-col", style: { gap: 5 }, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "span",
              {
                className: "truncate",
                style: { fontSize: spec.name, fontWeight: 600, lineHeight: 1.3, color: C2.inkFg1 },
                children: title
              }
            ),
            description && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.meta, fontWeight: 400, lineHeight: 1.4, color: C2.inkFg3 }, children: description }),
            !disabled && !readOnly && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center", style: { gap: 9, marginTop: 2 }, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: openFilePicker,
                  style: {
                    fontSize: spec.meta + 1,
                    fontWeight: 600,
                    lineHeight: 1,
                    color: C2.forest,
                    background: "transparent",
                    border: 0,
                    cursor: "pointer"
                  },
                  children: previewUrl ? "Change" : "Upload"
                }
              ),
              clearable && previewUrl && /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClearAll,
                  style: {
                    fontSize: spec.meta + 1,
                    fontWeight: 600,
                    lineHeight: 1,
                    color: C2.dangerBar,
                    background: "transparent",
                    border: 0,
                    cursor: "pointer"
                  },
                  children: "Remove"
                }
              )
            ] })
          ] })
        ]
      }
    );
  };
  const renderFileVariant = () => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col w-full", style: { gap: 10 }, children: [
    showDropzone && (canAddMore || rows.length === 0) && renderDropzone(
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Upload, { size: iconSize, strokeWidth: 2 }),
      placeholder ?? PLACEHOLDER_TEXT.file
    ),
    batchSummary && rows.length > 0 && renderBatchSummary(),
    rows.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col", style: { gap: 9 }, children: rows.map(renderRow) }) : showEmptyListHint && renderEmptyListHint()
  ] });
  const renderVideoVariant = () => {
    if (!multiple) {
      const item = displayItems[0];
      const previewUrl = item ? item.kind === "url" ? item.url : item.localFile.previewUrl : null;
      if (previewUrl) {
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            ...filledDragProps,
            className: "relative w-full overflow-hidden bg-black group",
            style: {
              borderRadius: spec.dropRadius,
              border: isDragOver ? `1.5px solid ${C2.dropBorderActive}` : `1px solid ${C2.border}`,
              height: size === "sm" ? 96 : size === "lg" ? 176 : 128,
              transition: FILE_UPLOAD_TRANSITION
            },
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "video",
                {
                  src: previewUrl,
                  className: "absolute inset-0 w-full h-full object-contain",
                  controls: true,
                  preload: "metadata"
                }
              ),
              isDragOver && !disabled && !readOnly && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px] pointer-events-none z-10", children: /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.name, fontWeight: 600 }, className: "text-white", children: "Drop to replace" }) }),
              !disabled && !readOnly && (changeable || clearable) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-2.5 bg-gradient-to-b from-black/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto", children: [
                changeable && /* @__PURE__ */ jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: openFilePicker,
                    onKeyDown: handleKeyDown,
                    className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 shadow",
                    style: {
                      background: "rgba(255,255,255,.95)",
                      color: C2.deep,
                      fontSize: spec.meta + 1,
                      fontWeight: 600
                    },
                    "aria-label": "Change video",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Video, { size: 12 }),
                      "Change"
                    ]
                  }
                ),
                clearable && /* @__PURE__ */ jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => item && handleRemoveItem(e, item),
                    className: "flex items-center gap-1.5 rounded-lg px-3 py-1.5 shadow",
                    style: {
                      background: C2.dangerBar,
                      color: "#FFFFFF",
                      fontSize: spec.meta + 1,
                      fontWeight: 600
                    },
                    "aria-label": "Remove video",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 12 }),
                      "Remove"
                    ]
                  }
                )
              ] })
            ]
          }
        );
      }
      return renderDropzone(
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Video, { size: iconSize, strokeWidth: 2 }),
        placeholder ?? PLACEHOLDER_TEXT.video
      );
    }
    if (displayItems.length === 0) {
      return renderDropzone(
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Video, { size: iconSize, strokeWidth: 2 }),
        placeholder ?? PLACEHOLDER_TEXT.video
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ...filledDragProps,
        className: "w-full",
        style: {
          borderRadius: spec.compactRadius,
          border: isDragOver ? `1.5px solid ${C2.dropBorderActive}` : `1px solid ${C2.border}`,
          padding: spec.galleryPad,
          transition: FILE_UPLOAD_TRANSITION
        },
        children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap", style: { gap: spec.galleryGap }, children: [
          displayItems.map((item) => {
            const url = item.kind === "url" ? item.url : item.localFile.previewUrl;
            return /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                className: "relative group flex-shrink-0 overflow-hidden bg-black",
                style: {
                  width: 80,
                  height: 80,
                  borderRadius: spec.galleryTileRadius,
                  border: `1px solid ${C2.border}`
                },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("video", { src: url, className: "w-full h-full object-cover", muted: true, preload: "metadata" }),
                  /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntime.jsx(
                    "div",
                    {
                      className: "w-6 h-6 rounded-full flex items-center justify-center",
                      style: { background: "rgba(0,0,0,.5)" },
                      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Play, { size: 10, className: "text-white ml-0.5" })
                    }
                  ) }),
                  !disabled && !readOnly && clearable && /* @__PURE__ */ jsxRuntime.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => handleRemoveItem(e, item),
                      className: "absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                      style: { background: "rgba(0,0,0,.6)" },
                      "aria-label": "Remove",
                      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 10, strokeWidth: 3, className: "text-white" })
                    }
                  )
                ]
              },
              item.kind === "url" ? `url-${item.index}` : item.localFile.id
            );
          }),
          canAddMore && /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              onClick: openFilePicker,
              className: "flex flex-col items-center justify-center flex-shrink-0",
              style: {
                width: 80,
                height: 80,
                gap: 2,
                borderRadius: spec.galleryTileRadius,
                border: `1.5px dashed ${C2.borderStrong}`,
                background: C2.surface,
                color: C2.inkFg3
              },
              "aria-label": "Add video",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { size: 15, strokeWidth: 2.4 }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.chip + 1, fontWeight: 600 }, children: "Add" })
              ]
            }
          )
        ] })
      }
    );
  };
  const hideOuterLabel = (variant === "compact" || variant === "avatar") && !placeholder && typeof label === "string";
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex flex-col gap-1.5 w-full", className), children: [
    label && !hideOuterLabel && /* @__PURE__ */ jsxRuntime.jsx(
      InputLabel,
      {
        htmlFor: inputId,
        required,
        size: size === "lg" ? "lg" : size === "sm" ? "sm" : "md",
        children: label
      }
    ),
    variant === "avatar" ? renderAvatarVariant() : variant === "compact" ? renderCompactVariant() : variant === "gallery" ? renderGalleryVariant() : variant === "image" ? renderImageVariant() : variant === "video" ? renderVideoVariant() : renderFileVariant(),
    /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref: attachInputRef,
        type: "file",
        id: inputId,
        accept: effectiveAccept,
        multiple,
        disabled,
        name,
        className: "sr-only",
        "aria-hidden": "true",
        tabIndex: -1,
        onChange: handleInputChange
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      InputHelper,
      {
        size: size === "lg" ? "lg" : size === "sm" ? "sm" : "md",
        error: combinedError,
        helperText: combinedError ? void 0 : helperText
      }
    )
  ] });
}
FileUpload.displayName = "FileUpload";
var chipVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center font-semibold rounded select-none whitespace-nowrap gap-1",
  {
    variants: {
      variant: {
        success: "bg-green-50 text-green-700",
        error: "bg-red-50 text-red-800",
        warning: "bg-amber-50 text-amber-700",
        info: "bg-blue-50 text-blue-700",
        common: "bg-gray-100 text-gray-500"
      },
      size: {
        xs: "px-2 py-0.5 text-[10px]",
        sm: "px-2.5 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
      }
    },
    defaultVariants: {
      variant: "success",
      size: "md"
    }
  }
);
function Chip({
  label,
  variant,
  size,
  icon,
  iconPosition = "left",
  bgColor,
  textColor,
  className
}) {
  const iconNode = icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex items-center flex-shrink-0", "aria-hidden": true, children: icon }) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      className: cn(chipVariants({ variant, size }), className),
      style: {
        ...bgColor ? { backgroundColor: bgColor } : {},
        ...textColor ? { color: textColor } : {}
      },
      children: [
        iconPosition === "left" && iconNode,
        label,
        iconPosition === "right" && iconNode
      ]
    }
  );
}

exports.Accordion = Accordion;
exports.AlertDialog = AlertDialog2;
exports.AlertDialogAction = AlertDialogAction;
exports.AlertDialogCancel = AlertDialogCancel;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogDescription = AlertDialogDescription;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogHeader = AlertDialogHeader;
exports.AlertDialogMedia = AlertDialogMedia;
exports.AlertDialogOverlay = AlertDialogOverlay;
exports.AlertDialogPortal = AlertDialogPortal;
exports.AlertDialogTitle = AlertDialogTitle;
exports.AlertDialogTrigger = AlertDialogTrigger;
exports.AppHeader = AppHeader;
exports.AppSidebar = AppSidebar;
exports.Banner = Banner;
exports.Button = Button2;
exports.Card = Card2;
exports.CardAction = CardAction;
exports.CardContent = CardContent2;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter2;
exports.CardHeader = CardHeader2;
exports.CardTitle = CardTitle2;
exports.Checkbox = Checkbox;
exports.CheckboxGroup = CheckboxGroup;
exports.Chip = Chip;
exports.Command = Command;
exports.CommandEmpty = CommandEmpty;
exports.CommandGroup = CommandGroup;
exports.CommandInput = CommandInput;
exports.CommandItem = CommandItem;
exports.CommandList = CommandList;
exports.CommandSeparator = CommandSeparator;
exports.CustomTableCell = TableCell2;
exports.CustomTableHeaderCell = TableHeaderCell;
exports.CustomTableSkeleton = TableSkeleton;
exports.CustomTabsTrigger = CustomTabsTrigger;
exports.DatePicker = DatePicker;
exports.DatePickerCalendar = DatePickerCalendar;
exports.Drawer = Drawer;
exports.DrawerClose = DrawerClose;
exports.DrawerContent = DrawerContent;
exports.DrawerDescription = DrawerDescription;
exports.DrawerOverlay = DrawerOverlay;
exports.DrawerPortal = DrawerPortal;
exports.DrawerTitle = DrawerTitle;
exports.DrawerTrigger = DrawerTrigger;
exports.FileUpload = FileUpload;
exports.FilterGroup = FilterGroup;
exports.FilterGroupMobileContext = FilterGroupMobileContext;
exports.Grid = Grid;
exports.Input = Input2;
exports.InputHelper = InputHelper;
exports.InputLabel = InputLabel;
exports.LAYOUT = LAYOUT;
exports.Label = Label;
exports.Loader = Loader;
exports.Modal = Modal;
exports.ModalZIndexProvider = ModalZIndexProvider;
exports.MonthPickerCalendar = MonthPickerCalendar;
exports.PATTERN_REGEX = PATTERN_REGEX;
exports.PageContainer = PageContainer;
exports.Pagination = Pagination2;
exports.Popover = Popover;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.Radio = Radio;
exports.RadioGroup = RadioGroup;
exports.SearchBar = SearchBar;
exports.Section = Section;
exports.SectionContent = SectionContent;
exports.SectionDivider = SectionDivider;
exports.SectionField = SectionField;
exports.SectionGroup = SectionGroup;
exports.SectionHeader = SectionHeader;
exports.SectionRow = SectionRow;
exports.SectionSubsection = SectionSubsection;
exports.SectionTableContent = SectionTableContent;
exports.Select = Select;
exports.Separator = Separator;
exports.Sidebar = Sidebar;
exports.SidebarZIndexProvider = SidebarZIndexProvider;
exports.StatusBadge = StatusBadge;
exports.SubHeader = SubHeader;
exports.SweetAlertProvider = SweetAlertProvider;
exports.Table = Table2;
exports.Tabs = Tabs2;
exports.Toggle = Toggle;
exports.TopHeader = TopHeader;
exports.UengageProvider = UengageProvider;
exports.accordionContentVariants = accordionContentVariants;
exports.accordionItemVariants = accordionItemVariants;
exports.accordionRootVariants = accordionRootVariants;
exports.accordionTriggerVariants = accordionTriggerVariants;
exports.alertDialogIconBadgeVariants = iconBadgeVariants;
exports.avatarContainerVariants = avatarContainerVariants;
exports.brand = brand;
exports.buttonVariants = buttonVariants;
exports.checkboxBoxVariants = checkboxBoxVariants;
exports.checkboxLabelVariants = checkboxLabelVariants;
exports.chevronButtonVariants = chevronButtonVariants;
exports.chipVariants = chipVariants;
exports.cn = cn;
exports.customButtonVariants = buttonVariants2;
exports.datePickerTriggerVariants = triggerVariants2;
exports.dayCellVariants = dayCellVariants;
exports.dropzoneVariants = dropzoneVariants;
exports.formatDate = formatDate;
exports.formatMonthYear = formatMonthYear;
exports.formatRange = formatRange;
exports.iconWrapperVariants = iconWrapperVariants;
exports.input = Input;
exports.inputFieldVariants = inputFieldVariants;
exports.inputIconSlotVariants = inputIconSlotVariants;
exports.inputWrapperVariants = inputWrapperVariants;
exports.isSameDay = isSameDay;
exports.pageButtonVariants = pageButtonVariants;
exports.radioCircleVariants = radioCircleVariants;
exports.radioDotVariants = radioDotVariants;
exports.radioLabelVariants = radioLabelVariants;
exports.sidebarContentVariants = sidebarContentVariants;
exports.sidebarPersistentVariants = sidebarPersistentVariants;
exports.statusBadgeVariants = statusBadgeVariants;
exports.tabTriggerVariants = tabTriggerVariants;
exports.tableBodyRowVariants = tableBodyRowVariants;
exports.tableHeaderRowVariants = tableHeaderRowVariants;
exports.tableWrapperVariants = tableWrapperVariants;
exports.thumbVariants = thumbVariants;
exports.toCssSize = toCssSize;
exports.trackVariants = trackVariants;
exports.triggerVariants = triggerVariants;
exports.useFuzzySearch = useFuzzySearch;
exports.usePagination = usePagination;
exports.useSweetAlert = useSweetAlert;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map