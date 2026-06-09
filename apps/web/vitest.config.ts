/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: "./vitest.setup.tsx",
    environment: "jsdom",
    exclude: ["e2e/**", "node_modules/**"],
    env: {
      NODE_ENV: "test",
      VITE_API_BASE_URL: "http://localhost:3000",
      VITE_WS_BASE_URL: "ws://localhost:3000",
    },
  },
});
