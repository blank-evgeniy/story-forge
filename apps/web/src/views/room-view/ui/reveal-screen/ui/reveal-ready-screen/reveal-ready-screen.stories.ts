import type { Meta, StoryObj } from "@storybook/react-vite";

import { RevealReadyScreen } from "./reveal-ready-screen";

const meta = {
  title: "RoomView/RevealScreen/RevealReadyScreen",
  component: RevealReadyScreen,
  tags: ["autodocs"],
  args: {
    storiesCount: 4,
    onStart: () => {},
    onSwitchChange: () => {},
  },
} satisfies Meta<typeof RevealReadyScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OneStory: Story = {
  args: {
    storiesCount: 1,
  },
};
