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
          "Popover-based date picker with `single` and `range` modes. Uses `react-day-picker` under the hood and exposes min/max bounds, width/height, and a controlled/uncontrolled `value` API.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["single", "range"],
      description: "Pick one date or a start/end range.",
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
    minDate: { control: "date" },
    maxDate: { control: "date" },
    value: { control: false },
    onChange: { action: "changed" },
  },
  args: {
    mode: "single",
    disabled: false,
    width: 260,
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: { mode: "single", placeholder: "Select a date" },
};

export const Range: Story = {
  args: { mode: "range", placeholder: "Date range", width: 300 },
};

export const Disabled: Story = {
  args: { mode: "single", disabled: true, placeholder: "Disabled" },
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

export const CustomWidth: Story = {
  args: { mode: "range", width: 420, height: 48 },
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
  args: { mode: "single", width: 280 },
};
