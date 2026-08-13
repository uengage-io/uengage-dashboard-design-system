"use client";
'use strict';

var React4 = require('react');
var reactDayPicker = require('react-day-picker');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var lucideReact = require('lucide-react');
var Fuse = require('fuse.js');
var radixUi = require('radix-ui');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var cmdk = require('cmdk');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React4__namespace = /*#__PURE__*/_interopNamespace(React4);
var Fuse__default = /*#__PURE__*/_interopDefault(Fuse);

// src/components/ui/DatePickerCalendar.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
function useFuzzySearch(items, query) {
  const fuse = React4.useMemo(
    () => new Fuse__default.default(items, {
      keys: ["label"],
      threshold: 0.35,
      minMatchCharLength: 1,
      ignoreLocation: true,
      shouldSort: true
    }),
    [items]
  );
  return React4.useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    return fuse.search(q).map((r) => r.item);
  }, [fuse, query, items]);
}
var FilterGroupMobileContext = React4__namespace.createContext(false);
React4__namespace.createContext(null);
var ZIndexContext = React4__namespace.createContext({ popover: 20 });
function useZIndex() {
  return React4__namespace.useContext(ZIndexContext);
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Trigger, { "data-slot": "popover-trigger", ...props });
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
  return /* @__PURE__ */ jsxRuntime.jsx(radixUi.Popover.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Popover.Content,
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
      children: /* @__PURE__ */ jsxRuntime.jsx(FilterGroupMobileContext.Provider, { value: false, children })
    }
  ) });
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    radixUi.Label.Root,
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
classVarianceAuthority.cva(
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
classVarianceAuthority.cva(
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
classVarianceAuthority.cva("absolute inset-y-0 flex items-center", {
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    Label,
    {
      className: cn(
        "font-semibold leading-[1.3] text-[#161616]",
        SIZE_TEXT[size],
        className
      ),
      style: tone ? { color: tone, ...style } : style,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "inline text-pretty", children: [
        children,
        required && /* @__PURE__ */ jsxRuntime.jsx("span", { "aria-hidden": "true", style: { color: INPUT_COLORS.errorLabel }, children: "*" })
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
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
        showError && /* @__PURE__ */ jsxRuntime.jsx(
          lucideReact.CircleAlert,
          {
            "aria-hidden": "true",
            strokeWidth: 2.2,
            className: "shrink-0",
            style: { width: fontSize + 1, height: fontSize + 1, marginTop: 1 }
          }
        ),
        text && /* @__PURE__ */ jsxRuntime.jsx("span", { children: text })
      ]
    }
  );
}
InputHelper.displayName = "InputHelper";
function Command({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command,
    {
      "data-slot": "command",
      className: cn("uengage-ui flex h-full w-full flex-col overflow-hidden bg-white text-[#111827]", className),
      ...props
    }
  );
}
function CommandInput({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "uengage-ui flex items-center border-b border-[#E5E7EB] px-3", children: /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.CommandInput,
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
var CommandList = React4__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
  cmdk.CommandList,
  {
    ref,
    "data-slot": "command-list",
    className: cn("max-h-60 overflow-y-auto overflow-x-hidden py-1", className),
    ...props
  }
));
CommandList.displayName = "CommandList";
function CommandItem({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.CommandItem,
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
  maxRows: 8,
  /** Thin green scrollbar on the option list — never the system default. */
  scrollThumb: "#16914E",
  scrollThumbHover: "#A8D5B5",
  scrollWidth: 4
};
var MENU_SCROLLBAR_CSS = `
[data-slot="select-menu-list"] {
  scrollbar-width: thin;
  scrollbar-color: ${MENU.scrollThumb} transparent;
}
[data-slot="select-menu-list"]::-webkit-scrollbar {
  width: ${MENU.scrollWidth}px;
  height: ${MENU.scrollWidth}px;
}
[data-slot="select-menu-list"]::-webkit-scrollbar-track {
  background: transparent;
  margin-block: ${MENU.padding}px;
}
[data-slot="select-menu-list"]::-webkit-scrollbar-thumb {
  background-color: ${MENU.scrollThumb};
  border-radius: 9999px;
  transition: background-color 160ms ease;
}
[data-slot="select-menu-list"]::-webkit-scrollbar-thumb:hover {
  background-color: ${MENU.scrollThumbHover};
}
`;
function getTriggerStyle(state) {
  return getInputBoxStyle(state === "open" ? "focused" : state);
}
var triggerVariants = classVarianceAuthority.cva(
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
var PILL_MAX_WIDTH = 140;
var PILL_MIN_WIDTH = 56;
var PILL_GAP = 4;
function CheckboxIcon({ checked }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: "flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[3px]",
      style: {
        background: checked ? MENU.checkboxOn : "transparent",
        border: `1.5px solid ${checked ? MENU.checkboxOn : MENU.checkboxOff}`,
        transition: "background 120ms linear, border-color 120ms linear"
      },
      children: checked && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 9, strokeWidth: 3.5, className: "text-white" })
    }
  );
}
function Spinner({ size }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col gap-1 p-1", "aria-busy": "true", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntime.jsx(
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
  const isMobileDrawer = React4__namespace.useContext(FilterGroupMobileContext);
  const touchedRef = React4__namespace.useRef(false);
  const interactedRef = React4__namespace.useRef(false);
  const resolvedMode = multiple ? "multi" : mode;
  const searchEnabled = searchable ?? searchProp;
  const spec = SELECT_SIZES[size];
  const resolvedOptions = React4__namespace.useMemo(() => {
    if (items && getLabel && getValue) {
      return items.map((item) => ({
        label: getLabel(item),
        value: getValue(item),
        disabled: getDisabled ? getDisabled(item) : false
      }));
    }
    return options ?? [];
  }, [items, getLabel, getValue, getDisabled, options]);
  const [open, setOpen] = React4__namespace.useState(false);
  const [hovered, setHovered] = React4__namespace.useState(false);
  const [searchQuery, setSearchQuery] = React4__namespace.useState("");
  const [sortOrder, setSortOrder] = React4__namespace.useState("asc");
  const listRef = React4__namespace.useRef(null);
  React4__namespace.useEffect(() => {
    listRef.current?.scrollTo({ top: 0 });
  }, [sortOrder]);
  const sortedOptions = React4__namespace.useMemo(() => {
    if (!sorting) return resolvedOptions;
    return [...resolvedOptions].sort(
      (a, b) => sortOrder === "asc" ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)
    );
  }, [resolvedOptions, sorting, sortOrder]);
  const fuseFilteredOptions = useFuzzySearch(sortedOptions, searchQuery);
  const visibleOptions = React4__namespace.useMemo(() => {
    if (!searchEnabled) return sortedOptions;
    const q = searchQuery.trim();
    if (indexing && /^\d+$/.test(q)) {
      const n = parseInt(q, 10);
      const opt = sortedOptions[n - 1];
      return opt ? [opt] : [];
    }
    return fuseFilteredOptions;
  }, [searchEnabled, searchQuery, indexing, sortedOptions, fuseFilteredOptions]);
  const [selected, setSelected] = React4__namespace.useState(
    controlledValue ?? defaultValue ?? (resolvedMode === "multi" ? [] : "")
  );
  React4__namespace.useEffect(() => {
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
  const pillsContainerRef = React4__namespace.useRef(null);
  const [visibleCount, setVisibleCount] = React4__namespace.useState(null);
  const [rowWidth, setRowWidth] = React4__namespace.useState(0);
  React4__namespace.useLayoutEffect(() => {
    const container = pillsContainerRef.current;
    if (!container || resolvedMode !== "multi") return;
    const measure = () => setRowWidth(container.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [resolvedMode]);
  const badgeReserve = 20 + 7 * String(selectedArr.length).length + PILL_GAP;
  const pillMaxWidth = React4__namespace.useMemo(() => {
    if (rowWidth === 0) return PILL_MAX_WIDTH;
    const budget = selectedArr.length <= 1 ? rowWidth : rowWidth - badgeReserve;
    return Math.max(PILL_MIN_WIDTH, Math.min(PILL_MAX_WIDTH, Math.floor(budget)));
  }, [rowWidth, selectedArr.length, badgeReserve]);
  React4__namespace.useLayoutEffect(() => {
    if (resolvedMode === "multi") setVisibleCount(null);
  }, [selectedArr.join(","), resolvedMode, rowWidth]);
  React4__namespace.useLayoutEffect(() => {
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
    if (rowWidth === 0) return;
    const containerRight = container.getBoundingClientRect().right;
    const pills = Array.from(
      container.querySelectorAll("[data-pill]")
    );
    let count = pills.length;
    for (let i = 0; i < pills.length; i++) {
      const pillRight = pills[i].getBoundingClientRect().right;
      const hasMore = i < pills.length - 1;
      const limit = hasMore ? containerRight - badgeReserve : containerRight;
      if (pillRight > limit) {
        count = i === 0 ? 1 : i;
        break;
      }
    }
    setVisibleCount(count);
  }, [visibleCount, maxChips, badgeReserve, rowWidth]);
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
    return /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "divide-y divide-gray-100", children: resolvedOptions.map((opt) => {
      const rowSelected = isSelected(opt.value);
      return /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsxs(
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
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: opt.label }),
            rowSelected && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 16, strokeWidth: 2.5, className: "shrink-0 text-[#003C1B]" })
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
  const groups = React4__namespace.useMemo(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsxs(
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
          isMulti && /* @__PURE__ */ jsxRuntime.jsx(CheckboxIcon, { checked }),
          indexing && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "shrink-0 tabular-nums", style: { color: MENU.metaInk }, children: [
            originalIdx + 1,
            "."
          ] }),
          option.icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex shrink-0 items-center", children: option.icon }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: option.label }),
            option.description && /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: spec.font - 2, fontWeight: 400, color: MENU.metaInk }, children: option.description })
          ] }),
          option.meta && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: "shrink-0 whitespace-nowrap",
              style: { fontSize: spec.font - 2, fontWeight: 500, color: MENU.metaInk },
              children: option.meta
            }
          ),
          !isMulti && checked && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: 14, strokeWidth: 2.8, className: "shrink-0", color: MENU.selectedInk })
        ]
      },
      option.value
    );
  };
  return (
    // `min-w-0` lets the field shrink inside a flex parent (a sidebar column
    // otherwise refuses to go below the chips' intrinsic width) and
    // `max-w-full` caps it when that parent sizes children to max-content.
    // Without both, the trigger overflows the sidebar before the chip
    // measurement below ever gets a say.
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 max-w-full flex-col gap-1.5", children: [
      label && /* @__PURE__ */ jsxRuntime.jsx(
        InputLabel,
        {
          size,
          required,
          tone: state === "error" || state === "disabled" ? getLabelColor(state) : void 0,
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
        /* @__PURE__ */ jsxRuntime.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(
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
              leftIcon && /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: "flex shrink-0 items-center justify-center [&>svg]:size-full",
                  style: { width: spec.icon + 1, height: spec.icon + 1, color: INPUT_COLORS.icon },
                  children: leftIcon
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  ref: resolvedMode === "multi" ? pillsContainerRef : void 0,
                  className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
                  children: resolvedMode === "multi" ? selectedArr.length > 0 ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                    displayedPills.map((val) => {
                      const opt = resolvedOptions.find((o) => o.value === val);
                      if (!opt) return null;
                      return /* @__PURE__ */ jsxRuntime.jsxs(
                        "span",
                        {
                          "data-pill": true,
                          className: "inline-flex shrink-0 items-center gap-1 rounded-full font-semibold",
                          style: {
                            maxWidth: pillMaxWidth,
                            padding: clearable ? "4px 4px 4px 10px" : "4px 10px",
                            background: MENU.selectedBg,
                            color: MENU.selectedInk,
                            fontSize: spec.font - 2
                          },
                          children: [
                            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", children: opt.label }),
                            clearable && /* @__PURE__ */ jsxRuntime.jsx(
                              "button",
                              {
                                type: "button",
                                tabIndex: -1,
                                onClick: (e) => removePill(val, e),
                                "aria-label": `Remove ${opt.label}`,
                                className: "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full transition-colors",
                                style: { background: "rgba(0,60,27,.1)", color: MENU.selectedInk },
                                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: 8, strokeWidth: 3.4 })
                              }
                            )
                          ]
                        },
                        val
                      );
                    }),
                    overflowCount > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
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
                  ] }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "truncate", style: { color: INPUT_COLORS.placeholder }, children: placeholder }) : /* @__PURE__ */ jsxRuntime.jsx(
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
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex shrink-0 items-center", style: { gap: 6 }, children: [
                clearable && hasSelection && !readOnly && !disabled && /* @__PURE__ */ jsxRuntime.jsx(
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
                    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { size: spec.icon - 6, strokeWidth: 3 })
                  }
                ),
                sorting && /* @__PURE__ */ jsxRuntime.jsx(
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
                    children: sortOrder === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUpAZ, { size: spec.icon - 1, strokeWidth: 2 }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowDownAZ, { size: spec.icon - 1, strokeWidth: 2 })
                  }
                ),
                loading && /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: spec.icon - 2 }),
                state === "readonly" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Lock, { size: spec.icon - 2, strokeWidth: 2, color: INPUT_COLORS.placeholder }),
                state === "error" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleAlert, { size: spec.icon, strokeWidth: 2.2, color: INPUT_COLORS.errorInk }),
                state === "warning" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleAlert, { size: spec.icon, strokeWidth: 2.2, color: INPUT_COLORS.warningInk }),
                state === "success" && /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { size: spec.icon, strokeWidth: 2.6, color: INPUT_COLORS.successInk }),
                showChevron && /* @__PURE__ */ jsxRuntime.jsx(
                  lucideReact.ChevronDown,
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
        /* @__PURE__ */ jsxRuntime.jsx(
          PopoverContent,
          {
            side: placement === "auto" ? "bottom" : placement,
            className: "max-w-[calc(100vw-1rem)] border-0 p-0 shadow-none",
            collisionPadding: { top: 64 },
            style: { width: "var(--radix-popover-trigger-width)" },
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              "div",
              {
                style: {
                  padding: MENU.padding,
                  borderRadius: MENU.radius,
                  border: MENU.border,
                  background: MENU.background,
                  boxShadow: MENU.shadow
                },
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("style", { children: MENU_SCROLLBAR_CSS }),
                  /* @__PURE__ */ jsxRuntime.jsxs(Command, { shouldFilter: false, children: [
                    searchEnabled && !loading && /* @__PURE__ */ jsxRuntime.jsx(
                      CommandInput,
                      {
                        placeholder: "Search...",
                        value: searchQuery,
                        onValueChange: handleSearchChange,
                        spellCheck,
                        style: { fontSize: spec.font }
                      }
                    ),
                    resolvedMode === "multi" && !loading && visibleOptions.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs(
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
                          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "font-semibold", children: [
                            selectedArr.length,
                            " selected"
                          ] }),
                          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntime.jsx(
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
                            /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: MENU.groupRule }, children: "|" }),
                            /* @__PURE__ */ jsxRuntime.jsx(
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
                    /* @__PURE__ */ jsxRuntime.jsx(
                      CommandList,
                      {
                        ref: listRef,
                        "data-slot": "select-menu-list",
                        style: { maxHeight: MENU.maxRows * spec.option + MENU.padding * 2 },
                        children: loading ? /* @__PURE__ */ jsxRuntime.jsx(LoadingRows, { height: spec.option }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                          groups.map((group, gi) => /* @__PURE__ */ jsxRuntime.jsxs(
                            "div",
                            {
                              style: gi > 0 && group.name ? { borderTop: `1px solid ${MENU.groupRule}`, marginTop: 4, paddingTop: 4 } : void 0,
                              children: [
                                group.name && /* @__PURE__ */ jsxRuntime.jsx(
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
                          showCreate && /* @__PURE__ */ jsxRuntime.jsxs(
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
                                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { size: 14, strokeWidth: 2.4, className: "shrink-0" }),
                                /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "truncate", children: [
                                  "Create \u201C",
                                  query,
                                  "\u201D"
                                ] })
                              ]
                            }
                          ),
                          showEmpty && /* @__PURE__ */ jsxRuntime.jsx(
                            "div",
                            {
                              className: "flex flex-col items-start gap-1",
                              style: { padding: "14px 10px", fontSize: spec.font },
                              children: emptyState ?? /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: INPUT_COLORS.message }, children: "No results found." })
                            }
                          )
                        ] })
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        InputHelper,
        {
          size,
          state: state === "open" ? "focused" : state,
          helperText: error ?? (status && statusMessage) ?? helperText,
          error
        }
      )
    ] })
  );
}
Select.displayName = "Select";
var DATEPICKER_SIZES = {
  xs: { height: 28, padLeft: 9, padRight: 8, font: 12, icon: 13, cell: 24, cellFont: 9, radius: 8 },
  sm: { height: 32, padLeft: 11, padRight: 9, font: 12, icon: 14, cell: 26, cellFont: 9, radius: 8 },
  md: { height: 40, padLeft: 13, padRight: 11, font: 13, icon: 16, cell: 30, cellFont: 10, radius: 8 },
  lg: { height: 48, padLeft: 15, padRight: 13, font: 14, icon: 17, cell: 34, cellFont: 11, radius: 8 }
};
var PANEL = {
  padding: 12,
  /** Wash used by every hover in the panel. */
  hover: "#FAFFF7",
  /** 2px gutter between day cells. */
  cellGap: 2,
  cellRadius: 6,
  /** Radius on the outer corners of a range, and on a lone selected day. */
  cellRadiusSelected: 8,
  /** Forest fill means chosen. */
  selectedBg: "#003C1B",
  selectedInk: "#FFFFFF",
  /** Mint band means between — square, so the run reads as one shape. */
  rangeBg: "#DCF3CE",
  rangeInk: "#003C1B",
  /** Lighter mint used for the drag preview. */
  rangePreviewBg: "#EEF8E4",
  /** A ring means today — never a fill, so it cannot compete with the selection. */
  todayRing: "inset 0 0 0 1.5px #8CC42A",
  todayInk: "#1F5E2C",
  /** Keyboard cursor. */
  focusRing: "0 0 0 2px rgba(140,196,42,.55)",
  dayInk: INPUT_COLORS.value,
  /** Weekend days stay selectable, just muted. */
  weekendInk: INPUT_COLORS.placeholder,
  /** Adjacent-month days. */
  outsideInk: "#C6C6C6",
  /** Before min / after max — greyed, still visible so the grid never shifts. */
  outOfBoundsBg: INPUT_COLORS.subtle,
  outOfBoundsInk: "#C6C6C6",
  weekHeadInk: "#787878",
  weekHeadHeight: 22};
function getDayCellStyle(flags) {
  const {
    selected,
    rangeStart,
    rangeEnd,
    inRange,
    rangePreview,
    today,
    outside,
    disabled,
    weekend,
    focused
  } = flags;
  const r = `${PANEL.cellRadius}px`;
  const rSel = `${PANEL.cellRadiusSelected}px`;
  let background = "transparent";
  let color = PANEL.dayInk;
  let fontWeight = 500;
  let borderRadius = r;
  let boxShadow = "none";
  if (weekend) color = PANEL.weekendInk;
  if (outside) {
    color = PANEL.outsideInk;
    fontWeight = 400;
  }
  if (rangePreview) {
    background = PANEL.rangePreviewBg;
    color = PANEL.rangeInk;
    borderRadius = "0";
  }
  if (inRange) {
    background = PANEL.rangeBg;
    color = PANEL.rangeInk;
    borderRadius = "0";
  }
  if (rangeStart || rangeEnd) {
    background = PANEL.selectedBg;
    color = PANEL.selectedInk;
    fontWeight = 600;
    borderRadius = rangeStart && rangeEnd ? rSel : rangeStart ? `${rSel} 0 0 ${rSel}` : `0 ${rSel} ${rSel} 0`;
  } else if (selected) {
    background = PANEL.selectedBg;
    color = PANEL.selectedInk;
    fontWeight = 600;
    borderRadius = rSel;
  } else if (today) {
    color = PANEL.todayInk;
    fontWeight = 700;
    boxShadow = PANEL.todayRing;
  }
  if (focused) boxShadow = PANEL.focusRing;
  if (disabled) {
    return {
      background: PANEL.outOfBoundsBg,
      color: PANEL.outOfBoundsInk,
      fontWeight: 400,
      borderRadius: r,
      boxShadow: "none"
    };
  }
  return { background, color, fontWeight, borderRadius, boxShadow };
}
classVarianceAuthority.cva(
  [
    "flex min-w-0 items-center",
    "cursor-pointer select-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ].join(" "),
  {
    variants: {
      state: {
        default: "",
        open: "",
        disabled: "pointer-events-none",
        readonly: "cursor-default pointer-events-none"
      },
      size: { xs: "", sm: "", md: "", lg: "" }
    },
    defaultVariants: { state: "default", size: "md" }
  }
);
classVarianceAuthority.cva(
  "flex items-center justify-center cursor-pointer select-none transition-colors",
  {
    variants: {
      variant: {
        default: "",
        today: "",
        selected: "",
        inRange: "rounded-none",
        rangeStart: "",
        rangeEnd: "",
        outsideMonth: "cursor-default"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
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
var WEEK_HEADS = ["S", "M", "T", "W", "T", "F", "S"];
function JumpCell({
  label,
  selected,
  ring,
  disabled,
  height,
  onClick
}) {
  const [hovered, setHovered] = React4__namespace.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      onPointerEnter: () => setHovered(true),
      onPointerLeave: () => setHovered(false),
      className: "ue-tabular border-0 transition-[background] duration-[120ms] disabled:cursor-not-allowed disabled:opacity-40",
      style: {
        height,
        borderRadius: PANEL.cellRadius,
        fontVariantNumeric: "tabular-nums",
        fontSize: 11,
        fontWeight: selected ? 600 : 500,
        cursor: disabled ? "not-allowed" : "pointer",
        background: selected ? PANEL.selectedBg : hovered && !disabled ? PANEL.hover : "transparent",
        color: selected ? PANEL.selectedInk : PANEL.dayInk,
        boxShadow: ring && !selected ? PANEL.todayRing : "none"
      },
      children: label
    }
  );
}
function makeDayButton({ size }) {
  const spec = DATEPICKER_SIZES[size];
  return function StyledDayButton({
    day: _day,
    modifiers,
    className,
    ...props
  }) {
    const ref = React4__namespace.useRef(null);
    const [hovered, setHovered] = React4__namespace.useState(false);
    React4__namespace.useEffect(() => {
      if (modifiers.focused) ref.current?.focus();
    }, [modifiers.focused]);
    const isEdge = !!(modifiers.range_start || modifiers.range_end);
    const style = getDayCellStyle({
      selected: !!modifiers.selected && !isEdge && !modifiers.range_middle,
      rangeStart: !!modifiers.range_start,
      rangeEnd: !!modifiers.range_end,
      inRange: !!modifiers.range_middle && !isEdge,
      today: !!modifiers.today,
      outside: !!modifiers.outside,
      disabled: !!modifiers.disabled
    });
    const plain = style.background === "transparent";
    return (
      // `props` is spread first so react-day-picker can never clobber the
      // cell's own metrics — a `style` coming through the spread would replace
      // the whole inline style object, not merge into it.
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          ...props,
          ref,
          type: "button",
          disabled: modifiers.disabled,
          onPointerEnter: () => setHovered(true),
          onPointerLeave: () => setHovered(false),
          className: cn(
            "ue-tabular relative z-10 flex items-center justify-center border-0 transition-[background-color] duration-[120ms] select-none",
            "focus-visible:outline-none",
            modifiers.disabled && "cursor-not-allowed",
            className
          ),
          style: {
            width: spec.cell,
            height: spec.cell,
            fontVariantNumeric: "tabular-nums",
            fontSize: spec.cellFont,
            lineHeight: 1,
            cursor: modifiers.disabled ? "not-allowed" : "pointer",
            ...style,
            background: plain && hovered && !modifiers.disabled ? PANEL.hover : style.background
          }
        }
      )
    );
  };
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
  size = "md",
  focusDate,
  footer,
  onDayClick,
  onDayMouseEnter,
  onDayMouseLeave
}) {
  const today = React4__namespace.useMemo(() => /* @__PURE__ */ new Date(), []);
  const spec = DATEPICKER_SIZES[size];
  const clampedToday = maxDate && today > maxDate ? maxDate : minDate && today < minDate ? minDate : today;
  const initialMonth = defaultMonth ?? (selected instanceof Date ? selected : selected?.from) ?? clampedToday;
  const [viewMonth, setViewMonth] = React4__namespace.useState(initialMonth);
  const focusKey = focusDate ? focusDate.getFullYear() * 100 + focusDate.getMonth() : null;
  React4__namespace.useEffect(() => {
    if (focusKey === null) return;
    setViewMonth(new Date(Math.floor(focusKey / 100), focusKey % 100, 1));
  }, [focusKey]);
  const yearOptions = React4__namespace.useMemo(
    () => buildYearOptions(
      today.getFullYear(),
      minDate?.getFullYear(),
      maxDate?.getFullYear()
    ),
    [today, minDate, maxDate]
  );
  const monthOptions = React4__namespace.useMemo(() => {
    const year = viewMonth.getFullYear();
    return MONTH_OPTIONS.map((opt) => {
      const month = Number(opt.value);
      const isDisabled = !!minDate && year === minDate.getFullYear() && month < minDate.getMonth() || !!maxDate && year === maxDate.getFullYear() && month > maxDate.getMonth();
      return isDisabled ? { ...opt, disabled: true } : opt;
    });
  }, [viewMonth, minDate, maxDate]);
  const handleMonthSelect = (val) => setViewMonth((prev) => new Date(prev.getFullYear(), Number(val), 1));
  const handleYearSelect = (val) => setViewMonth((prev) => new Date(Number(val), prev.getMonth(), 1));
  const DayButtonComponent = React4__namespace.useMemo(() => makeDayButton({ size }), [size]);
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(7, ${spec.cell}px)`,
    gap: PANEL.cellGap
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn("flex flex-col bg-white", className),
      style: { padding: PANEL.padding, gap: 10 },
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Select,
            {
              options: monthOptions,
              value: String(viewMonth.getMonth()),
              onChange: handleMonthSelect,
              size: "xs",
              className: "w-[88px]"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            Select,
            {
              options: yearOptions,
              value: String(viewMonth.getFullYear()),
              onChange: handleYearSelect,
              size: "xs",
              className: "w-[70px]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: gridStyle, children: WEEK_HEADS.map((d, i) => /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "flex select-none items-center justify-center",
              style: {
                height: PANEL.weekHeadHeight,
                fontSize: 10,
                fontWeight: 600,
                lineHeight: 1,
                color: PANEL.weekHeadInk
              },
              children: d
            },
            `${d}-${i}`
          )) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            reactDayPicker.DayPicker,
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
                months: "flex flex-col",
                month: "flex flex-col",
                month_caption: "hidden",
                weeks: "flex flex-col",
                week: "",
                day: "flex items-center justify-center p-0 relative",
                day_button: "",
                range_start: "",
                range_middle: "",
                range_end: "",
                selected: "",
                today: "",
                outside: "",
                disabled: "",
                hidden: "invisible"
              },
              components: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                MonthGrid: ({ children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, children }),
                // The rows carry the same 2px gutter as the columns.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Weeks: ({ children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    ...props,
                    style: { display: "flex", flexDirection: "column", gap: PANEL.cellGap },
                    children
                  }
                ),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Week: ({ week: _week, children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, style: gridStyle, children }),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Day: ({ day: _day, modifiers: _modifiers, children, ...props }) => /* @__PURE__ */ jsxRuntime.jsx("div", { ...props, children }),
                DayButton: DayButtonComponent
              }
            }
          )
        ] }),
        footer
      ]
    }
  );
}
function MonthPickerCalendar({
  selected,
  minDate,
  maxDate,
  onSelect,
  className
}) {
  const today = React4__namespace.useMemo(() => /* @__PURE__ */ new Date(), []);
  const [viewYear, setViewYear] = React4__namespace.useState(
    selected?.getFullYear() ?? today.getFullYear()
  );
  const yearOptions = React4__namespace.useMemo(
    () => buildYearOptions(
      today.getFullYear(),
      minDate?.getFullYear(),
      maxDate?.getFullYear()
    ),
    [today, minDate, maxDate]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn("w-[246px] max-w-full bg-white", className),
      style: { padding: PANEL.padding },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-2.5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(
          Select,
          {
            options: yearOptions,
            value: String(viewYear),
            onChange: (val) => setViewYear(Number(val)),
            size: "xs",
            className: "w-[104px]"
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-3 gap-[5px]", children: MONTH_LABELS.map((label, i) => {
          const isSelected = !!selected && selected.getFullYear() === viewYear && selected.getMonth() === i;
          const isToday = today.getFullYear() === viewYear && today.getMonth() === i;
          const isDisabled = !!minDate && new Date(viewYear, i) < new Date(minDate.getFullYear(), minDate.getMonth()) || !!maxDate && new Date(viewYear, i) > new Date(maxDate.getFullYear(), maxDate.getMonth());
          return /* @__PURE__ */ jsxRuntime.jsx(
            JumpCell,
            {
              label,
              height: 32,
              selected: isSelected,
              ring: isToday,
              disabled: isDisabled,
              onClick: () => onSelect(new Date(viewYear, i, 1))
            },
            label
          );
        }) })
      ]
    }
  );
}

exports.DatePickerCalendar = DatePickerCalendar;
exports.MonthPickerCalendar = MonthPickerCalendar;
//# sourceMappingURL=DatePickerCalendar.cjs.map
//# sourceMappingURL=DatePickerCalendar.cjs.map