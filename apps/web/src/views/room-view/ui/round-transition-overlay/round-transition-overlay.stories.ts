import type { Meta, StoryObj } from "@storybook/react-vite";
import { RoundTransitionOverlay } from "./round-transition-overlay";
import { useRoomStore } from "../../model/use-room-store";

const meta = {
  title: "RoomView/RoundTransitionOverlay",
  component: RoundTransitionOverlay,
} satisfies Meta<typeof RoundTransitionOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstRound: Story = {
  beforeEach() {
    useRoomStore.setState({ round: 1, totalRounds: 5 });
  },
};

export const MiddleRound: Story = {
  beforeEach() {
    useRoomStore.setState({ round: 3, totalRounds: 5 });
  },
};

export const LastRound: Story = {
  beforeEach() {
    useRoomStore.setState({ round: 5, totalRounds: 5 });
  },
};
