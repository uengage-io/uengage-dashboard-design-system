import { Input, Select, SearchBar, DatePicker } from "@uengage/ui";

export default function PrevDemo() {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Input placeholder="Type something..." />
      <Select placeholder="Select option" />
      <SearchBar placeholder="Search..." />
      <DatePicker />
    </div>
  );
}
