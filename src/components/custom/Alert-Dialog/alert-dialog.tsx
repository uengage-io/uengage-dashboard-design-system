import * as React from "react";
import { Check, X, AlertTriangle, Info, HelpCircle, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/custom/Button/button";
import {
  AlertDialog as AlertDialogPrimitive,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// ─────────────────────────────────────────────────────────────────────────────
// Icon badge
// ─────────────────────────────────────────────────────────────────────────────

const iconBadgeVariants = cva(
  [
    "relative inline-flex size-14 sm:size-20 items-center justify-center rounded-full",
    "before:absolute before:inset-[-6px] sm:before:inset-[-10px] before:rounded-full before:border",
  ].join(" "),
  {
    variants: {
      variant: {
        success:  "bg-emerald-50 text-emerald-600 before:border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:before:border-emerald-800",
        error:    "bg-red-50 text-red-500 before:border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:before:border-red-800",
        warning:  "bg-amber-50 text-amber-500 before:border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:before:border-amber-800",
        info:     "bg-sky-50 text-sky-500 before:border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:before:border-sky-800",
        question: "bg-violet-50 text-violet-600 before:border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:before:border-violet-800",
      },
    },
    defaultVariants: { variant: "info" },
  },
);

export { iconBadgeVariants as alertDialogIconBadgeVariants };

// ─────────────────────────────────────────────────────────────────────────────
// Public types
// ─────────────────────────────────────────────────────────────────────────────

/** Badge colour variants exposed to consumers (question is icon-only, not a colour override). */
export type AlertDialogVariant = "success" | "error" | "warning" | "info";
export type AlertDialogSize    = "sm" | "default";
export type AlertDialogInput   = "text" | "textarea";

/** All icon options: a variant string, "question", or any Lucide icon component. */
export type AlertDialogIconProp = AlertDialogVariant | "question" | LucideIcon;

/** Internal — includes question so the badge can render its own colour + animation. */
type BadgeVariant = AlertDialogVariant | "question";

const VARIANT_ICONS: Record<BadgeVariant, LucideIcon> = {
  success:  Check,
  error:    X,
  warning:  AlertTriangle,
  info:     Info,
  question: HelpCircle,
};

const ICON_ANIM: Record<BadgeVariant, string> = {
  success:  "uengage-icon-success",
  error:    "uengage-icon-error",
  warning:  "uengage-icon-warning",
  info:     "uengage-icon-info",
  question: "uengage-icon-question",
};

// ─────────────────────────────────────────────────────────────────────────────
// AlertDialogOptions — shared by both declarative and imperative APIs
// ─────────────────────────────────────────────────────────────────────────────

export interface AlertDialogOptions<TValue = string> {
  // ── Visual ──────────────────────────────────────────────────────────────────
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

  // ── Buttons ─────────────────────────────────────────────────────────────────
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

  // ── Behaviour ───────────────────────────────────────────────────────────────
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

  // ── Input ───────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// Internal body — shared between AlertDialog and SweetAlertProvider
// ─────────────────────────────────────────────────────────────────────────────

interface BodyProps<TValue> extends AlertDialogOptions<TValue> {
  inputValue: TValue;
  onInputChange: (v: TValue) => void;
  inputError: string | null;
  submitError: string | null;
  loading: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  className?: string;
  /** Forwarded to AlertDialogContent — prevents ESC close when needed */
  onEscapeKeyDown?: (e: any) => void;
  /** onClick on the backdrop overlay — used to trigger dismiss on outside click */
  overlayOnClick?: () => void;
}

function DialogBody<TValue = string>({
  icon, variant, title, text, description, size = "default",
  confirmButtonText = "OK", cancelButtonText = "Cancel",
  showCancelButton = false,
  confirmButtonVariant = "primary", cancelButtonVariant = "secondary",
  showActions = true, footer,
  input, inputPlaceholder,
  inputValue, onInputChange, inputError, submitError, loading,
  onConfirm, onDismiss, className,
  onEscapeKeyDown, overlayOnClick,
}: BodyProps<TValue>) {
  // Resolve badge colour — question gets its own violet badge, not info
  const resolvedVariant: BadgeVariant =
    (variant as BadgeVariant | undefined) ??
    (typeof icon === "string" && icon in VARIANT_ICONS
      ? (icon as BadgeVariant)
      : "info");

  // Resolve icon component
  const Icon: LucideIcon =
    typeof icon === "function"
      ? (icon as LucideIcon)
      : (VARIANT_ICONS[resolvedVariant] ?? Info);

  const bodyText = text ?? description;

  return (
    <AlertDialogContent
      size={size}
      aria-label="Alert dialog"
      className={cn(
        "gap-0 rounded-2xl border-0 shadow-2xl px-4 py-6 sm:px-8 sm:py-10 text-center",
        size === "sm" ? "sm:max-w-xs" : "sm:max-w-md",
        className,
      )}
      onEscapeKeyDown={onEscapeKeyDown}
      overlayProps={overlayOnClick ? { onClick: overlayOnClick } : undefined}
    >
      <div className="flex flex-col items-center gap-4 sm:gap-6">

        {/* ── Icon badge ── */}
        <div className={cn(iconBadgeVariants({ variant: resolvedVariant }), ICON_ANIM[resolvedVariant])}>
          <Icon className="size-7 sm:size-10" strokeWidth={2.5} aria-hidden />
        </div>

        {/* ── Title + body text ── */}
        <AlertDialogHeader className="gap-2 sm:text-center sm:place-items-center">
          <AlertDialogTitle className="text-xl sm:text-2xl font-semibold tracking-tight">
            {title}
          </AlertDialogTitle>
          {bodyText && (
            <AlertDialogDescription className="text-sm sm:text-base text-muted-foreground">
              {bodyText}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {/* ── Optional input field ── */}
        {input && (
          <div className="w-full text-left">
            {input === "textarea" ? (
              <textarea
                className="min-h-20 sm:min-h-24 w-full resize-none rounded-xl border bg-background px-3 sm:px-4 py-2 sm:py-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                placeholder={inputPlaceholder}
                value={String(inputValue ?? "")}
                onChange={(e) => onInputChange(e.target.value as TValue)}
                disabled={loading}
              />
            ) : (
              <input
                className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                placeholder={inputPlaceholder}
                value={String(inputValue ?? "")}
                onChange={(e) => onInputChange(e.target.value as TValue)}
                disabled={loading}
              />
            )}
            {inputError && (
              <p className="mt-2 text-sm text-destructive">{inputError}</p>
            )}
          </div>
        )}

        {/* ── Async error from preConfirm ── */}
        {submitError && (
          <div className="w-full rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-left text-sm text-destructive">
            {submitError}
          </div>
        )}

        {/* ── Footer ── */}
        {footer ? (
          <AlertDialogFooter className="w-full sm:justify-center">
            {footer}
          </AlertDialogFooter>
        ) : showActions !== false ? (
          <AlertDialogFooter className="w-full sm:justify-center">
            {showCancelButton && (
              <Button variant={cancelButtonVariant} disabled={loading} onClick={onDismiss} className="w-full sm:w-auto">
                {cancelButtonText}
              </Button>
            )}
            <Button variant={confirmButtonVariant} loading={loading} onClick={onConfirm} className="w-full sm:w-auto">
              {confirmButtonText}
            </Button>
          </AlertDialogFooter>
        ) : null}
      </div>
    </AlertDialogContent>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AlertDialog — declarative component
// ─────────────────────────────────────────────────────────────────────────────

export interface AlertDialogProps<TValue = string> extends AlertDialogOptions<TValue> {
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

export function AlertDialog<TValue = string>({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  trigger,
  defaultValue,
  inputValidator,
  preConfirm,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  autoCloseMs,
  className,
  ...options
}: AlertDialogProps<TValue>) {
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isControlled ? openProp! : uncontrolledOpen;

  const [inputValue, setInputValue]   = React.useState<TValue>((defaultValue ?? "") as TValue);
  const [inputError, setInputError]   = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [loading, setLoading]         = React.useState(false);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  // Reset internal state whenever the dialog (re)opens
  React.useEffect(() => {
    if (!open) return;
    setInputValue((defaultValue ?? "") as TValue);
    setInputError(null);
    setSubmitError(null);
    setLoading(false);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-close timer
  React.useEffect(() => {
    if (!open || !autoCloseMs || loading) return;
    const id = window.setTimeout(() => setOpen(false), autoCloseMs);
    return () => window.clearTimeout(id);
  }, [open, autoCloseMs, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const dismiss = React.useCallback(() => setOpen(false), [setOpen]);

  const confirm = React.useCallback(async () => {
    const validationError = inputValidator?.(inputValue);
    if (validationError) { setInputError(validationError); return; }

    if (!preConfirm) { setOpen(false); return; }

    try {
      setLoading(true);
      setSubmitError(null);
      await preConfirm(inputValue);
      setOpen(false);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }, [inputValue, inputValidator, preConfirm, setOpen]);

  return (
    <AlertDialogPrimitive open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <DialogBody
        {...options}
        defaultValue={defaultValue}
        inputValue={inputValue}
        onInputChange={(v) => { setInputValue(v); setInputError(null); setSubmitError(null); }}
        inputError={inputError}
        submitError={submitError}
        loading={loading}
        onConfirm={confirm}
        onDismiss={dismiss}
        className={className}
        onEscapeKeyDown={(e) => { if (!closeOnEsc) e.preventDefault(); }}
        overlayOnClick={closeOnOverlayClick ? dismiss : undefined}
      />
    </AlertDialogPrimitive>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SweetAlertProvider + useSweetAlert — imperative / Promise-based API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The value returned by `fire()`.
 * Check `isConfirmed` to know whether the user clicked the confirm button.
 *
 * @example
 * const result = await fire({ title: "Sure?" });
 * if (result.isConfirmed) { ... }
 */
export type SweetAlertResult<TValue = string> =
  | { isConfirmed: true;  isDismissed: false; value: TValue }
  | { isConfirmed: false; isDismissed: true;  value?: undefined };

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

const SweetAlertContext = React.createContext<SweetAlertContextValue | null>(null);

/** Access the imperative `fire()` method anywhere inside `<SweetAlertProvider>`. */
export function useSweetAlert() {
  const ctx = React.useContext(SweetAlertContext);
  if (!ctx) throw new Error("useSweetAlert must be used inside <SweetAlertProvider>");
  return ctx;
}

type PendingDialog<TValue = any> = {
  id: number;
  options: AlertDialogOptions<TValue>;
  resolve: (result: SweetAlertResult<TValue>) => void;
};

/**
 * Wrap your app (or a subtree) with this provider to enable `useSweetAlert()`.
 *
 * @example
 * <SweetAlertProvider>
 *   <App />
 * </SweetAlertProvider>
 */
export function SweetAlertProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = React.useState<PendingDialog[]>([]);
  const counter = React.useRef(0);

  const fire = React.useCallback(
    <TValue,>(options: AlertDialogOptions<TValue>) =>
      new Promise<SweetAlertResult<TValue>>((resolve) => {
        counter.current += 1;
        setQueue((q) => [...q, { id: counter.current, options, resolve: resolve as any }]);
      }),
    [],
  );

  const ctx = React.useMemo<SweetAlertContextValue>(() => ({ fire }), [fire]);

  return (
    <SweetAlertContext.Provider value={ctx}>
      {children}
      {queue[0] && (
        <SweetAlertInstance
          key={queue[0].id}
          pending={queue[0]}
          onDone={() => setQueue((q) => q.slice(1))}
        />
      )}
    </SweetAlertContext.Provider>
  );
}

/** Renders one queued dialog and resolves its promise on confirm / dismiss. */
function SweetAlertInstance({
  pending,
  onDone,
}: {
  pending: PendingDialog;
  onDone: () => void;
}) {
  const resolvedRef = React.useRef(false);

  const handlePreConfirm = React.useCallback(
    async (value: any) => {
      await pending.options.preConfirm?.(value as any);
      // Mark as resolved BEFORE setOpen(false) fires onOpenChange
      resolvedRef.current = true;
      pending.resolve({ isConfirmed: true, isDismissed: false, value: value as any });
      onDone();
    },
    [pending, onDone],
  );

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!next && !resolvedRef.current) {
        pending.resolve({ isConfirmed: false, isDismissed: true });
        onDone();
      }
    },
    [pending, onDone],
  );

  return (
    <AlertDialog
      {...pending.options}
      open
      preConfirm={handlePreConfirm}
      onOpenChange={handleOpenChange}
    />
  );
}
