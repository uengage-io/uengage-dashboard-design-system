import { useState } from "react";
import { Search, Calendar } from "lucide-react";
import { Input } from "@uengage/ui";
import type { InputType, AllowPattern } from "@uengage/ui";

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
        minWidth: 120,
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

/* ── Demo ─────────────────────────────────────────────────────── */

const PATTERN_HINTS: Record<
  Exclude<AllowPattern, "none">,
  { label: string; hint: string; sample: string }
> = {
  alphanumeric: {
    label: "Alphanumeric",
    hint: "A–Z, a–z, 0–9 only · spaces/punctuation blocked",
    sample: "Try typing: Abc 123!@#",
  },
  numeric: {
    label: "Numeric",
    hint: "Digits only · letters and symbols blocked",
    sample: "Try typing: 1a2b3c",
  },
  decimal: {
    label: "Decimal",
    hint: "Digits and a single dot · anything else blocked",
    sample: "Try typing: 12.34abc",
  },
  alpha: {
    label: "Alpha",
    hint: "Letters only · digits and symbols blocked",
    sample: "Try typing: abc123",
  },
  phone: {
    label: "Phone",
    hint: "Digits, spaces, + − ( ) only · letters blocked",
    sample: "Try typing: +91 (98) 7654-3210 ext. 5",
  },
};

const TYPE_CASES: Array<{
  inputType: InputType;
  label: string;
  placeholder: string;
}> = [
  { inputType: "text", label: "text", placeholder: "Plain text" },
  { inputType: "email", label: "email", placeholder: "you@example.com" },
  {
    inputType: "password",
    label: "password (with eye toggle)",
    placeholder: "••••••••",
  },
  { inputType: "number", label: "number", placeholder: "42" },
  { inputType: "tel", label: "tel", placeholder: "+91 98765 43210" },
  { inputType: "url", label: "url", placeholder: "https://uengage.in" },
];

export default function InputDemo() {
  /* (1) live controlled */
  const [liveValue, setLiveValue] = useState<string>("");
  const [liveType, setLiveType] = useState<InputType>("text");

  /* (4) allow pattern values — independent state per pattern */
  const [alphanumVal, setAlphanumVal] = useState("");
  const [numericVal, setNumericVal] = useState("");
  const [decimalVal, setDecimalVal] = useState("");
  const [alphaVal, setAlphaVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");

  const patternState: Record<Exclude<AllowPattern, "none">, [string, (v: string) => void]> = {
    alphanumeric: [alphanumVal, setAlphanumVal],
    numeric: [numericVal, setNumericVal],
    decimal: [decimalVal, setDecimalVal],
    alpha: [alphaVal, setAlphaVal],
    phone: [phoneVal, setPhoneVal],
  };

  return (
    <div
      style={{
        fontFamily: "Figtree, sans-serif",
        maxWidth: 760,
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
        CustomInput
      </h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
        Sizes · input types · allow patterns · label / helper / error / icons
      </p>

      {/* ── (1) Live controlled ─────────────────────────────────── */}
      <Section
        title="1. Live (controlled)"
        subtitle="Type in the field — value, type, and character count update in real time."
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["text", "email", "password", "number", "tel", "url"] as InputType[]).map(
              (t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLiveType(t)}
                  style={{
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "1px solid",
                    borderColor: liveType === t ? "#006F42" : "#D1D5DB",
                    background: liveType === t ? "#E6F4EA" : "#fff",
                    color: liveType === t ? "#006F42" : "#374151",
                    fontWeight: liveType === t ? 600 : 500,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {t}
                </button>
              ),
            )}
          </div>

          <Input
            label="Ticket name"
            placeholder="Type anything…"
            inputType={liveType}
            value={liveValue}
            onChange={(e) => setLiveValue(e.target.value)}
            helperText="Value, type, and length update below as you type."
          />

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Stat label="value" value={liveValue} />
            <Stat label="type" value={liveType} />
            <Stat label="length" value={liveValue.length} />
          </div>
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
            {`const [value, setValue] = useState("");\n<CustomInput\n  label="Ticket name"\n  inputType="${liveType}"\n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n  helperText="…"\n/>`}
          </code>
        </pre>
      </Section>

      {/* ── (2) Size variants ───────────────────────────────────── */}
      <Section title="2. Size variants" subtitle="sm · md · lg — padding, height, and text scale.">
        {(["sm", "md", "lg"] as const).map((s) => (
          <Field
            key={s}
            label={`size="${s}"`}
            snippet={`<CustomInput size="${s}" placeholder="Enter ticket name" />`}
          >
            <Input size={s} placeholder="Enter ticket name" />
          </Field>
        ))}
      </Section>

      {/* ── (3) Input type variants ─────────────────────────────── */}
      <Section
        title="3. Input type variants"
        subtitle="inputType is wired to the native <input type>. Password auto-renders an eye toggle."
      >
        {TYPE_CASES.map(({ inputType, label, placeholder }) => (
          <Field
            key={inputType}
            label={label}
            snippet={`<CustomInput inputType="${inputType}" placeholder="${placeholder}" />`}
          >
            <Input inputType={inputType} placeholder={placeholder} />
          </Field>
        ))}
      </Section>

      {/* ── (4) Allow pattern variants ──────────────────────────── */}
      <Section
        title="4. Allow pattern variants"
        subtitle="Disallowed characters are stripped in the onChange handler before reaching state."
      >
        {(
          Object.keys(PATTERN_HINTS) as Array<Exclude<AllowPattern, "none">>
        ).map((pattern) => {
          const [value, setValue] = patternState[pattern];
          const meta = PATTERN_HINTS[pattern];
          return (
            <Field
              key={pattern}
              label={`${meta.label} — ${meta.hint}`}
              snippet={`<Input\n  label="${meta.label}"\n  allowPattern="${pattern}"\n  placeholder="${meta.sample}"\n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n/>`}
            >
              <Input
                label={meta.label}
                allowPattern={pattern}
                placeholder={meta.sample}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                helperText={`stored: "${value}"`}
              />
            </Field>
          );
        })}
      </Section>

      {/* ── (5) State variants ──────────────────────────────────── */}
      <Section
        title="5. State variants"
        subtitle="Default · label+helper · label+error · disabled · left icon · right icon."
      >
        <Field
          label="Default"
          snippet={`<CustomInput placeholder="Enter ticket name" />`}
        >
          <Input placeholder="Enter ticket name" />
        </Field>

        <Field
          label="With label + helper text"
          snippet={`<CustomInput\n  label="Ticket name"\n  placeholder="Enter ticket name"\n  helperText="Short descriptive title — visible to the assignee."\n/>`}
        >
          <Input
            label="Ticket name"
            placeholder="Enter ticket name"
            helperText="Short descriptive title — visible to the assignee."
          />
        </Field>

        <Field
          label="With label + error (required)"
          snippet={`<CustomInput\n  label="Ticket name"\n  required\n  placeholder="Enter ticket name"\n  error="Ticket name is required."\n/>`}
        >
          <Input
            label="Ticket name"
            required
            placeholder="Enter ticket name"
            error="Ticket name is required."
          />
        </Field>

        <Field
          label="Disabled"
          snippet={`<CustomInput\n  label="Ticket name"\n  disabled\n  value="Locked — cannot edit"\n/>`}
        >
          <Input
            label="Ticket name"
            disabled
            value="Locked — cannot edit"
            onChange={() => {}}
          />
        </Field>

        <Field
          label="With left icon (search)"
          snippet={`<CustomInput\n  placeholder="Search tickets…"\n  leftIcon={<Search />}\n/>`}
        >
          <Input
            placeholder="Search tickets…"
            leftIcon={<Search />}
          />
        </Field>

        <Field
          label="With right icon (calendar)"
          snippet={`<CustomInput\n  placeholder="Pick a date"\n  rightIcon={<Calendar />}\n/>`}
        >
          <Input
            placeholder="Pick a date"
            rightIcon={<Calendar />}
          />
        </Field>
      </Section>
    </div>
  );
}
