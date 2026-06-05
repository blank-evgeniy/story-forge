import type { Meta, StoryObj } from "@storybook/react-vite";

import { MOCK_STORIES } from "../../../../utils/storybook-mocks";
import { RevealScreenStory } from "./reveal-screen-story";

const meta = {
  title: "RoomView/RevealScreen/RevealScreenStory",
  component: RevealScreenStory,
  tags: ["autodocs"],
  args: {
    story: MOCK_STORIES[0],
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
    story: MOCK_STORIES[1],
    shown: 2,
  },
};
