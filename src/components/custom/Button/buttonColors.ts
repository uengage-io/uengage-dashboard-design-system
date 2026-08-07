import { brand } from "@/utils/colors";

const g = brand.green;

export const button = {
  primary: {
    default: {
      background: [g.green, g.deepGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF",
      backgroundGradient: "linear-gradient(128.73deg, #00A86B -0.83%, #003C1B 95.78%)",
    },
    hover: {
      background: [g.darkGreen, g.darkestGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF",
      backgroundGradient: "linear-gradient(92.3deg, #006F42 -11.82%, #001E00 101.34%)",
    },
    pressed: {
      background: [g.darkGreen, g.darkestGreen],
      border: [g.mintGreen, g.darkerGreen],
      borderWidth: 2,
      text: "#FFFFFF",
      backgroundGradient: "linear-gradient(92.3deg, #006F42 -11.82%, #001E00 101.34%)",
    },
    focused: {
      background: [g.green, g.deepGreen],
      border: [g.mintGreen],
      borderWidth: 2,
      text: "#FFFFFF",
      backgroundGradient: "linear-gradient(128.73deg, #00A86B -0.83%, #003C1B 95.78%)",
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
      backgroundGradient: "linear-gradient(0deg, #EDEDED 0%, rgba(255, 255, 255, 0.6) 100%)",
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
      backgroundGradient: "linear-gradient(180deg, rgba(200, 231, 184, 0.01) 0%, rgba(200, 231, 184, 0.07) 100%)",
    },
    hover: {
      background: [g.paleGreen],
      border: [g.paleGreen],
      borderWidth: 2,
      text: g.forestGreen,
      backgroundGradient: "linear-gradient(180deg, rgba(200, 231, 184, 0.01) 0%, rgba(200, 231, 184, 0.07) 100%)",
    },
    pressed: {
      background: [g.paleGreen],
      border: [g.lightGreen],
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
