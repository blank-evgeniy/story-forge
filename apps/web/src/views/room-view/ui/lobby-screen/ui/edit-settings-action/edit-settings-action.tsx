import { PencilIcon } from "lucide-react";
import { useState } from "react";

import {
  type RoomSettings,
  RoomSettingsEditor,
  useRoomSettingsContext,
} from "@/entities/room";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

type EditSettingsActionProps = {
  isHost: boolean;
  onEdit: (data: RoomSettings) => void;
};

export function EditSettingsAction({
  isHost,
  onEdit,
}: EditSettingsActionProps) {
  const [openModal, setOpenModal] = useState(false);

  const { roomSettings } = useRoomSettingsContext();

  const handleSave = () => {
    onEdit(roomSettings);
    setOpenModal(false);
  };

  if (!isHost) return null;

  return (
    <>
      <Button onClick={() => setOpenModal(true)} size={"icon"}>
        <PencilIcon />
      </Button>
      {openModal && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit settings</DialogTitle>
            </DialogHeader>
            <RoomSettingsEditor />
            <DialogFooter>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
