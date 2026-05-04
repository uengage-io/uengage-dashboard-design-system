"use client";
import { cva } from 'class-variance-authority';
import { Switch, AlertDialog as AlertDialog$1, Separator as Separator$1, Dialog, Slot, Popover as Popover$1, Label as Label$1, RadioGroup as RadioGroup$1, Checkbox as Checkbox$1, Accordion as Accordion$1, Tabs as Tabs$1 } from 'radix-ui';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as React6 from 'react';
import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { X, Search, ChevronDown, Check, CircleAlert, EyeOff, Eye, Minus, ChevronLeft, ChevronRight, CalendarIcon, ChevronUp, ChevronsUpDown, ChevronsLeft, ChevronsRight, Loader2, HelpCircle, Info, AlertTriangle } from 'lucide-react';
import Fuse from 'fuse.js';
import { Command as Command$1, CommandInput as CommandInput$1, CommandList as CommandList$1, CommandEmpty as CommandEmpty$1, CommandGroup as CommandGroup$1, CommandItem as CommandItem$1, CommandSeparator as CommandSeparator$1 } from 'cmdk';
import * as ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';
import { DayPicker } from 'react-day-picker';

// src/components/ui/button.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var buttonVariants = cva(
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
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(AlertDialog$1.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialog$1.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Overlay,
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
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, { ...overlayProps }),
    /* @__PURE__ */ jsx(
      AlertDialog$1.Content,
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Title,
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
  return /* @__PURE__ */ jsx(
    AlertDialog$1.Description,
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(Button, { variant, size, asChild: true, children: /* @__PURE__ */ jsx(
    AlertDialog$1.Action,
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
  return /* @__PURE__ */ jsx(Button, { variant, size, asChild: true, children: /* @__PURE__ */ jsx(
    AlertDialog$1.Cancel,
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
  return /* @__PURE__ */ jsx(
    Separator$1.Root,
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
  return /* @__PURE__ */ jsx(Dialog.Root, { "data-slot": "drawer", ...props });
}
function DrawerTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog.Trigger, { "data-slot": "drawer-trigger", ...props });
}
function DrawerPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog.Portal, { "data-slot": "drawer-portal", ...props });
}
function DrawerClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog.Close, { "data-slot": "drawer-close", ...props });
}
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(DrawerPortal, { children: /* @__PURE__ */ jsx(
    Dialog.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "uengage-ui",
        "fixed inset-0 z-50 bg-black/50 transition-opacity opacity-0",
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
  return /* @__PURE__ */ jsx(DrawerPortal, { children: /* @__PURE__ */ jsxs(
    Dialog.Content,
    {
      "data-slot": "drawer-content",
      className: cn(
        "uengage-ui",
        "fixed z-50 bg-background border shadow-lg outline-none",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(Dialog.Title, { className: "sr-only", children: accessibleTitle }),
        children
      ]
    }
  ) });
}
function DrawerTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog.Title,
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
  return /* @__PURE__ */ jsx(
    Dialog.Description,
    {
      "data-slot": "drawer-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
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

// src/components/custom/Button/buttonColors.ts
var g = brand.green;
var button = {
  primary: {
    default: {
      background: [g.green, g.deepGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF"
    },
    hover: {
      background: [g.darkGreen, g.darkestGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF"
    },
    pressed: {
      background: [g.darkGreen, g.darkestGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF"
    },
    focused: {
      background: [g.green, g.deepGreen],
      border: [g.mintGreen],
      borderWidth: 2,
      text: "#FFFFFF"
    },
    disabled: {
      background: ["#DDDDDD"],
      border: ["#E9E9E9"],
      borderWidth: 2,
      text: "#595959",
      opacity: 0.4
    }
  },
  secondary: {
    default: {
      background: ["#FFFFFF"],
      border: ["#E4E4E4", "#9C9C9C"],
      borderWidth: 2,
      text: g.forestGreen
    },
    hover: {
      background: ["#EDEDED", "#FFFFFF"],
      border: ["#E4E4E4", "#9C9C9C"],
      borderWidth: 2,
      text: g.forestGreen
    },
    pressed: {
      background: ["#EDEDED"],
      border: ["#E4E4E4", "#9C9C9C"],
      borderWidth: 2,
      text: g.forestGreen
    },
    focused: {
      background: ["#FFFFFF"],
      border: [g.lightGreen],
      borderWidth: 2,
      text: g.forestGreen
    },
    disabled: {
      background: ["#EDEDED"],
      border: ["#FEFEFE", "#B0B0B0"],
      borderWidth: 2,
      text: "#595959",
      opacity: 0.4
    }
  },
  tertiary: {
    default: {
      background: "transparent",
      border: "transparent",
      borderWidth: 2,
      text: g.forestGreen
    },
    hover: {
      background: "transparent",
      border: [g.lightGreen],
      borderWidth: 2,
      text: g.forestGreen
    },
    pressed: {
      background: [g.paleGreen],
      border: [g.softGreen],
      borderWidth: 2,
      text: g.forestGreen
    },
    focused: {
      background: [g.paleGreen],
      border: [g.mintGreen],
      borderWidth: 2,
      text: g.forestGreen
    },
    disabled: {
      background: "transparent",
      border: "transparent",
      borderWidth: 2,
      text: "#595959",
      opacity: 0.4
    }
  },
  alertPrimary: {
    default: {
      background: ["#D01D1D"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF"
    },
    hover: {
      background: ["#B21E1E"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF"
    },
    pressed: {
      background: ["#940000"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF"
    }
  },
  warningPrimary: {
    default: {
      background: ["#FEF8CD"],
      border: ["#FFE47A", "#D4B020"],
      borderWidth: 2,
      text: "#595959"
    },
    hover: {
      background: ["#FCDB04"],
      border: ["#FFE47A", "#D4B020"],
      borderWidth: 2,
      text: "#595959"
    },
    pressed: {
      background: ["#F2D100"],
      border: ["#FFE47A", "#D4B020"],
      borderWidth: 2,
      text: "#595959"
    }
  },
  alertSecondary: {
    default: {
      background: ["#FFF7F6"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#DC2626"
    },
    hover: {
      background: ["#D01D1D"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF"
    },
    pressed: {
      background: ["#B21E1E"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF"
    }
  }
};
var BASE_CLASSES = [
  "inline-flex flex-row shrink-0 items-center justify-center leading-none",
  "font-['Figtree'] font-medium not-italic",
  "whitespace-nowrap transition-all duration-150 select-none cursor-pointer",
  "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  "disabled:pointer-events-none",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:inline-block"
].join(" ");
var SIZE_CLASSES = {
  xs: "pt-[6px] pr-[10px] pb-[6px] pl-[8px] gap-[4px] text-[10px] [&_svg]:size-[10px]",
  sm: "pt-[8px] pr-[12px] pb-[8px] pl-[10px] gap-[4px] text-xs [&_svg]:size-[14px]",
  md: "pt-[10px] pr-[14px] pb-[10px] pl-[14px] sm:pt-[12px] sm:pr-[16px] sm:pb-[12px] sm:pl-[16px] gap-[6px] text-sm sm:text-base [&_svg]:size-[15px] sm:[&_svg]:size-[16px]",
  lg: "pt-[14px] pr-[18px] pb-[14px] pl-[18px] sm:pt-[20px] sm:pr-[24px] sm:pb-[20px] sm:pl-[24px] gap-[6px] sm:gap-[8px] text-base sm:text-lg [&_svg]:size-[16px]"
};
var VARIANT_SIZE_OVERRIDES = {
  alertPrimary: {
    xs: "pt-[2px] pr-[6px] pb-[2px] pl-[6px] gap-[2px] text-[12px] [&_svg]:size-[12px]",
    sm: "pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[2px] text-[14px] [&_svg]:size-[14px]",
    md: "pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] text-[14px] [&_svg]:size-[14px]",
    lg: "pt-[10px] pr-[16px] pb-[10px] pl-[16px] gap-[6px] text-[16px] [&_svg]:size-[16px]"
  },
  alertSecondary: {
    xs: "pt-[2px] pr-[6px] pb-[2px] pl-[6px] gap-[2px] text-[12px] [&_svg]:size-[12px]",
    sm: "pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[2px] text-[14px] [&_svg]:size-[14px]",
    md: "pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] text-[14px] [&_svg]:size-[14px]",
    lg: "pt-[10px] pr-[16px] pb-[10px] pl-[16px] gap-[6px] text-[16px] [&_svg]:size-[16px]"
  },
  warningPrimary: {
    xs: "pt-[4px] pr-[8px] pb-[4px] pl-[6px] gap-[2px] text-[10px] [&_svg]:size-[12px]",
    sm: "pt-[8px] pr-[12px] pb-[8px] pl-[10px] gap-[4px] text-[12px] [&_svg]:size-[14px]",
    md: "pt-[10px] pr-[14px] pb-[10px] pl-[12px] gap-[4px] text-[14px] [&_svg]:size-[14px]",
    lg: "pt-[14px] pr-[18px] pb-[14px] pl-[16px] gap-[6px] text-[16px] [&_svg]:size-[16px]"
  }
};
var buttonVariants2 = cva(BASE_CLASSES, {
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
function toGradientCSS(value) {
  if (typeof value === "string") {
    return `linear-gradient(${value}, ${value})`;
  }
  if (value.length === 1) {
    return `linear-gradient(${value[0]}, ${value[0]})`;
  }
  return `linear-gradient(to bottom, ${value[0]}, ${value[1]})`;
}
function resolveStateColors(variant, state) {
  const variantColors = button[variant];
  if (!variantColors) return void 0;
  return variantColors[state] ?? variantColors.default;
}
var VARIANT_BORDER_WIDTH = {
  alertPrimary: 1,
  alertSecondary: 1,
  warningPrimary: 1
};
var VARIANT_BORDER_RADIUS = {
  alertPrimary: 20,
  alertSecondary: 20
};
function getButtonStyle(variant, state) {
  const colors = resolveStateColors(variant, state);
  if (!colors) return {};
  const borderWidth = VARIANT_BORDER_WIDTH[variant] ?? colors.borderWidth;
  const borderRadius = VARIANT_BORDER_RADIUS[variant] ?? 30;
  if (variant === "tertiary") {
    const bg = colors.background === "transparent" ? "transparent" : Array.isArray(colors.background) ? colors.background[0] : colors.background;
    const borderColor = colors.border === "transparent" ? "transparent" : Array.isArray(colors.border) ? colors.border[0] : colors.border;
    const style2 = {
      background: bg,
      border: `${borderWidth}px solid ${borderColor}`,
      borderRadius,
      color: colors.text,
      boxShadow: "none"
    };
    if (colors.opacity !== void 0) {
      style2.opacity = colors.opacity;
    }
    return style2;
  }
  const borderCSS = toGradientCSS(colors.border);
  const innerCSS = colors.background === "transparent" ? "linear-gradient(var(--btn-stroke-bg, #fff), var(--btn-stroke-bg, #fff))" : toGradientCSS(colors.background);
  const insetShadow = "0px 2px 4px 0px #0000000A inset";
  const liftShadow = "2px 2px 4px 0px #0000001F";
  const boxShadow = state === "disabled" ? "none" : state === "hover" || state === "pressed" ? `${insetShadow}, ${liftShadow}` : insetShadow;
  const style = {
    background: `${innerCSS} padding-box, ${borderCSS} border-box`,
    border: `${borderWidth}px solid transparent`,
    borderRadius,
    color: colors.text,
    boxShadow
  };
  if (colors.opacity !== void 0) {
    style.opacity = colors.opacity;
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
  const [hovered, setHovered] = React6.useState(false);
  const [pressed, setPressed] = React6.useState(false);
  const [focused, setFocused] = React6.useState(false);
  const interactionBlocked = disabled || loading;
  const state = disabled ? "disabled" : pressed ? "pressed" : hovered ? "hover" : focused ? "focused" : "default";
  const gradientStyle = getButtonStyle(variant, state);
  const sizeClass = VARIANT_SIZE_OVERRIDES[variant]?.[size] ?? SIZE_CLASSES[size];
  const Comp = asChild ? Slot.Root : "button";
  const tertiaryClass = variant === "tertiary" ? "underline" : "";
  const spinner = loadingIcon ?? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin", "aria-hidden": "true" });
  const content = children ?? title;
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      "data-state": state,
      "data-loading": loading || void 0,
      "aria-busy": loading || void 0,
      className: `uengage-ui ${BASE_CLASSES} ${sizeClass}${tertiaryClass ? ` ${tertiaryClass}` : ""}${className ? ` ${className}` : ""}`,
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
        if (e.target.matches(":focus-visible")) setFocused(true);
        onFocus?.(e);
      },
      onBlur: (e) => {
        setFocused(false);
        onBlur?.(e);
      },
      ...props,
      children: loading ? spinner : /* @__PURE__ */ jsxs(Fragment, { children: [
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
  return /* @__PURE__ */ jsx(
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
function TopHeader({
  title,
  helper,
  action,
  divider = true,
  className,
  style,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "header",
    {
      "data-slot": "top-header",
      className: cn("uengage-ui flex w-full shrink-0 flex-col", className),
      style,
      ...props,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            "data-slot": "top-header-row",
            className: "flex w-full flex-row items-center justify-between gap-3 py-[6px] sm:py-[8px]",
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  "data-slot": "top-header-title",
                  className: "flex min-w-0 flex-1 items-center gap-[10px] overflow-hidden",
                  children: [
                    React6.isValidElement(title) ? title : /* @__PURE__ */ jsx("h1", { className: "truncate text-base font-semibold leading-tight text-foreground sm:text-[18px]", children: title }),
                    helper != null && /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs sm:text-sm leading-none", children: helper })
                  ]
                }
              ),
              action != null && /* @__PURE__ */ jsx(
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
        divider && /* @__PURE__ */ jsx(
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
var ALIGN_CLASS = {
  start: "sm:items-start",
  center: "sm:items-center",
  end: "sm:items-end"
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
  return /* @__PURE__ */ jsxs(
    "section",
    {
      "data-slot": "sub-header",
      className: cn("uengage-ui flex w-full flex-col", className),
      style,
      ...props,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            "data-slot": "sub-header-row",
            className: cn(
              // Mobile: stack vertically with a small gap
              "flex w-full flex-col gap-3",
              // sm+: side-by-side with space-between
              "sm:flex-row sm:justify-between sm:gap-4",
              ALIGN_CLASS[align]
            ),
            style: {
              paddingTop: toCssSize(LAYOUT.subHeaderPaddingTop),
              paddingBottom: toCssSize(LAYOUT.subHeaderPaddingBottom)
            },
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  "data-slot": "sub-header-main",
                  className: "flex min-w-0 flex-1 flex-col gap-3",
                  style: gap !== LAYOUT.gap.xs ? { gap: toCssSize(gap) } : void 0,
                  children: [
                    hasHeading && /* @__PURE__ */ jsxs("div", { "data-slot": "sub-header-heading", children: [
                      title != null && (React6.isValidElement(title) ? title : /* @__PURE__ */ jsx("h2", { className: "text-sm sm:text-base font-semibold leading-tight text-foreground", children: title })),
                      subtitle != null && (React6.isValidElement(subtitle) ? subtitle : /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-[12px] sm:text-[13px] leading-tight text-muted-foreground", children: subtitle }))
                    ] }),
                    children != null && /* @__PURE__ */ jsx("div", { "data-slot": "sub-header-content", children })
                  ]
                }
              ),
              right != null && /* @__PURE__ */ jsx(
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
        divider && /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "grid-wrapper",
      className: cn("w-full", className),
      style,
      ...props,
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold break-all min-w-0", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-sm text-muted-foreground break-all min-w-0", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6 min-w-0 break-all", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6 min-w-0 break-all", className),
      ...props
    }
  );
}
function Card2({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Card,
    {
      className: cn(
        "border-gray-300 bg-white p-3 sm:p-4 md:p-5 text-sm text-[#6B7280] shadow-none",
        className
      ),
      ...props
    }
  );
}
Card2.displayName = "Card";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
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
  const fuse = useMemo(
    () => new Fuse(items, {
      keys: ["label"],
      threshold: 0.35,
      minMatchCharLength: 1,
      ignoreLocation: true,
      shouldSort: true
    }),
    [items]
  );
  return useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    return fuse.search(q).map((r) => r.item);
  }, [fuse, query, items]);
}
var SIZE_HEIGHT_CLASSES = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12"
};
var SIZE_TEXT_CLASSES = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
};
var SIZE_PLACEHOLDER_CLASSES = {
  sm: "placeholder:text-[11px]",
  md: "placeholder:text-[12px]",
  lg: "placeholder:text-[14px]"
};
var ICON_SIZES = {
  sm: 14,
  md: 16,
  lg: 20
};
var DIVIDER_CLASSES = {
  sm: "h-4",
  md: "h-5",
  lg: "h-6"
};
function filterValue(raw, valueType) {
  if (valueType === "number") return raw.replace(/[^0-9]/g, "");
  if (valueType === "alphanumeric") return raw.replace(/[^a-zA-Z0-9]/g, "");
  return raw;
}
function SearchBar({
  value: controlledValue,
  defaultValue,
  valueType = "string",
  size = "md",
  placeholder,
  width,
  className,
  inputClassName,
  disabled = false,
  spellCheck = true,
  onChange,
  onSearch,
  onClear,
  onTouch,
  dropdownClassName,
  dropdownItems,
  getLabel,
  getValue,
  onSelect,
  fallbackText = "No results found"
}) {
  const [internal, setInternal] = React6.useState(
    String(controlledValue ?? defaultValue ?? "")
  );
  const [dropdownOpen, setDropdownOpen] = React6.useState(false);
  const wrapperRef = React6.useRef(null);
  const touchedRef = React6.useRef(false);
  React6.useEffect(() => {
    if (controlledValue !== void 0) setInternal(String(controlledValue));
  }, [controlledValue]);
  const displayValue = internal;
  const resolvedItems = React6.useMemo(() => {
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
  const handleChange = (e) => {
    const filtered = filterValue(e.target.value, valueType);
    setInternal(filtered);
    onChange?.(castValue(filtered));
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
    if (disabled) return;
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
    if (disabled) return;
    setInternal("");
    onClear?.();
    setDropdownOpen(false);
  };
  const handleBlur = (e) => {
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      setDropdownOpen(false);
      if (!touchedRef.current) {
        touchedRef.current = true;
        onTouch?.();
      }
    }
  };
  const showClear = displayValue.length > 0;
  const iconSize = ICON_SIZES[size];
  const isDropdownVisible = hasDropdown && dropdownOpen && hasQuery;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: wrapperRef,
      className: cn("uengage-ui relative block w-full", width, className),
      onBlur: handleBlur,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex w-full items-center rounded-[4px] border border-gray-400 bg-white transition-colors",
              !disabled && "hover:border-gray-500 hover:shadow-sm",
              SIZE_TEXT_CLASSES[size],
              SIZE_HEIGHT_CLASSES[size],
              disabled && "pointer-events-none opacity-50"
            ),
            children: [
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: displayValue,
                  placeholder,
                  disabled,
                  spellCheck,
                  onChange: handleChange,
                  onKeyDown: handleKeyDown,
                  className: cn(
                    "border-0 bg-transparent shadow-none outline-none focus-visible:ring-0 h-full flex-1 min-w-0 rounded-[4px] placeholder:text-[#C4C9D2]",
                    SIZE_PLACEHOLDER_CLASSES[size],
                    inputClassName
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1.5 pr-2.5", children: [
                showClear && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClear,
                    disabled,
                    className: "flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors",
                    "aria-label": "Clear search",
                    children: /* @__PURE__ */ jsx(X, { className: "hover:text-red-500", strokeWidth: 2, size: iconSize })
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: cn("w-px bg-gray-400", DIVIDER_CLASSES[size]) }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleSearchClick,
                    disabled,
                    className: "flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer",
                    "aria-label": "Search",
                    children: /* @__PURE__ */ jsx(Search, { strokeWidth: 2, size: iconSize })
                  }
                )
              ] })
            ]
          }
        ),
        isDropdownVisible && /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "absolute left-0 top-full z-50 mt-1 w-full overflow-y-auto rounded-md border border-[#E5E7EB] bg-white shadow-lg max-h-48",
              dropdownClassName
            ),
            children: filteredItems.length > 0 ? filteredItems.map((item) => /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "w-full text-left px-3 py-2 text-sm text-[#374151] hover:bg-[#F3F4F6] transition-colors",
                onClick: () => handleSelect(item),
                children: item.label
              },
              item.value
            )) : /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-sm text-[#9CA3AF]", children: fallbackText })
          }
        )
      ]
    }
  );
}
SearchBar.displayName = "SearchBar";
function Popover({ ...props }) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(
    Popover$1.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "uengage-ui",
        "z-50 min-w-[8rem] overflow-hidden rounded-[4px] border border-[#E5E7EB] bg-white p-0 shadow-md outline-none",
        className
      ),
      ...props
    }
  ) });
}
function Command({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Command$1,
    {
      "data-slot": "command",
      className: cn("uengage-ui flex h-full w-full flex-col overflow-hidden bg-white text-[#111827]", className),
      ...props
    }
  );
}
function CommandInput({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: "uengage-ui flex items-center border-b border-[#E5E7EB] px-3", children: /* @__PURE__ */ jsx(
    CommandInput$1,
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
function CommandList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    CommandList$1,
    {
      "data-slot": "command-list",
      className: cn("max-h-60 overflow-y-auto overflow-x-hidden py-1", className),
      ...props
    }
  );
}
function CommandEmpty({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    CommandEmpty$1,
    {
      "data-slot": "command-empty",
      className: cn("px-3 py-6 text-center text-sm text-[#9CA3AF]", className),
      ...props
    }
  );
}
function CommandGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    CommandGroup$1,
    {
      "data-slot": "command-group",
      className: cn("overflow-hidden", className),
      ...props
    }
  );
}
function CommandItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    CommandItem$1,
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
  return /* @__PURE__ */ jsx(
    CommandSeparator$1,
    {
      "data-slot": "command-separator",
      className: cn("my-1 h-px bg-[#E5E7EB]", className),
      ...props
    }
  );
}

// src/utils/tokens.ts
var FOCUS_RING = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006F42]";
var COMPONENT_HEIGHT = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12"
};
var TEXT_SIZE = {
  xs: "text-[11px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
};
var PLACEHOLDER_SIZE = {
  xs: "placeholder:text-[10px]",
  sm: "placeholder:text-[11px]",
  md: "placeholder:text-[12px]",
  lg: "placeholder:text-[14px]"
};

// src/components/custom/Select/selectVariants.ts
var triggerVariants = cva(
  [
    "flex w-full items-center justify-between",
    "rounded-[4px] border border-gray-400 bg-white",
    "transition-colors duration-150 cursor-pointer select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      state: {
        default: [
          "text-[#374151]",
          "hover:border-gray-500 hover:text-[#111827] hover:shadow-sm"
        ].join(" "),
        open: ["border-gray-500 text-[#111827]", "ring-1 ring-gray-200"].join(
          " "
        ),
        disabled: [
          "border-gray-300 text-gray-400",
          "opacity-50 pointer-events-none"
        ].join(" ")
      },
      size: {
        xs: `h-6 gap-1 px-1.5 ${TEXT_SIZE.xs} ${PLACEHOLDER_SIZE.xs}`,
        sm: `${COMPONENT_HEIGHT.sm} gap-1 px-2 ${TEXT_SIZE.sm} ${PLACEHOLDER_SIZE.sm}`,
        md: `${COMPONENT_HEIGHT.md} gap-1.5 px-3 ${TEXT_SIZE.md} ${PLACEHOLDER_SIZE.md}`,
        lg: `${COMPONENT_HEIGHT.lg} gap-2 px-3.5 ${TEXT_SIZE.lg} ${PLACEHOLDER_SIZE.lg}`
      }
    },
    defaultVariants: {
      state: "default",
      size: "md"
    }
  }
);
var SELECT_ALL = "__select_all__";
function CheckboxIcon({ checked }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "flex shrink-0 h-[14px] w-[14px] items-center justify-center rounded-[3px] border",
        checked ? "border-[#006F42] bg-[#006F42]" : "border-[#D1D5DB] bg-white"
      ),
      children: checked && /* @__PURE__ */ jsx(Check, { size: 9, strokeWidth: 3.5, className: "text-white" })
    }
  );
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
  size = "md",
  placeholder = "Select...",
  disabled = false,
  width,
  className,
  onChange,
  onTouch,
  spellCheck = true
}) {
  const touchedRef = React6.useRef(false);
  const interactedRef = React6.useRef(false);
  const resolvedOptions = React6.useMemo(() => {
    if (items && getLabel && getValue) {
      return items.map((item) => ({
        label: getLabel(item),
        value: getValue(item),
        disabled: getDisabled ? getDisabled(item) : false
      }));
    }
    return options ?? [];
  }, [items, getLabel, getValue, getDisabled, options]);
  const [open, setOpen] = React6.useState(false);
  const [search, setSearch] = React6.useState("");
  const filteredOptions = useFuzzySearch(resolvedOptions, search);
  const [selected, setSelected] = React6.useState(
    controlledValue ?? defaultValue ?? (mode === "multi" ? [] : "")
  );
  React6.useEffect(() => {
    if (controlledValue !== void 0) setSelected(controlledValue);
  }, [controlledValue]);
  const selectedArr = mode === "multi" ? Array.isArray(selected) ? selected : [] : [];
  const enabledOptions = resolvedOptions.filter((o) => !o.disabled);
  const allSelected = enabledOptions.length > 0 && enabledOptions.every((o) => selectedArr.includes(o.value));
  const isSelected = (val) => mode === "single" ? selected === val : selectedArr.includes(val);
  const commit = (next) => {
    setSelected(next);
    onChange?.(next);
  };
  const handleSelect = (val) => {
    if (val === SELECT_ALL) {
      commit(allSelected ? [] : enabledOptions.map((o) => o.value));
      return;
    }
    if (mode === "single") {
      commit(val);
      setOpen(false);
    } else {
      const next = selectedArr.includes(val) ? selectedArr.filter((v) => v !== val) : [...selectedArr, val];
      commit(next);
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
    commit(mode === "multi" ? [] : "");
  };
  const pillsContainerRef = React6.useRef(null);
  const [visibleCount, setVisibleCount] = React6.useState(null);
  React6.useLayoutEffect(() => {
    if (mode === "multi") setVisibleCount(null);
  }, [selectedArr.join(","), mode]);
  React6.useLayoutEffect(() => {
    if (visibleCount !== null) return;
    const container = pillsContainerRef.current;
    if (!container || mode !== "multi" || selectedArr.length === 0) {
      setVisibleCount(selectedArr.length);
      return;
    }
    const containerRight = container.getBoundingClientRect().right;
    const pills = Array.from(
      container.querySelectorAll("[data-pill]")
    );
    const BADGE_RESERVE = 40;
    let count = pills.length;
    for (let i = 0; i < pills.length; i++) {
      const pillRight = pills[i].getBoundingClientRect().right;
      const hasMore = i < pills.length - 1;
      const limit = hasMore ? containerRight - BADGE_RESERVE : containerRight;
      if (pillRight > limit) {
        count = i === 0 ? 1 : i;
        break;
      }
    }
    setVisibleCount(count);
  }, [visibleCount]);
  const displayedPills = visibleCount === null ? selectedArr : selectedArr.slice(0, visibleCount);
  const overflowCount = visibleCount === null ? 0 : selectedArr.length - visibleCount;
  const hasSelection = mode === "multi" ? selectedArr.length > 0 : !!selected;
  const singleLabel = mode === "single" ? resolvedOptions.find((o) => o.value === selected)?.label : void 0;
  const triggerState = disabled ? "disabled" : open ? "open" : "default";
  const placeholderSizeClass = size === "lg" ? "text-[14px]" : size === "md" ? "text-[12px]" : "text-[11px]";
  const commandInputSizeClass = size === "lg" ? "h-10 text-base" : size === "md" ? "h-9 text-sm" : "h-8 text-xs";
  const commandItemSizeClass = size === "lg" ? "px-3 py-2.5 text-base" : size === "md" ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs";
  const handleOpenChange = (next) => {
    if (disabled) return;
    setOpen(next);
    if (!next) setSearch("");
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
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "div",
      {
        role: "button",
        tabIndex: disabled ? -1 : 0,
        "aria-disabled": disabled,
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        onFocus: () => {
          interactedRef.current = true;
        },
        onBlur: handleTriggerBlur,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) setOpen((o) => !o);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        },
        className: cn(
          triggerVariants({ state: triggerState, size }),
          width,
          className
        ),
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: mode === "multi" ? pillsContainerRef : void 0,
              className: "flex flex-1 items-center gap-1 overflow-hidden min-w-0",
              children: mode === "multi" ? selectedArr.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                displayedPills.map((val) => {
                  const opt = resolvedOptions.find((o) => o.value === val);
                  if (!opt) return null;
                  return /* @__PURE__ */ jsxs(
                    "span",
                    {
                      "data-pill": true,
                      className: "inline-flex shrink-0 items-center gap-0.5 max-w-[120px] rounded-[4px] bg-[#E6F4EA] px-1.5 py-0.5 text-[11px] font-medium text-[#006F42]",
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "truncate", children: opt.label }),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            tabIndex: -1,
                            onClick: (e) => removePill(val, e),
                            className: "ml-0.5 flex items-center text-[#006F42] hover:text-[#004d2e]",
                            "aria-label": `Remove ${opt.label}`,
                            children: /* @__PURE__ */ jsx(
                              X,
                              {
                                size: 10,
                                strokeWidth: 2,
                                className: "hover:text-red-500"
                              }
                            )
                          }
                        )
                      ]
                    },
                    val
                  );
                }),
                overflowCount > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex shrink-0 items-center justify-center rounded-full bg-[#4B5563] px-1.5 py-0.5 text-[11px] font-semibold text-white min-w-[22px]", children: [
                  "+",
                  overflowCount
                ] })
              ] }) : /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "truncate text-[#C4C9D2]",
                    placeholderSizeClass
                  ),
                  children: placeholder
                }
              ) : /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "truncate",
                    singleLabel ? "text-[#111827]" : cn("text-[#C4C9D2]", placeholderSizeClass)
                  ),
                  children: singleLabel ?? placeholder
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
            hasSelection && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                tabIndex: -1,
                onClick: clearAll,
                className: "flex items-center text-gray-400 hover:text-gray-600",
                "aria-label": "Clear selection",
                children: /* @__PURE__ */ jsx(X, { size: 14, className: "hover:text-red-500", strokeWidth: 2 })
              }
            ),
            /* @__PURE__ */ jsx(
              ChevronDown,
              {
                size: 16,
                strokeWidth: 2,
                className: cn(
                  "text-gray-600 transition-transform duration-200",
                  open && "rotate-180"
                )
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        className: "max-w-[calc(100vw-1rem)]",
        style: {
          width: "var(--radix-popover-trigger-width)"
        },
        children: /* @__PURE__ */ jsxs(Command, { shouldFilter: false, children: [
          /* @__PURE__ */ jsx(
            CommandInput,
            {
              placeholder: "Search...",
              value: search,
              onValueChange: setSearch,
              spellCheck,
              className: commandInputSizeClass
            }
          ),
          /* @__PURE__ */ jsxs(CommandList, { children: [
            filteredOptions.length === 0 && search.trim() ? /* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }) : null,
            mode === "multi" && /* @__PURE__ */ jsxs(
              CommandItem,
              {
                value: SELECT_ALL,
                onSelect: () => handleSelect(SELECT_ALL),
                className: cn(
                  "gap-2 border-b border-[#E5E7EB] font-medium text-[#374151] hover:bg-[#E6F4EA] data-[selected=true]:bg-[#E6F4EA]",
                  commandItemSizeClass
                ),
                children: [
                  /* @__PURE__ */ jsx(CheckboxIcon, { checked: allSelected }),
                  /* @__PURE__ */ jsx("span", { className: "flex-1", children: "Select all" })
                ]
              }
            ),
            filteredOptions.map((option) => /* @__PURE__ */ jsxs(
              CommandItem,
              {
                value: option.value,
                disabled: option.disabled,
                "aria-selected": isSelected(option.value),
                onSelect: () => handleSelect(option.value),
                className: cn(
                  "hover:bg-[#E6F4EA] data-[selected=true]:bg-[#E6F4EA]",
                  commandItemSizeClass
                ),
                children: [
                  mode === "multi" && /* @__PURE__ */ jsx(CheckboxIcon, { checked: isSelected(option.value) }),
                  /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: option.label }),
                  mode === "single" && isSelected(option.value) && /* @__PURE__ */ jsx(Check, { size: 14, className: "shrink-0 text-[#006F42]" })
                ]
              },
              option.value
            ))
          ] })
        ] })
      }
    )
  ] });
}
Select.displayName = "Select";
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Tabs$1.Root,
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
var tabsListVariants = cva(
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
  return /* @__PURE__ */ jsx(
    Tabs$1.List,
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
  return /* @__PURE__ */ jsx(
    Tabs$1.Trigger,
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
var tabTriggerVariants = cva(
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
  "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-transparent",
  "focus-visible:border-transparent focus-visible:ring-0 focus-visible:outline-none"
].join(" ");
function CustomTabsTrigger({
  className,
  children,
  disabled,
  variant = "primary",
  ...props
}) {
  const state = disabled ? "disabled" : "inactive";
  if (variant === "tertiary") {
    return /* @__PURE__ */ jsx(
      TabsTrigger,
      {
        disabled,
        "data-tab-value": props.value,
        className: cn(
          "relative z-10 flex-none w-auto cursor-pointer select-none whitespace-nowrap",
          "rounded-full px-2 py-1 sm:px-3 text-[13px] sm:text-[14px] font-semibold",
          "transition-colors duration-300 ease-out outline-none",
          "text-[#595959] hover:text-black data-[state=active]:!text-black!",
          "bg-transparent data-[state=active]:bg-transparent",
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
  if (variant === "secondary") {
    return /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    TabsTrigger,
    {
      disabled,
      "data-tab-value": props.value,
      className: cn(
        "group/tab relative flex-none w-auto cursor-pointer select-none whitespace-nowrap",
        "p-[10px] text-[15px] font-semibold",
        "transition-colors duration-200 outline-none",
        "bg-transparent data-[state=active]:bg-transparent",
        "border-0 shadow-none after:hidden after:content-none",
        "data-[state=active]:border-0 data-[state=active]:shadow-none",
        FOCUS_RING,
        "disabled:pointer-events-none",
        STRIP_SHADCN_DEFAULTS,
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx("span", { className: "relative z-10 transition-colors duration-200 text-gray-500 group-hover/tab:text-[#0A5A2A] group-data-[state=active]/tab:text-[#0A5A2A] group-disabled/tab:text-[#D1D5DB]", children })
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
  const [uncontrolledValue, setUncontrolledValue] = React6.useState(
    () => getInitialValue(tabs, value, defaultValue)
  );
  const activeValue = value ?? uncontrolledValue;
  React6.useEffect(() => {
    if (value !== void 0) return;
    if (tabs.some((tab) => tab.value === uncontrolledValue)) return;
    setUncontrolledValue(getInitialValue(tabs, value, defaultValue));
  }, [defaultValue, tabs, uncontrolledValue, value]);
  const handleChange = React6.useCallback(
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
  const [open, setOpen] = React6.useState(false);
  if (overflowTabs.length === 0) return null;
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsx("span", { children: overflowLabel }),
          /* @__PURE__ */ jsx(
            ChevronDown,
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
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        align: "end",
        sideOffset: 8,
        className: "w-[220px] rounded-[10px] border border-[#E5E7EB] p-1 shadow-[0_12px_32px_rgba(15,23,42,0.12)]",
        children: /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: overflowTabs.map((tab) => {
          const isActive = tab.value === activeValue;
          return /* @__PURE__ */ jsxs(
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
                /* @__PURE__ */ jsx("span", { className: "truncate", children: tab.label }),
                isActive && /* @__PURE__ */ jsx(
                  Check,
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
function LineTabsOverflowTrigger({
  label,
  open,
  onClick,
  btnRef,
  variant
}) {
  const isPrimary = variant === "primary";
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref: btnRef,
      type: "button",
      onClick,
      className: cn(
        "inline-flex shrink-0 items-center whitespace-nowrap transition-colors duration-200",
        isPrimary ? "relative flex-none gap-1 p-[10px] text-[15px] font-semibold text-gray-500 hover:text-gray-900" : "relative flex-none gap-1 rounded-t-lg px-2 py-3 sm:px-3 sm:py-5 text-[13px] sm:text-[14px] font-medium text-[#595959] hover:text-[#0A5A2A]",
        FOCUS_RING
      ),
      children: [
        /* @__PURE__ */ jsx("span", { children: label }),
        /* @__PURE__ */ jsx(
          ChevronDown,
          {
            size: 16,
            strokeWidth: 2.25,
            className: cn(
              isPrimary ? "text-gray-500" : "text-[#0A5A2A]",
              "transition-transform duration-200",
              open && "rotate-180"
            )
          }
        )
      ]
    }
  );
}
function LineTabsOverflowPanel({
  overflowTabs,
  activeValue,
  onChange,
  onClose,
  triggerRef,
  variant
}) {
  const panelRef = React6.useRef(null);
  const [panelStyle, setPanelStyle] = React6.useState({});
  React6.useLayoutEffect(() => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setPanelStyle({
      position: "fixed",
      top: rect.bottom + 8,
      right: Math.max(0, window.innerWidth - rect.right),
      zIndex: 9999
    });
  }, [triggerRef]);
  React6.useEffect(() => {
    const handleOutside = (e) => {
      const target = e.target;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target))
        return;
      onClose();
    };
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    const handleScroll = () => onClose();
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", handleScroll, { capture: true });
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [onClose, triggerRef]);
  const activeItemClass = variant === "primary" ? "bg-[#F3F4F6] font-semibold text-[#111827]" : "bg-[#F0F9F4] font-semibold text-[#0A5A2A]";
  const checkClass = variant === "primary" ? "text-[#111827]" : "text-[#0A5A2A]";
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: panelRef,
        style: panelStyle,
        className: cn(
          "w-[220px] max-w-[calc(100vw-1rem)]",
          "rounded-[10px] border border-[#E5E7EB] bg-white p-1",
          "shadow-[0_12px_32px_rgba(15,23,42,0.12)]",
          "animate-[uengage-popover-in_140ms_ease-out]"
        ),
        children: /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: overflowTabs.map((tab) => {
          const isActive = tab.value === activeValue;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              disabled: tab.disabled,
              className: cn(
                "flex w-full items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-left text-[13px] sm:text-[14px]",
                "transition-colors duration-150",
                isActive ? activeItemClass : "text-[#374151] hover:bg-[#F8FAFC]",
                tab.disabled && "cursor-not-allowed opacity-50"
              ),
              onClick: () => {
                if (tab.disabled) return;
                onChange(tab.value);
                onClose();
              },
              children: [
                /* @__PURE__ */ jsx("span", { className: "truncate", children: tab.label }),
                isActive && /* @__PURE__ */ jsx(
                  Check,
                  {
                    size: 16,
                    strokeWidth: 2.5,
                    className: cn("shrink-0", checkClass)
                  }
                )
              ]
            },
            tab.value
          );
        }) })
      }
    ),
    document.body
  );
}
function Tabs2(props) {
  if (!props.tabs || props.tabs.length < 2) {
    throw new Error(
      `Tabs: at least two tabs are required to render (received ${props.tabs?.length ?? 0}).`
    );
  }
  const variant = props.variant ?? "primary";
  if (variant === "tertiary") return /* @__PURE__ */ jsx(TertiaryTabs, { ...props });
  if (variant === "secondary") return /* @__PURE__ */ jsx(SecondaryTabs, { ...props });
  return /* @__PURE__ */ jsx(PrimaryTabs, { ...props });
}
function PrimaryTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  visibleTabLimit,
  overflowLabel = "More Options",
  className
}) {
  const wrapperRef = React6.useRef(null);
  const overflowBtnRef = React6.useRef(null);
  const [overflowOpen, setOverflowOpen] = React6.useState(false);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange
  );
  const [indicator, setIndicator] = React6.useState({ left: 0, width: 0, ready: false });
  const { visibleTabs, overflowTabs } = React6.useMemo(
    () => getVisibleTabs(tabs, activeValue, visibleTabLimit),
    [activeValue, tabs, visibleTabLimit]
  );
  const handleChangeAndClose = React6.useCallback(
    (v) => {
      handleChange(v);
      setOverflowOpen(false);
    },
    [handleChange]
  );
  React6.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !activeValue) return;
    const btn = wrapper.querySelector(
      `[data-tab-value="${escapeTabValue(activeValue)}"]`
    );
    if (!btn) {
      setIndicator((i) => ({ ...i, ready: false }));
      return;
    }
    setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth, ready: true });
  }, [
    activeValue,
    visibleTabs.length,
    visibleTabs.map((t) => t.value).join("|")
  ]);
  React6.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const handle = () => {
      const btn = wrapper.querySelector(
        `[data-tab-value="${escapeTabValue(activeValue)}"]`
      );
      if (!btn) return;
      setIndicator((prev) => ({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        ready: prev.ready
      }));
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [activeValue]);
  return /* @__PURE__ */ jsx(
    Tabs,
    {
      value: activeValue,
      onValueChange: handleChangeAndClose,
      className: cn("w-full", className),
      children: /* @__PURE__ */ jsxs("div", { className: "relative w-full border-b border-[#E5E7EB]", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: wrapperRef,
            className: "relative flex min-w-0 items-end overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            children: [
              /* @__PURE__ */ jsx(
                TabsList,
                {
                  variant: "line",
                  className: cn(
                    "flex w-max min-w-0 flex-row items-center justify-start",
                    "h-auto! rounded-none bg-transparent p-0 gap-6"
                  ),
                  children: visibleTabs.map((tab) => /* @__PURE__ */ jsx(
                    CustomTabsTrigger,
                    {
                      value: tab.value,
                      disabled: tab.disabled,
                      variant: "primary",
                      children: tab.label
                    },
                    tab.value
                  ))
                }
              ),
              overflowTabs.length > 0 && /* @__PURE__ */ jsx(
                LineTabsOverflowTrigger,
                {
                  label: overflowLabel,
                  open: overflowOpen,
                  onClick: () => setOverflowOpen((o) => !o),
                  btnRef: overflowBtnRef,
                  variant: "primary"
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  "aria-hidden": "true",
                  className: cn(
                    "pointer-events-none absolute bottom-0 left-0 h-[8px] rounded-t-full",
                    "shadow-[0_-3px_10px_rgba(0,168,107,0.45)]",
                    indicator.ready ? "transition-all duration-300 ease-out opacity-100" : "opacity-0"
                  ),
                  style: {
                    background: "linear-gradient(189.6deg, #003C1B -188.01%, #00A86B 92.12%)",
                    transform: `translateX(${indicator.left}px)`,
                    width: indicator.width
                  }
                }
              )
            ]
          }
        ),
        overflowOpen && overflowTabs.length > 0 && /* @__PURE__ */ jsx(
          LineTabsOverflowPanel,
          {
            overflowTabs,
            activeValue,
            onChange: handleChangeAndClose,
            onClose: () => setOverflowOpen(false),
            triggerRef: overflowBtnRef,
            variant: "primary"
          }
        )
      ] })
    }
  );
}
function SecondaryTabs({
  tabs,
  defaultValue,
  value,
  onChange,
  visibleTabLimit,
  overflowLabel = "More Options",
  className
}) {
  const wrapperRef = React6.useRef(null);
  const overflowBtnRef = React6.useRef(null);
  const [overflowOpen, setOverflowOpen] = React6.useState(false);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange
  );
  const [indicator, setIndicator] = React6.useState({ left: 0, width: 0, ready: false });
  const { visibleTabs, overflowTabs } = React6.useMemo(
    () => getVisibleTabs(tabs, activeValue, visibleTabLimit),
    [activeValue, tabs, visibleTabLimit]
  );
  const handleChangeAndClose = React6.useCallback(
    (v) => {
      handleChange(v);
      setOverflowOpen(false);
    },
    [handleChange]
  );
  React6.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !activeValue) return;
    const btn = wrapper.querySelector(
      `[data-tab-value="${escapeTabValue(activeValue)}"]`
    );
    if (!btn) {
      setIndicator((i) => ({ ...i, ready: false }));
      return;
    }
    setIndicator({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      ready: true
    });
  }, [
    activeValue,
    visibleTabs.length,
    visibleTabs.map((t) => t.value).join("|")
  ]);
  React6.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const handle = () => {
      const btn = wrapper.querySelector(
        `[data-tab-value="${escapeTabValue(activeValue)}"]`
      );
      if (!btn) return;
      setIndicator((prev) => ({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        ready: prev.ready
      }));
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [activeValue]);
  return /* @__PURE__ */ jsx(
    Tabs,
    {
      value: activeValue,
      onValueChange: handleChangeAndClose,
      className: cn("w-full", className),
      children: /* @__PURE__ */ jsxs("div", { className: "relative w-full border-b border-[#E5E7EB]", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: wrapperRef,
            className: "relative flex min-w-0 items-end gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            children: [
              /* @__PURE__ */ jsx(
                TabsList,
                {
                  variant: "line",
                  className: cn(
                    "flex w-max min-w-0 flex-row items-center justify-start",
                    "h-auto! rounded-none bg-transparent p-0 gap-2"
                  ),
                  children: visibleTabs.map((tab) => /* @__PURE__ */ jsx(
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
              overflowTabs.length > 0 && /* @__PURE__ */ jsx(
                LineTabsOverflowTrigger,
                {
                  label: overflowLabel,
                  open: overflowOpen,
                  onClick: () => setOverflowOpen((o) => !o),
                  btnRef: overflowBtnRef,
                  variant: "secondary"
                }
              ),
              /* @__PURE__ */ jsx(
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
        overflowOpen && overflowTabs.length > 0 && /* @__PURE__ */ jsx(
          LineTabsOverflowPanel,
          {
            overflowTabs,
            activeValue,
            onChange: handleChangeAndClose,
            onClose: () => setOverflowOpen(false),
            triggerRef: overflowBtnRef,
            variant: "secondary"
          }
        )
      ] })
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
  const listRef = React6.useRef(null);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange
  );
  const [chip, setChip] = React6.useState({ left: 0, width: 0, ready: false });
  const { visibleTabs, overflowTabs } = React6.useMemo(
    () => getVisibleTabs(tabs, activeValue, visibleTabLimit),
    [activeValue, tabs, visibleTabLimit]
  );
  React6.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !activeValue) return;
    const btn = list.querySelector(
      `[data-tab-value="${escapeTabValue(activeValue)}"]`
    );
    if (!btn) {
      setChip((c) => ({ ...c, ready: false }));
      return;
    }
    setChip({
      left: btn.offsetLeft,
      width: btn.offsetWidth,
      ready: true
    });
  }, [
    activeValue,
    visibleTabs.length,
    visibleTabs.map((t) => t.value).join("|")
  ]);
  React6.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const handle = () => {
      const btn = list.querySelector(
        `[data-tab-value="${escapeTabValue(activeValue)}"]`
      );
      if (!btn) return;
      setChip((prev) => ({
        left: btn.offsetLeft,
        width: btn.offsetWidth,
        ready: prev.ready
      }));
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [activeValue]);
  return /* @__PURE__ */ jsx(
    Tabs,
    {
      value: activeValue,
      onValueChange: handleChange,
      className: cn("inline-flex max-w-full", className),
      children: /* @__PURE__ */ jsx("div", { className: "flex max-w-full items-center", children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: listRef,
          className: cn(
            "relative inline-flex max-w-full items-center",
            "rounded-full bg-[#dde4f0] p-0.5",
            "overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ),
          children: [
            /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx(
              TabsList,
              {
                variant: "line",
                className: cn(
                  "inline-flex items-center",
                  "rounded-full! bg-transparent! p-0!"
                ),
                children: visibleTabs.map((tab) => /* @__PURE__ */ jsx(
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
            overflowTabs.length > 0 && /* @__PURE__ */ jsx(
              "span",
              {
                className: "mx-1 h-4 w-px shrink-0 bg-[#b8c4d9]",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsx(
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
var inputWrapperVariants = cva(
  "relative flex w-full items-center rounded-[4px] border bg-white transition-colors",
  {
    variants: {
      size: {
        sm: `${COMPONENT_HEIGHT.sm} ${TEXT_SIZE.sm}`,
        md: `${COMPONENT_HEIGHT.md} ${TEXT_SIZE.md}`,
        lg: `${COMPONENT_HEIGHT.lg} ${TEXT_SIZE.lg}`
      },
      state: {
        default: "border-gray-400 hover:border-gray-500 hover:shadow-sm",
        focused: "border-gray-500 ring-1 ring-gray-200",
        error: "border-red-500",
        disabled: "bg-gray-50 border-gray-300 text-gray-400 cursor-not-allowed opacity-60",
        readonly: "bg-gray-50 border-gray-300 text-gray-700 cursor-default"
      }
    },
    defaultVariants: {
      size: "md",
      state: "default"
    }
  }
);
var inputFieldVariants = cva(
  `h-full w-full bg-transparent border-0 shadow-none outline-none text-inherit placeholder:text-[#C4C9D2] disabled:cursor-not-allowed disabled:opacity-100 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none`,
  {
    variants: {
      size: {
        sm: `px-2.5 py-0 ${PLACEHOLDER_SIZE.sm}`,
        md: `px-3 py-0 ${PLACEHOLDER_SIZE.md}`,
        lg: `px-3.5 py-0 ${PLACEHOLDER_SIZE.lg}`
      },
      hasLeftIcon: {
        true: "",
        false: ""
      },
      hasRightIcon: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      { size: "sm", hasLeftIcon: true, className: "pl-8" },
      { size: "md", hasLeftIcon: true, className: "pl-9" },
      { size: "lg", hasLeftIcon: true, className: "pl-10" },
      { size: "sm", hasRightIcon: true, className: "pr-8" },
      { size: "md", hasRightIcon: true, className: "pr-9" },
      { size: "lg", hasRightIcon: true, className: "pr-10" }
    ],
    defaultVariants: {
      size: "md",
      hasLeftIcon: false,
      hasRightIcon: false
    }
  }
);
var inputIconSlotVariants = cva(
  "absolute inset-y-0 flex items-center text-gray-400",
  {
    variants: {
      size: {
        sm: "px-2.5 [&_svg]:size-3.5",
        md: "px-3 [&_svg]:size-4",
        lg: "px-3.5 [&_svg]:size-5"
      },
      side: {
        left: "left-0",
        right: "right-0"
      }
    },
    defaultVariants: {
      size: "md",
      side: "left"
    }
  }
);
var PATTERN_REGEX = {
  alphanumeric: "[^a-zA-Z0-9]",
  alpha: "[^a-zA-Z]",
  numeric: "[^0-9]",
  decimal: "[^0-9.]",
  phone: "[^\\d\\s+\\-()]",
  none: "(?!)"
};
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Label$1.Root,
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
var SIZE_TEXT = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
};
function InputLabel({
  size = "md",
  required = false,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Label,
    {
      className: cn(SIZE_TEXT[size], "font-medium text-slate-700", className),
      ...props,
      children: [
        children,
        required && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "ml-0.5 text-red-500", children: "*" })
      ]
    }
  );
}
InputLabel.displayName = "InputLabel";
var SIZE_TEXT2 = {
  sm: "text-[11px]",
  md: "text-xs",
  lg: "text-sm"
};
var ICON_SIZE = {
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4"
};
function InputHelper({
  size = "md",
  helperText,
  error,
  className,
  ...props
}) {
  if (!error && !helperText) return null;
  const showError = Boolean(error);
  return /* @__PURE__ */ jsxs(
    "p",
    {
      role: showError ? "alert" : void 0,
      className: cn(
        "inline-flex items-center gap-1",
        SIZE_TEXT2[size],
        showError ? "text-red-500" : "text-slate-500",
        className
      ),
      ...props,
      children: [
        showError && /* @__PURE__ */ jsx(CircleAlert, { "aria-hidden": "true", className: cn(ICON_SIZE[size], "shrink-0") }),
        /* @__PURE__ */ jsx("span", { children: showError ? error : helperText })
      ]
    }
  );
}
InputHelper.displayName = "InputHelper";
function Input2({
  size = "md",
  inputType = "text",
  allowPattern,
  label,
  helperText,
  error,
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
  ...rest
}) {
  const reactId = React6.useId();
  const inputId = id ?? reactId;
  const [focused, setFocused] = React6.useState(false);
  const [showPassword, setShowPassword] = React6.useState(false);
  const [internalError, setInternalError] = React6.useState(void 0);
  const touchedRef = React6.useRef(false);
  const isControlled = rest.value !== void 0;
  const [uncontrolledQuery, setUncontrolledQuery] = React6.useState(
    String(rest.defaultValue ?? "")
  );
  const suggestionQuery = isControlled ? String(rest.value ?? "") : uncontrolledQuery;
  const fuseResults = useFuzzySearch(suggestions ?? [], suggestionQuery);
  const showSuggestions = !!suggestions?.length && focused && fuseResults.length > 0 && suggestionQuery.trim().length > 0;
  const wrapperRef = React6.useRef(null);
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
  const isPassword = inputType === "password";
  const effectiveType = isPassword && showPassword ? "text" : inputType;
  const resolvedRightIcon = React6.useMemo(() => {
    if (rightIcon !== void 0) return rightIcon;
    if (!isPassword) return null;
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": showPassword ? "Hide password" : "Show password",
        onClick: () => setShowPassword((s) => !s),
        className: "pointer-events-auto inline-flex items-center justify-center text-gray-400 hover:text-gray-600",
        children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { strokeWidth: 2 }) : /* @__PURE__ */ jsx(Eye, { strokeWidth: 2 })
      }
    );
  }, [rightIcon, isPassword, showPassword]);
  const state = disabled ? "disabled" : readOnly ? "readonly" : effectiveError ? "error" : focused ? "focused" : "default";
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(resolvedRightIcon);
  const handleChange = (e) => {
    if (allowPattern && allowPattern !== "none") {
      const raw = e.target.value;
      const regex = new RegExp(PATTERN_REGEX[allowPattern], "g");
      const stripped = raw.replace(regex, "");
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
  const describedById = effectiveError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0;
  return /* @__PURE__ */ jsxs("div", { className: cn("flex w-full flex-col gap-1.5", width, className), children: [
    label && /* @__PURE__ */ jsx(InputLabel, { htmlFor: inputId, size, required, children: label }),
    /* @__PURE__ */ jsxs("div", { ref: wrapperRef, className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: cn(inputWrapperVariants({ size, state })), children: [
        hasLeftIcon && /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              inputIconSlotVariants({ size, side: "left" }),
              "pointer-events-none"
            ),
            children: leftIcon
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            ...rest,
            id: inputId,
            type: effectiveType,
            disabled,
            readOnly,
            spellCheck,
            "aria-autocomplete": suggestions ? "list" : void 0,
            "aria-invalid": Boolean(effectiveError) || void 0,
            "aria-describedby": describedById,
            onChange: handleChange,
            onWheel: (e) => {
              if (e.currentTarget.type === "number") e.currentTarget.blur();
            },
            onFocus: (e) => {
              setFocused(true);
              onFocus?.(e);
            },
            onBlur: (e) => {
              setTimeout(() => {
                if (!wrapperRef.current?.contains(document.activeElement)) {
                  setFocused(false);
                }
              }, 100);
              setInternalError(runValidation(e.target));
              if (!touchedRef.current) {
                touchedRef.current = true;
                onTouch?.();
              }
              onBlur?.(e);
            },
            className: cn(inputFieldVariants({ size, hasLeftIcon, hasRightIcon }))
          }
        ),
        hasRightIcon && /* @__PURE__ */ jsx("span", { className: cn(inputIconSlotVariants({ size, side: "right" })), children: resolvedRightIcon })
      ] }),
      showSuggestions && /* @__PURE__ */ jsx(
        "ul",
        {
          role: "listbox",
          className: "absolute left-0 top-full z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-[#E5E7EB] bg-white shadow-lg",
          children: fuseResults.map((item) => /* @__PURE__ */ jsx("li", { role: "option", "aria-selected": false, children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => handleSuggestionSelect(item),
              className: "w-full text-left px-3 py-2 text-sm text-[#374151] hover:bg-[#F3F4F6] transition-colors",
              children: item.label
            }
          ) }, item.value))
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      InputHelper,
      {
        id: describedById,
        size,
        helperText,
        error: effectiveError
      }
    )
  ] });
}
Input2.displayName = "Input";
var radioCircleVariants = cva(
  `relative inline-flex shrink-0 items-center justify-center rounded-full border bg-transparent transition-colors outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "h-[14px] w-[14px]",
        md: "h-[18px] w-[18px]",
        lg: "h-[22px] w-[22px]"
      },
      state: {
        default: "border-gray-300 bg-transparent data-[state=checked]:border-[#006F42]",
        disabled: "border-gray-200 bg-transparent opacity-60 cursor-not-allowed",
        error: "border-red-500 bg-transparent"
      }
    },
    defaultVariants: {
      size: "md",
      state: "default"
    }
  }
);
var radioDotVariants = cva("rounded-full bg-[#003C1B]", {
  variants: {
    size: {
      sm: "h-[8px] w-[8px]",
      md: "h-[10px] w-[10px]",
      lg: "h-[12px] w-[12px]"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var radioLabelVariants = cva("select-none transition-colors", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    },
    state: {
      default: "text-gray-700",
      checked: "text-gray-900",
      disabled: "text-gray-400 cursor-not-allowed"
    }
  },
  defaultVariants: {
    size: "md",
    state: "default"
  }
});

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
function Radio({
  id,
  label,
  size = "md",
  disabled,
  error,
  value,
  className,
  ...rest
}) {
  const reactId = React6.useId();
  const itemId = id ?? reactId;
  React6.useEffect(() => {
    validateLabelWordLimit(label, "Radio");
  }, [label]);
  const state = disabled ? "disabled" : error ? "error" : "default";
  const labelState = disabled ? "disabled" : "default";
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: itemId,
      className: cn(
        "group flex w-full cursor-pointer items-center gap-2",
        disabled && "cursor-not-allowed",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          RadioGroup$1.Item,
          {
            ...rest,
            id: itemId,
            value,
            disabled,
            "data-slot": "radio-group-item",
            className: cn(radioCircleVariants({ size, state })),
            children: /* @__PURE__ */ jsx(
              RadioGroup$1.Indicator,
              {
                "data-slot": "radio-group-indicator",
                className: "absolute inset-0 flex items-center justify-center",
                children: /* @__PURE__ */ jsx("span", { className: cn(radioDotVariants({ size })) })
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Label,
          {
            htmlFor: itemId,
            className: cn(
              radioLabelVariants({ size, state: labelState }),
              "whitespace-normal break-words",
              "group-has-[[data-state=checked]]:text-[#006F42]"
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
  layout = "vertical",
  columns = 2,
  disabled,
  label,
  helperText,
  error,
  className
}) {
  const reactId = React6.useId();
  const groupId = `radio-group-${reactId}`;
  const describedById = error ? `${groupId}-error` : helperText ? `${groupId}-helper` : void 0;
  const gridColsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
  };
  const layoutClass = layout === "horizontal" ? "flex flex-row flex-wrap gap-x-6 gap-y-3" : layout === "grid" ? cn("grid w-full gap-x-6 gap-y-3", gridColsMap[columns]) : "flex flex-col gap-3";
  const helperSize = size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs";
  const toLabel = getLabel ?? ((item) => item.label);
  const toValue = getValue ?? ((item) => item.value);
  const toDisabled = getDisabled ?? ((item) => item.disabled);
  return /* @__PURE__ */ jsxs("div", { className: cn("flex w-full flex-col gap-2", className), children: [
    label && /* @__PURE__ */ jsx(Label, { htmlFor: groupId, className: "text-gray-900", children: label }),
    /* @__PURE__ */ jsx(
      RadioGroup$1.Root,
      {
        id: groupId,
        value,
        defaultValue,
        onValueChange: onChange,
        disabled,
        "aria-invalid": Boolean(error) || void 0,
        "aria-describedby": describedById,
        className: layoutClass,
        children: options.map((opt) => {
          const optValue = toValue(opt);
          return /* @__PURE__ */ jsx(
            Radio,
            {
              value: optValue,
              label: toLabel(opt),
              size,
              disabled: disabled || Boolean(toDisabled(opt)),
              error: Boolean(error)
            },
            optValue
          );
        })
      }
    ),
    error ? /* @__PURE__ */ jsxs(
      "p",
      {
        id: `${groupId}-error`,
        className: cn(
          "inline-flex items-center gap-1 text-red-500",
          helperSize
        ),
        children: [
          /* @__PURE__ */ jsx(CircleAlert, { className: "size-3.5", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: error })
        ]
      }
    ) : helperText ? /* @__PURE__ */ jsx("p", { id: `${groupId}-helper`, className: cn("text-gray-500", helperSize), children: helperText }) : null
  ] });
}
RadioGroup.displayName = "CustomRadioGroup";
var checkboxBoxVariants = cva(
  `relative inline-flex shrink-0 items-center justify-center rounded-[4px] border transition-colors outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "h-[14px] w-[14px]",
        md: "h-[20px] w-[20px]",
        lg: "h-[26px] w-[26px]"
      },
      state: {
        unchecked: "bg-white border-gray-300",
        checked: "bg-[#006F42] border-[#006F42] text-white",
        indeterminate: "bg-[#006F42] border-[#006F42] text-white",
        disabled: "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed",
        error: "bg-white border-red-500"
      }
    },
    defaultVariants: {
      size: "md",
      state: "unchecked"
    }
  }
);
var checkboxLabelVariants = cva("select-none transition-colors", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    },
    state: {
      default: "text-gray-700",
      checked: "text-gray-900",
      disabled: "text-gray-400 cursor-not-allowed"
    }
  },
  defaultVariants: {
    size: "md",
    state: "default"
  }
});
var ICON_SIZE2 = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5"
};
var GAP = {
  sm: "gap-1.5",
  md: "gap-2.5",
  lg: "gap-3"
};
function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  size = "md",
  label,
  disabled,
  indeterminate,
  error,
  className,
  ...rest
}) {
  const reactId = React6.useId();
  const itemId = rest.id ?? reactId;
  React6.useEffect(() => {
    validateLabelWordLimit(label, "CustomCheckbox");
  }, [label]);
  const isControlled = checked !== void 0;
  const [internalChecked, setInternalChecked] = React6.useState(
    defaultChecked ?? false
  );
  const visualChecked = isControlled ? Boolean(checked) : internalChecked;
  const radixChecked = indeterminate ? "indeterminate" : isControlled ? Boolean(checked) : internalChecked;
  const handleCheckedChange = (next) => {
    const nextBool = next === true;
    if (!isControlled) setInternalChecked(nextBool);
    onCheckedChange?.(nextBool);
  };
  const boxState = disabled ? "disabled" : error ? "error" : indeterminate ? "indeterminate" : visualChecked ? "checked" : "unchecked";
  const labelState = disabled ? "disabled" : visualChecked || indeterminate ? "checked" : "default";
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: itemId,
      className: cn(
        "group inline-flex cursor-pointer items-center",
        GAP[size],
        disabled && "cursor-not-allowed",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          Checkbox$1.Root,
          {
            ...rest,
            id: itemId,
            checked: radixChecked,
            onCheckedChange: handleCheckedChange,
            disabled,
            "data-slot": "checkbox",
            className: cn(checkboxBoxVariants({ size, state: boxState })),
            children: /* @__PURE__ */ jsx(
              Checkbox$1.Indicator,
              {
                forceMount: true,
                "data-slot": "checkbox-indicator",
                className: "grid h-full w-full place-content-center text-current transition-none data-[state=unchecked]:opacity-0",
                children: indeterminate ? /* @__PURE__ */ jsx(Minus, { className: cn(ICON_SIZE2[size], "stroke-[3]") }) : /* @__PURE__ */ jsx(Check, { className: cn(ICON_SIZE2[size], "stroke-[3]") })
              }
            )
          }
        ),
        label && /* @__PURE__ */ jsx(
          Label,
          {
            htmlFor: itemId,
            className: cn(
              checkboxLabelVariants({ size, state: labelState }),
              "whitespace-normal break-words"
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
  helperText,
  error,
  selectAll
}) {
  const reactId = React6.useId();
  const groupId = `checkbox-group-${reactId}`;
  const describedById = error ? `${groupId}-error` : helperText ? `${groupId}-helper` : void 0;
  const isControlled = value !== void 0;
  const [internalValue, setInternalValue] = React6.useState([]);
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
  const layoutClass = layout === "horizontal" ? "flex flex-row flex-wrap gap-x-6 gap-y-3" : layout === "grid" ? `grid grid-cols-[repeat(${columns},minmax(0,1fr))] gap-x-6 gap-y-3` : "flex flex-col gap-3";
  const helperSize = size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs";
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-2", children: [
    label && /* @__PURE__ */ jsx(Label, { htmlFor: groupId, className: "text-gray-900", children: label }),
    selectAll && /* @__PURE__ */ jsx("div", { className: "pb-1", children: /* @__PURE__ */ jsx(
      Checkbox,
      {
        label: "Select all",
        size,
        disabled: disabled || enabledOptions.length === 0,
        error: Boolean(error),
        checked: allChecked,
        indeterminate,
        onCheckedChange: toggleAll
      }
    ) }),
    /* @__PURE__ */ jsx("div", { id: groupId, role: "group", className: layoutClass, children: options.map((opt) => {
      const optValue = toValue(opt);
      return /* @__PURE__ */ jsx(
        Checkbox,
        {
          label: toLabel(opt),
          size,
          disabled: disabled || Boolean(toDisabled(opt)),
          error: Boolean(error),
          checked: currentValue.includes(optValue),
          onCheckedChange: (c) => toggle(optValue, c)
        },
        optValue
      );
    }) }),
    error ? /* @__PURE__ */ jsxs(
      "p",
      {
        id: `${groupId}-error`,
        className: cn(
          "inline-flex items-center gap-1 text-red-500",
          helperSize
        ),
        children: [
          /* @__PURE__ */ jsx(CircleAlert, { className: "size-3.5", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: error })
        ]
      }
    ) : helperText ? /* @__PURE__ */ jsx("p", { id: `${groupId}-helper`, className: cn("text-gray-500", helperSize), children: helperText }) : describedById ? null : null
  ] });
}
CheckboxGroup.displayName = "CheckboxGroup";
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
function buildYearOptions(center) {
  const opts = [];
  for (let y = center - 10; y <= center + 10; y++) {
    opts.push({ label: String(y), value: String(y) });
  }
  return opts;
}
function StyledDayButton({
  day,
  modifiers,
  className,
  ...props
}) {
  const ref = React6.useRef(null);
  React6.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  const isEdge = modifiers.range_start || modifiers.range_end;
  const isSingleSelected = modifiers.selected && !isEdge && !modifiers.range_middle;
  const isGreenFilled = isSingleSelected || isEdge;
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      disabled: modifiers.disabled,
      className: cn(
        // base circle
        "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006F42] focus-visible:ring-offset-1",
        // green filled circle — single selected or range edge
        isGreenFilled && "bg-[#006F42] text-white font-medium",
        // range middle — transparent, cell bg (#006F42) shows through
        modifiers.range_middle && !isEdge && "w-full rounded-none text-white",
        // today underline — always render; color depends on context
        modifiers.today && (isGreenFilled || modifiers.range_middle && !isEdge) && "underline decoration-white underline-offset-2 decoration-2",
        modifiers.today && !isGreenFilled && !modifiers.range_middle && "underline decoration-[#006F42] underline-offset-2 decoration-2 text-[#006F42] font-semibold hover:bg-[#F3F4F6]",
        // default
        !isGreenFilled && !modifiers.today && !modifiers.range_middle && !modifiers.outside && !modifiers.disabled && "text-[#374151] hover:bg-[#F3F4F6]",
        // outside month
        modifiers.outside && "text-[#D1D5DB] hover:bg-transparent",
        // disabled
        modifiers.disabled && "text-[#D1D5DB] opacity-50 cursor-not-allowed pointer-events-none",
        className
      ),
      ...props
    }
  );
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
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave
}) {
  const today = React6.useMemo(() => /* @__PURE__ */ new Date(), []);
  const initialMonth = defaultMonth ?? (selected instanceof Date ? selected : selected?.from) ?? today;
  const [viewMonth, setViewMonth] = React6.useState(initialMonth);
  const yearOptions = React6.useMemo(
    () => buildYearOptions(today.getFullYear()),
    [today]
  );
  const handlePrev = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const handleNext = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  const handleMonthSelect = (val) => setViewMonth(
    (prev) => new Date(prev.getFullYear(), Number(val), 1)
  );
  const handleYearSelect = (val) => setViewMonth((prev) => new Date(Number(val), prev.getMonth(), 1));
  const isPrevDisabled = !!minDate && new Date(viewMonth.getFullYear(), viewMonth.getMonth()) <= new Date(minDate.getFullYear(), minDate.getMonth());
  const isNextDisabled = !!maxDate && new Date(viewMonth.getFullYear(), viewMonth.getMonth()) >= new Date(maxDate.getFullYear(), maxDate.getMonth());
  return /* @__PURE__ */ jsxs("div", { className: cn("w-[360px] max-w-full bg-white", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 px-3 py-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handlePrev,
          disabled: isPrevDisabled,
          className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] text-[#374151] transition-colors hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-30",
          "aria-label": "Previous month",
          children: /* @__PURE__ */ jsx(ChevronLeft, { size: 14, strokeWidth: 2.5 })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-center gap-1.5", children: [
        /* @__PURE__ */ jsx(
          Select,
          {
            options: MONTH_OPTIONS,
            value: String(viewMonth.getMonth()),
            onChange: handleMonthSelect,
            size: "sm",
            className: "w-36"
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            options: yearOptions,
            value: String(viewMonth.getFullYear()),
            onChange: handleYearSelect,
            size: "sm",
            className: "w-24"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleNext,
          disabled: isNextDisabled,
          className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] text-[#374151] transition-colors hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-30",
          "aria-label": "Next month",
          children: /* @__PURE__ */ jsx(ChevronRight, { size: 14, strokeWidth: 2.5 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsx(
      DayPicker,
      {
        mode,
        selected: selected ?? void 0,
        onSelect,
        month: viewMonth,
        onMonthChange: setViewMonth,
        hideNavigation: true,
        showOutsideDays: true,
        disabled,
        onDayClick,
        onDayMouseEnter,
        onDayMouseLeave,
        startMonth: minDate ? new Date(minDate.getFullYear(), minDate.getMonth()) : void 0,
        endMonth: maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth()) : void 0,
        classNames: {
          months: "flex flex-col",
          month: "flex flex-col gap-1",
          month_caption: "hidden",
          weekdays: "flex mb-1",
          // flex-1 so weekday columns match day cell columns exactly
          weekday: "flex-1 text-center text-[11px] font-medium text-[#9CA3AF] h-7 flex items-center justify-center select-none",
          weeks: "flex flex-col gap-0.5",
          week: "flex",
          // flex-1 — cells fill row proportionally for seamless band
          day: "flex-1 flex items-center justify-center p-0 relative",
          day_button: "",
          // dark green range band
          range_start: "bg-[linear-gradient(to_right,transparent_50%,#006F42_50%)]",
          range_middle: "bg-[#006F42]",
          range_end: "bg-[linear-gradient(to_right,#006F42_50%,transparent_50%)]",
          selected: "",
          today: "",
          outside: "",
          disabled: "",
          hidden: "invisible"
        },
        components: {
          DayButton: StyledDayButton
        }
      }
    ) })
  ] });
}
var triggerVariants2 = cva(
  "inline-flex items-center w-full rounded-[4px] border border-gray-400 bg-white transition-colors",
  {
    variants: {
      state: {
        default: "text-[#374151] hover:border-gray-500 hover:shadow-sm",
        open: "border-gray-500 ring-1 ring-gray-200 text-[#374151]",
        disabled: "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60 pointer-events-none"
      },
      size: {
        sm: `${COMPONENT_HEIGHT.sm} ${TEXT_SIZE.sm}`,
        md: `${COMPONENT_HEIGHT.md} ${TEXT_SIZE.md}`,
        lg: `${COMPONENT_HEIGHT.lg} ${TEXT_SIZE.lg}`
      }
    },
    defaultVariants: { state: "default", size: "md" }
  }
);
var dayCellVariants = cva(
  "flex items-center justify-center text-sm rounded-[4px] cursor-pointer select-none transition-colors w-8 h-8",
  {
    variants: {
      variant: {
        default: "text-[#374151] hover:bg-[#F3F4F6]",
        today: "text-[#006F42] font-semibold hover:bg-[#F3F4F6]",
        selected: "bg-[#006F42] text-white",
        inRange: "bg-[#E6F4EA] text-[#374151] rounded-none",
        rangeStart: "bg-[#006F42] text-white rounded-r-none",
        rangeEnd: "bg-[#006F42] text-white rounded-l-none",
        outsideMonth: "text-[#D1D5DB] cursor-default hover:bg-transparent"
      }
    },
    defaultVariants: { variant: "default" }
  }
);

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
function formatRange(from, to) {
  const f = formatDate(from);
  const t = formatDate(to);
  if (!f && !t) return null;
  return `${f ?? "\u2014"} \u2013 ${t ?? "\u2014"}`;
}
function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isDateRange(v) {
  return !!v && typeof v === "object" && "from" in v && "to" in v && (v.from instanceof Date || v.to instanceof Date);
}
function orderedRange(a, b) {
  return a <= b ? { from: a, to: b } : { from: b, to: a };
}
function DateBox({
  label,
  active
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex h-9 flex-1 items-center justify-center rounded-lg border text-sm transition-colors",
        active ? "border-[#006F42] text-[#111827]" : "border-[#D1D5DB] text-[#9CA3AF]",
        !label && "text-[#C4C9D2]"
      ),
      children: label ?? "\u2014"
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
  onTouch
}) {
  const [open, setOpen] = React6.useState(false);
  const touchedRef = React6.useRef(false);
  const interactedRef = React6.useRef(false);
  const [committed, setCommitted] = React6.useState(
    controlledValue !== void 0 ? controlledValue ?? null : null
  );
  React6.useEffect(() => {
    if (controlledValue !== void 0) setCommitted(controlledValue ?? null);
  }, [controlledValue]);
  const [pendingFrom, setPendingFrom] = React6.useState(null);
  const [draftRange, setDraftRange] = React6.useState(null);
  const [hoverDate, setHoverDate] = React6.useState(null);
  const prevOpen = React6.useRef(false);
  React6.useEffect(() => {
    if (open && !prevOpen.current) {
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(
        mode === "range" && isDateRange(committed) ? committed : null
      );
    }
    if (!open && prevOpen.current) {
      setPendingFrom(null);
      setHoverDate(null);
    }
    prevOpen.current = open;
  }, [open, committed, mode]);
  const calendarDisabled = React6.useMemo(() => {
    const m = [];
    if (minDate) m.push({ before: minDate });
    if (maxDate) m.push({ after: maxDate });
    return m.length > 0 ? m : void 0;
  }, [minDate, maxDate]);
  const triggerLabel = React6.useMemo(() => {
    if (!committed) return null;
    if (mode === "single" && committed instanceof Date)
      return formatDate(committed);
    if (mode === "range" && isDateRange(committed))
      return formatRange(committed.from, committed.to) ?? null;
    return null;
  }, [committed, mode]);
  const calendarSelected = React6.useMemo(() => {
    if (mode === "single") {
      return committed instanceof Date ? committed : void 0;
    }
    if (pendingFrom) {
      const end = hoverDate ?? pendingFrom;
      return orderedRange(pendingFrom, end);
    }
    if (draftRange) return draftRange;
    if (isDateRange(committed)) return committed;
    return void 0;
  }, [mode, committed, pendingFrom, draftRange, hoverDate]);
  const fromLabel = React6.useMemo(() => {
    if (pendingFrom) return formatDate(pendingFrom);
    if (draftRange) return formatDate(draftRange.from);
    if (isDateRange(committed)) return formatDate(committed.from);
    return null;
  }, [pendingFrom, draftRange, committed]);
  const toLabel = React6.useMemo(() => {
    if (pendingFrom)
      return hoverDate ? formatDate(orderedRange(pendingFrom, hoverDate).to) : null;
    if (draftRange) return formatDate(draftRange.to);
    if (isDateRange(committed)) return formatDate(committed.to);
    return null;
  }, [pendingFrom, hoverDate, draftRange, committed]);
  const handleDayClick = (date, modifiers) => {
    if (modifiers.disabled) return;
    if (mode === "single") {
      setCommitted(date);
      onChange?.(date);
      setOpen(false);
      return;
    }
    if (pendingFrom === null) {
      setPendingFrom(date);
      setDraftRange(null);
    } else {
      const range = orderedRange(pendingFrom, date);
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(range);
    }
  };
  const handleDayMouseEnter = (date) => {
    if (pendingFrom) setHoverDate(date);
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
  const handleCancel = () => {
    setPendingFrom(null);
    setHoverDate(null);
    setDraftRange(null);
    setOpen(false);
  };
  const handleClearTrigger = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCommitted(null);
    setDraftRange(null);
    setPendingFrom(null);
    setHoverDate(null);
    onChange?.(null);
  };
  const handleOpenChange = (next) => {
    if (disabled) return;
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
  const triggerState = disabled ? "disabled" : open ? "open" : "default";
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "div",
      {
        role: "button",
        tabIndex: disabled ? -1 : 0,
        "aria-disabled": disabled,
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        onFocus: () => {
          interactedRef.current = true;
        },
        onBlur: handleTriggerBlur,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) setOpen((o) => !o);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        },
        className: cn(
          triggerVariants2({ state: triggerState, size }),
          "gap-2 px-3 cursor-pointer select-none",
          width,
          className
        ),
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "flex-1 truncate",
                triggerLabel ? "text-[#111827]" : cn(
                  "text-[#C4C9D2]",
                  size === "lg" ? "text-[14px]" : size === "md" ? "text-[12px]" : "text-[11px]"
                )
              ),
              children: triggerLabel ?? placeholder
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
            committed && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                tabIndex: -1,
                onClick: handleClearTrigger,
                className: "flex items-center text-gray-400 transition-colors hover:text-gray-600",
                "aria-label": "Clear",
                children: /* @__PURE__ */ jsx(X, { size: 13, strokeWidth: 2, className: "hover:text-red-500" })
              }
            ),
            /* @__PURE__ */ jsx(
              CalendarIcon,
              {
                size: 15,
                strokeWidth: 2,
                className: "text-gray-600"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        align: "start",
        className: "w-auto max-w-[calc(100vw-1rem)] p-0",
        children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-lg bg-white shadow-md", children: [
          mode === "range" && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 px-3 pt-3", children: [
            /* @__PURE__ */ jsx(DateBox, { label: fromLabel, active: !!fromLabel }),
            /* @__PURE__ */ jsx(DateBox, { label: toLabel, active: false })
          ] }),
          /* @__PURE__ */ jsx(
            DatePickerCalendar,
            {
              mode,
              selected: calendarSelected,
              disabled: calendarDisabled,
              minDate,
              maxDate,
              onDayClick: (date, modifiers) => handleDayClick(date, modifiers),
              onDayMouseEnter: (date) => handleDayMouseEnter(date),
              onDayMouseLeave: () => handleDayMouseLeave()
            }
          ),
          mode === "range" && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 border-t border-[#F3F4F6] px-3 py-2.5", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleCancel,
                className: "rounded-full bg-[#F1F3F4] px-5 py-1.5 text-sm font-medium text-[#374151] transition-colors hover:bg-[#E8EAED]",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: handleApply,
                disabled: !canApply,
                className: cn(
                  "rounded-full border px-5 py-1.5 text-sm font-medium transition-colors",
                  canApply ? "border-[#006F42] text-[#006F42]" : "border-gray-300 text-gray-400 cursor-not-allowed"
                ),
                children: "Apply"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
DatePicker.displayName = "DatePicker";
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "uengage-ui relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-md bg-accent", className),
      ...props
    }
  );
}
var tableWrapperVariants = cva("w-full", {
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
var tableHeaderRowVariants = cva(
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
var tableBodyRowVariants = cva("transition-colors", {
  variants: {
    size: {
      sm: "py-1.5 sm:py-2 text-xs",
      md: "py-2 sm:py-3 text-sm",
      lg: "py-3 sm:py-4 text-sm sm:text-base"
    },
    clickable: {
      true: "hover:bg-gray-50 cursor-pointer",
      false: ""
    }
  },
  defaultVariants: {
    size: "md",
    clickable: false
  }
});
var statusBadgeVariants = cva(
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
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TableCell,
    {
      className: cn(
        tableBodyRowVariants({ size }),
        alignClass[align],
        // Allow content to wrap and break long words/URLs that would otherwise
        // force the column wider than its flex-allocated share.
        "whitespace-normal break-words align-top",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: "min-w-0 w-full", children })
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
  const Icon = sorted === "asc" ? ChevronUp : sorted === "desc" ? ChevronDown : ChevronsUpDown;
  const handleClick = sortable ? onSort : void 0;
  return /* @__PURE__ */ jsx(
    TableHead,
    {
      "aria-sort": sortable ? sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : "none" : void 0,
      onClick: handleClick,
      className: cn(
        tableHeaderRowVariants({ size }),
        alignClass2[align],
        "whitespace-normal break-words align-middle",
        sortable && "cursor-pointer select-none hover:text-gray-700",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-1 min-w-0", justifyClass[align]), children: [
        /* @__PURE__ */ jsx("span", { className: "min-w-0 break-words", children }),
        sortable ? /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5 shrink-0", "aria-hidden": "true" }) : null
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
  return /* @__PURE__ */ jsx(TableBody, { className, children: Array.from({ length: rows }).map((_, rowIndex) => /* @__PURE__ */ jsx(TableRow, { children: Array.from({ length: columns }).map((__, colIndex) => /* @__PURE__ */ jsx(TableCell, { className: cn("py-3 align-middle"), children: /* @__PURE__ */ jsx(
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
  className
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(null);
  const sortedData = useMemo(() => {
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        tableWrapperVariants({ bordered }),
        // Strip wrapper border on mobile when card view owns its own borders
        mobileLayout === "cards" && bordered && "max-md:border-0 max-md:rounded-none",
        className
      ),
      children: [
        mobileLayout === "cards" && /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 sm:gap-3 md:hidden", children: loading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "rounded-lg border bg-white p-3 sm:p-4 space-y-2 sm:space-y-3", children: visibleColumns.map((_2, j) => /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-full" }, j)) }, i)) : sortedData.length === 0 ? /* @__PURE__ */ jsx("p", { className: "py-8 text-center text-sm text-gray-500", children: emptyMessage }) : sortedData.map((row, rowIndex) => {
          const rowKey = String(
            row[keyField] ?? rowIndex
          );
          return /* @__PURE__ */ jsx(
            "div",
            {
              onClick: onRowClick ? () => onRowClick(row) : void 0,
              className: cn(
                "rounded-lg border border-gray-200 bg-white p-3 sm:p-4",
                onRowClick && "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors",
                rowClassName?.(row)
              ),
              children: visibleColumns.map((col) => {
                const colKey = String(col.key);
                const rawValue = row[colKey];
                const content = col.render ? col.render(rawValue, row, rowIndex) : rawValue;
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex items-start justify-between gap-3 sm:gap-4 border-b border-gray-100 py-1.5 sm:py-2 first:pt-0 last:border-0 last:pb-0",
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs font-medium text-gray-500", children: col.header }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: cn(
                            "text-sm flex-1 min-w-0",
                            col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
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
        }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "overflow-x-auto",
              // Clip table cells to the rounded corners — overflow:auto on this
              // element also clips to border-radius, so no parent overflow-hidden needed.
              bordered && "rounded-lg",
              stickyHeader && "overflow-y-auto",
              mobileLayout === "cards" && "hidden md:block"
            ),
            style: scrollStyle,
            children: /* @__PURE__ */ jsxs(
              Table,
              {
                className: "w-full",
                style: tableMinWidth > 0 ? { minWidth: `${tableMinWidth}px` } : { minWidth: "max-content" },
                children: [
                  /* @__PURE__ */ jsx("colgroup", { children: columns.map((col, i) => /* @__PURE__ */ jsx(
                    "col",
                    {
                      style: {
                        width: colWidths[i],
                        minWidth: col.minWidth ? `${col.minWidth}px` : void 0
                      }
                    },
                    String(col.key)
                  )) }),
                  /* @__PURE__ */ jsx(
                    TableHeader,
                    {
                      className: cn(stickyHeader && "sticky top-0 z-10 bg-slate-50"),
                      children: /* @__PURE__ */ jsx(TableRow, { children: columns.map((col) => {
                        const colKey = String(col.key);
                        return /* @__PURE__ */ jsx(
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
                  loading ? /* @__PURE__ */ jsx(TableSkeleton, { columns: columns.length }) : sortedData.length === 0 ? /* @__PURE__ */ jsx(TableBody, { children: /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
                    TableCell,
                    {
                      colSpan: columns.length,
                      className: "py-10 text-center text-sm text-gray-500",
                      children: emptyMessage
                    }
                  ) }) }) : /* @__PURE__ */ jsx(TableBody, { children: sortedData.map((row, rowIndex) => {
                    const rowKey = String(
                      row[keyField] ?? rowIndex
                    );
                    return /* @__PURE__ */ jsx(
                      TableRow,
                      {
                        onClick: onRowClick ? () => onRowClick(row) : void 0,
                        className: cn(
                          tableBodyRowVariants({
                            size,
                            clickable: Boolean(onRowClick)
                          }),
                          rowClassName?.(row)
                        ),
                        children: columns.map((col) => {
                          const colKey = String(col.key);
                          const rawValue = row[colKey];
                          const content = col.render ? col.render(rawValue, row, rowIndex) : rawValue;
                          return /* @__PURE__ */ jsx(
                            TableCell2,
                            {
                              size,
                              align: col.align ?? "left",
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
  const iconNode = icon ? /* @__PURE__ */ jsx(
    "span",
    {
      className: "inline-flex items-center flex-shrink-0",
      "aria-hidden": "true",
      children: icon
    }
  ) : null;
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("span", { className: "truncate", children: label }),
        iconPosition === "right" ? iconNode : null
      ]
    }
  );
}
var trackVariants = cva(
  [
    "group/uengage-toggle relative inline-flex items-center rounded-full border-2",
    "transition-all duration-200 cursor-pointer select-none shadow-[0_2px_6px_rgba(15,23,42,0.12)]",
    `outline-none ${FOCUS_RING}`,
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-[#F7FAF7] data-[state=unchecked]:border-[#9FB49F]",
    "data-[state=checked]:bg-[#C8D8B6] data-[state=checked]:border-[#1F6B32]"
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-7",
        md: "h-8",
        lg: "h-9"
      },
      hasInsideLabel: {
        true: "justify-end font-medium text-[#1F6B32]",
        false: ""
      }
    },
    compoundVariants: [
      { size: "sm", hasInsideLabel: false, className: "w-12" },
      { size: "md", hasInsideLabel: false, className: "w-[4.2rem]" },
      { size: "lg", hasInsideLabel: false, className: "w-[4.75rem]" },
      {
        size: "sm",
        hasInsideLabel: true,
        className: "w-16 pr-2.5 text-[10px]"
      },
      {
        size: "md",
        hasInsideLabel: true,
        className: "w-[4.8rem] pr-3 text-[11px]"
      },
      {
        size: "lg",
        hasInsideLabel: true,
        className: "w-[5.25rem] pr-3.5 text-[12px]"
      }
    ],
    defaultVariants: {
      size: "md",
      hasInsideLabel: false
    }
  }
);
var thumbVariants = cva(
  [
    "pointer-events-none absolute left-0.5 top-1/2 block rounded-full border border-transparent bg-[#A8B8A2]",
    "-translate-y-1/2 transition-transform duration-200",
    "data-[state=unchecked]:translate-x-0",
    "data-[state=checked]:bg-[#1F6B32] data-[state=checked]:border-[#165126]"
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5 w-5 shadow-[0_1px_2px_rgba(15,23,42,0.18)]",
        md: "h-6 w-6 shadow-[0_2px_3px_rgba(15,23,42,0.18)]",
        lg: "h-7 w-7 shadow-[0_2px_4px_rgba(15,23,42,0.18)]"
      },
      hasInsideLabel: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      {
        size: "sm",
        hasInsideLabel: false,
        className: "data-[state=checked]:translate-x-5"
      },
      {
        size: "md",
        hasInsideLabel: false,
        className: "data-[state=checked]:translate-x-8"
      },
      {
        size: "lg",
        hasInsideLabel: false,
        className: "data-[state=checked]:translate-x-9"
      },
      {
        size: "sm",
        hasInsideLabel: true,
        className: "data-[state=checked]:translate-x-7"
      },
      {
        size: "md",
        hasInsideLabel: true,
        className: "data-[state=checked]:translate-x-8"
      },
      {
        size: "lg",
        hasInsideLabel: true,
        className: "data-[state=checked]:translate-x-9"
      }
    ],
    defaultVariants: {
      size: "md",
      hasInsideLabel: false
    }
  }
);
var Toggle = React6.forwardRef(
  ({
    size = "md",
    label,
    labelPosition = "right",
    checked,
    defaultChecked,
    onChange,
    disabled,
    wrapperClassName,
    ...props
  }, ref) => {
    const isControlled = checked !== void 0;
    const hasInsideLabel = Boolean(label) && labelPosition === "inside";
    const handleChange = (e) => {
      onChange?.(e);
    };
    const switchContent = /* @__PURE__ */ jsxs(
      Switch.Root,
      {
        ref,
        checked: isControlled ? checked : void 0,
        defaultChecked: isControlled ? void 0 : defaultChecked,
        onCheckedChange: handleChange,
        disabled,
        className: trackVariants({ size, hasInsideLabel }),
        ...props,
        children: [
          hasInsideLabel && /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-3 right-3 truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1F6B32]", children: label }),
          /* @__PURE__ */ jsx(
            Switch.Thumb,
            {
              className: thumbVariants({ size, hasInsideLabel })
            }
          )
        ]
      }
    );
    if (!label || hasInsideLabel) {
      return switchContent;
    }
    return /* @__PURE__ */ jsxs(
      "label",
      {
        className: `inline-flex items-center gap-2 cursor-pointer ${labelPosition === "left" ? "flex-row-reverse" : ""} ${wrapperClassName || ""}`,
        children: [
          switchContent,
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-[#1F2937]", children: label })
        ]
      }
    );
  }
);
Toggle.displayName = "Toggle";
var sidebarContentVariants = cva(
  "fixed z-50 bg-background border shadow-lg outline-none will-change-transform",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 border-r",
        right: "inset-y-0 right-0 border-l",
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
var sidebarPersistentVariants = cva("bg-background border", {
  variants: {
    side: {
      left: "h-full border-r",
      right: "h-full border-l",
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
  const [isDesktop, setIsDesktop] = React6.useState(false);
  React6.useEffect(() => {
    const query = `(min-width: ${breakpoint}px)`;
    const media = window.matchMedia(query);
    const setFromMedia = () => setIsDesktop(media.matches);
    setFromMedia();
    media.addEventListener("change", setFromMedia);
    return () => media.removeEventListener("change", setFromMedia);
  }, [breakpoint]);
  return isDesktop;
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
  className,
  contentClassName,
  children
}) {
  const isDesktop = useIsDesktop();
  const isControlled = open !== void 0;
  const [uncontrolledOpen, setUncontrolledOpen] = React6.useState(defaultOpen);
  const resolvedOpen = isControlled ? open : uncontrolledOpen;
  const handleOpenChange = React6.useCallback(
    (nextOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );
  const customSizeStyle = React6.useMemo(() => {
    if (sizePercent == null) return {};
    const pct = Math.min(100, Math.max(1, sizePercent));
    if (side === "top" || side === "bottom") {
      return { height: `${pct}vh`, maxHeight: "100vh" };
    }
    if (!isDesktop) return { width: "100vw", maxWidth: "100vw" };
    return { width: `${pct}vw`, maxWidth: "100vw" };
  }, [sizePercent, side, isDesktop]);
  const animDurationStyle = React6.useMemo(() => {
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
  if (shouldRenderPersistent) {
    if (!resolvedOpen) {
      return null;
    }
    return /* @__PURE__ */ jsx(
      "aside",
      {
        className: cn(
          sidebarPersistentVariants({ side, size }),
          className,
          contentClassName
        ),
        style: customSizeStyle,
        children
      }
    );
  }
  return /* @__PURE__ */ jsxs(Drawer, { open: resolvedOpen, onOpenChange: handleOpenChange, children: [
    trigger ? /* @__PURE__ */ jsx(DrawerTrigger, { asChild: true, children: trigger }) : null,
    overlay ? /* @__PURE__ */ jsx(
      DrawerOverlay,
      {
        onClick: () => {
          if (closeOnOutsideClick) {
            handleOpenChange(false);
          }
        }
      }
    ) : null,
    /* @__PURE__ */ jsx(
      DrawerContent,
      {
        "aria-label": `${side} sidebar`,
        "data-side": side,
        onInteractOutside: (event) => {
          if (overlay) {
            event.preventDefault();
            return;
          }
          if (!closeOnOutsideClick) event.preventDefault();
        },
        className: cn(
          sidebarContentVariants({ side, size }),
          className,
          contentClassName
        ),
        style: { ...animDurationStyle, ...customSizeStyle },
        children
      }
    )
  ] });
}
var iconBadgeVariants = cva(
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
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
  question: HelpCircle
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
  const Icon = typeof icon === "function" ? icon : VARIANT_ICONS[resolvedVariant] ?? Info;
  const bodyText = text ?? description;
  return /* @__PURE__ */ jsx(
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
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 sm:gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: cn(iconBadgeVariants({ variant: resolvedVariant }), ICON_ANIM[resolvedVariant]), children: /* @__PURE__ */ jsx(Icon, { className: "size-7 sm:size-10", strokeWidth: 2.5, "aria-hidden": true }) }),
        /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "gap-2 sm:text-center sm:place-items-center", children: [
          /* @__PURE__ */ jsx(AlertDialogTitle, { className: "text-xl sm:text-2xl font-semibold tracking-tight", children: title }),
          bodyText && /* @__PURE__ */ jsx(AlertDialogDescription, { className: "text-sm sm:text-base text-muted-foreground", children: bodyText })
        ] }),
        input && /* @__PURE__ */ jsxs("div", { className: "w-full text-left", children: [
          input === "textarea" ? /* @__PURE__ */ jsx(
            "textarea",
            {
              className: "min-h-20 sm:min-h-24 w-full resize-none rounded-xl border bg-background px-3 sm:px-4 py-2 sm:py-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              placeholder: inputPlaceholder,
              value: String(inputValue ?? ""),
              onChange: (e) => onInputChange(e.target.value),
              disabled: loading
            }
          ) : /* @__PURE__ */ jsx(
            "input",
            {
              className: "h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
              placeholder: inputPlaceholder,
              value: String(inputValue ?? ""),
              onChange: (e) => onInputChange(e.target.value),
              disabled: loading
            }
          ),
          inputError && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-destructive", children: inputError })
        ] }),
        submitError && /* @__PURE__ */ jsx("div", { className: "w-full rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-left text-sm text-destructive", children: submitError }),
        footer ? /* @__PURE__ */ jsx(AlertDialogFooter, { className: "w-full sm:justify-center", children: footer }) : showActions !== false ? /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "w-full sm:justify-center", children: [
          showCancelButton && /* @__PURE__ */ jsx(Button2, { variant: cancelButtonVariant, disabled: loading, onClick: onDismiss, className: "w-full sm:w-auto", children: cancelButtonText }),
          /* @__PURE__ */ jsx(Button2, { variant: confirmButtonVariant, loading, onClick: onConfirm, className: "w-full sm:w-auto", children: confirmButtonText })
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
  const [uncontrolledOpen, setUncontrolledOpen] = React6.useState(defaultOpen);
  const open = isControlled ? openProp : uncontrolledOpen;
  const [inputValue, setInputValue] = React6.useState(defaultValue ?? "");
  const [inputError, setInputError] = React6.useState(null);
  const [submitError, setSubmitError] = React6.useState(null);
  const [loading, setLoading] = React6.useState(false);
  const setOpen = React6.useCallback(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  React6.useEffect(() => {
    if (!open) return;
    setInputValue(defaultValue ?? "");
    setInputError(null);
    setSubmitError(null);
    setLoading(false);
  }, [open]);
  React6.useEffect(() => {
    if (!open || !autoCloseMs || loading) return;
    const id = window.setTimeout(() => setOpen(false), autoCloseMs);
    return () => window.clearTimeout(id);
  }, [open, autoCloseMs, loading]);
  const dismiss = React6.useCallback(() => setOpen(false), [setOpen]);
  const confirm = React6.useCallback(async () => {
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
  return /* @__PURE__ */ jsxs(AlertDialog, { open, onOpenChange: setOpen, children: [
    trigger && /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsx(
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
var SweetAlertContext = React6.createContext(null);
function useSweetAlert() {
  const ctx = React6.useContext(SweetAlertContext);
  if (!ctx) throw new Error("useSweetAlert must be used inside <SweetAlertProvider>");
  return ctx;
}
function SweetAlertProvider({ children }) {
  const [queue, setQueue] = React6.useState([]);
  const counter = React6.useRef(0);
  const fire = React6.useCallback(
    (options) => new Promise((resolve) => {
      counter.current += 1;
      setQueue((q) => [...q, { id: counter.current, options, resolve }]);
    }),
    []
  );
  const ctx = React6.useMemo(() => ({ fire }), [fire]);
  return /* @__PURE__ */ jsxs(SweetAlertContext.Provider, { value: ctx, children: [
    children,
    queue[0] && /* @__PURE__ */ jsx(
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
  const [open, setOpen] = React6.useState(true);
  const resolvedRef = React6.useRef(false);
  const close = React6.useCallback(() => setOpen(false), []);
  const handlePreConfirm = React6.useCallback(
    async (value) => {
      await pending.options.preConfirm?.(value);
      resolvedRef.current = true;
      pending.resolve({ isConfirmed: true, isDismissed: false, value });
      close();
    },
    [pending, close]
  );
  const handleOpenChange = React6.useCallback(
    (next) => {
      if (!next && !resolvedRef.current) {
        resolvedRef.current = true;
        pending.resolve({ isConfirmed: false, isDismissed: true });
        close();
      }
    },
    [pending, close]
  );
  React6.useEffect(() => {
    if (!open) {
      const id = window.setTimeout(onDone, 200);
      return () => window.clearTimeout(id);
    }
  }, [open, onDone]);
  return /* @__PURE__ */ jsx(
    AlertDialog2,
    {
      ...pending.options,
      open,
      preConfirm: handlePreConfirm,
      onOpenChange: handleOpenChange
    }
  );
}
var modalSizeVariants = cva("bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-hidden flex flex-col w-full", {
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
  React6.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  const modal = /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 bg-[#00000066] flex items-center justify-center px-4 outline-none",
      style: { zIndex: 9999 },
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ jsxs("div", { className: cn(modalSizeVariants({ size }), modalClassName), children: [
        (title || showCloseButton) && /* @__PURE__ */ jsxs("div", { className: cn("flex justify-between items-center border-b border-gray-300 p-2", headerClassName), children: [
          title && /* @__PURE__ */ jsx("h5", { className: "text-lg p-2 font-bold", children: title }),
          showCloseButton && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "rounded-md transition-colors font-bold text-lg cursor-pointer p-2 text-gray-600 hover:text-gray-900",
              onClick: onClose,
              "aria-label": "Close modal",
              children: closeIcon ?? /* @__PURE__ */ jsx(X, { className: "size-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: cn("flex-1 overflow-y-auto p-4 outline-none", bodyClassName), children })
      ] })
    }
  );
  return ReactDOM.createPortal(modal, document.body);
}
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "pagination-content",
      className: cn("flex flex-row items-center gap-1", className),
      ...props
    }
  );
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsx("li", { "data-slot": "pagination-item", ...props });
}
var pageButtonVariants = cva(
  `relative z-10 inline-flex items-center justify-center leading-none rounded-full transition-colors duration-150 ease-in-out outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "min-w-7 h-7 px-1.5 text-sm",
        md: "min-w-7 h-7 px-1.5 text-sm sm:min-w-10 sm:h-10 sm:px-2 sm:text-base",
        lg: "min-w-10 h-10 px-2 text-base sm:min-w-12 sm:h-12 sm:px-3 sm:text-lg"
      },
      state: {
        default: "bg-transparent text-[#202020] font-semibold hover:bg-[#EFF8EA]",
        active: "bg-transparent text-white font-bold",
        disabled: "text-gray-300 pointer-events-none"
      }
    },
    defaultVariants: {
      size: "md",
      state: "default"
    }
  }
);
var chevronButtonVariants = cva(
  `inline-flex items-center justify-center rounded-full transition-colors outline-none ${FOCUS_RING}`,
  {
    variants: {
      size: {
        sm: "w-7 h-7 text-sm",
        md: "w-7 h-7 text-sm sm:w-10 sm:h-10 sm:text-base",
        lg: "w-10 h-10 text-base sm:w-12 sm:h-12 sm:text-lg"
      },
      state: {
        default: "text-gray-400 hover:bg-[#EFF8EA]",
        disabled: "text-gray-200 pointer-events-none"
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
  const containerRef = useRef(null);
  const buttonRefs = useRef(/* @__PURE__ */ new Map());
  const [pill, setPill] = useState(null);
  const firstRender = useRef(true);
  useLayoutEffect(() => {
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
  return /* @__PURE__ */ jsx(Pagination, { className: cn("mx-auto flex w-full justify-center", className), children: /* @__PURE__ */ jsxs(
    PaginationContent,
    {
      ref: containerRef,
      className: "relative flex flex-row flex-wrap items-center justify-center gap-1",
      children: [
        pill && /* @__PURE__ */ jsx(
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
        showFirstLast && /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
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
            children: /* @__PURE__ */ jsx(ChevronsLeft, { className: "size-4" })
          }
        ) }),
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
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
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" })
          }
        ) }),
        pages.map(
          (page, index) => page === "..." ? /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
            "span",
            {
              "aria-hidden": true,
              className: cn(
                "inline-flex items-center justify-center text-gray-400 select-none",
                ellipsisSizeClass[size ?? "md"]
              ),
              children: "..."
            }
          ) }, `ellipsis-${index}`) : /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
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
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" })
          }
        ) }),
        showFirstLast && /* @__PURE__ */ jsx(PaginationItem, { children: /* @__PURE__ */ jsx(
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
            children: /* @__PURE__ */ jsx(ChevronsRight, { className: "size-4" })
          }
        ) })
      ]
    }
  ) });
}
function UengageProvider({ children, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("uengage-ui", className), children });
}

// src/assets/uEngage_icon.png
var uEngage_icon_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAAD7CAYAAABOrvnfAAAEHklEQVR4nO3d0U1jSRCG0WKFSIocCJYcSIoX9mE00uwsxjb4uqv6PyeCEre/rmujGaoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuMTD6gG+8vTy/LF6hku8v761/jnuott5mPjc2w7c7eGeM/HhT9L5PEx69v+sHgDO6Rz7NIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKHIIKnvffXt4fVM+xC8IzQNfquc53yuHoAuNS0uDqy4SGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CGI4CHI4+oB4BJPL88fq2f4zPvr28PqGa5hw8MPdL2IThE87U2LqjPBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDBQxDB34h/0cUEgocggocggocggocggocggocggocggocggocggocggocggocggocggocggocggocggocggr8h/+vNMd5f3x5Wz3BK59k+87h6ALjEtLC6suEhiOBvzGs9nQkegggeggj+AF7r6UrwEKRt8H4NA7fXNvjpvNbTkeAhiOAPZMvTjeAPJno6aR28L+7gtloHvwtbni4EfyeipwPBQxDB35Etz2rtg9/tizvRs1L74HckelYR/CKiZ4URwe/2Wv+b6Lm3EcHvTPTck+AbED33IvgmRM89jPpsnBLFrt9ZsJ4N31DKxcb9jdskaTHY9tySDd9c2gXHsUZuj9QIbHt+yoYf5Onl+SP1suM2xm4MB/8XW59r2PDD2fpcY/R2cNC/Zvvzt9EHQvDHc2nsZfzDFD2rTLwMfYaHb5q4bMYHP/GWhVXGB18lerjUFsEDl9kmeFseztsm+CrRwzlbBQ98bbvgbXk4bbvgq0QPp2wZfJXo4TPbBg/839bB2/LwX1sHXyV6+NP2wVeJHn6LCL5K9FAVFHyV6CEq+CrRky0u+CrRkysy+CrRkyk2+CrRkyc6+CrRkyU++Kpf0QufBIL/g+jZneD/Inp2JvhPiJ5dCf4En+vZkeDPED47EfyFRM8OBH8F257pBP8Nwmcqwf+A6JlG8D9k2zOJg3qAiX83nO+Zdtnb8Aew9elK8AcSPt04jHfmdX8v0y70UcPuyAUwm+D5MZfAHILnEC6BfqbFXiV4rpBy6UwMGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDb+hd78es6KyZOZAAAAABJRU5ErkJggg==";
function Loader(_props) {
  const [mounted, setMounted] = React6.useState(false);
  React6.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return /* @__PURE__ */ jsx("div", { className: "ue-loader-overlay", role: "status", "aria-label": "Loading", children: /* @__PURE__ */ jsxs("div", { className: "ue-loader", children: [
    /* @__PURE__ */ jsx("span", { className: "ue-inner-loader" }),
    /* @__PURE__ */ jsx(
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
var accordionRootVariants = cva("w-full", {
  variants: {
    variant: {
      default: "divide-y divide-[#E5E7EB]",
      ghost: "",
      bordered: "flex flex-col gap-2"
    }
  },
  defaultVariants: { variant: "default" }
});
var accordionItemVariants = cva("group", {
  variants: {
    variant: {
      default: "",
      ghost: "border-b border-[#E5E7EB] last:border-b-0",
      bordered: "border border-[#E5E7EB] rounded-xl overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
    }
  },
  defaultVariants: { variant: "default" }
});
var accordionTriggerVariants = cva(
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
var accordionContentVariants = cva(
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
  return /* @__PURE__ */ jsx(Fragment, { children: items.map((item) => /* @__PURE__ */ jsxs(
    Accordion$1.Item,
    {
      value: item.value,
      disabled: item.disabled,
      className: accordionItemVariants({ variant }),
      children: [
        /* @__PURE__ */ jsx(Accordion$1.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
          Accordion$1.Trigger,
          {
            className: cn(
              accordionTriggerVariants({ variant, size }),
              "data-[state=open]:text-[#006F42] w-full justify-between"
            ),
            children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2.5 min-w-0", children: [
                item.icon && /* @__PURE__ */ jsx("span", { className: "shrink-0 [&_svg]:size-4", children: item.icon }),
                /* @__PURE__ */ jsx("span", { className: "truncate text-left", children: item.title })
              ] }),
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  className: "ml-3 size-4 shrink-0 text-[#9CA3AF] transition-transform duration-200 group-data-[state=open]:rotate-180",
                  "aria-hidden": true
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Accordion$1.Content, { className: "overflow-hidden will-change-[height] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down", children: /* @__PURE__ */ jsx("div", { className: accordionContentVariants({ variant, size }), children: item.content }) })
      ]
    },
    item.value
  )) });
}
function Accordion(props) {
  const { items, variant = "default", size = "md", className } = props;
  const rootClass = cn(accordionRootVariants({ variant }), className);
  if (props.type === "multiple") {
    return /* @__PURE__ */ jsx(
      Accordion$1.Root,
      {
        type: "multiple",
        value: props.value,
        defaultValue: props.defaultValue,
        onValueChange: props.onChange,
        className: rootClass,
        children: /* @__PURE__ */ jsx(AccordionItems, { items, variant, size })
      }
    );
  }
  return /* @__PURE__ */ jsx(
    Accordion$1.Root,
    {
      type: "single",
      collapsible: props.collapsible ?? true,
      value: props.value,
      defaultValue: props.defaultValue,
      onValueChange: props.onChange,
      className: rootClass,
      children: /* @__PURE__ */ jsx(AccordionItems, { items, variant, size })
    }
  );
}
Accordion.displayName = "Accordion";

export { Accordion, AlertDialog2 as AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, Button2 as Button, Card2 as Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Checkbox, CheckboxGroup, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, TableCell2 as CustomTableCell, TableHeaderCell as CustomTableHeaderCell, TableSkeleton as CustomTableSkeleton, CustomTabsTrigger, DatePicker, DatePickerCalendar, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger, Grid, Input2 as Input, InputHelper, InputLabel, LAYOUT, Label, Loader, Modal, PATTERN_REGEX, PageContainer, Pagination2 as Pagination, Popover, PopoverContent, PopoverTrigger, Radio, RadioGroup, SearchBar, Select, Separator, Sidebar, StatusBadge, SubHeader, SweetAlertProvider, Table2 as Table, Tabs2 as Tabs, Toggle, TopHeader, UengageProvider, accordionContentVariants, accordionItemVariants, accordionRootVariants, accordionTriggerVariants, iconBadgeVariants as alertDialogIconBadgeVariants, brand, buttonVariants, checkboxBoxVariants, checkboxLabelVariants, chevronButtonVariants, cn, buttonVariants2 as customButtonVariants, triggerVariants2 as datePickerTriggerVariants, dayCellVariants, formatDate, formatRange, Input as input, inputFieldVariants, inputIconSlotVariants, inputWrapperVariants, isSameDay, pageButtonVariants, radioCircleVariants, radioDotVariants, radioLabelVariants, sidebarContentVariants, sidebarPersistentVariants, statusBadgeVariants, tabTriggerVariants, tableBodyRowVariants, tableHeaderRowVariants, tableWrapperVariants, thumbVariants, toCssSize, trackVariants, triggerVariants, usePagination, useSweetAlert };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map