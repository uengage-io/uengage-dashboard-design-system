import { Table } from "@uengage/ui";
import type { ColumnDef } from "@uengage/ui";

type Order = {
  id: number;
  orderNo: string;
  customer: string;
  phone: string;
  items: string;
  amount: string;
  status: "delivered" | "pending" | "cancelled";
  date: string;
};

const STATUS_STYLES = {
  delivered: "bg-green-50 text-green-700 border border-green-200",
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  cancelled: "bg-red-50 text-red-600 border border-red-200",
} as const;

const STATUS_DOT = {
  delivered: "bg-green-500",
  pending: "bg-yellow-400",
  cancelled: "bg-red-500",
} as const;

const ORDERS: Order[] = [
  {
    id: 1,
    orderNo: "#1042",
    customer: "Priya Sharma",
    phone: "98100-12345",
    items: "Dal Makhani ×2, Naan ×4",
    amount: "₹680",
    status: "delivered",
    date: "Jun 14",
  },
  {
    id: 2,
    orderNo: "#1043",
    customer: "Rohit Verma",
    phone: "99900-54321",
    items: "Paneer Tikka ×1, Lassi ×2",
    amount: "₹420",
    status: "pending",
    date: "Jun 14",
  },
  {
    id: 3,
    orderNo: "#1044",
    customer: "Neha Gupta",
    phone: "87700-11223",
    items: "Butter Chicken ×1, Rice ×2",
    amount: "₹540",
    status: "delivered",
    date: "Jun 13",
  },
  {
    id: 4,
    orderNo: "#1045",
    customer: "Arjun Mehta",
    phone: "91100-33445",
    items: "Chole Bhature ×2",
    amount: "₹280",
    status: "cancelled",
    date: "Jun 13",
  },
  {
    id: 5,
    orderNo: "#1046",
    customer: "Divya Singh",
    phone: "96600-77889",
    items: "Gulab Jamun ×4, Chai ×2",
    amount: "₹190",
    status: "pending",
    date: "Jun 13",
  },
];

const COLUMNS: ColumnDef<Order>[] = [
  {
    key: "orderNo",
    header: "Order",
    minWidth: 80,
    flex: 0.8,
  },
  {
    key: "customer",
    header: "Customer",
    minWidth: 120,
    flex: 1.4,
    sortable: true,
  },
  {
    key: "phone",
    header: "Phone",
    minWidth: 110,
    flex: 1,
    hideOnMobile: true,
  },
  {
    key: "items",
    header: "Items",
    minWidth: 180,
    flex: 2,
    hideOnMobile: true,
  },
  {
    key: "amount",
    header: "Amount",
    minWidth: 80,
    flex: 0.8,
    align: "right",
    sortable: true,
    render: (v: string) => (
      <span className="font-semibold text-gray-900">{v}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    minWidth: 90,
    flex: 0.9,
    align: "center",
    render: (v: "delivered" | "pending" | "cancelled") => (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[v]}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[v]}`} />
        {v.charAt(0).toUpperCase() + v.slice(1)}
      </span>
    ),
  },
  {
    key: "date",
    header: "Date",
    minWidth: 70,
    flex: 0.7,
    align: "right",
    hideOnMobile: true,
    render: (v: string) => <span className="text-gray-500">{v}</span>,
  },
];

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[390px] rounded-[48px] bg-[#1C1C1E] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.45),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
      <div className="absolute -left-[3px] top-[120px] h-[36px] w-[3px] rounded-l-full bg-[#3A3A3C]" />
      <div className="absolute -left-[3px] top-[170px] h-[64px] w-[3px] rounded-l-full bg-[#3A3A3C]" />
      <div className="absolute -left-[3px] top-[248px] h-[64px] w-[3px] rounded-l-full bg-[#3A3A3C]" />
      <div className="absolute -right-[3px] top-[170px] h-[80px] w-[3px] rounded-r-full bg-[#3A3A3C]" />
      <div className="overflow-hidden rounded-[40px] bg-[#F6F8FB]">
        {/* Status bar */}
        <div className="relative flex items-center justify-between bg-white px-6 pt-3 pb-1">
          <span className="text-[12px] font-semibold text-[#111827]">9:41</span>
          <div className="absolute left-1/2 top-[14px] h-[26px] w-[110px] -translate-x-1/2 rounded-full bg-[#1C1C1E]" />
          <div className="flex items-center gap-1">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="3" width="3" height="9" rx="1" fill="#111827" />
              <rect x="4.5" y="2" width="3" height="10" rx="1" fill="#111827" />
              <rect
                x="9"
                y="0.5"
                width="3"
                height="11.5"
                rx="1"
                fill="#111827"
              />
              <rect
                x="13.5"
                y="0.5"
                width="3"
                height="11.5"
                rx="1"
                fill="#111827"
                opacity="0.3"
              />
            </svg>
            <div className="h-[11px] w-[22px] rounded-[3px] border border-[#111827] p-[1.5px]">
              <div className="h-full w-[70%] rounded-[1.5px] bg-[#111827]" />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function TablePreview() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] p-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B7280]">
            Component Preview
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#111827]">Table</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Fully responsive — card layout on mobile (1-col xs, 2-col sm), full
            table on desktop.
          </p>
        </div>

        {/* Mobile preview */}
        <section>
          <div className="mb-6">
            <h2 className="text-base font-semibold text-[#111827]">
              Mobile Preview — Card Layout
            </h2>
            <p className="text-sm text-[#6B7280]">
              Each row becomes a labelled card.{" "}
              <code className="rounded bg-[#F3F4F6] px-1 text-[12px]">
                hideOnMobile
              </code>{" "}
              columns (Phone, Items, Date) are omitted to keep cards compact.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-12">
            {/* Phone — cards layout (default) */}
            <div className="flex flex-col items-center gap-4">
              <PhoneFrame>
                <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100">
                  <div>
                    <p className="text-[13px] font-semibold text-[#111827]">
                      Orders
                    </p>
                    <p className="text-[11px] text-[#6B7280]">
                      Today · 5 orders
                    </p>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F4F6]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 4h10M2 7h7M2 10h5"
                        stroke="#374151"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="h-[520px] overflow-y-auto p-3">
                  <Table
                    columns={COLUMNS}
                    data={ORDERS}
                    keyField="id"
                    bordered={false}
                    size="sm"
                    mobileLayout="cards"
                    onRowClick={(row) => console.log(row)}
                  />
                </div>
              </PhoneFrame>
              <p className="text-center text-xs font-medium text-[#6B7280]">
                Default —{" "}
                <code className="rounded bg-[#F3F4F6] px-1">
                  mobileLayout="cards"
                </code>
              </p>
            </div>

            {/* Phone — scroll layout for comparison */}
            <div className="flex flex-col items-center gap-4">
              <PhoneFrame>
                <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100">
                  <div>
                    <p className="text-[13px] font-semibold text-[#111827]">
                      Orders
                    </p>
                    <p className="text-[11px] text-[#6B7280]">
                      Scroll layout (opt-in)
                    </p>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F4F6]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 4h10M2 7h7M2 10h5"
                        stroke="#374151"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="h-[520px] overflow-hidden">
                  <Table
                    columns={COLUMNS}
                    data={ORDERS}
                    keyField="id"
                    bordered={false}
                    size="sm"
                    mobileLayout="scroll"
                  />
                </div>
              </PhoneFrame>
              <p className="text-center text-xs font-medium text-[#6B7280]">
                Opt-in —{" "}
                <code className="rounded bg-[#F3F4F6] px-1">
                  mobileLayout="scroll"
                </code>
              </p>
            </div>
          </div>
        </section>

        {/* Desktop preview */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-[#111827]">
              Desktop — Full Table
            </h2>
            <p className="text-sm text-[#6B7280]">
              All columns visible, sortable headers, sticky header with max
              height.
            </p>
          </div>
          <Table
            columns={COLUMNS}
            data={ORDERS}
            keyField="id"
            bordered
            stickyHeader
            maxHeight="360px"
            size="md"
            onRowClick={(row) => console.log("clicked", row)}
          />
        </section>

        {/* Loading state */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-[#111827]">
              Loading State
            </h2>
            <p className="text-sm text-[#6B7280]">
              Skeleton shimmer matches the card and table layouts.
            </p>
          </div>
          <Table
            columns={COLUMNS}
            data={[]}
            keyField="id"
            loading
            bordered
            size="md"
          />
        </section>

        {/* Empty state */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-[#111827]">
              Empty State
            </h2>
          </div>
          <Table
            columns={COLUMNS}
            data={[]}
            keyField="id"
            bordered
            size="md"
            emptyMessage="No orders found for this date range."
          />
        </section>
      </div>
    </div>
  );
}
