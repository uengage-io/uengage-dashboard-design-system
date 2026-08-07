import * as React from "react";
import { DatePicker } from "@uengage/ui";
import type { DateRange, DatePickerMode } from "@uengage/ui";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16, borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 16, flexWrap: "wrap" }}>
      {label && <span style={{ width: 130, fontSize: 12, color: "#9ca3af", flexShrink: 0, paddingTop: 8 }}>{label}</span>}
      {children}
    </div>
  );
}

const FILTER_OPTIONS = [
  { value: "today",      label: "Today" },
  { value: "yesterday",  label: "Yesterday" },
  { value: "last_7",     label: "Last 7 days" },
  { value: "last_30",    label: "Last 30 days" },
  { value: "custom_single", label: "Custom date" },
  { value: "custom_range",  label: "Custom range" },
];

function DashboardDemo() {
  const [filter, setFilter] = React.useState("today");
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [pickerMode, setPickerMode] = React.useState<DatePickerMode>("single");
  const [customValue, setCustomValue] = React.useState<Date | DateRange | null>(null);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (value === "custom_single") {
      setPickerMode("single");
      setPickerOpen(true);
    } else if (value === "custom_range") {
      setPickerMode("range");
      setPickerOpen(true);
    } else {
      setCustomValue(null);
    }
  };

  const selectedOption = FILTER_OPTIONS.find((o) => o.value === filter);
  const isCustom = filter === "custom_single" || filter === "custom_range";

  const customLabel = React.useMemo(() => {
    if (!customValue) return null;
    if (customValue instanceof Date) return customValue.toDateString();
    return `${(customValue as DateRange).from?.toDateString()} → ${(customValue as DateRange).to?.toDateString()}`;
  }, [customValue]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Simulated dashboard filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10 }}>
        <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>Date filter:</span>

        {/* Dropdown */}
        <div style={{ position: "relative" }}>
          <select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            style={{
              appearance: "none",
              padding: "6px 32px 6px 12px",
              fontSize: 13,
              fontWeight: 500,
              color: "#111827",
              background: "#fff",
              border: "1px solid #d1d5db",
              borderRadius: 8,
              cursor: "pointer",
              outline: "none",
            }}
          >
            {FILTER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#9ca3af", fontSize: 10 }}>▼</span>
        </div>

        {/* Hidden DatePicker — popover triggered by dropdown, not by its own button */}
        <div style={{ position: "relative" }}>
          <DatePicker
            mode={pickerMode}
            open={pickerOpen}
            onOpenChange={setPickerOpen}
            value={customValue}
            onChange={(v) => {
              setCustomValue(v as Date | DateRange | null);
            }}
            width="w-0"
            className="overflow-hidden !p-0 !border-0 !h-0 !min-h-0 pointer-events-none opacity-0 absolute"
          />
        </div>

        {/* Active filter badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "4px 10px", borderRadius: 999,
            background: isCustom && customLabel ? "#dcfce7" : "#f3f4f6",
            color: isCustom && customLabel ? "#166534" : "#374151",
            fontSize: 12, fontWeight: 500,
          }}>
            {isCustom && customLabel ? customLabel : selectedOption?.label}
          </span>
          {isCustom && customLabel && (
            <button
              onClick={() => { setCustomValue(null); setFilter("today"); }}
              style={{ fontSize: 11, color: "#9ca3af", background: "none", border: "none", cursor: "pointer", padding: "2px 4px" }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Code hint */}
      <pre style={{ fontSize: 11, color: "#6b7280", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "12px 14px", margin: 0, overflowX: "auto", lineHeight: 1.7 }}>{`// Selecting "Custom date" or "Custom range" from the dropdown
// opens the DatePicker programmatically — no click on the trigger needed.

const [pickerOpen, setPickerOpen] = useState(false);
const [pickerMode, setPickerMode] = useState<DatePickerMode>("single");

onDropdownChange((val) => {
  if (val === "custom_single") { setPickerMode("single"); setPickerOpen(true); }
  if (val === "custom_range")  { setPickerMode("range");  setPickerOpen(true); }
});

<DatePicker
  mode={pickerMode}
  open={pickerOpen}
  onOpenChange={setPickerOpen}
  value={customValue}
  onChange={setCustomValue}
/>`}</pre>
    </div>
  );
}

export default function DatePickerPreview() {
  const [singleDate, setSingleDate] = React.useState<Date | null>(null);
  const [rangeDate, setRangeDate] = React.useState<DateRange | null>(null);
  const [monthDate, setMonthDate] = React.useState<Date | null>(null);
  const [monthConstrained, setMonthConstrained] = React.useState<Date | null>(null);

  return (
    <div style={{ fontFamily: "Figtree, sans-serif", maxWidth: 900, margin: "0 auto", padding: "40px 32px", background: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>DatePicker</h1>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 40 }}>
        3 modes (single · range · month) · 3 sizes · clearable · min/max constraints
      </p>

      {/* ── Dashboard pattern ───────────────────────────────────────────── */}
      <Section title="Dashboard Pattern — Dropdown-triggered Picker">
        <DashboardDemo />
      </Section>

      {/* ── Month mode ─────────────────────────────────────────────────── */}
      <Section title="Month Mode — Year Select Dropdown">
        <Row label="Uncontrolled">
          <DatePicker mode="month" placeholder="Select month" size="md" width="w-[200px]" />
        </Row>

        <Row label="Controlled">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DatePicker
              mode="month"
              value={monthDate}
              onChange={(d) => setMonthDate(d as Date | null)}
              placeholder="Select month"
              size="md"
              width="w-[200px]"
              clearable
            />
            <code style={{ fontSize: 11, color: "#6b7280" }}>
              {monthDate
                ? monthDate.toLocaleString("default", { month: "long", year: "numeric" })
                : "null"}
            </code>
          </div>
        </Row>

        <Row label="With min/max">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DatePicker
              mode="month"
              value={monthConstrained}
              onChange={(d) => setMonthConstrained(d as Date | null)}
              placeholder="2025 – 2027 only"
              size="md"
              width="w-[200px]"
              minDate={new Date(2025, 0, 1)}
              maxDate={new Date(2027, 11, 31)}
              clearable
            />
            <code style={{ fontSize: 11, color: "#6b7280" }}>
              {monthConstrained
                ? monthConstrained.toLocaleString("default", { month: "long", year: "numeric" })
                : "null"}
            </code>
          </div>
        </Row>

        <Row label="Sizes">
          <DatePicker mode="month" placeholder="sm" size="sm" width="w-[180px]" />
          <DatePicker mode="month" placeholder="md" size="md" width="w-[180px]" />
          <DatePicker mode="month" placeholder="lg" size="lg" width="w-[180px]" />
        </Row>

        <Row label="Disabled">
          <DatePicker mode="month" placeholder="Disabled" size="md" width="w-[200px]" disabled />
        </Row>
      </Section>

      {/* ── Single mode ─────────────────────────────────────────────────── */}
      <Section title="Single Mode">
        <Row label="Controlled">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DatePicker
              mode="single"
              value={singleDate}
              onChange={(d) => setSingleDate(d as Date | null)}
              placeholder="Select a date"
              size="md"
              width="w-[240px]"
              clearable
            />
            <code style={{ fontSize: 11, color: "#6b7280" }}>
              {singleDate ? singleDate.toDateString() : "null"}
            </code>
          </div>
        </Row>

        <Row label="Sizes">
          <DatePicker mode="single" placeholder="sm" size="sm" width="w-[200px]" />
          <DatePicker mode="single" placeholder="md" size="md" width="w-[200px]" />
          <DatePicker mode="single" placeholder="lg" size="lg" width="w-[200px]" />
        </Row>

        <Row label="With min/max">
          <DatePicker
            mode="single"
            placeholder="±30 days"
            size="md"
            width="w-[240px]"
            minDate={new Date(new Date().setDate(new Date().getDate() - 30))}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
          />
        </Row>

        <Row label="Disabled">
          <DatePicker mode="single" placeholder="Disabled" size="md" width="w-[240px]" disabled />
        </Row>
      </Section>

      {/* ── Range mode ──────────────────────────────────────────────────── */}
      <Section title="Range Mode">
        <Row label="Controlled">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <DatePicker
              mode="range"
              value={rangeDate}
              onChange={(r) => setRangeDate(r as DateRange | null)}
              placeholder="Select date range"
              size="md"
              width="w-[280px]"
              clearable
              maxDate={new Date("2026-06-15T09:57:26.601Z")}
            />
            <code style={{ fontSize: 11, color: "#6b7280" }}>
              {rangeDate
                ? `${rangeDate.from?.toDateString()} → ${rangeDate.to?.toDateString()}`
                : "null"}
            </code>
          </div>
        </Row>

        <Row label="Sizes">
          <DatePicker mode="range" placeholder="sm" size="sm" width="w-[260px]" />
          <DatePicker mode="range" placeholder="lg" size="lg" width="w-[260px]" />
        </Row>

        <Row label="Disabled">
          <DatePicker mode="range" placeholder="Disabled" size="md" width="w-[280px]" disabled />
        </Row>
      </Section>
    </div>
  );
}
