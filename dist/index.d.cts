import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import { ReactNode, ComponentProps, CSSProperties } from 'react';
export { buttonVariants } from './components/ui/button.cjs';
export { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from './components/ui/alert-dialog.cjs';
export { Separator } from './components/ui/separator.cjs';
export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from './components/ui/drawer.cjs';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import { CssSize } from './utils/layoutTokens.cjs';
export { LAYOUT, LayoutTokens, toCssSize } from './utils/layoutTokens.cjs';
export { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover.cjs';
export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './components/ui/command.cjs';
import { TabsTrigger } from './components/ui/tabs.cjs';
export { Input as input } from './components/ui/input.cjs';
import { Label } from './components/ui/label.cjs';
import { RadioGroup as RadioGroup$1, Checkbox as Checkbox$1, Switch } from 'radix-ui';
export { D as DatePickerCalendar, a as DatePickerTriggerState, b as DayCellVariant, M as MonthPickerCalendar, t as datePickerTriggerVariants, d as dayCellVariants } from './DatePickerCalendar-DDdnXtEU.cjs';
import { LucideIcon } from 'lucide-react';
export { BrandGreen, brand } from './utils/colors.cjs';
export { cn } from './lib/utils.cjs';
import { BannerTone, BannerSize, BannerPlacement, BannerAppearance } from './components/ui/banner.cjs';
export { BannerToneKey } from './components/ui/banner.cjs';
export { CardAction, CardDescription } from './components/ui/card.cjs';
import 'cmdk';
import 'react-day-picker';
import 'clsx';

declare function SidebarZIndexProvider({ children, }: {
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function ModalZIndexProvider({ children, }: {
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;

type ColorVariant = "primary" | "secondary" | "tertiary" | "alertPrimary" | "warningPrimary" | "alertSecondary";
type ButtonState = "default" | "hover" | "pressed" | "focused" | "disabled";
type ButtonSize = "xs" | "sm" | "md" | "lg";
/** Kept for backward-compat export — not used internally for className. */
declare const buttonVariants: (props?: ({
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends Omit<React$1.ComponentProps<"button">, "title">, VariantProps<typeof buttonVariants> {
    variant?: ColorVariant;
    size?: ButtonSize;
    leftIcon?: React$1.ReactNode;
    rightIcon?: React$1.ReactNode;
    asChild?: boolean;
    /** Shows a spinner, hides label + icons, blocks clicks, and sets aria-busy. */
    loading?: boolean;
    /** Custom icon rendered while `loading`. Defaults to a spinning `Loader2`. */
    loadingIcon?: React$1.ReactNode;
    /** Text label. Used when `children` is not provided. */
    title?: React$1.ReactNode;
}
declare function Button({ className, variant, size, leftIcon, rightIcon, disabled, loading, loadingIcon, asChild, style, title, children, onPointerEnter, onPointerLeave, onPointerDown, onPointerUp, onFocus, onBlur, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;
declare namespace Button {
    var displayName: string;
}

interface PageContainerProps extends React$1.HTMLAttributes<HTMLElement> {
    maxWidth?: CssSize;
    /**
     * Extra left padding added ON TOP of the base content padding.
     * Useful for pages that need sidebar clearance on desktop.
     * Automatically scales down on narrow viewports.
     */
    paddingLeft?: CssSize;
    /**
     * Extra right padding added ON TOP of the base content padding.
     */
    paddingRight?: CssSize;
    gap?: CssSize;
}
declare function PageContainer({ paddingLeft, paddingRight, className, style, children, ...props }: PageContainerProps): react_jsx_runtime.JSX.Element;
declare namespace PageContainer {
    var displayName: string;
}

interface TopHeaderProps extends Omit<React$1.HTMLAttributes<HTMLElement>, "title"> {
    /** Module / page title, rendered bold on the left. */
    title: React$1.ReactNode;
    /**
     * Optional helper element beside the title (e.g. a "How it Works?" link).
     */
    helper?: React$1.ReactNode;
    /** Right-side slot (e.g. action buttons). */
    action?: React$1.ReactNode;
    /** Render a bottom divider. Defaults to true. */
    divider?: boolean;
    /** Gap between title and helper. Defaults to 10px. */
    titleGap?: CssSize;
}
declare function TopHeader({ title, helper, action, divider, titleGap, className, style, ...props }: TopHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace TopHeader {
    var displayName: string;
}

type SubHeaderAlign = "start" | "center" | "end";
interface SubHeaderProps extends Omit<React$1.HTMLAttributes<HTMLElement>, "title"> {
    /** Primary section heading. */
    title?: React$1.ReactNode;
    /**
     * Supporting subtitle. Accepts ReactNode for rich content.
     */
    subtitle?: React$1.ReactNode;
    /** Right-side slot (e.g. filters, step navigation, CTAs). */
    right?: React$1.ReactNode;
    /**
     * Vertical alignment of left block vs. right slot on sm+ screens.
     * Defaults to "center".
     */
    align?: SubHeaderAlign;
    /** Render a bottom divider. Defaults to false. */
    divider?: boolean;
    /**
     * Gap between the title/subtitle block and `children`.
     * Defaults to LAYOUT.gap.xs (12px).
     */
    gap?: CssSize;
}
declare function SubHeader({ title, subtitle, right, align, divider, gap, className, style, children, ...props }: SubHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace SubHeader {
    var displayName: string;
}

type GridColumns = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "2:1" | "1:2" | "3:1" | "1:3" | "1:1:2" | "2:1:1" | (string & {});
type GridLimit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
interface GridProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Column layout. A preset name or raw CSS grid-template-columns value. */
    columns?: GridColumns;
    /**
     * Number of equal-width columns per row (1–8). When provided, takes
     * precedence over `columns`.
     */
    limit?: GridLimit;
    /**
     * Gap between columns. When omitted, automatically determined by the
     * column preset (e.g. "2" → 20px, "4" → 12px, "6" → 0).
     * Pass a value to override.
     */
    gap?: CssSize;
    /** Row gap (if different from column gap). */
    rowGap?: CssSize;
}
declare function Grid({ columns, limit, gap, rowGap, className, style, children, ...props }: GridProps): react_jsx_runtime.JSX.Element;
declare namespace Grid {
    var displayName: string;
}

interface CardProps extends React$1.ComponentProps<"div"> {
}
declare function Card({ className, ...props }: CardProps): react_jsx_runtime.JSX.Element;
declare namespace Card {
    var displayName: string;
}
declare function CardHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardTitle({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardContent({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

type SearchValueType = "string" | "number" | "alphanumeric";
type SearchBarSize = "sm" | "md" | "lg";
interface SearchBarProps<T extends string | number = string, TItem = unknown> {
    value?: T;
    defaultValue?: T;
    valueType?: SearchValueType;
    size?: SearchBarSize;
    /** Label displayed above the search bar. */
    label?: React$1.ReactNode;
    /** When `true`, appends a red asterisk to the label. */
    required?: boolean;
    placeholder?: string;
    /**
     * Tailwind width class(es) applied to the outer wrapper. Use any responsive
     * utility (e.g. `"w-full md:w-96 lg:w-[400px]"`). Defaults to `w-full` when
     * omitted. For one-off layout overrides, prefer `className`.
     */
    width?: string;
    /** Override the default height from `size`. Accepts any CSS size (number = px). */
    /** Extra classes merged onto the outer wrapper — use this for layout/width. */
    className?: string;
    /** When true, the input shows its current value but cannot be edited or searched. */
    readOnly?: boolean;
    inputClassName?: string;
    dropdownClassName?: string;
    disabled?: boolean;
    loading?: boolean;
    onChange?: (value: T) => void;
    /** Fires on Enter OR icon click when input is non-empty. */
    onSearch?: (value: T) => void;
    onClear?: () => void;
    /** Fires once the first time the field is blurred (Angular-style `touched` state). */
    onTouch?: () => void;
    /** Toggle the browser's native spell-check. Defaults to `true`. */
    spellCheck?: boolean;
    /** Show the X clear button when the input has a value. Defaults to `false`. */
    clearable?: boolean;
    /** Pre-mapped string list. Component auto-filters with fuzzy matching. */
    dropdownContent?: string[];
    /**
     * Any array of objects (e.g. raw API response). Provide `getLabel` to
     * tell the component how to display each item, and optionally `getValue`
     * to control what string is passed to `onSelect` (defaults to the label).
     */
    dropdownItems?: TItem[];
    /** Extract the display string from a `dropdownItems` entry. */
    getLabel?: (item: TItem) => string;
    /** Extract the select value from a `dropdownItems` entry. Defaults to `getLabel`. */
    getValue?: (item: TItem) => string;
    /**
     * Fires when a dropdown item is picked.
     * @param value  The string value (label, or `getValue` result).
     * @param item   The original raw item when using `dropdownItems`; undefined otherwise.
     */
    onSelect?: (value: string, item?: TItem) => void;
    /** Text shown in dropdown when no items match the search. */
    fallbackText?: string;
    /**
     * Swaps the leading magnifier for a spinner while a query is in flight. The
     * field deliberately stays typeable — the design's rule is "the field never
     * disables while a query is running".
     */
    searching?: boolean;
    /**
     * Live result count rendered under the field in brand green ("12 results").
     * Set to `0` together with `noResults` for the empty case.
     */
    resultCount?: number;
    /** Singular/plural noun used with `resultCount`. Defaults to `result(s)`. */
    resultNoun?: string;
    /**
     * Puts the control into the amber "no results" state — warning border, amber
     * glyph, amber message.
     */
    noResults?: boolean;
    /**
     * Did-you-mean correction shown in the message row when `noResults` is set.
     * The label renders as a button so the operator can apply it in one click.
     */
    suggestion?: {
        label: string;
        onApply?: () => void;
    };
    /** Helper text under the field. Overrides the generated result message. */
    message?: React$1.ReactNode;
    /**
     * Keyboard shortcut badge pinned to the right of an empty field (e.g. `"⌘K"`).
     * Hidden as soon as the field has a value.
     */
    shortcut?: string;
    /**
     * Recent searches shown on focus, before anything is typed. Each entry is
     * individually removable via `onRemoveRecent`.
     */
    recents?: string[];
    /** Fires when a recent entry's ✕ is clicked. */
    onRemoveRecent?: (value: string) => void;
    /** Fires when a recent entry is picked. Falls back to `onSearch`. */
    onSelectRecent?: (value: string) => void;
    /**
     * Debounce in ms before `onDebouncedChange` fires. The design debounces
     * search at 300ms. `0` disables it.
     */
    debounce?: number;
    /** Debounced companion to `onChange`, gated by `debounce`. */
    onDebouncedChange?: (value: T) => void;
}

declare function SearchBar<T extends string | number = string, TItem = unknown>({ value: controlledValue, defaultValue, valueType, size, label, required, placeholder, width, className, inputClassName, disabled, readOnly, spellCheck, onChange, onSearch, onClear, onTouch, clearable, dropdownClassName, dropdownItems, getLabel, getValue, onSelect, fallbackText, searching, resultCount, resultNoun, noResults, suggestion, message, shortcut, recents, onRemoveRecent, onSelectRecent, debounce, onDebouncedChange, }: SearchBarProps<T, TItem>): react_jsx_runtime.JSX.Element;
declare namespace SearchBar {
    var displayName: string;
}

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    /** Trailing muted text on the option row (e.g. "412 items", "default"). */
    meta?: string;
    /**
     * Group heading this option belongs to. Options sharing a `group` render
     * under one uppercase eyebrow, separated from the next group by a hairline.
     */
    group?: string;
    /**
     * Second line under the label. On a disabled option this is where you say
     * *why* it is disabled — a disabled option should always explain itself.
     */
    description?: string;
    /** Leading avatar/initials chip or icon for a rich row. */
    icon?: React$1.ReactNode;
}
type SelectMode = "single" | "multi";
/** Non-error validation states, mirroring Input. */
type SelectStatus = "success" | "warning";
interface SelectProps<TItem = unknown> {
    /** Pre-shaped option list. Use this when data already fits { value, label }. */
    options?: SelectOption[];
    /**
     * Any array of objects (e.g. raw API response). Provide `getLabel` and
     * `getValue` to tell the component how to map each item.
     */
    items?: TItem[];
    /** Extract the display label from an `items` entry. */
    getLabel?: (item: TItem) => string;
    /** Extract the option value from an `items` entry. */
    getValue?: (item: TItem) => string;
    /** Mark an item as disabled. Defaults to always enabled. */
    getDisabled?: (item: TItem) => boolean;
    value?: string | string[];
    defaultValue?: string | string[];
    mode?: SelectMode;
    /**
     * Alias for `mode="multi"`, matching the design's prop name. When both are
     * given, `multiple` wins.
     */
    multiple?: boolean;
    /** Trigger size — controls height, padding, and text scale. */
    size?: "xs" | "sm" | "md" | "lg";
    placeholder?: string;
    disabled?: boolean;
    /**
     * Tailwind width class(es) applied to the trigger wrapper. Use any responsive
     * utility (e.g. `"w-full md:w-96 lg:w-[400px]"`). Defaults to `w-full` when
     * omitted. For one-off layout overrides, prefer `className`.
     */
    width?: string;
    className?: string;
    onChange?: (value: string | string[]) => void;
    /** Fires once the first time the trigger is blurred after interacting (Angular-style `touched`). */
    onTouch?: () => void;
    /** Toggle the browser's native spell-check on the dropdown search input. Defaults to `true`. */
    spellCheck?: boolean;
    /** Show the X clear button (and pill remove buttons) when a value is selected. Defaults to `false`. */
    clearable?: boolean;
    /** Field label rendered above the trigger. */
    label?: React$1.ReactNode;
    /** When true, appends a red asterisk directly after the label text. */
    required?: boolean;
    /** Helper text rendered below the trigger. */
    helperText?: string;
    /** Error message rendered below the trigger; takes priority over helperText. */
    error?: string;
    /** When true, the trigger shows the current selection but the dropdown cannot be opened. */
    readOnly?: boolean;
    /**
     * When `true`, renders an ascending/descending sort toggle icon on the trigger.
     * Clicking it cycles A→Z / Z→A on the option list.
     */
    sorting?: boolean;
    /**
     * Controls visibility of the search input inside the dropdown.
     * Defaults to `true`. Set to `false` to show only the raw option list.
     */
    search?: boolean;
    /** Alias for `search`, matching the design's prop name. Takes priority when set. */
    searchable?: boolean;
    /**
     * When `true`, each option in the dropdown is prefixed with its position number (1, 2, 3 …).
     * The index reflects the current displayed order (after sorting / fuzzy filtering).
     */
    indexing?: boolean;
    /**
     * Non-error validation state. `success` gives a green border and tick,
     * `warning` an amber fill. Ignored while `error` is set.
     */
    status?: SelectStatus;
    /** Message shown under the trigger for the active `status`. Falls back to `helperText`. */
    statusMessage?: string;
    /** Leading glyph inside the trigger, ahead of the value. */
    leftIcon?: React$1.ReactNode;
    /**
     * Options are being fetched. The trigger shows a spinner and the menu shows
     * shimmer rows rather than a centred spinner.
     */
    loading?: boolean;
    /**
     * Hard cap on how many chips a multi select renders before collapsing the
     * rest into a `+N` counter. Without it the trigger measures how many fit.
     */
    maxChips?: number;
    /** Fires as the user types in the dropdown search box — for server-side lookup. */
    onSearch?: (query: string) => void;
    /** Offer a "Create …" row, pinned last, when the query matches no option. */
    creatable?: boolean;
    /** Fires when the create row is chosen. Receives the raw query text. */
    onCreate?: (query: string) => void;
    /** Replaces the default "No results found." body when there is nothing to show. */
    emptyState?: React$1.ReactNode;
    /** Where the menu opens. `auto` lets it flip above the trigger near the fold. */
    placement?: "auto" | "top" | "bottom";
}

declare function Select<TItem = unknown>({ options, items, getLabel, getValue, getDisabled, value: controlledValue, defaultValue, mode, multiple, size, placeholder, disabled, width, className, onChange, onTouch, spellCheck, clearable, label, required, helperText, error, readOnly, sorting, indexing, search: searchProp, searchable, status, statusMessage, leftIcon, loading, maxChips, onSearch, creatable, onCreate, emptyState, placement, }: SelectProps<TItem>): react_jsx_runtime.JSX.Element;
declare namespace Select {
    var displayName: string;
}

type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search";
type AllowPattern = "alphanumeric" | "alpha" | "numeric" | "decimal" | "phone" | "none";
/** 28 / 32 / 40 / 48px. `xs` is for inline table editing, `lg` for standalone forms and mobile. */
type InputSize = "xs" | "sm" | "md" | "lg";
/**
 * Non-error validation states. `error` still wins over any of these — a field
 * that is both `status="success"` and in error renders as an error.
 */
type InputStatus = "validating" | "success" | "warning";
interface CustomInputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size" | "width" | "height" | "onChange" | "prefix"> {
    size?: InputSize;
    /**
     * `"default"` renders the usual bordered box. `"underline"` drops the box
     * entirely — transparent background, no side/top border, just a bottom
     * rule that turns solid on focus. Matches borderless title-style fields
     * (e.g. a "New ticket" modal's title input) where the placeholder should
     * read directly on the surface behind it.
     */
    variant?: "default" | "underline";
    inputType?: InputType;
    allowPattern?: AllowPattern;
    label?: React$1.ReactNode;
    helperText?: string;
    error?: string;
    leftIcon?: React$1.ReactNode;
    rightIcon?: React$1.ReactNode;
    /**
     * Async/advisory state that is not an error:
     * - `"validating"` — a check is in flight; renders a spinner and keeps the
     *   focus border without the halo.
     * - `"success"` — green border and tick, distinct from merely "no error".
     * - `"warning"` — amber fill, advisory but not blocking.
     *
     * Pair with `statusMessage` to explain it. Ignored while `error` is set.
     */
    status?: InputStatus;
    /** Message shown under the control for the active `status`. Falls back to `helperText`. */
    statusMessage?: string;
    /**
     * Rendered inside the box, ahead of the value, on a subtle fill separated by
     * a hairline (e.g. `"₹"`, `"+91"`). Unlike `leftIcon` it is a boxed affix,
     * not a glyph floating on the field background.
     */
    prefix?: React$1.ReactNode;
    /** Trailing counterpart to `prefix` (e.g. `"INR"`, `".00"`). */
    suffix?: React$1.ReactNode;
    /**
     * The value is still being fetched. Renders a muted box with a spinner and
     * blocks interaction, without marking the field disabled for the form.
     */
    loading?: boolean;
    /**
     * Show a `count/maxLength` counter. Defaults to `true` whenever `maxLength`
     * is set. The counter turns amber once the value passes ~83% of the limit.
     */
    showCount?: boolean;
    /** Right-aligns the value — for amounts and other numerics. */
    align?: "left" | "right";
    /**
     * Keep the message row in the layout even when there is nothing to say, so a
     * late validation error never shifts the form. Off by default — turning it on
     * adds roughly one line of height under the control.
     */
    reserveMessageSpace?: boolean;
    /**
     * Style overrides merged onto the control box itself (the bordered element),
     * not the `<input>`. Use for composition — e.g. squaring off one side so a
     * button can attach flush to the field. `style` still lands on the `<input>`.
     */
    boxStyle?: React$1.CSSProperties;
    /**
     * Tailwind width class(es) applied to the outer wrapper. Use any responsive
     * utility (e.g. `"w-full md:w-96 lg:w-[400px]"`). Defaults to `w-full` when
     * omitted. For one-off layout overrides, prefer `className`.
     */
    width?: string;
    /** Custom regex the value must match on blur. String is compiled via `new RegExp(...)`. */
    validationRegex?: RegExp | string;
    /** Error message shown when `validationRegex` or native (min/max/minLength/maxLength/required) validity fails. */
    validationMessage?: string;
    /** Fires once the first time the field is blurred (Angular-style `touched` state). */
    onTouch?: () => void;
    /**
     * Optional autocomplete list. Each entry must have `label` (displayed text)
     * and `value` (emitted on select). Fuse.js fuzzy-filters these as the user types.
     */
    suggestions?: Array<{
        label: string;
        value: string;
    }>;
    /** Fires when the user picks a suggestion. Receives the item's `value` field. */
    onSuggestionSelect?: (value: string) => void;
    /** Shows an X button to clear the input value. */
    clearable?: boolean;
    /** Fires when the clear button is clicked. */
    onClear?: () => void;
    onChange?: (e: React$1.ChangeEvent<HTMLInputElement> | React$1.ChangeEvent<HTMLTextAreaElement>) => void;
    /** Renders a <textarea> instead of <input>. Incompatible with inputType="password" and suggestions. */
    multiline?: boolean;
    /** Number of visible text rows. Only used when multiline=true. */
    rows?: number;
    /** Controls CSS resize handle. Only used when multiline=true. Defaults to "vertical". */
    resize?: "none" | "vertical" | "horizontal" | "both";
}

/**
 * Resolved visual state of the control. Ordering is deliberate — `disabled`
 * and `readOnly` outrank validation, and an `error` outranks a `status`.
 */
type InputVisualState = "default" | "hover" | "focused" | "error" | "success" | "warning" | "validating" | "loading" | "readonly" | "disabled";
/**
 * Structural classes only — the pixel metrics and colours ride on inline
 * styles. `underline` keeps its historic box-less treatment.
 */
declare const inputWrapperVariants: (props?: ({
    multiline?: boolean | null | undefined;
    appearance?: "default" | "underline" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
    state?: "default" | "disabled" | "hover" | "focused" | "loading" | "validating" | "success" | "warning" | "error" | "readonly" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const inputFieldVariants: (props?: ({
    multiline?: boolean | null | undefined;
    align?: "left" | "right" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
    appearance?: "default" | "underline" | null | undefined;
    hasLeftIcon?: boolean | null | undefined;
    hasRightIcon?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * Retained for backward compatibility — the control now lays affixes out with
 * flexbox rather than absolute positioning, so nothing internal uses this.
 *
 * @deprecated Affixes are laid out inline; this will be removed in a future major.
 */
declare const inputIconSlotVariants: (props?: ({
    side?: "left" | "right" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
    multiline?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>;
type InputFieldVariants = VariantProps<typeof inputFieldVariants>;
type InputIconSlotVariants = VariantProps<typeof inputIconSlotVariants>;
declare const PATTERN_REGEX: Record<AllowPattern, string>;

type TriggerState = "default" | "open" | "disabled" | "readonly";
type TriggerSize = "xs" | "sm" | "md" | "lg";
/**
 * Structural classes for the trigger. Metrics and colours ride on inline
 * styles, so the control keeps its exact look in apps whose Tailwind build does
 * not scan this package.
 *
 * The `state` and `size` variant keys are preserved from the pre-refresh API —
 * existing calls such as `triggerVariants({ state: "open", size: "md" })` keep
 * type-checking, they simply no longer carry the colours.
 */
declare const triggerVariants: (props?: ({
    state?: "default" | "disabled" | "open" | "hover" | "focused" | "loading" | "validating" | "success" | "warning" | "error" | "readonly" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TriggerVariants = VariantProps<typeof triggerVariants>;

type TabItem = {
    value: string;
    label: string;
    disabled?: boolean;
    /** Leading icon. Rendered at the size scale's icon box. */
    icon?: React$1.ReactNode;
    /** Count badge rendered after the label. */
    count?: React$1.ReactNode;
    /** Amber dot marking unsaved work behind this tab. */
    dirty?: boolean;
    /** Tooltip on a disabled tab saying what unlocks it. */
    disabledReason?: string;
};
/**
 * `primary` is the underline look and `secondary` is the segmented look;
 * `pill` and `vertical` complete the design-system set.
 *
 * The choice is not cosmetic: primary/underline means "different content",
 * secondary/segmented means "same content, filtered".
 *
 * `legacyPrimary` and `legacySecondary` keep the pre-design-system looks — the
 * measured-overflow underline and the animated pill/chip slab — for call sites
 * that still want them.
 */
type TabsVariant = "primary" | "secondary" | "pill" | "vertical" | "legacyPrimary" | "legacySecondary";
/** The four looks `DesignTabs` renders internally. Not a public `variant` value. */
type TabsDesignVariant = "underline" | "segmented" | "pill" | "vertical";
type TabsSize = "sm" | "md" | "lg";
type TabsAppearance = "light" | "dark";
/** `manual` needs ↵ / Space to switch; `automatic` follows the arrow keys. */
type TabsActivation = "automatic" | "manual";
/** `scroll` fades and scrolls the strip; `menu` collapses the tail into a More menu. */
type TabsOverflowMode = "scroll" | "menu";
interface CustomTabsProps {
    tabs: TabItem[];
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    /**
     * Visual style.
     * @default "primary"
     */
    variant?: TabsVariant;
    /** Caps how many tabs render before the rest collapse into the overflow menu. */
    visibleTabLimit?: number;
    overflowLabel?: string;
    showBottomBorder?: boolean;
    className?: string;
    /**
     * Size scale. `lg` only appears once per page, directly under the page title.
     * @default "md"
     */
    size?: TabsSize;
    /**
     * Light surface, or the dark-surface palette where lime replaces forest.
     * @default "light"
     */
    appearance?: TabsAppearance;
    /**
     * `manual` requires ↵ / Space to switch after arrowing to a tab.
     * @default "automatic"
     */
    activation?: TabsActivation;
    /** Stretch the tabs to fill the available width. */
    fitted?: boolean;
    /**
     * How a strip too wide for its container behaves.
     * @default "scroll"
     */
    overflow?: TabsOverflowMode;
    /**
     * Deep-links the active tab to a URL search param, e.g. `"?tab"` or `"view"`.
     * Read on mount, written with `history.replaceState` on change.
     */
    syncToUrl?: string;
    /**
     * Gate a tab change — return `false` (or a promise of it) to keep the current
     * tab, e.g. to confirm unsaved work.
     */
    onBeforeChange?: (nextValue: string, currentValue: string) => boolean | Promise<boolean>;
    /** Wrap arrow-key navigation from the last tab back to the first. */
    loop?: boolean;
    /** Extra className for the tab strip itself. */
    listClassName?: string;
    /** Panels. Use `TabPanel` — rendered below the strip, or beside it when vertical. */
    children?: React$1.ReactNode;
    /** Width of the rail in the `vertical` variant, in px. @default 190 */
    verticalWidth?: number;
}
interface TabPanelProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "children"> {
    value: string;
    /**
     * Mount the panel on its first visit rather than up front.
     * @default true
     */
    lazy?: boolean;
    /** Keep the panel mounted once seen, preserving scroll and form state. */
    keepMounted?: boolean;
    children?: React$1.ReactNode;
}

declare function Tabs(props: CustomTabsProps): react_jsx_runtime.JSX.Element;
declare namespace Tabs {
    var displayName: string;
}

/** Lets `TabPanel` know which tab is live so it can mount lazily. */
declare const TabsActiveValueContext: React$1.Context<string | null>;
/**
 * The design-system tab set — underline, segmented, pill and vertical.
 * Built on Radix so arrow keys, Home/End and `activation` come for free.
 */
declare function DesignTabs({ tabs, variant, size, appearance, activation, fitted, overflow, overflowLabel, visibleTabLimit, showBottomBorder, syncToUrl, onBeforeChange, loop, value, defaultValue, onChange, className, listClassName, children, verticalWidth, }: Omit<CustomTabsProps, "variant"> & {
    variant: TabsDesignVariant;
}): react_jsx_runtime.JSX.Element;
declare namespace DesignTabs {
    var displayName: string;
}

/**
 * A tab panel. Cross-fades in rather than jumping.
 *
 * `lazy` (the default) mounts the panel on its first visit; `keepMounted` holds
 * it in the tree afterwards so scroll position and form state survive a switch.
 */
declare function TabPanel({ value, lazy, keepMounted, className, children, ...rest }: TabPanelProps): react_jsx_runtime.JSX.Element | null;
declare namespace TabPanel {
    var displayName: string;
}

interface CustomTabsTriggerProps extends React$1.ComponentProps<typeof TabsTrigger> {
    variant?: "secondary" | "tertiary";
}
declare function CustomTabsTrigger({ className, children, disabled, variant, ...props }: CustomTabsTriggerProps): react_jsx_runtime.JSX.Element;
declare namespace CustomTabsTrigger {
    var displayName: string;
}

interface TabsSizeSpec {
    /** Label font size, px. */
    fs: number;
    /** Gap between underline tabs, px. */
    gap: number;
    /** Padding of an underline tab. */
    underPad: string;
    /** Padding of a segmented tab. */
    segPad: string;
    /** Padding of a pill tab. */
    pillPad: string;
    /** Icon box, px. */
    icon: number;
    /** Human-readable spec, used by the docs story. */
    spec: string;
    name: string;
}
declare const TABS_SIZES: Record<TabsSize, TabsSizeSpec>;
interface TabsPalette {
    /** 1px rule under an underline strip, or beside a vertical rail. */
    strip: string;
    /** Resting label. */
    fg: string;
    /** Hover label. */
    fgHover: string;
    /** Active label. */
    fgActive: string;
    /** Disabled label. */
    fgDisabled: string;
    /** The 2px underline / the 2px vertical marker. */
    bar: string;
    /** Segmented track. */
    segTrack: string;
    segActiveBg: string;
    segActiveShadow: string;
    segHoverBg: string;
    pillBg: string;
    pillFg: string;
    pillBorder: string;
    pillHoverBg: string;
    pillHoverBorder: string;
    pillActiveBg: string;
    pillActiveFg: string;
    pillActiveBorder: string;
    vertActiveBg: string;
    vertHoverBg: string;
    countBg: string;
    countFg: string;
    countActiveBg: string;
    countActiveFg: string;
    /** Panel surface. */
    panelBg: string;
    panelBorder: string;
    panelFg: string;
    /** Amber dot marking unsaved work. */
    dirty: string;
    /** Focus ring. */
    ring: string;
    /** Surface behind the strip, used by the overflow fade. */
    surface: string;
}
declare function getTabsPalette(appearance?: TabsAppearance): TabsPalette;

declare const tabTriggerVariants: (props?: ({
    state?: "disabled" | "active" | "inactive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TabTriggerVariants = VariantProps<typeof tabTriggerVariants>;

interface CustomInputComposedProps extends CustomInputProps {
    required?: boolean;
}
declare function Input({ size, variant, inputType, allowPattern, label, helperText, error, status, statusMessage, prefix, suffix, loading, showCount, align, boxStyle, reserveMessageSpace, leftIcon, rightIcon, required, width, className, disabled, readOnly, validationRegex, validationMessage, onTouch, spellCheck, id, onChange, onFocus, onBlur, suggestions, onSuggestionSelect, clearable, onClear, multiline, rows, resize, ...rest }: CustomInputComposedProps): react_jsx_runtime.JSX.Element;
declare namespace Input {
    var displayName: string;
}

type InputLabelSize = InputSize;
interface InputLabelProps extends React$1.ComponentProps<typeof Label> {
    size?: InputLabelSize;
    required?: boolean;
    /**
     * Overrides the label colour for a signalling state (error / disabled). Left
     * undefined the colour comes from a class, so a caller's `className` can
     * still override it.
     */
    tone?: string;
}
/** Figtree 600 / 12px, Title Case, red asterisk when required. */
declare function InputLabel({ size, required, tone, className, style, children, ...props }: InputLabelProps): react_jsx_runtime.JSX.Element;
declare namespace InputLabel {
    var displayName: string;
}

type InputHelperSize = InputSize;
interface InputHelperProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
    size?: InputHelperSize;
    helperText?: string;
    error?: string;
    /** Resolved control state — drives the message colour. */
    state?: InputVisualState;
    /**
     * Keep the row in the layout even with nothing to say, so validation never
     * shifts the form. The field enables this only for fields that can actually
     * produce a message.
     */
    reserveSpace?: boolean;
}
/**
 * The message row. Validation always pairs a colour with a message and an
 * icon; advisory statuses carry the colour alone.
 */
declare function InputHelper({ size, helperText, error, state, reserveSpace, className, style, ...props }: InputHelperProps): react_jsx_runtime.JSX.Element | null;
declare namespace InputHelper {
    var displayName: string;
}

type Size = "xs" | "sm" | "md" | "lg";
interface CustomRadioItemProps extends Omit<React$1.ComponentProps<typeof RadioGroup$1.Item>, "children"> {
    label: React$1.ReactNode;
    size?: Size;
    disabled?: boolean;
    error?: boolean;
    /** When provided, the pill wrapper uses this color for its border when checked. Falls back to default green if omitted. */
    borderColor?: string;
    /** When provided, the pill wrapper uses this color for its background when checked. Falls back to default green tint if omitted. */
    bgColor?: string;
    /** When provided, applies this color to the label text when checked. */
    textColor?: string;
    /** When true, the item shows its current state but cannot be selected. */
    readOnly?: boolean;
}
declare function Radio({ id, label, size, disabled, readOnly, error, value, className, borderColor, bgColor, textColor, ...rest }: CustomRadioItemProps): react_jsx_runtime.JSX.Element;
declare namespace Radio {
    var displayName: string;
}

interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface CustomRadioGroupProps<T = RadioOption> {
    options: T[];
    /** Extract the display label from an option. Defaults to `option.label`. */
    getLabel?: (item: T) => string;
    /** Extract the form value from an option. Defaults to `option.value`. */
    getValue?: (item: T) => string;
    /** Extract per-option disabled state. Defaults to `option.disabled`. */
    getDisabled?: (item: T) => boolean | undefined;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    size?: "xs" | "sm" | "md" | "lg";
    layout?: "horizontal" | "vertical" | "grid";
    /** Max columns at the largest breakpoint when `layout="grid"`. Smaller breakpoints scale down (mobile=1, sm=2). */
    columns?: 1 | 2 | 3 | 4;
    disabled?: boolean;
    label?: React$1.ReactNode;
    required?: boolean;
    helperText?: string;
    error?: string;
    className?: string;
    /** When provided, applies this border color to each radio pill when its item is selected. */
    borderColor?: string;
    /** When provided, applies this background color to each radio pill when its item is selected. */
    bgColor?: string;
    /** When provided, applies this color to each item's label text when its item is selected. */
    textColor?: string;
    /** When true, all radio items show their current state but cannot be changed. */
    readOnly?: boolean;
}

declare function RadioGroup<T = RadioOption>({ options, getLabel, getValue, getDisabled, value, defaultValue, onChange, size, layout, columns, disabled, label, required, helperText, error, className, borderColor, bgColor, textColor, readOnly, }: CustomRadioGroupProps<T>): react_jsx_runtime.JSX.Element;
declare namespace RadioGroup {
    var displayName: string;
}

declare const radioCircleVariants: (props?: ({
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
    state?: "default" | "disabled" | "error" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const radioDotVariants: (props?: ({
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const radioLabelVariants: (props?: ({
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
    state?: "default" | "disabled" | "checked" | "error" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type RadioCircleVariants = VariantProps<typeof radioCircleVariants>;
type RadioDotVariants = VariantProps<typeof radioDotVariants>;
type RadioLabelVariants = VariantProps<typeof radioLabelVariants>;

interface CheckboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface CustomCheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    size?: "xs" | "sm" | "md" | "lg";
    label?: React$1.ReactNode;
    disabled?: boolean;
    indeterminate?: boolean;
    error?: boolean;
    className?: string;
    /** When provided, the pill wrapper uses this color for its border when checked/indeterminate. Falls back to default green if omitted. */
    borderColor?: string;
    /** When provided, the pill wrapper uses this color for its background when checked/indeterminate. Falls back to default green tint if omitted. */
    bgColor?: string;
    /** When provided, applies this color to the label text when checked/indeterminate. */
    textColor?: string;
    /** When true, the checkbox is visible and shows its current value but cannot be toggled. */
    readOnly?: boolean;
}
interface CustomCheckboxGroupProps<T = CheckboxOption> {
    options: T[];
    /** Extract the display label from an option. Defaults to `option.label`. */
    getLabel?: (item: T) => string;
    /** Extract the form value from an option. Defaults to `option.value`. */
    getValue?: (item: T) => string;
    /** Extract per-option disabled state. Defaults to `option.disabled`. */
    getDisabled?: (item: T) => boolean | undefined;
    value?: string[];
    onChange?: (value: string[]) => void;
    size?: "xs" | "sm" | "md" | "lg";
    layout?: "horizontal" | "vertical" | "grid";
    columns?: number;
    disabled?: boolean;
    label?: React$1.ReactNode;
    required?: boolean;
    helperText?: string;
    error?: string;
    selectAll?: boolean;
    /** When provided, applies this border color to each pill when its item is checked. */
    borderColor?: string;
    /** When provided, applies this background color to each pill when its item is checked. */
    bgColor?: string;
    /** When provided, applies this color to each item's label text when its item is checked. */
    textColor?: string;
    /** When true, all checkboxes show their current state but cannot be toggled. */
    readOnly?: boolean;
}

declare function Checkbox({ checked, defaultChecked, onCheckedChange, size, label, disabled, readOnly, indeterminate, error, className, borderColor, bgColor, textColor, ...rest }: CustomCheckboxProps & Omit<React$1.ComponentProps<typeof Checkbox$1.Root>, "checked" | "defaultChecked" | "onCheckedChange" | "disabled" | "className">): react_jsx_runtime.JSX.Element;
declare namespace Checkbox {
    var displayName: string;
}

declare function CheckboxGroup<T = CheckboxOption>({ options, getLabel, getValue, getDisabled, value, onChange, size, layout, columns, disabled, label, required, helperText, error, selectAll, borderColor, bgColor, textColor, readOnly, }: CustomCheckboxGroupProps<T>): react_jsx_runtime.JSX.Element;
declare namespace CheckboxGroup {
    var displayName: string;
}

declare const checkboxBoxVariants: (props?: ({
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
    state?: "disabled" | "checked" | "error" | "unchecked" | "indeterminate" | "disabledChecked" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const checkboxLabelVariants: (props?: ({
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
    state?: "default" | "disabled" | "checked" | "error" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CheckboxBoxVariants = VariantProps<typeof checkboxBoxVariants>;
type CheckboxLabelVariants = VariantProps<typeof checkboxLabelVariants>;

interface DateRange {
    from: Date;
    to: Date;
}
type DatePickerMode = "single" | "range" | "month";
interface DatePickerProps {
    mode?: DatePickerMode;
    value?: Date | DateRange | null;
    onChange?: (value: Date | DateRange | null) => void;
    placeholder?: string;
    /**
     * Controls the trigger height via a preset — 28 / 32 / 40 / 48, matching
     * Input and Select so the three can share a row. The day cell scales with it.
     */
    size?: "xs" | "sm" | "md" | "lg";
    /**
     * Tailwind width class(es) applied to the trigger wrapper. Use any responsive
     * utility (e.g. `"w-full md:w-96 lg:w-[400px]"`). Defaults to `w-full` when
     * omitted. For one-off layout overrides, prefer `className`.
     */
    width?: string;
    /** Forwarded to the trigger wrapper for parent-driven overrides (margins, borders, etc.). */
    className?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    /** Fires once the first time the trigger is blurred after interacting (Angular-style `touched`). */
    onTouch?: () => void;
    /** When true, shows a clear button to reset the selected value. Defaults to false. */
    clearable?: boolean;
    /** Field label rendered above the trigger. */
    label?: React$1.ReactNode;
    /** When true, appends a red asterisk directly after the label text. */
    required?: boolean;
    /** Helper text rendered below the trigger. */
    helperText?: string;
    /** Error message rendered below the trigger; takes priority over helperText. */
    error?: string;
    /** When true, the trigger shows the current value but the calendar cannot be opened. */
    readOnly?: boolean;
    /**
     * Controlled open state. When provided, the popover open/close is driven
     * externally — e.g. triggered by a "Custom date" option in a dashboard dropdown.
     * Pair with `onOpenChange` to sync state back.
     */
    open?: boolean;
    /** Called whenever the popover wants to open or close. Mirror this back into `open` to stay in sync. */
    onOpenChange?: (open: boolean) => void;
    /**
     * When true and `mode` is `"single"`, shows an hour/minute/AM-PM picker
     * alongside the calendar. The selected date and time are committed together
     * via an Apply button (same pattern as range mode). Ignored for other modes.
     */
    showTime?: boolean;
    /**
     * Advisory state on the trigger, following the same model as Input and
     * Select. `error` outranks it. Pair with `statusMessage`.
     */
    status?: "success" | "warning";
    /** Message rendered below the trigger for the current `status`. */
    statusMessage?: string;
    /** Shows a shimmer row and a spinner in the trigger; the panel cannot open. */
    loading?: boolean;
}

declare function DatePicker({ mode, value: controlledValue, onChange, placeholder, size, width, className, disabled, minDate, maxDate, onTouch, clearable, label, required, helperText, error, readOnly, open: controlledOpen, onOpenChange: onOpenChangeProp, showTime, status, statusMessage, loading, }: DatePickerProps): react_jsx_runtime.JSX.Element;
declare namespace DatePicker {
    var displayName: string;
}

/** Returns e.g. "Apr 17, 2026" */
declare function formatDate(date: Date | null | undefined): string | null;
/** Returns e.g. "Apr 1, 2026 – Apr 17, 2026" */
declare function formatRange(from: Date | null | undefined, to: Date | null | undefined): string | null;
/** Returns e.g. "May 2026" */
declare function formatMonthYear(date: Date | null | undefined): string | null;
declare function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean;

type TableSize = "sm" | "md" | "lg";
/** Tri-state sort. `null` means "unsorted". */
type TableSortDirection = "asc" | "desc" | null;
interface TableSortState {
    key: string | null;
    direction: TableSortDirection;
}
/**
 * How many rows a click can pick.
 * - "none"     — (default) no checkbox column, selection is off.
 * - "single"   — one row at a time; picking another releases the previous one.
 * - "multiple" — checkbox column with a tri-state header box.
 */
type TableSelectionMode = "none" | "single" | "multiple";
/**
 * Per-row lifecycle tint. A deleted row greys and strikes for one beat before
 * it leaves — rows never disappear silently.
 */
type TableRowState = "default" | "saving" | "deleted" | "disabled";
/** Chip tones used by status cells. */
type TableStatusTone = "success" | "info" | "warning" | "danger" | "neutral";
interface ColumnDef<T> {
    key: keyof T | string;
    header: ReactNode;
    /**
     * Proportional flex weight used to compute percentage-based column widths.
     * Columns divide the table width in ratio to their flex values.
     * e.g. [1, 2, 1] → 25% / 50% / 25%. Defaults to 1 (equal columns).
     */
    flex?: number;
    /** Explicit CSS width string (e.g. "20%", "160px") — overrides the flex-derived percentage when set. */
    width?: string;
    /** Minimum column width in pixels — prevents the column from shrinking below this on mobile scroll. */
    minWidth?: number;
    align?: "left" | "center" | "right";
    /** Alignment override for mobile card layout only. Falls back to `align` when not set. */
    mobileAlign?: "left" | "center" | "right";
    /** Vertical alignment of cell content. Defaults to "top". Use "middle" to center content vertically within the row. */
    verticalAlign?: "top" | "middle";
    render?: (value: any, row: T, index: number) => ReactNode;
    sortable?: boolean;
    hideOnMobile?: boolean;
    /** Extra Tailwind classes applied to both the <th> and <td> for this column. */
    className?: string;
    /**
     * Render digits on tabular figures so they stack down the column. Defaults to
     * `true` for right-aligned columns — numbers are the reason the rule exists.
     */
    tabular?: boolean;
    /**
     * Mark this column the identifier: semibold, and the one that stays put when
     * `stickyFirstColumn` is set. Inferred for the first column when unset.
     */
    identifier?: boolean;
    /** Custom sort comparator. Falls back to a value comparison when not given. */
    sortFn?: (a: T, b: T) => number;
}
interface TableBulkAction<T> {
    label: ReactNode;
    /** "danger" paints the label red; everything else reads as brand green. */
    tone?: "default" | "danger";
    onClick: (rows: T[], keys: string[]) => void;
    disabled?: boolean;
}
interface TableEmptyConfig {
    icon?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    /** Buttons or links placed under the description. */
    actions?: ReactNode;
}
interface TableErrorConfig {
    title?: ReactNode;
    description?: ReactNode;
    /** Correlation id shown in monospace so it can be read out over a call. */
    requestId?: ReactNode;
    onRetry?: () => void;
    retryLabel?: string;
}
interface TablePaginationConfig {
    /** 1-based current page. */
    page: number;
    /** Total number of pages. Omit for cursor-style paging. */
    pageCount?: number;
    pageSize?: number;
    /** Page-size choices for the segmented control. Pass `[]` to hide it. */
    pageSizes?: number[];
    /** Total row count across all pages — drives the "Showing 1–25 of 1,584" line. */
    total?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    /** Replaces the generated "Showing x–y of n" line. */
    label?: ReactNode;
    /** Noun used in the generated label. Defaults to "rows". */
    itemLabel?: string;
    /**
     * Above this many pages the footer also offers a "Go to" box, because
     * clicking through is unreasonable. Defaults to 20.
     */
    jumpThreshold?: number;
}
interface CustomTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    keyField: keyof T;
    loading?: boolean;
    /** Plain-string empty copy. `empty` takes precedence when both are given. */
    emptyMessage?: string;
    onRowClick?: (row: T) => void;
    rowClassName?: (row: T) => string;
    stickyHeader?: boolean;
    maxHeight?: string;
    bordered?: boolean;
    size?: TableSize;
    className?: string;
    /**
     * How the table renders on small screens (< md / 768px).
     * - "scroll" — (default) horizontal scroll; preserves side-by-side column comparison.
     * - "cards"  — each row becomes a labelled card; 1-col on xs, 2-col grid at sm.
     *              Columns with hideOnMobile are omitted. Recommended for mobile-first UIs.
     */
    mobileLayout?: "scroll" | "cards";
    /**
     * When `true` (default), rows highlight on hover.
     * Set to `false` to disable the hover effect entirely.
     */
    hover?: boolean;
    /** Controlled sort. Leave unset to let the table own its sort state. */
    sort?: TableSortState;
    onSortChange?: (sort: TableSortState) => void;
    /** Initial sort when uncontrolled. */
    defaultSort?: TableSortState;
    /**
     * Set when `data` arrives already sorted by the server — the table then only
     * reports sort changes instead of re-ordering rows itself.
     */
    manualSort?: boolean;
    selectable?: TableSelectionMode;
    /** Controlled selection, as stringified `keyField` values. */
    selectedKeys?: string[];
    defaultSelectedKeys?: string[];
    onSelectionChange?: (keys: string[], rows: T[]) => void;
    /** Rows that cannot be picked (their checkbox renders disabled). */
    isRowSelectable?: (row: T) => boolean;
    /** Actions offered in the bar that slides in above the header on selection. */
    bulkActions?: TableBulkAction<T>[];
    /** Icon buttons pinned to a right-aligned last column, revealed on row hover. */
    rowActions?: (row: T, index: number) => ReactNode;
    /** Keeps the actions column visible instead of fading it in on hover. */
    alwaysShowRowActions?: boolean;
    rowState?: (row: T) => TableRowState;
    /** Rich empty state. Falls back to `emptyMessage` when omitted. */
    empty?: TableEmptyConfig;
    /** When set, replaces the body with the error panel — data is not shown. */
    error?: TableErrorConfig | null;
    /** Pins the identifier column (and the checkbox) while scrolling sideways. */
    stickyFirstColumn?: boolean;
    /** Footer pager rendered inside the table shell. */
    pagination?: TablePaginationConfig;
    /**
     * Arrow-key row focus, Space to select, ⇧-click to range-select, ⌘/Ctrl+A,
     * Enter to open, Esc to clear. On by default whenever rows are selectable
     * or clickable.
     */
    keyboardNavigation?: boolean;
    /** Number of shimmer rows drawn while `loading`. Defaults to 6. */
    loadingRows?: number;
}

declare function Table<T>({ columns, data, keyField, loading, emptyMessage, onRowClick, rowClassName, stickyHeader, maxHeight, bordered, size, mobileLayout, className, hover, sort, onSortChange, defaultSort, manualSort, selectable, selectedKeys, defaultSelectedKeys, onSelectionChange, isRowSelectable, bulkActions, rowActions, alwaysShowRowActions, rowState, empty, error, stickyFirstColumn, pagination, keyboardNavigation, loadingRows, }: CustomTableProps<T>): react_jsx_runtime.JSX.Element;

interface TableCellProps extends ComponentProps<"td"> {
    size?: TableSize;
    align?: "left" | "center" | "right";
    /**
     * Defaults to "middle" — rows have a fixed height, so centred content is what
     * reads as a row. Pass "top" for cells that stack several lines.
     */
    verticalAlign?: "top" | "middle";
    /** Render digits on tabular figures so they stack down the column. */
    tabular?: boolean;
    /** The identifier column: semibold, and never truncated. */
    identifier?: boolean;
    /** Text colour override — row states (saving, deleted) drive this. */
    color?: string;
    /** Strikes the content through, for a row on its way out. */
    strike?: boolean;
    /** Row height in px. Behaves as a minimum on a table cell. */
    height?: number;
    /** Pins the cell while the table scrolls sideways. */
    sticky?: boolean;
    /** Left offset for a pinned cell, px. */
    stickyOffset?: number;
    /** Background painted behind a pinned cell so scrolled content cannot show through. */
    stickyBackground?: string;
    /** Only the outermost pinned cell draws the shadow, so it reads as one edge. */
    stickyShadow?: boolean;
    /** Horizontal padding override, px. Falls back to the size scale. */
    padX?: number;
}
declare function TableCell({ size, align, verticalAlign, tabular, identifier, color, strike, height, sticky, stickyOffset, stickyBackground, stickyShadow, padX, className, children, style, ...props }: TableCellProps): react_jsx_runtime.JSX.Element;

/** Kept as a named export — it predates `TableSortDirection` in the types barrel. */
type SortDirection = TableSortDirection;
interface TableHeaderCellProps extends Omit<ComponentProps<"th">, "onClick"> {
    size?: TableSize;
    align?: "left" | "center" | "right";
    sortable?: boolean;
    sorted?: SortDirection;
    onSort?: () => void;
    /** Draws the pinned-column shadow and takes the cell out of the scroll flow. */
    sticky?: boolean;
    /** Left offset for a pinned cell, px. */
    stickyOffset?: number;
    /** Only the outermost pinned cell draws the shadow, so it reads as one edge. */
    stickyShadow?: boolean;
}
declare function TableHeaderCell({ size, align, sortable, sorted, onSort, sticky, stickyOffset, stickyShadow, className, children, style, ...props }: TableHeaderCellProps): react_jsx_runtime.JSX.Element;

interface TableSkeletonProps {
    rows?: number;
    columns: number;
    size?: TableSize;
    className?: string;
}
/** The sweeping fill shared by every skeleton bar. */
declare const tableShimmerStyle: CSSProperties;
declare function TableSkeleton({ rows, columns, size, className, }: TableSkeletonProps): react_jsx_runtime.JSX.Element;

interface TableCheckboxProps {
    checked: boolean;
    /** Some but not all rows picked — draws a dash instead of a tick. */
    indeterminate?: boolean;
    disabled?: boolean;
    label: string;
    onChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}
/**
 * A 17px box rather than the shared Checkbox component: inside a 36px compact
 * row the standard control eats the whole cell.
 */
declare function TableCheckbox({ checked, indeterminate, disabled, label, onChange, className, }: TableCheckboxProps): react_jsx_runtime.JSX.Element;

interface TableSelectionBarProps<T> {
    count: number;
    rows: T[];
    keys: string[];
    actions?: TableBulkAction<T>[];
    onClear: () => void;
    /** Noun used in "3 orders selected". Defaults to "row" / "rows". */
    itemLabel?: string;
    padX: number;
}
/**
 * Slides in above the header the moment a row is picked, and takes the bulk
 * actions with it — the actions never live in a menu the operator has to hunt for.
 */
declare function TableSelectionBar<T>({ count, rows, keys, actions, onClear, itemLabel, padX, }: TableSelectionBarProps<T>): react_jsx_runtime.JSX.Element | null;

interface TableEmptyStateProps extends TableEmptyConfig {
    /** Fallback copy when no `title` is supplied. */
    message?: string;
}
declare function TableEmptyState({ icon, title, description, actions, message, }: TableEmptyStateProps): react_jsx_runtime.JSX.Element;
type TableErrorStateProps = TableErrorConfig;
/**
 * An error keeps the filters and says so — the operator should never wonder
 * whether retrying will lose their query.
 */
declare function TableErrorState({ title, description, requestId, onRetry, retryLabel, }: TableErrorStateProps): react_jsx_runtime.JSX.Element;

interface TablePaginationBarProps extends TablePaginationConfig {
    padX: number;
}
/**
 * First, last, and a window of three around the current page. Above
 * `jumpThreshold` pages a "Go to" box appears, because clicking through
 * sixty-four pages is not a real interaction.
 */
declare function buildPageWindow(page: number, pageCount: number): Array<number | "ellipsis">;
declare function TablePaginationBar({ page, pageCount, pageSize, pageSizes, total, onPageChange, onPageSizeChange, label, itemLabel, jumpThreshold, padX, }: TablePaginationBarProps): react_jsx_runtime.JSX.Element;

interface TableStatusCellProps {
    children: ReactNode;
    tone?: TableStatusTone;
    /** Drop the leading dot when the label already carries the meaning. */
    showDot?: boolean;
    className?: string;
}
/** A chip with a dot — never bare coloured text. */
declare function TableStatusCell({ children, tone, showDot, className, }: TableStatusCellProps): react_jsx_runtime.JSX.Element;
interface TableIdentityCellProps {
    name: ReactNode;
    /** Secondary line — a phone number, an email. Hidden at size "sm". */
    meta?: ReactNode;
    /** Initials shown in the avatar. Derived from `name` when it is a string. */
    initials?: string;
    /** Replaces the initials avatar entirely — a thumbnail, a channel logo. */
    avatar?: ReactNode;
    size?: TableSize;
    className?: string;
}
/** Avatar plus a name, and at md/lg a muted second line under it. */
declare function TableIdentityCell({ name, meta, initials, avatar, size, className, }: TableIdentityCellProps): react_jsx_runtime.JSX.Element;
interface TableActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    children: ReactNode;
}
/** A 26px icon button for the actions column. */
declare function TableActionButton({ label, children, className, onClick, style, ...props }: TableActionButtonProps): react_jsx_runtime.JSX.Element;
/** An em-dash, muted — never a blank cell or "N/A". */
declare function TableEmptyValue(): react_jsx_runtime.JSX.Element;

/**
 * Row height is the only thing that really changes between sizes. `sm` drops
 * the secondary line under a name; `lg` keeps everything and breathes.
 *
 * These map to the design system's compact / cosy / roomy densities.
 */
interface TableSizeSpec {
    /** Density label used by docs and stories. */
    name: string;
    /** Body row height, px. */
    rowHeight: number;
    /** Header row height, px. */
    headerHeight: number;
    /** Body font size, px. */
    fontSize: number;
    /** Avatar box in an identity cell, px. */
    avatar: number;
    /** Initials inside the avatar, px. */
    avatarFontSize: number;
    /** Compact drops the secondary line under a name. */
    showMeta: boolean;
    /** Horizontal padding inside a cell, px. */
    cellPadX: number;
    /** Padding against the table's left and right edges, px. */
    edgePad: number;
    /** Roughly how many rows land on one screen — docs copy. */
    rowsPerScreen: string;
    use: string;
}
declare const TABLE_SIZES: Record<TableSize, TableSizeSpec>;
/**
 * Only horizontal rules exist — no vertical grid lines, ever — and there is no
 * zebra striping. Rules plus density do that job with less noise.
 */
declare const TABLE_COLORS: {
    readonly surface: "#FFFFFF";
    readonly headerBg: "#F3F5F9";
    readonly headerFg: "#595959";
    readonly headerActiveFg: "#003C1B";
    /** Hairline under the header — one shade darker than the body rules. */
    readonly headerRule: "#E2E2E2";
    /** Hairline between body rows. */
    readonly rowRule: "#F3F5F9";
    /** Full-row wash on hover, 120ms. */
    readonly hoverBg: "#FAFFF7";
    /** Selected rows tint — never an outline. */
    readonly selectedBg: "#DCF3CE";
    readonly selectedRule: "#CDE3C0";
    readonly fg1: "#161616";
    readonly fg2: "#595959";
    readonly fg3: "#9C9C9C";
    readonly fgDisabled: "#C6C6C6";
    readonly border: "#E2E2E2";
    readonly subtle: "#F3F5F9";
    readonly brand: "#003C1B";
    readonly brandSoft: "#1F5E2C";
    readonly brandTint: "#DCF3CE";
    readonly brandFaint: "#F5FFF0";
    readonly brandRule: "#D5E8CA";
    readonly brandGradient: "linear-gradient(180deg,#0A5A2C,#003C1B)";
    readonly danger: "#A8000F";
    readonly dangerDeep: "#7A0009";
    readonly dangerTint: "#FBE9EA";
    readonly dangerRule: "#F2C8CC";
    /** Focus ring shared with the rest of the kit. */
    readonly ring: "0 0 0 3px rgba(140,196,42,.28)";
    /** Soft right shadow on the pinned identifier column. */
    readonly pinShadow: "6px 0 8px -6px rgba(0,0,0,.18)";
    /** Shimmer sweep used by the loading skeleton. */
    readonly shimmer: "linear-gradient(90deg,#F3F5F9 0px,#E9EDF2 130px,#F3F5F9 260px)";
};
interface TableStatusToneSpec {
    bg: string;
    fg: string;
    dot: string;
}
declare const TABLE_STATUS_TONES: Record<TableStatusTone, TableStatusToneSpec>;
interface TableRowStateSpec {
    /** Base row background before hover and selection are applied. */
    bg?: string;
    fg?: string;
    strike: boolean;
    /** Saving and deleted rows stop responding to hover, click and selection. */
    inert: boolean;
    opacity?: number;
}
declare function getTableRowStateSpec(state?: TableRowState): TableRowStateSpec;
/** The em-dash stand-in for an empty cell — never a blank cell or "N/A". */
declare const TABLE_EMPTY_CELL = "\u2014";

declare const tableWrapperVariants: (props?: ({
    bordered?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/** 11px uppercase on a #F3F5F9 fill — the header never competes with the data. */
declare const tableHeaderRowVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const tableBodyRowVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    clickable?: boolean | null | undefined;
    hover?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const statusBadgeVariants: (props?: ({
    variant?: "success" | "warning" | "error" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TableWrapperVariants = VariantProps<typeof tableWrapperVariants>;
type TableHeaderRowVariants = VariantProps<typeof tableHeaderRowVariants>;
type TableBodyRowVariants = VariantProps<typeof tableBodyRowVariants>;
type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>;

interface StatusBadgeProps extends Omit<StatusBadgeVariants, "variant" | "size"> {
    /**
     * The variant/status type of the badge
     * @default "success"
     */
    variant?: "success" | "warning" | "error";
    /**
     * The size of the badge
     * @default "md"
     */
    size?: "xs" | "sm" | "md" | "lg";
    /** The label/text content of the badge */
    label: string;
    /** Optional icon to display before the label */
    icon?: ReactNode;
    /** Controls whether the icon is rendered to the left or right of the label */
    iconPosition?: "left" | "right";
    /** Additional CSS classes to customize the badge (overrides variant colors) */
    className?: string;
    /** Tailwind width classes to make the badge responsive (e.g., "w-full", "w-1/2") */
    width?: string;
}
declare function StatusBadge({ variant, size, label, icon, iconPosition, className, }: StatusBadgeProps): react_jsx_runtime.JSX.Element;

type ToggleVariantSize = "xs" | "sm" | "md" | "lg";
type ToggleVariantType = "default" | "danger";
declare const trackVariants: (props?: ({
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
    type?: "default" | "danger" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const thumbVariants: (props?: ({
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
    type?: "default" | "danger" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TrackVariants = VariantProps<typeof trackVariants>;
type ThumbVariants = VariantProps<typeof thumbVariants>;

interface ToggleProps extends Omit<React$1.ComponentProps<typeof Switch.Root>, "onChange" | "defaultChecked" | "checked" | "type"> {
    /** Size of the toggle */
    size?: ToggleVariantSize;
    /** Color variant of the toggle's off (unchecked) state. Defaults to `"default"` (gray); `"danger"` makes it red. */
    type?: ToggleVariantType;
    /** Field label rendered above the toggle. */
    label?: React$1.ReactNode;
    /** When true, appends a red asterisk to the label. */
    required?: boolean;
    /** Inline text rendered beside the switch. Position is controlled by `titlePosition`. */
    title?: string;
    /** Where the inline title renders relative to the switch. Defaults to `"right"`. */
    titlePosition?: "left" | "right";
    /** Controlled checked state */
    checked?: boolean;
    /** Initial state for uncontrolled mode */
    defaultChecked?: boolean;
    /** Callback when toggle state changes */
    onChange?: (checked: boolean) => void;
    /** Extra className applied to the outermost wrapper */
    wrapperClassName?: string;
    /** When true, the toggle shows its current state but cannot be changed. */
    readOnly?: boolean;
    /**
     * Parks the knob mid-track with a spinner until the server confirms the
     * flip. The toggle cannot be changed while pending.
     */
    pending?: boolean;
    /** When provided together with bgColor, enables pill look. Border color applied when checked. */
    borderColor?: string;
    /** When provided together with borderColor, enables pill look. Background color applied when checked. */
    bgColor?: string;
}
declare const Toggle: React$1.ForwardRefExoticComponent<Omit<ToggleProps, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

type SidebarSide = "left" | "right" | "right-slide" | "top" | "bottom";
type SidebarSize = "sm" | "md" | "lg" | "full";
interface SidebarProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: SidebarSide;
    size?: SidebarSize;
    /** Percentage of the viewport (1–100) the sidebar should occupy.
     *  Overrides `size` when provided. Uses vw for left/right, vh for top/bottom. */
    sizePercent?: number;
    overlay?: boolean;
    closeOnOutsideClick?: boolean;
    persistentOnDesktop?: boolean;
    trigger?: React$1.ReactNode;
    heading?: React$1.ReactNode;
    closeIcon?: boolean;
    divider?: boolean;
    className?: string;
    contentClassName?: string;
    children?: React$1.ReactNode;
}

declare function Sidebar({ open, defaultOpen, onOpenChange, side, size, sizePercent, overlay, closeOnOutsideClick, persistentOnDesktop, trigger, heading, closeIcon, divider, className, contentClassName, children, }: SidebarProps): react_jsx_runtime.JSX.Element | null;

declare const sidebarContentVariants: (props?: ({
    side?: "left" | "right" | "bottom" | "top" | "right-slide" | null | undefined;
    size?: "sm" | "lg" | "md" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const sidebarPersistentVariants: (props?: ({
    side?: "left" | "right" | "bottom" | "top" | "right-slide" | null | undefined;
    size?: "sm" | "lg" | "md" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SidebarContentVariants = VariantProps<typeof sidebarContentVariants>;

declare const iconBadgeVariants: (props?: ({
    variant?: "success" | "warning" | "error" | "info" | "question" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;

/** Badge colour variants exposed to consumers (question is icon-only, not a colour override). */
type AlertDialogVariant = "success" | "error" | "warning" | "info";
type AlertDialogSize = "sm" | "default";
type AlertDialogInput = "text" | "textarea";
/** All icon options: a variant string, "question", or any Lucide icon component. */
type AlertDialogIconProp = AlertDialogVariant | "question" | LucideIcon;
interface AlertDialogOptions<TValue = string> {
    /**
     * The icon shown in the coloured badge at the top.
     * - Pass `"success" | "error" | "warning" | "info"` for a built-in icon that
     *   also sets the badge colour automatically.
     * - Pass `"question"` for a question-mark icon (badge colour defaults to info).
     * - Pass any Lucide icon **component** (e.g. `Rocket`) for a fully custom icon.
     * @example icon="success"   icon="question"   icon={Rocket}
     */
    icon?: AlertDialogIconProp;
    /**
     * Badge ring / icon colour.  Auto-inferred from `icon` when `icon` is a
     * variant string — only set this when you want to override.
     * @example variant="error"
     */
    variant?: AlertDialogVariant;
    /** The dialog title — required. */
    title: React$1.ReactNode;
    /**
     * Body text shown below the title.
     * `text` and `description` are identical aliases; use whichever reads better.
     */
    text?: React$1.ReactNode;
    /** Alias for `text`. */
    description?: React$1.ReactNode;
    /**
     * Controls the max-width of the dialog.
     * - `"default"` → `max-w-md` (~448 px)
     * - `"sm"`      → `max-w-xs` (~320 px)
     * @default "default"
     */
    size?: AlertDialogSize;
    /**
     * Label for the confirm / primary button.
     * @default "OK"
     */
    confirmButtonText?: React$1.ReactNode;
    /**
     * Label for the cancel button (only visible when `showCancelButton` is true).
     * @default "Cancel"
     */
    cancelButtonText?: React$1.ReactNode;
    /**
     * Show a cancel / dismiss button alongside the confirm button.
     * @default false
     */
    showCancelButton?: boolean;
    /**
     * Visual variant of the confirm button (uses the custom Button component).
     * @default "primary"
     */
    confirmButtonVariant?: ButtonProps["variant"];
    /**
     * Visual variant of the cancel button.
     * @default "secondary"
     */
    cancelButtonVariant?: ButtonProps["variant"];
    /**
     * Hide the default confirm / cancel buttons entirely.
     * Useful when you supply a custom `footer`.
     * @default true
     */
    showActions?: boolean;
    /**
     * Render custom content in the footer **instead of** the default buttons.
     * When provided, `confirmButtonText`, `cancelButtonText`, `showCancelButton`,
     * `confirmButtonVariant`, and `cancelButtonVariant` are ignored.
     */
    footer?: React$1.ReactNode;
    /**
     * Close the dialog when the user clicks the semi-transparent backdrop.
     * @default true
     */
    closeOnOverlayClick?: boolean;
    /**
     * Close the dialog when the user presses the Escape key.
     * @default true
     */
    closeOnEsc?: boolean;
    /**
     * Automatically dismiss the dialog after this many milliseconds.
     * The timer pauses while an async `preConfirm` is in progress.
     * @example autoCloseMs={2000}  // closes after 2 seconds
     */
    autoCloseMs?: number;
    /**
     * Render an input field inside the dialog body.
     * - `"text"`     → single-line `<input>`
     * - `"textarea"` → multi-line `<textarea>`
     */
    input?: AlertDialogInput;
    /** Placeholder text for the input field. */
    inputPlaceholder?: string;
    /** Pre-filled value for the input field. */
    defaultValue?: TValue;
    /**
     * Client-side validation run on confirm.
     * Return a non-empty string to show an inline error and block confirm.
     * Return `null` or `undefined` to allow the confirm to proceed.
     * @example inputValidator={(v) => v.trim().length < 3 ? "Too short" : null}
     */
    inputValidator?: (value: TValue) => string | null | undefined;
    /**
     * Async function called after validation passes.
     * The dialog shows a loading spinner while this resolves.
     * Throw an `Error` to keep the dialog open and display the error message.
     * @example preConfirm={async (v) => { await api.save(v); }}
     */
    preConfirm?: (value: TValue) => void | Promise<void>;
}
interface AlertDialogProps<TValue = string> extends AlertDialogOptions<TValue> {
    /**
     * Controlled open state.  When provided, you must also handle `onOpenChange`.
     * Omit both to use uncontrolled mode with `defaultOpen`.
     */
    open?: boolean;
    /**
     * Initial open state for uncontrolled mode.
     * @default false
     */
    defaultOpen?: boolean;
    /** Called whenever the dialog opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /**
     * An element that opens the dialog when clicked.
     * Wrap it in `asChild` automatically — pass the raw element, not a wrapper.
     * @example trigger={<Button>Open</Button>}
     */
    trigger?: React$1.ReactNode;
    /** Extra Tailwind classes merged onto the dialog panel. */
    className?: string;
}
declare function AlertDialog<TValue = string>({ open: openProp, defaultOpen, onOpenChange, trigger, defaultValue, inputValidator, preConfirm, closeOnOverlayClick, closeOnEsc, autoCloseMs, className, ...options }: AlertDialogProps<TValue>): react_jsx_runtime.JSX.Element;
/**
 * The value returned by `fire()`.
 * Check `isConfirmed` to know whether the user clicked the confirm button.
 *
 * @example
 * const result = await fire({ title: "Sure?" });
 * if (result.isConfirmed) { ... }
 */
type SweetAlertResult<TValue = string> = {
    isConfirmed: true;
    isDismissed: false;
    value: TValue;
} | {
    isConfirmed: false;
    isDismissed: true;
    value?: undefined;
};
type SweetAlertContextValue = {
    /**
     * Open an AlertDialog imperatively and await the user's response.
     *
     * @returns A Promise that resolves with `{ isConfirmed, isDismissed, value }`.
     *
     * @example
     * const { fire } = useSweetAlert();
     * const result = await fire({
     *   icon: "warning",
     *   title: "Delete item?",
     *   showCancelButton: true,
     * });
     * if (result.isConfirmed) deleteItem();
     */
    fire: <TValue = string>(options: AlertDialogOptions<TValue>) => Promise<SweetAlertResult<TValue>>;
};
/** Access the imperative `fire()` method anywhere inside `<SweetAlertProvider>`. */
declare function useSweetAlert(): SweetAlertContextValue;
/**
 * Wrap your app (or a subtree) with this provider to enable `useSweetAlert()`.
 *
 * @example
 * <SweetAlertProvider>
 *   <App />
 * </SweetAlertProvider>
 */
declare function SweetAlertProvider({ children }: {
    children: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;

declare function useFuzzySearch<T extends {
    label: string;
}>(items: T[], query: string): T[];

declare const modalSizeVariants: (props?: ({
    size?: "small" | "default" | "md" | "medium" | "large" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ModalProps extends VariantProps<typeof modalSizeVariants> {
    isOpen: boolean;
    onClose: () => void;
    title?: React$1.ReactNode;
    children: React$1.ReactNode;
    showCloseButton?: boolean;
    closeIcon?: React$1.ReactNode;
    headerClassName?: string;
    bodyClassName?: string;
    modalClassName?: string;
}
declare function Modal({ isOpen, onClose, title, children, size, showCloseButton, closeIcon, headerClassName, bodyClassName, modalClassName, }: ModalProps): React$1.ReactPortal | null;

interface CustomPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    showFirstLast?: boolean;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    className?: string;
}

declare function Pagination({ currentPage, totalPages, onPageChange, siblingCount, showFirstLast, size, disabled, className, }: CustomPaginationProps): react_jsx_runtime.JSX.Element;

declare const pageButtonVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "default" | "disabled" | "active" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const chevronButtonVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "default" | "disabled" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type PageButtonVariants = VariantProps<typeof pageButtonVariants>;
type ChevronButtonVariants = VariantProps<typeof chevronButtonVariants>;
declare function usePagination({ currentPage, totalPages, siblingCount, }: {
    currentPage: number;
    totalPages: number;
    siblingCount?: number;
}): (number | "...")[];

interface UengageProviderProps {
    children: React$1.ReactNode;
    className?: string;
}
declare function UengageProvider({ children, className }: UengageProviderProps): react_jsx_runtime.JSX.Element;

interface LoaderProps {
}
declare function Loader(_props: LoaderProps): react_jsx_runtime.JSX.Element | null;
declare namespace Loader {
    var displayName: string;
}

interface AppHeaderProps extends Omit<React$1.HTMLAttributes<HTMLElement>, "children"> {
    /**
     * Brand / logo slot — rendered in a fixed-width zone on the left.
     * On mobile this zone is hidden so the center slot leads.
     */
    logo?: React$1.ReactNode;
    /**
     * Width of the logo zone on desktop.
     * Set this to match your sidebar width so the center slot aligns
     * precisely with the page-content left boundary.
     * @default 252
     */
    logoZoneWidth?: CssSize;
    /**
     * Center-left slot — typically a business-selector dropdown.
     * On mobile (logo zone hidden) this becomes the leading element.
     */
    center?: React$1.ReactNode;
    /** Right-side slot — action icons, wallet balance, user profile, etc. */
    right?: React$1.ReactNode;
    /** Render a bottom border divider. @default true */
    divider?: boolean;
}
declare function AppHeader({ logo, logoZoneWidth, center, right, divider, className, style, ...props }: AppHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace AppHeader {
    var displayName: string;
}

interface AppSidebarProduct {
    id: string | number;
    name: string;
    /** URL or ReactNode icon */
    icon?: React$1.ReactNode;
}
interface AppSidebarModule {
    /** Unique page/slug identifier */
    page: string;
    /** Display name */
    label: string;
}
interface AppSidebarProps extends React$1.HTMLAttributes<HTMLElement> {
    /** List of products shown in the left column */
    products?: AppSidebarProduct[];
    /** List of modules shown in the right column for the active product */
    modules?: AppSidebarModule[];
    /** id of the currently active product */
    activeProductId?: string | number;
    /** page slug of the currently active module */
    activeModulePage?: string;
    /** Called when a product button is clicked */
    onProductSelect?: (product: AppSidebarProduct) => void;
    /** Called when a module button is clicked */
    onModuleClick?: (module: AppSidebarModule) => void;
    /** Collapse/expand the sidebar */
    collapsed?: boolean;
    /**
     * Distance from the top of the viewport (to clear the fixed header).
     * @default 64
     */
    offsetTop?: CssSize;
    /** Optional slot rendered at the bottom of the right column (e.g. version badge) */
    footer?: React$1.ReactNode;
}
declare function AppSidebar({ products, modules, activeProductId, activeModulePage, onProductSelect, onModuleClick, collapsed, offsetTop, footer, className, style, ...props }: AppSidebarProps): react_jsx_runtime.JSX.Element;
declare namespace AppSidebar {
    var displayName: string;
}

/** Per-row state. A row keeps its title in every one of them. */
type AccordionItemState = "default" | "loading" | "error" | "dirty";
type AccordionSummaryTone = "brand" | "success" | "neutral" | "warning" | "danger";
interface AccordionItem {
    value: string;
    /** 600 weight, one line, truncates before the summary. */
    title: React$1.ReactNode;
    content: React$1.ReactNode;
    disabled?: boolean;
    /** Rendered inside the optional mint icon tile. */
    icon?: React$1.ReactNode;
    /**
     * Extra header content. Rendered outside the toggle's hit area so clicking it
     * never expands the row.
     */
    action?: React$1.ReactNode;
    /** Optional second line. Stays visible when collapsed; dropped at `sm`. */
    subtitle?: React$1.ReactNode;
    /** The collapsed answer — a right-aligned chip. Never truncates. */
    summary?: React$1.ReactNode;
    /** Palette for the summary chip. @default "neutral" */
    summaryTone?: AccordionSummaryTone;
    /** Tints the row and swaps the chevron for a spinner when `loading`. */
    state?: AccordionItemState;
    /** Why a disabled row is disabled — surfaced as a tooltip. */
    disabledReason?: string;
    /** Same as `action`; both render outside the toggle, separated by a hairline. */
    headerActions?: React$1.ReactNode;
    /** Mount the panel on first open rather than up front. @default false */
    lazy?: boolean;
    /** Keep the panel mounted once opened, so form state survives a collapse. */
    keepMounted?: boolean;
}
/**
 * `bordered` is the design default — one shell with hairline dividers.
 * `separated` gives each row its own box, `flush` drops the outer border, and
 * `card` is separated plus elevation.
 *
 * `default` and `ghost` are the pre-design-system names, kept so existing call
 * sites keep working: `default` renders as `flush`, `ghost` as a flush stack
 * with no dividers. The old `bordered` look — boxes with elevation — is `card`.
 */
type AccordionVariant = "bordered" | "separated" | "flush" | "card" | "default" | "ghost";
type AccordionSize = "sm" | "md" | "lg";
type AccordionAppearance = "light" | "dark";
/** The chevron leads by default — never a right-side chevron, per the design. */
type AccordionChevronPosition = "start" | "end";
interface AccordionBaseProps {
    items: AccordionItem[];
    /** @default "default" */
    variant?: AccordionVariant;
    /** @default "md" */
    size?: AccordionSize;
    className?: string;
    /** Light surface, or the dark mix where the open row fills #1B3423. */
    appearance?: AccordionAppearance;
    /** @default "start" */
    chevronPosition?: AccordionChevronPosition;
    /** Hide the chevron entirely. @default true */
    showChevron?: boolean;
    /** Force the icon tile on or off. Defaults to the size scale. */
    showIconTile?: boolean;
    /** Renders the Expand all / Collapse all control above the stack. */
    expandAll?: boolean;
    /** Labels for that control. */
    expandAllLabels?: {
        expand: React$1.ReactNode;
        collapse: React$1.ReactNode;
    };
    /**
     * Indents the stack and drops its shell, for one level of nesting. Two levels
     * is the hard cap — three means the page needs tabs.
     */
    nested?: boolean;
    /**
     * Gate a row opening or closing — return `false` to keep it as it is.
     * Receives the value that changed and whether it was opening.
     */
    onBeforeToggle?: (value: string, opening: boolean) => boolean;
    /** Extra className for each row. */
    itemClassName?: string;
}
interface AccordionSingleProps extends AccordionBaseProps {
    type?: "single";
    collapsible?: boolean;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
}
interface AccordionMultipleProps extends AccordionBaseProps {
    type: "multiple";
    collapsible?: never;
    defaultValue?: string[];
    value?: string[];
    onChange?: (value: string[]) => void;
}
type CustomAccordionProps = AccordionSingleProps | AccordionMultipleProps;

declare function Accordion(props: CustomAccordionProps): react_jsx_runtime.JSX.Element;
declare namespace Accordion {
    var displayName: string;
}

interface AccordionSizeSpec {
    /** Label used by the docs table. */
    name: string;
    /** Header padding. */
    pad: string;
    /** Gap between chevron, tile, title and summary. */
    gap: number;
    /** Panel padding. */
    bodyPad: number;
    /** Chevron box, px. */
    chev: number;
    /** Icon tile box, px. */
    tile: number;
    /** Icon inside the tile, px. */
    tileIcon: number;
    /** Title font size, px. */
    fs: number;
    /** Compact drops the icon tile. */
    showTile: boolean;
    /** Compact drops the subtitle — a title and a summary, nothing else. */
    showSubtitle: boolean;
    spec: string;
    use: string;
}
declare const ACCORDION_SIZES: Record<AccordionSize, AccordionSizeSpec>;
interface AccordionPalette {
    /** Wash behind an open header, so the open row is obvious at a glance. */
    openBg: string;
    hoverBg: string;
    /** Hairline between a header and its panel. */
    divider: string;
    chevronOpen: string;
    chevronClosed: string;
    titleOpen: string;
    titleClosed: string;
    subtitle: string;
    tileOpenBg: string;
    tileOpenFg: string;
    tileClosedBg: string;
    tileClosedFg: string;
    panelFg: string;
    /** Focus ring, drawn inset so it never clips against the shell. */
    ring: string;
    /** Amber dot marking unsaved work. */
    dirtyDot: string;
    spinnerTrack: string;
    spinnerHead: string;
}
declare function getAccordionPalette(appearance?: AccordionAppearance): AccordionPalette;
interface AccordionChipTone {
    bg: string;
    fg: string;
}
declare function getAccordionChip(tone?: AccordionSummaryTone, appearance?: AccordionAppearance): AccordionChipTone;

declare const accordionRootVariants: (props?: ({
    variant?: "default" | "ghost" | "bordered" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const accordionItemVariants: (props?: ({
    variant?: "default" | "ghost" | "bordered" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const accordionTriggerVariants: (props?: ({
    variant?: "default" | "ghost" | "bordered" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "closed" | "open" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const accordionContentVariants: (props?: ({
    variant?: "default" | "ghost" | "bordered" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AccordionRootVariants = VariantProps<typeof accordionRootVariants>;
type AccordionItemVariants = VariantProps<typeof accordionItemVariants>;
type AccordionTriggerVariants = VariantProps<typeof accordionTriggerVariants>;
type AccordionContentVariants = VariantProps<typeof accordionContentVariants>;

interface FilterGroupProps {
    /**
     * Your filter components — <Select />, <SearchBar />, <Input />, <DatePicker />, etc.
     * Each direct child maps 1-to-1 with an entry in `labels`.
     */
    children: React$1.ReactNode;
    /**
     * Category labels shown in the mobile drawer's left panel, in the same order as children.
     * e.g. ["Outlet", "State", "City", "Date"]
     */
    labels: string[];
    /** Called when the user presses Apply in the mobile drawer. */
    onApply?: () => void;
    /** Called when the user presses Reset in the mobile drawer. */
    onReset?: () => void;
    /** Called when the drawer is dismissed via the X button or overlay click. */
    onClose?: () => void;
    /** Drawer title and mobile trigger label. Defaults to "Filters". */
    drawerTitle?: string;
    /** Active-filter count badge on the mobile trigger (hidden when 0 or undefined). */
    activeCount?: number;
    /** Extra classes on the desktop filter row. */
    className?: string;
    /** Extra classes on the mobile drawer panel. */
    drawerClassName?: string;
    /** Always render in drawer mode regardless of screen size — useful for demos/testing. */
    forceDrawer?: boolean;
}

declare function FilterGroup({ children, labels, onApply, onReset, onClose, drawerTitle, activeCount, className, drawerClassName, forceDrawer, }: FilterGroupProps): react_jsx_runtime.JSX.Element;
declare namespace FilterGroup {
    var displayName: string;
}

/**
 * Set to `true` when a component is rendered inside the FilterGroup mobile drawer.
 * Components like Select read this to switch to a flat tap-list instead of a popover.
 */
declare const FilterGroupMobileContext: React$1.Context<boolean>;

/**
 * Visual style of the banner.
 *
 * `info` | `success` | `error` | `warning` are the original four; `danger` and
 * `neutral` were added with the design-system refresh. `error` stays as an
 * alias of `danger`.
 */
type BannerVariant = BannerTone;
/** Layout arrangement of the same tokens. The tone never changes with the layout. */
type BannerLayout = "default" | "callout";
/** How an action renders: an outline button, or a bare text link. */
type BannerActionVariant = "button" | "link";
interface BannerAction {
    label: React$1.ReactNode;
    onClick?: (event: React$1.MouseEvent<HTMLButtonElement>) => void;
    /** Outline button (default) or a bare text link. */
    variant?: BannerActionVariant;
    disabled?: boolean;
    /** Rendered as an `<a>` instead of a `<button>` when set. */
    href?: string;
    target?: string;
    rel?: string;
    "aria-label"?: string;
}
interface BannerProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "title" | "content"> {
    /**
     * Visual style of the banner.
     * @default "info"
     */
    variant?: BannerVariant;
    /** Alias of `variant`, matching the design-system prop name. Wins when both are set. */
    tone?: BannerTone;
    /**
     * Size scale. `sm` drops the description line entirely — one sentence, one
     * action — and suits cards, table toolbars and drawers.
     * @default "md" (or `sm` when `placement="inline"`)
     */
    size?: BannerSize;
    /**
     * Where the banner sits. `global` renders the pinned full-bleed ink bar;
     * `page`, `section` and `inline` all render the tinted surface.
     * @default "section"
     */
    placement?: BannerPlacement;
    /**
     * `callout` renders the feature-callout arrangement — icon tile, display
     * title, and a gradient primary action. One per screen, maximum.
     * @default "default"
     */
    layout?: BannerLayout;
    /** Light tinted surface, or the dark mix of the same hue for dark surfaces. */
    appearance?: BannerAppearance;
    /** The fact. 600 weight, full ink, one line, no full stop. */
    title?: React$1.ReactNode;
    /** The consequence. 400 weight, the same ink at 82%. */
    description?: React$1.ReactNode;
    /** Text content. Rendered as the title when no `title` is given. */
    message?: React$1.ReactNode;
    /** Same as `message`. Takes precedence over it. */
    children?: React$1.ReactNode;
    /** A short list of causes, capped by `maxItems`. A banner is not an error log. */
    items?: React$1.ReactNode[];
    /**
     * How many `items` render before the overflow line appears.
     * @default 3
     */
    maxItems?: number;
    /** Rendered in place of the hidden items. Receives how many were dropped. */
    renderMoreItems?: (hiddenCount: number) => React$1.ReactNode;
    /** Primary action. Vertically centred beside the copy. */
    action?: BannerAction;
    /** Secondary action, rendered after the primary one. */
    secondaryAction?: BannerAction;
    /**
     * `below` drops the actions under the copy instead of squeezing it — use it
     * under ~320px.
     * @default "inline"
     */
    actionPlacement?: "inline" | "below";
    /** Override the default variant icon. Pass `null` to hide without `showIcon={false}`. */
    icon?: React$1.ReactNode;
    /**
     * Whether to render the leading icon.
     * @default true
     */
    showIcon?: boolean;
    /** Adds the ✕. Only announcements are dismissible — an error the operator must fix has none. */
    dismissible?: boolean;
    /** Remembers the dismissal in `localStorage` so it does not return on every page load. */
    dismissId?: string;
    /** Fired after the banner is dismissed, by the ✕ or by `autoDismiss`. */
    onDismiss?: () => void;
    /** Controlled visibility. When set, the banner never hides itself. */
    open?: boolean;
    /** Fired whenever the banner wants to change its own visibility. */
    onOpenChange?: (open: boolean) => void;
    /**
     * Milliseconds before the banner fades itself out, with a bottom progress
     * rule counting down. Success announcements only — warnings and errors never
     * expire.
     */
    autoDismiss?: number;
    /**
     * 0–100. Swaps the icon for a spinner and renders a progress bar — a
     * long-running job. Pass `true` for an indeterminate spinner with no bar.
     */
    progress?: number | true;
    /** Caption under the progress bar, e.g. `264 of 412 · about 40 seconds left`. */
    progressLabel?: React$1.ReactNode;
    /** Bottom rule shown as a percentage, independent of `autoDismiss`. */
    expiryProgress?: number;
    /** Overrides the tone-derived `role` (`alert` for danger/error, `status` otherwise). */
    role?: React$1.AriaRole;
    /** Custom background color (CSS value). Overrides the variant palette. */
    backgroundColor?: string;
    /** Custom border color (CSS value). Overrides the variant palette. */
    borderColor?: string;
    /** Custom icon color (CSS value). Overrides the variant palette. */
    iconColor?: string;
    /** Custom text color (CSS value). Overrides the variant palette. */
    textColor?: string;
    /** Extra className for the copy column. */
    contentClassName?: string;
}
interface BannerStackItem extends BannerProps {
    /** Stable key. Also used as the `dismissId` when none is given. */
    id: string;
}
interface BannerStackProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, "children"> {
    banners: BannerStackItem[];
    /**
     * How many banners render in full. The rest collapse behind a counter.
     * @default 1
     */
    max?: number;
    /**
     * Collapse the overflow behind a counter with their tone dots. When false the
     * overflow is dropped instead.
     * @default true
     */
    collapseRest?: boolean;
    /** Sort by severity (danger → neutral) before applying `max`. @default true */
    sortBySeverity?: boolean;
    /** Size applied to every banner that does not set its own. */
    size?: BannerSize;
    appearance?: BannerAppearance;
    /** Gap between stacked banners, in px. @default 8 */
    gap?: number;
    /** Label for the collapsed counter. Receives the hidden count. */
    moreLabel?: (hiddenCount: number) => React$1.ReactNode;
}

/** Clears a remembered dismissal so the banner can come back. */
declare function resetBannerDismissal(dismissId: string): void;
declare const Banner: React$1.ForwardRefExoticComponent<BannerProps & React$1.RefAttributes<HTMLDivElement>>;

/**
 * Several notices at once — show the most severe in full, and collapse the rest
 * behind a counter carrying their tone dots.
 */
declare const BannerStack: React$1.ForwardRefExoticComponent<BannerStackProps & React$1.RefAttributes<HTMLDivElement>>;

interface SectionHeaderProps extends React$1.ComponentProps<"div"> {
    /** Icon element shown to the left of the title. */
    icon?: React$1.ReactNode;
    /** Main heading text. */
    title: string;
    /** Optional subtitle/description rendered below the title. */
    description?: React$1.ReactNode;
    /** Slot for action buttons, rendered at the trailing end of the header. */
    action?: React$1.ReactNode;
}
declare function SectionHeader({ icon, title, description, action, className, ...props }: SectionHeaderProps): react_jsx_runtime.JSX.Element;
interface SectionDividerProps extends Omit<React$1.ComponentProps<"div">, "children"> {
    /** Label shown inline with a horizontal divider. Ignored when orientation="vertical". */
    label?: string;
    /**
     * "horizontal" (default) — a dashed full-width rule, optionally with an inline label.
     * "vertical" — a thin column separator for use inside flex/grid rows.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Height of a vertical divider. Defaults to "100%" so it fills its grid cell.
     * Accepts any valid CSS length (e.g. "24px", "2rem").
     */
    height?: string;
}
declare function SectionDivider({ label, orientation, height, className, ...props }: SectionDividerProps): react_jsx_runtime.JSX.Element;
interface SectionContentProps extends React$1.ComponentProps<"div"> {
}
declare function SectionContent({ className, children, ...props }: SectionContentProps): react_jsx_runtime.JSX.Element;
interface SectionSubsectionProps extends React$1.ComponentProps<"div"> {
    /** Title shown above this subsection. */
    title?: string;
    /**ClassName applied to the title element for full style customisation. */
    titleClassName?: string;
    /** Optional description under the subsection title. */
    description?: string;
    /** Show a separator line above this subsection (default: true). */
    separator?: boolean;
    /** Label to display on the separator line when separator=true. */
    separatorLabel?: string;
}
declare function SectionSubsection({ title, titleClassName, description, separator, separatorLabel, className, children, ...props }: SectionSubsectionProps): react_jsx_runtime.JSX.Element;
interface SectionRowProps extends React$1.ComponentProps<"div"> {
    /**
     * Number of equal columns. Defaults to 3.
     * Accepts 1–4 or a raw CSS grid-template-columns string.
     */
    columns?: 1 | 2 | 3 | 4 | string;
    /**
     * When true, injects a vertical `SectionDivider` between every direct child.
     * Switches the row to a flex layout so the separators size naturally.
     * Each child gets `flex: 1` and `min-w-0` automatically.
     */
    dividers?: boolean;
}
declare function SectionRow({ columns, dividers, className, style, children, ...props }: SectionRowProps): react_jsx_runtime.JSX.Element;
interface SectionFieldProps extends React$1.ComponentProps<"div"> {
    /** Column span inside a SectionRow grid (1–4). */
    span?: 1 | 2 | 3 | 4;
}
declare function SectionField({ span, className, ...props }: SectionFieldProps): react_jsx_runtime.JSX.Element;
interface SectionTableContentProps extends React$1.ComponentProps<"div"> {
    /**
     * Show a thin separator line between the section header and the table.
     * Defaults to true.
     */
    divider?: boolean;
}
declare function SectionTableContent({ divider, className, children, ...props }: SectionTableContentProps): react_jsx_runtime.JSX.Element;
interface SectionGroupProps extends React$1.ComponentProps<"div"> {
    /**
     * Index of the section that is initially open.
     * Pass `null` to start with all sections closed.
     * Defaults to `0` (first section open).
     */
    defaultOpen?: number | null;
}
declare function SectionGroup({ defaultOpen, className, children, ...props }: SectionGroupProps): react_jsx_runtime.JSX.Element;
declare namespace SectionGroup {
    var displayName: string;
}
interface SectionProps extends React$1.ComponentProps<"div"> {
    /** When true, removes the card border/background and renders a bare container. */
    bare?: boolean;
    /** Enables the collapse/expand toggle. A chevron button appears in the header. */
    collapsible?: boolean;
    /**
     * When true, shows a light divider line below the header.
     * Works regardless of whether `collapsible` is set.
     * When collapsible, the divider only appears while the section is open.
     */
    divider?: boolean;
    /**
     * Border style of the header divider. Defaults to "solid".
     * Only used when `divider` is true.
     */
    dividerStyle?: "solid" | "dashed" | "dotted";
    /**
     * Initial open state when uncontrolled (default: true).
     * Only used when `collapsible` is true and `open` is not provided.
     */
    defaultOpen?: boolean;
    /**
     * Controlled open state. When provided, you must also pass `onOpenChange`.
     * Only used when `collapsible` is true.
     */
    open?: boolean;
    /**
     * Called when the open state changes.
     * Only used when `collapsible` is true.
     */
    onOpenChange?: (open: boolean) => void;
}
declare function Section({ bare, collapsible, divider, dividerStyle, defaultOpen, open: openProp, onOpenChange, className, children, ...props }: SectionProps): react_jsx_runtime.JSX.Element;
declare namespace Section {
    var displayName: string;
}

/** Resolved lifecycle state of a single file row. */
type FileUploadStatus = 
/** Picked, nothing has happened to it yet. */
"idle"
/** Accepted but waiting behind other files. */
 | "queued"
/** Bytes are moving — pairs with `progress`. */
 | "uploading"
/** Bytes have landed, the server is still validating. */
 | "processing"
/** Finished successfully. */
 | "done"
/** The transfer broke mid-flight — retryable. */
 | "failed"
/** Refused before the transfer started (too large, wrong type) — not retryable. */
 | "rejected"
/** Landed, but only some of it was usable. */
 | "partial"
/** Connection dropped; the transfer resumes from where it stopped. */
 | "paused"
/** The same file already exists — the operator picks skip or replace. */
 | "duplicate"
/** An image whose pixel dimensions do not match the requirement — offer a crop. */
 | "dimension";
type FileUploadSizeKey = "sm" | "md" | "lg";
type FileUploadTone = "light" | "dark";
/** @deprecated Structural classes only — colours and metrics ride on inline styles. */
declare const dropzoneVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "disabled" | "error" | "dragover" | "idle" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/** @deprecated Structural classes only — metrics ride on inline styles. */
declare const iconWrapperVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/** @deprecated Structural classes only — metrics ride on inline styles. */
declare const avatarContainerVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "disabled" | "filled" | "empty" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;

type FileUploadVariant = "image" | "file" | "avatar" | "video"
/** Single-document row for long forms — a dropzone would dominate the page. */
 | "compact"
/** Reorderable image grid whose first tile is always the cover. */
 | "gallery";
type FileUploadSize = FileUploadSizeKey;

/** Internal representation of a locally-selected file with a preview URL. */
interface FileUploadLocalFile {
    file: File;
    /** Object URL for image preview — created via URL.createObjectURL(). */
    previewUrl: string;
    /** Stable random ID for React key. */
    id: string;
}
/**
 * A file row driven entirely by the caller. Pass these through `items` when the
 * upload lifecycle lives in your own store — the component then renders the
 * design's nine states rather than deriving `idle` / `done` from `value`.
 */
interface FileUploadItem {
    /** Stable key. Falls back to the name when omitted. */
    id?: string;
    name: string;
    /** Bytes, or a pre-formatted string such as `"1.2 MB"`. */
    size?: number | string;
    /** Tile label. Derived from the extension in `name` when omitted. */
    ext?: string;
    /** Lifecycle state. Defaults to `"idle"`. */
    status?: FileUploadStatus;
    /** 0–100. Drives the bar and the `{pct}` badge on in-flight rows. */
    progress?: number;
    /** Overrides the status's default note — name the rule that was broken. */
    note?: string;
    /** Preview URL, used by the image / gallery / video shapes. */
    url?: string;
}
interface FileUploadProps {
    /** Controls layout and default accept type. Defaults to "file". */
    variant?: FileUploadVariant;
    /** Controls spacing and icon sizes. Defaults to "md". */
    size?: FileUploadSize;
    /** Surface the control sits on. `"dark"` restyles the dropzone. Defaults to "light". */
    tone?: FileUploadTone;
    /** Forwarded to the hidden <input type="file" accept="...">. Overrides variant default. */
    accept?: string;
    /** Allow selecting multiple files at once. */
    multiple?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    /** Native input name — useful in form submissions. */
    name?: string;
    /** Explicit id for the hidden input (also used for label htmlFor). */
    id?: string;
    /** Per-file size limit in bytes. Files exceeding this are rejected. */
    maxSize?: number;
    /** Maximum number of files allowed (only meaningful when multiple=true). */
    maxFiles?: number;
    /**
     * Allowed file extensions. Files with any other extension are rejected with
     * an error message. Accepts with or without a leading dot — e.g. `['jpg', '.png', 'pdf']`.
     * Also sets the native `accept` attribute on the hidden input (overridden by `accept` prop).
     */
    allowedFiles?: string[];
    /**
     * Constraint chips shown inside the dropzone, before anything is picked.
     * Auto-derived from `allowedFiles` and `maxSize` when omitted; pass `[]` to hide.
     */
    formats?: string[];
    /**
     * Controlled URL(s) for showing already-uploaded content.
     * - image / avatar / gallery: renders as <img> preview
     * - file / compact: renders as a file row
     * Pass a string for single, string[] for multiple.
     */
    value?: string | string[];
    /**
     * Fully-controlled file rows with their own lifecycle state. When provided,
     * the row list is rendered from these instead of being derived from `value`
     * and the local selection.
     */
    items?: FileUploadItem[];
    /** Fired whenever the user selects valid files. Receives the raw File list. */
    onChange?: (files: File[]) => void;
    /**
     * Fired with the internal FileUploadLocalFile list on every change.
     * Useful when you need the auto-generated preview URLs.
     */
    onFilesChange?: (files: FileUploadLocalFile[]) => void;
    /** Fired when the remove button is clicked on a single-value field. */
    onRemove?: () => void;
    /** Fired when a specific item is removed from a multi-value field (index into the combined display list). */
    onRemoveFile?: (index: number) => void;
    /** Fired when any files are rejected due to size/count validation. */
    onValidationError?: (errors: string[]) => void;
    /** Retry a single failed row — one failure never restarts the batch. */
    onRetry?: (item: FileUploadItem, index: number) => void;
    /** Retry every failed row from the batch summary bar. */
    onRetryAll?: () => void;
    /** Keep the existing copy of a duplicate. */
    onSkip?: (item: FileUploadItem, index: number) => void;
    /** Overwrite the existing copy of a duplicate. */
    onReplace?: (item: FileUploadItem, index: number) => void;
    /** Open the crop tool for an image whose dimensions do not match. */
    onCrop?: (item: FileUploadItem, index: number) => void;
    label?: React$1.ReactNode;
    required?: boolean;
    /** Shown below the field in red. Also shown for internal validation errors. */
    error?: string;
    helperText?: string;
    /** Main line in the empty-state dropzone. Falls back to variant default. */
    placeholder?: string;
    /** Sub-line in the empty-state dropzone (e.g. "PNG, JPG up to 5 MB"). */
    description?: string;
    /** Sub-line under the dropzone title. Defaults to "or click to browse". */
    browseHint?: string;
    /** Enable drag-and-drop. Defaults to true. */
    dragAndDrop?: boolean;
    /**
     * Auto-generate local object-URL previews from selected File objects
     * (shown immediately before upload completes). Defaults to true.
     * Previews are revoked automatically on unmount or when `value` prop changes.
     */
    showLocalPreview?: boolean;
    /** Show the × clear button. Defaults to true. */
    clearable?: boolean;
    /**
     * Show the "Change" button in the image hover overlay. Defaults to true.
     * Set to false to make the preview display-only while still allowing removal via clearable.
     * When both changeable and clearable are false the overlay is hidden entirely.
     */
    changeable?: boolean;
    /**
     * Render the right-hand status pill on each row. Defaults to true. With it
     * off, done rows fall back to the check disc and in-flight rows to a bare
     * percentage, as in the design's live-upload list.
     */
    showStatusBadge?: boolean;
    /** Render the "Nothing uploaded yet" placeholder when the row list is empty. */
    showEmptyListHint?: boolean;
    /**
     * Render the dropzone above the row list. Defaults to true. Turn it off to
     * show the rows on their own — e.g. when the picker lives elsewhere on the page.
     */
    showDropzone?: boolean;
    /**
     * Render the batch summary bar above the rows. It never blocks the page —
     * uploading continues while the operator works.
     */
    batchSummary?: boolean;
    /** Caption under the batch bar, e.g. "14.2 MB of 19.0 MB · about 40 seconds left". */
    batchCaption?: string;
    /** Initials fallback for the avatar — never a grey silhouette icon. */
    initials?: string;
    /** Tiles per row in the gallery shape. Defaults to 4. */
    galleryColumns?: number;
    /** Mark the first tile as the cover. Defaults to true. */
    coverBadge?: boolean;
    /**
     * Icon element rendered as a small badge in the bottom-right corner of the
     * image or avatar preview. Useful for camera, edit, or brand indicators.
     * Not rendered in the file variant or on empty-state dropzones.
     */
    icon?: React$1.ReactNode;
    /** Applied to the outermost wrapper div. */
    className?: string;
    /** Applied to the dropzone area (not used in avatar variant). */
    dropzoneClassName?: string;
    /** Ref forwarded to the hidden <input type="file"> element. */
    inputRef?: React$1.Ref<HTMLInputElement>;
}
declare function FileUpload({ variant, size, tone, accept, multiple, disabled, readOnly, name, id, maxSize, maxFiles, allowedFiles, formats, value, items, onChange, onFilesChange, onRemove, onRemoveFile, onValidationError, onRetry, onRetryAll, onSkip, onReplace, onCrop, label, required, error, helperText, placeholder, description, browseHint, dragAndDrop, showLocalPreview, clearable, changeable, showStatusBadge, showEmptyListHint, showDropzone, batchSummary, batchCaption, initials, galleryColumns, coverBadge, icon, className, dropzoneClassName, inputRef: externalInputRef, }: FileUploadProps): react_jsx_runtime.JSX.Element;
declare namespace FileUpload {
    var displayName: string;
}

declare const chipVariants: (props?: ({
    variant?: "success" | "warning" | "error" | "info" | "common" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ChipVariants = VariantProps<typeof chipVariants>;
interface ChipProps extends ChipVariants {
    /** Text label displayed inside the chip. */
    label: string;
    /** Icon element rendered alongside the label. */
    icon?: ReactNode;
    /** Which side the icon appears on. Defaults to "left". */
    iconPosition?: "left" | "right";
    /** Custom background color — accepts any valid CSS color value (hex, rgb, hsl, etc.). Overrides the variant background. */
    bgColor?: string;
    /** Custom text color — accepts any valid CSS color value. Overrides the variant text color. */
    textColor?: string;
    /** Extra Tailwind classes. */
    className?: string;
}
declare function Chip({ label, variant, size, icon, iconPosition, bgColor, textColor, className, }: ChipProps): react_jsx_runtime.JSX.Element;

export { ACCORDION_SIZES, Accordion, type AccordionAppearance, type AccordionChevronPosition, type AccordionChipTone, type AccordionContentVariants, type AccordionItem, type AccordionItemState, type AccordionItemVariants, type AccordionPalette, type AccordionRootVariants, type AccordionSize, type AccordionSizeSpec, type AccordionSummaryTone, type AccordionTriggerVariants, type AccordionVariant, AlertDialog, type AlertDialogIconProp, type AlertDialogInput, type AlertDialogOptions, type AlertDialogProps, type AlertDialogSize, type AlertDialogVariant, type AllowPattern, AppHeader, type AppHeaderProps, AppSidebar, type AppSidebarModule, type AppSidebarProduct, type AppSidebarProps, Banner, type BannerAction, type BannerActionVariant, BannerAppearance, type BannerLayout, BannerPlacement, type BannerProps, BannerSize, BannerStack, type BannerStackItem, type BannerStackProps, BannerTone, type BannerVariant, Button, type ButtonState, Card, CardContent, CardFooter, CardHeader, type CardProps, CardTitle, Checkbox, type CheckboxBoxVariants, CheckboxGroup, type CheckboxLabelVariants, type CheckboxOption, type ChevronButtonVariants, Chip, type ChipProps, type ChipVariants, type ColorVariant, type ColumnDef, CssSize, type CustomAccordionProps, type ButtonProps as CustomButtonProps, type CustomCheckboxGroupProps, type CustomCheckboxProps, type CustomInputProps, type CustomPaginationProps, type CustomRadioGroupProps, type CustomRadioItemProps, TableCell as CustomTableCell, TableHeaderCell as CustomTableHeaderCell, type CustomTableProps, TableSkeleton as CustomTableSkeleton, type CustomTabsProps, CustomTabsTrigger, type CustomTabsTriggerProps, DatePicker, type DatePickerMode, type DatePickerProps, type DateRange, DesignTabs, FileUpload, type FileUploadLocalFile, type FileUploadProps, type FileUploadSize, type FileUploadVariant, FilterGroup, FilterGroupMobileContext, type FilterGroupProps, Grid, type GridColumns, type GridLimit, type GridProps, Input, type InputFieldVariants, InputHelper, type InputHelperProps, type InputHelperSize, type InputIconSlotVariants, InputLabel, type InputLabelProps, type InputLabelSize, type InputType, type InputWrapperVariants, Label, Loader, Modal, type ModalProps, ModalZIndexProvider, PATTERN_REGEX, type PageButtonVariants, PageContainer, type PageContainerProps, Pagination, Radio, type RadioCircleVariants, type RadioDotVariants, RadioGroup, type RadioLabelVariants, type RadioOption, SearchBar, type SearchBarProps, type SearchBarSize, type SearchValueType, Section, SectionContent, type SectionContentProps, SectionDivider, type SectionDividerProps, SectionField, type SectionFieldProps, SectionGroup, type SectionGroupProps, SectionHeader, type SectionHeaderProps, type SectionProps, SectionRow, type SectionRowProps, SectionSubsection, type SectionSubsectionProps, SectionTableContent, type SectionTableContentProps, Select, type SelectMode, type SelectOption, type SelectProps, type SelectStatus, Sidebar, type SidebarContentVariants, type SidebarProps, type SidebarSide, type SidebarSize, SidebarZIndexProvider, type SortDirection, StatusBadge, type StatusBadgeProps, type StatusBadgeVariants, SubHeader, type SubHeaderAlign, type SubHeaderProps, SweetAlertProvider, type SweetAlertResult, TABLE_COLORS, TABLE_EMPTY_CELL, TABLE_SIZES, TABLE_STATUS_TONES, TABS_SIZES, type TabItem, TabPanel, type TabPanelProps, type TabTriggerVariants, Table, TableActionButton, type TableActionButtonProps, type TableBodyRowVariants, type TableBulkAction, type TableCellProps, TableCheckbox, type TableCheckboxProps, type TableEmptyConfig, TableEmptyState, type TableEmptyStateProps, TableEmptyValue, type TableErrorConfig, TableErrorState, type TableErrorStateProps, type TableHeaderCellProps, type TableHeaderRowVariants, TableIdentityCell, type TableIdentityCellProps, TablePaginationBar, type TablePaginationBarProps, type TablePaginationConfig, type TableRowState, type TableRowStateSpec, TableSelectionBar, type TableSelectionBarProps, type TableSelectionMode, type TableSize, type TableSizeSpec, type TableSkeletonProps, type TableSortDirection, type TableSortState, TableStatusCell, type TableStatusCellProps, type TableStatusTone, type TableStatusToneSpec, type TableWrapperVariants, Tabs, type TabsActivation, TabsActiveValueContext, type TabsAppearance, type TabsDesignVariant, type TabsOverflowMode, type TabsPalette, type TabsSize, type TabsSizeSpec, type TabsVariant, type ThumbVariants, Toggle, type ToggleProps, type ToggleVariantSize, TopHeader, type TopHeaderProps, type TrackVariants, type TriggerSize, type TriggerState, type TriggerVariants, UengageProvider, accordionContentVariants, accordionItemVariants, accordionRootVariants, accordionTriggerVariants, iconBadgeVariants as alertDialogIconBadgeVariants, avatarContainerVariants, buildPageWindow, checkboxBoxVariants, checkboxLabelVariants, chevronButtonVariants, chipVariants, buttonVariants as customButtonVariants, dropzoneVariants, formatDate, formatMonthYear, formatRange, getAccordionChip, getAccordionPalette, getTableRowStateSpec, getTabsPalette, iconWrapperVariants, inputFieldVariants, inputIconSlotVariants, inputWrapperVariants, isSameDay, pageButtonVariants, radioCircleVariants, radioDotVariants, radioLabelVariants, resetBannerDismissal, sidebarContentVariants, sidebarPersistentVariants, statusBadgeVariants, tabTriggerVariants, tableBodyRowVariants, tableHeaderRowVariants, tableShimmerStyle, tableWrapperVariants, thumbVariants, trackVariants, triggerVariants, useFuzzySearch, usePagination, useSweetAlert };
