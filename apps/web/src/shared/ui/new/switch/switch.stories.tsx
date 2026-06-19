import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch } from "./switch";

const meta = {
  title: "New/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"],
    },
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
  },
  args: {
    size: "default",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const SmallChecked: Story = {
  args: { size: "sm", defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

const sizes = ["sm", "default"] as const;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <Switch size={size} />
          <Switch size={size} defaultChecked />
        </div>
      ))}
    </div>
  ),
};
