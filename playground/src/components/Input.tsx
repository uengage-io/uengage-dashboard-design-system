import {Input} from "@uengage/ui";
import { useState } from "react";
const dummy = [
  { value: "tickets", label: "Tickets made by me" },
  { value: "teams", label: "Teams" },
  { value: "projects", label: "Projects" ,disabled:true},
  { value: "sprints", label: "Sprints" },
  { value: "created-by-me", label: "Created By Me" },
];
export default function InputPreview() {
  const [tab, setTab] = useState("tickets");

  return (
<div className="w-[200px]">
  <Input
  label="Enter Name"
  placeholder="Enter Your Name"
  allowPattern="phone"
  />
</div>
  );
}
