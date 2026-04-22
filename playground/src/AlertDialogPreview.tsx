import {AlertDialog, Button} from "@uengage/ui"
import { useState } from "react"

export default function AlertPreview() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <AlertDialog
      trigger={<button>Open</button>}
      title="Are you sure?"
      description="This action cannot be undone."
      confirmButtonText="Delete"
      showCancelButton
    />
      
    </>
  )
}