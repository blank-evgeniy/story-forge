import { ElysiaWS } from "elysia/dist/ws";

export type RoomStatus = "lobby" | "writing" | "reveal";

export interface Player {
  id: string;
  ws: ElysiaWS;
  username: string;
  turnOrder: number;
  connected: boolean;
}

export interface StoryThread {
  id: string;
  ownerId: string;
  sentences: Sentence[];
}

export interface Sentence {
  playerId: string;
  content: string;
  wasTimeout: boolean;
}

export interface RoomState {
  code: string;
  status: RoomStatus;
  hostId: string;
  secondsPerTurn: number;
  players: Map<string, Player>; // playerId → Player (с ws-соединением)
  stories: StoryThread[]; // одна история на каждого игрока
  round: number; // текущая итерация, 0-based
  totalRounds?: number;
  submitted: Set<string>; // playerId тех, кто уже сдал
  timer: ReturnType<typeof setTimeout> | null;
  blindMode: boolean;
}
