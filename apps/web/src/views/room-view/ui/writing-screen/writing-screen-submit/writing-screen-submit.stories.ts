import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { WritingScreenSubmit } from "./writing-screen-submit";

const meta = {
  title: "RoomView/WritingScreen/WritingScreenSubmit",
  component: WritingScreenSubmit,
  tags: ["autodocs"],
  args: { onSubmit: fn() },
} satisfies Meta<typeof WritingScreenSubmit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstRound: Story = {
  args: {
    isFirstRound: true,
    twistsToChoose: null,
    onSubmit: fn(),
  },
};

export const RoundWithTwists: Story = {
  args: {
    isFirstRound: false,
    twistsToChoose: [
      { id: "1", content: "Twist 1" },
      { id: "2", content: "Twist 2" },
    ],
    onSubmit: fn(),
  },
};

export const RoundWithoutTwists: Story = {
  args: {
    isFirstRound: false,
    twistsToChoose: null,
    onSubmit: fn(),
  },
};
