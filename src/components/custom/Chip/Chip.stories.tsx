import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A compact label chip for surfacing status, category, or tag information inline. Comes in four semantic variants (`success`, `error`, `warning`, `info`) and four sizes (`xs`, `sm`, `md`, `lg`). Pass `bgColor` and `textColor` for fully custom colors without needing a new variant.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error", "warning", "info", "inactive"],
      description: "Semantic color variant.",
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg"],
      description: "Controls padding and font size.",
    },
    label: {
      control: "text",
      description: "Text displayed inside the chip.",
    },
    bgColor: {
      control: "color",
      description:
        "Custom background color (any valid CSS color). Overrides the variant background.",
    },
    textColor: {
      control: "color",
      description:
        "Custom text color (any valid CSS color). Overrides the variant text color.",
    },
  },
  args: {
    label: "Label",
    size: "md",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Single variant stories ──────────────────────────────────────────────── */

export const Success: Story = {
  args: { variant: "success", label: "Delivered" },
};

export const Error: Story = {
  args: { variant: "error", label: "Missed" },
};

export const Warning: Story = {
  args: { variant: "warning", label: "Inaccurate" },
};

export const Info: Story = {
  args: { variant: "info", label: "Processing" },
};

export const Inactive: Story = {
  args: { variant: "inactive", label: "Inactive" },
};

/* ── All variants side-by-side ───────────────────────────────────────────── */

export const AllVariants: Story = {
  name: "All variants",
  parameters: {
    docs: {
      description: {
        story: "All four semantic variants at the default `md` size.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip variant="success"  label="Delivered" />
      <Chip variant="error"    label="Missed" />
      <Chip variant="warning"  label="Inaccurate" />
      <Chip variant="info"     label="Processing" />
      <Chip variant="inactive" label="Inactive" />
    </div>
  ),
};

/* ── All sizes ───────────────────────────────────────────────────────────── */

export const AllSizes: Story = {
  name: "All sizes",
  parameters: {
    docs: {
      description: {
        story: "The same `error` variant rendered at all four sizes.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip variant="error" size="xs" label="xs · Missed" />
      <Chip variant="error" size="sm" label="sm · Missed" />
      <Chip variant="error" size="md" label="md · Missed" />
      <Chip variant="error" size="lg" label="lg · Missed" />
    </div>
  ),
};

/* ── Custom colors ───────────────────────────────────────────────────────── */

export const CustomColors: Story = {
  name: "Custom colors",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `bgColor` and `textColor` for one-off colors that don't map to a variant.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Chip label="Purple" bgColor="#EDE9FE" textColor="#5B21B6" />
      <Chip label="Teal"   bgColor="#CCFBF1" textColor="#0F766E" />
      <Chip label="Pink"   bgColor="#FCE7F3" textColor="#9D174D" />
      <Chip label="Orange" bgColor="#FEF3C7" textColor="#92400E" />
    </div>
  ),
};

/* ── Interactive (controls) ──────────────────────────────────────────────── */

export const Playground: Story = {
  name: "Playground",
  args: {
    variant: "warning",
    size: "md",
    label: "Inaccurate",
  },
};
