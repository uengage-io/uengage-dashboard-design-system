import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Clock,
  CreditCard,
  Eye,
  MapPin,
  MoreVertical,
  Phone,
  User,
} from "lucide-react";
import { Table } from "./Table";
import {
  TableActionButton,
  TableIdentityCell,
  TableStatusCell,
} from "./TableCells";
import { StatusBadge } from "../StatusBadge";
import { TABLE_COLORS } from "./tableTokens";
import type {
  ColumnDef,
  CustomTableProps,
  TableSize,
  TableStatusTone,
} from "../../../types/table";

/* ── Mock data ────────────────────────────────────────────────── */

type Status =
  | "Allocated"
  | "Redeemed"
  | "Delivered"
  | "Dispatched"
  | "Preparing"
  | "Cancelled";

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
  channel: string;
  tat: string;
}

const BASE: Omit<OrderRow, "id" | "status" | "amount"> = {
  phone: "95011 74711",
  customerName: "Aniruddh Yadav",
  date: "19 Mar,2025 3:00am",
  address: "505 Willow Dr, Rio de Janeiro, Rio de Janeiro, Greater Kailash",
  orderId: "3102790000",
  remarks: "505 Willow Dr, Rio de Janeiro, Rio de Janeiro, Greater",
  channel: "Website",
  tat: "24 min",
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
          "Generic, typed table built on shadcn Table. Built-in sort (asc → desc → cleared), row selection with bulk actions, per-row lifecycle states, hover-revealed row actions, a pinned identifier column, sticky header (bounded scroll box or full page scroll), loading / empty / error states, responsive column hiding, an in-shell pagination footer, and full keyboard navigation.\n\n**A table is read by scanning down a column, not across a row.** Everything follows from that: numbers right-align on tabular figures, only horizontal rules exist (no vertical grid lines, no zebra striping), and the hover wash spans the whole row.\n\n**Sizes** — `sm` (36px rows, drops the secondary line under a name), `md` (48px, the default) and `lg` (58px).\n\n**Sticky header — two modes:**\n- `stickyHeader` + `maxHeight` — header sticks within a fixed-height, internally scrolling box.\n- `stickyHeader` alone (no `maxHeight`) — header sticks to the top of the viewport as the whole page scrolls.\n\n**Keyboard** — ↑↓ moves the focused row, Space selects it, ⇧+↑↓ and ⇧-click extend the selection, ⌘/Ctrl+A selects the page, ↵ opens the focused row, Esc clears. On by default whenever rows are selectable or clickable; force it with `keyboardNavigation`.\n\n**Per-column props of note:**\n- `verticalAlign?: 'top' | 'middle'` — defaults to `'middle'`, since rows have a fixed height. Use `'top'` on columns that stack several lines.\n- `tabular?: boolean` — tabular figures. Defaults to `true` on right-aligned columns.\n- `identifier?: boolean` — semibold, never truncated, and the column that pins under `stickyFirstColumn`. Inferred for the first column.",
      },
    },
  },
  argTypes: {
    hover: { control: "boolean" },
    bordered: { control: "boolean" },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    mobileLayout: { control: "radio", options: ["scroll", "cards"] },
    stickyHeader: {
      control: "boolean",
      description:
        "Sticks the header row as content scrolls. Pair with `maxHeight` to sticky within a bounded, internally scrolling box; omit `maxHeight` to sticky against the page/viewport as the whole page scrolls.",
    },
    maxHeight: {
      control: "text",
      description:
        "CSS max-height (e.g. `'400px'`) for the table's scroll box. Only takes effect together with `stickyHeader`.",
    },
    columns: {
      control: false,
      description:
        "Array of `ColumnDef<T>` column definitions. Each entry supports:\n\n" +
        "| Prop | Type | Default | Description |\n" +
        "|---|---|---|---|\n" +
        "| `key` | `keyof T \\| string` | — | Data key |\n" +
        "| `header` | `ReactNode` | — | Column header label |\n" +
        "| `flex` | `number` | `1` | Proportional width weight |\n" +
        "| `width` | `string` | — | Explicit CSS width, overrides flex |\n" +
        "| `minWidth` | `number` | — | Min width in px |\n" +
        "| `align` | `'left' \\| 'center' \\| 'right'` | `'left'` | Horizontal text alignment |\n" +
        "| `verticalAlign` | `'top' \\| 'middle'` | `'middle'` | Vertical cell alignment — use `'top'` for cells that stack several lines |\n" +
        "| `render` | `(value, row, index) => ReactNode` | — | Custom cell renderer |\n" +
        "| `sortable` | `boolean` | — | Enables click-to-sort on the header |\n" +
        "| `sortFn` | `(a, b) => number` | — | Custom comparator for that column |\n" +
        "| `tabular` | `boolean` | right-aligned | Tabular figures, so digits stack |\n" +
        "| `identifier` | `boolean` | first column | Semibold, never truncated, pins under `stickyFirstColumn` |\n" +
        "| `hideOnMobile` | `boolean` | — | Hides column below `md` breakpoint |\n" +
        "| `className` | `string` | — | Extra Tailwind classes for `<th>` and `<td>` |",
    },
    selectable: { control: "radio", options: ["none", "single", "multiple"] },
    stickyFirstColumn: { control: "boolean" },
    alwaysShowRowActions: { control: "boolean" },
  },
  args: {
    hover: true,
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

export const HoverDisabled: Story = {
  name: "Hover disabled",
  parameters: {
    docs: {
      description: {
        story: "Pass `hover={false}` to remove the row highlight on hover.",
      },
    },
  },
  args: {
    columns: BASE_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
    size: "md",
    hover: false,
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

export const StickyHeaderPageScroll: Story = {
  name: "Sticky header: page scroll",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Omit `maxHeight` while `stickyHeader` is set and the header sticks to the top of the viewport as the whole page scrolls, instead of only within an inner scroll box. Scroll the canvas to see it in action.",
      },
    },
  },
  render: (args) => (
    <div className="p-6">
      <div className="mb-4 h-[50vh] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-500">
        Scroll down — filler content above the table
      </div>
      <Table {...args} />
      <div className="mt-4 h-[80vh] rounded-md border border-dashed border-gray-300 flex items-center justify-center text-sm text-gray-500">
        Filler content below the table
      </div>
    </div>
  ),
  args: {
    columns: BASE_COLUMNS,
    data: [...LONG_ROWS, ...LONG_ROWS].map((row, i) => ({ ...row, id: `row-${i}` })),
    keyField: "id",
    bordered: true,
    stickyHeader: true,
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

export const VerticalAlignMiddle: Story = {
  name: "Vertical align: middle",
  parameters: {
    docs: {
      description: {
        story:
          "Add `verticalAlign: 'middle'` to any column whose content is shorter than its neighbours (e.g. a single badge or button). Those cells will be centred vertically while taller cells still start at the top.",
      },
    },
  },
  args: {
    columns: [
      {
        key: "customerName",
        header: "Customer Detail",
        flex: 1,
        render: renderCustomer,
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
      {
        key: "status",
        header: "Status",
        flex: 0.6,
        align: "center",
        verticalAlign: "middle",
        render: (_: unknown, row: OrderRow) => (
          <StatusBadge
            variant={row.status === "Allocated" ? "success" : "warning"}
            label={row.status}
          />
        ),
      },
    ] satisfies ColumnDef<OrderRow>[],
    data: ROWS,
    keyField: "id",
    bordered: true,
    size: "md",
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

/* ── Design-system columns ────────────────────────────────────── */

const DS_COLUMNS: ColumnDef<OrderRow>[] = [
  {
    key: "id",
    header: "Order Id",
    width: "112px",
    minWidth: 112,
    sortable: true,
    identifier: true,
    render: (_v, row) => row.orderId,
  },
  {
    key: "customerName",
    header: "Customer",
    flex: 2,
    minWidth: 200,
    sortable: true,
    render: (_v, row) => (
      <TableIdentityCell name={row.customerName} meta={row.phone} />
    ),
  },
  { key: "date", header: "Placed", flex: 1.2, minWidth: 150 },
  {
    key: "amount",
    header: "Amount",
    width: "112px",
    minWidth: 112,
    align: "right",
    sortable: true,
    render: (v: number) => formatINR(v),
  },
  {
    key: "status",
    header: "Status",
    width: "130px",
    minWidth: 130,
    render: (v: Status) => (
      <TableStatusCell tone={v === "Redeemed" ? "success" : "info"}>{v}</TableStatusCell>
    ),
  },
];

const DS_ROW_ACTIONS = () => (
  <>
    <TableActionButton label="View order">
      <Eye className="h-[13px] w-[13px]" />
    </TableActionButton>
    <TableActionButton label="More actions">
      <MoreVertical className="h-[13px] w-[13px]" />
    </TableActionButton>
  </>
);

/* ── Design-system stories ────────────────────────────────────── */

export const Selectable: Story = {
  name: "Selectable + bulk actions",
  parameters: {
    docs: {
      description: {
        story:
          "`selectable=\"multiple\"` adds the checkbox column and a tri-state header box. The moment a row is picked, the bulk-action bar slides in above the header. Keyboard: ↑↓ move, Space selects, ⇧+↑↓ or ⇧-click extends, ⌘/Ctrl+A selects the page, Esc clears.",
      },
    },
  },
  render: (args) => {
    const [keys, setKeys] = useState<string[]>([]);
    return (
      <Table
        {...args}
        selectable="multiple"
        selectedKeys={keys}
        onSelectionChange={setKeys}
        bulkActions={[
          { label: "Mark redeemed", onClick: (rows) => console.log(rows) },
          { label: "Export", onClick: (rows) => console.log(rows) },
          { label: "Cancel orders", tone: "danger", onClick: (rows) => console.log(rows) },
        ]}
      />
    );
  },
  args: {
    columns: DS_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
  },
};

export const RowActions: Story = {
  name: "Row actions",
  parameters: {
    docs: {
      description: {
        story:
          "Icon buttons live in a right-aligned last column and fade in on row hover or focus. Pass `alwaysShowRowActions` to keep them visible.",
      },
    },
  },
  args: {
    columns: DS_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
    rowActions: DS_ROW_ACTIONS,
  },
};

export const RowStates: Story = {
  name: "Row states",
  parameters: {
    docs: {
      description: {
        story:
          "`rowState` tints a row for its lifecycle. A saving row greys; a deleted row greys and strikes for one beat before it leaves. Both stop responding to hover, click and selection.",
      },
    },
  },
  args: {
    columns: DS_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
    selectable: "multiple",
    rowState: (row) =>
      row.id === "r3" ? "saving" : row.id === "r4" ? "deleted" : row.id === "r5" ? "disabled" : "default",
  },
};

export const RichEmpty: Story = {
  name: "Empty — rich",
  parameters: {
    docs: {
      description: {
        story:
          "The `empty` config replaces the plain `emptyMessage` with an icon, a title, an explanation of what was filtered out, and the actions that undo it.",
      },
    },
  },
  args: {
    columns: DS_COLUMNS,
    data: [],
    keyField: "id",
    bordered: true,
    empty: {
      title: "No orders in this window",
      description:
        "Nothing matched Channel = Zomato between 12 and 19 March. Widen the range or clear the channel filter.",
    },
  },
};

export const ErrorState: Story = {
  name: "Error",
  parameters: {
    docs: {
      description: {
        story:
          "An error keeps the filters and says so, and carries the request id so it can be read out over a call.",
      },
    },
  },
  args: {
    columns: DS_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
    error: {
      title: "Could not load orders",
      description:
        "The orders service timed out after 30 seconds. Your filters are still applied — retrying will keep them.",
      requestId: "req_8f21c4 · 14:32:07 IST",
      onRetry: () => console.log("retry"),
    },
  },
};

export const WithPagination: Story = {
  name: "Pagination footer",
  parameters: {
    docs: {
      description: {
        story:
          "First, last and a window of three around the current page. Above `jumpThreshold` pages (20 by default) a \"Go to\" box appears. Omit `pageCount` for cursor-style paging against an unknown total.",
      },
    },
  },
  render: (args) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);
    return (
      <Table
        {...args}
        pagination={{
          page,
          pageCount: 64,
          pageSize,
          pageSizes: [10, 25, 50],
          total: 1584,
          itemLabel: "orders",
          onPageChange: setPage,
          onPageSizeChange: (n) => {
            setPageSize(n);
            setPage(1);
          },
        }}
      />
    );
  },
  args: {
    columns: DS_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
  },
};

export const StickyFirstColumn: Story = {
  name: "Pinned first column",
  parameters: {
    docs: {
      description: {
        story:
          "The identifier column pins with a soft right shadow so the row is never lost while scrolling sideways. The checkbox pins with it.",
      },
    },
  },
  render: (args) => (
    <div className="max-w-[560px]">
      <Table {...args} />
    </div>
  ),
  args: {
    columns: DS_COLUMNS,
    data: ROWS,
    keyField: "id",
    bordered: true,
    stickyFirstColumn: true,
    selectable: "multiple",
  },
};

/* â”€â”€ Live demo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const STATUS_TONE: Record<Status, TableStatusTone> = {
  Delivered: "success",
  Redeemed: "success",
  Dispatched: "info",
  Allocated: "info",
  Preparing: "warning",
  Cancelled: "danger",
};

const LIVE_ROWS: OrderRow[] = (
  [
    ["UE-90412", "Ananya Verma", "+91 95011 74711", "Website", 1240, "24 min", "Dispatched"],
    ["UE-90411", "Rohit Malhotra", "+91 98140 22317", "Zomato", 640, "31 min", "Delivered"],
    ["UE-90409", "Simran Kaur", "+91 99150 88204", "Dine-in", 2180, "18 min", "Preparing"],
    ["UE-90405", "Karan Bedi", "+91 90411 63550", "Swiggy", 410, "52 min", "Cancelled"],
    ["UE-90402", "Meera Iyer", "+91 97800 12094", "Website", 3050, "22 min", "Delivered"],
    ["UE-90398", "Arjun Nair", "+91 96540 71183", "Zomato", 890, "35 min", "Delivered"],
    ["UE-90394", "Priya Chawla", "+91 93110 45027", "ONDC", 1560, "41 min", "Dispatched"],
  ] as const
).map(([id, customerName, phone, channel, amount, tat, status]) => ({
  ...BASE,
  id,
  orderId: id,
  customerName,
  phone,
  channel,
  amount,
  tat,
  status: status as Status,
}));

/** Rebuilt per size so the identity cell picks up the matching avatar scale. */
const liveColumns = (size: TableSize): ColumnDef<OrderRow>[] => [
  {
    key: "id",
    header: "Order Id",
    width: "112px",
    minWidth: 112,
    sortable: true,
    identifier: true,
  },
  {
    key: "customerName",
    header: "Customer",
    flex: 2,
    minWidth: 200,
    sortable: true,
    render: (_v, row) => (
      <TableIdentityCell name={row.customerName} meta={row.phone} size={size} />
    ),
  },
  { key: "channel", header: "Channel", width: "110px", minWidth: 110, sortable: true },
  {
    key: "amount",
    header: "Amount",
    width: "112px",
    minWidth: 112,
    align: "right",
    sortable: true,
    render: (v: number) => formatINR(v),
  },
  { key: "tat", header: "TAT", width: "86px", minWidth: 86, align: "right", sortable: true },
  {
    key: "status",
    header: "Status",
    width: "130px",
    minWidth: 130,
    render: (v: Status) => (
      <TableStatusCell tone={STATUS_TONE[v]}>{v}</TableStatusCell>
    ),
  },
];

type DemoView = "data" | "loading" | "empty" | "error";

function DemoSegButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer rounded-md border-0 px-[11px] py-1.5 text-[11px] font-semibold leading-none transition-all duration-[120ms]"
      style={{
        background: active ? "#FFFFFF" : "transparent",
        color: active ? TABLE_COLORS.brand : TABLE_COLORS.fg2,
        boxShadow: active ? "2px 2px 4px rgba(0,0,0,.06)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function DemoButton({
  onClick,
  children,
  tone = "default",
}: {
  onClick: () => void;
  children: React.ReactNode;
  tone?: "default" | "danger" | "primary";
}) {
  if (tone === "primary") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="h-8 cursor-pointer rounded-lg border-0 px-3 text-[11px] font-semibold leading-none text-white"
        style={{
          backgroundColor: TABLE_COLORS.brand,
          backgroundImage: TABLE_COLORS.brandGradient,
        }}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-8 cursor-pointer rounded-lg border bg-white px-3 text-[11px] font-semibold leading-none transition-all duration-[120ms]"
      style={{
        borderColor: TABLE_COLORS.border,
        color: tone === "danger" ? TABLE_COLORS.danger : TABLE_COLORS.fg2,
      }}
    >
      {children}
    </button>
  );
}

export const LiveDemo: Story = {
  name: "Live demo",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "The whole component in one place: click a header to sort, pick rows to raise the bulk-action bar, page through the footer, and switch size or state from the controls. The identifier column is pinned, so scrolling sideways never loses the row.",
      },
    },
  },
  render: () => {
    const [size, setSize] = useState<TableSize>("md");
    const [view, setView] = useState<DemoView>("data");
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(25);

    const columns = liveColumns(size);
    const runLoading = () => {
      setView("loading");
      setTimeout(() => setView("data"), 1500);
    };

    return (
      <div className="p-6" style={{ background: "#FAFAFA" }}>
        <section
          className="overflow-hidden rounded-xl border bg-white shadow-[2px_2px_4px_rgba(0,0,0,.04)]"
          style={{ borderColor: TABLE_COLORS.border }}
        >
          <div className="flex flex-wrap items-start gap-[14px] px-5 pb-[15px] pt-[18px]">
            <div className="min-w-[230px] flex-1">
              <h2
                className="m-0 text-base font-bold leading-tight"
                style={{ color: TABLE_COLORS.fg1 }}
              >
                Live table
              </h2>
              <p
                className="mt-1 text-[13px] leading-normal"
                style={{ color: TABLE_COLORS.fg2 }}
              >
                Keyboard: â†‘â†“ to move, Space to select, â‡§-click to range-select, âŒ˜/Ctrl+A to
                select the page, â†µ to open, Esc to clear.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div
                className="flex gap-0.5 rounded-lg p-[3px]"
                style={{ background: TABLE_COLORS.subtle }}
              >
                {(["sm", "md", "lg"] as TableSize[]).map((s) => (
                  <DemoSegButton key={s} active={size === s} onClick={() => setSize(s)}>
                    {s}
                  </DemoSegButton>
                ))}
              </div>
              <DemoButton onClick={runLoading}>Loading</DemoButton>
              <DemoButton onClick={() => setView("empty")}>Empty</DemoButton>
              <DemoButton tone="danger" onClick={() => setView("error")}>
                Error
              </DemoButton>
              <DemoButton tone="primary" onClick={() => setView("data")}>
                Data
              </DemoButton>
            </div>
          </div>

          <Table
            columns={columns}
            data={view === "empty" ? [] : LIVE_ROWS}
            keyField="id"
            size={size}
            loading={view === "loading"}
            stickyHeader
            maxHeight="430px"
            stickyFirstColumn
            selectable="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            rowActions={DS_ROW_ACTIONS}
            onRowClick={(row) => console.log("open", row.id)}
            defaultSort={{ key: "id", direction: "desc" }}
            bulkActions={[
              { label: "Mark delivered", onClick: (rows) => console.log("deliver", rows) },
              { label: "Export", onClick: (rows) => console.log("export", rows) },
              {
                label: "Cancel orders",
                tone: "danger",
                onClick: (rows) => console.log("cancel", rows),
              },
            ]}
            empty={{
              title: "No orders in this window",
              description:
                "Nothing matched Channel = Zomato between 12 and 19 March. Widen the range or clear the channel filter.",
              actions: (
                <>
                  <DemoButton onClick={() => setView("data")}>Widen to 30 days</DemoButton>
                  <DemoButton tone="primary" onClick={() => setView("data")}>
                    Clear filters
                  </DemoButton>
                </>
              ),
            }}
            error={
              view === "error"
                ? {
                    title: "Could not load orders",
                    description:
                      "The orders service timed out after 30 seconds. Your filters are still applied â€” retrying will keep them.",
                    requestId: "req_8f21c4 Â· 14:32:07 IST",
                    onRetry: runLoading,
                  }
                : null
            }
            pagination={{
              page,
              pageCount: 64,
              pageSize,
              pageSizes: [10, 25, 50],
              total: 1584,
              itemLabel: "orders",
              onPageChange: setPage,
              onPageSizeChange: (n) => {
                setPageSize(n);
                setPage(1);
              },
            }}
          />
        </section>
      </div>
    );
  },
  args: {
    columns: DS_COLUMNS,
    data: LIVE_ROWS,
    keyField: "id",
  },
};

