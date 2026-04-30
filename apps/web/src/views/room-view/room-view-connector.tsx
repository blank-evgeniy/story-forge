import { RoomViewGuard } from "./room-view-guard";
import { RoomViewInner } from "./room-view-inner";

export function RoomViewConnector() {
  return (
    <RoomViewGuard>
      <RoomViewInner />
    </RoomViewGuard>
  );
}
