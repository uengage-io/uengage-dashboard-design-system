import * as React from "react";
import { Clock, Search, X } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Input } from "../../ui/input";
import { useFuzzySearch } from "@/utils/useFuzzySearch";
import type { SearchBarProps, SearchBarSize } from "./SearchBar.types";
import { InputLabel } from "@/components/custom/Input/InputLabel";
import {
  SEARCHBAR_COLORS,
  SEARCHBAR_GAP,
  SEARCHBAR_SIZES,
  SEARCHBAR_TRANSITION,
  getSearchBarBoxStyle,
  getSearchBarIconColor,
  getSearchBarMessageColor,
  resolveSearchBarState,
} from "./searchBarVariants";

function filterValue(raw: string, valueType: string): string {
  if (valueType === "number") return raw.replace(/[^0-9]/g, "");
  if (valueType === "alphanumeric") return raw.replace(/[^a-zA-Z0-9]/g, "");
  return raw;
}

/** Label size mapping — the search bar scale is a subset of the Input scale. */
const LABEL_SIZE: Record<SearchBarSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

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
  searching = false,
  resultCount,
  resultNoun = "result",
  noResults = false,
  suggestion,
  message,
  shortcut,
  recents,
  onRemoveRecent,
  onSelectRecent,
  debounce = 0,
  onDebouncedChange,
}: SearchBarProps<T, TItem>) {
  const [internal, setInternal] = React.useState<string>(
    String(controlledValue ?? defaultValue ?? ""),
  );
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const touchedRef = React.useRef(false);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (controlledValue !== undefined) setInternal(String(controlledValue));
  }, [controlledValue]);

  React.useEffect(() => () => clearTimeout(debounceRef.current), []);

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

  // Fuse.js fuzzy search — operates on the resolved list
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

  /** Fires `onDebouncedChange` after `debounce` ms of quiet. */
  const scheduleDebounced = (next: string) => {
    if (!onDebouncedChange) return;
    clearTimeout(debounceRef.current);
    if (!debounce) {
      onDebouncedChange(castValue(next));
      return;
    }
    debounceRef.current = setTimeout(
      () => onDebouncedChange(castValue(next)),
      debounce,
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const filtered = filterValue(e.target.value, valueType);
    setInternal(filtered);
    onChange?.(castValue(filtered));
    scheduleDebounced(filtered);
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
    scheduleDebounced("");
    setDropdownOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
      setDropdownOpen(false);
      setFocused(false);
      if (!touchedRef.current) {
        touchedRef.current = true;
        onTouch?.();
      }
    }
  };

  const handleRecentPick = (entry: string) => {
    setInternal(entry);
    onChange?.(castValue(entry));
    scheduleDebounced(entry);
    if (onSelectRecent) onSelectRecent(entry);
    else onSearch?.(castValue(entry));
  };

  const showClear = clearable && displayValue.length > 0;

  const metrics = SEARCHBAR_SIZES[size];
  const state = resolveSearchBarState({
    disabled,
    readOnly,
    searching,
    noResults,
    hasResults: resultCount != null && resultCount > 0,
    hasQuery,
    focused,
    hovered,
  });
  const box = getSearchBarBoxStyle(state);
  const iconColor = getSearchBarIconColor(state);
  const messageColor = getSearchBarMessageColor(state);

  const isDropdownVisible = hasDropdown && dropdownOpen && hasQuery;
  const isRecentsVisible =
    !isDropdownVisible &&
    focused &&
    !hasQuery &&
    !disabled &&
    !readOnly &&
    (recents?.length ?? 0) > 0;
  // The badge is a hint for an empty field — it goes as soon as there is text.
  const showShortcut = Boolean(shortcut) && !hasQuery && !showClear;

  /** Generated helper text — `message` always wins over it. */
  const resolvedMessage: React.ReactNode = (() => {
    if (message != null) return message;
    if (noResults) {
      if (suggestion) {
        return (
          <>
            No match — did you mean{" "}
            <button
              type="button"
              onClick={suggestion.onApply}
              className="font-semibold underline-offset-2 hover:underline"
              style={{ color: SEARCHBAR_COLORS.borderFocus }}
            >
              {suggestion.label}
            </button>
            ?
          </>
        );
      }
      return "No match for this query.";
    }
    if (resultCount != null) {
      return `${resultCount.toLocaleString("en-IN")} ${
        resultCount === 1 ? resultNoun : `${resultNoun}s`
      }`;
    }
    return null;
  })();

  const panelStyle: React.CSSProperties = {
    border: `1px solid ${SEARCHBAR_COLORS.border}`,
    borderRadius: 11,
    background: SEARCHBAR_COLORS.surface,
    boxShadow: "2px 2px 4px rgba(0,0,0,.12)",
  };

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
          size={LABEL_SIZE[size]}
          required={required}
          tone={state === "disabled" ? SEARCHBAR_COLORS.disabledInk : undefined}
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
          className="flex w-full items-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            height: metrics.height,
            paddingLeft: metrics.padLeft,
            paddingRight: metrics.padRight,
            gap: SEARCHBAR_GAP,
            borderRadius: metrics.radius,
            fontSize: metrics.font,
            transition: SEARCHBAR_TRANSITION,
            background: box.background,
            border: box.border,
            boxShadow: box.boxShadow,
            color: box.color,
            cursor: box.cursor,
            ...(disabled ? { pointerEvents: "none" } : null),
          }}
        >
          {/* Leading affordance — the spinner replaces the glass while a query
              is in flight, and the field stays typeable throughout. */}
          {searching ? (
            <span
              aria-hidden="true"
              className="shrink-0 animate-spin rounded-full"
              style={{
                width: metrics.icon,
                height: metrics.icon,
                border: `2px solid ${SEARCHBAR_COLORS.border}`,
                borderTopColor: SEARCHBAR_COLORS.borderFocus,
              }}
            />
          ) : (
            <button
              type="button"
              onClick={handleSearchClick}
              disabled={disabled}
              className="flex shrink-0 items-center justify-center transition-colors"
              style={{
                color: iconColor,
                cursor: disabled || readOnly ? box.cursor : "pointer",
              }}
              aria-label="Search"
            >
              <Search strokeWidth={2} size={metrics.icon} />
            </button>
          )}

          <Input
            value={displayValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            spellCheck={spellCheck}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
            className={cn(
              "h-full min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none focus-visible:ring-0 disabled:opacity-100",
              // Placeholder greys further out once the control is disabled.
              state === "disabled"
                ? "placeholder:text-[#C6C6C6]"
                : "placeholder:text-[#9C9C9C]",
              inputClassName,
            )}
            style={{
              fontSize: metrics.font,
              color: box.color,
              cursor: box.cursor,
            }}
          />

          {showClear && (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className="flex shrink-0 items-center justify-center rounded-full transition-colors"
              style={{
                width: metrics.clear,
                height: metrics.clear,
                background: SEARCHBAR_COLORS.subtle,
                color: SEARCHBAR_COLORS.value,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = SEARCHBAR_COLORS.accentTint;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = SEARCHBAR_COLORS.subtle;
              }}
              aria-label="Clear search"
            >
              <X strokeWidth={3.2} size={metrics.clear - 10} />
            </button>
          )}

          {showShortcut && (
            <span
              aria-hidden="true"
              className="shrink-0 font-semibold leading-none"
              style={{
                fontSize: 10,
                color: SEARCHBAR_COLORS.muted,
                border: `1px solid ${SEARCHBAR_COLORS.border}`,
                borderRadius: 5,
                padding: "3px 6px",
              }}
            >
              {shortcut}
            </span>
          )}
        </div>

        {isRecentsVisible && (
          <div
            className={cn(
              "absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden",
              dropdownClassName,
            )}
            style={{ ...panelStyle, padding: 5 }}
          >
            <span
              className="block font-semibold uppercase"
              style={{
                fontSize: 9,
                lineHeight: 1.3,
                letterSpacing: ".08em",
                color: SEARCHBAR_COLORS.muted,
                padding: "8px 10px 5px",
              }}
            >
              Recent
            </span>
            {recents!.map((entry) => (
              <div
                key={entry}
                className="flex items-center transition-colors"
                style={{
                  gap: 9,
                  padding: "7px 10px",
                  borderRadius: 6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = SEARCHBAR_COLORS.hoverTint;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <button
                  type="button"
                  onClick={() => handleRecentPick(entry)}
                  className="flex flex-1 items-center text-left"
                  style={{ gap: 9, cursor: "pointer" }}
                >
                  <Clock
                    size={12}
                    strokeWidth={2}
                    className="shrink-0"
                    style={{ color: SEARCHBAR_COLORS.placeholder }}
                  />
                  <span
                    className="flex-1 truncate font-medium"
                    style={{
                      fontSize: 11,
                      lineHeight: 1.3,
                      color: SEARCHBAR_COLORS.value,
                    }}
                  >
                    {entry}
                  </span>
                </button>
                {onRemoveRecent && (
                  <button
                    type="button"
                    onClick={() => onRemoveRecent(entry)}
                    className="flex shrink-0 items-center justify-center"
                    style={{
                      color: SEARCHBAR_COLORS.borderHover,
                      cursor: "pointer",
                    }}
                    aria-label={`Remove ${entry} from recent searches`}
                  >
                    <X size={10} strokeWidth={3} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {isDropdownVisible && (
          <div
            className={cn(
              "absolute left-0 top-full z-50 mt-1.5 max-h-48 w-full overflow-y-auto",
              dropdownClassName,
            )}
            style={{ ...panelStyle, padding: 5 }}
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className="flex w-full items-center text-left font-medium transition-colors"
                  style={{
                    padding: "7px 10px",
                    borderRadius: 6,
                    fontSize: 11,
                    lineHeight: 1.3,
                    color: SEARCHBAR_COLORS.value,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      SEARCHBAR_COLORS.hoverTint;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                  onClick={() => handleSelect(item)}
                >
                  {item.label}
                </button>
              ))
            ) : (
              <div
                style={{
                  padding: "7px 10px",
                  fontSize: 11,
                  lineHeight: 1.3,
                  color: SEARCHBAR_COLORS.placeholder,
                }}
              >
                {fallbackText}
              </div>
            )}
          </div>
        )}
      </div>

      {/* The message row always reserves its line so the field never shifts. */}
      {resolvedMessage != null && (
        <span
          style={{
            minHeight: 16,
            fontSize: metrics.message,
            lineHeight: 1.4,
            color: messageColor,
          }}
        >
          {resolvedMessage}
        </span>
      )}
    </div>
  );
}

SearchBar.displayName = "SearchBar";
export { SearchBar };
