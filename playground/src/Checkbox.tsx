import { useState } from "react";
import { CustomCheckbox, CustomCheckboxGroup } from "@uengage/ui";
import type { CheckboxOption } from "@uengage/ui";

/* ── Layout helpers ───────────────────────────────────────────── */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        borderTop: "1px solid #E5E7EB",
        paddingTop: 24,
        marginTop: 24,
      }}
    >
      <h2
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginBottom: subtitle ? 4 : 16,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 16 }}>
          {subtitle}
        </p>
      )}
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  snippet,
  surface,
}: {
  label?: string;
  children: React.ReactNode;
  snippet: string;
  surface?: "plain" | "cream";
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      {label && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#374151",
            marginBottom: 8,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          marginBottom: 10,
          padding: surface === "cream" ? "20px 24px" : 0,
          background: surface === "cream" ? "#FBF7EA" : "transparent",
          borderRadius: surface === "cream" ? 8 : 0,
          border:
            surface === "cream" ? "1px solid #EFE7CC" : "none",
        }}
      >
        {children}
      </div>
      <pre
        style={{
          overflowX: "auto",
          margin: 0,
          padding: "10px 12px",
          background: "#0B1220",
          color: "#E5E7EB",
          borderRadius: 6,
          fontSize: 11,
          lineHeight: 1.5,
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        <code>{snippet}</code>
      </pre>
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: "8px 12px",
        background: "#F9FAFB",
        border: "1px solid #E5E7EB",
        borderRadius: 6,
        minWidth: 160,
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#9CA3AF",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#111827",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          wordBreak: "break-all",
        }}
      >
        {value === "" ? "—" : value}
      </span>
    </div>
  );
}

/* ── Option sets ─────────────────────────────────────────────── */

const SLOT_OPTIONS: CheckboxOption[] = [
  { value: "morning", label: "Morning (5am - 11:58am)" },
  { value: "afternoon", label: "Afternoon (12pm - 3:59pm)" },
  { value: "evening", label: "Evening (4pm - 7:59pm)" },
  { value: "night", label: "Night (8pm - 11:59pm)" },
];

const SIX_OPTIONS: CheckboxOption[] = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma" },
  { value: "delta", label: "Delta" },
  { value: "epsilon", label: "Epsilon" },
  { value: "zeta", label: "Zeta" },
];

/* ── Demo ─────────────────────────────────────────────────────── */

export default function CheckboxDemo() {
  const [slots, setSlots] = useState<string[]>([
    "morning",
    "afternoon",
    "evening",
  ]);
  const [selectAllValue, setSelectAllValue] = useState<string[]>(["alpha"]);

  return (
    <div
      style={{
        fontFamily: "Figtree, sans-serif",
        maxWidth: 860,
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
        CustomCheckbox
      </h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
        Single · states · sizes · group layouts · selectAll · label / helper / error
      </p>

      {/* ── (1) Live controlled group ───────────────────────────── */}
      <Section
        title="1. Live (controlled group)"
        subtitle="Delivery time-slot picker — horizontal layout. Morning / Afternoon / Evening pre-checked."
      >
        <div
          style={{
            marginBottom: 12,
            padding: "20px 24px",
            background: "#FBF7EA",
            border: "1px solid #EFE7CC",
            borderRadius: 8,
          }}
        >
          <CustomCheckboxGroup
            options={SLOT_OPTIONS}
            value={slots}
            onChange={setSlots}
            layout="horizontal"
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          <Stat label="selected count" value={slots.length} />
          <Stat
            label="selected values"
            value={slots.length ? slots.join(", ") : ""}
          />
        </div>

        <pre
          style={{
            overflowX: "auto",
            margin: 0,
            padding: "10px 12px",
            background: "#0B1220",
            color: "#E5E7EB",
            borderRadius: 6,
            fontSize: 11,
            lineHeight: 1.5,
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        >
          <code>
            {`const [slots, setSlots] = useState(["morning", "afternoon", "evening"]);\n<CustomCheckboxGroup\n  options={SLOT_OPTIONS}\n  value={slots}\n  onChange={setSlots}\n  layout="horizontal"\n/>`}
          </code>
        </pre>
      </Section>

      {/* ── (2) Single-checkbox state row ───────────────────────── */}
      <Section
        title="2. Single checkbox states"
        subtitle="unchecked · checked · indeterminate · disabled unchecked · disabled checked · error."
      >
        <Field
          label="Row"
          snippet={`<CustomCheckbox label="Unchecked" />\n<CustomCheckbox label="Checked" defaultChecked />\n<CustomCheckbox label="Indeterminate" indeterminate />\n<CustomCheckbox label="Disabled unchecked" disabled />\n<CustomCheckbox label="Disabled checked" disabled defaultChecked />\n<CustomCheckbox label="Error" error defaultChecked />`}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "12px 24px",
            }}
          >
            <CustomCheckbox label="Unchecked" />
            <CustomCheckbox label="Checked" defaultChecked />
            <CustomCheckbox label="Indeterminate" indeterminate />
            <CustomCheckbox label="Disabled unchecked" disabled />
            <CustomCheckbox label="Disabled checked" disabled defaultChecked />
            <CustomCheckbox label="Error" error defaultChecked />
          </div>
        </Field>
      </Section>

      {/* ── (3) Size variants ───────────────────────────────────── */}
      <Section
        title="3. Size variants"
        subtitle="sm · md · lg — box, icon, label, and gap scale together."
      >
        {(["sm", "md", "lg"] as const).map((s) => (
          <Field
            key={s}
            label={`size="${s}"`}
            snippet={`<CustomCheckbox size="${s}" label="Opt in to updates" defaultChecked />`}
          >
            <CustomCheckbox
              size={s}
              label="Opt in to updates"
              defaultChecked
            />
          </Field>
        ))}
      </Section>

      {/* ── (4) Group layout variants ───────────────────────────── */}
      <Section
        title="4. Group layout variants"
        subtitle="horizontal (flex-wrap) · vertical (column) · grid (columns prop)."
      >
        <Field
          label={`layout="horizontal"`}
          snippet={`<CustomCheckboxGroup\n  options={SIX_OPTIONS}\n  layout="horizontal"\n/>`}
        >
          <CustomCheckboxGroup options={SIX_OPTIONS} layout="horizontal" />
        </Field>

        <Field
          label={`layout="vertical"`}
          snippet={`<CustomCheckboxGroup\n  options={SIX_OPTIONS}\n  layout="vertical"\n/>`}
        >
          <CustomCheckboxGroup options={SIX_OPTIONS} layout="vertical" />
        </Field>

        <Field
          label={`layout="grid" columns={2}`}
          snippet={`<CustomCheckboxGroup\n  options={SIX_OPTIONS}\n  layout="grid"\n  columns={2}\n/>`}
        >
          <CustomCheckboxGroup
            options={SIX_OPTIONS}
            layout="grid"
            columns={2}
          />
        </Field>
      </Section>

      {/* ── (5) Group feature variants ──────────────────────────── */}
      <Section
        title="5. Group feature variants"
        subtitle="selectAll · label + helperText · label + error · group disabled."
      >
        <Field
          label={`selectAll enabled`}
          snippet={`<CustomCheckboxGroup\n  options={SIX_OPTIONS}\n  value={value}\n  onChange={setValue}\n  layout="grid"\n  columns={2}\n  selectAll\n/>`}
        >
          <CustomCheckboxGroup
            options={SIX_OPTIONS}
            value={selectAllValue}
            onChange={setSelectAllValue}
            layout="grid"
            columns={2}
            selectAll
          />
        </Field>

        <Field
          label={`With label + helperText`}
          snippet={`<CustomCheckboxGroup\n  label="Notification channels"\n  helperText="Pick one or more channels to receive alerts on."\n  options={SIX_OPTIONS}\n  layout="horizontal"\n/>`}
        >
          <CustomCheckboxGroup
            label="Notification channels"
            helperText="Pick one or more channels to receive alerts on."
            options={SIX_OPTIONS}
            layout="horizontal"
          />
        </Field>

        <Field
          label={`With label + error`}
          snippet={`<CustomCheckboxGroup\n  label="Notification channels"\n  error="Select at least one channel."\n  options={SIX_OPTIONS}\n  layout="horizontal"\n/>`}
        >
          <CustomCheckboxGroup
            label="Notification channels"
            error="Select at least one channel."
            options={SIX_OPTIONS}
            layout="horizontal"
          />
        </Field>

        <Field
          label={`Group disabled`}
          snippet={`<CustomCheckboxGroup\n  options={SIX_OPTIONS}\n  value={["alpha", "beta"]}\n  disabled\n  layout="grid"\n  columns={2}\n/>`}
        >
          <CustomCheckboxGroup
            options={SIX_OPTIONS}
            value={["alpha", "beta"]}
            onChange={() => {}}
            disabled
            layout="grid"
            columns={2}
          />
        </Field>
      </Section>
    </div>
  );
}
