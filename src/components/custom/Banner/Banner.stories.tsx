import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Megaphone, Sparkles, Wallet } from "lucide-react";
import { Banner } from "./Banner";
import { BannerStack } from "./BannerStack";
import type { BannerProps, BannerSize } from "./Banner.types";

const meta = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "A banner is a tinted surface, a 1px border one step darker, an icon and two lines of text.",
          "**Title states the fact, body states the consequence** — *“Wallet balance below ₹5,000”* is the fact;",
          "*“Deliveries pause when the balance hits zero”* is why the operator should care.",
          "",
          "Five tones (`info`, `warning`, `danger`/`error`, `success`, `neutral`), three sizes (`sm`, `md`, `lg`),",
          "and four placements (`global`, `page`, `section`, `inline`). Everything else — items, actions,",
          "dismissal, auto-expiry, progress, the feature callout and the dark surface — is a prop.",
          "",
          "Banners render with `role=\"status\"`, and errors with `role=\"alert\"` so screen readers announce them",
          "immediately. A dismissed banner remembers its `dismissId` in local storage, so it does not return on",
          "every page load.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["info", "success", "error", "warning", "danger", "neutral"],
      description:
        "Visual style. Drives surface, border, ink and icon. `error` is an alias of `danger`.",
    },
    tone: {
      control: false,
      description: "Alias of `variant`, matching the design-system prop name. Wins when both are set.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description:
        "`sm` drops the description line entirely — one sentence, one action. `md` is the standard; `lg` suits onboarding and callouts.",
    },
    placement: {
      control: "radio",
      options: ["global", "page", "section", "inline"],
      description:
        "`global` renders the pinned full-bleed ink bar. `inline` defaults the size to `sm`.",
    },
    layout: {
      control: "radio",
      options: ["default", "callout"],
      description: "`callout` renders the feature callout — icon tile, display title, gradient action.",
    },
    appearance: {
      control: "radio",
      options: ["light", "dark"],
      description: "On dark surfaces the tint drops to a dark mix of the same hue.",
    },
    title: { control: "text", description: "The fact. 600 weight, full ink, one line, no full stop." },
    description: { control: "text", description: "The consequence. 400 weight, the same ink at 82%." },
    message: {
      control: "text",
      description: "Text content. Rendered as the title when no `title` is given. Alternatively pass `children`.",
    },
    items: { control: false, description: "A short list of causes, capped by `maxItems` (default 3)." },
    action: { control: false, description: "Primary action — `{ label, onClick, variant, href }`." },
    secondaryAction: { control: false, description: "Secondary action, rendered after the primary one." },
    actionPlacement: {
      control: "radio",
      options: ["inline", "below"],
      description: "`below` drops the actions under the copy instead of squeezing it.",
    },
    showIcon: { control: "boolean", description: "Whether to render the leading icon. Defaults to `true`." },
    icon: {
      control: false,
      description: "Override the default tone icon with any React node. Pass `null` to hide it.",
    },
    dismissible: { control: "boolean", description: "Adds the ✕. Only announcements are dismissible." },
    dismissId: { control: "text", description: "Remembers the dismissal in `localStorage`." },
    autoDismiss: {
      control: "number",
      description: "Milliseconds before the banner fades itself out, with a bottom countdown rule.",
    },
    progress: { control: "number", description: "0–100. Swaps the icon for a spinner and shows a bar." },
    progressLabel: { control: "text", description: "Caption under the progress bar." },
    backgroundColor: { control: "color", description: "Custom background color. Overrides the tone palette." },
    borderColor: { control: "color", description: "Custom border color. Overrides the tone palette." },
    iconColor: { control: "color", description: "Custom icon color. Overrides the tone palette." },
    textColor: { control: "color", description: "Custom text color. Overrides the tone palette." },
  },
  args: {
    variant: "info",
    size: "md",
    showIcon: true,
    title: "ONDC sync runs at 3:00am",
    description: "Menu edits made after 2:30am land the next day.",
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

const frame = (node: React.ReactNode) => <div className="w-[600px]">{node}</div>;

/* -------------------------------------------------------------------------- */
/*  Tones                                                                      */
/* -------------------------------------------------------------------------- */

export const Info: Story = {
  name: "Info",
  args: {
    variant: "info",
    action: { label: "View schedule" },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

export const Warning: Story = {
  name: "Warning",
  args: {
    variant: "warning",
    title: "Wallet balance below ₹5,000",
    description: "Deliveries pause when the balance hits zero.",
    action: { label: "Recharge" },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

export const Danger: Story = {
  name: "Danger",
  args: {
    variant: "danger",
    title: "3 outlets are offline on Swiggy",
    description: "Last sync failed 14 minutes ago.",
    action: { label: "Retry" },
  },
  parameters: {
    docs: {
      description: {
        story: "Something is broken right now, losing them orders. Renders with `role=\"alert\"`.",
      },
    },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

export const Success: Story = {
  name: "Success",
  args: {
    variant: "success",
    title: "Payout of ₹1,84,200 credited",
    description: "HDFC ••••4471 · settles by end of day.",
    action: { label: "View payout" },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

export const Neutral: Story = {
  name: "Neutral",
  args: {
    variant: "neutral",
    title: "Reports are limited to 62 days",
    description: "Longer windows need an export request.",
    action: { label: "Request export" },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

export const Error: Story = {
  name: "Error (alias of danger)",
  args: {
    variant: "error",
    title: undefined,
    description: undefined,
    message: "Something went wrong. Please try again or contact support.",
  },
  parameters: {
    docs: {
      description: {
        story: "`error` keeps working as the original variant name and renders the `danger` palette.",
      },
    },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

/* -------------------------------------------------------------------------- */
/*  Scale                                                                      */
/* -------------------------------------------------------------------------- */

export const Sizes: Story = {
  name: "Size scale",
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "`sm` drops the body line entirely — one sentence, one action. Use it inside cards, table toolbars and drawers.",
      },
    },
  },
  render: function SizesStory() {
    const rows: { size: BannerSize; spec: string; use: string }[] = [
      { size: "sm", spec: "pad 9/12 · icon 14", use: "Inside cards, table toolbars and drawers" },
      { size: "md", spec: "pad 13/15 · icon 17", use: "The standard — page and section level" },
      { size: "lg", spec: "pad 16/18 · icon 20", use: "Onboarding, empty screens, feature callouts" },
    ];
    return (
      <div className="flex w-[680px] flex-col gap-4">
        {rows.map((r) => (
          <div key={r.size} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#787878]">
              {r.size} — {r.spec} · {r.use}
            </span>
            <Banner
              variant="info"
              size={r.size}
              title="ONDC sync runs at 3:00am"
              description="Menu edits made after 2:30am land the next day."
            />
          </div>
        ))}
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/*  Layout variants                                                            */
/* -------------------------------------------------------------------------- */

export const TitleOnly: Story = {
  name: "Title only",
  args: {
    variant: "success",
    title: "Menu synced to all 4 channels",
    description: undefined,
    action: { label: "View log", variant: "link" },
  },
  parameters: {
    docs: { description: { story: "The most common arrangement — one line, centred, with a text link." } },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

export const Dismissible: Story = {
  name: "Dismissible",
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Only announcements are dismissible. An error the operator must fix has no ✕. Pass `dismissId` to remember it in `localStorage`.",
      },
    },
  },
  render: function DismissibleStory() {
    const [gone, setGone] = React.useState(false);
    return (
      <div className="flex w-[600px] flex-col gap-3">
        {!gone ? (
          <Banner
            variant="info"
            dismissible
            onDismiss={() => setGone(true)}
            title="New: bulk menu import from CSV"
            description="Upload 400 items at once instead of adding them one by one."
          />
        ) : (
          <button
            type="button"
            onClick={() => setGone(false)}
            className="h-[30px] cursor-pointer self-start rounded-lg border border-dashed border-[#C6C6C6] bg-transparent px-3 text-[11px] font-semibold text-[#787878]"
          >
            Bring it back
          </button>
        )}
      </div>
    );
  },
};

export const WithCauses: Story = {
  name: "With a list of causes",
  args: {
    variant: "danger",
    title: "Menu could not be published — 3 problems",
    description: undefined,
    items: [
      "Masala Chai — no price set for the Swiggy channel",
      "Veg Sandwich — image is 400×400, needs at least 800×800",
      "Monsoon Combo — references an item that was deleted",
    ],
    action: { label: "Fix items" },
  },
  parameters: {
    docs: {
      description: {
        story: "Cap the list at three and link to the rest — a banner is not an error log.",
      },
    },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

export const WithProgress: Story = {
  name: "With progress — a long-running job",
  args: {},
  parameters: {
    docs: { description: { story: "`progress` swaps the icon for a spinner and renders the bar." } },
  },
  render: function ProgressStory() {
    const [pct, setPct] = React.useState(64);
    React.useEffect(() => {
      const id = window.setInterval(() => setPct((p) => (p >= 100 ? 4 : p + 2)), 400);
      return () => window.clearInterval(id);
    }, []);
    const done = Math.round((pct / 100) * 412);
    return frame(
      <Banner
        variant="info"
        title="Importing 412 menu items"
        progress={pct}
        progressLabel={`${done} of 412 · about ${Math.max(1, Math.round((100 - pct) * 0.6))} seconds left`}
        action={{ label: "Cancel" }}
      />,
    );
  },
};

export const AutoExpiring: Story = {
  name: "Auto-expiring announcement",
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Success banners fade after 8 seconds with a bottom progress rule. Warnings and errors never expire.",
      },
    },
  },
  render: function AutoExpiringStory() {
    const [key, setKey] = React.useState(0);
    return (
      <div className="flex w-[600px] flex-col gap-3">
        <Banner
          key={key}
          variant="success"
          autoDismiss={8000}
          title="Payout of ₹1,84,200 credited"
          description="HDFC ••••4471 · settles by end of day."
        />
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="h-[30px] cursor-pointer self-start rounded-lg border border-dashed border-[#C6C6C6] bg-transparent px-3 text-[11px] font-semibold text-[#787878]"
        >
          Replay
        </button>
      </div>
    );
  },
};

export const GlobalBar: Story = {
  name: "Global bar — pinned above the header",
  args: {},
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Ink surface, centred, full bleed. One at a time, and only for platform-wide events.",
      },
    },
  },
  render: () => (
    <div className="w-full overflow-hidden rounded-[11px] border border-[#E2E2E2]">
      <Banner
        placement="global"
        variant="success"
        dismissible
        title="Scheduled maintenance tonight, 2:00–2:30am IST. Orders keep flowing; the dashboard will be read-only."
        action={{ label: "Details" }}
      />
      <div className="flex h-[52px] items-center gap-3 border-b border-[#EEEEEE] bg-white px-4">
        <span className="h-6 w-6 rounded-[7px] bg-[#DCF3CE]" />
        <span className="text-[12px] font-semibold text-[#202020]">Sector 17 Flagship</span>
        <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#003C1B] text-[10px] font-bold text-[#DCF3CE]">
          RS
        </span>
      </div>
      <div className="h-14 bg-[#FAFFF7]" />
    </div>
  ),
};

export const FeatureCallout: Story = {
  name: "Feature callout",
  args: {},
  parameters: {
    docs: {
      description: {
        story: "One per screen, maximum. This is the only banner allowed a gradient button.",
      },
    },
  },
  render: () =>
    frame(
      <Banner
        layout="callout"
        variant="success"
        icon={<Sparkles strokeWidth={2} />}
        title="Turn on ONDC in one click"
        description="Your menu already meets the catalogue rules. Outlets go live within 24 hours of enabling."
        action={{ label: "Enable ONDC" }}
        secondaryAction={{ label: "Not now" }}
      />,
    ),
};

export const LongCopy: Story = {
  name: "Long copy wraps, action stays",
  args: {},
  parameters: {
    docs: { description: { story: "Under ~320px the action drops below the copy instead of squeezing it." } },
  },
  render: () => (
    <div className="w-[270px]">
      <Banner
        variant="info"
        actionPlacement="below"
        title="GST filing for Q4 FY25 closes on 31 March"
        description="Download your settlement reports before the window closes, or you will need to raise a support ticket to get them."
        action={{ label: "Download reports" }}
      />
    </div>
  ),
};

export const OnDarkSurface: Story = {
  name: "On a dark surface",
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Tints drop to a dark mix of the same hue; ink text becomes the light tint of it.",
      },
    },
  },
  render: () => (
    <div className="flex w-[600px] flex-col gap-2.5 rounded-xl bg-[#0C1712] p-4">
      <Banner
        appearance="dark"
        variant="success"
        size="sm"
        title="Menu synced to all 4 channels"
        description="Last run 3:02am IST."
      />
      <Banner
        appearance="dark"
        variant="danger"
        size="sm"
        title="3 outlets are offline on Swiggy"
        description="Last sync failed 14 minutes ago."
      />
      <Banner
        appearance="dark"
        variant="warning"
        title="Wallet balance below ₹5,000"
        description="Deliveries pause when the balance hits zero."
        action={{ label: "Recharge" }}
      />
    </div>
  ),
};

export const Stacked: Story = {
  name: "Several at once — collapse them",
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "`BannerStack` shows the most severe in full and collapses the rest behind a counter carrying their tone dots.",
      },
    },
  },
  render: () => (
    <div className="w-[600px] rounded-[10px] border border-[#E2E2E2] p-3">
      <BannerStack
        max={1}
        size="sm"
        banners={[
          { id: "swiggy", variant: "danger", title: "3 outlets are offline on Swiggy" },
          { id: "wallet", variant: "warning", title: "Wallet balance below ₹5,000" },
          { id: "ondc", variant: "info", title: "ONDC sync runs at 3:00am" },
        ]}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Existing options — preserved                                               */
/* -------------------------------------------------------------------------- */

export const NoIcon: Story = {
  name: "No icon",
  args: { variant: "info", showIcon: false },
  parameters: {
    docs: { description: { story: "Set `showIcon={false}` to remove the leading icon entirely." } },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

export const CustomIcon: Story = {
  name: "Custom icon",
  args: {
    variant: "info",
    icon: <Megaphone strokeWidth={2} />,
    title: "We're rolling out a new feature next week",
    description: "Stay tuned — nothing you need to do right now.",
  },
  parameters: {
    docs: { description: { story: "Pass any React node via `icon` to replace the default tone icon." } },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

export const CustomColors: Story = {
  name: "Custom colors",
  args: {
    title: "This banner uses fully custom brand colors",
    description: "No preset variant needed — every colour prop is independent.",
    backgroundColor: "#FFF7ED",
    borderColor: "#FB923C",
    iconColor: "#EA580C",
    textColor: "#9A3412",
    icon: <Wallet strokeWidth={2} />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`backgroundColor`, `borderColor`, `iconColor` and `textColor` can each be set independently and override the tone palette.",
      },
    },
  },
  render: (args: BannerProps) => frame(<Banner {...args} />),
};

/* -------------------------------------------------------------------------- */
/*  Full preview                                                               */
/* -------------------------------------------------------------------------- */

const TONES = [
  {
    variant: "info" as const,
    name: "Info",
    title: "ONDC sync runs at 3:00am",
    description: "Menu edits made after 2:30am land the next day.",
    action: "View schedule",
    usage: "Neutral facts and schedules. Nothing is wrong.",
    tokens: "info-bg · info-ink",
    dot: "#4BADE3",
    swatch: { bg: "#E6F4FC", border: "#C6E4F5" },
  },
  {
    variant: "warning" as const,
    name: "Warning",
    title: "Wallet balance below ₹5,000",
    description: "Deliveries pause when the balance hits zero.",
    action: "Recharge",
    usage: "Something will break soon unless they act.",
    tokens: "warning-bg · warning-ink",
    dot: "#F5C518",
    swatch: { bg: "#FFF6D6", border: "#EFD98A" },
  },
  {
    variant: "danger" as const,
    name: "Danger",
    title: "3 outlets are offline on Swiggy",
    description: "Last sync failed 14 minutes ago.",
    action: "Retry",
    usage: "Something is broken right now, losing them orders.",
    tokens: "danger-bg · danger-ink",
    dot: "#A8000F",
    swatch: { bg: "#FBE2E4", border: "#F2C8CC" },
  },
  {
    variant: "success" as const,
    name: "Success",
    title: "Payout of ₹1,84,200 credited",
    description: "HDFC ••••4471 · settles by end of day.",
    action: "View payout",
    usage: "A completed action worth keeping on screen.",
    tokens: "green-50 · green-900",
    dot: "#00A86B",
    swatch: { bg: "#FAFFF7", border: "#CDE3C0" },
  },
  {
    variant: "neutral" as const,
    name: "Neutral",
    title: "Reports are limited to 62 days",
    description: "Longer windows need an export request.",
    action: "Request export",
    usage: "Platform limits and quiet context. No urgency.",
    tokens: "bg-subtle · ink-500",
    dot: "#9C9C9C",
    swatch: { bg: "#F3F5F9", border: "#E2E2E2" },
  },
];

function Panel({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-[#E2E2E2] bg-white p-[22px] shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
      <div>
        <h2 className="m-0 text-[16px] font-bold leading-tight text-[#202020]">{title}</h2>
        {hint && <p className="m-0 mt-1 max-w-[66ch] text-[13px] leading-normal text-[#595959]">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#787878]">{children}</span>;
}

function Note({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] leading-normal text-[#787878]">{children}</span>;
}

export const DesignPreview: Story = {
  name: "Design preview — Banners & Alerts",
  args: {},
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "The full uEngage “Banners & Alerts” sheet rebuilt with the component — five tones, three sizes, every layout, both surfaces.",
      },
    },
  },
  render: function DesignPreviewStory() {
    const [size, setSize] = React.useState<BannerSize>("md");
    const [breach, setBreach] = React.useState(7);
    const [ago, setAgo] = React.useState(12);
    const [dismissed, setDismissed] = React.useState(false);

    React.useEffect(() => {
      const id = window.setInterval(() => setAgo((a) => (a >= 58 ? 2 : a + 2)), 2000);
      return () => window.clearInterval(id);
    }, []);

    return (
      <div className="min-h-screen bg-[#FAFFF7] px-10 pb-16 pt-9 text-[#202020]">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-[26px]">
          <header className="flex flex-wrap items-end gap-[18px] border-b border-[#E2E2E2] pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] bg-[#DCF3CE] text-[15px] font-extrabold text-[#003C1B]">
                uE
              </span>
              <div>
                <h1 className="m-0 text-[26px] font-extrabold leading-none text-[#202020]">
                  Banners &amp; Alerts
                </h1>
                <p className="m-0 mt-1 text-[13px] leading-normal text-[#595959]">
                  Five tones · three sizes · inline, page, section and global placements
                </p>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              <span className="rounded-full bg-[#DCF3CE] px-[11px] py-[7px] text-[11px] font-semibold leading-none text-[#003C1B]">
                5 tones
              </span>
              <span className="rounded-full bg-[#F3F5F9] px-[11px] py-[7px] text-[11px] font-semibold leading-none text-[#595959]">
                6 layouts
              </span>
            </div>
          </header>

          {/* The five tones */}
          <Panel
            title="The five tones"
            hint="Switch size to see the scale respond. Each tone has exactly one job — never pick one for how it looks."
          >
            <div className="flex w-fit gap-0.5 rounded-lg bg-[#F3F5F9] p-[3px]">
              {(["sm", "md", "lg"] as BannerSize[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className="cursor-pointer rounded-md border-0 px-3 py-1.5 text-[11px] font-semibold leading-none transition-all duration-120"
                  style={{
                    background: size === s ? "#FFFFFF" : "transparent",
                    color: size === s ? "#003C1B" : "#595959",
                    boxShadow: size === s ? "2px 2px 4px rgba(0,0,0,.06)" : "none",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-[11px]">
              {TONES.map((t) => (
                <Banner
                  key={t.name}
                  variant={t.variant}
                  size={size}
                  title={t.title}
                  description={t.description}
                  action={{ label: t.action }}
                />
              ))}
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 border-t border-[#EEEEEE] pt-1.5">
              {TONES.map((t) => (
                <div key={t.name} className="flex flex-col gap-1">
                  <span className="flex items-center gap-[7px]">
                    <span
                      className="h-[11px] w-[11px] flex-none rounded"
                      style={{ background: t.swatch.bg, border: `1px solid ${t.swatch.border}` }}
                    />
                    <span className="text-[11px] font-semibold text-[#202020]">{t.name}</span>
                  </span>
                  <span className="text-[10px] leading-normal text-[#787878]">{t.usage}</span>
                  <span className="font-mono text-[9px] leading-tight text-[#787878]">{t.tokens}</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Layout variants */}
          <Panel
            title="Layout variants"
            hint="Six arrangements of the same tokens. The tone never changes with the layout."
          >
            <div className="flex flex-col gap-[9px]">
              <Caption>Title only — the most common</Caption>
              <Banner
                variant="success"
                title="Menu synced to all 4 channels"
                action={{ label: "View log", variant: "link" }}
              />
            </div>

            <div className="flex flex-col gap-[9px]">
              <Caption>Dismissible</Caption>
              {!dismissed ? (
                <Banner
                  variant="info"
                  dismissible
                  onDismiss={() => setDismissed(true)}
                  title="New: bulk menu import from CSV"
                  description="Upload 400 items at once instead of adding them one by one."
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setDismissed(false)}
                  className="h-[30px] cursor-pointer self-start rounded-lg border border-dashed border-[#C6C6C6] bg-transparent px-3 text-[11px] font-semibold text-[#787878]"
                >
                  Bring it back
                </button>
              )}
              <Note>Only announcements are dismissible. An error the operator must fix has no ✕.</Note>
            </div>

            <div className="flex flex-col gap-[9px]">
              <Caption>With a list of causes</Caption>
              <Banner
                variant="danger"
                title="Menu could not be published — 3 problems"
                items={[
                  "Masala Chai — no price set for the Swiggy channel",
                  "Veg Sandwich — image is 400×400, needs at least 800×800",
                  "Monsoon Combo — references an item that was deleted",
                ]}
                action={{ label: "Fix items" }}
              />
              <Note>Cap the list at three and link to the rest — a banner is not an error log.</Note>
            </div>

            <div className="flex flex-col gap-[9px]">
              <Caption>With progress — a long-running job</Caption>
              <Banner
                variant="info"
                title="Importing 412 menu items"
                progress={64}
                progressLabel="264 of 412 · about 40 seconds left"
                action={{ label: "Cancel" }}
              />
            </div>

            <div className="flex flex-col gap-[9px]">
              <Caption>Global bar — pinned above the header</Caption>
              <div className="overflow-hidden rounded-[11px] border border-[#E2E2E2]">
                <Banner
                  placement="global"
                  variant="success"
                  dismissible
                  title="Scheduled maintenance tonight, 2:00–2:30am IST. Orders keep flowing; the dashboard will be read-only."
                  action={{ label: "Details" }}
                />
                <div className="flex h-[52px] items-center gap-3 border-b border-[#EEEEEE] bg-white px-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-[#DCF3CE] text-[9px] font-extrabold text-[#003C1B]">
                    uE
                  </span>
                  <span className="text-[12px] font-semibold text-[#202020]">Sector 17 Flagship</span>
                  <span className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#003C1B] text-[10px] font-bold text-[#DCF3CE]">
                    RS
                  </span>
                </div>
                <div className="h-14 bg-[#FAFFF7]" />
              </div>
              <Note>Ink surface, centred, full bleed. One at a time, and only for platform-wide events.</Note>
            </div>

            <div className="flex flex-col gap-[9px]">
              <Caption>Feature callout — the one tinted brand banner</Caption>
              <Banner
                layout="callout"
                variant="success"
                icon={<Sparkles strokeWidth={2} />}
                title="Turn on ONDC in one click"
                description="Your menu already meets the catalogue rules. Outlets go live within 24 hours of enabling."
                action={{ label: "Enable ONDC" }}
                secondaryAction={{ label: "Not now" }}
              />
              <Note>One per screen, maximum. This is the only banner allowed a gradient button.</Note>
            </div>
          </Panel>

          {/* Edge cases */}
          <Panel title="Edge cases" hint="Stacking, live counts, and the places banners get abused.">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(268px,1fr))] items-start gap-[18px]">
              <div className="flex flex-col gap-2">
                <Caption>Several at once — collapse them</Caption>
                <div className="rounded-[10px] border border-[#E2E2E2] p-[11px]">
                  <BannerStack
                    max={1}
                    size="sm"
                    banners={[
                      { id: "swiggy", variant: "danger", title: "3 outlets are offline on Swiggy" },
                      { id: "wallet", variant: "warning", title: "Wallet balance below ₹5,000" },
                      { id: "ondc", variant: "info", title: "ONDC sync runs at 3:00am" },
                    ]}
                  />
                </div>
                <Note>Show the most severe in full; collapse the rest behind a counter with their tone dots.</Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Live count that updates</Caption>
                <Banner
                  variant="warning"
                  title={`${breach} orders past their TAT`}
                  description={`Updated ${ago} seconds ago.`}
                  action={{
                    label: "Refresh",
                    onClick: () => {
                      setBreach((b) => Math.max(0, b + (Math.random() > 0.5 ? 1 : -1)));
                      setAgo(0);
                    },
                  }}
                />
                <Note>The number updates in place — the banner never re-mounts, or it would flash on every poll.</Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Long copy wraps, action stays</Caption>
                <div className="w-full max-w-[270px]">
                  <Banner
                    variant="info"
                    actionPlacement="below"
                    title="GST filing for Q4 FY25 closes on 31 March"
                    description="Download your settlement reports before the window closes, or you will need to raise a support ticket to get them."
                    action={{ label: "Download reports" }}
                  />
                </div>
                <Note>Under ~320px the action drops below the copy instead of squeezing it.</Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Auto-expiring announcement</Caption>
                <Banner
                  variant="success"
                  expiryProgress={38}
                  title="Payout of ₹1,84,200 credited"
                  description="HDFC ••••4471 · settles by end of day."
                />
                <Note>
                  Success banners fade after 8 seconds with a bottom progress rule. Warnings and errors never expire.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Empty-state banner — inside a table</Caption>
                <div className="overflow-hidden rounded-[10px] border border-[#E2E2E2]">
                  <div className="grid grid-cols-[1fr_76px] bg-[#F3F5F9] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.05em] text-[#595959]">
                    <span>Order</span>
                    <span className="text-right">Amount</span>
                  </div>
                  <div className="p-[11px]">
                    <Banner
                      variant="warning"
                      size="sm"
                      title="3 filters are hiding 1,284 orders"
                      action={{ label: "Clear" }}
                    />
                  </div>
                </div>
                <Note>A banner explains a filtered-empty table; a full empty state is for genuinely no data.</Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>On a dark surface</Caption>
                <div className="flex flex-col gap-[9px] rounded-xl bg-[#0C1712] p-3.5">
                  <Banner
                    appearance="dark"
                    variant="success"
                    size="sm"
                    title="Menu synced to all 4 channels"
                    description="Last run 3:02am IST."
                  />
                  <Banner
                    appearance="dark"
                    variant="danger"
                    size="sm"
                    title="3 outlets are offline on Swiggy"
                    description="Last sync failed 14 minutes ago."
                  />
                </div>
                <Note>Tints drop to a dark mix of the same hue; ink text becomes the light tint of it.</Note>
              </div>
            </div>
          </Panel>

          {/* Do / Don't */}
          <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
            <div className="flex flex-col gap-3 rounded-xl border border-[#E2E2E2] border-t-[3px] border-t-[#00A86B] bg-white p-5 shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] font-bold uppercase tracking-[0.05em] leading-none text-[#00A86B]">Do</span>
              <Banner
                variant="warning"
                size="sm"
                title="Wallet balance below ₹5,000"
                action={{ label: "Recharge" }}
              />
              <p className="m-0 text-[12px] leading-relaxed text-[#595959]">
                Fact, consequence, and the one action that resolves it. The operator can act without leaving the page.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-[#E2E2E2] border-t-[3px] border-t-[#A8000F] bg-white p-5 shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] font-bold uppercase tracking-[0.05em] leading-none text-[#A8000F]">
                Don&apos;t
              </span>
              <div className="flex flex-col gap-[7px]">
                <div className="rounded-[9px] border border-[#E2E2E2] border-l-4 border-l-[#F5C518] bg-white px-[11px] py-[9px] text-[10px] font-semibold text-[#202020]">
                  Warning: low balance
                </div>
                <div className="rounded-[9px] border border-[#F2C8CC] bg-[#FBE2E4] px-[11px] py-[9px] text-[10px] font-semibold text-[#A8000F]">
                  Something went wrong
                </div>
                <div className="rounded-[9px] border border-[#C6E4F5] bg-[#E6F4FC] px-[11px] py-[9px] text-[10px] font-semibold text-[#0B5E88]">
                  Tip: try our new reports
                </div>
              </div>
              <p className="m-0 text-[12px] leading-relaxed text-[#595959]">
                Three stacked banners, a left accent stripe, no consequences and no actions. The operator learns to
                scroll past the whole region.
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  },
};

/* Kept for backwards compatibility with the previous story name. */
export const AllVariants: Story = {
  name: "All variants",
  args: {},
  parameters: {
    layout: "fullscreen",
    docs: {
      description: { story: "Every tone plus the icon, no-icon, custom-icon and custom-colour options." },
    },
  },
  render: function AllVariantsStory() {
    return (
      <div className="min-h-screen bg-[#FAFFF7] p-8">
        <div className="mx-auto flex max-w-2xl flex-col gap-8 rounded-[24px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#787878]">Banner Showcase</p>
            <h1 className="mt-2 text-2xl font-semibold text-[#202020]">All tones &amp; options</h1>
          </div>

          {TONES.map((t) => (
            <section key={t.name} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-[#595959]">{t.name}</h2>
              <Banner
                variant={t.variant}
                title={t.title}
                description={t.description}
                action={{ label: t.action }}
              />
            </section>
          ))}

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#595959]">No icon</h2>
            <Banner
              variant="info"
              showIcon={false}
              message="Icons can be hidden when they add no extra context."
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#595959]">Custom icon</h2>
            <Banner
              variant="success"
              icon={<Megaphone strokeWidth={2} />}
              message="We're rolling out a new feature next week. Stay tuned!"
            />
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#595959]">Custom colors</h2>
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
