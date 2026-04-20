import { useState } from "react";
import { Select } from "@uengage/ui";
import type { SelectOption } from "@uengage/ui";

/* ── Data ─────────────────────────────────────────────────────── */

const CATEGORIES: SelectOption[] = [
  { value: "burgers", label: "Burgers" },
  { value: "pizza", label: "Pizza" },
  { value: "beverages", label: "Beverages" },
  { value: "desserts", label: "Desserts" },
  { value: "salads", label: "Salads" },
  { value: "sides", label: "Sides" },
];

const CITIES: SelectOption[] = [
  { value: "bangalore", label: "Bangalore" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "pune", label: "Pune" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "chennai", label: "Chennai" },
  { value: "kolkata", label: "Kolkata" },
];

const OUTLETS: SelectOption[] = [
  { value: "o1", label: "MG Road – Bangalore" },
  { value: "o2", label: "Koramangala – Bangalore" },
  { value: "o3", label: "Indiranagar – Bangalore" },
  { value: "o4", label: "Whitefield – Bangalore" },
  { value: "o5", label: "HSR Layout – Bangalore" },
  { value: "o6", label: "Bandra – Mumbai", disabled: true },
  { value: "o7", label: "Lower Parel – Mumbai" },
  { value: "o8", label: "Andheri – Mumbai" },
  { value: "o9", label: "Connaught Place – Delhi" },
  { value: "o10", label: "Hauz Khas – Delhi" },
];

/* ── Helpers ──────────────────────────────────────────────────── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ borderTop: "1px solid #E5E7EB", paddingTop: 24 }}>
      <h2
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: 16,
          
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p style={{ marginTop: 6, fontSize: 12, color: "#9CA3AF" }}>{hint}</p>
      )}
    </div>
  );
}

/* ── Demo ─────────────────────────────────────────────────────── */

export default function SelectDemo() {
  const [category, setCategory] = useState<string>("");
  const [cities, setCities] = useState<string[]>(["bangalore", "mumbai"]);
  const [outlets, setOutlets] = useState<string[]>([]);
  const [disabledVal] = useState<string>("pizza");

  return (
    <div
      style={{
        fontFamily: "Figtree, sans-serif",
        maxWidth: 720,
        margin: "0 auto",
        padding: "40px 24px",
      }}
    >
      <h1
        style={{
          fontSize: 26,
          fontWeight: 700,
          marginBottom: 8,
          color: "#111827",
        }}
      >
        CustomSelect
      </h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 36 }}>
        Popover + cmdk · single &amp; multi · keyboard nav · aria
      </p>

      {/* ── Single select ── */}
      <Section title="Single select">
        <Field
          label="Category"
          hint={category ? `value: "${category}"` : "Nothing selected"}
        >
          <Select
          size="sm"
            options={CATEGORIES}
            value={category}
            placeholder="Choose a category... "
            onChange={(v) => setCategory(v as string)}
          />
        </Field>
        <Field
          label="Disabled (pre-filled)"
          hint="Trigger and items are non-interactive"
        >
          <Select options={CATEGORIES} value={disabledVal} disabled={true} />
        </Field>
      </Section>

      {/* ── Multi select ── */}
      <Section title="Multi-select">
        <Field
          label="Cities (pre-filled: Bangalore · Mumbai)"
          hint={
            cities.length
              ? `${cities.length} selected: ${cities.join(", ")}`
              : "Nothing selected"
          }
        >
          <Select
            options={CITIES}
            mode="multi"
            value={cities}
            placeholder="Choose cities..."
            onChange={(v) => setCities(v as string[])}
            
          />
        </Field>
      </Section>

      {/* ── Select Outlets ── */}
      <Section title="Select Outlets">
        <Field
          label="Outlets (Bandra – Mumbai is disabled)"
          hint={
            outlets.length
              ? `${outlets.length} outlet${outlets.length !== 1 ? "s" : ""} selected`
              : "No outlets selected"
          }
        >
          <Select
            options={OUTLETS}
            mode="multi"
            value={outlets}
            placeholder="Select outlets..."
            onChange={(v) => setOutlets(v as string[])}
           
          />
        </Field>
      </Section>

      {/* ── No explicit width ── */}
      <Section title="No width prop (stretches to parent)">
        <Field label="Popover matches trigger width via CSS var">
          <div style={{ width: 320 }}>
            <Select
              options={CATEGORIES}
              mode="multi"
              placeholder="Full-width select..."
              onChange={() => {}}
            />
          </div>
        </Field>
      </Section>

      {/* ── Keyboard nav reminder ── */}
      <section
        style={{ borderTop: "1px solid #E5E7EB", paddingTop: 24, marginTop: 8 }}
      >
        <h2
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#6B7280",
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 12,
          }}
        >
          Keyboard nav
        </h2>
        <table
          style={{
            fontSize: 13,
            color: "#374151",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <tbody>
            {[
              ["Enter / Space", "Open trigger · select focused item"],
              ["↑ / ↓", "Navigate items (cmdk)"],
              ["Type anything", "Filter items via CommandInput"],
              ["Escape", "Close popover, return focus to trigger"],
            ].map(([key, desc]) => (
              <tr key={key} style={{ borderBottom: "1px solid #F3F4F6" }}>
                <td
                  style={{
                    padding: "8px 16px 8px 0",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  <kbd
                    style={{
                      background: "#F3F4F6",
                      borderRadius: 4,
                      padding: "2px 6px",
                      fontFamily: "monospace",
                    }}
                  >
                    {key}
                  </kbd>
                </td>
                <td style={{ padding: "8px 0", color: "#6B7280" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
       <Select
          size="xs"
            options={CATEGORIES}
            value={category}
            placeholder="Choose a category... "
            onChange={(v) => setCategory(v as string)}
          />
      <Select
          size="sm"
            options={CATEGORIES}
            value={category}
            placeholder="Choose a category... "
            onChange={(v) => setCategory(v as string)}
          /><Select
          size="md"
            options={CATEGORIES}
            value={category}
            placeholder="Choose a category... "
            onChange={(v) => setCategory(v as string)}
          /><Select
          size="lg"
            options={CATEGORIES}
            value={category}
            placeholder="Choose a category... "
            onChange={(v) => setCategory(v as string)}
          />
    </div>
  );
}
