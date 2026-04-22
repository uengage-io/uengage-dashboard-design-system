import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Rocket } from "lucide-react";
import { AlertDialog } from "./alert-dialog";
import { Button } from "../Button/button";

type AlertDialogStoryArgs = React.ComponentProps<typeof AlertDialog> & {
  iconType?: "success" | "error" | "warning" | "info" | "question" | "custom";
};

function AlertDialogStoryRender(args: AlertDialogStoryArgs) {
  const {
    iconType = "success",
    open,
    defaultOpen = false,
    onOpenChange,
    ...dialogArgs
  } = args;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    if (open !== undefined) {
      setInternalOpen(open);
    }
  }, [open]);

  const icon = iconType === "custom" ? Rocket : iconType;
  const resolvedOpen = open ?? internalOpen;

  return (
    <AlertDialog
      {...dialogArgs}
      icon={icon}
      defaultOpen={defaultOpen}
      open={resolvedOpen}
      onOpenChange={(nextOpen) => {
        setInternalOpen(nextOpen);
        onOpenChange?.(nextOpen);
      }}
    />
  );
}

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  render: AlertDialogStoryRender,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Unified alert dialog that supports status-style UI and SweetAlert-like behavior (confirm/cancel, input, validation, async preConfirm, close controls).",
      },
    },
  },
  argTypes: {
    open: { control: "boolean" },
    defaultOpen: { control: "boolean" },
    onOpenChange: { control: false },
    trigger: { control: false },
    className: { control: "text" },
    variant: { control: "radio", options: ["success", "error", "warning", "info"] },
    icon: { control: false },
    iconType: {
      control: "radio",
      options: ["success", "error", "warning", "info", "question", "custom"],
    },
    title: { control: "text" },
    description: { control: "text" },
    text: { control: "text" },
    footer: { control: false },
    size: { control: "radio", options: ["sm", "default"] },
    confirmButtonText: { control: "text" },
    cancelButtonText: { control: "text" },
    showCancelButton: { control: "boolean" },
    confirmButtonVariant: {
      control: "radio",
      options: ["primary", "secondary", "tertiary", "alertPrimary", "warningPrimary", "alertSecondary"],
    },
    cancelButtonVariant: {
      control: "radio",
      options: ["primary", "secondary", "tertiary", "alertPrimary", "warningPrimary", "alertSecondary"],
    },
    closeOnOverlayClick: { control: "boolean" },
    closeOnEsc: { control: "boolean" },
    input: { control: "radio", options: ["text", "textarea"] },
    inputPlaceholder: { control: "text" },
    defaultValue: { control: "text" },
    inputValidator: { control: false },
    preConfirm: { control: false },
    showActions: { control: "boolean" },
  },
  args: {
    defaultOpen: false,
    trigger: <Button>Open dialog</Button>,
    className: "",
    variant: "success",
    iconType: "success",
    title: "All done!",
    description: "Your changes have been saved successfully.",
    text: "",
    footer: undefined,
    size: "default",
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    showCancelButton: false,
    confirmButtonVariant: "primary",
    cancelButtonVariant: "secondary",
    closeOnOverlayClick: true,
    closeOnEsc: true,
    input: undefined,
    inputPlaceholder: "",
    defaultValue: "",
    inputValidator: undefined,
    preConfirm: undefined,
    showActions: true,
  },
} satisfies Meta<AlertDialogStoryArgs>;

export default meta;
type Story = StoryObj<AlertDialogStoryArgs>;

export const AllPropsPlayground: Story = {};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Order placed",
    description: "Your order #A-2048 is confirmed and in the kitchen.",
    showActions: false,
  },
};

export const ErrorVariant: Story = {
  name: "Error",
  args: {
    variant: "error",
    title: "Something went wrong",
    description: "We couldn't process your payment. Please try again.",
    showActions: false,
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Unsaved changes",
    description: "Leaving this page will discard your edits.",
    showActions: false,
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "New features available",
    description: "Check out the revamped dispatch board in Settings → Beta.",
    showActions: false,
  },
};

export const WithFooterButtons: Story = {
  args: {
    variant: "warning",
    title: "Delete driver?",
    description: "This will remove Rahul Sharma from all future shifts.",
    footer: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="alertPrimary">Delete</Button>
      </>
    ),
  },
};

export const CustomIcon: Story = {
  args: {
    iconType: "custom",
    title: "You're all set!",
    description: "The uEngage dispatch pilot starts at 09:00 tomorrow.",
    showActions: false,
  },
};

export const NoDescription: Story = {
  args: {
    variant: "success",
    title: "Saved",
    showActions: false,
  },
};

export const UncontrolledDefaultOpen: Story = {
  args: {
    defaultOpen: true,
    title: "Starts open",
    description: "This demonstrates the uncontrolled mode using `defaultOpen`.",
  },
};

export const WithInputAndValidation: Story = {
  args: {
    variant: "warning",
    title: "Enter reason",
    text: "Please provide a short reason before confirming.",
    input: "textarea",
    inputPlaceholder: "Type reason...",
    showCancelButton: true,
    confirmButtonText: "Submit",
    inputValidator: (value) =>
      String(value ?? "").trim().length < 5
        ? "Please enter at least 5 characters."
        : null,
  },
};

export const AsyncPreConfirm: Story = {
  args: {
    variant: "info",
    title: "Process request",
    text: "This simulates async preConfirm and loading state.",
    showCancelButton: true,
    confirmButtonText: "Process",
    preConfirm: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    },
  },
};
