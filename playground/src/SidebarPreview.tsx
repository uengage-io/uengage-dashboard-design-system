import { Sidebar } from "@/components/custom/sidebar"
import { Button } from "@uengage/ui"
import { useState } from "react"
import { X } from "lucide-react"

export default function SidebarPreview() {
  const [open,setOpen]=useState(false)
  return(
    <>
    <Button size="md" title="Open" onClick={()=>setOpen(!open)}/>
    <Sidebar
    open={open}
    side="right"
    onOpenChange={(next)=>setOpen(next)}
    size="md"
    // overlay={false}
    // persistentOnDesktop={true}
  
    >
      <span>This is the sidebar</span>
      </Sidebar>
    </>
  );
  
}