import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible } from "radix-ui";
import { cn } from "../../../lib/utils";
import { Card as ShadcnCard } from "../../ui/card";
import { Separator } from "../../ui/separator";

// ─── Context ──────────────────────────────────────────────────────────────────

interface SectionContextValue {
  collapsible: boolean;
}

const SectionContext = React.createContext<SectionContextValue>({
  collapsible: false,
});

// ─── SectionHeader ────────────────────────────────────────────────────────────

export interface SectionHeaderProps extends React.ComponentProps<"div"> {
  /** Icon element shown to the left of the title. */
  icon?: React.ReactNode;
  /** Main heading text. */
  title: string;
  /** Optional subtitle/description rendered below the title. */
  description?: React.ReactNode;
  /** Slot for action buttons, rendered at the trailing end of the header. */
  action?: React.ReactNode;
}

function SectionHeader({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: SectionHeaderProps) {
  const { collapsible } = React.useContext(SectionContext);

  const inner = (
    <>
      {/* Left: icon + title + description */}
      <div className="flex items-center gap-2 min-w-0 pointer-events-none">
        {icon && (
          <span
            data-slot="section-header-icon"
            className="flex-shrink-0 text-[#2b7a3b] w-6 h-6 flex items-center justify-center"
          >
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <div
            data-slot="section-header-title"
            className="text-base font-semibold text-[#202020] leading-snug"
          >
            {title}
          </div>
          {description && (
            <div
              data-slot="section-header-description"
              className="text-xs text-[#6B7280] mt-0.5"
            >
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Right: action slot + chevron */}
      <div className="flex-shrink-0 flex items-center gap-2">
        {action && (
          // stop click from bubbling to the Collapsible.Trigger
          <div
            data-slot="section-header-action"
            className="pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {action}
          </div>
        )}
        {collapsible && (
          <span
            data-slot="section-collapse-indicator"
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#6B7280]"
            aria-hidden
          >
            <ChevronDown
              size={16}
              className="transition-transform duration-200 group-data-[state=open]:rotate-180"
            />
          </span>
        )}
      </div>
    </>
  );

  if (collapsible) {
    return (
      <Collapsible.Trigger
        data-slot="section-header"
        className={cn(
          "w-full flex items-start justify-between gap-3 pb-4 text-left",
          "cursor-pointer select-none rounded-lg",
          "hover:bg-[#F9FAFB] -mx-2 px-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7a3b] focus-visible:ring-offset-1",
          "group transition-colors",
          className,
        )}
        {...(props as React.ComponentProps<typeof Collapsible.Trigger>)}
      >
        {inner}
      </Collapsible.Trigger>
    );
  }

  return (
    <div
      data-slot="section-header"
      className={cn("flex items-start justify-between gap-3 pb-4", className)}
      {...props}
    >
      {inner}
    </div>
  );
}

// ─── SectionDivider ───────────────────────────────────────────────────────────

export interface SectionDividerProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** Label shown inline with a horizontal divider. Ignored when orientation="vertical". */
  label?: string;
  /**
   * "horizontal" (default) — a full-width rule, optionally with an inline label.
   * "vertical" — a thin column separator for use inside flex/grid rows.
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Height of a vertical divider. Defaults to "100%" so it fills its grid cell.
   * Accepts any valid CSS length (e.g. "24px", "2rem").
   */
  height?: string;
}

function SectionDivider({
  label,
  orientation = "horizontal",
  height,
  className,
  ...props
}: SectionDividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        data-slot="section-divider"
        data-orientation="vertical"
        role="separator"
        aria-orientation="vertical"
        className={cn(
          "flex-shrink-0 w-px bg-[#E5E7EB] self-stretch",
          className,
        )}
        style={height ? { height } : undefined}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div
        data-slot="section-divider"
        data-orientation="horizontal"
        className={cn("flex items-center gap-3 mt-6 mb-4", className)}
        {...props}
      >
        <Separator className="flex-1 bg-[#E5E7EB]" />
        <span className="text-xs font-medium text-[#6B7280] whitespace-nowrap">
          {label}
        </span>
        <Separator className="flex-1 bg-[#E5E7EB]" />
      </div>
    );
  }

  return (
    <Separator
      data-slot="section-divider"
      data-orientation="horizontal"
      className={cn("mt-6 mb-4 bg-[#E5E7EB]", className)}
      {...props}
    />
  );
}

// ─── SectionContent ───────────────────────────────────────────────────────────

export interface SectionContentProps extends React.ComponentProps<"div"> {}

function SectionContent({ className, children, ...props }: SectionContentProps) {
  const { collapsible } = React.useContext(SectionContext);

  const inner = (
    <div
      data-slot="section-content"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    >
      {children}
    </div>
  );

  if (collapsible) {
    return (
      <Collapsible.Content className="overflow-hidden will-change-[height] data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        {inner}
      </Collapsible.Content>
    );
  }

  return inner;
}

// ─── SectionSubsection ────────────────────────────────────────────────────────

export interface SectionSubsectionProps extends React.ComponentProps<"div"> {
  /** Title shown above this subsection. */
  title?: string;
  /** Optional description under the subsection title. */
  description?: string;
  /** Show a separator line above this subsection (default: true). */
  separator?: boolean;
  /** Label to display on the separator line when separator=true. */
  separatorLabel?: string;
}

function SectionSubsection({
  title,
  description,
  separator = true,
  separatorLabel,
  className,
  children,
  ...props
}: SectionSubsectionProps) {
  return (
    <>
      {separator && <SectionDivider label={separatorLabel} />}
      <div
        data-slot="section-subsection"
        className={cn("flex flex-col gap-3", className)}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col gap-0.5">
            {title && (
              <p className="text-sm font-medium text-[#374151]">{title}</p>
            )}
            {description && (
              <p className="text-xs text-[#6B7280]">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </>
  );
}

// ─── SectionRow ──────────────────────────────────────────────────────────────

export interface SectionRowProps extends React.ComponentProps<"div"> {
  /**
   * Number of equal columns. Defaults to 3 (matching the Business Details
   * design). Accepts 1–4 or a raw CSS grid-template-columns string.
   */
  columns?: 1 | 2 | 3 | 4 | string;
  /**
   * When true, injects a vertical `SectionDivider` between every direct child.
   * Switches the row to a flex layout so the separators size naturally.
   * Each child gets `flex: 1` and `min-w-0` automatically.
   */
  dividers?: boolean;
}

const COLUMN_CLASSES: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

function SectionRow({
  columns = 3,
  dividers = false,
  className,
  style,
  children,
  ...props
}: SectionRowProps) {
  if (dividers) {
    const items = React.Children.toArray(children).filter(Boolean);
    return (
      <div
        data-slot="section-row"
        data-dividers="true"
        className={cn("flex items-stretch gap-0", className)}
        style={style}
        {...props}
      >
        {items.map((child, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <SectionDivider orientation="vertical" className="mx-5" />
            )}
            <div className="flex-1 min-w-0">{child}</div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  const key = String(columns);
  const isPreset = key in COLUMN_CLASSES;

  return (
    <div
      data-slot="section-row"
      className={cn(
        "grid gap-x-5 gap-y-4",
        isPreset && COLUMN_CLASSES[key],
        className,
      )}
      style={
        isPreset
          ? style
          : { gridTemplateColumns: columns as string, ...style }
      }
      {...props}
    >
      {children}
    </div>
  );
}

// ─── SectionField ─────────────────────────────────────────────────────────────

export interface SectionFieldProps extends React.ComponentProps<"div"> {
  /** Column span inside a SectionRow grid (1–4). */
  span?: 1 | 2 | 3 | 4;
}

const SPAN_CLASSES: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

function SectionField({ span, className, ...props }: SectionFieldProps) {
  return (
    <div
      data-slot="section-field"
      className={cn(
        "flex flex-col gap-1.5",
        span && SPAN_CLASSES[span],
        className,
      )}
      {...props}
    />
  );
}

// ─── SectionTableContent ─────────────────────────────────────────────────────

export interface SectionTableContentProps extends React.ComponentProps<"div"> {
  /**
   * Show a thin separator line between the section header and the table.
   * Defaults to true.
   */
  divider?: boolean;
}

function SectionTableContent({
  divider = true,
  className,
  children,
  ...props
}: SectionTableContentProps) {
  const { collapsible } = React.useContext(SectionContext);

  const inner = (
    <div
      data-slot="section-table-content"
      className={cn(
        "-mx-4 sm:-mx-5 md:-mx-6",
        "-mb-4 sm:-mb-5 md:-mb-6",
        "overflow-hidden rounded-b-2xl",
        divider && "border-t border-[#E5E7EB]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );

  if (collapsible) {
    return (
      <Collapsible.Content className="overflow-hidden will-change-[height] data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        {inner}
      </Collapsible.Content>
    );
  }

  return inner;
}

// ─── Section (root) ───────────────────────────────────────────────────────────

export interface SectionProps extends React.ComponentProps<"div"> {
  /** When true, removes the card border/background and renders a bare container. */
  bare?: boolean;
  /** Enables the collapse/expand toggle. A chevron button appears in the header. */
  collapsible?: boolean;
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

function Section({
  bare = false,
  collapsible = false,
  defaultOpen = true,
  open,
  onOpenChange,
  className,
  children,
  ...props
}: SectionProps) {
  const cardClass = cn(
    "uengage-ui",
    "flex flex-col gap-0 rounded-2xl border border-[#E5E7EB] bg-white",
    "p-4 sm:p-5 md:p-6",
    "shadow-none text-sm text-[#202020]",
    className,
  );

  const ctx: SectionContextValue = { collapsible };

  if (bare) {
    return (
      <SectionContext.Provider value={ctx}>
        <div
          data-slot="section"
          className={cn("flex flex-col gap-0 text-sm text-[#202020]", className)}
          {...props}
        >
          {children}
        </div>
      </SectionContext.Provider>
    );
  }

  if (collapsible) {
    const collapsibleProps =
      open !== undefined
        ? { open, onOpenChange }
        : { defaultOpen };

    return (
      <SectionContext.Provider value={ctx}>
        <Collapsible.Root {...collapsibleProps} asChild>
          <ShadcnCard
            data-slot="section"
            className={cardClass}
            {...props}
          >
            {children}
          </ShadcnCard>
        </Collapsible.Root>
      </SectionContext.Provider>
    );
  }

  return (
    <SectionContext.Provider value={ctx}>
      <ShadcnCard
        data-slot="section"
        className={cardClass}
        {...props}
      >
        {children}
      </ShadcnCard>
    </SectionContext.Provider>
  );
}

Section.displayName = "Section";

export {
  Section,
  SectionHeader,
  SectionContent,
  SectionSubsection,
  SectionRow,
  SectionField,
  SectionDivider,
  SectionTableContent,
};
