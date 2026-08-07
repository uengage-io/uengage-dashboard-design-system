"use client";
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx } from 'react/jsx-runtime';

// src/lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
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

export { Skeleton };
//# sourceMappingURL=skeleton.js.map
//# sourceMappingURL=skeleton.js.map