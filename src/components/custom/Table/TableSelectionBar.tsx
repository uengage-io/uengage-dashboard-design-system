import type { TableBulkAction } from "@/types/table";
import { TABLE_COLORS } from "./tableTokens";

export interface TableSelectionBarProps<T> {
  count: number;
  rows: T[];
  keys: string[];
  actions?: TableBulkAction<T>[];
  onClear: () => void;
  /** Noun used in "3 orders selected". Defaults to "row" / "rows". */
  itemLabel?: string;
  padX: number;
}

/**
 * Slides in above the header the moment a row is picked, and takes the bulk
 * actions with it — the actions never live in a menu the operator has to hunt for.
 */
export function TableSelectionBar<T>({
  count,
  rows,
  keys,
  actions,
  onClear,
  itemLabel = "row",
  padX,
}: TableSelectionBarProps<T>) {
  if (count === 0) return null;

  return (
    <div
      className="flex flex-wrap items-center gap-3"
      style={{
        padding: `10px ${padX}px`,
        background: TABLE_COLORS.brandTint,
        borderTop: `1px solid ${TABLE_COLORS.selectedRule}`,
        borderBottom: `1px solid ${TABLE_COLORS.selectedRule}`,
        animation: "ue-table-pop 140ms ease-out",
      }}
      role="status"
      aria-live="polite"
    >
      <span
        style={{
          font: "600 12px/1.3 inherit",
          fontWeight: 600,
          fontSize: 12,
          lineHeight: 1.3,
          color: TABLE_COLORS.brand,
        }}
      >
        {count} {count === 1 ? itemLabel : `${itemLabel}s`} selected
      </span>

      {actions && actions.length > 0 ? (
        <span
          aria-hidden="true"
          style={{ width: 1, height: 16, background: "#BFD6C6" }}
        />
      ) : null}

      {actions?.map((action, index) => (
        <button
          key={index}
          type="button"
          disabled={action.disabled}
          onClick={() => action.onClick(rows, keys)}
          className="rounded-md transition-colors duration-[120ms] disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            border: 0,
            background: "transparent",
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1.3,
            padding: "4px 6px",
            cursor: action.disabled ? "not-allowed" : "pointer",
            color:
              action.tone === "danger"
                ? TABLE_COLORS.danger
                : TABLE_COLORS.brandSoft,
          }}
          onMouseEnter={(e) => {
            if (action.disabled) return;
            e.currentTarget.style.background =
              action.tone === "danger"
                ? TABLE_COLORS.dangerTint
                : "rgba(0,60,27,.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          {action.label}
        </button>
      ))}

      <button
        type="button"
        onClick={onClear}
        style={{
          marginLeft: "auto",
          border: 0,
          background: "transparent",
          fontSize: 12,
          fontWeight: 600,
          lineHeight: 1.3,
          color: TABLE_COLORS.fg3,
          cursor: "pointer",
          padding: "4px 6px",
        }}
      >
        Clear
      </button>
    </div>
  );
}
