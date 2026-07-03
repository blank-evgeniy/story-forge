import type { Decorator } from "@storybook/react-vite";

import type { MutationHook } from "@/shared/types";

import { RoomActionsProvider } from "../model/context/room-actions-context";
import { SaveStoryProvider } from "../model/context/save-story-context";
import { RoomLayout } from "../ui/common/room-layout";

const saveStoryStub: MutationHook<{ storyId: string }> = {
  data: null,
  error: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  mutate: () => {},
  mutateAsync: () => Promise.resolve(undefined),
};

export const withRoomLayout: Decorator = (Story) => (
  <RoomLayout>
    <Story />
  </RoomLayout>
);

export const withRoomActions: Decorator = (Story) => (
  <RoomActionsProvider>
    <Story />
  </RoomActionsProvider>
);

export const withSaveStoryContext: Decorator = (Story) => (
  <SaveStoryProvider roomCode="" saveStoryHook={saveStoryStub}>
    <Story />
  </SaveStoryProvider>
);
