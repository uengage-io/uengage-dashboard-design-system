import * as React from "react";
import { DatePicker } from "@uengage/ui";
import type { DateRange } from "@uengage/ui";

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
