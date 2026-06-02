import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { MOCK_STORIES } from "../../../utils/storybook-mocks";
import { StoriesHistory } from "./stories-history";
import { StoriesHistoryPicker } from "./stories-history-picker";
import { StoriesHistoryViewer } from "./stories-history-viewer";

const meta = {
  title: "RoomView/RevealScreen/StoriesHistory",
  component: StoriesHistory,
  tags: ["autodocs"],
  args: {
    stories: MOCK_STORIES,
    onSelectedStoryChange: fn(),
    children: (
      <div className="flex flex-col gap-4 md:flex-row">
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
    stories: [MOCK_STORIES[0]],
  },
};
