import type { Meta, StoryObj } from "@storybook/react";
import { TopHeader } from "./TopHeader";
import { Button } from "../Button/button";

const meta = {
  title: "Layout/TopHeader",
  component: TopHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Module-level title row — left title + optional helper link, right action slot, optional full-bleed divider.",
      },
    },
  },
  argTypes: {
    title: { control: "text" },
    divider: { control: "boolean" },
  },
  args: {
    title: "Orders",
    divider: true,
  },
} satisfies Meta<typeof TopHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = { args: {} };

export const WithHelper: Story = {
  args: {
    helper: (
      <a className="text-[#006F42] underline" href="#">
        How it works?
      </a>
    ),
  },
};

export const WithAction: Story = {
  args: {
    action: <Button size="sm">Quick actions</Button>,
  },
};

export const Full: Story = {
  args: {
    title: "Dispatch dashboard",
    helper: (
      <a className="text-[#006F42] underline" href="#">
        How it works?
      </a>
    ),
    action: (
      <div className="flex gap-2">
        <Button size="sm" variant="secondary">
          Export
        </Button>
        <Button size="sm">Quick actions</Button>
      </div>
    ),
  },
};

export const NoDivider: Story = { args: { divider: false } };
