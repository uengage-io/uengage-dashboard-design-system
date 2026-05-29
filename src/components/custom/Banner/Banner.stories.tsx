import type { Meta, StoryObj } from "@storybook/react";
import { Megaphone } from "lucide-react";
import { Banner } from "./Banner";
import type { BannerProps } from "./Banner.types";

const meta = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Inline status banner for surfacing contextual messages. Three built-in variants — `info` (blue), `success` (green), `error` (red) — plus full custom-color overrides via `backgroundColor`, `borderColor`, `iconColor`, and `textColor` props.",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["info", "success", "error"] },
    showIcon: { control: "boolean" },
    message: { control: "text" },
    backgroundColor: { control: "color" },
    borderColor: { control: "color" },
    iconColor: { control: "color" },
    textColor: { control: "color" },
  },
  args: {
    variant: "info",
    showIcon: true,
    message: "The requested file will be available for download within 5–10 minutes from the requested time.",
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { variant: "info" },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const Success: Story = {
  args: {
    variant: "success",
    message: "Your changes have been saved successfully.",
  },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    variant: "error",
    message: "Something went wrong. Please try again or contact support.",
  },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const NoIcon: Story = {
  args: { variant: "info", showIcon: false },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const CustomIcon: Story = {
  args: {
    variant: "info",
    icon: <Megaphone />,
    message: "We're rolling out a new feature next week. Stay tuned!",
  },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const CustomColors: Story = {
  args: {
    message: "This banner uses fully custom brand colors.",
    backgroundColor: "#FFF7ED",
    borderColor: "#FB923C",
    iconColor: "#EA580C",
    textColor: "#9A3412",
  },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  args: {},
  parameters: { layout: "fullscreen" },
  render: function AllVariantsStory() {
    return (
      <div className="min-h-screen bg-[#F6F8FB] p-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-10 rounded-[24px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
              Banner Showcase
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#111827]">
              All variants &amp; options
            </h1>
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Info (default)</h2>
            <Banner
              variant="info"
              message="The requested file will be available for download within 5–10 minutes from the requested time."
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Success</h2>
            <Banner
              variant="success"
              message="Your changes have been saved successfully."
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Error</h2>
            <Banner
              variant="error"
              message="Something went wrong. Please try again or contact support."
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">No icon</h2>
            <Banner
              variant="info"
              showIcon={false}
              message="Icons can be hidden when they add no extra context."
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Custom icon</h2>
            <Banner
              variant="success"
              icon={<Megaphone />}
              message="We're rolling out a new feature next week. Stay tuned!"
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Custom colors</h2>
            <Banner
              backgroundColor="#FFF7ED"
              borderColor="#FB923C"
              iconColor="#EA580C"
              textColor="#9A3412"
              message="This banner uses fully custom brand colors — no preset variant needed."
            />
          </section>
        </div>
      </div>
    );
  },
};
