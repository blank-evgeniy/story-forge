import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { StoriesHistory } from "./stories-history";
import { StoriesHistoryPicker } from "./stories-history-picker";
import { StoriesHistoryViewer } from "./stories-history-viewer";

const sampleStories = [
  {
    id: "1",
    playerName: "Алиса",
    sentences: [
      {
        type: "player" as const,
        playerName: "Алиса",
        content: "Была тёмная и бурная ночь.",
      },
      { type: "twist" as const, id: "t1", content: "Герой теряет память." },
      {
        type: "player" as const,
        playerName: "Борис",
        content: "Внезапно появился незнакомец.",
      },
    ],
  },
  {
    id: "2",
    playerName: "Борис",
    sentences: [
      {
        type: "player" as const,
        playerName: "Борис",
        content: "В деревне царил покой.",
      },
      {
        type: "player" as const,
        playerName: "Алиса",
        content: "На рассвете появился незнакомец.",
      },
    ],
  },
  {
    id: "3",
    playerName: "Вика",
    sentences: [
      {
        type: "player" as const,
        playerName: "Вика",
        content: "Горы хранили древние тайны.",
      },
      { type: "twist" as const, id: "t2", content: "Всё оказалось сном." },
      { type: "player" as const, playerName: "Борис", content: "Или нет?" },
    ],
  },
];

const meta = {
  title: "RoomView/RevealScreen/StoriesHistory",
  component: StoriesHistory,
  tags: ["autodocs"],
  args: {
    stories: sampleStories,
    onSelectedStoryChange: fn(),
    children: (
      <div className="flex flex-col md:flex-row gap-4">
        <StoriesHistoryViewer />
        <StoriesHistoryPicker />
      </div>
    ),
  },
} satisfies Meta<typeof StoriesHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMultipleStories: Story = {};

export const WithSingleStory: Story = {
  args: {
    stories: [sampleStories[0]],
  },
};
