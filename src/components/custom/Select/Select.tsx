import * as React from "react";
import { ArrowDownAZ, ArrowUpAZ, ChevronDown, Check, X } from "lucide-react";
import { useFuzzySearch } from "@/utils/useFuzzySearch";
import { cn } from "@/lib/utils";
import { FilterGroupMobileContext } from "@/lib/filterGroupContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputLabel } from "@/components/custom/Input/InputLabel";
import { InputHelper } from "@/components/custom/Input/InputHelper";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { triggerVariants } from "@/components/custom/Select/selectVariants";
import type {
  SelectOption,
  SelectProps,
} from "@/components/custom/Select/Select.types";

const SELECT_ALL = "__select_all__";

function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex shrink-0 h-[14px] w-[14px] items-center justify-center rounded-[3px] border",
        checked ? "border-[#006F42] bg-[#006F42]" : "border-[#D1D5DB] bg-white",
      )}
    >
      {checked && <Check size={9} strokeWidth={3.5} className="text-white" />}
    </span>
  );
}

function Select<TItem = unknown>({
  options,
  items,
  getLabel,
  getValue,
  getDisabled,
  value: controlledValue,
  defaultValue,
  mode = "single",
  size = "md",
  placeholder = "Select...",
  disabled = false,
  width,
  className,
  onChange,
  onTouch,
  spellCheck = true,
  clearable = false,
  label,
  required,
  helperText,
  error,
  readOnly = false,
  sorting = false,
  indexing = false,
  search: searchEnabled = true,
}: SelectProps<TItem>) {
  const isMobileDrawer = React.useContext(FilterGroupMobileContext);
  const touchedRef = React.useRef(false);
  const interactedRef = React.useRef(false);
  const resolvedOptions = React.useMemo<SelectOption[]>(() => {
    if (items && getLabel && getValue) {
      return items.map((item) => ({
        label: getLabel(item),
        value: getValue(item),
        disabled: getDisabled ? getDisabled(item) : false,
      }));
    }
    return options ?? [];
  }, [items, getLabel, getValue, getDisabled, options]);

  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [sortOrder]);

  const sortedOptions = React.useMemo<SelectOption[]>(() => {
    if (!sorting) return resolvedOptions;
    return [...resolvedOptions].sort((a, b) =>
      sortOrder === "asc"
        ? a.label.localeCompare(b.label)
        : b.label.localeCompare(a.label),
    );
  }, [resolvedOptions, sorting, sortOrder]);

  const fuseFilteredOptions = useFuzzySearch(sortedOptions, searchQuery);

  const visibleOptions = React.useMemo<SelectOption[]>(() => {
    if (!searchEnabled) return sortedOptions;
    const q = searchQuery.trim();
    if (indexing && /^\d+$/.test(q)) {
      const n = parseInt(q, 10);
      const pos = n - 1;
      const opt = sortedOptions[pos];
      return opt ? [opt] : [];
    }
    return fuseFilteredOptions;
  }, [searchEnabled, searchQuery, indexing, sorting, sortOrder, sortedOptions, fuseFilteredOptions]);
  const [selected, setSelected] = React.useState<string | string[]>(
    controlledValue ?? defaultValue ?? (mode === "multi" ? [] : ""),
  );

  React.useEffect(() => {
    if (controlledValue !== undefined) setSelected(controlledValue);
  }, [controlledValue]);

  const selectedArr: string[] =
    mode === "multi" ? (Array.isArray(selected) ? selected : []) : [];

  // ── Pin selected options to the top (multi mode) ──────────────────────
  // Snapshot of the selection taken when the dropdown opens. Those options are
  // listed first so they can be unselected without scrolling the whole list.
  // Frozen for the open session so toggling doesn't make items jump around.
  const [pinnedValues, setPinnedValues] = React.useState<Set<string>>(
    () => new Set(),
  );

  React.useLayoutEffect(() => {
    if (open && mode === "multi") setPinnedValues(new Set(selectedArr));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode]);

  const pinningActive =
    mode === "multi" && pinnedValues.size > 0 && !searchQuery.trim();

  const orderedOptions = React.useMemo<SelectOption[]>(() => {
    if (!pinningActive) return visibleOptions;
    const pinned = visibleOptions.filter((o) => pinnedValues.has(o.value));
    const rest = visibleOptions.filter((o) => !pinnedValues.has(o.value));
    return [...pinned, ...rest];
  }, [pinningActive, visibleOptions, pinnedValues]);

  const pinnedCount = pinningActive
    ? orderedOptions.filter((o) => pinnedValues.has(o.value)).length
    : 0;

  const enabledOptions = sortedOptions.filter((o) => !o.disabled);
  const allSelected =
    enabledOptions.length > 0 &&
    enabledOptions.every((o) => selectedArr.includes(o.value));

  const isSelected = (val: string) =>
    mode === "single" ? selected === val : selectedArr.includes(val);

  const commit = (next: string | string[]) => {
    // In uncontrolled mode update internal state immediately.
    // In controlled mode the parent owns the value — don't touch internal state
    // so the display stays at the last confirmed value until the parent updates the prop.
    if (controlledValue === undefined) setSelected(next);
    onChange?.(next);
  };

  const handleSelect = (val: string) => {
    if (val === SELECT_ALL) {
      commit(allSelected ? [] : enabledOptions.map((o) => o.value));
      return;
    }
    if (mode === "single") {
      commit(val);
      setOpen(false);
    } else {
      const next = selectedArr.includes(val)
        ? selectedArr.filter((v) => v !== val)
        : [...selectedArr, val];
      commit(next);
    }
  };

  const removePill = (val: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    commit(selectedArr.filter((v) => v !== val));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    commit(mode === "multi" ? [] : "");
  };

  // ── Dynamic pill overflow ──────────────────────────────────────────────
  // Two-pass approach so the +N badge is always visible:
  //   Pass 1 (null)  – all pills render with no badge; layout effect measures them.
  //   Pass 2 (number) – only the fitting pills + badge render; no ghost pills taking space.
  // A ResizeObserver re-runs pass 1 whenever the container width changes, so a
  // measurement taken before layout settled (0px wide, inside a dialog, etc.)
  // doesn't leave the trigger stuck showing a single pill.
  const pillsContainerRef = React.useRef<HTMLDivElement>(null);
  const badgeMeasureRef = React.useRef<HTMLSpanElement>(null);
  const measuredWidthRef = React.useRef(-1);
  const [visibleCount, setVisibleCount] = React.useState<number | null>(null);

  // When selection / options change, reset to measuring pass.
  React.useLayoutEffect(() => {
    if (mode === "multi") setVisibleCount(null);
  }, [selectedArr.join(","), resolvedOptions.length, mode]);

  // Re-measure when the container is resized.
  React.useEffect(() => {
    const container = pillsContainerRef.current;
    if (!container || mode !== "multi" || typeof ResizeObserver === "undefined")
      return;
    const ro = new ResizeObserver(() => {
      if (container.clientWidth !== measuredWidthRef.current)
        setVisibleCount(null);
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [mode]);

  // During measuring pass: compute how many pills fit.
  React.useLayoutEffect(() => {
    if (visibleCount !== null) return;

    const container = pillsContainerRef.current;
    if (!container || mode !== "multi" || selectedArr.length === 0) {
      setVisibleCount(selectedArr.length);
      return;
    }

    const containerWidth = container.clientWidth;
    measuredWidthRef.current = containerWidth;
    const pills = Array.from(
      container.querySelectorAll<HTMLElement>("[data-pill]"),
    );
    if (containerWidth === 0 || pills.length === 0) {
      // Not laid out yet — the ResizeObserver will trigger a re-measure.
      setVisibleCount(Math.min(1, selectedArr.length));
      return;
    }

    const GAP = 4; // gap-1
    const badgeReserve = (badgeMeasureRef.current?.offsetWidth ?? 32) + GAP;

    // offsetLeft/offsetWidth are layout values, unaffected by CSS transforms
    // (e.g. a dialog's zoom-in animation) that skew getBoundingClientRect.
    const originLeft = pills[0]!.offsetLeft;
    let count = pills.length;
    for (let i = 0; i < pills.length; i++) {
      const pillRight = pills[i]!.offsetLeft - originLeft + pills[i]!.offsetWidth;
      const hasMore = i < pills.length - 1;
      const limit = hasMore ? containerWidth - badgeReserve : containerWidth;
      if (pillRight > limit) {
        count = Math.max(1, i);
        break;
      }
    }

    setVisibleCount(count);
  }, [visibleCount]);

  // During measuring pass show all; after measurement show only what fits.
  const displayedPills =
    visibleCount === null ? selectedArr : selectedArr.slice(0, visibleCount);
  const overflowCount =
    visibleCount === null ? 0 : selectedArr.length - visibleCount;

  const hasSelection = mode === "multi" ? selectedArr.length > 0 : !!selected;
  const singleLabel =
    mode === "single"
      ? resolvedOptions.find((o) => o.value === selected)?.label
      : undefined;

  const triggerState = disabled
    ? "disabled"
    : readOnly
      ? "readonly"
      : open
        ? "open"
        : "default";

  const placeholderSizeClass =
    size === "lg"
      ? "text-[14px]"
      : size === "md"
        ? "text-[12px]"
        : "text-[11px]";

  const commandInputSizeClass =
    size === "lg"
      ? "h-10 text-base"
      : size === "md"
        ? "h-9 text-sm"
        : "h-8 text-xs";

  const commandItemSizeClass =
    size === "lg"
      ? "px-3 py-2.5 text-base"
      : size === "md"
        ? "px-3 py-2 text-sm"
        : "px-2.5 py-1.5 text-xs";

  const handleOpenChange = (next: boolean) => {
    if (disabled || readOnly) return;
    setOpen(next);
    if (!next) setSearchQuery(""); // reset search so next open starts fresh
    if (next) {
      interactedRef.current = true;
    } else if (interactedRef.current && !touchedRef.current) {
      touchedRef.current = true;
      onTouch?.();
    }
  };

  const handleTriggerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // If focus moves outside the trigger AND the popover is not open, mark touched.
    if (open) return;
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    if (!interactedRef.current) return;
    if (touchedRef.current) return;
    touchedRef.current = true;
    onTouch?.();
  };

  // ── Flat list mode inside FilterGroup mobile drawer ──────────────────────
  if (isMobileDrawer) {
    return (
      <ul className="divide-y divide-gray-100">
        {resolvedOptions.map((opt) => {
          const selected = isSelected(opt.value);
          return (
            <li key={opt.value}>
              <button
                type="button"
                disabled={opt.disabled}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-4 text-sm transition-colors",
                  selected
                    ? "text-[#006F42] font-semibold"
                    : "text-gray-800 font-normal",
                  opt.disabled
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-50 active:bg-gray-100 cursor-pointer",
                )}
              >
                <span>{opt.label}</span>
                {selected && (
                  <Check
                    size={16}
                    strokeWidth={2.5}
                    className="shrink-0 text-[#006F42]"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <InputLabel size={size === "xs" ? "sm" : size} required={required}>
          {label}
        </InputLabel>
      )}
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            onFocus={() => {
              interactedRef.current = true;
            }}
            onBlur={handleTriggerBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!disabled && !readOnly) setOpen((o) => !o);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            className={cn(
              triggerVariants({ state: triggerState, size }),
              width,
              className,
            )}
          >
            {/* ── Left: pills / label ── */}
            <div
              ref={mode === "multi" ? pillsContainerRef : undefined}
              className="flex flex-1 items-center gap-1 overflow-hidden min-w-0"
            >
              {mode === "multi" ? (
                selectedArr.length > 0 ? (
                  <>
                    {displayedPills.map((val) => {
                      const opt = resolvedOptions.find((o) => o.value === val);
                      if (!opt) return null;
                      return (
                        <span
                          key={val}
                          data-pill
                          className="inline-flex shrink-0 items-center gap-0.5 max-w-[120px] rounded-[4px] bg-[#E6F4EA] px-1.5 py-0.5 text-[11px] font-medium text-[#006F42]"
                        >
                          <span className="truncate">{opt.label}</span>
                          {clearable && (
                            <button
                              type="button"
                              tabIndex={-1}
                              onClick={(e) => removePill(val, e)}
                              className="ml-0.5 flex items-center text-[#006F42] hover:text-[#004d2e]"
                              aria-label={`Remove ${opt.label}`}
                            >
                              <X
                                size={10}
                                strokeWidth={2}
                                className="hover:text-red-500"
                              />
                            </button>
                          )}
                        </span>
                      );
                    })}
                    {visibleCount === null && (
                      <span
                        ref={badgeMeasureRef}
                        aria-hidden
                        className="invisible absolute inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold min-w-[22px]"
                      >
                        +{selectedArr.length}
                      </span>
                    )}
                    {overflowCount > 0 && (
                      <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#4B5563] px-1.5 py-0.5 text-[11px] font-semibold text-white min-w-[22px]">
                        +{overflowCount}
                      </span>
                    )}
                  </>
                ) : (
                  <span
                    className={cn(
                      "truncate text-[#C4C9D2]",
                      placeholderSizeClass,
                    )}
                  >
                    {placeholder}
                  </span>
                )
              ) : (
                <span
                  className={cn(
                    "truncate",
                    singleLabel
                      ? "text-[#111827]"
                      : cn("text-[#C4C9D2]", placeholderSizeClass),
                  )}
                >
                  {singleLabel ?? placeholder}
                </span>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {clearable && hasSelection && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={clearAll}
                  className="flex items-center text-gray-400 hover:text-gray-600"
                  aria-label="Clear selection"
                >
                  <X size={14} className="hover:text-red-500" strokeWidth={2} />
                </button>
              )}
              {sorting && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
                  }}
                  disabled={disabled}
                  className="flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={sortOrder === "asc" ? "Sorted A→Z, click for Z→A" : "Sorted Z→A, click for A→Z"}
                >
                  {sortOrder === "asc" ? (
                    <ArrowUpAZ size={14} strokeWidth={2} />
                  ) : (
                    <ArrowDownAZ size={14} strokeWidth={2} />
                  )}
                </button>
              )}
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={cn(
                  "text-gray-600 transition-transform duration-200",
                  open && "rotate-180",
                )}
              />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="max-w-[calc(100vw-1rem)]"
          collisionPadding={{ top: 64 }}
          style={{
            width: "var(--radix-popover-trigger-width)",
          }}
        >
          {/* shouldFilter={false}: we own filtering via Fuse.js; cmdk must not double-filter */}
          <Command shouldFilter={false}>
            {searchEnabled && (
              <CommandInput
                placeholder="Search..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                spellCheck={spellCheck}
                className={commandInputSizeClass}
              />
            )}
            <CommandList ref={listRef}>
              {visibleOptions.length === 0 && searchQuery.trim() ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : null}

              {mode === "multi" && (
                <CommandItem
                  value={SELECT_ALL}
                  onSelect={() => handleSelect(SELECT_ALL)}
                  className={cn(
                    "gap-2 border-b border-[#E5E7EB] font-medium text-[#374151] hover:bg-[#E6F4EA] data-[selected=true]:bg-[#E6F4EA]",
                    commandItemSizeClass,
                  )}
                >
                  <CheckboxIcon checked={allSelected} />
                  <span className="flex-1">Select all</span>
                </CommandItem>
              )}

              {orderedOptions.map((option, idx) => {
                const originalIdx = sortedOptions.findIndex((o) => o.value === option.value);
                const displayIndex = originalIdx + 1;
                const isLastPinned =
                  pinnedCount > 0 &&
                  idx === pinnedCount - 1 &&
                  pinnedCount < orderedOptions.length;
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    aria-selected={isSelected(option.value)}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      "hover:bg-[#E6F4EA] data-[selected=true]:bg-[#E6F4EA]",
                      commandItemSizeClass,
                      isLastPinned && "border-b border-[#E5E7EB]",
                    )}
                  >
                    {mode === "multi" && (
                      <CheckboxIcon checked={isSelected(option.value)} />
                    )}
                    {indexing && (
                      <span className="shrink-0 text-[#9CA3AF] tabular-nums">{displayIndex}.</span>
                    )}
                    <span className="flex-1 truncate">{option.label}</span>
                    {mode === "single" && isSelected(option.value) && (
                      <Check size={14} className="shrink-0 text-[#006F42]" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <InputHelper
        size={size === "xs" ? "sm" : size}
        helperText={helperText}
        error={error}
      />
    </div>
  );
}

Select.displayName = "Select";
export { Select };
