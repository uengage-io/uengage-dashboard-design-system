import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta = {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Input + search/clear actions, with optional fuzzy-matched dropdown. `valueType` restricts the input charset (`string` | `number` | `alphanumeric`). Feed suggestions either as a string list via `dropdownContent` or as structured objects via `dropdownItems` + `getLabel` / `getValue`.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    valueType: {
      control: "radio",
      options: ["string", "number", "alphanumeric"],
    },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    width: { control: "text" },
    fallbackText: { control: "text" },
    onChange: { action: "change" },
    onSearch: { action: "search" },
    onSelect: { action: "select" },
    onClear: { action: "clear" },
  },
  args: {
    size: "md",
    valueType: "string",
    placeholder: "Search…",
    width: 320,
    disabled: false,
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: "sm", placeholder: "Small" } };
export const Large: Story = { args: { size: "lg", placeholder: "Large" } };

export const NumberOnly: Story = {
  args: { valueType: "number", placeholder: "Order ID (numbers only)" },
};

export const Alphanumeric: Story = {
  args: { valueType: "alphanumeric", placeholder: "SKU (A–Z, 0–9)" },
};

export const Disabled: Story = { args: { disabled: true } };

const CITIES = [
  "Chandigarh",
  "Mohali",
  "Panchkula",
  "Delhi",
  "Gurgaon",
  "Noida",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
];

export const WithStringDropdown: Story = {
  render: (args) => (
    <SearchBar
      {...args}
      placeholder="Search cities…"
      dropdownItems={CITIES}
      getLabel={(c: string) => c}
    />
  ),
  args: {},
};

type Driver = { id: string; name: string; zone: string };
const DRIVERS: Driver[] = [
  { id: "DR-001", name: "Rahul Sharma", zone: "Sector 17" },
  { id: "DR-002", name: "Aman Kaur", zone: "Sector 22" },
  { id: "DR-003", name: "Priya Singh", zone: "Phase 8B" },
  { id: "DR-004", name: "Vikas Verma", zone: "Industrial Area" },
];

export const WithObjectDropdown: Story = {
  render: (args) => (
    <SearchBar
      {...args}
      placeholder="Search drivers…"
      dropdownItems={DRIVERS}
      getLabel={(d: Driver) => `${d.name} · ${d.zone}`}
      getValue={(d: Driver) => d.id}
    />
  ),
  args: { width: 380 },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState<string>("");
    return (
      <div className="flex flex-col gap-2">
        <SearchBar
          {...args}
          value={value}
          onChange={(v) => setValue(String(v))}
        />
        <code className="text-xs text-[#6B7280]">value: {`"${value}"`}</code>
      </div>
    );
  },
  args: { placeholder: "Type something…" },
};
