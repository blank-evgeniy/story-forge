import type React from "react";

import { useMediaQuery, useOrientation } from "@siberiacancode/reactuse";
import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon, RotateCcwSquareIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { AppLogo } from "@/shared/ui/app-logo";
import { BaseLayout } from "@/shared/ui/base-layout";
import { Button } from "@/shared/ui/button";
import { Reveal } from "@/shared/ui/reveal";

export const RoomLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  const orientation = useOrientation();
  const isPhone = useMediaQuery(
    "(pointer: coarse) and (hover: none) and (max-height: 600px)",
  );

  const isLandscape =
    orientation.supported &&
    !!orientation.value &&
    (orientation.value.orientationType
      ? orientation.value.orientationType.startsWith("landscape")
      : orientation.value.angle === 90 || orientation.value.angle === 270);

  const isPhoneLandscape = isLandscape && isPhone;

  return (
    <>
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
        <main
          className="flex min-h-0 flex-1 flex-col"
          style={{ viewTransitionName: "page" }}
        >
          {children}
        </main>
      </BaseLayout>

      {isPhoneLandscape && <RotateDeviceAlert />}
    </>
  );
};

const RotateDeviceAlert = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-ink fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-6 text-center">
      <RotateCcwSquareIcon className="text-brand-400 size-12" />
      <h2 className="text-surface text-h2">
        {t("room.common.rotateDevice.heading")}
      </h2>
      <p className="text-surface-2 text-body max-w-md">
        {t("room.common.rotateDevice.description")}
      </p>
    </div>
  );
};
