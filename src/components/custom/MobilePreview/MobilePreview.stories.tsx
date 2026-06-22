import type { Meta, StoryObj } from "@storybook/react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { MobilePreview } from "./MobilePreview";
import type { MobilePreviewDevice, MobilePreviewFrameColor, MobilePreviewSize } from "./mobilePreviewVariants";

const SampleContent = () => (
  <div className="flex flex-col gap-3 p-3">
    <div className="h-28 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
      Banner
    </div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 shadow-sm">
        <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="h-3 w-2/3 rounded bg-gray-200" />
          <div className="h-2.5 w-1/2 rounded bg-gray-100" />
        </div>
        <div className="h-6 w-14 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-semibold flex items-center justify-center shrink-0">
          Active
        </div>
      </div>
    ))}
  </div>
);

const DEVICES: MobilePreviewDevice[]     = ["iphone", "android", "generic"];
const SIZES: MobilePreviewSize[]         = ["sm", "md", "lg", "xl"];
const FRAME_COLORS: MobilePreviewFrameColor[] = ["midnight", "silver", "gold", "white"];
const SCALES: number[]                   = [0.5, 0.75, 1];

const meta = {
  title: "Components/MobilePreview",
  component: MobilePreview,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A realistic phone-frame wrapper for previewing mobile UI designs. Supports iPhone, Android, and generic device styles with configurable size, colour, orientation, status-bar, and side-button options.",
      },
    },
  },
  argTypes: {
    device: {
      control: "select",
      options: ["iphone", "android", "generic"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    frameColor: {
      control: "select",
      options: ["midnight", "silver", "gold", "white"],
    },
    orientation: {
      control: "radio",
      options: ["portrait", "landscape"],
    },
    scale: { control: { type: "number", min: 0.3, max: 1.5, step: 0.05 } },
    showStatusBar:     { control: "boolean" },
    showSideButtons:   { control: "boolean" },
    showBottomBar:     { control: "boolean" },
    scrollable:        { control: "boolean" },
    statusBarTime:     { control: "text" },
    statusBarInverted: { control: "boolean" },
  },
  args: {
    device: "iphone",
    size: "md",
    frameColor: "midnight",
    orientation: "portrait",
    showStatusBar: true,
    showSideButtons: true,
    showBottomBar: true,
    scrollable: true,
  },
} satisfies Meta<typeof MobilePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── iPhone Variant ───────────────────────────────────────────────────────────

const AppHeaderContent = () => (
  <div className="flex flex-col">
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
      <ChevronLeft size={20} className="text-gray-400" strokeWidth={1.5} />
      <span className="text-sm font-semibold text-gray-900">Page Title</span>
      <Menu size={18} className="text-gray-400" strokeWidth={1.5} />
    </div>
    <div className="px-4 py-2 flex items-center gap-1 text-[11px] text-gray-500">
      <span>Breadcrumb</span>
      <ChevronRight size={10} strokeWidth={1.5} />
      <span>Apps</span>
      <ChevronRight size={10} strokeWidth={1.5} />
      <span>Component Collector</span>
    </div>
    <div className="px-4 pt-2">
      <h2 className="text-xl font-bold text-gray-900 mb-3">Basic App Header</h2>
      <div className="rounded-2xl bg-gray-100 h-32 border border-gray-200/60" />
    </div>
  </div>
);

export const IPhoneVariant: Story = {
  parameters: {
    docs: {
      description: { story: "iPhone variant with dynamic island, status bar, and a sample app header layout." },
    },
  },
  args: {
    device: "iphone",
    frameColor: "midnight",
    size: "md",
  },
  render: (args) => (
    <MobilePreview {...args}>
      <AppHeaderContent />
    </MobilePreview>
  ),
};

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <MobilePreview {...args}>
      <SampleContent />
    </MobilePreview>
  ),
};

// ─── Device variants ──────────────────────────────────────────────────────────

export const DeviceVariants: Story = {
  parameters: {
    docs: {
      description: { story: "iPhone (dynamic island), Android (punch-hole), and Generic (minimal bezel) side by side." },
    },
  },
  render: (args) => (
    <div className="flex items-start gap-10">
      {DEVICES.map((device) => (
        <div key={device} className="flex flex-col items-center gap-3">
          <MobilePreview {...args} device={device} size="sm">
            <SampleContent />
          </MobilePreview>
          <span className="text-xs font-medium text-gray-500 capitalize">{device}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Size variants ────────────────────────────────────────────────────────────

export const SizeVariants: Story = {
  parameters: {
    docs: {
      description: { story: "All four sizes — sm, md, lg, xl — rendered together." },
    },
  },
  render: (args) => (
    <div className="flex items-end gap-8">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-3">
          <MobilePreview {...args} size={size}>
            <SampleContent />
          </MobilePreview>
          <span className="text-xs font-medium text-gray-500 uppercase">{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Frame colours ────────────────────────────────────────────────────────────

export const FrameColors: Story = {
  parameters: {
    docs: {
      description: { story: "Midnight, Silver, Gold, and White frame finishes." },
    },
  },
  render: (args) => (
    <div className="flex items-start gap-8">
      {FRAME_COLORS.map((frameColor) => (
        <div key={frameColor} className="flex flex-col items-center gap-3">
          <MobilePreview {...args} frameColor={frameColor} size="sm">
            <SampleContent />
          </MobilePreview>
          <span className="text-xs font-medium text-gray-500 capitalize">{frameColor}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Landscape orientation ────────────────────────────────────────────────────

export const Landscape: Story = {
  parameters: {
    docs: {
      description: { story: "Landscape orientation — frame dimensions are swapped automatically." },
    },
  },
  render: (args) => (
    <MobilePreview {...args} orientation="landscape" size="sm">
      <div className="flex h-full items-center justify-center bg-gray-50 text-sm text-gray-400">
        Landscape content
      </div>
    </MobilePreview>
  ),
};

// ─── Status bar customisation ─────────────────────────────────────────────────

export const StatusBarInverted: Story = {
  parameters: {
    docs: {
      description: { story: "When the app has a dark header, pass statusBarInverted to flip the status-bar icons to white." },
    },
  },
  render: (args) => (
    <MobilePreview {...args} statusBarInverted screenClassName="bg-gray-950">
      <div className="p-4 text-white text-sm">Dark-mode app</div>
    </MobilePreview>
  ),
};

export const CustomStatusBarTime: Story = {
  parameters: {
    docs: {
      description: { story: "Override the default 9:41 time string with any value." },
    },
  },
  render: (args) => (
    <MobilePreview {...args} statusBarTime="12:30">
      <SampleContent />
    </MobilePreview>
  ),
};

export const HiddenStatusBar: Story = {
  parameters: {
    docs: {
      description: { story: "Fullscreen app — status bar hidden entirely." },
    },
  },
  render: (args) => (
    <MobilePreview {...args} showStatusBar={false}>
      <SampleContent />
    </MobilePreview>
  ),
};

// ─── Feature toggles ──────────────────────────────────────────────────────────

export const NoSideButtons: Story = {
  parameters: {
    docs: {
      description: { story: "Side hardware buttons removed for a cleaner embed." },
    },
  },
  render: (args) => (
    <MobilePreview {...args} showSideButtons={false}>
      <SampleContent />
    </MobilePreview>
  ),
};

export const NoBottomBar: Story = {
  parameters: {
    docs: {
      description: { story: "Bottom home indicator / navigation bar hidden." },
    },
  },
  render: (args) => (
    <MobilePreview {...args} showBottomBar={false}>
      <SampleContent />
    </MobilePreview>
  ),
};

export const NonScrollable: Story = {
  parameters: {
    docs: {
      description: { story: "Content area overflow is hidden — useful for fixed-layout screens." },
    },
  },
  render: (args) => (
    <MobilePreview {...args} scrollable={false}>
      <div className="p-4 text-sm text-gray-500">
        This content will be clipped if it overflows the screen area.
      </div>
    </MobilePreview>
  ),
};

// ─── Scaled ───────────────────────────────────────────────────────────────────

export const Scaled: Story = {
  parameters: {
    docs: {
      description: { story: "Use the scale prop to shrink the preview inside a constrained layout without affecting DOM dimensions." },
    },
  },
  render: (args) => (
    <div className="flex items-start gap-12">
      {SCALES.map((scale) => (
        <div key={scale} className="flex flex-col items-center gap-3">
          <MobilePreview {...args} scale={scale}>
            <SampleContent />
          </MobilePreview>
          <span className="text-xs font-medium text-gray-500">scale={scale}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Android with nav bar ─────────────────────────────────────────────────────

export const AndroidNavBar: Story = {
  parameters: {
    docs: {
      description: { story: "Android device showing the three-button navigation bar at the bottom." },
    },
  },
  render: (args) => (
    <MobilePreview {...args} device="android" frameColor="silver">
      <SampleContent />
    </MobilePreview>
  ),
};
