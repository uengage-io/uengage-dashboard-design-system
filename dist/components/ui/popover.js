"use client";
import { Popover as Popover$1 } from 'radix-ui';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as React from 'react';
import { jsx } from 'react/jsx-runtime';

// src/components/ui/popover.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var ZIndexContext = React.createContext({ popover: 20 });
function useZIndex() {
  return React.useContext(ZIndexContext);
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

export { Popover, PopoverContent, PopoverTrigger };
//# sourceMappingURL=popover.js.map
//# sourceMappingURL=popover.js.map