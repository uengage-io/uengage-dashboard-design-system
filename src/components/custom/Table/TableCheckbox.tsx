import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { TABLE_COLORS } from "./tableTokens";

export interface TableCheckboxProps {
  checked: boolean;
  /** Some but not all rows picked — draws a dash instead of a tick. */
  indeterminate?: boolean;
  disabled?: boolean;
  label: string;
  onChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

/**
 * A 17px box rather than the shared Checkbox component: inside a 36px compact
 * row the standard control eats the whole cell.
 */
export function TableCheckbox({
  checked,
  indeterminate = false,
  disabled = false,
  label,
  onChange,
  className,
}: TableCheckboxProps) {
  const on = checked || indeterminate;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      aria-label={label}
      disabled={disabled}
      onClick={(event) => {
        // The row underneath owns click-to-open; picking must not trigger it.
        event.stopPropagation();
        onChange(event);
      }}
      className={cn(
        "flex items-center justify-center transition-colors duration-[120ms]",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      style={{
        width: 17,
        height: 17,
        flex: "none",
        borderRadius: 4,
        padding: 0,
        background: disabled
          ? TABLE_COLORS.subtle
          : on
            ? TABLE_COLORS.brand
            : TABLE_COLORS.surface,
        border: `1.5px solid ${
          disabled
            ? TABLE_COLORS.fgDisabled
            : on
              ? TABLE_COLORS.brand
              : "#C6C6C6"
        }`,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {indeterminate ? (
        <span
          aria-hidden="true"
          style={{ width: 8, height: 2.2, borderRadius: 2, background: "#fff" }}
        />
      ) : checked ? (
        <Check aria-hidden="true" size={10} strokeWidth={3.4} color="#fff" />
      ) : null}
    </button>
  );
}
