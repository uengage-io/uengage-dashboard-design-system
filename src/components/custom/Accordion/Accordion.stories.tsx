import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Info,
  Settings,
  Bell,
  CreditCard,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { Accordion } from "./Accordion";
import type { AccordionItem, CustomAccordionProps } from "./Accordion.types";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "uEngage-branded accordion built on Radix UI primitives. Feed it an `items` array of `{ value, title, content, disabled?, icon? }`. Supports `type=\"single\"` (one panel open at a time) and `type=\"multiple\"` (any number open). Three variants: `default` (divider-separated), `ghost` (borderless), `bordered` (card per item). Three sizes: `sm`, `md`, `lg`.",
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["default", "ghost", "bordered"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    type: { control: "radio", options: ["single", "multiple"] },
    className: { control: "text" },
  },
  args: { variant: "default", size: "md", type: "single" },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const BASE_ITEMS: AccordionItem[] = [
  {
    value: "what-is-uengage",
    title: "What is uEngage?",
    content:
      "uEngage is a full-stack customer engagement platform for brands — covering loyalty programs, push notifications, in-app messaging, and analytics, all in one dashboard.",
  },
  {
    value: "pricing",
    title: "How is pricing structured?",
    content:
      "Pricing is based on monthly active users and the modules you enable. You can start on the free tier and scale up as your user base grows.",
  },
  {
    value: "integrations",
    title: "What integrations are supported?",
    content:
      "We support integrations with Shopify, WooCommerce, Magento, custom REST APIs, and most popular CRMs. Webhooks are available for real-time event streaming.",
  },
  {
    value: "support",
    title: "How do I reach support?",
    content:
      "Our support team is available 24/7 via the in-app chat widget, email at support@uengage.in, or through your dedicated account manager if you're on an enterprise plan.",
  },
];

export const Default: Story = {
  args: { items: BASE_ITEMS, defaultValue: "what-is-uengage" },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

export const Multiple: Story = {
  args: {
    items: BASE_ITEMS,
    type: "multiple",
    defaultValue: ["what-is-uengage", "pricing"],
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

export const Ghost: Story = {
  args: {
    items: BASE_ITEMS,
    variant: "ghost",
    defaultValue: "what-is-uengage",
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

export const Bordered: Story = {
  args: {
    items: BASE_ITEMS,
    variant: "bordered",
    defaultValue: "what-is-uengage",
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

const ICON_ITEMS: AccordionItem[] = [
  {
    value: "account",
    title: "Account Settings",
    icon: <Settings />,
    content:
      "Manage your profile details, change your password, and configure two-factor authentication.",
  },
  {
    value: "notifications",
    title: "Notification Preferences",
    icon: <Bell />,
    content:
      "Choose which events trigger email, SMS, or push notifications and set quiet hours.",
  },
  {
    value: "billing",
    title: "Billing & Payments",
    icon: <CreditCard />,
    content:
      "View your current plan, update payment methods, and download past invoices.",
  },
  {
    value: "security",
    title: "Security",
    icon: <ShieldCheck />,
    content:
      "Review active sessions, revoke access tokens, and audit recent login activity.",
  },
];

export const WithIcons: Story = {
  args: {
    items: ICON_ITEMS,
    variant: "bordered",
    defaultValue: "account",
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

export const WithDisabledItem: Story = {
  args: {
    items: [
      ...BASE_ITEMS.slice(0, 2),
      { ...BASE_ITEMS[2], disabled: true },
      BASE_ITEMS[3],
    ],
    defaultValue: "what-is-uengage",
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

export const SmallSize: Story = {
  args: { items: BASE_ITEMS, size: "sm", defaultValue: "what-is-uengage" },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

export const LargeSize: Story = {
  args: { items: BASE_ITEMS, size: "lg", defaultValue: "what-is-uengage" },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  args: { items: BASE_ITEMS },
  render: function ControlledStory(args: CustomAccordionProps) {
    const [value, setValue] = React.useState<string>("what-is-uengage");
    return (
      <div className="flex w-[560px] flex-col gap-3">
        <Accordion {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">open: {`"${value}"`}</code>
      </div>
    );
  },
};

export const AllVariants: Story = {
  args: { items: BASE_ITEMS },
  parameters: { layout: "fullscreen" },
  render: function AllVariantsStory() {
    return (
      <div className="min-h-screen bg-[#F6F8FB] p-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-10 rounded-[24px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
              Accordion Showcase
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#111827]">
              All variants &amp; sizes
            </h1>
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">
              Default — divider-separated
            </h2>
            <Accordion items={BASE_ITEMS} variant="default" defaultValue="what-is-uengage" />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">
              Ghost — borderless
            </h2>
            <Accordion items={BASE_ITEMS} variant="ghost" defaultValue="pricing" />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">
              Bordered — card per item
            </h2>
            <Accordion items={ICON_ITEMS} variant="bordered" defaultValue="account" />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">
              Multiple open — sm size
            </h2>
            <Accordion
              items={BASE_ITEMS}
              type="multiple"
              size="sm"
              defaultValue={["what-is-uengage", "support"]}
            />
          </section>

          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Info className="size-4 text-[#006F42]" />
              <h2 className="text-sm font-semibold text-[#374151]">
                With icons — bordered lg size
              </h2>
            </div>
            <Accordion items={ICON_ITEMS} variant="bordered" size="lg" defaultValue="account" />
          </section>
        </div>
      </div>
    );
  },
};
