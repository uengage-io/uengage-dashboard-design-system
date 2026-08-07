"use client";
import { Separator as Separator$1 } from 'radix-ui';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx } from 'react/jsx-runtime';

// src/components/ui/separator.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
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

export { Separator };
//# sourceMappingURL=separator.js.map
//# sourceMappingURL=separator.js.map