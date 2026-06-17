import { useTranslation } from "react-i18next";

import { type RoomSettings, useRoomSettingsContext } from "@/entities/room";
import { Button } from "@/shared/ui/button";

type CreateRoomActionProps = {
  onSubmit: (data: RoomSettings) => void;
  isLoading: boolean;
};
export function CreateRoomAction({
  onSubmit,
  isLoading,
}: CreateRoomActionProps) {
  const { t } = useTranslation();

  const { roomSettings } = useRoomSettingsContext();

  const handleSubmit = () => {
    onSubmit(roomSettings);
  };

  return (
    <Button className="w-full" onClick={handleSubmit} isLoading={isLoading}>
      {t("welcome.createRoom.submit")}
    </Button>
  );
}
