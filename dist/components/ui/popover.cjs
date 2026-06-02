"use client";
'use strict';

var radixUi = require('radix-ui');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');

// src/components/ui/popover.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
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
  ...props
}) {
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
      style: { zIndex: 9999, ...style },
      ...props
    }
  ) });
}

exports.Popover = Popover;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
//# sourceMappingURL=popover.cjs.map
//# sourceMappingURL=popover.cjs.map