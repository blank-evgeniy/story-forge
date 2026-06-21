import type { Meta, StoryObj } from "@storybook/react-vite";

import { toast } from "sonner";

import { Button } from "@/shared/ui/button/button";

import { Toaster } from "./sonner";

const meta = {
  title: "New/Sonner",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast("Room code copied to clipboard")}>
        Show toast
      </Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Toaster />
      <Button onClick={() => toast.success("Player joined the room")}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("Round starts in 10 seconds")}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("Connection is unstable")}
      >
        Warning
      </Button>
      <Button
        variant="danger"
        onClick={() => toast.error("Failed to join the room")}
      >
        Error
      </Button>
    </div>
  ),
};
