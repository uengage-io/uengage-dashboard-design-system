import { useState } from "react";
import {
  AppHeader,
  AppSidebar,
  type AppSidebarProduct,
  type AppSidebarModule,
} from "@uengage/ui";
import {
  ShoppingCart,
  UtensilsCrossed,
  Package,
  BarChart2,
  Bell,
  Search,
  ChevronDown,
  Menu,
  X,
  User,
  Wallet,
} from "lucide-react";

// ── Dummy data ────────────────────────────────────────────────────────────────

const PRODUCTS: AppSidebarProduct[] = [
  {
    id: "ordering",
    name: "Online Ordering",
    icon: <ShoppingCart size={22} color="#003C1B" />,
  },
  {
    id: "dine",
    name: "Dine In",
    icon: <UtensilsCrossed size={22} color="#003C1B" />,
  },
  {
    id: "inventory",
    name: "Inventory",
    icon: <Package size={22} color="#003C1B" />,
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: <BarChart2 size={22} color="#003C1B" />,
  },
];

const MODULES_BY_PRODUCT: Record<string, AppSidebarModule[]> = {
  ordering: [
    { page: "dashboard", label: "Dashboard" },
    { page: "orders", label: "Orders" },
    { page: "menu", label: "Menu Management" },
    { page: "offers", label: "Offers & Coupons" },
    { page: "customers", label: "Customers" },
    { page: "payments", label: "Payments" },
    { page: "delivery", label: "Delivery Zones" },
    { page: "settings", label: "Settings" },
  ],
  dine: [
    { page: "tables", label: "Table Management" },
    { page: "reservations", label: "Reservations" },
    { page: "kot", label: "KOT / Kitchen" },
    { page: "billing", label: "Billing" },
    { page: "feedback", label: "Feedback" },
  ],
  inventory: [
    { page: "stock", label: "Stock Overview" },
    { page: "purchase", label: "Purchase Orders" },
    { page: "suppliers", label: "Suppliers" },
    { page: "wastage", label: "Wastage Log" },
    { page: "reports", label: "Inventory Reports" },
  ],
  analytics: [
    { page: "sales", label: "Sales Analytics" },
    { page: "traffic", label: "Traffic Sources" },
    { page: "items", label: "Item Performance" },
    { page: "staff", label: "Staff Performance" },
    { page: "export", label: "Export Reports" },
  ],
};

// ── Demo component ────────────────────────────────────────────────────────────

export default function AppLayoutPreview() {
  const [activeProductId, setActiveProductId] = useState<string>("ordering");
  const [activeModulePage, setActiveModulePage] = useState<string>("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const modules = MODULES_BY_PRODUCT[activeProductId] ?? [];

  const handleProductSelect = (product: AppSidebarProduct) => {
    setActiveProductId(String(product.id));
    const firstModule = MODULES_BY_PRODUCT[String(product.id)]?.[0];
    if (firstModule) setActiveModulePage(firstModule.page);
  };

  // ── Header slots ─────────────────────────────────────────────────────────

  const logo = (
    <div className="flex items-center gap-2 px-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#003C1B]">
        <span className="text-sm font-bold text-white">UE</span>
      </div>
      <span className="text-base font-bold text-[#003C1B]">uEngage</span>
    </div>
  );

  const center = (
    <button className="flex items-center gap-2 rounded-lg border border-[#C8E7B8] bg-white px-3 py-2 text-sm font-medium text-[#003C1B] shadow-sm hover:bg-[#F0FAF0]">
      <div className="h-5 w-5 rounded-full bg-[#C8E7B8]" />
      Burger Bros — Koramangala
      <ChevronDown size={14} className="text-gray-400" />
    </button>
  );

  const right = (
    <div className="flex items-center gap-3">
      {/* Wallet */}
      <div className="hidden items-center gap-1 rounded-lg border border-[#C8E7B8] bg-white px-3 py-1.5 text-sm font-semibold text-[#003C1B] sm:flex">
        <Wallet size={14} />
        ₹ 2,450
      </div>
      {/* Search */}
      <button className="rounded-full p-2 hover:bg-[#E3F5E3]">
        <Search size={18} color="#003C1B" />
      </button>
      {/* Notifications */}
      <button className="relative rounded-full p-2 hover:bg-[#E3F5E3]">
        <Bell size={18} color="#003C1B" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>
      {/* Avatar */}
      <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#003C1B] text-white">
        <User size={15} />
      </button>
      {/* Sidebar toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="rounded-full p-2 hover:bg-[#E3F5E3]"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <Menu size={18} color="#003C1B" /> : <X size={18} color="#003C1B" />}
      </button>
    </div>
  );

  // ── Sidebar footer ────────────────────────────────────────────────────────

  const sidebarFooter = (
    <div className="flex items-center justify-center py-3 text-xs text-gray-400">
      v2.4.1 · uEngage Prime
    </div>
  );

  // ── Page content ──────────────────────────────────────────────────────────

  const activeModule = modules.find((m) => m.page === activeModulePage);
  const activeProduct = PRODUCTS.find((p) => p.id === activeProductId);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <AppHeader
        logo={logo}
        center={center}
        right={right}
        logoZoneWidth={252}
        divider
      />

      {/* Sidebar */}
      <AppSidebar
        products={PRODUCTS}
        modules={modules}
        activeProductId={activeProductId}
        activeModulePage={activeModulePage}
        onProductSelect={handleProductSelect}
        onModuleClick={(mod) => setActiveModulePage(mod.page)}
        collapsed={collapsed}
        offsetTop={75}
        footer={sidebarFooter}
      />

      {/* Page content */}
      <main
        className="transition-all duration-[250ms]"
        style={{
          paddingTop: 75,
          paddingLeft: collapsed ? 0 : 240,
        }}
      >
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <span>{activeProduct?.name}</span>
            <span>/</span>
            <span className="font-medium text-[#003C1B]">
              {activeModule?.label ?? "—"}
            </span>
          </div>

          {/* Page heading */}
          <h1 className="mb-6 text-2xl font-bold text-[#003C1B]">
            {activeModule?.label ?? "Select a module"}
          </h1>

          {/* Demo content cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Total Orders", value: "1,284", delta: "+12%" },
              { title: "Revenue", value: "₹ 84,320", delta: "+8%" },
              { title: "Avg. Order Value", value: "₹ 657", delta: "+3%" },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-[#C8E7B8] bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="mt-1 text-2xl font-bold text-[#003C1B]">
                  {card.value}
                </p>
                <p className="mt-1 text-xs font-medium text-emerald-600">
                  {card.delta} vs last week
                </p>
              </div>
            ))}
          </div>

          {/* Placeholder table */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="font-semibold text-gray-700">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {["Order #4521 — ₹ 340", "Order #4520 — ₹ 890", "Order #4519 — ₹ 210", "Order #4518 — ₹ 1,200"].map(
                (row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between px-5 py-3 text-sm text-gray-600"
                  >
                    <span>{row}</span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      Delivered
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
