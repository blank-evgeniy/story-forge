import { useCopy } from "@siberiacancode/reactuse";
import { CheckIcon, CopyIcon, QrCodeIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import { getTestId } from "../../../../utils/get-test-id";
import { LobbyQrCode } from "../lobby-qr-code";

type RoomJoinPanelProps = {
  roomCode: string;
};

const testId = getTestId("room-code-viewer");

export function RoomJoinPanel({ roomCode }: RoomJoinPanelProps) {
  const { t } = useTranslation();
  const [openQrModal, setOpenQrModal] = useState(false);
  const { copy, copied } = useCopy();

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-surface-2 text-h3">{t("lobby.qr.enter")}</p>
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row">
        <div
          {...testIdAttr(testId("room-code"))}
          className="flex items-center justify-center gap-2"
        >
          {roomCode.split("").map((char, i) => (
            <div
              key={i}
              className="bg-surface-2 border-line text-ink flex h-14 w-12 items-center justify-center rounded-xl border text-2xl font-bold"
            >
              {char}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="icon"
            aria-label={t("lobby.qr.copyLink")}
            onClick={() => copy(window.location.href)}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Button>

          <Button
            variant="primary"
            size="icon"
            aria-label={t("lobby.qr.showQr")}
            onClick={() => setOpenQrModal(true)}
          >
            <QrCodeIcon />
          </Button>
        </div>
      </div>

      {openQrModal && (
        <Dialog open={openQrModal} onOpenChange={setOpenQrModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("lobby.qr.showQr")}</DialogTitle>
            </DialogHeader>
            <LobbyQrCode />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
