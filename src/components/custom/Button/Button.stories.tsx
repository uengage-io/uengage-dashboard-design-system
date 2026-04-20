import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Download, Plus, Trash2 } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A gradient-filled button with 6 color variants × 4 sizes. Supports left/right icons, disabled state, and `asChild` for render delegation.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "alertPrimary",
        "alertSecondary",
        "warningPrimary",
      ],
      description: "Visual color variant.",
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg"],
      description: "Size (padding + text + icon scale).",
    },
    disabled: { control: "boolean" },
    asChild: {
      control: "boolean",
      description: "Render as a Radix Slot — delegates DOM to the child.",
    },
    leftIcon: { control: false },
    rightIcon: { control: false },
    children: { control: "text" },
    onClick: { action: "clicked" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Tertiary: Story = {
  args: { variant: "tertiary", children: "Learn more" },
};
export const AlertPrimary: Story = {
  args: { variant: "alertPrimary", children: "Delete" },
};
export const AlertSecondary: Story = {
  args: { variant: "alertSecondary", children: "Remove" },
};
export const WarningPrimary: Story = {
  args: { variant: "warningPrimary", children: "Proceed with caution" },
};

export const Disabled: Story = { args: { disabled: true } };

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Plus />,
    children: "Create new",
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRight />,
    children: "Continue",
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <Download />,
    rightIcon: <ArrowRight />,
    children: "Download & continue",
  },
};

export const IconOnly: Story = {
  args: {
    variant: "alertPrimary",
    size: "sm",
    leftIcon: <Trash2 />,
    children: null,
    "aria-label": "Delete",
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="xs">
        xs
      </Button>
      <Button {...args} size="sm">
        sm
      </Button>
      <Button {...args} size="md">
        md
      </Button>
      <Button {...args} size="lg">
        lg
      </Button>
    </div>
  ),
  args: { variant: "primary" },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="grid grid-cols-3 gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="tertiary">
        Tertiary
      </Button>
      <Button {...args} variant="alertPrimary">
        Alert primary
      </Button>
      <Button {...args} variant="alertSecondary">
        Alert secondary
      </Button>
      <Button {...args} variant="warningPrimary">
        Warning
      </Button>
    </div>
  ),
  args: {},
};

export const AsChildLink: Story = {
  args: {
    asChild: true,
    variant: "tertiary",
    children: (
      <a href="https://uengage.in" target="_blank" rel="noreferrer">
        Open uEngage
      </a>
    ),
  },
};
