import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CustomRadioGroup } from "./CustomRadioGroup";
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
  component: CustomRadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Radix-backed radio group wrapper. Renders a `Radio` (shadcn `RadioGroupItem`) per option with CVA circle, dot, and label variants. Supports `horizontal` (wrap), `vertical`, and `grid` (dynamic `columns`) layouts, group-level `disabled`, per-option `disabled`, group label, helper text, and error display with a `CircleAlert` icon.",
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
    helperText: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    defaultValue: { control: "text" },
    onChange: { action: "change" },
  },
  args: {
    options: THREE_OPTIONS,
    size: "md",
    layout: "vertical",
    columns: 2,
    disabled: false,
  },
} satisfies Meta<typeof CustomRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <CustomRadioGroup {...args} />
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────── */

export const Small: Story = {
  args: { size: "sm", defaultValue: "one" },
  render: (args) => (
    <div className="w-96">
      <CustomRadioGroup {...args} />
    </div>
  ),
};

export const Medium: Story = {
  args: { size: "md", defaultValue: "one" },
  render: (args) => (
    <div className="w-96">
      <CustomRadioGroup {...args} />
    </div>
  ),
};

export const Large: Story = {
  args: { size: "lg", defaultValue: "one" },
  render: (args) => (
    <div className="w-96">
      <CustomRadioGroup {...args} />
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
      <CustomRadioGroup {...args} />
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
      <CustomRadioGroup {...args} />
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
      <CustomRadioGroup {...args} />
    </div>
  ),
};

/* ── State variants ─────────────────────────────────────────── */

export const Unselected: Story = {
  render: (args) => (
    <div className="w-96">
      <CustomRadioGroup {...args} />
    </div>
  ),
};

export const Preselected: Story = {
  args: { defaultValue: "two" },
  render: (args) => (
    <div className="w-96">
      <CustomRadioGroup {...args} />
    </div>
  ),
};

export const GroupDisabled: Story = {
  args: { defaultValue: "one", disabled: true },
  render: (args) => (
    <div className="w-96">
      <CustomRadioGroup {...args} />
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
      <CustomRadioGroup {...args} />
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
      <CustomRadioGroup {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: "Customer segment",
    error: "Please select a segment before continuing.",
    layout: "horizontal",
  },
  render: (args) => (
    <div className="w-[560px]">
      <CustomRadioGroup {...args} />
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
      <CustomRadioGroup {...args} />
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
        <CustomRadioGroup {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">
          value: {`"${value}"`}
        </code>
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
        <CustomRadioGroup<Segment>
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
          selected id: {`"${value}"`} · name:{" "}
          {`"${selected?.name ?? ""}"`}
        </code>
      </div>
    );
  },
};
