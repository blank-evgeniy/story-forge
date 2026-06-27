import { useDocumentTitle } from "@siberiacancode/reactuse";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import type { RoomState } from "../model/store/use-room-store";

export function useRoomDocumentTitle(
  status: RoomState["status"],
  round: number,
) {
  const { t } = useTranslation();

  const documentTitle = useDocumentTitle(
    t("common.metadata.titles.room.lobby"),
  );

  useEffect(() => {
    const title = {
      idle: t("common.metadata.titles.room.lobby"),
      lobby: t("common.metadata.titles.room.lobby"),
      round_starting: t("common.metadata.titles.room.roundStarting"),
      writing: t("common.metadata.titles.room.writing", { round }),
      revealing: t("common.metadata.titles.room.revealing"),
      reveal: t("common.metadata.titles.room.reveal"),
    }[status];

    documentTitle.set(title);
  }, [documentTitle, round, status, t]);
}
