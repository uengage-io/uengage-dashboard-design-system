import { Tabs } from "@uengage/ui";
import { useState } from "react";

const TABS_MANY = [
  { value: "overview", label: "Overview" },
  { value: "orders", label: "Orders" },
  { value: "menu", label: "Menu" },
  { value: "reviews", label: "Reviews" },
  { value: "offers", label: "Offers" },
  { value: "analytics", label: "Analytics" },
  { value: "settings", label: "Settings" },
];

const TABS_FEW = [
  { value: "details", label: "Details" },
  { value: "history", label: "History" },
  { value: "notes", label: "Notes" },
];

const MOCK_CONTENT: Record<string, { title: string; lines: string[] }> = {
  overview: {
    title: "Restaurant Overview",
    lines: ["Total revenue ₹1,24,800", "Orders today: 38", "Avg. rating 4.6 ★"],
  },
  orders: {
    title: "Recent Orders",
    lines: ["#1042 — Butter Naan ×2", "#1041 — Paneer Tikka ×1", "#1040 — Mango Lassi ×3"],
  },
  menu: {
    title: "Menu Items",
    lines: ["Dal Makhani — ₹220", "Paneer Butter Masala — ₹280", "Gulab Jamun — ₹90"],
  },
  reviews: {
    title: "Customer Reviews",
    lines: ["★★★★★ Great food!", "★★★★☆ Fast delivery", "★★★★★ Will order again"],
  },
  offers: {
    title: "Active Offers",
    lines: ["20% off on orders above ₹500", "Buy 1 Get 1 on Desserts", "Free delivery Mondays"],
  },
  analytics: {
    title: "Analytics",
    lines: ["Peak hour: 7–9 PM", "Top item: Butter Chicken", "Repeat customers: 62%"],
  },
  settings: {
    title: "Settings",
    lines: ["Auto-accept orders: ON", "Prep time: 20 min", "Closed on: Sundays"],
  },
  details: {
    title: "Item Details",
    lines: ["SKU: ITEM-0091", "Category: Main Course", "Available: Yes"],
  },
  history: {
    title: "Order History",
    lines: ["Jun 14 — ₹3,200", "Jun 13 — ₹2,850", "Jun 12 — ₹4,100"],
  },
  notes: {
    title: "Notes",
    lines: ["Check packaging quality", "Update photo for Dal", "Add vegan tag"],
  },
};

function MockContent({ value }: { value: string }) {
  const content = MOCK_CONTENT[value] ?? { title: value, lines: [] };
  return (
    <div className="flex flex-col gap-3 p-4">
      <p className="text-[13px] font-semibold text-[#111827]">{content.title}</p>
      <div className="flex flex-col gap-2">
        {content.lines.map((line) => (
          <div
            key={line}
            className="flex items-center gap-2 rounded-[10px] border border-[#F3F4F6] bg-white px-3 py-2.5 text-[12px] text-[#374151] shadow-sm"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0b652d]" />
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[390px] rounded-[48px] bg-[#1C1C1E] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.45),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
      {/* Side buttons */}
      <div className="absolute -left-[3px] top-[120px] h-[36px] w-[3px] rounded-l-full bg-[#3A3A3C]" />
      <div className="absolute -left-[3px] top-[170px] h-[64px] w-[3px] rounded-l-full bg-[#3A3A3C]" />
      <div className="absolute -left-[3px] top-[248px] h-[64px] w-[3px] rounded-l-full bg-[#3A3A3C]" />
      <div className="absolute -right-[3px] top-[170px] h-[80px] w-[3px] rounded-r-full bg-[#3A3A3C]" />

      {/* Screen */}
      <div className="overflow-hidden rounded-[40px] bg-[#F6F8FB]">
        {/* Status bar */}
        <div className="flex items-center justify-between bg-white px-6 pt-3 pb-1">
          <span className="text-[12px] font-semibold text-[#111827]">9:41</span>
          <div className="absolute left-1/2 top-[18px] h-[28px] w-[120px] -translate-x-1/2 rounded-full bg-[#1C1C1E]" />
          <div className="flex items-center gap-1">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="3" width="3" height="9" rx="1" fill="#111827" />
              <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#111827" />
              <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#111827" />
              <rect x="13.5" y="0.5" width="3" height="11.5" rx="1" fill="#111827" opacity="0.3" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M8 2.4C10.3 2.4 12.4 3.4 13.8 5L15.2 3.5C13.4 1.6 10.9 0.5 8 0.5C5.1 0.5 2.6 1.6 0.8 3.5L2.2 5C3.6 3.4 5.7 2.4 8 2.4Z" fill="#111827" />
              <path d="M8 5.2C9.5 5.2 10.9 5.8 11.9 6.9L13.3 5.4C11.9 3.9 10 3 8 3C6 3 4.1 3.9 2.7 5.4L4.1 6.9C5.1 5.8 6.5 5.2 8 5.2Z" fill="#111827" />
              <circle cx="8" cy="10" r="2" fill="#111827" />
            </svg>
            <div className="flex items-center gap-0.5">
              <div className="h-[11px] w-[22px] rounded-[3px] border border-[#111827] p-[1.5px]">
                <div className="h-full w-[70%] rounded-[1.5px] bg-[#111827]" />
              </div>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default function TabsPreview() {
  const [mobileTab, setMobileTab] = useState("overview");
  const [mobileFewTab, setMobileFewTab] = useState("details");
  const [desktopTab, setDesktopTab] = useState("overview");
  const [desktopSecondaryTab, setDesktopSecondaryTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-8">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
            Component Preview
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#111827]">Tabs</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Dynamic overflow — tabs that don't fit the viewport move into a "More Options" dropdown automatically. No scroll.
          </p>
        </div>

        {/* ── Mobile Preview ── */}
        <section>
          <div className="mb-6">
            <h2 className="text-base font-semibold text-[#111827]">Mobile Preview</h2>
            <p className="text-sm text-[#6B7280]">
              The component measures available width and dynamically computes how many tabs fit. Overflow tabs go into the dropdown — no horizontal scroll.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-12">
            {/* Phone 1 — many tabs, dynamic overflow */}
            <div className="flex flex-col items-center gap-4">
              <PhoneFrame>
                {/* App header */}
                <div className="flex items-center justify-between border-b border-[#F3F4F6] bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#0b652d]">
                      <span className="text-[11px] font-bold text-white">R</span>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold leading-tight text-[#111827]">Rajdhani Kitchen</p>
                      <p className="text-[11px] leading-tight text-[#6B7280]">Restaurant Dashboard</p>
                    </div>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F4F6]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="#374151" strokeWidth="1.5" />
                      <path d="M5 7h4M7 5v4" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Tabs — no visibleTabLimit, dynamic calculation */}
                <div className="bg-white">
                  <Tabs
                    variant="primary"
                    value={mobileTab}
                    tabs={TABS_MANY}
                    overflowLabel="More"
                    onChange={setMobileTab}
                    showBottomBorder
                  />
                </div>

                {/* Content */}
                <div className="h-[440px] overflow-y-auto">
                  <MockContent value={mobileTab} />
                </div>
              </PhoneFrame>
              <p className="text-center text-xs font-medium text-[#6B7280]">
                7 tabs — dynamic overflow (no <code className="rounded bg-[#F3F4F6] px-1">visibleTabLimit</code>)
              </p>
            </div>

            {/* Phone 2 — few tabs, all fit */}
            <div className="flex flex-col items-center gap-4">
              <PhoneFrame>
                {/* App header */}
                <div className="flex items-center gap-3 border-b border-[#F3F4F6] bg-white px-4 py-3">
                  <button className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F4F6]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 11L5 7l4-4" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div>
                    <p className="text-[13px] font-semibold leading-tight text-[#111827]">Item #1042</p>
                    <p className="text-[11px] leading-tight text-[#6B7280]">Butter Chicken — ₹320</p>
                  </div>
                </div>

                {/* Tabs — 3 tabs, all fit, no overflow */}
                <div className="bg-white">
                  <Tabs
                    variant="primary"
                    value={mobileFewTab}
                    tabs={TABS_FEW}
                    overflowLabel="More"
                    onChange={setMobileFewTab}
                    showBottomBorder
                  />
                </div>

                {/* Content */}
                <div className="h-[440px] overflow-y-auto">
                  <MockContent value={mobileFewTab} />
                </div>
              </PhoneFrame>
              <p className="text-center text-xs font-medium text-[#6B7280]">
                3 tabs — all fit, no overflow button
              </p>
            </div>
          </div>
        </section>

        {/* ── Desktop Preview ── */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-[#111827]">Desktop — Primary</h2>
            <p className="text-sm text-[#6B7280]">Expands to fill available width; overflow moves to dropdown.</p>
          </div>
          <Tabs
            variant="primary"
            value={desktopTab}
            tabs={TABS_MANY}
            overflowLabel="More Options"
            onChange={setDesktopTab}
            showBottomBorder
          />
          <div className="mt-3 rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#374151]">
            Active tab: <strong>{desktopTab}</strong>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-[#111827]">Desktop — Secondary (pill)</h2>
            <p className="text-sm text-[#6B7280]">Animated background slab, rounded pill container.</p>
          </div>
          <Tabs
            variant="secondary"
            value={desktopSecondaryTab}
            tabs={TABS_MANY}
            visibleTabLimit={5}
            overflowLabel="More Options"
            onChange={setDesktopSecondaryTab}
          />
          <div className="mt-3 rounded-[12px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#374151]">
            Active tab: <strong>{desktopSecondaryTab}</strong>
          </div>
        </section>

      </div>
    </div>
  );
}
