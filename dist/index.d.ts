export { buttonVariants } from './components/ui/button.js';
export { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger } from './components/ui/alert-dialog.js';
export { Separator } from './components/ui/separator.js';
export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from './components/ui/drawer.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { ReactNode, ComponentProps } from 'react';
import { VariantProps } from 'class-variance-authority';
import { CssSize } from './utils/layoutTokens.js';
export { LAYOUT, LayoutTokens, toCssSize } from './utils/layoutTokens.js';
export { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover.js';
export { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './components/ui/command.js';
import { TabsTrigger } from './components/ui/tabs.js';
export { Input as input } from './components/ui/input.js';
import { Label } from './components/ui/label.js';
import { RadioGroup as RadioGroup$1, Checkbox as Checkbox$1, Switch } from 'radix-ui';
export { DatePickerCalendar, MonthPickerCalendar } from './components/ui/DatePickerCalendar.js';
import { LucideIcon } from 'lucide-react';
export { BrandGreen, brand } from './utils/colors.js';
export { cn } from './lib/utils.js';
export { CardAction, CardDescription } from './components/ui/card.js';
import 'cmdk';
import 'react-day-picker';
import 'clsx';

type ColorVariant = "primary" | "secondary" | "tertiary" | "alertPrimary" | "warningPrimary" | "alertSecondary";
type ButtonState = "default" | "hover" | "pressed" | "focused" | "disabled";
type ButtonSize = "xs" | "sm" | "md" | "lg";
/** Kept for backward-compat export — not used internally for className. */
declare const buttonVariants: (props?: ({
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends Omit<React.ComponentProps<"button">, "title">, VariantProps<typeof buttonVariants> {
    variant?: ColorVariant;
    size?: ButtonSize;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    asChild?: boolean;
    /** Shows a spinner, hides label + icons, blocks clicks, and sets aria-busy. */
    loading?: boolean;
    /** Custom icon rendered while `loading`. Defaults to a spinning `Loader2`. */
    loadingIcon?: React.ReactNode;
    /** Text label. Used when `children` is not provided. */
    title?: React.ReactNode;
}
declare function Button({ className, variant, size, leftIcon, rightIcon, disabled, loading, loadingIcon, asChild, style, title, children, onPointerEnter, onPointerLeave, onPointerDown, onPointerUp, onFocus, onBlur, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;
declare namespace Button {
    var displayName: string;
}

interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
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

interface TopHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    /** Module / page title, rendered bold on the left. */
    title: React.ReactNode;
    /**
     * Optional helper element beside the title (e.g. a "How it Works?" link).
     */
    helper?: React.ReactNode;
    /** Right-side slot (e.g. action buttons). */
    action?: React.ReactNode;
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
interface SubHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
    /** Primary section heading. */
    title?: React.ReactNode;
    /**
     * Supporting subtitle. Accepts ReactNode for rich content.
     */
    subtitle?: React.ReactNode;
    /** Right-side slot (e.g. filters, step navigation, CTAs). */
    right?: React.ReactNode;
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
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
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

interface CardProps extends React.ComponentProps<"div"> {
}
declare function Card({ className, ...props }: CardProps): react_jsx_runtime.JSX.Element;
declare namespace Card {
    var displayName: string;
}
declare function CardHeader({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardTitle({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardContent({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardFooter({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

type SearchValueType = "string" | "number" | "alphanumeric";
type SearchBarSize = "sm" | "md" | "lg";
interface SearchBarProps<T extends string | number = string, TItem = unknown> {
    value?: T;
    defaultValue?: T;
    valueType?: SearchValueType;
    size?: SearchBarSize;
    /** Label displayed above the search bar. */
    label?: string;
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
}

declare function SearchBar<T extends string | number = string, TItem = unknown>({ value: controlledValue, defaultValue, valueType, size, label, required, placeholder, width, className, inputClassName, disabled, readOnly, spellCheck, onChange, onSearch, onClear, onTouch, clearable, dropdownClassName, dropdownItems, getLabel, getValue, onSelect, fallbackText, }: SearchBarProps<T, TItem>): react_jsx_runtime.JSX.Element;
declare namespace SearchBar {
    var displayName: string;
}

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
type SelectMode = "single" | "multi";
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
    label?: string;
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
    /**
     * When `true`, each option in the dropdown is prefixed with its position number (1, 2, 3 …).
     * The index reflects the current displayed order (after sorting / fuzzy filtering).
     */
    indexing?: boolean;
}

declare function Select<TItem = unknown>({ options, items, getLabel, getValue, getDisabled, value: controlledValue, defaultValue, mode, size, placeholder, disabled, width, className, onChange, onTouch, spellCheck, clearable, label, required, helperText, error, readOnly, sorting, indexing, search: searchEnabled, }: SelectProps<TItem>): react_jsx_runtime.JSX.Element;
declare namespace Select {
    var displayName: string;
}

type TriggerState = "default" | "open" | "disabled" | "readonly";
type TriggerSize = "xs" | "sm" | "md" | "lg";
declare const triggerVariants$1: (props?: ({
    state?: "default" | "disabled" | "open" | "readonly" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TriggerVariants = VariantProps<typeof triggerVariants$1>;

type TabItem = {
    value: string;
    label: string;
    disabled?: boolean;
};
interface CustomTabsProps {
    tabs: TabItem[];
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    variant?: "primary" | "secondary";
    visibleTabLimit?: number;
    overflowLabel?: string;
    showBottomBorder?: boolean;
    className?: string;
}

declare function Tabs(props: CustomTabsProps): react_jsx_runtime.JSX.Element;
declare namespace Tabs {
    var displayName: string;
}

interface CustomTabsTriggerProps extends React.ComponentProps<typeof TabsTrigger> {
    variant?: "secondary" | "tertiary";
}
declare function CustomTabsTrigger({ className, children, disabled, variant, ...props }: CustomTabsTriggerProps): react_jsx_runtime.JSX.Element;
declare namespace CustomTabsTrigger {
    var displayName: string;
}

declare const tabTriggerVariants: (props?: ({
    state?: "disabled" | "active" | "inactive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TabTriggerVariants = VariantProps<typeof tabTriggerVariants>;

type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search";
type AllowPattern = "alphanumeric" | "alpha" | "numeric" | "decimal" | "phone" | "none";
interface CustomInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "width" | "height" | "onChange"> {
    size?: "sm" | "md" | "lg";
    inputType?: InputType;
    allowPattern?: AllowPattern;
    label?: string;
    helperText?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
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
    /** Shows an X button to clear the input value. Turns red on hover. */
    clearable?: boolean;
    /** Fires when the clear button is clicked. */
    onClear?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    /** Renders a <textarea> instead of <input>. Incompatible with inputType="password" and suggestions. */
    multiline?: boolean;
    /** Number of visible text rows. Only used when multiline=true. */
    rows?: number;
    /** Controls CSS resize handle. Only used when multiline=true. Defaults to "vertical". */
    resize?: "none" | "vertical" | "horizontal" | "both";
}

interface CustomInputComposedProps extends CustomInputProps {
    required?: boolean;
}
declare function Input({ size, inputType, allowPattern, label, helperText, error, leftIcon, rightIcon, required, width, className, disabled, readOnly, validationRegex, validationMessage, onTouch, spellCheck, id, onChange, onFocus, onBlur, suggestions, onSuggestionSelect, clearable, onClear, multiline, rows, resize, ...rest }: CustomInputComposedProps): react_jsx_runtime.JSX.Element;
declare namespace Input {
    var displayName: string;
}

type InputLabelSize = "sm" | "md" | "lg";
interface InputLabelProps extends React.ComponentProps<typeof Label> {
    size?: InputLabelSize;
    required?: boolean;
}
declare function InputLabel({ size, required, className, children, ...props }: InputLabelProps): react_jsx_runtime.JSX.Element;
declare namespace InputLabel {
    var displayName: string;
}

type InputHelperSize = "sm" | "md" | "lg";
interface InputHelperProps extends React.HTMLAttributes<HTMLParagraphElement> {
    size?: InputHelperSize;
    helperText?: string;
    error?: string;
}
declare function InputHelper({ size, helperText, error, className, ...props }: InputHelperProps): react_jsx_runtime.JSX.Element | null;
declare namespace InputHelper {
    var displayName: string;
}

declare const inputWrapperVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    multiline?: boolean | null | undefined;
    state?: "default" | "disabled" | "focused" | "error" | "readonly" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const inputFieldVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    multiline?: boolean | null | undefined;
    hasLeftIcon?: boolean | null | undefined;
    hasRightIcon?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const inputIconSlotVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    side?: "left" | "right" | null | undefined;
    multiline?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>;
type InputFieldVariants = VariantProps<typeof inputFieldVariants>;
type InputIconSlotVariants = VariantProps<typeof inputIconSlotVariants>;
declare const PATTERN_REGEX: Record<AllowPattern, string>;

type Size = "sm" | "md" | "lg";
interface CustomRadioItemProps extends Omit<React.ComponentProps<typeof RadioGroup$1.Item>, "children"> {
    label: React.ReactNode;
    size?: Size;
    disabled?: boolean;
    error?: boolean;
    /** When provided, the pill wrapper uses this color for its border when checked. Falls back to default green if omitted. */
    borderColor?: string;
    /** When provided, the pill wrapper uses this color for its background when checked. Falls back to default green tint if omitted. */
    bgColor?: string;
    /** When true, the item shows its current state but cannot be selected. */
    readOnly?: boolean;
}
declare function Radio({ id, label, size, disabled, readOnly, error, value, className, borderColor, bgColor, ...rest }: CustomRadioItemProps): react_jsx_runtime.JSX.Element;
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
    size?: "sm" | "md" | "lg";
    layout?: "horizontal" | "vertical" | "grid";
    /** Max columns at the largest breakpoint when `layout="grid"`. Smaller breakpoints scale down (mobile=1, sm=2). */
    columns?: 1 | 2 | 3 | 4;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: string;
    className?: string;
    /** When provided, applies this border color to each radio pill when its item is selected. */
    borderColor?: string;
    /** When provided, applies this background color to each radio pill when its item is selected. */
    bgColor?: string;
    /** When true, all radio items show their current state but cannot be changed. */
    readOnly?: boolean;
}

declare function RadioGroup<T = RadioOption>({ options, getLabel, getValue, getDisabled, value, defaultValue, onChange, size, layout, columns, disabled, label, required, helperText, error, className, borderColor, bgColor, readOnly, }: CustomRadioGroupProps<T>): react_jsx_runtime.JSX.Element;
declare namespace RadioGroup {
    var displayName: string;
}

declare const radioCircleVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "default" | "disabled" | "error" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const radioDotVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const radioLabelVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "default" | "disabled" | "checked" | null | undefined;
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
    size?: "sm" | "md" | "lg";
    label?: string;
    disabled?: boolean;
    indeterminate?: boolean;
    error?: boolean;
    className?: string;
    /** When provided, the pill wrapper uses this color for its border when checked/indeterminate. Falls back to default green if omitted. */
    borderColor?: string;
    /** When provided, the pill wrapper uses this color for its background when checked/indeterminate. Falls back to default green tint if omitted. */
    bgColor?: string;
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
    size?: "sm" | "md" | "lg";
    layout?: "horizontal" | "vertical" | "grid";
    columns?: number;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    helperText?: string;
    error?: string;
    selectAll?: boolean;
    /** When provided, applies this border color to each pill when its item is checked. */
    borderColor?: string;
    /** When provided, applies this background color to each pill when its item is checked. */
    bgColor?: string;
    /** When true, all checkboxes show their current state but cannot be toggled. */
    readOnly?: boolean;
}

declare function Checkbox({ checked, defaultChecked, onCheckedChange, size, label, disabled, readOnly, indeterminate, error, className, borderColor, bgColor, ...rest }: CustomCheckboxProps & Omit<React.ComponentProps<typeof Checkbox$1.Root>, "checked" | "defaultChecked" | "onCheckedChange" | "disabled" | "className">): react_jsx_runtime.JSX.Element;
declare namespace Checkbox {
    var displayName: string;
}

declare function CheckboxGroup<T = CheckboxOption>({ options, getLabel, getValue, getDisabled, value, onChange, size, layout, columns, disabled, label, required, helperText, error, selectAll, borderColor, bgColor, readOnly, }: CustomCheckboxGroupProps<T>): react_jsx_runtime.JSX.Element;
declare namespace CheckboxGroup {
    var displayName: string;
}

declare const checkboxBoxVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "disabled" | "checked" | "error" | "unchecked" | "indeterminate" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const checkboxLabelVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "default" | "disabled" | "checked" | null | undefined;
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
    /** Controls the trigger height via a preset. */
    size?: "sm" | "md" | "lg";
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
    label?: string;
    /** When true, appends a red asterisk directly after the label text. */
    required?: boolean;
    /** Helper text rendered below the trigger. */
    helperText?: string;
    /** Error message rendered below the trigger; takes priority over helperText. */
    error?: string;
    /** When true, the trigger shows the current value but the calendar cannot be opened. */
    readOnly?: boolean;
}

declare function DatePicker({ mode, value: controlledValue, onChange, placeholder, size, width, className, disabled, minDate, maxDate, onTouch, clearable, label, required, helperText, error, readOnly, }: DatePickerProps): react_jsx_runtime.JSX.Element;
declare namespace DatePicker {
    var displayName: string;
}

type DatePickerTriggerState = "default" | "open" | "disabled" | "readonly";
declare const triggerVariants: (props?: ({
    state?: "default" | "disabled" | "open" | "readonly" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type DayCellVariant = "default" | "today" | "selected" | "inRange" | "rangeStart" | "rangeEnd" | "outsideMonth";
declare const dayCellVariants: (props?: ({
    variant?: "default" | "selected" | "today" | "inRange" | "rangeStart" | "rangeEnd" | "outsideMonth" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;

/** Returns e.g. "Apr 17, 2026" */
declare function formatDate(date: Date | null | undefined): string | null;
/** Returns e.g. "Apr 1, 2026 – Apr 17, 2026" */
declare function formatRange(from: Date | null | undefined, to: Date | null | undefined): string | null;
/** Returns e.g. "May 2026" */
declare function formatMonthYear(date: Date | null | undefined): string | null;
declare function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean;

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
    /** Vertical alignment of cell content. Defaults to "top". Use "middle" to center content vertically within the row. */
    verticalAlign?: "top" | "middle";
    render?: (value: any, row: T, index: number) => ReactNode;
    sortable?: boolean;
    hideOnMobile?: boolean;
    /** Extra Tailwind classes applied to both the <th> and <td> for this column. */
    className?: string;
}
interface CustomTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
    keyField: keyof T;
    loading?: boolean;
    emptyMessage?: string;
    onRowClick?: (row: T) => void;
    rowClassName?: (row: T) => string;
    stickyHeader?: boolean;
    maxHeight?: string;
    bordered?: boolean;
    size?: "sm" | "md" | "lg";
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
}

declare function Table<T>({ columns, data, keyField, loading, emptyMessage, onRowClick, rowClassName, stickyHeader, maxHeight, bordered, size, mobileLayout, className, hover, }: CustomTableProps<T>): react_jsx_runtime.JSX.Element;

declare const tableWrapperVariants: (props?: ({
    bordered?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const tableHeaderRowVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const tableBodyRowVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    clickable?: boolean | null | undefined;
    hover?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const statusBadgeVariants: (props?: ({
    variant?: "error" | "success" | "warning" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TableWrapperVariants = VariantProps<typeof tableWrapperVariants>;
type TableHeaderRowVariants = VariantProps<typeof tableHeaderRowVariants>;
type TableBodyRowVariants = VariantProps<typeof tableBodyRowVariants>;
type StatusBadgeVariants = VariantProps<typeof statusBadgeVariants>;

interface TableCellProps extends ComponentProps<"td"> {
    size?: TableBodyRowVariants["size"];
    align?: "left" | "center" | "right";
    verticalAlign?: "top" | "middle";
}
declare function TableCell({ size, align, verticalAlign, className, children, ...props }: TableCellProps): react_jsx_runtime.JSX.Element;

type SortDirection = "asc" | "desc" | null;
interface TableHeaderCellProps extends Omit<ComponentProps<"th">, "onClick"> {
    size?: TableHeaderRowVariants["size"];
    align?: "left" | "center" | "right";
    sortable?: boolean;
    sorted?: SortDirection;
    onSort?: () => void;
}
declare function TableHeaderCell({ size, align, sortable, sorted, onSort, className, children, ...props }: TableHeaderCellProps): react_jsx_runtime.JSX.Element;

interface TableSkeletonProps {
    rows?: number;
    columns: number;
    className?: string;
}
declare function TableSkeleton({ rows, columns, className, }: TableSkeletonProps): react_jsx_runtime.JSX.Element;

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

type ToggleVariantSize = "sm" | "md" | "lg";
declare const trackVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const thumbVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TrackVariants = VariantProps<typeof trackVariants>;
type ThumbVariants = VariantProps<typeof thumbVariants>;

interface ToggleProps extends Omit<React.ComponentProps<typeof Switch.Root>, "onChange" | "defaultChecked" | "checked"> {
    /** Size of the toggle */
    size?: ToggleVariantSize;
    /** Field label rendered above the toggle. */
    label?: string;
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
    /** When provided together with bgColor, enables pill look. Border color applied when checked. */
    borderColor?: string;
    /** When provided together with borderColor, enables pill look. Background color applied when checked. */
    bgColor?: string;
}
declare const Toggle: React.ForwardRefExoticComponent<Omit<ToggleProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

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
    trigger?: React.ReactNode;
    heading?: React.ReactNode;
    closeIcon?: boolean;
    divider?: boolean;
    className?: string;
    contentClassName?: string;
    children?: React.ReactNode;
}

declare function Sidebar({ open, defaultOpen, onOpenChange, side, size, sizePercent, overlay, closeOnOutsideClick, persistentOnDesktop, trigger, heading, closeIcon, divider, className, contentClassName, children, }: SidebarProps): react_jsx_runtime.JSX.Element | null;

declare const sidebarContentVariants: (props?: ({
    side?: "bottom" | "left" | "right" | "top" | "right-slide" | null | undefined;
    size?: "sm" | "lg" | "md" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const sidebarPersistentVariants: (props?: ({
    side?: "bottom" | "left" | "right" | "top" | "right-slide" | null | undefined;
    size?: "sm" | "lg" | "md" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SidebarContentVariants = VariantProps<typeof sidebarContentVariants>;

declare const iconBadgeVariants: (props?: ({
    variant?: "error" | "success" | "warning" | "info" | "question" | null | undefined;
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
    title: React.ReactNode;
    /**
     * Body text shown below the title.
     * `text` and `description` are identical aliases; use whichever reads better.
     */
    text?: React.ReactNode;
    /** Alias for `text`. */
    description?: React.ReactNode;
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
    confirmButtonText?: React.ReactNode;
    /**
     * Label for the cancel button (only visible when `showCancelButton` is true).
     * @default "Cancel"
     */
    cancelButtonText?: React.ReactNode;
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
    footer?: React.ReactNode;
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
    trigger?: React.ReactNode;
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
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element;

declare const modalSizeVariants: (props?: ({
    size?: "default" | "small" | "md" | "medium" | "large" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ModalProps extends VariantProps<typeof modalSizeVariants> {
    isOpen: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    showCloseButton?: boolean;
    closeIcon?: React.ReactNode;
    headerClassName?: string;
    bodyClassName?: string;
    modalClassName?: string;
}
declare function Modal({ isOpen, onClose, title, children, size, showCloseButton, closeIcon, headerClassName, bodyClassName, modalClassName, }: ModalProps): React.ReactPortal | null;

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
    children: React.ReactNode;
    className?: string;
}
declare function UengageProvider({ children, className }: UengageProviderProps): react_jsx_runtime.JSX.Element;

interface LoaderProps {
}
declare function Loader(_props: LoaderProps): react_jsx_runtime.JSX.Element | null;
declare namespace Loader {
    var displayName: string;
}

interface AppHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
    /**
     * Brand / logo slot — rendered in a fixed-width zone on the left.
     * On mobile this zone is hidden so the center slot leads.
     */
    logo?: React.ReactNode;
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
    center?: React.ReactNode;
    /** Right-side slot — action icons, wallet balance, user profile, etc. */
    right?: React.ReactNode;
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
    icon?: React.ReactNode;
}
interface AppSidebarModule {
    /** Unique page/slug identifier */
    page: string;
    /** Display name */
    label: string;
}
interface AppSidebarProps extends React.HTMLAttributes<HTMLElement> {
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
    footer?: React.ReactNode;
}
declare function AppSidebar({ products, modules, activeProductId, activeModulePage, onProductSelect, onModuleClick, collapsed, offsetTop, footer, className, style, ...props }: AppSidebarProps): react_jsx_runtime.JSX.Element;
declare namespace AppSidebar {
    var displayName: string;
}

interface AccordionItem {
    value: string;
    title: string;
    content: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}
type AccordionVariant = "default" | "ghost" | "bordered";
type AccordionSize = "sm" | "md" | "lg";
interface AccordionBaseProps {
    items: AccordionItem[];
    variant?: AccordionVariant;
    size?: AccordionSize;
    className?: string;
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
    children: React.ReactNode;
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
declare const FilterGroupMobileContext: React.Context<boolean>;

type BannerVariant = "info" | "success" | "error" | "warning";
interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Visual style of the banner.
     * @default "info"
     */
    variant?: BannerVariant;
    /** Text content. Alternatively pass children. */
    message?: React.ReactNode;
    /** Override the default variant icon. Pass `null` to hide without setting `showIcon={false}`. */
    icon?: React.ReactNode;
    /** Whether to render the leading icon.
     * @default true
     */
    showIcon?: boolean;
    /** Custom background color (CSS value). Overrides the variant palette. */
    backgroundColor?: string;
    /** Custom border color (CSS value). Overrides the variant palette. */
    borderColor?: string;
    /** Custom icon color (CSS value). Overrides the variant palette. */
    iconColor?: string;
    /** Custom text color (CSS value). Overrides the variant palette. */
    textColor?: string;
}

declare function Banner({ variant, message, children, icon, showIcon, className, backgroundColor, borderColor, iconColor, textColor, style, ...rest }: BannerProps): react_jsx_runtime.JSX.Element;
declare namespace Banner {
    var displayName: string;
}

interface SectionHeaderProps extends React.ComponentProps<"div"> {
    /** Icon element shown to the left of the title. */
    icon?: React.ReactNode;
    /** Main heading text. */
    title: string;
    /** Optional subtitle/description rendered below the title. */
    description?: React.ReactNode;
    /** Slot for action buttons, rendered at the trailing end of the header. */
    action?: React.ReactNode;
}
declare function SectionHeader({ icon, title, description, action, className, ...props }: SectionHeaderProps): react_jsx_runtime.JSX.Element;
interface SectionDividerProps extends Omit<React.ComponentProps<"div">, "children"> {
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
interface SectionContentProps extends React.ComponentProps<"div"> {
}
declare function SectionContent({ className, children, ...props }: SectionContentProps): react_jsx_runtime.JSX.Element;
interface SectionSubsectionProps extends React.ComponentProps<"div"> {
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
interface SectionRowProps extends React.ComponentProps<"div"> {
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
interface SectionFieldProps extends React.ComponentProps<"div"> {
    /** Column span inside a SectionRow grid (1–4). */
    span?: 1 | 2 | 3 | 4;
}
declare function SectionField({ span, className, ...props }: SectionFieldProps): react_jsx_runtime.JSX.Element;
interface SectionTableContentProps extends React.ComponentProps<"div"> {
    /**
     * Show a thin separator line between the section header and the table.
     * Defaults to true.
     */
    divider?: boolean;
}
declare function SectionTableContent({ divider, className, children, ...props }: SectionTableContentProps): react_jsx_runtime.JSX.Element;
interface SectionGroupProps extends React.ComponentProps<"div"> {
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
interface SectionProps extends React.ComponentProps<"div"> {
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

type FileUploadVariant = "image" | "file" | "avatar" | "video";
type FileUploadSize = "sm" | "md" | "lg";
/** Internal representation of a locally-selected file with a preview URL. */
interface FileUploadLocalFile {
    file: File;
    /** Object URL for image preview — created via URL.createObjectURL(). */
    previewUrl: string;
    /** Stable random ID for React key. */
    id: string;
}
interface FileUploadProps {
    /** Controls layout and default accept type. Defaults to "file". */
    variant?: FileUploadVariant;
    /** Controls spacing and icon sizes. Defaults to "md". */
    size?: FileUploadSize;
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
     * Controlled URL(s) for showing already-uploaded content.
     * - image / avatar: renders as <img> preview
     * - file: renders as filename chip(s)
     * Pass a string for single, string[] for multiple.
     */
    value?: string | string[];
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
    label?: string;
    required?: boolean;
    /** Shown below the field in red. Also shown for internal validation errors. */
    error?: string;
    helperText?: string;
    /** Main line in the empty-state dropzone. Falls back to variant default. */
    placeholder?: string;
    /** Sub-line in the empty-state dropzone (e.g. "PNG, JPG up to 5 MB"). */
    description?: string;
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
     * Icon element rendered as a small badge in the bottom-right corner of the
     * image or avatar preview. Useful for camera, edit, or brand indicators.
     * Not rendered in the file variant or on empty-state dropzones.
     */
    icon?: React.ReactNode;
    /** Applied to the outermost wrapper div. */
    className?: string;
    /** Applied to the dropzone area (not used in avatar variant). */
    dropzoneClassName?: string;
    /** Ref forwarded to the hidden <input type="file"> element. */
    inputRef?: React.Ref<HTMLInputElement>;
}
declare function FileUpload({ variant, size, accept, multiple, disabled, readOnly, name, id, maxSize, maxFiles, allowedFiles, value, onChange, onFilesChange, onRemove, onRemoveFile, onValidationError, label, required, error, helperText, placeholder, description, dragAndDrop, showLocalPreview, clearable, changeable, icon, className, dropzoneClassName, inputRef: externalInputRef, }: FileUploadProps): react_jsx_runtime.JSX.Element;
declare namespace FileUpload {
    var displayName: string;
}

declare const dropzoneVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "disabled" | "error" | "dragover" | "idle" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const iconWrapperVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const avatarContainerVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
    state?: "disabled" | "filled" | "empty" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;

declare const chipVariants: (props?: ({
    variant?: "inactive" | "error" | "success" | "warning" | "info" | null | undefined;
    size?: "xs" | "sm" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ChipVariants = VariantProps<typeof chipVariants>;
interface ChipProps extends ChipVariants {
    /** Text label displayed inside the chip. */
    label: string;
    /** Custom background color — accepts any valid CSS color value (hex, rgb, hsl, etc.). Overrides the variant background. */
    bgColor?: string;
    /** Custom text color — accepts any valid CSS color value. Overrides the variant text color. */
    textColor?: string;
    /** Extra Tailwind classes. */
    className?: string;
}
declare function Chip({ label, variant, size, bgColor, textColor, className, }: ChipProps): react_jsx_runtime.JSX.Element;

export { Accordion, type AccordionContentVariants, type AccordionItem, type AccordionItemVariants, type AccordionRootVariants, type AccordionSize, type AccordionTriggerVariants, type AccordionVariant, AlertDialog, type AlertDialogIconProp, type AlertDialogInput, type AlertDialogOptions, type AlertDialogProps, type AlertDialogSize, type AlertDialogVariant, type AllowPattern, AppHeader, type AppHeaderProps, AppSidebar, type AppSidebarModule, type AppSidebarProduct, type AppSidebarProps, Banner, type BannerProps, type BannerVariant, Button, type ButtonState, Card, CardContent, CardFooter, CardHeader, type CardProps, CardTitle, Checkbox, type CheckboxBoxVariants, CheckboxGroup, type CheckboxLabelVariants, type CheckboxOption, type ChevronButtonVariants, Chip, type ChipProps, type ChipVariants, type ColorVariant, type ColumnDef, CssSize, type CustomAccordionProps, type ButtonProps as CustomButtonProps, type CustomCheckboxGroupProps, type CustomCheckboxProps, type CustomInputProps, type CustomPaginationProps, type CustomRadioGroupProps, type CustomRadioItemProps, TableCell as CustomTableCell, TableHeaderCell as CustomTableHeaderCell, type CustomTableProps, TableSkeleton as CustomTableSkeleton, type CustomTabsProps, CustomTabsTrigger, type CustomTabsTriggerProps, DatePicker, type DatePickerMode, type DatePickerProps, type DatePickerTriggerState, type DateRange, type DayCellVariant, FileUpload, type FileUploadLocalFile, type FileUploadProps, type FileUploadSize, type FileUploadVariant, FilterGroup, FilterGroupMobileContext, type FilterGroupProps, Grid, type GridColumns, type GridLimit, type GridProps, Input, type InputFieldVariants, InputHelper, type InputHelperProps, type InputHelperSize, type InputIconSlotVariants, InputLabel, type InputLabelProps, type InputLabelSize, type InputType, type InputWrapperVariants, Label, Loader, Modal, type ModalProps, PATTERN_REGEX, type PageButtonVariants, PageContainer, type PageContainerProps, Pagination, Radio, type RadioCircleVariants, type RadioDotVariants, RadioGroup, type RadioLabelVariants, type RadioOption, SearchBar, type SearchBarProps, type SearchBarSize, type SearchValueType, Section, SectionContent, type SectionContentProps, SectionDivider, type SectionDividerProps, SectionField, type SectionFieldProps, SectionGroup, type SectionGroupProps, SectionHeader, type SectionHeaderProps, type SectionProps, SectionRow, type SectionRowProps, SectionSubsection, type SectionSubsectionProps, SectionTableContent, type SectionTableContentProps, Select, type SelectMode, type SelectOption, type SelectProps, Sidebar, type SidebarContentVariants, type SidebarProps, type SidebarSide, type SidebarSize, type SortDirection, StatusBadge, type StatusBadgeProps, type StatusBadgeVariants, SubHeader, type SubHeaderAlign, type SubHeaderProps, SweetAlertProvider, type SweetAlertResult, type TabItem, type TabTriggerVariants, Table, type TableBodyRowVariants, type TableCellProps, type TableHeaderCellProps, type TableHeaderRowVariants, type TableSkeletonProps, type TableWrapperVariants, Tabs, type ThumbVariants, Toggle, type ToggleProps, type ToggleVariantSize, TopHeader, type TopHeaderProps, type TrackVariants, type TriggerSize, type TriggerState, type TriggerVariants, UengageProvider, accordionContentVariants, accordionItemVariants, accordionRootVariants, accordionTriggerVariants, iconBadgeVariants as alertDialogIconBadgeVariants, avatarContainerVariants, checkboxBoxVariants, checkboxLabelVariants, chevronButtonVariants, chipVariants, buttonVariants as customButtonVariants, triggerVariants as datePickerTriggerVariants, dayCellVariants, dropzoneVariants, formatDate, formatMonthYear, formatRange, iconWrapperVariants, inputFieldVariants, inputIconSlotVariants, inputWrapperVariants, isSameDay, pageButtonVariants, radioCircleVariants, radioDotVariants, radioLabelVariants, sidebarContentVariants, sidebarPersistentVariants, statusBadgeVariants, tabTriggerVariants, tableBodyRowVariants, tableHeaderRowVariants, tableWrapperVariants, thumbVariants, trackVariants, triggerVariants$1 as triggerVariants, usePagination, useSweetAlert };
