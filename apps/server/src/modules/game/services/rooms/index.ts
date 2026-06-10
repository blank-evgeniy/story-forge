import { ServerEvent } from "../../model/server-events";
import { Locale, Player, RoomConfig, RoomState } from "../../model/state";
import { generateRoomCode } from "./utils/generateRoomCode";

export type RoomContext = {
  player: Player;
  playerId: string;
  room: RoomState;
  roomCode: string;
};

/** Управляет комнатами и WebSocket-сессиями игроков. */
export class RoomManager {
  private rooms = new Map<string, RoomState>();
  private socketMeta = new Map<
    string,
    { playerId: string; roomCode: string }
  >();

  /**
   * @returns итератор по всем активным комнатам (`IterableIterator<RoomState>`)
   */
  all() {
    return this.rooms.values();
  }

  /**
   * Отправляет событие всем подключённым игрокам комнаты.
   * @param room - целевая комната
   * @param event - событие для рассылки
   */
  broadcast(room: RoomState, event: ServerEvent) {
    const payload = JSON.stringify(event);
    room.players.forEach((p) => {
      if (p.connected) p.ws.send(payload);
    });
  }

  /**
   * Создаёт новую комнату с уникальным кодом.
   * @param hostId - id игрока-хоста
   * @param config - настройки комнаты
   * @param locale - язык хоста на момент создания комнаты
   * @returns сгенерированный код новой комнаты
   */
  create(hostId: string, config: RoomConfig, locale: Locale): string {
    const existingCodes = new Set(
      [...this.rooms].map(([_id, room]) => room.code),
    );
    const code = generateRoomCode(existingCodes);

    this.rooms.set(code, {
      code,
      config,
      drafts: new Map(),
      hostId,
      locale,
      nextTurnOrder: 1,
      players: new Map(),
      round: 1,
      status: "lobby",
      stories: [],
      submittedIds: new Set(),
      timer: null,
      aiComment: null,
    });

    return code;
  }

  /**
   * Удаляет комнату из хранилища.
   * @param roomCode - код комнаты для удаления
   */
  delete(roomCode: string) {
    this.rooms.delete(roomCode);
  }

  /**
   * @param code - уникальный код комнаты
   * @returns состояние комнаты или `undefined`, если не найдена
   */
  get(code: string) {
    return this.rooms.get(code);
  }

  /**
   * Возвращает полный контекст сессии для WebSocket-соединения.
   * @param wsId - id WebSocket-соединения
   * @returns `RoomContext` с room, player, playerId, roomCode —
   * или `null`, если сокет не зарегистрирован, комната или игрок не найдены
   */
  getContext(wsId: string): null | RoomContext {
    const { playerId, roomCode } = this.getWsMeta(wsId);
    if (!playerId || !roomCode) return null;

    const room = this.get(roomCode);
    if (!room) return null;

    const player = room.players.get(playerId);
    if (!player) return null;

    return { player, playerId, room, roomCode };
  }

  /**
   * Регистрирует WebSocket-соединение, привязывая его к игроку и комнате.
   * @param wsId - уникальный id WebSocket-соединения
   * @param playerId - id игрока
   * @param roomCode - код комнаты
   */
  registerSocket(wsId: string, playerId: string, roomCode: string) {
    this.socketMeta.set(wsId, { playerId, roomCode });
  }

  /**
   * Отправляет событие конкретному игроку.
   * Ничего не делает, если игрок не найден или отключён.
   * @param room - комната, в которой находится игрок
   * @param playerId - id целевого игрока
   * @param event - событие для отправки
   */
  send(room: RoomState, playerId: string, event: ServerEvent) {
    const payload = JSON.stringify(event);
    const player = room.players.get(playerId);
    if (!player || !player.connected) return;

    player.ws.send(payload);
  }

  /**
   * Удаляет запись о WebSocket-соединении. Вызывается при отключении игрока.
   * @param wsId - уникальный id WebSocket-соединения
   */
  unregisterSocket(wsId: string) {
    this.socketMeta.delete(wsId);
  }

  /**
   * @param wsId - уникальный id WebSocket-соединения
   * @returns `{ playerId, roomCode }` — оба `null`, если сокет не зарегистрирован
   */
  private getWsMeta(wsId: string): {
    playerId: null | string;
    roomCode: null | string;
  } {
    const meta = this.socketMeta.get(wsId);
    return {
      playerId: meta?.playerId ?? null,
      roomCode: meta?.roomCode ?? null,
    };
  }
}

export const roomManager = new RoomManager();
