import { AlertDialog, Button } from "@uengage/ui";
import { useState } from "react";

export default function AlertDialogPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)} />
      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Saved"
        description="This will close automatically."
        showActions={false}
        autoCloseMs={2000}
        closeOnOverlayClick
      />
    </>
  );
}
