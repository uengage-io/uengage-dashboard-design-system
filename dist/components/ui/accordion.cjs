"use client";
'use strict';

var lucideReact = require('lucide-react');
var radixUi = require('radix-ui');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');

// src/components/ui/accordion.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Accordion.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Accordion.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Accordion.Header, { className: "flex", children: /* @__PURE__ */ jsxRuntime.jsxs(
    radixUi.Accordion.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDownIcon, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Accordion.Content,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}

exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
//# sourceMappingURL=accordion.cjs.map
//# sourceMappingURL=accordion.cjs.map