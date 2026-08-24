import { useState } from "react";
import { Sidebar, Select, DatePicker, Button } from "@uengage/ui";
import type { DateRange } from "@uengage/ui";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  BarChart2,
  Settings,
  Bell,
  Search,
  CalendarDays,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Wallet,
  User,
} from "lucide-react";

// ── Options ───────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "dispatched", label: "Dispatched" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const CITY_OPTIONS = [
  { value: "chd", label: "Chandigarh" },
  { value: "del", label: "Delhi" },
  { value: "bom", label: "Mumbai" },
  { value: "blr", label: "Bengaluru" },
  { value: "hyd", label: "Hyderabad" },
  { value: "maa", label: "Chennai" },
];

const PAYMENT_OPTIONS = [
  { value: "all", label: "All Payments" },
  { value: "cod", label: "Cash on Delivery" },
  { value: "prepaid", label: "Prepaid" },
  { value: "wallet", label: "Wallet" },
  { value: "card", label: "Card" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "high", label: "Amount: High → Low" },
  { value: "low", label: "Amount: Low → High" },
];

// ── Nav items ─────────────────────────────────────────────────────────────────

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, page: "dashboard" },
  { label: "Orders", icon: ShoppingCart, page: "orders" },
  { label: "Customers", icon: Users, page: "customers" },
  { label: "Inventory", icon: Package, page: "inventory" },
  { label: "Analytics", icon: BarChart2, page: "analytics" },
  { label: "Settings", icon: Settings, page: "settings" },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ title, value, delta, up }: { title: string; value: string; delta: string; up: boolean }) {
  return (
    <div className="rounded-xl border border-[#C8E7B8] bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-[#003C1B]">{value}</p>
      <p className={`mt-1 text-xs font-medium ${up ? "text-emerald-600" : "text-red-500"}`}>
        {delta} vs last period
      </p>
    </div>
  );
}

// ── Main demo ─────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const [activePage, setActivePage] = useState("orders");
  const [navOpen, setNavOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter state
  const [status, setStatus] = useState<string | string[]>("all");
  const [cities, setCities] = useState<string | string[]>([]);
  const [payment, setPayment] = useState<string | string[]>("all");
  const [sort, setSort] = useState<string | string[]>("newest");
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [singleDate, setSingleDate] = useState<Date | null>(null);

  const activeNav = NAV.find((n) => n.page === activePage);

  const hasActiveFilters =
    status !== "all" ||
    payment !== "all" ||
    sort !== "newest" ||
    (Array.isArray(cities) && cities.length > 0) ||
    !!dateRange ||
    !!singleDate;

  const resetFilters = () => {
    setStatus("all");
    setCities([]);
    setPayment("all");
    setSort("newest");
    setDateRange(null);
    setSingleDate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Top header ─────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-[60px] items-center justify-between border-b border-gray-200 bg-white px-5 shadow-sm">
        {/* Left: nav trigger + brand */}
        <div className="flex items-center gap-3">
          <Sidebar
            open={navOpen}
            onOpenChange={setNavOpen}
            side="left"
            size="sm"
            overlay
            closeOnOutsideClick
            heading={
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#003C1B]">
                  <span className="text-xs font-bold text-white">UE</span>
                </div>
                <span className="text-sm font-bold text-[#003C1B]">uEngage</span>
              </div>
            }
            closeIcon
            divider
            trigger={
              <button className="rounded-lg p-2 hover:bg-[#E3F5E3]" aria-label="Open navigation">
                <SlidersHorizontal size={18} color="#003C1B" />
              </button>
            }
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-1 p-3">
              {NAV.map(({ label, icon: Icon, page }) => (
                <button
                  key={page}
                  onClick={() => { setActivePage(page); setNavOpen(false); }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activePage === page
                      ? "bg-[#003C1B] text-white"
                      : "text-gray-600 hover:bg-[#F0FAF0] hover:text-[#003C1B]"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </nav>

            {/* Sidebar footer */}
            <div className="absolute bottom-0 inset-x-0 border-t border-gray-100 px-4 py-3">
              <div className="flex items-center gap-2 rounded-lg bg-[#F0FAF0] px-3 py-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#003C1B] text-white">
                  <User size={13} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#003C1B]">Aman Preet</p>
                  <p className="text-[10px] text-gray-400">Admin</p>
                </div>
              </div>
            </div>
          </Sidebar>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#003C1B]">
              <span className="text-xs font-bold text-white">UE</span>
            </div>
            <span className="hidden text-base font-bold text-[#003C1B] sm:block">uEngage</span>
          </div>
        </div>

        {/* Center: outlet switcher */}
        <button className="flex items-center gap-2 rounded-lg border border-[#C8E7B8] bg-white px-3 py-1.5 text-sm font-medium text-[#003C1B] shadow-sm hover:bg-[#F0FAF0]">
          <div className="h-4 w-4 rounded-full bg-[#C8E7B8]" />
          Burger Bros — Koramangala
          <ChevronDown size={13} className="text-gray-400" />
        </button>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-lg border border-[#C8E7B8] bg-white px-3 py-1.5 text-sm font-semibold text-[#003C1B] sm:flex">
            <Wallet size={13} />₹ 2,450
          </div>
          <button className="rounded-full p-2 hover:bg-[#E3F5E3]">
            <Search size={17} color="#003C1B" />
          </button>
          <button className="relative rounded-full p-2 hover:bg-[#E3F5E3]">
            <Bell size={17} color="#003C1B" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003C1B] text-white">
            <User size={14} />
          </button>
        </div>
      </header>

      {/* ── Page content ───────────────────────────────────────────────── */}
      <main className="pt-[60px]">
        <div className="p-6">

          {/* Page heading row */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs text-gray-400 uppercase tracking-wide">
                uEngage / {activeNav?.label}
              </p>
              <h1 className="text-2xl font-bold text-[#003C1B]">{activeNav?.label ?? "Dashboard"}</h1>
            </div>

            {/* Filter sidebar trigger */}
            <Sidebar
              open={filterOpen}
              onOpenChange={setFilterOpen}
              side="right"
              size="md"
              overlay
              closeOnOutsideClick
              heading="Filters & Date"
              closeIcon
              divider
              trigger={
                <Button variant="secondary">
                  <Filter size={14} className="mr-1.5" />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#003C1B] text-[10px] font-bold text-white">
                      !
                    </span>
                  )}
                </Button>
              }
            >
              <div className="flex flex-col gap-5 p-4 pb-24">

                {/* Date pickers */}
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Date
                  </p>
                  <div className="flex flex-col gap-4">
                    <DatePicker
                      label="Date Range"
                      mode="range"
                      value={dateRange}
                      onChange={(v) => setDateRange(v as DateRange | null)}
                      placeholder="Start → End"
                      clearable
                      helperText="Filter orders by a date range."
                      width="w-full"
                    />
                    <DatePicker
                      label="Specific Date"
                      mode="single"
                      value={singleDate}
                      onChange={(v) => setSingleDate(v as Date | null)}
                      placeholder="Pick a date"
                      clearable
                      width="w-full"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* Dropdowns */}
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    Order Filters
                  </p>
                  <div className="flex flex-col gap-4">
                    <Select
                      label="Order Status"
                      options={STATUS_OPTIONS}
                      value={typeof status === "string" ? status : ""}
                      onChange={setStatus}
                      mode="single"
                      placeholder="All Orders"
                      width="w-full"
                    />
                    <Select
                      label="Cities"
                      options={CITY_OPTIONS}
                      value={Array.isArray(cities) ? cities : []}
                      onChange={setCities}
                      mode="multi"
                      placeholder="All Cities"
                      clearable
                      width="w-full"
                    />
                    <Select
                      label="Payment Mode"
                      options={PAYMENT_OPTIONS}
                      value={typeof payment === "string" ? payment : ""}
                      onChange={setPayment}
                      mode="single"
                      placeholder="All Payments"
                      width="w-full"
                    />
                    <Select
                      label="Sort By"
                      options={SORT_OPTIONS}
                      value={typeof sort === "string" ? sort : ""}
                      onChange={setSort}
                      mode="single"
                      width="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Sticky footer */}
              <div className="absolute bottom-0 inset-x-0 border-t border-gray-100 bg-white px-4 py-3 flex gap-2">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => setFilterOpen(false)}
                >
                  Apply Filters
                </Button>
                <Button variant="secondary" onClick={resetFilters}>
                  Reset
                </Button>
              </div>
            </Sidebar>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400">Active:</span>
              {status !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#003C1B] px-2.5 py-0.5 text-xs font-medium text-white">
                  <CalendarDays size={10} />
                  {STATUS_OPTIONS.find((o) => o.value === status)?.label}
                </span>
              )}
              {Array.isArray(cities) && cities.length > 0 && (
                <span className="inline-flex items-center rounded-full bg-[#003C1B] px-2.5 py-0.5 text-xs font-medium text-white">
                  {cities.length} {cities.length === 1 ? "city" : "cities"}
                </span>
              )}
              {payment !== "all" && (
                <span className="inline-flex items-center rounded-full bg-[#003C1B] px-2.5 py-0.5 text-xs font-medium text-white">
                  {PAYMENT_OPTIONS.find((o) => o.value === payment)?.label}
                </span>
              )}
              {dateRange?.from && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#003C1B] px-2.5 py-0.5 text-xs font-medium text-white">
                  <CalendarDays size={10} />
                  {dateRange.from.toLocaleDateString()} – {dateRange.to?.toLocaleDateString() ?? "…"}
                </span>
              )}
              {singleDate && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#003C1B] px-2.5 py-0.5 text-xs font-medium text-white">
                  <CalendarDays size={10} />
                  {singleDate.toLocaleDateString()}
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-gray-400 underline hover:text-gray-600"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard title="Total Orders" value="1,284" delta="+12%" up />
            <StatCard title="Revenue" value="₹ 84,320" delta="+8%" up />
            <StatCard title="Avg. Order Value" value="₹ 657" delta="−3%" up={false} />
          </div>

          {/* Recent orders table */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="font-semibold text-gray-700">Recent Orders</h2>
              <span className="text-xs text-gray-400">Showing last 5 orders</span>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { id: "#4521", customer: "Ravi Sharma", amount: "₹ 340", status: "Delivered", date: "Today, 2:30 PM" },
                { id: "#4520", customer: "Priya Mehta", amount: "₹ 890", status: "Dispatched", date: "Today, 1:15 PM" },
                { id: "#4519", customer: "Arun Kumar", amount: "₹ 210", status: "Confirmed", date: "Today, 11:40 AM" },
                { id: "#4518", customer: "Sneha Iyer", amount: "₹ 1,200", status: "Delivered", date: "Yesterday" },
                { id: "#4517", customer: "Vikram Nair", amount: "₹ 460", status: "Cancelled", date: "Yesterday" },
              ].map((row) => (
                <div key={row.id} className="flex items-center justify-between px-5 py-3 text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-[#003C1B]">{row.id}</span>
                    <span>{row.customer}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-gray-400">{row.date}</span>
                    <span className="w-20 text-right font-medium text-gray-800">{row.amount}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        row.status === "Delivered"
                          ? "bg-emerald-50 text-emerald-700"
                          : row.status === "Dispatched"
                          ? "bg-blue-50 text-blue-700"
                          : row.status === "Confirmed"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
