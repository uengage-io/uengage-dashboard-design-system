import { brand } from "@/utils/colors";

const g = brand.green;

export const button = {
  primary: {
    default: {
      background: [g.green, g.deepGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF",
    },
    hover: {
      background: [g.darkGreen, g.darkestGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF",
    },
    pressed: {
      background: [g.darkGreen, g.darkestGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF",
    },
    focused: {
      background: [g.green, g.deepGreen],
      border: [g.mintGreen],
      borderWidth: 2,
      text: "#FFFFFF",
    },
    disabled: {
      background: ["#DDDDDD"],
      border: ["#E9E9E9"],
      borderWidth: 2,
      text: "#595959",
      opacity: 0.4,
    },
  },

  secondary: {
    default: {
      background: ["#FFFFFF"],
      border: ["#E4E4E4", "#9C9C9C"],
      borderWidth: 2,
      text: g.forestGreen,
    },
    hover: {
      background: ["#EDEDED", "#FFFFFF"],
      border: ["#E4E4E4", "#9C9C9C"],
      borderWidth: 2,
      text: g.forestGreen,
    },
    pressed: {
      background: ["#EDEDED"],
      border: ["#E4E4E4", "#9C9C9C"],
      borderWidth: 2,
      text: g.forestGreen,
    },
    focused: {
      background: ["#FFFFFF"],
      border: [g.lightGreen],
      borderWidth: 2,
      text: g.forestGreen,
    },
    disabled: {
      background: ["#EDEDED"],
      border: ["#FEFEFE", "#B0B0B0"],
      borderWidth: 2,
      text: "#595959",
      opacity: 0.4,
    },
  },

  tertiary: {
    default: {
      background: "transparent",
      border: "transparent",
      borderWidth: 2,
      text: g.forestGreen,
    },
    hover: {
      background: "transparent",
      border: [g.lightGreen],
      borderWidth: 2,
      text: g.forestGreen,
    },
    pressed: {
      background: [g.paleGreen],
      border: [g.softGreen],
      borderWidth: 2,
      text: g.forestGreen,
    },
    focused: {
      background: [g.paleGreen],
      border: [g.mintGreen],
      borderWidth: 2,
      text: g.forestGreen,
    },
    disabled: {
      background: "transparent",
      border: "transparent",
      borderWidth: 2,
      text: "#595959",
      opacity: 0.4,
    },
  },

  alertPrimary: {
    default: {
      background: ["#D01D1D"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF",
    },
    hover: {
      background: ["#B21E1E"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF",
    },
    pressed: {
      background: ["#940000"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF",
    },
  },

  warningPrimary: {
    default: {
      background: ["#FEF8CD"],
      border: ["#FFE47A", "#D4B020"],
      borderWidth: 2,
      text: "#595959",
    },
    hover: {
      background: ["#FCDB04"],
      border: ["#FFE47A", "#D4B020"],
      borderWidth: 2,
      text: "#595959",
    },
    pressed: {
      background: ["#F2D100"],
      border: ["#FFE47A", "#D4B020"],
      borderWidth: 2,
      text: "#595959",
    },
  },

  alertSecondary: {
    default: {
      background: ["#FFF7F6"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#DC2626",
    },
    hover: {
      background: ["#D01D1D"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF",
    },
    pressed: {
      background: ["#B21E1E"],
      border: ["#FF8181", "#802828"],
      borderWidth: 2,
      text: "#FFFFFF",
    },
  },
} as const;
