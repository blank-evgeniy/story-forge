import type { Meta, StoryObj } from "@storybook/react-vite";

import { useRoomStore } from "../../../model/store/use-room-store";
import { RoundTransitionOverlay } from "./round-transition-overlay";

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
