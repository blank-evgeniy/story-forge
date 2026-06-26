import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { ProfileEditView } from "./profile-edit-view";

const meta = {
  title: "ProfileEditView/ProfileEditView",
  component: ProfileEditView,
  tags: ["autodocs"],
  args: {
    onSave: fn(),
    onThemeChange: fn(),
    onLogout: fn(),
  },
} satisfies Meta<typeof ProfileEditView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialColor: "red",
    initialIcon: "evil",
    initialUsername: "Alice",
    theme: "violet",
  },
};
