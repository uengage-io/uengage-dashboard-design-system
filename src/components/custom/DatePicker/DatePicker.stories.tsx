import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import type { DateRange, DatePickerMode } from "./DatePicker.types";

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
    open: {
      control: "boolean",
      description: "Controlled open state. When set, the popover is driven externally — pair with `onOpenChange` to sync it back. Omit to let the component manage its own open state.",
    },
    onOpenChange: { action: "openChanged" },
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

/* ── Year/Month range constraints ───────────────────────────────────── */

export const SingleWithYearRange: Story = {
  name: "Single · Year & month range",
  parameters: {
    docs: {
      description: {
        story:
          "When `minDate` / `maxDate` span specific years, the year dropdown is bounded to that range and months outside the boundary are disabled in the month dropdown (e.g. Jan–May are disabled in 2023 because `minDate` is June 2023; Oct–Dec are disabled in 2025 because `maxDate` is September 2025).",
      },
    },
  },
  args: {
    mode: "single",
    placeholder: "Jun 2023 – Sep 2025 only",
    minDate: new Date(2023, 5, 1),
    maxDate: new Date(2025, 8, 30),
  },
};

export const RangeWithYearRange: Story = {
  name: "Range · Year & month range",
  parameters: {
    docs: {
      description: {
        story:
          "Range mode with `minDate` and `maxDate` bounding the year dropdown and disabling out-of-range months.",
      },
    },
  },
  args: {
    mode: "range",
    placeholder: "Jun 2023 – Sep 2025 only",
    minDate: new Date(2023, 5, 1),
    maxDate: new Date(2025, 8, 30),
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

/* ── Externally triggered (open / onOpenChange) ───────────────────────── */

const FILTER_OPTIONS: { value: string; label: string; mode?: DatePickerMode }[] = [
  { value: "today",         label: "Today" },
  { value: "yesterday",     label: "Yesterday" },
  { value: "last_7",        label: "Last 7 days" },
  { value: "custom_single", label: "Custom date",  mode: "single" },
  { value: "custom_range",  label: "Custom range", mode: "range"  },
];

export const ExternallyTriggered: Story = {
  name: "Externally triggered (dropdown)",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `open` + `onOpenChange` to drive the popover from outside — e.g. a dashboard dropdown that includes a \"Custom date\" option. The DatePicker trigger is invisible; the dropdown is the only entry point.",
      },
    },
  },
  render: function ExternallyTriggeredStory() {
    const [filter, setFilter] = React.useState("today");
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const [pickerMode, setPickerMode] = React.useState<DatePickerMode>("single");
    const [value, setValue] = React.useState<Date | DateRange | null>(null);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      setFilter(val);
      const opt = FILTER_OPTIONS.find((o) => o.value === val);
      if (opt?.mode) {
        setPickerMode(opt.mode);
        setPickerOpen(true);
      } else {
        setValue(null);
      }
    };

    const isCustom = filter === "custom_single" || filter === "custom_range";
    const valueLabel = React.useMemo(() => {
      if (!value) return null;
      if (value instanceof Date) return value.toDateString();
      return `${(value as DateRange).from.toDateString()} → ${(value as DateRange).to.toDateString()}`;
    }, [value]);

    return (
      <div className="flex flex-col gap-4 w-[320px]">
        {/* Filter dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6B7280] font-medium shrink-0">Date filter</span>
          <div className="relative flex-1">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="w-full appearance-none rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 pr-7 text-sm text-[#111827] font-medium cursor-pointer outline-none focus:border-[#006F42]"
            >
              {FILTER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[#9CA3AF]">▼</span>
          </div>
        </div>

        {/* DatePicker — open is driven by the dropdown above */}
        <div className="relative">
          <DatePicker
            mode={pickerMode}
            open={pickerOpen}
            onOpenChange={setPickerOpen}
            value={value}
            onChange={(v) => setValue(v as Date | DateRange | null)}
            placeholder={pickerMode === "range" ? "Select date range" : "Select a date"}
            clearable
          />
        </div>

        {/* Active selection readout */}
        <code className="text-xs text-[#6B7280]">
          {isCustom && valueLabel
            ? valueLabel
            : FILTER_OPTIONS.find((o) => o.value === filter)?.label ?? "—"}
        </code>
      </div>
    );
  },
  args: {},
};
