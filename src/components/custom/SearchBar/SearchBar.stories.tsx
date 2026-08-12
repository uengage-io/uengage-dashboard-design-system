import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "./SearchBar";

const meta = {
  title: "Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Leading-glyph search field matching the Design Console page `Search and Filters.dc.html` — 32 / 38 / 44px heights, 8px radius, `#1F5E2C` focus border with the 3px lime halo. Eight states: empty, hover, focused, typing, searching, has-results, no-results, disabled. `valueType` restricts the input charset (`string` | `number` | `alphanumeric`). Feed suggestions either as a string list via `dropdownContent` or as structured objects via `dropdownItems` + `getLabel` / `getValue`.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    searching: { control: "boolean" },
    noResults: { control: "boolean" },
    clearable: { control: "boolean" },
    resultCount: { control: "number" },
    shortcut: { control: "text" },
    message: { control: "text" },
    debounce: { control: "number" },
    valueType: {
      control: "radio",
      options: ["string", "number", "alphanumeric"],
    },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    placeholder: { control: "text" },
    label: { control: "text" },
    required: { control: "boolean" },
    width: { control: "text" },
    fallbackText: { control: "text" },
    onChange: { action: "change" },
    onSearch: { action: "search" },
    onSelect: { action: "select" },
    onClear: { action: "clear" },
  },
  args: {
    size: "md",
    valueType: "string",
    placeholder: "Search orders, customers, outlets…",
    width: "w-full sm:w-80",
    disabled: false,
    readOnly: false,
    required: false,
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: "sm", placeholder: "Small" } };
export const Large: Story = { args: { size: "lg", placeholder: "Large" } };

export const SizeScale: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The three heights off the design's size picker — 32 / 38 / 44px. Font (12/13/14), glyph (14/15/17) and the clear circle (17/19/21) scale with them; the 8px radius does not.",
      },
    },
  },
  render: (args) => (
    <div className="flex w-80 flex-col gap-5">
      {(["sm", "md", "lg"] as const).map((s) => (
        <SearchBar
          {...args}
          key={s}
          size={s}
          label={s.toUpperCase()}
          shortcut="⌘K"
        />
      ))}
    </div>
  ),
  args: { width: "w-full" },
};

export const NumberOnly: Story = {
  args: { valueType: "number", placeholder: "Order ID (numbers only)" },
};

export const Alphanumeric: Story = {
  args: { valueType: "alphanumeric", placeholder: "SKU (A–Z, 0–9)" },
};

// ── The eight states off the design's "Search states" grid ──────────────

export const StateEmpty: Story = {
  name: "State — Empty",
  parameters: {
    docs: {
      description: {
        story:
          "Resting state. `#E2E2E2` hairline, `#9C9C9C` placeholder that names what is searchable, and the shortcut badge pinned right.",
      },
    },
  },
  args: { shortcut: "⌘K", message: "Placeholder names what is searchable." },
};

export const StateHover: Story = {
  name: "State — Hover",
  parameters: {
    docs: {
      description: {
        story:
          "Hover the field: the border deepens to `#C6C6C6`. Nothing else moves.",
      },
    },
  },
  args: { shortcut: "⌘K", message: "Border deepens to #C6C6C6 on hover." },
};

export const StateFocused: Story = {
  name: "State — Focused",
  parameters: {
    docs: {
      description: {
        story:
          "Focus paints the `#1F5E2C` border plus the 3px lime halo, and drops the recent searches below. Click into the field to see it.",
      },
    },
  },
  args: {
    recents: ["UE-90412", "Ananya Verma", "+91 95011 74711"],
    message: "Recent searches drop down below.",
  },
};

export const StateTyping: Story = {
  name: "State — Typing",
  parameters: {
    docs: {
      description: {
        story:
          "A value plus focus. The clear circle appears; `debounce` holds the query for 300ms of quiet before `onDebouncedChange` fires.",
      },
    },
  },
  render: function TypingStory(args) {
    const [value, setValue] = React.useState("UE-904");
    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(v) => setValue(String(v))}
        clearable
        debounce={300}
      />
    );
  },
  args: { message: "Debounced 300ms before the query fires." },
};

export const StateSearching: Story = {
  name: "State — Searching",
  parameters: {
    docs: {
      description: {
        story:
          "`searching` swaps the magnifier for a spinner and keeps the focus ring. The field is deliberately still typeable — it never disables while a query is in flight.",
      },
    },
  },
  render: (args) => (
    <SearchBar {...args} defaultValue="UE-904" searching clearable />
  ),
  args: { message: "Spinner replaces the glass — field stays typeable." },
};

export const StateHasResults: Story = {
  name: "State — Has results",
  parameters: {
    docs: {
      description: {
        story:
          "Query settled. Border returns to the hairline and `resultCount` renders the live count under the field in brand green.",
      },
    },
  },
  render: (args) => (
    <SearchBar {...args} defaultValue="UE-904" resultCount={12} clearable />
  ),
  args: {},
};

export const StateNoResults: Story = {
  name: "State — No results",
  parameters: {
    docs: {
      description: {
        story:
          "`noResults` paints the amber `#EFD98A` border and amber glyph. Pass `suggestion` for a did-you-mean the operator can apply in one click.",
      },
    },
  },
  render: (args) => (
    <SearchBar
      {...args}
      defaultValue="sectr 17"
      noResults
      clearable
      suggestion={{
        label: "Sector 17",
        onApply: () => console.log("apply suggestion"),
      }}
    />
  ),
  args: {},
};

export const Disabled: Story = {
  name: "State — Disabled",
  parameters: {
    docs: {
      description: {
        story:
          "`#F3F5F9` fill, `#C6C6C6` value and glyph, `not-allowed` cursor. Use the message to say why the field is out of service.",
      },
    },
  },
  render: (args) => (
    <SearchBar {...args} defaultValue="Search unavailable" disabled />
  ),
  args: { message: "Search index is rebuilding." },
};

export const AllStates: Story = {
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "All eight states side by side at Medium, as the design lays them out.",
      },
    },
  },
  render: (args) => {
    const states: Array<{ label: string; node: React.ReactNode }> = [
      {
        label: "Empty",
        node: (
          <SearchBar
            {...args}
            shortcut="⌘K"
            message="Placeholder names what is searchable."
          />
        ),
      },
      {
        label: "Hover",
        node: (
          <SearchBar {...args} shortcut="⌘K" message="Border deepens to #C6C6C6." />
        ),
      },
      {
        label: "Focused",
        node: <SearchBar {...args} message="Recent searches drop down below." />,
      },
      {
        label: "Typing",
        node: (
          <SearchBar
            {...args}
            defaultValue="UE-904"
            clearable
            message="Debounced 300ms before the query fires."
          />
        ),
      },
      {
        label: "Searching",
        node: (
          <SearchBar
            {...args}
            defaultValue="UE-904"
            searching
            clearable
            message="Spinner replaces the glass — field stays typeable."
          />
        ),
      },
      {
        label: "Has results",
        node: (
          <SearchBar
            {...args}
            defaultValue="UE-904"
            resultCount={12}
            clearable
          />
        ),
      },
      {
        label: "No results",
        node: (
          <SearchBar
            {...args}
            defaultValue="sectr 17"
            noResults
            clearable
            suggestion={{ label: "Sector 17" }}
          />
        ),
      },
      {
        label: "Disabled",
        node: (
          <SearchBar
            {...args}
            defaultValue="Search unavailable"
            disabled
            message="Search index is rebuilding."
          />
        ),
      },
    ];
    return (
      <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(252px,1fr))]">
        {states.map((s) => (
          <div key={s.label} className="flex flex-col gap-[7px]">
            <span className="flex items-center gap-[7px]">
              <span className="text-[10px] font-semibold uppercase leading-[1.3] tracking-[.09em] text-[#787878]">
                {s.label}
              </span>
              <span className="h-px flex-1 bg-[#EEEEEE]" />
            </span>
            {s.node}
          </div>
        ))}
      </div>
    );
  },
  args: { width: "w-full" },
};

export const WithShortcutBadge: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The `⌘K` badge is a hint for an empty field — it disappears the moment there is a value, handing the slot to the clear button. Type to see the swap.",
      },
    },
  },
  args: { shortcut: "⌘K", clearable: true },
};

export const WithRecents: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Recent searches render on focus, before anything is typed. Each entry is individually removable; picking one fills the field and fires `onSelectRecent` (falling back to `onSearch`).",
      },
    },
  },
  render: function RecentsStory(args) {
    const [recents, setRecents] = React.useState([
      "UE-90412",
      "Ananya Verma",
      "+91 95011 74711",
    ]);
    return (
      <SearchBar
        {...args}
        shortcut="⌘K"
        recents={recents}
        onRemoveRecent={(v) => setRecents((r) => r.filter((x) => x !== v))}
      />
    );
  },
  args: {},
};

export const DebouncedSearch: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`debounce={300}` matches the design's rule — search fires 300ms after typing stops, and there is never a Search button. `onChange` stays immediate so controlled inputs keep up.",
      },
    },
  },
  render: function DebouncedStory(args) {
    const [value, setValue] = React.useState("");
    const [committed, setCommitted] = React.useState("");
    const [searching, setSearching] = React.useState(false);
    return (
      <div className="flex flex-col gap-2">
        <SearchBar
          {...args}
          value={value}
          clearable
          searching={searching}
          debounce={300}
          onChange={(v) => {
            setValue(String(v));
            setSearching(String(v).trim().length > 0);
          }}
          onDebouncedChange={(v) => {
            setCommitted(String(v));
            setSearching(false);
          }}
        />
        <code className="text-xs text-[#787878]">
          committed: {`"${committed}"`}
        </code>
      </div>
    );
  },
  args: {},
};

export const ReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The input shows a fixed value on the `#FAFFF7` read-only surface with a `default` cursor. The text field, search glyph, and clear button are all non-interactive.",
      },
    },
  },
  render: (args) => (
    <SearchBar
      {...args}
      label="Order reference"
      value="ORD-20240512"
      readOnly
    />
  ),
  args: {},
};

const CITIES = [
  "Chandigarh",
  "Mohali",
  "Panchkula",
  "Delhi",
  "Gurgaon",
  "Noida",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
];

export const WithStringDropdown: Story = {
  render: (args) => (
    <SearchBar
      {...args}
      placeholder="Search cities…"
      dropdownItems={CITIES}
      getLabel={(c: string) => c}
    />
  ),
  args: {},
};

type Driver = { id: string; name: string; zone: string };
const DRIVERS: Driver[] = [
  { id: "DR-001", name: "Rahul Sharma", zone: "Sector 17" },
  { id: "DR-002", name: "Aman Kaur", zone: "Sector 22" },
  { id: "DR-003", name: "Priya Singh", zone: "Phase 8B" },
  { id: "DR-004", name: "Vikas Verma", zone: "Industrial Area" },
];

export const WithObjectDropdown: Story = {
  render: (args) => (
    <SearchBar
      {...args}
      placeholder="Search drivers…"
      dropdownItems={DRIVERS}
      getLabel={(d: Driver) => `${d.name} · ${d.zone}`}
      getValue={(d: Driver) => d.id}
    />
  ),
  args: { width: "w-full md:w-96" },
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState<string>("");
    return (
      <div className="flex flex-col gap-2">
        <SearchBar
          {...args}
          value={value}
          onChange={(v) => setValue(String(v))}
        />
        <code className="text-xs text-[#6B7280]">value: {`"${value}"`}</code>
      </div>
    );
  },
  args: { placeholder: "Type something…" },
};

export const WithLabel: Story = {
  args: {
    label: "Search Orders",
    placeholder: "Search…",
  },
};

export const WithLabelRequired: Story = {
  args: {
    label: "Search Orders",
    required: true,
    placeholder: "Search…",
  },
};

export const WithLabelAndDropdown: Story = {
  render: (args) => {
    const drivers = [
      { id: "DR-001", name: "Rahul Sharma", zone: "Sector 17" },
      { id: "DR-002", name: "Aman Kaur", zone: "Sector 22" },
      { id: "DR-003", name: "Priya Singh", zone: "Phase 8B" },
    ];
    return (
      <SearchBar
        {...args}
        label="Search Drivers"
        required
        placeholder="Search by name…"
        dropdownItems={drivers}
        getLabel={(d) => `${d.name} · ${d.zone}`}
        getValue={(d) => d.id}
      />
    );
  },
  args: { width: "w-full md:w-96" },
};
