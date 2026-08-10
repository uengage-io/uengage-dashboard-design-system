import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import type { SelectOption } from "./Select.types";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Popover + command-menu backed select, built to the uEngage Select design spec. The trigger borrows the Input box exactly — same 28 / 32 / 40 / 48 heights, hairline and focus ring — so a select and a field can sit in the same row; only the trailing chevron marks it as a select. Supports `single` and `multi` modes, grouped options, rich rows with `meta` / `description` / `icon`, a built-in search, async `loading` shimmer rows, a `creatable` row, a custom `emptyState`, and either pre-shaped `options` or structured `items` + `getLabel` / `getValue`.",
      },
    },
  },
  argTypes: {
    mode: { control: "radio", options: ["single", "multi"] },
    size: { control: "radio", options: ["xs", "sm", "md", "lg"] },
    label: { control: "text" },
    required: { control: "boolean" },
    helperText: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    width: { control: "text" },
    placeholder: { control: "text" },
    sorting: { control: "boolean" },
    indexing: { control: "boolean" },
    search: { control: "boolean" },
    status: {
      control: "select",
      options: [undefined, "success", "warning"],
      description: "Non-error validation state. Ignored while `error` is set.",
    },
    statusMessage: { control: "text" },
    loading: { control: "boolean", description: "Shimmer rows in the menu, spinner on the trigger." },
    clearable: { control: "boolean" },
    maxChips: { control: "number", description: "Hard cap on chips before a +N counter." },
    creatable: { control: "boolean" },
    placement: { control: "radio", options: ["auto", "top", "bottom"] },
    onChange: { action: "changed" },
    onCreate: { action: "created" },
    onSearch: { action: "searched" },
  },
  args: {
    mode: "single",
    size: "md",
    placeholder: "Select…",
    width: "w-full sm:w-80",
    disabled: false,
    readOnly: false,
    required: false,
    sorting: false,
    indexing: false,
    search: true,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const CITY_OPTIONS: SelectOption[] = [
  { value: "chd", label: "Chandigarh" },
  { value: "del", label: "Delhi" },
  { value: "bom", label: "Mumbai" },
  { value: "blr", label: "Bengaluru" },
  { value: "hyd", label: "Hyderabad" },
  { value: "maa", label: "Chennai" },
  { value: "ccu", label: "Kolkata" },
  { value: "pnq", label: "Pune" },
];

export const Single: Story = {
  args: { mode: "single", options: CITY_OPTIONS, placeholder: "Pick a city" },
};

export const Multi: Story = {
  args: {
    mode: "multi",
    options: CITY_OPTIONS,
    placeholder: "Pick cities",
  },
};

export const WithDisabledOption: Story = {
  args: {
    mode: "single",
    options: [
      ...CITY_OPTIONS.slice(0, 3),
      { value: "ccu", label: "Kolkata (unavailable)", disabled: true },
      ...CITY_OPTIONS.slice(4),
    ],
  },
};

export const Disabled: Story = {
  args: { mode: "single", options: CITY_OPTIONS, disabled: true },
};

export const ReadOnly: Story = {
  name: "Read only · Single",
  parameters: {
    docs: {
      description: {
        story:
          "The trigger displays the selected value with a `bg-gray-50` surface. The dropdown cannot be opened and no hover effects are applied. Unlike `disabled`, full opacity is preserved.",
      },
    },
  },
  args: {
    mode: "single",
    options: CITY_OPTIONS,
    label: "City",
    value: "blr",
    readOnly: true,
  },
};

export const ReadOnlyMulti: Story = {
  name: "Read only · Multi",
  parameters: {
    docs: {
      description: {
        story:
          "Multi-select in read-only mode shows the selected pills but the dropdown cannot be opened and pills cannot be removed.",
      },
    },
  },
  args: {
    mode: "multi",
    options: CITY_OPTIONS,
    label: "Delivery cities",
    value: ["chd", "del", "blr"],
    readOnly: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    mode: "multi",
    options: CITY_OPTIONS,
    defaultValue: ["chd", "del", "bom"],
  },
};

type Zone = { code: string; name: string; inactive?: boolean };
const ZONES: Zone[] = [
  { code: "S17", name: "Sector 17" },
  { code: "S22", name: "Sector 22" },
  { code: "P8B", name: "Phase 8B" },
  { code: "IA", name: "Industrial Area", inactive: true },
  { code: "MAN", name: "Manimajra" },
];

export const WithItemsApi: Story = {
  render: (args) => (
    <Select<Zone>
      {...args}
      items={ZONES}
      getLabel={(z) => z.name}
      getValue={(z) => z.code}
      getDisabled={(z) => !!z.inactive}
    />
  ),
  args: { mode: "multi", placeholder: "Pick zones" },
};

export const WithSorting: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass `sorting` to render an A→Z / Z→A toggle icon on the trigger. Clicking it re-orders the option list; fuzzy search still ranks by relevance when the user types.",
      },
    },
  },
  args: { mode: "single", options: CITY_OPTIONS, placeholder: "Pick a city", sorting: true },
};

export const WithSortingMulti: Story = {
  name: "Sorting · Multi",
  args: { mode: "multi", options: CITY_OPTIONS, placeholder: "Pick cities", sorting: true },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState<string | string[]>([]);
    return (
      <div className="flex flex-col gap-2">
        <Select
          {...args}
          options={CITY_OPTIONS}
          value={value}
          onChange={setValue}
        />
        <code className="text-xs text-[#6B7280]">{JSON.stringify(value)}</code>
      </div>
    );
  },
  args: { mode: "multi" },
};

/* ── Label & helper ──────────────────────────────────────────────────── */

export const WithLabel: Story = {
  args: { mode: "single", options: CITY_OPTIONS, label: "City", placeholder: "Pick a city" },
};

export const WithRequiredLabel: Story = {
  name: "Required field label",
  args: {
    mode: "single",
    options: CITY_OPTIONS,
    label: "City",
    required: true,
    helperText: "Choose the city for this order.",
    placeholder: "Pick a city",
  },
};

export const WithError: Story = {
  args: {
    mode: "single",
    options: CITY_OPTIONS,
    label: "City",
    required: true,
    error: "Please select a city.",
    placeholder: "Pick a city",
  },
};

/* ── Size variants ──────────────────────────────────────────── */

export const SizeXs: Story = {
  name: "size=xs",
  args: { mode: "single", size: "xs", options: CITY_OPTIONS, placeholder: "xs" },
};

export const SizeSm: Story = {
  name: "size=sm",
  args: { mode: "single", size: "sm", options: CITY_OPTIONS, placeholder: "sm" },
};

export const SizeMd: Story = {
  name: "size=md",
  args: { mode: "single", size: "md", options: CITY_OPTIONS, placeholder: "md" },
};

export const SizeLg: Story = {
  name: "size=lg",
  args: { mode: "single", size: "lg", options: CITY_OPTIONS, placeholder: "lg" },
};

/* ── Design refresh ─────────────────────────────────────────── */

const CHANNELS: SelectOption[] = [
  { value: "zomato", label: "Zomato", meta: "412 items", group: "Aggregators" },
  { value: "swiggy", label: "Swiggy", meta: "388 items", group: "Aggregators" },
  { value: "ondc", label: "ONDC", meta: "412 items", group: "Aggregators" },
  { value: "website", label: "Website", meta: "412 items", group: "Direct" },
  { value: "dinein", label: "Dine-in", meta: "96 items", group: "Direct" },
];

/** Uppercase eyebrows, a hairline between groups, and the header pins while scrolling. */
export const Grouped: Story = {
  args: {
    label: "Channel",
    options: CHANNELS,
    placeholder: "Pick a channel…",
    helperText: "Grouped by fulfilment type.",
  },
};

/** Rich rows: leading glyph, a description line, and trailing meta. */
export const RichRows: Story = {
  args: {
    label: "Outlet",
    placeholder: "Select an outlet…",
    options: [
      { value: "s17", label: "Sector 17 Flagship", description: "Chandigarh", meta: "412 items" },
      { value: "elante", label: "Elante Mall", description: "Chandigarh", meta: "388 items" },
      { value: "s35", label: "Sector 35 Express", description: "Chandigarh", meta: "210 items" },
      { value: "pkl", label: "Panchkula Hub", description: "Panchkula", meta: "174 items" },
    ],
  },
};

/** A disabled option always says why it is disabled. */
export const DisabledOptionWithReason: Story = {
  args: {
    label: "Dine-in Layout",
    placeholder: "Select a layout…",
    options: [
      { value: "grid", label: "Grid" },
      { value: "floor", label: "Floor plan", disabled: true, description: "Requires the Dine-in module" },
      { value: "list", label: "List" },
    ],
  },
};

/** Options are being fetched — shimmer rows, never a centred spinner. */
export const Loading: Story = {
  args: { label: "Outlet", loading: true, options: [], helperText: "Options are being fetched." },
};

export const Success: Story = {
  args: {
    label: "GST State Code",
    options: [{ value: "03", label: "Punjab (03)" }],
    defaultValue: "03",
    status: "success",
    statusMessage: "Matches the GSTIN on file.",
  },
};

export const Warning: Story = {
  args: {
    label: "Payout Cycle",
    options: [
      { value: "m", label: "Monthly" },
      { value: "w", label: "Weekly" },
    ],
    defaultValue: "m",
    status: "warning",
    statusMessage: "Weekly is recommended above ₹5L GMV.",
  },
};

/** An empty menu always offers the way out. */
export const EmptyWithCallToAction: Story = {
  args: {
    label: "Outlet",
    options: [],
    placeholder: "Select an outlet…",
    emptyState: (
      <span>
        <b>Add your first outlet</b> to pick a fulfilment mode for it.
      </span>
    ),
  },
};

/** Pinned last, quoted with what the user typed. */
export const Creatable: Story = {
  args: {
    label: "Menu name",
    options: [
      { value: "breakfast", label: "Breakfast" },
      { value: "lunch", label: "Lunch" },
    ],
    creatable: true,
    placeholder: "Search or create…",
    helperText: "Type something that does not exist to see the create row.",
  },
};

/** Two chips then a counter — the trigger stays one line. */
export const MultiWithChipCap: Story = {
  args: {
    label: "Channels",
    mode: "multi",
    options: CHANNELS,
    defaultValue: ["zomato", "swiggy", "ondc", "website"],
    maxChips: 2,
    clearable: true,
    helperText: "maxChips={2}.",
  },
};

/** Flips above the trigger when there is no room below. */
export const OpensUpward: Story = {
  args: { label: "Fulfilment Mode", options: CHANNELS, placement: "top" },
};

export const WithLeftIcon: Story = {
  args: {
    label: "Fulfilment Mode",
    options: CHANNELS,
    leftIcon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
        <path d="M5 18V7l7-4 7 4v11" />
        <path d="M3 18h18" />
      </svg>
    ),
  },
};

/** Trigger heights match Input exactly so the two can share a row. */
export const SizeScale: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-[420px] flex-col gap-4">
      {(
        [
          ["xs", "28 · r8 · 12px · opt 28"],
          ["sm", "32 · r8 · 12px · opt 30"],
          ["md", "40 · r8 · 13px · opt 34"],
          ["lg", "48 · r8 · 14px · opt 38"],
        ] as const
      ).map(([size, spec]) => (
        <Select
          key={size}
          size={size}
          label={size.toUpperCase()}
          options={CHANNELS}
          defaultValue="zomato"
          helperText={spec}
        />
      ))}
    </div>
  ),
};
