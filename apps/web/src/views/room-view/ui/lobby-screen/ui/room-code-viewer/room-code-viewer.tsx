import { useTranslation } from "react-i18next";

import { testIdAttr } from "@/shared/lib/tests/test-id-attr";

import { getTestId } from "../../../../utils/get-test-id";

type RoomCodeViewerProps = {
  roomCode: string;
};

const testId = getTestId("room-code-viewer");

export function RoomCodeViewer({ roomCode }: RoomCodeViewerProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-muted-foreground text-sm">{t("lobby.qr.enter")}</p>
      <div
        {...testIdAttr(testId("room-code"))}
        className="flex items-center justify-center gap-2"
      >
        {roomCode.split("").map((char, i) => (
          <div
            key={i}
            className="bg-muted border-border flex h-14 w-12 items-center justify-center rounded-xl border text-2xl font-bold"
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
}
