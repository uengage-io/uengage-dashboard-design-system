import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimeValue {
  hours: number; // 0-23
  minutes: number; // 0-59
}

interface TimeColumnItem {
  label: string;
  value: number;
}

const ITEM_HEIGHT = 36;
const VISIBLE_ITEMS = 5;
const COLUMN_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

function TimeColumn({
  items,
  selected,
  onSelect,
}: {
  items: TimeColumnItem[];
  selected: number;
  onSelect: (value: number) => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const settleTimeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // Position the column so the selected item starts centered in the band.
  // Only done once, when the column first mounts.
  React.useEffect(() => {
    const index = items.findIndex((item) => item.value === selected);
    if (containerRef.current && index >= 0) {
      containerRef.current.scrollTop = index * ITEM_HEIGHT;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The value shown in the centered band — not the clicked item — is the
  // source of truth. We only commit a selection once the scroll settles.
  const handleScroll = () => {
    if (settleTimeout.current) clearTimeout(settleTimeout.current);
    settleTimeout.current = setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const index = Math.min(
        Math.max(Math.round(el.scrollTop / ITEM_HEIGHT), 0),
        items.length - 1,
      );
      const item = items[index];
      if (item && item.value !== selected) onSelect(item.value);
    }, 120);
  };

  const scrollItemToCenter = (value: number) => {
    const index = items.findIndex((item) => item.value === value);
    if (containerRef.current && index >= 0) {
      containerRef.current.scrollTo({
        top: index * ITEM_HEIGHT,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="time-picker-column relative overflow-y-auto scroll-smooth"
      style={{ height: COLUMN_HEIGHT }}
    >
      <div style={{ height: (COLUMN_HEIGHT - ITEM_HEIGHT) / 2 }} />
      {items.map((item) => {
        const isSelected = item.value === selected;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => scrollItemToCenter(item.value)}
            style={{ height: ITEM_HEIGHT, scrollSnapAlign: "center" }}
            className={cn(
              "flex w-full shrink-0 items-center justify-center text-sm tabular-nums transition-all duration-150",
              isSelected
                ? "scale-105 font-semibold text-[#006F42]"
                : "text-[#9CA3AF] hover:text-[#374151]",
            )}
          >
            {item.label}
          </button>
        );
      })}
      <div style={{ height: (COLUMN_HEIGHT - ITEM_HEIGHT) / 2 }} />
    </div>
  );
}

const HOURS: TimeColumnItem[] = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1).padStart(2, "0"),
  value: i + 1,
}));

const MINUTES: TimeColumnItem[] = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, "0"),
  value: i,
}));

const PERIODS: TimeColumnItem[] = [
  { label: "AM", value: 0 },
  { label: "PM", value: 1 },
];

export function TimePicker({
  value,
  onChange,
  className,
}: {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
  className?: string;
}) {
  const hour12 = value.hours % 12 === 0 ? 12 : value.hours % 12;
  const period = value.hours >= 12 ? 1 : 0;

  const setHour12 = (h: number) => {
    const hours = period === 1 ? (h % 12) + 12 : h % 12;
    onChange({ ...value, hours });
  };

  const setMinutes = (minutes: number) => onChange({ ...value, minutes });

  const setPeriod = (p: number) => {
    const base = value.hours % 12;
    onChange({ ...value, hours: p === 1 ? base + 12 : base });
  };

  return (
    <div
      className={cn(
        "flex w-[176px] flex-col border-l border-[#F3F4F6]",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-1.5 border-b border-[#F3F4F6] py-2.5 text-xs font-medium text-[#374151]">
        <Clock size={13} strokeWidth={2} className="text-[#006F42]" />
        Select time
      </div>

      <div className="relative flex justify-center px-2">
        {/* Selection band highlighting the centered row */}
        <div
          className="pointer-events-none absolute inset-x-2 z-0 rounded-md bg-[#F0FBF5]"
          style={{
            top: (COLUMN_HEIGHT - ITEM_HEIGHT) / 2,
            height: ITEM_HEIGHT,
          }}
        />
        {/* Fade masks top/bottom to hint scrollability */}
        <div className="pointer-events-none absolute inset-x-2 top-0 z-10 h-6 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-2 bottom-0 z-10 h-6 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-0 flex gap-2">
          <TimeColumn items={HOURS} selected={hour12} onSelect={setHour12} />
          <TimeColumn
            items={MINUTES}
            selected={value.minutes}
            onSelect={setMinutes}
          />
          <TimeColumn items={PERIODS} selected={period} onSelect={setPeriod} />
        </div>
      </div>
    </div>
  );
}
