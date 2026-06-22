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
      description: "Field label rendered above the toggle.",
    },
    required: {
      control: { type: "boolean" },
      description: "Appends a red asterisk to the label.",
    },
    title: {
      control: { type: "text" },
      description: "Inline text rendered beside the switch. Position is controlled by `titlePosition`.",
    },
    titlePosition: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "Where the inline title renders relative to the switch.",
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
      description: "Shows the current state but prevents toggling.",
    },
    bgColor: {
      control: { type: "color" },
      description: "Custom background color of the toggle pill.",
    },
    borderColor: {
      control: { type: "color" },
      description: "Custom border color of the toggle pill.",
    },
  },
  args: {
    size: "md",
    titlePosition: "right",
    disabled: false,
    required: false,
    readOnly: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ── No label / title ───────────────────────────────────────────── */

export const Default: Story = {
  args: { size: "md" },
};

/* ── Label (top) ────────────────────────────────────────────────── */

export const WithLabel: Story = {
  name: "Label (top)",
  args: {
    label: "Enable notifications",
    size: "md",
  },
};

export const WithLabelRequired: Story = {
  name: "Label (top) · Required",
  args: {
    label: "Enable notifications",
    required: true,
    size: "md",
  },
};

/* ── Title (inline) ─────────────────────────────────────────────── */

export const TitleRight: Story = {
  name: "Title · Right",
  args: {
    title: "Enable notifications",
    titlePosition: "right",
    size: "md",
  },
};

export const TitleLeft: Story = {
  name: "Title · Left",
  args: {
    title: "Dark mode",
    titlePosition: "left",
    size: "md",
  },
};

/* ── Label + Title ──────────────────────────────────────────────── */

export const LabelAndTitle: Story = {
  name: "Label + Title",
  args: {
    label: "Notifications",
    title: "Enable push alerts",
    titlePosition: "right",
    size: "md",
  },
};

/* ── Sizes ──────────────────────────────────────────────────────── */

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Toggle size="sm" title="Small" titlePosition="right" />
      <Toggle size="md" title="Medium" titlePosition="right" />
      <Toggle size="lg" title="Large" titlePosition="right" />
    </div>
  ),
};

/* ── Disabled ───────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    title: "Notifications",
    titlePosition: "right",
    disabled: true,
    defaultChecked: true,
  },
};

export const ReadOnly: Story = {
  name: "Read only (on)",
  parameters: {
    docs: {
      description: {
        story:
          "The toggle shows its current state but cannot be changed. Unlike `disabled`, there is no opacity reduction — it looks fully active, just non-interactive.",
      },
    },
  },
  args: {
    title: "Email notifications",
    titlePosition: "right",
    readOnly: true,
    defaultChecked: true,
  },
};

export const ReadOnlyOff: Story = {
  name: "Read only (off)",
  args: {
    title: "Email notifications",
    titlePosition: "right",
    readOnly: true,
    defaultChecked: false,
  },
};

export const ReadOnlyWithLabel: Story = {
  name: "Read only · With label",
  args: {
    label: "Dark mode",
    readOnly: true,
    defaultChecked: true,
  },
};

/* ── Pill (custom colors) ───────────────────────────────────────── */

export const PillCustomColors: Story = {
  name: "Pill · Custom colors",
  args: {
    title: "Enable notifications",
    titlePosition: "right",
    borderColor: "#1F6B32",
    bgColor: "#F0F7F0",
    size: "md",
  },
};

export const PillSizes: Story = {
  name: "Pill · All sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      <Toggle size="sm" title="Small" titlePosition="right" borderColor="#1F6B32" bgColor="#F0F7F0" />
      <Toggle size="md" title="Medium" titlePosition="right" borderColor="#1F6B32" bgColor="#F0F7F0" />
      <Toggle size="lg" title="Large" titlePosition="right" borderColor="#1F6B32" bgColor="#F0F7F0" />
    </div>
  ),
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
