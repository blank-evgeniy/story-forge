import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/shared/lib/i18n/i18n-setup";

import { App } from "./app";
import "./styles/index.css";

const root = createRoot(document.getElementById("root")!);

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

root.render(app);
