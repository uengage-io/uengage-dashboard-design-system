import { useState } from "react";
import { SearchBar, Select, Input } from "@uengage/ui";

/* ── Shared dataset ─────────────────────────────────────────────────────── */

const CITIES = [
  { value: "del", label: "New Delhi" },
  { value: "mum", label: "Mumbai" },
  { value: "blr", label: "Bengaluru" },
  { value: "hyd", label: "Hyderabad" },
  { value: "chn", label: "Chennai" },
  { value: "kol", label: "Kolkata" },
  { value: "pun", label: "Pune" },
  { value: "ahm", label: "Ahmedabad" },
  { value: "jai", label: "Jaipur" },
  { value: "luc", label: "Lucknow" },
  { value: "sur", label: "Surat" },
  { value: "nag", label: "Nagpur" },
  { value: "ind", label: "Indore" },
  { value: "pat", label: "Patna" },
  { value: "bho", label: "Bhopal" },
];

const PRODUCTS = [
  { value: "p1", label: "Wireless Noise-Cancelling Headphones" },
  { value: "p2", label: "Mechanical Keyboard" },
  { value: "p3", label: "4K Ultra HD Monitor" },
  { value: "p4", label: "USB-C Docking Station" },
  { value: "p5", label: "Ergonomic Office Chair" },
  { value: "p6", label: "Laptop Stand" },
  { value: "p7", label: "Webcam 1080p" },
  { value: "p8", label: "Wireless Mouse" },
  { value: "p9", label: "LED Desk Lamp" },
  { value: "p10", label: "Portable SSD 1TB" },
  { value: "p11", label: "Noise Isolating Earbuds" },
  { value: "p12", label: "Smart Speaker" },
];

const TEAM_MEMBERS = [
  { value: "u1", label: "Aman Preet Singh" },
  { value: "u2", label: "Rahul Sharma" },
  { value: "u3", label: "Priya Verma" },
  { value: "u4", label: "Ankit Gupta" },
  { value: "u5", label: "Sneha Nair" },
  { value: "u6", label: "Rohit Mehta" },
  { value: "u7", label: "Divya Kapoor" },
  { value: "u8", label: "Karan Malhotra" },
  { value: "u9", label: "Nisha Joshi" },
  { value: "u10", label: "Vikram Rao" },
];

/* ── Hint badges ─────────────────────────────────────────────────────────── */

function HintBadge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#EFF8EA",
        color: "#003C1B",
        fontSize: "0.7rem",
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: "999px",
        cursor: "pointer",
      }}
    >
      try: "{text}"
    </span>
  );
}

/* ── Section wrapper ─────────────────────────────────────────────────────── */

function Section({
  title,
  hint,
  children,
  result,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
  result?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        padding: "1.25rem",
        border: "1px solid #E5E7EB",
        borderRadius: "0.5rem",
        background: "#fff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
        <h3 style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 700, color: "#111827" }}>
          {title}
        </h3>
        <HintBadge text={hint} />
      </div>
      {children}
      {result && (
        <p style={{ margin: 0, fontSize: "0.8125rem", color: "#6B7280" }}>
          Selected:{" "}
          <strong style={{ color: "#003C1B", fontFamily: "monospace" }}>{result}</strong>
        </p>
      )}
    </div>
  );
}

/* ── Main preview ────────────────────────────────────────────────────────── */

export default function FuzzySearchPreview() {
  // SearchBar states
  const [searchVal, setSearchVal] = useState("");
  const [searchSelected, setSearchSelected] = useState("");

  // Select — single
  const [singleVal, setSingleVal] = useState("");

  // Select — multi
  const [multiVal, setMultiVal] = useState<string[]>([]);

  // Input suggestions
  const [inputVal, setInputVal] = useState("");
  const [inputSelected, setInputSelected] = useState("");

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "860px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div>
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#111827" }}>
          Fuzzy Search — Fuse.js
        </h2>
        <p style={{ margin: "0.35rem 0 0", fontSize: "0.875rem", color: "#6B7280" }}>
          All three components use the shared{" "}
          <code
            style={{
              background: "#F3F4F6",
              padding: "1px 6px",
              borderRadius: "4px",
              fontSize: "0.8125rem",
            }}
          >
            useFuzzySearch
          </code>{" "}
          hook. Try typing partial words, initials, or intentional typos — Fuse.js still finds the right result.
        </p>
      </div>

      {/* ── SearchBar ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#374151" }}>
          SearchBar
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Section
            title="City search (sm)"
            hint="bnglu → Bengaluru"
            result={searchSelected || "—"}
          >
            <div style={{ width: "280px" }}>
              <SearchBar
                size="sm"
                placeholder="Search cities…"
                value={searchVal}
                onChange={(v) => setSearchVal(String(v))}
                onClear={() => { setSearchVal(""); setSearchSelected(""); }}
                dropdownItems={CITIES}
                getLabel={(i) => i.label}
                getValue={(i) => i.value}
                onSelect={(val, item) => setSearchSelected(`${item?.label} (${val})`)}
                fallbackText="No city matched"
              />
            </div>
          </Section>

          <Section
            title="City search (md)"
            hint="puna → Pune"
            result={undefined}
          >
            <div style={{ width: "320px" }}>
              <SearchBar
                size="md"
                placeholder="Search cities…"
                dropdownItems={CITIES}
                getLabel={(i) => i.label}
                getValue={(i) => i.value}
                onSelect={(val, item) => console.log("md selected:", val, item)}
                onClear={() => {}}
                fallbackText="No city matched"
              />
            </div>
          </Section>

          <Section title="City search (lg)" hint="hydrbad → Hyderabad" result={undefined}>
            <div style={{ width: "380px" }}>
              <SearchBar
                size="lg"
                placeholder="Search cities…"
                dropdownItems={CITIES}
                getLabel={(i) => i.label}
                getValue={(i) => i.value}
                onSelect={() => {}}
                onClear={() => {}}
                fallbackText="No city matched"
              />
            </div>
          </Section>
        </div>
      </div>

      {/* ── Select ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#374151" }}>
          Select
        </h3>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Section
            title="Single — Products"
            hint="keybd → Mechanical Keyboard"
            result={singleVal || "—"}
          >
            <div style={{ width: "280px" }}>
              <Select
                items={PRODUCTS}
                getLabel={(i) => i.label}
                getValue={(i) => i.value}
                mode="single"
                size="md"
                placeholder="Select a product…"
                onChange={(v) => setSingleVal(String(v))}
              />
            </div>
          </Section>

          <Section
            title="Multi — Products"
            hint="montr → 4K Ultra HD Monitor"
            result={multiVal.length ? multiVal.join(", ") : "—"}
          >
            <div style={{ width: "280px" }}>
              <Select
                items={PRODUCTS}
                getLabel={(i) => i.label}
                getValue={(i) => i.value}
                mode="multi"
                size="md"
                placeholder="Select products…"
                onChange={(v) => setMultiVal(v as string[])}
              />
            </div>
          </Section>
        </div>
      </div>

      {/* ── Input ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#374151" }}>
          Input — Autocomplete Suggestions
        </h3>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Section
            title="Team member lookup (sm)"
            hint="rahl → Rahul Sharma"
            result={inputSelected || "—"}
          >
            <div style={{ width: "280px" }}>
              <Input
                size="sm"
                placeholder="Search team members…"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                suggestions={TEAM_MEMBERS}
                onSuggestionSelect={(val) => {
                  const found = TEAM_MEMBERS.find((m) => m.value === val);
                  if (found) { setInputVal(found.label); setInputSelected(found.label); }
                }}
              />
            </div>
          </Section>

          <Section
            title="Team member lookup (md)"
            hint="prya → Priya Verma"
            result={undefined}
          >
            <div style={{ width: "280px" }}>
              <Input
                size="md"
                placeholder="Search team members…"
                suggestions={TEAM_MEMBERS}
                onSuggestionSelect={(val) => console.log("md suggestion:", val)}
              />
            </div>
          </Section>

          <Section
            title="Team member lookup (lg)"
            hint="snha → Sneha Nair"
            result={undefined}
          >
            <div style={{ width: "320px" }}>
              <Input
                size="lg"
                placeholder="Search team members…"
                suggestions={TEAM_MEMBERS}
                onSuggestionSelect={(val) => console.log("lg suggestion:", val)}
              />
            </div>
          </Section>
        </div>
      </div>

      {/* ── Typo showcase ── */}
      <div
        style={{
          padding: "1rem 1.25rem",
          background: "#F9FAFB",
          border: "1px solid #E5E7EB",
          borderRadius: "0.5rem",
        }}
      >
        <p style={{ margin: "0 0 0.5rem", fontSize: "0.8125rem", fontWeight: 700, color: "#374151" }}>
          Fuse.js config (shared across all components)
        </p>
        <pre
          style={{
            margin: 0,
            fontSize: "0.75rem",
            color: "#374151",
            background: "transparent",
            whiteSpace: "pre-wrap",
          }}
        >
{`keys: ["label"]        // searches the display label
threshold: 0.35        // 0 = exact, 1 = anything — catches typos without noise
minMatchCharLength: 1  // starts matching from the first keystroke
ignoreLocation: true   // no penalty for matches deep inside the string
shouldSort: true       // best-scoring result bubbles to the top`}
        </pre>
      </div>
    </div>
  );
}
