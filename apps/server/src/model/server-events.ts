import { SerializedRoom } from "../game/utils/serializeRoom";
import { Sentence, StoryThread, Twist } from "./state";

export type ErrorEvent = {
  type: "error";
  message: string;
  code: string;
};

export type RoomStateEvent = {
  type: "room_state";
  room: SerializedRoom;
};

export type PlayerJoinedEvent = {
  type: "player_joined";
  username: string;
  playerId: string;
};

export type PlayerLeftEvent = {
  type: "player_left";
  playerId: string;
};

export type PlayerReconnectedEvent = {
  type: "player_reconnected";
  playerId: string;
};

export type PlayerDisconnectedEvent = {
  type: "player_disconnected";
  playerId: string;
};

export type GameStartedEvent = {
  type: "game_started";
  totalRounds: number;
};

export type RoundStartedEvent = {
  type: "round_started";
  timer: number;
};

export type YourTurnEvent = {
  type: "your_turn";
  prevSentence: Sentence[] | null;
  twistsToChoose?: Twist[];
};

export type PlayerSubmittedEvent = {
  type: "player_submitted";
  playerId: string;
};

export type RoundEndedEvent = {
  type: "round_ended";
  nextRound: number;
};

export type AllRevealedEvent = {
  type: "all_revealed";
  stories: StoryThread[];
};

export type ServerEvent =
  | ErrorEvent
  | RoomStateEvent
  | PlayerJoinedEvent
  | PlayerLeftEvent
  | PlayerReconnectedEvent
  | PlayerDisconnectedEvent
  | GameStartedEvent
  | RoundStartedEvent
  | YourTurnEvent
  | PlayerSubmittedEvent
  | RoundEndedEvent
  | AllRevealedEvent;
