// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    plugins: { perfectionist },
    rules: {
      "perfectionist/sort-imports": ["error", { type: "natural" }],
      "perfectionist/sort-named-imports": ["error", { type: "natural" }],
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...storybook.configs["flat/recommended"],
]);
