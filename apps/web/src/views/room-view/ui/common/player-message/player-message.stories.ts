import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlayerMessage } from "./player-message";

const meta = {
  title: "RoomView/Common/PlayerMessage",
  component: PlayerMessage,
  tags: ["autodocs"],
  args: {
    message: "Это сообщение игрока.",
  },
} satisfies Meta<typeof PlayerMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongMessage: Story = {
  args: {
    message:
      "Это гораздо более длинное сообщение игрока, которое занимает несколько строк, чтобы показать, как пузырь обрабатывает переполнение и перенос текста.",
  },
};

export const ShortMessage: Story = {
  args: {
    message: "Ок!",
  },
};
