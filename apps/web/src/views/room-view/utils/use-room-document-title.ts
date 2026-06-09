import { useDocumentTitle } from "@siberiacancode/reactuse";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import type { RoomState } from "../model/store/use-room-store";

export function useRoomDocumentTitle(
  status: RoomState["status"],
  round: number,
) {
  const { t } = useTranslation();

  const documentTitle = useDocumentTitle(t("titles.room.lobby"));

  useEffect(() => {
    const title = {
      idle: t("titles.room.lobby"),
      lobby: t("titles.room.lobby"),
      round_starting: t("titles.room.roundStarting"),
      writing: t("titles.room.writing", { round }),
      revealing: t("titles.room.revealing"),
      reveal: t("titles.room.reveal"),
    }[status];

    documentTitle.set(title);
  }, [documentTitle, status]);
}
