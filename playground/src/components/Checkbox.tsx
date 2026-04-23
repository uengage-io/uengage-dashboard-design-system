import {Checkbox, CheckboxGroup} from "@uengage/ui";
import { useState } from "react";
const dummy = [
  { value: "tickets", label: "Tickets made by me" },
  { value: "teams", label: "Teams" },
  { value: "projects", label: "Projects" },
  { value: "sprints", label: "Sprints" },
  { value: "created-by-me", label: "Created By Me" },
];
export default function CheckboxPreview() {
  const [tab, setTab] = useState("tickets");

  return (
    <>
      {/* <Checkbox
        label="Tickets made by me"
        size="md"
        // checked={true}
        // indeterminate
        // error={true}
      
        onCheckedChange={() => console.log("changing 1")}
      /> */}
      <CheckboxGroup
      options={dummy}
      getLabel={(i)=>i.label}
      getValue={(i)=>i.value}
    //   getDisabled={(i)=>i.disabled}
      // value={["tickets","teams"]}
      onChange={(val)=>console.log('changing',val)}
      size="sm"
    //  layout="vertical"
    //  columns={2}
    // disabled={true}
    label="Choose options"
    helperText="These are the options"
    // error="This is error"
    selectAll={true}    
      />
<br />
     
    </>
  );
}
      
     
  
