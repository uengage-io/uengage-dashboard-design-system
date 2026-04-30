import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "./Loader";
import { Button } from "../Button/button";

function LoaderToggleRender() {
  const [visible, setVisible] = React.useState(false);
  return (
    <>
      <Button onClick={() => setVisible((v) => !v)}>
        {visible ? "Hide Loader" : "Show Loader"}
      </Button>
      {visible && <Loader />}
    </>
  );
}

const meta = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Full-screen overlay loader with a spinning ring and the uEngage brand icon. Renders into a fixed portal over the page — toggle it programmatically when async operations are in flight.",
      },
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LoaderToggleRender />,
};

export const AlwaysVisible: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Loader />
    </div>
  ),
};
