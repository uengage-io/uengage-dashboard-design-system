"use client";
import { Command as Command$1, CommandInput as CommandInput$1, CommandList as CommandList$1, CommandEmpty as CommandEmpty$1, CommandGroup as CommandGroup$1, CommandItem as CommandItem$1, CommandSeparator as CommandSeparator$1 } from 'cmdk';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsx } from 'react/jsx-runtime';

// src/components/ui/command.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
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
function CommandList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    CommandList$1,
    {
      "data-slot": "command-list",
      className: cn("max-h-60 overflow-y-auto overflow-x-hidden py-1", className),
      ...props
    }
  );
}
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

export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator };
//# sourceMappingURL=command.js.map
//# sourceMappingURL=command.js.map