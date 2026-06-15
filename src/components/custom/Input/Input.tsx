import * as React from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Input as I } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  inputWrapperVariants,
  inputFieldVariants,
  inputIconSlotVariants,
  PATTERN_REGEX,
  RESIZE_CLASS,
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
  clearable,
  onClear,
  multiline = false,
  rows = 3,
  resize = "vertical",
  ...rest
}: CustomInputComposedProps) {
  const reactId = React.useId();
  const inputId = id ?? reactId;

  const [focused, setFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [internalError, setInternalError] = React.useState<string | undefined>(undefined);
  const touchedRef = React.useRef(false);

  const isControlled = rest.value !== undefined;
  const [uncontrolledQuery, setUncontrolledQuery] = React.useState(
    String(rest.defaultValue ?? ""),
  );
  const suggestionQuery = isControlled ? String(rest.value ?? "") : uncontrolledQuery;
  const fuseResults = useFuzzySearch(suggestions ?? [], suggestionQuery);
  const showSuggestions =
    !multiline &&
    !!suggestions?.length &&
    focused &&
    fuseResults.length > 0 &&
    suggestionQuery.trim().length > 0;

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const runValidation = (el: HTMLInputElement | HTMLTextAreaElement): string | undefined => {
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

  const isPassword = !multiline && inputType === "password";
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

  const showClear = Boolean(clearable) && !disabled && !readOnly && suggestionQuery.length > 0;

  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledQuery("");
      const ref = multiline ? textareaRef.current : inputRef.current;
      if (ref) ref.value = "";
    }
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    onClear?.();
  };

  const hasLeftIcon = Boolean(leftIcon);
  const hasOriginalRightIcon = Boolean(resolvedRightIcon);
  const hasRightIcon = hasOriginalRightIcon || showClear;
  const hasDoubleRightIcon = hasOriginalRightIcon && showClear;

  const doubleRightPadding = hasDoubleRightIcon
    ? ({ sm: "pr-14", md: "pr-16", lg: "pr-20" } as Record<string, string>)[size]
    : undefined;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (allowPattern && allowPattern !== "none") {
      const raw = e.target.value;
      const regex = new RegExp(PATTERN_REGEX[allowPattern], "g");
      let stripped = raw.replace(regex, "");
      if (allowPattern === "phone" && stripped.length > 10) stripped = stripped.slice(0, 10);
      if (stripped !== raw) e.target.value = stripped;
    }
    if (internalError) setInternalError(runValidation(e.target as HTMLInputElement));
    if (!isControlled) setUncontrolledQuery(e.target.value);
    onChange?.(e);
  };

  const handleSuggestionSelect = (item: { label: string; value: string }) => {
    if (!isControlled) setUncontrolledQuery(item.label);
    onSuggestionSelect?.(item.value);
  };

  const describedById = effectiveError
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-helper`
      : undefined;

  const fieldClass = cn(
    inputFieldVariants({ size, multiline, hasLeftIcon, hasRightIcon }),
    doubleRightPadding,
  );

  return (
    <div className={cn("flex flex-col gap-1.5 min-w-0", width, className)}>
      {label && (
        <InputLabel htmlFor={inputId} size={size} required={required}>
          {label}
        </InputLabel>
      )}

      <div ref={wrapperRef} className="relative">
        <div className={cn(inputWrapperVariants({ size, multiline, state }))}>
          {hasLeftIcon && (
            <span
              className={cn(
                inputIconSlotVariants({ size, side: "left", multiline }),
                "pointer-events-none",
              )}
            >
              {leftIcon}
            </span>
          )}

          {multiline ? (
            <textarea
              {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              ref={textareaRef}
              id={inputId}
              rows={rows}
              disabled={disabled}
              readOnly={readOnly}
              spellCheck={spellCheck}
              aria-invalid={Boolean(effectiveError) || undefined}
              aria-describedby={describedById}
              onChange={handleChange}
              onFocus={(e) => {
                setFocused(true);
                onFocus?.(e as unknown as React.FocusEvent<HTMLInputElement>);
              }}
              onBlur={(e) => {
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
                onBlur?.(e as unknown as React.FocusEvent<HTMLInputElement>);
              }}
              className={cn(fieldClass, RESIZE_CLASS[resize], "min-h-[80px]")}
            />
          ) : (
            <I
              {...rest}
              ref={inputRef}
              id={inputId}
              type={effectiveType}
              disabled={disabled}
              readOnly={readOnly}
              spellCheck={spellCheck}
              aria-autocomplete={suggestions ? "list" : undefined}
              aria-invalid={Boolean(effectiveError) || undefined}
              aria-describedby={describedById}
              onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
              onWheel={(e) => {
                if (e.currentTarget.type === "number") e.currentTarget.blur();
              }}
              onFocus={(e) => {
                setFocused(true);
                onFocus?.(e);
              }}
              onBlur={(e) => {
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
              className={fieldClass}
            />
          )}

          {hasRightIcon && (
            <span className={cn(inputIconSlotVariants({ size, side: "right", multiline }))}>
              <span className="flex items-center gap-1">
                {showClear && (
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label="Clear"
                    onClick={handleClear}
                    className="pointer-events-auto inline-flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X strokeWidth={2} />
                  </button>
                )}
                {resolvedRightIcon}
              </span>
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
