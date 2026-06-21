import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./native-select";

const meta = {
  title: "New/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    size: "default",
  },
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOption value="ru">Russian</NativeSelectOption>
      <NativeSelectOption value="en">English</NativeSelectOption>
      <NativeSelectOption value="de">German</NativeSelectOption>
    </NativeSelect>
  ),
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: "sm" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithGroups: Story = {
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOptGroup label="Europe">
        <NativeSelectOption value="ru">Russian</NativeSelectOption>
        <NativeSelectOption value="de">German</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Other">
        <NativeSelectOption value="en">English</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
};
