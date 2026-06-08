import { RouterProvider } from "@tanstack/react-router";

import { Toaster } from "@/shared/ui/sonner";

import { router } from "./routes";

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
