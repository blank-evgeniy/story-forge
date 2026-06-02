import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoryContent } from "./story-content";

const meta = {
  title: "StoriesView/StoryContent",
  component: StoryContent,
  tags: ["autodocs"],
  args: {
    items: [
      {
        playerName: "Алиса",
        entry: "Однажды в тёмном лесу появился странник.",
      },
      {
        playerName: "Борис",
        entry: "Он нёс с собой старинную карту сокровищ.",
      },
      {
        playerName: "Алиса",
        entry: "Карта указывала на заброшенный замок на севере.",
      },
      {
        playerName: "Борис",
        entry: "Они решили отправиться туда на рассвете.",
      },
    ],
  },
} satisfies Meta<typeof StoryContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTwist: Story = {
  args: {
    items: [
      {
        playerName: "Алиса",
        entry: "Они вошли в замок и увидели огромный зал.",
      },
      { playerName: "Борис", entry: "В зале стоял стол с роскошным пиром." },
      {
        playerName: "Алиса",
        entry: "Внезапно все свечи погасли одновременно.",
        twist: "Неожиданный поворот: хозяин замка оказался призраком!",
      },
      { playerName: "Борис", entry: "Путники бросились бежать к выходу." },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
