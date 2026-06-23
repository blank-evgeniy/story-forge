/// <reference types="vite/client" />
import type { Preview } from "@storybook/react-vite";

import { Toaster } from "sonner";
import { withTanStackRouter } from "storybook-addon-tanstack-router";

import "../src/app/styles/index.css";
import "../src/shared/lib/i18n/i18n-setup";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
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
