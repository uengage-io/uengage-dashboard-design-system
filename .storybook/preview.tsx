import type { Preview, Decorator } from "@storybook/react";
import React from "react";
import "../src/styles/storybook.css";

const withUengageUI: Decorator = (Story) => (
  <div className="uengage-ui">
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withUengageUI],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light",  value: "#ffffff" },
        { name: "subtle", value: "#F8FAFC" },
        { name: "dark",   value: "#0B0B0B" },
      ],
    },
  },
};

export default preview;
