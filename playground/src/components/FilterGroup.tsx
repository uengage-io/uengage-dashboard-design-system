import * as React from "react";
import { DatePicker, FilterGroup, SearchBar, Select } from "@uengage/ui";

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
  { label: "Punjab", value: "pb" },
  { label: "Delhi", value: "dl" },
  { label: "Maharashtra", value: "mh" },
  { label: "Karnataka", value: "ka" },
  { label: "Tamil Nadu", value: "tn" },
];

const cityOptions = [
  { label: "Chandigarh", value: "chd" },
  { label: "Delhi", value: "del" },
  { label: "Mumbai", value: "mum" },
  { label: "Pune", value: "pun" },
  { label: "Bangalore", value: "blr" },
  { label: "Chennai", value: "che" },
];

const dateOptions = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week (Sun–Today)", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "Last 7 Days", value: "last_7" },
  { label: "Last 14 Days", value: "last_14" },
  { label: "Last 30 Days", value: "last_30" },
];

export default function FilterGroupPreview() {
  const [outlet, setOutlet] = React.useState<string | string[]>("");
  const [legalEntity, setLegalEntity] = React.useState<string | string[]>("");
  const [state, setState] = React.useState<string | string[]>("");
  const [city, setCity] = React.useState<string | string[]>("");
  const [date, setDate] = React.useState<string | string[]>("today");

  const activeCount = [outlet, legalEntity, state, city].filter((v) =>
    Array.isArray(v) ? v.length > 0 : !!v,
  ).length + (date !== "today" ? 1 : 0);

  const handleReset = () => {
    setOutlet(""); setLegalEntity(""); setState(""); setCity(""); setDate("today");
  };

  return (
    <div
      style={{
        fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif",
        maxWidth: 900,
        margin: "0 auto",
        padding: "48px 32px 80px",
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>
          FilterGroup
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Wrap your existing components and add <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4, fontSize: 12 }}>labels</code>. That's it.
          Desktop shows a row. Mobile shows a drawer with flat lists.
        </p>
      </div>

      {/* ── Desktop row ─────────────────────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
          Desktop view
        </h2>
        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <FilterGroup
            labels={["Outlet", "Legal Entity", "State", "City", "Date"]}
            activeCount={activeCount}
            onApply={() => console.log("applied", { outlet, legalEntity, state, city, date })}
            onReset={handleReset}
          >
            <Select options={outletOptions} value={outlet} onChange={setOutlet} placeholder="Select Outlet" />
            <Select options={legalEntityOptions} value={legalEntity} onChange={setLegalEntity} placeholder="Select Legal Entity" />
            <Select options={stateOptions} value={state} onChange={setState} placeholder="Select State" />
            <Select options={cityOptions} value={city} onChange={setCity} placeholder="Select City" />
            <Select options={dateOptions} value={date} onChange={setDate} placeholder="Today" />
                     
          <DatePicker mode="range"/>

          </FilterGroup>
        </div>

        <pre style={{ background: "#111827", color: "#d1fae5", borderRadius: 8, padding: "12px 16px", fontSize: 11, lineHeight: 1.7, marginTop: 20, overflow: "auto" }}>
          {JSON.stringify({ outlet, legalEntity, state, city, date }, null, 2)}
        </pre>
      </section>

      {/* ── Mobile drawer preview ───────────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
          Mobile drawer preview
        </h2>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
          <code style={{ background: "#f3f4f6", padding: "1px 5px", borderRadius: 4, fontSize: 12 }}>forceDrawer</code> shows the trigger on any viewport. Tap to open.
        </p>
        <FilterGroup
          labels={["Outlet", "Legal Entity", "State", "City", "Date"]}
          activeCount={activeCount}
          onApply={() => console.log("applied")}
          onReset={handleReset}
          forceDrawer
        >
          <Select options={outletOptions} value={outlet} onChange={setOutlet} placeholder="Select Outlet" />
          <Select options={legalEntityOptions} value={legalEntity} onChange={setLegalEntity} placeholder="Select Legal Entity" />
          <Select options={stateOptions} value={state} onChange={setState} placeholder="Select State" />
          <Select options={cityOptions} value={city} onChange={setCity} placeholder="Select City" />
          <Select options={dateOptions} value={date} onChange={setDate} placeholder="Today" />
          <SearchBar/>
          <DatePicker  mode="range"
           />
        </FilterGroup>
      </section>
    </div>
  );
}
