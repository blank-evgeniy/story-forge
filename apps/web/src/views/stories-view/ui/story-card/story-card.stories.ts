import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { StoryCard } from "./story-card";

const meta = {
  title: "StoriesView/StoryCard",
  component: StoryCard,
  tags: ["autodocs"],
  args: {
    onOpen: fn(),
    story: {
      id: 1,
      createdAt: new Date("2024-03-15").getTime(),
      ownerName: "Иван Иванов",
    },
  },
} satisfies Meta<typeof StoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongOwnerName: Story = {
  args: {
    story: {
      id: 2,
      createdAt: new Date("2024-06-01").getTime(),
      ownerName: "Александр Александрович Александров",
    },
  },
};
