import type { Meta, StoryObj } from "@storybook/react-vite";

import { useRoomStore } from "../../model/store/use-room-store";
import {
  withRoomActions,
  withRoomLayout,
  withRoomSettingsContext,
} from "../../utils/storybook-decorators";
import { MOCK_PLAYERS } from "../../utils/storybook-mocks";
import { LobbyScreen } from "./lobby-screen";

const meta = {
  title: "RoomView/LobbyScreen",
  component: LobbyScreen,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withRoomActions, withRoomLayout, withRoomSettingsContext],
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
