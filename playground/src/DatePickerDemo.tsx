import { useState } from "react";
import { DatePicker, DatePickerCalendar, type DateRange } from "@uengage/ui";

/* ── Helpers ──────────────────────────────────────────────────────────── */

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ borderTop: "1px solid #E5E7EB", paddingTop: 24, marginTop: 24 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: subtitle ? 4 : 16 }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 16 }}>{subtitle}</p>}
      {children}
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ marginTop: 6, fontSize: 12, color: "#9CA3AF", fontFamily: "monospace" }}>{hint}</p>}
    </div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <code style={{ background: "#F3F4F6", borderRadius: 4, padding: "2px 6px", fontSize: 12, color: "#374151" }}>
      {children}
    </code>
  );
}

/* ── Demo ─────────────────────────────────────────────────────────────── */

const TODAY = new Date();
const MIN_DATE = new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 10);
const MAX_DATE = new Date(TODAY.getFullYear(), TODAY.getMonth() + 2, 20);

export default function DatePickerDemo() {
  /* Single mode */
  const [singleDate, setSingleDate] = useState<Date | null>(null);
  const [controlledDate, setControlledDate] = useState<Date | null>(new Date(2026, 3, 17));

  /* Range mode */
  const [range, setRange] = useState<DateRange | null>(null);
  const [prefilledRange, setPrefilledRange] = useState<DateRange | null>({
    from: new Date(2026, 3, 1),
    to: new Date(2026, 3, 17),
  });
  const [boundedRange, setBoundedRange] = useState<DateRange | null>(null);

  /* Standalone calendar */
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [calendarRange, setCalendarRange] = useState<DateRange | null>(null);

  const fmt = (d: Date | null) =>
    d ? d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "null";

  const fmtRange = (r: DateRange | null) =>
    r ? `{ from: ${fmt(r.from)}, to: ${fmt(r.to)} }` : "null";

  return (
    <div style={{ fontFamily: "Figtree, sans-serif", maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: "#111827" }}>DatePicker</h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 36 }}>
        Popover calendar with single + range modes, Cancel/Apply draft pattern, min/max constraints.
      </p>

      {/* ── Single mode ── */}
      <Section title="Single mode" subtitle="Click a day → immediately applies and closes.">
        <Field label="Uncontrolled" hint={`onChange value: ${fmt(singleDate)}`}>
          <DatePicker
            mode="single"
            placeholder="Select date..."
            onChange={(v) => setSingleDate(v as Date | null)}
          />
        </Field>

        <Field label="Controlled (pre-filled: Apr 17, 2026)" hint={`value: ${fmt(controlledDate)}`}>
          <DatePicker
            mode="single"
            value={controlledDate}
            onChange={(v) => setControlledDate(v as Date | null)}
          />
        </Field>

        <Field label="Disabled">
          <DatePicker mode="single" disabled placeholder="Not available" />
        </Field>
      </Section>

      {/* ── Range mode ── */}
      <Section title="Range mode" subtitle="First click sets From, second click sets To. Cancel discards draft. Apply commits.">
        <Field label="Default placeholder" hint={`onChange value: ${fmtRange(range)}`}>
          <DatePicker
            mode="range"
            onChange={(v) => setRange(v as DateRange | null)}
          />
        </Field>

        <Field
          label="Controlled (pre-filled: Apr 1–17, 2026)"
          hint={`value: ${fmtRange(prefilledRange)}`}
        >
          <DatePicker
            mode="range"
            value={prefilledRange}
            onChange={(v) => setPrefilledRange(v as DateRange | null)}
          />
        </Field>

        <Field label="Disabled">
          <DatePicker mode="range" disabled />
        </Field>
      </Section>

      {/* ── minDate / maxDate ── */}
      <Section
        title="minDate / maxDate"
        subtitle={`Dates before ${fmt(MIN_DATE)} and after ${fmt(MAX_DATE)} are disabled.`}
      >
        <Field label="Range with date bounds" hint={`onChange value: ${fmtRange(boundedRange)}`}>
          <DatePicker
            mode="range"
            minDate={MIN_DATE}
            maxDate={MAX_DATE}
            onChange={(v) => setBoundedRange(v as DateRange | null)}
          />
        </Field>

        <Field label="Single with date bounds">
          <DatePicker
            mode="single"
            minDate={MIN_DATE}
            maxDate={MAX_DATE}
            placeholder="Bounded single..."
          />
        </Field>
      </Section>

      {/* ── Standalone calendar ── */}
      <Section
        title="DatePickerCalendar (standalone)"
        subtitle="The calendar component without the popover wrapper."
      >
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <Field label="Single calendar" hint={`selected: ${fmt(calendarDate)}`}>
            <DatePickerCalendar
              mode="single"
              selected={calendarDate ?? undefined}
              onDayClick={(date, modifiers) => {
                if (!modifiers.disabled) setCalendarDate(date);
              }}
              className="rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden"
            />
          </Field>

          <Field label="Range calendar" hint={`selected: ${fmtRange(calendarRange)}`}>
            <DatePickerCalendar
              mode="range"
              selected={calendarRange ?? undefined}
              onSelect={(v) => setCalendarRange(v ?? null)}
              className="rounded-lg border border-[#E5E7EB] shadow-sm overflow-hidden"
            />
          </Field>
        </div>
      </Section>

      {/* ── Prop table ── */}
      <Section title="DatePicker props">
        <table style={{ fontSize: 12, color: "#374151", borderCollapse: "collapse", width: "100%", lineHeight: 1.7 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
              {["Prop", "Type", "Default", "Description"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "6px 12px 6px 0", color: "#6B7280", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["mode", '"single" | "range"', '"single"', "Selection mode"],
              ["value", "Date | DateRange | null", "—", "Controlled value"],
              ["onChange", "(v: Date | DateRange | null) => void", "—", "Fires when committed (single: on click, range: on Apply)"],
              ["placeholder", "string", '"Select date..."', "Trigger placeholder when no value"],
              ["size", '"sm" | "md" | "lg"', '"md"', "Trigger height preset"],
              ["className", "string", "—", "Forwarded to trigger wrapper (width, margins, etc.)"],
              ["disabled", "boolean", "false", "Disables the entire picker"],
              ["minDate", "Date", "—", "Dates before this are disabled"],
              ["maxDate", "Date", "—", "Dates after this are disabled"],
            ].map(([prop, type, def, desc]) => (
              <tr key={prop} style={{ borderBottom: "1px solid #F3F4F6" }}>
                <td style={{ padding: "6px 12px 6px 0" }}><Code>{prop}</Code></td>
                <td style={{ padding: "6px 12px", color: "#6B7280", fontSize: 11 }}>{type}</td>
                <td style={{ padding: "6px 12px", fontFamily: "monospace", fontSize: 11 }}>{def}</td>
                <td style={{ padding: "6px 0", color: "#6B7280" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
