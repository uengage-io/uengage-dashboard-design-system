import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Button } from "../Button/button";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Thin wrapper over the shadcn Card that enforces the uEngage surface — white background, light-gray border, responsive padding. Compose with `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, and `CardFooter`.",
      },
    },
  },
  argTypes: {
    className: { control: "text" },
  },
  args: {},
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args} className="w-90">
      A minimal card. Drop any content inside.
    </Card>
  ),
};

export const WithHeaderAndContent: Story = {
  render: (args) => (
    <Card {...args} className="w-95">
      <CardHeader>
        <CardTitle>Active orders</CardTitle>
        <CardDescription>
          Live view of orders currently being fulfilled.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold text-[#111827]">128</div>
        <div className="text-xs text-[#6B7280]">Updated 2 minutes ago</div>
      </CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Card {...args} className="w-105">
      <CardHeader>
        <CardTitle>Weekly summary</CardTitle>
        <CardDescription>Performance vs. last week</CardDescription>
        <CardAction>
          <Button size="xs" variant="tertiary">
            View report
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm">
          <li>Orders: 1,204 (+12%)</li>
          <li>Revenue: ₹3.4L (+8%)</li>
          <li>Avg. delivery: 28 min (-3 min)</li>
        </ul>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button size="sm" variant="secondary">
          Dismiss
        </Button>
        <Button size="sm" variant="primary">
          Acknowledge
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const FullLayout: Story = {
  render: (args) => (
    <Card {...args} className="w-110">
      <CardHeader>
        <CardTitle>Driver profile</CardTitle>
        <CardDescription>Rahul Sharma — DL-12345</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          4.8★ over 1,240 deliveries. On duty today from 09:00 to 18:00. Current
          zone: Sector 17, Chandigarh.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-[#6B7280]">Last seen 1 min ago</span>
        <Button size="sm">Contact</Button>
      </CardFooter>
    </Card>
  ),
};
