import { ServerEvent } from "../../model/server-events";
import { Player, RoomConfig, RoomState } from "../../model/state";
import { generateRoomCode } from "./utils/generateRoomCode";

export type RoomContext = {
  room: RoomState;
  player: Player;
  playerId: string;
  roomCode: string;
};

export class RoomManager {
  private rooms = new Map<string, RoomState>();
  private socketMeta = new Map<
    string,
    { roomCode: string; playerId: string }
  >();

  get(code: string) {
    return this.rooms.get(code);
  }

  all() {
    return this.rooms.values();
  }

  create(hostId: string, config: RoomConfig): string {
    const existingCodes = new Set(
      [...this.rooms].map(([id, room]) => room.code),
    );
    const code = generateRoomCode(existingCodes);

    this.rooms.set(code, {
      code,
      hostId,
      status: "lobby",
      players: new Map(),
      round: 1,
      nextTurnOrder: 1,
      stories: [],
      submitted: new Set(),
      drafts: new Map(),
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
    room.players.forEach((p) => {
      if (p.connected) p.ws.send(payload);
    });
  }

  send(room: RoomState, playerId: string, event: ServerEvent) {
    const payload = JSON.stringify(event);
    const player = room.players.get(playerId);
    if (!player || !player.connected) return;

    player.ws.send(payload);
  }

  registerSocket(wsId: string, playerId: string, roomCode: string) {
    this.socketMeta.set(wsId, { playerId, roomCode });
  }

  unregisterSocket(wsId: string) {
    this.socketMeta.delete(wsId);
  }

  private getWsMeta(wsId: string): {
    playerId: string | null;
    roomCode: string | null;
  } {
    const meta = this.socketMeta.get(wsId);
    return {
      playerId: meta?.playerId ?? null,
      roomCode: meta?.roomCode ?? null,
    };
  }

  getContext(wsId: string): RoomContext | null {
    const { playerId, roomCode } = this.getWsMeta(wsId);
    if (!playerId || !roomCode) return null;

    const room = this.get(roomCode);
    if (!room) return null;

    const player = room.players.get(playerId);
    if (!player) return null;

    return { room, player, playerId, roomCode };
  }
}

export const roomManager = new RoomManager();
