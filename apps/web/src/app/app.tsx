import { RouterProvider } from "@tanstack/react-router";

import { ThemeProvider } from "@/entities/theme";
import { env } from "@/shared/lib/config/env";
import { Toaster } from "@/shared/ui/sonner";

import { DevTools } from "./dev-tools";
import { router } from "./routes";

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
      {env.DEV && <DevTools />}
    </ThemeProvider>
  );
}
