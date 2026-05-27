import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "@/components/custom/Radio/RadioButtons";
import { CheckboxGroup } from "@/components/custom/Checkbox/CheckboxGroup";
import { Select } from "@/components/custom/Select/Select";
import { DatePicker } from "@/components/custom/DatePicker/DatePicker";
import type { DateRange } from "@/components/custom/DatePicker/DatePicker.types";

/* ── Shared option lists ──────────────────────────────────────────── */

const ZONE_OPTIONS = [
  { value: "delivery-distance", label: "Delivery Distance" },
  { value: "polygons", label: "Polygons" },
  { value: "pin-codes", label: "Pin Codes" },
];

const SEGMENT_OPTIONS = [
  { value: "champions", label: "Champions" },
  { value: "loyal", label: "Loyal Customers" },
  { value: "at-risk", label: "At Risk" },
  { value: "hibernating", label: "Hibernating" },
];

const CITY_OPTIONS = [
  { value: "chd", label: "Chandigarh" },
  { value: "del", label: "Delhi" },
  { value: "bom", label: "Mumbai" },
  { value: "blr", label: "Bengaluru" },
  { value: "hyd", label: "Hyderabad" },
];

const TAG_OPTIONS = [
  { value: "express", label: "Express" },
  { value: "fragile", label: "Fragile" },
  { value: "cod", label: "COD" },
  { value: "prepaid", label: "Prepaid" },
  { value: "return", label: "Return" },
];

/* ── Meta ─────────────────────────────────────────────────────────── */

const meta = {
  title: "Playground/Component Demo",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Live preview of Radio, Checkbox, Select, and DatePicker with pill design, label + required star, and helper/error text.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Full form demo ───────────────────────────────────────────────── */

export const FormDemo: Story = {
  name: "Full form — all components",
  render: function FormDemoStory() {
    const [zone, setZone] = React.useState<string>("delivery-distance");
    const [segments, setSegments] = React.useState<string[]>(["champions"]);
    const [city, setCity] = React.useState<string | string[]>("");
    const [tags, setTags] = React.useState<string | string[]>([]);
    const [deliveryDate, setDeliveryDate] = React.useState<Date | DateRange | null>(null);

    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-8 p-6">
        <h2 className="text-base font-semibold text-gray-900">Order Configuration</h2>

        <RadioGroup
          label="Delivery zone type"
          required
          options={ZONE_OPTIONS}
          value={zone}
          onChange={setZone}
          layout="horizontal"
          helperText="Choose how delivery zones are defined for this outlet."
        />

        <CheckboxGroup
          label="Customer segments"
          options={SEGMENT_OPTIONS}
          value={segments}
          onChange={setSegments}
          layout="horizontal"
          helperText="Select all segments to include in this campaign."
        />

        <Select
          label="City"
          required
          options={CITY_OPTIONS}
          value={typeof city === "string" ? city : ""}
          onChange={setCity}
          mode="single"
          placeholder="Pick a city"
          width="w-full"
        />

        <Select
          label="Order tags"
          options={TAG_OPTIONS}
          value={Array.isArray(tags) ? tags : []}
          onChange={setTags}
          mode="multi"
          placeholder="Add tags"
          clearable
          helperText="Tags help filter orders in the dashboard."
          width="w-full"
        />

        <DatePicker
          label="Delivery date"
          required
          mode="single"
          value={deliveryDate}
          onChange={setDeliveryDate}
          placeholder="Select a date"
          clearable
          helperText="Expected delivery date for this order."
          width="w-full"
        />

        <pre className="rounded-lg bg-gray-50 p-4 text-xs text-gray-600">
          {JSON.stringify(
            {
              zone,
              segments,
              city,
              tags,
              deliveryDate:
                deliveryDate instanceof Date
                  ? deliveryDate.toDateString()
                  : deliveryDate
                    ? `${(deliveryDate as DateRange).from?.toDateString()} → ${(deliveryDate as DateRange).to?.toDateString()}`
                    : null,
            },
            null,
            2,
          )}
        </pre>
      </div>
    );
  },
};

/* ── Required star placement ──────────────────────────────────────── */

export const RequiredStarPlacement: Story = {
  name: "Required star — tight label alignment",
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-lg">
      <RadioGroup
        label="Zone type"
        required
        options={ZONE_OPTIONS.slice(0, 2)}
        layout="horizontal"
      />
      <Select
        label="City"
        required
        options={CITY_OPTIONS}
        placeholder="Pick a city"
        width="w-full"
      />
      <DatePicker
        label="Start date"
        required
        mode="single"
        placeholder="Select a date"
        width="w-full"
      />
    </div>
  ),
};

/* ── Error states ─────────────────────────────────────────────────── */

export const ErrorStates: Story = {
  name: "Error states — all components",
  render: () => (
    <div className="flex flex-col gap-6 p-6 max-w-lg">
      <RadioGroup
        label="Zone type"
        required
        options={ZONE_OPTIONS.slice(0, 2)}
        layout="horizontal"
        error="Please select a delivery zone type."
      />
      <Select
        label="City"
        required
        options={CITY_OPTIONS}
        placeholder="Pick a city"
        error="City is required."
        width="w-full"
      />
      <DatePicker
        label="Start date"
        required
        mode="single"
        placeholder="Select a date"
        error="Start date is required."
        width="w-full"
      />
    </div>
  ),
};

/* ── Pill design — selected vs unselected ─────────────────────────── */

export const PillDesignPreview: Story = {
  name: "Pill design — Radio & Checkbox",
  render: function PillPreviewStory() {
    const [zone, setZone] = React.useState<string>("delivery-distance");
    const [selected, setSelected] = React.useState<string[]>(["express", "prepaid"]);

    return (
      <div className="flex flex-col gap-8 p-6 max-w-2xl">
        <RadioGroup
          label="Delivery zone"
          options={ZONE_OPTIONS}
          value={zone}
          onChange={setZone}
          layout="horizontal"
        />
        <CheckboxGroup
          label="Order tags"
          options={TAG_OPTIONS}
          value={selected}
          onChange={setSelected}
          layout="horizontal"
        />

        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Size variants
          </p>
          <RadioGroup
            options={ZONE_OPTIONS.slice(0, 2)}
            defaultValue="delivery-distance"
            layout="horizontal"
            size="sm"
          />
          <RadioGroup
            options={ZONE_OPTIONS.slice(0, 2)}
            defaultValue="delivery-distance"
            layout="horizontal"
            size="md"
          />
          <RadioGroup
            options={ZONE_OPTIONS.slice(0, 2)}
            defaultValue="delivery-distance"
            layout="horizontal"
            size="lg"
          />
        </div>
      </div>
    );
  },
};
