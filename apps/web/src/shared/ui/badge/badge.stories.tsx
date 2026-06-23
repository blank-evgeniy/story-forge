import type { Meta, StoryObj } from "@storybook/react-vite";

import { StarIcon } from "lucide-react";

import { Badge } from "./badge";

const meta = {
  title: "New/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
  },
  args: {
    children: "Badge",
    variant: "default",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Destructive: Story = {
  args: { variant: "destructive" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Link: Story = {
  args: { variant: "link" },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <StarIcon data-icon="inline-start" />
        Featured
      </>
    ),
  },
};

const variants = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-6">
      <div className="flex items-center gap-3">
        {variants.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </div>
    </div>
  ),
};
