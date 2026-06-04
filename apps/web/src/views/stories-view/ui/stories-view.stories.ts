import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { StoriesView } from "./stories-view";

const meta = {
  title: "StoriesView/StoriesView",
  component: StoriesView,
  tags: ["autodocs"],
  args: {
    onOpen: fn(),
    modalSlot: null,
    isLoading: false,
    stories: [
      {
        id: 1,
        createdAt: new Date("2024-01-10").getTime(),
        ownerName: "Иван Иванов",
      },
      {
        id: 2,
        createdAt: new Date("2024-03-22").getTime(),
        ownerName: "Мария Петрова",
      },
      {
        id: 3,
        createdAt: new Date("2024-05-05").getTime(),
        ownerName: "Алексей Сидоров",
      },
    ],
  },
} satisfies Meta<typeof StoriesView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithStories: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
    stories: undefined,
  },
};

export const Empty: Story = {
  args: {
    stories: [],
  },
};
