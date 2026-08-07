import React from "react";
import { Loader } from "@uengage/ui";



export default function LoaderPreview() {
  const [loading, setLoading] = React.useState(false);

  const handleSync = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div
      style={{
        minHeight: "10vh",
        background: "#F3F4F6",
        padding: 32,
        fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {loading && <Loader />}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" }}>Dashboard</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6B7280" }}>
            Here's what's happening with your store today.
          </p>
        </div>
        <button
          onClick={handleSync}
          style={{
            background: "#0B4D3A",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: 0.2,
          }}
        >
          Sync Data
        </button>
      </div>

     
    </div>
  );
}
