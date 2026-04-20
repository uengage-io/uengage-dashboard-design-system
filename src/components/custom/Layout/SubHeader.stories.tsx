import type { Meta, StoryObj } from "@storybook/react";
import { SubHeader } from "./SubHeader";
import { Button } from "../Button/button";

const meta = {
  title: "Layout/SubHeader",
  component: SubHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Secondary heading row — bold title + subtitle/progress on the left, optional right slot (buttons, filters). `align` controls vertical alignment, `divider` renders a full-bleed separator, and the `children` slot accepts tabs/filters under the heading.",
      },
    },
  },
  argTypes: {
    align: {
      control: "radio",
      options: ["start", "center", "end"],
    },
    divider: { control: "boolean" },
    title: { control: "text" },
  },
  args: {
    title: "Active orders",
    subtitle: "128 orders in progress",
    align: "center",
    divider: false,
  },
} satisfies Meta<typeof SubHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleAndSubtitle: Story = { args: {} };

export const WithRightSlot: Story = {
  args: {
    right: (
      <>
        <Button size="xs" variant="secondary">
          Previous
        </Button>
        <Button size="xs">Next step</Button>
      </>
    ),
  },
};

export const WithProgressSubtitle: Story = {
  args: {
    title: "Onboarding",
    subtitle: (
      <div className="flex items-center gap-2">
        <span>Step 3 / 5</span>
        <div className="h-1 w-24 rounded-full bg-[#E5E7EB]">
          <div className="h-full w-3/5 rounded-full bg-[#006F42]" />
        </div>
      </div>
    ),
  },
};

export const WithChildrenTabs: Story = {
  args: {
    title: "Drivers",
    subtitle: "All active shifts",
    children: (
      <div className="flex gap-2 text-xs">
        {["All", "On duty", "Break", "Offline"].map((t, i) => (
          <button
            key={t}
            className={
              i === 1
                ? "rounded-full bg-[#006F42] px-3 py-1 text-white"
                : "rounded-full bg-[#F1F3F4] px-3 py-1 text-[#374151]"
            }
          >
            {t}
          </button>
        ))}
      </div>
    ),
  },
};

export const WithDivider: Story = { args: { divider: true } };
