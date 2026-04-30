import { Link } from "@tanstack/react-router";
import { HeaderMenu } from "./header-menu";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col max-w-3xl w-full mx-auto min-h-dvh px-4 pb-4">
      <header className="py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-primary font-semibold text-lg leading-none hover:opacity-80"
        >
          <span className="text-muted-foreground">Story</span>Forge
        </Link>

        <HeaderMenu />
      </header>
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
