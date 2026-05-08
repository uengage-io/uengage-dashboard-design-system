import * as React from "react";
import { DatePicker } from "@uengage/ui";
import type { DateRange } from "@uengage/ui";

export default function DatePickerPreview() {
  // Single date state
  const [singleDate, setSingleDate] = React.useState<Date | null>(new Date());

  // Range date state
  const [rangeDate, setRangeDate] = React.useState<DateRange | null>({
    from: new Date(),
    to: new Date(),
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Single Date Picker */}
      <DatePicker
        mode="single"
        value={new Date()}
        onChange={(date) => setSingleDate(date as Date | null)}
        placeholder="Select a date"
        size="md"
        width="w-[280px]"
        className="border"
        disabled={false}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
        onTouch={() => console.log("Single picker touched")}
      />

      {/* Range Date Picker */}
      <DatePicker
        mode="range"
        value={rangeDate}
        onChange={(range) => setRangeDate(range as DateRange | null)}
        placeholder="Select date range"
        size="lg"
        width="w-[320px]"
        className="border"
        disabled={false}
        minDate={new Date(2025, 0, 1)}
        maxDate={new Date(2026, 11, 31)}
        onTouch={() => console.log("Range picker touched")}
      />
      <DatePicker
        mode="single"
        value={new Date(2026, 4, 9)}
        onChange={(date) => console.log("Changing", date)}
        placeholder="Enter Single Date"
        size="md"
        minDate={new Date(2026,4,1)}
        maxDate={new Date(2026,4,9)}
      />
      <DatePicker
      mode="range"
      value={{from:new Date(2026,4,1),to: new Date(2026,4,9)}}
      minDate={new Date(2026,4,1)}
      maxDate={new Date(2026,4,9)}
      
      />
    </div>
  );
}
