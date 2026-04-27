import { Modal, Button } from "@uengage/ui";
import { useState } from "react";

type ModalSize = "small" | "medium" | "md" | "default" | "large" | "full";

const sizes: ModalSize[] = ["small", "medium", "md", "default", "large", "full"];

export default function ModalPreview() {
  const [openSize, setOpenSize] = useState<ModalSize | null>(null);
  const [noHeaderOpen, setNoHeaderOpen] = useState(false);
  const [scrollOpen, setScrollOpen] = useState(false);

  return (
    <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h2 style={{ fontWeight: 700, fontSize: "1.25rem" }}>Modal — Size Variants</h2>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        {sizes.map((size) => (
          <Button key={size} variant="secondary" size="sm" title={size} onClick={() => setOpenSize(size)} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Button variant="secondary" size="sm" title="No Header" onClick={() => setNoHeaderOpen(true)} />
        <Button variant="secondary" size="sm" title="Scrollable Body" onClick={() => setScrollOpen(true)} />
      </div>

      {/* Size variant modals */}
      {sizes.map((size) => (
        <Modal
          key={size}
          isOpen={openSize === size}
          onClose={() => setOpenSize(null)}
          title={`Modal — ${size}`}
          size={size}
        >
          <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
            This is a <strong>{size}</strong> modal. Close it by clicking the × button or the backdrop.
          </p>
        </Modal>
      ))}

      {/* No header modal */}
      <Modal isOpen={noHeaderOpen} onClose={() => setNoHeaderOpen(false)} showCloseButton={false}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>
            This modal has no header and no close button. Click the backdrop to dismiss.
          </p>
          <Button variant="primary" size="sm" title="Close" onClick={() => setNoHeaderOpen(false)} />
        </div>
      </Modal>

      {/* Scrollable body modal */}
      <Modal
        isOpen={scrollOpen}
        onClose={() => setScrollOpen(false)}
        title="Scrollable Content"
        size="medium"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} style={{ fontSize: "0.875rem", color: "#4b5563" }}>
              Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
            </p>
          ))}
        </div>
      </Modal>
    </div>
  );
}
