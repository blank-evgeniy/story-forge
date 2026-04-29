import { ModeToggle } from "@/components/features/theme";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col max-w-3xl w-full mx-auto min-h-dvh px-4 pb-4">
      <header className="py-4 flex justify-between items-center">
        <span className="text-primary font-semibold text-lg leading-none">
          <span className="text-muted-foreground">Story</span>Forge
        </span>
        <ModeToggle />
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
