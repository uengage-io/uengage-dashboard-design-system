import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Input } from "../../ui/input";
import { useFuzzySearch } from "@/utils/useFuzzySearch";
import type { SearchBarProps, SearchBarSize } from "./SearchBar.types";
import { InputLabel } from "@/components/custom/Input/InputLabel";

const SIZE_HEIGHT_CLASSES: Record<SearchBarSize, string> = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

const SIZE_TEXT_CLASSES: Record<SearchBarSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const SIZE_PLACEHOLDER_CLASSES: Record<SearchBarSize, string> = {
  sm: "placeholder:text-[11px]",
  md: "placeholder:text-[12px]",
  lg: "placeholder:text-[14px]",
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

function SearchBar<T extends string | number = string, TItem = unknown>({
  value: controlledValue,
  defaultValue,
  valueType = "string",
  size = "md",
  label,
  required,
  placeholder,
  width,
  className,
  inputClassName,
  disabled = false,
  readOnly = false,
  spellCheck = true,
  onChange,
  onSearch,
  onClear,
  onTouch,
  clearable = false,
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
  const touchedRef = React.useRef(false);

  React.useEffect(() => {
    if (controlledValue !== undefined) setInternal(String(controlledValue));
  }, [controlledValue]);

  const displayValue = internal;

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
  }, [dropdownItems, getLabel, getValue]);

  // Fuse.js fuzzy search — replaces the hand-rolled levenshtein filter
  const fuseResults = useFuzzySearch(resolvedItems, displayValue);
  // Only surface results when the user has actually typed something
  const filteredItems = displayValue.trim() ? fuseResults : [];

  const hasDropdown = dropdownItems != null;
  const castValue = (v: string) =>
    (valueType === "number" ? Number(v) : v) as T;

  const handleSelect = (item: ResolvedItem) => {
    setInternal(item.label);
    onSelect?.(item.value, item.raw ?? undefined);
    setDropdownOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const filtered = filterValue(e.target.value, valueType);
    setInternal(filtered);
    onChange?.(castValue(filtered));
    if (hasDropdown) setDropdownOpen(true);
  };

  const hasQuery = displayValue.trim().length > 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!hasQuery) {
        onClear?.();
        return;
      }
      if (filteredItems.length > 0) {
        handleSelect(filteredItems[0]!);
      } else {
        onSearch?.(castValue(displayValue));
        setDropdownOpen(false);
      }
    }
    if (e.key === "Escape") setDropdownOpen(false);
  };

  const handleSearchClick = () => {
    if (disabled || readOnly) return;
    if (!hasQuery) {
      onClear?.();
      return;
    }
    if (filteredItems.length > 0) {
      handleSelect(filteredItems[0]!);
      return;
    }
    onSearch?.(castValue(displayValue));
    setDropdownOpen(false);
  };

  const handleClear = () => {
    if (disabled || readOnly) return;
    setInternal("");
    onClear?.();
    setDropdownOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setDropdownOpen(false);
      if (!touchedRef.current) {
        touchedRef.current = true;
        onTouch?.();
      }
    }
  };

  const showClear = clearable && displayValue.length > 0;
  const iconSize = ICON_SIZES[size];
  const isDropdownVisible = hasDropdown && dropdownOpen && hasQuery;

  return (
    <div
      className={cn(
        "uengage-ui flex flex-col gap-1.5 min-w-0",
        width,
        className,
      )}
    >
      {label && (
        <InputLabel
          size={size === "lg" ? "lg" : size === "sm" ? "sm" : "md"}
          required={required}
        >
          {label}
        </InputLabel>
      )}
      <div
        ref={wrapperRef}
        className="relative block min-w-0"
        onBlur={handleBlur}
      >
        <div
          className={cn(
            "flex w-full items-center rounded-[4px] border border-gray-400 bg-white transition-colors",
            !disabled && !readOnly && "hover:border-gray-500 hover:shadow-sm",
            SIZE_TEXT_CLASSES[size],
            SIZE_HEIGHT_CLASSES[size],
            disabled && "pointer-events-none opacity-50",
            readOnly &&
              "bg-gray-50 border-gray-300 text-gray-700 cursor-default",
          )}
        >
          <Input
            value={displayValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            spellCheck={spellCheck}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={cn(
              "border-0 bg-transparent shadow-none outline-none focus-visible:ring-0 h-full flex-1 min-w-0 rounded-[4px] placeholder:text-[#C4C9D2]",
              SIZE_PLACEHOLDER_CLASSES[size],
              inputClassName,
            )}
          />

          <div className="flex shrink-0 items-center gap-1.5 pr-2.5">
            {showClear && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                className="flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X
                  className="hover:text-red-500"
                  strokeWidth={2}
                  size={iconSize}
                />
              </button>
            )}
            <div className={cn("w-px bg-gray-400", DIVIDER_CLASSES[size])} />
            <button
              type="button"
              onClick={handleSearchClick}
              disabled={disabled}
              className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search strokeWidth={2} size={iconSize} />
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
    </div>
  );
}

SearchBar.displayName = "SearchBar";
export { SearchBar };
