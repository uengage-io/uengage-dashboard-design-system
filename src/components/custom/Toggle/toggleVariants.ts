import { cva, type VariantProps } from "class-variance-authority";

export type ToggleVariantSize = "sm" | "md" | "lg";

export const trackVariants = cva(
  [
    "group/uengage-toggle relative inline-flex items-center rounded-full border-2",
    "transition-all duration-200 cursor-pointer select-none shadow-[0_2px_6px_rgba(15,23,42,0.12)]",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006F42]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-[#F7FAF7] data-[state=unchecked]:border-[#9FB49F]",
    "data-[state=checked]:bg-[#C8D8B6] data-[state=checked]:border-[#1F6B32]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-7",
        md: "h-8",
        lg: "h-9",
      },
      hasInsideLabel: {
        true: "justify-end font-medium text-[#1F6B32]",
        false: "",
      },
    },
    compoundVariants: [
      { size: "sm", hasInsideLabel: false, className: "w-12" },
      { size: "md", hasInsideLabel: false, className: "w-[4.2rem]" },
      { size: "lg", hasInsideLabel: false, className: "w-[4.75rem]" },
      {
        size: "sm",
        hasInsideLabel: true,
        className: "w-16 pr-2.5 text-[10px]",
      },
      {
        size: "md",
        hasInsideLabel: true,
        className: "w-[4.8rem] pr-3 text-[11px]",
      },
      {
        size: "lg",
        hasInsideLabel: true,
        className: "w-[5.25rem] pr-3.5 text-[12px]",
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
    "pointer-events-none absolute left-0.5 top-1/2 block rounded-full border border-transparent bg-[#A8B8A2]",
    "-translate-y-1/2 transition-transform duration-200",
    "data-[state=unchecked]:translate-x-0",
    "data-[state=checked]:bg-[#1F6B32] data-[state=checked]:border-[#165126]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-5 w-5 shadow-[0_1px_2px_rgba(15,23,42,0.18)]",
        md: "h-6 w-6 shadow-[0_2px_3px_rgba(15,23,42,0.18)]",
        lg: "h-7 w-7 shadow-[0_2px_4px_rgba(15,23,42,0.18)]",
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
        className: "data-[state=checked]:translate-x-5",
      },
      {
        size: "md",
        hasInsideLabel: false,
        className: "data-[state=checked]:translate-x-8",
      },
      {
        size: "lg",
        hasInsideLabel: false,
        className: "data-[state=checked]:translate-x-9",
      },
      {
        size: "sm",
        hasInsideLabel: true,
        className: "data-[state=checked]:translate-x-7",
      },
      {
        size: "md",
        hasInsideLabel: true,
        className: "data-[state=checked]:translate-x-8",
      },
      {
        size: "lg",
        hasInsideLabel: true,
        className: "data-[state=checked]:translate-x-9",
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
