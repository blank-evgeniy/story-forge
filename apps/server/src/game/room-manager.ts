import { ServerEvent } from "../model/server-events";
import { RoomConfig, RoomState } from "../model/state";
import { generateRoomCode } from "./utils/generateRoomCode";

export class RoomManager {
  private rooms = new Map<string, RoomState>();

  get(code: string) {
    return this.rooms.get(code);
  }

  all() {
    return this.rooms.values();
  }

  create(hostId: string, config: RoomConfig): string {
    const code = generateRoomCode();

    this.rooms.set(code, {
      code,
      hostId,
      status: "lobby",
      players: new Map(),
      round: 1,
      stories: [],
      submitted: new Set(),
      timer: null,
      config,
    });

    return code;
  }

  delete(roomCode: string) {
    this.rooms.delete(roomCode);
  }

  broadcast(room: RoomState, event: ServerEvent) {
    const payload = JSON.stringify(event);
    room.players.forEach((p) => p.ws.send(payload));
  }

  send(room: RoomState, playerId: string, event: ServerEvent) {
    const payload = JSON.stringify(event);
    room.players.get(playerId)?.ws.send(payload);
  }
}

export const roomManager = new RoomManager();
