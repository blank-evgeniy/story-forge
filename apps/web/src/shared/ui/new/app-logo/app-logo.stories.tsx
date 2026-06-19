import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppLogo } from "./app-logo";

const meta = {
  title: "New/AppLogo",
  component: AppLogo,
  tags: ["autodocs"],
} satisfies Meta<typeof AppLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-app flex items-center justify-center p-10">
      <AppLogo />
    </div>
  ),
};

export const OnSurface: Story = {
  render: () => (
    <div className="bg-surface flex items-center justify-center p-10">
      <AppLogo />
    </div>
  ),
};
