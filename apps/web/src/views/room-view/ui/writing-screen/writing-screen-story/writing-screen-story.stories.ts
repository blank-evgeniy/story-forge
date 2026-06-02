import type { Meta, StoryObj } from "@storybook/react-vite";

import { WritingScreenStory } from "./writing-screen-story";

const meta = {
  title: "RoomView/WritingScreen/WritingScreenStory",
  component: WritingScreenStory,
  tags: ["autodocs"],
  args: {
    story: [
      { entry: "Была тёмная и бурная ночь." },
      {
        entry: "Внезапно раздался выстрел.",
      },
      { entry: "Никто не знал, что делать дальше." },
    ],
  },
} satisfies Meta<typeof WritingScreenStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithStory: Story = {};

export const WithTwist: Story = {
  args: {
    story: [
      { entry: "В деревне царил покой." },
      {
        entry: "На рассвете появился незнакомец.",
      },
      {
        entry: "Старейшина встретил его с подозрением.",
        twist: "Персонаж меняется ролями с другим.",
      },
      { entry: "Незнакомец улыбнулся и промолчал." },
    ],
  },
};

export const Empty: Story = {
  args: {
    story: [],
  },
};
