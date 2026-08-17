import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ClipboardCheck,
  CreditCard,
  ListOrdered,
  Users,
} from "lucide-react";
import { Tabs } from "./Tabs";
import { TabPanel } from "./TabPanel";
import { TABS_SIZES } from "./tabsTokens";
import type {
  TabItem,
  CustomTabsProps,
  TabsSize,
  TabsVariant,
} from "./Tabs.types";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "uEngage-branded tab bar built on the Radix `Tabs` primitives. Feed it a `tabs` array of",
          "`{ value, label, disabled?, icon?, count?, dirty?, disabledReason? }` and drive it uncontrolled via",
          "`defaultValue` or controlled via `value` + `onChange`.",
          "",
          "**`primary` is the underline look; `secondary` is the segmented one.** `pill` and `vertical`",
          "complete the design-system set. The pre-design-system looks are still reachable as",
          "`legacyPrimary` and `legacySecondary`.",
          "",
          "The choice is not cosmetic: **primary means “different content”; secondary means “same content, filtered”.**",
          "Getting this wrong makes operators think they lost data.",
          "",
          "The design-system variants add `size`, `appearance`, `activation`, `fitted`, `overflow`, `syncToUrl`,",
          "`onBeforeChange` and `loop`, and pair with `TabPanel` for `lazy` / `keepMounted` panels.",
          "Arrow keys, Home/End and manual activation come from Radix.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "pill", "vertical", "legacyPrimary", "legacySecondary"],
      description:
        "`primary` is the underline look, `secondary` the segmented one. `legacyPrimary`/`legacySecondary` keep the pre-design-system looks.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Design-system variants only. `lg` appears once per page, under the page title.",
    },
    appearance: {
      control: "radio",
      options: ["light", "dark"],
      description: "On dark surfaces lime replaces forest for the active bar.",
    },
    activation: {
      control: "radio",
      options: ["automatic", "manual"],
      description: "`manual` requires ↵ / Space to switch after arrowing to a tab.",
    },
    overflow: {
      control: "radio",
      options: ["scroll", "menu"],
      description: "`scroll` fades and scrolls the strip; `menu` collapses the tail behind More.",
    },
    fitted: { control: "boolean", description: "Stretch the tabs to fill the width." },
    loop: { control: "boolean", description: "Wrap arrow-key navigation past the last tab." },
    syncToUrl: { control: "text", description: 'Deep-link the active tab, e.g. `"?tab"`.' },
    showBottomBorder: { control: "boolean" },
    visibleTabLimit: { control: "number" },
    overflowLabel: { control: "text" },
    defaultValue: { control: "text" },
    className: { control: "text" },
    onChange: { action: "change" },
    onBeforeChange: { control: false, description: "Return false to block a tab change." },
    children: { control: false },
  },
  args: { variant: "primary" },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const BASE_TABS: TabItem[] = [
  { value: "tickets", label: "Tickets" },
  { value: "teams", label: "Teams" },
  { value: "projects", label: "Projects" },
  { value: "sprints", label: "Sprints" },
  { value: "created-by-me", label: "Created By Me" },
];

export const Default: Story = {
  args: {
    tabs: BASE_TABS,
    defaultValue: "tickets",
  },
  render: (args: CustomTabsProps) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const Secondary: Story = {
  args: {
    tabs: BASE_TABS,
    defaultValue: "tickets",
    variant: "secondary",
  },
  render: (args: CustomTabsProps) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const SecondaryPill: Story = {
  args: {
    tabs: [
      { value: "riders", label: "My Riders" },
      { value: "tasks", label: "Live Tasks" },
    ],
    defaultValue: "riders",
    variant: "secondary",
  },
  render: (args: CustomTabsProps) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { value: "tickets", label: "Tickets" },
      { value: "teams", label: "Teams" },
      { value: "projects", label: "Projects" },
      { value: "sprints", label: "Sprints", disabled: true },
      { value: "created-by-me", label: "Created By Me" },
    ],
    defaultValue: "tickets",
  },
  render: (args: CustomTabsProps) => (
    <div className="w-180">
      <Tabs {...args} />
    </div>
  ),
};

export const LegacyLooks: Story = {
  name: "Legacy looks",
  args: { tabs: BASE_TABS },
  parameters: {
    docs: {
      description: {
        story:
          "The pre-design-system variants, kept for call sites that still want them: `legacyPrimary` (measured-overflow underline with the overlay) and `legacySecondary` (animated pill/chip slab).",
      },
    },
  },
  render: () => (
    <div className="flex w-180 flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#787878]">
          legacyPrimary
        </span>
        <Tabs variant="legacyPrimary" tabs={BASE_TABS} defaultValue="tickets" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#787878]">
          legacySecondary
        </span>
        <Tabs variant="legacySecondary" tabs={BASE_TABS} defaultValue="tickets" />
      </div>
    </div>
  ),
};

export const Controlled: Story = {
  args: { tabs: BASE_TABS },
  render: function ControlledStory(args:CustomTabsProps) {
    const [value, setValue] = React.useState<string>("tickets");
    return (
      <div className="flex w-180 flex-col gap-3">
        <Tabs {...args} value={value} onChange={setValue} />
        <code className="text-xs text-[#6B7280]">active: {`"${value}"`}</code>
      </div>
    );
  },
};

const MANY_TABS: TabItem[] = [
  { value: "tab-1", label: "Tab 1" },
  { value: "tab-2", label: "Tabs" },
  { value: "tab-3", label: "Tabs" },
  { value: "tab-4", label: "Tabs" },
  { value: "tab-5", label: "Tabs" },
  { value: "tab-6", label: "Tabs" },
  { value: "tab-7", label: "Tabs" },
];

export const WithOverflowDropdown: Story = {
  args: { tabs: MANY_TABS },
  parameters: { layout: "fullscreen" },
  render: function OverflowStory() {
    const [primaryTab, setPrimaryTab] = React.useState("tab-1");
    const [secondaryTab, setSecondaryTab] = React.useState("tab-1");

    return (
      <div className="min-h-screen bg-[#F6F8FB] p-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-[24px] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
              Overflow Playground
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-[#111827]">
              Tab limit &amp; overflow dropdown
            </h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              Tabs beyond <code className="rounded bg-[#F3F4F6] px-1 py-0.5 text-xs">visibleTabLimit</code> collapse into a "More Options" menu.
            </p>
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Primary — limit 5</h2>
            <Tabs
              variant="primary"
              value={primaryTab}
              tabs={MANY_TABS}
              visibleTabLimit={5}
              overflowLabel="More Options"
              onChange={setPrimaryTab}
            />
            <div className="rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#374151]">
              Active: <strong>{primaryTab}</strong>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-[#374151]">Secondary — limit 5</h2>
            <Tabs
              variant="secondary"
              value={secondaryTab}
              tabs={MANY_TABS}
              visibleTabLimit={5}
              overflowLabel="More Options"
              onChange={setSecondaryTab}
            />
            <div className="rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#374151]">
              Active: <strong>{secondaryTab}</strong>
            </div>
          </section>
        </div>
      </div>
    );
  },
};

export const Dynamic: Story = {
  args: { tabs: BASE_TABS },
  render: function DynamicStory() {
    const [tabs, setTabs] = React.useState<TabItem[]>([
      { value: "tab-1", label: "Tab 1" },
      { value: "tab-2", label: "Tab 2" },
    ]);
    const [active, setActive] = React.useState<string>("tab-1");
    const [label, setLabel] = React.useState<string>("");

    const addTab = () => {
      const next = label.trim();
      if (!next) return;
      setTabs((prev) => [...prev, { value: `tab-${Date.now()}`, label: next }]);
      setLabel("");
    };

    return (
      <div className="flex w-180 flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTab();
            }}
            placeholder="New tab label"
            className="flex-1 rounded-md border border-[#D1D5DB] px-3 py-2 text-sm outline-none focus:border-[#006F42] focus:ring-1 focus:ring-[#006F42]"
          />
          <button
            type="button"
            onClick={addTab}
            disabled={!label.trim()}
            className="rounded-md bg-[#006F42] px-4 py-2 text-sm font-medium text-white hover:bg-[#005a35] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add tab
          </button>
        </div>
        <Tabs tabs={tabs} value={active} onChange={setActive} />
        <code className="text-xs text-[#6B7280]">active: {`"${active}"`}</code>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/*  Design-system variants                                                     */
/* -------------------------------------------------------------------------- */

const DS_TABS: TabItem[] = [
  { value: "orders", label: "Orders", count: "1,284", icon: <ListOrdered strokeWidth={2} /> },
  { value: "customers", label: "Customers", count: "842", icon: <Users strokeWidth={2} /> },
  { value: "payouts", label: "Payouts", count: "12", icon: <CreditCard strokeWidth={2} /> },
  {
    value: "audit",
    label: "Outlet audit",
    count: "3",
    icon: <ClipboardCheck strokeWidth={2} />,
    disabled: true,
    disabledReason: "Unlocks after the first outlet visit is logged",
  },
];

const DS_PANELS: Record<string, { title: string; body: string; count: string }> = {
  orders: {
    title: "Live order feed",
    count: "1,284",
    body: "Every order in the selected window, grouped by channel. Rows open the order drawer; bulk actions appear once you select two or more.",
  },
  customers: {
    title: "Customer base",
    count: "842",
    body: "Repeat rate, loyalty tier and last-seen date for everyone who ordered in this window. Export respects the filters above.",
  },
  payouts: {
    title: "Settlement cycles",
    count: "12",
    body: "Aggregator commission and net payout per cycle, with the TDS breakdown. Downloadable as a GST-ready CSV.",
  },
  audit: {
    title: "Audit results",
    count: "3",
    body: "Checklist results from the last outlet visit with photos and the assigned owner. Failed items escalate after 48 hours.",
  },
};

function DemoPanel({ value }: { value: string }) {
  const p = DS_PANELS[value];
  if (!p) return null;
  return (
    <div className="flex flex-col gap-[11px] rounded-[10px] border border-[#EEEEEE] bg-[#FAFFF7] p-[18px]">
      <span className="flex items-center gap-[9px]">
        <span className="text-[14px] font-bold leading-tight text-[#202020]">{p.title}</span>
        <span className="ue-tabular rounded-full bg-[#DCF3CE] px-[9px] py-1 text-[10px] font-semibold leading-tight text-[#003C1B]">
          {p.count}
        </span>
      </span>
      <p className="m-0 text-[13px] font-medium leading-relaxed text-[#595959]">{p.body}</p>
    </div>
  );
}

const DS_PANEL_NODES = Object.keys(DS_PANELS).map((v) => (
  <TabPanel key={v} value={v}>
    <DemoPanel value={v} />
  </TabPanel>
));

export const PrimaryUnderline: Story = {
  name: "Primary — underline, page navigation",
  args: { tabs: DS_TABS, variant: "primary", defaultValue: "orders" },
  parameters: {
    docs: {
      description: {
        story:
          "Different content behind each tab. The default for page-level sections — Orders, Payouts, Audit.",
      },
    },
  },
  render: (args: CustomTabsProps) => (
    <div className="w-[680px]">
      <Tabs {...args}>{DS_PANEL_NODES}</Tabs>
    </div>
  ),
};

export const SecondarySegmented: Story = {
  name: "Secondary — segmented, filter the same view",
  args: {
    tabs: [
      { value: "day", label: "Day" },
      { value: "week", label: "Week" },
      { value: "month", label: "Month" },
      { value: "year", label: "Year", disabled: true, disabledReason: "Needs 12 months of history" },
    ],
    variant: "secondary",
    defaultValue: "day",
  },
  parameters: {
    docs: {
      description: {
        story:
          "One dataset, different slices. Day / Week / Month over the same chart. Lives inside a card header.",
      },
    },
  },
  render: (args: CustomTabsProps) => (
    <div className="w-[680px]">
      <Tabs {...args} />
    </div>
  ),
};

export const Pill: Story = {
  name: "Pill — facets",
  args: {
    tabs: [
      { value: "zomato", label: "Zomato", count: "412" },
      { value: "swiggy", label: "Swiggy", count: "386" },
      { value: "ondc", label: "ONDC", count: "94" },
      { value: "dinein", label: "Dine-in", disabled: true, disabledReason: "No POS connected" },
    ],
    variant: "pill",
    defaultValue: "zomato",
  },
  parameters: {
    docs: {
      description: { story: "Channel or category facets. Wraps freely, unlike the other variants." },
    },
  },
  render: (args: CustomTabsProps) => (
    <div className="w-[680px]">
      <Tabs {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  name: "Vertical — settings & long lists",
  args: { tabs: DS_TABS, variant: "vertical", defaultValue: "orders" },
  parameters: {
    docs: {
      description: {
        story:
          "Six or more sections with long labels. Settings screens, where a horizontal strip would scroll. Arrow keys move ↑ ↓.",
      },
    },
  },
  render: (args: CustomTabsProps) => (
    <div className="w-[680px]">
      <Tabs {...args}>{DS_PANEL_NODES}</Tabs>
    </div>
  ),
};

export const SizeScale: Story = {
  name: "Size scale",
  args: { tabs: DS_TABS },
  parameters: {
    docs: {
      description: { story: "Three sizes. LG only appears once per page, directly under the page title." },
    },
  },
  render: function SizeScaleStory() {
    return (
      <div className="flex w-[680px] flex-col gap-6">
        {(["sm", "md", "lg"] as TabsSize[]).map((s) => (
          <div key={s} className="flex flex-col gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#787878]">
              {TABS_SIZES[s].name} — {TABS_SIZES[s].spec}
            </span>
            <Tabs
              variant="primary"
              size={s}
              defaultValue="orders"
              tabs={[
                { value: "orders", label: "Orders" },
                { value: "payouts", label: "Payouts" },
              ]}
            />
            <Tabs
              variant="secondary"
              size={s}
              defaultValue="today"
              tabs={[
                { value: "today", label: "Today" },
                { value: "week", label: "Week" },
              ]}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const OverflowScroll: Story = {
  name: "Overflow — scroll with fade",
  args: { tabs: DS_TABS },
  parameters: {
    docs: {
      description: {
        story: "Tabs scroll horizontally with a fade and a chevron. Never wrap to a second row.",
      },
    },
  },
  render: () => (
    <div className="w-[320px] rounded-[10px] border border-[#E2E2E2] p-[11px]">
      <Tabs
        variant="primary"
        overflow="scroll"
        defaultValue="orders"
        tabs={[
          { value: "orders", label: "Orders" },
          { value: "customers", label: "Customers" },
          { value: "payouts", label: "Payouts" },
          { value: "audit", label: "Outlet audit" },
          { value: "inventory", label: "Inventory" },
        ]}
      />
    </div>
  ),
};

export const OverflowMenu: Story = {
  name: "Overflow — More menu",
  args: { tabs: DS_TABS },
  parameters: {
    docs: { description: { story: "Better when tab order is stable and the tail is rarely used." } },
  },
  render: () => (
    <div className="w-[360px] rounded-[10px] border border-[#E2E2E2] p-[11px]">
      <Tabs
        variant="primary"
        overflow="menu"
        visibleTabLimit={2}
        overflowLabel="More"
        defaultValue="orders"
        tabs={[
          { value: "orders", label: "Orders" },
          { value: "payouts", label: "Payouts" },
          { value: "audit", label: "Outlet audit" },
          { value: "inventory", label: "Inventory" },
        ]}
      />
    </div>
  ),
};

export const UnsavedChanges: Story = {
  name: "Unsaved changes",
  args: { tabs: DS_TABS },
  parameters: {
    docs: {
      description: {
        story:
          "A dot on the tab marks unsaved work; `onBeforeChange` blocks the switch, so it never silently discards.",
      },
    },
  },
  render: function UnsavedStory() {
    const [dirty, setDirty] = React.useState(true);
    const [active, setActive] = React.useState("menu");
    const [blocked, setBlocked] = React.useState(0);

    return (
      <div className="flex w-[420px] flex-col gap-3 rounded-[10px] border border-[#E2E2E2] p-[11px]">
        <Tabs
          variant="primary"
          value={active}
          onChange={setActive}
          onBeforeChange={() => {
            if (!dirty) return true;
            setBlocked((b) => b + 1);
            return false;
          }}
          tabs={[
            { value: "menu", label: "Menu", dirty },
            { value: "timings", label: "Timings" },
          ]}
        />
        {dirty && (
          <span className="flex items-center gap-2 rounded-lg border border-[#EFD98A] bg-[#FFF6D6] px-[11px] py-[9px] text-[11px] font-medium text-[#4A3B00]">
            3 unsaved menu edits
            <button
              type="button"
              onClick={() => setDirty(false)}
              className="ml-auto cursor-pointer rounded-md border border-[#E0C866] bg-white/70 px-2 py-1 text-[10px] font-semibold"
            >
              Save
            </button>
          </span>
        )}
        <code className="text-[11px] text-[#787878]">
          active: {active} · blocked switches: {blocked}
        </code>
      </div>
    );
  },
};

export const ManualActivation: Story = {
  name: "Manual activation",
  args: { tabs: DS_TABS, variant: "primary", activation: "manual", defaultValue: "orders" },
  parameters: {
    docs: {
      description: {
        story:
          "Arrow keys move focus without switching; ↵ or Space commits. Focus the strip and try ← →.",
      },
    },
  },
  render: (args: CustomTabsProps) => (
    <div className="w-[680px]">
      <Tabs {...args}>{DS_PANEL_NODES}</Tabs>
    </div>
  ),
};

export const Fitted: Story = {
  name: "Fitted",
  args: {
    tabs: [
      { value: "orders", label: "Orders" },
      { value: "payouts", label: "Payouts" },
      { value: "audit", label: "Audit" },
    ],
    variant: "secondary",
    fitted: true,
    defaultValue: "orders",
  },
  parameters: {
    docs: { description: { story: "`fitted` stretches the tabs to fill the available width." } },
  },
  render: (args: CustomTabsProps) => (
    <div className="w-[560px]">
      <Tabs {...args} />
    </div>
  ),
};

export const OnDarkSurface: Story = {
  name: "On a dark surface",
  args: { tabs: DS_TABS },
  parameters: {
    docs: {
      description: {
        story: "Lime replaces forest for the active bar; segmented's selected pill fills #1B3423.",
      },
    },
  },
  render: () => (
    <div className="flex w-[560px] flex-col gap-[13px] rounded-xl bg-[#0C1712] p-4">
      <Tabs
        variant="primary"
        appearance="dark"
        defaultValue="orders"
        tabs={[
          { value: "orders", label: "Orders" },
          { value: "payouts", label: "Payouts" },
        ]}
      />
      <Tabs
        variant="secondary"
        appearance="dark"
        size="sm"
        defaultValue="today"
        tabs={[
          { value: "today", label: "Today" },
          { value: "week", label: "Week" },
        ]}
      />
      <Tabs
        variant="pill"
        appearance="dark"
        size="sm"
        defaultValue="zomato"
        tabs={[
          { value: "zomato", label: "Zomato", count: "412" },
          { value: "swiggy", label: "Swiggy", count: "386" },
        ]}
      />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  Full design preview                                                        */
/* -------------------------------------------------------------------------- */

const VARIANT_GUIDE = [
  {
    name: "Primary · underline",
    tag: "Page navigation",
    tagBg: "#DCF3CE",
    tagFg: "#003C1B",
    note: "Different content behind each tab. The default for page-level sections — Orders, Payouts, Audit.",
  },
  {
    name: "Secondary · segmented",
    tag: "Filter the same view",
    tagBg: "#E4F2FB",
    tagFg: "#0B4A6F",
    note: "One dataset, different slices. Day / Week / Month over the same chart. Lives inside a card header.",
  },
  {
    name: "Pill",
    tag: "Multi-select facets",
    tagBg: "#FFF6D6",
    tagFg: "#6A5300",
    note: "Channel or category facets where more than one can be on at a time. Wraps freely, unlike the others.",
  },
  {
    name: "Vertical",
    tag: "Settings & long lists",
    tagBg: "#F3F5F9",
    tagFg: "#595959",
    note: "Six or more sections with long labels. Settings screens, where a horizontal strip would scroll.",
  },
];

const KEYS = [
  { key: "← →", does: "Moves between tabs in a horizontal set" },
  { key: "↑ ↓", does: "Moves between tabs in a vertical set" },
  { key: "Home / End", does: "Jumps to the first or last tab" },
  { key: "Tab", does: "Leaves the strip and enters the panel" },
  { key: "↵ / Space", does: "Activates in manual mode; automatic mode follows arrows" },
  { key: "Esc", does: "Closes the More overflow menu" },
];

const BAR_HEIGHTS = [42, 58, 51, 66, 60, 74, 68, 82, 76, 88, 80, 94, 86, 100];

const API_SNIPPET = `<Tabs  variant="primary | secondary | pill | vertical"   size="sm | md | lg"
       value={tab}   onChange={setTab}   defaultValue="orders"
       activation="automatic | manual"   // manual needs Enter to switch
       syncToUrl="?tab"                  // deep-link page-level tabs
       overflow="scroll | menu"          // fade + chevron, or a More menu
       fitted                            // stretch tabs to fill the width
       appearance="light | dark"
       tabs={[{ value, label, icon, count, disabled, disabledReason, dirty }]}
       onBeforeChange={confirmUnsaved} />

<TabPanel value="orders"  lazy  keepMounted />
  // lazy: mounts on first visit - keepMounted: keeps scroll and form state`;

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
  name: "Design preview — Tabs",
  args: { tabs: DS_TABS },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "The full uEngage Tabs sheet rebuilt with the component — four variants, three sizes, every state and edge case.",
      },
    },
  },
  render: function TabsDesignPreview() {
    const [variant, setVariant] = React.useState<TabsVariant>("primary");
    const [size, setSize] = React.useState<TabsSize>("md");
    const [active, setActive] = React.useState("orders");

    return (
      <div className="min-h-screen bg-[#FAFFF7] px-10 pb-16 pt-9 text-[#202020]">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-[26px]">
          <header className="flex flex-wrap items-end gap-[18px] border-b border-[#E2E2E2] pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[11px] bg-[#DCF3CE] text-[15px] font-extrabold text-[#003C1B]">
                uE
              </span>
              <div>
                <h1 className="m-0 text-[26px] font-extrabold leading-none">Tabs</h1>
                <p className="m-0 mt-1 text-[13px] leading-normal text-[#595959]">
                  Four variants · three sizes · seven states, and when to use each
                </p>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap gap-2">
              <span className="rounded-full bg-[#DCF3CE] px-[11px] py-[7px] text-[11px] font-semibold leading-none text-[#003C1B]">
                4 variants
              </span>
              <span className="rounded-full bg-[#F3F5F9] px-[11px] py-[7px] text-[11px] font-semibold leading-none text-[#595959]">
                7 states
              </span>
            </div>
          </header>

          <DocPanel
            title="Which variant, and when"
            hint='The choice is not cosmetic. Primary (underline) means "different content"; secondary (segmented) means "same content, filtered". Getting this wrong makes operators think they lost data.'
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(236px,1fr))] gap-[18px]">
              {VARIANT_GUIDE.map((v) => (
                <div
                  key={v.name}
                  className="flex flex-col gap-2.5 rounded-[10px] border border-[#E2E2E2] p-3.5"
                >
                  <span className="text-[12px] font-semibold text-[#202020]">{v.name}</span>
                  <span className="min-h-[46px] text-[11px] leading-normal text-[#787878]">
                    {v.note}
                  </span>
                  <span className="flex items-center gap-1.5 border-t border-[#EEEEEE] pt-[9px]">
                    <span
                      className="rounded-full px-2 py-1 text-[10px] font-semibold uppercase leading-tight tracking-[0.06em]"
                      style={{ background: v.tagBg, color: v.tagFg }}
                    >
                      {v.tag}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </DocPanel>

          <DocPanel
            title="Live tabs"
            hint="Switch variant and size; the panel cross-fades rather than jumping."
          >
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-0.5 rounded-lg bg-[#F3F5F9] p-[3px]">
                {(["primary", "secondary", "pill", "vertical"] as TabsVariant[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVariant(v)}
                    className="cursor-pointer rounded-md border-0 px-[11px] py-1.5 text-[11px] font-semibold capitalize leading-none transition-all duration-120"
                    style={{
                      background: variant === v ? "#FFFFFF" : "transparent",
                      color: variant === v ? "#003C1B" : "#595959",
                      boxShadow: variant === v ? "2px 2px 4px rgba(0,0,0,.06)" : "none",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div className="flex gap-0.5 rounded-lg bg-[#F3F5F9] p-[3px]">
                {(["sm", "md", "lg"] as TabsSize[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className="cursor-pointer rounded-md border-0 px-[11px] py-1.5 text-[11px] font-semibold uppercase leading-none transition-all duration-120"
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
            </div>

            <div className="min-h-[230px]">
              <Tabs
                key={variant}
                variant={variant}
                size={size}
                value={active}
                onChange={setActive}
                tabs={DS_TABS}
              >
                {DS_PANEL_NODES}
              </Tabs>
            </div>
          </DocPanel>

          <DocPanel
            title="Size scale"
            hint="Three sizes. LG only appears once per page, directly under the page title."
          >
            <div className="flex flex-col">
              <div className="grid grid-cols-[104px_1fr_1fr_178px] items-center gap-3.5 pb-[9px]">
                {["Size", "Underline", "Segmented", "Spec"].map((h) => (
                  <Caption key={h}>{h}</Caption>
                ))}
              </div>
              {(["sm", "md", "lg"] as TabsSize[]).map((s) => (
                <div
                  key={s}
                  className="grid grid-cols-[104px_1fr_1fr_178px] items-center gap-3.5 border-t border-[#EEEEEE] py-3"
                >
                  <span className="text-[12px] font-semibold text-[#202020]">
                    {TABS_SIZES[s].name}
                  </span>
                  <Tabs
                    variant="primary"
                    size={s}
                    defaultValue="orders"
                    tabs={[
                      { value: "orders", label: "Orders" },
                      { value: "payouts", label: "Payouts" },
                    ]}
                  />
                  <Tabs
                    variant="secondary"
                    size={s}
                    defaultValue="today"
                    tabs={[
                      { value: "today", label: "Today" },
                      { value: "week", label: "Week" },
                    ]}
                  />
                  <span className="ue-tabular text-[11px] font-medium leading-normal text-[#787878]">
                    {TABS_SIZES[s].spec}
                  </span>
                </div>
              ))}
            </div>
          </DocPanel>

          <DocPanel
            title="Edge cases"
            hint="Overflow, deep linking, unsaved work — the parts that get skipped."
          >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(268px,1fr))] items-start gap-[18px]">
              <div className="flex flex-col gap-2">
                <Caption>Overflow — scroll with fade</Caption>
                <div className="rounded-[10px] border border-[#E2E2E2] p-[11px]">
                  <Tabs
                    variant="primary"
                    size="sm"
                    defaultValue="orders"
                    tabs={[
                      { value: "orders", label: "Orders" },
                      { value: "customers", label: "Customers" },
                      { value: "payouts", label: "Payouts" },
                      { value: "audit", label: "Outlet audit" },
                      { value: "inventory", label: "Inventory" },
                    ]}
                  />
                </div>
                <Note>
                  Tabs scroll horizontally with a fade and a chevron. Never wrap to a second row.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Overflow — More menu</Caption>
                <div className="rounded-[10px] border border-[#E2E2E2] p-[11px]">
                  <Tabs
                    variant="primary"
                    size="sm"
                    overflow="menu"
                    visibleTabLimit={2}
                    defaultValue="orders"
                    tabs={[
                      { value: "orders", label: "Orders" },
                      { value: "payouts", label: "Payouts" },
                      { value: "audit", label: "Outlet audit" },
                      { value: "inventory", label: "Inventory" },
                    ]}
                  />
                </div>
                <Note>Better when tab order is stable and the tail is rarely used.</Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Unsaved changes</Caption>
                <div className="flex flex-col gap-[11px] rounded-[10px] border border-[#E2E2E2] p-[11px]">
                  <Tabs
                    variant="primary"
                    size="sm"
                    defaultValue="menu"
                    tabs={[
                      { value: "menu", label: "Menu", dirty: true },
                      { value: "timings", label: "Timings" },
                    ]}
                  />
                  <span className="flex items-center gap-2 rounded-lg border border-[#EFD98A] bg-[#FFF6D6] px-[11px] py-[9px] text-[11px] font-medium text-[#4A3B00]">
                    3 unsaved menu edits
                  </span>
                </div>
                <Note>
                  A dot on the tab marks unsaved work; leaving it prompts, it never silently discards.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Loading a panel</Caption>
                <div className="flex flex-col gap-3 rounded-[10px] border border-[#E2E2E2] p-[11px]">
                  <Tabs
                    variant="primary"
                    size="sm"
                    defaultValue="payouts"
                    tabs={[
                      { value: "orders", label: "Orders" },
                      { value: "payouts", label: "Payouts" },
                    ]}
                  />
                  <div className="flex flex-col gap-2">
                    {["64%", "88%", "46%"].map((w) => (
                      <span
                        key={w}
                        className="block h-[11px] animate-pulse rounded-md bg-[#F3F5F9]"
                        style={{ width: w }}
                      />
                    ))}
                  </div>
                </div>
                <Note>
                  The tab bar stays live while the panel loads — never disable the whole strip.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>Tabs inside a card header</Caption>
                <div className="overflow-hidden rounded-[10px] border border-[#E2E2E2]">
                  <div className="flex flex-wrap items-center gap-3 px-3.5 pt-3">
                    <span className="text-[13px] font-semibold leading-tight text-[#202020]">
                      Revenue
                    </span>
                    <span className="ml-auto">
                      <Tabs
                        variant="secondary"
                        size="sm"
                        defaultValue="day"
                        tabs={[
                          { value: "day", label: "Day" },
                          { value: "week", label: "Week" },
                          { value: "month", label: "Month" },
                        ]}
                      />
                    </span>
                  </div>
                  <div className="flex h-[76px] items-end gap-[3px] p-3.5">
                    {BAR_HEIGHTS.map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-t-[3px] bg-[#DCF3CE]"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <Note>
                  Segmented, right-aligned in the header — it filters the same chart, so it is not
                  underline.
                </Note>
              </div>

              <div className="flex flex-col gap-2">
                <Caption>On a dark surface</Caption>
                <div className="flex flex-col gap-[13px] rounded-xl bg-[#0C1712] p-4">
                  <Tabs
                    variant="primary"
                    appearance="dark"
                    size="sm"
                    defaultValue="orders"
                    tabs={[
                      { value: "orders", label: "Orders" },
                      { value: "payouts", label: "Payouts" },
                    ]}
                  />
                  <Tabs
                    variant="secondary"
                    appearance="dark"
                    size="sm"
                    defaultValue="today"
                    tabs={[
                      { value: "today", label: "Today" },
                      { value: "week", label: "Week" },
                    ]}
                  />
                </div>
                <Note>
                  Lime replaces forest for the active bar; segmented&apos;s selected pill fills #1B3423.
                </Note>
              </div>
            </div>
            <Note>
              A disabled tab stays visible and keeps its label — hiding it makes operators think the
              feature vanished. Pair it with a `disabledReason` tooltip saying what unlocks it.
            </Note>
          </DocPanel>

          <section className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
            <div className="flex flex-col gap-3 rounded-xl border border-[#E2E2E2] border-t-[3px] border-t-[#00A86B] bg-white p-5 shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] font-bold uppercase leading-none tracking-[0.05em] text-[#00A86B]">
                Do
              </span>
              <Tabs
                variant="primary"
                size="sm"
                defaultValue="orders"
                tabs={[
                  { value: "orders", label: "Orders" },
                  { value: "payouts", label: "Payouts" },
                  { value: "audit", label: "Audit" },
                ]}
              />
              <p className="m-0 text-[12px] leading-relaxed text-[#595959]">
                Three to five short nouns. The active tab is the only one carrying colour, so the
                current position is unambiguous.
              </p>
            </div>
            <div className="flex flex-col gap-3 rounded-xl border border-[#E2E2E2] border-t-[3px] border-t-[#A8000F] bg-white p-5 shadow-[2px_2px_4px_rgba(0,0,0,0.04)]">
              <span className="text-[12px] font-bold uppercase leading-none tracking-[0.05em] text-[#A8000F]">
                Don&apos;t
              </span>
              <div className="flex flex-wrap gap-3 border-b border-[#E2E2E2]">
                <span className="-mb-px border-b-2 border-[#003C1B] pb-[9px] text-[11px] font-semibold text-[#003C1B]">
                  All Orders
                </span>
                <span className="-mb-px border-b-2 border-[#8CC42A] pb-[9px] text-[11px] font-semibold text-[#003C1B]">
                  Settlement Reports
                </span>
                <span className="pb-[9px] text-[11px] font-semibold text-[#595959]">
                  Outlet Audit Checklist
                </span>
              </div>
              <p className="m-0 text-[12px] leading-relaxed text-[#595959]">
                Two tabs marked active and long multi-word labels that wrap. Nothing tells the operator
                where they actually are.
              </p>
            </div>
          </section>

          <DocPanel
            title="API & keyboard"
            hint="Page-level tabs sync to the URL so a payouts view can be shared, bookmarked and reloaded in place."
          >
            <pre className="m-0 overflow-auto rounded-lg bg-[#0C1712] px-[18px] py-4 font-mono text-[12px] font-medium leading-[1.8] text-[#CFE7D6]">
              {API_SNIPPET}
            </pre>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(216px,1fr))] gap-[9px]">
              {KEYS.map((k) => (
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
