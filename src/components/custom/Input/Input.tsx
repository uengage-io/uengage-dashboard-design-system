import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input as I } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toCssSize } from "@/utils/layoutTokens";
import {
  inputWrapperVariants,
  inputFieldVariants,
  inputIconSlotVariants,
  PATTERN_REGEX,
} from "./inputVariants";
import type { CustomInputProps } from "@/types/input";
import { InputLabel } from "./InputLabel";
import { InputHelper } from "./InputHelper";

interface CustomInputComposedProps extends CustomInputProps {
  required?: boolean;
}

function Input({
  size = "md",
  inputType = "text",
  allowPattern,
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  required,
  width,
  height,
  className,
  disabled,
  readOnly,
  validationRegex,
  validationMessage,
  id,
  onChange,
  onFocus,
  onBlur,
  ...rest
}: CustomInputComposedProps) {
  const reactId = React.useId();
  const inputId = id ?? reactId;

  const [focused, setFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [internalError, setInternalError] = React.useState<string | undefined>(
    undefined,
  );

  const runValidation = (el: HTMLInputElement): string | undefined => {
    if (!el.validity.valid) {
      return validationMessage ?? el.validationMessage ?? "Invalid value";
    }
    if (validationRegex && el.value) {
      const re =
        typeof validationRegex === "string"
          ? new RegExp(validationRegex)
          : validationRegex;
      if (!re.test(el.value)) {
        return validationMessage ?? "Invalid format";
      }
    }
    return undefined;
  };

  const effectiveError = error ?? internalError;

  const isPassword = inputType === "password";
  const effectiveType = isPassword && showPassword ? "text" : inputType;

  const resolvedRightIcon = React.useMemo(() => {
    if (rightIcon !== undefined) return rightIcon;
    if (!isPassword) return null;
    return (
      <button
        type="button"
        tabIndex={-1}
        aria-label={showPassword ? "Hide password" : "Show password"}
        onClick={() => setShowPassword((s) => !s)}
        className="pointer-events-auto inline-flex items-center justify-center text-slate-400 hover:text-slate-600"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    );
  }, [rightIcon, isPassword, showPassword]);

  const state:
    | "default"
    | "focused"
    | "error"
    | "disabled"
    | "readonly" = disabled
    ? "disabled"
    : readOnly
      ? "readonly"
      : effectiveError
        ? "error"
        : focused
          ? "focused"
          : "default";

  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(resolvedRightIcon);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (allowPattern && allowPattern !== "none") {
      const raw = e.target.value;
      const regex = new RegExp(PATTERN_REGEX[allowPattern], "g");
      const stripped = raw.replace(regex, "");
      if (stripped !== raw) {
        e.target.value = stripped;
      }
    }
    if (internalError) {
      const next = runValidation(e.target);
      setInternalError(next);
    }
    onChange?.(e);
  };

  const describedById = effectiveError
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-helper`
      : undefined;

  const outerStyle: React.CSSProperties | undefined =
    width != null ? { width: toCssSize(width) } : undefined;
  const wrapperStyle: React.CSSProperties | undefined =
    height != null ? { height: toCssSize(height) } : undefined;

  return (
    <div
      className={cn("flex w-full flex-col gap-1.5", className)}
      style={outerStyle}
    >
      {label && (
        <InputLabel htmlFor={inputId} size={size} required={required}>
          {label}
        </InputLabel>
      )}

      <div
        className={cn(inputWrapperVariants({ size, state }))}
        style={wrapperStyle}
      >
        {hasLeftIcon && (
          <span
            className={cn(
              inputIconSlotVariants({ size, side: "left" }),
              "pointer-events-none",
            )}
          >
            {leftIcon}
          </span>
        )}

        <I
          {...rest}
          id={inputId}
          type={effectiveType}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={Boolean(effectiveError) || undefined}
          aria-describedby={describedById}
          onChange={handleChange}
          onWheel={(e) => {
            if (e.currentTarget.type === "number") {
              e.currentTarget.blur();
            }
          }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            setInternalError(runValidation(e.target));
            onBlur?.(e);
          }}
          className={cn(
            inputFieldVariants({ size, hasLeftIcon, hasRightIcon }),
          )}
        />

        {hasRightIcon && (
          <span className={cn(inputIconSlotVariants({ size, side: "right" }))}>
            {resolvedRightIcon}
          </span>
        )}
      </div>

      <InputHelper
        id={describedById}
        size={size}
        helperText={helperText}
        error={effectiveError}
      />
    </div>
  );
}

Input.displayName = "Input";

export { Input };
export type { CustomInputComposedProps };
