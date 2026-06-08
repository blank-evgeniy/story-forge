import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";
import "./app/styles/index.css";
import { env } from "./shared/lib/config/env";
import "./shared/lib/i18n/i18n-setup";

const root = createRoot(document.getElementById("root")!);

const app = env.VITE_E2E ? (
  <App />
) : (
  <StrictMode>
    <App />
  </StrictMode>
);

root.render(app);
