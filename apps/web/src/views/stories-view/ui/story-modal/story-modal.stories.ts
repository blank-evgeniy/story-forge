import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { StoryModal } from "./story-modal";

const meta = {
  title: "StoriesView/StoryModal",
  component: StoryModal,
  tags: ["autodocs"],
  args: {
    isOpen: true,
    isStoryLoading: false,
    onClose: fn(),
    openedStory: {
      id: 1,
      createdAt: new Date("2024-03-15").getTime(),
      ownerName: "Иван Иванов",
      content: [
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
          entry: "Внезапно все свечи погасли.",
          twist: "Неожиданный поворот: хозяин замка оказался призраком!",
        },
        { playerName: "Борис", entry: "Путники бросились бежать к выходу." },
      ],
    },
  },
} satisfies Meta<typeof StoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenWithContent: Story = {};

export const Loading: Story = {
  args: {
    isStoryLoading: true,
    openedStory: undefined,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    openedStory: undefined,
  },
};
