/// <reference types="vite/client" />
import type { Preview } from "@storybook/react-vite";

import { Toaster } from "sonner";
import { themes } from "storybook/theming";

import "../src/app/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    backgrounds: {
      default: "app",
      values: [{ name: "app", value: "oklch(0.2747 0.0139 57.6523)" }],
    },

    docs: {
      theme: themes.dark,
    },

    a11y: {
      test: "todo",
    },
  },

  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default preview;
