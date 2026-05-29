import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";

import { RoomActionsProvider } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { WritingScreen } from "./writing-screen";

const players = [
  { id: "1", username: "Алиса", connected: true },
  { id: "2", username: "Борис", connected: true },
  { id: "3", username: "Света", connected: false },
];

const withRoomActions: Decorator = (Story) => (
  <RoomActionsProvider client={null}>
    <Story />
  </RoomActionsProvider>
);

const meta = {
  title: "RoomView/WritingScreen",
  component: WritingScreen,
  decorators: [withRoomActions],
} satisfies Meta<typeof WritingScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstRound: Story = {
  beforeEach() {
    useRoomStore.setState({
      round: 1,
      totalRounds: 5,
      players,
      submitted: new Set(),
      prevSentence: null,
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
      players,
      submitted: new Set(["1"]),
      prevSentence: [
        {
          sentence:
            "Старый смотритель маяка заметил на горизонте что-то необычное.",
        },
        {
          sentence: "Оно двигалось быстро, оставляя за собой серебристый след.",
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
      players,
      submitted: new Set(),
      prevSentence: [
        {
          sentence:
            "Старый смотритель маяка заметил на горизонте что-то необычное.",
        },
        {
          sentence: "Оно двигалось быстро, оставляя за собой серебристый след.",
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
      players,
      submitted: new Set(),
      prevSentence: [
        {
          sentence:
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
      players,
      submitted: new Set(["1", "2", "3"]),
      prevSentence: [
        { sentence: "Никто не ожидал, что карта приведёт именно сюда." },
      ],
      secondsPerTurn: 30,
      twistsToChoose: null,
    });
  },
};
