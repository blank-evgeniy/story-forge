# Write Storybook stories for a component

Given a component file path (or the currently open file), generate a Storybook `.stories.ts` / `.stories.tsx` file that follows the conventions used in this project.

## Rules

1. **File naming**: place the stories file next to the component: `<component-name>.stories.ts` (use `.tsx` only when JSX is needed inside story `render` / decorators).
2. **Imports**:
   - `import type { Meta, StoryObj } from "@storybook/react-vite";`
   - `import { fn } from "storybook/test";` — only when the component has function props (callbacks).
3. **Meta object**:
   - `title`: derive from the file path. Map `src/views/<ViewName>/ui/<...>/<ComponentName>` → `"<ViewName>/<ComponentName>"`. Capitalise each segment. Example: `src/views/room-view/ui/writing-screen/writing-screen-submit/writing-screen-submit.tsx` → `"RoomView/WritingScreenSubmit"`.
   - `component`: the named export of the component.
   - `tags: ["autodocs"]` — always include.
   - `args`: put shared / default args here (use `fn()` for callbacks).
   - Use `satisfies Meta<typeof ComponentName>` — never cast with `as`.
4. **Stories**:
   - Export `default meta` and `type Story = StoryObj<typeof meta>`.
   - Create one story per meaningful visual / behavioural variant of the component. Name each story with a descriptive PascalCase identifier.
   - Each story's `args` must override only what differs from `meta.args`.
   - For boolean props create at least two stories (truthy / falsy).
   - For nullable / optional data props create stories for the populated case and the empty/null case.
   - Use `fn()` for callback args, not arrow functions or `() => {}`.
   - Do **not** add `parameters`, `decorators`, or `play` functions unless you have a specific reason.
5. **Types**: never import internal helper types just to annotate stories — use `StoryObj<typeof meta>` only.
6. **No extra comments** in the generated file.

## Steps

1. Read the component file passed as `$ARGUMENTS` (or the file currently open in the IDE if no argument is given).
2. Identify:
   - The exported component name.
   - Its props type / interface (look for a local `type …Props` or `interface …Props`).
   - Which props are callbacks (function types) → use `fn()`.
   - Which props are booleans, nullable values, arrays, or enums → plan one story per significant variant.
3. Derive the `title` from the file path following rule 3 above.
4. Write the stories file next to the component.
5. Report the created file path.

## Example output (for reference only — do not copy-paste)

```ts
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MyButton } from "./my-button";

const meta = {
  title: "Common/MyButton",
  component: MyButton,
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: "Click me", disabled: false },
};

export const Disabled: Story = {
  args: { label: "Disabled", disabled: true },
};
```
