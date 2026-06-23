import type { Meta, StoryObj } from "@storybook/react-vite";

import { BoldIcon } from "lucide-react";

import { Toggle } from "./toggle";

const meta = {
  title: "New/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Toggle",
    variant: "default",
    size: "default",
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Pressed: Story = {
  args: { defaultPressed: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const IconOnly: Story = {
  args: {
    size: "default",
    "aria-label": "Bold",
    children: <BoldIcon />,
  },
};

const variants = ["default", "outline"] as const;
const sizes = ["sm", "default", "lg"] as const;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          {variants.map((variant) => (
            <Toggle key={variant} variant={variant} size={size}>
              {variant}
            </Toggle>
          ))}
        </div>
      ))}
    </div>
  ),
};
