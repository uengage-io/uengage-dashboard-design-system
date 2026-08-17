import { useMemo, useState } from "react";
import {
  Table,
  TableActionButton,
  TableEmptyValue,
  TableIdentityCell,
  TableStatusCell,
  TABLE_COLORS,
  TABLE_SIZES,
} from "@uengage/ui";
import type {
  ColumnDef,
  TableRowState,
  TableSize,
  TableSortState,
  TableStatusTone,
} from "@uengage/ui";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

type Status = "Delivered" | "Dispatched" | "Preparing" | "Cancelled";

type Order = {
  id: string;
  name: string;
  phone: string;
  channel: string;
  amount: number;
  tat: string;
  status: Status;
  state?: TableRowState;
};

const STATUS_TONE: Record<Status, TableStatusTone> = {
  Delivered: "success",
  Dispatched: "info",
  Preparing: "warning",
  Cancelled: "danger",
};

const ORDERS: Order[] = [
  { id: "UE-90412", name: "Ananya Verma", phone: "+91 95011 74711", channel: "Website", amount: 1240, tat: "24 min", status: "Dispatched" },
  { id: "UE-90411", name: "Rohit Malhotra", phone: "+91 98140 22317", channel: "Zomato", amount: 640, tat: "31 min", status: "Delivered" },
  { id: "UE-90409", name: "Simran Kaur", phone: "+91 99150 88204", channel: "Dine-in", amount: 2180, tat: "18 min", status: "Preparing" },
  { id: "UE-90405", name: "Karan Bedi", phone: "+91 90411 63550", channel: "Swiggy", amount: 410, tat: "52 min", status: "Cancelled" },
  { id: "UE-90402", name: "Meera Iyer", phone: "+91 97800 12094", channel: "Website", amount: 3050, tat: "22 min", status: "Delivered" },
  { id: "UE-90398", name: "Arjun Nair", phone: "+91 96540 71183", channel: "Zomato", amount: 890, tat: "35 min", status: "Delivered" },
  { id: "UE-90394", name: "Priya Chawla", phone: "+91 93110 45027", channel: "ONDC", amount: 1560, tat: "41 min", status: "Dispatched" },
];

const ROW_STATES: TableRowState[] = ["default", "default", "saving", "deleted", "disabled"];

const ROW_STATE_DEMO: Order[] = ORDERS.slice(0, 5).map((order, i) => ({
  ...order,
  state: ROW_STATES[i] ?? "default",
}));

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* -------------------------------------------------------------------------- */
/*  Icons                                                                      */
/* -------------------------------------------------------------------------- */

const EyeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);

const MoreIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Columns                                                                    */
/* -------------------------------------------------------------------------- */

function buildColumns(size: TableSize): ColumnDef<Order>[] {
  return [
    { key: "id", header: "Order Id", width: "112px", minWidth: 112, sortable: true, identifier: true },
    {
      key: "name",
      header: "Customer",
      flex: 2,
      minWidth: 200,
      sortable: true,
      render: (_v, row) => (
        <TableIdentityCell name={row.name} meta={row.phone} size={size} />
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
      render: (v: number) => <span style={{ fontWeight: 600, color: TABLE_COLORS.fg1 }}>{inr(v)}</span>,
    },
    { key: "tat", header: "TAT", width: "86px", minWidth: 86, align: "right", sortable: true },
    {
      key: "status",
      header: "Status",
      width: "130px",
      minWidth: 130,
      render: (v: Status) => <TableStatusCell tone={STATUS_TONE[v]}>{v}</TableStatusCell>,
    },
  ];
}

const rowActions = () => (
  <>
    <TableActionButton label="View order">
      <EyeIcon />
    </TableActionButton>
    <TableActionButton label="More actions">
      <MoreIcon />
    </TableActionButton>
  </>
);

/* -------------------------------------------------------------------------- */
/*  Page chrome                                                                */
/* -------------------------------------------------------------------------- */

function Section({
  title,
  description,
  children,
  flush = false,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  flush?: boolean;
}) {
  return (
    <section
      className="rounded-xl border bg-white shadow-[2px_2px_4px_rgba(0,0,0,.04)]"
      style={{ borderColor: TABLE_COLORS.border, overflow: flush ? "hidden" : undefined }}
    >
      <div className={flush ? "px-5 pb-4 pt-[18px]" : "p-[22px] pb-3"}>
        <h2 className="m-0 text-base font-bold leading-tight" style={{ color: TABLE_COLORS.fg1 }}>
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-[13px] leading-normal" style={{ color: TABLE_COLORS.fg2 }}>
            {description}
          </p>
        ) : null}
      </div>
      <div className={flush ? "" : "px-[22px] pb-[22px]"}>{children}</div>
    </section>
  );
}

function SegButton({
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
      className="rounded-md border-0 px-[11px] py-1.5 text-[11px] font-semibold leading-none transition-all duration-[120ms]"
      style={{
        cursor: "pointer",
        background: active ? "#FFFFFF" : "transparent",
        color: active ? TABLE_COLORS.brand : TABLE_COLORS.fg2,
        boxShadow: active ? "2px 2px 4px rgba(0,0,0,.06)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function GhostButton({
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
        className="h-8 rounded-lg border-0 px-3 text-[11px] font-semibold leading-none text-white"
        style={{
          cursor: "pointer",
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
      className="h-8 rounded-lg border px-3 text-[11px] font-semibold leading-none transition-all duration-[120ms]"
      style={{
        cursor: "pointer",
        borderColor: TABLE_COLORS.border,
        background: "#fff",
        color: tone === "danger" ? TABLE_COLORS.danger : TABLE_COLORS.fg2,
      }}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Live table                                                                 */
/* -------------------------------------------------------------------------- */

type View = "data" | "loading" | "empty" | "error";

function LiveTable() {
  const [size, setSize] = useState<TableSize>("md");
  const [view, setView] = useState<View>("data");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const columns = useMemo(() => buildColumns(size), [size]);

  const runLoading = () => {
    setView("loading");
    setTimeout(() => setView("data"), 1500);
  };

  return (
    <section
      className="overflow-hidden rounded-xl border bg-white shadow-[2px_2px_4px_rgba(0,0,0,.04)]"
      style={{ borderColor: TABLE_COLORS.border }}
    >
      <div className="flex flex-wrap items-start gap-[14px] px-5 pb-[15px] pt-[18px]">
        <div className="min-w-[230px] flex-1">
          <h2 className="m-0 text-base font-bold leading-tight" style={{ color: TABLE_COLORS.fg1 }}>
            Live table
          </h2>
          <p className="mt-1 text-[13px] leading-normal" style={{ color: TABLE_COLORS.fg2 }}>
            Sort by clicking a header, select rows, page through. Switch size and state from the
            controls. Keyboard: ↑↓ to move, Space to select, ⇧-click to range-select, ⌘/Ctrl+A,
            Enter to open, Esc to clear.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div
            className="flex gap-0.5 rounded-lg p-[3px]"
            style={{ background: TABLE_COLORS.subtle }}
          >
            {(["sm", "md", "lg"] as TableSize[]).map((s) => (
              <SegButton key={s} active={size === s} onClick={() => setSize(s)}>
                {s}
              </SegButton>
            ))}
          </div>
          <GhostButton onClick={runLoading}>Loading</GhostButton>
          <GhostButton onClick={() => setView("empty")}>Empty</GhostButton>
          <GhostButton tone="danger" onClick={() => setView("error")}>
            Error
          </GhostButton>
          <GhostButton tone="primary" onClick={() => setView("data")}>
            Data
          </GhostButton>
        </div>
      </div>

      <Table
        columns={columns}
        data={view === "empty" ? [] : ORDERS}
        keyField="id"
        size={size}
        loading={view === "loading"}
        stickyHeader
        maxHeight="430px"
        stickyFirstColumn
        selectable="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        rowActions={rowActions}
        onRowClick={(row) => console.log("open", row.id)}
        defaultSort={{ key: "id", direction: "desc" }}
        bulkActions={[
          { label: "Mark delivered", onClick: (rows) => console.log("deliver", rows) },
          { label: "Export", onClick: (rows) => console.log("export", rows) },
          { label: "Cancel orders", tone: "danger", onClick: (rows) => console.log("cancel", rows) },
        ]}
        empty={{
          title: "No orders in this window",
          description:
            "Nothing matched Channel = Zomato between 12 and 19 March. Widen the range or clear the channel filter.",
          actions: (
            <>
              <GhostButton onClick={() => setView("data")}>Widen to 30 days</GhostButton>
              <GhostButton tone="primary" onClick={() => setView("data")}>
                Clear filters
              </GhostButton>
            </>
          ),
        }}
        error={
          view === "error"
            ? {
                title: "Could not load orders",
                description:
                  "The orders service timed out after 30 seconds. Your filters are still applied — retrying will keep them.",
                requestId: "req_8f21c4 · 14:32:07 IST",
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
  );
}

/* -------------------------------------------------------------------------- */
/*  Interactive demos                                                          */
/* -------------------------------------------------------------------------- */

function SelectionDemo({ columns }: { columns: ColumnDef<Order>[] }) {
  const [keys, setKeys] = useState<string[]>([]);
  return (
    <div className="space-y-3">
      <Table
        columns={columns}
        data={ORDERS.slice(0, 5)}
        keyField="id"
        bordered
        selectable="multiple"
        selectedKeys={keys}
        onSelectionChange={setKeys}
        bulkActions={[
          { label: "Mark delivered", onClick: (rows) => console.log("deliver", rows) },
          { label: "Export", onClick: (rows) => console.log("export", rows) },
          { label: "Cancel orders", tone: "danger", onClick: (rows) => console.log("cancel", rows) },
        ]}
      />
      <div
        className="ue-tabular rounded-lg px-3 py-2 text-xs"
        style={{ background: TABLE_COLORS.subtle, color: TABLE_COLORS.fg2 }}
      >
        selectedKeys: {keys.length ? keys.join(", ") : "(none — pick a row, or press Space)"}
      </div>
    </div>
  );
}

function SingleSelectDemo({ columns }: { columns: ColumnDef<Order>[] }) {
  const [keys, setKeys] = useState<string[]>([]);
  return (
    <Table
      columns={columns}
      data={ORDERS.slice(0, 4)}
      keyField="id"
      bordered
      selectable="single"
      selectedKeys={keys}
      onSelectionChange={setKeys}
    />
  );
}

function ClickableDemo({ columns }: { columns: ColumnDef<Order>[] }) {
  const [last, setLast] = useState<Order | null>(null);
  return (
    <div className="space-y-3">
      <Table
        columns={columns}
        data={ORDERS.slice(0, 4)}
        keyField="id"
        bordered
        onRowClick={setLast}
      />
      <div
        className="rounded-lg px-3 py-2 text-xs"
        style={{ background: TABLE_COLORS.subtle, color: TABLE_COLORS.fg2 }}
      >
        Last opened: {last ? `${last.id} — ${last.name} — ${inr(last.amount)}` : "(none yet — click a row or press ↵)"}
      </div>
    </div>
  );
}

function SortDemo({ columns }: { columns: ColumnDef<Order>[] }) {
  const [sort, setSort] = useState<TableSortState>({ key: "amount", direction: "desc" });
  return (
    <div className="space-y-3">
      <Table
        columns={columns}
        data={ORDERS}
        keyField="id"
        bordered
        sort={sort}
        onSortChange={setSort}
      />
      <div
        className="rounded-lg px-3 py-2 text-xs"
        style={{ background: TABLE_COLORS.subtle, color: TABLE_COLORS.fg2 }}
      >
        sort: {sort.key ?? "—"} / {sort.direction ?? "cleared"} — click a header to cycle asc →
        desc → cleared
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Multi-line columns — for the vertical-alignment demo                       */
/* -------------------------------------------------------------------------- */

const STACKED_COLUMNS: ColumnDef<Order>[] = [
  {
    key: "id",
    header: "Order",
    flex: 1.4,
    identifier: true,
    verticalAlign: "middle",
    render: (_v, row) => (
      <span className="flex flex-col gap-0.5">
        <span className="ue-tabular font-semibold" style={{ color: TABLE_COLORS.fg1 }}>
          {row.id}
        </span>
        <span className="text-[11px]" style={{ color: TABLE_COLORS.fg3 }}>
          {row.channel} · {row.tat}
        </span>
      </span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    flex: 0.8,
    align: "right",
    verticalAlign: "middle",
    render: (v: number) => <span style={{ fontWeight: 600, color: TABLE_COLORS.fg1 }}>{inr(v)}</span>,
  },
  {
    key: "status",
    header: "Status",
    flex: 0.9,
    verticalAlign: "middle",
    render: (v: Status) => <TableStatusCell tone={STATUS_TONE[v]}>{v}</TableStatusCell>,
  },
];

/* -------------------------------------------------------------------------- */
/*  Do & Don't                                                                 */
/* -------------------------------------------------------------------------- */

type Outlet = { outlet: string; revenue: number };

const OUTLETS: Outlet[] = [
  { outlet: "Sector 17", revenue: 184200 },
  { outlet: "Elante Mall", revenue: 96400 },
];

/** Right-aligned on tabular figures, so the columns line up. */
const DO_COLUMNS: ColumnDef<Outlet>[] = [
  { key: "outlet", header: "Outlet", flex: 1, identifier: false },
  {
    key: "revenue",
    header: "Revenue",
    width: "110px",
    align: "right",
    render: (v: number) => <span style={{ fontWeight: 600 }}>{inr(v)}</span>,
  },
];

/** The same data left-aligned on proportional digits, with stripes added. */
const DONT_COLUMNS: ColumnDef<Outlet>[] = [
  { key: "outlet", header: "Outlet", flex: 1, identifier: false },
  {
    key: "revenue",
    header: "Revenue",
    width: "110px",
    tabular: false,
    render: (v: number) => <span style={{ fontWeight: 600 }}>{inr(v)}</span>,
  },
];

/* -------------------------------------------------------------------------- */
/*  Cell types                                                                 */
/* -------------------------------------------------------------------------- */

type CellDef = {
  name: string;
  note: string;
  align?: "start" | "end";
  content: React.ReactNode;
};

const CELL_TYPES: CellDef[] = [
  {
    name: "Identifier",
    note: "Semibold, tabular, first column. Never truncated.",
    content: (
      <span className="ue-tabular" style={{ fontSize: 12, fontWeight: 600, color: TABLE_COLORS.fg1 }}>
        UE-90412
      </span>
    ),
  },
  {
    name: "Text",
    note: "Regular weight, left-aligned, truncates with an ellipsis.",
    content: (
      <span style={{ fontSize: 12, fontWeight: 500, color: TABLE_COLORS.fg1 }}>Ananya Verma</span>
    ),
  },
  {
    name: "Number",
    note: "Right-aligned, tabular, semibold. Currency keeps its symbol.",
    align: "end",
    content: (
      <span className="ue-tabular" style={{ fontSize: 12, fontWeight: 600, color: TABLE_COLORS.fg1 }}>
        ₹1,24,500
      </span>
    ),
  },
  {
    name: "Status",
    note: "A chip with a dot. Never bare coloured text.",
    content: <TableStatusCell tone="success">Delivered</TableStatusCell>,
  },
  {
    name: "Date & time",
    note: "Tabular, absolute. Relative time only in a tooltip.",
    content: (
      <span className="ue-tabular" style={{ fontSize: 12, fontWeight: 500, color: TABLE_COLORS.fg2 }}>
        19 Mar, 3:04pm
      </span>
    ),
  },
  {
    name: "Empty",
    note: 'An em-dash, muted — never a blank cell or "N/A".',
    content: <TableEmptyValue />,
  },
  {
    name: "Actions",
    note: "Icon buttons, right-aligned, revealed on row hover.",
    align: "end",
    content: <span className="inline-flex gap-1">{rowActions()}</span>,
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const GRID_RULES: Array<[string, string]> = [
  ["Header", "11px uppercase, #F3F5F9 fill, sticky on scroll"],
  ["Rules", "horizontal only, #F3F5F9. No vertical grid lines, ever"],
  ["Numbers", "right-aligned, tabular figures, so digits stack"],
  ["Hover", "#FAFFF7 across the whole row, 120ms"],
  ["Selected", "#DCF3CE tint, never an outline"],
  ["Actions", "last column, right-aligned, revealed on row hover"],
  ["First column", "the identifier, semibold, sticky when scrolling sideways"],
  ["Zebra striping", "never. Rules plus density do the job with less noise"],
];

export default function TablePreview() {
  const columnsMd = useMemo(() => buildColumns("md"), []);

  return (
    <div className="min-h-screen p-9 pb-16" style={{ background: "#FAFAFA" }}>
      <div className="mx-auto flex max-w-[1180px] flex-col gap-[26px]">
        <header
          className="flex flex-wrap items-end gap-[18px] border-b pb-5"
          style={{ borderColor: TABLE_COLORS.border }}
        >
          <div>
            <h1 className="m-0 text-[26px] font-extrabold leading-tight" style={{ color: TABLE_COLORS.fg1 }}>
              Table &amp; Pagination
            </h1>
            <p className="mt-1 text-[13px] leading-normal" style={{ color: TABLE_COLORS.fg2 }}>
              Three sizes · sortable, selectable, sticky · every empty and error state
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <span
              className="whitespace-nowrap rounded-full px-[11px] py-[7px] text-[11px] font-semibold leading-none"
              style={{ background: TABLE_COLORS.brandTint, color: TABLE_COLORS.brand }}
            >
              7 cell types
            </span>
            <span
              className="whitespace-nowrap rounded-full px-[11px] py-[7px] text-[11px] font-semibold leading-none"
              style={{ background: TABLE_COLORS.subtle, color: TABLE_COLORS.fg2 }}
            >
              6 table states
            </span>
          </div>
        </header>

        <Section
          title="Rules of the grid"
          description="A table is read by scanning down a column, not across a row. Everything here follows from that: numbers right-align on tabular figures, only horizontal rules exist, and the hover wash spans the full row so the eye never loses its line."
        >
          <div className="grid gap-x-6 gap-y-[14px] [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {GRID_RULES.map(([label, copy]) => (
              <span key={label} className="text-xs font-medium leading-normal" style={{ color: TABLE_COLORS.fg2 }}>
                <b>{label}</b> — {copy}
              </span>
            ))}
          </div>
        </Section>

        <LiveTable />

        <Section
          title="Sizes"
          description="Row height is the only thing that changes. sm drops the secondary line under a name; lg keeps everything and breathes."
        >
          <div className="overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-[110px_1fr_1fr_1fr] items-center gap-[14px] pb-[9px]">
                {["Size", "Row height", "Rows per screen", "Use for"].map((h) => (
                  <span
                    key={h}
                    className="text-[10px] font-semibold uppercase leading-tight tracking-[0.09em]"
                    style={{ color: TABLE_COLORS.fg3 }}
                  >
                    {h}
                  </span>
                ))}
              </div>
              {(["sm", "md", "lg"] as TableSize[]).map((s) => {
                const spec = TABLE_SIZES[s];
                return (
                  <div
                    key={s}
                    className="grid grid-cols-[110px_1fr_1fr_1fr] items-center gap-[14px] border-t py-[11px]"
                    style={{ borderColor: TABLE_COLORS.rowRule }}
                  >
                    <span className="text-xs font-semibold" style={{ color: TABLE_COLORS.fg1 }}>
                      {s} <span style={{ color: TABLE_COLORS.fg3 }}>· {spec.name}</span>
                    </span>
                    <span className="ue-tabular text-xs font-medium" style={{ color: TABLE_COLORS.fg2 }}>
                      {spec.rowHeight}px
                    </span>
                    <span className="ue-tabular text-xs font-medium" style={{ color: TABLE_COLORS.fg2 }}>
                      {spec.rowsPerScreen}
                    </span>
                    <span className="text-[11px] leading-normal" style={{ color: TABLE_COLORS.fg3 }}>
                      {spec.use}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        <Section
          title="Row states"
          description="A saving row greys out; a deleted row greys and strikes for one beat before it leaves — no silent disappearance. Both stop responding to hover, click and selection."
        >
          <Table
            columns={columnsMd}
            data={ROW_STATE_DEMO}
            keyField="id"
            bordered
            selectable="multiple"
            rowState={(row) => row.state ?? "default"}
            rowActions={rowActions}
            alwaysShowRowActions
          />
        </Section>

        <Section
          title="Horizontal scroll — pinned first column"
          description="The identifier column pins with a soft right shadow so you never lose the row. Drag the table sideways."
        >
          <div className="max-w-[560px]">
            <Table
              columns={columnsMd}
              data={ORDERS.slice(0, 4)}
              keyField="id"
              bordered
              stickyFirstColumn
              selectable="multiple"
            />
          </div>
        </Section>

        <Section
          title="Cursor pagination — unknown total"
          description="Live feeds have no last page, so the footer drops the page numbers and the total and keeps only the window it can prove."
        >
          <Table
            columns={columnsMd}
            data={ORDERS.slice(0, 3)}
            keyField="id"
            bordered
            pagination={{ page: 1, pageSize: 25, pageSizes: [] }}
          />
        </Section>

        <Section title="Mobile — card layout" description="Each row becomes a labelled card below md.">
          <div className="max-w-[420px]">
            <Table
              columns={columnsMd}
              data={ORDERS.slice(0, 3)}
              keyField="id"
              bordered
              size="sm"
              mobileLayout="cards"
              selectable="multiple"
              rowActions={rowActions}
            />
          </div>
        </Section>

        <Section title="Loading" description="Shimmer bars sized to the active row height.">
          <Table columns={columnsMd} data={[]} keyField="id" loading bordered />
        </Section>

        <Section title="Empty — plain message" description="The `emptyMessage` string still works when the rich `empty` config is not supplied.">
          <Table
            columns={columnsMd}
            data={[]}
            keyField="id"
            bordered
            emptyMessage="No orders found for this date range."
          />
        </Section>

        <Section
          title="Cell types"
          description="Seven, and no more. Every column in the product is one of these."
        >
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(216px,1fr))]">
            {CELL_TYPES.map((cell) => (
              <div key={cell.name} className="flex flex-col gap-2">
                <span
                  className="text-[10px] font-semibold uppercase leading-tight tracking-[0.09em]"
                  style={{ color: TABLE_COLORS.fg3 }}
                >
                  {cell.name}
                </span>
                <div
                  className="flex min-h-12 items-center rounded-lg border px-[13px] py-[11px]"
                  style={{
                    borderColor: TABLE_COLORS.border,
                    justifyContent: cell.align === "end" ? "flex-end" : "flex-start",
                  }}
                >
                  {cell.content}
                </div>
                <span className="text-[11px] leading-normal" style={{ color: TABLE_COLORS.fg3 }}>
                  {cell.note}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          title="Selection — multiple + bulk actions"
          description="The bulk-action bar slides in above the header the moment a row is picked, and takes the actions with it. ⇧-click range-selects from the last picked row; ⌘/Ctrl+A picks the page; Esc clears."
        >
          <SelectionDemo columns={columnsMd} />
        </Section>

        <Section
          title="Selection — single"
          description='`selectable="single"` keeps one row at a time; picking another releases the previous one.'
        >
          <SingleSelectDemo columns={columnsMd} />
        </Section>

        <Section
          title="Row actions"
          description="Icon buttons live in a right-aligned last column and fade in on row hover or keyboard focus. Pass `alwaysShowRowActions` to keep them out."
        >
          <Table
            columns={columnsMd}
            data={ORDERS.slice(0, 4)}
            keyField="id"
            bordered
            rowActions={rowActions}
          />
        </Section>

        <Section
          title="Empty — rich"
          description="The `empty` config replaces the plain message with an icon, a title, an explanation of what was filtered out, and the actions that undo it."
        >
          <Table
            columns={columnsMd}
            data={[]}
            keyField="id"
            bordered
            empty={{
              title: "No orders in this window",
              description:
                "Nothing matched Channel = Zomato between 12 and 19 March. Widen the range or clear the channel filter.",
              actions: (
                <>
                  <GhostButton onClick={() => undefined}>Widen to 30 days</GhostButton>
                  <GhostButton tone="primary" onClick={() => undefined}>
                    Clear filters
                  </GhostButton>
                </>
              ),
            }}
          />
        </Section>

        <Section
          title="Error"
          description="An error keeps the filters and says so, and carries the request id so it can be read out over a call."
        >
          <Table
            columns={columnsMd}
            data={ORDERS}
            keyField="id"
            bordered
            error={{
              title: "Could not load orders",
              description:
                "The orders service timed out after 30 seconds. Your filters are still applied — retrying will keep them.",
              requestId: "req_8f21c4 · 14:32:07 IST",
              onRetry: () => console.log("retry"),
            }}
          />
        </Section>

        <Section
          title="Pagination — numbered, known total"
          description="First, last and a window of three around the current page. Under the 20-page jump threshold, so no “Go to” box appears."
        >
          <Table
            columns={columnsMd}
            data={ORDERS.slice(0, 4)}
            keyField="id"
            bordered
            pagination={{
              page: 2,
              pageCount: 8,
              pageSize: 25,
              total: 186,
              itemLabel: "orders",
              onPageChange: (p) => console.log("page", p),
              onPageSizeChange: (n) => console.log("pageSize", n),
            }}
          />
        </Section>

        <Section
          title="Sorting — controlled"
          description="Clicking a header cycles asc → desc → cleared. Pass `sort` and `onSortChange` to own that state, or `manualSort` when the server already sorted the page."
        >
          <SortDemo columns={columnsMd} />
        </Section>

        <Section
          title="Clickable rows"
          description="`onRowClick` opens a row on click or ↵. Checkboxes and row actions stop the event, so they never open the row by accident."
        >
          <ClickableDemo columns={columnsMd} />
        </Section>

        <Section
          title="Sticky header — bounded scroll box"
          description="`stickyHeader` with `maxHeight` sticks the header inside a fixed-height, internally scrolling box."
        >
          <Table
            columns={columnsMd}
            data={[...ORDERS, ...ORDERS].map((o, i) => ({ ...o, id: `${o.id}-${i}` }))}
            keyField="id"
            bordered
            stickyHeader
            maxHeight="260px"
          />
        </Section>

        <Section
          title="Sticky header — page scroll"
          description="`stickyHeader` without `maxHeight` sticks the header to the top of the viewport as the whole page scrolls. Scroll this page to see it."
        >
          <Table
            columns={columnsMd}
            data={[...ORDERS, ...ORDERS, ...ORDERS].map((o, i) => ({ ...o, id: `${o.id}-${i}` }))}
            keyField="id"
            bordered
            stickyHeader
          />
        </Section>

        <Section
          title="Responsive — hideOnMobile"
          description="Columns flagged `hideOnMobile` drop below md, and `table-auto` reclaims their width instead of leaving dead space. Narrow the window to see it."
        >
          <Table
            columns={columnsMd.map((col, i) =>
              i === 2 || i === 4 ? { ...col, hideOnMobile: true } : col,
            )}
            data={ORDERS.slice(0, 4)}
            keyField="id"
            bordered
          />
        </Section>

        <Section
          title="Vertical alignment"
          description="Cells centre by default now that rows have a fixed height. Pass `verticalAlign: 'top'` on columns that stack several lines."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <p
                className="mb-2 text-[10px] font-semibold uppercase tracking-[0.09em]"
                style={{ color: TABLE_COLORS.fg3 }}
              >
                Default — middle
              </p>
              <Table columns={STACKED_COLUMNS} data={ORDERS.slice(0, 3)} keyField="id" bordered size="lg" />
            </div>
            <div>
              <p
                className="mb-2 text-[10px] font-semibold uppercase tracking-[0.09em]"
                style={{ color: TABLE_COLORS.fg3 }}
              >
                verticalAlign: "top"
              </p>
              <Table
                columns={STACKED_COLUMNS.map((col) => ({ ...col, verticalAlign: "top" as const }))}
                data={ORDERS.slice(0, 3)}
                keyField="id"
                bordered
                size="lg"
              />
            </div>
          </div>
        </Section>

        <Section
          title="Unbordered & hover off"
          description="`bordered={false}` drops the shell for tables that sit inside an existing card; `hover={false}` drops the row wash for read-only tables."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Table columns={columnsMd} data={ORDERS.slice(0, 3)} keyField="id" bordered={false} />
            <Table columns={columnsMd} data={ORDERS.slice(0, 3)} keyField="id" bordered hover={false} />
          </div>
        </Section>

        <section className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          <div
            className="flex flex-col gap-3 rounded-xl border bg-white p-5 shadow-[2px_2px_4px_rgba(0,0,0,.04)]"
            style={{ borderColor: TABLE_COLORS.border, borderTop: "3px solid #00A86B" }}
          >
            <span
              className="text-xs font-bold uppercase leading-none tracking-[0.05em]"
              style={{ color: "#00A86B" }}
            >
              Do
            </span>
            <Table
              columns={DO_COLUMNS}
              data={OUTLETS}
              keyField="outlet"
              bordered
              size="sm"
              hover={false}
            />
            <p className="m-0 text-xs leading-relaxed" style={{ color: TABLE_COLORS.fg2 }}>
              Numbers right-aligned on tabular figures. The columns line up, so you can compare
              magnitudes without reading a single digit.
            </p>
          </div>
          <div
            className="flex flex-col gap-3 rounded-xl border bg-white p-5 shadow-[2px_2px_4px_rgba(0,0,0,.04)]"
            style={{ borderColor: TABLE_COLORS.border, borderTop: "3px solid #A8000F" }}
          >
            <span
              className="text-xs font-bold uppercase leading-none tracking-[0.05em]"
              style={{ color: TABLE_COLORS.danger }}
            >
              Don't
            </span>
            <Table
              columns={DONT_COLUMNS}
              data={OUTLETS}
              keyField="outlet"
              bordered
              size="sm"
              hover={false}
              rowClassName={(row) => (OUTLETS.indexOf(row) % 2 === 0 ? "bg-[#F3F5F9]" : "")}
            />
            <p className="m-0 text-xs leading-relaxed" style={{ color: TABLE_COLORS.fg2 }}>
              Left-aligned proportional numbers plus zebra striping. The digits no longer stack,
              and the stripes add noise the rules already handle.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
