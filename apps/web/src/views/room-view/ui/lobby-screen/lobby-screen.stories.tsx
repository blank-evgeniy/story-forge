import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";

import { RoomActionsProvider } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
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
      players: [{ id: "1", username: "Алиса", connected: true }],
      isHost: true,
    });
  },
};

export const ReadyToStart: Story = {
  beforeEach() {
    useRoomStore.setState({
      players: [
        { id: "1", username: "Алиса", connected: true },
        { id: "2", username: "Борис", connected: true },
      ],
      isHost: true,
    });
  },
};

export const FullLobby: Story = {
  beforeEach() {
    useRoomStore.setState({
      players: [
        { id: "1", username: "Алиса", connected: true },
        { id: "2", username: "Борис", connected: true },
        { id: "3", username: "Света", connected: true },
        { id: "4", username: "Дима", connected: true },
        { id: "5", username: "Женя", connected: true },
        { id: "6", username: "Фёдор", connected: true },
      ],
      isHost: false,
    });
  },
};
