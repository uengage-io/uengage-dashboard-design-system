import * as React from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { defaultFilter } from "cmdk";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  className,
  onChange,
}: SelectProps<TItem>) {
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
  const [selected, setSelected] = React.useState<string | string[]>(
    controlledValue ?? defaultValue ?? (mode === "multi" ? [] : ""),
  );

  React.useEffect(() => {
    if (controlledValue !== undefined) setSelected(controlledValue);
  }, [controlledValue]);

  const selectedArr: string[] =
    mode === "multi" ? (Array.isArray(selected) ? selected : []) : [];

  const enabledOptions = resolvedOptions.filter((o) => !o.disabled);
  const allSelected =
    enabledOptions.length > 0 &&
    enabledOptions.every((o) => selectedArr.includes(o.value));

  const isSelected = (val: string) =>
    mode === "single" ? selected === val : selectedArr.includes(val);

  const commit = (next: string | string[]) => {
    setSelected(next);
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
  const pillsContainerRef = React.useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = React.useState<number | null>(null);

  // When selection changes, reset to measuring pass.
  React.useLayoutEffect(() => {
    if (mode === "multi") setVisibleCount(null);
  }, [selectedArr.join(","), mode]);

  // During measuring pass: compute how many pills fit.
  React.useLayoutEffect(() => {
    if (visibleCount !== null) return;

    const container = pillsContainerRef.current;
    if (!container || mode !== "multi" || selectedArr.length === 0) {
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

  const triggerState = disabled ? "disabled" : open ? "open" : "default";

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!disabled) setOpen((o) => !o);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className={cn(
            triggerVariants({ state: triggerState, size }),
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
                      </span>
                    );
                  })}
                  {overflowCount > 0 && (
                    <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#4B5563] px-1.5 py-0.5 text-[11px] font-semibold text-white min-w-[22px]">
                      +{overflowCount}
                    </span>
                  )}
                </>
              ) : (
                <span className="truncate text-[#C4C9D2]">
                  {placeholder}
                </span>
              )
            ) : (
              <span
                className={cn(
                  "truncate",
                  singleLabel ? "text-[#111827]" : "text-[#C4C9D2]",
                )}
              >
                {singleLabel ?? placeholder}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {hasSelection && (
              <button
                type="button"
                tabIndex={-1}
                onClick={clearAll}
                className="flex items-center text-[#9CA3AF] hover:text-[#374151]"
                aria-label="Clear selection"
              >
                <X size={14} className="hover:text-red-500" strokeWidth={2} />
              </button>
            )}
            <ChevronDown
              size={16}
              className={cn(
                "text-[#6B7280] transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        style={{
          width: "var(--radix-popover-trigger-width)",
          minWidth: "220px",
        }}
      >
        <Command
          filter={(value, search) =>
            value === SELECT_ALL ? 1 : defaultFilter(value, search)
          }
        >
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {mode === "multi" && (
              <CommandItem
                value={SELECT_ALL}
                onSelect={() => handleSelect(SELECT_ALL)}
                className="gap-2 border-b border-[#E5E7EB] font-medium text-[#374151] hover:bg-[#E6F4EA] data-[selected=true]:bg-[#E6F4EA]"
              >
                <CheckboxIcon checked={allSelected} />
                <span className="flex-1">Select all</span>
              </CommandItem>
            )}

            {resolvedOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                aria-selected={isSelected(option.value)}
                onSelect={() => handleSelect(option.value)}
                className="hover:bg-[#E6F4EA] data-[selected=true]:bg-[#E6F4EA]"
              >
                {mode === "multi" && (
                  <CheckboxIcon checked={isSelected(option.value)} />
                )}
                <span className="flex-1 truncate">{option.label}</span>
                {mode === "single" && isSelected(option.value) && (
                  <Check size={14} className="shrink-0 text-[#006F42]" />
                )}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

Select.displayName = "Select";
export { Select };
