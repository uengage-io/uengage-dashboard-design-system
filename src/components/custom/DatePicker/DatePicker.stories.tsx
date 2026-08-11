import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { Input } from "@/components/custom/Input/Input";
import { TimePicker, type TimeValue } from "./TimePicker";
import { formatDateTime } from "./dateHelpers";
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
      options: ["xs", "sm", "md", "lg"],
      description:
        "Trigger height preset — 28 / 32 / 40 / 48, matching Input and Select. The day cell scales with it (24 / 26 / 30 / 34, digits 9 / 9 / 10 / 11).",
    },
    status: {
      control: "radio",
      options: [undefined, "success", "warning"],
      description: "Advisory state on the trigger. `error` outranks it.",
    },
    statusMessage: { control: "text" },
    loading: { control: "boolean" },
    label: { control: "text" },
    required: { control: "boolean" },
    helperText: { control: "text" },
    error: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    clearable: { control: "boolean" },
    showTime: {
      control: "boolean",
      description: "Single mode only — shows an hour/minute/AM-PM picker alongside the calendar, committed via Apply.",
    },
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

export const SingleWithTime: Story = {
  name: "Single · With time",
  parameters: {
    docs: {
      description: {
        story:
          "`showTime` adds an hour/minute/AM-PM picker next to the calendar (single mode only). Pick a day, adjust the time columns, then Apply to commit both together.",
      },
    },
  },
  render: function SingleWithTimeStory(args) {
    const [value, setValue] = React.useState<Date | DateRange | null>(null);
    return (
      <div className="flex flex-col gap-2">
        <DatePicker {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">
          {value instanceof Date ? value.toLocaleString() : "null"}
        </code>
      </div>
    );
  },
  args: {
    mode: "single",
    showTime: true,
    clearable: true,
    placeholder: "Select date & time",
  },
};

/* ── Range ───────────────────────────────────────────────────────────── */

export const Range: Story = {
  args: { mode: "range", placeholder: "Date range" },
};

export const RangeWithTimePreview: Story = {
  name: "Range · With time preview",
  parameters: {
    docs: {
      description: {
        story:
          "`showTime` only applies in single mode, so a from/to range with times is composed from the range calendar plus two `TimePicker` instances — one for the start time, one for the end. The preview line below combines all four values live.",
      },
    },
  },
  render: function RangeWithTimePreviewStory(args) {
    const [range, setRange] = React.useState<DateRange | null>(null);
    const [fromTime, setFromTime] = React.useState<TimeValue>({
      hours: 9,
      minutes: 0,
    });
    const [toTime, setToTime] = React.useState<TimeValue>({
      hours: 18,
      minutes: 30,
    });

    const combinedFrom = React.useMemo(() => {
      if (!range?.from) return null;
      const d = new Date(range.from);
      d.setHours(fromTime.hours, fromTime.minutes, 0, 0);
      return d;
    }, [range, fromTime]);

    const combinedTo = React.useMemo(() => {
      if (!range?.to) return null;
      const d = new Date(range.to);
      d.setHours(toTime.hours, toTime.minutes, 0, 0);
      return d;
    }, [range, toTime]);

    return (
      <div className="flex flex-col gap-3">
        <DatePicker
          {...args}
          mode="range"
          value={range}
          onChange={(v) => setRange(v as DateRange | null)}
        />

        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#6B7280]">
              Start time
            </span>
            <div className="rounded-lg border border-[#F3F4F6]">
              <TimePicker
                value={fromTime}
                onChange={setFromTime}
                className="border-l-0"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#6B7280]">
              End time
            </span>
            <div className="rounded-lg border border-[#F3F4F6]">
              <TimePicker
                value={toTime}
                onChange={setToTime}
                className="border-l-0"
              />
            </div>
          </div>
        </div>

        <code className="text-xs text-[#6B7280]">
          {combinedFrom && combinedTo
            ? `${formatDateTime(combinedFrom)} → ${formatDateTime(combinedTo)}`
            : "Select a date range"}
        </code>
      </div>
    );
  },
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

/** Advisory green — the value is valid, the message says why it matters. */
export const Success: Story = {
  args: {
    mode: "single",
    label: "Go-live Date",
    status: "success",
    statusMessage: "Falls inside the contract term.",
    placeholder: "dd/mm/yyyy",
  },
};

/** Amber box — accepted, but the operator should know something. */
export const Warning: Story = {
  args: {
    mode: "range",
    label: "Report Window",
    status: "warning",
    statusMessage: "78 days — exports may be slow.",
    placeholder: "dd/mm/yyyy – dd/mm/yyyy",
  },
};

/** Shimmer row and a spinner; the panel cannot open while it loads. */
export const Loading: Story = {
  args: { mode: "single", label: "Payout Cycle", loading: true },
};

/** Trigger heights match Input and Select; the day cell scales with them. */
export const SizeScale: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 300 }}>
      {(
        [
          ["xs", "28 · cell 24 · 9px"],
          ["sm", "32 · cell 26 · 9px"],
          ["md", "40 · cell 30 · 10px"],
          ["lg", "48 · cell 34 · 11px"],
        ] as const
      ).map(([size, spec]) => (
        <DatePicker
          key={size}
          size={size}
          label={size.toUpperCase()}
          mode="single"
          clearable
          helperText={spec}
        />
      ))}
    </div>
  ),
};

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

export const XSmall: Story = {
  args: { mode: "single", size: "xs", placeholder: "XSmall" },
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
