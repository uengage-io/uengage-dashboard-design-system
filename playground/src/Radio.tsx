import { useState } from "react";
import { CustomRadioGroup } from "@uengage/ui";
import type { RadioOption } from "@uengage/ui";

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
}: {
  label?: string;
  children: React.ReactNode;
  snippet: string;
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
      <div style={{ marginBottom: 10 }}>{children}</div>
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

const SEGMENT_OPTIONS: RadioOption[] = [
  { value: "champions", label: "Champions" },
  { value: "loyal-customers", label: "Loyal Customers" },
  { value: "potential-loyalists", label: "Potential Loyalists" },
  { value: "new-transacting-customers", label: "New Transacting Customers" },
  { value: "promising", label: "Promising" },
  { value: "need-attention", label: "Need Attention" },
  { value: "about-to-sleep", label: "About to Sleep" },
  { value: "at-risk", label: "At Risk" },
  { value: "cant-lose-them", label: "Can't Lose Them" },
  { value: "hibernating", label: "Hibernating" },
  { value: "lost", label: "Lost" },
  { value: "regular", label: "Regular" },
];

const THREE_OPTIONS: RadioOption[] = [
  { value: "one", label: "Option One" },
  { value: "two", label: "Option Two" },
  { value: "three", label: "Option Three" },
];

const SIX_OPTIONS: RadioOption[] = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma" },
  { value: "delta", label: "Delta" },
  { value: "epsilon", label: "Epsilon" },
  { value: "zeta", label: "Zeta" },
];

/* ── Demo ─────────────────────────────────────────────────────── */

export default function RadioPage() {
  const [liveValue, setLiveValue] = useState<string>("champions");

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
        CustomRadioGroup
      </h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
        Controlled / uncontrolled · sizes · layouts · state variants
      </p>

      {/* ── (1) Live controlled ─────────────────────────────────── */}
      <Section
        title="1. Live (controlled)"
        subtitle="Customer-segment picker — horizontal layout, wraps naturally. Selected value updates in real time."
      >
        <div style={{ marginBottom: 12 }}>
          <CustomRadioGroup
            options={SEGMENT_OPTIONS}
            value={liveValue}
            onChange={setLiveValue}
            layout="horizontal"
          />
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <Stat label="selected value" value={liveValue} />
          <Stat
            label="label"
            value={
              SEGMENT_OPTIONS.find((o) => o.value === liveValue)?.label ?? ""
            }
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
            {`const [value, setValue] = useState("champions");\n<CustomRadioGroup\n  options={SEGMENT_OPTIONS}\n  value={value}\n  onChange={setValue}\n  layout="horizontal"\n/>`}
          </code>
        </pre>
      </Section>

      {/* ── (2) Size variants ───────────────────────────────────── */}
      <Section
        title="2. Size variants"
        subtitle="sm · md · lg — circle, dot, and label text scale together."
      >
        {(["sm", "md", "lg"] as const).map((s) => (
          <Field
            key={s}
            label={`size="${s}"`}
            snippet={`<CustomRadioGroup\n  options={THREE_OPTIONS}\n  defaultValue="one"\n  size="${s}"\n  layout="vertical"\n/>`}
          >
            <CustomRadioGroup
              options={THREE_OPTIONS}
              defaultValue="one"
              size={s}
              layout="vertical"
            />
          </Field>
        ))}
      </Section>

      {/* ── (3) Layout variants ─────────────────────────────────── */}
      <Section
        title="3. Layout variants"
        subtitle="horizontal (flex-wrap) · vertical (column) · grid (columns prop)."
      >
        <Field
          label={`layout="horizontal"`}
          snippet={`<CustomRadioGroup\n  options={SIX_OPTIONS}\n  defaultValue="alpha"\n  layout="horizontal"\n/>`}
        >
          <CustomRadioGroup
            options={SIX_OPTIONS}
            defaultValue="alpha"
            layout="horizontal"
          />
        </Field>

        <Field
          label={`layout="vertical"`}
          snippet={`<CustomRadioGroup\n  options={SIX_OPTIONS}\n  defaultValue="alpha"\n  layout="vertical"\n/>`}
        >
          <CustomRadioGroup
            options={SIX_OPTIONS}
            defaultValue="alpha"
            layout="vertical"
          />
        </Field>

        <Field
          label={`layout="grid" columns={3}`}
          snippet={`<CustomRadioGroup\n  options={SIX_OPTIONS}\n  defaultValue="alpha"\n  layout="grid"\n  columns={3}\n/>`}
        >
          <CustomRadioGroup
            options={SIX_OPTIONS}
            defaultValue="alpha"
            layout="grid"
            columns={3}
          />
        </Field>
      </Section>

      {/* ── (4) State variants ──────────────────────────────────── */}
      <Section
        title="4. State variants"
        subtitle="Unselected · pre-selected · group-disabled · single-disabled · label + helper · label + error."
      >
        <Field
          label="Unselected (no default)"
          snippet={`<CustomRadioGroup\n  options={THREE_OPTIONS}\n  layout="vertical"\n/>`}
        >
          <CustomRadioGroup options={THREE_OPTIONS} layout="vertical" />
        </Field>

        <Field
          label={`Pre-selected (defaultValue="two")`}
          snippet={`<CustomRadioGroup\n  options={THREE_OPTIONS}\n  defaultValue="two"\n  layout="vertical"\n/>`}
        >
          <CustomRadioGroup
            options={THREE_OPTIONS}
            defaultValue="two"
            layout="vertical"
          />
        </Field>

        <Field
          label="Group disabled"
          snippet={`<CustomRadioGroup\n  options={THREE_OPTIONS}\n  defaultValue="one"\n  disabled\n  layout="vertical"\n/>`}
        >
          <CustomRadioGroup
            options={THREE_OPTIONS}
            defaultValue="one"
            disabled
            layout="vertical"
          />
        </Field>

        <Field
          label="Single item disabled (option.disabled)"
          snippet={`<CustomRadioGroup\n  options={[\n    { value: "one", label: "Option One" },\n    { value: "two", label: "Option Two", disabled: true },\n    { value: "three", label: "Option Three" },\n  ]}\n  defaultValue="one"\n  layout="vertical"\n/>`}
        >
          <CustomRadioGroup
            options={[
              { value: "one", label: "Option One" },
              { value: "two", label: "Option Two", disabled: true },
              { value: "three", label: "Option Three" },
            ]}
            defaultValue="one"
            layout="vertical"
          />
        </Field>

        <Field
          label="With group label + helper text"
          snippet={`<CustomRadioGroup\n  label="Customer segment"\n  helperText="Pick the segment this campaign targets."\n  options={THREE_OPTIONS}\n  defaultValue="one"\n  layout="horizontal"\n/>`}
        >
          <CustomRadioGroup
            label="Customer segment"
            helperText="Pick the segment this campaign targets."
            options={THREE_OPTIONS}
            defaultValue="one"
            layout="horizontal"
          />
        </Field>

        <Field
          label="With group label + error"
          snippet={`<CustomRadioGroup\n  label="Customer segment"\n  error="Please select a segment before continuing."\n  options={THREE_OPTIONS}\n  layout="horizontal"\n/>`}
        >
          <CustomRadioGroup
            label="Customer segment"
            error="Please select a segment before continuing."
            options={THREE_OPTIONS}
            layout="horizontal"
          />
        </Field>
      </Section>
    </div>
  );
}
