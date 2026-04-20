import { useState } from "react";
import { Tabs } from "@uengage/ui";
import type { TabItem } from "@uengage/ui";

/* ── Data ─────────────────────────────────────────────────────── */

const BASE_TABS: TabItem[] = [
  { value: "tickets", label: "Tickets made by me" },
  { value: "teams", label: "Teams" },
  { value: "projects", label: "Projects" },
  { value: "sprints", label: "Sprints" },
  { value: "created-by-me", label: "Created By Me" },
];

const DISABLED_TABS: TabItem[] = [
  { value: "tickets", label: "Tickets" },
  { value: "teams", label: "Teams" },
  { value: "projects", label: "Projects" },
  { value: "sprints", label: "Sprints", disabled: true },
  { value: "created-by-me", label: "Created By Me" },
];

/* ── Helpers ──────────────────────────────────────────────────── */

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
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: "#374151",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p style={{ marginTop: 8, fontSize: 12, color: "#9CA3AF" }}>{hint}</p>
      )}
    </div>
  );
}

function TabPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginTop: 16,
        padding: "16px 20px",
        background: "#F9FAFB",
        border: "1px solid #E5E7EB",
        borderRadius: 8,
        fontSize: 13,
        color: "#374151",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

/* ── Demo ─────────────────────────────────────────────────────── */

export default function TabsDemo() {
  const [controlled, setControlled] = useState<string>("tickets");

  const [dynamicTabs, setDynamicTabs] = useState<TabItem[]>([
    { value: "tab-1", label: "Tab 1" },
    { value: "tab-2", label: "Tab 2" },
  ]);
  const [dynamicActive, setDynamicActive] = useState<string>("tab-1");
  const [newLabel, setNewLabel] = useState<string>("");

  const addTab = () => {
    const label = newLabel.trim();
    if (!label) return;
    const value = `tab-${Date.now()}`;
    setDynamicTabs((prev) => [...prev, { value, label }]);
    setNewLabel("");
  };

  const contentFor = (value: string) => {
    const tab = BASE_TABS.find((t) => t.value === value);
    return tab?.label ?? value;
  };

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
        CustomTabs
      </h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 36 }}>
        Underlined uEngage tab bar · primary & secondary · disabled ·
        controlled · dynamic
      </p>

      {/* ── Controlled ── */}
      <Section
        title="Controlled"
        subtitle="Drive the active tab via value + onChange; render content yourself."
      >
        <Field label="Workspace sections" hint={`active: "${controlled}"`}>
          <Tabs tabs={BASE_TABS} value={controlled} onChange={setControlled} />
          <TabPanel>
            Showing content for <strong>{contentFor(controlled)}</strong>.
          </TabPanel>
        </Field>
      </Section>

      {/* ── Secondary variant ── */}
      <Section
        title="Secondary variant"
        subtitle="Pill/capsule style — rounded container, light-green active chip."
      >
        <Field label="variant='secondary'">
          <Tabs
            variant="secondary"
            tabs={[
              { value: "riders", label: "My Riders" },
              { value: "tasks", label: "Live Tasks" },
            ]}
            defaultValue="riders"
          />
        </Field>
      </Section>

      {/* ── Disabled tab ── */}
      <Section
        title="Disabled tab"
        subtitle="Mark any TabItem with disabled: true; the trigger becomes non-interactive."
      >
        <Field label="Sprints is disabled">
          <Tabs tabs={DISABLED_TABS} defaultValue="tickets" />
        </Field>
      </Section>

      {/* ── Uncontrolled ── */}
      <Section
        title="Uncontrolled"
        subtitle="Omit value; pass defaultValue to seed the initial tab."
      >
        <Field label="Self-managed active tab">
          <Tabs tabs={BASE_TABS} defaultValue="teams" />
        </Field>
      </Section>

      {/* ── Dynamic ── */}
      <Section
        title="Dynamic"
        subtitle="Add tabs at runtime — the bar re-renders with the new entries."
      >
        <Field label="Add a tab">
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTab();
              }}
              placeholder="New tab label"
              style={{
                flex: 1,
                fontSize: 13,
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #D1D5DB",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              type="button"
              onClick={addTab}
              disabled={!newLabel.trim()}
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 16px",
                borderRadius: 6,
                border: "none",
                background: newLabel.trim() ? "#006F42" : "#D1D5DB",
                color: "#fff",
                cursor: newLabel.trim() ? "pointer" : "not-allowed",
                fontFamily: "inherit",
              }}
            >
              Add tab
            </button>
          </div>
          <Tabs
            tabs={dynamicTabs}
            value={dynamicActive}
            onChange={setDynamicActive}
          />
          <p style={{ marginTop: 8, fontSize: 12, color: "#9CA3AF" }}>
            active: "{dynamicActive}" · {dynamicTabs.length} tab
            {dynamicTabs.length !== 1 ? "s" : ""}
          </p>
        </Field>
      </Section>

      {/* ── Prop reference ── */}
      <Section title="Prop reference">
        <table
          style={{
            fontSize: 12,
            color: "#374151",
            borderCollapse: "collapse",
            width: "100%",
            lineHeight: 1.7,
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
              <th
                style={{
                  textAlign: "left",
                  padding: "6px 12px 6px 0",
                  color: "#6B7280",
                }}
              >
                Prop
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "6px 12px",
                  color: "#6B7280",
                }}
              >
                Type
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "6px 0",
                  color: "#6B7280",
                }}
              >
                Purpose
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["tabs", "TabItem[]", "Required. { value, label, disabled? }"],
              [
                "defaultValue",
                "string",
                "Seed the active tab when uncontrolled",
              ],
              ["value", "string", "Controlled active tab value"],
              [
                "onChange",
                "(value: string) => void",
                "Fires whenever the active tab changes",
              ],
              [
                "variant",
                '"primary" | "secondary"',
                "Visual style — underlined (default) or pill/capsule",
              ],
              ["className", "string", "Extra classes on the Tabs root"],
            ].map(([prop, type, desc]) => (
              <tr key={prop} style={{ borderBottom: "1px solid #F3F4F6" }}>
                <td
                  style={{
                    padding: "6px 12px 6px 0",
                    fontFamily: "monospace",
                    color: "#006F42",
                  }}
                >
                  {prop}
                </td>
                <td
                  style={{
                    padding: "6px 12px",
                    fontFamily: "monospace",
                    color: "#374151",
                  }}
                >
                  {type}
                </td>
                <td style={{ padding: "6px 0", color: "#6B7280" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
