import { cva } from "class-variance-authority";
import { COMPONENT_HEIGHT, TEXT_SIZE } from "@/utils/tokens";

export type ColorPickerTriggerState = "default" | "open" | "disabled" | "readonly";

export const triggerVariants = cva(
  "flex items-center min-w-0 rounded-[4px] border border-gray-400 bg-white transition-colors",
  {
    variants: {
      state: {
        default: "text-[#374151] hover:border-gray-500 hover:shadow-sm",
        open: "border-gray-500 ring-1 ring-gray-200 text-[#374151]",
        disabled:
          "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60 pointer-events-none",
        readonly:
          "bg-gray-50 border-gray-300 text-gray-700 cursor-default pointer-events-none",
      },
      size: {
        sm: `${COMPONENT_HEIGHT.sm} ${TEXT_SIZE.sm}`,
        md: `${COMPONENT_HEIGHT.md} ${TEXT_SIZE.md}`,
        lg: `${COMPONENT_HEIGHT.lg} ${TEXT_SIZE.lg}`,
      },
    },
    defaultVariants: { state: "default", size: "md" },
  },
);

// Checkerboard pattern shown behind translucent swatches (data URI keeps this dependency-free).
export const CHECKERBOARD_BG =
  'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center';
