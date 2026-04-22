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
          "Radix-backed checkbox wrapper. Supports `sm` / `md` / `lg` sizes, optional `label`, `indeterminate`, `error`, `disabled`, controlled and uncontrolled modes. The companion `CustomCheckboxGroup` composes multiple checkboxes with layouts, a select-all helper, and group-level error/helper text.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    onCheckedChange: { action: "checkedChange" },
  },
  args: {
    size: "md",
    label: "Accept terms",
    disabled: false,
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
    <div className="w-96">
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
