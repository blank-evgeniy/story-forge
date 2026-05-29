import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { ServerStatus } from "./server-status";

const meta = {
  title: "WelcomeView/ServerStatus",
  component: ServerStatus,
  tags: ["autodocs"],
  args: {
    onRetry: fn(),
  },
} satisfies Meta<typeof ServerStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checking: Story = {
  args: {
    status: "checking",
  },
};

export const Starting: Story = {
  args: {
    status: "starting",
  },
};

export const Online: Story = {
  args: {
    status: "online",
  },
};

export const ErrorStory: Story = {
  args: {
    status: "error",
  },
};
