import type { Meta, StoryObj } from "@storybook/react-vite";

import { WritingScreenTimer } from "./writing-screen-timer";

const meta = {
  title: "RoomView/WritingScreen/WritingScreenTimer",
  component: WritingScreenTimer,
  tags: ["autodocs"],
  args: {
    time: 120,
  },
} satisfies Meta<typeof WritingScreenTimer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: { time: 120 },
};

export const Warning: Story = {
  args: { time: 30 },
};

export const Urgent: Story = {
  args: { time: 10 },
};
