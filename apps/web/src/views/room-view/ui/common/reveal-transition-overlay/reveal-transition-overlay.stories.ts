import type { Meta, StoryObj } from "@storybook/react-vite";

import { RevealTransitionOverlay } from "./reveal-transition-overlay";

const meta = {
  title: "RoomView/RevealTransitionOverlay",
  component: RevealTransitionOverlay,
} satisfies Meta<typeof RevealTransitionOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
