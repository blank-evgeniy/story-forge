import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { StoryActions } from "./story-actions";

const meta = {
  title: "RoomView/StoryActions",
  component: StoryActions,
  tags: ["autodocs"],
  args: {
    onSave: fn(),
    onNext: fn(),
  },
} satisfies Meta<typeof StoryActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSaveAction: Story = {
  args: {
    showSaveAction: true,
    isSaved: false,
    saveIsLoading: false,
  },
};

export const Saved: Story = {
  args: {
    showSaveAction: true,
    isSaved: true,
  },
};

export const SaveIsLoading: Story = {
  args: {
    showSaveAction: true,
    saveIsLoading: true,
  },
};

export const WithNextAction: Story = {
  args: {
    showNextAction: true,
  },
};

export const AllActions: Story = {
  args: {
    showNextAction: true,
    showSaveAction: true,
    isSaved: false,
    saveIsLoading: false,
  },
};

export const AllActionsNextDisabledWhileSaving: Story = {
  args: {
    showNextAction: true,
    showSaveAction: true,
    saveIsLoading: true,
  },
};
