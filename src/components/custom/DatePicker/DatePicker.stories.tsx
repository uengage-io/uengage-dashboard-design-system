import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import type { DateRange } from "./DatePicker.types";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Popover-based date picker with `single` and `range` modes. Uses `react-day-picker` under the hood. Width is parent-driven — wrap the component to constrain it. Height is set via the `size` preset.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["single", "range"],
      description: "Pick one date or a start/end range.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Trigger height preset.",
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    minDate: { control: "date" },
    maxDate: { control: "date" },
    value: { control: false },
    onChange: { action: "changed" },
  },
  args: {
    mode: "single",
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { mode: "single", placeholder: "Select a date" },
};

export const Range: Story = {
  args: { mode: "range", placeholder: "Date range" },
};

export const Disabled: Story = {
  args: { mode: "single", disabled: true, placeholder: "Disabled" },
};

export const Small: Story = {
  args: { mode: "single", size: "sm", placeholder: "Small" },
};

export const Large: Story = {
  args: { mode: "single", size: "lg", placeholder: "Large" },
};

export const FullBleed: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
  args: { mode: "range", placeholder: "Spans full parent width" },
};

const today = new Date();
const in30 = new Date();
in30.setDate(today.getDate() + 30);
const minus30 = new Date();
minus30.setDate(today.getDate() - 30);

export const WithMinMax: Story = {
  args: {
    mode: "single",
    minDate: minus30,
    maxDate: in30,
    placeholder: "Within ±30 days",
  },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState<Date | DateRange | null>(null);
    return (
      <div className="flex flex-col gap-2">
        <DatePicker {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">
          {value instanceof Date
            ? value.toDateString()
            : value
              ? `${value.from.toDateString()} → ${value.to.toDateString()}`
              : "null"}
        </code>
      </div>
    );
  },
  args: { mode: "single" },
};
