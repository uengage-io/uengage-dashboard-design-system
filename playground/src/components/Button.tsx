import { Button } from "@uengage/ui";
import { ArrowLeft, ArrowRight, Download, Plus, Trash2, Zap } from "lucide-react";
import { useState } from "react";

const VARIANTS = [
  { variant: "primary", label: "Primary" },
  { variant: "secondary", label: "Secondary" },
  { variant: "tertiary", label: "Tertiary" },
  { variant: "alertPrimary", label: "Alert Primary" },
  { variant: "alertSecondary", label: "Alert Secondary" },
  { variant: "warningPrimary", label: "Warning Primary" },
] as const;

const SIZES = ["xs", "sm", "md", "lg"] as const;

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
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
      {label && <span style={{ width: 130, fontSize: 12, color: "#9ca3af", flexShrink: 0 }}>{label}</span>}
      {children}
    </div>
  );
}

export default function ButtonPreview() {
  const [loadingVariant, setLoadingVariant] = useState<string | null>(null);

  function handleLoadingClick(variant: string) {
    setLoadingVariant(variant);
    setTimeout(() => setLoadingVariant(null), 2000);
  }

  return (
    <div style={{ fontFamily: "Figtree, sans-serif", maxWidth: 900, margin: "0 auto", padding: "40px 32px", background: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Button</h1>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 40 }}>
        6 variants · 4 sizes · icons · loading · disabled
      </p>

      {/* ── Variants ───────────────────────────────────────────── */}
      <Section title="Variants">
        <Row>
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant} title={label} size="md" />
          ))}
        </Row>
      </Section>

      {/* ── Sizes ──────────────────────────────────────────────── */}
      <Section title="Sizes">
        {SIZES.map((size) => (
          <Row key={size} label={size.toUpperCase()}>
            {VARIANTS.map(({ variant, label }) => (
              <Button key={variant} variant={variant} title={label} size={size} />
            ))}
          </Row>
        ))}
      </Section>

      {/* ── Icons ──────────────────────────────────────────────── */}
      <Section title="With Icons">
        <Row label="Left icon">
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant} title={label} size="sm" leftIcon={<ArrowLeft />} />
          ))}
        </Row>
        <Row label="Right icon">
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant} title={label} size="sm" rightIcon={<ArrowRight />} />
          ))}
        </Row>
        <Row label="Both icons">
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant} title={label} size="sm" leftIcon={<Download />} rightIcon={<Zap />} />
          ))}
        </Row>
        <Row label="Icon only">
          {VARIANTS.map(({ variant }) => (
            <Button key={variant} variant={variant} size="sm" leftIcon={<Plus />} aria-label="Add" />
          ))}
        </Row>
      </Section>

      {/* ── Loading ────────────────────────────────────────────── */}
      <Section title="Loading State">
        <Row label="Click to trigger">
          {VARIANTS.map(({ variant, label }) => (
            <Button
              key={variant}
              variant={variant}
              title={label}
              size="sm"
              loading={loadingVariant === variant}
              onClick={() => handleLoadingClick(variant)}
            />
          ))}
        </Row>
        <Row label="Always loading">
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant} title={label} size="sm" loading />
          ))}
        </Row>
      </Section>

      {/* ── Disabled ───────────────────────────────────────────── */}
      <Section title="Disabled State">
        <Row>
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant} title={label} size="sm" disabled />
          ))}
        </Row>
        <Row label="With icon">
          {VARIANTS.map(({ variant, label }) => (
            <Button key={variant} variant={variant} title={label} size="sm" leftIcon={<Trash2 />} disabled />
          ))}
        </Row>
      </Section>

      {/* ── Size × Variant matrix ──────────────────────────────── */}
      <Section title="Size × Variant Matrix">
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ padding: "8px 16px 8px 0", textAlign: "left", fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>Size</th>
                {VARIANTS.map(({ label }) => (
                  <th key={label} style={{ padding: "8px 12px", textAlign: "center", fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map((size) => (
                <tr key={size} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 16px 12px 0", fontSize: 12, color: "#374151", fontWeight: 600 }}>{size.toUpperCase()}</td>
                  {VARIANTS.map(({ variant, label }) => (
                    <td key={variant} style={{ padding: "12px", textAlign: "center" }}>
                      <Button variant={variant} title={label} size={size} leftIcon={<Zap />} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
