import * as React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterGroupMobileContext } from "@/lib/filterGroupContext";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DatePickerCalendar,
  MonthPickerCalendar,
} from "@/components/ui/DatePickerCalendar";
import { formatDate, formatRange } from "@/components/custom/DatePicker/dateHelpers";
import type { DateRange } from "@/components/custom/DatePicker/DatePicker.types";
import type { FilterGroupProps } from "./FilterGroup.types";
import type { Modifiers } from "react-day-picker";
import { Button } from "../Button/button";

// ── DatePicker detection ──────────────────────────────────────────────────────

function findDatePickerInTree(
  node: React.ReactNode,
): React.ReactElement | null {
  if (!React.isValidElement(node)) return null;
  if ((node.type as { displayName?: string }).displayName === "DatePicker") {
    return node;
  }
  const children = (node.props as { children?: React.ReactNode }).children;
  if (!children) return null;
  for (const child of React.Children.toArray(children)) {
    const found = findDatePickerInTree(child);
    if (found) return found;
  }
  return null;
}

// ── Inline calendar rendered inside the drawer right panel ───────────────────

function InlineDatePickerPanel({ child }: { child: React.ReactElement }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = child.props as any;
  const mode: "single" | "range" | "month" = p.mode ?? "single";
  const minDate: Date | undefined = p.minDate;
  const maxDate: Date | undefined = p.maxDate;
  const onChange = p.onChange as ((v: unknown) => void) | undefined;

  const [committed, setCommitted] = React.useState<Date | DateRange | null>(
    p.value ?? null,
  );

  // Sync if parent value changes
  React.useEffect(() => {
    if (p.value !== undefined) setCommitted(p.value ?? null);
  }, [p.value]);

  // Range draft state
  const [pendingFrom, setPendingFrom] = React.useState<Date | null>(null);
  const [draftRange, setDraftRange] = React.useState<DateRange | null>(null);
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);

  const isRange = (v: unknown): v is DateRange =>
    !!v && typeof v === "object" && "from" in (v as object);

  const orderedRange = (a: Date, b: Date): DateRange =>
    a <= b ? { from: a, to: b } : { from: b, to: a };

  const calendarDisabled = React.useMemo(() => {
    const m: ({ before: Date } | { after: Date })[] = [];
    if (minDate) m.push({ before: minDate });
    if (maxDate) m.push({ after: maxDate });
    return m.length ? m : undefined;
  }, [minDate, maxDate]);

  const effectiveRange = React.useMemo(() => {
    if (mode !== "range") return null;
    const existing = draftRange ?? (isRange(committed) ? committed : null);
    if (pendingFrom)
      return hoverDate ? orderedRange(pendingFrom, hoverDate) : { from: pendingFrom };
    return existing;
  }, [mode, committed, pendingFrom, draftRange, hoverDate]);

  const calendarSelected = React.useMemo(() => {
    if (mode === "single") return committed instanceof Date ? committed : undefined;
    return effectiveRange ?? undefined;
  }, [mode, committed, effectiveRange]);

  const fromLabel = effectiveRange ? formatDate(effectiveRange.from) : null;
  const toLabel = effectiveRange && "to" in effectiveRange && effectiveRange.to
    ? formatDate(effectiveRange.to)
    : null;

  const handleDayClick = (date: Date, modifiers: Modifiers) => {
    if (modifiers.disabled) return;
    if (mode === "single") {
      setCommitted(date);
      onChange?.(date);
      return;
    }
    if (pendingFrom === null) {
      setPendingFrom(date);
      setDraftRange(null);
      setHoverDate(null);
    } else {
      const range = orderedRange(pendingFrom, date);
      setPendingFrom(null);
      setHoverDate(null);
      setDraftRange(range);
      setCommitted(range);
      onChange?.(range);
    }
  };

  return (
    <div className="flex w-full flex-col">
      {/* Range: From / To boxes */}
      {mode === "range" && (
        <div className="flex gap-2 px-4 pt-4">
          {[fromLabel, toLabel].map((lbl, i) => (
            <div
              key={i}
              className={cn(
                "flex h-9 flex-1 items-center justify-center rounded-lg border text-sm transition-colors",
                lbl ? "border-[#006F42] text-[#111827]" : "border-[#D1D5DB] text-[#C4C9D2]",
              )}
            >
              {lbl ?? "—"}
            </div>
          ))}
        </div>
      )}

      {/* Month picker */}
      {mode === "month" && (
        <MonthPickerCalendar
          selected={committed instanceof Date ? committed : null}
          minDate={minDate}
          maxDate={maxDate}
          onSelect={(date) => { setCommitted(date); onChange?.(date); }}
          className="w-full"
        />
      )}

      {/* Day calendar (single / range) */}
      {mode !== "month" && (
        <DatePickerCalendar
          mode={mode}
          selected={calendarSelected}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          disabled={calendarDisabled as any}
          minDate={minDate}
          maxDate={maxDate}
          onDayClick={handleDayClick}
          onDayMouseEnter={(date) => {
            if (pendingFrom) { setHoverDate(date); return; }
            const ex = draftRange ?? (isRange(committed) ? committed : null);
            setHoverDate(ex && "to" in ex && (date < ex.from || date > ex.to) ? date : null);
          }}
          onDayMouseLeave={() => setHoverDate(null)}
          className="w-full"
        />
      )}

    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function FilterGroup({
  children,
  labels,
  onApply,
  onReset,
  onClose,
  drawerTitle = "Filters",
  activeCount,
  className,
  drawerClassName,
  forceDrawer = false,
}: FilterGroupProps) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const programmaticClose = React.useRef(false);

  const childArray = React.Children.toArray(children);
  const items = childArray.map((child, i) => ({
    label: labels[i] ?? `Filter ${i + 1}`,
    content: child,
  }));

  const activeItem = items[activeIndex] ?? items[0];

  const handleOpenChange = (next: boolean) => {
    if (!next && !programmaticClose.current) onClose?.();
    programmaticClose.current = false;
    setOpen(next);
  };

  const handleApply = () => { programmaticClose.current = true; onApply?.(); setOpen(false); };
  const handleReset = () => { programmaticClose.current = true; onReset?.(); setOpen(false); };

  // Renders the right panel for a given item — DatePicker gets inline calendar,
  // everything else goes through FilterGroupMobileContext (Select → flat list, etc.)
  // Label spans (text-xs) are hidden via CSS since the drawer left panel already names the category.
  const renderRightPanel = (item: typeof items[number]) => {
    const datePicker = findDatePickerInTree(item.content);
    if (datePicker) {
      return <InlineDatePickerPanel child={datePicker} />;
    }
    return (
      <div className="p-4 [&_span.text-xs]:hidden">
        <FilterGroupMobileContext.Provider value={true}>
          {item.content}
        </FilterGroupMobileContext.Provider>
      </div>
    );
  };

  // ── Mobile drawer ─────────────────────────────────────────────────────────
  const drawer = (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 h-10 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <SlidersHorizontal size={16} className="text-gray-500" />
          <span>{drawerTitle}</span>
          {activeCount != null && activeCount > 0 && (
            <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#006F42] text-white text-[10px] font-bold leading-none">
              {activeCount}
            </span>
          )}
        </button>
      </DrawerTrigger>

      <DrawerOverlay />

      <DrawerContent
        aria-label={drawerTitle}
       
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "rounded-t-2xl bg-white",
          "h-[70vh] flex flex-col",
          "translate-y-full data-[state=open]:translate-y-0",
          "transition-transform duration-300 ease-out",
          drawerClassName,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0">
          <DrawerTitle className="text-lg font-bold text-gray-900">
            {drawerTitle}
          </DrawerTitle>
          <DrawerClose asChild>
            <button
              type="button"
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </DrawerClose>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: category list */}
          <div className={cn(
            "w-28 shrink-0 border-r border-gray-200 overflow-y-auto bg-gray-50",
            "[&::-webkit-scrollbar]:w-1.5",
            "[&::-webkit-scrollbar-track]:bg-gray-100",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-[#006F42]",
          )} style={{ scrollbarWidth: "thin", scrollbarColor: "#006F42 #f3f4f6" }}>
            {items.map((item, i) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-full text-left px-3 py-4 text-sm border-b border-gray-100 transition-colors",
                  i === activeIndex
                    ? "bg-white text-[#006F42] font-semibold border-l-[3px] border-l-[#006F42]"
                    : "bg-gray-50 text-gray-500 font-normal border-l-[3px] border-l-transparent hover:bg-gray-100",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: active filter content */}
          <div className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden min-w-0",
            "[&::-webkit-scrollbar]:w-1.5",
            "[&::-webkit-scrollbar-track]:bg-gray-100",
            "[&::-webkit-scrollbar-thumb]:rounded-full",
            "[&::-webkit-scrollbar-thumb]:bg-[#006F42]",
          )} style={{ scrollbarWidth: "thin", scrollbarColor: "#006F42 #f3f4f6" }}>
            {activeItem && renderRightPanel(activeItem)}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-200 shrink-0">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="flex-1 py-3 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            Reset
          </Button>
          <Button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 rounded-full bg-[#006F42] text-white text-sm font-medium hover:bg-[#005a36] active:bg-[#004a2c] transition-colors"
          >
            Apply
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );

  if (forceDrawer) return drawer;

  return (
    <>
      {/* Desktop: horizontal filter row */}
      <div className={cn("hidden sm:flex items-center gap-2 flex-wrap", className)}>
        {items.map((item, i) => (
          <React.Fragment key={i}>{item.content}</React.Fragment>
        ))}
      </div>

      {/* Mobile: trigger + drawer */}
      <div className="flex sm:hidden">{drawer}</div>
    </>
  );
}

FilterGroup.displayName = "FilterGroup";
