import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { RadioGroup } from "./RadioButtons";
import { Radio } from "./Radio";
import type { RadioOption } from "@/types/radio";

const THREE_OPTIONS: RadioOption[] = [
  { value: "one", label: "Option One" },
  { value: "two", label: "Option Two" },
  { value: "three", label: "Option Three" },
];

const SIX_OPTIONS: RadioOption[] = [
  { value: "alpha", label: "Alpha" },
  { value: "beta", label: "Beta" },
  { value: "gamma", label: "Gamma" },
  { value: "delta", label: "Delta" },
  { value: "epsilon", label: "Epsilon" },
  { value: "zeta", label: "Zeta" },
];

const SEGMENT_OPTIONS: RadioOption[] = [
  { value: "champions", label: "Champions" },
  { value: "loyal-customers", label: "Loyal Customers" },
  { value: "potential-loyalists", label: "Potential Loyalists" },
  { value: "new-transacting-customers", label: "New Transacting Customers" },
  { value: "promising", label: "Promising" },
  { value: "need-attention", label: "Need Attention" },
  { value: "about-to-sleep", label: "About to Sleep" },
  { value: "at-risk", label: "At Risk" },
  { value: "cant-lose-them", label: "Can't Lose Them" },
  { value: "hibernating", label: "Hibernating" },
  { value: "lost", label: "Lost" },
  { value: "regular", label: "Regular" },
];

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix-backed radio group. By default each `Radio` renders a plain radio circle + label (no wrapper). Pass `borderColor` and/or `bgColor` on individual `Radio` items to opt into a pill wrapper that applies those colors when the item is selected. The `RadioGroup` wrapper handles layouts, group-level `disabled`, helper text, and error display.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    layout: {
      control: "radio",
      options: ["horizontal", "vertical", "grid"],
    },
    columns: { control: { type: "number", min: 1, max: 6 } },
    label: { control: "text" },
    required: { control: "boolean" },
    helperText: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    defaultValue: { control: "text" },
    borderColor: { control: "color" },
    bgColor: { control: "color" },
    textColor: { control: "color" },
    readOnly: { control: "boolean" },
    onChange: { action: "change" },
  },
  args: {
    options: THREE_OPTIONS,
    size: "md",
    layout: "horizontal",
    columns: 2,
    disabled: false,
    required: false,
    readOnly: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ────────────────────────────────────────────────── */

export const Default: Story = {
  args: { defaultValue: "one" },
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────── */

export const Small: Story = {
  args: { size: "sm", defaultValue: "one" },
  render: (args) => (
    <div className="w-96">
      <RadioGroup {...args} />
    </div>
  ),
};

export const Medium: Story = {
  args: { size: "md", defaultValue: "one" },
  render: (args) => (
    <div className="w-96">
      <RadioGroup {...args} />
    </div>
  ),
};

export const Large: Story = {
  args: { size: "lg", defaultValue: "one" },
  render: (args) => (
    <div className="w-96">
      <RadioGroup {...args} />
    </div>
  ),
};

/* ── Layouts ────────────────────────────────────────────────── */

export const Horizontal: Story = {
  args: {
    options: SIX_OPTIONS,
    defaultValue: "alpha",
    layout: "horizontal",
  },
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    options: SIX_OPTIONS,
    defaultValue: "alpha",
    layout: "vertical",
  },
  render: (args) => (
    <div className="w-96">
      <RadioGroup {...args} />
    </div>
  ),
};

export const Grid: Story = {
  args: {
    options: SIX_OPTIONS,
    defaultValue: "alpha",
    layout: "grid",
    columns: 3,
  },
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

/* ── State variants ─────────────────────────────────────────── */

export const Unselected: Story = {
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

export const Preselected: Story = {
  args: { defaultValue: "two" },
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

export const GroupDisabled: Story = {
  args: { defaultValue: "one", disabled: true },
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

export const GroupReadOnly: Story = {
  name: "Read only",
  parameters: {
    docs: {
      description: {
        story:
          "The selected value is displayed normally but the user cannot change it. Unlike `disabled`, there is no opacity reduction.",
      },
    },
  },
  args: {
    label: "Delivery zone",
    helperText: "Contact support to update this setting.",
    defaultValue: "two",
    layout: "horizontal",
    readOnly: true,
  },
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

export const SingleItemDisabled: Story = {
  args: {
    defaultValue: "one",
    options: [
      { value: "one", label: "Option One" },
      { value: "two", label: "Option Two", disabled: true },
      { value: "three", label: "Option Three" },
    ],
  },
  render: (args) => (
    <div className="w-96">
      <RadioGroup {...args} />
    </div>
  ),
};

export const WithLabelAndHelper: Story = {
  args: {
    label: "Customer segment",
    helperText: "Pick the segment this campaign targets.",
    defaultValue: "one",
    layout: "horizontal",
  },
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

export const WithRequiredLabel: Story = {
  name: "Required field label",
  args: {
    label: "Delivery zone",
    required: true,
    helperText: "Select the zone for this order.",
    defaultValue: "one",
    layout: "horizontal",
  },
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: "Customer segment",
    required: true,
    error: "Please select a segment before continuing.",
    layout: "horizontal",
  },
  render: (args) => (
    <div className="w-[560px]">
      <RadioGroup {...args} />
    </div>
  ),
};

/* ── Customer segments (screenshot parity) ──────────────────── */

export const CustomerSegments: Story = {
  args: {
    options: SEGMENT_OPTIONS,
    defaultValue: "champions",
    layout: "horizontal",
    label: "Customer segment",
    helperText: "Horizontal layout wraps naturally across rows.",
  },
  render: (args) => (
    <div className="w-[640px]">
      <RadioGroup {...args} />
    </div>
  ),
};

/* ── Controlled ─────────────────────────────────────────────── */

export const Controlled: Story = {
  args: {
    options: SIX_OPTIONS,
    layout: "horizontal",
    label: "Pick one",
  },
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState<string>("alpha");
    return (
      <div className="flex w-[560px] flex-col gap-3">
        <RadioGroup {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">value: {`"${value}"`}</code>
      </div>
    );
  },
};

/* ── Custom option shape (getLabel / getValue / getDisabled) ── */

type Segment = {
  id: string;
  name: string;
  locked?: boolean;
};

const SEGMENTS: Segment[] = [
  { id: "seg-1", name: "Champions" },
  { id: "seg-2", name: "Loyal Customers" },
  { id: "seg-3", name: "At Risk", locked: true },
  { id: "seg-4", name: "Hibernating" },
];

export const CustomOptionShape: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When your options don't match `{ value, label, disabled }`, pass `getValue`, `getLabel`, and `getDisabled` to extract each field. Here options are `{ id, name, locked }`.",
      },
    },
  },
  render: function CustomShapeStory() {
    const [value, setValue] = React.useState<string>("seg-1");
    const selected = SEGMENTS.find((s) => s.id === value);
    return (
      <div className="flex w-[560px] flex-col gap-3">
        <RadioGroup<Segment>
          label="Customer segment"
          helperText="Options use { id, name, locked } — mapped via getter props."
          options={SEGMENTS}
          getValue={(s) => s.id}
          getLabel={(s) => s.name}
          getDisabled={(s) => s.locked}
          value={value}
          onChange={setValue}
          layout="horizontal"
        />
        <code className="text-xs text-[#6B7280]">
          selected id: {`"${value}"`} · name: {`"${selected?.name ?? ""}"`}
        </code>
      </div>
    );
  },
};

/* ── Custom pill colors ─────────────────────────────────────────── */

export const WithCustomColors: Story = {
  name: "Custom pill colors",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `borderColor` and `bgColor` on each `Radio` item to opt into the pill wrapper. The pill border and background apply only when that item is selected; unselected items show the default plain style.",
      },
    },
  },
  render: function CustomColorsStory() {
    const [value, setValue] = React.useState("one");
    return (
      <div className="flex flex-col gap-3">
        <RadioGroupPrimitive.Root
          value={value}
          onValueChange={setValue}
          className="flex flex-col gap-2"
        >
          <Radio value="one" label="Option One" borderColor="#067D51" bgColor="#EFF9F4" />
          <Radio value="two" label="Option Two" borderColor="#067D51" bgColor="#EFF9F4" />
          <Radio value="three" label="Option Three" borderColor="#067D51" bgColor="#EFF9F4" />
        </RadioGroupPrimitive.Root>
        <code className="text-xs text-gray-500">value: "{value}"</code>
      </div>
    );
  },
};

export const WithCustomColorsBrandBlue: Story = {
  name: "Custom pill colors · Brand blue",
  render: function BrandBlueStory() {
    const [value, setValue] = React.useState("morning");
    const slots = [
      { value: "morning", label: "Morning (5am – 11:58am)" },
      { value: "afternoon", label: "Afternoon (12pm – 3:59pm)" },
      { value: "evening", label: "Evening (4pm – 7:59pm)" },
    ];
    return (
      <RadioGroupPrimitive.Root
        value={value}
        onValueChange={setValue}
        className="flex flex-col gap-2"
      >
        {slots.map((s) => (
          <Radio
            key={s.value}
            value={s.value}
            label={s.label}
            borderColor="#3B82F6"
            bgColor="#EFF6FF"
          />
        ))}
      </RadioGroupPrimitive.Root>
    );
  },
};

export const WithCustomColorsHorizontal: Story = {
  name: "Custom pill colors · Horizontal",
  render: function HorizontalCustomStory() {
    const [value, setValue] = React.useState("sm");
    return (
      <RadioGroupPrimitive.Root
        value={value}
        onValueChange={setValue}
        className="flex flex-row flex-wrap gap-2"
      >
        {(["sm", "md", "lg"] as const).map((size) => (
          <Radio
            key={size}
            value={size}
            label={size.toUpperCase()}
            size={size}
            borderColor="#7C3AED"
            bgColor="#F5F3FF"
          />
        ))}
      </RadioGroupPrimitive.Root>
    );
  },
};

export const GroupWithCustomColors: Story = {
  name: "Group · Custom pill colors",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `borderColor` and `bgColor` directly on `RadioGroup` to apply pill styling to every item in the group. The colored pill border and background appear only on the selected item.",
      },
    },
  },
  render: function GroupCustomColorsStory() {
    const [value, setValue] = React.useState("morning");
    const slots = [
      { value: "morning", label: "Morning (5am – 11:58am)" },
      { value: "afternoon", label: "Afternoon (12pm – 3:59pm)" },
      { value: "evening", label: "Evening (4pm – 7:59pm)" },
      { value: "night", label: "Night (8pm – 11:59pm)" },
    ];
    return (
      <div className="flex w-[480px] flex-col gap-3">
        <RadioGroup
          label="Preferred time slot"
          options={slots}
          value={value}
          onChange={setValue}
          layout="vertical"
          borderColor="#067D51"
          bgColor="#EFF9F4"
        />
        <code className="text-xs text-gray-500">value: "{value}"</code>
      </div>
    );
  },
};

export const GroupWithCustomColorsBrandBlue: Story = {
  name: "Group · Custom pill colors · Brand blue",
  render: function GroupBrandBlueStory() {
    const [value, setValue] = React.useState("standard");
    const plans = [
      { value: "standard", label: "Standard" },
      { value: "pro", label: "Pro" },
      { value: "enterprise", label: "Enterprise" },
    ];
    return (
      <div className="flex w-[480px] flex-col gap-3">
        <RadioGroup
          label="Subscription plan"
          options={plans}
          value={value}
          onChange={setValue}
          layout="horizontal"
          borderColor="#3B82F6"
          bgColor="#EFF6FF"
        />
        <code className="text-xs text-gray-500">value: "{value}"</code>
      </div>
    );
  },
};

