import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AppLogo } from "@/components/app-logo";
import { PlayerAvatar } from "@/components/player-customization";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const user = useUserStore((store) => store.user);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-4 pb-4">
      <header className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-px">
          <AppLogo />
        </Link>

        <div className="flex items-center gap-1 header-delayed-appear">
          <Button
            variant={"ghost"}
            size={"icon"}
            render={<Link to="/stories" />}
            aria-label={t("layout.storiesButton")}
          >
            <BookOpen className="size-5" />
          </Button>
          {user && (
            <Button
              variant={"ghost"}
              className={"flex max-w-40 gap-2"}
              render={<Link to="/profile" />}
            >
              <PlayerAvatar
                color={user.color}
                icon={user.icon}
                size="sm"
                className="shrink-0"
              />
              <span className="truncate text-sm font-medium">
                {user.username}
              </span>
            </Button>
          )}
        </div>
      </header>
      <main className="flex flex-1 flex-col" style={{ viewTransitionName: "page-content" }}>{children}</main>
    </div>
  );
}
