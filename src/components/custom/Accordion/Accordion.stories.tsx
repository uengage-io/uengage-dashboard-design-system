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
  Building2,
  Clock,
  LayoutGrid,
} from "lucide-react";
import { Accordion } from "./Accordion";
import { ACCORDION_SIZES } from "./accordionTokens";
import type {
  AccordionItem,
  AccordionSize,
  CustomAccordionProps,
} from "./Accordion.types";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "uEngage-branded accordion built on Radix UI primitives. Feed it an `items` array of",
          "`{ value, title, content, subtitle?, summary?, icon?, action?, state?, disabled? }`.",
          "Supports `type=\"single\"` (one panel open at a time) and `type=\"multiple\"` (any number open).",
          "",
          "**The header is the whole row**, not just the label — full width, keyboard focusable, with the",
          "chevron leading, where the eye already is when scanning a stack. A **summary on the right** lets an",
          "operator read the answer without opening anything, which is the point of collapsing in the first place.",
          "",
          "**Variants** — `bordered` (one shell, hairline dividers), `separated` (each row its own box),",
          "`flush` (no outer border), `card` (separated plus elevation). `default` and `ghost` are the",
          "pre-design-system names and still render: `default` as flush, `ghost` as flush without dividers.",
          "The old `bordered` look — boxes with elevation — is now `card`.",
          "",
          "**Sizes** — `sm` (compact: drops the icon tile and subtitle), `md`, `lg`.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["bordered", "separated", "flush", "card", "default", "ghost"],
      description:
        "`bordered` is the design default. `default`/`ghost` are the legacy names, kept working.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "`sm` (compact) drops the icon tile and the subtitle.",
    },
    type: { control: "radio", options: ["single", "multiple"] },
    appearance: {
      control: "radio",
      options: ["light", "dark"],
      description: "On dark surfaces the open row fills #1B3423 and the chevron goes lime.",
    },
    chevronPosition: {
      control: "radio",
      options: ["start", "end"],
      description: "Leading by default — the design forbids a right-side chevron.",
    },
    showChevron: { control: "boolean" },
    showIconTile: { control: "boolean", description: "Force the mint icon tile on or off." },
    expandAll: { control: "boolean", description: "Renders the Expand all / Collapse all control." },
    nested: { control: "boolean", description: "Indents one level and drops the shell." },
    collapsible: { control: "boolean", description: "Single mode: allow zero rows open." },
    onBeforeToggle: { control: false, description: "Return false to block an open or close." },
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
    items: BASE_ITEMS.map((item, i) =>
      i === 2
        ? { ...item, disabled: true, disabledReason: "Available on the Growth plan" }
        : item,
    ),
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
  render: function ControlledStory() {
    const [value, setValue] = React.useState<string>("what-is-uengage");
    return (
      <div className="flex w-[560px] flex-col gap-3">
        <Accordion
          type="single"
          items={BASE_ITEMS}
          value={value}
          onChange={setValue}
        />
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

/* -------------------------------------------------------------------------- */
/*  Design-system stories                                                      */
/* -------------------------------------------------------------------------- */

type Field = { label: string; value: string };

function FieldGrid({ fields }: { fields: Field[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-x-[22px] gap-y-3.5">
      {fields.map((f) => (
        <span key={f.label} className="flex flex-col gap-[3px]">
          <span className="text-[11px] font-medium leading-tight text-[#787878]">{f.label}</span>
          <span className="ue-tabular text-[13px] font-semibold leading-snug text-[#202020]">
            {f.value}
          </span>
        </span>
      ))}
    </div>
  );
}

const SETTINGS_ITEMS: AccordionItem[] = [
  {
    value: "business",
    title: "Business Details",
    subtitle: "Legal entity and registration",
    summary: "Verified",
    summaryTone: "success",
    icon: <Building2 strokeWidth={2} />,
    content: (
      <FieldGrid
        fields={[
          { label: "Legal name", value: "Chai Point Hospitality Pvt Ltd" },
          { label: "Business ID", value: "UE-4471-DEL" },
          { label: "GSTIN", value: "22AAAAA0000A1Z5" },
          { label: "Onboarded", value: "14 Aug, 2023" },
        ]}
      />
    ),
  },
  {
    value: "payout",
    title: "Payout Settings",
    subtitle: "Commission and settlement account",
    summary: "Weekly",
    summaryTone: "brand",
    icon: <CreditCard strokeWidth={2} />,
    content: (
      <FieldGrid
        fields={[
          { label: "Settlement cycle", value: "Weekly — Tuesday" },
          { label: "Commission override", value: "18.5%" },
          { label: "Settlement account", value: "HDFC ••••4471" },
          { label: "Last payout", value: "₹1,84,200" },
        ]}
      />
    ),
  },
  {
    value: "channels",
    title: "Channel Settings",
    subtitle: "Aggregators and direct ordering",
    summary: "4 live",
    summaryTone: "brand",
    icon: <LayoutGrid strokeWidth={2} />,
    content: (
      <FieldGrid
        fields={[
          { label: "Zomato", value: "412 items" },
          { label: "Swiggy", value: "388 items" },
          { label: "Website", value: "412 items" },
          { label: "ONDC", value: "412 items" },
        ]}
      />
    ),
  },
  {
    value: "timings",
    title: "Outlet Timings",
    subtitle: "Store hours and break windows",
    summary: "Mon–Sat",
    summaryTone: "neutral",
    icon: <Clock strokeWidth={2} />,
    content: (
      <FieldGrid
        fields={[
          { label: "Weekday hours", value: "9:00am – 11:00pm" },
          { label: "Weekend hours", value: "9:00am – 12:00am" },
          { label: "Break window", value: "3:30pm – 4:00pm" },
          { label: "Timezone", value: "IST (UTC+5:30)" },
        ]}
      />
    ),
  },
];

export const BorderedVariant: Story = {
  name: "Bordered — the default",
  args: {
    items: SETTINGS_ITEMS,
    variant: "bordered",
    defaultValue: "payout",
  },
  parameters: {
    docs: {
      description: {
        story: "One shell, hairline dividers. Reads as a single settings surface.",
      },
    },
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[620px]">
      <Accordion {...args} />
    </div>
  ),
};

export const SeparatedVariant: Story = {
  name: "Separated",
  args: { items: SETTINGS_ITEMS, variant: "separated", defaultValue: "payout" },
  parameters: {
    docs: {
      description: { story: "Each row its own box. For sections that are genuinely unrelated." },
    },
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[620px]">
      <Accordion {...args} />
    </div>
  ),
};

export const FlushVariant: Story = {
  name: "Flush",
  args: { items: SETTINGS_ITEMS, variant: "flush", defaultValue: "payout" },
  parameters: {
    docs: {
      description: { story: "No outer border. For accordions already inside a card or drawer." },
    },
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[620px]">
      <Accordion {...args} />
    </div>
  ),
};

export const CardVariant: Story = {
  name: "Card",
  args: { items: SETTINGS_ITEMS, variant: "card", defaultValue: "payout" },
  parameters: {
    docs: {
      description: { story: "Separated plus elevation. Onboarding steps and checklists." },
    },
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[620px]">
      <Accordion {...args} />
    </div>
  ),
};

export const SizeScale: Story = {
  name: "Size scale",
  args: { items: SETTINGS_ITEMS },
  parameters: {
    docs: {
      description: {
        story: "Compact drops the icon tile and the subtitle — a title and a summary, nothing else.",
      },
    },
  },
  render: function SizeScaleStory() {
    return (
      <div className="flex w-[620px] flex-col gap-6">
        {(["sm", "md", "lg"] as AccordionSize[]).map((s) => (
          <div key={s} className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#787878]">
              {ACCORDION_SIZES[s].name} — {ACCORDION_SIZES[s].spec} · {ACCORDION_SIZES[s].use}
            </span>
            <Accordion
              variant="bordered"
              size={s}
              items={SETTINGS_ITEMS.slice(0, 2)}
              defaultValue="payout"
            />
          </div>
        ))}
      </div>
    );
  },
};

export const RowStates: Story = {
  name: "Row states",
  args: { items: SETTINGS_ITEMS },
  parameters: {
    docs: {
      description: {
        story:
          "A disabled row keeps its title and gains a reason — hiding it makes operators think a section disappeared.",
      },
    },
  },
  render: () => (
    <div className="grid w-[760px] grid-cols-[repeat(auto-fit,minmax(272px,1fr))] gap-4">
      {(
        [
          ["Collapsed / hover / focus", { state: "default" as const }],
          ["Loading panel", { state: "loading" as const }],
          ["Has an error", { state: "error" as const }],
          ["Unsaved changes", { state: "dirty" as const }],
          ["Disabled", { disabled: true, disabledReason: "Available on the Growth plan" }],
        ] as const
      ).map(([label, extra]) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="flex items-center gap-[7px]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#787878]">
              {label}
            </span>
            <span className="h-px flex-1 bg-[#EEEEEE]" />
          </span>
          <Accordion
            variant="separated"
            items={[
              {
                value: "row",
                title: "Payout Settings",
                subtitle: "Commission and settlement",
                summary: "Weekly",
                summaryTone: "brand",
                content: <span>Settlement cycle, commission override and account.</span>,
                ...extra,
              },
            ]}
          />
        </div>
      ))}
    </div>
  ),
};

export const ExpandAllControl: Story = {
  name: "Expand all",
  args: {
    items: SETTINGS_ITEMS,
    type: "multiple",
    variant: "bordered",
    expandAll: true,
    defaultValue: ["payout"],
  },
  parameters: {
    docs: {
      description: {
        story: "`expandAll` renders the Expand all / Collapse all control above the stack.",
      },
    },
  },
  render: (args: CustomAccordionProps) => (
    <div className="w-[620px]">
      <Accordion {...args} />
    </div>
  ),
};

export const HeaderActions: Story = {
  name: "Header with its own actions",
  args: { items: SETTINGS_ITEMS },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive controls sit outside the toggle's hit area, divided by a hairline, so flipping a switch never expands the row.",
      },
    },
  },
  render: function HeaderActionsStory() {
    const [on, setOn] = React.useState(true);
    return (
      <div className="w-[560px]">
        <Accordion
          variant="separated"
          items={[
            {
              value: "timings",
              title: "Outlet Timings",
              subtitle: "Store hours and break windows",
              icon: <Clock strokeWidth={2} />,
              headerActions: (
                <button
                  type="button"
                  onClick={() => setOn((v) => !v)}
                  aria-pressed={on}
                  className="flex h-[19px] w-8 cursor-pointer items-center rounded-full p-0.5 transition-colors"
                  style={{ background: on ? "#003C1B" : "#C6C6C6", justifyContent: on ? "flex-end" : "flex-start" }}
                >
                  <span className="block h-[15px] w-[15px] rounded-full bg-white" />
                </button>
              ),
              content: <span>Weekday 9:00am – 11:00pm · Break 3:30pm – 4:00pm</span>,
            },
          ]}
        />
      </div>
    );
  },
};

export const Nested: Story = {
  name: "Nested — one level only",
  args: { items: SETTINGS_ITEMS },
  parameters: {
    docs: {
      description: {
        story:
          "Children indent 18px and lose their border. Two levels is the hard cap — three means the page needs tabs.",
      },
    },
  },
  render: () => (
    <div className="w-[560px]">
      <Accordion
        variant="bordered"
        defaultValue="channels"
        items={[
          {
            value: "channels",
            title: "Channel Settings",
            subtitle: "Aggregators and direct ordering",
            summary: "4 channels",
            icon: <LayoutGrid strokeWidth={2} />,
            content: (
              <Accordion
                nested
                size="sm"
                defaultValue="zomato"
                items={[
                  {
                    value: "zomato",
                    title: "Zomato",
                    summary: "412 items",
                    summaryTone: "brand",
                    content: <span>Menu synced 3:02am · commission 18.5%</span>,
                  },
                  {
                    value: "swiggy",
                    title: "Swiggy",
                    summary: "388 items",
                    content: <span>Menu synced 3:04am · commission 19.0%</span>,
                  },
                ]}
              />
            ),
          },
          {
            value: "timings",
            title: "Outlet Timings",
            subtitle: "Store hours and break windows",
            summary: "Mon–Sat",
            icon: <Clock strokeWidth={2} />,
            content: <span>Weekday 9:00am – 11:00pm</span>,
          },
        ]}
      />
    </div>
  ),
};

export const LazyAndKeepMounted: Story = {
  name: "Lazy panel & keepMounted",
  args: { items: SETTINGS_ITEMS },
  parameters: {
    docs: {
      description: {
        story:
          "`lazy` mounts the panel on first open — the row opens immediately with a skeleton rather than waiting on a fetch. `keepMounted` holds the panel in the tree afterwards, so collapsing preserves unsaved work instead of discarding it.",
      },
    },
  },
  render: function LazyStory() {
    return (
      <div className="w-[560px]">
        <Accordion
          type="multiple"
          variant="bordered"
          items={[
            {
              value: "history",
              title: "Settlement History",
              subtitle: "Last 12 cycles",
              lazy: true,
              content: (
                <div className="flex flex-col gap-2">
                  {["62%", "88%", "44%"].map((w) => (
                    <span
                      key={w}
                      className="block h-2.5 animate-pulse rounded-md bg-[#F3F5F9]"
                      style={{ width: w }}
                    />
                  ))}
                </div>
              ),
            },
            {
              value: "details",
              title: "Business Details",
              subtitle: "3 unsaved edits",
              state: "dirty",
              summary: "Unsaved",
              summaryTone: "warning",
              keepMounted: true,
              content: (
                <label className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-medium text-[#787878]">Legal name</span>
                  <input
                    defaultValue="Chai Point Hospitality Pvt Ltd"
                    className="rounded-md border border-[#E2E2E2] px-2.5 py-1.5 text-[13px] outline-none focus:border-[#1F5E2C]"
                  />
                  <span className="text-[11px] text-[#787878]">
                    Type here, collapse the row and open it again — the edit survives.
                  </span>
                </label>
              ),
            },
          ]}
        />
      </div>
    );
  },
};

export const BlockCollapse: Story = {
  name: "Cannot collapse with unsaved work",
  args: { items: SETTINGS_ITEMS },
  parameters: {
    docs: {
      description: {
        story: "`onBeforeToggle` returns false to keep a dirty row open until it is saved.",
      },
    },
  },
  render: function BlockCollapseStory() {
    const [dirty, setDirty] = React.useState(true);
    const [blocked, setBlocked] = React.useState(0);
    return (
      <div className="flex w-[560px] flex-col gap-3">
        <Accordion
          variant="separated"
          defaultValue="business"
          onBeforeToggle={(value, opening) => {
            if (!opening && value === "business" && dirty) {
              setBlocked((b) => b + 1);
              return false;
            }
            return true;
          }}
          items={[
            {
              value: "business",
              title: "Business Details",
              subtitle: "3 unsaved edits",
              state: "dirty",
              content: (
                <div className="flex items-center gap-2.5">
                  <span className="flex-1 text-[11px] font-medium text-[#6A5300]">
                    3 unsaved edits — collapsing keeps them.
                  </span>
                  <button
                    type="button"
                    onClick={() => setDirty(false)}
                    className="h-[26px] cursor-pointer rounded-[7px] bg-[#003C1B] px-2.5 text-[10px] font-semibold text-white"
                  >
                    Save
                  </button>
                </div>
              ),
            },
            {
              value: "timings",
              title: "Outlet Timings",
              subtitle: "Store hours",
              content: <span>Weekday 9:00am – 11:00pm</span>,
            },
          ]}
        />
        <code className="text-[11px] text-[#787878]">
          dirty: {String(dirty)} · blocked collapses: {blocked}
        </code>
      </div>
    );
  },
};

export const OnDarkSurface: Story = {
  name: "On a dark surface",
  args: { items: SETTINGS_ITEMS },
  parameters: {
    docs: {
      description: { story: "The open row fills #1B3423; the chevron and summary chip go lime." },
    },
  },
  render: () => (
    <div className="w-[560px] rounded-xl bg-[#0C1712] p-3.5">
      <Accordion
        appearance="dark"
        variant="flush"
        size="sm"
        defaultValue="payout"
        items={[
          {
            value: "payout",
            title: "Payout Settings",
            summary: "Weekly",
            summaryTone: "brand",
            content: <span>Weekly — Tuesday · HDFC ••••4471</span>,
          },
          {
            value: "tax",
            title: "Tax & Compliance",
            summary: "GST verified",
            content: <span>GSTIN 22AAAAA0000A1Z5</span>,
          },
        ]}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Full design preview                                                        */
/* -------------------------------------------------------------------------- */

const VARIANT_GUIDE: {
  name: string;
  variant: "bordered" | "separated" | "flush" | "card";
  note: string;
}[] = [
  {
    name: "Bordered",
    variant: "bordered",
    note: "One shell, hairline dividers. The default — reads as a single settings surface.",
  },
  {
    name: "Separated",
    variant: "separated",
    note: "Each row its own box. For sections that are genuinely unrelated.",
  },
  {
    name: "Flush",
    variant: "flush",
    note: "No outer border. For accordions already inside a card or drawer.",
  },
  {
    name: "Card",
    variant: "card",
    note: "Separated plus elevation. Onboarding steps and checklists.",
  },
];

const GUIDE_ITEMS: AccordionItem[] = [
  {
    value: "business",
    title: "Business Details",
    summary: "Verified",
    summaryTone: "success",
    content: <span>Legal entity and registration.</span>,
  },
  {
    value: "payout",
    title: "Payout Settings",
    summary: "Weekly",
    summaryTone: "brand",
    content: <span>Commission and settlement account.</span>,
  },
  {
    value: "timings",
    title: "Outlet Timings",
    summary: "Mon–Sat",
    content: <span>Store hours and break windows.</span>,
  },
];

const ACCORDION_KEYS = [
  { key: "↵ / Space", does: "Toggles the focused row" },
  { key: "↑ ↓", does: "Moves between headers, skipping panel content" },
  { key: "Home / End", does: "Jumps to the first or last header" },
  { key: "Tab", does: "Enters the open panel from its header" },
  { key: "Expand all", does: "Opens every row at once in multi mode" },
  { key: "Esc", does: "Returns focus from the panel to its header" },
];

const ACCORDION_API = `<Accordion  variant="bordered | separated | flush | card"
            size="sm | md | lg"              // compact | default | large
            type="single | multiple"         // single closes the previous row
            value={openIds}   onChange={setOpenIds}   defaultValue={["payout"]}
            collapsible                      // single mode: allow zero open
            expandAll                        // renders the Expand all control
            appearance="light | dark"
            onBeforeToggle={confirmUnsaved}
            items={[{
              value, title, subtitle, content,
              summary, summaryTone,           // the collapsed answer
              icon,                           // fills the mint tile
              state: "default | loading | error | dirty",
              disabled, disabledReason,
              headerActions,                  // outside the toggle hit area
              lazy, keepMounted,              // keepMounted preserves form state
            }]}
/>`;

function DocPanel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-[#E2E2E2] bg-white p-[22px] shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
      <div>
        <h2 className="m-0 text-[16px] font-bold leading-tight text-[#202020]">{title}</h2>
        {hint && (
          <p className="m-0 mt-1 max-w-[66ch] text-[13px] leading-normal text-[#595959]">{hint}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#787878]">
      {children}
    </span>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] leading-normal text-[#787878]">{children}</span>;
}

export const DesignPreview: Story = {
  name: "Design preview — Accordion",
  args: { items: SETTINGS_ITEMS },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "The full uEngage Accordion sheet rebuilt with the component — four variants, three sizes, every row state and edge case.",
      },
    },
  },
  render: function AccordionDesignPreview() {
    const [variant, setVariant] = React.useState<
      "bordered" | "separated" | "flush" | "card"
    >("bordered");
    const [size, setSize] = React.useState<AccordionSize>("md");
    const [multi, setMulti] = React.useState(false);
    const [open, setOpen] = React.useState<string[]>(["payout"]);

    const note = multi
      ? `Multi mode — rows open independently. ${open.length} of ${SETTINGS_ITEMS.length} open.`
      : `Single mode — opening a row closes the previous one. ${open.length} of ${SETTINGS_ITEMS.length} open.`;

    return (
      <div className="min-h-screen bg-[#FAFFF7] px-10 pb-16 pt-9 text-[#202020]">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-[26px]">
          <header className="flex flex-wrap items-end gap-[18px] border-b border-[#E2E2E2] pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] bg-[#DCF3CE] text-[15px] font-extrabold text-[#003C1B]">
                uE
              </span>
              <div>
                <h1 className="m-0 text-[26px] font-extrabold leading-none">Accordion</h1>
                <p className="m-0 mt-1 text-[13px] leading-normal text-[#595959]">
                  Four variants · three sizes · eight row states, single and multi expand
                </p>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              <span className="rounded-full bg-[#DCF3CE] px-[11px] py-[7px] text-[11px] font-semibold leading-none text-[#003C1B]">
                4 variants
              </span>
              <span className="rounded-full bg-[#F3F5F9] px-[11px] py-[7px] text-[11px] font-semibold leading-none text-[#595959]">
                8 states
              </span>
            </div>
          </header>

          <DocPanel
            title="Anatomy"
            hint="The header is the whole row, not just the label — 100% width, keyboard focusable, chevron on the left where the eye already is when scanning a stack. A summary on the right lets an operator read the answer without opening anything, which is the point of collapsing in the first place."
          >
            <div className="flex flex-wrap items-start gap-8 px-1 pb-2 pt-1.5">
              <div className="w-[360px]">
                <Accordion
                  variant="bordered"
                  defaultValue="payout"
                  items={[SETTINGS_ITEMS[1] as AccordionItem]}
                />
              </div>
              <div className="flex max-w-[380px] flex-col gap-2 text-[12px] font-medium leading-normal text-[#595959]">
                <span>
                  <b>Chevron</b> — leading, 15px, rotates 0° → 90° in 160ms
                </span>
                <span>
                  <b>Icon tile</b> — optional 28px, mint fill. Drop it in dense stacks
                </span>
                <span>
                  <b>Title</b> — 13px/600 Figtree, one line, truncates before the summary
                </span>
                <span>
                  <b>Subtitle</b> — optional, 11px, stays visible when collapsed
                </span>
                <span>
                  <b>Summary</b> — right-aligned chip or value; the collapsed answer
                </span>
                <span>
                  <b>Open header</b> — <code className="font-mono text-[11px]">#FAFFF7</code> wash,
                  so the open row is obvious at a glance
                </span>
                <span>
                  <b>Divider</b> — <code className="font-mono text-[11px]">#F3F5F9</code> between
                  header and panel, never a heavier rule
                </span>
                <span>
                  <b>Never</b> — a ✕/+ toggle, a right-side chevron, or a header that only reacts on
                  the label
                </span>
              </div>
            </div>
          </DocPanel>

          <DocPanel
            title="Live accordion"
            hint="Switch variant, size and expand mode. Tab through the headers to see the focus ring."
          >
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-0.5 rounded-lg bg-[#F3F5F9] p-[3px]">
                {VARIANT_GUIDE.map((v) => (
                  <button
                    key={v.variant}
                    type="button"
                    onClick={() => setVariant(v.variant)}
                    className="cursor-pointer rounded-md border-0 px-[11px] py-1.5 text-[11px] font-semibold leading-none transition-all duration-120"
                    style={{
                      background: variant === v.variant ? "#FFFFFF" : "transparent",
                      color: variant === v.variant ? "#003C1B" : "#595959",
                      boxShadow: variant === v.variant ? "2px 2px 4px rgba(0,0,0,.06)" : "none",
                    }}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-0.5 rounded-lg bg-[#F3F5F9] p-[3px]">
                {(["sm", "md", "lg"] as AccordionSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className="cursor-pointer rounded-md border-0 px-[11px] py-1.5 text-[11px] font-semibold leading-none transition-all duration-120"
                    style={{
                      background: size === s ? "#FFFFFF" : "transparent",
                      color: size === s ? "#003C1B" : "#595959",
                      boxShadow: size === s ? "2px 2px 4px rgba(0,0,0,.06)" : "none",
                    }}
                  >
                    {ACCORDION_SIZES[s].name}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setMulti((m) => !m);
                  setOpen((o) => o.slice(0, 1));
                }}
                className="h-[30px] cursor-pointer rounded-lg border border-[#E2E2E2] bg-white px-3 text-[11px] font-semibold leading-none text-[#595959]"
              >
                {multi ? "Multi expand" : "Single expand"}
              </button>
            </div>

            <div className="min-h-[230px]">
              {multi ? (
                <Accordion
                  type="multiple"
                  variant={variant}
                  size={size}
                  items={SETTINGS_ITEMS}
                  value={open}
                  onChange={setOpen}
                  expandAll
                />
              ) : (
                <Accordion
                  type="single"
                  variant={variant}
                  size={size}
                  items={SETTINGS_ITEMS}
                  value={open[0] ?? ""}
                  onChange={(v) => setOpen(v ? [v] : [])}
                />
              )}
            </div>
            <span className="ue-tabular text-[11px] font-medium leading-snug text-[#787878]">
              {note}
            </span>
          </DocPanel>

          <DocPanel
            title="Size scale"
            hint="Compact drops the icon tile and the subtitle — a title and a summary, nothing else."
          >
            <div className="flex flex-col">
              <div className="grid grid-cols-[104px_1fr_196px] items-center gap-4 pb-[9px]">
                {["Size", "Header", "Spec & use"].map((h) => (
                  <Caption key={h}>{h}</Caption>
                ))}
              </div>
              {(["sm", "md", "lg"] as AccordionSize[]).map((s) => (
                <div
                  key={s}
                  className="grid grid-cols-[104px_1fr_196px] items-center gap-4 border-t border-[#EEEEEE] py-3"
                >
                  <span className="text-[12px] font-semibold text-[#202020]">
                    {ACCORDION_SIZES[s].name}
                  </span>
                  <Accordion
                    variant="separated"
                    size={s}
                    items={[SETTINGS_ITEMS[1] as AccordionItem]}
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="ue-tabular text-[11px] font-medium leading-snug text-[#595959]">
                      {ACCORDION_SIZES[s].spec}
                    </span>
                    <span className="text-[10px] leading-snug text-[#787878]">
                      {ACCORDION_SIZES[s].use}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </DocPanel>

          <DocPanel title="Variants" hint="Four, chosen by how the rows relate to each other.">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(248px,1fr))] items-start gap-[18px]">
              {VARIANT_GUIDE.map((g) => (
                <div key={g.variant} className="flex flex-col gap-[9px]">
                  <Caption>{g.name}</Caption>
                  <Accordion
                    variant={g.variant}
                    size="sm"
                    items={GUIDE_ITEMS}
                    defaultValue="payout"
                  />
                  <Note>{g.note}</Note>
                </div>
              ))}
            </div>
          </DocPanel>

          <DocPanel
            title="Row states"
            hint="A disabled row keeps its title and gains a reason — hiding it makes operators think a section disappeared."
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(272px,1fr))] gap-4">
              {(
                [
                  ["Collapsed", {}],
                  ["Expanded", { open: true }],
                  ["Loading panel", { state: "loading" as const }],
                  ["Has an error", { state: "error" as const, summary: "Fix", summaryTone: "danger" as const }],
                  ["Unsaved changes", { state: "dirty" as const, summary: "Unsaved", summaryTone: "warning" as const }],
                  ["Disabled", { disabled: true, disabledReason: "Available on the Growth plan" }],
                ] as const
              ).map(([label, extra]) => {
                const { open: isOpen, ...itemExtra } = extra as {
                  open?: boolean;
                } & Partial<AccordionItem>;
                return (
                  <div key={label} className="flex flex-col gap-2">
                    <span className="flex items-center gap-[7px]">
                      <Caption>{label}</Caption>
                      <span className="h-px flex-1 bg-[#EEEEEE]" />
                    </span>
                    <Accordion
                      variant="separated"
                      defaultValue={isOpen ? "row" : undefined}
                      items={[
                        {
                          value: "row",
                          title: "Payout Settings",
                          subtitle: "Commission and settlement",
                          summary: "Weekly",
                          summaryTone: "brand",
                          content: <span>Weekly — Tuesday · HDFC ••••4471</span>,
                          ...itemExtra,
                        },
                      ]}
                    />
                  </div>
                );
              })}
            </div>
          </DocPanel>

          <DocPanel
            title="Edge cases"
            hint="Nesting, lazy panels, unsaved work and the places accordions get misused."
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(268px,1fr))] items-start gap-[18px]">
              <div className="flex flex-col gap-2">
                <Caption>Nested — one level only</Caption>
                <Accordion
                  variant="bordered"
                  size="sm"
                  defaultValue="channels"
                  items={[
                    {
                      value: "channels",
                      title: "Channel Settings",
                      summary: "4 channels",
                      content: (
                        <Accordion
                          nested
                          size="sm"
                          defaultValue="zomato"
                          items={[
                            {
                              value: "zomato",
                              title: "Zomato",
                              summary: "412 items",
                              summaryTone: "brand",
                              content: <span>Menu synced 3:02am</span>,
                            },
                            {
                              value: "swiggy",
                              title: "Swiggy",
                              summary: "388 items",
                              content: <span>Menu synced 3:04am</span>,
                            },
                          ]}
                        />
                      ),
                    },
                  ]}
                />
                <Note>
                  Children indent 18px and lose their border. Two levels is the hard cap — three
                  means the page needs tabs.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Lazy panel loading</Caption>
                <Accordion
                  variant="bordered"
                  size="sm"
                  defaultValue="history"
                  items={[
                    {
                      value: "history",
                      title: "Settlement History",
                      lazy: true,
                      content: (
                        <div className="flex flex-col gap-2">
                          {["62%", "88%", "44%"].map((w) => (
                            <span
                              key={w}
                              className="block h-2.5 animate-pulse rounded-md bg-[#F3F5F9]"
                              style={{ width: w }}
                            />
                          ))}
                        </div>
                      ),
                    },
                  ]}
                />
                <Note>
                  The panel opens immediately with a skeleton — never delay the animation waiting on
                  a fetch.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Unsaved changes — keeps its edits</Caption>
                <Accordion
                  variant="separated"
                  size="sm"
                  defaultValue="business"
                  items={[
                    {
                      value: "business",
                      title: "Business Details",
                      state: "dirty",
                      keepMounted: true,
                      content: (
                        <div className="flex items-center gap-2.5">
                          <span className="flex-1 text-[10px] font-medium leading-snug text-[#6A5300]">
                            3 unsaved edits — collapsing keeps them.
                          </span>
                          <span className="flex h-[26px] flex-none items-center rounded-[7px] bg-[#003C1B] px-2.5 text-[10px] font-semibold text-white">
                            Save
                          </span>
                        </div>
                      ),
                    },
                  ]}
                />
                <Note>
                  A dot marks unsaved work. Collapsing preserves it — the panel stays mounted, never
                  discards.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Long title truncates, summary survives</Caption>
                <div className="w-full max-w-[262px]">
                  <Accordion
                    variant="separated"
                    size="sm"
                    items={[
                      {
                        value: "override",
                        title: "Advanced Commission Override Settings",
                        summary: "18.5%",
                        summaryTone: "brand",
                        content: <span>Per-channel override rules.</span>,
                      },
                    ]}
                  />
                </div>
                <Note>
                  The summary is the collapsed answer, so it never truncates — the title gives up its
                  width first.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Header with its own actions</Caption>
                <Accordion
                  variant="separated"
                  size="sm"
                  items={[
                    {
                      value: "timings",
                      title: "Outlet Timings",
                      headerActions: (
                        <span className="flex h-[19px] w-8 items-center justify-end rounded-full bg-[#003C1B] p-0.5">
                          <span className="block h-[15px] w-[15px] rounded-full bg-white" />
                        </span>
                      ),
                      content: <span>Weekday 9:00am – 11:00pm</span>,
                    },
                  ]}
                />
                <Note>
                  Interactive controls sit outside the toggle&apos;s hit area, divided by a hairline
                  so a toggle-flip never expands the row.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>On a dark surface</Caption>
                <div className="rounded-xl bg-[#0C1712] p-3.5">
                  <Accordion
                    appearance="dark"
                    variant="flush"
                    size="sm"
                    defaultValue="payout"
                    items={[
                      {
                        value: "payout",
                        title: "Payout Settings",
                        summary: "Weekly",
                        summaryTone: "brand",
                        content: <span>Weekly — Tuesday · HDFC ••••4471</span>,
                      },
                      {
                        value: "tax",
                        title: "Tax & Compliance",
                        content: <span>GSTIN verified</span>,
                      },
                    ]}
                  />
                </div>
                <Note>The open row fills #1B3423; the chevron and summary chip go lime.</Note>
              </div>
            </div>
          </DocPanel>

          <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
            <div className="flex flex-col gap-3 rounded-xl border border-[#E2E2E2] border-t-[3px] border-t-[#00A86B] bg-white p-5 shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] font-bold uppercase leading-none tracking-[0.05em] text-[#00A86B]">
                Do
              </span>
              <Accordion
                variant="bordered"
                size="sm"
                items={[
                  {
                    value: "payout",
                    title: "Payout Settings",
                    summary: "Weekly · HDFC ••4471",
                    summaryTone: "brand",
                    content: <span>Commission and settlement account.</span>,
                  },
                  {
                    value: "tax",
                    title: "Tax & Compliance",
                    summary: "GST verified",
                    summaryTone: "brand",
                    content: <span>GSTIN 22AAAAA0000A1Z5</span>,
                  },
                ]}
              />
              <p className="m-0 text-[12px] leading-relaxed text-[#595959]">
                Every collapsed row carries its answer on the right. The operator reads the whole
                settings page without opening a single panel.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-[#E2E2E2] border-t-[3px] border-t-[#A8000F] bg-white p-5 shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] font-bold uppercase leading-none tracking-[0.05em] text-[#A8000F]">
                Don&apos;t
              </span>
              <div className="overflow-hidden rounded-[10px] border border-[#E2E2E2]">
                {["Payout Settings", "Section 2"].map((label, i) => (
                  <div
                    key={label}
                    className="flex items-center gap-[9px] px-3 py-[11px]"
                    style={{ borderBottom: i === 0 ? "1px solid #EEEEEE" : undefined }}
                  >
                    <span className="flex-1 text-[11px] font-semibold leading-tight text-[#202020]">
                      {label}
                    </span>
                    <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full border border-[#E2E2E2] text-[10px] font-bold leading-none text-[#595959]">
                      +
                    </span>
                  </div>
                ))}
              </div>
              <p className="m-0 text-[12px] leading-relaxed text-[#595959]">
                A +/− on the right, no summaries and a meaningless label. Every row has to be opened
                to learn anything, which is worse than no accordion at all.
              </p>
            </div>
          </section>

          <DocPanel
            title="API & keyboard"
            hint="Headers render as real <button aria-expanded> elements inside a heading, so screen readers announce both the label and its state."
          >
            <pre className="m-0 overflow-auto rounded-lg bg-[#0C1712] px-[18px] py-4 font-mono text-[12px] font-medium leading-[1.8] text-[#CFE7D6]">
              {ACCORDION_API}
            </pre>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(216px,1fr))] gap-[9px]">
              {ACCORDION_KEYS.map((k) => (
                <span
                  key={k.key}
                  className="flex items-center gap-2.5 rounded-lg border border-[#E2E2E2] px-[11px] py-[9px]"
                >
                  <span className="flex-none rounded border border-[#E2E2E2] bg-[#F3F5F9] px-[7px] py-1 font-mono text-[10px] font-semibold leading-none text-[#202020]">
                    {k.key}
                  </span>
                  <span className="text-[11px] leading-snug text-[#595959]">{k.does}</span>
                </span>
              ))}
            </div>
          </DocPanel>
        </div>
      </div>
    );
  },
};
