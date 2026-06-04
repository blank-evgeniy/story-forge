import type { Decorator } from "@storybook/react-vite";

import { RoomActionsProvider } from "../model/room-actions-context";
import { RoomLayout } from "../ui/common/room-layout";

export const withRoomLayout: Decorator = (Story) => (
  <RoomLayout>
    <Story />
  </RoomLayout>
);

export const withRoomActions: Decorator = (Story) => (
  <RoomActionsProvider client={null}>
    <Story />
  </RoomActionsProvider>
);
