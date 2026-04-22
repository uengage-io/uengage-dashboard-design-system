import {Tabs} from "@uengage/ui";
import { useState } from "react";
const dummy = [
  { value: "tickets", label: "Tickets made by me" },
    { value: "teams", label: "Teams" },
    { value: "projects", label: "Projects" },
    { value: "sprints", label: "Sprints" },
    { value: "created-by-me", label: "Created By Me" },
];
export default function TabsPreview() {
  const [tab, setTab] = useState("tickets");

  return (
    <>
      <Tabs
        variant="primary"
        value={tab}
        tabs={dummy}
        defaultValue="tickets"
        onChange={() => console.log("Changing")}
      />
      <Tabs 
        variant="secondary"
        tabs={dummy}
        defaultValue="tickets"
        onChange={() => console.log("Changing")}
      />
    </>
  );
}
