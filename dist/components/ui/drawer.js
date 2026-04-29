"use client";
import { Dialog } from 'radix-ui';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/components/ui/drawer.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
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

export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger };
//# sourceMappingURL=drawer.js.map
//# sourceMappingURL=drawer.js.map