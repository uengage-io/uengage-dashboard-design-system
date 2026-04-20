import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Input } from "../../ui/input";
import type { SearchBarProps, SearchBarSize } from "./SearchBar.types";

const SIZE_HEIGHT_CLASSES: Record<SearchBarSize, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

const SIZE_TEXT_CLASSES: Record<SearchBarSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const ICON_SIZES: Record<SearchBarSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

const DIVIDER_CLASSES: Record<SearchBarSize, string> = {
  sm: "h-4",
  md: "h-5",
  lg: "h-6",
};

function filterValue(raw: string, valueType: string): string {
  if (valueType === "number") return raw.replace(/[^0-9]/g, "");
  if (valueType === "alphanumeric") return raw.replace(/[^a-zA-Z0-9]/g, "");
  return raw;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
  );
  for (let i = 0; i <= m; i++) dp[i]![0] = i;
  for (let j = 0; j <= n; j++) dp[0]![j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i]![j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1]![j - 1]!
          : 1 + Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!, dp[i - 1]![j - 1]!);
  return dp[m]![n]!;
}

function fuzzyMatch(query: string, item: string): boolean {
  const q = query.toLowerCase();
  const lower = item.toLowerCase();
  if (lower.includes(q)) return true;
  const queryWords = q.split(/\s+/).filter(Boolean);
  const itemWords = lower.split(/\s+/);
  return queryWords.some((qw) =>
    itemWords.some((iw) => levenshtein(qw, iw.slice(0, qw.length)) <= 2),
  );
}

function SearchBar<T extends string | number = string, TItem = unknown>({
  value: controlledValue,
  defaultValue,
  valueType = "string",
  size = "md",
  placeholder,
  width,
  height,
  className,
  inputClassName,
  disabled = false,
  onChange,
  onSearch,
  onClear,
  dropdownClassName,
  dropdownItems,
  getLabel,
  getValue,
  onSelect,
  fallbackText = "No results found",
}: SearchBarProps<T, TItem>) {
  const [internal, setInternal] = React.useState<string>(
    String(controlledValue ?? defaultValue ?? ""),
  );
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Sync external `value` changes (e.g. from onSelect/onClear handlers) into
  // internal state, so each callback stays independent of onChange.
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setInternal(String(controlledValue));
    }
  }, [controlledValue]);

  const displayValue = internal;

  // Normalize both data sources into a single shape so the rest of the
  // component doesn't care whether strings or objects were passed in.
  type ResolvedItem = {
    label: string;
    value: string;
    raw: TItem | null | undefined;
  };

  const resolvedItems = React.useMemo<ResolvedItem[]>(() => {
    if (dropdownItems && getLabel) {
      return dropdownItems.map((item) => ({
        label: getLabel(item),
        value: getValue ? getValue(item) : getLabel(item),
        raw: item,
      }));
    }
    return [];
    // return (dropdownContent ?? []).map((s) => ({
    //   label: s,
    //   value: s,
    //   raw: null,
    // }));
  }, [dropdownItems, getLabel, getValue]);

  const filteredItems = React.useMemo<ResolvedItem[]>(() => {
    if (!displayValue.trim() || resolvedItems.length === 0) return [];
    return resolvedItems.filter((item) => fuzzyMatch(displayValue, item.label));
  }, [resolvedItems, displayValue]);

  const hasDropdown =  dropdownItems != null;

  const castValue = (v: string) =>
    (valueType === "number" ? Number(v) : v) as T;

  const handleSelect = (item: ResolvedItem) => {
    setInternal(item.label);
    onSelect?.(item.value, item.raw ?? undefined);
    setDropdownOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = filterValue(e.target.value, valueType);
    setInternal(filtered);
    onChange?.(castValue(filtered));
    if (hasDropdown) setDropdownOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!hasQuery) return;
      if (filteredItems.length > 0) {
        handleSelect(filteredItems[0]!);
      } else {
        const v = castValue(displayValue);
        onSearch?.(v);
        setDropdownOpen(false);
      }
    }
  };

  const handleSearchClick = () => {
    if (disabled) return;
    if (!hasQuery) return;
    if (filteredItems.length > 0) {
      handleSelect(filteredItems[0]!);
      return;
    }
    const v = castValue(displayValue);
    onSearch?.(v);
    setDropdownOpen(false);
  };

  const handleClear = () => {
    if (disabled) return;
    setInternal("");
    onClear?.();
    setDropdownOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setDropdownOpen(false);
    }
  };

  const showClear = displayValue.length > 0;
  const iconSize = ICON_SIZES[size];

  const hasQuery = displayValue.trim().length > 0;
  const isDropdownVisible = hasDropdown && dropdownOpen && hasQuery;

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      style={width != null ? { width } : undefined}
      onBlur={handleBlur}
    >
      <div
        className={cn(
          "inline-flex w-full items-center rounded-lg border border-gray-400 bg-white",
          SIZE_TEXT_CLASSES[size],
          height == null && SIZE_HEIGHT_CLASSES[size],
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        style={height != null ? { height } : undefined}
      >
        <Input
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          spellCheck
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "border-0 bg-transparent shadow-none outline-none focus-visible:ring-0 h-full flex-1 min-w-0 rounded-[4px] placeholder:text-[12px] placeholder:text-[#C4C9D2]",
            inputClassName,
          )}
        />

        <div className="flex shrink-0 items-center gap-1.5 pr-2.5">
          {showClear && (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className="flex items-center justify-center text-[#6B7280] hover:text-[#4B5563] transition-colors"
              aria-label="Clear search"
            >
              <X
                className="hover:text-red-500"
                strokeWidth={2}
                size={iconSize}
              />
            </button>
          )}

          <div className={cn("w-px bg-gray-300", DIVIDER_CLASSES[size])} />

          <button
            type="button"
            onClick={handleSearchClick}
            disabled={disabled}
            className="flex items-center justify-center text-[#6B7280] hover:text-[#4B5563] transition-colors"
            aria-label="Search"
          >
            <Search
              className="text-gray-500 w-5"
              strokeWidth={3}
              size={iconSize}
            />
          </button>
        </div>
      </div>

      {isDropdownVisible && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-1 w-full overflow-y-auto rounded-md border border-[#E5E7EB] bg-white shadow-lg max-h-48",
            dropdownClassName,
          )}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.value}
                type="button"
                className="w-full text-left px-3 py-2 text-sm text-[#374151] hover:bg-[#F3F4F6] transition-colors"
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-[#9CA3AF]">
              {fallbackText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

SearchBar.displayName = "SearchBar";

export { SearchBar };
