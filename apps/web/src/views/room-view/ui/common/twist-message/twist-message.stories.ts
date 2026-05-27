import type { Meta, StoryObj } from "@storybook/react-vite";

import { TwistMessage } from "./twist-message";

const meta = {
  title: "RoomView/Common/TwistMessage",
  component: TwistMessage,
  tags: ["autodocs"],
  args: {
    message: "В историю добавился загадочный поворот.",
  },
} satisfies Meta<typeof TwistMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortMessage: Story = {
  args: {
    message: "Неожиданный поворот!",
  },
};

export const LongMessage: Story = {
  args: {
    message:
      "Главный герой внезапно осознаёт, что человек, которого он искал всё это время, всегда был рядом — прямо у него на виду.",
  },
};
