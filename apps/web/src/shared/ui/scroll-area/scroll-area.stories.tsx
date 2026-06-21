import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollArea } from "./scroll-area";

const meta = {
  title: "New/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-xl border border-line">
      <div className="flex flex-col gap-2 p-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <p key={index} className="text-sm text-ink">
            Player {index + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-64 rounded-xl border border-line">
      <div className="flex gap-2 p-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-sm text-ink"
          >
            {index + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
