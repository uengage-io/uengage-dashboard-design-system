import * as React from "react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  ChevronDown,
  CircleAlert,
  Lock,
  Plus,
  X,
} from "lucide-react";
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
import { getLabelColor } from "@/components/custom/Input/inputVariants";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  MENU,
  MENU_SCROLLBAR_CSS,
  SELECT_COLORS,
  SELECT_GAP,
  SELECT_SIZES,
  SELECT_TRANSITION,
  getTriggerStyle,
  triggerVariants,
  type SelectVisualState,
} from "@/components/custom/Select/selectVariants";
import type {
  SelectOption,
  SelectProps,
} from "@/components/custom/Select/Select.types";

const CREATE_VALUE = "__create__";

/** 14px box, 1.5px hairline, filled forest when checked. */
function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <span
      className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[3px]"
      style={{
        background: checked ? MENU.checkboxOn : "transparent",
        border: `1.5px solid ${checked ? MENU.checkboxOn : MENU.checkboxOff}`,
        transition: "background 120ms linear, border-color 120ms linear",
      }}
    >
      {checked && <Check size={9} strokeWidth={3.5} className="text-white" />}
    </span>
  );
}

function Spinner({ size }: { size: number }) {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 animate-spin rounded-full"
      style={{
        width: size,
        height: size,
        border: `2px solid ${SELECT_COLORS.border}`,
        borderTopColor: SELECT_COLORS.borderFocus,
      }}
    />
  );
}

/** Three shimmer rows — never a centred spinner. */
function LoadingRows({ height }: { height: number }) {
  return (
    <div className="flex flex-col gap-1 p-1" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="animate-pulse"
          style={{
            height,
            borderRadius: MENU.optionRadius,
            background: SELECT_COLORS.subtle,
            opacity: 1 - i * 0.22,
          }}
        />
      ))}
    </div>
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
  multiple,
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
  search: searchProp = true,
  searchable,
  status,
  statusMessage,
  leftIcon,
  loading = false,
  maxChips,
  onSearch,
  creatable = false,
  onCreate,
  emptyState,
  placement = "auto",
}: SelectProps<TItem>) {
  const isMobileDrawer = React.useContext(FilterGroupMobileContext);
  const touchedRef = React.useRef(false);
  const interactedRef = React.useRef(false);

  const resolvedMode = multiple ? "multi" : mode;
  const searchEnabled = searchable ?? searchProp;
  const spec = SELECT_SIZES[size];

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
  const [hovered, setHovered] = React.useState(false);
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
      const opt = sortedOptions[n - 1];
      return opt ? [opt] : [];
    }
    return fuseFilteredOptions;
  }, [searchEnabled, searchQuery, indexing, sortedOptions, fuseFilteredOptions]);

  const [selected, setSelected] = React.useState<string | string[]>(
    controlledValue ?? defaultValue ?? (resolvedMode === "multi" ? [] : ""),
  );

  React.useEffect(() => {
    if (controlledValue !== undefined) setSelected(controlledValue);
  }, [controlledValue]);

  const selectedArr: string[] =
    resolvedMode === "multi" ? (Array.isArray(selected) ? selected : []) : [];

  const enabledOptions = sortedOptions.filter((o) => !o.disabled);
  const allSelected =
    enabledOptions.length > 0 &&
    enabledOptions.every((o) => selectedArr.includes(o.value));

  const isSelected = (val: string) =>
    resolvedMode === "single" ? selected === val : selectedArr.includes(val);

  const commit = (next: string | string[]) => {
    // In uncontrolled mode update internal state immediately.
    // In controlled mode the parent owns the value — don't touch internal state
    // so the display stays at the last confirmed value until the parent updates the prop.
    if (controlledValue === undefined) setSelected(next);
    onChange?.(next);
  };

  const handleSelect = (val: string) => {
    if (resolvedMode === "single") {
      commit(val);
      setOpen(false);
    } else {
      commit(
        selectedArr.includes(val)
          ? selectedArr.filter((v) => v !== val)
          : [...selectedArr, val],
      );
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
    commit(resolvedMode === "multi" ? [] : "");
  };

  // ── Dynamic pill overflow ──────────────────────────────────────────────
  // Two-pass approach so the +N badge is always visible:
  //   Pass 1 (null)  – all pills render with no badge; layout effect measures them.
  //   Pass 2 (number) – only the fitting pills + badge render; no ghost pills taking space.
  // `maxChips` short-circuits the measurement with a hard cap.
  const pillsContainerRef = React.useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    if (resolvedMode === "multi") setVisibleCount(null);
  }, [selectedArr.join(","), resolvedMode]);

  React.useLayoutEffect(() => {
    if (visibleCount !== null) return;
    if (maxChips !== undefined) {
      setVisibleCount(Math.min(maxChips, selectedArr.length));
      return;
    }

    const container = pillsContainerRef.current;
    if (!container || resolvedMode !== "multi" || selectedArr.length === 0) {
      setVisibleCount(selectedArr.length);
      return;
    }

    const containerRight = container.getBoundingClientRect().right;
    const pills = Array.from(
      container.querySelectorAll<HTMLElement>("[data-pill]"),
    );
    const BADGE_RESERVE = 40;

    let count = pills.length;
    for (let i = 0; i < pills.length; i++) {
      const pillRight = pills[i]!.getBoundingClientRect().right;
      const hasMore = i < pills.length - 1;
      const limit = hasMore ? containerRight - BADGE_RESERVE : containerRight;
      if (pillRight > limit) {
        count = i === 0 ? 1 : i;
        break;
      }
    }

    setVisibleCount(count);
  }, [visibleCount, maxChips]);

  const displayedPills =
    visibleCount === null ? selectedArr : selectedArr.slice(0, visibleCount);
  const overflowCount =
    visibleCount === null ? 0 : selectedArr.length - visibleCount;

  const hasSelection =
    resolvedMode === "multi" ? selectedArr.length > 0 : !!selected;
  const singleLabel =
    resolvedMode === "single"
      ? resolvedOptions.find((o) => o.value === selected)?.label
      : undefined;

  // ── Visual state ───────────────────────────────────────────────────────
  const state: SelectVisualState = disabled
    ? "disabled"
    : loading
      ? "loading"
      : readOnly
        ? "readonly"
        : error
          ? "error"
          : open
            ? "open"
            : status === "success"
              ? "success"
              : status === "warning"
                ? "warning"
                : hovered
                  ? "hover"
                  : "default";

  const box = getTriggerStyle(state);
  const showChevron = !readOnly && !loading;

  const legacyState =
    state === "disabled"
      ? "disabled"
      : state === "readonly"
        ? "readonly"
        : state === "open"
          ? "open"
          : "default";

  const handleOpenChange = (next: boolean) => {
    if (disabled || readOnly || loading) return;
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

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    onSearch?.(q);
  };

  // ── Flat list mode inside FilterGroup mobile drawer ──────────────────────
  if (isMobileDrawer) {
    return (
      <ul className="divide-y divide-gray-100">
        {resolvedOptions.map((opt) => {
          const rowSelected = isSelected(opt.value);
          return (
            <li key={opt.value}>
              <button
                type="button"
                disabled={opt.disabled}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-4 text-sm transition-colors",
                  rowSelected
                    ? "font-semibold text-[#003C1B]"
                    : "font-normal text-gray-800",
                  opt.disabled
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer hover:bg-[#FAFFF7] active:bg-[#DCF3CE]",
                )}
              >
                <span>{opt.label}</span>
                {rowSelected && (
                  <Check size={16} strokeWidth={2.5} className="shrink-0 text-[#003C1B]" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  // ── Menu body ──────────────────────────────────────────────────────────
  const query = searchQuery.trim();
  const exactMatch = visibleOptions.some(
    (o) => o.label.toLowerCase() === query.toLowerCase(),
  );
  const showCreate = creatable && query.length > 0 && !exactMatch;
  const showEmpty = visibleOptions.length === 0 && !showCreate;

  /** Group options in their current order; ungrouped options keep a null key. */
  const groups = React.useMemo(() => {
    const out: Array<{ name: string | null; options: SelectOption[] }> = [];
    for (const opt of visibleOptions) {
      const name = opt.group ?? null;
      const last = out[out.length - 1];
      if (last && last.name === name) last.options.push(opt);
      else out.push({ name, options: [opt] });
    }
    return out;
  }, [visibleOptions]);

  const renderOption = (option: SelectOption) => {
    const checked = isSelected(option.value);
    const isMulti = resolvedMode === "multi";
    const rich = Boolean(option.description || option.icon);
    const originalIdx = sortedOptions.findIndex((o) => o.value === option.value);

    return (
      <CommandItem
        key={option.value}
        value={option.value}
        disabled={option.disabled}
        aria-selected={checked}
        onSelect={() => handleSelect(option.value)}
        className={cn(
          "group/opt cursor-pointer data-[disabled=true]:cursor-not-allowed",
          rich ? "items-start" : "items-center",
        )}
        style={{
          minHeight: rich ? 44 : spec.option,
          gap: SELECT_GAP,
          padding: rich ? "7px 10px" : "0 10px",
          borderRadius: MENU.optionRadius,
          fontSize: spec.font,
          lineHeight: 1.3,
          background: checked
            ? isMulti
              ? MENU.multiSelectedBg
              : MENU.selectedBg
            : "transparent",
          color: checked && !isMulti ? MENU.selectedInk : SELECT_COLORS.value,
          fontWeight: checked && !isMulti ? 600 : 500,
          opacity: option.disabled ? 0.55 : 1,
        }}
      >
        {isMulti && <CheckboxIcon checked={checked} />}
        {indexing && (
          <span className="shrink-0 tabular-nums" style={{ color: MENU.metaInk }}>
            {originalIdx + 1}.
          </span>
        )}
        {option.icon && <span className="flex shrink-0 items-center">{option.icon}</span>}

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate">{option.label}</span>
          {option.description && (
            <span style={{ fontSize: spec.font - 2, fontWeight: 400, color: MENU.metaInk }}>
              {option.description}
            </span>
          )}
        </span>

        {option.meta && (
          <span
            className="shrink-0 whitespace-nowrap"
            style={{ fontSize: spec.font - 2, fontWeight: 500, color: MENU.metaInk }}
          >
            {option.meta}
          </span>
        )}
        {!isMulti && checked && (
          <Check size={14} strokeWidth={2.8} className="shrink-0" color={MENU.selectedInk} />
        )}
      </CommandItem>
    );
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <InputLabel
          size={size}
          required={required}
          tone={state === "error" || state === "disabled" ? getLabelColor(state) : undefined}
        >
          {label}
        </InputLabel>
      )}

      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div
            role="button"
            data-slot="select-trigger"
            data-size={size}
            data-state={state}
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-busy={loading || undefined}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocus={() => {
              interactedRef.current = true;
            }}
            onBlur={handleTriggerBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!disabled && !readOnly && !loading) setOpen((o) => !o);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            className={cn(
              triggerVariants({ state: legacyState, size }),
              width,
              className,
            )}
            style={{
              minHeight: spec.height,
              paddingLeft: spec.padLeft,
              paddingRight: spec.padRight,
              paddingTop: resolvedMode === "multi" ? spec.padMultiY : 0,
              paddingBottom: resolvedMode === "multi" ? spec.padMultiY : 0,
              gap: SELECT_GAP,
              borderRadius: spec.radius,
              fontSize: spec.font,
              background: box.background,
              border: box.border,
              boxShadow: box.boxShadow,
              color: box.color,
              cursor: box.cursor ?? "pointer",
              transition: SELECT_TRANSITION,
            }}
          >
            {leftIcon && (
              <span
                className="flex shrink-0 items-center justify-center [&>svg]:size-full"
                style={{ width: spec.icon + 1, height: spec.icon + 1, color: SELECT_COLORS.icon }}
              >
                {leftIcon}
              </span>
            )}

            {/* ── Left: chips / value / placeholder ── */}
            <div
              ref={resolvedMode === "multi" ? pillsContainerRef : undefined}
              className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden"
            >
              {resolvedMode === "multi" ? (
                selectedArr.length > 0 ? (
                  <>
                    {displayedPills.map((val) => {
                      const opt = resolvedOptions.find((o) => o.value === val);
                      if (!opt) return null;
                      return (
                        <span
                          key={val}
                          data-pill
                          className="inline-flex max-w-[140px] shrink-0 items-center gap-1 rounded-full font-semibold"
                          style={{
                            padding: clearable ? "4px 4px 4px 10px" : "4px 10px",
                            background: MENU.selectedBg,
                            color: MENU.selectedInk,
                            fontSize: spec.font - 2,
                          }}
                        >
                          <span className="truncate">{opt.label}</span>
                          {clearable && (
                            <button
                              type="button"
                              tabIndex={-1}
                              onClick={(e) => removePill(val, e)}
                              aria-label={`Remove ${opt.label}`}
                              className="flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full transition-colors"
                              style={{ background: "rgba(0,60,27,.1)", color: MENU.selectedInk }}
                            >
                              <X size={8} strokeWidth={3.4} />
                            </button>
                          )}
                        </span>
                      );
                    })}
                    {overflowCount > 0 && (
                      <span
                        className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
                        style={{
                          padding: "4px 8px",
                          background: SELECT_COLORS.subtle,
                          color: SELECT_COLORS.message,
                          fontSize: spec.font - 2,
                        }}
                      >
                        +{overflowCount}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="truncate" style={{ color: SELECT_COLORS.placeholder }}>
                    {placeholder}
                  </span>
                )
              ) : (
                <span
                  className="truncate"
                  style={{
                    color: singleLabel ? box.color : SELECT_COLORS.placeholder,
                  }}
                >
                  {singleLabel ?? placeholder}
                </span>
              )}
            </div>

            {/* ── Right: adornments ── */}
            <div className="flex shrink-0 items-center" style={{ gap: 6 }}>
              {clearable && hasSelection && !readOnly && !disabled && (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={clearAll}
                  aria-label="Clear selection"
                  className="flex shrink-0 items-center justify-center rounded-full transition-colors"
                  style={{
                    width: spec.icon + 4,
                    height: spec.icon + 4,
                    background: SELECT_COLORS.subtle,
                    color: SELECT_COLORS.message,
                  }}
                >
                  <X size={spec.icon - 6} strokeWidth={3} />
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
                  aria-label={
                    sortOrder === "asc"
                      ? "Sorted A→Z, click for Z→A"
                      : "Sorted Z→A, click for A→Z"
                  }
                  className="flex items-center transition-colors"
                  style={{ color: SELECT_COLORS.message }}
                >
                  {sortOrder === "asc" ? (
                    <ArrowUpAZ size={spec.icon - 1} strokeWidth={2} />
                  ) : (
                    <ArrowDownAZ size={spec.icon - 1} strokeWidth={2} />
                  )}
                </button>
              )}
              {loading && <Spinner size={spec.icon - 2} />}
              {state === "readonly" && (
                <Lock size={spec.icon - 2} strokeWidth={2} color={SELECT_COLORS.placeholder} />
              )}
              {state === "error" && (
                <CircleAlert size={spec.icon} strokeWidth={2.2} color={SELECT_COLORS.errorInk} />
              )}
              {state === "warning" && (
                <CircleAlert size={spec.icon} strokeWidth={2.2} color={SELECT_COLORS.warningInk} />
              )}
              {state === "success" && (
                <Check size={spec.icon} strokeWidth={2.6} color={SELECT_COLORS.successInk} />
              )}
              {showChevron && (
                <ChevronDown
                  size={spec.icon}
                  strokeWidth={2}
                  className="transition-transform duration-[120ms]"
                  style={{
                    color: disabled ? SELECT_COLORS.borderHover : SELECT_COLORS.placeholder,
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              )}
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          side={placement === "auto" ? "bottom" : placement}
          className="max-w-[calc(100vw-1rem)] border-0 p-0 shadow-none"
          collisionPadding={{ top: 64 }}
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <div
            style={{
              padding: MENU.padding,
              borderRadius: MENU.radius,
              border: MENU.border,
              background: MENU.background,
              boxShadow: MENU.shadow,
            }}
          >
            <style>{MENU_SCROLLBAR_CSS}</style>
            {/* shouldFilter={false}: we own filtering via Fuse.js; cmdk must not double-filter */}
            <Command shouldFilter={false}>
              {searchEnabled && !loading && (
                <CommandInput
                  placeholder="Search..."
                  value={searchQuery}
                  onValueChange={handleSearchChange}
                  spellCheck={spellCheck}
                  style={{ fontSize: spec.font }}
                />
              )}

              {/* Sticky count bar with All / None */}
              {resolvedMode === "multi" && !loading && visibleOptions.length > 0 && (
                <div
                  className="sticky top-0 z-10 flex items-center justify-between"
                  style={{
                    padding: "6px 10px",
                    background: MENU.background,
                    borderBottom: `1px solid ${MENU.groupRule}`,
                    fontSize: spec.font - 2,
                    color: SELECT_COLORS.message,
                  }}
                >
                  <span className="font-semibold">{selectedArr.length} selected</span>
                  <span className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => commit(enabledOptions.map((o) => o.value))}
                      disabled={allSelected}
                      className="font-semibold disabled:opacity-40"
                      style={{ color: MENU.selectedInk }}
                    >
                      All
                    </button>
                    <span style={{ color: MENU.groupRule }}>|</span>
                    <button
                      type="button"
                      onClick={() => commit([])}
                      disabled={selectedArr.length === 0}
                      className="font-semibold disabled:opacity-40"
                      style={{ color: SELECT_COLORS.message }}
                    >
                      None
                    </button>
                  </span>
                </div>
              )}

              <CommandList
                ref={listRef}
                data-slot="select-menu-list"
                style={{ maxHeight: MENU.maxRows * spec.option + MENU.padding * 2 }}
              >
                {loading ? (
                  <LoadingRows height={spec.option} />
                ) : (
                  <>
                    {groups.map((group, gi) => (
                      <div
                        key={group.name ?? `__ungrouped_${gi}`}
                        style={
                          gi > 0 && group.name
                            ? { borderTop: `1px solid ${MENU.groupRule}`, marginTop: 4, paddingTop: 4 }
                            : undefined
                        }
                      >
                        {group.name && (
                          <div
                            className="sticky top-0 z-[5] font-semibold uppercase"
                            style={{
                              padding: "6px 10px 4px",
                              background: MENU.background,
                              fontSize: 10,
                              letterSpacing: "0.09em",
                              color: MENU.groupInk,
                            }}
                          >
                            {group.name}
                          </div>
                        )}
                        {group.options.map(renderOption)}
                      </div>
                    ))}

                    {showCreate && (
                      <CommandItem
                        value={CREATE_VALUE}
                        onSelect={() => {
                          onCreate?.(query);
                          setOpen(false);
                        }}
                        className="cursor-pointer"
                        style={{
                          minHeight: spec.option,
                          gap: SELECT_GAP,
                          padding: "0 10px",
                          marginTop: 4,
                          borderTop: `1px solid ${MENU.groupRule}`,
                          borderRadius: MENU.optionRadius,
                          fontSize: spec.font,
                          fontWeight: 600,
                          color: MENU.selectedInk,
                        }}
                      >
                        <Plus size={14} strokeWidth={2.4} className="shrink-0" />
                        <span className="truncate">Create “{query}”</span>
                      </CommandItem>
                    )}

                    {showEmpty && (
                      <div
                        className="flex flex-col items-start gap-1"
                        style={{ padding: "14px 10px", fontSize: spec.font }}
                      >
                        {emptyState ?? (
                          <span style={{ color: SELECT_COLORS.message }}>No results found.</span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </CommandList>
            </Command>
          </div>
        </PopoverContent>
      </Popover>

      <InputHelper
        size={size}
        state={state === "open" ? "focused" : state}
        helperText={error ?? (status && statusMessage) ?? helperText}
        error={error}
      />
    </div>
  );
}

Select.displayName = "Select";
export { Select };
