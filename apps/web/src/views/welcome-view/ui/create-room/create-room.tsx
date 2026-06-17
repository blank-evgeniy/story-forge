import { type ReactNode } from "react";

import { type RoomSettings, RoomSettingsEditor } from "@/entities/room";

import { CreateRoomAction } from "./ui/create-room-action";
import { CreateRoomLayout } from "./ui/create-room-layout";

type CreateRoomProps = {
  onCreate: (data: RoomSettings) => void;
  isLoading: boolean;
  serverStatusSlot?: ReactNode;
};

export function CreateRoom({
  onCreate,
  isLoading,
  serverStatusSlot,
}: CreateRoomProps) {
  return (
    <CreateRoomLayout>
      <CreateRoomLayout.Content>
        <RoomSettingsEditor disabledInputs={isLoading} />
      </CreateRoomLayout.Content>

      <CreateRoomLayout.Footer>
        {serverStatusSlot}
        <CreateRoomAction onSubmit={onCreate} isLoading={isLoading} />
      </CreateRoomLayout.Footer>
    </CreateRoomLayout>
  );
}
