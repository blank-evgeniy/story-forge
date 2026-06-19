import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./label";

const meta = {
  title: "New/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Nickname",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  render: (args) => (
    <div data-disabled="true" className="group">
      <Label {...args} />
    </div>
  ),
};
