import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

import { PlayerAvatar, usePlayerStore } from "@/entities/player";
import { AppLogo } from "@/shared/ui/app-logo";
import { BaseLayout } from "@/shared/ui/base-layout";
import { Button } from "@/shared/ui/button";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const user = usePlayerStore((store) => store.player);

  return (
    <BaseLayout>
      <header className="flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-px">
          <AppLogo />
        </Link>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost-white"
            size="icon"
            render={<Link to="/stories" />}
            nativeButton={false}
            aria-label={t("common.layout.storiesLink.ariaLabel")}
          >
            <BookOpen className="size-5" />
          </Button>
          {user && (
            <Button
              variant="ghost-white"
              className="flex max-w-40 gap-2"
              render={<Link to="/profile" />}
              nativeButton={false}
            >
              <span className="truncate text-sm font-medium">
                {t("common.layout.profileLink")}
              </span>
              <PlayerAvatar
                color={user.color}
                icon={user.icon}
                className="shrink-0"
              />
            </Button>
          )}
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </BaseLayout>
  );
}
