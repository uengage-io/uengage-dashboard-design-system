import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import type { TabItem, CustomTabsProps } from "./Tabs.types";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "uEngage-branded tab bar built on the shadcn `Tabs` primitives. Feed it a `tabs` array of `{ value, label, disabled? }` and drive it either uncontrolled via `defaultValue` or controlled via `value` + `onChange`. Three variants: `primary` (bold dark text + thick green underline), `secondary` (green active text + subtle underline + overlay), `tertiary` (animated pill/chip).",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary", "tertiary"] },
    defaultValue: { control: "text" },
    className: { control: "text" },
    onChange: { action: "change" },
  },
  args: { variant: "primary" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const BASE_TABS: TabItem[] = [
  { value: "tickets", label: "Tickets" },
  { value: "teams", label: "Teams" },
  { value: "projects", label: "Projects" },
  { value: "sprints", label: "Sprints" },
  { value: "created-by-me", label: "Created By Me" },
];

export const Default: Story = {
  args: {
    tabs: BASE_TABS,
    defaultValue: "tickets",
  },
  render: (args: CustomTabsProps) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    tabs: BASE_TABS,
    defaultValue: "tickets",
    variant: "secondary",
  },
  render: (args: CustomTabsProps) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const Tertiary: Story = {
  args: {
    tabs: [
      { value: "riders", label: "My Riders" },
      { value: "tasks", label: "Live Tasks" },
    ],
    defaultValue: "riders",
    variant: "tertiary",
  },
  render: (args: CustomTabsProps) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { value: "tickets", label: "Tickets" },
      { value: "teams", label: "Teams" },
      { value: "projects", label: "Projects" },
      { value: "sprints", label: "Sprints", disabled: true },
      { value: "created-by-me", label: "Created By Me" },
    ],
    defaultValue: "tickets",
  },
  render: (args: CustomTabsProps) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  args: { tabs: BASE_TABS },
  render: function ControlledStory(args:CustomTabsProps) {
    const [value, setValue] = React.useState<string>("tickets");
    return (
      <div className="flex w-180 flex-col gap-3">
        <Tabs {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">active: {`"${value}"`}</code>
      </div>
    );
  },
};

const MANY_TABS: TabItem[] = [
  { value: "tab-1", label: "Tab 1" },
  { value: "tab-2", label: "Tabs" },
  { value: "tab-3", label: "Tabs" },
  { value: "tab-4", label: "Tabs" },
  { value: "tab-5", label: "Tabs" },
  { value: "tab-6", label: "Tabs" },
  { value: "tab-7", label: "Tabs" },
];

export const WithOverflowDropdown: Story = {
  args: { tabs: MANY_TABS },
  parameters: { layout: "fullscreen" },
  render: function OverflowStory() {
    const [primaryTab, setPrimaryTab] = React.useState("tab-1");
    const [secondaryTab, setSecondaryTab] = React.useState("tab-1");
    const [tertiaryTab, setTertiaryTab] = React.useState("tab-1");

    return (
      <div className="min-h-screen bg-[#F6F8FB] p-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-[24px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
              Overflow Playground
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#111827]">
              Tab limit &amp; overflow dropdown
            </h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              Tabs beyond <code className="rounded bg-[#F3F4F6] px-1 py-0.5 text-xs">visibleTabLimit</code> collapse into a "More Options" menu.
            </p>
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Primary — limit 5</h2>
            <Tabs
              variant="primary"
              value={primaryTab}
              tabs={MANY_TABS}
              visibleTabLimit={5}
              overflowLabel="More Options"
              onChange={setPrimaryTab}
            />
            <div className="rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#374151]">
              Active: <strong>{primaryTab}</strong>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Secondary — limit 5</h2>
            <Tabs
              variant="secondary"
              value={secondaryTab}
              tabs={MANY_TABS}
              visibleTabLimit={5}
              overflowLabel="More Options"
              onChange={setSecondaryTab}
            />
            <div className="rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#374151]">
              Active: <strong>{secondaryTab}</strong>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Tertiary — limit 4</h2>
            <Tabs
              variant="tertiary"
              value={tertiaryTab}
              tabs={MANY_TABS}
              visibleTabLimit={4}
              overflowLabel="More Options"
              onChange={setTertiaryTab}
            />
            <div className="rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#374151]">
              Active: <strong>{tertiaryTab}</strong>
            </div>
          </section>
        </div>
      </div>
    );
  },
};

export const Dynamic: Story = {
  args: { tabs: BASE_TABS },
  render: function DynamicStory() {
    const [tabs, setTabs] = React.useState<TabItem[]>([
      { value: "tab-1", label: "Tab 1" },
      { value: "tab-2", label: "Tab 2" },
    ]);
    const [active, setActive] = React.useState<string>("tab-1");
    const [label, setLabel] = React.useState<string>("");

    const addTab = () => {
      const next = label.trim();
      if (!next) return;
      setTabs((prev) => [...prev, { value: `tab-${Date.now()}`, label: next }]);
      setLabel("");
    };

    return (
      <div className="flex w-180 flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTab();
            }}
            placeholder="New tab label"
            className="flex-1 rounded-md border border-[#D1D5DB] px-3 py-2 text-sm outline-none focus:border-[#006F42] focus:ring-1 focus:ring-[#006F42]"
          />
          <button
            type="button"
            onClick={addTab}
            disabled={!label.trim()}
            className="rounded-md bg-[#006F42] px-4 py-2 text-sm font-medium text-white hover:bg-[#005a35] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add tab
          </button>
        </div>
        <Tabs tabs={tabs} value={active} onChange={setActive} />
        <code className="text-xs text-[#6B7280]">active: {`"${active}"`}</code>
      </div>
    );
  },
};
