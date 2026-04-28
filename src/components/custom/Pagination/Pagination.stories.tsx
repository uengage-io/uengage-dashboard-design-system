import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

function Controlled(props: React.ComponentProps<typeof Pagination>) {
  const [page, setPage] = React.useState(props.currentPage ?? 1);
  React.useEffect(() => {
    setPage(props.currentPage ?? 1);
  }, [props.currentPage]);
  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination {...props} currentPage={page} onPageChange={setPage} />
      <p className="text-sm text-gray-500">
        Page <span className="font-semibold text-[#003C1B]">{page}</span> of {props.totalPages}
      </p>
    </div>
  );
}

const meta = {
  title: "Components/Pagination",
  component: Pagination,
  render: (args) => <Controlled {...args} />,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Currently active page",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    siblingCount: {
      control: { type: "number", min: 0, max: 5 },
      description: "Pages shown on each side of the active page",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    showFirstLast: {
      control: "boolean",
      description: "Show double-chevron first/last page jumps",
    },
    disabled: {
      control: "boolean",
      description: "Disable all controls",
    },
    className: { control: "text" },
  },
  args: {
    currentPage: 1,
    totalPages: 20,
    siblingCount: 1,
    size: "md",
    showFirstLast: false,
    disabled: false,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive pagination — click any page or the chevrons to navigate. */
export const Default: Story = {};

/** Active page sits in the middle; the sibling window shifts as you navigate. */
export const MidRange: Story = {
  args: { currentPage: 10, totalPages: 99, siblingCount: 1 },
};

/** Small button size. */
export const SizeSm: Story = {
  args: { size: "sm", currentPage: 5, totalPages: 15 },
};

/** Medium button size (default). */
export const SizeMd: Story = {
  args: { size: "md", currentPage: 5, totalPages: 15 },
};

/** Large button size. */
export const SizeLg: Story = {
  args: { size: "lg", currentPage: 5, totalPages: 15 },
};

/** All three sizes side by side. */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{size}</p>
          <Controlled currentPage={5} totalPages={15} size={size} onPageChange={() => {}} />
        </div>
      ))}
    </div>
  ),
};

/** siblingCount={1} — one page shown each side of the active page. */
export const SiblingCount1: Story = {
  args: { currentPage: 10, totalPages: 20, siblingCount: 1 },
};

/** siblingCount={2} — two pages shown each side. */
export const SiblingCount2: Story = {
  args: { currentPage: 10, totalPages: 20, siblingCount: 2 },
};

/** siblingCount={3} — three pages shown each side. */
export const SiblingCount3: Story = {
  args: { currentPage: 10, totalPages: 20, siblingCount: 3 },
};

/** Sibling counts compared in a single view. */
export const SiblingCounts: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {[1, 2, 3].map((count) => (
        <div key={count} className="flex flex-col gap-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            siblingCount={count}
          </p>
          <Controlled
            currentPage={10}
            totalPages={20}
            siblingCount={count}
            onPageChange={() => {}}
          />
        </div>
      ))}
    </div>
  ),
};

/** ChevronsLeft / ChevronsRight for jumping to the first and last page. */
export const ShowFirstLast: Story = {
  args: { currentPage: 5, totalPages: 20, showFirstLast: true },
};

/** No ellipsis rendered when totalPages is small enough to show all pages. */
export const NoEllipsis: Story = {
  args: { currentPage: 2, totalPages: 3 },
};

/** All interactions are blocked; buttons show a muted style. */
export const Disabled: Story = {
  args: { currentPage: 5, totalPages: 10, disabled: true },
};
