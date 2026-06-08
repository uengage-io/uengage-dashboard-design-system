"use client";
'use strict';

var React = require('react');
var cmdk = require('cmdk');
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

// src/components/ui/command.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
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
var CommandList = React__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
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

exports.Command = Command;
exports.CommandEmpty = CommandEmpty;
exports.CommandGroup = CommandGroup;
exports.CommandInput = CommandInput;
exports.CommandItem = CommandItem;
exports.CommandList = CommandList;
exports.CommandSeparator = CommandSeparator;
//# sourceMappingURL=command.cjs.map
//# sourceMappingURL=command.cjs.map