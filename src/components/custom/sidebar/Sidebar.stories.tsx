import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "@/components/ui/button"
import { Sidebar } from "./Sidebar"

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    side: {
      control: { type: "select" },
      options: ["left", "right", "right-slide", "top", "bottom"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "full"],
    },
    open: { control: "boolean" },
    defaultOpen: { control: "boolean" },
    overlay: { control: "boolean" },
    closeOnOutsideClick: { control: "boolean" },
    persistentOnDesktop: { control: "boolean" },
    heading: { control: "text" },
    closeIcon: { control: "boolean" },
    divider: { control: "boolean" },
  },
  args: {
    side: "left",
    size: "md",
    defaultOpen: false,
    overlay: true,
    closeOnOutsideClick: true,
    persistentOnDesktop: false,
    heading: "",
    closeIcon: false,
    divider: false,
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

function StoryContent() {
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <h3 className="text-lg font-semibold">Sidebar Content</h3>
      <p className="text-sm text-muted-foreground">
        This sidebar is built on top of the shared Drawer primitive.
      </p>
      <div className="rounded-md border p-3 text-sm">
        Use controls to switch side, size, and behavior.
      </div>
    </div>
  )
}

export const Default: Story = {
  render: (args) => (
    <div className="min-h-screen p-6">
      <Sidebar {...args} trigger={<Button>Open Sidebar</Button>}>
        <StoryContent />
      </Sidebar>
    </div>
  ),
}

export const RightSidebar: Story = {
  args: {
    side: "right",
  },
  render: Default.render,
}

export const RightSlideSidebar: Story = {
  args: {
    side: "right-slide",
  },
  render: Default.render,
}

export const TopDrawer: Story = {
  args: {
    side: "top",
  },
  render: Default.render,
}

export const BottomDrawer: Story = {
  args: {
    side: "bottom",
  },
  render: Default.render,
}

export const WithHeadingAndClose: Story = {
  args: {
    heading: "Navigation",
    closeIcon: true,
    divider: true,
  },
  render: Default.render,
}

export const HeadingOnly: Story = {
  args: {
    heading: "Navigation",
    closeIcon: false,
    divider: true,
  },
  render: Default.render,
}

export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false)

    return (
      <div className="min-h-screen p-6">
        <div className="mb-4 flex items-center gap-3">
          <Button onClick={() => setOpen((prev) => !prev)}>
            {open ? "Close" : "Open"} Sidebar
          </Button>
          <span className="text-sm text-muted-foreground">
            Current state: {open ? "open" : "closed"}
          </span>
        </div>
        <Sidebar {...args} open={open} onOpenChange={setOpen}>
          <StoryContent />
        </Sidebar>
      </div>
    )
  },
}
