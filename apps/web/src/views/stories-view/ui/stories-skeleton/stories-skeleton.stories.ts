import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoriesSkeleton } from "./stories-skeleton";

const meta = {
  title: "StoriesView/StoriesSkeleton",
  component: StoriesSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof StoriesSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
