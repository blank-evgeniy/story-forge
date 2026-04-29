import { RoomState } from "../model/state";

export class RoomManager {
  private rooms = new Map<string, RoomState>();

  get(code: string) {
    return this.rooms.get(code);
  }

  all() {
    return this.rooms.values();
  }

  create(hostId: string): string {
    const code = "WOLF-42";

    this.rooms.set(code, {
      code,
      hostId,
      status: "lobby",
      players: new Map(),
      round: 1,
      secondsPerTurn: 5,
      stories: [],
      submitted: new Set(),
      timer: null,
    });

    return code;
  }

  delete(roomCode: string) {
    this.rooms.delete(roomCode);
  }

  broadcast(room: RoomState, event: any) {
    const payload = JSON.stringify(event);
    room.players.forEach((p) => p.ws.send(payload));
  }

  send(room: RoomState, playerId: string, event: any) {
    const payload = JSON.stringify(event);
    room.players.get(playerId)?.ws.send(payload);
  }
}

export const roomManager = new RoomManager();
