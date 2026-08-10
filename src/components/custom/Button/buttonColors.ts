export const button = {
  primary: {
    default: {
      background: "#003C1B",
      backgroundImage: "linear-gradient(180deg, #0A5A2C 0%, #003C1B 100%)",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.14), 2px 2px 4px rgba(0,60,27,0.2)",
    },
    hover: {
      background: "#00331A",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "0 4px 12px rgba(0,60,27,0.26)",
    },
    pressed: {
      background: "#002813",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "none",
    },
    focused: {
      background: "#003C1B",
      backgroundImage: "linear-gradient(180deg, #0A5A2C 0%, #003C1B 100%)",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "0 0 0 3px rgba(140,196,42,0.45)",
    },
    disabled: {
      background: "#F3F5F9",
      border: "#E2E2E2",
      borderWidth: 1,
      text: "#9C9C9C",
      boxShadow: "none",
    },
  },

  secondary: {
    default: {
      background: "#FFFFFF",
      border: "#BFD6C6",
      borderWidth: 1,
      text: "#003C1B",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.04)",
    },
    hover: {
      background: "#F5FFF0",
      border: "#1F5E2C",
      borderWidth: 1,
      text: "#003C1B",
      boxShadow: "none",
    },
    pressed: {
      background: "#E8F5DE",
      border: "#1F5E2C",
      borderWidth: 1,
      text: "#003C1B",
      boxShadow: "none",
    },
    focused: {
      background: "#FFFFFF",
      border: "#1F5E2C",
      borderWidth: 1,
      text: "#003C1B",
      boxShadow: "0 0 0 3px rgba(140,196,42,0.45)",
    },
    disabled: {
      background: "#EEEEEE",
      border: "#E2E2E2",
      borderWidth: 1,
      text: "#9C9C9C",
      boxShadow: "none",
    },
  },

  tertiary: {
    default: {
      background: "transparent",
      border: "transparent",
      borderWidth: 0,
      text: "#1F5E2C",
      boxShadow: "none",
    },
    hover: {
      background: "#E6F5DC",
      border: "transparent",
      borderWidth: 0,
      text: "#1F5E2C",
      boxShadow: "none",
    },
    pressed: {
      background: "#DCF3CE",
      border: "transparent",
      borderWidth: 0,
      text: "#003C1B",
      boxShadow: "none",
    },
    focused: {
      background: "transparent",
      border: "transparent",
      borderWidth: 0,
      text: "#1F5E2C",
      boxShadow: "0 0 0 3px rgba(140,196,42,0.45)",
    },
    disabled: {
      background: "transparent",
      border: "transparent",
      borderWidth: 0,
      text: "#9C9C9C",
      boxShadow: "none",
    },
  },

  alertPrimary: {
    default: {
      background: "#A8000F",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "2px 2px 4px rgba(168,0,15,0.2)",
    },
    hover: {
      background: "#8E000D",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "0 4px 12px rgba(168,0,15,0.24)",
    },
    pressed: {
      background: "#760009",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "none",
    },
  },

  warningPrimary: {
    default: {
      background: "#FFF6D6",
      border: "#EFD98A",
      borderWidth: 1,
      text: "#6A5300",
      boxShadow: "none",
    },
    hover: {
      background: "#FFEFB8",
      border: "#E0C866",
      borderWidth: 1,
      text: "#6A5300",
      boxShadow: "none",
    },
    pressed: {
      background: "#FBE7A0",
      border: "#E0C866",
      borderWidth: 1,
      text: "#4A3B00",
      boxShadow: "none",
    },
  },

  alertSecondary: {
    default: {
      background: "#FFF7F6",
      border: "#E4A6AC",
      borderWidth: 1,
      text: "#A8000F",
      boxShadow: "none",
    },
    hover: {
      background: "#A8000F",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "2px 2px 4px rgba(168,0,15,0.2)",
    },
    pressed: {
      background: "#760009",
      border: "transparent",
      borderWidth: 0,
      text: "#FFFFFF",
      boxShadow: "none",
    },
  },
} as const;
