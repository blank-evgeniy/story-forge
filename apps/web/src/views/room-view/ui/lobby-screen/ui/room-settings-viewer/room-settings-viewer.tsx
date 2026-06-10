import { BotIcon, ClockIcon, EyeOffIcon, ZapIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { RoomSettings } from "@/entities/room";

import { cn } from "@/shared/lib/utils";
import { CardTitle } from "@/shared/ui/card";

type RoomSettingsViewerProps = {
  data: RoomSettings;
};

type SettingRow = {
  icon: React.ElementType;
  label: string;
  value: string;
  active: boolean;
  badge?: string;
};

export function RoomSettingsViewer({ data }: RoomSettingsViewerProps) {
  const { t } = useTranslation();

  const on = t("common.on");
  const off = t("common.off");

  const rows: SettingRow[] = [
    {
      icon: ClockIcon,
      label: t("lobby.settings.roundTime"),
      value: `${data.roundTime}s`,
      active: true,
    },
    {
      icon: EyeOffIcon,
      label: t("lobby.settings.blindMode"),
      value: data.blindMode ? on : off,
      active: data.blindMode,
    },
    {
      icon: ZapIcon,
      label: t("lobby.settings.twists"),
      value: data.enableTwists ? on : off,
      active: data.enableTwists,
    },
    {
      icon: BotIcon,
      label: t("lobby.settings.aiOracle"),
      value: data.enableAiComment ? on : off,
      active: data.enableAiComment,
      badge:
        data.enableAiComment && data.aiMood
          ? t(`common.aiMood.${data.aiMood}`)
          : undefined,
    },
  ];

  return (
    <>
      <CardTitle>{t("lobby.settings.title")}</CardTitle>

      <div className="flex flex-col gap-1.5">
        {rows.map(({ icon: Icon, label, value, active, badge }) => (
          <div
            key={label}
            className="bg-muted/50 flex items-center gap-3 rounded-xl px-3 py-2"
          >
            <Icon
              className={cn(
                "size-4 shrink-0",
                active ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span className="text-sm flex-1">{label}</span>
            {badge && (
              <span className="text-muted-foreground bg-muted rounded-md px-1.5 py-0.5 text-xs capitalize">
                {badge}
              </span>
            )}
            <span
              className={cn(
                "text-xs font-medium",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
