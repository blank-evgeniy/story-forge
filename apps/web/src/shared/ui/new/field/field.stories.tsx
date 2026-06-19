import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@/shared/ui/new/input/input";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./field";

const meta = {
  title: "New/Field",
  component: Field,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
  args: {
    orientation: "vertical",
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field {...args} className="w-72">
      <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
      <Input id="nickname" placeholder="Enter your nickname" />
      <FieldDescription>This is shown to other players.</FieldDescription>
    </Field>
  ),
};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <Field {...args} className="w-96">
      <FieldLabel htmlFor="nickname-h">Nickname</FieldLabel>
      <FieldContent>
        <Input id="nickname-h" placeholder="Enter your nickname" />
      </FieldContent>
    </Field>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <Field {...args} className="w-72" data-invalid="true">
      <FieldLabel htmlFor="nickname-error">Nickname</FieldLabel>
      <Input
        id="nickname-error"
        aria-invalid
        defaultValue="a"
        placeholder="Enter your nickname"
      />
      <FieldError>Nickname must be at least 3 characters.</FieldError>
    </Field>
  ),
};

export const FieldSetWithLegend: Story = {
  render: () => (
    <FieldSet className="w-80">
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input id="name" placeholder="Your name" />
        </Field>
        <FieldSeparator>or</FieldSeparator>
        <Field>
          <FieldTitle>Continue as guest</FieldTitle>
          <FieldDescription>No account needed.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
