# Custom Components Reference

All components live under `src/components/custom/`. They wrap or extend shadcn/ui primitives and share the design token system from `src/utils/`.

---

## Table of Contents

1. [Button](#button)
2. [Input](#input)
3. [Select](#select)
4. [Checkbox](#checkbox)
5. [Radio](#radio)
6. [Tabs](#tabs)
7. [Toggle](#toggle)
8. [Table](#table)
9. [Layout](#layout)
10. [Card](#card)
11. [Grid](#grid)
12. [Modal](#modal)
13. [AlertDialog](#alertdialog)
14. [Pagination](#pagination)
15. [StatusBadge](#statusbadge)
16. [SearchBar](#searchbar)
17. [DatePicker](#datepicker)
18. [Sidebar](#sidebar)

---

## Button

**File:** `Button/button.tsx`

A styled button with gradient borders, built-in loading state, and icon slots. Supports six color variants with full interactive state management (hover, pressed, focused, disabled).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "tertiary" \| "alertPrimary" \| "warningPrimary" \| "alertSecondary"` | `"primary"` | Visual style variant |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Controls padding, text, and icon size |
| `loading` | `boolean` | `false` | Shows spinner, hides content, sets `aria-busy`, blocks clicks |
| `loadingIcon` | `ReactNode` | `<Loader2>` | Custom spinner to show while loading |
| `leftIcon` | `ReactNode` | — | Icon rendered before the label |
| `rightIcon` | `ReactNode` | — | Icon rendered after the label |
| `title` | `ReactNode` | — | Label text when `children` is not provided |
| `asChild` | `boolean` | `false` | Renders as a Radix `Slot` — wraps the child element instead of a `<button>` |
| `disabled` | `boolean` | `false` | Disables interaction and applies muted styling |
| + all native `<button>` props | | | |

### Variants

| Variant | Description |
|---|---|
| `primary` | Solid green gradient — main CTA |
| `secondary` | White/outlined with green gradient border |
| `tertiary` | Transparent with underline, no border |
| `alertPrimary` | Red pill — destructive/alert action |
| `alertSecondary` | White outlined red pill — softer destructive |
| `warningPrimary` | Yellow/amber pill — warning action |

### Size Scale

| Size | Padding | Font | Icon |
|---|---|---|---|
| `xs` | 6 × 10 px | 10 px | 10 px |
| `sm` | 8 × 12 px | 12 px | 14 px |
| `md` | 10 × 14 px (12 × 16 px on sm+) | 14 / 16 px | 15 / 16 px |
| `lg` | 14 × 18 px (20 × 24 px on sm+) | 16 / 18 px | 16 px |

### Example

```tsx
import { Button } from "@/components/custom/Button/button";
import { Save } from "lucide-react";

// Basic
<Button variant="primary" size="md">Save</Button>

// With icons
<Button variant="secondary" leftIcon={<Save />} size="sm">
  Save Draft
</Button>

// Loading state
<Button variant="primary" loading>Saving…</Button>

// Destructive
<Button variant="alertPrimary" size="sm">Delete</Button>

// Render as anchor via asChild
<Button asChild variant="tertiary">
  <a href="/settings">Settings</a>
</Button>
```

---

## Input

**Files:** `Input/Input.tsx`, `Input/InputLabel.tsx`, `Input/InputHelper.tsx`

A full-featured form input with label, helper/error text, icon slots, password toggle, fuzzy-search suggestion dropdown, input pattern filtering, and client-side validation.

### Props (`Input`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Controls height, padding, and font size |
| `inputType` | `"text" \| "password" \| "number" \| "email" \| "tel" \| ...` | `"text"` | HTML `type` attribute. Password type auto-adds eye toggle |
| `label` | `ReactNode` | — | Label rendered above the input |
| `required` | `boolean` | — | Adds a red asterisk to the label |
| `helperText` | `string` | — | Gray helper text shown below the input |
| `error` | `string` | — | Red error text shown below (overrides `helperText`) |
| `leftIcon` | `ReactNode` | — | Icon in the left slot |
| `rightIcon` | `ReactNode` | — | Icon in the right slot (overrides the password eye toggle) |
| `allowPattern` | `"alphanumeric" \| "alpha" \| "numeric" \| "decimal" \| "phone" \| "none"` | — | Strips characters not matching the pattern on every keystroke |
| `validationRegex` | `string \| RegExp` | — | Custom regex validated on blur |
| `validationMessage` | `string` | — | Error message shown when `validationRegex` fails |
| `suggestions` | `Array<{ label: string; value: string }>` | — | Fuzzy-search suggestion list shown as a dropdown when focused |
| `onSuggestionSelect` | `(value: string) => void` | — | Called when a suggestion is clicked |
| `onTouch` | `() => void` | — | Fires once the first time the field is blurred after interaction |
| `width` | `string` | — | Tailwind width class applied to the outer wrapper |
| `readOnly` | `boolean` | — | Read-only styled state |
| `disabled` | `boolean` | — | Disabled styled state |
| + all native `<input>` props | | | |

### States

`default` → `focused` → `error` → `disabled` → `readonly`

### Example

```tsx
import { Input } from "@/components/custom/Input";

// Basic
<Input label="Email" inputType="email" placeholder="you@example.com" />

// With error
<Input
  label="Username"
  error="Username is taken"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

// Password
<Input label="Password" inputType="password" required />

// Numeric only with icon
<Input
  label="Amount"
  allowPattern="numeric"
  leftIcon={<IndianRupee />}
  size="lg"
/>

// With suggestions
<Input
  label="City"
  suggestions={[
    { label: "New Delhi", value: "new_delhi" },
    { label: "Mumbai", value: "mumbai" },
  ]}
  onSuggestionSelect={(val) => console.log(val)}
/>
```

---

## Select

**Files:** `Select/Select.tsx`, `Select/Select.types.ts`

A searchable single/multi select with fuzzy filtering, pill overflow with `+N` badge, and optional select-all for multi mode. Supports both simple `options` arrays and generic `items` with custom mappers.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SelectOption[]` | — | Simple `{ value, label, disabled? }` array |
| `items` | `TItem[]` | — | Any array — use with `getLabel` / `getValue` / `getDisabled` |
| `getLabel` | `(item: TItem) => string` | — | Extract display label from an item |
| `getValue` | `(item: TItem) => string` | — | Extract option value from an item |
| `getDisabled` | `(item: TItem) => boolean` | — | Mark an item disabled |
| `mode` | `"single" \| "multi"` | `"single"` | Single or multi-select |
| `value` | `string \| string[]` | — | Controlled selected value(s) |
| `defaultValue` | `string \| string[]` | — | Uncontrolled initial value(s) |
| `onChange` | `(value: string \| string[]) => void` | — | Called on selection change |
| `onTouch` | `() => void` | — | Fires once the first time the trigger is blurred after interacting |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Controls trigger height, padding, and font |
| `placeholder` | `string` | — | Placeholder text when nothing is selected |
| `disabled` | `boolean` | — | Disables the whole select |
| `width` | `string` | — | Tailwind width class for the trigger wrapper |
| `className` | `string` | — | Additional class on the wrapper |
| `spellCheck` | `boolean` | `true` | Browser spell-check on the search input |

### Example

```tsx
import { Select } from "@/components/custom/Select";

// Simple single
<Select
  options={[
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ]}
  placeholder="Select role"
  onChange={(val) => console.log(val)}
/>

// Multi with generic items
<Select
  mode="multi"
  items={teams}
  getLabel={(t) => t.name}
  getValue={(t) => t.id}
  value={selected}
  onChange={(vals) => setSelected(vals as string[])}
  placeholder="Select teams"
/>

// Compact xs trigger
<Select options={statusOptions} size="xs" width="w-40" />
```

---

## Checkbox

**Files:** `Checkbox/Checkbox.tsx`, `Checkbox/CheckboxGroup.tsx`

An accessible checkbox supporting checked, unchecked, and indeterminate states. `CheckboxGroup` adds layout management, select-all, and grouped error/helper text.

### Props (`Checkbox`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | — | Label text (max 10 words; longer labels are truncated with ellipsis) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Box and label scale |
| `checked` | `boolean \| "indeterminate"` | — | Controlled state |
| `defaultChecked` | `boolean` | — | Uncontrolled initial state |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | — | State change callback |
| `disabled` | `boolean` | — | Disables and mutes the control |
| `error` | `boolean` | — | Applies red border |
| `id` | `string` | auto | HTML id for the input — auto-generated if omitted |
| + Radix `Checkbox.Root` props | | | |

### Props (`CheckboxGroup`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `TItem[]` | — | Data array |
| `getLabel` | `(item: TItem) => ReactNode` | — | Extract label |
| `getValue` | `(item: TItem) => string` | — | Extract value |
| `getDisabled` | `(item: TItem) => boolean` | — | Mark item disabled |
| `value` | `string[]` | — | Controlled checked values |
| `defaultValue` | `string[]` | — | Uncontrolled initial values |
| `onChange` | `(values: string[]) => void` | — | Called when selection changes |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Passed to each checkbox |
| `layout` | `"vertical" \| "horizontal" \| "grid"` | `"vertical"` | Arrangement of checkboxes |
| `showSelectAll` | `boolean` | — | Adds a "Select all" item at the top |
| `selectAllLabel` | `ReactNode` | `"Select All"` | Label for the select-all checkbox |
| `helperText` | `string` | — | Helper text below the group |
| `error` | `string` | — | Error text below the group (red) |
| `disabled` | `boolean` | — | Disables all checkboxes |

### Example

```tsx
import { Checkbox } from "@/components/custom/Checkbox";
import { CheckboxGroup } from "@/components/custom/Checkbox";

// Single
<Checkbox label="Accept terms" onCheckedChange={(c) => console.log(c)} />

// Indeterminate parent
<Checkbox label="Select all" checked="indeterminate" />

// Group with select-all
<CheckboxGroup
  items={permissions}
  getLabel={(p) => p.name}
  getValue={(p) => p.id}
  value={selected}
  onChange={setSelected}
  showSelectAll
  layout="grid"
/>
```

---

## Radio

**Files:** `Radio/Radio.tsx`, `Radio/RadioButtons.tsx`

A radio button built on Radix. `RadioButtons` renders a full group with label layout and responsive grid support. Both support controlled and uncontrolled modes.

### Props (`Radio`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | — | Label text beside the radio circle |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Circle and label scale |
| `value` | `string` | — | Radix radio item value |
| `disabled` | `boolean` | — | Disables the item |
| `error` | `boolean` | — | Applies red border to the circle |
| + Radix `RadioGroup.Item` props | | | |

### Props (`RadioButtons`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `TItem[]` | — | Data array |
| `getLabel` | `(item: TItem) => ReactNode` | — | Extract label |
| `getValue` | `(item: TItem) => string` | — | Extract value |
| `getDisabled` | `(item: TItem) => boolean` | — | Mark item disabled |
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | — | Uncontrolled initial value |
| `onChange` | `(value: string) => void` | — | Called on selection change |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Passed to each radio item |
| `layout` | `"vertical" \| "horizontal" \| "grid"` | `"vertical"` | Arrangement |
| `error` | `boolean` | — | Marks all items with error border |
| `disabled` | `boolean` | — | Disables the whole group |

### Example

```tsx
import { RadioButtons } from "@/components/custom/Radio";

<RadioButtons
  items={[
    { id: "cod", name: "Cash on Delivery" },
    { id: "upi", name: "UPI" },
  ]}
  getLabel={(i) => i.name}
  getValue={(i) => i.id}
  value={payment}
  onChange={setPayment}
  layout="horizontal"
/>
```

---

## Tabs

**Files:** `Tabs/Tabs.tsx`, `Tabs/Tabs.types.ts`, `Tabs/tabsVariants.ts`, `Tabs/CustomTabsTrigger.tsx`

Tabs with two visual variants. `primary` renders an underline indicator bar that slides between tabs. `secondary` renders a floating pill chip. Both handle overflow with a `+More` popover when more tabs exist than visible slots.

### Props (`Tabs`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `TabItem[]` | **required** | At least 2 items required. Each: `{ value: string; label: string; disabled?: boolean }` |
| `variant` | `"primary" \| "secondary"` | `"primary"` | Visual style — underline or pill chip |
| `value` | `string` | — | Controlled active tab value |
| `defaultValue` | `string` | — | Uncontrolled initial active value |
| `onChange` | `(value: string) => void` | — | Called when active tab changes |
| `visibleTabLimit` | `number` | — | Max tabs shown before overflow button appears |
| `overflowLabel` | `string` | `"More Options"` | Label for the overflow trigger button |
| `className` | `string` | — | Applied to the root `Tabs` element |

### Example

```tsx
import { Tabs } from "@/components/custom/Tabs";

const tabs = [
  { value: "orders", label: "Orders" },
  { value: "customers", label: "Customers" },
  { value: "reports", label: "Reports" },
];

// Primary (underline)
<Tabs tabs={tabs} defaultValue="orders" onChange={(v) => console.log(v)} />

// Secondary (pill)
<Tabs tabs={tabs} variant="secondary" value={activeTab} onChange={setActiveTab} />

// With overflow
<Tabs tabs={manyTabs} visibleTabLimit={4} overflowLabel="More" />
```

---

## Toggle

**File:** `Toggle/Toggle.tsx`

A styled on/off switch (built on Radix Switch) with three label placement options.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Track and thumb size |
| `label` | `string` | — | Optional label text |
| `labelPosition` | `"inside" \| "left" \| "right"` | `"right"` | Where to render the label |
| `checked` | `boolean` | — | Controlled state |
| `defaultChecked` | `boolean` | — | Uncontrolled initial state |
| `onChange` | `(checked: boolean) => void` | — | Called on state change |
| `disabled` | `boolean` | — | Disables and mutes the control |
| `wrapperClassName` | `string` | — | Extra class on the outer label wrapper (only when label is left or right) |
| + Radix `Switch.Root` props | | | |

### Label Position Behavior

| Position | Behavior |
|---|---|
| `right` | Label sits to the right of the track |
| `left` | Label sits to the left of the track |
| `inside` | Label text rendered inside the track (truncated) |

### Example

```tsx
import { Toggle } from "@/components/custom/Toggle";

// Basic
<Toggle onChange={(on) => console.log(on)} />

// With label
<Toggle label="Enable notifications" labelPosition="right" defaultChecked />

// Inside label
<Toggle label="Live" labelPosition="inside" size="lg" />

// Controlled
<Toggle checked={isActive} onChange={setIsActive} />
```

---

## Table

**Files:** `Table/Table.tsx`, `Table/TableCell.tsx`, `Table/TableHeaderCell.tsx`, `Table/TableSkeleton.tsx`

A generic, sortable data table with sticky header, flexible column widths, mobile card/scroll layout switching, and a skeleton loading state.

### Props (`Table<T>`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `ColumnDef<T>[]` | **required** | Column configuration (see below) |
| `data` | `T[]` | **required** | Row data |
| `keyField` | `keyof T` | **required** | Unique key field on each row |
| `loading` | `boolean` | `false` | Shows skeleton rows |
| `emptyMessage` | `string` | `"No results"` | Shown when `data` is empty |
| `onRowClick` | `(row: T) => void` | — | Makes rows clickable; applies hover style |
| `rowClassName` | `(row: T) => string` | — | Dynamic class applied to each row |
| `stickyHeader` | `boolean` | `false` | Freezes header on scroll |
| `maxHeight` | `string` | — | Max height for scrollable table (used with `stickyHeader`) |
| `bordered` | `boolean` | `false` | Adds border and rounded corners to the container |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Row padding and font scale |
| `mobileLayout` | `"scroll" \| "cards"` | `"scroll"` | On mobile: horizontal scroll or stacked card view |
| `className` | `string` | — | Applied to the outer wrapper |

### Column Definition (`ColumnDef<T>`)

| Key | Type | Description |
|---|---|---|
| `key` | `string` | Data key on each row object |
| `header` | `ReactNode` | Column header label |
| `render` | `(row: T) => ReactNode` | Custom cell renderer |
| `sortable` | `boolean` | Enables client-side sort on this column |
| `align` | `"left" \| "center" \| "right"` | Cell alignment |
| `width` | `string` | Override column width (e.g. `"120px"`) |
| `flex` | `number` | Flex weight for proportional widths (default `1`) |
| `minWidth` | `number` | Min px width — summed to set the table's minimum total width |
| `hideOnMobile` | `boolean` | Hides the column in mobile card view |

### Example

```tsx
import { Table } from "@/components/custom/Table";

type Order = { id: string; customer: string; total: number; status: string };

<Table<Order>
  columns={[
    { key: "id", header: "Order ID", width: "100px" },
    { key: "customer", header: "Customer", sortable: true, flex: 2 },
    { key: "total", header: "Total", align: "right", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge label={row.status} variant="success" />,
    },
  ]}
  data={orders}
  keyField="id"
  loading={isLoading}
  onRowClick={(row) => navigate(`/orders/${row.id}`)}
  stickyHeader
  maxHeight="500px"
  bordered
/>
```

---

## Layout

**Files:** `Layout/PageContainer.tsx`, `Layout/TopHeader.tsx`, `Layout/SubHeader.tsx`

Three layout wrapper components that compose the standard page shell. Design tokens live in `src/utils/layoutTokens.ts`.

---

### PageContainer

The outermost page wrapper. Sets max-width, responsive horizontal padding, and exposes CSS variables `--pc-pl` / `--pc-pr` for child components that need edge-to-edge bleed.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `maxWidth` | `CssSize` | `"100%"` | Max width of the content area |
| `paddingLeft` | `CssSize` | `LAYOUT.contentPaddingLeft` (22 px) | Left padding |
| `paddingRight` | `CssSize` | `LAYOUT.contentPaddingRight` (20 px) | Right padding |
| `gap` | `CssSize` | — | Vertical gap between children |
| `className` | `string` | — | |
| `children` | `ReactNode` | | |

---

### TopHeader

The page title bar with optional helper slot (beside title) and action slot (right side).

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | — | Page heading |
| `helper` | `ReactNode` | — | Small element rendered beside the title (tooltip, badge, etc.) |
| `action` | `ReactNode` | — | Right-aligned slot for buttons or controls |
| `showDivider` | `boolean` | `true` | Renders a full-bleed separator below |
| `className` | `string` | — | |

---

### SubHeader

A secondary header below `TopHeader` for filters, secondary actions, or breadcrumbs.

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | — | Left-side title |
| `subtitle` | `ReactNode` | — | Subtitle beneath the title |
| `right` | `ReactNode` | — | Right-aligned slot |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Vertical alignment of the flex row |
| `className` | `string` | — | |
| `children` | `ReactNode` | — | Falls below the title/right row |

### Example

```tsx
import { PageContainer, TopHeader, SubHeader } from "@/components/custom/Layout";

<PageContainer>
  <TopHeader
    title="Orders"
    action={<Button variant="primary">New Order</Button>}
  />
  <SubHeader
    title="All Orders"
    subtitle="Last 30 days"
    right={<SearchBar placeholder="Search…" onSearch={setQuery} />}
  />
  {/* page content */}
</PageContainer>
```

---

## Card

**File:** `Card/Card.tsx`

A thin wrapper around shadcn Card primitives with normalized padding and border color.

### Exports

`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`

All accept standard `div` props plus `className`.

### Example

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/custom/Card";

<Card>
  <CardHeader>
    <CardTitle>Revenue</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-3xl font-bold">₹1,24,500</p>
  </CardContent>
</Card>
```

---

## Grid

**File:** `Grid/Grid.tsx`

A responsive CSS grid wrapper with named column presets, automatic mobile breakpoints, and custom gap control.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `GridColumns` | `"1"` | Preset name or raw `grid-template-columns` CSS value |
| `limit` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | — | Equal-width columns. Overrides `columns` when set |
| `gap` | `CssSize` | Preset default | Column gap (number = px, string = any CSS unit) |
| `rowGap` | `CssSize` | `"20px"` | Row gap |
| + all `<div>` props | | | |

### Column Presets

| Preset | Desktop layout | Mobile fallback |
|---|---|---|
| `"1"` | 1 column | 1 col |
| `"2"` | 2 columns | 1 col → 2 col at sm |
| `"3"` | 3 columns | 1 → 2 → 3 |
| `"4"` | 4 columns | 1 → 2 → 4 |
| `"5"` – `"8"` | N columns | Progressive breakpoints |
| `"2:1"` | 2fr + 1fr | 1 col → 2:1 at md |
| `"1:2"` | 1fr + 2fr | 1 col → 1:2 at md |
| `"3:1"` | 3fr + 1fr | 1 col → 3:1 at md |
| `"1:3"` | 1fr + 3fr | 1 col → 1:3 at md |
| `"1:1:2"` | 1fr + 1fr + 2fr | 1 → 2 → 3-col at lg |
| `"2:1:1"` | 2fr + 1fr + 1fr | 1 → 2 → 3-col at lg |

### Example

```tsx
import { Grid } from "@/components/custom/Grid";

// 3-column even
<Grid columns="3">
  <Card>…</Card>
  <Card>…</Card>
  <Card>…</Card>
</Grid>

// Sidebar layout (content + aside)
<Grid columns="3:1" gap={24}>
  <main>…</main>
  <aside>…</aside>
</Grid>

// Dynamic column count
<Grid limit={4} gap="16px">
  {products.map((p) => <ProductCard key={p.id} product={p} />)}
</Grid>
```

---

## Modal

**File:** `Modal/Modal.tsx`

A portal-rendered dialog with backdrop click dismissal, a close button, and a scrollable body area.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | **required** | Controls visibility |
| `onClose` | `() => void` | **required** | Called when the modal should close |
| `title` | `ReactNode` | — | Renders in the header bar |
| `size` | `"small" \| "medium" \| "md" \| "default" \| "large" \| "full"` | `"default"` | Max-width constraint |
| `showCloseButton` | `boolean` | `true` | Shows the X button in the header |
| `closeIcon` | `ReactNode` | `<X>` | Custom close icon |
| `headerClassName` | `string` | — | Extra class on the header row |
| `bodyClassName` | `string` | — | Extra class on the scrollable body |
| `modalClassName` | `string` | — | Extra class on the modal panel itself |
| `children` | `ReactNode` | **required** | Modal body content |

### Size Map

| Size | Max-width |
|---|---|
| `small` | max-w-md (~448 px) |
| `medium` | max-w-2xl (~672 px) |
| `md` | max-w-3xl (~768 px) |
| `default` | max-w-4xl (~896 px) |
| `large` | max-w-6xl (~1152 px) |
| `full` | max-w-7xl (~1280 px) |

### Example

```tsx
import { Modal } from "@/components/custom/Modal";

<Modal isOpen={open} onClose={() => setOpen(false)} title="Edit Order" size="medium">
  <form>…</form>
</Modal>
```

---

## AlertDialog

**File:** `Alert-Dialog/alert-dialog.tsx`

A rich confirmation/alert dialog inspired by SweetAlert2. Supports an icon badge, built-in input field, async `preConfirm` handler, and two usage patterns: declarative component and imperative hook.

### Options (`AlertDialogOptions`)

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | **required** | Dialog heading |
| `text` / `description` | `ReactNode` | — | Body content (aliases) |
| `icon` | `"success" \| "error" \| "warning" \| "info" \| "question" \| LucideIcon` | — | Icon in the badge. String variant auto-sets badge color |
| `variant` | `"success" \| "error" \| "warning" \| "info"` | — | Badge color override (auto-inferred from `icon` when `icon` is a string) |
| `size` | `"sm" \| "default"` | `"default"` | Dialog max-width |
| `confirmButtonText` | `ReactNode` | `"OK"` | Confirm button label |
| `cancelButtonText` | `ReactNode` | `"Cancel"` | Cancel button label |
| `showCancelButton` | `boolean` | `false` | Shows the cancel button |
| `confirmButtonVariant` | `ButtonProps["variant"]` | `"primary"` | Visual variant of the confirm button |
| `cancelButtonVariant` | `ButtonProps["variant"]` | `"secondary"` | Visual variant of the cancel button |
| `showActions` | `boolean` | `true` | Hides default buttons when `false` |
| `footer` | `ReactNode` | — | Completely replaces the default buttons |
| `closeOnOverlayClick` | `boolean` | `true` | Dismiss on backdrop click |
| `closeOnEsc` | `boolean` | `true` | Dismiss on Escape key |
| `autoCloseMs` | `number` | — | Auto-dismiss after N milliseconds |
| `input` | `"text" \| "textarea"` | — | Adds an input field to the body |
| `inputPlaceholder` | `string` | — | Placeholder for the input |
| `defaultValue` | `TValue` | — | Pre-filled input value |
| `inputValidator` | `(value: TValue) => string \| null` | — | Client-side validation — return error string or null |
| `preConfirm` | `(value: TValue) => void \| Promise<void>` | — | Async action run after validation. Throw to keep dialog open with error message |

### Declarative Usage (`AlertDialog` component)

Wrap the component in `SweetAlertProvider`. The `AlertDialog` component is controlled via `isOpen` and `onClose`.

```tsx
import {
  AlertDialog,
  SweetAlertProvider,
} from "@/components/custom/Alert-Dialog/alert-dialog";

// Wrap your app once
<SweetAlertProvider>
  <App />
</SweetAlertProvider>

// Use declaratively
<AlertDialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  icon="warning"
  title="Delete Item"
  text="This action cannot be undone."
  showCancelButton
  confirmButtonText="Delete"
  confirmButtonVariant="alertPrimary"
  preConfirm={async () => {
    await api.deleteItem(id);
  }}
/>
```

### Imperative Usage (`useSweetAlert` hook)

```tsx
import { useSweetAlert } from "@/components/custom/Alert-Dialog/alert-dialog";

function MyComponent() {
  const swal = useSweetAlert();

  const handleDelete = async () => {
    await swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonVariant: "alertPrimary",
      preConfirm: async () => {
        await api.deleteItem(id);
      },
    });
  };

  // With input
  const handleRename = async () => {
    await swal.fire({
      icon: "question",
      title: "Rename Item",
      input: "text",
      inputPlaceholder: "New name…",
      inputValidator: (v) => (!v.trim() ? "Name is required" : null),
      preConfirm: async (name) => {
        await api.rename(id, name);
      },
    });
  };
}
```

---

## Pagination

**File:** `Pagination/Pagination.tsx`

A page number bar with a GPU-animated sliding pill indicator, chevron prev/next buttons, optional first/last buttons, and smart ellipsis via `usePagination`.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `currentPage` | `number` | **required** | Active page (1-indexed) |
| `totalPages` | `number` | **required** | Total number of pages |
| `onPageChange` | `(page: number) => void` | **required** | Called when a page is clicked |
| `siblingCount` | `number` | `1` | Number of page buttons shown each side of the active page before ellipsis |
| `showFirstLast` | `boolean` | `false` | Shows `«` / `»` jump-to-first/last buttons |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size scale |
| `disabled` | `boolean` | `false` | Disables all buttons |
| `className` | `string` | — | Applied to the outer pagination element |

### Example

```tsx
import { Pagination } from "@/components/custom/Pagination";

<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  siblingCount={2}
  showFirstLast
  size="md"
/>
```

---

## StatusBadge

**File:** `StatusBadge/StatusBadge.tsx`

A small inline pill badge for displaying status labels with optional icon.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | **required** | Text inside the badge (truncated on overflow) |
| `variant` | `"success" \| "warning" \| "error"` | `"success"` | Color scheme |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Padding and font scale |
| `icon` | `ReactNode` | — | Optional icon beside the label |
| `iconPosition` | `"left" \| "right"` | `"left"` | Icon placement |
| `className` | `string` | — | Overrides or extends variant colors |

### Variant Colors

| Variant | Background | Text | Border |
|---|---|---|---|
| `success` | green-100 | green-700 | green-300 |
| `warning` | yellow-100 | yellow-700 | yellow-300 |
| `error` | red-100 | red-700 | red-300 |

### Example

```tsx
import { StatusBadge } from "@/components/custom/StatusBadge";
import { CheckCircle } from "lucide-react";

<StatusBadge label="Active" variant="success" />
<StatusBadge label="Pending" variant="warning" size="sm" />
<StatusBadge label="Failed" variant="error" icon={<AlertCircle size={12} />} />
```

---

## SearchBar

**Files:** `SearchBar/SearchBar.tsx`, `SearchBar/SearchBar.types.ts`

A search input with clear button, optional fuzzy-search dropdown, keyboard navigation (Enter/Escape), and value-type filtering.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| number` | — | Controlled search value |
| `defaultValue` | `string \| number` | — | Uncontrolled initial value |
| `onChange` | `(value: string \| number) => void` | — | Called on every keystroke |
| `onSearch` | `(value: string \| number) => void` | — | Called on Enter or search icon click |
| `onClear` | `() => void` | — | Called when the clear (X) button is clicked |
| `placeholder` | `string` | — | Placeholder text |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height and font scale |
| `valueType` | `"string" \| "number" \| "alphanumeric"` | `"string"` | Restricts allowed characters |
| `disabled` | `boolean` | — | Disables the input |
| `width` | `string` | — | Tailwind width class on the outer wrapper |
| `className` | `string` | — | |
| `items` | `TItem[]` | — | Dropdown suggestion items (generic array) |
| `getLabel` | `(item: TItem) => string` | — | Extract label from suggestion item |
| `getValue` | `(item: TItem) => string` | — | Extract value from suggestion item |
| `onItemSelect` | `(item: TItem) => void` | — | Called when a dropdown item is clicked |
| `suggestions` | `string[]` | — | Simple string suggestion list (alternative to `items`) |

### Example

```tsx
import { SearchBar } from "@/components/custom/SearchBar";

// Basic search
<SearchBar
  placeholder="Search orders…"
  onSearch={(q) => fetchOrders(q)}
/>

// Controlled with number type
<SearchBar
  value={orderId}
  onChange={setOrderId}
  valueType="number"
  placeholder="Order ID"
  size="sm"
/>

// With dropdown suggestions
<SearchBar
  placeholder="Search customers…"
  items={customers}
  getLabel={(c) => c.name}
  getValue={(c) => c.id}
  onItemSelect={(c) => navigate(`/customers/${c.id}`)}
/>
```

---

## DatePicker

**Files:** `DatePicker/DatePicker.tsx`, `DatePicker/DatePicker.types.ts`

A calendar date picker supporting single-date and date-range selection with min/max constraints and a draft range state machine for range preview.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `"single" \| "range"` | `"single"` | Selection mode |
| `value` | `Date \| DateRange \| null` | — | Controlled value. `DateRange = { from: Date; to: Date }` |
| `defaultValue` | `Date \| DateRange \| null` | — | Uncontrolled initial value |
| `onChange` | `(value: Date \| DateRange \| null) => void` | — | Called on selection |
| `placeholder` | `string` | — | Trigger placeholder when no value |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Trigger height and font scale |
| `disabled` | `boolean` | — | Disables the trigger |
| `minDate` | `Date` | — | Earliest selectable date |
| `maxDate` | `Date` | — | Latest selectable date |
| `width` | `string` | — | Tailwind width class on the trigger wrapper |
| `className` | `string` | — | |

### Range Mode

In `range` mode the picker uses a three-stage draft system:

1. First click sets `pendingFrom`
2. Hovering previews the potential range
3. Second click commits `{ from, to }` and calls `onChange`

A separate From/To display row shows the selected dates with Apply/Cancel buttons.

### Example

```tsx
import { DatePicker } from "@/components/custom/DatePicker";

// Single date
<DatePicker
  mode="single"
  value={date}
  onChange={(d) => setDate(d as Date)}
  minDate={new Date()}
  placeholder="Select date"
/>

// Date range
<DatePicker
  mode="range"
  value={range}
  onChange={(r) => setRange(r as DateRange)}
  placeholder="Select range"
  size="lg"
/>
```

---

## Sidebar

**Files:** `sidebar/Sidebar.tsx`, `sidebar/Sidebar.types.ts`, `sidebar/Sidebar.variants.ts`

A multi-directional drawer that becomes a persistent `<aside>` on desktop when `persistentOnDesktop` is enabled. Uses shadcn Drawer on mobile.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial state |
| `onOpenChange` | `(open: boolean) => void` | — | Called when open state changes |
| `side` | `"left" \| "right" \| "top" \| "bottom" \| "right-bottom"` | `"left"` | Which edge the sidebar slides in from |
| `size` | `"sm" \| "md" \| "lg" \| "full"` | `"md"` | Preset width/height |
| `sizePercent` | `number` (1–100) | — | Override `size` with a viewport percentage. Uses `vw` for left/right, `vh` for top/bottom |
| `overlay` | `boolean` | `true` | Shows a semi-transparent backdrop behind the drawer |
| `closeOnOutsideClick` | `boolean` | `true` | Clicks outside the drawer close it |
| `persistentOnDesktop` | `boolean` | `false` | At ≥ 768 px renders as a static `<aside>` instead of a drawer |
| `trigger` | `ReactNode` | — | Element that toggles the sidebar on click |
| `className` | `string` | — | Applied to the outer wrapper |
| `contentClassName` | `string` | — | Applied to the content panel |
| `children` | `ReactNode` | — | Sidebar body content |

### Size Presets

| Size | Left / Right | Top / Bottom |
|---|---|---|
| `sm` | 256 px (max 85 vw) | 192 px (max 80 vh) |
| `md` | 320 px (max 90 vw) | 256 px (max 85 vh) |
| `lg` | 384 px (max 95 vw) | 320 px (max 90 vh) |
| `full` | 100 vw / 100 vh | 100 vw / 100 vh |

### Side Variants

| Side | Slides in from |
|---|---|
| `left` | Left edge |
| `right` | Right edge |
| `top` | Top edge |
| `bottom` | Bottom edge |
| `right-bottom` | Bottom-right corner (rounded top-left) |

### Example

```tsx
import { Sidebar } from "@/components/custom/sidebar";
import { Button } from "@/components/custom/Button/button";

// Controlled drawer
<Sidebar
  open={sidebarOpen}
  onOpenChange={setSidebarOpen}
  side="right"
  size="md"
>
  <nav>…</nav>
</Sidebar>

// With built-in trigger
<Sidebar
  side="left"
  size="lg"
  trigger={<Button variant="secondary">Open Menu</Button>}
>
  <nav>…</nav>
</Sidebar>

// Persistent on desktop, drawer on mobile
<Sidebar
  open={menuOpen}
  onOpenChange={setMenuOpen}
  side="left"
  persistentOnDesktop
  sizePercent={25}
>
  <NavMenu />
</Sidebar>
```

---

## Design Tokens

All components share tokens from `src/utils/`:

| Token | File | Description |
|---|---|---|
| `FOCUS_RING` | `tokens.ts` | Consistent focus outline class (`outline-[#006F42]`) |
| `COMPONENT_HEIGHT` | `tokens.ts` | Heights for xs/sm/md/lg size scale |
| `TEXT_SIZE` | `tokens.ts` | Font-size classes for the size scale |
| `ICON_SIZE` | `tokens.ts` | SVG size classes for the size scale |
| `PLACEHOLDER_SIZE` | `tokens.ts` | Placeholder font-size classes |
| `ComponentSize` | `tokens.ts` | Shared `"xs" \| "sm" \| "md" \| "lg"` type |
| `brand.green` | `colors.ts` | Brand green palette (paleGreen → darkestGreen) |
| `neutral` | `colors.ts` | Gray scale (0–900) |
| `surface` | `colors.ts` | Green-tinted surface/hover colors |
| `status` | `colors.ts` | Semantic error/warning/success/info colors |
| `interactive` | `colors.ts` | Form field border, text, and state colors |
| `LAYOUT` | `layoutTokens.ts` | Page-level spacing and height tokens |
| `useFuzzySearch` | `useFuzzySearch.ts` | Fuse.js-backed fuzzy search hook (used by Input, Select, SearchBar) |
