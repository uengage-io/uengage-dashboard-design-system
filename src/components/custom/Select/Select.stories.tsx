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
          "Popover + command-menu backed select. Supports `single` and `multi` modes, a built-in search, and either pre-shaped `options` or structured `items` + `getLabel` / `getValue`. In multi mode, selections render as overflow-aware pills.",
      },
    },
  },
  argTypes: {
    mode: { control: "radio", options: ["single", "multi"] },
    size: { control: "radio", options: ["xs", "sm", "md", "lg"] },
    disabled: { control: "boolean" },
     width: { control: "text" },
    placeholder: { control: "text" },
    onChange: { action: "changed" },
  },
  args: {
    mode: "single",
    size: "md",
    placeholder: "Select…",
    width: "w-full sm:w-80",
    disabled: false,
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
