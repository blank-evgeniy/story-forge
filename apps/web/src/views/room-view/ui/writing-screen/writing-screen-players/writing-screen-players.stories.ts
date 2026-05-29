import type { Meta, StoryObj } from "@storybook/react-vite";

import { MOCK_PLAYERS } from "@/views/room-view/utils/storybook-mocks";

import { WritingScreenPlayers } from "./writing-screen-players";

const meta = {
  title: "RoomView/WritingScreen/WritingScreenPlayers",
  component: WritingScreenPlayers,
  tags: ["autodocs"],
  args: {
    players: MOCK_PLAYERS,
    submitted: new Set<string>(),
  },
} satisfies Meta<typeof WritingScreenPlayers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoneSubmitted: Story = {};

export const SomeSubmitted: Story = {
  args: {
    submitted: new Set(["1", "3"]),
  },
};

export const AllSubmitted: Story = {
  args: {
    submitted: new Set(["1", "2", "3"]),
  },
};

export const NoPlayers: Story = {
  args: {
    players: [],
    submitted: new Set(),
  },
};
