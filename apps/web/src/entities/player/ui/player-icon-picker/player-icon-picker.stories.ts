import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { PlayerIconPicker } from "./player-icon-picker";

const meta = {
  title: "Player/PlayerIconPicker",
  component: PlayerIconPicker,
  tags: ["autodocs"],
  args: {
    value: "angel",
    color: "amber",
    onChange: fn(),
  },
} satisfies Meta<typeof PlayerIconPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EvilSelected: Story = {
  args: { value: "evil" },
};

export const StarFaceSelected: Story = {
  args: { value: "star-face" },
};

export const BlueColor: Story = {
  args: { color: "blue" },
};

export const PurpleColor: Story = {
  args: { value: "laughing", color: "purple" },
};
