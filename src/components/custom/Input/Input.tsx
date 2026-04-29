import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input as I } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  inputWrapperVariants,
  inputFieldVariants,
  inputIconSlotVariants,
  PATTERN_REGEX,
} from "./inputVariants";
import type { CustomInputProps } from "@/types/input";
import { InputLabel } from "./InputLabel";
import { InputHelper } from "./InputHelper";
import { useFuzzySearch } from "@/utils/useFuzzySearch";

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
  className,
  disabled,
  readOnly,
  validationRegex,
  validationMessage,
  onTouch,
  spellCheck = true,
  id,
  onChange,
  onFocus,
  onBlur,
  suggestions,
  onSuggestionSelect,
  ...rest
}: CustomInputComposedProps) {
  const reactId = React.useId();
  const inputId = id ?? reactId;

  const [focused, setFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [internalError, setInternalError] = React.useState<string | undefined>(undefined);
  const touchedRef = React.useRef(false);

  // Track typed value separately so Fuse.js always has the latest query.
  // Supports both controlled (rest.value) and uncontrolled (rest.defaultValue) inputs.
  const isControlled = rest.value !== undefined;
  const [uncontrolledQuery, setUncontrolledQuery] = React.useState(
    String(rest.defaultValue ?? ""),
  );
  const suggestionQuery = isControlled ? String(rest.value ?? "") : uncontrolledQuery;
  const fuseResults = useFuzzySearch(suggestions ?? [], suggestionQuery);
  const showSuggestions =
    !!suggestions?.length && focused && fuseResults.length > 0 && suggestionQuery.trim().length > 0;

  const wrapperRef = React.useRef<HTMLDivElement>(null);

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
        className="pointer-events-auto inline-flex items-center justify-center text-gray-400 hover:text-gray-600"
      >
        {showPassword ? (
          <EyeOff strokeWidth={2} />
        ) : (
          <Eye strokeWidth={2} />
        )}
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
      if (stripped !== raw) e.target.value = stripped;
    }
    if (internalError) setInternalError(runValidation(e.target));
    if (!isControlled) setUncontrolledQuery(e.target.value);
    onChange?.(e);
  };

  const handleSuggestionSelect = (item: { label: string; value: string }) => {
    // Sync uncontrolled query; controlled inputs are updated by the consumer via onChange.
    if (!isControlled) setUncontrolledQuery(item.label);
    onSuggestionSelect?.(item.value);
  };

  const describedById = effectiveError
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-helper`
      : undefined;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", width, className)}>
      {label && (
        <InputLabel htmlFor={inputId} size={size} required={required}>
          {label}
        </InputLabel>
      )}

      {/* relative wrapper scopes the suggestions dropdown */}
      <div ref={wrapperRef} className="relative">
        <div className={cn(inputWrapperVariants({ size, state }))}>
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
            spellCheck={spellCheck}
            aria-autocomplete={suggestions ? "list" : undefined}
            aria-invalid={Boolean(effectiveError) || undefined}
            aria-describedby={describedById}
            onChange={handleChange}
            onWheel={(e) => {
              if (e.currentTarget.type === "number") e.currentTarget.blur();
            }}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              // Small delay so click on a suggestion fires before we lose focus
              setTimeout(() => {
                if (!wrapperRef.current?.contains(document.activeElement)) {
                  setFocused(false);
                }
              }, 100);
              setInternalError(runValidation(e.target));
              if (!touchedRef.current) {
                touchedRef.current = true;
                onTouch?.();
              }
              onBlur?.(e);
            }}
            className={cn(inputFieldVariants({ size, hasLeftIcon, hasRightIcon }))}
          />

          {hasRightIcon && (
            <span className={cn(inputIconSlotVariants({ size, side: "right" }))}>
              {resolvedRightIcon}
            </span>
          )}
        </div>

        {showSuggestions && (
          <ul
            role="listbox"
            className="absolute left-0 top-full z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-[#E5E7EB] bg-white shadow-lg"
          >
            {fuseResults.map((item) => (
              <li key={item.value} role="option" aria-selected={false}>
                <button
                  type="button"
                  // onMouseDown keeps focus on the input so onBlur doesn't fire before onClick
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSuggestionSelect(item)}
                  className="w-full text-left px-3 py-2 text-sm text-[#374151] hover:bg-[#F3F4F6] transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
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
