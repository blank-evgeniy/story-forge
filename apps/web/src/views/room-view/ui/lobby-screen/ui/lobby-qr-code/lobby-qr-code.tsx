import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";

export function LobbyQrCode() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-muted-foreground text-sm">{t("lobby.qr.scan")}</p>
      <div className="bg-primary/80 flex items-center justify-center rounded-lg p-3">
        <QRCodeSVG
          value={window.location.href}
          size={180}
          bgColor="transparent"
        />
      </div>
    </div>
  );
}
