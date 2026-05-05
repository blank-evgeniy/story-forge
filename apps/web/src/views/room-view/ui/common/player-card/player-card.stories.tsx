import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlayerCard, PlayerCardAvatar, PlayerCardTitle } from "./player-card";

const meta = {
  title: "RoomView/Common/PlayerCard",
  component: PlayerCard,
  tags: ["autodocs"],
  args: {
    playerName: "Alice",
    children: (
      <>
        <PlayerCardAvatar />
        <PlayerCardTitle />
      </>
    ),
  },
} satisfies Meta<typeof PlayerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: { direction: "vertical" },
};

export const Horizontal: Story = {
  args: { direction: "horizontal" },
};

export const AvatarAccent: Story = {
  args: {
    children: (
      <>
        <PlayerCardAvatar variant="accent" />
        <PlayerCardTitle />
      </>
    ),
  },
};

export const TitleSmall: Story = {
  args: {
    children: (
      <>
        <PlayerCardAvatar />
        <PlayerCardTitle size="sm" />
      </>
    ),
  },
};

export const LongName: Story = {
  args: {
    playerName: "Bartholomew Fitzgerald",
    className: "w-24",
  },
};
