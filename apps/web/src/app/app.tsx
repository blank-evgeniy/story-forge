import { RouterProvider } from "@tanstack/react-router";

import { ThemeProvider } from "@/entities/theme";
import { Toaster } from "@/shared/ui/sonner";

import { router } from "./routes";

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
