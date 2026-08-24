import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Building2,
  MapPin,
  Settings,
  CreditCard,
  Clock,
  ShieldCheck,
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";
import {
  Section,
  SectionGroup,
  SectionHeader,
  SectionContent,
  SectionSubsection,
  SectionRow,
  SectionField,
  SectionDivider,
  SectionTableContent,
} from "./Section";
import { Table } from "../Table/Table";
import type { ColumnDef } from "../../../types/table";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { Button } from "../Button/button";

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/Section",
  component: Section,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "A card-style section container designed for form pages and detail views.",
          "",
          "**Sub-components:**",
          "| Component | Purpose |",
          "|---|---|",
          "| `SectionHeader` | Icon + title + optional description + action slot |",
          "| `SectionContent` | Wrapper for all content inside a section |",
          "| `SectionRow` | Responsive grid row (`columns` 1–4 or CSS string). Pass `dividers` for vertical separators |",
          "| `SectionField` | Single field slot, accepts optional `span` |",
          "| `SectionSubsection` | Groups fields with an optional labeled divider above |",
          "| `SectionDivider` | Standalone separator — horizontal (optionally labeled) or vertical |",
          "| `SectionTableContent` | Drop-in replacement for `SectionContent` when content is a full-width table |",
          "| `SectionGroup` | Accordion wrapper — only one child section open at a time |",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    // ── Section root ──────────────────────────────────────────────────────────
    bare: {
      control: "boolean",
      description:
        "Remove the card border and background. Use when embedding inside an existing card or modal.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Section",
      },
    },
    collapsible: {
      control: "boolean",
      description:
        "Enables the collapse/expand toggle. A chevron button appears in the header automatically.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Section",
      },
    },
    divider: {
      control: "boolean",
      description:
        "When `true` (and `collapsible` is `true`), shows a light rule below the header while the section is open. The line spans the full card width.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
        category: "Section",
      },
    },
    dividerStyle: {
      control: "select",
      options: ["solid", "dashed", "dotted"],
      description:
        "Border style of the header divider. Only effective when `divider` is `true`.",
      table: {
        type: { summary: "'solid' | 'dashed' | 'dotted'" },
        defaultValue: { summary: "'solid'" },
        category: "Section",
      },
    },
    defaultOpen: {
      control: "boolean",
      description:
        "Initial open state when uncontrolled. Only used when `collapsible` is `true` and `open` is not provided.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
        category: "Section",
      },
    },
    open: {
      control: "boolean",
      description:
        "Controlled open state. When provided, you must also pass `onOpenChange`. Only used when `collapsible` is `true`.",
      table: {
        type: { summary: "boolean" },
        category: "Section",
      },
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Called when the open state changes.",
      table: {
        type: { summary: "(open: boolean) => void" },
        category: "Section",
      },
    },
    className: {
      control: "text",
      description: "Additional Tailwind classes applied to the root element.",
      table: { category: "Section" },
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Business Details ─────────────────────────────────────────────────────────

export const BusinessDetails: Story = {
  name: "Business Details",
  parameters: {
    docs: {
      description: {
        story:
          "Matches the Business Details section from the prototype — icon header, 3-column field grid, status select, and logo upload area.",
      },
    },
  },
  render: (args) => {
    const [status, setStatus] = useState<string | string[]>("active");
    return (
      <Section {...args} className="max-w-4xl">
        <SectionHeader
          icon={<Building2 size={18} />}
          title="Business Details"
        />
        <SectionContent>
          <SectionRow columns={3}>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Business Name</span>
              <Input value="Tim Hortons" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Legal Entity Name</span>
              <Input value="Tim Hortons" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">GSTIN</span>
              <Input value="Unregistered" readOnly />
            </SectionField>
          </SectionRow>
          <SectionRow columns={3} className="mt-4">
            <SectionField>
              <span className="text-xs text-[#6B7280]">FSSAI Number</span>
              <Input value="11523000013" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Slug</span>
              <Input value="tim-hortons-linking-road-bandra-west" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Pin Code</span>
              <Input value="400050" readOnly />
            </SectionField>
          </SectionRow>
          <SectionRow columns={3} className="mt-4">
            <SectionField>
              <span className="text-xs text-[#6B7280]">Business Status</span>
              <Select
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                  { label: "Suspended", value: "suspended" },
                ]}
                value={status}
                onChange={setStatus}
                mode="single"
                width="w-full"
              />
            </SectionField>
            <SectionField span={2}>
              <span className="text-xs text-[#6B7280]">Logo</span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-[#2b7a3b] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  TH
                </div>
                <Button variant="secondary" size="sm">✏ Update logo</Button>
              </div>
            </SectionField>
          </SectionRow>
        </SectionContent>
      </Section>
    );
  },
};

// ─── Header Variants ──────────────────────────────────────────────────────────

export const HeaderVariants: Story = {
  name: "Header — All Variants",
  parameters: {
    docs: {
      description: {
        story:
          "Shows the full range of `SectionHeader` prop combinations: with/without icon, with/without description, with/without action.",
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4 max-w-4xl">
      <Section {...args}>
        <SectionHeader title="Title only" />
      </Section>
      <Section {...args}>
        <SectionHeader icon={<Building2 size={18} />} title="With icon" />
      </Section>
      <Section {...args}>
        <SectionHeader
          title="Title + description (no icon)"
          description="A subtitle that gives extra context"
        />
      </Section>
      <Section {...args}>
        <SectionHeader
          icon={<ShieldCheck size={18} />}
          title="Full header"
          description="Icon + title + description + action"
          action={
            <Button variant="secondary" size="sm">
              Audit Log
            </Button>
          }
        />
      </Section>
    </div>
  ),
};

// ─── Vertical Dividers ────────────────────────────────────────────────────────

export const VerticalDividers: Story = {
  name: "Vertical Dividers — Stats Row",
  parameters: {
    docs: {
      description: {
        story: [
          "Pass `dividers` on `SectionRow` to automatically insert vertical separators between every child.",
          "Great for stat cards, KPI summaries, or any read-only overview row.",
          "",
          "You can also place `<SectionDivider orientation=\"vertical\" />` manually between any elements in a flex container.",
        ].join("\n"),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-5 max-w-4xl">
      <Section {...args}>
        <SectionHeader
          icon={<TrendingUp size={18} />}
          title="Today's Overview"
          description="Live snapshot across all active outlets"
        />
        <SectionContent>
          <SectionRow dividers>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Total Orders</span>
              <p className="text-2xl font-bold text-[#202020]">1,284</p>
              <span className="text-xs text-emerald-600 font-medium">+12% vs yesterday</span>
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Revenue</span>
              <p className="text-2xl font-bold text-[#202020]">₹84,320</p>
              <span className="text-xs text-emerald-600 font-medium">+8% vs yesterday</span>
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Avg. Order Value</span>
              <p className="text-2xl font-bold text-[#202020]">₹657</p>
              <span className="text-xs text-red-500 font-medium">−3% vs yesterday</span>
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Active Customers</span>
              <p className="text-2xl font-bold text-[#202020]">342</p>
              <span className="text-xs text-emerald-600 font-medium">+5% vs yesterday</span>
            </SectionField>
          </SectionRow>
        </SectionContent>
      </Section>

      <Section {...args}>
        <SectionHeader
          icon={<ShoppingCart size={18} />}
          title="Outlet Breakdown"
          description="Side-by-side outlet comparison for today"
        />
        <SectionContent>
          <SectionRow dividers>
            <SectionField>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#2b7a3b]" />
                <span className="text-xs font-medium text-[#374151]">Bandra West</span>
              </div>
              <p className="text-xl font-bold text-[#202020]">₹28,400</p>
              <span className="text-xs text-[#6B7280]">312 orders</span>
            </SectionField>
            <SectionField>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                <span className="text-xs font-medium text-[#374151]">Koramangala</span>
              </div>
              <p className="text-xl font-bold text-[#202020]">₹31,900</p>
              <span className="text-xs text-[#6B7280]">397 orders</span>
            </SectionField>
            <SectionField>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span className="text-xs font-medium text-[#374151]">Connaught Place</span>
              </div>
              <p className="text-xl font-bold text-[#202020]">₹23,840</p>
              <span className="text-xs text-[#6B7280]">289 orders</span>
            </SectionField>
          </SectionRow>

          <SectionDivider />

          <div className="flex items-stretch gap-0">
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <span className="text-xs text-[#6B7280]">Top Item</span>
              <span className="text-sm font-medium text-[#202020]">Butter Chicken Wrap</span>
              <span className="text-xs text-[#6B7280]">184 units sold</span>
            </div>
            <SectionDivider orientation="vertical" className="mx-5" />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <span className="text-xs text-[#6B7280]">Avg. Prep Time</span>
              <span className="text-sm font-medium text-[#202020]">18 min</span>
              <span className="text-xs text-emerald-600">2 min faster than last week</span>
            </div>
            <SectionDivider orientation="vertical" className="mx-5" />
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <span className="text-xs text-[#6B7280]">Cancellation Rate</span>
              <span className="text-sm font-medium text-[#202020]">2.4%</span>
              <span className="text-xs text-red-500">+0.3% vs last week</span>
            </div>
          </div>
        </SectionContent>
      </Section>
    </div>
  ),
};

// ─── Advanced Settings (subsections + labeled dividers) ───────────────────────

export const AdvancedSettings: Story = {
  name: "Advanced Settings — Subsections & titleClassName",
  parameters: {
    docs: {
      description: {
        story: [
          "Shows `SectionSubsection` with `separatorLabel` to visually group related fields using labeled horizontal dividers.",
          "",
          "The last subsection uses `titleClassName` to override the default uppercase green label style with a plain sentence-case heading.",
        ].join("\n"),
      },
    },
  },
  render: (args) => (
    <Section {...args} className="max-w-4xl">
      <SectionHeader
        icon={<Settings size={18} />}
        title="Advanced Settings"
        description="Configure detailed platform options for your outlet"
        action={<Button variant="primary" size="sm">Save Changes</Button>}
      />
      <SectionContent>
        <SectionSubsection
          separator={false}
          title="Ordering Window"
          description="Control when orders can be placed"
        >
          <SectionRow columns={3}>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Pre-order Window (days)</span>
              <Input placeholder="e.g. 7" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Min Order Value (₹)</span>
              <Input placeholder="e.g. 100" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Max Order Value (₹)</span>
              <Input placeholder="e.g. 5000" />
            </SectionField>
          </SectionRow>
        </SectionSubsection>

        <SectionSubsection
          separatorLabel="Delivery"
          title="Delivery Settings"
          description="Radius and charges for home delivery"
        >
          <SectionRow columns={3}>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Delivery Radius (km)</span>
              <Input placeholder="e.g. 5" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Base Charge (₹)</span>
              <Input placeholder="e.g. 30" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Free Above (₹)</span>
              <Input placeholder="e.g. 500" />
            </SectionField>
          </SectionRow>
        </SectionSubsection>

        {/* titleClassName overrides the default uppercase green style */}
        <SectionSubsection
          separatorLabel="Timing"
          title="Operating Hours"
          titleClassName="text-sm font-semibold normal-case tracking-normal text-[#374151]"
          description="Using titleClassName to override the default uppercase green label"
        >
          <SectionRow columns={2}>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Opening Time</span>
              <Input placeholder="09:00 AM" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Closing Time</span>
              <Input placeholder="10:00 PM" />
            </SectionField>
          </SectionRow>
        </SectionSubsection>
      </SectionContent>
    </Section>
  ),
};

// ─── Location with spanned field ─────────────────────────────────────────────

export const LocationContact: Story = {
  name: "Location & Contact — Field Span",
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates `SectionField span={2}` to stretch a field across multiple columns inside a 3-column `SectionRow`.",
      },
    },
  },
  render: (args) => (
    <Section {...args} className="max-w-4xl">
      <SectionHeader
        icon={<MapPin size={18} />}
        title="Location & Contact"
        action={<Button variant="secondary" size="sm">Edit</Button>}
      />
      <SectionContent>
        <SectionSubsection separator={false} title="Registered Address">
          <SectionRow columns={3}>
            <SectionField span={2}>
              <span className="text-xs text-[#6B7280]">Street / Building</span>
              <Input value="Linking Road, Bandra West" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Pin Code</span>
              <Input value="400050" readOnly />
            </SectionField>
          </SectionRow>
          <SectionRow columns={3} className="mt-4">
            <SectionField>
              <span className="text-xs text-[#6B7280]">City</span>
              <Input value="Mumbai" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">State</span>
              <Input value="Maharashtra" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Country</span>
              <Input value="India" readOnly />
            </SectionField>
          </SectionRow>
        </SectionSubsection>

        <SectionSubsection separatorLabel="Contact" title="Point of Contact">
          <SectionRow columns={2}>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Phone</span>
              <Input value="+91 98765 43210" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Email</span>
              <Input value="owner@timhortons.in" readOnly />
            </SectionField>
          </SectionRow>
        </SectionSubsection>
      </SectionContent>
    </Section>
  ),
};

// ─── Plain horizontal divider ─────────────────────────────────────────────────

export const HorizontalDivider: Story = {
  name: "Horizontal Divider — Plain & Labeled",
  parameters: {
    docs: {
      description: {
        story:
          "`<SectionDivider />` renders a plain horizontal rule. Add `label` to show a centered text label on the line.",
      },
    },
  },
  render: (args) => (
    <Section {...args} className="max-w-4xl">
      <SectionHeader icon={<CreditCard size={18} />} title="Payment Settings" />
      <SectionContent>
        <SectionRow columns={2}>
          <SectionField>
            <span className="text-xs text-[#6B7280]">UPI ID</span>
            <Input placeholder="yourname@upi" />
          </SectionField>
          <SectionField>
            <span className="text-xs text-[#6B7280]">Bank Account Number</span>
            <Input placeholder="XXXX XXXX XXXX" />
          </SectionField>
        </SectionRow>

        <SectionDivider label="Bank Details" />

        <SectionRow columns={2}>
          <SectionField>
            <span className="text-xs text-[#6B7280]">IFSC Code</span>
            <Input placeholder="HDFC0001234" />
          </SectionField>
          <SectionField>
            <span className="text-xs text-[#6B7280]">Beneficiary Name</span>
            <Input placeholder="Tim Hortons India Pvt. Ltd." />
          </SectionField>
        </SectionRow>
      </SectionContent>
    </Section>
  ),
};

// ─── Collapsible ─────────────────────────────────────────────────────────────

export const CollapsibleSection: Story = {
  name: "Collapsible — Uncontrolled & Controlled",
  parameters: {
    docs: {
      description: {
        story: [
          "Add `collapsible` to any `<Section>` to enable collapse/expand. A chevron button appears in the header automatically.",
          "",
          "- **Uncontrolled** — pass `defaultOpen` (default `true`) and let the section manage its own state.",
          "- **Controlled** — pass `open` + `onOpenChange` to drive the state from outside.",
          "",
          "`SectionContent` and `SectionTableContent` both animate using Radix Collapsible internally — no extra markup needed.",
        ].join("\n"),
      },
    },
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div className="flex flex-col gap-5 max-w-4xl">
        {/* Uncontrolled — starts open */}
        <Section {...args} collapsible defaultOpen={true}>
          <SectionHeader
            icon={<Building2 size={18} />}
            title="Business Details (uncontrolled)"
            description="Starts open — click the chevron to collapse"
          />
          <SectionContent>
            <SectionRow columns={3}>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Business Name</span>
                <Input value="Tim Hortons" readOnly />
              </SectionField>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Legal Entity Name</span>
                <Input value="Tim Hortons" readOnly />
              </SectionField>
              <SectionField>
                <span className="text-xs text-[#6B7280]">GSTIN</span>
                <Input value="Unregistered" readOnly />
              </SectionField>
            </SectionRow>
          </SectionContent>
        </Section>

        {/* Uncontrolled — starts closed */}
        <Section {...args} collapsible defaultOpen={false}>
          <SectionHeader
            icon={<Settings size={18} />}
            title="Advanced Settings (starts collapsed)"
            description="defaultOpen={false} — click chevron to expand"
          />
          <SectionContent>
            <SectionRow columns={2}>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Min Order (₹)</span>
                <Input placeholder="100" />
              </SectionField>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Max Order (₹)</span>
                <Input placeholder="5000" />
              </SectionField>
            </SectionRow>
          </SectionContent>
        </Section>

        {/* Controlled */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280]">Controlled from outside:</span>
            <Button
              size="sm"
              variant={open ? "primary" : "secondary"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Collapse" : "Expand"}
            </Button>
          </div>
          <Section {...args} collapsible open={open} onOpenChange={setOpen}>
            <SectionHeader
              icon={<MapPin size={18} />}
              title="Location (controlled)"
              description={`open=${open} — driven by the button above`}
              action={<Button size="sm" variant="secondary">Edit</Button>}
            />
            <SectionContent>
              <SectionRow columns={3}>
                <SectionField span={2}>
                  <span className="text-xs text-[#6B7280]">Street</span>
                  <Input value="Linking Road, Bandra West" readOnly />
                </SectionField>
                <SectionField>
                  <span className="text-xs text-[#6B7280]">Pin Code</span>
                  <Input value="400050" readOnly />
                </SectionField>
              </SectionRow>
            </SectionContent>
          </Section>
        </div>
      </div>
    );
  },
};

// ─── Collapsible with header divider ─────────────────────────────────────────

export const CollapsibleHeaderDivider: Story = {
  name: "Collapsible — Header Divider (divider + dividerStyle)",
  parameters: {
    docs: {
      description: {
        story: [
          "Add `divider` to a collapsible section to show a full-width rule between the header and content when open.",
          "The rule disappears automatically when the section collapses.",
          "",
          "Control the line style with `dividerStyle`:",
          "- `'solid'` (default) — plain border",
          "- `'dashed'` — dashed border",
          "- `'dotted'` — dotted border",
        ].join("\n"),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4 max-w-4xl">
      {/* solid */}
      <Section {...args} collapsible divider dividerStyle="solid">
        <SectionHeader
          icon={<Clock size={18} />}
          title="Operating Hours — solid (default)"
          description="divider + dividerStyle='solid'"
        />
        <SectionContent>
          <SectionSubsection separator={false} title="Weekdays">
            <SectionRow columns={2}>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Opening Time</span>
                <Input placeholder="09:00 AM" />
              </SectionField>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Closing Time</span>
                <Input placeholder="10:00 PM" />
              </SectionField>
            </SectionRow>
          </SectionSubsection>
          <SectionSubsection separatorLabel="Weekend" title="Saturday & Sunday">
            <SectionRow columns={2}>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Opening Time</span>
                <Input placeholder="10:00 AM" />
              </SectionField>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Closing Time</span>
                <Input placeholder="11:00 PM" />
              </SectionField>
            </SectionRow>
          </SectionSubsection>
        </SectionContent>
      </Section>

      {/* dashed */}
      <Section {...args} collapsible divider dividerStyle="dashed">
        <SectionHeader
          icon={<Clock size={18} />}
          title="Operating Hours — dashed"
          description="divider + dividerStyle='dashed'"
        />
        <SectionContent>
          <SectionSubsection separator={false} title="Weekdays">
            <SectionRow columns={2}>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Opening Time</span>
                <Input placeholder="09:00 AM" />
              </SectionField>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Closing Time</span>
                <Input placeholder="10:00 PM" />
              </SectionField>
            </SectionRow>
          </SectionSubsection>
        </SectionContent>
      </Section>

      {/* dotted */}
      <Section {...args} collapsible divider dividerStyle="dotted">
        <SectionHeader
          icon={<Clock size={18} />}
          title="Operating Hours — dotted"
          description="divider + dividerStyle='dotted'"
        />
        <SectionContent>
          <SectionSubsection separator={false} title="Weekdays">
            <SectionRow columns={2}>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Opening Time</span>
                <Input placeholder="09:00 AM" />
              </SectionField>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Closing Time</span>
                <Input placeholder="10:00 PM" />
              </SectionField>
            </SectionRow>
          </SectionSubsection>
        </SectionContent>
      </Section>
    </div>
  ),
};

// ─── SectionGroup (accordion) ────────────────────────────────────────────────

export const AccordionGroup: Story = {
  name: "SectionGroup — Accordion (one open at a time)",
  parameters: {
    docs: {
      description: {
        story: [
          "Wrap multiple `<Section>` components in `<SectionGroup>` to get accordion behaviour — only one section is open at a time.",
          "",
          "- `SectionGroup` injects `collapsible`, `open`, and `onOpenChange` into each direct `<Section>` child automatically.",
          "- `defaultOpen` (default `0`) sets which section starts open. Pass `null` to start with all sections collapsed.",
          "- You don't need to add `collapsible` to each `<Section>` — the group handles it.",
        ].join("\n"),
      },
    },
  },
  render: (args) => (
    <SectionGroup className="max-w-4xl">
      <Section {...args}>
        <SectionHeader
          icon={<Building2 size={18} />}
          title="Business Details"
          description="Name, registration, and tax info"
        />
        <SectionContent>
          <SectionRow columns={3}>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Business Name</span>
              <Input value="Tim Hortons" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Legal Entity</span>
              <Input value="Tim Hortons India Pvt. Ltd." readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">GSTIN</span>
              <Input value="Unregistered" readOnly />
            </SectionField>
          </SectionRow>
        </SectionContent>
      </Section>

      <Section {...args}>
        <SectionHeader
          icon={<MapPin size={18} />}
          title="Location & Contact"
          description="Address and point-of-contact details"
        />
        <SectionContent>
          <SectionRow columns={3}>
            <SectionField span={2}>
              <span className="text-xs text-[#6B7280]">Street</span>
              <Input value="Linking Road, Bandra West" readOnly />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Pin Code</span>
              <Input value="400050" readOnly />
            </SectionField>
          </SectionRow>
        </SectionContent>
      </Section>

      <Section {...args}>
        <SectionHeader
          icon={<Settings size={18} />}
          title="Advanced Settings"
          description="Ordering window and delivery config"
        />
        <SectionContent>
          <SectionRow columns={3}>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Min Order (₹)</span>
              <Input placeholder="100" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Max Order (₹)</span>
              <Input placeholder="5000" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Delivery Radius (km)</span>
              <Input placeholder="5" />
            </SectionField>
          </SectionRow>
        </SectionContent>
      </Section>
    </SectionGroup>
  ),
};

// ─── Bare ─────────────────────────────────────────────────────────────────────

export const Bare: Story = {
  name: "Bare — No Card",
  parameters: {
    docs: {
      description: {
        story:
          "Pass `bare` to remove the card border and background — useful when the section lives inside an existing card or modal.",
      },
    },
  },
  render: (args) => (
    <div className="border border-dashed border-gray-300 rounded-xl p-5 max-w-3xl">
      <Section {...args} bare>
        <SectionHeader icon={<Clock size={18} />} title="Inside a Card (bare)" />
        <SectionContent>
          <SectionRow columns={2}>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Field 1</span>
              <Input placeholder="Value 1" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Field 2</span>
              <Input placeholder="Value 2" />
            </SectionField>
          </SectionRow>
        </SectionContent>
      </Section>
    </div>
  ),
};

// ─── Table inside Section ─────────────────────────────────────────────────────

interface BrandRow {
  id: string;
  cloudBrand: string;
  outlet: string;
  category: string;
  status: "Active" | "Inactive";
  mappedOn: string;
}

const BRAND_ROWS: BrandRow[] = [
  { id: "1", cloudBrand: "Burger Bros", outlet: "Bandra West", category: "Burgers", status: "Active", mappedOn: "12 Jan 2025" },
  { id: "2", cloudBrand: "Pizza Palace", outlet: "Koramangala", category: "Pizza", status: "Active", mappedOn: "18 Jan 2025" },
  { id: "3", cloudBrand: "Sushi Spot", outlet: "Connaught Place", category: "Japanese", status: "Inactive", mappedOn: "02 Feb 2025" },
  { id: "4", cloudBrand: "Taco Tribe", outlet: "Bandra West", category: "Mexican", status: "Active", mappedOn: "15 Feb 2025" },
  { id: "5", cloudBrand: "The Salad Bar", outlet: "Koramangala", category: "Healthy", status: "Inactive", mappedOn: "20 Mar 2025" },
];

const BRAND_COLUMNS: ColumnDef<BrandRow>[] = [
  {
    key: "cloudBrand",
    header: "Cloud Brand",
    flex: 1.2,
    sortable: true,
    render: (_, row) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-[#E3F5E3] flex items-center justify-center text-[#2b7a3b] text-xs font-bold flex-shrink-0">
          {row.cloudBrand[0]}
        </div>
        <span className="font-medium text-[#202020]">{row.cloudBrand}</span>
      </div>
    ),
  },
  { key: "outlet", header: "Outlet", flex: 1, sortable: true },
  { key: "category", header: "Category", flex: 1 },
  { key: "mappedOn", header: "Mapped On", flex: 1, sortable: true },
  {
    key: "status",
    header: "Status",
    flex: 0.8,
    render: (_, row) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
          row.status === "Active"
            ? "bg-emerald-50 text-emerald-700"
            : "bg-red-50 text-red-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },
];

export const CloudBrandMapping: Story = {
  name: "Table inside Section — SectionTableContent",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: [
          "When a table is the primary content, wrap it in `<SectionTableContent>` instead of `<SectionContent>`.",
          "It applies negative margins to cancel the section's padding so the table renders edge-to-edge inside the card.",
          "",
          "- `divider` (default `true`) — shows a separator line between header and table.",
          "- Works with `collapsible` — the table animates in/out like regular content.",
        ].join("\n"),
      },
    },
  },
  render: (args) => (
    <Section {...args} className="max-w-5xl">
      <SectionHeader
        icon={<Building2 size={18} />}
        title="Cloud Brand Mapping"
        description="Map your cloud brands to physical outlets"
        action={
          <Button variant="primary" size="sm">+ Add Mapping</Button>
        }
      />
      <SectionTableContent>
        <Table columns={BRAND_COLUMNS} data={BRAND_ROWS} keyField="id" hover />
      </SectionTableContent>
    </Section>
  ),
};

// ─── Props Reference ──────────────────────────────────────────────────────────

export const PropsReference: Story = {
  name: "Props Reference",
  parameters: {
    docs: {
      description: {
        story: [
          "Complete prop reference for every component in the Section family.",
          "",
          "### `<Section>`",
          "| Prop | Type | Default | Description |",
          "|---|---|---|---|",
          "| `bare` | `boolean` | `false` | Removes card border/background |",
          "| `collapsible` | `boolean` | `false` | Adds a chevron toggle; content animates on collapse |",
          "| `divider` | `boolean` | `false` | Shows a full-width rule below the header when open (requires `collapsible`) |",
          "| `dividerStyle` | `'solid'\\|'dashed'\\|'dotted'` | `'solid'` | Border style of the header divider |",
          "| `defaultOpen` | `boolean` | `true` | Initial open state (uncontrolled) |",
          "| `open` | `boolean` | — | Controlled open state |",
          "| `onOpenChange` | `(open: boolean) => void` | — | Called on open/close |",
          "| `className` | `string` | — | Extra Tailwind classes |",
          "",
          "### `<SectionHeader>`",
          "| Prop | Type | Default | Description |",
          "|---|---|---|---|",
          "| `title` | `string` | — | **Required.** Main heading text |",
          "| `icon` | `ReactNode` | — | Icon shown left of title (rendered in brand green) |",
          "| `description` | `ReactNode` | — | Subtitle rendered below the title |",
          "| `action` | `ReactNode` | — | Trailing slot — typically a Button |",
          "",
          "### `<SectionRow>`",
          "| Prop | Type | Default | Description |",
          "|---|---|---|---|",
          "| `columns` | `1\\|2\\|3\\|4\\|string` | `3` | Column count or raw CSS `grid-template-columns` |",
          "| `dividers` | `boolean` | `false` | Inject vertical separators between every direct child |",
          "",
          "### `<SectionField>`",
          "| Prop | Type | Default | Description |",
          "|---|---|---|---|",
          "| `span` | `1\\|2\\|3\\|4` | — | Column span inside a `SectionRow` grid |",
          "",
          "### `<SectionSubsection>`",
          "| Prop | Type | Default | Description |",
          "|---|---|---|---|",
          "| `title` | `string` | — | Subsection heading |",
          "| `titleClassName` | `string` | — | Extra classes merged onto the title element — fully overrides default style when you supply conflicting utilities |",
          "| `description` | `string` | — | Subsection subtitle |",
          "| `separator` | `boolean` | `true` | Show a divider line above this subsection |",
          "| `separatorLabel` | `string` | — | Label on the separator line |",
          "",
          "### `<SectionDivider>`",
          "| Prop | Type | Default | Description |",
          "|---|---|---|---|",
          "| `orientation` | `'horizontal'\\|'vertical'` | `'horizontal'` | Direction of the separator |",
          "| `label` | `string` | — | Centered inline text (horizontal only) |",
          "| `height` | `string` | `'100%'` | CSS height for vertical dividers |",
          "",
          "### `<SectionTableContent>`",
          "| Prop | Type | Default | Description |",
          "|---|---|---|---|",
          "| `divider` | `boolean` | `true` | Show a separator line between the header and the table |",
          "",
          "### `<SectionGroup>`",
          "| Prop | Type | Default | Description |",
          "|---|---|---|---|",
          "| `defaultOpen` | `number\\|null` | `0` | Index of the section that starts open; `null` = all collapsed |",
          "",
          "> **Note:** `SectionGroup` automatically injects `collapsible`, `open`, and `onOpenChange` into its direct `<Section>` children.",
        ].join("\n"),
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col gap-4 max-w-4xl">
      {/* Static section with all sub-components */}
      <Section {...args}>
        <SectionHeader
          icon={<Package size={18} />}
          title="All Sub-components"
          description="SectionContent · SectionRow · SectionField · SectionSubsection · SectionDivider"
          action={<Button size="sm" variant="secondary">Action</Button>}
        />
        <SectionContent>
          <SectionSubsection separator={false} title="Default title style">
            <SectionRow columns={3}>
              <SectionField>
                <span className="text-xs text-[#6B7280]">span=1</span>
                <Input placeholder="col 1" />
              </SectionField>
              <SectionField>
                <span className="text-xs text-[#6B7280]">span=1</span>
                <Input placeholder="col 2" />
              </SectionField>
              <SectionField>
                <span className="text-xs text-[#6B7280]">span=1</span>
                <Input placeholder="col 3" />
              </SectionField>
            </SectionRow>
          </SectionSubsection>

          <SectionSubsection
            separatorLabel="Custom title"
            title="Custom via titleClassName"
            titleClassName="text-sm font-semibold normal-case tracking-normal text-[#374151]"
            description="titleClassName overrides the uppercase green default"
          >
            <SectionRow columns={2}>
              <SectionField>
                <span className="text-xs text-[#6B7280]">Field A</span>
                <Input placeholder="value" />
              </SectionField>
              <SectionField span={1}>
                <span className="text-xs text-[#6B7280]">Field B</span>
                <Input placeholder="value" />
              </SectionField>
            </SectionRow>
          </SectionSubsection>

          <SectionDivider label="Labeled horizontal divider" />

          <SectionRow dividers>
            <SectionField>
              <span className="text-xs text-[#6B7280]">SectionRow dividers</span>
              <p className="text-lg font-bold text-[#202020]">Item A</p>
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">&nbsp;</span>
              <p className="text-lg font-bold text-[#202020]">Item B</p>
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">&nbsp;</span>
              <p className="text-lg font-bold text-[#202020]">Item C</p>
            </SectionField>
          </SectionRow>
        </SectionContent>
      </Section>

      {/* Collapsible with all three divider styles */}
      <Section {...args} collapsible divider dividerStyle="solid">
        <SectionHeader
          icon={<Users size={18} />}
          title="Collapsible + divider + dividerStyle"
          description="solid (default) — toggle to see the rule appear/disappear"
        />
        <SectionContent>
          <SectionRow columns={2}>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Field 1</span>
              <Input placeholder="value" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Field 2</span>
              <Input placeholder="value" />
            </SectionField>
          </SectionRow>
        </SectionContent>
      </Section>
    </div>
  ),
};
