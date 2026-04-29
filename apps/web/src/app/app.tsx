import { ThemeProvider } from "@/components/features/theme";
import { AppLayout } from "./layout";
import { WelcomeView } from "@/views/welcome-view";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppLayout>
        <WelcomeView />
      </AppLayout>
    </ThemeProvider>
  );
}
