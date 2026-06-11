import { useState } from "react";
import {
  Section,
  SectionHeader,
  SectionContent,
  SectionSubsection,
  SectionRow,
  SectionField,
  SectionDivider,
} from "@uengage/ui";
import { Input } from "@uengage/ui";
import { Select } from "@uengage/ui";
import { Button } from "@uengage/ui";
import {
  Building2,
  MapPin,
  Settings,
  Clock,
  CreditCard,
  ChevronRight,
} from "lucide-react";

// ─── Demo: Business Details (matches the prototype screenshot) ────────────────

function BusinessDetailsDemo() {
  const [status, setStatus] = useState<string | string[]>("active");

  return (
    <Section className="max-w-4xl">
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
              <Button variant="secondary" size="sm">
                ✏ Update logo
              </Button>
            </div>
          </SectionField>
        </SectionRow>
      </SectionContent>
    </Section>
  );
}

// ─── Demo: Advanced Settings with subsections + dividers ─────────────────────

function AdvancedSettingsDemo() {
  return (
    <Section className="max-w-4xl">
      <SectionHeader
        icon={<Settings size={18} />}
        title="Advanced Settings"
        description="Configure detailed platform options for your outlet"
        action={
          <Button variant="primary" size="sm">
            Save Changes
          </Button>
        }
      />
      <SectionContent>
        {/* First subsection — no separator above first block */}
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
              <span className="text-xs text-[#6B7280]">Base Delivery Charge (₹)</span>
              <Input placeholder="e.g. 30" />
            </SectionField>
            <SectionField>
              <span className="text-xs text-[#6B7280]">Free Delivery Above (₹)</span>
              <Input placeholder="e.g. 500" />
            </SectionField>
          </SectionRow>
        </SectionSubsection>

        <SectionSubsection
          separatorLabel="Timing"
          title="Operating Hours"
          description="Default open and close times"
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
  );
}

// ─── Demo: Location & Contact with header action ──────────────────────────────

function LocationContactDemo() {
  return (
    <Section className="max-w-4xl">
      <SectionHeader
        icon={<MapPin size={18} />}
        title="Location & Contact"
        action={
          <Button variant="secondary" size="sm">
            Edit
          </Button>
        }
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
  );
}

// ─── Demo: Plain divider (no label) ──────────────────────────────────────────

function PaymentDemo() {
  return (
    <Section className="max-w-4xl">
      <SectionHeader
        icon={<CreditCard size={18} />}
        title="Payment Settings"
      />
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

        <SectionDivider />

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
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function SectionPreview() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 flex flex-col gap-5">
      <div className="max-w-4xl">
        <h1 className="text-xl font-bold text-[#202020] mb-1">Section Component</h1>
        <p className="text-sm text-[#6B7280] mb-6">
          Card-style section containers with headers, field grids, dividers, and subsections.
        </p>
      </div>

      <BusinessDetailsDemo />
      <AdvancedSettingsDemo />
      <LocationContactDemo />
      <PaymentDemo />
    </div>
  );
}
