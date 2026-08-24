import * as React from "react";

export interface ColorPickerProps {
  /** Controlled color value as a hex string (`#RRGGBB` or `#RRGGBBAA`). */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Called with the new hex string whenever the color changes. */
  onChange?: (hex: string) => void;
  /** Shows an alpha (opacity) slider and includes alpha in the emitted hex. Defaults to false. */
  alpha?: boolean;
  /** Optional row of preset swatches shown below the picker for quick selection. */
  presets?: string[];
  placeholder?: string;
  /** Controls the trigger height via a preset. */
  size?: "sm" | "md" | "lg";
  /**
   * Tailwind width class(es) applied to the trigger wrapper. Use any responsive
   * utility (e.g. `"w-full md:w-48"`). Defaults to `w-full` when omitted.
   */
  width?: string;
  className?: string;
  disabled?: boolean;
  /** When true, the trigger shows the current value but the picker cannot be opened. */
  readOnly?: boolean;
  /** Fires once the first time the trigger is blurred after interacting (Angular-style `touched`). */
  onTouch?: () => void;
  /** Field label rendered above the trigger. */
  label?: React.ReactNode;
  /** When true, appends a red asterisk directly after the label text. */
  required?: boolean;
  /** Helper text rendered below the trigger. */
  helperText?: string;
  /** Error message rendered below the trigger; takes priority over helperText. */
  error?: string;
  /** Controlled popover open state. */
  open?: boolean;
  /** Called whenever the popover wants to open or close. */
  onOpenChange?: (open: boolean) => void;
}

export type ColorPickerFormat = "hex" | "rgb" | "hsl";
