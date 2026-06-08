/// <reference types="vite/client" />
import type { Preview } from "@storybook/react-vite";

import { Toaster } from "sonner";
import { withTanStackRouter } from "storybook-addon-tanstack-router";
import { themes } from "storybook/theming";

import "../src/app/styles/index.css";
import "../src/lib/i18n/i18n-setup";

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
    withTanStackRouter,
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default preview;
