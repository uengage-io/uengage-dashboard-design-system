import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { statusBadgeVariants, type StatusBadgeVariants } from "@/utils/table";

export interface StatusBadgeProps extends Omit<
  StatusBadgeVariants,
  "variant" | "size"
> {
  /**
   * The variant/status type of the badge
   * @default "success"
   */
  variant?:
    | "success"
    | "warning"
    | "error"
    // | "allocated"
    // | "redeemed"
    // | "pending"
    // | "failed"
    ;
  /**
   * The size of the badge
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg";
  /** The label/text content of the badge */
  label: string;
  /** Optional icon to display before the label */
  icon?: ReactNode;
  /** Controls whether the icon is rendered to the left or right of the label */
  iconPosition?: "left" | "right";
  /** Additional CSS classes to customize the badge (overrides variant colors) */
  className?: string;
  /** Tailwind width classes to make the badge responsive (e.g., "w-full", "w-1/2") */
  width?: string;
}

export function StatusBadge({
  variant = "success",
  size = "md",
  label,
  icon,
  iconPosition = "left",
  className,
  // width,
}: StatusBadgeProps) {
  const iconNode = icon ? (
    <span
      className="inline-flex items-center flex-shrink-0"
      aria-hidden="true"
    >
      {icon}
    </span>
  ) : null;

  return (
    <span
      className={cn(
        statusBadgeVariants({ variant, size }),
        // width && `${width}`,
        "justify-center",
        className,
      )}
    >
      {iconPosition === "left" ? iconNode : null}
      <span className="truncate">{label}</span>
      {iconPosition === "right" ? iconNode : null}
    </span>
  );
}
