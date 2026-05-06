import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { JoinRoom } from "./join-room";

const meta = {
  title: "WelcomeView/JoinRoom",
  component: JoinRoom,
  tags: ["autodocs"],
  args: {
    onJoin: fn(),
  },
} satisfies Meta<typeof JoinRoom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
