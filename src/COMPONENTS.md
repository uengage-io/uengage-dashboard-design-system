# Custom Components Documentation

All custom components live under `src/components/custom/`. This document covers every component's props, variants, and usage examples.

---

## Table of Contents

- [AlertDialog / StatusAlertDialog](#alertdialog--statusalertdialog)
- [Button](#button)
- [Card](#card)
- [Checkbox](#checkbox)
- [CheckboxGroup](#checkboxgroup)
- [DatePicker](#datepicker)
- [Grid](#grid)
- [Input](#input)
- [InputLabel](#inputlabel)
- [InputHelper](#inputhelper)
- [PageContainer](#pagecontainer)
- [TopHeader](#topheader)
- [SubHeader](#subheader)
- [Radio](#radio)
- [RadioGroup](#radiogroup)
- [SearchBar](#searchbar)
- [Select](#select)
- [Sidebar](#sidebar)
- [StatusBadge](#statusbadge)
- [Table](#table)
- [Tabs](#tabs)
- [Toggle](#toggle)
- [UengageProvider](#uengageprovider)

---

## AlertDialog / StatusAlertDialog

**File:** `components/custom/Alert-Dialog/alert-dialog.tsx`

**Exports:** `AlertDialog`, `StatusAlertDialog`, `SuccessAlertDialog`, `SweetAlertProvider`, `SweetAlertDialog`, `useSweetAlert`

### StatusAlertDialog Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open state change handler |
| `trigger` | `React.ReactNode` | — | Element that triggers the dialog |
| `variant` | `"success" \| "error" \| "warning" \| "info"` | `"success"` | Status style |
| `icon` | `LucideIcon` | — | Custom icon (overrides variant default) |
| `title` | `React.ReactNode` | **required** | Dialog title |
| `description` | `React.ReactNode` | — | Dialog description |
| `footer` | `React.ReactNode` | — | Custom footer content |
| `closeOnOverlayClick` | `boolean` | — | Close when clicking backdrop |
| `closeOnEsc` | `boolean` | — | Close on Escape key |
| `autoCloseMs` | `number` | — | Auto-close after N milliseconds |
| `className` | `string` | — | Additional CSS classes |

### AlertDialog Props

Extends all `StatusAlertDialog` props, plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultOpen` | `boolean` | — | Uncontrolled default open state |
| `showActions` | `boolean` | `true` | Show default confirm/cancel buttons |
| `input` | `"text" \| "textarea"` | — | Render an input inside the dialog |
| `inputPlaceholder` | `string` | — | Placeholder for the input |
| `defaultValue` | `TValue` | — | Default input value |
| `inputValidator` | `(value: TValue) => string \| null \| undefined` | — | Validation function; return string to show error |
| `preConfirm` | `(value: TValue) => void \| Promise<void>` | — | Async callback before closing on confirm |
| `confirmButtonText` | `React.ReactNode` | `"OK"` | Confirm button label |
| `cancelButtonText` | `React.ReactNode` | `"Cancel"` | Cancel button label |
| `showCancelButton` | `boolean` | — | Show cancel button |
| `confirmButtonVariant` | `ButtonProps["variant"]` | `"primary"` | Confirm button variant |
| `cancelButtonVariant` | `ButtonProps["variant"]` | `"secondary"` | Cancel button variant |
| `size` | `"sm" \| "default"` | `"default"` | Dialog size |

### Variants

`variant`: `"success"` | `"error"` | `"warning"` | `"info"`

### Usage

**Declarative:**
```tsx
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  variant="success"
  title="Saved!"
  description="Your changes have been saved."
  confirmButtonText="Great"
/>
```

**Imperative (via SweetAlertProvider + useSweetAlert):**
```tsx
// Wrap your app:
<SweetAlertProvider>
  <App />
</SweetAlertProvider>

// Inside any component:
const { fire } = useSweetAlert();

await fire({
  variant: "warning",
  title: "Are you sure?",
  description: "This cannot be undone.",
  showCancelButton: true,
});
```

**With input:**
```tsx
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Enter a name"
  input="text"
  inputPlaceholder="Type here..."
  inputValidator={(val) => (!val ? "Name is required" : null)}
  preConfirm={(val) => createItem(val)}
/>
```

---

## Button

**File:** `components/custom/Button/button.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "tertiary" \| "alertPrimary" \| "warningPrimary" \| "alertSecondary"` | `"primary"` | Visual style |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Button size |
| `leftIcon` | `React.ReactNode` | — | Icon rendered before the label |
| `rightIcon` | `React.ReactNode` | — | Icon rendered after the label |
| `loading` | `boolean` | — | Show loading spinner and disable |
| `loadingIcon` | `React.ReactNode` | — | Custom loading icon |
| `title` | `React.ReactNode` | — | Accessible label / tooltip |
| `asChild` | `boolean` | — | Render as child via Radix Slot |
| `disabled` | `boolean` | — | Disabled state |
| `className` | `string` | — | Additional CSS classes |

All standard `<button>` HTML attributes are also accepted.

### Variants

| Variant | Description |
|---|---|
| `primary` | Gradient blue, main CTA |
| `secondary` | Outlined/muted |
| `tertiary` | Ghost / text-only |
| `alertPrimary` | Solid red for destructive actions |
| `warningPrimary` | Solid amber for warning actions |
| `alertSecondary` | Outlined red |

| Size | Height |
|---|---|
| `xs` | 24px |
| `sm` | 32px |
| `md` | 36px |
| `lg` | 44px |

### Usage

```tsx
<Button variant="primary" size="md">Save</Button>

<Button variant="alertPrimary" loading={isDeleting} leftIcon={<Trash2 />}>
  Delete
</Button>

<Button variant="secondary" asChild>
  <a href="/dashboard">Dashboard</a>
</Button>
```

---

## Card

**File:** `components/custom/Card/Card.tsx`

**Exports:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`

### Card Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional CSS classes |

All subcomponents accept standard `<div>` HTML attributes.

### Usage

```tsx
<Card>
  <CardHeader>
    <CardTitle>Orders</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
    <CardAction>
      <Button size="sm">Export</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    {/* main content */}
  </CardContent>
  <CardFooter>
    {/* footer actions */}
  </CardFooter>
</Card>
```

---

## Checkbox

**File:** `components/custom/Checkbox/Checkbox.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | — | Uncontrolled default state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Change handler |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Checkbox size |
| `label` | `React.ReactNode` | — | Label text |
| `disabled` | `boolean` | — | Disabled state |
| `indeterminate` | `boolean` | — | Indeterminate state (used in select-all patterns) |
| `error` | `boolean` | — | Error visual state |
| `className` | `string` | — | Additional CSS classes |

### Variants

| Prop | Values |
|---|---|
| `size` | `sm`, `md`, `lg` |
| Visual states | `unchecked`, `checked`, `indeterminate`, `disabled`, `error` |

### Usage

```tsx
<Checkbox label="Accept terms" checked={accepted} onCheckedChange={setAccepted} />

<Checkbox label="Select all" indeterminate={someSelected} checked={allSelected} />

<Checkbox label="Unavailable" disabled />

<Checkbox label="Invalid selection" error />
```

---

## CheckboxGroup

**File:** `components/custom/Checkbox/CheckboxGroup.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `T[]` | **required** | Array of option items |
| `getLabel` | `(item: T) => React.ReactNode` | — | Extract label from item |
| `getValue` | `(item: T) => string` | — | Extract value from item |
| `getDisabled` | `(item: T) => boolean` | — | Determine if item is disabled |
| `value` | `string[]` | — | Controlled selected values |
| `onChange` | `(values: string[]) => void` | — | Change handler |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size for all checkboxes |
| `layout` | `"vertical" \| "horizontal" \| "grid"` | `"vertical"` | Layout direction |
| `columns` | `number` | `2` | Number of columns when `layout="grid"` |
| `disabled` | `boolean` | — | Disable all checkboxes |
| `label` | `React.ReactNode` | — | Group label |
| `helperText` | `string` | — | Helper text below the group |
| `error` | `string` | — | Error message below the group |
| `selectAll` | `boolean` | — | Show a "Select all" checkbox |

### Usage

```tsx
const fruits = ["Apple", "Banana", "Cherry"];

<CheckboxGroup
  options={fruits}
  getLabel={(item) => item}
  getValue={(item) => item.toLowerCase()}
  value={selected}
  onChange={setSelected}
  label="Favourite fruits"
  layout="grid"
  columns={3}
  selectAll
  error={selected.length === 0 ? "Pick at least one" : undefined}
/>
```

---

## DatePicker

**File:** `components/custom/DatePicker/DatePicker.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `"single" \| "range"` | `"single"` | Selection mode |
| `value` | `Date \| DateRange \| null` | — | Controlled value |
| `onChange` | `(value: Date \| DateRange \| null) => void` | — | Change handler |
| `placeholder` | `string` | `"Select date..."` / `"Date Range"` | Trigger placeholder |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Trigger size |
| `width` | `string` | — | Tailwind width class (e.g. `"w-64"`) |
| `className` | `string` | — | Additional CSS classes |
| `disabled` | `boolean` | — | Disabled state |
| `minDate` | `Date` | — | Earliest selectable date |
| `maxDate` | `Date` | — | Latest selectable date |
| `onTouch` | `() => void` | — | Fires once on first blur after interaction |

### Types

```ts
type DateRange = { from: Date; to: Date };
```

### Variants

| Prop | Values |
|---|---|
| `mode` | `single`, `range` |
| `size` | `sm`, `md`, `lg` |

### Usage

```tsx
// Single date
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
  placeholder="Pick a date"
/>

// Date range
<DatePicker
  mode="range"
  value={range}
  onChange={(r) => setRange(r as DateRange)}
  placeholder="Select range"
/>
```

---

## Grid

**File:** `components/custom/Grid/Grid.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `GridColumns` | `"1"` | Column layout preset or raw CSS grid-template-columns value |
| `limit` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | — | Override with N equal-width columns |
| `gap` | `CssSize` | preset default | Column gap |
| `rowGap` | `CssSize` | `"20px"` | Row gap |
| `className` | `string` | — | Additional CSS classes |
| `style` | `React.CSSProperties` | — | Inline styles |

### Column Presets (`GridColumns`)

| Value | Layout |
|---|---|
| `"1"` | 1 column |
| `"2"` | 2 equal columns |
| `"3"` | 3 equal columns |
| `"4"` | 4 equal columns |
| `"5"` | 5 equal columns |
| `"6"` | 6 equal columns |
| `"7"` | 7 equal columns |
| `"8"` | 8 equal columns |
| `"2:1"` | 2/3 + 1/3 columns |
| `"1:2"` | 1/3 + 2/3 columns |
| `"3:1"` | 3/4 + 1/4 columns |
| `"1:3"` | 1/4 + 3/4 columns |
| `"1:1:2"` | 1/4 + 1/4 + 1/2 columns |
| `"2:1:1"` | 1/2 + 1/4 + 1/4 columns |

Collapses to a single column on mobile automatically.

### Usage

```tsx
<Grid columns="2" gap="16px">
  <div>Left</div>
  <div>Right</div>
</Grid>

<Grid columns="2:1">
  <MainContent />
  <Sidebar />
</Grid>

<Grid limit={4} rowGap="12px">
  {items.map((item) => <Card key={item.id} />)}
</Grid>
```

---

## Input

**File:** `components/custom/Input/Input.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `inputType` | `string` | `"text"` | HTML input `type` attribute |
| `allowPattern` | `"alphanumeric" \| "alpha" \| "numeric" \| "decimal" \| "phone" \| "none"` | — | Restrict accepted characters |
| `label` | `React.ReactNode` | — | Label above the input |
| `helperText` | `string` | — | Helper text below the input |
| `error` | `string` | — | Error message (replaces helperText) |
| `leftIcon` | `React.ReactNode` | — | Icon inside the left of the input |
| `rightIcon` | `React.ReactNode` | — | Icon inside the right of the input |
| `required` | `boolean` | — | Show required asterisk on label |
| `width` | `string` | — | Tailwind width class (e.g. `"w-full"`) |
| `className` | `string` | — | Additional CSS classes |
| `disabled` | `boolean` | — | Disabled state |
| `readOnly` | `boolean` | — | Read-only state |
| `validationRegex` | `string \| RegExp` | — | Custom validation pattern |
| `validationMessage` | `string` | — | Message shown when validationRegex fails |
| `onTouch` | `() => void` | — | Fires once on first blur |
| `spellCheck` | `boolean` | `true` | Browser spell check |

All standard `<input>` HTML attributes are also accepted.

### Variants

| Prop | Values |
|---|---|
| `size` | `sm`, `md`, `lg` |
| Visual states | `default`, `focused`, `error`, `disabled`, `readonly` |
| `allowPattern` | `alphanumeric`, `alpha`, `numeric`, `decimal`, `phone`, `none` |

### Usage

```tsx
<Input
  label="Email"
  inputType="email"
  placeholder="you@example.com"
  required
  error={errors.email}
  width="w-full"
/>

<Input
  label="Phone"
  allowPattern="phone"
  leftIcon={<Phone size={16} />}
  size="lg"
/>

<Input
  label="Amount"
  allowPattern="decimal"
  validationRegex={/^\d+(\.\d{1,2})?$/}
  validationMessage="Enter a valid amount"
/>
```

---

## InputLabel

**File:** `components/custom/Input/InputLabel.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Label text size |
| `required` | `boolean` | — | Show red asterisk |
| `className` | `string` | — | Additional CSS classes |

All standard `<label>` HTML attributes are also accepted.

### Usage

```tsx
<InputLabel size="sm" required>
  Full Name
</InputLabel>
```

---

## InputHelper

**File:** `components/custom/Input/InputHelper.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Text size |
| `helperText` | `string` | — | Gray helper text |
| `error` | `string` | — | Red error message (shows error icon) |
| `className` | `string` | — | Additional CSS classes |

All standard `<p>` HTML attributes are also accepted.

### Usage

```tsx
<InputHelper helperText="We'll never share your email." />

<InputHelper error="This field is required." />
```

---

## PageContainer

**File:** `components/custom/Layout/PageContainer.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `paddingLeft` | `CssSize` | `0` | Extra left padding on top of the responsive base (e.g. desktop sidebar clearance). Scales via `min()`. |
| `paddingRight` | `CssSize` | `0` | Extra right padding on top of the responsive base. |
| `gap` | `CssSize` | — | Gap between child elements |
| `className` | `string` | — | Additional CSS classes |

All standard `<main>` HTML attributes are also accepted.

### Usage

```tsx
<PageContainer paddingLeft="240px" paddingRight="0">
  <TopHeader title="Dashboard" />
  {/* page content */}
</PageContainer>
```

---

## TopHeader

**File:** `components/custom/Layout/TopHeader.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `React.ReactNode` | **required** | Page/module title |
| `helper` | `React.ReactNode` | — | Element rendered beside the title (e.g. badge) |
| `action` | `React.ReactNode` | — | Right-side slot for buttons or controls |
| `divider` | `boolean` | `true` | Show bottom border separator |
| `titleGap` | `CssSize` | `"10px"` | Gap between title and helper element |
| `className` | `string` | — | Additional CSS classes |

### Usage

```tsx
<TopHeader
  title="Customers"
  helper={<Badge>342</Badge>}
  action={
    <Button size="sm" leftIcon={<Plus />}>
      Add customer
    </Button>
  }
/>
```

---

## SubHeader

**File:** `components/custom/Layout/SubHeader.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `React.ReactNode` | — | Section heading |
| `subtitle` | `React.ReactNode` | — | Supporting subtitle or description |
| `right` | `React.ReactNode` | — | Right slot for filters, tabs, or actions |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Vertical alignment of left and right slots |
| `divider` | `boolean` | `false` | Show bottom border separator |
| `gap` | `CssSize` | `"12px"` | Gap between the title block and children |
| `className` | `string` | — | Additional CSS classes |

### Usage

```tsx
<SubHeader
  title="Recent Orders"
  subtitle="Showing orders from the last 7 days"
  right={<DatePicker mode="range" />}
/>
```

---

## Radio

**File:** `components/custom/Radio/Radio.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `React.ReactNode` | **required** | Radio label |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Radio size |
| `disabled` | `boolean` | — | Disabled state |
| `error` | `boolean` | — | Error visual state |
| `value` | `string` | — | Radio value (used within RadioGroup) |
| `className` | `string` | — | Additional CSS classes |

### Variants

| Prop | Values |
|---|---|
| `size` | `sm`, `md`, `lg` |
| Visual states | `default`, `disabled`, `error` |

### Usage

```tsx
// Standalone (inside a Radix RadioGroup.Root)
<Radio value="option1" label="Option 1" />

// With error state
<Radio value="b" label="Choice B" error />
```

---

## RadioGroup

**File:** `components/custom/Radio/RadioButtons.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `T[]` | **required** | Array of radio option items |
| `getLabel` | `(item: T) => React.ReactNode` | — | Extract label from item |
| `getValue` | `(item: T) => string` | — | Extract value from item |
| `getDisabled` | `(item: T) => boolean` | — | Determine if item is disabled |
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | — | Uncontrolled default value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size for all radios |
| `layout` | `"vertical" \| "horizontal" \| "grid"` | `"vertical"` | Layout direction |
| `columns` | `1 \| 2 \| 3 \| 4` | `2` | Grid columns when `layout="grid"` |
| `disabled` | `boolean` | — | Disable all radios |
| `label` | `React.ReactNode` | — | Group label |
| `helperText` | `string` | — | Helper text below the group |
| `error` | `string` | — | Error message below the group |
| `className` | `string` | — | Additional CSS classes |

### Usage

```tsx
const statuses = [
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" },
];

<RadioGroup
  options={statuses}
  getLabel={(s) => s.name}
  getValue={(s) => s.id}
  value={selected}
  onChange={setSelected}
  label="Status"
  layout="horizontal"
  error={!selected ? "Please select a status" : undefined}
/>
```

---

## SearchBar

**File:** `components/custom/SearchBar/SearchBar.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `T` | — | Controlled value |
| `defaultValue` | `T` | — | Uncontrolled default value |
| `valueType` | `"string" \| "number" \| "alphanumeric"` | `"string"` | Character type filter |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `placeholder` | `string` | — | Placeholder text |
| `width` | `string` | — | Tailwind width class |
| `className` | `string` | — | Wrapper CSS classes |
| `inputClassName` | `string` | — | Input element CSS classes |
| `dropdownClassName` | `string` | — | Dropdown CSS classes |
| `disabled` | `boolean` | — | Disabled state |
| `spellCheck` | `boolean` | `true` | Browser spell check |
| `onChange` | `(value: T) => void` | — | Fires on every keystroke |
| `onSearch` | `(value: T) => void` | — | Fires on Enter or search button click |
| `onClear` | `() => void` | — | Fires when clear button is clicked |
| `onTouch` | `() => void` | — | Fires once on first blur |
| `dropdownItems` | `TItem[]` | — | Items to show in suggestion dropdown |
| `getLabel` | `(item: TItem) => string` | — | Extract display label from item |
| `getValue` | `(item: TItem) => string` | — | Extract value from item |
| `onSelect` | `(value: string, item?: TItem) => void` | — | Fires when a dropdown item is selected |
| `fallbackText` | `string` | `"No results found"` | Empty state message in dropdown |

### Usage

```tsx
// Basic search
<SearchBar
  placeholder="Search orders..."
  onSearch={(q) => fetchOrders(q)}
  width="w-80"
/>

// With autocomplete dropdown
<SearchBar
  value={query}
  onChange={setQuery}
  dropdownItems={suggestions}
  getLabel={(s) => s.name}
  getValue={(s) => s.id}
  onSelect={(id) => navigate(`/item/${id}`)}
  fallbackText="No matching items"
/>
```

---

## Select

**File:** `components/custom/Select/Select.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SelectOption[]` | — | Static option list `{ value, label, disabled? }` |
| `items` | `TItem[]` | — | Dynamic item array (use with `getLabel`/`getValue`) |
| `getLabel` | `(item: TItem) => string` | — | Extract display label from item |
| `getValue` | `(item: TItem) => string` | — | Extract value from item |
| `getDisabled` | `(item: TItem) => boolean` | — | Determine if item is disabled |
| `value` | `string \| string[]` | — | Controlled selected value(s) |
| `defaultValue` | `string \| string[]` | — | Uncontrolled default value(s) |
| `mode` | `"single" \| "multi"` | `"single"` | Selection mode |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Trigger size |
| `placeholder` | `string` | `"Select..."` | Placeholder text |
| `disabled` | `boolean` | — | Disabled state |
| `width` | `string` | — | Tailwind width class |
| `className` | `string` | — | Additional CSS classes |
| `onChange` | `(value: string \| string[]) => void` | — | Change handler |
| `onTouch` | `() => void` | — | Fires once on first blur |
| `spellCheck` | `boolean` | `true` | Spell check in search field |

### Variants

| Prop | Values |
|---|---|
| `mode` | `single`, `multi` |
| `size` | `xs`, `sm`, `md`, `lg` |

### Usage

```tsx
// Static options
<Select
  options={[
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived", disabled: true },
  ]}
  value={status}
  onChange={setStatus}
  placeholder="Select status"
/>

// Dynamic items
<Select
  items={categories}
  getLabel={(c) => c.name}
  getValue={(c) => c.id}
  value={categoryId}
  onChange={setCategoryId}
/>

// Multi-select
<Select
  mode="multi"
  options={tagOptions}
  value={selectedTags}
  onChange={(v) => setSelectedTags(v as string[])}
  placeholder="Select tags"
  width="w-72"
/>
```

---

## Sidebar

**File:** `components/custom/sidebar/Sidebar.tsx`

### Props   

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Uncontrolled default open state |
| `onOpenChange` | `(open: boolean) => void` | — | State change handler |
| `side` | `"left" \| "right" \| "top" \| "bottom"` | `"left"` | Which edge to slide from |
| `size` | `"sm" \| "md" \| "lg" \| "full"` | `"md"` | Preset sidebar dimensions |
| `sizePercent` | `number` | — | Percentage of the viewport (1–100) the sidebar occupies. Uses `vw` for left/right, `vh` for top/bottom. Overrides `size` when provided. |
| `overlay` | `boolean` | `true` | Show a backdrop |
| `closeOnOutsideClick` | `boolean` | `true` | Close when clicking the backdrop |
| `persistentOnDesktop` | `boolean` | `false` | Render as a fixed sidebar on desktop (≥768px) |
| `trigger` | `React.ReactNode` | — | Element that opens the sidebar |
| `className` | `string` | — | Sidebar wrapper CSS classes |
| `contentClassName` | `string` | — | Inner content CSS classes |
| `children` | `React.ReactNode` | — | Sidebar content |

### Variants

| Prop | Values |
|---|---|
| `side` | `left`, `right`, `top`, `bottom` |
| `size` | `sm` (w-64 / h-48), `md` (w-80 / h-64), `lg` (w-96 / h-80), `full` (100vw / 100vh) |

### Usage

```tsx
// Drawer
<Sidebar
  trigger={<Button variant="secondary">Open Menu</Button>}
  side="left"
  size="md"
>
  <nav>...</nav>
</Sidebar>

// Persistent desktop sidebar + mobile drawer
<Sidebar
  open={sidebarOpen}
  onOpenChange={setSidebarOpen}
  persistentOnDesktop
  side="left"
  size="md"
  overlay={false}
>
  <NavLinks />
</Sidebar>

// Custom percentage width — 35% of the viewport on any screen size
<Sidebar sizePercent={35} side="left" trigger={<Button>Open</Button>}>
  <NavLinks />
</Sidebar>

// 60% height bottom sheet
<Sidebar sizePercent={60} side="bottom">
  <FilterPanel />
</Sidebar>
```

---

## StatusBadge

**File:** `components/custom/StatusBadge/StatusBadge.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | **required** | Badge text content |
| `variant` | `"success" \| "warning" \| "error"` | `"success"` | Color/status style |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Badge size |
| `icon` | `React.ReactNode` | — | Icon displayed beside the label |
| `iconPosition` | `"left" \| "right"` | `"left"` | Which side the icon appears on |
| `className` | `string` | — | Additional CSS classes (overrides variant colors) |
| `width` | `string` | — | Tailwind width class (e.g. `"w-full"`) |

### Variants

| Prop | Values |
|---|---|
| `variant` | `success`, `warning`, `error` |
| `size` | `xs`, `sm`, `md`, `lg` |

### Usage

```tsx
<StatusBadge label="Active" variant="success" />

<StatusBadge label="Pending" variant="warning" size="sm" />

<StatusBadge label="Failed" variant="error" icon={<AlertCircle size={12} />} iconPosition="left" />

<StatusBadge label="Completed" variant="success" width="w-32" />
```

---

## Table

**File:** `components/custom/Table/Table.tsx`

**Exports:** `Table`, `TableCell`, `TableHeaderCell`, `TableSkeleton`

### `Table<T>` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `ColumnDef<T>[]` | **required** | Column definitions (see ColumnDef below) |
| `data` | `T[]` | **required** | Row data array |
| `keyField` | `keyof T` | **required** | Property key used to uniquely identify each row |
| `loading` | `boolean` | `false` | Show skeleton rows while data loads |
| `emptyMessage` | `string` | `"No results"` | Message shown when `data` is empty |
| `onRowClick` | `(row: T) => void` | — | Callback fired on row click |
| `rowClassName` | `(row: T) => string` | — | Returns extra CSS classes per row |
| `stickyHeader` | `boolean` | `false` | Stick the header row to the top on scroll |
| `maxHeight` | `string` | — | CSS max-height for the scroll container (e.g. `"400px"`) |
| `bordered` | `boolean` | `false` | Apply border styling to the table |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Row and cell size |
| `mobileLayout` | `"scroll" \| "cards"` | `"scroll"` | How the table renders below `md` (768px). `"scroll"` keeps horizontal scroll; `"cards"` renders each row as a labelled card. Columns with `hideOnMobile: true` are omitted from the card view. |
| `className` | `string` | — | Additional wrapper CSS classes |

### `ColumnDef<T>` Shape

```ts
type ColumnDef<T> = {
  key: keyof T | string;         // Unique column identifier
  header: React.ReactNode;       // Column header label
  render?: (row: T) => React.ReactNode;  // Custom cell renderer
  align?: "left" | "center" | "right";  // Cell alignment (default: "left")
  sortable?: boolean;            // Enable client-side sorting for this column
  width?: string;                // Column width (CSS value)
}
```

### `TableCell` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Cell padding size |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment |

All standard `<td>` HTML attributes are also accepted.

### `TableHeaderCell` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Cell padding size |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment |
| `sortable` | `boolean` | `false` | Show sort controls |
| `sorted` | `"asc" \| "desc" \| null` | `null` | Current sort direction |
| `onSort` | `() => void` | — | Callback when sort is toggled |

All standard `<th>` HTML attributes (except `onClick`) are also accepted.

### `TableSkeleton` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `number` | **required** | Number of skeleton columns |
| `rows` | `number` | `5` | Number of skeleton rows |
| `className` | `string` | — | Additional CSS classes |

### Variants

| Prop | Values |
|---|---|
| `size` | `sm`, `md`, `lg` |
| `align` | `left`, `center`, `right` |
| `bordered` | `true`, `false` |

### Usage

```tsx
type Order = { id: string; customer: string; amount: number; status: string };

const columns: ColumnDef<Order>[] = [
  { key: "customer", header: "Customer", sortable: true },
  { key: "amount",   header: "Amount",   align: "right", sortable: true,
    render: (row) => `$${row.amount.toFixed(2)}` },
  { key: "status",   header: "Status",
    render: (row) => <StatusBadge label={row.status} variant="success" /> },
];

<Table
  columns={columns}
  data={orders}
  keyField="id"
  loading={isLoading}
  emptyMessage="No orders found"
  onRowClick={(row) => navigate(`/orders/${row.id}`)}
  stickyHeader
  maxHeight="500px"
  bordered
  size="md"
  mobileLayout="cards"
/>
```

**Custom cells only (low-level):**
```tsx
<table>
  <thead>
    <tr>
      <TableHeaderCell sortable sorted="asc" onSort={handleSort}>Name</TableHeaderCell>
      <TableHeaderCell align="right">Amount</TableHeaderCell>
    </tr>
  </thead>
  <tbody>
    <tr>
      <TableCell>John Doe</TableCell>
      <TableCell align="right">$120.00</TableCell>
    </tr>
  </tbody>
</table>
```

---

## Tabs

**File:** `components/custom/Tabs/Tabs.tsx`

**Exports:** `Tabs`, `CustomTabsTrigger`, types `TabItem`, `CustomTabsProps`

### `Tabs` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `TabItem[]` | **required** | Tab items — minimum 2, throws if fewer provided |
| `value` | `string` | — | Controlled active tab value |
| `defaultValue` | `string` | — | Uncontrolled initial active tab value |
| `onChange` | `(value: string) => void` | — | Fires when active tab changes |
| `variant` | `"primary" \| "secondary"` | `"primary"` | Visual style |
| `visibleTabLimit` | `number` | — | Max visible tabs; extras go into an overflow dropdown |
| `overflowLabel` | `string` | `"More Options"` | Label for the overflow dropdown trigger |
| `className` | `string` | — | Additional wrapper CSS classes |

### `TabItem` Type

```ts
type TabItem = {
  value: string;       // Unique identifier used as the tab key
  label: string;       // Displayed text
  disabled?: boolean;  // Disables the tab trigger
}
```

### `CustomTabsTrigger` Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | Tab value identifier |
| `variant` | `"primary" \| "secondary"` | `"primary"` | Visual style |
| `disabled` | `boolean` | — | Disabled state |

All standard shadcn `TabsTrigger` props are also accepted.

### Variants

| Variant | Description |
|---|---|
| `primary` | Underline indicator — animated green bar tracks the active tab |
| `secondary` | Pill background — animated pill slides to the active tab |

### Usage

```tsx
const tabs: TabItem[] = [
  { value: "overview",  label: "Overview" },
  { value: "orders",    label: "Orders" },
  { value: "customers", label: "Customers" },
  { value: "reports",   label: "Reports", disabled: true },
];

// Uncontrolled
<Tabs tabs={tabs} defaultValue="overview" variant="primary" />

// Controlled
<Tabs
  tabs={tabs}
  value={activeTab}
  onChange={setActiveTab}
  variant="secondary"
/>

// With overflow menu (shows only first 3, rest in "More" dropdown)
<Tabs
  tabs={tabs}
  defaultValue="overview"
  visibleTabLimit={3}
  overflowLabel="More"
/>
```

**Tab content** — pair with shadcn `TabsContent` directly:
```tsx
import { TabsContent } from "@/components/ui/tabs";

<Tabs tabs={tabs} defaultValue="overview">
  <TabsContent value="overview"><OverviewPanel /></TabsContent>
  <TabsContent value="orders"><OrdersPanel /></TabsContent>
</Tabs>
```

---

## Toggle

**File:** `components/custom/Toggle/Toggle.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Toggle size |
| `label` | `string` | — | Label text |
| `labelPosition` | `"inside" \| "left" \| "right"` | `"right"` | Where the label appears relative to the toggle |
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | — | Uncontrolled initial state |
| `onChange` | `(checked: boolean) => void` | — | Change handler |
| `disabled` | `boolean` | — | Disabled state |
| `wrapperClassName` | `string` | — | CSS classes for the outer wrapper element |

All standard `<input type="checkbox">` and Radix Switch attributes are also accepted.

### Variants

| Prop | Values | Description |
|---|---|---|
| `size` | `sm`, `md`, `lg` | Controls track height and thumb size |
| `labelPosition` | `inside`, `left`, `right` | `inside` renders text inside the track; `left`/`right` render beside it |

### Size Dimensions

| Size | Track height | Thumb size |
|---|---|---|
| `sm` | 28px | 20×20px |
| `md` | 32px | 24×24px |
| `lg` | 36px | 28×28px |

### Usage

```tsx
// Basic toggle
<Toggle checked={enabled} onChange={setEnabled} />

// With label on the right (default)
<Toggle label="Enable notifications" checked={enabled} onChange={setEnabled} />

// Label on the left
<Toggle label="Dark mode" labelPosition="left" defaultChecked />

// Label inside the track
<Toggle label="ON" labelPosition="inside" size="lg" />

// Disabled
<Toggle label="Unavailable feature" disabled />

// Controlled inside a form
<Toggle
  label="Active"
  checked={form.values.active}
  onChange={(val) => form.setFieldValue("active", val)}
  size="sm"
/>
```

---

## UengageProvider

**File:** `components/custom/Provider/index.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `React.ReactNode` | **required** | App content |
| `className` | `string` | — | Additional CSS classes |

### Usage

Wrap your application root with `UengageProvider` to apply scoped `uengage-ui` styles.

```tsx
// main.tsx / _app.tsx
<UengageProvider>
  <App />
</UengageProvider>
```

---

## Common Patterns

### Controlled vs Uncontrolled

Most form components support both patterns:

```tsx
// Controlled
const [val, setVal] = useState("");
<Input value={val} onChange={(e) => setVal(e.target.value)} />

// Uncontrolled
<Input defaultValue="initial" />
```

### onTouch

Input-like components expose `onTouch` which fires **once** on the first blur after the user interacts with the field — useful for form validation libraries.

```tsx
<Input onTouch={() => form.setFieldTouched("email")} />
```

### Generic Item Mapping (`getLabel` / `getValue`)

`Select`, `CheckboxGroup`, `RadioGroup`, and `SearchBar` all accept an `items` array with extractor functions, so you can pass your domain objects directly without mapping to `{ value, label }` first.

```tsx
<Select
  items={users}
  getLabel={(u) => u.fullName}
  getValue={(u) => u.id}
/>
```

### Size Consistency

All interactive components share the same `size` scale: `sm` | `md` | `lg`. Use the same size across related components (label, input, helper) for visual consistency.
