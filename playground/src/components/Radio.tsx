import { RadioGroup ,Radio} from "@uengage/ui";
import { useState } from "react";
const dummy = [
  { value: "tickets", label: "Tickets made by me" },
  { value: "teams", label: "Teams" },
  { value: "projects", label: "Projects" ,disabled:true},
  { value: "sprints", label: "Sprints" },
  { value: "created-by-me", label: "Created By Me" },
];
export default function RadioPreview() {

  return (
    <>
    <RadioGroup
    options={dummy}
    getValue={(item)=>item.value}
    getLabel={(item)=>item.label}
    getDisabled={(item)=>item.disabled}
    // value={tab}
    // defaultValue="tickets"
    size="sm"
    layout="vertical"
    onChange={(val)=>console.log("changing",val)}
    label={"Choose an option"}
    helperText={"Helper text goes here"}
    // error={"This is an error message"}


   /> 
<br />
    </>
  );
}
