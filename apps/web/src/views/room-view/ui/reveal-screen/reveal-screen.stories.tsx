import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { RevealScreen } from "./reveal-screen";
import { useRoomStore } from "../../model/use-room-store";

const singleStory = [
  {
    id: "s1",
    playerName: "Алиса",
    sentences: [
      {
        type: "player" as const,
        playerName: "Алиса",
        content:
          "Старый смотритель маяка заметил на горизонте что-то необычное.",
      },
      {
        type: "twist" as const,
        id: "t1",
        content: "Внезапно начался сильный шторм",
      },
      {
        type: "player" as const,
        playerName: "Борис",
        content: "Оно двигалось быстро, оставляя за собой серебристый след.",
      },
      {
        type: "player" as const,
        playerName: "Света",
        content: "Никто не осмеливался говорить, пока силуэт выходил из волн.",
      },
    ],
  },
];

const multipleStories = [
  {
    id: "s1",
    playerName: "Алиса",
    sentences: [
      {
        type: "player" as const,
        playerName: "Алиса",
        content: "На рассвете пришло таинственное письмо, запечатанное чёрным воском.",
      },
      {
        type: "twist" as const,
        id: "t1",
        content: "Внезапно начался сильный шторм",
      },
      {
        type: "player" as const,
        playerName: "Борис",
        content: "Она читала его при свечах, и руки её дрожали.",
      },
    ],
  },
  {
    id: "s2",
    playerName: "Борис",
    sentences: [
      {
        type: "player" as const,
        playerName: "Борис",
        content:
          "Карта вела их вглубь леса, мимо забытого колодца.",
      },
      {
        type: "player" as const,
        playerName: "Света",
        content:
          "Никто не ожидал, что сокровище будет зарыто так близко от деревни.",
      },
      {
        type: "twist" as const,
        id: "t2",
        content: "Незнакомец оказался старым другом",
      },
    ],
  },
];

const withHeight = (Story: () => React.ReactNode) => (
  <div className="flex flex-col min-h-screen p-6">{Story()}</div>
);

const meta = {
  title: "RoomView/RevealScreen",
  component: RevealScreen,
  args: { onPlayMore: fn() },
  decorators: [withHeight],
} satisfies Meta<typeof RevealScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleStory: Story = {
  beforeEach() {
    useRoomStore.setState({ allStories: singleStory });
  },
};

export const MultipleStories: Story = {
  beforeEach() {
    useRoomStore.setState({ allStories: multipleStories });
  },
};
