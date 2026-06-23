import type { Meta, StoryObj } from "@storybook/react-vite";

import { CrownIcon } from "lucide-react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./avatar";

const meta = {
  title: "New/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
    },
  },
  args: {
    size: "default",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
      <AvatarFallback>FN</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { size: "sm" },
};

export const Default: Story = {};

export const Large: Story = {
  args: { size: "lg" },
};

export const ExtraLarge: Story = {
  args: { size: "xl" },
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/broken-image.png" alt="User" />
      <AvatarFallback>FN</AvatarFallback>
    </Avatar>
  ),
};

export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
      <AvatarFallback>FN</AvatarFallback>
      <AvatarBadge>
        <CrownIcon />
      </AvatarBadge>
    </Avatar>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/100?img=1" alt="User 1" />
        <AvatarFallback>A1</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/100?img=2" alt="User 2" />
        <AvatarFallback>A2</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/100?img=3" alt="User 3" />
        <AvatarFallback>A3</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};

const sizes = ["sm", "default", "lg", "xl"] as const;

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src="https://i.pravatar.cc/100" alt="User" />
          <AvatarFallback>FN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
