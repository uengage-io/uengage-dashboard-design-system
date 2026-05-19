import { AlertDialog, Button } from "@uengage/ui";
import { useState } from "react";
import { Rocket } from "lucide-react";
export default function Dialog() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AlertDialog
        title="Demo Title"
        open={open}
        variant="error"
        icon={"question"}
        description="This is a demo description"
        size="default"
        confirmButtonText="Confirm"
        cancelButtonText="Demo Cancel"
        showCancelButton={true}
        showActions={true}
        // footer="This is a demo footer"
        input="textarea"
        inputPlaceholder="Enter Text"
        onOpenChange={setOpen}
        closeOnEsc={true}
        closeOnOverlayClick={true}
        //  trigger={<Button>Open Dialog</Button>}
        // autoCloseMs={2000}
        inputValidator={(value) =>
          value.trim().length < 3 ? "Name must be at least 3 characters" : null

        }
        preConfirm={async()=>{await new Promise((resolve) => setTimeout(resolve, 1000));}}
      />
    </>
  );
}
