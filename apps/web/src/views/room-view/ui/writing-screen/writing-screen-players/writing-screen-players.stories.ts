import type { Meta, StoryObj } from "@storybook/react-vite";
import { WritingScreenPlayers } from "./writing-screen-players";

const players = [
  { id: "1", username: "Алиса" },
  { id: "2", username: "Борис" },
  { id: "3", username: "Света" },
];

const meta = {
  title: "RoomView/WritingScreen/WritingScreenPlayers",
  component: WritingScreenPlayers,
  tags: ["autodocs"],
  args: {
    players,
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
