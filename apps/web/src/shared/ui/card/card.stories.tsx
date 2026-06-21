import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/shared/ui/button/button";

import { Card } from "./card";

const meta = {
  title: "New/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-app p-10">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <h3 className="text-lg font-extrabold">Game lobby</h3>
      <p className="text-surface/80 text-sm">
        Share the room code with your friends to get started.
      </p>
      <Button className="w-full">Start game</Button>
    </Card>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Card {...args} className="w-80 gap-4 px-0 pt-0">
      <img
        src="https://picsum.photos/320/160"
        alt="Cover"
        className="aspect-video w-full rounded-t-3xl object-cover"
      />
      <div className="flex flex-col gap-2 px-4">
        <h3 className="text-lg font-extrabold">Mystery Island</h3>
        <p className="text-surface/80 text-sm">A new adventure awaits.</p>
      </div>
    </Card>
  ),
};
