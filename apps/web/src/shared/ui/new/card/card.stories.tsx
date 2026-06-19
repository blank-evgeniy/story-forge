import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/shared/ui/new/button/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "New/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
  args: {
    size: "default",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Game lobby</CardTitle>
        <CardDescription>Waiting for players to join.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-ink-muted">
          Share the room code with your friends to get started.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Start game</Button>
      </CardFooter>
    </Card>
  ),
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Round 3</CardTitle>
        <CardDescription>Pick your next move.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-ink-muted">Compact card layout.</p>
      </CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Player settings</CardTitle>
        <CardDescription>Update your profile.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="Edit">
            ⚙
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-ink-muted">Avatar, nickname, and color.</p>
      </CardContent>
    </Card>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <img
        src="https://picsum.photos/320/160"
        alt="Cover"
        className="aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardTitle>Mystery Island</CardTitle>
        <CardDescription>A new adventure awaits.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

const sizes = ["default", "sm"] as const;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6">
      {sizes.map((size) => (
        <Card key={size} size={size} className="w-72">
          <CardHeader>
            <CardTitle>Size: {size}</CardTitle>
            <CardDescription>Card description text.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-ink-muted">Card content area.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
};
