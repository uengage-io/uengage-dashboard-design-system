import { cva, type VariantProps } from "class-variance-authority";

export const sidebarContentVariants = cva(
  "fixed z-50 bg-background border shadow-lg outline-none will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
  {
    variants: {
      side: {
        left: "inset-y-0 left-0 border-r -translate-x-full data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full",
        right:
          "inset-y-0 right-0 border-l translate-x-full data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full",
        top: "inset-x-0 top-0 border-b -translate-y-full data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-full",
        bottom:
          "inset-x-0 bottom-0 border-t translate-y-full data-[state=open]:translate-y-0 data-[state=closed]:translate-y-full",
        "right-bottom":
          "bottom-0 right-0 rounded-tl-xl border-t border-l sidebar-rb translate-y-full data-[state=open]:translate-y-0 data-[state=closed]:translate-y-full",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
        full: "h-screen w-screen max-h-screen max-w-screen rounded-none",
      },
    },
    compoundVariants: [
      { side: "left", size: "sm", className: "w-64 max-w-[85vw]" },
      { side: "left", size: "md", className: "w-80 max-w-[90vw]" },
      { side: "left", size: "lg", className: "w-96 max-w-[95vw]" },
      { side: "right", size: "sm", className: "w-64 max-w-[85vw]" },
      { side: "right", size: "md", className: "w-80 max-w-[90vw]" },
      { side: "right", size: "lg", className: "w-96 max-w-[95vw]" },
      { side: "top", size: "sm", className: "h-48 max-h-[80vh]" },
      { side: "top", size: "md", className: "h-64 max-h-[85vh]" },
      { side: "top", size: "lg", className: "h-80 max-h-[90vh]" },
      { side: "bottom", size: "sm", className: "h-48 max-h-[80vh]" },
      { side: "bottom", size: "md", className: "h-64 max-h-[85vh]" },
      { side: "bottom", size: "lg", className: "h-80 max-h-[90vh]" },
      { side: "right-bottom", size: "sm", className: "w-64 max-w-[85vw] h-screen" },
      { side: "right-bottom", size: "md", className: "w-80 max-w-[90vw] h-screen" },
      { side: "right-bottom", size: "lg", className: "w-96 max-w-[95vw] h-screen" },
    ],
    defaultVariants: {
      side: "left",
      size: "md",
    },
  },
);

export const sidebarPersistentVariants = cva("bg-background border", {
  variants: {
    side: {
      left: "h-full border-r",
      right: "h-full border-l",
      top: "w-full border-b",
      bottom: "w-full border-t",
      "right-bottom": "border-t border-l rounded-tl-xl",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      full: "h-full w-full",
    },
  },
  compoundVariants: [
    { side: "left", size: "sm", className: "w-64" },
    { side: "left", size: "md", className: "w-80" },
    { side: "left", size: "lg", className: "w-96" },
    { side: "right", size: "sm", className: "w-64" },
    { side: "right", size: "md", className: "w-80" },
    { side: "right", size: "lg", className: "w-96" },
    { side: "top", size: "sm", className: "h-48" },
    { side: "top", size: "md", className: "h-64" },
    { side: "top", size: "lg", className: "h-80" },
    { side: "bottom", size: "sm", className: "h-48" },
    { side: "bottom", size: "md", className: "h-64" },
    { side: "bottom", size: "lg", className: "h-80" },
    { side: "right-bottom", size: "sm", className: "w-64 h-screen" },
    { side: "right-bottom", size: "md", className: "w-80 h-screen" },
    { side: "right-bottom", size: "lg", className: "w-96 h-screen" },
  ],
  defaultVariants: {
    side: "left",
    size: "md",
  },
});

export type SidebarContentVariants = VariantProps<
  typeof sidebarContentVariants
>;
