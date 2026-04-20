import { useState } from "react";
import { SearchBar, Select } from "@uengage/ui";

/* ── Mock API data shapes ─────────────────────────────────────── */

interface Restaurant {
  id: number;
  name: string;
  city: string;
  active: boolean;
}

interface Tag {
  tagId: string;
  displayName: string;
  archived: boolean;
}

const RESTAURANTS: Restaurant[] = [
  { id: 1, name: "The Burger Lab", city: "Bangalore", active: true },
  { id: 2, name: "Pizzeria Roma", city: "Mumbai", active: true },
  { id: 3, name: "Sushi Den", city: "Delhi", active: true },
  { id: 4, name: "Taco Town", city: "Pune", active: false },
  { id: 5, name: "Noodle House", city: "Hyderabad", active: true },
  { id: 6, name: "The Salad Bowl", city: "Chennai", active: true },
];

const TAGS: Tag[] = [
  { tagId: "veg", displayName: "Vegetarian", archived: false },
  { tagId: "vegan", displayName: "Vegan", archived: false },
  { tagId: "spicy", displayName: "Spicy", archived: false },
  { tagId: "gluten_free", displayName: "Gluten Free", archived: false },
  { tagId: "halal", displayName: "Halal Certified", archived: false },
  { tagId: "legacy", displayName: "Legacy Menu", archived: true },
];

const CITY_STRINGS = ["Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Kolkata"];

/* ── Layout helpers ───────────────────────────────────────────── */

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ borderTop: "1px solid #E5E7EB", paddingTop: 24, marginTop: 24 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: subtitle ? 4 : 16 }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 16 }}>{subtitle}</p>}
      {children}
    </section>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ marginTop: 6, fontSize: 12, color: "#9CA3AF" }}>{hint}</p>}
    </div>
  );
}

function Tag_({ label }: { label: string }) {
  return (
    <span style={{ display: "inline-block", background: "#E6F4EA", color: "#006F42", borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 600 }}>
      {label}
    </span>
  );
}

/* ── Main preview ─────────────────────────────────────────────── */

export default function ComponentsPreview() {
  /* SearchBar state */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cityQuery, setCityQuery] = useState("");

  /* Select state */
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>("");
  const [activeRestaurantIds, setActiveRestaurantIds] = useState<string[]>([]);

  return (
    <div style={{ fontFamily: "Figtree, sans-serif", maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: "#111827" }}>SearchBar + Select</h1>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 36 }}>
        Dynamic data via <code>dropdownItems</code> / <code>items</code> + <code>getLabel</code> / <code>getValue</code>
      </p>

      {/* ── SearchBar: no dropdown ── */}
      <Section title="SearchBar — plain search" subtitle="No dropdown. onSearch fires on Enter or icon click.">
        <Field
          label="Search query"
          hint={searchResult ? `onSearch fired: "${searchResult}"` : "Type something and press Enter or click search"}
        >
          <SearchBar
            value={searchQuery as string}
            placeholder="Search anything…"
            width={320}
            onChange={(v) => setSearchQuery(v as string)}
            onSearch={(v) => setSearchResult(v as string)}
            onClear={() => { setSearchQuery(""); setSearchResult(null); }}
          />
        </Field>
      </Section>

      {/* ── SearchBar: static string dropdown ── */}
      <Section title="SearchBar — static string dropdown" subtitle="Pass dropdownItems with strings; getLabel returns the string itself.">
        <Field
          label="City search"
          hint={cityQuery ? `Current input: "${cityQuery}"` : "Type a city name to see fuzzy suggestions"}
        >
          <SearchBar
            placeholder="Search cities…"
            width={320}
            dropdownItems={CITY_STRINGS}
            getLabel={(s) => s}
            getValue={(s) => s}
            onChange={(v) => setCityQuery(v as string)}
            onSelect={(value) => setCityQuery(value)}
            onClear={() => setCityQuery("")}
          />
        </Field>
      </Section>

      {/* ── SearchBar: dynamic objects ── */}
      <Section title="SearchBar — dynamic object list" subtitle="dropdownItems receives Restaurant[]. getLabel/getValue map fields. onSelect receives raw item.">
        <Field
          label="Restaurant search"
          hint={
            selectedRestaurant
              ? `Selected: id=${selectedRestaurant.id} · ${selectedRestaurant.name} · ${selectedRestaurant.city} · active=${String(selectedRestaurant.active)}`
              : "Pick a restaurant to see the raw object"
          }
        >
          <SearchBar<string, Restaurant>
            placeholder="Search restaurants…"
            width={360}
            dropdownItems={RESTAURANTS}
            getLabel={(r) => `${r.name} — ${r.city}`}
            getValue={(r) => String(r.id)}
            onSelect={(_value, item) => item && setSelectedRestaurant(item)}
            onClear={() => setSelectedRestaurant(null)}
          />
        </Field>

        {selectedRestaurant && (
          <div style={{ background: "#F9FAFB", border: "1psolid #E5E7EB", borderRadius: 8, padding: "12px 16px", fontSize: 12, fontFamily: "monospace", color: "#374151" }}>
            {JSON.stringify(selectedRestaurant, null, 2)}
          </div>
        )}
      </Section>

      {/* ── SearchBar: sizes ── */}
      <Section title="SearchBar — sizes">
        <Field label="sm">
          <SearchBar size="sm" placeholder="Small search…" width={280} />
        </Field>
        <Field label="md (default)">
          <SearchBar size="md" placeholder="Medium search…" width={280} />
        </Field>
        <Field label="lg">
          <SearchBar size="lg" placeholder="Large search…" width={280} />
        </Field>
        <Field label="Custom height (48px)">
          <SearchBar height={48} placeholder="Custom height…" width={280} />
        </Field>
        <Field label="Disabled">
          <SearchBar disabled placeholder="Disabled…" width={280} />
        </Field>
      </Section>

      {/* ── Select: dynamic objects (items prop) ── */}
      <Section title="Select — dynamic object list (items prop)" subtitle="items receives Tag[]. getLabel/getValue/getDisabled map fields.">
        <Field
          label="Single tag (archived items disabled)"
          hint={selectedTag ? `value: "${selectedTag}"` : "Nothing selected"}
        >
          <Select<Tag>
            items={TAGS}
            getLabel={(t) => t.displayName}
            getValue={(t) => t.tagId}
            getDisabled={(t) => t.archived}
            value={selectedTag}
            placeholder="Choose a tag…"
            width={280}
            onChange={(v) => setSelectedTag(v as string)}
          />
        </Field>

        <Field
          label="Multi tag (archived items disabled)"
          hint={selectedTags.length ? `${selectedTags.length} selected: ${selectedTags.join(", ")}` : "Nothing selected"}
        >
          <Select<Tag>
            items={TAGS}
            getLabel={(t) => t.displayName}
            getValue={(t) => t.tagId}
            getDisabled={(t) => t.archived}
            mode="multi"
            value={selectedTags}
            placeholder="Choose tags…"
            width={340}
            onChange={(v) => setSelectedTags(v as string[])}
          />
        </Field>
      </Section>

      {/* ── Select: dynamic objects (restaurants) ── */}
      <Section title="Select — Restaurant objects" subtitle="Inactive restaurants are disabled via getDisabled.">
        <Field
          label="Single restaurant"
          hint={
            selectedRestaurantId
              ? `id: ${selectedRestaurantId} · ${RESTAURANTS.find((r) => String(r.id) === selectedRestaurantId)?.name}`
              : "Nothing selected"
          }
        >
          <Select<Restaurant>
            items={RESTAURANTS}
            getLabel={(r) => `${r.name} — ${r.city}`}
            getValue={(r) => String(r.id)}
            getDisabled={(r) => !r.active}
            value={selectedRestaurantId}
            placeholder="Choose a restaurant…"
            width={320}
            onChange={(v) => setSelectedRestaurantId(v as string)}
          />
        </Field>

        <Field
          label="Multi restaurant (inactive disabled)"
          hint={activeRestaurantIds.length ? `${activeRestaurantIds.length} selected` : "Nothing selected"}
        >
          <Select<Restaurant>
            items={RESTAURANTS}
            getLabel={(r) => `${r.name} — ${r.city}`}
            getValue={(r) => String(r.id)}
            getDisabled={(r) => !r.active}
            mode="multi"
            value={activeRestaurantIds}
            placeholder="Select restaurants…"
            width={400}
            onChange={(v) => setActiveRestaurantIds(v as string[])}
          />
        </Field>
      </Section>

      {/* ── Prop reference ── */}
      <Section title="Prop reference">
        <table style={{ fontSize: 12, color: "#374151", borderCollapse: "collapse", width: "100%", lineHeight: 1.7 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E5E7EB" }}>
              <th style={{ textAlign: "left", padding: "6px 12px 6px 0", color: "#6B7280" }}>Prop</th>
              <th style={{ textAlign: "left", padding: "6px 12px", color: "#6B7280" }}>Component</th>
              <th style={{ textAlign: "left", padding: "6px 0", color: "#6B7280" }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["dropdownItems", "SearchBar", "Any TItem[]; pair with getLabel/getValue"],
              ["getLabel", "SearchBar / Select", "Extract display string from TItem"],
              ["getValue", "SearchBar / Select", "Extract key/value string from TItem"],
              ["getDisabled", "Select", "Return true to disable a TItem row"],
              ["onSelect(value, item?)", "SearchBar", "Fires when a dropdown row is picked; item is the raw TItem"],
              ["items", "Select", "Any TItem[]; pair with getLabel/getValue"],
              ["mode", "Select", '"single" | "multi"'],
              ["onChange(value)", "Select", "string in single mode, string[] in multi"],
            ].map(([prop, comp, desc]) => (
              <tr key={prop} style={{ borderBottom: "1px solid #F3F4F6" }}>
                <td style={{ padding: "6px 12px 6px 0", fontFamily: "monospace", color: "#006F42" }}>{prop}</td>
                <td style={{ padding: "6px 12px" }}>
                  {comp!.split(" / ").map((c) => <Tag_ key={c} label={c} />)}
                </td>
                <td style={{ padding: "6px 0", color: "#6B7280" }}>{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
