"use client";
'use strict';

var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');

// src/lib/utils.ts
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
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

exports.Skeleton = Skeleton;
//# sourceMappingURL=skeleton.cjs.map
//# sourceMappingURL=skeleton.cjs.map