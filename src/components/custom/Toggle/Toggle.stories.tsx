import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    label: {
      control: { type: "text" },
      description: "Label text. Position is controlled by `labelPosition`.",
    },
    labelPosition: {
      control: { type: "select" },
      options: ["top", "left", "right"],
      description: "`top` renders above the toggle as a field label; `left`/`right` renders inline beside the switch",
    },
    required: {
      control: { type: "boolean" },
      description: "Appends a red asterisk to a `top` label",
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: {
    size: "md",
    labelPosition: "right",
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ── No label ───────────────────────────────────────────────────── */

export const Default: Story = {
  args: { size: "md" },
};

/* ── Top label (field label pattern) ───────────────────────────── */

export const WithTopLabel: Story = {
  name: "Top label",
  args: {
    label: "Enable notifications",
    labelPosition: "top",
    size: "md",
  },
};

export const WithTopLabelRequired: Story = {
  name: "Top label · Required",
  args: {
    label: "Enable notifications",
    labelPosition: "top",
    required: true,
    size: "md",
  },
};

/* ── Inline label (beside the switch) ──────────────────────────── */

export const LabelRight: Story = {
  name: "Label · Right",
  args: {
    label: "Enable notifications",
    labelPosition: "right",
    size: "md",
  },
};

export const LabelLeft: Story = {
  name: "Label · Left",
  args: {
    label: "Dark mode",
    labelPosition: "left",
    size: "md",
  },
};

/* ── Sizes ──────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Toggle size="sm" label="Small" labelPosition="right" />
      <Toggle size="md" label="Medium" labelPosition="right" />
      <Toggle size="lg" label="Large" labelPosition="right" />
    </div>
  ),
};

/* ── Disabled ───────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    label: "Notifications",
    labelPosition: "right",
    disabled: true,
    defaultChecked: true,
  },
};

/* ── Controlled ─────────────────────────────────────────────────── */

export const Controlled: Story = {
  render: function ControlledStory() {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Toggle
          size="md"
          label="Email notifications"
          labelPosition="top"
          required
          checked={checked}
          onChange={setChecked}
        />
        <code className="text-xs text-[#6B7280]">
          checked: {String(checked)}
        </code>
      </div>
    );
  },
};
