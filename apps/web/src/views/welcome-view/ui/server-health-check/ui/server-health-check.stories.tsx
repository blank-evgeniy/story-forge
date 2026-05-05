import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CheckingState } from "./checking-state";
import { ErrorState } from "./error-state";
import { OnlineState } from "./online-state";
import { StartingState } from "./starting-state";

const meta = {
  title: "WelcomeView/ServerHealthCheck",
  component: CheckingState,
  tags: ["autodocs"],
} satisfies Meta<typeof CheckingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checking: Story = {};

export const Starting: Story = {
  render: () => <StartingState />,
};

export const Online: Story = {
  render: () => <OnlineState />,
};

export const Error: Story = {
  render: () => <ErrorState onRetry={fn()} />,
};
