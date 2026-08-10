"use client";
import * as React4 from 'react';
import { useMemo } from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight, Check, X, ArrowUpAZ, ArrowDownAZ, Lock, CircleAlert, ChevronDown, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Fuse from 'fuse.js';
import { Popover as Popover$1, Label as Label$1 } from 'radix-ui';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { cva } from 'class-variance-authority';
import { CommandList as CommandList$1, Command as Command$1, CommandInput as CommandInput$1, CommandItem as CommandItem$1 } from 'cmdk';

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
var FilterGroupMobileContext = React4.createContext(false);
React4.createContext(null);
var ZIndexContext = React4.createContext({ popover: 20 });
function useZIndex() {
  return React4.useContext(ZIndexContext);
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  style,
  children,
  ...props
}) {
  const { popover } = useZIndex();
  return /* @__PURE__ */ jsx(Popover$1.Portal, { children: /* @__PURE__ */ jsx(
    Popover$1.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "uengage-ui",
        "min-w-[8rem] overflow-hidden rounded-[4px] border border-[#E5E7EB] bg-white p-0 shadow-md outline-none",
        className
      ),
      style: { zIndex: popover, ...style },
      ...props,
      children: /* @__PURE__ */ jsx(FilterGroupMobileContext.Provider, { value: false, children })
    }
  ) });
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Label$1.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
var INPUT_SIZES = {
  xs: { height: 28, padX: 9, font: 12, icon: 13, radius: 6, label: 11, message: 10 },
  sm: { height: 32, padX: 11, font: 12, icon: 14, radius: 8, label: 12, message: 11 },
  md: { height: 40, padX: 13, font: 13, icon: 16, radius: 8, label: 12, message: 11 },
  lg: { height: 48, padX: 15, font: 14, icon: 18, radius: 8, label: 13, message: 11 }
};
var INPUT_TRANSITION = "border-color 120ms linear, box-shadow 120ms linear, background-color 120ms linear";
var INPUT_COLORS = {
  surface: "#FFFFFF",
  subtle: "#F3F5F9",
  border: "#E2E2E2",
  borderHover: "#C6C6C6",
  borderFocus: "#1F5E2C",
  /** 3px lime halo that pairs with `borderFocus`. */
  ring: "0 0 0 3px rgba(140,196,42,.28)",
  value: "#161616",
  placeholder: "#9C9C9C",
  message: "#9C9C9C",
  icon: "#1F5E2C",
  successBorder: "#00A86B",
  successInk: "#00A86B",
  warningBg: "#FFF6D6",
  warningBorder: "#EFD98A",
  warningInk: "#6A5300",
  errorBg: "#FBE9EA",
  errorBorder: "#A8000F",
  errorInk: "#7A0009",
  errorLabel: "#A8000F",
  readOnlyBg: "#FAFFF7",
  disabledBg: "#F3F5F9",
  disabledInk: "#9C9C9C",
  validatingInk: "#595959"
};
function getInputBoxStyle(state) {
  const c = INPUT_COLORS;
  const hairline = `1px solid ${c.border}`;
  switch (state) {
    case "hover":
      return {
        background: c.surface,
        border: `1px solid ${c.borderHover}`,
        boxShadow: "none",
        color: c.value
      };
    case "focused":
      return {
        background: c.surface,
        border: `1px solid ${c.borderFocus}`,
        boxShadow: c.ring,
        color: c.value
      };
    case "validating":
      return {
        background: c.surface,
        border: `1px solid ${c.borderFocus}`,
        boxShadow: "none",
        color: c.value
      };
    case "success":
      return {
        background: c.surface,
        border: `1px solid ${c.successBorder}`,
        boxShadow: "none",
        color: c.value
      };
    case "warning":
      return {
        background: c.warningBg,
        border: `1px solid ${c.warningBorder}`,
        boxShadow: "none",
        color: c.value
      };
    case "error":
      return {
        background: c.errorBg,
        border: `1px solid ${c.errorBorder}`,
        boxShadow: "none",
        color: c.errorInk
      };
    case "readonly":
      return {
        background: c.readOnlyBg,
        border: hairline,
        boxShadow: "none",
        color: c.value,
        cursor: "default"
      };
    case "loading":
      return {
        background: c.disabledBg,
        border: hairline,
        boxShadow: "none",
        color: c.disabledInk,
        cursor: "progress"
      };
    case "disabled":
      return {
        background: c.disabledBg,
        border: hairline,
        boxShadow: "none",
        color: c.disabledInk,
        cursor: "not-allowed"
      };
    default:
      return {
        background: c.surface,
        border: hairline,
        boxShadow: "none",
        color: c.value
      };
  }
}
function getLabelColor(state) {
  if (state === "error") return INPUT_COLORS.errorLabel;
  if (state === "disabled") return INPUT_COLORS.disabledInk;
  return INPUT_COLORS.value;
}
function getMessageColor(state, hasError) {
  if (hasError) return INPUT_COLORS.errorInk;
  switch (state) {
    case "success":
      return INPUT_COLORS.successInk;
    case "warning":
      return INPUT_COLORS.warningInk;
    case "validating":
      return INPUT_COLORS.validatingInk;
    default:
      return INPUT_COLORS.message;
  }
}
var INERT_SIZE = { xs: "", sm: "", md: "", lg: "" };
var INERT_STATE = {
  default: "",
  hover: "",
  focused: "",
  error: "",
  success: "",
  warning: "",
  validating: "",
  loading: "",
  disabled: "",
  readonly: ""
};
cva(
  "relative flex w-full min-w-0",
  {
    variants: {
      multiline: {
        false: "items-center",
        true: "items-start"
      },
      appearance: {
        default: "",
        underline: "bg-transparent"
      },
      /** @deprecated Inert — sizing is applied inline. */
      size: INERT_SIZE,
      /** @deprecated Inert — state colours are applied inline. */
      state: INERT_STATE
    },
    defaultVariants: { multiline: false, appearance: "default" }
  }
);
cva(
  "w-full min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-100",
  {
    variants: {
      multiline: {
        false: "h-full",
        true: "block"
      },
      align: {
        left: "text-left",
        right: "text-right"
      },
      /** @deprecated Inert — sizing is applied inline. */
      size: INERT_SIZE,
      /** @deprecated Inert — the field no longer carries appearance classes. */
      appearance: { default: "", underline: "" },
      /** @deprecated Inert — affixes are laid out with flexbox, not padding. */
      hasLeftIcon: { true: "", false: "" },
      /** @deprecated Inert — affixes are laid out with flexbox, not padding. */
      hasRightIcon: { true: "", false: "" }
    },
    defaultVariants: { multiline: false, align: "left" }
  }
);
cva("absolute inset-y-0 flex items-center", {
  variants: {
    side: { left: "left-0", right: "right-0" },
    /** @deprecated Inert — kept so existing calls keep type-checking. */
    size: INERT_SIZE,
    /** @deprecated Inert — kept so existing calls keep type-checking. */
    multiline: { true: "", false: "" }
  },
  defaultVariants: { side: "left" }
});
var SIZE_TEXT = {
  xs: "text-[11px]",
  sm: "text-[12px]",
  md: "text-[12px]",
  lg: "text-[13px]"
};
function InputLabel({
  size = "md",
  required = false,
  tone,
  className,
  style,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Label,
    {
      className: cn(
        "font-semibold leading-[1.3] text-[#161616]",
        SIZE_TEXT[size],
        className
      ),
      style: tone ? { color: tone, ...style } : style,
      ...props,
      children: /* @__PURE__ */ jsxs("span", { className: "inline text-pretty", children: [
        children,
        required && /* @__PURE__ */ jsx("span", { "aria-hidden": "true", style: { color: INPUT_COLORS.errorLabel }, children: "*" })
      ] })
    }
  );
}
InputLabel.displayName = "InputLabel";
function InputHelper({
  size = "md",
  helperText,
  error,
  state = "default",
  reserveSpace = false,
  className,
  style,
  ...props
}) {
  const showError = Boolean(error);
  const text = showError ? error : helperText;
  if (!text && !reserveSpace) return null;
  const fontSize = INPUT_SIZES[size].message;
  return /* @__PURE__ */ jsxs(
    "p",
    {
      role: showError ? "alert" : void 0,
      className: cn("inline-flex items-start gap-[5px] leading-[1.4]", className),
      style: {
        fontSize,
        minHeight: Math.round(fontSize * 1.45),
        color: getMessageColor(state, showError),
        ...style
      },
      ...props,
      children: [
        showError && /* @__PURE__ */ jsx(
          CircleAlert,
          {
            "aria-hidden": "true",
            strokeWidth: 2.2,
            className: "shrink-0",
            style: { width: fontSize + 1, height: fontSize + 1, marginTop: 1 }
          }
        ),
        text && /* @__PURE__ */ jsx("span", { children: text })
      ]
    }
  );
}
InputHelper.displayName = "InputHelper";
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
var CommandList = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CommandList$1,
  {
    ref,
    "data-slot": "command-list",
    className: cn("max-h-60 overflow-y-auto overflow-x-hidden py-1", className),
    ...props
  }
));
CommandList.displayName = "CommandList";
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
var SELECT_SIZES = {
  xs: { height: 28, padLeft: 9, padRight: 8, padMultiY: 3, font: 12, icon: 13, option: 28, radius: 8, label: 11 },
  sm: { height: 32, padLeft: 11, padRight: 9, padMultiY: 4, font: 12, icon: 14, option: 30, radius: 8, label: 12 },
  md: { height: 40, padLeft: 13, padRight: 11, padMultiY: 6, font: 13, icon: 15, option: 34, radius: 8, label: 12 },
  lg: { height: 48, padLeft: 15, padRight: 13, padMultiY: 8, font: 14, icon: 17, option: 38, radius: 8, label: 13 }
};
var SELECT_GAP = 9;
var MENU = {
  /** 4px inset padding around the option list. */
  padding: 4,
  radius: 8,
  optionRadius: 6,
  border: `1px solid ${INPUT_COLORS.border}`,
  background: INPUT_COLORS.surface,
  shadow: "2px 2px 4px rgba(0,0,0,.12)",
  /** Selected row: mint fill with a check, never a blue bar. */
  selectedBg: "#DCF3CE",
  selectedInk: "#003C1B",
  /** A checked row in a multi select gets the lighter wash, not the mint fill. */
  multiSelectedBg: "#FAFFF7",
  checkboxOn: "#003C1B",
  checkboxOff: INPUT_COLORS.borderHover,
  /** Group eyebrow + the hairline that separates groups. */
  groupInk: INPUT_COLORS.message,
  groupRule: "#EEEEEE",
  metaInk: INPUT_COLORS.message,
  /** Long lists cap at 8 rows and scroll. */
  maxRows: 8
};
function getTriggerStyle(state) {
  return getInputBoxStyle(state === "open" ? "focused" : state);
}
var triggerVariants = cva(
  [
    "flex min-w-0 items-center justify-between",
    "cursor-pointer select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      state: {
        default: "",
        open: "",
        disabled: "pointer-events-none",
        readonly: "cursor-default pointer-events-none",
        hover: "",
        focused: "",
        error: "",
        success: "",
        warning: "",
        validating: "",
        loading: "pointer-events-none"
      },
      size: { xs: "", sm: "", md: "", lg: "" }
    },
    defaultVariants: { state: "default", size: "md" }
  }
);
var CREATE_VALUE = "__create__";
function CheckboxIcon({ checked }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: "flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[3px]",
      style: {
        background: checked ? MENU.checkboxOn : "transparent",
        border: `1.5px solid ${checked ? MENU.checkboxOn : MENU.checkboxOff}`,
        transition: "background 120ms linear, border-color 120ms linear"
      },
      children: checked && /* @__PURE__ */ jsx(Check, { size: 9, strokeWidth: 3.5, className: "text-white" })
    }
  );
}
function Spinner({ size }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "shrink-0 animate-spin rounded-full",
      style: {
        width: size,
        height: size,
        border: `2px solid ${INPUT_COLORS.border}`,
        borderTopColor: INPUT_COLORS.borderFocus
      }
    }
  );
}
function LoadingRows({ height }) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1 p-1", "aria-busy": "true", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx(
    "span",
    {
      className: "animate-pulse",
      style: {
        height,
        borderRadius: MENU.optionRadius,
        background: INPUT_COLORS.subtle,
        opacity: 1 - i * 0.22
      }
    },
    i
  )) });
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
  placement = "auto"
}) {
  const isMobileDrawer = React4.useContext(FilterGroupMobileContext);
  const touchedRef = React4.useRef(false);
  const interactedRef = React4.useRef(false);
  const resolvedMode = multiple ? "multi" : mode;
  const searchEnabled = searchable ?? searchProp;
  const spec = SELECT_SIZES[size];
  const resolvedOptions = React4.useMemo(() => {
    if (items && getLabel && getValue) {
      return items.map((item) => ({
        label: getLabel(item),
        value: getValue(item),
        disabled: getDisabled ? getDisabled(item) : false
      }));
    }
    return options ?? [];
  }, [items, getLabel, getValue, getDisabled, options]);
  const [open, setOpen] = React4.useState(false);
  const [hovered, setHovered] = React4.useState(false);
  const [searchQuery, setSearchQuery] = React4.useState("");
  const [sortOrder, setSortOrder] = React4.useState("asc");
  const listRef = React4.useRef(null);
  React4.useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [sortOrder]);
  const sortedOptions = React4.useMemo(() => {
    if (!sorting) return resolvedOptions;
    return [...resolvedOptions].sort(
      (a, b) => sortOrder === "asc" ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)
    );
  }, [resolvedOptions, sorting, sortOrder]);
  const fuseFilteredOptions = useFuzzySearch(sortedOptions, searchQuery);
  const visibleOptions = React4.useMemo(() => {
    if (!searchEnabled) return sortedOptions;
    const q = searchQuery.trim();
    if (indexing && /^\d+$/.test(q)) {
      const n = parseInt(q, 10);
      const opt = sortedOptions[n - 1];
      return opt ? [opt] : [];
    }
    return fuseFilteredOptions;
  }, [searchEnabled, searchQuery, indexing, sortedOptions, fuseFilteredOptions]);
  const [selected, setSelected] = React4.useState(
    controlledValue ?? defaultValue ?? (resolvedMode === "multi" ? [] : "")
  );
  React4.useEffect(() => {
    if (controlledValue !== void 0) setSelected(controlledValue);
  }, [controlledValue]);
  const selectedArr = resolvedMode === "multi" ? Array.isArray(selected) ? selected : [] : [];
  const enabledOptions = sortedOptions.filter((o) => !o.disabled);
  const allSelected = enabledOptions.length > 0 && enabledOptions.every((o) => selectedArr.includes(o.value));
  const isSelected = (val) => resolvedMode === "single" ? selected === val : selectedArr.includes(val);
  const commit = (next) => {
    if (controlledValue === void 0) setSelected(next);
    onChange?.(next);
  };
  const handleSelect = (val) => {
    if (resolvedMode === "single") {
      commit(val);
      setOpen(false);
    } else {
      commit(
        selectedArr.includes(val) ? selectedArr.filter((v) => v !== val) : [...selectedArr, val]
      );
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
    commit(resolvedMode === "multi" ? [] : "");
  };
  const pillsContainerRef = React4.useRef(null);
  const [visibleCount, setVisibleCount] = React4.useState(null);
  React4.useLayoutEffect(() => {
    if (resolvedMode === "multi") setVisibleCount(null);
  }, [selectedArr.join(","), resolvedMode]);
  React4.useLayoutEffect(() => {
    if (visibleCount !== null) return;
    if (maxChips !== void 0) {
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
  }, [visibleCount, maxChips]);
  const displayedPills = visibleCount === null ? selectedArr : selectedArr.slice(0, visibleCount);
  const overflowCount = visibleCount === null ? 0 : selectedArr.length - visibleCount;
  const hasSelection = resolvedMode === "multi" ? selectedArr.length > 0 : !!selected;
  const singleLabel = resolvedMode === "single" ? resolvedOptions.find((o) => o.value === selected)?.label : void 0;
  const state = disabled ? "disabled" : loading ? "loading" : readOnly ? "readonly" : error ? "error" : open ? "open" : status === "success" ? "success" : status === "warning" ? "warning" : hovered ? "hover" : "default";
  const box = getTriggerStyle(state);
  const showChevron = !readOnly && !loading;
  const legacyState = state === "disabled" ? "disabled" : state === "readonly" ? "readonly" : state === "open" ? "open" : "default";
  const handleOpenChange = (next) => {
    if (disabled || readOnly || loading) return;
    setOpen(next);
    if (!next) setSearchQuery("");
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
  const handleSearchChange = (q) => {
    setSearchQuery(q);
    onSearch?.(q);
  };
  if (isMobileDrawer) {
    return /* @__PURE__ */ jsx("ul", { className: "divide-y divide-gray-100", children: resolvedOptions.map((opt) => {
      const rowSelected = isSelected(opt.value);
      return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          disabled: opt.disabled,
          onClick: () => !opt.disabled && handleSelect(opt.value),
          className: cn(
            "flex w-full items-center justify-between px-4 py-4 text-sm transition-colors",
            rowSelected ? "font-semibold text-[#003C1B]" : "font-normal text-gray-800",
            opt.disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-[#FAFFF7] active:bg-[#DCF3CE]"
          ),
          children: [
            /* @__PURE__ */ jsx("span", { children: opt.label }),
            rowSelected && /* @__PURE__ */ jsx(Check, { size: 16, strokeWidth: 2.5, className: "shrink-0 text-[#003C1B]" })
          ]
        }
      ) }, opt.value);
    }) });
  }
  const query = searchQuery.trim();
  const exactMatch = visibleOptions.some(
    (o) => o.label.toLowerCase() === query.toLowerCase()
  );
  const showCreate = creatable && query.length > 0 && !exactMatch;
  const showEmpty = visibleOptions.length === 0 && !showCreate;
  const groups = React4.useMemo(() => {
    const out = [];
    for (const opt of visibleOptions) {
      const name = opt.group ?? null;
      const last = out[out.length - 1];
      if (last && last.name === name) last.options.push(opt);
      else out.push({ name, options: [opt] });
    }
    return out;
  }, [visibleOptions]);
  const renderOption = (option) => {
    const checked = isSelected(option.value);
    const isMulti = resolvedMode === "multi";
    const rich = Boolean(option.description || option.icon);
    const originalIdx = sortedOptions.findIndex((o) => o.value === option.value);
    return /* @__PURE__ */ jsxs(
      CommandItem,
      {
        value: option.value,
        disabled: option.disabled,
        "aria-selected": checked,
        onSelect: () => handleSelect(option.value),
        className: cn(
          "group/opt cursor-pointer data-[disabled=true]:cursor-not-allowed",
          rich ? "items-start" : "items-center"
        ),
        style: {
          minHeight: rich ? 44 : spec.option,
          gap: SELECT_GAP,
          padding: rich ? "7px 10px" : "0 10px",
          borderRadius: MENU.optionRadius,
          fontSize: spec.font,
          lineHeight: 1.3,
          background: checked ? isMulti ? MENU.multiSelectedBg : MENU.selectedBg : "transparent",
          color: checked && !isMulti ? MENU.selectedInk : INPUT_COLORS.value,
          fontWeight: checked && !isMulti ? 600 : 500,
          opacity: option.disabled ? 0.55 : 1
        },
        children: [
          isMulti && /* @__PURE__ */ jsx(CheckboxIcon, { checked }),
          indexing && /* @__PURE__ */ jsxs("span", { className: "shrink-0 tabular-nums", style: { color: MENU.metaInk }, children: [
            originalIdx + 1,
            "."
          ] }),
          option.icon && /* @__PURE__ */ jsx("span", { className: "flex shrink-0 items-center", children: option.icon }),
          /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate", children: option.label }),
            option.description && /* @__PURE__ */ jsx("span", { style: { fontSize: spec.font - 2, fontWeight: 400, color: MENU.metaInk }, children: option.description })
          ] }),
          option.meta && /* @__PURE__ */ jsx(
            "span",
            {
              className: "shrink-0 whitespace-nowrap",
              style: { fontSize: spec.font - 2, fontWeight: 500, color: MENU.metaInk },
              children: option.meta
            }
          ),
          !isMulti && checked && /* @__PURE__ */ jsx(Check, { size: 14, strokeWidth: 2.8, className: "shrink-0", color: MENU.selectedInk })
        ]
      },
      option.value
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5", children: [
    label && /* @__PURE__ */ jsx(
      InputLabel,
      {
        size,
        required,
        tone: state === "error" || state === "disabled" ? getLabelColor(state) : void 0,
        children: label
      }
    ),
    /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
      /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
        "div",
        {
          role: "button",
          "data-slot": "select-trigger",
          "data-size": size,
          "data-state": state,
          tabIndex: disabled ? -1 : 0,
          "aria-disabled": disabled,
          "aria-haspopup": "listbox",
          "aria-expanded": open,
          "aria-busy": loading || void 0,
          onPointerEnter: () => setHovered(true),
          onPointerLeave: () => setHovered(false),
          onFocus: () => {
            interactedRef.current = true;
          },
          onBlur: handleTriggerBlur,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!disabled && !readOnly && !loading) setOpen((o) => !o);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          },
          className: cn(
            triggerVariants({ state: legacyState, size }),
            width,
            className
          ),
          style: {
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
            transition: INPUT_TRANSITION
          },
          children: [
            leftIcon && /* @__PURE__ */ jsx(
              "span",
              {
                className: "flex shrink-0 items-center justify-center [&>svg]:size-full",
                style: { width: spec.icon + 1, height: spec.icon + 1, color: INPUT_COLORS.icon },
                children: leftIcon
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: resolvedMode === "multi" ? pillsContainerRef : void 0,
                className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
                children: resolvedMode === "multi" ? selectedArr.length > 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  displayedPills.map((val) => {
                    const opt = resolvedOptions.find((o) => o.value === val);
                    if (!opt) return null;
                    return /* @__PURE__ */ jsxs(
                      "span",
                      {
                        "data-pill": true,
                        className: "inline-flex max-w-[140px] shrink-0 items-center gap-1 rounded-full font-semibold",
                        style: {
                          padding: clearable ? "4px 4px 4px 10px" : "4px 10px",
                          background: MENU.selectedBg,
                          color: MENU.selectedInk,
                          fontSize: spec.font - 2
                        },
                        children: [
                          /* @__PURE__ */ jsx("span", { className: "truncate", children: opt.label }),
                          clearable && /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              tabIndex: -1,
                              onClick: (e) => removePill(val, e),
                              "aria-label": `Remove ${opt.label}`,
                              className: "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full transition-colors",
                              style: { background: "rgba(0,60,27,.1)", color: MENU.selectedInk },
                              children: /* @__PURE__ */ jsx(X, { size: 8, strokeWidth: 3.4 })
                            }
                          )
                        ]
                      },
                      val
                    );
                  }),
                  overflowCount > 0 && /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
                      style: {
                        padding: "4px 8px",
                        background: INPUT_COLORS.subtle,
                        color: INPUT_COLORS.message,
                        fontSize: spec.font - 2
                      },
                      children: [
                        "+",
                        overflowCount
                      ]
                    }
                  )
                ] }) : /* @__PURE__ */ jsx("span", { className: "truncate", style: { color: INPUT_COLORS.placeholder }, children: placeholder }) : /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "truncate",
                    style: {
                      color: singleLabel ? box.color : INPUT_COLORS.placeholder
                    },
                    children: singleLabel ?? placeholder
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center", style: { gap: 6 }, children: [
              clearable && hasSelection && !readOnly && !disabled && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  tabIndex: -1,
                  onClick: clearAll,
                  "aria-label": "Clear selection",
                  className: "flex shrink-0 items-center justify-center rounded-full transition-colors",
                  style: {
                    width: spec.icon + 4,
                    height: spec.icon + 4,
                    background: INPUT_COLORS.subtle,
                    color: INPUT_COLORS.message
                  },
                  children: /* @__PURE__ */ jsx(X, { size: spec.icon - 6, strokeWidth: 3 })
                }
              ),
              sorting && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  tabIndex: -1,
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSortOrder((o) => o === "asc" ? "desc" : "asc");
                  },
                  disabled,
                  "aria-label": sortOrder === "asc" ? "Sorted A\u2192Z, click for Z\u2192A" : "Sorted Z\u2192A, click for A\u2192Z",
                  className: "flex items-center transition-colors",
                  style: { color: INPUT_COLORS.message },
                  children: sortOrder === "asc" ? /* @__PURE__ */ jsx(ArrowUpAZ, { size: spec.icon - 1, strokeWidth: 2 }) : /* @__PURE__ */ jsx(ArrowDownAZ, { size: spec.icon - 1, strokeWidth: 2 })
                }
              ),
              loading && /* @__PURE__ */ jsx(Spinner, { size: spec.icon - 2 }),
              state === "readonly" && /* @__PURE__ */ jsx(Lock, { size: spec.icon - 2, strokeWidth: 2, color: INPUT_COLORS.placeholder }),
              state === "error" && /* @__PURE__ */ jsx(CircleAlert, { size: spec.icon, strokeWidth: 2.2, color: INPUT_COLORS.errorInk }),
              state === "warning" && /* @__PURE__ */ jsx(CircleAlert, { size: spec.icon, strokeWidth: 2.2, color: INPUT_COLORS.warningInk }),
              state === "success" && /* @__PURE__ */ jsx(Check, { size: spec.icon, strokeWidth: 2.6, color: INPUT_COLORS.successInk }),
              showChevron && /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  size: spec.icon,
                  strokeWidth: 2,
                  className: "transition-transform duration-[120ms]",
                  style: {
                    color: disabled ? INPUT_COLORS.borderHover : INPUT_COLORS.placeholder,
                    transform: open ? "rotate(180deg)" : "rotate(0deg)"
                  }
                }
              )
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        PopoverContent,
        {
          side: placement === "auto" ? "bottom" : placement,
          className: "max-w-[calc(100vw-1rem)] border-0 p-0 shadow-none",
          collisionPadding: { top: 64 },
          style: { width: "var(--radix-popover-trigger-width)" },
          children: /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                padding: MENU.padding,
                borderRadius: MENU.radius,
                border: MENU.border,
                background: MENU.background,
                boxShadow: MENU.shadow
              },
              children: /* @__PURE__ */ jsxs(Command, { shouldFilter: false, children: [
                searchEnabled && !loading && /* @__PURE__ */ jsx(
                  CommandInput,
                  {
                    placeholder: "Search...",
                    value: searchQuery,
                    onValueChange: handleSearchChange,
                    spellCheck,
                    style: { fontSize: spec.font }
                  }
                ),
                resolvedMode === "multi" && !loading && visibleOptions.length > 0 && /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "sticky top-0 z-10 flex items-center justify-between",
                    style: {
                      padding: "6px 10px",
                      background: MENU.background,
                      borderBottom: `1px solid ${MENU.groupRule}`,
                      fontSize: spec.font - 2,
                      color: INPUT_COLORS.message
                    },
                    children: [
                      /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
                        selectedArr.length,
                        " selected"
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => commit(enabledOptions.map((o) => o.value)),
                            disabled: allSelected,
                            className: "font-semibold disabled:opacity-40",
                            style: { color: MENU.selectedInk },
                            children: "All"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { style: { color: MENU.groupRule }, children: "|" }),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => commit([]),
                            disabled: selectedArr.length === 0,
                            className: "font-semibold disabled:opacity-40",
                            style: { color: INPUT_COLORS.message },
                            children: "None"
                          }
                        )
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  CommandList,
                  {
                    ref: listRef,
                    style: { maxHeight: MENU.maxRows * spec.option + MENU.padding * 2 },
                    children: loading ? /* @__PURE__ */ jsx(LoadingRows, { height: spec.option }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      groups.map((group, gi) => /* @__PURE__ */ jsxs(
                        "div",
                        {
                          style: gi > 0 && group.name ? { borderTop: `1px solid ${MENU.groupRule}`, marginTop: 4, paddingTop: 4 } : void 0,
                          children: [
                            group.name && /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "sticky top-0 z-[5] font-semibold uppercase",
                                style: {
                                  padding: "6px 10px 4px",
                                  background: MENU.background,
                                  fontSize: 10,
                                  letterSpacing: "0.09em",
                                  color: MENU.groupInk
                                },
                                children: group.name
                              }
                            ),
                            group.options.map(renderOption)
                          ]
                        },
                        group.name ?? `__ungrouped_${gi}`
                      )),
                      showCreate && /* @__PURE__ */ jsxs(
                        CommandItem,
                        {
                          value: CREATE_VALUE,
                          onSelect: () => {
                            onCreate?.(query);
                            setOpen(false);
                          },
                          className: "cursor-pointer",
                          style: {
                            minHeight: spec.option,
                            gap: SELECT_GAP,
                            padding: "0 10px",
                            marginTop: 4,
                            borderTop: `1px solid ${MENU.groupRule}`,
                            borderRadius: MENU.optionRadius,
                            fontSize: spec.font,
                            fontWeight: 600,
                            color: MENU.selectedInk
                          },
                          children: [
                            /* @__PURE__ */ jsx(Plus, { size: 14, strokeWidth: 2.4, className: "shrink-0" }),
                            /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
                              "Create \u201C",
                              query,
                              "\u201D"
                            ] })
                          ]
                        }
                      ),
                      showEmpty && /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "flex flex-col items-start gap-1",
                          style: { padding: "14px 10px", fontSize: spec.font },
                          children: emptyState ?? /* @__PURE__ */ jsx("span", { style: { color: INPUT_COLORS.message }, children: "No results found." })
                        }
                      )
                    ] })
                  }
                )
              ] })
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      InputHelper,
      {
        size,
        state: state === "open" ? "focused" : state,
        helperText: error ?? (status && statusMessage) ?? helperText,
        error
      }
    )
  ] });
}
Select.displayName = "Select";
var MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
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
function buildYearOptions(center, minYear, maxYear) {
  const from = minYear ?? center - 10;
  const to = maxYear ?? center + 10;
  const opts = [];
  for (let y = from; y <= to; y++) {
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
  const ref = React4.useRef(null);
  React4.useEffect(() => {
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
  const today = React4.useMemo(() => /* @__PURE__ */ new Date(), []);
  const clampedToday = maxDate && today > maxDate ? maxDate : minDate && today < minDate ? minDate : today;
  const initialMonth = defaultMonth ?? (selected instanceof Date ? selected : selected?.from) ?? clampedToday;
  const [viewMonth, setViewMonth] = React4.useState(initialMonth);
  const yearOptions = React4.useMemo(
    () => buildYearOptions(
      today.getFullYear(),
      minDate?.getFullYear(),
      maxDate?.getFullYear()
    ),
    [today, minDate, maxDate]
  );
  const monthOptions = React4.useMemo(() => {
    const year = viewMonth.getFullYear();
    return MONTH_OPTIONS.map((opt) => {
      const month = Number(opt.value);
      const isDisabled = !!minDate && year === minDate.getFullYear() && month < minDate.getMonth() || !!maxDate && year === maxDate.getFullYear() && month > maxDate.getMonth();
      return isDisabled ? { ...opt, disabled: true } : opt;
    });
  }, [viewMonth, minDate, maxDate]);
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
            options: monthOptions,
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
    /* @__PURE__ */ jsxs("div", { className: "px-3 pb-3", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 mb-1", children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex h-7 items-center justify-center text-[11px] font-medium text-[#9CA3AF] select-none",
          children: d
        },
        d
      )) }),
      /* @__PURE__ */ jsx(
        DayPicker,
        {
          mode,
          selected: selected ?? void 0,
          onSelect: onSelect ?? (() => {
          }),
          month: viewMonth,
          onMonthChange: setViewMonth,
          hideNavigation: true,
          hideWeekdays: true,
          showOutsideDays: true,
          disabled,
          onDayClick,
          onDayMouseEnter,
          onDayMouseLeave,
          startMonth: minDate ? new Date(minDate.getFullYear(), minDate.getMonth()) : void 0,
          endMonth: maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth()) : void 0,
          classNames: {
            months: "flex flex-col w-full",
            month: "flex flex-col gap-1 w-full",
            month_caption: "hidden",
            weeks: "flex flex-col gap-0.5 w-full",
            week: "grid grid-cols-7 w-full",
            day: "flex items-center justify-center p-0 relative",
            day_button: "",
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            MonthGrid: ({ children, ...props }) => /* @__PURE__ */ jsx("div", { ...props, children }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Weeks: ({ children, ...props }) => /* @__PURE__ */ jsx("div", { ...props, children }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Week: ({ week: _week, children, ...props }) => /* @__PURE__ */ jsx("div", { ...props, children }),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Day: ({ day: _day, modifiers: _modifiers, children, ...props }) => /* @__PURE__ */ jsx("div", { ...props, children }),
            DayButton: StyledDayButton
          }
        }
      )
    ] })
  ] });
}
function MonthPickerCalendar({
  selected,
  minDate,
  maxDate,
  onSelect,
  className
}) {
  const today = React4.useMemo(() => /* @__PURE__ */ new Date(), []);
  const [viewYear, setViewYear] = React4.useState(
    selected?.getFullYear() ?? today.getFullYear()
  );
  const yearOptions = React4.useMemo(() => {
    const center = today.getFullYear();
    const minYear = minDate ? minDate.getFullYear() : center - 10;
    const maxYear = maxDate ? maxDate.getFullYear() : center + 10;
    const opts = [];
    for (let y = minYear; y <= maxYear; y++) {
      opts.push({ label: String(y), value: String(y) });
    }
    return opts;
  }, [today, minDate, maxDate]);
  return /* @__PURE__ */ jsxs("div", { className: cn("w-[280px] max-w-full bg-white", className), children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center px-3 py-2", children: /* @__PURE__ */ jsx(
      Select,
      {
        options: yearOptions,
        value: String(viewYear),
        onChange: (val) => setViewYear(Number(val)),
        size: "sm",
        className: "w-28"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1.5 px-3 pb-3", children: MONTH_LABELS.map((label, i) => {
      const isSelected = !!selected && selected.getFullYear() === viewYear && selected.getMonth() === i;
      const isToday = today.getFullYear() === viewYear && today.getMonth() === i;
      const isDisabled = !!minDate && new Date(viewYear, i) < new Date(minDate.getFullYear(), minDate.getMonth()) || !!maxDate && new Date(viewYear, i) > new Date(maxDate.getFullYear(), maxDate.getMonth());
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          disabled: isDisabled,
          onClick: () => onSelect(new Date(viewYear, i, 1)),
          className: cn(
            "h-9 rounded-lg text-sm font-medium transition-colors select-none",
            isSelected && "bg-[#006F42] text-white",
            isToday && !isSelected && "underline decoration-[#006F42] decoration-2 underline-offset-2 text-[#006F42] font-semibold hover:bg-[#F3F4F6]",
            !isSelected && !isToday && !isDisabled && "text-[#374151] hover:bg-[#F3F4F6]",
            isDisabled && "text-[#D1D5DB] opacity-50 cursor-not-allowed"
          ),
          children: label
        },
        label
      );
    }) })
  ] });
}

export { DatePickerCalendar, MonthPickerCalendar };
//# sourceMappingURL=DatePickerCalendar.js.map
//# sourceMappingURL=DatePickerCalendar.js.map