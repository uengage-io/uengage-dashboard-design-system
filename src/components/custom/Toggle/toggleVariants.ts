import { cva, type VariantProps } from "class-variance-authority";

export type ToggleVariantSize = "sm" | "md" | "lg";

export const trackVariants = cva(
  [
    "group/uengage-toggle relative inline-flex items-center rounded-full border-2",
    "transition-all duration-200 cursor-pointer select-none",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006F42]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-gray-200 data-[state=unchecked]:border-gray-300",
    "data-[state=checked]:bg-[#006F42] data-[state=checked]:border-[#006F42]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5",
        md: "h-6",
        lg: "h-7",
      },
      hasInsideLabel: {
        true: "justify-end font-medium text-white",
        false: "",
      },
    },
    compoundVariants: [
      { size: "sm", hasInsideLabel: false, className: "w-9" },
      { size: "md", hasInsideLabel: false, className: "w-11" },
      { size: "lg", hasInsideLabel: false, className: "w-[3.25rem]" },
      {
        size: "sm",
        hasInsideLabel: true,
        className: "w-14 pr-2 text-[10px]",
      },
      {
        size: "md",
        hasInsideLabel: true,
        className: "w-16 pr-2.5 text-[11px]",
      },
      {
        size: "lg",
        hasInsideLabel: true,
        className: "w-[4.5rem] pr-3 text-[12px]",
      },
    ],
    defaultVariants: {
      size: "md",
      hasInsideLabel: false,
    },
  },
);

export const thumbVariants = cva(
  [
    "pointer-events-none absolute left-0.5 top-1/2 block rounded-full bg-white shadow-sm",
    "-translate-y-1/2 transition-transform duration-200",
    "data-[state=unchecked]:translate-x-0",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
      hasInsideLabel: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        hasInsideLabel: false,
        className: "data-[state=checked]:translate-x-4",
      },
      {
        size: "md",
        hasInsideLabel: false,
        className: "data-[state=checked]:translate-x-5",
      },
      {
        size: "lg",
        hasInsideLabel: false,
        className: "data-[state=checked]:translate-x-6",
      },
      {
        size: "sm",
        hasInsideLabel: true,
        className: "data-[state=checked]:translate-x-9",
      },
      {
        size: "md",
        hasInsideLabel: true,
        className: "data-[state=checked]:translate-x-10",
      },
      {
        size: "lg",
        hasInsideLabel: true,
        className: "data-[state=checked]:translate-x-11",
      },
    ],
    defaultVariants: {
      size: "md",
      hasInsideLabel: false,
    },
  },
);

export type TrackVariants = VariantProps<typeof trackVariants>;
export type ThumbVariants = VariantProps<typeof thumbVariants>
