import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer } from "./PageContainer";
import { TopHeader } from "./TopHeader";
import { SubHeader } from "./SubHeader";
import { Button } from "../Button/button";

const meta = {
  title: "Layout/PageContainer",
  component: PageContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Top-level page surface — rounded border, white background, responsive gutters. Place `TopHeader`, `SubHeader`, and content inside. `paddingLeft` / `paddingRight` add *additional* responsive padding on top of the built-in content margin.",
      },
    },
  },
  argTypes: {
    paddingLeft: { control: "number" },
    paddingRight: { control: "number" },
    gap: { control: "text" },
  },
  args: {},
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  render: (args) => (
    <PageContainer {...args}>
      <div className="py-10 text-sm text-[#6B7280]">Empty page container.</div>
    </PageContainer>
  ),
};

export const WithHeaders: Story = {
  render: (args) => (
    <PageContainer {...args}>
      <TopHeader
        title="Orders"
        helper={
          <a className="text-[#006F42] underline" href="#">
            How it works?
          </a>
        }
        action={<Button size="sm">Quick actions</Button>}
      />
      <SubHeader
        title="Active"
        subtitle="128 orders in progress"
        right={
          <div className="flex gap-2">
            <Button size="xs" variant="secondary">
              Export
            </Button>
            <Button size="xs">New order</Button>
          </div>
        }
        divider
      />
      <div className="py-6 text-sm text-[#6B7280]">Page content here…</div>
    </PageContainer>
  ),
};

export const ExtraPadding: Story = {
  args: { paddingLeft: 40, paddingRight: 24 },
  render: (args) => (
    <PageContainer {...args}>
      <div className="py-10 text-sm text-[#6B7280]">
        Extra padding added on top of the default content margin.
      </div>
    </PageContainer>
  ),
};
