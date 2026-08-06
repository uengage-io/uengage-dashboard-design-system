import * as React from "react";
import Color from "color";
import { Slider as SliderPrimitive } from "radix-ui";
import { ChevronDown, Pipette } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input as UiInput } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputLabel } from "@/components/custom/Input/InputLabel";
import { InputHelper } from "@/components/custom/Input/InputHelper";
import { triggerVariants, CHECKERBOARD_BG } from "./colorpickerVariants";
import type { ColorPickerProps, ColorPickerFormat } from "./ColorPicker.types";

const DEFAULT_COLOR = "#006F42";
const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

interface Hsla {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number; // 0-100
}

function parseHex(hex: string): Hsla {
  const color = Color(hex);
  return {
    hue: color.hue() || 0,
    saturation: color.saturationl(),
    lightness: color.lightness(),
    alpha: color.alpha() * 100,
  };
}

function toHex(hsla: Hsla, includeAlpha: boolean): string {
  const color = Color.hsl(hsla.hue, hsla.saturation, hsla.lightness).alpha(
    hsla.alpha / 100,
  );
  return includeAlpha ? color.hexa() : color.hex();
}

/* ── Saturation/lightness canvas ─────────────────────────────────────── */

function ColorPickerSelection({
  hue,
  saturation,
  lightness,
  onChange,
}: {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (saturation: number, lightness: number) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const backgroundGradient = React.useMemo(
    () =>
      `linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,0)),
       linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)),
       hsl(${hue}, 100%, 50%)`,
    [hue],
  );

  // Inverse of the mapping in handlePointerMove — keeps the marker in sync
  // with the current saturation/lightness even when they change externally
  // (typed hex, eyedropper, preset click).
  const { x, y } = React.useMemo(() => {
    const px = saturation / 100;
    const topLightness = px < 0.01 ? 100 : 50 + 50 * (1 - px);
    const py = topLightness > 0 ? 1 - lightness / topLightness : 0;
    return { x: px, y: Math.min(1, Math.max(0, py)) };
  }, [saturation, lightness]);

  const handlePointerMove = React.useCallback(
    (event: { clientX: number; clientY: number }) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      const topLightness = px < 0.01 ? 100 : 50 + 50 * (1 - px);
      onChange(px * 100, topLightness * (1 - py));
    },
    [onChange],
  );

  React.useEffect(() => {
    if (!isDragging) return;
    const move = (e: PointerEvent) => handlePointerMove(e);
    const up = () => setIsDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [isDragging, handlePointerMove]);

  return (
    <div
      ref={containerRef}
      className="relative h-32 w-full cursor-crosshair select-none rounded-[4px]"
      style={{ background: backgroundGradient }}
      onPointerDown={(e) => {
        e.preventDefault();
        setIsDragging(true);
        handlePointerMove(e);
      }}
    >
      <div
        className="pointer-events-none absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
        style={{
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
}

/* ── Hue / alpha sliders ──────────────────────────────────────────────── */

const thumbClass =
  "block h-4 w-4 rounded-full border-2 border-white bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006F42]";
const thumbShadow = { boxShadow: "0 0 0 1px rgba(0,0,0,0.3)" } as const;

function HueSlider({
  hue,
  onChange,
}: {
  hue: number;
  onChange: (hue: number) => void;
}) {
  return (
    <SliderPrimitive.Root
      className="relative flex h-4 w-full touch-none select-none items-center"
      max={360}
      step={1}
      value={[hue]}
      onValueChange={([h = hue]) => onChange(h)}
    >
      <SliderPrimitive.Track className="relative h-2.5 w-full grow rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]">
        <SliderPrimitive.Range className="absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={thumbClass} style={thumbShadow} />
    </SliderPrimitive.Root>
  );
}

function AlphaSlider({
  hue,
  saturation,
  lightness,
  alpha,
  onChange,
}: {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  onChange: (alpha: number) => void;
}) {
  const solid = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return (
    <SliderPrimitive.Root
      className="relative flex h-4 w-full touch-none select-none items-center"
      max={100}
      step={1}
      value={[alpha]}
      onValueChange={([a = alpha]) => onChange(a)}
    >
      <SliderPrimitive.Track
        className="relative h-2.5 w-full grow overflow-hidden rounded-full"
        style={{ background: CHECKERBOARD_BG }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${solid})` }}
        />
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-transparent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={thumbClass} style={thumbShadow} />
    </SliderPrimitive.Root>
  );
}

/* ── Eyedropper ───────────────────────────────────────────────────────── */

function EyeDropperButton({ onPick }: { onPick: (hex: string) => void }) {
  const supported = typeof window !== "undefined" && "EyeDropper" in window;
  if (!supported) return null;

  const handleClick = async () => {
    try {
      // EyeDropper is an experimental browser API not yet in lib.dom.d.ts.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      onPick(result.sRGBHex);
    } catch {
      // User cancelled the pick — nothing to do.
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Pick color from screen"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] border border-gray-300 text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-800"
    >
      <Pipette size={14} strokeWidth={2} />
    </button>
  );
}

/* ── Format value fields (hex editable, rgb/hsl read-only) ─────────────── */

const fieldClass =
  "h-8 rounded-[4px] border-gray-300 bg-gray-50 px-2 text-xs text-[#374151] shadow-none";

function ColorPickerFormatFields({
  format,
  hsla,
  showAlpha,
  onHexCommit,
}: {
  format: ColorPickerFormat;
  hsla: Hsla;
  showAlpha: boolean;
  onHexCommit: (hex: string) => void;
}) {
  const color = Color.hsl(hsla.hue, hsla.saturation, hsla.lightness).alpha(
    hsla.alpha / 100,
  );
  const currentHex = (showAlpha ? color.hexa() : color.hex()).toUpperCase();

  const [draft, setDraft] = React.useState(currentHex);
  const focusedRef = React.useRef(false);

  React.useEffect(() => {
    if (!focusedRef.current) setDraft(currentHex);
  }, [currentHex]);

  const commit = () => {
    const raw = draft.trim();
    if (HEX_PATTERN.test(raw)) {
      onHexCommit(raw);
    } else {
      setDraft(currentHex);
    }
  };

  if (format === "hex") {
    return (
      <div className="flex items-center gap-1.5">
        <UiInput
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={() => {
            focusedRef.current = true;
          }}
          onBlur={() => {
            focusedRef.current = false;
            commit();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          spellCheck={false}
          className={cn(fieldClass, "flex-1 font-mono uppercase")}
        />
        {showAlpha && (
          <div className="relative shrink-0">
            <UiInput
              readOnly
              value={Math.round(hsla.alpha)}
              className={cn(fieldClass, "w-14 pr-5")}
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-500">
              %
            </span>
          </div>
        )}
      </div>
    );
  }

  if (format === "rgb") {
    const [r = 0, g = 0, b = 0] = color.rgb().array().map((v) => Math.round(v));
    return (
      <div className="flex items-center gap-1.5">
        {[r, g, b].map((v, i) => (
          <UiInput key={i} readOnly value={v} className={cn(fieldClass, "flex-1")} />
        ))}
        {showAlpha && (
          <UiInput
            readOnly
            value={Math.round(hsla.alpha)}
            className={cn(fieldClass, "w-12")}
          />
        )}
      </div>
    );
  }

  // hsl
  const [h = 0, s = 0, l = 0] = color.hsl().array().map((v) => Math.round(v));
  return (
    <div className="flex items-center gap-1.5">
      {[h, s, l].map((v, i) => (
        <UiInput key={i} readOnly value={v} className={cn(fieldClass, "flex-1")} />
      ))}
      {showAlpha && (
        <UiInput
          readOnly
          value={Math.round(hsla.alpha)}
          className={cn(fieldClass, "w-12")}
        />
      )}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */

function ColorPicker({
  value: controlledValue,
  defaultValue,
  onChange,
  alpha: showAlpha = false,
  presets,
  placeholder = "Select color",
  size = "md",
  width,
  className,
  disabled = false,
  readOnly = false,
  onTouch,
  label,
  required,
  helperText,
  error,
  open: controlledOpen,
  onOpenChange: onOpenChangeProp,
}: ColorPickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChangeProp?.(next);
    },
    [controlledOpen, onOpenChangeProp],
  );

  const touchedRef = React.useRef(false);
  const interactedRef = React.useRef(false);

  const seed = React.useMemo(
    () => parseHex(controlledValue ?? defaultValue ?? DEFAULT_COLOR),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [hue, setHue] = React.useState(seed.hue);
  const [saturation, setSaturation] = React.useState(seed.saturation);
  const [lightness, setLightness] = React.useState(seed.lightness);
  const [colorAlpha, setColorAlpha] = React.useState(seed.alpha);
  const [format, setFormat] = React.useState<ColorPickerFormat>("hex");

  // Sync internal hsl state when the *external* controlled value changes
  // (parent-driven updates). Internal drags/typing update state directly and
  // are not round-tripped back through this effect.
  React.useEffect(() => {
    if (controlledValue === undefined) return;
    const parsed = parseHex(controlledValue);
    setHue(parsed.hue);
    setSaturation(parsed.saturation);
    setLightness(parsed.lightness);
    setColorAlpha(parsed.alpha);
  }, [controlledValue]);

  const hsla: Hsla = { hue, saturation, lightness, alpha: colorAlpha };
  const currentHex = React.useMemo(() => toHex(hsla, showAlpha), [hsla, showAlpha]);

  const markTouched = () => {
    interactedRef.current = true;
  };

  const applyHsla = (next: Partial<Hsla>) => {
    markTouched();
    const merged: Hsla = { ...hsla, ...next };
    setHue(merged.hue);
    setSaturation(merged.saturation);
    setLightness(merged.lightness);
    setColorAlpha(merged.alpha);
    onChange?.(toHex(merged, showAlpha));
  };

  const applyHex = (hex: string) => {
    const parsed = parseHex(hex);
    applyHsla({ ...parsed, alpha: showAlpha ? parsed.alpha : 100 });
  };

  const swatchRgba = React.useMemo(() => {
    const [r = 0, g = 0, b = 0] = Color.hsl(hue, saturation, lightness).rgb().array();
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${colorAlpha / 100})`;
  }, [hue, saturation, lightness, colorAlpha]);

  const handleOpenChange = (next: boolean) => {
    if (disabled || readOnly) return;
    setOpen(next);
    if (next) {
      interactedRef.current = true;
    } else if (interactedRef.current && !touchedRef.current) {
      touchedRef.current = true;
      onTouch?.();
    }
  };

  const handleTriggerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (open) return;
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    if (!interactedRef.current) return;
    if (touchedRef.current) return;
    touchedRef.current = true;
    onTouch?.();
  };

  const triggerState = disabled
    ? "disabled"
    : readOnly
      ? "readonly"
      : open
        ? "open"
        : "default";

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <InputLabel size={size} required={required}>
          {label}
        </InputLabel>
      )}
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            onFocus={() => {
              interactedRef.current = true;
            }}
            onBlur={handleTriggerBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (!disabled && !readOnly) setOpen(!open);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            className={cn(
              triggerVariants({ state: triggerState, size }),
              "gap-2 px-2 cursor-pointer select-none",
              width,
              className,
            )}
          >
            <span className="relative h-5 w-5 shrink-0 overflow-hidden rounded-[4px] border border-gray-300">
              <span className="absolute inset-0" style={{ background: CHECKERBOARD_BG }} />
              <span className="absolute inset-0" style={{ backgroundColor: swatchRgba }} />
            </span>
            <span className="flex-1 truncate font-mono uppercase text-[#111827]">
              {currentHex || placeholder}
            </span>
            <ChevronDown
              size={15}
              strokeWidth={2}
              className={cn(
                "shrink-0 text-gray-600 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-64 p-3">
          <div className="flex flex-col gap-3">
            <ColorPickerSelection
              hue={hue}
              saturation={saturation}
              lightness={lightness}
              onChange={(s, l) => applyHsla({ saturation: s, lightness: l })}
            />
            <HueSlider hue={hue} onChange={(h) => applyHsla({ hue: h })} />
            {showAlpha && (
              <AlphaSlider
                hue={hue}
                saturation={saturation}
                lightness={lightness}
                alpha={colorAlpha}
                onChange={(a) => applyHsla({ alpha: a })}
              />
            )}

            <div className="flex items-center gap-1.5">
              <EyeDropperButton onPick={applyHex} />
              <Select value={format} onValueChange={(v) => setFormat(v as ColorPickerFormat)}>
                <SelectTrigger className="h-8 w-[68px] shrink-0 px-2 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hex" className="text-xs">HEX</SelectItem>
                  <SelectItem value="rgb" className="text-xs">RGB</SelectItem>
                  <SelectItem value="hsl" className="text-xs">HSL</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1">
                <ColorPickerFormatFields
                  format={format}
                  hsla={hsla}
                  showAlpha={showAlpha}
                  onHexCommit={applyHex}
                />
              </div>
            </div>

            {presets && presets.length > 0 && (
              <div className="flex flex-wrap gap-1.5 border-t border-[#F3F4F6] pt-3">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    aria-label={`Use color ${preset}`}
                    onClick={() => applyHex(preset)}
                    className={cn(
                      "h-6 w-6 shrink-0 rounded-[4px] border transition-transform hover:scale-110",
                      currentHex.toLowerCase() === preset.toLowerCase()
                        ? "border-[#006F42] ring-1 ring-[#006F42]"
                        : "border-gray-300",
                    )}
                    style={{ backgroundColor: preset }}
                  />
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <InputHelper size={size} helperText={helperText} error={error} />
    </div>
  );
}

ColorPicker.displayName = "ColorPicker";
export { ColorPicker };
