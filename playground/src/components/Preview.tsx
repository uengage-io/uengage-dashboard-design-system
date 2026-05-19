import { SearchBar, DatePicker, Select, Input } from "@/index";
import { ArrowBigRight } from "lucide-react";

export default function Preview(){
  return(
    <div className="flex flex-col gap-4 w-[200px]">
      <SearchBar placeholder="Search..." />
      <DatePicker />
      <Select options={[{label: "Option 1", value: "option1"}, {label: "Option 2", value: "option2"}]} placeholder="Select an option" />
      <Input placeholder="Enter text..." onTouch={()=>console.log("onTouch")}
       />
    </div>
  )
}