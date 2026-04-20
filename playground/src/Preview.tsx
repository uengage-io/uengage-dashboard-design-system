import { useState } from "react";
import { Button } from "@uengage/ui";
import { ArrowBigDown, Save } from "lucide-react";

export default function Preview() {
  /* Toggle loading (uncontrolled via a local async) */
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Figtree, sans-serif",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 24,
        maxWidth: 720,
      }}
    >
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
        Button — loading state
      </h1>

      {/* 1. Static loading — always spinning */}
      <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>
          1. Static loading
        </h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="primary" size="md" title="Saving…" loading />
          <Button variant="secondary" size="md" title="Processing…" loading />
          <Button variant="alertPrimary" size="md" title="Deleting…" loading />
        </div>
        <pre style={codeStyle}>
          <code>{`<Button title="Saving…" loading />`}</code>
        </pre>
      </section>

      {/* 2. Click to trigger async loading */}
      <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>
          2. Async click → loading → done
        </h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button
            variant="primary"
            size="md"
            title={saving ? "Saving…" : "Save changes"}
            leftIcon={!saving ? <Save /> : undefined}
            loading={saving}
            onClick={handleSave}
          />
          <span style={{ fontSize: 12, color: "#6B7280" }}>
            {saving ? "busy for 2s…" : "idle"}
          </span>
        </div>
        <pre style={codeStyle}>
          <code>
            {`const [saving, setSaving] = useState(false);\nconst handleSave = async () => {\n  setSaving(true);\n  try { await save(); } finally { setSaving(false); }\n};\n<Button\n  title={saving ? "Saving…" : "Save changes"}\n  leftIcon={!saving ? <Save /> : undefined}\n  loading={saving}\n  onClick={handleSave}\n/>`}
          </code>
        </pre>
      </section>

      {/* 3. Across sizes */}
      <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>
          3. Loading across sizes
        </h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <Button
              key={s}
              variant="primary"
              size={s}
              title={`Loading ${s}`}
              loading
            />
          ))}
        </div>
        <pre style={codeStyle}>
          <code>{`<Button size="xs" title="Loading xs" loading />\n<Button size="sm" title="Loading sm" loading />\n<Button size="md" title="Loading md" loading />\n<Button size="lg" title="Loading lg" loading />`}</code>
        </pre>
      </section>

      {/* 4. Idle + normal */}
      <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2 style={{ fontSize: 13, color: "#6B7280", margin: 0 }}>
          4. Regular button (no loading)
        </h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button
            variant="primary"
            size="md"
            title="click me"
            leftIcon={<ArrowBigDown />}
            onClick={() => console.log("Clicked")}
          />
        </div>
      </section>
    </div>
  );
}

const codeStyle: React.CSSProperties = {
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
};
