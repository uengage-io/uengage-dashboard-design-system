import * as React from "react";
import { Check, CircleAlert, Eye, EyeOff, Lock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AFFIX_GAP,
  INPUT_COLORS,
  INPUT_SIZES,
  INPUT_TRANSITION,
  PATTERN_REGEX,
  RESIZE_CLASS,
  getInputBoxStyle,
  getLabelColor,
  inputFieldVariants,
  resolveInputState,
} from "./inputVariants";
import type { CustomInputProps } from "@/types/input";
import { InputLabel } from "./InputLabel";
import { InputHelper } from "./InputHelper";
import { useFuzzySearch } from "@/utils/useFuzzySearch";

interface CustomInputComposedProps extends CustomInputProps {
  required?: boolean;
}

/** The counter turns amber once the value passes this share of `maxLength`. */
const COUNT_WARN_RATIO = 0.83;

/** Async indicator used by both `status="validating"` and `loading`. */
function Spinner({ size }: { size: number }) {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 animate-spin rounded-full"
      style={{
        width: size,
        height: size,
        border: `2px solid ${INPUT_COLORS.border}`,
        borderTopColor: INPUT_COLORS.borderFocus,
      }}
    />
  );
}

/** Boxed affix — sits inside the same 1px box, on a subtle fill. */
function Affix({
  children,
  side,
  padX,
  fontSize,
}: {
  children: React.ReactNode;
  side: "left" | "right";
  padX: number;
  fontSize: number;
}) {
  return (
    <span
      className="flex shrink-0 items-center self-stretch font-semibold"
      style={{
        padding: `0 ${padX}px`,
        background: INPUT_COLORS.subtle,
        color: side === "left" ? INPUT_COLORS.value : INPUT_COLORS.message,
        fontSize: side === "left" ? fontSize : fontSize - 1,
        [side === "left" ? "borderRight" : "borderLeft"]:
          `1px solid ${INPUT_COLORS.border}`,
      }}
    >
      {children}
    </span>
  );
}

function Input({
  size = "md",
  variant = "default",
  inputType = "text",
  allowPattern,
  label,
  helperText,
  error,
  status,
  statusMessage,
  prefix,
  suffix,
  loading = false,
  showCount,
  align = "left",
  boxStyle,
  reserveMessageSpace = false,
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
  const spec = INPUT_SIZES[size];

  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [internalError, setInternalError] = React.useState<string | undefined>(undefined);
  const touchedRef = React.useRef(false);

  const isControlled = rest.value !== undefined;
  const [uncontrolledQuery, setUncontrolledQuery] = React.useState(
    String(rest.defaultValue ?? ""),
  );
  const currentValue = isControlled ? String(rest.value ?? "") : uncontrolledQuery;

  const fuseResults = useFuzzySearch(suggestions ?? [], currentValue);
  const showSuggestions =
    !multiline &&
    !!suggestions?.length &&
    focused &&
    fuseResults.length > 0 &&
    currentValue.trim().length > 0;

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const runValidation = (el: HTMLInputElement | HTMLTextAreaElement): string | undefined => {
    if (!el.validity.valid) {
      return validationMessage ?? el.validationMessage ?? "Invalid value";
    }
    if (validationRegex && el.value) {
      const re =
        typeof validationRegex === "string" ? new RegExp(validationRegex) : validationRegex;
      if (!re.test(el.value)) {
        return validationMessage ?? "Invalid format";
      }
    }
    return undefined;
  };

  const effectiveError = error ?? internalError;
  const interactionBlocked = Boolean(disabled) || loading;

  const state = resolveInputState({
    disabled,
    readOnly,
    loading,
    error: effectiveError,
    status,
    focused,
    hovered,
  });

  const box = getInputBoxStyle(state);
  const isUnderline = variant === "underline";

  const isPassword = !multiline && inputType === "password";
  const effectiveType = isPassword && showPassword ? "text" : inputType;

  const showClear =
    Boolean(clearable) && !interactionBlocked && !readOnly && currentValue.length > 0;

  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledQuery("");
      const ref = multiline ? textareaRef.current : inputRef.current;
      if (ref) ref.value = "";
    }
    onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    onClear?.();
  };

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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimeout(() => {
      if (!wrapperRef.current?.contains(document.activeElement)) setFocused(false);
    }, 100);
    setInternalError(runValidation(e.target));
    if (!touchedRef.current) {
      touchedRef.current = true;
      onTouch?.();
    }
    onBlur?.(e as React.FocusEvent<HTMLInputElement>);
  };

  // ── Character counter ───────────────────────────────────────────────
  const maxLength = rest.maxLength;
  const counterEnabled = showCount ?? maxLength !== undefined;
  const showCounter = counterEnabled && maxLength !== undefined;
  const count = currentValue.length;
  const counterColor =
    count > maxLength! * COUNT_WARN_RATIO ? INPUT_COLORS.warningInk : INPUT_COLORS.message;
  const counterNode = showCounter ? (
    <span
      className="shrink-0 font-medium tabular-nums"
      style={{ fontSize: spec.message, color: counterColor }}
    >
      {count}/{maxLength}
    </span>
  ) : null;

  // ── Trailing adornments ─────────────────────────────────────────────
  // An explicit `rightIcon` replaces the automatic eye toggle, as it always has.
  const passwordToggle = isPassword && rightIcon === undefined && !interactionBlocked && !readOnly && (
    <button
      type="button"
      tabIndex={-1}
      aria-label={showPassword ? "Hide password" : "Show password"}
      onClick={() => setShowPassword((s) => !s)}
      className="flex shrink-0 items-center justify-center rounded-[4px] transition-colors hover:bg-[#F5FFF0]"
      style={{ width: spec.icon + 8, height: spec.icon + 8, color: INPUT_COLORS.icon }}
    >
      {showPassword ? (
        <EyeOff strokeWidth={2} size={spec.icon - 1} />
      ) : (
        <Eye strokeWidth={2} size={spec.icon - 1} />
      )}
    </button>
  );

  const statusAdornment = (() => {
    if (state === "loading" || state === "validating") return <Spinner size={spec.icon - 2} />;
    if (state === "readonly")
      return <Lock aria-hidden="true" strokeWidth={2} size={spec.icon - 2} color={INPUT_COLORS.placeholder} />;
    if (effectiveError)
      return (
        <CircleAlert
          aria-hidden="true"
          strokeWidth={2.2}
          size={spec.icon - 1}
          color={INPUT_COLORS.errorInk}
        />
      );
    if (status === "warning")
      return (
        <CircleAlert
          aria-hidden="true"
          strokeWidth={2.2}
          size={spec.icon - 1}
          color={INPUT_COLORS.warningInk}
        />
      );
    if (status === "success")
      return (
        <Check
          aria-hidden="true"
          strokeWidth={2.6}
          size={spec.icon - 1}
          color={INPUT_COLORS.successInk}
        />
      );
    return null;
  })();

  const clearButton = showClear && (
    <button
      type="button"
      tabIndex={-1}
      aria-label="Clear"
      onClick={handleClear}
      className="flex shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[#DCF3CE]"
      style={{
        width: spec.icon + 4,
        height: spec.icon + 4,
        background: INPUT_COLORS.subtle,
        color: INPUT_COLORS.message,
      }}
    >
      <X strokeWidth={3} size={spec.icon - 6} />
    </button>
  );

  const glyph = (node: React.ReactNode) => (
    <span
      className="flex shrink-0 items-center justify-center [&>svg]:size-full"
      style={{ width: spec.icon, height: spec.icon, color: INPUT_COLORS.icon }}
    >
      {node}
    </span>
  );

  const hasTrailing = Boolean(
    counterNode || clearButton || statusAdornment || passwordToggle || rightIcon,
  );

  // ── Message row ─────────────────────────────────────────────────────
  const message = effectiveError ?? (status && statusMessage) ?? helperText;
  // Same id scheme as before the design refresh, so anything keyed on
  // `${id}-error` / `${id}-helper` keeps resolving.
  const describedById = effectiveError
    ? `${inputId}-error`
    : message
      ? `${inputId}-helper`
      : undefined;

  const resolvedBoxStyle: React.CSSProperties = isUnderline
    ? {
        background: "transparent",
        borderBottom: box.border,
        borderRadius: 0,
        color: box.color,
        cursor: box.cursor,
        transition: INPUT_TRANSITION,
        height: multiline ? undefined : spec.height,
      }
    : {
        background: box.background,
        border: box.border,
        borderRadius: spec.radius,
        boxShadow: box.boxShadow,
        color: box.color,
        cursor: box.cursor,
        transition: INPUT_TRANSITION,
        height: multiline ? undefined : spec.height,
      };

  const fieldStyle: React.CSSProperties = {
    fontSize: spec.font,
    color: box.color,
    lineHeight: multiline ? 1.5 : 1,
    cursor: box.cursor,
  };

  const innerPadding = isUnderline
    ? { paddingLeft: 0, paddingRight: 0 }
    : {
        paddingLeft: prefix ? spec.padX - 2 : spec.padX,
        paddingRight: suffix ? spec.padX - 2 : spec.padX,
      };

  const sharedFieldProps = {
    "data-slot": "input",
    id: inputId,
    disabled: disabled,
    readOnly: readOnly || loading,
    spellCheck,
    "aria-invalid": Boolean(effectiveError) || undefined,
    "aria-describedby": describedById,
    "aria-busy": (loading || status === "validating") || undefined,
    onChange: handleChange,
    onBlur: handleBlur,
  };

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", width, className)}>
      {(label || (counterNode && multiline)) && (
        <span className="flex items-center gap-2">
          {label && (
            <InputLabel
              htmlFor={inputId}
              size={size}
              required={required}
              tone={getLabelColor(state)}
            >
              {label}
            </InputLabel>
          )}
          {counterNode && multiline && <span className="ml-auto">{counterNode}</span>}
        </span>
      )}

      <div ref={wrapperRef} className="relative">
        <div
          data-slot="input-box"
          data-size={size}
          data-state={state}
          data-variant={variant}
          className={cn(
            "flex w-full min-w-0",
            multiline ? "items-start" : "items-center",
            !isUnderline && "overflow-hidden",
            interactionBlocked && "pointer-events-none",
          )}
          style={{ ...resolvedBoxStyle, ...boxStyle }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          {prefix && !isUnderline && (
            <Affix side="left" padX={spec.padX - 2} fontSize={spec.font}>
              {prefix}
            </Affix>
          )}

          <span
            className={cn(
              "flex min-w-0 flex-1",
              multiline ? "items-start" : "items-center",
              multiline && "self-stretch",
            )}
            style={{
              gap: AFFIX_GAP,
              ...innerPadding,
              paddingTop: multiline ? spec.padX - 2 : undefined,
              paddingBottom: multiline ? spec.padX - 2 : undefined,
            }}
          >
            {leftIcon && glyph(leftIcon)}

            {multiline ? (
              <textarea
                {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                {...sharedFieldProps}
                ref={textareaRef}
                rows={rows}
                onFocus={(e) => handleFocus(e as unknown as React.FocusEvent<HTMLInputElement>)}
                className={cn(
                  inputFieldVariants({ multiline: true, align }),
                  RESIZE_CLASS[resize],
                )}
                style={{ ...fieldStyle, minHeight: 76 }}
              />
            ) : (
              <input
                {...rest}
                {...sharedFieldProps}
                ref={inputRef}
                type={effectiveType}
                aria-autocomplete={suggestions ? "list" : undefined}
                onWheel={(e) => {
                  if (e.currentTarget.type === "number") e.currentTarget.blur();
                }}
                onFocus={handleFocus}
                className={inputFieldVariants({ multiline: false, align })}
                style={fieldStyle}
              />
            )}

            {hasTrailing && (
              <span
                className={cn("flex shrink-0 items-center", multiline && "self-start")}
                style={{ gap: 6 }}
              >
                {counterNode && !multiline && counterNode}
                {clearButton}
                {statusAdornment}
                {passwordToggle}
                {rightIcon && glyph(rightIcon)}
              </span>
            )}
          </span>

          {suffix && !isUnderline && (
            <Affix side="right" padX={spec.padX - 2} fontSize={spec.font}>
              {suffix}
            </Affix>
          )}
        </div>

        {showSuggestions && (
          <ul
            role="listbox"
            className="absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-y-auto p-1"
            style={{
              borderRadius: spec.radius,
              border: `1px solid ${INPUT_COLORS.border}`,
              background: INPUT_COLORS.surface,
              boxShadow: "2px 2px 4px rgba(0,0,0,.12)",
            }}
          >
            {fuseResults.map((item) => (
              <li key={item.value} role="option" aria-selected={false}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSuggestionSelect(item)}
                  className="w-full rounded-[6px] px-2.5 py-2 text-left font-medium transition-colors hover:bg-[#FAFFF7]"
                  style={{ fontSize: spec.font, color: INPUT_COLORS.value }}
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
        state={state}
        helperText={message}
        error={effectiveError}
        reserveSpace={reserveMessageSpace}
      />
    </div>
  );
}

Input.displayName = "Input";

export { Input };
export type { CustomInputComposedProps };
