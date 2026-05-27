import * as React from "react";
import {
  RadioGroup,
  CheckboxGroup,
  Select,
  DatePicker,
} from "@uengage/ui";
import type { DateRange } from "@uengage/ui";

/* ── tiny layout helpers ──────────────────────────────────────────── */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#9ca3af",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: description ? 4 : 20,
          paddingBottom: 8,
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        {title}
      </h2>
      {description && (
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
          {description}
        </p>
      )}
      {children}
    </section>
  );
}

function Row({
  label,
  children,
  vertical,
}: {
  label?: string;
  children: React.ReactNode;
  vertical?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: vertical ? "flex-start" : "center",
        flexDirection: vertical ? "column" : "row",
        gap: vertical ? 12 : 24,
        marginBottom: 20,
        flexWrap: "wrap",
      }}
    >
      {label && (
        <span
          style={{
            width: vertical ? "auto" : 130,
            fontSize: 12,
            color: "#9ca3af",
            flexShrink: 0,
            paddingTop: vertical ? 0 : 2,
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

function Chip({ label, color = "#6b7280" }: { label: string; color?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 600,
        background: color + "18",
        color,
        border: `1px solid ${color}30`,
      }}
    >
      {label}
    </span>
  );
}

/* ── option sets ──────────────────────────────────────────────────── */

const ZONE_OPTIONS = [
  { value: "delivery-distance", label: "Delivery Distance" },
  { value: "polygons", label: "Polygons" },
  { value: "pin-codes", label: "Pin Codes" },
];

const SEGMENT_OPTIONS = [
  { value: "champions", label: "Champions" },
  { value: "loyal", label: "Loyal Customers" },
  { value: "at-risk", label: "At Risk" },
  { value: "hibernating", label: "Hibernating" },
  { value: "new", label: "New" },
];

const TAG_OPTIONS = [
  { value: "express", label: "Express" },
  { value: "fragile", label: "Fragile" },
  { value: "cod", label: "COD" },
  { value: "prepaid", label: "Prepaid" },
  { value: "return", label: "Return" },
];

const CITY_OPTIONS = [
  { value: "chd", label: "Chandigarh" },
  { value: "del", label: "Delhi" },
  { value: "bom", label: "Mumbai" },
  { value: "blr", label: "Bengaluru" },
  { value: "hyd", label: "Hyderabad" },
  { value: "maa", label: "Chennai" },
];

/* ── main demo ────────────────────────────────────────────────────── */

export default function Demo() {
  /* Radio */
  const [zone, setZone] = React.useState("delivery-distance");

  /* Checkbox */
  const [segments, setSegments] = React.useState<string[]>(["champions"]);
  const [tags, setTags] = React.useState<string[]>(["prepaid"]);

  /* Select */
  const [city, setCity] = React.useState<string | string[]>("");
  const [multiCity, setMultiCity] = React.useState<string | string[]>([]);

  /* DatePicker */
  const [singleDate, setSingleDate] = React.useState<Date | null>(null);
  const [rangeDate, setRangeDate] = React.useState<DateRange | null>(null);

  return (
    <div
      style={{
        fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif",
        maxWidth: 860,
        margin: "0 auto",
        padding: "48px 32px 80px",
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* ── page header ─────────────────────────────────────────────── */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>
            Component Demo
          </h1>
          <Chip label="Pill Design" color="#007A4D" />
        </div>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Radio · Checkbox · Select · DatePicker — with label, required star,
          helper text, error states, and horizontal pill layout.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  RADIO                                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <Section
        title="Radio"
        description="Pill-button radio items. Green border + tinted background on selection."
      >
        <Row label="Horizontal" vertical>
          <RadioGroup
            label="Delivery zone type"
            options={ZONE_OPTIONS}
            value={zone}
            onChange={setZone}
            layout="horizontal"
          />
        </Row>

        <Row label="Required" vertical>
          <RadioGroup
            label="Delivery zone type"
            required
            options={ZONE_OPTIONS}
            value={zone}
            onChange={setZone}
            layout="horizontal"
            helperText="Determines how delivery areas are drawn on the map."
          />
        </Row>

        <Row label="With error" vertical>
          <RadioGroup
            label="Delivery zone type"
            required
            options={ZONE_OPTIONS}
            layout="horizontal"
            error="Please select a delivery zone type."
          />
        </Row>

        <Row label="Vertical" vertical>
          <div style={{ width: 280 }}>
            <RadioGroup
              label="Zone type"
              options={ZONE_OPTIONS}
              value={zone}
              onChange={setZone}
              layout="vertical"
            />
          </div>
        </Row>

        <Row label="Disabled" vertical>
          <RadioGroup
            label="Zone type"
            options={ZONE_OPTIONS}
            defaultValue="polygons"
            layout="horizontal"
            disabled
          />
        </Row>

        <Row label="Sizes" vertical>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 24, fontSize: 11, color: "#9ca3af" }}>{s}</span>
                <RadioGroup
                  options={ZONE_OPTIONS.slice(0, 2)}
                  defaultValue="delivery-distance"
                  layout="horizontal"
                  size={s}
                />
              </div>
            ))}
          </div>
        </Row>
      </Section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  CHECKBOX                                                     */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <Section
        title="Checkbox"
        description="Pill-button checkboxes — same green border / tint treatment as Radio."
      >
        <Row label="Horizontal" vertical>
          <CheckboxGroup
            label="Customer segments"
            options={SEGMENT_OPTIONS}
            value={segments}
            onChange={setSegments}
            layout="horizontal"
          />
        </Row>

        <Row label="Required" vertical>
          <CheckboxGroup
            label="Order tags"
            required
            options={TAG_OPTIONS}
            value={tags}
            onChange={setTags}
            layout="horizontal"
            helperText="Tags help filter and sort orders in the dashboard."
          />
        </Row>

        <Row label="With error" vertical>
          <CheckboxGroup
            label="Customer segments"
            required
            options={SEGMENT_OPTIONS.slice(0, 3)}
            layout="horizontal"
            error="Select at least one segment to continue."
          />
        </Row>

        <Row label="Select all" vertical>
          <div style={{ width: 480 }}>
            <CheckboxGroup
              label="Notification channels"
              options={TAG_OPTIONS}
              value={tags}
              onChange={setTags}
              layout="horizontal"
              selectAll
              helperText="Toggle all with the select-all pill."
            />
          </div>
        </Row>

        <Row label="Sizes" vertical>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 24, fontSize: 11, color: "#9ca3af" }}>{s}</span>
                <CheckboxGroup
                  options={TAG_OPTIONS.slice(0, 3)}
                  value={["prepaid"]}
                  layout="horizontal"
                  size={s}
                />
              </div>
            ))}
          </div>
        </Row>
      </Section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  SELECT                                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <Section title="Select" description="Single and multi-select with label and required star.">
        <Row label="Single" vertical>
          <div style={{ width: 300 }}>
            <Select
              label="City"
              required
              options={CITY_OPTIONS}
              value={typeof city === "string" ? city : ""}
              onChange={setCity}
              mode="single"
              placeholder="Pick a city"
              helperText="Choose the city for this delivery order."
            />
          </div>
        </Row>

        <Row label="Multi" vertical>
          <div style={{ width: 360 }}>
            <Select
              label="Cities"
              options={CITY_OPTIONS}
              value={Array.isArray(multiCity) ? multiCity : []}
              onChange={setMultiCity}
              mode="multi"
              placeholder="Pick cities"
              clearable
              helperText="Select all cities this campaign covers."
            />
          </div>
        </Row>

        <Row label="With error" vertical>
          <div style={{ width: 300 }}>
            <Select
              label="City"
              required
              options={CITY_OPTIONS}
              mode="single"
              placeholder="Pick a city"
              error="City is required."
            />
          </div>
        </Row>

        <Row label="Disabled" vertical>
          <div style={{ width: 300 }}>
            <Select
              label="City"
              options={CITY_OPTIONS}
              mode="single"
              placeholder="Pick a city"
              disabled
            />
          </div>
        </Row>

        <Row label="Sizes" vertical>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {(["xs", "sm", "md", "lg"] as const).map((s) => (
              <div key={s} style={{ width: 180 }}>
                <Select
                  label={`size=${s}`}
                  options={CITY_OPTIONS}
                  mode="single"
                  size={s}
                  placeholder={s}
                />
              </div>
            ))}
          </div>
        </Row>
      </Section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  DATEPICKER                                                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <Section title="DatePicker" description="Single, range, and month modes with label and required star.">
        <Row label="Single" vertical>
          <div style={{ width: 280 }}>
            <DatePicker
              label="Delivery date"
              required
              mode="single"
              value={singleDate}
              onChange={(d) => setSingleDate(d as Date | null)}
              placeholder="Select a date"
              clearable
              helperText="Expected delivery date for this order."
            />
          </div>
        </Row>

        <Row label="Range" vertical>
          <div style={{ width: 300 }}>
            <DatePicker
              label="Campaign period"
              required
              mode="range"
              value={rangeDate}
              onChange={(r) => setRangeDate(r as DateRange | null)}
              placeholder="Start → End"
              clearable
              helperText="Choose the start and end dates."
            />
          </div>
        </Row>

        <Row label="Month" vertical>
          <div style={{ width: 220 }}>
            <DatePicker
              label="Billing month"
              mode="month"
              placeholder="Select month"
              helperText="Used for monthly invoice generation."
            />
          </div>
        </Row>

        <Row label="With error" vertical>
          <div style={{ width: 280 }}>
            <DatePicker
              label="Delivery date"
              required
              mode="single"
              placeholder="Select a date"
              error="Delivery date is required."
            />
          </div>
        </Row>

        <Row label="Disabled" vertical>
          <div style={{ width: 280 }}>
            <DatePicker
              label="Delivery date"
              mode="single"
              placeholder="Not available"
              disabled
            />
          </div>
        </Row>

        <Row label="Sizes" vertical>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {(["sm", "md", "lg"] as const).map((s) => (
              <div key={s} style={{ width: 200 }}>
                <DatePicker
                  label={`size=${s}`}
                  mode="single"
                  size={s}
                  placeholder={s}
                />
              </div>
            ))}
          </div>
        </Row>
      </Section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/*  COMBINED FORM                                                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <Section
        title="Combined — live form"
        description="All four components wired together with shared state."
      >
        <div
          style={{
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 560,
          }}
        >
          <RadioGroup
            label="Delivery zone type"
            required
            options={ZONE_OPTIONS}
            value={zone}
            onChange={setZone}
            layout="horizontal"
          />

          <CheckboxGroup
            label="Customer segments"
            options={SEGMENT_OPTIONS}
            value={segments}
            onChange={setSegments}
            layout="horizontal"
            helperText="Select all segments to target."
          />

          <Select
            label="City"
            required
            options={CITY_OPTIONS}
            value={typeof city === "string" ? city : ""}
            onChange={setCity}
            mode="single"
            placeholder="Pick a city"
            width="w-full"
          />

          <DatePicker
            label="Delivery date"
            required
            mode="single"
            value={singleDate}
            onChange={(d) => setSingleDate(d as Date | null)}
            placeholder="Select a date"
            clearable
            width="w-full"
          />

          {/* readout */}
          <pre
            style={{
              background: "#111827",
              color: "#d1fae5",
              borderRadius: 8,
              padding: "12px 16px",
              fontSize: 11,
              lineHeight: 1.7,
              margin: 0,
              overflow: "auto",
            }}
          >
            {JSON.stringify(
              {
                zone,
                segments,
                city,
                deliveryDate: singleDate ? singleDate.toDateString() : null,
              },
              null,
              2,
            )}
          </pre>
        </div>
      </Section>
    </div>
  );
}
