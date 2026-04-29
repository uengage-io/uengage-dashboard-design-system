"use client";
'use strict';

var radixUi = require('radix-ui');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');

// src/components/ui/drawer.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
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

exports.Drawer = Drawer;
exports.DrawerClose = DrawerClose;
exports.DrawerContent = DrawerContent;
exports.DrawerDescription = DrawerDescription;
exports.DrawerOverlay = DrawerOverlay;
exports.DrawerPortal = DrawerPortal;
exports.DrawerTitle = DrawerTitle;
exports.DrawerTrigger = DrawerTrigger;
//# sourceMappingURL=drawer.cjs.map
//# sourceMappingURL=drawer.cjs.map