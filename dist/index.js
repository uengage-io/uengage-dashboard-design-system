"use client";
import { cva } from 'class-variance-authority';
import { Switch, Label as Label$1, AlertDialog as AlertDialog$1, Separator as Separator$1, Dialog, Slot, Popover as Popover$1, RadioGroup as RadioGroup$1, Checkbox as Checkbox$1, Accordion as Accordion$1, Collapsible, Tabs as Tabs$1 } from 'radix-ui';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React9 from 'react';
import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { X, Search, CircleAlert, Check, ArrowUpAZ, ArrowDownAZ, ChevronDown, EyeOff, Eye, Minus, ChevronLeft, ChevronRight, CalendarIcon, ChevronUp, ChevronsUpDown, ChevronsLeft, ChevronsRight, SlidersHorizontal, Loader2, ImageIcon, Plus, Upload, File, Video, Play, HelpCircle, Info, AlertTriangle, TriangleAlert, CircleX, CircleCheck } from 'lucide-react';
import Fuse from 'fuse.js';
import { CommandList as CommandList$1, Command as Command$1, CommandInput as CommandInput$1, CommandEmpty as CommandEmpty$1, CommandGroup as CommandGroup$1, CommandItem as CommandItem$1, CommandSeparator as CommandSeparator$1 } from 'cmdk';
import { DayPicker } from 'react-day-picker';
import * as ReactDOM from 'react-dom';

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
      text: "#FFFFFF",
      backgroundGradient: "linear-gradient(128.73deg, #00A86B -0.83%, #003C1B 95.78%)"
    },
    hover: {
      background: [g.darkGreen, g.darkestGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF",
      backgroundGradient: "linear-gradient(92.3deg, #006F42 -11.82%, #001E00 101.34%)"
    },
    pressed: {
      background: [g.darkGreen, g.darkestGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF",
      backgroundGradient: "linear-gradient(92.3deg, #006F42 -11.82%, #001E00 101.34%)"
    },
    focused: {
      background: [g.green, g.deepGreen],
      border: [g.mintGreen],
      borderWidth: 2,
      text: "#FFFFFF",
      backgroundGradient: "linear-gradient(128.73deg, #00A86B -0.83%, #003C1B 95.78%)"
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
      text: g.forestGreen,
      backgroundGradient: "linear-gradient(0deg, #EDEDED 0%, rgba(255, 255, 255, 0.6) 100%)"
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
      text: g.forestGreen,
      backgroundGradient: "linear-gradient(180deg, rgba(200, 231, 184, 0.01) 0%, rgba(200, 231, 184, 0.07) 100%)"
    },
    hover: {
      background: [g.paleGreen],
      border: [g.paleGreen],
      borderWidth: 2,
      text: g.forestGreen,
      backgroundGradient: "linear-gradient(180deg, rgba(200, 231, 184, 0.01) 0%, rgba(200, 231, 184, 0.07) 100%)"
    },
    pressed: {
      background: [g.paleGreen],
      border: [g.lightGreen],
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
    xs: "pt-[2px] pr-[6px] pb-[2px] pl-[6px] gap-[2px] text-[10px] [&_svg]:size-[12px]",
    sm: "pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[2px] text-[12px] [&_svg]:size-[14px]",
    md: "pt-[6px] pr-[12px] pb-[6px] pl-[12px] gap-[4px] text-[14px] [&_svg]:size-[14px]",
    lg: "pt-[10px] pr-[16px] pb-[10px] pl-[16px] gap-[6px] text-[16px] [&_svg]:size-[16px]"
  },
  alertSecondary: {
    xs: "pt-[2px] pr-[6px] pb-[2px] pl-[6px] gap-[2px] text-[10px] [&_svg]:size-[12px]",
    sm: "pt-[4px] pr-[8px] pb-[4px] pl-[8px] gap-[2px] text-[12px] [&_svg]:size-[14px]",
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
function toGradientCSS(value, direction = "to bottom") {
  if (typeof value === "string") {
    return `linear-gradient(${value}, ${value})`;
  }
  if (value.length === 1) {
    return `linear-gradient(${value[0]}, ${value[0]})`;
  }
  return `linear-gradient(${direction}, ${value[0]}, ${value[1]})`;
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
    const bg = colors.backgroundGradient ? colors.backgroundGradient : colors.background === "transparent" ? "transparent" : Array.isArray(colors.background) ? colors.background[0] : colors.background;
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
  const dir = colors.gradientDirection ?? "to bottom";
  const borderCSS = toGradientCSS(colors.border, dir);
  const innerCSS = colors.backgroundGradient ? colors.backgroundGradient : colors.background === "transparent" ? "linear-gradient(var(--btn-stroke-bg, #fff), var(--btn-stroke-bg, #fff))" : toGradientCSS(colors.background, dir);
  const insetShadow = "0px 2px 4px 0px #0000000A inset";
  const liftShadow = "2px 2px 4px 0px #0000001F";
  const noLiftVariants = ["secondary"];
  const boxShadow = state === "disabled" ? "none" : state === "hover" || state === "pressed" ? noLiftVariants.includes(variant) ? insetShadow : `${insetShadow}, ${liftShadow}` : insetShadow;
  const backgroundValue = colors.backgroundGradient ? `${innerCSS} padding-box, linear-gradient(#FFFFFF, #FFFFFF) padding-box, ${borderCSS} border-box` : `${innerCSS} padding-box, ${borderCSS} border-box`;
  const style = {
    background: backgroundValue,
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
  const [hovered, setHovered] = React9.useState(false);
  const [pressed, setPressed] = React9.useState(false);
  const [focused, setFocused] = React9.useState(false);
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
            className: "flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2 py-[7px]",
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  "data-slot": "top-header-title",
                  className: "flex min-w-0 flex-1 items-center overflow-hidden",
                  style: { gap: toCssSize(titleGap), minWidth: "160px" },
                  children: [
                    React9.isValidElement(title) ? title : /* @__PURE__ */ jsx("h1", { className: "truncate text-base font-semibold leading-tight text-foreground sm:text-[18px]", children: title }),
                    helper != null && /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs leading-none sm:text-sm", children: helper })
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
              "flex w-full flex-wrap justify-between gap-x-4 gap-y-3",
              ALIGN_CLASS[align]
            ),
            style: {
              paddingTop: "clamp(12px, 2.5vw, 16px)",
              paddingBottom: "clamp(12px, 2.5vw, 16px)"
            },
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  "data-slot": "sub-header-main",
                  className: "flex min-w-0 flex-1 flex-col gap-3",
                  style: {
                    ...gap !== LAYOUT.gap.xs ? { gap: toCssSize(gap) } : {},
                    minWidth: "160px"
                  },
                  children: [
                    hasHeading && /* @__PURE__ */ jsxs("div", { "data-slot": "sub-header-heading", children: [
                      title != null && (React9.isValidElement(title) ? title : /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold leading-tight text-foreground sm:text-base", children: title })),
                      subtitle != null && (React9.isValidElement(subtitle) ? subtitle : /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-[12px] leading-tight text-muted-foreground sm:text-[13px]", children: subtitle }))
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
        "border-gray-300 bg-white p-3 sm:p-4 md:p-5 text-sm text-[#202020] shadow-none",
        className
      ),
      ...props
    }
  );
}
function CardHeader2({ className, ...props }) {
  return /* @__PURE__ */ jsx(CardHeader, { className: cn("text-[#202020]", className), ...props });
}
function CardTitle2({ className, ...props }) {
  return /* @__PURE__ */ jsx(CardTitle, { className: cn("text-[#202020]", className), ...props });
}
function CardContent2({ className, ...props }) {
  return /* @__PURE__ */ jsx(CardContent, { className: cn("text-[#202020]", className), ...props });
}
function CardFooter2({ className, ...props }) {
  return /* @__PURE__ */ jsx(CardFooter, { className: cn("text-[#202020]", className), ...props });
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
  return /* @__PURE__ */ jsx(
    Label,
    {
      className: cn(SIZE_TEXT[size], "font-medium text-slate-700", className),
      ...props,
      children: /* @__PURE__ */ jsxs("span", { className: "inline", children: [
        children,
        required && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "ml-0.5 text-red-500", children: "*" })
      ] })
    }
  );
}
InputLabel.displayName = "InputLabel";
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
  fallbackText = "No results found"
}) {
  const [internal, setInternal] = React9.useState(
    String(controlledValue ?? defaultValue ?? "")
  );
  const [dropdownOpen, setDropdownOpen] = React9.useState(false);
  const wrapperRef = React9.useRef(null);
  const touchedRef = React9.useRef(false);
  React9.useEffect(() => {
    if (controlledValue !== void 0) setInternal(String(controlledValue));
  }, [controlledValue]);
  const displayValue = internal;
  const resolvedItems = React9.useMemo(() => {
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
    if (readOnly) return;
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
  const showClear = clearable && displayValue.length > 0;
  const iconSize = ICON_SIZES[size];
  const isDropdownVisible = hasDropdown && dropdownOpen && hasQuery;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "uengage-ui flex flex-col gap-1.5 min-w-0",
        width,
        className
      ),
      children: [
        label && /* @__PURE__ */ jsx(
          InputLabel,
          {
            size: size === "lg" ? "lg" : size === "sm" ? "sm" : "md",
            required,
            children: label
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: wrapperRef,
            className: "relative block min-w-0",
            onBlur: handleBlur,
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: cn(
                    "flex w-full items-center rounded-[4px] border border-gray-400 bg-white transition-colors",
                    !disabled && !readOnly && "hover:border-gray-500 hover:shadow-sm",
                    SIZE_TEXT_CLASSES[size],
                    SIZE_HEIGHT_CLASSES[size],
                    disabled && "pointer-events-none opacity-50",
                    readOnly && "bg-gray-50 border-gray-300 text-gray-700 cursor-default"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        value: displayValue,
                        placeholder,
                        disabled,
                        readOnly,
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
                          children: /* @__PURE__ */ jsx(
                            X,
                            {
                              className: "hover:text-red-500",
                              strokeWidth: 2,
                              size: iconSize
                            }
                          )
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
        )
      ]
    }
  );
}
SearchBar.displayName = "SearchBar";
var FilterGroupMobileContext = React9.createContext(false);
var ZIndexContext = React9.createContext({ popover: 20 });
function useZIndex() {
  return React9.useContext(ZIndexContext);
}
function SidebarZIndexProvider({
  children
}) {
  return /* @__PURE__ */ jsx(ZIndexContext.Provider, { value: { popover: 50 }, children });
}
function ModalZIndexProvider({
  children
}) {
  return /* @__PURE__ */ jsx(ZIndexContext.Provider, { value: { popover: 10001 }, children });
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  style,
  ...props
}) {
  const { popover } = useZIndex();
  return /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(
    Popover$1.Content,
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
      ...props
    }
  ) });
}
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
var CommandList = React9.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CommandList$1,
  {
    ref,
    "data-slot": "command-list",
    className: cn("max-h-60 overflow-y-auto overflow-x-hidden py-1", className),
    ...props
  }
));
CommandList.displayName = "CommandList";
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
    "flex min-w-0 items-center justify-between",
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
        ].join(" "),
        readonly: [
          "bg-gray-50 border-gray-300 text-gray-700",
          "cursor-default pointer-events-none"
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
  spellCheck = true,
  clearable = false,
  label,
  required,
  helperText,
  error,
  readOnly = false,
  sorting = false,
  indexing = false,
  search: searchEnabled = true
}) {
  const isMobileDrawer = React9.useContext(FilterGroupMobileContext);
  const touchedRef = React9.useRef(false);
  const interactedRef = React9.useRef(false);
  const resolvedOptions = React9.useMemo(() => {
    if (items && getLabel && getValue) {
      return items.map((item) => ({
        label: getLabel(item),
        value: getValue(item),
        disabled: getDisabled ? getDisabled(item) : false
      }));
    }
    return options ?? [];
  }, [items, getLabel, getValue, getDisabled, options]);
  const [open, setOpen] = React9.useState(false);
  const [searchQuery, setSearchQuery] = React9.useState("");
  const [sortOrder, setSortOrder] = React9.useState("asc");
  const listRef = React9.useRef(null);
  React9.useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [sortOrder]);
  const sortedOptions = React9.useMemo(() => {
    if (!sorting) return resolvedOptions;
    return [...resolvedOptions].sort(
      (a, b) => sortOrder === "asc" ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)
    );
  }, [resolvedOptions, sorting, sortOrder]);
  const fuseFilteredOptions = useFuzzySearch(sortedOptions, searchQuery);
  const visibleOptions = React9.useMemo(() => {
    if (!searchEnabled) return sortedOptions;
    const q = searchQuery.trim();
    if (indexing && /^\d+$/.test(q)) {
      const n = parseInt(q, 10);
      const pos = n - 1;
      const opt = sortedOptions[pos];
      return opt ? [opt] : [];
    }
    return fuseFilteredOptions;
  }, [searchEnabled, searchQuery, indexing, sorting, sortOrder, sortedOptions, fuseFilteredOptions]);
  const [selected, setSelected] = React9.useState(
    controlledValue ?? defaultValue ?? (mode === "multi" ? [] : "")
  );
  React9.useEffect(() => {
    if (controlledValue !== void 0) setSelected(controlledValue);
  }, [controlledValue]);
  const selectedArr = mode === "multi" ? Array.isArray(selected) ? selected : [] : [];
  const enabledOptions = sortedOptions.filter((o) => !o.disabled);
  const allSelected = enabledOptions.length > 0 && enabledOptions.every((o) => selectedArr.includes(o.value));
  const isSelected = (val) => mode === "single" ? selected === val : selectedArr.includes(val);
  const commit = (next) => {
    if (controlledValue === void 0) setSelected(next);
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
  const pillsContainerRef = React9.useRef(null);
  const [visibleCount, setVisibleCount] = React9.useState(null);
  React9.useLayoutEffect(() => {
    if (mode === "multi") setVisibleCount(null);
  }, [selectedArr.join(","), mode]);
  React9.useLayoutEffect(() => {
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
  const triggerState = disabled ? "disabled" : readOnly ? "readonly" : open ? "open" : "default";
  const placeholderSizeClass = size === "lg" ? "text-[14px]" : size === "md" ? "text-[12px]" : "text-[11px]";
  const commandInputSizeClass = size === "lg" ? "h-10 text-base" : size === "md" ? "h-9 text-sm" : "h-8 text-xs";
  const commandItemSizeClass = size === "lg" ? "px-3 py-2.5 text-base" : size === "md" ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs";
  const handleOpenChange = (next) => {
    if (disabled || readOnly) return;
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
  if (isMobileDrawer) {
    return /* @__PURE__ */ jsx("ul", { className: "divide-y divide-gray-100", children: resolvedOptions.map((opt) => {
      const selected2 = isSelected(opt.value);
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          disabled: opt.disabled,
          onClick: () => !opt.disabled && handleSelect(opt.value),
          className: cn(
            "w-full flex items-center justify-between px-4 py-4 text-sm transition-colors",
            selected2 ? "text-[#006F42] font-semibold" : "text-gray-800 font-normal",
            opt.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
          ),
          children: [
            /* @__PURE__ */ jsx("span", { children: opt.label }),
            selected2 && /* @__PURE__ */ jsx(
              Check,
              {
                size: 16,
                strokeWidth: 2.5,
                className: "shrink-0 text-[#006F42]"
              }
            )
          ]
        }
      ) }, opt.value);
    }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
    label && /* @__PURE__ */ jsx(InputLabel, { size: size === "xs" ? "sm" : size, required, children: label }),
    /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
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
              if (!disabled && !readOnly) setOpen((o) => !o);
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
                          clearable && /* @__PURE__ */ jsx(
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
              clearable && hasSelection && /* @__PURE__ */ jsx(
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
              sorting && /* @__PURE__ */ jsx(
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
                  className: "flex items-center text-gray-400 hover:text-gray-600 transition-colors",
                  "aria-label": sortOrder === "asc" ? "Sorted A\u2192Z, click for Z\u2192A" : "Sorted Z\u2192A, click for A\u2192Z",
                  children: sortOrder === "asc" ? /* @__PURE__ */ jsx(ArrowUpAZ, { size: 14, strokeWidth: 2 }) : /* @__PURE__ */ jsx(ArrowDownAZ, { size: 14, strokeWidth: 2 })
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
          collisionPadding: { top: 64 },
          style: {
            width: "var(--radix-popover-trigger-width)"
          },
          children: /* @__PURE__ */ jsxs(Command, { shouldFilter: false, children: [
            searchEnabled && /* @__PURE__ */ jsx(
              CommandInput,
              {
                placeholder: "Search...",
                value: searchQuery,
                onValueChange: setSearchQuery,
                spellCheck,
                className: commandInputSizeClass
              }
            ),
            /* @__PURE__ */ jsxs(CommandList, { ref: listRef, children: [
              visibleOptions.length === 0 && searchQuery.trim() ? /* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }) : null,
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
              visibleOptions.map((option) => {
                const originalIdx = sortedOptions.findIndex((o) => o.value === option.value);
                const displayIndex = originalIdx + 1;
                return /* @__PURE__ */ jsxs(
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
                      indexing && /* @__PURE__ */ jsxs("span", { className: "shrink-0 text-[#9CA3AF] tabular-nums", children: [
                        displayIndex,
                        "."
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: option.label }),
                      mode === "single" && isSelected(option.value) && /* @__PURE__ */ jsx(Check, { size: 14, className: "shrink-0 text-[#006F42]" })
                    ]
                  },
                  option.value
                );
              })
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      InputHelper,
      {
        size: size === "xs" ? "sm" : size,
        helperText,
        error
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
    return /* @__PURE__ */ jsx(
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
  const [uncontrolledValue, setUncontrolledValue] = React9.useState(
    () => getInitialValue(tabs, value, defaultValue)
  );
  const activeValue = value ?? uncontrolledValue;
  React9.useEffect(() => {
    if (value !== void 0) return;
    if (tabs.some((tab) => tab.value === uncontrolledValue)) return;
    setUncontrolledValue(getInitialValue(tabs, value, defaultValue));
  }, [defaultValue, tabs, uncontrolledValue, value]);
  const handleChange = React9.useCallback(
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
  const [open, setOpen] = React9.useState(false);
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
        collisionPadding: 8,
        className: "w-[220px] max-w-[calc(100vw-1rem)] rounded-[10px] border border-[#E5E7EB] p-1 shadow-[0_12px_32px_rgba(15,23,42,0.12)]",
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
function LineTabsOverflow({
  overflowTabs,
  overflowLabel,
  activeValue,
  onChange
}) {
  const [open, setOpen] = React9.useState(false);
  if (overflowTabs.length === 0) return null;
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
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
        collisionPadding: 8,
        className: "w-[220px] max-w-[calc(100vw-1rem)] rounded-[10px] border border-[#E5E7EB] p-1 shadow-[0_12px_32px_rgba(15,23,42,0.12)]",
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
function Tabs2(props) {
  const variant = props.variant ?? "primary";
  if (variant === "secondary") return /* @__PURE__ */ jsx(TertiaryTabs, { ...props });
  return /* @__PURE__ */ jsx(SecondaryTabs, { ...props });
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
  const outerRef = React9.useRef(null);
  const measureRef = React9.useRef(null);
  const wrapperRef = React9.useRef(null);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange
  );
  const [indicator, setIndicator] = React9.useState({ left: 0, width: 0, ready: false });
  const [containerWidth, setContainerWidth] = React9.useState(0);
  const [tabWidths, setTabWidths] = React9.useState([]);
  const [moreButtonWidth, setMoreButtonWidth] = React9.useState(120);
  React9.useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    setContainerWidth(el.getBoundingClientRect().width);
  }, []);
  React9.useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setContainerWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  React9.useLayoutEffect(() => {
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
  const dynamicLimit = React9.useMemo(() => {
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
  const { visibleTabs, overflowTabs } = React9.useMemo(
    () => getVisibleTabs(tabs, activeValue, dynamicLimit),
    [activeValue, tabs, dynamicLimit]
  );
  const measureIndicator = React9.useCallback(() => {
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
      left: btnRect.left - containerRect.left,
      width: btnRect.width,
      ready: true
    });
  }, [activeValue]);
  React9.useLayoutEffect(() => {
    measureIndicator();
  }, [
    measureIndicator,
    visibleTabs.length,
    visibleTabs.map((t) => t.value + t.label).join("|")
  ]);
  React9.useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);
  return /* @__PURE__ */ jsxs(
    Tabs,
    {
      value: activeValue,
      onValueChange: handleChange,
      className: cn("w-full", className),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: measureRef,
            "aria-hidden": true,
            style: { position: "fixed", top: -9999, left: -9999, visibility: "hidden", pointerEvents: "none" },
            className: "flex items-center",
            children: [
              tabs.map((tab) => /* @__PURE__ */ jsx(
                "span",
                {
                  "data-measure-tab": true,
                  className: "relative flex items-center gap-2 whitespace-nowrap rounded-t-lg px-3 py-2 sm:px-5 sm:py-3 text-[13px] sm:text-[14px] font-medium",
                  children: tab.label
                },
                tab.value
              )),
              /* @__PURE__ */ jsxs(
                "span",
                {
                  "data-measure-more": true,
                  className: "inline-flex flex-none items-center gap-1 whitespace-nowrap rounded-t-lg px-3 py-2 sm:px-5 sm:py-3 text-[13px] sm:text-[14px] font-medium",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: overflowLabel }),
                    /* @__PURE__ */ jsx(ChevronDown, { size: 16, strokeWidth: 2.25 })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { ref: outerRef, className: "relative w-full", children: /* @__PURE__ */ jsxs("div", { className: cn("inline-flex max-w-full items-end", showBottomBorder && "border-b border-[#E5E7EB]"), children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: wrapperRef,
              className: "relative min-w-0 overflow-hidden",
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
          overflowTabs.length > 0 && /* @__PURE__ */ jsx(
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
  const listRef = React9.useRef(null);
  const { activeValue, handleChange } = useTabValue(
    tabs,
    value,
    defaultValue,
    onChange
  );
  const [chip, setChip] = React9.useState({ left: 0, width: 0, ready: false });
  const { visibleTabs, overflowTabs } = React9.useMemo(
    () => getVisibleTabs(tabs, activeValue, visibleTabLimit),
    [activeValue, tabs, visibleTabLimit]
  );
  const measureChip = React9.useCallback(() => {
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
  React9.useLayoutEffect(() => {
    measureChip();
  }, [
    measureChip,
    visibleTabs.length,
    visibleTabs.map((t) => t.value + t.label).join("|")
  ]);
  React9.useEffect(() => {
    window.addEventListener("resize", measureChip);
    return () => window.removeEventListener("resize", measureChip);
  }, [measureChip]);
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
            "rounded-full bg-[#F3F5F9] p-0.5",
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
  "relative flex w-full rounded-[4px] border bg-white transition-colors",
  {
    variants: {
      size: {
        sm: TEXT_SIZE.sm,
        md: TEXT_SIZE.md,
        lg: TEXT_SIZE.lg
      },
      multiline: {
        false: "items-center",
        true: "items-start h-auto"
      },
      state: {
        default: "border-gray-400 hover:border-gray-500 hover:shadow-sm",
        focused: "border-gray-500 ring-1 ring-gray-200",
        error: "border-red-500",
        disabled: "bg-gray-50 border-gray-300 text-gray-400 cursor-not-allowed opacity-60",
        readonly: "bg-gray-50 border-gray-300 text-gray-700 cursor-default"
      }
    },
    compoundVariants: [
      { multiline: false, size: "sm", className: COMPONENT_HEIGHT.sm },
      { multiline: false, size: "md", className: COMPONENT_HEIGHT.md },
      { multiline: false, size: "lg", className: COMPONENT_HEIGHT.lg }
    ],
    defaultVariants: {
      size: "md",
      multiline: false,
      state: "default"
    }
  }
);
var inputFieldVariants = cva(
  `h-full w-full bg-transparent border-0 shadow-none outline-none text-inherit placeholder:text-[#C4C9D2] disabled:cursor-not-allowed disabled:opacity-100 focus-visible:ring-0 focus-visible:border-transparent focus-visible:outline-none`,
  {
    variants: {
      size: {
        sm: `px-2.5 ${PLACEHOLDER_SIZE.sm}`,
        md: `px-3 ${PLACEHOLDER_SIZE.md}`,
        lg: `px-3.5 ${PLACEHOLDER_SIZE.lg}`
      },
      multiline: {
        false: "py-0",
        true: "py-2"
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
      multiline: false,
      hasLeftIcon: false,
      hasRightIcon: false
    }
  }
);
var RESIZE_CLASS = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize"
};
var inputIconSlotVariants = cva(
  "absolute inset-y-0 flex text-gray-400",
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
      },
      multiline: {
        false: "items-center",
        true: "items-start pt-2"
      }
    },
    defaultVariants: {
      size: "md",
      side: "left",
      multiline: false
    }
  }
);
var PATTERN_REGEX = {
  alphanumeric: "[^a-zA-Z0-9]",
  alpha: "[^a-zA-Z ]",
  numeric: "[^0-9]",
  decimal: "[^0-9.]",
  phone: "[^0-9]",
  none: "(?!)"
};
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
  clearable,
  onClear,
  multiline = false,
  rows = 3,
  resize = "vertical",
  ...rest
}) {
  const reactId = React9.useId();
  const inputId = id ?? reactId;
  const [focused, setFocused] = React9.useState(false);
  const [showPassword, setShowPassword] = React9.useState(false);
  const [internalError, setInternalError] = React9.useState(void 0);
  const touchedRef = React9.useRef(false);
  const isControlled = rest.value !== void 0;
  const [uncontrolledQuery, setUncontrolledQuery] = React9.useState(
    String(rest.defaultValue ?? "")
  );
  const suggestionQuery = isControlled ? String(rest.value ?? "") : uncontrolledQuery;
  const fuseResults = useFuzzySearch(suggestions ?? [], suggestionQuery);
  const showSuggestions = !multiline && !!suggestions?.length && focused && fuseResults.length > 0 && suggestionQuery.trim().length > 0;
  const wrapperRef = React9.useRef(null);
  const inputRef = React9.useRef(null);
  const textareaRef = React9.useRef(null);
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
  const isPassword = !multiline && inputType === "password";
  const effectiveType = isPassword && showPassword ? "text" : inputType;
  const resolvedRightIcon = React9.useMemo(() => {
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
  const showClear = Boolean(clearable) && !disabled && !readOnly && suggestionQuery.length > 0;
  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledQuery("");
      const ref = multiline ? textareaRef.current : inputRef.current;
      if (ref) ref.value = "";
    }
    onChange?.({ target: { value: "" } });
    onClear?.();
  };
  const hasLeftIcon = Boolean(leftIcon);
  const hasOriginalRightIcon = Boolean(resolvedRightIcon);
  const hasRightIcon = hasOriginalRightIcon || showClear;
  const hasDoubleRightIcon = hasOriginalRightIcon && showClear;
  const doubleRightPadding = hasDoubleRightIcon ? { sm: "pr-14", md: "pr-16", lg: "pr-20" }[size] : void 0;
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
  const describedById = effectiveError ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0;
  const fieldClass = cn(
    inputFieldVariants({ size, multiline, hasLeftIcon, hasRightIcon }),
    doubleRightPadding
  );
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-1.5 min-w-0", width, className), children: [
    label && /* @__PURE__ */ jsx(InputLabel, { htmlFor: inputId, size, required, children: label }),
    /* @__PURE__ */ jsxs("div", { ref: wrapperRef, className: "relative", children: [
      /* @__PURE__ */ jsxs("div", { className: cn(inputWrapperVariants({ size, multiline, state })), children: [
        hasLeftIcon && /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              inputIconSlotVariants({ size, side: "left", multiline }),
              "pointer-events-none"
            ),
            children: leftIcon
          }
        ),
        multiline ? /* @__PURE__ */ jsx(
          "textarea",
          {
            ...rest,
            ref: textareaRef,
            id: inputId,
            rows,
            disabled,
            readOnly,
            spellCheck,
            "aria-invalid": Boolean(effectiveError) || void 0,
            "aria-describedby": describedById,
            onChange: handleChange,
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
            className: cn(fieldClass, RESIZE_CLASS[resize], "min-h-[80px]")
          }
        ) : /* @__PURE__ */ jsx(
          Input,
          {
            ...rest,
            ref: inputRef,
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
            className: fieldClass
          }
        ),
        hasRightIcon && /* @__PURE__ */ jsx("span", { className: cn(inputIconSlotVariants({ size, side: "right", multiline })), children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          showClear && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": "Clear",
              onClick: handleClear,
              className: "pointer-events-auto inline-flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors",
              children: /* @__PURE__ */ jsx(X, { strokeWidth: 2 })
            }
          ),
          resolvedRightIcon
        ] }) })
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
        default: "border-gray-300 bg-transparent data-[state=checked]:border-[#007A4D]",
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
var radioDotVariants = cva("rounded-full bg-[#007A4D]", {
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
var PILL_PADDING = {
  sm: "gap-1.5 px-2.5 py-1.5",
  md: "gap-2 px-3 py-2",
  lg: "gap-2.5 px-4 py-2.5"
};
var GAP_ONLY = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5"
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
  ...rest
}) {
  const reactId = React9.useId();
  const itemId = id ?? reactId;
  const itemRef = React9.useRef(null);
  const [isChecked, setIsChecked] = React9.useState(false);
  React9.useEffect(() => {
    validateLabelWordLimit(label, "Radio");
  }, [label]);
  React9.useEffect(() => {
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
  const labelState = disabled ? "disabled" : "default";
  const hasCustomColors2 = !!(borderColor || bgColor);
  const labelStyle = hasCustomColors2 ? {
    ...isChecked && borderColor ? { borderColor } : {},
    ...isChecked && bgColor ? { backgroundColor: bgColor } : {}
  } : void 0;
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: itemId,
      style: labelStyle,
      className: cn(
        "group inline-flex cursor-pointer items-center transition-colors",
        hasCustomColors2 ? cn(
          "rounded-xl border",
          PILL_PADDING[size],
          error ? "border-red-500" : "border-gray-200"
        ) : GAP_ONLY[size],
        disabled && "cursor-not-allowed opacity-60",
        readOnly && "pointer-events-none cursor-default",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          RadioGroup$1.Item,
          {
            ...rest,
            ref: itemRef,
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
              hasCustomColors2 && isChecked && "text-[#0F8055]"
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
  required,
  helperText,
  error,
  className,
  borderColor,
  bgColor,
  readOnly
}) {
  const reactId = React9.useId();
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
  return /* @__PURE__ */ jsxs("div", { className: cn("flex w-full flex-col gap-1.5", className), children: [
    label && /* @__PURE__ */ jsx(InputLabel, { htmlFor: groupId, size, required, children: label }),
    /* @__PURE__ */ jsx(
      RadioGroup$1.Root,
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
          return /* @__PURE__ */ jsx(
            Radio,
            {
              value: optValue,
              label: toLabel(opt),
              size,
              disabled: disabled || Boolean(toDisabled(opt)),
              error: Boolean(error),
              borderColor,
              bgColor,
              readOnly
            },
            optValue
          );
        })
      }
    ),
    /* @__PURE__ */ jsx(
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
        checked: "bg-[#007A4D] border-[#007A4D] text-white",
        indeterminate: "bg-[#007A4D] border-[#007A4D] text-white",
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
      checked: "text-[#0F8055]",
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
var PILL_PADDING2 = {
  sm: "gap-1.5 px-2.5 py-1.5",
  md: "gap-2 px-3 py-2",
  lg: "gap-2.5 px-4 py-2.5"
};
var GAP_ONLY2 = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5"
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
  ...rest
}) {
  const reactId = React9.useId();
  const itemId = rest.id ?? reactId;
  React9.useEffect(() => {
    validateLabelWordLimit(label, "CustomCheckbox");
  }, [label]);
  const isControlled = checked !== void 0;
  const [internalChecked, setInternalChecked] = React9.useState(
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
  const boxState = disabled ? "disabled" : error ? "error" : indeterminate ? "indeterminate" : visualChecked ? "checked" : "unchecked";
  const labelState = disabled ? "disabled" : visualChecked || indeterminate ? "checked" : "default";
  const hasCustomColors2 = !!(borderColor || bgColor);
  const isActive = (visualChecked || !!indeterminate) && !error && !disabled && !readOnly;
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: itemId,
      style: hasCustomColors2 && isActive ? {
        ...borderColor ? { borderColor } : {},
        ...bgColor ? { backgroundColor: bgColor } : {}
      } : void 0,
      className: cn(
        "group inline-flex cursor-pointer items-center transition-colors",
        hasCustomColors2 ? cn(
          "rounded-xl border",
          PILL_PADDING2[size],
          error ? "border-red-500" : disabled ? "border-gray-200" : "border-gray-200"
        ) : GAP_ONLY2[size],
        disabled && "cursor-not-allowed",
        readOnly && "pointer-events-none cursor-default",
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
  required,
  helperText,
  error,
  selectAll,
  borderColor,
  bgColor,
  readOnly
}) {
  const reactId = React9.useId();
  const groupId = `checkbox-group-${reactId}`;
  const isControlled = value !== void 0;
  const [internalValue, setInternalValue] = React9.useState([]);
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
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-1.5", children: [
    label && /* @__PURE__ */ jsx(InputLabel, { htmlFor: groupId, size, required, children: label }),
    selectAll && /* @__PURE__ */ jsx("div", { className: "pb-1", children: /* @__PURE__ */ jsx(
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
          onCheckedChange: (c) => toggle(optValue, c),
          borderColor,
          bgColor,
          readOnly
        },
        optValue
      );
    }) }),
    /* @__PURE__ */ jsx(
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
  const ref = React9.useRef(null);
  React9.useEffect(() => {
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
  const today = React9.useMemo(() => /* @__PURE__ */ new Date(), []);
  const initialMonth = defaultMonth ?? (selected instanceof Date ? selected : selected?.from) ?? today;
  const [viewMonth, setViewMonth] = React9.useState(initialMonth);
  const yearOptions = React9.useMemo(
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
    /* @__PURE__ */ jsxs("div", { className: "px-3 pb-3", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 mb-1", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex h-7 items-center justify-center text-[11px] font-medium text-[#9CA3AF] select-none",
          children: d
        },
        d
      )) }),
      /* @__PURE__ */ jsx(
        DayPicker,
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
            months: "flex flex-col w-full",
            month: "flex flex-col gap-1 w-full",
            month_caption: "hidden",
            weeks: "flex flex-col gap-0.5 w-full",
            week: "grid grid-cols-7 w-full",
            day: "flex items-center justify-center p-0 relative",
            day_button: "",
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            MonthGrid: ({ children, ...props }) => /* @__PURE__ */ jsx("div", { ...props, children }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Weeks: ({ children, ...props }) => /* @__PURE__ */ jsx("div", { ...props, children }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Week: ({ week: _week, children, ...props }) => /* @__PURE__ */ jsx("div", { ...props, children }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Day: ({ day: _day, modifiers: _modifiers, children, ...props }) => /* @__PURE__ */ jsx("div", { ...props, children }),
            DayButton: StyledDayButton
          }
        }
      )
    ] })
  ] });
}
function MonthPickerCalendar({
  selected,
  minDate,
  maxDate,
  onSelect,
  className
}) {
  const today = React9.useMemo(() => /* @__PURE__ */ new Date(), []);
  const [viewYear, setViewYear] = React9.useState(
    selected?.getFullYear() ?? today.getFullYear()
  );
  const yearOptions = React9.useMemo(() => {
    const center = today.getFullYear();
    const minYear = minDate ? minDate.getFullYear() : center - 10;
    const maxYear = maxDate ? maxDate.getFullYear() : center + 10;
    const opts = [];
    for (let y = minYear; y <= maxYear; y++) {
      opts.push({ label: String(y), value: String(y) });
    }
    return opts;
  }, [today, minDate, maxDate]);
  return /* @__PURE__ */ jsxs("div", { className: cn("w-[280px] max-w-full bg-white", className), children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center px-3 py-2", children: /* @__PURE__ */ jsx(
      Select,
      {
        options: yearOptions,
        value: String(viewYear),
        onChange: (val) => setViewYear(Number(val)),
        size: "sm",
        className: "w-28"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1.5 px-3 pb-3", children: MONTH_LABELS.map((label, i) => {
      const isSelected = !!selected && selected.getFullYear() === viewYear && selected.getMonth() === i;
      const isToday = today.getFullYear() === viewYear && today.getMonth() === i;
      const isDisabled = !!minDate && new Date(viewYear, i) < new Date(minDate.getFullYear(), minDate.getMonth()) || !!maxDate && new Date(viewYear, i) > new Date(maxDate.getFullYear(), maxDate.getMonth());
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          disabled: isDisabled,
          onClick: () => onSelect(new Date(viewYear, i, 1)),
          className: cn(
            "h-9 rounded-lg text-sm font-medium transition-colors select-none",
            isSelected && "bg-[#006F42] text-white",
            isToday && !isSelected && "underline decoration-[#006F42] decoration-2 underline-offset-2 text-[#006F42] font-semibold hover:bg-[#F3F4F6]",
            !isSelected && !isToday && !isDisabled && "text-[#374151] hover:bg-[#F3F4F6]",
            isDisabled && "text-[#D1D5DB] opacity-50 cursor-not-allowed"
          ),
          children: label
        },
        label
      );
    }) })
  ] });
}
var triggerVariants2 = cva(
  "flex items-center min-w-0 rounded-[4px] border border-gray-400 bg-white transition-colors",
  {
    variants: {
      state: {
        default: "text-[#374151] hover:border-gray-500 hover:shadow-sm",
        open: "border-gray-500 ring-1 ring-gray-200 text-[#374151]",
        disabled: "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60 pointer-events-none",
        readonly: "bg-gray-50 border-gray-300 text-gray-700 cursor-default pointer-events-none"
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
function formatMonthYear(date) {
  if (!date) return null;
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
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
  onTouch,
  clearable = false,
  label,
  required,
  helperText,
  error,
  readOnly = false,
  open: controlledOpen,
  onOpenChange: onOpenChangeProp
}) {
  const [internalOpen, setInternalOpen] = React9.useState(false);
  const open = controlledOpen !== void 0 ? controlledOpen : internalOpen;
  const setOpen = React9.useCallback(
    (next) => {
      if (controlledOpen === void 0) setInternalOpen(next);
      onOpenChangeProp?.(next);
    },
    [controlledOpen, onOpenChangeProp]
  );
  const touchedRef = React9.useRef(false);
  const interactedRef = React9.useRef(false);
  const [committed, setCommitted] = React9.useState(
    controlledValue !== void 0 ? controlledValue ?? null : null
  );
  React9.useEffect(() => {
    if (controlledValue !== void 0) setCommitted(controlledValue ?? null);
  }, [controlledValue]);
  const [pendingFrom, setPendingFrom] = React9.useState(null);
  const [draftRange, setDraftRange] = React9.useState(null);
  const [hoverDate, setHoverDate] = React9.useState(null);
  const prevOpen = React9.useRef(false);
  React9.useEffect(() => {
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
  const calendarDisabled = React9.useMemo(() => {
    const m = [];
    if (minDate) m.push({ before: minDate });
    if (maxDate) m.push({ after: maxDate });
    return m.length > 0 ? m : void 0;
  }, [minDate, maxDate]);
  const triggerLabel = React9.useMemo(() => {
    if (!committed) return null;
    if (mode === "single" && committed instanceof Date)
      return formatDate(committed);
    if (mode === "month" && committed instanceof Date)
      return formatMonthYear(committed);
    if (mode === "range" && isDateRange(committed))
      return formatRange(committed.from, committed.to) ?? null;
    return null;
  }, [committed, mode]);
  const effectiveDisplayRange = React9.useMemo(() => {
    if (mode !== "range") return null;
    const existingRange = draftRange ?? (isDateRange(committed) ? committed : null);
    if (pendingFrom) {
      return hoverDate ? orderedRange(pendingFrom, hoverDate) : { from: pendingFrom };
    }
    return existingRange;
  }, [mode, committed, pendingFrom, draftRange, hoverDate]);
  const calendarSelected = React9.useMemo(() => {
    if (mode === "single") {
      return committed instanceof Date ? committed : void 0;
    }
    return effectiveDisplayRange ?? void 0;
  }, [mode, committed, effectiveDisplayRange]);
  const fromLabel = React9.useMemo(() => {
    if (!effectiveDisplayRange) return null;
    return formatDate(effectiveDisplayRange.from);
  }, [effectiveDisplayRange]);
  const toLabel = React9.useMemo(() => {
    if (!effectiveDisplayRange?.to) return null;
    return formatDate(effectiveDisplayRange.to);
  }, [effectiveDisplayRange]);
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
    if (disabled || readOnly) return;
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
  const triggerState = disabled ? "disabled" : readOnly ? "readonly" : open ? "open" : "default";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
    label && /* @__PURE__ */ jsx(InputLabel, { size, required, children: label }),
    /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
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
              if (!disabled && !readOnly) setOpen(!open);
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
              clearable && committed && /* @__PURE__ */ jsx(
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
          align: "center",
          className: "w-auto max-w-[calc(100vw-1rem)] p-0",
          collisionPadding: { top: 64 },
          children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-lg bg-white shadow-md", children: [
            mode === "range" && /* @__PURE__ */ jsxs("div", { className: "flex gap-2 px-3 pt-3", children: [
              /* @__PURE__ */ jsx(DateBox, { label: fromLabel, active: !!fromLabel }),
              /* @__PURE__ */ jsx(DateBox, { label: toLabel, active: false })
            ] }),
            mode === "month" && /* @__PURE__ */ jsx(
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
            mode !== "month" && /* @__PURE__ */ jsx(
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
    ] }),
    /* @__PURE__ */ jsx(InputHelper, { size, helperText, error })
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
  verticalAlign = "top",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
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
        "whitespace-normal break-words [hyphens:none] align-middle",
        sortable && "cursor-pointer select-none hover:text-gray-700",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-1 min-w-0", justifyClass[align]), children: [
        /* @__PURE__ */ jsx("span", { className: "min-w-0 break-words [hyphens:none]", children }),
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
  className,
  hover = true
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
        mobileLayout === "cards" && /* @__PURE__ */ jsx("div", { className: "md:hidden", children: loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3", children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "rounded-xl border border-gray-100 bg-white p-3 sm:p-4 shadow-sm space-y-2.5",
            children: [
              /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/3" }),
              visibleColumns.map((_2, j) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-3", children: [
                /* @__PURE__ */ jsx(Skeleton, { className: "h-3.5 w-1/4" }),
                /* @__PURE__ */ jsx(Skeleton, { className: "h-3.5 w-2/5" })
              ] }, j))
            ]
          },
          i
        )) }) : sortedData.length === 0 ? /* @__PURE__ */ jsx("p", { className: "py-10 text-center text-sm text-gray-500", children: emptyMessage }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3", children: sortedData.map((row, rowIndex) => {
          const rowKey = String(
            row[keyField] ?? rowIndex
          );
          return /* @__PURE__ */ jsx(
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
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "flex items-start justify-between gap-3 px-3 sm:px-4 py-2 sm:py-2.5",
                      !isLast && "border-b border-gray-50"
                    ),
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs font-medium text-gray-400 pt-0.5 min-w-[72px] max-w-[40%]", children: col.header }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: cn(
                            "text-sm text-gray-800 font-medium flex-1 min-w-0",
                            "flex justify-end items-center",
                            col.align === "left" && "justify-start",
                            col.align === "center" && "justify-center"
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
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "overflow-x-auto scroll-smooth",
              // Clip table cells to the rounded corners — overflow:auto on this
              // element also clips to border-radius, so no parent overflow-hidden needed.
              bordered && "rounded-lg",
              stickyHeader && "overflow-y-auto scroll-smooth",
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
                            clickable: Boolean(onRowClick),
                            hover
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
        sm: "h-7 w-12",
        md: "h-8 w-[4.2rem]",
        lg: "h-9 w-[4.75rem]"
      }
    },
    defaultVariants: {
      size: "md"
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
        sm: "h-5 w-5 shadow-[0_1px_2px_rgba(15,23,42,0.18)] data-[state=checked]:translate-x-5",
        md: "h-6 w-6 shadow-[0_2px_3px_rgba(15,23,42,0.18)] data-[state=checked]:translate-x-8",
        lg: "h-7 w-7 shadow-[0_2px_4px_rgba(15,23,42,0.18)] data-[state=checked]:translate-x-9"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var PILL_PADDING3 = {
  sm: "gap-1.5 px-2.5 py-1.5",
  md: "gap-2 px-3 py-2",
  lg: "gap-2.5 px-4 py-2.5"
};
var GAP_ONLY3 = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5"
};
var Toggle = React9.forwardRef(
  ({
    size = "md",
    label,
    required,
    title,
    titlePosition = "right",
    checked,
    defaultChecked,
    onChange,
    disabled,
    readOnly,
    wrapperClassName,
    borderColor,
    bgColor,
    ...props
  }, ref) => {
    const internalRef = React9.useRef(null);
    const [isChecked, setIsChecked] = React9.useState(false);
    const mergedRef = React9.useCallback(
      (node) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );
    React9.useEffect(() => {
      const el = internalRef.current;
      if (!el) return;
      setIsChecked(el.dataset.state === "checked");
      const observer = new MutationObserver(() => {
        setIsChecked(el.dataset.state === "checked");
      });
      observer.observe(el, { attributes: true, attributeFilter: ["data-state"] });
      return () => observer.disconnect();
    }, []);
    const hasCustomColors2 = !!(borderColor || bgColor);
    const pillStyle = hasCustomColors2 ? {
      ...isChecked && borderColor ? { borderColor } : {},
      ...isChecked && bgColor ? { backgroundColor: bgColor } : {}
    } : void 0;
    const switchEl = /* @__PURE__ */ jsx(
      Switch.Root,
      {
        ref: mergedRef,
        checked: checked !== void 0 ? checked : void 0,
        defaultChecked: checked !== void 0 ? void 0 : defaultChecked,
        onCheckedChange: readOnly ? void 0 : onChange,
        disabled,
        className: cn(
          trackVariants({ size }),
          readOnly && "pointer-events-none cursor-default"
        ),
        ...props,
        children: /* @__PURE__ */ jsx(Switch.Thumb, { className: thumbVariants({ size }) })
      }
    );
    const inlineEl = title ? /* @__PURE__ */ jsxs(
      "label",
      {
        style: pillStyle,
        className: cn(
          "inline-flex cursor-pointer items-center transition-colors",
          hasCustomColors2 ? cn("rounded-xl border", PILL_PADDING3[size], "border-gray-200") : GAP_ONLY3[size],
          disabled && "cursor-not-allowed opacity-60",
          readOnly && "pointer-events-none cursor-default"
        ),
        children: [
          titlePosition === "left" && /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-[#1F2937]", children: title }),
          switchEl,
          titlePosition === "right" && /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-[#1F2937]", children: title })
        ]
      }
    ) : hasCustomColors2 ? /* @__PURE__ */ jsx(
      "div",
      {
        style: pillStyle,
        className: cn(
          "inline-flex items-center transition-colors rounded-xl border",
          PILL_PADDING3[size],
          "border-gray-200",
          disabled && "opacity-60",
          readOnly && "pointer-events-none cursor-default"
        ),
        children: switchEl
      }
    ) : switchEl;
    if (label) {
      return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-1.5", wrapperClassName), children: [
        /* @__PURE__ */ jsx(InputLabel, { size, required, children: label }),
        inlineEl
      ] });
    }
    return /* @__PURE__ */ jsx(Fragment, { children: inlineEl });
  }
);
Toggle.displayName = "Toggle";
var sidebarContentVariants = cva(
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
var sidebarPersistentVariants = cva("bg-background border", {
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
  const [isDesktop, setIsDesktop] = React9.useState(false);
  React9.useEffect(() => {
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
      heading ? /* @__PURE__ */ jsx("span", { className: "text-base font-semibold leading-none", children: heading }) : /* @__PURE__ */ jsx("span", {}),
      closeIcon ? /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: onClose,
          className: "rounded-sm p-1 text-[#202020] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "aria-label": "Close sidebar",
          children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5 " })
        }
      ) : null
    ] }),
    divider ? /* @__PURE__ */ jsx("div", { className: "border-b" }) : null
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
  const [uncontrolledOpen, setUncontrolledOpen] = React9.useState(defaultOpen);
  const resolvedOpen = isControlled ? open : uncontrolledOpen;
  const handleOpenChange = React9.useCallback(
    (nextOpen) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );
  const customSizeStyle = React9.useMemo(() => {
    if (sizePercent == null) return {};
    const pct = Math.min(100, Math.max(1, sizePercent));
    if (side === "top" || side === "bottom") {
      return { height: `${pct}vh`, maxHeight: "100vh" };
    }
    if (!isDesktop) return { width: "100vw", maxWidth: "100vw" };
    return { width: `${pct}vw`, maxWidth: "100vw" };
  }, [sizePercent, side, isDesktop]);
  const animDurationStyle = React9.useMemo(() => {
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
    return /* @__PURE__ */ jsx(SidebarZIndexProvider, { children: /* @__PURE__ */ jsxs(
      "aside",
      {
        className: cn(
          sidebarPersistentVariants({ side, size }),
          className,
          contentClassName
        ),
        style: customSizeStyle,
        children: [
          /* @__PURE__ */ jsx(
            SidebarHeader,
            {
              heading,
              closeIcon,
              divider,
              onClose: () => handleOpenChange(false)
            }
          ),
          children
        ]
      }
    ) });
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
        children: /* @__PURE__ */ jsxs(SidebarZIndexProvider, { children: [
          /* @__PURE__ */ jsx(
            SidebarHeader,
            {
              heading,
              closeIcon,
              divider,
              onClose: () => handleOpenChange(false)
            }
          ),
          children
        ] })
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
  const [uncontrolledOpen, setUncontrolledOpen] = React9.useState(defaultOpen);
  const open = isControlled ? openProp : uncontrolledOpen;
  const [inputValue, setInputValue] = React9.useState(defaultValue ?? "");
  const [inputError, setInputError] = React9.useState(null);
  const [submitError, setSubmitError] = React9.useState(null);
  const [loading, setLoading] = React9.useState(false);
  const setOpen = React9.useCallback(
    (next) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  React9.useEffect(() => {
    if (!open) return;
    setInputValue(defaultValue ?? "");
    setInputError(null);
    setSubmitError(null);
    setLoading(false);
  }, [open]);
  React9.useEffect(() => {
    if (!open || !autoCloseMs || loading) return;
    const id = window.setTimeout(() => setOpen(false), autoCloseMs);
    return () => window.clearTimeout(id);
  }, [open, autoCloseMs, loading]);
  const dismiss = React9.useCallback(() => setOpen(false), [setOpen]);
  const confirm = React9.useCallback(async () => {
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
var SweetAlertContext = React9.createContext(null);
function useSweetAlert() {
  const ctx = React9.useContext(SweetAlertContext);
  if (!ctx) throw new Error("useSweetAlert must be used inside <SweetAlertProvider>");
  return ctx;
}
function SweetAlertProvider({ children }) {
  const [queue, setQueue] = React9.useState([]);
  const counter = React9.useRef(0);
  const fire = React9.useCallback(
    (options) => new Promise((resolve) => {
      counter.current += 1;
      setQueue((q) => [...q, { id: counter.current, options, resolve }]);
    }),
    []
  );
  const ctx = React9.useMemo(() => ({ fire }), [fire]);
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
  const [open, setOpen] = React9.useState(true);
  const resolvedRef = React9.useRef(false);
  const close = React9.useCallback(() => setOpen(false), []);
  const handlePreConfirm = React9.useCallback(
    async (value) => {
      await pending.options.preConfirm?.(value);
      resolvedRef.current = true;
      pending.resolve({ isConfirmed: true, isDismissed: false, value });
      close();
    },
    [pending, close]
  );
  const handleOpenChange = React9.useCallback(
    (next) => {
      if (!next && !resolvedRef.current) {
        resolvedRef.current = true;
        pending.resolve({ isConfirmed: false, isDismissed: true });
        close();
      }
    },
    [pending, close]
  );
  React9.useEffect(() => {
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
  React9.useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
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
        /* @__PURE__ */ jsx(ModalZIndexProvider, { children: /* @__PURE__ */ jsx("div", { className: cn("flex-1 overflow-y-auto p-4 outline-none", bodyClassName), children }) })
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
  const [mounted, setMounted] = React9.useState(false);
  React9.useEffect(() => {
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
  return /* @__PURE__ */ jsxs(
    "header",
    {
      "data-slot": "app-header",
      className: cn(
        "uengage-ui fixed left-0 right-0 top-0 z-30 w-full bg-[#FAFFF7]",
        className
      ),
      style,
      ...props,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            "data-slot": "app-header-inner",
            className: "flex min-h-[56px] items-center justify-between px-[10px] py-[4px] sm:min-h-[64px] sm:px-[13px] sm:py-[6px]",
            children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  "data-slot": "app-header-left",
                  className: "flex min-w-0 flex-1 items-center",
                  children: [
                    logo != null && /* @__PURE__ */ jsx(
                      "div",
                      {
                        "data-slot": "app-header-logo",
                        className: "hidden shrink-0 items-center md:flex",
                        style: { width: toCssSize(logoZoneWidth) },
                        children: logo
                      }
                    ),
                    center != null && /* @__PURE__ */ jsx(
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
              right != null && /* @__PURE__ */ jsx(
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
        divider && /* @__PURE__ */ jsx(Separator, { "data-slot": "app-header-divider" })
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
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
    /* @__PURE__ */ jsxs(
      "aside",
      {
        "data-slot": "app-sidebar",
        "data-collapsed": collapsed,
        className: cn(
          "uengage-ui fixed bottom-0 left-0 z-40 flex w-full flex-col md:w-[240px]",
          "bg-[#FAFFF7] transition-transform duration-[250ms] ease-in-out",
          collapsed && "-translate-x-full",
          className
        ),
        style: { top: toCssSize(offsetTop), ...style },
        ...props,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                "data-slot": "app-sidebar-products",
                className: "relative flex w-[35%] flex-col items-end bg-[#FAFFF7]",
                children: products.map((product) => {
                  const isActive = product.id === activeProductId;
                  return /* @__PURE__ */ jsxs(
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
                        product.icon != null && /* @__PURE__ */ jsx(
                          "span",
                          {
                            "data-slot": "app-sidebar-product-icon",
                            className: "shrink-0 [&_svg]:h-[13px] [&_svg]:w-[13px]",
                            children: product.icon
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            "data-slot": "app-sidebar-product-name",
                            className: "mt-1.5 text-center text-[0.75rem] font-bold text-[#003C1B]",
                            children: product.name.split(" ").map((word, i) => /* @__PURE__ */ jsx("span", { className: "block", children: word }, i))
                          }
                        )
                      ]
                    },
                    product.id
                  );
                })
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                "data-slot": "app-sidebar-modules",
                className: "flex h-full w-[65%] flex-col bg-[#FAFFF7]",
                style: {
                  borderLeft: "1px solid",
                  borderImage: "linear-gradient(134.33deg, #C8E7B8 3.98%, #00A86B 104.92%) 1"
                },
                children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    "data-slot": "app-sidebar-modules-scroll",
                    className: "mt-2 flex-1 cursor-pointer overflow-y-auto",
                    children: modules.map((module, index) => {
                      const isActive = module.page === activeModulePage;
                      return /* @__PURE__ */ jsxs(React9.Fragment, { children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            "data-active": isActive,
                            onClick: () => onModuleClick?.(module),
                            className: cn(
                              "w-[90%] cursor-pointer rounded-r-lg py-[13px] pl-2 text-left text-[14px] text-[#003C1B] transition-all",
                              isActive ? "border-[#003C1B] bg-[#C8E7B8] font-bold" : "font-semibold hover:bg-[#E8F5E3]"
                            ),
                            children: /* @__PURE__ */ jsx("span", { className: "block w-full whitespace-normal break-normal", children: module.label })
                          }
                        ),
                        !isActive && modules[index + 1]?.page !== activeModulePage && /* @__PURE__ */ jsx("div", { className: "w-[85%] border-b border-[#E0E0E0]" })
                      ] }, module.page);
                    })
                  }
                )
              }
            )
          ] }),
          footer != null && /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "app-sidebar-footer",
              className: "w-full shrink-0 border-t bg-[#FAFFF7]",
              children: footer
            }
          )
        ]
      }
    )
  ] });
}
AppSidebar.displayName = "AppSidebar";
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
              "data-[state=open]:text-[#006F42] w-full"
            ),
            children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2.5 min-w-0", children: [
                item.icon && /* @__PURE__ */ jsx("span", { className: "shrink-0 [&_svg]:size-4", children: item.icon }),
                /* @__PURE__ */ jsx("span", { className: "truncate text-left", children: item.title })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "ml-auto flex items-center gap-2", children: [
                item.action && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "shrink-0",
                    onClick: (e) => e.stopPropagation(),
                    children: item.action
                  }
                ),
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    className: "size-4 shrink-0 text-[#9CA3AF] transition-transform duration-200 group-data-[state=open]:rotate-180",
                    "aria-hidden": true
                  }
                )
              ] })
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
function findDatePickerInTree(node) {
  if (!React9.isValidElement(node)) return null;
  if (node.type.displayName === "DatePicker") {
    return node;
  }
  const children = node.props.children;
  if (!children) return null;
  for (const child of React9.Children.toArray(children)) {
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
  const [committed, setCommitted] = React9.useState(
    p.value ?? null
  );
  React9.useEffect(() => {
    if (p.value !== void 0) setCommitted(p.value ?? null);
  }, [p.value]);
  const [pendingFrom, setPendingFrom] = React9.useState(null);
  const [draftRange, setDraftRange] = React9.useState(null);
  const [hoverDate, setHoverDate] = React9.useState(null);
  const isRange = (v) => !!v && typeof v === "object" && "from" in v;
  const orderedRange2 = (a, b) => a <= b ? { from: a, to: b } : { from: b, to: a };
  const calendarDisabled = React9.useMemo(() => {
    const m = [];
    if (minDate) m.push({ before: minDate });
    if (maxDate) m.push({ after: maxDate });
    return m.length ? m : void 0;
  }, [minDate, maxDate]);
  const effectiveRange = React9.useMemo(() => {
    if (mode !== "range") return null;
    const existing = draftRange ?? (isRange(committed) ? committed : null);
    if (pendingFrom)
      return hoverDate ? orderedRange2(pendingFrom, hoverDate) : { from: pendingFrom };
    return existing;
  }, [mode, committed, pendingFrom, draftRange, hoverDate]);
  const calendarSelected = React9.useMemo(() => {
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
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col", children: [
    mode === "range" && /* @__PURE__ */ jsx("div", { className: "flex gap-2 px-4 pt-4", children: [fromLabel, toLabel].map((lbl, i) => /* @__PURE__ */ jsx(
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
    mode === "month" && /* @__PURE__ */ jsx(
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
    mode !== "month" && /* @__PURE__ */ jsx(
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
  const [open, setOpen] = React9.useState(false);
  const [activeIndex, setActiveIndex] = React9.useState(0);
  const programmaticClose = React9.useRef(false);
  const childArray = React9.Children.toArray(children);
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
      return /* @__PURE__ */ jsx(InlineDatePickerPanel, { child: datePicker });
    }
    return /* @__PURE__ */ jsx("div", { className: "p-4 [&_span.text-xs]:hidden", children: /* @__PURE__ */ jsx(FilterGroupMobileContext.Provider, { value: true, children: item.content }) });
  };
  const drawer = /* @__PURE__ */ jsxs(Drawer, { open, onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsx(DrawerTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors",
        children: [
          /* @__PURE__ */ jsx(SlidersHorizontal, { size: 16, className: "text-gray-500" }),
          /* @__PURE__ */ jsx("span", { children: drawerTitle }),
          activeCount != null && activeCount > 0 && /* @__PURE__ */ jsx("span", { className: "inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#006F42] text-white text-[10px] font-bold leading-none", children: activeCount })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(DrawerOverlay, {}),
    /* @__PURE__ */ jsxs(
      DrawerContent,
      {
        "aria-label": drawerTitle,
        className: cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "rounded-t-2xl bg-white",
          "h-[70vh] flex flex-col",
          "translate-y-full data-[state=open]:translate-y-0",
          "transition-transform duration-300 ease-out",
          drawerClassName
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0", children: [
            /* @__PURE__ */ jsx(DrawerTitle, { className: "text-lg font-bold text-gray-900", children: drawerTitle }),
            /* @__PURE__ */ jsx(DrawerClose, { asChild: true, children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors",
                "aria-label": "Close filters",
                children: /* @__PURE__ */ jsx(X, { size: 20 })
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: cn(
              "w-28 shrink-0 border-r border-gray-200 overflow-y-auto bg-gray-50",
              "[&::-webkit-scrollbar]:w-1.5",
              "[&::-webkit-scrollbar-track]:bg-gray-100",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-[#006F42]"
            ), style: { scrollbarWidth: "thin", scrollbarColor: "#006F42 #f3f4f6" }, children: items.map((item, i) => /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx("div", { className: cn(
              "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
              "[&::-webkit-scrollbar]:w-1.5",
              "[&::-webkit-scrollbar-track]:bg-gray-100",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb]:bg-[#006F42]"
            ), style: { scrollbarWidth: "thin", scrollbarColor: "#006F42 #f3f4f6" }, children: activeItem && renderRightPanel(activeItem) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-t border-gray-200 shrink-0", children: [
            /* @__PURE__ */ jsx(
              Button2,
              {
                type: "button",
                variant: "secondary",
                onClick: handleReset,
                className: "flex-1 py-3 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors",
                children: "Reset"
              }
            ),
            /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: cn("hidden sm:flex items-center gap-2 flex-wrap", className), children: items.map((item, i) => /* @__PURE__ */ jsx(React9.Fragment, { children: item.content }, i)) }),
    /* @__PURE__ */ jsx("div", { className: "flex sm:hidden", children: drawer })
  ] });
}
FilterGroup.displayName = "FilterGroup";
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
var BannerRoot = React9.forwardRef(
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
var BannerIcon = React9.forwardRef(({ className, style, ...props }, ref) => /* @__PURE__ */ jsx(
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
var BannerContent = React9.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex-1 min-w-0 break-normal", className), ...props }));
BannerContent.displayName = "BannerContent";
var DEFAULT_ICONS = {
  info: /* @__PURE__ */ jsx(Info, {}),
  success: /* @__PURE__ */ jsx(CircleCheck, {}),
  error: /* @__PURE__ */ jsx(CircleX, {}),
  warning: /* @__PURE__ */ jsx(TriangleAlert, {})
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
  return /* @__PURE__ */ jsxs(
    BannerRoot,
    {
      variant: usingCustom ? void 0 : variant,
      className: cn(className),
      style: { ...customStyle, ...style },
      ...rest,
      children: [
        showIcon && /* @__PURE__ */ jsx(
          BannerIcon,
          {
            style: iconColor ? { color: iconColor, ["--banner-icon"]: iconColor } : void 0,
            children: resolvedIcon
          }
        ),
        /* @__PURE__ */ jsx(BannerContent, { children: children ?? message })
      ]
    }
  );
}
Banner.displayName = "Banner";
var SectionContext = React9.createContext({
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
  const { collapsible, isOpen, divider } = React9.useContext(SectionContext);
  const inner = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-[11px] min-w-0 pointer-events-none", children: [
      icon && /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "section-header-title",
            className: "text-base font-semibold text-[#202020] leading-snug",
            children: title
          }
        ),
        description && /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "section-header-description",
            className: "text-xs text-[#6B7280] mt-0.5",
            children: description
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex-shrink-0 flex items-center gap-2", children: [
      action && /* @__PURE__ */ jsx(
        "div",
        {
          "data-slot": "section-header-action",
          className: "pointer-events-auto",
          onClick: (e) => e.stopPropagation(),
          onKeyDown: (e) => e.stopPropagation(),
          children: action
        }
      ),
      collapsible && /* @__PURE__ */ jsx(
        "span",
        {
          "data-slot": "section-collapse-indicator",
          className: "flex h-7 w-7 items-center justify-center rounded-md text-[#6B7280]",
          "aria-hidden": true,
          children: /* @__PURE__ */ jsx(
            ChevronDown,
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
    ] })
  ] });
  if (collapsible) {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
      Collapsible.Trigger,
      {
        "data-slot": "section-header",
        className: cn(
          "w-[calc(100%+8px)] flex items-center justify-between gap-3 text-left",
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "section-header",
      className: cn(
        "flex items-start justify-between gap-3 px-5 py-4",
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
    return /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsxs(
      "div",
      {
        "data-slot": "section-divider",
        "data-orientation": "horizontal",
        className: cn("flex items-center gap-3 -mx-6 mt-6 mb-4 px-6", className),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1 border-t border-[#E2E2E2]" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#6B7280] whitespace-nowrap", children: label }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 border-t border-[#E2E2E2]" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "section-divider",
      "data-orientation": "horizontal",
      role: "separator",
      className: cn(
        "-mx-6 mt-6 mb-4 border-t border-[#E2E2E2]",
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
  const { collapsible, divider, dividerStyle } = React9.useContext(SectionContext);
  const inner = /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "section-content",
      className: cn("flex flex-col gap-0 px-5 pt-1 pb-[22px]", className),
      ...props,
      children
    }
  );
  const headerRule = divider && /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsxs(Collapsible.Content, { className: "overflow-hidden will-change-[height] data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up", children: [
      headerRule,
      inner
    ] });
  }
  if (divider) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    separator && /* @__PURE__ */ jsx(SectionDivider, { label: separatorLabel }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        "data-slot": "section-subsection",
        className: cn("flex flex-col gap-3", className),
        ...props,
        children: [
          (title || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
            title && /* @__PURE__ */ jsx("p", { className: cn("text-[11.5px] font-bold uppercase tracking-[.06em] text-[#1F5E2C]", titleClassName), children: title }),
            description && /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6B7280]", children: description })
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
    const items = React9.Children.toArray(children).filter(Boolean);
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "section-row",
        "data-dividers": "true",
        className: cn("flex items-stretch gap-0", className),
        style,
        ...props,
        children: items.map((child, i) => /* @__PURE__ */ jsxs(React9.Fragment, { children: [
          i > 0 && /* @__PURE__ */ jsx(SectionDivider, { orientation: "vertical", className: "mx-5" }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: child })
        ] }, i))
      }
    );
  }
  const key = String(columns);
  const isPreset = key in COLUMN_CLASSES;
  return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
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
  const { collapsible } = React9.useContext(SectionContext);
  const inner = /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx(Collapsible.Content, { className: "overflow-hidden will-change-[height] data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up", children: inner });
  }
  return inner;
}
function SectionGroup({
  defaultOpen = 0,
  className,
  children,
  ...props
}) {
  const [openIndex, setOpenIndex] = React9.useState(defaultOpen);
  const items = React9.Children.toArray(children).filter(Boolean);
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "section-group",
      className: cn("flex flex-col gap-4", className),
      ...props,
      children: items.map((child, i) => {
        if (!React9.isValidElement(child)) return child;
        return React9.cloneElement(child, {
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
  const [internalOpen, setInternalOpen] = React9.useState(
    isControlled ? openProp : defaultOpen
  );
  const isOpen = isControlled ? openProp : internalOpen;
  const handleOpenChange = React9.useCallback(
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
    return /* @__PURE__ */ jsx(SectionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx(SectionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(Collapsible.Root, { open: isOpen, onOpenChange: handleOpenChange, asChild: true, children: /* @__PURE__ */ jsx(Card, { "data-slot": "section", className: cardClass, ...props, children }) }) });
  }
  return /* @__PURE__ */ jsx(SectionContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx(Card, { "data-slot": "section", className: cardClass, ...props, children }) });
}
Section.displayName = "Section";
var dropzoneVariants = cva(
  [
    "relative w-full flex flex-col items-center justify-center",
    "rounded-xl border-2 border-dashed transition-all duration-150",
    "cursor-pointer select-none outline-none",
    "focus-visible:ring-2 focus-visible:ring-[#007a4d] focus-visible:ring-offset-2"
  ],
  {
    variants: {
      size: {
        sm: "h-24 gap-1.5 px-3 py-3",
        md: "h-32 gap-2 px-4 py-5",
        lg: "h-44 gap-3 px-6 py-8"
      },
      state: {
        idle: "border-gray-300 bg-gray-50 hover:border-[#007a4d] hover:bg-green-50/60",
        dragover: "border-[#007a4d] bg-green-50 ring-2 ring-[#007a4d]/20 ring-offset-0",
        error: "border-red-400 bg-red-50/60",
        disabled: "cursor-not-allowed border-gray-200 bg-gray-50/80 opacity-50 pointer-events-none"
      }
    },
    defaultVariants: {
      size: "md",
      state: "idle"
    }
  }
);
var iconWrapperVariants = cva(
  "flex items-center justify-center rounded-xl bg-gray-100 flex-shrink-0",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12"
      }
    },
    defaultVariants: { size: "md" }
  }
);
var avatarContainerVariants = cva(
  [
    "relative rounded-full overflow-hidden flex-shrink-0 transition-all duration-150",
    "focus-visible:ring-2 focus-visible:ring-[#007a4d] focus-visible:ring-offset-2"
  ],
  {
    variants: {
      size: {
        sm: "w-16 h-16",
        md: "w-20 h-20",
        lg: "w-28 h-28"
      },
      state: {
        empty: "border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:border-[#007a4d] hover:bg-green-50/60",
        filled: "border border-gray-200 cursor-pointer",
        disabled: "border-2 border-dashed border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed pointer-events-none"
      }
    },
    defaultVariants: { size: "md", state: "empty" }
  }
);
var ICON_SIZES2 = { sm: 14, md: 18, lg: 22 };
var AVATAR_ICON_SIZES = { sm: 16, md: 20, lg: 26 };
var PLACEHOLDER_TEXT = {
  image: "Click or drag to upload image",
  file: "Click or drag to upload file",
  avatar: "Upload photo",
  video: "Click or drag to upload video"
};
function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${units[i]}`;
}
function getDefaultAccept(variant) {
  if (variant === "image" || variant === "avatar") return "image/*";
  if (variant === "video") return "video/*";
  return void 0;
}
function makeId() {
  return Math.random().toString(36).slice(2, 9);
}
function FileUpload({
  variant = "file",
  size = "md",
  accept,
  multiple = false,
  disabled = false,
  readOnly = false,
  name,
  id,
  maxSize,
  maxFiles,
  allowedFiles,
  value,
  onChange,
  onFilesChange,
  onRemove,
  onRemoveFile,
  onValidationError,
  label,
  required = false,
  error,
  helperText,
  placeholder,
  description,
  dragAndDrop = true,
  showLocalPreview = true,
  clearable = true,
  changeable = true,
  icon,
  className,
  dropzoneClassName,
  inputRef: externalInputRef
}) {
  const reactId = React9.useId();
  const inputId = id ?? reactId;
  const internalInputRef = React9.useRef(null);
  const attachInputRef = React9.useCallback(
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
  const [isDragOver, setIsDragOver] = React9.useState(false);
  const [localFiles, setLocalFiles] = React9.useState([]);
  const [validationErrors, setValidationErrors] = React9.useState([]);
  const isImageVariant = variant === "image" || variant === "avatar";
  const isPreviewVariant = isImageVariant || variant === "video";
  const normalizedAllowedExts = React9.useMemo(
    () => allowedFiles?.map((e) => e.startsWith(".") ? e.toLowerCase() : `.${e.toLowerCase()}`),
    [allowedFiles]
  );
  const effectiveAccept = accept ?? (normalizedAllowedExts ? normalizedAllowedExts.join(",") : getDefaultAccept(variant));
  const controlledUrls = React9.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
  }, [value]);
  const hasControlledValue = controlledUrls.length > 0;
  const displayItems = React9.useMemo(() => {
    const items = [];
    controlledUrls.forEach((url, i) => items.push({ kind: "url", url, index: i }));
    if (showLocalPreview) {
      localFiles.forEach(
        (lf, i) => items.push({ kind: "file", localFile: lf, index: controlledUrls.length + i })
      );
    }
    return items;
  }, [controlledUrls, localFiles, showLocalPreview]);
  const hasContent = displayItems.length > 0;
  React9.useEffect(() => {
    if (hasControlledValue && localFiles.length > 0) {
      localFiles.forEach((f) => URL.revokeObjectURL(f.previewUrl));
      setLocalFiles([]);
    }
  }, [hasControlledValue]);
  React9.useEffect(() => {
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
  const processFiles = React9.useCallback(
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
  const openFilePicker = React9.useCallback(() => {
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
  const dzState = disabled ? "disabled" : isDragOver ? "dragover" : error || validationErrors.length > 0 ? "error" : "idle";
  const combinedError = error ?? validationErrors[0];
  const iconSize = ICON_SIZES2[size] ?? 18;
  const avatarIconSize = AVATAR_ICON_SIZES[size] ?? 20;
  const canAddMore = !disabled && !readOnly && (!maxFiles || displayItems.length < maxFiles);
  const dropzoneInteractionProps = {
    role: "button",
    tabIndex: disabled ? -1 : 0,
    onClick: openFilePicker,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    onKeyDown: handleKeyDown,
    "aria-label": placeholder ?? PLACEHOLDER_TEXT[variant]
  };
  const filledDragProps = dragAndDrop && !disabled && !readOnly ? { onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop } : {};
  const renderImageVariant = () => {
    if (!multiple) {
      const item = displayItems[0];
      const previewUrl = item ? item.kind === "url" ? item.url : item.localFile.previewUrl : null;
      if (previewUrl) {
        return /* @__PURE__ */ jsxs(
          "div",
          {
            ...filledDragProps,
            className: cn(
              "relative w-full overflow-hidden rounded-xl border group transition-colors duration-150",
              isDragOver ? "border-[#007a4d] bg-green-50/40" : "border-gray-200",
              size === "sm" && "h-24",
              size === "md" && "h-32",
              size === "lg" && "h-44"
            ),
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: previewUrl,
                  alt: "Preview",
                  className: "absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                }
              ),
              isDragOver && !disabled && !readOnly && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-green-50/60 backdrop-blur-[1px] pointer-events-none", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-[#007a4d]", children: "Drop to replace" }) }),
              icon && !disabled && !readOnly && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: openFilePicker,
                  onKeyDown: handleKeyDown,
                  className: "absolute bottom-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:text-[#007a4d] hover:border-[#007a4d] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d]",
                  "aria-label": "Change image",
                  children: icon
                }
              ),
              !disabled && !readOnly && (changeable || clearable) && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200", children: /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 flex items-center justify-between gap-2 p-2.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-200", children: [
                changeable && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: openFilePicker,
                    onKeyDown: handleKeyDown,
                    className: "flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800 shadow hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    "aria-label": "Change image",
                    children: [
                      /* @__PURE__ */ jsx(ImageIcon, { size: 12 }),
                      "Change"
                    ]
                  }
                ),
                clearable && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => item && handleRemoveItem(e, item),
                    className: "flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400",
                    "aria-label": "Remove image",
                    children: [
                      /* @__PURE__ */ jsx(X, { size: 12 }),
                      "Remove"
                    ]
                  }
                )
              ] }) })
            ]
          }
        );
      }
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ...dropzoneInteractionProps,
          className: cn(dropzoneVariants({ size, state: dzState }), dropzoneClassName),
          children: [
            /* @__PURE__ */ jsx("div", { className: iconWrapperVariants({ size }), children: /* @__PURE__ */ jsx(ImageIcon, { size: iconSize, className: "text-gray-400" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-0.5 text-center", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "font-medium text-gray-600",
                    size === "sm" && "text-xs",
                    size === "md" && "text-sm",
                    size === "lg" && "text-base"
                  ),
                  children: placeholder ?? PLACEHOLDER_TEXT.image
                }
              ),
              description && /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "text-gray-400",
                    size === "sm" && "text-[10px]",
                    size === "md" && "text-xs",
                    size === "lg" && "text-sm"
                  ),
                  children: description
                }
              )
            ] }),
            dragAndDrop && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-300", children: "Drag & drop supported" })
          ]
        }
      );
    }
    if (displayItems.length === 0) {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ...dropzoneInteractionProps,
          className: cn(dropzoneVariants({ size, state: dzState }), "w-full", dropzoneClassName),
          children: [
            /* @__PURE__ */ jsx("div", { className: iconWrapperVariants({ size }), children: /* @__PURE__ */ jsx(ImageIcon, { size: iconSize, className: "text-gray-400" }) }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "font-medium text-gray-600",
                  size === "sm" && "text-xs",
                  size === "md" && "text-sm",
                  size === "lg" && "text-base"
                ),
                children: placeholder ?? PLACEHOLDER_TEXT.image
              }
            ),
            description && /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "text-gray-400",
                  size === "sm" && "text-[10px]",
                  size === "md" && "text-xs",
                  size === "lg" && "text-sm"
                ),
                children: description
              }
            )
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...filledDragProps,
        className: cn(
          "w-full overflow-y-auto rounded-xl border transition-colors duration-150",
          isDragOver ? "border-[#007a4d] bg-green-50/40" : "border-gray-200",
          size === "sm" && "h-24",
          size === "md" && "h-32",
          size === "lg" && "h-44"
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 p-2", children: [
          displayItems.map((item) => {
            const url = item.kind === "url" ? item.url : item.localFile.previewUrl;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative group w-20 h-20 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0",
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: url,
                      alt: `Image ${item.index + 1}`,
                      className: "w-full h-full object-cover"
                    }
                  ),
                  !disabled && !readOnly && clearable && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => handleRemoveItem(e, item),
                      className: "absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                      "aria-label": "Remove",
                      children: /* @__PURE__ */ jsx(X, { size: 10, className: "text-white" })
                    }
                  )
                ]
              },
              item.kind === "url" ? `url-${item.index}` : item.localFile.id
            );
          }),
          canAddMore && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: openFilePicker,
              className: "rounded-xl border-2 border-dashed border-gray-300 w-20 h-20 flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:border-[#007a4d] hover:text-green-600 hover:bg-green-50/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d]",
              "aria-label": "Add image",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 18 }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium", children: "Add" })
              ]
            }
          )
        ] })
      }
    );
  };
  const renderAvatarVariant = () => {
    const item = displayItems[0];
    const previewUrl = item ? item.kind === "url" ? item.url : item.localFile.previewUrl : null;
    const avatarState = disabled ? "disabled" : previewUrl ? "filled" : "empty";
    return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            ...!previewUrl ? dropzoneInteractionProps : {},
            className: avatarContainerVariants({ size, state: avatarState }),
            children: previewUrl ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: previewUrl,
                  alt: "Avatar",
                  className: "w-full h-full object-cover"
                }
              ),
              !disabled && !readOnly && /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full",
                  onClick: openFilePicker,
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: handleKeyDown,
                  "aria-label": "Change photo",
                  children: /* @__PURE__ */ jsx(ImageIcon, { size: avatarIconSize, className: "text-white" })
                }
              )
            ] }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Upload, { size: avatarIconSize, className: "text-gray-400" }) })
          }
        ),
        icon && !disabled && !readOnly && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: openFilePicker,
            onKeyDown: handleKeyDown,
            className: "absolute bottom-0 right-0 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow border border-gray-100 text-gray-600 hover:text-[#007a4d] hover:border-[#007a4d] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d]",
            "aria-label": "Change photo",
            children: icon
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
        !disabled && !readOnly && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: openFilePicker,
            className: "text-sm font-medium text-[#007a4d] hover:underline text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d] rounded",
            children: previewUrl ? "Change photo" : placeholder ?? "Upload photo"
          }
        ),
        description && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: description }),
        clearable && previewUrl && !disabled && !readOnly && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleClearAll,
            className: "text-xs text-red-400 hover:text-red-600 text-left",
            children: "Remove"
          }
        )
      ] })
    ] });
  };
  const renderFileVariant = () => {
    if (hasContent) {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ...filledDragProps,
          className: cn(
            "w-full rounded-xl border overflow-hidden flex flex-col transition-colors duration-150",
            isDragOver ? "border-[#007a4d] bg-green-50/40" : "border-gray-200",
            size === "sm" && "h-24",
            size === "md" && "h-32",
            size === "lg" && "h-44",
            disabled && "opacity-50"
          ),
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto divide-y divide-gray-100 min-h-0", children: displayItems.map((item) => {
              const name2 = item.kind === "file" ? item.localFile.file.name : item.url.split("/").pop() ?? item.url;
              const size_ = item.kind === "file" ? formatBytes(item.localFile.file.size) : null;
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-3 px-3 py-2.5 bg-white",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx(File, { size: 15, className: "text-gray-400" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-800 truncate", children: name2 }),
                      size_ && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: size_ })
                    ] }),
                    clearable && !disabled && !readOnly && /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: (e) => handleRemoveItem(e, item),
                        className: "w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors rounded flex-shrink-0",
                        "aria-label": `Remove ${name2}`,
                        children: /* @__PURE__ */ jsx(X, { size: 14 })
                      }
                    )
                  ]
                },
                item.kind === "url" ? `url-${item.index}` : item.localFile.id
              );
            }) }),
            multiple && canAddMore && /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: openFilePicker,
                className: "flex-shrink-0 w-full flex items-center gap-2 px-3 py-2.5 bg-gray-50 border-t border-gray-100 text-sm text-gray-500 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#007a4d]",
                children: [
                  /* @__PURE__ */ jsx(Plus, { size: 14 }),
                  "Add more files"
                ]
              }
            )
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ...dropzoneInteractionProps,
        className: cn(dropzoneVariants({ size, state: dzState }), dropzoneClassName),
        children: [
          /* @__PURE__ */ jsx("div", { className: iconWrapperVariants({ size }), children: /* @__PURE__ */ jsx(Upload, { size: iconSize, className: "text-gray-400" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-0.5 text-center", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "font-medium text-gray-600",
                  size === "sm" && "text-xs",
                  size === "md" && "text-sm",
                  size === "lg" && "text-base"
                ),
                children: placeholder ?? PLACEHOLDER_TEXT.file
              }
            ),
            description && /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "text-gray-400",
                  size === "sm" && "text-[10px]",
                  size === "md" && "text-xs",
                  size === "lg" && "text-sm"
                ),
                children: description
              }
            )
          ] }),
          dragAndDrop && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-300", children: "Drag & drop supported" })
        ]
      }
    );
  };
  const renderVideoVariant = () => {
    if (!multiple) {
      const item = displayItems[0];
      const previewUrl = item ? item.kind === "url" ? item.url : item.localFile.previewUrl : null;
      if (previewUrl) {
        return /* @__PURE__ */ jsxs(
          "div",
          {
            ...filledDragProps,
            className: cn(
              "relative w-full overflow-hidden rounded-xl border bg-black group transition-colors duration-150",
              isDragOver ? "border-[#007a4d]" : "border-gray-200",
              size === "sm" && "h-24",
              size === "md" && "h-32",
              size === "lg" && "h-44"
            ),
            children: [
              /* @__PURE__ */ jsx(
                "video",
                {
                  src: previewUrl,
                  className: "absolute inset-0 w-full h-full object-contain",
                  controls: true,
                  preload: "metadata"
                }
              ),
              isDragOver && !disabled && !readOnly && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[1px] pointer-events-none z-10", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-white", children: "Drop to replace" }) }),
              !disabled && !readOnly && (changeable || clearable) && /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-2.5 bg-gradient-to-b from-black/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto", children: [
                changeable && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: openFilePicker,
                    onKeyDown: handleKeyDown,
                    className: "flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800 shadow hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                    "aria-label": "Change video",
                    children: [
                      /* @__PURE__ */ jsx(Video, { size: 12 }),
                      "Change"
                    ]
                  }
                ),
                clearable && /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => item && handleRemoveItem(e, item),
                    className: "flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow hover:bg-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400",
                    "aria-label": "Remove video",
                    children: [
                      /* @__PURE__ */ jsx(X, { size: 12 }),
                      "Remove"
                    ]
                  }
                )
              ] })
            ]
          }
        );
      }
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ...dropzoneInteractionProps,
          className: cn(dropzoneVariants({ size, state: dzState }), dropzoneClassName),
          children: [
            /* @__PURE__ */ jsx("div", { className: iconWrapperVariants({ size }), children: /* @__PURE__ */ jsx(Video, { size: iconSize, className: "text-gray-400" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-0.5 text-center", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "font-medium text-gray-600",
                    size === "sm" && "text-xs",
                    size === "md" && "text-sm",
                    size === "lg" && "text-base"
                  ),
                  children: placeholder ?? PLACEHOLDER_TEXT.video
                }
              ),
              description && /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "text-gray-400",
                    size === "sm" && "text-[10px]",
                    size === "md" && "text-xs",
                    size === "lg" && "text-sm"
                  ),
                  children: description
                }
              )
            ] }),
            dragAndDrop && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-300", children: "Drag & drop supported" })
          ]
        }
      );
    }
    if (displayItems.length === 0) {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          ...dropzoneInteractionProps,
          className: cn(dropzoneVariants({ size, state: dzState }), "w-full", dropzoneClassName),
          children: [
            /* @__PURE__ */ jsx("div", { className: iconWrapperVariants({ size }), children: /* @__PURE__ */ jsx(Video, { size: iconSize, className: "text-gray-400" }) }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "font-medium text-gray-600",
                  size === "sm" && "text-xs",
                  size === "md" && "text-sm",
                  size === "lg" && "text-base"
                ),
                children: placeholder ?? PLACEHOLDER_TEXT.video
              }
            ),
            description && /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "text-gray-400",
                  size === "sm" && "text-[10px]",
                  size === "md" && "text-xs",
                  size === "lg" && "text-sm"
                ),
                children: description
              }
            )
          ]
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ...filledDragProps,
        className: cn(
          "w-full overflow-y-auto rounded-xl border transition-colors duration-150",
          isDragOver ? "border-[#007a4d] bg-green-50/40" : "border-gray-200",
          size === "sm" && "h-24",
          size === "md" && "h-32",
          size === "lg" && "h-44"
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 p-2", children: [
          displayItems.map((item) => {
            const url = item.kind === "url" ? item.url : item.localFile.previewUrl;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative group w-20 h-20 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0 bg-black",
                children: [
                  /* @__PURE__ */ jsx(
                    "video",
                    {
                      src: url,
                      className: "w-full h-full object-cover",
                      muted: true,
                      preload: "metadata"
                    }
                  ),
                  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-black/50 flex items-center justify-center", children: /* @__PURE__ */ jsx(Play, { size: 10, className: "text-white ml-0.5" }) }) }),
                  !disabled && !readOnly && clearable && /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => handleRemoveItem(e, item),
                      className: "absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                      "aria-label": "Remove",
                      children: /* @__PURE__ */ jsx(X, { size: 10, className: "text-white" })
                    }
                  )
                ]
              },
              item.kind === "url" ? `url-${item.index}` : item.localFile.id
            );
          }),
          canAddMore && /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: openFilePicker,
              className: "rounded-xl border-2 border-dashed border-gray-300 w-20 h-20 flex flex-col items-center justify-center gap-0.5 text-gray-400 hover:border-[#007a4d] hover:text-green-600 hover:bg-green-50/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#007a4d]",
              "aria-label": "Add video",
              children: [
                /* @__PURE__ */ jsx(Plus, { size: 18 }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium", children: "Add" })
              ]
            }
          )
        ] })
      }
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col gap-1.5 w-full", className), children: [
    label && /* @__PURE__ */ jsx(
      InputLabel,
      {
        htmlFor: inputId,
        required,
        size: size === "lg" ? "lg" : size === "sm" ? "sm" : "md",
        children: label
      }
    ),
    variant === "avatar" ? renderAvatarVariant() : variant === "image" ? renderImageVariant() : variant === "video" ? renderVideoVariant() : renderFileVariant(),
    /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(
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
var chipVariants = cva(
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
  const iconNode = icon ? /* @__PURE__ */ jsx("span", { className: "inline-flex items-center flex-shrink-0", "aria-hidden": true, children: icon }) : null;
  return /* @__PURE__ */ jsxs(
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

export { Accordion, AlertDialog2 as AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, AppHeader, AppSidebar, Banner, Button2 as Button, Card2 as Card, CardAction, CardContent2 as CardContent, CardDescription, CardFooter2 as CardFooter, CardHeader2 as CardHeader, CardTitle2 as CardTitle, Checkbox, CheckboxGroup, Chip, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, TableCell2 as CustomTableCell, TableHeaderCell as CustomTableHeaderCell, TableSkeleton as CustomTableSkeleton, CustomTabsTrigger, DatePicker, DatePickerCalendar, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger, FileUpload, FilterGroup, FilterGroupMobileContext, Grid, Input2 as Input, InputHelper, InputLabel, LAYOUT, Label, Loader, Modal, MonthPickerCalendar, PATTERN_REGEX, PageContainer, Pagination2 as Pagination, Popover, PopoverContent, PopoverTrigger, Radio, RadioGroup, SearchBar, Section, SectionContent, SectionDivider, SectionField, SectionGroup, SectionHeader, SectionRow, SectionSubsection, SectionTableContent, Select, Separator, Sidebar, StatusBadge, SubHeader, SweetAlertProvider, Table2 as Table, Tabs2 as Tabs, Toggle, TopHeader, UengageProvider, accordionContentVariants, accordionItemVariants, accordionRootVariants, accordionTriggerVariants, iconBadgeVariants as alertDialogIconBadgeVariants, avatarContainerVariants, brand, buttonVariants, checkboxBoxVariants, checkboxLabelVariants, chevronButtonVariants, chipVariants, cn, buttonVariants2 as customButtonVariants, triggerVariants2 as datePickerTriggerVariants, dayCellVariants, dropzoneVariants, formatDate, formatMonthYear, formatRange, iconWrapperVariants, Input as input, inputFieldVariants, inputIconSlotVariants, inputWrapperVariants, isSameDay, pageButtonVariants, radioCircleVariants, radioDotVariants, radioLabelVariants, sidebarContentVariants, sidebarPersistentVariants, statusBadgeVariants, tabTriggerVariants, tableBodyRowVariants, tableHeaderRowVariants, tableWrapperVariants, thumbVariants, toCssSize, trackVariants, triggerVariants, usePagination, useSweetAlert };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map