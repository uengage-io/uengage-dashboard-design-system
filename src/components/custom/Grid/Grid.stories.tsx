import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

/* ── Demo tile ──────────────────────────────────────────────── */

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-6 text-sm font-medium text-[#374151]"
    >
      {children}
    </div>
  );
}

function makeTiles(n: number) {
  return Array.from({ length: n }, (_, i) => (
    <Tile key={i}>Item {i + 1}</Tile>
  ));
}

/* ── Meta ───────────────────────────────────────────────────── */

const meta = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Responsive grid primitive. `columns` accepts equal-width presets (`1`–`8`), fractional presets (`2:1`, `1:2`, `3:1`, `1:3`, `1:1:2`, `2:1:1`), or any raw CSS `grid-template-columns` value. `limit` (1–8) takes precedence for equal columns. `gap` auto-resolves from the preset when omitted; `rowGap` overrides just the row axis.",
      },
    },
  },
  argTypes: {
    columns: {
      control: "select",
      options: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "2:1",
        "1:2",
        "3:1",
        "1:3",
        "1:1:2",
        "2:1:1",
      ],
    },
    limit: {
      control: "select",
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8],
    },
    gap: { control: "text" },
    rowGap: { control: "text" },
  },
  args: {
    columns: "3",
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Default ────────────────────────────────────────────────── */

export const Default: Story = {
  render: (args) => <Grid {...args}>{makeTiles(6)}</Grid>,
};

/* ── Equal columns (1–8) ────────────────────────────────────── */

export const OneColumn: Story = {
  args: { columns: "1" },
  render: (args) => <Grid {...args}>{makeTiles(3)}</Grid>,
};

export const TwoColumns: Story = {
  args: { columns: "2" },
  render: (args) => <Grid {...args}>{makeTiles(4)}</Grid>,
};

export const ThreeColumns: Story = {
  args: { columns: "3" },
  render: (args) => <Grid {...args}>{makeTiles(6)}</Grid>,
};

export const FourColumns: Story = {
  args: { columns: "4" },
  render: (args) => <Grid {...args}>{makeTiles(8)}</Grid>,
};

export const FiveColumns: Story = {
  args: { columns: "5" },
  render: (args) => <Grid {...args}>{makeTiles(10)}</Grid>,
};

export const SixColumns: Story = {
  args: { columns: "6" },
  render: (args) => <Grid {...args}>{makeTiles(12)}</Grid>,
};

export const SevenColumns: Story = {
  args: { columns: "7" },
  render: (args) => <Grid {...args}>{makeTiles(14)}</Grid>,
};

export const EightColumns: Story = {
  args: { columns: "8" },
  render: (args) => <Grid {...args}>{makeTiles(16)}</Grid>,
};

/* ── Fractional presets ─────────────────────────────────────── */

export const TwoToOne: Story = {
  name: "2:1 — wide + narrow",
  args: { columns: "2:1" },
  render: (args) => (
    <Grid {...args}>
      <Tile>Main · 2fr</Tile>
      <Tile>Side · 1fr</Tile>
    </Grid>
  ),
};

export const OneToTwo: Story = {
  name: "1:2 — narrow + wide",
  args: { columns: "1:2" },
  render: (args) => (
    <Grid {...args}>
      <Tile>Side · 1fr</Tile>
      <Tile>Main · 2fr</Tile>
    </Grid>
  ),
};

export const ThreeToOne: Story = {
  name: "3:1 — wide + thin sidebar",
  args: { columns: "3:1" },
  render: (args) => (
    <Grid {...args}>
      <Tile>Content · 3fr</Tile>
      <Tile>Aside · 1fr</Tile>
    </Grid>
  ),
};

export const OneToThree: Story = {
  name: "1:3 — thin sidebar + wide",
  args: { columns: "1:3" },
  render: (args) => (
    <Grid {...args}>
      <Tile>Aside · 1fr</Tile>
      <Tile>Content · 3fr</Tile>
    </Grid>
  ),
};

export const OneOneTwo: Story = {
  name: "1:1:2",
  args: { columns: "1:1:2" },
  render: (args) => (
    <Grid {...args}>
      <Tile>1fr</Tile>
      <Tile>1fr</Tile>
      <Tile>2fr</Tile>
    </Grid>
  ),
};

export const TwoOneOne: Story = {
  name: "2:1:1",
  args: { columns: "2:1:1" },
  render: (args) => (
    <Grid {...args}>
      <Tile>2fr</Tile>
      <Tile>1fr</Tile>
      <Tile>1fr</Tile>
    </Grid>
  ),
};

/* ── Limit prop ─────────────────────────────────────────────── */

export const LimitOverridesColumns: Story = {
  name: "limit overrides columns",
  args: { columns: "6", limit: 3 },
  parameters: {
    docs: {
      description: {
        story:
          "When both are set, `limit` wins. Here `columns=\"6\"` is ignored in favour of `limit={3}`.",
      },
    },
  },
  render: (args) => <Grid {...args}>{makeTiles(6)}</Grid>,
};

/* ── Custom gap ─────────────────────────────────────────────── */

export const CustomGap: Story = {
  args: { columns: "3", gap: 40 },
  render: (args) => <Grid {...args}>{makeTiles(6)}</Grid>,
};

export const SeparateRowAndColumnGap: Story = {
  args: { columns: "3", gap: 8, rowGap: 48 },
  render: (args) => <Grid {...args}>{makeTiles(9)}</Grid>,
};

/* ── Raw grid-template-columns string ───────────────────────── */

export const RawTemplateColumns: Story = {
  name: "Raw grid-template-columns",
  args: { columns: "120px 1fr 200px", gap: 16 },
  parameters: {
    docs: {
      description: {
        story:
          "Any string not matching a preset is passed straight through as `grid-template-columns`. Here: fixed 120px · flexible 1fr · fixed 200px.",
      },
    },
  },
  render: (args) => (
    <Grid {...args}>
      <Tile>120px</Tile>
      <Tile>1fr (flexible)</Tile>
      <Tile>200px</Tile>
    </Grid>
  ),
};
