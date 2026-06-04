import type { Meta, StoryObj } from "@storybook/react-vite";

import { useRoomStore } from "../../model/use-room-store";
import {
  withRoomActions,
  withRoomLayout,
} from "../../utils/storybook-decorators";
import { MOCK_STORIES } from "../../utils/storybook-mocks";
import { RevealScreen } from "./reveal-screen";

const meta = {
  title: "RoomView/RevealScreen",
  component: RevealScreen,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [withRoomActions, withRoomLayout],
  args: {
    roomCode: "1111",
  },
} satisfies Meta<typeof RevealScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleStory: Story = {
  beforeEach() {
    useRoomStore.setState({ allStories: MOCK_STORIES.slice(0, 1) });
  },
};

export const MultipleStories: Story = {
  beforeEach() {
    useRoomStore.setState({
      allStories: MOCK_STORIES.slice(0, 2),
      aiCommentStatus: "success",
      aiComment:
        "Длинный комментарий от ИИ. Длинный комментарий от ИИ.Длинный комментарий от ИИ.Длинный комментарий от ИИ.Длинный комментарий от ИИ.Длинный комментарий от ИИ.Длинный комментарий от ИИ.Длинный комментарий от ИИ.Длинный комментарий от ИИ.",
    });
  },
};
