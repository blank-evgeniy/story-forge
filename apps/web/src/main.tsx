import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";
import "./app/styles/index.css";
import "./lib/i18n/i18n-setup";

const root = createRoot(document.getElementById("root")!);

const app = import.meta.env.VITE_E2E ? (
  <App />
) : (
  <StrictMode>
    <App />
  </StrictMode>
);

root.render(app);
