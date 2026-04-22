import {Select} from "@uengage/ui";
import { useState } from "react";
const dummy = [
  { value: "tickets", label: "Tickets made by me" },
  { value: "teams", label: "Teams" },
  { value: "projects", label: "Projects" },
  { value: "sprints", label: "Sprints" },
  { value: "created-by-me", label: "Created By Me" },
];
export default function SelectPreview() {
  const [value, setValue] = useState("");

  return (
    <>
    <div className="relative w-[200px]">
     <Select 
     items={dummy}
     getLabel={(i)=>i.label}
    getValue={(i)=>i.value}
    value={value}
    mode="single"
    size="md"
    placeholder="Select"
    onChange={(val)=>console.log("Selected:", val)}

    
     />
       <Select 
     items={dummy}
     getLabel={(i)=>i.label}
    getValue={(i)=>i.value}
    value={value}
    mode="multi"
    size="md"
    placeholder="Select"
    onChange={(val)=>console.log("Selected:", val)}

    
     />

     </div>
    </>
  );
}
      
     
  
