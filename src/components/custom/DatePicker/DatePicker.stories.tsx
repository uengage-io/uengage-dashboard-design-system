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
          "Popover-based date picker with `single`, `range`, and `month` modes. Uses `react-day-picker` under the hood. In `month` mode the header renders a year `<Select>` dropdown instead of chevron navigation. Width is parent-driven — wrap the component to constrain it. Height is set via the `size` preset.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["single", "range", "month"],
      description: "Pick one date, a start/end range, or a whole month.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Trigger height preset.",
    },
    label: { control: "text" },
    required: { control: "boolean" },
    helperText: { control: "text" },
    error: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    clearable: { control: "boolean" },
    className: { control: "text" },
    minDate: { control: "date" },
    maxDate: { control: "date" },
    value: { control: false },
    onChange: { action: "changed" },
  },
  args: {
    mode: "single",
    disabled: false,
    readOnly: false,
    clearable: false,
    required: false,
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

/* ── Single ──────────────────────────────────────────────────────────── */

export const Single: Story = {
  args: { mode: "single", placeholder: "Select a date" },
};

export const SingleClearable: Story = {
  render: function SingleClearableStory(args) {
    const [value, setValue] = React.useState<Date | DateRange | null>(null);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: { mode: "single", clearable: true, placeholder: "Select a date" },
};

/* ── Range ───────────────────────────────────────────────────────────── */

export const Range: Story = {
  args: { mode: "range", placeholder: "Date range" },
};

/* ── Month ───────────────────────────────────────────────────────────── */

export const Month: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Month mode shows a 3×4 month grid. The header contains a year `<Select>` dropdown — scroll or search to jump to any year in range.",
      },
    },
  },
  args: { mode: "month", placeholder: "Select month" },
};

export const MonthControlled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Controlled month picker — selected value is displayed below the trigger.",
      },
    },
  },
  render: function MonthControlledStory(args) {
    const [value, setValue] = React.useState<Date | DateRange | null>(null);
    return (
      <div className="flex flex-col gap-2">
        <DatePicker {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">
          {value instanceof Date
            ? value.toLocaleString("default", { month: "long", year: "numeric" })
            : "null"}
        </code>
      </div>
    );
  },
  args: { mode: "month", clearable: true, placeholder: "Select month" },
};

export const MonthWithMinMax: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The year dropdown is bounded by `minDate` / `maxDate`. Months outside the range are disabled.",
      },
    },
  },
  args: {
    mode: "month",
    placeholder: "2025 – 2027 only",
    minDate: new Date(2025, 0, 1),
    maxDate: new Date(2027, 11, 31),
  },
};

/* ── Label & helper ──────────────────────────────────────────────────── */

export const WithLabel: Story = {
  args: { mode: "single", label: "Delivery date", placeholder: "Select a date" },
};

export const WithRequiredLabel: Story = {
  name: "Required field label",
  args: {
    mode: "single",
    label: "Delivery date",
    required: true,
    helperText: "Choose the expected delivery date.",
    placeholder: "Select a date",
  },
};

export const WithError: Story = {
  args: {
    mode: "single",
    label: "Delivery date",
    required: true,
    error: "Delivery date is required.",
    placeholder: "Select a date",
  },
};

/* ── States ──────────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { mode: "single", disabled: true, placeholder: "Disabled" },
};

export const ReadOnly: Story = {
  name: "Read only · Single",
  parameters: {
    docs: {
      description: {
        story:
          "The trigger displays a fixed date with the `bg-gray-50` read-only surface. The calendar popover cannot be opened. Unlike `disabled`, full opacity is preserved.",
      },
    },
  },
  render: (args) => (
    <DatePicker
      {...args}
      label="Order date"
      value={new Date(2024, 4, 12)}
      readOnly
    />
  ),
  args: { mode: "single" },
};

export const ReadOnlyRange: Story = {
  name: "Read only · Range",
  parameters: {
    docs: {
      description: {
        story:
          "Range picker in read-only mode shows the committed date range but the calendar cannot be opened.",
      },
    },
  },
  render: (args) => (
    <DatePicker
      {...args}
      label="Campaign period"
      value={{ from: new Date(2024, 4, 1), to: new Date(2024, 4, 31) }}
      readOnly
    />
  ),
  args: { mode: "range" },
};

export const ReadOnlyMonth: Story = {
  name: "Read only · Month",
  render: (args) => (
    <DatePicker
      {...args}
      label="Report month"
      value={new Date(2024, 3, 1)}
      readOnly
    />
  ),
  args: { mode: "month" },
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
              ? `${(value as DateRange).from.toDateString()} → ${(value as DateRange).to.toDateString()}`
              : "null"}
        </code>
      </div>
    );
  },
  args: { mode: "single" },
};
