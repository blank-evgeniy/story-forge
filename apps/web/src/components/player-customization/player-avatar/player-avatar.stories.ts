import type { Meta, StoryObj } from "@storybook/react-vite";

import { PlayerAvatar } from "./player-avatar";

const meta = {
  title: "PlayerCustomization/PlayerAvatar",
  component: PlayerAvatar,
  tags: ["autodocs"],
  args: {
    color: "amber",
    icon: "angel",
    size: "default",
  },
} satisfies Meta<typeof PlayerAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const ExtraLarge: Story = {
  args: { size: "xl" },
};

export const BlueMonocle: Story = {
  args: { color: "blue", icon: "monocle" },
};

export const PurpleStarFace: Story = {
  args: { color: "purple", icon: "star-face" },
};

export const EvilRed: Story = {
  args: { color: "red", icon: "evil" },
};
