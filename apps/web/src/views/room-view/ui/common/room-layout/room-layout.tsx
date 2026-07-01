import type React from "react";

import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AppLogo } from "@/shared/ui/app-logo";
import { BaseLayout } from "@/shared/ui/base-layout";
import { Button } from "@/shared/ui/button";
import { Reveal } from "@/shared/ui/reveal";

export const RoomLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  return (
    <BaseLayout className="relative h-dvh min-h-0 flex-col gap-6 overflow-hidden md:gap-10 md:py-10">
      <Reveal
        as="header"
        direction="top"
        className="relative flex items-center justify-center"
      >
        <Button
          render={<Link to={"/"} />}
          nativeButton={false}
          size={"sm"}
          variant={"outline"}
          className={"absolute left-0"}
        >
          <ChevronLeftIcon />
          <span className="hidden sm:block">{t("common.back")}</span>
        </Button>

        <AppLogo />

        <span />
      </Reveal>
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </BaseLayout>
  );
};
