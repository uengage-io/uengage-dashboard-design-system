import { DatePicker } from "@uengage/ui";
export default function DatePickerPreview() {
  return (
    <div className="w-[200px]">
        <br />  
      <DatePicker
        placeholder="Select an Date"
        mode="single"
        onChange={(date) => console.log("Selected date:", date)}
      />
     
      <DatePicker
        placeholder="Select an Date"
        mode="range"
        onChange={(date) => console.log("Selected date:", date)}
      />
    </div>
  );
}
