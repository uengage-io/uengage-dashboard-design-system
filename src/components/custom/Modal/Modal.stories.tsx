import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/button";

function ModalStoryRender(args: React.ComponentProps<typeof Modal>) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

const meta = {
  title: "Components/Modal",
  component: Modal,
  render: ModalStoryRender,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "radio",
      options: ["small", "medium", "md", "default", "large", "full"],
    },
    showCloseButton: { control: "boolean" },
    title: { control: "text" },
    headerClassName: { control: "text" },
    bodyClassName: { control: "text" },
    modalClassName: { control: "text" },
  },
  args: {
    title: "Modal Title",
    size: "default",
    showCloseButton: true,
    children: <p className="text-sm text-gray-600">This is the modal body content.</p>,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "small", title: "Small Modal" },
};

export const Large: Story = {
  args: { size: "large", title: "Large Modal" },
};

export const NoHeader: Story = {
  args: { title: undefined, showCloseButton: false },
};

export const WithCloseButtonOnly: Story = {
  args: { title: undefined, showCloseButton: true },
};

export const LongContent: Story = {
  args: {
    title: "Scrollable Content",
    children: (
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-sm text-gray-600">
            Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
    ),
  },
};
