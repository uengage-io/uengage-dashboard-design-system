import * as React from "react";
import { Banner } from "@uengage/ui";

export default function BannerPreview() {
  return (
    <div
      style={{
        fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif",
        maxWidth: 900,
        margin: "0 auto",
        padding: "48px 32px 80px",
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>
          Banner
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
          Inline contextual messages for info, success, and error states. Supports custom colors and icon overrides.
        </p>
      </div>

      {/* ── Variants ─────────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
          Variants
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Banner variant="info" message="The requested file will be available for download within 5–10 minutes from the requested time." />
          <Banner variant="success" message="Payment processed successfully. Your order is confirmed." />
          <Banner variant="warning" message="Your session will expire in 10 minutes. Save your work to avoid losing changes." />
          <Banner variant="error" message="Something went wrong. Please try again or contact support." />
        </div>
      </section>

      {/* ── Without icon ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
          Without icon
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Banner variant="info" showIcon={false} message="Scheduled maintenance window: Sunday 2 AM – 4 AM." />
          <Banner variant="success" showIcon={false} message="Your account has been verified." />
          <Banner variant="warning" showIcon={false} message="Some features may be limited during peak hours." />
          <Banner variant="error" showIcon={false} message="Unable to load data. Check your connection." />
        </div>
      </section>

      {/* ── Rich children ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
          Rich content via children
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Banner variant="info">
            <span>
              A new version is available.{" "}
              <a href="#" style={{ color: "inherit", fontWeight: 600, textDecoration: "underline" }}>
                Refresh to update
              </a>
            </span>
          </Banner>
          <Banner variant="error">
            <span>
              3 items failed to sync.{" "}
              <a href="#" style={{ color: "inherit", fontWeight: 600, textDecoration: "underline" }}>
                View errors
              </a>
            </span>
          </Banner>
        </div>
      </section>

      {/* ── Custom colors ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16, paddingBottom: 8, borderBottom: "1px solid #f3f4f6" }}>
          Custom colors
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Banner
            backgroundColor="#FFF7ED"
            borderColor="#FDBA74"
            iconColor="#EA580C"
            textColor="#9A3412"
            message="Your trial expires in 3 days. Upgrade to keep access."
          />
          <Banner
            backgroundColor="#F5F3FF"
            borderColor="#C4B5FD"
            iconColor="#7C3AED"
            textColor="#4C1D95"
            message="Feature flag enabled: new dashboard layout is active for your account."
          />
        </div>
      </section>
    </div>
  );
}
