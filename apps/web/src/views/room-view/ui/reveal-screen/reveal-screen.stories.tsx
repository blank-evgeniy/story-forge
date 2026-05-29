import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";

import { RoomActionsProvider } from "../../model/room-actions-context";
import { useRoomStore } from "../../model/use-room-store";
import { MOCK_STORIES } from "../../utils/storybook-mocks";
import { RevealScreen } from "./reveal-screen";

const withHeight: Decorator = (Story) => (
  <div className="flex flex-col min-h-screen p-6">
    <Story />
  </div>
);

const withRoomActions: Decorator = (Story) => (
  <RoomActionsProvider client={null}>
    <Story />
  </RoomActionsProvider>
);

const meta = {
  title: "RoomView/RevealScreen",
  component: RevealScreen,
  decorators: [withHeight, withRoomActions],
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
    useRoomStore.setState({ allStories: MOCK_STORIES.slice(0, 2) });
  },
};
