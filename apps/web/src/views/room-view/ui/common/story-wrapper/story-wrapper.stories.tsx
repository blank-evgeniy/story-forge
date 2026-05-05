import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryWrapper } from "./story-wrapper";

const meta = {
  title: "RoomView/Common/StoryWrapper",
  component: StoryWrapper,
  tags: ["autodocs"],
  args: {
    children: (
      <p className="text-sm text-foreground">
        Старый смотритель маяка заметил на горизонте что-то необычное.
      </p>
    ),
  },
} satisfies Meta<typeof StoryWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithOwner: Story = {
  args: { storyOwner: "Алиса" },
};

export const GapMd: Story = {
  args: {
    gap: "md",
    children: (
      <>
        <p className="text-sm text-foreground">Первое предложение истории.</p>
        <p className="text-sm text-foreground">Второе предложение истории.</p>
        <p className="text-sm text-foreground">Третье предложение истории.</p>
      </>
    ),
  },
};

export const GapSm: Story = {
  args: {
    gap: "sm",
    children: (
      <>
        <p className="text-sm text-foreground">Первое предложение истории.</p>
        <p className="text-sm text-foreground">Второе предложение истории.</p>
        <p className="text-sm text-foreground">Третье предложение истории.</p>
      </>
    ),
  },
};
