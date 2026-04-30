import { Sidebar } from "@/components/custom/sidebar"
import { useState } from "react"

type SideKey = "left" | "right" | "top" | "bottom"

const VARIANTS: {
  key: SideKey
  label: string
  origin: string
  color: string
}[] = [
  { key: "left",   label: "Left",   origin: "bottom-left corner",  color: "#0B4D3A" },
  { key: "right",  label: "Right",  origin: "bottom-right corner", color: "#1D4ED8" },
  { key: "top",    label: "Top",    origin: "top-left corner",     color: "#7C3AED" },
  { key: "bottom", label: "Bottom", origin: "bottom-right corner", color: "#B45309" },
]

type OpenState = Record<SideKey, boolean>

const CLOSED: OpenState = {
  left: false, right: false, top: false, bottom: false,
}

export default function SidebarPreview() {
  const [open, setOpen] = useState<OpenState>(CLOSED)

  const toggle = (side: SideKey) =>
    setOpen((prev) => ({ ...CLOSED, [side]: !prev[side] }))

  const close = (side: SideKey) =>
    setOpen((prev) => ({ ...prev, [side]: false }))

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F3F4F6",
        fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "20px 32px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827" }}>
          Sidebar Variants
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6B7280" }}>
          Click any button to open that sidebar variant. All use the same smooth scale animation.
        </p>
      </div>

      {/* Trigger grid */}
      <div style={{ padding: 32 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {VARIANTS.map(({ key, label, origin, color }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              style={{
                background: open[key] ? color : "#fff",
                color: open[key] ? "#fff" : color,
                border: `2px solid ${color}`,
                borderRadius: 10,
                padding: "16px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "background 120ms, color 120ms",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Opens from {origin}</div>
            </button>
          ))}
        </div>

        {/* Demo content so there's something behind the sidebars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 24,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                minHeight: 120,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 6,
                  borderRadius: 4,
                  background: "#E5E7EB",
                  marginBottom: 12,
                }}
              />
              <div
                style={{
                  width: "80%",
                  height: 6,
                  borderRadius: 4,
                  background: "#F3F4F6",
                  marginBottom: 8,
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: 6,
                  borderRadius: 4,
                  background: "#F3F4F6",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar instances */}
      {VARIANTS.map(({ key, label, color }) => (
        <Sidebar
          key={key}
          open={open[key]}
          side={key}
          onOpenChange={(next) => setOpen((prev) => ({ ...prev, [key]: next }))}
          size="md"
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {label} Sidebar
              </h2>
              <button
                onClick={() => close(key)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#6B7280",
                  lineHeight: 1,
                  padding: 4,
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  style={{
                    background: "#F9FAFB",
                    borderRadius: 8,
                    padding: "12px 16px",
                    border: "1px solid #E5E7EB",
                  }}
                >
                  <div
                    style={{
                      width: `${70 - n * 10}%`,
                      height: 8,
                      borderRadius: 4,
                      background: "#E5E7EB",
                      marginBottom: 6,
                    }}
                  />
                  <div
                    style={{
                      width: "50%",
                      height: 6,
                      borderRadius: 4,
                      background: "#F3F4F6",
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => close(key)}
              style={{
                marginTop: 24,
                background: color,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
              }}
            >
              Close
            </button>
          </div>
        </Sidebar>
      ))}
    </div>
  )
}
