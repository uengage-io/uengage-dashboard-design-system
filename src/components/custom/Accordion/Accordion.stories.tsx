import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Info,
  Settings,
  Bell,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  Pencil,
  Trash2,
  Plus,
  ExternalLink,
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
          "uEngage-branded accordion built on Radix UI primitives. Feed it an `items` array of `{ value, title, content, disabled?, icon?, action? }`. Supports `type=\"single\"` (one panel open at a time) and `type=\"multiple\"` (any number open). Three variants: `default` (divider-separated), `ghost` (borderless), `bordered` (card per item). Three sizes: `sm`, `md`, `lg`. The optional `action` prop renders any node on the right side of the header without triggering the toggle.",
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

const ACTION_BUTTON_ITEMS: AccordionItem[] = [
  {
    value: "account",
    title: "Account Settings",
    icon: <Settings />,
    action: (
      <button
        className="rounded-md p-1 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
        onClick={() => alert("Edit account")}
        title="Edit"
      >
        <Pencil className="size-3.5" />
      </button>
    ),
    content:
      "Manage your profile details, change your password, and configure two-factor authentication.",
  },
  {
    value: "notifications",
    title: "Notification Preferences",
    icon: <Bell />,
    action: (
      <button
        className="rounded-md p-1 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
        onClick={() => alert("Edit notifications")}
        title="Edit"
      >
        <Pencil className="size-3.5" />
      </button>
    ),
    content:
      "Choose which events trigger email, SMS, or push notifications and set quiet hours.",
  },
  {
    value: "billing",
    title: "Billing & Payments",
    icon: <CreditCard />,
    action: (
      <a
        href="#"
        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-[#006F42] hover:bg-[#F0FDF4]"
        onClick={(e) => e.preventDefault()}
      >
        <ExternalLink className="size-3" />
        Manage
      </a>
    ),
    content:
      "View your current plan, update payment methods, and download past invoices.",
  },
  {
    value: "security",
    title: "Security",
    icon: <ShieldCheck />,
    action: (
      <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-xs font-medium text-[#166534]">
        Active
      </span>
    ),
    content:
      "Review active sessions, revoke access tokens, and audit recent login activity.",
  },
];

export const WithAction: Story = {
  args: {
    items: ACTION_BUTTON_ITEMS,
    variant: "bordered",
    defaultValue: "account",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass any node via `action` on an item to render it on the right side of the header. Clicks on the action do not toggle the accordion. Shown here: icon buttons, a link, and a status badge.",
      },
    },
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

const ACTION_BADGE_ITEMS: AccordionItem[] = [
  {
    value: "loyalty",
    title: "Loyalty Program",
    action: (
      <span className="rounded-full bg-[#DCFCE7] px-2 py-0.5 text-xs font-medium text-[#166534]">
        Active
      </span>
    ),
    content: "Configure points rules, tiers, and redemption thresholds for your loyalty program.",
  },
  {
    value: "push",
    title: "Push Notifications",
    action: (
      <span className="rounded-full bg-[#FEF9C3] px-2 py-0.5 text-xs font-medium text-[#854D0E]">
        Draft
      </span>
    ),
    content: "Set up automated push campaigns triggered by user actions or scheduled times.",
  },
  {
    value: "analytics",
    title: "Analytics",
    action: (
      <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-xs font-medium text-[#64748B]">
        Beta
      </span>
    ),
    content: "View real-time engagement metrics, funnel reports, and cohort analysis.",
  },
];

export const WithActionBadges: Story = {
  args: {
    items: ACTION_BADGE_ITEMS,
    variant: "default",
    defaultValue: "loyalty",
  },
  parameters: {
    docs: {
      description: {
        story: "Status badges passed as `action` give at-a-glance context without opening the panel.",
      },
    },
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
};

const ACTION_CRUD_ITEMS: AccordionItem[] = [
  {
    value: "segment-vip",
    title: "VIP Customers",
    action: (
      <div className="flex items-center gap-1">
        <button
          className="rounded-md p-1 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
          onClick={() => alert("Edit VIP segment")}
          title="Edit"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          className="rounded-md p-1 text-[#6B7280] hover:bg-[#FEF2F2] hover:text-[#DC2626]"
          onClick={() => alert("Delete VIP segment")}
          title="Delete"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    ),
    content: "Customers who have spent over ₹10,000 in the last 90 days.",
  },
  {
    value: "segment-churned",
    title: "Churned Users",
    action: (
      <div className="flex items-center gap-1">
        <button
          className="rounded-md p-1 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
          onClick={() => alert("Edit churned segment")}
          title="Edit"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          className="rounded-md p-1 text-[#6B7280] hover:bg-[#FEF2F2] hover:text-[#DC2626]"
          onClick={() => alert("Delete churned segment")}
          title="Delete"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    ),
    content: "Users with no activity in the last 60 days targeted for re-engagement campaigns.",
  },
  {
    value: "segment-new",
    title: "New Signups",
    action: (
      <div className="flex items-center gap-1">
        <button
          className="rounded-md p-1 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
          onClick={() => alert("Edit new signups segment")}
          title="Edit"
        >
          <Pencil className="size-3.5" />
        </button>
        <button
          className="rounded-md p-1 text-[#6B7280] hover:bg-[#FEF2F2] hover:text-[#DC2626]"
          onClick={() => alert("Delete new signups segment")}
          title="Delete"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>
    ),
    content: "Users who registered within the last 7 days and haven't completed onboarding.",
  },
];

export const WithActionCrudButtons: Story = {
  args: {
    items: ACTION_CRUD_ITEMS,
    variant: "bordered",
    defaultValue: "segment-vip",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Edit / Delete icon buttons as `action`. Clicks are isolated from the accordion toggle via `stopPropagation`.",
      },
    },
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[560px]">
      <Accordion {...args} />
    </div>
  ),
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

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">
              With action — icon buttons (bordered)
            </h2>
            <p className="text-xs text-[#6B7280]">
              The <code>action</code> prop renders any node on the right of the header without triggering the toggle.
            </p>
            <Accordion items={ACTION_BUTTON_ITEMS} variant="bordered" defaultValue="account" />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">
              With action — status badges (default)
            </h2>
            <Accordion items={ACTION_BADGE_ITEMS} variant="default" defaultValue="loyalty" />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">
              With action — CRUD buttons (bordered)
            </h2>
            <Accordion items={ACTION_CRUD_ITEMS} variant="bordered" defaultValue="segment-vip" />
          </section>
        </div>
      </div>
    );
  },
};
