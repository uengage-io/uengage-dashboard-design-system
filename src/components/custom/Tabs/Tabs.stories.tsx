import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import type { TabItem } from "./Tabs.types";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Underlined, uEngage-branded tab bar built on the shadcn `Tabs` primitives. Feed it a `tabs` array of `{ value, label, disabled? }` and drive it either uncontrolled via `defaultValue` or controlled via `value` + `onChange`.",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary"] },
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
  render: (args) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    tabs: [
      { value: "riders", label: "My Riders" },
      { value: "tasks", label: "Live Tasks" },
    ],
    defaultValue: "riders",
    variant: "secondary",
  },
  render: (args) => (
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
  render: (args) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  args: { tabs: BASE_TABS },
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState<string>("tickets");
    return (
      <div className="flex w-180 flex-col gap-3">
        <Tabs {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">active: {`"${value}"`}</code>
      </div>
    );
  },
};

export const Dynamic: Story = {
  args: { tabs: BASE_TABS }
  
  ,
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
