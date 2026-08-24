import { AlertDialog, SweetAlertProvider, useSweetAlert, Button } from "@uengage/ui";
import { Rocket } from "lucide-react";
import { useState } from "react";

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <p style={{ fontWeight: 600, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", marginBottom: "0.75rem" }}>
        {title}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
}

// ─── Result display ───────────────────────────────────────────────────────────
function Result({ result }: { result: unknown }) {
  if (!result) return null;
  return (
    <pre style={{ marginTop: "0.5rem", padding: "0.5rem 0.75rem", background: "#f3f4f6", borderRadius: 6, fontSize: "0.75rem", color: "#374151" }}>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}

// ─── 1. Declarative examples (AlertDialog directly) ──────────────────────────
function DeclarativeExamples() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      {/* Icon variants */}
      <Section title="Icon variants">
        {(["success", "error", "warning", "info", "question"] as const).map((v) => (
          <Button key={v} variant="secondary" size="sm" title={v} onClick={() => setOpen(v)} />
        ))}
        <Button variant="secondary" size="sm" title="custom icon (Rocket)" onClick={() => setOpen("custom")} />
      </Section>

      <AlertDialog open={open === "success"} onOpenChange={() => setOpen(null)}
        icon="success" title="Order placed!" text="Your order #A-2048 is confirmed." showActions={false} autoCloseMs={3000} />

      <AlertDialog open={open === "error"} onOpenChange={() => setOpen(null)}
        icon="error" title="Payment failed" text="We couldn't charge your card. Please retry." showActions={false} />

      <AlertDialog open={open === "warning"} onOpenChange={() => setOpen(null)}
        icon="warning" title="Unsaved changes" text="Leaving this page will discard your edits." showActions={false} />

      <AlertDialog open={open === "info"} onOpenChange={() => setOpen(null)}
        icon="info" title="New features available" text="Check out the revamped dispatch board in Settings → Beta." showActions={false} />

      <AlertDialog open={open === "question"} onOpenChange={() => setOpen(null)}
        icon="question" title="Not sure yet?" text="You can always change this later in your account settings." showActions={false} />

      <AlertDialog open={open === "custom"} onOpenChange={() => setOpen(null)}
        icon={Rocket} variant="info" title="Launch scheduled!" text="The pilot starts at 09:00 tomorrow." showActions={false} />

      {/* Trigger prop */}
      <Section title="Using trigger prop (uncontrolled)">
        <AlertDialog
          trigger={<Button variant="primary" size="sm" title="Open with trigger" />}
          icon="success"
          title="Triggered dialog"
          text="This dialog uses the trigger prop — no useState needed."
          showActions={false}
        />
      </Section>

      {/* Confirm + cancel */}
      <Section title="Confirm + cancel buttons">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Delete item?" />}
          icon="warning"
          title="Delete driver?"
          text="This will remove Rahul Sharma from all future shifts."
          showCancelButton
          confirmButtonText="Yes, delete"
          confirmButtonVariant="alertPrimary"
          cancelButtonText="Cancel"
        />
      </Section>

      {/* Custom footer */}
      <Section title="Custom footer">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Custom footer" />}
          icon="warning"
          title="Custom footer buttons"
          text="Footer slot overrides the default buttons entirely."
          footer={
            <>
              <Button variant="secondary" size="sm" title="Maybe later" />
              <Button variant="alertPrimary" size="sm" title="Delete now" />
            </>
          }
        />
      </Section>

      {/* No actions */}
      <Section title="Status-only (no buttons)">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Status only" />}
          icon="success"
          title="Saved!"
          text="Your changes were saved. This closes on backdrop click."
          showActions={false}
        />
      </Section>

      {/* Auto-close */}
      <Section title="Auto-close (2 s)">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Auto-close demo" />}
          icon="success"
          title="Auto-closing in 2 s"
          text="This dialog dismisses itself automatically."
          showActions={false}
          autoCloseMs={2000}
        />
      </Section>

      {/* Size sm */}
      <Section title="Small size">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Small dialog" />}
          icon="info"
          title="Compact dialog"
          text="Uses size='sm' for a narrower panel."
          size="sm"
          showCancelButton
        />
      </Section>

      {/* Backdrop / ESC locked */}
      <Section title="Close locked (no ESC / backdrop)">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Locked dialog" />}
          icon="warning"
          title="You must confirm"
          text="closeOnOverlayClick and closeOnEsc are both false."
          closeOnOverlayClick={false}
          closeOnEsc={false}
          showCancelButton
        />
      </Section>
    </>
  );
}

// ─── 2. Input & async examples ────────────────────────────────────────────────
function InputExamples() {
  return (
    <>
      {/* Text input + validator */}
      <Section title="Text input with validation">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Enter coupon" />}
          icon="info"
          title="Enter coupon code"
          input="text"
          inputPlaceholder="e.g. SAVE20"
          showCancelButton
          confirmButtonText="Apply"
          inputValidator={(v) =>
            String(v).trim().length < 4 ? "Code must be at least 4 characters" : null
          }
        />
      </Section>

      {/* Textarea + validator */}
      <Section title="Textarea input">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Reject with reason" />}
          icon="warning"
          title="Provide rejection reason"
          input="textarea"
          inputPlaceholder="Type yourx reason here…"
          showCancelButton
          confirmButtonText="Submit"
          inputValidator={(v) =>
            String(v).trim().length < 10 ? "Please write at least 10 characters" : null
          }
        />
      </Section>

      {/* Async preConfirm (success) */}
      <Section title="Async preConfirm (simulated API call)">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Async confirm" />}
          icon="info"
          title="Save to server?"
          text="Simulates a 1.5 s API call on confirm."
          showCancelButton
          confirmButtonText="Save"
          preConfirm={async () => {
            await new Promise((r) => setTimeout(r, 1500));
          }}
        />
      </Section>

      {/* Async preConfirm (throws) */}
      <Section title="Async preConfirm — throws error">
        <AlertDialog
          trigger={<Button variant="secondary" size="sm" title="Failing async" />}
          icon="error"
          title="This will fail"
          text="preConfirm throws after 1 s — error is shown inline."
          showCancelButton
          confirmButtonText="Try it"
          preConfirm={async () => {
            await new Promise((r) => setTimeout(r, 1000));
            throw new Error("Server returned 500 — please try again");
          }}
        />
      </Section>
    </>
  );
}

// ─── 3. Imperative API (useSweetAlert) ───────────────────────────────────────
function ImperativeExamples() {
  const { fire } = useSweetAlert();
  const [lastResult, setLastResult] = useState<unknown>(null);

  const demo = async (label: string, options: Parameters<typeof fire>[0]) => {
    const result = await fire(options);
    setLastResult({ demo: label, ...result });
  };

  return (
    <>
      <Section title="Imperative fire() — basic">
        <Button variant="secondary" size="sm" title="Simple info"
          onClick={() => demo("info", { icon: "info", title: "Hello!", text: "Fired imperatively via useSweetAlert().", showActions: false })} />

        <Button variant="secondary" size="sm" title="Confirm dialog"
          onClick={() => demo("confirm", { icon: "warning", title: "Are you sure?", text: "This action is irreversible.", showCancelButton: true, confirmButtonText: "Yes, proceed", confirmButtonVariant: "alertPrimary" })} />
      </Section>

      <Section title="Imperative fire() — input + async">
        <Button variant="secondary" size="sm" title="fire() with input"
          onClick={() => demo("input", {
            icon: "question",
            title: "What's your name?",
            input: "text",
            inputPlaceholder: "Your name…",
            showCancelButton: true,
            inputValidator: (v) => (String(v).trim() ? null : "Name is required"),
          })} />

        <Button variant="secondary" size="sm" title="fire() with async preConfirm"
          onClick={() => demo("async", {
            icon: "info",
            title: "Process payment?",
            showCancelButton: true,
            confirmButtonText: "Pay now",
            preConfirm: async () => {
              await new Promise((r) => setTimeout(r, 1500));
            },
          })} />
      </Section>

      <Result result={lastResult} />
    </>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function AlertDialogPreview() {
  return (
    <SweetAlertProvider>
      <div style={{ padding: "2rem", maxWidth: 900, fontFamily: "Figtree, sans-serif" }}>
        <h2 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: "2rem" }}>AlertDialog</h2>

        <DeclarativeExamples />

        <hr style={{ margin: "2rem 0", borderColor: "#e5e7eb" }} />
        <h3 style={{ fontWeight: 600, marginBottom: "1.25rem" }}>Input &amp; Async</h3>
        <InputExamples />

        <hr style={{ margin: "2rem 0", borderColor: "#e5e7eb" }} />
        <h3 style={{ fontWeight: 600, marginBottom: "1.25rem" }}>Imperative API — useSweetAlert()</h3>
        <ImperativeExamples />
      </div>
    </SweetAlertProvider>
  );
}
