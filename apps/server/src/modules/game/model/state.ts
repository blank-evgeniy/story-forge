import { ElysiaWS } from "elysia/dist/ws";
import z from "zod";

import { roomConfigSchema } from "./schemas";

export type RoomConfig = z.infer<typeof roomConfigSchema>;

export type AiMood = RoomConfig["aiComment"]["mood"];
export type Locale = "en" | "ru";

export interface Player {
  color: string;
  connected: boolean;
  icon: string;
  id: string;
  turnOrder: number;
  username: string;
  ws: ElysiaWS;
}

export interface PlayerEntry {
  content: string;
  playerId: string;
  wasTimeout: boolean;
}

export interface RoomState {
  code: string;
  config: RoomConfig;
  drafts: Map<string, { content?: string; twistId?: string }>;
  hostId: string;
  locale: Locale;
  nextTurnOrder: number;
  players: Map<string, Player>; // playerId → Player (с ws-соединением)
  round: number; // текущая итерация, 1-based
  status: RoomStatus;
  stories: StoryThread[]; // одна история на каждого игрока
  submittedIds: Set<string>; // playerId тех, кто уже сдал
  timer: null | ReturnType<typeof setTimeout>;
  totalRounds?: number;
}

export type RoomStatus = "lobby" | "reveal" | "writing";

export type StoryEntry = PlayerEntry & {
  twist?: Twist;
};

export interface StoryThread {
  entries: StoryEntry[];
  id: string;
  ownerId: string;
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
  color: string,
  icon: string,
): Player {
  return { color, connected: true, icon, id, turnOrder, username, ws };
}
