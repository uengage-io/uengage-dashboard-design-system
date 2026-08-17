import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { TableSize, TableStatusTone } from "@/types/table";
import {
  TABLE_COLORS,
  TABLE_EMPTY_CELL,
  TABLE_SIZES,
  TABLE_STATUS_TONES,
} from "./tableTokens";

/* -------------------------------------------------------------------------- */
/*  Status                                                                     */
/* -------------------------------------------------------------------------- */

export interface TableStatusCellProps {
  children: ReactNode;
  tone?: TableStatusTone;
  /** Drop the leading dot when the label already carries the meaning. */
  showDot?: boolean;
  className?: string;
}

/** A chip with a dot — never bare coloured text. */
export function TableStatusCell({
  children,
  tone = "neutral",
  showDot = true,
  className,
}: TableStatusCellProps) {
  const spec = TABLE_STATUS_TONES[tone];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 whitespace-nowrap", className)}
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 600,
        lineHeight: 1.3,
        background: spec.bg,
        color: spec.fg,
      }}
    >
      {showDot ? (
        <span
          aria-hidden="true"
          style={{ width: 5, height: 5, borderRadius: "50%", background: spec.dot }}
        />
      ) : null}
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Identity                                                                   */
/* -------------------------------------------------------------------------- */

export interface TableIdentityCellProps {
  name: ReactNode;
  /** Secondary line — a phone number, an email. Hidden at size "sm". */
  meta?: ReactNode;
  /** Initials shown in the avatar. Derived from `name` when it is a string. */
  initials?: string;
  /** Replaces the initials avatar entirely — a thumbnail, a channel logo. */
  avatar?: ReactNode;
  size?: TableSize;
  className?: string;
}

function deriveInitials(name: ReactNode): string {
  if (typeof name !== "string") return "";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}

/** Avatar plus a name, and at md/lg a muted second line under it. */
export function TableIdentityCell({
  name,
  meta,
  initials,
  avatar,
  size = "md",
  className,
}: TableIdentityCellProps) {
  const spec = TABLE_SIZES[size];
  const text = initials ?? deriveInitials(name);

  return (
    <span className={cn("flex items-center gap-[9px] min-w-0", className)}>
      {avatar ?? (
        <span
          aria-hidden="true"
          className="flex items-center justify-center"
          style={{
            flex: "none",
            width: spec.avatar,
            height: spec.avatar,
            borderRadius: 8,
            background: TABLE_COLORS.brandTint,
            color: TABLE_COLORS.brand,
            fontWeight: 700,
            fontSize: spec.avatarFontSize,
          }}
        >
          {text}
        </span>
      )}
      <span className="flex min-w-0 flex-col">
        <span
          className="truncate"
          style={{ fontWeight: 600, color: TABLE_COLORS.fg1, fontSize: spec.fontSize }}
        >
          {name}
        </span>
        {spec.showMeta && meta ? (
          <span
            className="ue-tabular truncate"
            style={{ fontSize: 11, fontWeight: 500, lineHeight: 1.3, color: TABLE_COLORS.fg3 }}
          >
            {meta}
          </span>
        ) : null}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Actions                                                                    */
/* -------------------------------------------------------------------------- */

export interface TableActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

/** A 26px icon button for the actions column. */
export function TableActionButton({
  label,
  children,
  className,
  onClick,
  style,
  ...props
}: TableActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "flex items-center justify-center transition-colors duration-[120ms]",
        className,
      )}
      onClick={(event) => {
        // Actions sit inside a clickable row — opening the row is not the intent.
        event.stopPropagation();
        onClick?.(event);
      }}
      style={{
        width: 26,
        height: 26,
        flex: "none",
        borderRadius: 6,
        border: `1px solid ${TABLE_COLORS.border}`,
        background: TABLE_COLORS.surface,
        color: TABLE_COLORS.fg2,
        cursor: "pointer",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty value                                                                */
/* -------------------------------------------------------------------------- */

/** An em-dash, muted — never a blank cell or "N/A". */
export function TableEmptyValue() {
  return (
    <span aria-label="No value" style={{ color: TABLE_COLORS.fgDisabled }}>
      {TABLE_EMPTY_CELL}
    </span>
  );
}
