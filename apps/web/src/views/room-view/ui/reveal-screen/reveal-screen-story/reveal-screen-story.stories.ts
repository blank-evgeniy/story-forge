import type { Meta, StoryObj } from "@storybook/react-vite";
import { RevealScreenStory } from "./reveal-screen-story";

const meta = {
  title: "RoomView/RevealScreen/RevealScreenStory",
  component: RevealScreenStory,
  tags: ["autodocs"],
  args: {
    story: {
      id: "1",
      playerName: "Алиса",
      sentences: [
        {
          type: "player",
          playerName: "Алиса",
          content: "Была тёмная и бурная ночь.",
        },
        { type: "twist", id: "t1", content: "Герой теряет память." },
        {
          type: "player",
          playerName: "Борис",
          content: "Внезапно появился незнакомец.",
        },
        {
          type: "player",
          playerName: "Алиса",
          content: "Никто не знал, что будет дальше.",
        },
      ],
    },
    shown: 4,
  },
} satisfies Meta<typeof RevealScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVisible: Story = {};

export const PartiallyRevealed: Story = {
  args: {
    shown: 2,
  },
};

export const NoneRevealed: Story = {
  args: {
    shown: 0,
  },
};

export const WithoutTwists: Story = {
  args: {
    story: {
      id: "2",
      playerName: "Борис",
      sentences: [
        {
          type: "player",
          playerName: "Борис",
          content: "В деревне царил покой.",
        },
        {
          type: "player",
          playerName: "Алиса",
          content: "На рассвете появился незнакомец.",
        },
        {
          type: "player",
          playerName: "Борис",
          content: "Старейшина встретил его с подозрением.",
        },
      ],
    },
    shown: 3,
  },
};
