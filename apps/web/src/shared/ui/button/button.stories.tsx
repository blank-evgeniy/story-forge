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
      options: ["primary", "secondary", "outline", "ghost", "danger", "link"],
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

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

export const Link: Story = {
  args: { variant: "link" },
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

const variants = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "danger",
  "link",
] as const;

const sizes = ["sm", "default", "lg"] as const;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} size={size}>
              {variant}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

const iconSizes = ["icon-sm", "icon", "icon-lg"] as const;

export const AllIconVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      {iconSizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          {variants.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size={size}
              aria-label="Add"
            >
              <PlusIcon />
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
