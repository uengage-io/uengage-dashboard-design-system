import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

function Controlled(props: React.ComponentProps<typeof Pagination>) {
  const [page, setPage] = React.useState(props.currentPage ?? 1);
  React.useEffect(() => {
    setPage(props.currentPage ?? 1);
  }, [props.currentPage]);
  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination {...props} currentPage={page} onPageChange={setPage} />
      <p className="text-sm text-gray-500">
        Page <span className="font-semibold text-[#003C1B]">{page}</span> of {props.totalPages}
      </p>
    </div>
  );
}

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  render: (args) => <Controlled {...args} />,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Currently active page",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    siblingCount: {
      control: { type: "number", min: 0, max: 5 },
      description: "Pages shown on each side of the active page",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    showFirstLast: {
      control: "boolean",
      description: "Show double-chevron first/last page jumps",
    },
    disabled: {
      control: "boolean",
      description: "Disable all controls",
    },
    className: { control: "text" },
  },
  args: {
    currentPage: 1,
    totalPages: 20,
    siblingCount: 1,
    size: "md",
    showFirstLast: false,
    disabled: false,
    // Every story renders through `Controlled`, which supplies the real
    // handler — this only satisfies the required prop on the arg type.
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive pagination — click any page or the chevrons to navigate. */
export const Default: Story = {};

/** Active page sits in the middle; the sibling window shifts as you navigate. */
export const MidRange: Story = {
  args: { currentPage: 10, totalPages: 99, siblingCount: 1 },
};

/** Small button size. */
export const SizeSm: Story = {
  args: { size: "sm", currentPage: 5, totalPages: 15 },
};

/** Medium button size (default). */
export const SizeMd: Story = {
  args: { size: "md", currentPage: 5, totalPages: 15 },
};

/** Large button size. */
export const SizeLg: Story = {
  args: { size: "lg", currentPage: 5, totalPages: 15 },
};

/** All three sizes side by side. */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{size}</p>
          <Controlled currentPage={5} totalPages={15} size={size} onPageChange={() => {}} />
        </div>
      ))}
    </div>
  ),
};

/** siblingCount={1} — one page shown each side of the active page. */
export const SiblingCount1: Story = {
  args: { currentPage: 10, totalPages: 20, siblingCount: 1 },
};

/** siblingCount={2} — two pages shown each side. */
export const SiblingCount2: Story = {
  args: { currentPage: 10, totalPages: 20, siblingCount: 2 },
};

/** siblingCount={3} — three pages shown each side. */
export const SiblingCount3: Story = {
  args: { currentPage: 10, totalPages: 20, siblingCount: 3 },
};

/** Sibling counts compared in a single view. */
export const SiblingCounts: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {[1, 2, 3].map((count) => (
        <div key={count} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            siblingCount={count}
          </p>
          <Controlled
            currentPage={10}
            totalPages={20}
            siblingCount={count}
            onPageChange={() => {}}
          />
        </div>
      ))}
    </div>
  ),
};

/** ChevronsLeft / ChevronsRight for jumping to the first and last page. */
export const ShowFirstLast: Story = {
  args: { currentPage: 5, totalPages: 20, showFirstLast: true },
};

/** No ellipsis rendered when totalPages is small enough to show all pages. */
export const NoEllipsis: Story = {
  args: { currentPage: 2, totalPages: 3 },
};

/** All interactions are blocked; buttons show a muted style. */
export const Disabled: Story = {
  args: { currentPage: 5, totalPages: 10, disabled: true },
};

/* â”€â”€ Design-system demos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const TOTAL = 1284;

function DemoCard({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="text-[10px] font-semibold uppercase leading-tight tracking-[0.09em]"
        style={{ color: PAGINATION_COLORS.fg3 }}
      >
        {label}
      </span>
      <div
        className="rounded-[10px] border"
        style={{ borderColor: PAGINATION_COLORS.border }}
      >
        {children}
      </div>
      {note ? (
        <span className="text-[11px] leading-normal" style={{ color: PAGINATION_COLORS.fg3 }}>
          {note}
        </span>
      ) : null}
    </div>
  );
}

/**
 * The whole control in one place: page through 1,284 orders, change the page
 * size and watch the range and window recompute, toggle the jumper, and fire a
 * fetch to see the loading state.
 */
function LivePagination() {
  const [size, setSize] = React.useState<PaginationSize>("md");
  const [page, setPage] = React.useState(2);
  const [perPage, setPerPage] = React.useState(10);
  const [jumper, setJumper] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const totalPages = Math.ceil(TOTAL / perPage);
  const spec = PAGINATION_SIZES[size];
  const first = (page - 1) * perPage + 1;
  const last = Math.min(page * perPage, TOTAL);

  const fetchFor = (ms: number) => {
    setLoading(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLoading(false), ms);
  };

  const rows = Array.from({ length: Math.min(5, last - first + 1) }, (_, i) => ({
    id: `UE-${91_000 - (first + i)}`,
    amount: `â‚¹${((((first + i) * 137) % 4000) + 210).toLocaleString("en-IN")}`,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start gap-[14px]">
        <div className="min-w-[240px] flex-1">
          <h3
            className="m-0 text-base font-bold leading-tight"
            style={{ color: PAGINATION_COLORS.fg1 }}
          >
            Live pagination
          </h3>
          <p className="mt-1 text-[13px] leading-normal" style={{ color: PAGINATION_COLORS.fg2 }}>
            Keyboard: â†/â†’ page from any control, Home/End jump to the ends, âŒ˜/Ctrl+â† lands on
            page 1 in one hop, â†µ commits the jump box, Esc closes the rows menu.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div
            className="flex gap-0.5 rounded-lg p-[3px]"
            style={{ background: PAGINATION_COLORS.subtle }}
          >
            {(["sm", "md", "lg"] as PaginationSize[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className="cursor-pointer rounded-md border-0 px-[11px] py-1.5 text-[11px] font-semibold leading-none transition-all duration-[120ms]"
                style={{
                  background: size === s ? "#FFFFFF" : "transparent",
                  color: size === s ? PAGINATION_COLORS.brand : PAGINATION_COLORS.fg2,
                  boxShadow: size === s ? "2px 2px 4px rgba(0,0,0,.06)" : "none",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setJumper((v) => !v)}
            className="h-[30px] cursor-pointer rounded-lg border bg-white px-3 text-[11px] font-semibold leading-none transition-all duration-[120ms] hover:border-[#1F5E2C] hover:text-[#003C1B]"
            style={{ borderColor: PAGINATION_COLORS.border, color: PAGINATION_COLORS.fg2 }}
          >
            {jumper ? "Hide jumper" : "Show jumper"}
          </button>
          <button
            type="button"
            onClick={() => fetchFor(1300)}
            className="h-[30px] cursor-pointer rounded-lg border bg-white px-3 text-[11px] font-semibold leading-none transition-all duration-[120ms] hover:border-[#1F5E2C] hover:text-[#003C1B]"
            style={{ borderColor: PAGINATION_COLORS.border, color: PAGINATION_COLORS.fg2 }}
          >
            Simulate fetch
          </button>
        </div>
      </div>

      {/* The footer is `attached`, so it shares the card's bottom edge. */}
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: PAGINATION_COLORS.border }}
      >
        <div
          className="flex items-center gap-[14px] px-4 py-[9px]"
          style={{
            background: PAGINATION_COLORS.subtle,
            borderBottom: `1px solid ${PAGINATION_COLORS.border}`,
          }}
        >
          <span
            className="text-[10px] font-semibold uppercase leading-tight tracking-[0.08em]"
            style={{ color: PAGINATION_COLORS.fg3 }}
          >
            Order Id
          </span>
          <span
            className="ml-auto text-[10px] font-semibold uppercase leading-tight tracking-[0.08em]"
            style={{ color: PAGINATION_COLORS.fg3 }}
          >
            Amount
          </span>
        </div>

        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center gap-[14px] px-4"
            style={{
              height: spec.control + 14,
              borderBottom: `1px solid ${PAGINATION_COLORS.rule}`,
            }}
          >
            {loading ? (
              <>
                <span style={{ ...shimmer, width: 120 }} />
                <span style={{ ...shimmer, width: 54, marginLeft: "auto" }} />
              </>
            ) : (
              <>
                <span
                  className="ue-tabular text-xs font-semibold"
                  style={{ color: PAGINATION_COLORS.fg1 }}
                >
                  {row.id}
                </span>
                <span
                  className="ue-tabular ml-auto text-xs font-semibold"
                  style={{ color: PAGINATION_COLORS.fg1 }}
                >
                  {row.amount}
                </span>
              </>
            )}
          </div>
        ))}

        <Pagination
          attached
          size={size}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => {
            setPage(p);
            fetchFor(650);
          }}
          total={TOTAL}
          perPage={perPage}
          itemLabel="orders"
          perPageOptions={[10, 25, 50, 100]}
          onPerPageChange={setPerPage}
          showJumper={jumper}
          loading={loading}
        />
      </div>

      <span
        className="ue-tabular text-[11px] leading-normal"
        style={{ color: PAGINATION_COLORS.fg3 }}
      >
        {loading
          ? `Fetching page ${page} â€” rows skeleton while the range label holds its value.`
          : `Page ${page} of ${totalPages} at ${perPage} rows. Window stays 1 Â· ${page}Â±1 Â· ${totalPages}.`}
      </span>
    </div>
  );
}

const shimmer: React.CSSProperties = {
  height: 10,
  borderRadius: 5,
  display: "block",
  background: "linear-gradient(90deg,#F3F5F9 0px,#E2E2E2 110px,#F3F5F9 220px)",
  backgroundSize: "520px 100%",
  animation: "ue-shimmer 1.3s linear infinite",
};

/** The full interactive control â€” sizes, page size, jumper, loading, attached footer. */
export const LiveDemo: Story = {
  name: "Live demo",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Page through 1,284 orders. Change the page size and watch the range and window recompute â€” the page anchors on the first visible row rather than snapping to 1. The footer is `attached`, so it shares the card's bottom edge the way a table footer does.",
      },
    },
  },
  render: () => <LivePagination />,
};

/** Known total under ~10k rows â€” operators jump to a remembered page number. */
export const VariantNumbered: Story = {
  name: "Variant â€” numbered",
  render: () => {
    const [page, setPage] = React.useState(2);
    return (
      <DemoCard
        label="Numbered â€” the default"
        note="Known total, under ~10k rows. A range with a noun, a filled current page, and the last page always reachable."
      >
        <Pagination
          currentPage={page}
          totalPages={129}
          onPageChange={setPage}
          total={TOTAL}
          perPage={10}
          itemLabel="orders"
          className="!px-[14px] !py-3"
        />
      </DemoCard>
    );
  },
};

/** Prev / next only, for drawers and narrow containers. */
export const VariantCompact: Story = {
  name: "Variant â€” compact",
  render: () => {
    const [page, setPage] = React.useState(2);
    return (
      <DemoCard
        label="Compact â€” prev / next only"
        note="Drawers, side panels and any container under 520px wide. Labels stay â€” arrow-only is a mystery button."
      >
        <Pagination
          variant="compact"
          currentPage={page}
          totalPages={129}
          onPageChange={setPage}
          className="!px-[14px] !py-3"
        />
      </DemoCard>
    );
  },
};

/** Unknown total â€” Newer / Older, never page numbers. */
export const VariantCursor: Story = {
  name: "Variant â€” cursor",
  render: () => (
    <DemoCard
      label="Cursor â€” unknown total"
      note="Live feeds and audit logs where COUNT(*) is too expensive. The set shifts under you, so page numbers would lie."
    >
      <Pagination
        variant="cursor"
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        perPage={25}
        itemLabel="orders"
        hasPrev={false}
        hasNext
        onPrev={() => console.log("newer")}
        onNext={() => console.log("older")}
        className="!px-[14px] !py-3"
      />
    </DemoCard>
  ),
};

/** Appends in place, for card grids and mobile lists. */
export const VariantLoadMore: Story = {
  name: "Variant â€” load more",
  render: () => {
    const [loaded, setLoaded] = React.useState(50);
    return (
      <DemoCard
        label="Load more â€” append in place"
        note="Card grids and mobile lists where losing scroll position hurts. Always print how many of how many are loaded."
      >
        <Pagination
          variant="loadMore"
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          perPage={25}
          total={TOTAL}
          loadedCount={loaded}
          onLoadMore={() => setLoaded((n) => Math.min(n + 25, TOTAL))}
        />
      </DemoCard>
    );
  },
};

/** Numbered controls plus a go-to box, for very large sets. */
export const VariantJumper: Story = {
  name: "Variant â€” jumper",
  render: () => {
    const [page, setPage] = React.useState(4961);
    return (
      <DemoCard
        label="Jumper â€” very large sets"
        note="Over ~1,000 pages a numbered window is meaningless. Pairs with numbered controls, never replaces the range label."
      >
        <Pagination
          variant="jumper"
          currentPage={page}
          totalPages={48000}
          onPageChange={setPage}
          total={1_200_000}
          perPage={25}
          itemLabel="events"
          className="!px-[14px] !py-3"
        />
      </DemoCard>
    );
  },
};

/** The "Rows" menu opens upward, because the footer sits at the bottom of a table. */
export const WithPageSize: Story = {
  name: "Page size menu",
  render: () => {
    const [page, setPage] = React.useState(3);
    const [perPage, setPerPage] = React.useState(25);
    return (
      <div className="flex flex-col gap-3">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(TOTAL / perPage)}
          onPageChange={setPage}
          total={TOTAL}
          perPage={perPage}
          itemLabel="orders"
          perPageOptions={[10, 25, 50, 100]}
          onPerPageChange={setPerPage}
        />
        <p className="text-xs" style={{ color: PAGINATION_COLORS.fg3 }}>
          Page size {perPage} Â· page {page}. The page anchors on the first visible row, so the
          operator keeps looking at what they were looking at.
        </p>
      </div>
    );
  },
};

/** A page in flight: the current control spins and the row goes inert. */
export const Loading: Story = {
  args: { currentPage: 4, totalPages: 20, loading: true, total: TOTAL, perPage: 10, itemLabel: "orders" },
};

/** Every state a single control can be in. */
export const ControlStates: Story = {
  name: "Control states",
  render: () => (
    <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
      {PAGINATION_CONTROL_STATES.map((state) => (
        <div key={state.name} className="flex flex-col items-start gap-2">
          <span
            className="text-[10px] font-semibold uppercase leading-tight tracking-[0.09em]"
            style={{ color: PAGINATION_COLORS.fg3 }}
          >
            {state.name}
          </span>
          <span
            className="ue-tabular inline-flex items-center justify-center"
            style={{
              minWidth: 32,
              height: 32,
              padding: "0 9px",
              borderRadius: 8,
              background: state.bg,
              border: state.border,
              color: state.fg,
              boxShadow: state.ring,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {state.name === "Ellipsis" ? "â€¦" : state.name === "Disabled" ? "â€¹" : "3"}
          </span>
          <span className="text-[11px]" style={{ color: PAGINATION_COLORS.fg3 }}>
            {state.note}
          </span>
        </div>
      ))}
    </div>
  ),
};

/** Match the table the footer belongs to. */
export const SizeScale: Story = {
  name: "Size scale",
  render: () => (
    <div className="flex flex-col">
      <div className="grid grid-cols-[104px_1fr_184px] items-center gap-4 pb-[9px]">
        {["Size", "Control row", "Spec & use"].map((h) => (
          <span
            key={h}
            className="text-[10px] font-semibold uppercase leading-tight tracking-[0.09em]"
            style={{ color: PAGINATION_COLORS.fg3 }}
          >
            {h}
          </span>
        ))}
      </div>
      {(["sm", "md", "lg"] as PaginationSize[]).map((s) => {
        const spec = PAGINATION_SIZES[s];
        return (
          <div
            key={s}
            className="grid grid-cols-[104px_1fr_184px] items-center gap-4 border-t py-3"
            style={{ borderColor: PAGINATION_COLORS.rule }}
          >
            <span className="text-xs font-semibold" style={{ color: PAGINATION_COLORS.fg1 }}>
              {s} <span style={{ color: PAGINATION_COLORS.fg3 }}>Â· {spec.name}</span>
            </span>
            <Controlled
              currentPage={2}
              totalPages={129}
              size={s}
              align="start"
              onPageChange={() => {}}
            />
            <span className="text-[11px] leading-normal" style={{ color: PAGINATION_COLORS.fg3 }}>
              <span className="ue-tabular">{spec.spec}</span> â€” {spec.use}
            </span>
          </div>
        );
      })}
    </div>
  ),
};

/** Do / Don't â€” a windowed control with a range, versus every page rendered. */
export const DoAndDont: Story = {
  name: "Do & Don't",
  render: () => (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
      <div
        className="flex flex-col gap-3 rounded-xl border bg-white p-5"
        style={{ borderColor: PAGINATION_COLORS.border, borderTop: "3px solid #00A86B" }}
      >
        <span
          className="text-xs font-bold uppercase leading-none tracking-[0.05em]"
          style={{ color: "#00A86B" }}
        >
          Do
        </span>
        <div
          className="rounded-[10px] border"
          style={{ borderColor: PAGINATION_COLORS.border }}
        >
          <Pagination
            size="sm"
            currentPage={2}
            totalPages={129}
            onPageChange={() => {}}
            total={TOTAL}
            perPage={10}
            itemLabel="orders"
            className="!px-3 !py-2.5"
          />
        </div>
        <p className="m-0 text-xs leading-relaxed" style={{ color: PAGINATION_COLORS.fg2 }}>
          A range with a noun, a filled current page, and the last page always reachable. The
          control keeps one width from page 1 to page 129.
        </p>
      </div>
      <div
        className="flex flex-col gap-3 rounded-xl border bg-white p-5"
        style={{ borderColor: PAGINATION_COLORS.border, borderTop: "3px solid #A8000F" }}
      >
        <span
          className="text-xs font-bold uppercase leading-none tracking-[0.05em]"
          style={{ color: "#A8000F" }}
        >
          Don't
        </span>
        <div
          className="flex flex-wrap items-center gap-[5px] rounded-[10px] border p-3"
          style={{ borderColor: PAGINATION_COLORS.border }}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <span
              key={n}
              className="ue-tabular inline-flex items-center justify-center"
              style={{
                minWidth: 24,
                height: 24,
                padding: "0 6px",
                borderRadius: 7,
                fontSize: 10,
                fontWeight: 600,
                background: "transparent",
                color: n === 2 ? PAGINATION_COLORS.brand : PAGINATION_COLORS.fg2,
                border: `1px solid ${n === 2 ? PAGINATION_COLORS.brandSoft : PAGINATION_COLORS.border}`,
              }}
            >
              {n}
            </span>
          ))}
        </div>
        <p className="m-0 text-xs leading-relaxed" style={{ color: PAGINATION_COLORS.fg2 }}>
          Every page number rendered, no range, no total, and an outlined current page that reads
          as disabled. At 129 pages this wraps to four lines.
        </p>
      </div>
    </div>
  ),
};

