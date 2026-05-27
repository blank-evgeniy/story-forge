import { ElysiaWS } from "elysia/dist/ws";

export interface Player {
  connected: boolean;
  id: string;
  turnOrder: number;
  username: string;
  ws: ElysiaWS;
}

export interface PlayerSentence {
  content: string;
  playerId: string;
  wasTimeout: boolean;
}

export interface RoomConfig {
  blindMode: boolean;
  enableTwists: boolean;
  secondsPerTurn: number;
}

export interface RoomState {
  code: string;
  config: RoomConfig;
  drafts: Map<string, { content?: string; twistId?: string }>;
  hostId: string;
  nextTurnOrder: number;
  players: Map<string, Player>; // playerId → Player (с ws-соединением)
  round: number; // текущая итерация, 1-based
  status: RoomStatus;
  stories: StoryThread[]; // одна история на каждого игрока
  submitted: Set<string>; // playerId тех, кто уже сдал
  timer: null | ReturnType<typeof setTimeout>;
  totalRounds?: number;
}

export type RoomStatus = "lobby" | "reveal" | "writing";

export type Sentence = PlayerSentence & {
  twist?: Twist;
};

export interface StoryThread {
  id: string;
  ownerId: string;
  sentences: Sentence[];
}

export type Twist = {
  content: string;
  id: string;
};

export function createPlayer(
  ws: ElysiaWS,
  id: string,
  username: string,
  turnOrder: number,
): Player {
  return { connected: true, id, turnOrder, username, ws };
}
