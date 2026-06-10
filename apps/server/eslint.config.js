import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import perfectionist from "eslint-plugin-perfectionist";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    plugins: { perfectionist },
    rules: {
      "perfectionist/sort-imports": ["error", { type: "natural" }],
      "perfectionist/sort-named-imports": ["error", { type: "natural" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-console": "warn",
    },
  },
]);
