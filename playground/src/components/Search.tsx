import {SearchBar} from "@uengage/ui";
import { useState } from "react";
const dummy = [
  { value: "tickets", label: "Tickets made by me" },
  { value: "teams", label: "Teams" },
  { value: "projects", label: "Projects" },
  { value: "sprints", label: "Sprints" },
  { value: "created-by-me", label: "Created By Me" },
];
export default function SearchPreview() {
  const [value, setValue] = useState("");

  return (
    <>
    <div className="relative w-[200px]">
     <SearchBar 
     placeholder="Search..." 
    value={value}
    valueType="string"
    size="sm"
    clearable={true}
    // disabled={true}
    onChange={(val)=>setValue(val)}
    onSearch={()=>console.log("Search:", value)}
    onClear={()=>setValue("")}
    dropdownItems={dummy}
    getLabel={(i)=>i.label}
    getValue={(i)=>i.value}
    onSelect={(val)=>console.log("Selected:",val)}
    fallbackText="No result found"
    
     />

     </div>
    </>
  );
}
      
     
  
