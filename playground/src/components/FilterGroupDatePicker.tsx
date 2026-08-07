import * as React from "react";
import { FilterGroup, Select, DatePicker } from "@uengage/ui";
import type { DateRange, DatePickerMode } from "@uengage/ui";

// ── Options ───────────────────────────────────────────────────────────────────

const outletOptions = [
  { label: "All Outlets",     value: "all" },
  { label: "Connaught Place", value: "cp"  },
  { label: "Sector 17",       value: "s17" },
  { label: "MG Road",         value: "mgr" },
  { label: "Indiranagar",     value: "ind" },
];

const statusOptions = [
  { label: "All",       value: "all"       },
  { label: "Delivered", value: "delivered" },
  { label: "Pending",   value: "pending"   },
  { label: "Cancelled", value: "cancelled" },
];

const datePresetOptions = [
  { label: "Today",        value: "today"         },
  { label: "Yesterday",    value: "yesterday"     },
  { label: "Last 7 Days",  value: "last_7"        },
  { label: "Last 30 Days", value: "last_30"       },
  { label: "This Month",   value: "this_month"    },
  { label: "Custom Date",  value: "custom_single" },
  { label: "Custom Range", value: "custom_range"  },
];

// ── DatePresetPicker ──────────────────────────────────────────────────────────
// A compound slot: a preset Select + a hidden controlled DatePicker.
// Selecting "Custom Date" or "Custom Range" sets pickerOpen=true which opens
// the DatePicker's popover. Inside FilterGroup's drawer the ModalZIndexProvider
// lifts that popover to z-10001 so it renders above the drawer automatically.

interface DatePresetPickerProps {
  datePreset: string | string[];
  onDatePresetChange: (val: string | string[]) => void;
  pickerMode: DatePickerMode;
  pickerOpen: boolean;
  onPickerOpenChange: (open: boolean) => void;
  customValue: Date | DateRange | null;
  onCustomValueChange: (v: Date | DateRange | null) => void;
}

function DatePresetPicker({
  datePreset,
  onDatePresetChange,
  pickerMode,
  pickerOpen,
  onPickerOpenChange,
  customValue,
  onCustomValueChange,
}: DatePresetPickerProps) {
  return (
    <div className="relative inline-flex flex-col">
      <Select
        options={datePresetOptions}
        value={datePreset}
        onChange={onDatePresetChange}
        placeholder="Today"
      />
      <DatePicker
        mode={pickerMode}
        open={pickerOpen}
        onOpenChange={onPickerOpenChange}
        value={customValue}
        onChange={(v) => onCustomValueChange(v as Date | DateRange | null)}
        className="opacity-0 !h-0 !min-h-0 !p-0 !border-0 overflow-hidden"
        width="w-0"
      />
    </div>
  );
}

// ── Readout ───────────────────────────────────────────────────────────────────

function Readout({ value }: { value: Record<string, unknown> }) {
  return (
    <pre style={{
      background: "#111827", color: "#d1fae5", borderRadius: 8,
      padding: "12px 16px", fontSize: 11, lineHeight: 1.8,
      marginTop: 20, overflow: "auto",
    }}>
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

// ── Main demo ─────────────────────────────────────────────────────────────────

export default function FilterGroupDatePickerPreview() {
  const [outlet, setOutlet] = React.useState<string | string[]>("");
  const [status, setStatus] = React.useState<string | string[]>("");

  // Desktop and mobile sections each own their picker state independently.
  // Sharing a single pickerOpen between both causes the desktop DatePicker's
  // Radix Popover to fire onInteractOutside (closing the picker) the moment the
  // user touches the drawer calendar, since that element is outside the desktop popover.
  const [datePreset, setDatePreset] = React.useState<string | string[]>("today");
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [pickerMode, setPickerMode] = React.useState<DatePickerMode>("single");
  const [customValue, setCustomValue] = React.useState<Date | DateRange | null>(null);

  const [mobilePickerOpen, setMobilePickerOpen] = React.useState(false);
  const [mobilePickerMode, setMobilePickerMode] = React.useState<DatePickerMode>("single");
  const [mobileCustomValue, setMobileCustomValue] = React.useState<Date | DateRange | null>(null);

  const handleDatePresetChange = (val: string | string[]) => {
    const v = val as string;
    setDatePreset(v);
    if (v === "custom_single")     { setPickerMode("single"); setPickerOpen(true); }
    else if (v === "custom_range") { setPickerMode("range");  setPickerOpen(true); }
    else                           { setCustomValue(null); }
  };

  const handleMobileDatePresetChange = (val: string | string[]) => {
    const v = val as string;
    setDatePreset(v);
    if (v === "custom_single")     { setMobilePickerMode("single"); setMobilePickerOpen(true); }
    else if (v === "custom_range") { setMobilePickerMode("range");  setMobilePickerOpen(true); }
    else                           { setMobileCustomValue(null); }
  };

  const handleReset = () => {
    setOutlet(""); setStatus(""); setDatePreset("today");
    setCustomValue(null); setPickerOpen(false);
    setMobileCustomValue(null); setMobilePickerOpen(false);
  };

  const activeCustomValue = mobileCustomValue ?? customValue;
  const isCustom = datePreset === "custom_single" || datePreset === "custom_range";

  const customLabel = React.useMemo(() => {
    if (!activeCustomValue) return null;
    if (activeCustomValue instanceof Date) return activeCustomValue.toDateString();
    const r = activeCustomValue as DateRange;
    return `${r.from.toDateString()} → ${r.to.toDateString()}`;
  }, [activeCustomValue]);

  const dateLabel = isCustom && customLabel
    ? customLabel
    : datePresetOptions.find((o) => o.value === datePreset)?.label ?? "Today";

  const activeCount =
    [outlet, status].filter((v) => Array.isArray(v) ? v.length > 0 : !!v).length +
    (datePreset !== "today" ? 1 : 0);

  const desktopDateSlotProps: DatePresetPickerProps = {
    datePreset,
    onDatePresetChange: handleDatePresetChange,
    pickerMode,
    pickerOpen,
    onPickerOpenChange: setPickerOpen,
    customValue,
    onCustomValueChange: setCustomValue,
  };

  const mobileDateSlotProps: DatePresetPickerProps = {
    datePreset,
    onDatePresetChange: handleMobileDatePresetChange,
    pickerMode: mobilePickerMode,
    pickerOpen: mobilePickerOpen,
    onPickerOpenChange: setMobilePickerOpen,
    customValue: mobileCustomValue,
    onCustomValueChange: setMobileCustomValue,
  };

  const readout = {
    outlet:      outlet  || null,
    status:      status  || null,
    datePreset,
    customValue: activeCustomValue
      ? activeCustomValue instanceof Date
        ? activeCustomValue.toDateString()
        : `${(activeCustomValue as DateRange).from.toDateString()} → ${(activeCustomValue as DateRange).to.toDateString()}`
      : null,
    dateLabel,
  };

  return (
    <div style={{
      fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif",
      maxWidth: 960, margin: "0 auto",
      padding: "48px 32px 80px",
      background: "#fff", minHeight: "100vh",
    }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>
          FilterGroup — Dropdown-triggered DatePicker
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
          A compound date slot: a preset <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4, fontSize: 12 }}>Select</code> +
          a hidden <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4, fontSize: 12 }}>DatePicker</code>.
          Choosing <strong>Custom Date</strong> or <strong>Custom Range</strong> opens the calendar via the controlled{" "}
          <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4, fontSize: 12 }}>open</code> prop.
          Inside the drawer, <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4, fontSize: 12 }}>ModalZIndexProvider</code> lifts
          the popover to z-10001 automatically.
        </p>
      </div>

      {/* ── Desktop filter row ───────────────────────────────────────────────── */}
      <section style={{ marginBottom: 52 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
          Desktop — filter row
        </h2>
        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <FilterGroup
            labels={["Outlet", "Status", "Date"]}
            activeCount={activeCount}
            onApply={() => console.log("apply", readout)}
            onReset={handleReset}
          >
            <Select options={outletOptions} value={outlet} onChange={setOutlet} placeholder="All Outlets" />
            <Select options={statusOptions} value={status} onChange={setStatus} placeholder="All Statuses" />
            <DatePresetPicker {...desktopDateSlotProps} />
          </FilterGroup>
        </div>
        <Readout value={readout} />
      </section>

      {/* ── Mobile drawer ────────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 52 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
          Mobile drawer — forceDrawer
        </h2>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, marginTop: 0 }}>
          Tap <strong>Filters</strong>, go to the <strong>Date</strong> panel, select{" "}
          <strong>Custom Date</strong> or <strong>Custom Range</strong> — the calendar opens above the drawer.
        </p>
        <FilterGroup
          labels={["Outlet", "Status", "Date"]}
          activeCount={activeCount}
          onApply={() => console.log("apply", readout)}
          onReset={handleReset}
          forceDrawer
        >
          <Select options={outletOptions} value={outlet} onChange={setOutlet} placeholder="All Outlets" />
          <Select options={statusOptions} value={status} onChange={setStatus} placeholder="All Statuses" />
          <DatePresetPicker {...mobileDateSlotProps} />
        </FilterGroup>
        <Readout value={readout} />
      </section>
    </div>
  );
}
