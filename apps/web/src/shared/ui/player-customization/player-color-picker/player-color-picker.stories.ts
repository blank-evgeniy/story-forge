import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { PlayerColorPicker } from "./player-color-picker";

const meta = {
  title: "PlayerCustomization/PlayerColorPicker",
  component: PlayerColorPicker,
  tags: ["autodocs"],
  args: {
    value: "amber",
    onChange: fn(),
  },
} satisfies Meta<typeof PlayerColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const BlueSelected: Story = {
  args: { value: "blue" },
};

export const PurpleSelected: Story = {
  args: { value: "purple" },
};

export const RoseSelected: Story = {
  args: { value: "rose" },
};
