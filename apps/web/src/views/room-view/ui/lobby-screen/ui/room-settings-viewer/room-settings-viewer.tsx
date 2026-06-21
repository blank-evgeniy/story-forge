import type { ReactNode } from "react";

import { BotIcon, ClockIcon, EyeOffIcon, ZapIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { RoomSettings } from "@/entities/room";

import { cn } from "@/shared/lib/utils";

type RoomSettingsViewerProps = {
  data: RoomSettings;
  editActionSlot?: ReactNode;
};

type SettingRow = {
  icon: React.ElementType;
  label: string;
  value: string;
  active: boolean;
  badge?: string;
};

export function RoomSettingsViewer({
  data,
  editActionSlot,
}: RoomSettingsViewerProps) {
  const { t } = useTranslation();

  const on = t("common.on");
  const off = t("common.off");

  const aiEnabled = data.aiMood !== "disabled";

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
      value: aiEnabled ? on : off,
      active: aiEnabled,
      badge: aiEnabled ? t(`common.aiMood.${data.aiMood}`) : undefined,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <span className="text-h3">{t("lobby.settings.title")}</span>
        {editActionSlot}
      </div>

      <div className="flex flex-col gap-1.5">
        {rows.map(({ icon: Icon, label, value, active, badge }) => (
          <div
            key={label}
            className="bg-surface-2 text-ink flex items-center gap-3 rounded-xl px-3 py-2"
          >
            <Icon
              className={cn(
                "size-4 shrink-0",
                active ? "text-brand-400" : "text-ink-2",
              )}
            />
            <span className="flex-1 text-sm">{label}</span>
            {badge && (
              <span className="text-ink-muted bg-brand-50 text-caption rounded-md px-1.5 py-0.5 capitalize">
                {badge}
              </span>
            )}
            <span
              className={cn(
                "text-small",
                active ? "text-brand-400" : "text-ink-2",
              )}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
