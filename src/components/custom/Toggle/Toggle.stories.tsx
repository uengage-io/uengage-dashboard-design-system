import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the toggle",
    },
    label: {
      control: { type: "text" },
      description: "Label text to display",
    },
    labelPosition: {
      control: { type: "select" },
      options: ["inside", "left", "right"],
      description: "Position of the label",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the toggle",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default toggle with no label
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

/**
 * Toggle with label on the right (default)
 */
export const WithLabelRight: Story = {
  args: {
    size: "md",
    label: "Enable notifications",
    labelPosition: "right",
  },
};

/**
 * Toggle with label on the left
 */
export const WithLabelLeft: Story = {
  args: {
    size: "md",
    label: "Dark mode",
    labelPosition: "left",
  },
};

/**
 * Toggle with inside label (appears when checked off)
 */
export const WithInsideLabel: Story = {
  args: {
    size: "md",
    label: "ON",
    labelPosition: "inside",
  },
};

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Toggle size="sm" label="Small" labelPosition="right" />
      </div>
      <div className="flex items-center gap-4">
        <Toggle size="md" label="Medium" labelPosition="right" />
      </div>
      <div className="flex items-center gap-4">
        <Toggle size="lg" label="Large" labelPosition="right" />
      </div>
    </div>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    size: "md",
    label: "Disabled toggle",
    labelPosition: "right",
    disabled: true,
  },
};

/**
 * Controlled component
 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Toggle
          size="md"
          label="Controlled toggle"
          labelPosition="right"
          checked={checked}
          onChange={setChecked}
        />
        <p className="text-sm text-gray-600">
          Status: {checked ? "ON" : "OFF"}
        </p>
      </div>
    );
  },
};

/**
 * Inside label with all sizes
 */
// export const InsideLabelSizes: Story = {
//   render: () => (
//     <div className="flex flex-col gap-6">
//       <div className="flex items-center gap-4">
//         <Toggle size="sm" label="ON" labelPosition="inside" />
//       </div>
//       <div className="flex items-center gap-4">
//         <Toggle size="md" label="ON" labelPosition="inside" />
//       </div>
//       <div className="flex items-center gap-4">
//         <Toggle size="lg" label="ON" labelPosition="inside" />
//       </div>
//     </div>
//   ),
// };
