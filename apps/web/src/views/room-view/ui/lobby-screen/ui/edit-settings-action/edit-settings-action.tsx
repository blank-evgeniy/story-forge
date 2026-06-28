import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import type { RoomSettings } from "../../../../model/types";

import { RoomSettingsEditor } from "../room-settings-editor";

type EditSettingsActionProps = {
  isHost: boolean;
  currentSettings: RoomSettings;
  onEdit: (data: RoomSettings) => void;
};

export function EditSettingsAction({
  isHost,
  currentSettings,
  onEdit,
}: EditSettingsActionProps) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [draftSettings, setDraftSettings] = useState<null | RoomSettings>(
    null,
  );

  const roomSettings = draftSettings ?? currentSettings;

  const handleOpen = () => {
    setDraftSettings(null);
    setOpenModal(true);
  };

  const handleSave = () => {
    onEdit(roomSettings);
    setOpenModal(false);
  };

  if (!isHost) return null;

  return (
    <>
      <Button onClick={handleOpen} size={"sm"} variant={"outline"}>
        {t("room.lobby.gameSettings.editAction")}
        <PencilIcon />
      </Button>
      {openModal && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("room.lobby.gameSettings.heading")}</DialogTitle>
            </DialogHeader>
            <RoomSettingsEditor
              value={roomSettings}
              onChange={setDraftSettings}
            />
            <DialogFooter>
              <Button onClick={handleSave}>
                {t("room.lobby.gameSettings.saveAction")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
