import type { Meta, StoryObj } from "@storybook/react-vite";
import { RoomLoading } from "./room-loading";

const meta = {
  title: "RoomView/Common/RoomLoading",
  component: RoomLoading,
  tags: ["autodocs"],
} satisfies Meta<typeof RoomLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    title: "Подключение...",
  },
};
