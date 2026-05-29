import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";

import { RoomActionsProvider } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { MOCK_PLAYERS } from "../../utils/storybook-mocks";
import { LobbyScreen } from "./lobby-screen";

const withRoomActions: Decorator = (Story) => (
  <RoomActionsProvider client={null}>
    <Story />
  </RoomActionsProvider>
);

const meta = {
  title: "RoomView/LobbyScreen",
  component: LobbyScreen,
  tags: ["autodocs"],
  decorators: [withRoomActions],
  args: {
    roomCode: "1234",
  },
} satisfies Meta<typeof LobbyScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnePlayer: Story = {
  beforeEach() {
    useRoomStore.setState({
      players: [MOCK_PLAYERS[0]],
      isHost: true,
    });
  },
};

export const ReadyToStart: Story = {
  beforeEach() {
    useRoomStore.setState({
      players: MOCK_PLAYERS.slice(0, 2),
      isHost: true,
    });
  },
};

export const FullLobby: Story = {
  beforeEach() {
    useRoomStore.setState({
      players: MOCK_PLAYERS,
      isHost: false,
    });
  },
};
