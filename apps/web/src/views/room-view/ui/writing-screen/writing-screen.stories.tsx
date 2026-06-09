import type { Meta, StoryObj } from "@storybook/react-vite";

import { useRoomStore } from "../../model/store/use-room-store";
import {
  withRoomActions,
  withRoomLayout,
} from "../../utils/storybook-decorators";
import { MOCK_PLAYERS } from "../../utils/storybook-mocks";
import { WritingScreen } from "./writing-screen";

const meta = {
  title: "RoomView/WritingScreen",
  component: WritingScreen,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withRoomActions, withRoomLayout],
} satisfies Meta<typeof WritingScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstRound: Story = {
  beforeEach() {
    useRoomStore.setState({
      round: 1,
      totalRounds: 5,
      players: MOCK_PLAYERS.slice(0, 3),
      submittedIds: new Set(),
      prevEntry: null,
      secondsPerTurn: 60,
      twistsToChoose: null,
    });
  },
};

export const MiddleRound: Story = {
  beforeEach() {
    useRoomStore.setState({
      round: 2,
      totalRounds: 5,
      players: MOCK_PLAYERS.slice(0, 3),
      submittedIds: new Set([MOCK_PLAYERS[0].id]),
      prevEntry: [
        {
          entry:
            "Старый смотритель маяка заметил на горизонте что-то необычное.",
        },
        {
          entry: "Оно двигалось быстро, оставляя за собой серебристый след.",
        },
      ],
      secondsPerTurn: 60,
      twistsToChoose: null,
    });
  },
};

export const WithTwistInStory: Story = {
  beforeEach() {
    useRoomStore.setState({
      round: 4,
      totalRounds: 5,
      players: MOCK_PLAYERS.slice(0, 3),
      submittedIds: new Set(),
      prevEntry: [
        {
          entry:
            "Старый смотритель маяка заметил на горизонте что-то необычное.",
        },
        {
          entry: "Оно двигалось быстро, оставляя за собой серебристый след.",
          twist: "Внезапно начался сильный шторм",
        },
      ],
      secondsPerTurn: 60,
      twistsToChoose: null,
    });
  },
};

export const WithTwistPicker: Story = {
  beforeEach() {
    useRoomStore.setState({
      round: 3,
      totalRounds: 5,
      players: MOCK_PLAYERS.slice(0, 3),
      submittedIds: new Set(),
      prevEntry: [
        {
          entry:
            "Старый смотритель маяка заметил на горизонте что-то необычное.",
        },
      ],
      secondsPerTurn: 60,
      twistsToChoose: [
        { id: "t1", content: "Внезапно начался сильный шторм" },
        { id: "t2", content: "Незнакомец оказался старым другом" },
      ],
    });
  },
};

export const AllSubmitted: Story = {
  beforeEach() {
    useRoomStore.setState({
      round: 4,
      totalRounds: 5,
      players: MOCK_PLAYERS.slice(0, 3),
      submittedIds: new Set(MOCK_PLAYERS.slice(0, 3).map((p) => p.id)),
      prevEntry: [
        { entry: "Никто не ожидал, что карта приведёт именно сюда." },
      ],
      secondsPerTurn: 30,
      twistsToChoose: null,
    });
  },
};
