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
          "Inline contextual banner with a thick left accent border. Four built-in variants — `info` (blue), `success` (green), `error` (red), `warning` (amber) — plus full custom-color overrides via `backgroundColor`, `borderColor`, `iconColor`, and `textColor` props. Text is `font-medium` and aligned to the top of the icon.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["info", "success", "error", "warning"],
      description: "Visual style of the banner. Drives background, border, and icon color.",
    },
    message: {
      control: "text",
      description: "Text content rendered inside the banner. Alternatively pass `children`.",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to render the leading icon. Defaults to `true`.",
    },
    icon: {
      control: false,
      description: "Override the default variant icon with any React node. Pass `null` to hide without `showIcon={false}`.",
    },
    backgroundColor: {
      control: "color",
      description: "Custom background color (CSS value). Overrides the variant palette.",
    },
    borderColor: {
      control: "color",
      description: "Custom border color applied to all sides including the left accent. Overrides the variant palette.",
    },
    iconColor: {
      control: "color",
      description: "Custom icon color (CSS value). Overrides the variant palette.",
    },
    textColor: {
      control: "color",
      description: "Custom text color (CSS value). Overrides the variant palette.",
    },
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
  name: "Info",
  args: { variant: "info" },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const Success: Story = {
  name: "Success",
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
  name: "Error",
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

export const Warning: Story = {
  name: "Warning",
  args: {
    variant: "warning",
    message: "Your session will expire in 10 minutes. Save your work to avoid losing changes.",
  },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const NoIcon: Story = {
  name: "No icon",
  args: { variant: "info", showIcon: false },
  parameters: {
    docs: {
      description: { story: "Set `showIcon={false}` to remove the leading icon entirely." },
    },
  },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const CustomIcon: Story = {
  name: "Custom icon",
  args: {
    variant: "info",
    icon: <Megaphone />,
    message: "We're rolling out a new feature next week. Stay tuned!",
  },
  parameters: {
    docs: {
      description: { story: "Pass any React node via `icon` to replace the default variant icon." },
    },
  },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const CustomColors: Story = {
  name: "Custom colors",
  args: {
    message: "This banner uses fully custom brand colors — no preset variant needed.",
    backgroundColor: "#FFF7ED",
    borderColor: "#FB923C",
    iconColor: "#EA580C",
    textColor: "#9A3412",
  },
  parameters: {
    docs: {
      description: {
        story:
          "All four color props (`backgroundColor`, `borderColor`, `iconColor`, `textColor`) can be set independently. The thick left border color follows `borderColor`.",
      },
    },
  },
  render: (args: BannerProps) => (
    <div className="w-[600px]">
      <Banner {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  name: "All variants",
  args: {},
  parameters: {
    layout: "fullscreen",
    docs: {
      description: { story: "All four built-in variants plus the icon, no-icon, custom-icon, and custom-color options." },
    },
  },
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
            <h2 className="text-sm font-semibold text-[#374151]">Info</h2>
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
            <h2 className="text-sm font-semibold text-[#374151]">Warning</h2>
            <Banner
              variant="warning"
              message="Your session will expire in 10 minutes. Save your work to avoid losing changes."
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
