import { Tabs, Toggle } from "@uengage/ui";
import { useState } from "react";

const tabs = [
  { value: "tab-1", label: "Tab 1" },
  { value: "tab-2", label: "Tabs" },
  { value: "tab-3", label: "Tabs" },
  { value: "tab-4", label: "Tabs" },
  { value: "tab-5", label: "Tabs" },
  { value: "tab-6", label: "Tabs" },
  { value: "tab-7", label: "Tabs" },
];

export default function TabsPreview() {
  const [primaryTab, setPrimaryTab] = useState("tab-1");
  const [secondaryTab, setSecondaryTab] = useState("tab-1");
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#F6F8FB] p-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-[24px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
              Tabs Playground
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#111827]">
              Primary tabs and toggle preview
            </h1>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-[#F8FAF8] px-4 py-2">
            <span className="text-sm font-medium text-[#4B5563]">Live Toggle</span>
            <Toggle checked={enabled} onChange={setEnabled} aria-label="Enable toggle" />
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">Primary</h2>
            <p className="text-sm text-[#6B7280]">
              Visible tabs plus overflow menu. Selecting from either path updates the same state.
            </p>
          </div>
          <Tabs
            variant="primary"
            value={primaryTab}
            tabs={tabs}
            visibleTabLimit={5}
            overflowLabel="More Options"
            onChange={setPrimaryTab}
          />
          <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#374151]">
            Active primary tab: <strong>{primaryTab}</strong>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">Secondary</h2>
            <p className="text-sm text-[#6B7280]">
              Existing secondary behavior kept intact for comparison.
            </p>
          </div>
          <Tabs
            variant="secondary"
            value={secondaryTab}
            tabs={tabs}
            visibleTabLimit={4}
            overflowLabel="More Options"
            onChange={setSecondaryTab}
          />
          <div className="rounded-[16px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#374151]">
            Active secondary tab: <strong>{secondaryTab}</strong>
          </div>
        </section>
      </div>
    </div>
  );
}
