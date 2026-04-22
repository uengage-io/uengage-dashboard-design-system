import * as React from "react";
import {
  Check,
  X,
  AlertTriangle,
  Info,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
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

const statusBadgeVariants = cva(
  [
    "relative inline-flex size-20 items-center justify-center rounded-full",
    "before:absolute before:inset-[-10px] before:rounded-full before:border",
  ].join(" "),
  {
    variants: {
      variant: {
        success:
          "bg-emerald-50 text-emerald-600 before:border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:before:border-emerald-900/60",
        error:
          "bg-red-50 text-red-600 before:border-red-100 dark:bg-red-950/40 dark:text-red-400 dark:before:border-red-900/60",
        warning:
          "bg-amber-50 text-amber-600 before:border-amber-100 dark:bg-amber-950/40 dark:text-amber-400 dark:before:border-amber-900/60",
        info: "bg-sky-50 text-sky-600 before:border-sky-100 dark:bg-sky-950/40 dark:text-sky-400 dark:before:border-sky-900/60",
      },
    },
    defaultVariants: { variant: "success" },
  },
);

type StatusVariant = NonNullable<
  VariantProps<typeof statusBadgeVariants>["variant"]
>;

const defaultIconMap: Record<StatusVariant, LucideIcon> = {
  success: Check,
  error: X,
  warning: AlertTriangle,
  info: Info,
};

export interface StatusAlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;

  variant?: StatusVariant;
  icon?: LucideIcon;

  title: React.ReactNode;
  description?: React.ReactNode;

  footer?: React.ReactNode;

  className?: string;
}

export function StatusAlertDialog({
  open,
  onOpenChange,
  trigger,
  variant = "success",
  icon,
  title,
  description,
  footer,
  className,
}: StatusAlertDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
      trigger={trigger}
      variant={variant}
      icon={icon}
      title={title}
      description={description}
      footer={footer}
      className={className}
      showActions={!!footer}
    />
  );
}

export type StatusAlertDialogVariantProps = Omit<
  StatusAlertDialogProps,
  "variant"
>;

export const SuccessAlertDialog = (props: StatusAlertDialogVariantProps) => (
  <StatusAlertDialog variant="success" {...props} />
);

export { statusBadgeVariants };

type SweetAlertIcon = StatusVariant | "question";

type SweetAlertInput = "text" | "textarea";

export type SweetAlertResult<TValue = string> =
  | { isConfirmed: true; isDismissed: false; value?: TValue }
  | { isConfirmed: false; isDismissed: true; value?: undefined };

export type SweetAlertSize = "sm" | "default";

export interface SweetAlertOptions<TValue = string> {
  /**
   * If you pass a string status/icon-key we will use the built-in icons.
   * If you pass a Lucide icon component we will render it as-is.
   */
  icon?: SweetAlertIcon | LucideIcon;
  title: React.ReactNode;
  text?: React.ReactNode;
  description?: React.ReactNode;
  variant?: StatusVariant;

  size?: SweetAlertSize;

  confirmButtonText?: React.ReactNode;
  cancelButtonText?: React.ReactNode;
  showCancelButton?: boolean;

  confirmButtonVariant?: ButtonProps["variant"];
  cancelButtonVariant?: ButtonProps["variant"];

  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;

  input?: SweetAlertInput;
  inputPlaceholder?: string;
  defaultValue?: TValue;

  footer?: React.ReactNode;
  /**
   * If `false`, we hide the default confirm/cancel buttons.
   * Useful for status-only dialogs where actions are provided via `footer`.
   */
  showActions?: boolean;

  /**
   * Return a string to show an inline validation message and block confirm.
   * Return null/undefined to allow confirm.
   */
  inputValidator?: (value: TValue) => string | null | undefined;

  /**
   * Called when user clicks confirm. If it throws/rejects, dialog stays open
   * and the error message is shown.
   */
  preConfirm?: (value: TValue) => void | Promise<void>;
}

type SweetAlertInternalState<TValue> = {
  open: boolean;
  options: SweetAlertOptions<TValue> | null;
  resolve: ((result: SweetAlertResult<TValue>) => void) | null;
};

type SweetAlertContextValue = {
  fire: <TValue = string>(
    options: SweetAlertOptions<TValue>,
  ) => Promise<SweetAlertResult<TValue>>;
};

const SweetAlertContext = React.createContext<SweetAlertContextValue | null>(
  null,
);

export function useSweetAlert() {
  const ctx = React.useContext(SweetAlertContext);
  if (!ctx) {
    throw new Error("useSweetAlert must be used within SweetAlertProvider");
  }
  return ctx;
}

export function SweetAlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<SweetAlertInternalState<any>>({
    open: false,
    options: null,
    resolve: null,
  });

  const fire = React.useCallback(
    <TValue,>(options: SweetAlertOptions<TValue>) => {
      return new Promise<SweetAlertResult<TValue>>((resolve) => {
        setState({ open: true, options, resolve });
      });
    },
    [],
  );

  const contextValue = React.useMemo<SweetAlertContextValue>(
    () => ({ fire }),
    [fire],
  );

  return (
    <SweetAlertContext.Provider value={contextValue}>
      {children}
      <SweetAlertInstance
        state={state}
        setState={setState as React.Dispatch<
          React.SetStateAction<SweetAlertInternalState<unknown>>
        >}
      />
    </SweetAlertContext.Provider>
  );
}

function SweetAlertInstance({
  state,
  setState,
}: {
  state: SweetAlertInternalState<unknown>;
  setState: React.Dispatch<React.SetStateAction<SweetAlertInternalState<unknown>>>;
}) {
  const options = state.options as SweetAlertOptions<any> | null;
  const resolve = state.resolve as
    | ((result: SweetAlertResult<any>) => void)
    | null;

  const [inputValue, setInputValue] = React.useState<any>(
    options?.defaultValue ?? "",
  );
  const [inputError, setInputError] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!state.open) return;
    setInputValue(options?.defaultValue ?? "");
    setInputError(null);
    setSubmitError(null);
    setLoading(false);
  }, [state.open, options?.defaultValue]);

  const close = React.useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, [setState]);

  const dismiss = React.useCallback(() => {
    if (resolve) resolve({ isConfirmed: false, isDismissed: true });
    close();
  }, [close, resolve]);

  const confirm = React.useCallback(async () => {
    if (!options) return;
    const value = inputValue;

    const validation = options.inputValidator?.(value);
    if (validation) {
      setInputError(validation);
      return;
    }

    try {
      setLoading(true);
      setSubmitError(null);
      await options.preConfirm?.(value);
      resolve?.({ isConfirmed: true, isDismissed: false, value });
      close();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setSubmitError(message);
      setLoading(false);
    }
  }, [close, inputValue, options, resolve]);

  if (!options) return null;

  const iconProp = options.icon;
  const iconKey =
    typeof iconProp === "string" ? (iconProp as SweetAlertIcon) : undefined;
  const Icon =
    typeof iconProp === "function"
      ? iconProp
      : iconKey === "question"
        ? HelpCircle
        : defaultIconMap[(iconKey as StatusVariant) ?? "info"];

  const badgeVariant: StatusVariant =
    options.variant ??
    (iconKey === "success" || iconKey === "error" || iconKey === "warning" || iconKey === "info"
      ? (iconKey as StatusVariant)
      : "info");

  const confirmText = options.confirmButtonText ?? "OK";
  const cancelText = options.cancelButtonText ?? "Cancel";
  const showCancel = options.showCancelButton ?? false;

  const confirmVariant = options.confirmButtonVariant ?? "primary";
  const cancelVariant = options.cancelButtonVariant ?? "secondary";

  const size = options.size ?? "default";

  const contentInteractionProps: any = {
    onEscapeKeyDown: (e: any) => {
      if (options.closeOnEsc === false) e.preventDefault();
    },
    onInteractOutside: (e: any) => {
      if (options.closeOnOverlayClick === false) e.preventDefault();
    },
  };

  return (
    <AlertDialogPrimitive
      open={state.open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          dismiss();
        }
      }}
    >
      <AlertDialogContent
        size={size}
        aria-label="Alert dialog"
        className={cn(
          "gap-0 rounded-2xl px-8 py-10 text-center sm:gap-0",
          size === "sm" ? "max-w-xs" : "max-w-md",
        )}
        {...contentInteractionProps}
      >
        <div className="flex flex-col items-center gap-6">
          <div className={cn(statusBadgeVariants({ variant: badgeVariant }))}>
            <Icon className="size-10" strokeWidth={2.5} aria-hidden />
          </div>

          <AlertDialogHeader className="gap-2 sm:text-center sm:place-items-center">
            <AlertDialogTitle className="text-2xl font-semibold tracking-tight">
              {options.title}
            </AlertDialogTitle>
            {options.text ?? options.description ? (
              <AlertDialogDescription className="text-base text-muted-foreground">
                {options.text ?? options.description}
              </AlertDialogDescription>
            ) : null}
          </AlertDialogHeader>

          {options.input ? (
            <div className="w-full text-left">
              {options.input === "textarea" ? (
                <textarea
                  className="min-h-24 w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  placeholder={options.inputPlaceholder}
                  value={inputValue ?? ""}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setInputError(null);
                    setSubmitError(null);
                  }}
                  disabled={loading}
                />
              ) : (
                <input
                  className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  placeholder={options.inputPlaceholder}
                  value={inputValue ?? ""}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setInputError(null);
                    setSubmitError(null);
                  }}
                  disabled={loading}
                />
              )}
              {inputError ? (
                <p className="mt-2 text-sm text-destructive">{inputError}</p>
              ) : null}
            </div>
          ) : null}

          {submitError ? (
            <div className="w-full rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-left text-sm text-destructive">
              {submitError}
            </div>
          ) : null}

          {options.footer ? (
            <AlertDialogFooter className="w-full sm:justify-center">
              {options.footer}
            </AlertDialogFooter>
          ) : options.showActions === false ? null : (
            <AlertDialogFooter className="w-full sm:justify-center">
              {showCancel ? (
                <Button
                  variant={cancelVariant}
                  disabled={loading}
                  onClick={dismiss}
                >
                  {cancelText}
                </Button>
              ) : null}
              <Button
                variant={confirmVariant}
                loading={loading}
                onClick={confirm}
              >
                {confirmText}
              </Button>
            </AlertDialogFooter>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialogPrimitive>
  );
}

export interface AlertDialogProps<TValue = string>
  extends SweetAlertOptions<TValue> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  className?: string;
  /**
   * Controls whether the default action buttons are rendered when `footer`
   * is not provided. Defaults to `true`.
   */
  showActions?: boolean;
  description?: React.ReactNode;
}

export function AlertDialog<TValue = string>({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  variant,
  icon,
  title,
  description,
  text,
  footer,
  className,
  size = "default",
  confirmButtonText,
  cancelButtonText,
  showCancelButton,
  confirmButtonVariant = "primary",
  cancelButtonVariant = "secondary",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  input,
  inputPlaceholder,
  defaultValue,
  inputValidator,
  preConfirm,
  showActions = true,
}: AlertDialogProps<TValue>) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(
    defaultOpen,
  );
  const resolvedOpen = isControlled ? open : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  const [inputValue, setInputValue] = React.useState<any>(
    defaultValue ?? "",
  );
  const [inputError, setInputError] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!resolvedOpen) return;
    setInputValue(defaultValue ?? "");
    setInputError(null);
    setSubmitError(null);
    setLoading(false);
  }, [resolvedOpen, defaultValue]);

  const Icon =
    typeof icon === "function"
      ? icon
      : (icon === "question"
          ? HelpCircle
          : defaultIconMap[(icon as StatusVariant) ?? "info"]) as LucideIcon;

  const badgeVariant: StatusVariant =
    variant ??
    (icon === "success" || icon === "error" || icon === "warning" || icon === "info"
      ? (icon as StatusVariant)
      : "info");

  const showCancel = showCancelButton ?? false;
  const confirmText = confirmButtonText ?? "OK";
  const cancelText = cancelButtonText ?? "Cancel";

  const contentInteractionProps: any = {
    onEscapeKeyDown: (e: any) => {
      if (closeOnEsc === false) e.preventDefault();
    },
    onInteractOutside: (e: any) => {
      if (closeOnOverlayClick === false) e.preventDefault();
    },
  };

  const dismiss = React.useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  const confirm = React.useCallback(async () => {
    if (!preConfirm && !inputValidator) {
      handleOpenChange(false);
      return;
    }

    const value = inputValue as TValue;

    const validation = inputValidator?.(value);
    if (validation) {
      setInputError(validation);
      return;
    }

    try {
      setLoading(true);
      setSubmitError(null);
      await preConfirm?.(value);
      handleOpenChange(false);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setSubmitError(message);
      setLoading(false);
    }
  }, [handleOpenChange, inputError, inputValue, inputValidator, preConfirm]);

  return (
    <AlertDialogPrimitive open={resolvedOpen} onOpenChange={handleOpenChange}>
      {trigger ? <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> : null}
      <AlertDialogContent
        size={size}
        aria-label="Alert dialog"
        className={cn(
          "gap-0 rounded-2xl px-8 py-10 text-center sm:gap-0",
          size === "sm" ? "max-w-xs" : "max-w-md",
          className,
        )}
        {...contentInteractionProps}
      >
        <div className="flex flex-col items-center gap-6">
          <div className={cn(statusBadgeVariants({ variant: badgeVariant }))}>
            <Icon className="size-10" strokeWidth={2.5} aria-hidden />
          </div>

          <AlertDialogHeader className="gap-2 sm:text-center sm:place-items-center">
            <AlertDialogTitle className="text-2xl font-semibold tracking-tight">
              {title}
            </AlertDialogTitle>
            {text ?? description ? (
              <AlertDialogDescription className="text-base text-muted-foreground">
                {text ?? description}
              </AlertDialogDescription>
            ) : null}
          </AlertDialogHeader>

          {input ? (
            <div className="w-full text-left">
              {input === "textarea" ? (
                <textarea
                  className="min-h-24 w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  placeholder={inputPlaceholder}
                  value={inputValue ?? ""}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setInputError(null);
                    setSubmitError(null);
                  }}
                  disabled={loading}
                />
              ) : (
                <input
                  className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  placeholder={inputPlaceholder}
                  value={inputValue ?? ""}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setInputError(null);
                    setSubmitError(null);
                  }}
                  disabled={loading}
                />
              )}
              {inputError ? (
                <p className="mt-2 text-sm text-destructive">{inputError}</p>
              ) : null}
            </div>
          ) : null}

          {submitError ? (
            <div className="w-full rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-left text-sm text-destructive">
              {submitError}
            </div>
          ) : null}

          {footer ? (
            <AlertDialogFooter className="w-full sm:justify-center">
              {footer}
            </AlertDialogFooter>
          ) : showActions === false ? null : (
            <AlertDialogFooter className="w-full sm:justify-center">
              {showCancel ? (
                <Button
                  variant={cancelButtonVariant}
                  disabled={loading}
                  onClick={dismiss}
                >
                  {cancelText}
                </Button>
              ) : null}
              <Button
                variant={confirmButtonVariant}
                loading={loading}
                onClick={confirm}
              >
                {confirmText}
              </Button>
            </AlertDialogFooter>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialogPrimitive>
  );
}

/**
 * Controlled, declarative wrapper using the same UI as `SweetAlertProvider`.
 * Use this when you don't want the imperative Promise API.
 */
export interface SweetAlertDialogProps<TValue = string>
  extends SweetAlertOptions<TValue> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SweetAlertDialog<TValue = string>({
  open,
  onOpenChange,
  ...options
}: SweetAlertDialogProps<TValue>) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
      {...options}
      // Consumers of SweetAlertDialog already control `open`.
      showActions={options.showActions ?? true}
    />
  );
}

function SweetAlertProviderBridge({
  open,
  onOpenChange,
  options,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: SweetAlertOptions<any>;
}) {
  const [state, setState] = React.useState<SweetAlertInternalState<unknown>>({
    open,
    options,
    resolve: null,
  });

  React.useEffect(() => {
    setState((prev) => ({ ...prev, open, options }));
  }, [open, options]);

  return (
    <SweetAlertInstance
      state={state}
      setState={(updater) => {
        setState((prev) => {
          const next = typeof updater === "function" ? updater(prev) : updater;
          if (prev.open !== next.open) onOpenChange(next.open);
          return next;
        });
      }}
    />
  );
}
