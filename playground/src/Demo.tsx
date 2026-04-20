import {Tabs} from "@uengage/ui";
export default function Demo(){
  const dummy=[
    { value: "tickets", label: "Tickets made by me" },
    { value: "teams", label: "Teams" },
    { value: "projects", label: "Projects" },
    { value: "sprints", label: "Sprints" },
    { value: "created-by-me", label: "Created By Me" },
  ]
  return(
<>
<Tabs
variant="secondary"
tabs={dummy}
defaultValue="tickets"

>

</Tabs>
</>

  );
}