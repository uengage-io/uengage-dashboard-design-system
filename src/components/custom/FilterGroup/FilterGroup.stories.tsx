import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FilterGroup } from "./FilterGroup";
import { Select } from "@/components/custom/Select/Select";
import { DatePicker } from "@/components/custom/DatePicker/DatePicker";
import { SearchBar } from "@/components/custom/SearchBar";
import type { DateRange } from "@/components/custom/DatePicker/DatePicker.types";

// ── Shared option sets ────────────────────────────────────────────────────────

const outletOptions = [
  { label: "All Outlets", value: "all" },
  { label: "Connaught Place", value: "cp" },
  { label: "Sector 17", value: "s17" },
  { label: "MG Road", value: "mgr" },
  { label: "Indiranagar", value: "ind" },
];

const legalEntityOptions = [
  { label: "uEngage Pvt Ltd", value: "uengage" },
  { label: "Foodie Corp", value: "foodie" },
  { label: "Quick Bites LLP", value: "qb" },
];

const stateOptions = [
  { label: "Maharashtra", value: "mh" },
  { label: "Delhi", value: "dl" },
  { label: "Karnataka", value: "ka" },
  { label: "Punjab", value: "pb" },
  { label: "Tamil Nadu", value: "tn" },
];

const cityOptions = [
  { label: "Mumbai", value: "mum" },
  { label: "Pune", value: "pun" },
  { label: "Bangalore", value: "blr" },
  { label: "Delhi", value: "del" },
  { label: "Chennai", value: "che" },
];

const dateOptions = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "Last 30 Days", value: "last_30" },
  { label: "Last 7 Days", value: "last_7" },
  { label: "Last 14 Days", value: "last_14" },
];

// ── Story: Select-only filters ────────────────────────────────────────────────

function WithSelectsStory() {
  const [outlet, setOutlet] = React.useState<string | string[]>("");
  const [legalEntity, setLegalEntity] = React.useState<string | string[]>("");
  const [state, setState] = React.useState<string | string[]>("");
  const [city, setCity] = React.useState<string | string[]>("");
  const [date, setDate] = React.useState<string | string[]>("today");

  const activeCount = [outlet, legalEntity, state, city].filter((v) =>
    Array.isArray(v) ? v.length > 0 : !!v,
  ).length + (date !== "today" ? 1 : 0);

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <p className="text-xs text-gray-400 mb-3 hidden sm:block">
          Desktop view — resize below 640 px to see the mobile trigger.
        </p>
        <FilterGroup
          labels={["Outlet", "Legal Entity", "State", "City", "Date"]}
          activeCount={activeCount}
          onApply={() => console.log("applied", { outlet, legalEntity, state, city, date })}
          onReset={() => {
            setOutlet(""); setLegalEntity(""); setState(""); setCity(""); setDate("today");
          }}
        >
          <Select options={outletOptions} value={outlet} onChange={setOutlet} placeholder="Select Outlet" />
          <Select options={legalEntityOptions} value={legalEntity} onChange={setLegalEntity} placeholder="Select Legal Entity" />
          <Select options={stateOptions} value={state} onChange={setState} placeholder="Select State" />
          <Select options={cityOptions} value={city} onChange={setCity} placeholder="Select City" />
          <Select options={dateOptions} value={date} onChange={setDate} placeholder="Today" />
        </FilterGroup>
      </div>

      <pre className="bg-gray-900 text-green-200 rounded-lg p-4 text-xs leading-relaxed">
        {JSON.stringify({ outlet, legalEntity, state, city, date }, null, 2)}
      </pre>
    </div>
  );
}

// ── Story: Mixed components (Select + DatePicker + SearchBar) ─────────────────

function WithMixedStory() {
  const [outlet, setOutlet] = React.useState<string | string[]>("");
  const [state, setState] = React.useState<string | string[]>("");
  const [singleDate, setSingleDate] = React.useState<Date | null>(null);
  const [rangeDate, setRangeDate] = React.useState<DateRange | null>(null);
  const [search, setSearch] = React.useState("");

  const activeCount = [outlet, state].filter((v) =>
    Array.isArray(v) ? v.length > 0 : !!v,
  ).length + (singleDate ? 1 : 0) + (rangeDate ? 1 : 0) + (search ? 1 : 0);

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <p className="text-xs text-gray-400 mb-3 hidden sm:block">
          Select, DatePicker, and SearchBar mixed together.
          DatePicker shows inline calendar in the drawer — no popover.
        </p>
        <FilterGroup
          labels={["Outlet", "State", "Single Date", "Date Range", "Search"]}
          activeCount={activeCount}
          onApply={() => console.log("applied", { outlet, state, singleDate, rangeDate, search })}
          onReset={() => {
            setOutlet(""); setState(""); setSingleDate(null); setRangeDate(null); setSearch("");
          }}
        >
          <Select options={outletOptions} value={outlet} onChange={setOutlet} placeholder="Select Outlet" />
          <Select options={stateOptions} value={state} onChange={setState} placeholder="Select State" />
          <DatePicker mode="single" value={singleDate} onChange={(d) => setSingleDate(d as Date | null)} placeholder="Pick a date" clearable />
          <DatePicker mode="range" value={rangeDate} onChange={(r) => setRangeDate(r as DateRange | null)} placeholder="Date range" clearable />
          <SearchBar value={search} onChange={setSearch} placeholder="Search..." />
        </FilterGroup>
      </div>

      <pre className="bg-gray-900 text-green-200 rounded-lg p-4 text-xs leading-relaxed">
        {JSON.stringify(
          {
            outlet,
            state,
            singleDate: singleDate?.toDateString() ?? null,
            rangeDate: rangeDate
              ? { from: rangeDate.from?.toDateString(), to: rangeDate.to?.toDateString() }
              : null,
            search,
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
}

// ── Story: forceDrawer (mobile preview on any viewport) ───────────────────────

function ForceDrawerStory() {
  const [outlet, setOutlet] = React.useState<string | string[]>("");
  const [state, setState] = React.useState<string | string[]>("");
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <div className="p-6 space-y-4 max-w-5xl">
      <p className="text-xs text-gray-400">
        <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">forceDrawer</code> always
        shows the trigger button regardless of viewport — useful for testing the drawer on desktop.
      </p>
      <FilterGroup
        labels={["Outlet", "State", "Date"]}
        activeCount={[outlet, state].filter((v) => Array.isArray(v) ? v.length > 0 : !!v).length + (date ? 1 : 0)}
        onApply={() => console.log("applied")}
        onReset={() => { setOutlet(""); setState(""); setDate(null); }}
        forceDrawer
      >
        <Select options={outletOptions} value={outlet} onChange={setOutlet} placeholder="Select Outlet" />
        <Select options={stateOptions} value={state} onChange={setState} placeholder="Select State" />
        <DatePicker mode="single" value={date} onChange={(d) => setDate(d as Date | null)} placeholder="Pick a date" clearable />
      </FilterGroup>
    </div>
  );
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Components/FilterGroup",
  component: FilterGroup,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FilterGroup>;

export default meta;
type Story = StoryObj<typeof FilterGroup>;

export const WithSelects: Story = {
  name: "Select filters",
  render: () => <WithSelectsStory />,
};

export const WithMixedComponents: Story = {
  name: "Mixed — Select + DatePicker + SearchBar",
  render: () => <WithMixedStory />,
};

export const MobileDrawerPreview: Story = {
  name: "Mobile drawer preview (forceDrawer)",
  render: () => <ForceDrawerStory />,
};
