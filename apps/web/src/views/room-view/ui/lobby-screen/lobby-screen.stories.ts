import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { LobbyScreen } from "./lobby-screen";
import { useRoomStore } from "../../model/use-room-store";

const meta = {
  title: "RoomView/LobbyScreen",
  component: LobbyScreen,
  tags: ["autodocs"],
  args: {
    onStartGame: fn(),
    roomCode: "1234",
  },
} satisfies Meta<typeof LobbyScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoPlayers: Story = {
  beforeEach() {
    useRoomStore.setState({ players: [] });
  },
};

export const OnePlayer: Story = {
  beforeEach() {
    useRoomStore.setState({
      players: [{ id: "1", username: "Алиса" }],
      isHost: true,
    });
  },
};

export const ReadyToStart: Story = {
  beforeEach() {
    useRoomStore.setState({
      players: [
        { id: "1", username: "Алиса" },
        { id: "2", username: "Борис" },
      ],
      isHost: true,
    });
  },
};

export const FullLobby: Story = {
  beforeEach() {
    useRoomStore.setState({
      players: [
        { id: "1", username: "Алиса" },
        { id: "2", username: "Борис" },
        { id: "3", username: "Света" },
        { id: "4", username: "Дима" },
        { id: "5", username: "Женя" },
        { id: "6", username: "Фёдор" },
      ],
      isHost: false,
    });
  },
};
