import type { Meta, StoryObj } from "@storybook/react-vite";

import { MessageRow } from "./message-row";

const meta = {
  title: "RoomView/Common/MessageRow",
  component: MessageRow,
  tags: ["autodocs"],
  args: {
    children: (
      <div className="bg-muted rounded-lg px-3 py-2 text-sm">Hello, world!</div>
    ),
  },
} satisfies Meta<typeof MessageRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    side: "left",
  },
};

export const Right: Story = {
  args: {
    side: "right",
  },
};

export const LeftWithAvatar: Story = {
  args: {
    side: "left",
    children: (
      <>
        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs shrink-0">
          A
        </div>
        <div className="bg-muted rounded-lg px-3 py-2 text-sm">
          Hello from the left!
        </div>
      </>
    ),
  },
};

export const RightWithAvatar: Story = {
  args: {
    side: "right",
    children: (
      <>
        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs shrink-0">
          B
        </div>
        <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 text-sm">
          Hello from the right!
        </div>
      </>
    ),
  },
};
