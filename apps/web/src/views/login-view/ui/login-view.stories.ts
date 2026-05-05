import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { LoginView } from "./login-view";

const meta = {
  title: "LoginView/LoginView",
  component: LoginView,
  tags: ["autodocs"],
  args: {
    onLogin: fn(),
  },
} satisfies Meta<typeof LoginView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
