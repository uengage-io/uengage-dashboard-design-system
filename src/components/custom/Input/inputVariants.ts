import { cva, type VariantProps } from "class-variance-authority";
import type { AllowPattern, InputSize, InputStatus } from "@/types/input";

/**
 * Pixel spec lifted from the Input design page (Design Console
 * `Input.dc.html`, "Size scale" section): 28 / 32 / 40 / 48.
 * XS is for inline table editing, LG for standalone forms and mobile.
 *
 * These are applied as inline styles rather than Tailwind utilities so the
 * control keeps its exact metrics in consuming apps whose Tailwind build does
 * not scan this package for arbitrary-value classes.
 */
export const INPUT_SIZES: Record<
  InputSize,
  {
    /** Control height in px. */
    height: number;
    /** Horizontal padding in px. */
    padX: number;
    /** Value/placeholder font size in px. */
    font: number;
    /** Affix glyph size in px, drawn at 2px stroke. */
    icon: number;
    /** Corner radius in px — XS tightens to 6 so it sits inside table rows. */
    radius: number;
    /** Label font size in px. */
    label: number;
    /** Helper/message font size in px. */
    message: number;
  }
> = {
  xs: { height: 28, padX: 9, font: 12, icon: 13, radius: 6, label: 11, message: 10 },
  sm: { height: 32, padX: 11, font: 12, icon: 14, radius: 8, label: 12, message: 11 },
  md: { height: 40, padX: 13, font: 13, icon: 16, radius: 8, label: 12, message: 11 },
  lg: { height: 48, padX: 15, font: 14, icon: 18, radius: 8, label: 13, message: 11 },
};

/** Gap between an affix glyph and the value. Constant across the scale. */
export const AFFIX_GAP = 9;

/** Every state transition on the control runs at this curve. */
export const INPUT_TRANSITION =
  "border-color 120ms linear, box-shadow 120ms linear, background-color 120ms linear";

export const INPUT_COLORS = {
  surface: "#FFFFFF",
  subtle: "#F3F5F9",
  border: "#E2E2E2",
  borderHover: "#C6C6C6",
  borderFocus: "#1F5E2C",
  /** 3px lime halo that pairs with `borderFocus`. */
  ring: "0 0 0 3px rgba(140,196,42,.28)",
  value: "#161616",
  placeholder: "#9C9C9C",
  message: "#9C9C9C",
  icon: "#1F5E2C",

  successBorder: "#00A86B",
  successInk: "#00A86B",

  warningBg: "#FFF6D6",
  warningBorder: "#EFD98A",
  warningInk: "#6A5300",

  errorBg: "#FBE9EA",
  errorBorder: "#A8000F",
  errorInk: "#7A0009",
  errorLabel: "#A8000F",

  readOnlyBg: "#FAFFF7",

  disabledBg: "#F3F5F9",
  disabledInk: "#9C9C9C",

  validatingInk: "#595959",
} as const;

/**
 * Resolved visual state of the control. Ordering is deliberate — `disabled`
 * and `readOnly` outrank validation, and an `error` outranks a `status`.
 */
export type InputVisualState =
  | "default"
  | "hover"
  | "focused"
  | "error"
  | "success"
  | "warning"
  | "validating"
  | "loading"
  | "readonly"
  | "disabled";

export function resolveInputState(args: {
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  error?: string;
  status?: InputStatus;
  focused?: boolean;
  hovered?: boolean;
}): InputVisualState {
  const { disabled, readOnly, loading, error, status, focused, hovered } = args;
  if (disabled) return "disabled";
  if (loading) return "loading";
  if (readOnly) return "readonly";
  if (error) return "error";
  if (status === "validating") return "validating";
  if (focused) return "focused";
  if (status === "success") return "success";
  if (status === "warning") return "warning";
  if (hovered) return "hover";
  return "default";
}

export interface InputBoxStyle {
  background: string;
  border: string;
  boxShadow: string;
  /** Colour of the value text. */
  color: string;
  cursor?: string;
}

/** Box colours for a resolved state, straight off the design's state table. */
export function getInputBoxStyle(state: InputVisualState): InputBoxStyle {
  const c = INPUT_COLORS;
  const hairline = `1px solid ${c.border}`;

  switch (state) {
    case "hover":
      return {
        background: c.surface,
        border: `1px solid ${c.borderHover}`,
        boxShadow: "none",
        color: c.value,
      };
    case "focused":
      return {
        background: c.surface,
        border: `1px solid ${c.borderFocus}`,
        boxShadow: c.ring,
        color: c.value,
      };
    case "validating":
      return {
        background: c.surface,
        border: `1px solid ${c.borderFocus}`,
        boxShadow: "none",
        color: c.value,
      };
    case "success":
      return {
        background: c.surface,
        border: `1px solid ${c.successBorder}`,
        boxShadow: "none",
        color: c.value,
      };
    case "warning":
      return {
        background: c.warningBg,
        border: `1px solid ${c.warningBorder}`,
        boxShadow: "none",
        color: c.value,
      };
    case "error":
      return {
        background: c.errorBg,
        border: `1px solid ${c.errorBorder}`,
        boxShadow: "none",
        color: c.errorInk,
      };
    case "readonly":
      return {
        background: c.readOnlyBg,
        border: hairline,
        boxShadow: "none",
        color: c.value,
        cursor: "default",
      };
    case "loading":
      return {
        background: c.disabledBg,
        border: hairline,
        boxShadow: "none",
        color: c.disabledInk,
        cursor: "progress",
      };
    case "disabled":
      return {
        background: c.disabledBg,
        border: hairline,
        boxShadow: "none",
        color: c.disabledInk,
        cursor: "not-allowed",
      };
    default:
      return {
        background: c.surface,
        border: hairline,
        boxShadow: "none",
        color: c.value,
      };
  }
}

/** Label colour follows the control's state so the pair always reads together. */
export function getLabelColor(state: InputVisualState): string {
  if (state === "error") return INPUT_COLORS.errorLabel;
  if (state === "disabled") return INPUT_COLORS.disabledInk;
  return INPUT_COLORS.value;
}

/** Message colour — validation always pairs a colour with a message and an icon. */
export function getMessageColor(
  state: InputVisualState,
  hasError: boolean,
): string {
  if (hasError) return INPUT_COLORS.errorInk;
  switch (state) {
    case "success":
      return INPUT_COLORS.successInk;
    case "warning":
      return INPUT_COLORS.warningInk;
    case "validating":
      return INPUT_COLORS.validatingInk;
    default:
      return INPUT_COLORS.message;
  }
}

/**
 * Inert variant keys kept so existing calls such as
 * `inputWrapperVariants({ size: "md", state: "error" })` keep type-checking.
 * The metrics and colours they used to carry now ride on inline styles.
 */
const INERT_SIZE = { xs: "", sm: "", md: "", lg: "" } as const;
const INERT_STATE = {
  default: "",
  hover: "",
  focused: "",
  error: "",
  success: "",
  warning: "",
  validating: "",
  loading: "",
  disabled: "",
  readonly: "",
} as const;

/**
 * Structural classes only — the pixel metrics and colours ride on inline
 * styles. `underline` keeps its historic box-less treatment.
 */
export const inputWrapperVariants = cva(
  "relative flex w-full min-w-0",
  {
    variants: {
      multiline: {
        false: "items-center",
        true: "items-start",
      },
      appearance: {
        default: "",
        underline: "bg-transparent",
      },
      /** @deprecated Inert — sizing is applied inline. */
      size: INERT_SIZE,
      /** @deprecated Inert — state colours are applied inline. */
      state: INERT_STATE,
    },
    defaultVariants: { multiline: false, appearance: "default" },
  },
);

export const inputFieldVariants = cva(
  "w-full min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-100",
  {
    variants: {
      multiline: {
        false: "h-full",
        true: "block",
      },
      align: {
        left: "text-left",
        right: "text-right",
      },
      /** @deprecated Inert — sizing is applied inline. */
      size: INERT_SIZE,
      /** @deprecated Inert — the field no longer carries appearance classes. */
      appearance: { default: "", underline: "" },
      /** @deprecated Inert — affixes are laid out with flexbox, not padding. */
      hasLeftIcon: { true: "", false: "" },
      /** @deprecated Inert — affixes are laid out with flexbox, not padding. */
      hasRightIcon: { true: "", false: "" },
    },
    defaultVariants: { multiline: false, align: "left" },
  },
);

export const RESIZE_CLASS: Record<"none" | "vertical" | "horizontal" | "both", string> = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize",
};

/**
 * Retained for backward compatibility — the control now lays affixes out with
 * flexbox rather than absolute positioning, so nothing internal uses this.
 *
 * @deprecated Affixes are laid out inline; this will be removed in a future major.
 */
export const inputIconSlotVariants = cva("absolute inset-y-0 flex items-center", {
  variants: {
    side: { left: "left-0", right: "right-0" },
    /** @deprecated Inert — kept so existing calls keep type-checking. */
    size: INERT_SIZE,
    /** @deprecated Inert — kept so existing calls keep type-checking. */
    multiline: { true: "", false: "" },
  },
  defaultVariants: { side: "left" },
});

export type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>;
export type InputFieldVariants = VariantProps<typeof inputFieldVariants>;
export type InputIconSlotVariants = VariantProps<typeof inputIconSlotVariants>;

export const PATTERN_REGEX: Record<AllowPattern, string> = {
  alphanumeric: "[^a-zA-Z0-9]",
  alpha: "[^a-zA-Z ]",
  numeric: "[^0-9]",
  decimal: "[^0-9.]",
  phone: "[^0-9]",
  none: "(?!)",
};
