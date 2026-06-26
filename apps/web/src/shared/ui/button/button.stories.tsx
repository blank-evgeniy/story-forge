import type { Meta, StoryObj } from "@storybook/react-vite";

import { PlusIcon } from "lucide-react";

import { Button } from "./button";

const meta = {
  title: "New/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "default",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

export const Loading: Story = {
  args: { isLoading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Icon: Story = {
  args: {
    size: "icon",
    "aria-label": "Add",
    children: <PlusIcon />,
  },
};

export const IconSmall: Story = {
  args: {
    size: "icon-sm",
    "aria-label": "Add",
    children: <PlusIcon />,
  },
};

export const IconLarge: Story = {
  args: {
    size: "icon-lg",
    "aria-label": "Add",
    children: <PlusIcon />,
  },
};
