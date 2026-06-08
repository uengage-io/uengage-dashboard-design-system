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
          "Input + search/clear actions, with optional fuzzy-matched dropdown. `valueType` restricts the input charset (`string` | `number` | `alphanumeric`). Feed suggestions either as a string list via `dropdownContent` or as structured objects via `dropdownItems` + `getLabel` / `getValue`. Dropdown options are always sorted alphabetically by label regardless of the order they are passed in.",
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
    readOnly: { control: "boolean" },
    placeholder: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
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
    width: "w-full sm:w-80",
    disabled: false,
    readOnly: false,
    required: false,
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

export const ReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The input shows a fixed value with the `bg-gray-50` read-only surface. The text field, search button, and clear button are all non-interactive.",
      },
    },
  },
  render: (args) => (
    <SearchBar
      {...args}
      label="Order reference"
      value="ORD-20240512"
      readOnly
    />
  ),
  args: {},
};

// Intentionally unsorted — the component sorts alphabetically automatically.
const CITIES = [
  "Mumbai",
  "Chandigarh",
  "Kolkata",
  "Delhi",
  "Bengaluru",
  "Mohali",
  "Hyderabad",
  "Panchkula",
  "Noida",
  "Chennai",
  "Gurgaon",
];

export const WithStringDropdown: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Options are passed in a random order but the dropdown renders them A → Z automatically.",
      },
    },
  },
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
  args: { width: "w-full md:w-96" },
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

export const WithLabel: Story = {
  args: {
    label: "Search Orders",
    placeholder: "Search…",
  },
};

export const WithLabelRequired: Story = {
  args: {
    label: "Search Orders",
    required: true,
    placeholder: "Search…",
  },
};

export const WithLabelAndDropdown: Story = {
  render: (args) => {
    const drivers = [
      { id: "DR-001", name: "Rahul Sharma", zone: "Sector 17" },
      { id: "DR-002", name: "Aman Kaur", zone: "Sector 22" },
      { id: "DR-003", name: "Priya Singh", zone: "Phase 8B" },
    ];
    return (
      <SearchBar
        {...args}
        label="Search Drivers"
        required
        placeholder="Search by name…"
        dropdownItems={drivers}
        getLabel={(d) => `${d.name} · ${d.zone}`}
        getValue={(d) => d.id}
      />
    );
  },
  args: { width: "w-full md:w-96" },
};
