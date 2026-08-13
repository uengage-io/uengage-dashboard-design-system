import { useState } from "react";
import { Sidebar, Select, Button, Input } from "@uengage/ui";
import { X } from "lucide-react";

/**
 * Repro harness for the multi-select chip overflow inside a sidebar.
 *
 * The wrapper markup below is copied verbatim from the dashboard's
 * `TagFormSidebar` "Map items to this tag" row — including the `flex-1` column
 * that has NO `min-w-0`. That was the trigger for the bug: a flex item's
 * min-width defaults to `auto`, so the column sized itself to the chips'
 * max-content width and dragged the whole control past the sidebar edge.
 *
 * What to check:
 *   1. Select many items — chips must stay inside the sidebar and collapse
 *      into a `+N` counter rather than spilling out or being cut off.
 *   2. Select one very long item — the single chip must truncate, not overflow.
 *   3. Drag the width slider — the counter must recount as the box resizes.
 *   4. Open the sidebar with items already selected — the count must be right
 *      on first paint, not only after a resize.
 */

const ITEMS = [
  { value: "1", label: "Paneer Butter Masala" },
  { value: "2", label: "Veg Hakka Noodles" },
  { value: "3", label: "Chilli Paneer Dry" },
  { value: "4", label: "Masala Chai" },
  { value: "5", label: "Tandoori Roti Butter" },
  { value: "6", label: "Dal Makhani Special" },
  { value: "7", label: "Shahi Paneer Handi Family Pack Serves Four People" },
  { value: "8", label: "Veg Biryani" },
  { value: "9", label: "Gulab Jamun (2 pcs)" },
  { value: "10", label: "Cold Coffee" },
  { value: "11", label: "Amritsari Kulcha with Chole and Pickle" },
  { value: "12", label: "Butter Naan" },
];

const SECTIONS = [
  { value: "starters", label: "Starters" },
  { value: "mains", label: "Main Course" },
  { value: "breads", label: "Breads" },
  { value: "desserts", label: "Desserts" },
];

/** One section + items row — the exact wrapper markup from the dashboard. */
function MappingRow({
  showRemove,
  onRemove,
}: {
  showRemove: boolean;
  onRemove: () => void;
}) {
  const [sectionId, setSectionId] = useState("");
  const [itemIds, setItemIds] = useState<string[]>([]);

  return (
    // ↓↓↓ verbatim from TagFormSidebar — `flex-1` with no `min-w-0`
    <div className="flex items-start gap-2">
      <div className="flex-1 flex flex-col gap-3">
        <Select
          label="Section"
          options={SECTIONS}
          value={sectionId}
          onChange={(value) => setSectionId(String(value))}
          search
        />
        <Select
          label="Items"
          options={ITEMS}
          value={itemIds}
          onChange={(value) => setItemIds(value as string[])}
          mode="multi"
          search
        />
      </div>
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="mt-6 text-gray-400 hover:text-red-500 shrink-0"
          aria-label="Remove this row"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default function SidebarMultiSelectPreview() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([0]);
  const [nextRow, setNextRow] = useState(1);

  // Pre-selected on mount — catches the "measured while hidden at width 0" case.
  const [preselected, setPreselected] = useState<string[]>([
    "1",
    "2",
    "3",
    "7",
    "11",
  ]);

  // Manual width control — exercises the ResizeObserver recount.
  const [boxWidth, setBoxWidth] = useState(280);

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-lg font-semibold">Sidebar · multi-select overflow</h1>
      <p className="text-sm text-gray-500 max-w-xl">
        Chips must never leave the sidebar. Once they stop fitting they should
        collapse into a <code>+N</code> counter that stays visible.
      </p>

      <Button onClick={() => setOpen(true)}>Open “Create tag” sidebar</Button>

      <Sidebar
        open={open}
        onOpenChange={setOpen}
        side="right"
        size="md"
        heading="Create tag"
        closeIcon
        divider
        closeOnOutsideClick
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
            <Input label="Tag name" placeholder="e.g. Chef's specials" />

            {/* 1 — pre-selected on mount, inside the unconstrained column */}
            <div className="rounded-lg border border-gray-100 p-4 flex flex-col gap-3">
              <h6 className="font-semibold text-sm">
                1 · Pre-selected before the sidebar ever opened
              </h6>
              <p className="text-xs text-gray-400">
                The count has to be right on first paint — the sidebar was
                mounted at zero width.
              </p>
              <div className="flex items-start gap-2">
                <div className="flex-1 flex flex-col gap-3">
                  <Select
                    label="Items"
                    options={ITEMS}
                    value={preselected}
                    onChange={(value) => setPreselected(value as string[])}
                    mode="multi"
                    search
                  />
                </div>
              </div>
            </div>

            {/* 2 — the dashboard's actual repeating row */}
            <div className="rounded-lg border border-gray-100 p-4 flex flex-col gap-3">
              <h6 className="font-semibold text-sm">
                2 · Map items to this tag
              </h6>
              <p className="text-xs text-gray-400">
                Same markup as <code>TagFormSidebar</code>, including the{" "}
                <code>flex-1</code> column with no <code>min-w-0</code>.
              </p>
              {rows.map((id, i) => (
                <MappingRow
                  key={id}
                  showRemove={rows.length > 1}
                  onRemove={() => setRows((r) => r.filter((_, j) => j !== i))}
                />
              ))}
              <Button
                type="button"
                variant="tertiary"
                size="xs"
                className="self-start"
                onClick={() => {
                  setRows((r) => [...r, nextRow]);
                  setNextRow((n) => n + 1);
                }}
              >
                Add row
              </Button>
            </div>

            {/* 3 — live resize, to exercise the recount */}
            <div className="rounded-lg border border-gray-100 p-4 flex flex-col gap-3">
              <h6 className="font-semibold text-sm">3 · Live resize</h6>
              <p className="text-xs text-gray-400">
                Drag the slider — the <code>+N</code> counter should recount as
                the box grows and shrinks.
              </p>
              <input
                type="range"
                min={120}
                max={420}
                value={boxWidth}
                onChange={(e) => setBoxWidth(Number(e.target.value))}
              />
              <span className="text-xs text-gray-400">{boxWidth}px</span>
              <div style={{ width: boxWidth }} className="border border-dashed border-red-300 p-1">
                <div className="flex items-start gap-2">
                  <div className="flex-1 flex flex-col gap-3">
                    <Select
                      label="Items"
                      options={ITEMS}
                      value={preselected}
                      onChange={(value) => setPreselected(value as string[])}
                      mode="multi"
                      search
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4 — sizes, and the single-long-chip case */}
            <div className="rounded-lg border border-gray-100 p-4 flex flex-col gap-3">
              <h6 className="font-semibold text-sm">
                4 · Sizes · one very long label
              </h6>
              <p className="text-xs text-gray-400">
                A single chip whose label is wider than the box must truncate,
                never overflow.
              </p>
              {(["xs", "sm", "md", "lg"] as const).map((s) => (
                <SizedRow key={s} size={s} />
              ))}
            </div>
          </div>

          <div className="p-5 border-t border-gray-100 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save tag</Button>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

function SizedRow({ size }: { size: "xs" | "sm" | "md" | "lg" }) {
  const [value, setValue] = useState<string[]>(["7", "11"]);
  return (
    <div className="flex items-start gap-2">
      <div className="flex-1 flex flex-col gap-3">
        <Select
          label={size}
          size={size}
          options={ITEMS}
          value={value}
          onChange={(v) => setValue(v as string[])}
          mode="multi"
          search
        />
      </div>
    </div>
  );
}
