import type { ReactNode } from "react";
import { AlertCircle, ListFilter } from "lucide-react";
import type { TableEmptyConfig, TableErrorConfig } from "@/types/table";
import { TABLE_COLORS } from "./tableTokens";

/* -------------------------------------------------------------------------- */
/*  Shared shell                                                               */
/* -------------------------------------------------------------------------- */

interface PanelProps {
  tone: "brand" | "danger";
  icon: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
}

function StatePanel({ tone, icon, title, description, meta, actions }: PanelProps) {
  const danger = tone === "danger";

  return (
    <div
      className="flex flex-col items-center gap-[11px] text-center"
      style={{
        padding: "46px 20px 54px",
        borderTop: `1px solid ${TABLE_COLORS.rowRule}`,
      }}
    >
      <span
        aria-hidden="true"
        className="flex items-center justify-center"
        style={{
          width: 50,
          height: 50,
          borderRadius: 15,
          background: danger ? TABLE_COLORS.dangerTint : TABLE_COLORS.brandFaint,
          border: `1px solid ${danger ? TABLE_COLORS.dangerRule : TABLE_COLORS.brandRule}`,
          color: danger ? TABLE_COLORS.danger : TABLE_COLORS.brandSoft,
        }}
      >
        {icon}
      </span>
      <h3
        style={{
          margin: 0,
          fontSize: 15,
          fontWeight: 600,
          lineHeight: 1.3,
          color: TABLE_COLORS.fg1,
        }}
      >
        {title}
      </h3>
      {description ? (
        <p
          style={{
            margin: 0,
            maxWidth: "42ch",
            fontSize: 13,
            lineHeight: 1.5,
            color: TABLE_COLORS.fg2,
          }}
        >
          {description}
        </p>
      ) : null}
      {meta}
      {actions ? (
        <div className="flex flex-wrap justify-center gap-2" style={{ marginTop: 4 }}>
          {actions}
        </div>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Empty                                                                      */
/* -------------------------------------------------------------------------- */

export interface TableEmptyStateProps extends TableEmptyConfig {
  /** Fallback copy when no `title` is supplied. */
  message?: string;
}

export function TableEmptyState({
  icon,
  title,
  description,
  actions,
  message = "No results",
}: TableEmptyStateProps) {
  return (
    <StatePanel
      tone="brand"
      icon={icon ?? <ListFilter size={22} strokeWidth={1.8} />}
      title={title ?? message}
      description={description}
      actions={actions}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Error                                                                      */
/* -------------------------------------------------------------------------- */

export type TableErrorStateProps = TableErrorConfig;

/**
 * An error keeps the filters and says so — the operator should never wonder
 * whether retrying will lose their query.
 */
export function TableErrorState({
  title = "Something went wrong",
  description,
  requestId,
  onRetry,
  retryLabel = "Retry",
}: TableErrorStateProps) {
  return (
    <StatePanel
      tone="danger"
      icon={<AlertCircle size={22} strokeWidth={1.9} />}
      title={title}
      description={description}
      meta={
        requestId ? (
          <span
            className="ue-tabular"
            style={{
              fontSize: 11,
              fontWeight: 500,
              lineHeight: 1.4,
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              color: TABLE_COLORS.fg3,
            }}
          >
            {requestId}
          </span>
        ) : null
      }
      actions={
        onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            style={{
              height: 34,
              padding: "0 15px",
              border: 0,
              borderRadius: 8,
              backgroundColor: TABLE_COLORS.brand,
              backgroundImage: TABLE_COLORS.brandGradient,
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            {retryLabel}
          </button>
        ) : null
      }
    />
  );
}
