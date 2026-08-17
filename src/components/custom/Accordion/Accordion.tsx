import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Accordion as AccordionNS } from "radix-ui";
import { cn } from "@/lib/utils";
import type {
  AccordionAppearance,
  AccordionItem as AccordionItemType,
  AccordionSize,
  CustomAccordionProps,
} from "./Accordion.types";
import {
  ACCORDION_SIZES,
  getAccordionChip,
  getAccordionItem,
  getAccordionPalette,
  getAccordionShell,
  getAccordionStateSpec,
  toAccordionVariantKey,
} from "./accordionTokens";
import type { AccordionVariantKey } from "./accordionTokens";

/* -------------------------------------------------------------------------- */
/*  Row                                                                        */
/* -------------------------------------------------------------------------- */

interface RowProps {
  item: AccordionItemType;
  open: boolean;
  size: AccordionSize;
  variantKey: AccordionVariantKey;
  appearance: AccordionAppearance;
  chevronPosition: "start" | "end";
  showChevron: boolean;
  showIconTile?: boolean;
  isLast: boolean;
  className?: string;
}

function Row({
  item,
  open,
  size,
  variantKey,
  appearance,
  chevronPosition,
  showChevron,
  showIconTile,
  isLast,
  className,
}: RowProps) {
  const spec = ACCORDION_SIZES[size];
  const palette = getAccordionPalette(appearance);
  const itemSpec = getAccordionItem(variantKey, appearance);
  const state = item.state ?? "default";
  const disabled = !!item.disabled;
  const tint = getAccordionStateSpec(state, disabled, appearance);

  const [hover, setHover] = React.useState(false);
  const [seen, setSeen] = React.useState(open);
  React.useEffect(() => {
    if (open) setSeen(true);
  }, [open]);

  const tileVisible = (showIconTile ?? spec.showTile) && !!item.icon;
  const subtitleVisible = spec.showSubtitle && item.subtitle !== undefined;

  const chevronColor = tint.chevron ?? (open ? palette.chevronOpen : palette.chevronClosed);
  const titleColor = tint.title ?? (open ? palette.titleOpen : palette.titleClosed);
  const subtitleColor = tint.subtitle ?? palette.subtitle;

  const headerBg =
    tint.bg ?? (open ? palette.openBg : hover && !disabled ? palette.hoverBg : "transparent");

  const chip = getAccordionChip(item.summaryTone, appearance);
  const actions = item.headerActions ?? item.action;

  const chevron = showChevron ? (
    state === "loading" ? (
      <span
        aria-hidden="true"
        className="animate-spin"
        style={{
          width: spec.chev,
          height: spec.chev,
          flex: "none",
          borderRadius: "50%",
          border: `2px solid ${palette.spinnerTrack}`,
          borderTopColor: palette.spinnerHead,
        }}
      />
    ) : (
      <ChevronRight
        aria-hidden="true"
        size={spec.chev}
        strokeWidth={2.4}
        style={{
          flex: "none",
          color: chevronColor,
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
          transition: "transform 160ms cubic-bezier(.2,.8,.3,1)",
        }}
      />
    )
  ) : null;

  const panel = (
    <div
      style={{
        borderTop: `1px solid ${palette.divider}`,
        padding: spec.bodyPad,
        color: palette.panelFg,
        fontSize: spec.fs,
        lineHeight: 1.6,
      }}
    >
      {item.lazy && !seen ? null : item.content}
    </div>
  );

  const itemStyle: React.CSSProperties = {
    border: tint.border ?? itemSpec.border,
    borderRadius: itemSpec.radius || undefined,
    background: itemSpec.bg,
    boxShadow: itemSpec.shadow,
    overflow: "hidden",
  };
  // The hairline sits between rows, never after the last one. Only set the
  // longhand when it is actually wanted — an explicit `undefined` alongside the
  // `border` shorthand makes React clear the bottom edge.
  if (itemSpec.divider && !isLast) {
    itemStyle.borderBottom = `1px solid ${palette.divider}`;
  }

  return (
    <AccordionNS.Item
      value={item.value}
      disabled={disabled}
      className={cn("group", className)}
      style={itemStyle}
    >
      <AccordionNS.Header
        className="flex w-full items-center"
        style={{ background: headerBg, transition: "background 120ms linear" }}
      >
        <AccordionNS.Trigger
          title={disabled ? item.disabledReason : undefined}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={cn(
            "flex min-w-0 flex-1 items-center border-0 bg-transparent text-left outline-none",
            "focus-visible:shadow-[inset_0_0_0_2px_rgba(140,196,42,.55)]",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
          )}
          style={{ padding: spec.pad, gap: spec.gap }}
        >
          {chevronPosition === "start" && chevron}

          {tileVisible && (
            <span
              aria-hidden="true"
              className="flex items-center justify-center [&>svg]:h-full [&>svg]:w-full"
              style={{
                width: spec.tile,
                height: spec.tile,
                flex: "none",
                borderRadius: 8,
                background: open ? palette.tileOpenBg : palette.tileClosedBg,
                color: open ? palette.tileOpenFg : palette.tileClosedFg,
                padding: (spec.tile - spec.tileIcon) / 2,
                transition: "background 120ms linear, color 120ms linear",
              }}
            >
              {item.icon}
            </span>
          )}

          <span className="flex min-w-0 flex-1 flex-col" style={{ gap: 2 }}>
            <span
              className="truncate"
              style={{
                fontWeight: 600,
                fontSize: spec.fs,
                lineHeight: 1.3,
                color: titleColor,
              }}
            >
              {item.title}
            </span>
            {subtitleVisible && (
              <span
                className="truncate"
                style={{ fontWeight: 400, fontSize: 11, lineHeight: 1.4, color: subtitleColor }}
              >
                {item.subtitle}
              </span>
            )}
          </span>

          {state === "dirty" && (
            <span
              aria-hidden="true"
              style={{
                width: 6,
                height: 6,
                flex: "none",
                borderRadius: "50%",
                background: palette.dirtyDot,
              }}
            />
          )}

          {item.summary !== undefined && item.summary !== null && (
            <span
              className="ue-tabular"
              style={{
                flex: "none",
                fontWeight: 600,
                fontSize: 11,
                lineHeight: 1.3,
                padding: "4px 9px",
                borderRadius: 999,
                background: chip.bg,
                color: chip.fg,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {item.summary}
            </span>
          )}

          {chevronPosition === "end" && chevron}
        </AccordionNS.Trigger>

        {actions && (
          <span
            className="flex flex-none items-center"
            style={{ gap: 11, paddingRight: spec.gap + 4 }}
          >
            <span
              aria-hidden="true"
              style={{ width: 1, height: 16, background: palette.divider, flex: "none" }}
            />
            {actions}
          </span>
        )}
      </AccordionNS.Header>

      {item.keepMounted ? (
        <AccordionNS.Content forceMount className="overflow-hidden data-[state=closed]:hidden">
          {panel}
        </AccordionNS.Content>
      ) : (
        <AccordionNS.Content className="overflow-hidden will-change-[height] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
          {panel}
        </AccordionNS.Content>
      )}
    </AccordionNS.Item>
  );
}

/* -------------------------------------------------------------------------- */
/*  Expand all                                                                 */
/* -------------------------------------------------------------------------- */

function ExpandAllControl({
  allOpen,
  onToggle,
  labels,
  appearance,
}: {
  allOpen: boolean;
  onToggle: () => void;
  labels?: { expand: React.ReactNode; collapse: React.ReactNode };
  appearance: AccordionAppearance;
}) {
  const dark = appearance === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      className="h-[30px] cursor-pointer self-end rounded-lg px-3 text-[11px] font-semibold leading-none transition-colors duration-120"
      style={{
        border: `1px solid ${dark ? "#2C4A38" : "#E2E2E2"}`,
        background: dark ? "transparent" : "#FFFFFF",
        color: dark ? "#8FB79C" : "#595959",
      }}
    >
      {allOpen ? (labels?.collapse ?? "Collapse all") : (labels?.expand ?? "Expand all")}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Accordion                                                                  */
/* -------------------------------------------------------------------------- */

export function Accordion(props: CustomAccordionProps) {
  const {
    items,
    variant = "default",
    size = "md",
    className,
    appearance = "light",
    chevronPosition = "start",
    showChevron = true,
    showIconTile,
    expandAll = false,
    expandAllLabels,
    nested = false,
    onBeforeToggle,
    itemClassName,
  } = props;

  const variantKey = toAccordionVariantKey(nested ? "flush" : variant);
  const shell = getAccordionShell(variantKey, appearance);
  const openable = items.filter((i) => !i.disabled).map((i) => i.value);

  /* ---- open state ------------------------------------------------------ */

  const isMultiple = props.type === "multiple";
  const collapsible = props.type === "multiple" ? undefined : (props.collapsible ?? true);

  const [internalSingle, setInternalSingle] = React.useState<string>(
    () => (props.type === "multiple" ? "" : (props.defaultValue ?? "")),
  );
  const [internalMultiple, setInternalMultiple] = React.useState<string[]>(
    () => (props.type === "multiple" ? (props.defaultValue ?? []) : []),
  );

  const singleValue = props.type === "multiple" ? "" : (props.value ?? internalSingle);
  const multipleValue = props.type === "multiple" ? (props.value ?? internalMultiple) : [];
  const openValues = isMultiple ? multipleValue : singleValue ? [singleValue] : [];

  /** Runs `onBeforeToggle` against whatever actually changed. */
  const allowed = React.useCallback(
    (next: string[]) => {
      if (!onBeforeToggle) return true;
      const opened = next.filter((v) => !openValues.includes(v));
      const closed = openValues.filter((v) => !next.includes(v));
      for (const v of opened) if (!onBeforeToggle(v, true)) return false;
      for (const v of closed) if (!onBeforeToggle(v, false)) return false;
      return true;
    },
    [onBeforeToggle, openValues],
  );

  const handleSingle = (next: string) => {
    if (!allowed(next ? [next] : [])) return;
    if (props.type !== "multiple") {
      if (props.value === undefined) setInternalSingle(next);
      props.onChange?.(next);
    }
  };

  const handleMultiple = (next: string[]) => {
    if (!allowed(next)) return;
    if (props.type === "multiple") {
      if (props.value === undefined) setInternalMultiple(next);
      props.onChange?.(next);
    }
  };

  const allOpen = openable.length > 0 && openable.every((v) => openValues.includes(v));
  const toggleAll = () => handleMultiple(allOpen ? [] : openable);

  /* ---- render ---------------------------------------------------------- */

  const rows = items.map((item, i) => (
    <Row
      key={item.value}
      item={item}
      open={openValues.includes(item.value)}
      size={size}
      variantKey={variantKey}
      appearance={appearance}
      chevronPosition={chevronPosition}
      showChevron={showChevron}
      showIconTile={showIconTile}
      isLast={i === items.length - 1}
      className={itemClassName}
    />
  ));

  const rootStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: shell.gap || undefined,
    border: shell.border,
    borderRadius: shell.radius || undefined,
    overflow: shell.clip ? "hidden" : undefined,
    background: shell.bg,
    // Children indent 18px and lose their border.
    paddingLeft: nested ? 18 : undefined,
  };

  const root = isMultiple ? (
    <AccordionNS.Root
      type="multiple"
      value={multipleValue}
      onValueChange={handleMultiple}
      className={cn("w-full", className)}
      style={rootStyle}
    >
      {rows}
    </AccordionNS.Root>
  ) : (
    <AccordionNS.Root
      type="single"
      collapsible={collapsible}
      value={singleValue}
      onValueChange={handleSingle}
      className={cn("w-full", className)}
      style={rootStyle}
    >
      {rows}
    </AccordionNS.Root>
  );

  if (!expandAll) return root;

  return (
    <div className="flex w-full flex-col gap-2.5">
      <ExpandAllControl
        allOpen={allOpen}
        onToggle={toggleAll}
        labels={expandAllLabels}
        appearance={appearance}
      />
      {root}
    </div>
  );
}

Accordion.displayName = "Accordion";
