import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CreateRoom } from "./create-room";

const meta = {
  title: "WelcomeView/CreateRoom",
  component: CreateRoom,
  tags: ["autodocs"],
  args: {
    onCreate: fn(),
    isLoading: false,
  },
} satisfies Meta<typeof CreateRoom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};
