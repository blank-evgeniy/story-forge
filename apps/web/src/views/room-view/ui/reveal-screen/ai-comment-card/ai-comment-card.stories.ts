import type { Meta, StoryObj } from "@storybook/react-vite";

import { AiCommentCard } from "./ai-comment-card";

const meta = {
  title: "RoomView/RevealScreen/AiCommentCard",
  component: AiCommentCard,
} satisfies Meta<typeof AiCommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: { status: "loading", comment: null },
};

export const Success: Story = {
  args: {
    status: "success",
    comment:
      "Авторы явно договорились писать как можно страннее — и у них это получилось. Особенно впечатляет переход от средневекового рыцаря к интернет-магазину за два предложения. Шедевр абсурдизма, хотя, возможно, случайный.",
  },
};

export const Error: Story = {
  args: { status: "error", comment: null },
};
