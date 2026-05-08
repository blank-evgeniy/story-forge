import type { Meta, StoryObj } from "@storybook/react-vite";
import { RoomError } from "./room-error";

const meta = {
  title: "RoomView/Common/RoomError",
  component: RoomError,
  tags: ["autodocs"],
  args: {
    title: "Что-то пошло не так",
  },
} satisfies Meta<typeof RoomError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
