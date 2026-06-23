import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";

import { useTwBreakpoints } from "@/shared/hooks/use-tw-breakpoints";

export function LobbyQrCode() {
  const { t } = useTranslation();
  const breakpoints = useTwBreakpoints();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-surface border-brand-400 flex items-center justify-center rounded-lg border-4 p-2">
        <QRCodeSVG
          value={window.location.href}
          size={breakpoints.smaller("sm") ? 200 : 240}
          bgColor="transparent"
        />
      </div>
      <p className="text-surface-2 text-body">{t("lobby.qr.scan")}</p>
    </div>
  );
}
