"use client";
import * as React from 'react';
import { useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight, X, ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Fuse from 'fuse.js';
import { Popover as Popover$1 } from 'radix-ui';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { Command as Command$1, CommandInput as CommandInput$1, CommandList as CommandList$1, CommandEmpty as CommandEmpty$1, CommandItem as CommandItem$1 } from 'cmdk';
import { cva } from 'class-variance-authority';

// src/components/ui/DatePickerCalendar.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function useFuzzySearch(items, query) {
  const fuse = useMemo(
    () => new Fuse(items, {
      keys: ["label"],
      threshold: 0.35,
      minMatchCharLength: 1,
      ignoreLocation: true,
      shouldSort: true
    }),
    [items]
  );
  return useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    return fuse.search(q).map((r) => r.item);
  }, [fuse, query, items]);
}
function Popover({ ...props }) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(
    Popover$1.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "uengage-ui",
        "z-50 min-w-[8rem] overflow-hidden rounded-[4px] border border-[#E5E7EB] bg-white p-0 shadow-md outline-none",
        className
      ),
      ...props
    }
  ) });
}
function Command({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Command$1,
    {
      "data-slot": "command",
      className: cn("uengage-ui flex h-full w-full flex-col overflow-hidden bg-white text-[#111827]", className),
      ...props
    }
  );
}
function CommandInput({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: "uengage-ui flex items-center border-b border-[#E5E7EB] px-3", children: /* @__PURE__ */ jsx(
    CommandInput$1,
    {
      "data-slot": "command-input",
      className: cn(
        "flex h-9 w-full bg-transparent py-2 text-sm text-[#111827] outline-none placeholder:text-[#C4C9D2] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  ) });
}
function CommandList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    CommandList$1,
    {
      "data-slot": "command-list",
      className: cn("max-h-60 overflow-y-auto overflow-x-hidden py-1", className),
      ...props
    }
  );
}
function CommandEmpty({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    CommandEmpty$1,
    {
      "data-slot": "command-empty",
      className: cn("px-3 py-6 text-center text-sm text-[#9CA3AF]", className),
      ...props
    }
  );
}
function CommandItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    CommandItem$1,
    {
      role: "option",
      "data-slot": "command-item",
      className: cn(
        "relative flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-sm text-[#374151] outline-none",
        "hover:bg-[#F3F4F6] data-[selected=true]:bg-[#F3F4F6]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      ),
      ...props
    }
  );
}

// src/utils/tokens.ts
var COMPONENT_HEIGHT = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12"
};
var TEXT_SIZE = {
  xs: "text-[11px]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base"
};
var PLACEHOLDER_SIZE = {
  xs: "placeholder:text-[10px]",
  sm: "placeholder:text-[11px]",
  md: "placeholder:text-[12px]",
  lg: "placeholder:text-[14px]"
};

// src/components/custom/Select/selectVariants.ts
var triggerVariants = cva(
  [
    "flex w-full items-center justify-between",
    "rounded-[4px] border border-gray-400 bg-white",
    "transition-colors duration-150 cursor-pointer select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      state: {
        default: [
          "text-[#374151]",
          "hover:border-gray-500 hover:text-[#111827] hover:shadow-sm"
        ].join(" "),
        open: ["border-gray-500 text-[#111827]", "ring-1 ring-gray-200"].join(
          " "
        ),
        disabled: [
          "border-gray-300 text-gray-400",
          "opacity-50 pointer-events-none"
        ].join(" ")
      },
      size: {
        xs: `h-6 gap-1 px-1.5 ${TEXT_SIZE.xs} ${PLACEHOLDER_SIZE.xs}`,
        sm: `${COMPONENT_HEIGHT.sm} gap-1 px-2 ${TEXT_SIZE.sm} ${PLACEHOLDER_SIZE.sm}`,
        md: `${COMPONENT_HEIGHT.md} gap-1.5 px-3 ${TEXT_SIZE.md} ${PLACEHOLDER_SIZE.md}`,
        lg: `${COMPONENT_HEIGHT.lg} gap-2 px-3.5 ${TEXT_SIZE.lg} ${PLACEHOLDER_SIZE.lg}`
      }
    },
    defaultVariants: {
      state: "default",
      size: "md"
    }
  }
);
var SELECT_ALL = "__select_all__";
function CheckboxIcon({ checked }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "flex shrink-0 h-[14px] w-[14px] items-center justify-center rounded-[3px] border",
        checked ? "border-[#006F42] bg-[#006F42]" : "border-[#D1D5DB] bg-white"
      ),
      children: checked && /* @__PURE__ */ jsx(Check, { size: 9, strokeWidth: 3.5, className: "text-white" })
    }
  );
}
function Select({
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
  spellCheck = true
}) {
  const touchedRef = React.useRef(false);
  const interactedRef = React.useRef(false);
  const resolvedOptions = React.useMemo(() => {
    if (items && getLabel && getValue) {
      return items.map((item) => ({
        label: getLabel(item),
        value: getValue(item),
        disabled: getDisabled ? getDisabled(item) : false
      }));
    }
    return options ?? [];
  }, [items, getLabel, getValue, getDisabled, options]);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const filteredOptions = useFuzzySearch(resolvedOptions, search);
  const [selected, setSelected] = React.useState(
    controlledValue ?? defaultValue ?? (mode === "multi" ? [] : "")
  );
  React.useEffect(() => {
    if (controlledValue !== void 0) setSelected(controlledValue);
  }, [controlledValue]);
  const selectedArr = mode === "multi" ? Array.isArray(selected) ? selected : [] : [];
  const enabledOptions = resolvedOptions.filter((o) => !o.disabled);
  const allSelected = enabledOptions.length > 0 && enabledOptions.every((o) => selectedArr.includes(o.value));
  const isSelected = (val) => mode === "single" ? selected === val : selectedArr.includes(val);
  const commit = (next) => {
    setSelected(next);
    onChange?.(next);
  };
  const handleSelect = (val) => {
    if (val === SELECT_ALL) {
      commit(allSelected ? [] : enabledOptions.map((o) => o.value));
      return;
    }
    if (mode === "single") {
      commit(val);
      setOpen(false);
    } else {
      const next = selectedArr.includes(val) ? selectedArr.filter((v) => v !== val) : [...selectedArr, val];
      commit(next);
    }
  };
  const removePill = (val, e) => {
    e.preventDefault();
    e.stopPropagation();
    commit(selectedArr.filter((v) => v !== val));
  };
  const clearAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    commit(mode === "multi" ? [] : "");
  };
  const pillsContainerRef = React.useRef(null);
  const [visibleCount, setVisibleCount] = React.useState(null);
  React.useLayoutEffect(() => {
    if (mode === "multi") setVisibleCount(null);
  }, [selectedArr.join(","), mode]);
  React.useLayoutEffect(() => {
    if (visibleCount !== null) return;
    const container = pillsContainerRef.current;
    if (!container || mode !== "multi" || selectedArr.length === 0) {
      setVisibleCount(selectedArr.length);
      return;
    }
    const containerRight = container.getBoundingClientRect().right;
    const pills = Array.from(
      container.querySelectorAll("[data-pill]")
    );
    const BADGE_RESERVE = 40;
    let count = pills.length;
    for (let i = 0; i < pills.length; i++) {
      const pillRight = pills[i].getBoundingClientRect().right;
      const hasMore = i < pills.length - 1;
      const limit = hasMore ? containerRight - BADGE_RESERVE : containerRight;
      if (pillRight > limit) {
        count = i === 0 ? 1 : i;
        break;
      }
    }
    setVisibleCount(count);
  }, [visibleCount]);
  const displayedPills = visibleCount === null ? selectedArr : selectedArr.slice(0, visibleCount);
  const overflowCount = visibleCount === null ? 0 : selectedArr.length - visibleCount;
  const hasSelection = mode === "multi" ? selectedArr.length > 0 : !!selected;
  const singleLabel = mode === "single" ? resolvedOptions.find((o) => o.value === selected)?.label : void 0;
  const triggerState = disabled ? "disabled" : open ? "open" : "default";
  const placeholderSizeClass = size === "lg" ? "text-[14px]" : size === "md" ? "text-[12px]" : "text-[11px]";
  const commandInputSizeClass = size === "lg" ? "h-10 text-base" : size === "md" ? "h-9 text-sm" : "h-8 text-xs";
  const commandItemSizeClass = size === "lg" ? "px-3 py-2.5 text-base" : size === "md" ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs";
  const handleOpenChange = (next) => {
    if (disabled) return;
    setOpen(next);
    if (!next) setSearch("");
    if (next) {
      interactedRef.current = true;
    } else if (interactedRef.current && !touchedRef.current) {
      touchedRef.current = true;
      onTouch?.();
    }
  };
  const handleTriggerBlur = (e) => {
    if (open) return;
    if (e.currentTarget.contains(e.relatedTarget)) return;
    if (!interactedRef.current) return;
    if (touchedRef.current) return;
    touchedRef.current = true;
    onTouch?.();
  };
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      "div",
      {
        role: "button",
        tabIndex: disabled ? -1 : 0,
        "aria-disabled": disabled,
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        onFocus: () => {
          interactedRef.current = true;
        },
        onBlur: handleTriggerBlur,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) setOpen((o) => !o);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        },
        className: cn(
          triggerVariants({ state: triggerState, size }),
          width,
          className
        ),
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: mode === "multi" ? pillsContainerRef : void 0,
              className: "flex flex-1 items-center gap-1 overflow-hidden min-w-0",
              children: mode === "multi" ? selectedArr.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                displayedPills.map((val) => {
                  const opt = resolvedOptions.find((o) => o.value === val);
                  if (!opt) return null;
                  return /* @__PURE__ */ jsxs(
                    "span",
                    {
                      "data-pill": true,
                      className: "inline-flex shrink-0 items-center gap-0.5 max-w-[120px] rounded-[4px] bg-[#E6F4EA] px-1.5 py-0.5 text-[11px] font-medium text-[#006F42]",
                      children: [
                        /* @__PURE__ */ jsx("span", { className: "truncate", children: opt.label }),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            tabIndex: -1,
                            onClick: (e) => removePill(val, e),
                            className: "ml-0.5 flex items-center text-[#006F42] hover:text-[#004d2e]",
                            "aria-label": `Remove ${opt.label}`,
                            children: /* @__PURE__ */ jsx(
                              X,
                              {
                                size: 10,
                                strokeWidth: 2,
                                className: "hover:text-red-500"
                              }
                            )
                          }
                        )
                      ]
                    },
                    val
                  );
                }),
                overflowCount > 0 && /* @__PURE__ */ jsxs("span", { className: "inline-flex shrink-0 items-center justify-center rounded-full bg-[#4B5563] px-1.5 py-0.5 text-[11px] font-semibold text-white min-w-[22px]", children: [
                  "+",
                  overflowCount
                ] })
              ] }) : /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "truncate text-[#C4C9D2]",
                    placeholderSizeClass
                  ),
                  children: placeholder
                }
              ) : /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "truncate",
                    singleLabel ? "text-[#111827]" : cn("text-[#C4C9D2]", placeholderSizeClass)
                  ),
                  children: singleLabel ?? placeholder
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
            hasSelection && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                tabIndex: -1,
                onClick: clearAll,
                className: "flex items-center text-gray-400 hover:text-gray-600",
                "aria-label": "Clear selection",
                children: /* @__PURE__ */ jsx(X, { size: 14, className: "hover:text-red-500", strokeWidth: 2 })
              }
            ),
            /* @__PURE__ */ jsx(
              ChevronDown,
              {
                size: 16,
                strokeWidth: 2,
                className: cn(
                  "text-gray-600 transition-transform duration-200",
                  open && "rotate-180"
                )
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        className: "max-w-[calc(100vw-1rem)]",
        style: {
          width: "var(--radix-popover-trigger-width)"
        },
        children: /* @__PURE__ */ jsxs(Command, { shouldFilter: false, children: [
          /* @__PURE__ */ jsx(
            CommandInput,
            {
              placeholder: "Search...",
              value: search,
              onValueChange: setSearch,
              spellCheck,
              className: commandInputSizeClass
            }
          ),
          /* @__PURE__ */ jsxs(CommandList, { children: [
            filteredOptions.length === 0 && search.trim() ? /* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }) : null,
            mode === "multi" && /* @__PURE__ */ jsxs(
              CommandItem,
              {
                value: SELECT_ALL,
                onSelect: () => handleSelect(SELECT_ALL),
                className: cn(
                  "gap-2 border-b border-[#E5E7EB] font-medium text-[#374151] hover:bg-[#E6F4EA] data-[selected=true]:bg-[#E6F4EA]",
                  commandItemSizeClass
                ),
                children: [
                  /* @__PURE__ */ jsx(CheckboxIcon, { checked: allSelected }),
                  /* @__PURE__ */ jsx("span", { className: "flex-1", children: "Select all" })
                ]
              }
            ),
            filteredOptions.map((option) => /* @__PURE__ */ jsxs(
              CommandItem,
              {
                value: option.value,
                disabled: option.disabled,
                "aria-selected": isSelected(option.value),
                onSelect: () => handleSelect(option.value),
                className: cn(
                  "hover:bg-[#E6F4EA] data-[selected=true]:bg-[#E6F4EA]",
                  commandItemSizeClass
                ),
                children: [
                  mode === "multi" && /* @__PURE__ */ jsx(CheckboxIcon, { checked: isSelected(option.value) }),
                  /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: option.label }),
                  mode === "single" && isSelected(option.value) && /* @__PURE__ */ jsx(Check, { size: 14, className: "shrink-0 text-[#006F42]" })
                ]
              },
              option.value
            ))
          ] })
        ] })
      }
    )
  ] });
}
Select.displayName = "Select";
var MONTH_OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
].map((label, i) => ({ label, value: String(i) }));
function buildYearOptions(center) {
  const opts = [];
  for (let y = center - 10; y <= center + 10; y++) {
    opts.push({ label: String(y), value: String(y) });
  }
  return opts;
}
function StyledDayButton({
  day,
  modifiers,
  className,
  ...props
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  const isEdge = modifiers.range_start || modifiers.range_end;
  const isSingleSelected = modifiers.selected && !isEdge && !modifiers.range_middle;
  const isGreenFilled = isSingleSelected || isEdge;
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      disabled: modifiers.disabled,
      className: cn(
        // base circle
        "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006F42] focus-visible:ring-offset-1",
        // green filled circle — single selected or range edge
        isGreenFilled && "bg-[#006F42] text-white font-medium",
        // range middle — transparent, cell bg (#006F42) shows through
        modifiers.range_middle && !isEdge && "w-full rounded-none text-white",
        // today underline — always render; color depends on context
        modifiers.today && (isGreenFilled || modifiers.range_middle && !isEdge) && "underline decoration-white underline-offset-2 decoration-2",
        modifiers.today && !isGreenFilled && !modifiers.range_middle && "underline decoration-[#006F42] underline-offset-2 decoration-2 text-[#006F42] font-semibold hover:bg-[#F3F4F6]",
        // default
        !isGreenFilled && !modifiers.today && !modifiers.range_middle && !modifiers.outside && !modifiers.disabled && "text-[#374151] hover:bg-[#F3F4F6]",
        // outside month
        modifiers.outside && "text-[#D1D5DB] hover:bg-transparent",
        // disabled
        modifiers.disabled && "text-[#D1D5DB] opacity-50 cursor-not-allowed pointer-events-none",
        className
      ),
      ...props
    }
  );
}
function DatePickerCalendar({
  mode = "single",
  selected,
  onSelect,
  disabled,
  defaultMonth,
  minDate,
  maxDate,
  className,
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave
}) {
  const today = React.useMemo(() => /* @__PURE__ */ new Date(), []);
  const initialMonth = defaultMonth ?? (selected instanceof Date ? selected : selected?.from) ?? today;
  const [viewMonth, setViewMonth] = React.useState(initialMonth);
  const yearOptions = React.useMemo(
    () => buildYearOptions(today.getFullYear()),
    [today]
  );
  const handlePrev = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const handleNext = () => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  const handleMonthSelect = (val) => setViewMonth(
    (prev) => new Date(prev.getFullYear(), Number(val), 1)
  );
  const handleYearSelect = (val) => setViewMonth((prev) => new Date(Number(val), prev.getMonth(), 1));
  const isPrevDisabled = !!minDate && new Date(viewMonth.getFullYear(), viewMonth.getMonth()) <= new Date(minDate.getFullYear(), minDate.getMonth());
  const isNextDisabled = !!maxDate && new Date(viewMonth.getFullYear(), viewMonth.getMonth()) >= new Date(maxDate.getFullYear(), maxDate.getMonth());
  return /* @__PURE__ */ jsxs("div", { className: cn("w-[360px] max-w-full bg-white", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 px-3 py-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handlePrev,
          disabled: isPrevDisabled,
          className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] text-[#374151] transition-colors hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-30",
          "aria-label": "Previous month",
          children: /* @__PURE__ */ jsx(ChevronLeft, { size: 14, strokeWidth: 2.5 })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-center gap-1.5", children: [
        /* @__PURE__ */ jsx(
          Select,
          {
            options: MONTH_OPTIONS,
            value: String(viewMonth.getMonth()),
            onChange: handleMonthSelect,
            size: "sm",
            className: "w-36"
          }
        ),
        /* @__PURE__ */ jsx(
          Select,
          {
            options: yearOptions,
            value: String(viewMonth.getFullYear()),
            onChange: handleYearSelect,
            size: "sm",
            className: "w-24"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: handleNext,
          disabled: isNextDisabled,
          className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] text-[#374151] transition-colors hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-30",
          "aria-label": "Next month",
          children: /* @__PURE__ */ jsx(ChevronRight, { size: 14, strokeWidth: 2.5 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsx(
      DayPicker,
      {
        mode,
        selected: selected ?? void 0,
        onSelect,
        month: viewMonth,
        onMonthChange: setViewMonth,
        hideNavigation: true,
        showOutsideDays: true,
        disabled,
        onDayClick,
        onDayMouseEnter,
        onDayMouseLeave,
        startMonth: minDate ? new Date(minDate.getFullYear(), minDate.getMonth()) : void 0,
        endMonth: maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth()) : void 0,
        classNames: {
          months: "flex flex-col",
          month: "flex flex-col gap-1",
          month_caption: "hidden",
          weekdays: "rdp-weekdays",
          weekday: "text-center text-[11px] font-medium text-[#9CA3AF] h-7 flex items-center justify-center select-none",
          weeks: "rdp-weeks flex flex-col gap-0.5",
          week: "rdp-week",
          day: "rdp-day flex items-center justify-center p-0 relative",
          day_button: "rdp-day_button",
          // dark green range band
          range_start: "bg-[linear-gradient(to_right,transparent_50%,#006F42_50%)]",
          range_middle: "bg-[#006F42]",
          range_end: "bg-[linear-gradient(to_right,#006F42_50%,transparent_50%)]",
          selected: "",
          today: "",
          outside: "",
          disabled: "",
          hidden: "invisible"
        },
        components: {
          DayButton: StyledDayButton
        }
      }
    ) })
  ] });
}

export { DatePickerCalendar };
//# sourceMappingURL=DatePickerCalendar.js.map
//# sourceMappingURL=DatePickerCalendar.js.map