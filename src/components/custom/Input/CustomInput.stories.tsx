import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search, Calendar, Mail } from "lucide-react";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Shadcn-backed input wrapper with sized CVA variants, optional label / helper / error, absolute-positioned left & right icon slots, an auto eye-toggle for `inputType='password'`, and an `allowPattern` that strips disallowed characters inside `onChange` before the event reaches the caller.",
      },
    },
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    inputType: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    allowPattern: {
      control: "select",
      options: ["none", "alphanumeric", "alpha", "numeric", "decimal", "phone"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    defaultValue: { control: "text" },
    validationRegex: { control: "text" },
    validationMessage: { control: "text" },
    min: { control: "number" },
    max: { control: "number" },
    minLength: { control: "number" },
    maxLength: { control: "number" },
    clearable: { control: "boolean" },
    onChange: { action: "change" },
    onFocus: { action: "focus" },
    onBlur: { action: "blur" },
    onClear: { action: "clear" },
    onTouch: { action: "touch" },
    onSuggestionSelect: { action: "suggestionSelect" },
  },
  args: {
    size: "md",
    inputType: "text",
    placeholder: "Enter ticket name",
    disabled: false,
    required: false,
    readOnly: false,
    clearable: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Sizes ──────────────────────────────────────────────────── */

export const Small: Story = {
  args: { size: "sm", placeholder: "Small input" },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const Medium: Story = {
  args: { size: "md", placeholder: "Medium input" },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const Large: Story = {
  args: { size: "lg", placeholder: "Large input" },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Input types ────────────────────────────────────────────── */

export const Email: Story = {
  args: { inputType: "email", placeholder: "you@example.com", label: "Email" },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const Password: Story = {
  args: {
    inputType: "password",
    placeholder: "••••••••",
    label: "Password",
    helperText: "Click the eye icon to toggle visibility.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const NumberInput: Story = {
  name: "Number",
  args: { inputType: "number", placeholder: "42", label: "Quantity" },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const Tel: Story = {
  args: { inputType: "tel", placeholder: "+91 98765 43210", label: "Phone" },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const Url: Story = {
  args: {
    inputType: "url",
    placeholder: "https://uengage.in",
    label: "Website",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Allow patterns ─────────────────────────────────────────── */

export const AllowAlphanumeric: Story = {
  args: {
    allowPattern: "alphanumeric",
    label: "Alphanumeric",
    placeholder: "Try: Abc 123!@#",
    helperText: "Only a-z, A-Z and 0-9 make it through.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const AllowNumeric: Story = {
  args: {
    allowPattern: "numeric",
    label: "Numeric",
    placeholder: "Try: 1a2b3c",
    helperText: "Digits only.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const AllowDecimal: Story = {
  args: {
    allowPattern: "decimal",
    label: "Decimal",
    placeholder: "Try: 12.34abc",
    helperText: "Digits and dots.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const AllowAlpha: Story = {
  args: {
    allowPattern: "alpha",
    label: "Alpha",
    placeholder: "Try: abc123",
    helperText: "Letters only.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const AllowPhone: Story = {
  args: {
    allowPattern: "phone",
    inputType: "tel",
    label: "Phone",
    placeholder: "+91 (98) 7654-3210",
    helperText: "Digits, spaces, + - ( ) only.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Label / helper / error ─────────────────────────────────── */

export const WithLabel: Story = {
  args: { label: "Ticket name", placeholder: "Enter ticket name" },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const Required: Story = {
  args: {
    label: "Ticket name",
    required: true,
    placeholder: "Enter ticket name",
    helperText: "A red asterisk is appended via the `required` prop.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: "Ticket name",
    placeholder: "Enter ticket name",
    helperText: "Short descriptive title — visible to the assignee.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: "Ticket name",
    required: true,
    placeholder: "Enter ticket name",
    error: "Ticket name is required.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Ticket name",
    disabled: true,
    value: "Locked — cannot edit",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Icons ──────────────────────────────────────────────────── */

export const WithLeftIcon: Story = {
  args: {
    placeholder: "Search tickets…",
    leftIcon: <Search />,
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const WithRightIcon: Story = {
  args: {
    placeholder: "Pick a date",
    rightIcon: <Calendar />,
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const WithBothIcons: Story = {
  args: {
    label: "Email",
    inputType: "email",
    placeholder: "you@example.com",
    leftIcon: <Mail />,
    rightIcon: <Search />,
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Read-only ──────────────────────────────────────────────── */

export const ReadOnly: Story = {
  args: {
    label: "Customer ID",
    readOnly: true,
    defaultValue: "CUS-12345",
    helperText: "Auto-generated — cannot be edited.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Pre-filled value (uncontrolled) ────────────────────────── */

export const PrefilledValue: Story = {
  args: {
    label: "Company",
    defaultValue: "uEngage Experiences Pvt. Ltd.",
    helperText: "Seeded via `defaultValue` — still fully editable.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Min / Max (number) ─────────────────────────────────────── */

export const MinMaxNumber: Story = {
  args: {
    label: "Age",
    inputType: "number",
    min: 18,
    max: 99,
    defaultValue: 25,
    validationMessage: "Age must be between 18 and 99.",
    helperText: "Type a value outside 18-99, then blur.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── minLength / maxLength ──────────────────────────────────── */

export const MinMaxLength: Story = {
  args: {
    label: "Username",
    minLength: 4,
    maxLength: 16,
    validationMessage: "Username must be 4-16 characters.",
    helperText: "Validates on blur via native constraints.",
    placeholder: "e.g. amanpreet",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Regex validation ───────────────────────────────────────── */

export const RegexValidation: Story = {
  args: {
    label: "Phone (India)",
    inputType: "tel",
    placeholder: "+91 9876543210",
    validationRegex: /^\+91\s?\d{10}$/,
    validationMessage:
      "Must start with +91 followed by 10 digits (optional space).",
    helperText: "Format: +91 9876543210",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const RegexValidationEmail: Story = {
  args: {
    label: "Work email",
    inputType: "email",
    placeholder: "you@uengage.in",
    validationRegex: /^[^\s@]+@uengage\.in$/,
    validationMessage: "Only @uengage.in addresses are accepted.",
    helperText: "Enter an email ending in @uengage.in.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Clearable ──────────────────────────────────────────────── */

export const Clearable: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search…",
    clearable: true,
    defaultValue: "Hello world",
    helperText: "Click the × to clear the value. It turns red on hover.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

export const ClearableControlled: Story = {
  args: {
    label: "Search (controlled)",
    placeholder: "Type to search…",
    clearable: true,
    helperText: "Clearable + controlled: value echoed below.",
  },
  render: function ClearableControlledStory(args) {
    const [value, setValue] = React.useState<string>("Initial value");
    return (
      <div className="flex w-90 flex-col gap-2">
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
        />
        <code className="text-xs text-[#6B7280]">value: {`"${value}"`}</code>
      </div>
    );
  },
};

export const ClearableWithPassword: Story = {
  args: {
    label: "Password",
    inputType: "password",
    placeholder: "••••••••",
    clearable: true,
    defaultValue: "secretpass",
    helperText: "Clear button sits left of the eye toggle.",
  },
  render: (args) => (
    <div className="w-90">
      <Input {...args} />
    </div>
  ),
};

/* ── Controlled ─────────────────────────────────────────────── */

export const Controlled: Story = {
  args: {
    label: "Ticket name",
    placeholder: "Type anything…",
    allowPattern: "alphanumeric",
    helperText: "Value echoed below updates on every keystroke.",
  },
  render: function ControlledStory(args) {
    const [value, setValue] = React.useState<string>("");
    return (
      <div className="flex w-90 flex-col gap-2">
        <Input
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <code className="text-xs text-[#6B7280]">
          value: {`"${value}"`} · length: {value.length}
        </code>
      </div>
    );
  },
};
