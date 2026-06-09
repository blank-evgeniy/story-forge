import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { env } from "@/shared/lib/config/env";

import { App } from "./app";
import "@/shared/lib/i18n/i18n-setup";

import "./styles/index.css";

const root = createRoot(document.getElementById("root")!);

const app = env.VITE_E2E ? (
  <App />
) : (
  <StrictMode>
    <App />
  </StrictMode>
);

root.render(app);
