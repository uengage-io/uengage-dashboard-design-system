import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Clock,
  CreditCard,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Table } from "./Table";
import { StatusBadge } from "../StatusBadge";
import type { ColumnDef, CustomTableProps } from "../../../types/table";

/* ── Mock data ────────────────────────────────────────────────── */

type Status = "Allocated" | "Redeemed";

interface OrderRow {
  id: string;
  phone: string;
  customerName: string;
  status: Status;
  amount: number;
  date: string;
  address: string;
  orderId: string;
  remarks: string;
}

const BASE: Omit<OrderRow, "id" | "status" | "amount"> = {
  phone: "95011 74711",
  customerName: "Aniruddh Yadav",
  date: "19 Mar,2025 3:00am",
  address: "505 Willow Dr, Rio de Janeiro, Rio de Janeiro, Greater Kailash",
  orderId: "3102790000",
  remarks: "505 Willow Dr, Rio de Janeiro, Rio de Janeiro, Greater",
};

const ROWS: OrderRow[] = [
  { id: "r1", ...BASE, status: "Allocated", amount: 12000 },
  { id: "r2", ...BASE, status: "Redeemed", amount: 6000 },
  { id: "r3", ...BASE, status: "Redeemed", amount: 6000 },
  { id: "r4", ...BASE, status: "Allocated", amount: 12000 },
  { id: "r5", ...BASE, status: "Allocated", amount: 12000 },
];

const LONG_ROWS: OrderRow[] = Array.from({ length: 10 }).map((_, i) => ({
  ...BASE,
  id: `long-${i}`,
  status: i % 2 === 0 ? "Allocated" : "Redeemed",
  amount: i % 2 === 0 ? 12000 : 6000,
}));

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ── Column renderers ─────────────────────────────────────────── */

const renderCustomer = (_: unknown, row: OrderRow) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-gray-900">
      <Phone className="h-3.5 w-3.5 text-gray-400" />
      <span className="font-semibold">{row.phone}</span>
    </div>
    <div className="flex items-center gap-2 text-gray-700">
      <User className="h-3.5 w-3.5 text-gray-400" />
      <span className="font-semibold">{row.customerName}</span>
    </div>
  </div>
);

const renderAmount = (_: unknown, row: OrderRow) => {
  const variant = row.status === "Allocated" ? "allocated" : "redeemed";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <StatusBadge
          variant={"success"}
          label={row.status}
          icon={<CreditCard className="h-3 w-3" />}
        />
        <span className="font-semibold text-gray-900">
          {formatINR(row.amount)}
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Clock className="h-3.5 w-3.5 text-gray-400" />
        <span>{row.date}</span>
      </div>
    </div>
  );
};

const renderLocation = (_: unknown, row: OrderRow) => (
  <div className="flex items-start gap-2 text-gray-700">
    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
    <span className="whitespace-normal">{row.address}</span>
  </div>
);

const renderOrderRemarks = (_: unknown, row: OrderRow) => (
  <div className="flex flex-col gap-1">
    <span className="font-semibold text-gray-900">{row.orderId}</span>
    <span className="whitespace-normal text-gray-600">{row.remarks}</span>
  </div>
);

const BASE_COLUMNS: ColumnDef<OrderRow>[] = [
  {
    key: "customerName",
    header: "Customer Detail",
    flex: 1,
    render: renderCustomer,
  },
  {
    key: "amount",
    header: "Amount Detail",
    flex: 1.2,
    render: renderAmount,
  },
  {
    key: "address",
    header: "Location",
    flex: 1.5,
    render: renderLocation,
  },
  {
    key: "orderId",
    header: "Order Id / Remarks",
    flex: 1.3,
    render: renderOrderRemarks,
  },
];

const SORTABLE_COLUMNS: ColumnDef<OrderRow>[] = BASE_COLUMNS.map((c, i) =>
  i === 2 ? c : { ...c, sortable: true },
);

const RESPONSIVE_COLUMNS: ColumnDef<OrderRow>[] = BASE_COLUMNS.map((c, i) =>
  i >= 2 ? { ...c, hideOnMobile: true } : c,
);

/* ── Meta ─────────────────────────────────────────────────────── */

// Storybook's Meta<typeof X> can't carry through component generics, so wrap
// CustomTable in a concrete OrderRow-typed component for story typing.
const OrderTable = (props: CustomTableProps<OrderRow>) => (
  <Table {...props} />
);

const meta = {
  title: "Components/Table",
  component: OrderTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Generic, typed table built on shadcn Table. CVA-driven size/border variants, built-in sort (asc → desc → cleared), sticky header + max-height scroll, loading and empty states, responsive column hiding, and optional row click handling.",
      },
    },
  },
} satisfies Meta<typeof OrderTable>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Stories ──────────────────────────────────────────────────── */

export const Default: Story = {
  args: {
    columns: BASE_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
    size: "md",
  },
};

export const Unbordered: Story = {
  args: {
    columns: BASE_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: false,
    size: "md",
  },
};

export const Small: Story = {
  args: { ...Default.args!, size: "sm", data: ROWS.slice(0, 3) },
};

export const Large: Story = {
  args: { ...Default.args!, size: "lg", data: ROWS.slice(0, 3) },
};

export const Loading: Story = {
  args: {
    columns: BASE_COLUMNS,
    data: [],
    keyField: "id",
    loading: true,
    bordered: true,
  },
};

export const Empty: Story = {
  args: {
    columns: BASE_COLUMNS,
    data: [],
    keyField: "id",
    emptyMessage: "No transactions yet — try a different date range.",
    bordered: true,
  },
};

export const StickyHeader: Story = {
  args: {
    columns: BASE_COLUMNS,
    data: LONG_ROWS,
    keyField: "id",
    bordered: true,
    stickyHeader: true,
    maxHeight: "400px",
  },
};

export const Sortable: Story = {
  args: {
    columns: SORTABLE_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
  },
};

export const ResponsiveHideOnMobile: Story = {
  args: {
    columns: RESPONSIVE_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Columns marked `hideOnMobile: true` collapse below the Tailwind `md` breakpoint (≤768px). Resize the Storybook viewport to observe.",
      },
    },
  },
};

export const Clickable: Story = {
  render: (args) => {
    const [last, setLast] = useState<OrderRow | null>(null);
    return (
      <div className="space-y-3">
        <Table
          {...args}
          onRowClick={(row) => setLast(row)}
        />
        <div className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700">
          Last clicked:{" "}
          {last
            ? `${last.id} — ${last.customerName} — ${formatINR(last.amount)}`
            : "(none yet — click a row)"}
        </div>
      </div>
    );
  },
  args: {
    columns: BASE_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
  },
};
