import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/shared/ui/new/button/button";

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

const meta = {
  title: "New/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button>Open popover</Button>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Room settings</PopoverTitle>
          <PopoverDescription>
            Adjust the game rules for this room.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const SideRight: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button>Open right</Button>} />
      <PopoverContent side="right">
        <PopoverHeader>
          <PopoverTitle>Hint</PopoverTitle>
          <PopoverDescription>Positioned to the right.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};
