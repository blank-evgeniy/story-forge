import type { Meta, StoryObj } from "@storybook/react-vite";

import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

const meta = {
  title: "New/ToggleGroup",
  component: ToggleGroup,
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
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    variant: "default",
    size: "default",
    orientation: "horizontal",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
};

export const WithSpacing: Story = {
  args: { spacing: 2 },
};

const variants = ["default", "outline"] as const;
const sizes = ["sm", "default", "lg"] as const;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-4">
          {variants.map((variant) => (
            <ToggleGroup key={variant} variant={variant} size={size}>
              <ToggleGroupItem value="bold" aria-label="Bold">
                <BoldIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <ItalicIcon />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <UnderlineIcon />
              </ToggleGroupItem>
            </ToggleGroup>
          ))}
        </div>
      ))}
    </div>
  ),
};
