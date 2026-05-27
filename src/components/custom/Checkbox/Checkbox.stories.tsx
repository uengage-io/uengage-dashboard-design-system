import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";
import type { CheckboxOption } from "@/types/checkbox";

/* ── Mock options ─────────────────────────────────────────────── */

const THREE_OPTIONS: CheckboxOption[] = [
  { value: "one", label: "Option One" },
  { value: "two", label: "Option Two" },
  { value: "three", label: "Option Three" },
];

const SIX_OPTIONS: CheckboxOption[] = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma" },
  { value: "delta", label: "Delta" },
  { value: "epsilon", label: "Epsilon" },
  { value: "zeta", label: "Zeta" },
];

const PERMISSION_OPTIONS: CheckboxOption[] = [
  { value: "read", label: "Read orders" },
  { value: "write", label: "Edit orders" },
  { value: "refund", label: "Issue refunds" },
  { value: "admin", label: "Admin access", disabled: true },
];

/* ── Standalone Checkbox ──────────────────────────────────────── */

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix-backed checkbox. By default renders a plain checkbox + label (no wrapper). Pass `borderColor` and/or `bgColor` to opt into a pill wrapper that applies those colors when checked/indeterminate. Supports `sm` / `md` / `lg` sizes, optional `label`, `indeterminate`, `error`, `disabled`, controlled and uncontrolled modes.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    error: { control: "boolean" },
    borderColor: { control: "color", description: "Pill border color when checked/indeterminate. Omit to use default plain style." },
    bgColor: { control: "color", description: "Pill background color when checked/indeterminate. Omit to use default plain style." },
    onCheckedChange: { action: "checkedChange" },
  },
  args: {
    size: "md",
    label: "Accept terms",
    disabled: false,
    readOnly: false,
    indeterminate: false,
    error: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/* ── Sizes ────────────────────────────────────────────────────── */

export const Small: Story = { args: { size: "sm", label: "Small" } };
export const Medium: Story = { args: { size: "md", label: "Medium" } };
export const Large: Story = { args: { size: "lg", label: "Large" } };

/* ── States ───────────────────────────────────────────────────── */

export const Unchecked: Story = {
  args: { label: "Unchecked", defaultChecked: false },
};

export const Checked: Story = {
  args: { label: "Checked", defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: "Some selected", indeterminate: true },
};

export const Disabled: Story = {
  args: { label: "Disabled", disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: "Disabled (checked)", disabled: true, defaultChecked: true },
};

export const ReadOnly: Story = {
  args: { label: "Read only (checked)", readOnly: true, defaultChecked: true },
};

export const ReadOnlyUnchecked: Story = {
  name: "Read only (unchecked)",
  args: { label: "Read only (unchecked)", readOnly: true, defaultChecked: false },
};

export const ErrorState: Story = {
  args: { label: "This field is required", error: true },
};

export const NoLabel: Story = {
  args: { label: undefined },
};

/* ── Controlled ───────────────────────────────────────────────── */

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col gap-3">
        <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
        <code className="text-xs text-[#6B7280]">
          checked: {String(checked)}
        </code>
      </div>
    );
  },
  args: { label: "I agree to the terms" },
};

/* ── Group: layouts ───────────────────────────────────────────── */

export const GroupVertical: Story = {
  name: "Group · Vertical",
  render: () => (
    <div className="w-80">
      <CheckboxGroup
        label="Notifications"
        options={THREE_OPTIONS}
        layout="vertical"
        helperText="Pick one or more channels."
      />
    </div>
  ),
};

export const GroupHorizontal: Story = {
  name: "Group · Horizontal",
  render: () => (
    <div className="w-[560px]">
      <CheckboxGroup
        label="Tags"
        options={SIX_OPTIONS}
        layout="horizontal"
      />
    </div>
  ),
};

export const GroupGrid: Story = {
  name: "Group · Grid (3 columns)",
  render: () => (
    <div className="w-[560px]">
      <CheckboxGroup
        label="Tags"
        options={SIX_OPTIONS}
        layout="grid"
        columns={3}
      />
    </div>
  ),
};

/* ── Group: select all + per-item disabled ────────────────────── */

export const GroupSelectAll: Story = {
  name: "Group · Select all",
  render: function GroupSelectAllStory() {
    const [value, setValue] = React.useState<string[]>(["read"]);
    return (
      <div className="flex w-96 flex-col gap-3">
        <CheckboxGroup
          label="Permissions"
          options={PERMISSION_OPTIONS}
          value={value}
          onChange={setValue}
          selectAll
          helperText="Admin access can only be granted by an owner."
        />
        <code className="text-xs text-[#6B7280]">
          selected: [{value.map((v) => `"${v}"`).join(", ")}]
        </code>
      </div>
    );
  },
};

/* ── Group: error + disabled ──────────────────────────────────── */

export const GroupWithError: Story = {
  name: "Group · Error",
  render: () => (
    <div className="w-96">
      <CheckboxGroup
        label="Notifications"
        options={THREE_OPTIONS}
        error="Pick at least one channel before continuing."
      />
    </div>
  ),
};

export const GroupDisabled: Story = {
  name: "Group · Disabled",
  render: () => (
    <div className="w-96">
      <CheckboxGroup
        label="Notifications"
        options={THREE_OPTIONS}
        value={["one"]}
        disabled
      />
    </div>
  ),
};

export const GroupReadOnly: Story = {
  name: "Group · Read only",
  parameters: {
    docs: {
      description: {
        story:
          "All items display their current state but cannot be toggled. Unlike `disabled`, there is no opacity reduction — the values look fully normal, just non-interactive.",
      },
    },
  },
  render: () => (
    <div className="w-96">
      <CheckboxGroup
        label="Assigned permissions"
        helperText="Contact an admin to change these settings."
        options={PERMISSION_OPTIONS}
        value={["read", "write"]}
        readOnly
      />
    </div>
  ),
};

/* ── Group: size variants ─────────────────────────────────────── */

export const GroupSmall: Story = {
  name: "Group · Small",
  render: () => (
    <div className="w-96">
      <CheckboxGroup
        label="Notifications"
        options={THREE_OPTIONS}
        size="sm"
      />
    </div>
  ),
};

export const GroupLarge: Story = {
  name: "Group · Large",
  render: () => (
    <div className="w-96">
      <CheckboxGroup
        label="Notifications"
        options={THREE_OPTIONS}
        size="lg"
      />
    </div>
  ),
};

/* ── Custom pill colors ───────────────────────────────────────── */

export const WithCustomColors: Story = {
  name: "Custom pill colors",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `borderColor` and `bgColor` to opt into the pill wrapper. The pill border and background apply only when the checkbox is checked or indeterminate; unchecked state keeps the default gray border.",
      },
    },
  },
  render: function CustomColorsStory() {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col gap-3">
        <Checkbox
          label="Morning (5am – 11:58am)"
          checked={checked}
          onCheckedChange={setChecked}
          borderColor="#067D51"
          bgColor="#EFF9F4"
        />
        <code className="text-xs text-gray-500">checked: {String(checked)}</code>
      </div>
    );
  },
};

export const WithCustomColorsGroup: Story = {
  name: "Custom pill colors · Group",
  parameters: {
    docs: {
      description: {
        story:
          "All items in a row can carry the same `borderColor` / `bgColor`. Each item independently shows the pill when active.",
      },
    },
  },
  render: function CustomColorsGroupStory() {
    const TIME_OPTIONS = [
      { value: "morning", label: "Morning (5am – 11:58am)" },
      { value: "afternoon", label: "Afternoon (12pm – 3:59pm)" },
      { value: "evening", label: "Evening (4pm – 7:59pm)" },
      { value: "night", label: "Night (8pm – 11:59pm)" },
    ];
    const [selected, setSelected] = React.useState<string[]>(["morning", "evening"]);
    const toggle = (val: string, next: boolean) =>
      setSelected((prev) => next ? [...prev, val] : prev.filter((v) => v !== val));
    return (
      <div className="flex flex-col gap-2">
        {TIME_OPTIONS.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            checked={selected.includes(opt.value)}
            onCheckedChange={(c) => toggle(opt.value, c)}
            borderColor="#067D51"
            bgColor="#EFF9F4"
          />
        ))}
      </div>
    );
  },
};

export const GroupWithCustomColors: Story = {
  name: "Group · Custom pill colors",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `borderColor` and `bgColor` directly on `CheckboxGroup` to apply pill styling to every item in the group. Each item independently shows the colored pill when checked.",
      },
    },
  },
  render: function GroupCustomColorsStory() {
    const TIME_OPTIONS: CheckboxOption[] = [
      { value: "morning", label: "Morning (5am – 11:58am)" },
      { value: "afternoon", label: "Afternoon (12pm – 3:59pm)" },
      { value: "evening", label: "Evening (4pm – 7:59pm)" },
      { value: "night", label: "Night (8pm – 11:59pm)" },
    ];
    const [selected, setSelected] = React.useState<string[]>(["morning", "evening"]);
    return (
      <div className="flex w-[480px] flex-col gap-3">
        <CheckboxGroup
          label="Preferred time slots"
          options={TIME_OPTIONS}
          value={selected}
          onChange={setSelected}
          layout="vertical"
          borderColor="#067D51"
          bgColor="#EFF9F4"
        />
        <code className="text-xs text-gray-500">
          selected: [{selected.map((v) => `"${v}"`).join(", ")}]
        </code>
      </div>
    );
  },
};

export const WithCustomColorsBrandBlue: Story = {
  name: "Custom pill colors · Brand blue",
  render: function BrandBlueStory() {
    const [checked, setChecked] = React.useState(true);
    return (
      <div className="flex flex-col gap-3">
        <Checkbox
          label="Enable notifications"
          checked={checked}
          onCheckedChange={setChecked}
          borderColor="#3B82F6"
          bgColor="#EFF6FF"
        />
        <Checkbox
          label="Marketing emails"
          defaultChecked={false}
          borderColor="#3B82F6"
          bgColor="#EFF6FF"
        />
      </div>
    );
  },
};
