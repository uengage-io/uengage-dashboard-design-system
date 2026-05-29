import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "flex items-center gap-[10px] rounded-xl border-[1.5px] px-5 py-3.5 text-sm font-normal leading-snug",
  {
    variants: {
      variant: {
        info:    "bg-[#DBEAFE] border-[#60A5FA] text-[#374151] [--banner-icon:#3B82F6]",
        success: "bg-[#DCFCE7] border-[#4ADE80] text-[#374151] [--banner-icon:#22C55E]",
        error:   "bg-[#FEE2E2] border-[#F87171] text-[#374151] [--banner-icon:#EF4444]",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

export interface BannerRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {}

const BannerRoot = React.forwardRef<HTMLDivElement, BannerRootProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    />
  ),
);
BannerRoot.displayName = "Banner";

const BannerIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, style, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("shrink-0 [&_svg]:size-[18px]", className)}
    style={{ color: "var(--banner-icon)", ...style }}
    aria-hidden="true"
    {...props}
  />
));
BannerIcon.displayName = "BannerIcon";

const BannerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1 leading-snug", className)} {...props} />
));
BannerContent.displayName = "BannerContent";

export { BannerRoot, BannerIcon, BannerContent, bannerVariants };
export type { VariantProps };
