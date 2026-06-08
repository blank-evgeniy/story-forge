import { useTranslation } from "react-i18next";

import { gameRoute } from "@/app/routes/routes";

import { useGetRoom } from "./api/use-get-room";
import { RoomViewFlow } from "./room-view-flow";
import { RoomError } from "./ui/common/room-error";
import { RoomLayout } from "./ui/common/room-layout";
import { RoomLoading } from "./ui/common/room-loading";

function RoomViewGuard() {
  const { t } = useTranslation();
  const { roomCode } = gameRoute.useParams();
  const { data, isLoading } = useGetRoom(roomCode);

  if (isLoading) return <RoomLoading />;
  if (!data) return <RoomError title={t("room.notFound")} />;

  return <RoomViewFlow />;
}

export function RoomViewConnector() {
  return (
    <RoomLayout>
      <RoomViewGuard />
    </RoomLayout>
  );
}
