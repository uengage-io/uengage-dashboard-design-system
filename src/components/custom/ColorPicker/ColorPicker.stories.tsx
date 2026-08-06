import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./ColorPicker";

const meta = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Popover-backed color picker with a saturation/lightness canvas, hue (and optional alpha) sliders, an eyedropper (in browsers that support the EyeDropper API), and hex/rgb/hsl format fields. The hex field is editable; typing a valid hex commits it immediately.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    alpha: { control: "boolean" },
    label: { control: "text" },
    required: { control: "boolean" },
    helperText: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    width: { control: "text" },
    placeholder: { control: "text" },
    onChange: { action: "changed" },
  },
  args: {
    size: "md",
    width: "w-56",
    placeholder: "Select color",
    disabled: false,
    readOnly: false,
    required: false,
    alpha: false,
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const BRAND_PRESETS = [
  "#006F42",
  "#EF4444",
  "#F59E0B",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#111827",
  "#FFFFFF",
];

export const Default: Story = {
  args: { defaultValue: "#006F42" },
};

export const WithAlpha: Story = {
  args: { defaultValue: "#006F42", alpha: true },
};

export const WithPresets: Story = {
  args: { defaultValue: "#006F42", presets: BRAND_PRESETS },
};

export const Disabled: Story = {
  args: { defaultValue: "#006F42", disabled: true },
};

export const ReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The trigger displays the current value with a `bg-gray-50` surface. The popover cannot be opened.",
      },
    },
  },
  args: { label: "Brand color", value: "#3B82F6", readOnly: true },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState("#006F42");
    return (
      <div className="flex flex-col gap-2">
        <ColorPicker {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">{value}</code>
      </div>
    );
  },
  args: { label: "Accent color", presets: BRAND_PRESETS },
};

/* ── Label & helper ──────────────────────────────────────────────────── */

export const WithLabel: Story = {
  args: { label: "Brand color", defaultValue: "#006F42" },
};

export const WithRequiredLabel: Story = {
  name: "Required field label",
  args: {
    label: "Brand color",
    required: true,
    helperText: "Used for buttons and links across the storefront.",
    defaultValue: "#006F42",
  },
};

export const WithError: Story = {
  args: {
    label: "Brand color",
    required: true,
    error: "Please select a brand color.",
    defaultValue: "#006F42",
  },
};

/* ── Size variants ─────────────────────────────────────────────────────── */

export const SizeSm: Story = {
  name: "size=sm",
  args: { size: "sm", defaultValue: "#006F42", width: "w-48" },
};

export const SizeMd: Story = {
  name: "size=md",
  args: { size: "md", defaultValue: "#006F42", width: "w-56" },
};

export const SizeLg: Story = {
  name: "size=lg",
  args: { size: "lg", defaultValue: "#006F42", width: "w-64" },
};
