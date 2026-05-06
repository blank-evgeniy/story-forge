import type { Meta, StoryObj } from "@storybook/react-vite";
import { WritingScreenStory } from "./writing-screen-story";

const meta = {
  title: "RoomView/WritingScreen/WritingScreenStory",
  component: WritingScreenStory,
  tags: ["autodocs"],
  args: {
    story: [
      { sentence: "Была тёмная и бурная ночь." },
      {
        sentence: "Внезапно раздался выстрел.",
      },
      { sentence: "Никто не знал, что делать дальше." },
    ],
  },
} satisfies Meta<typeof WritingScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithStory: Story = {};

export const WithTwist: Story = {
  args: {
    story: [
      { sentence: "В деревне царил покой." },
      {
        sentence: "На рассвете появился незнакомец.",
      },
      {
        sentence: "Старейшина встретил его с подозрением.",
        twist: "Персонаж меняется ролями с другим.",
      },
      { sentence: "Незнакомец улыбнулся и промолчал." },
    ],
  },
};

export const Empty: Story = {
  args: {
    story: [],
  },
};
