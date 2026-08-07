import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "flex flex-row items-start gap-3 rounded-xl border border-l-4 p-5 text-sm text-[#131313] font-medium leading-snug min-w-0 break-all",
  {
    variants: {
      variant: {
        info:    "bg-blue-100 border-blue-400 [--banner-icon:#2563EB]",
        success: "bg-green-100 border-green-400 [--banner-icon:#16A34A]",
        error:   "bg-red-100 border-red-400 [--banner-icon:#DC2626]",
        warning: "bg-amber-100 border-amber-400 [--banner-icon:#D97706]",
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
    className={cn("mt-0.5 shrink-0 [&_svg]:size-4", className)}
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
  <div ref={ref} className={cn("flex-1 min-w-0 break-normal", className)} {...props} />
));
BannerContent.displayName = "BannerContent";

export { BannerRoot, BannerIcon, BannerContent, bannerVariants };
export type { VariantProps };
