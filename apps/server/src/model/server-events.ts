import { SerializedRoom } from "../game/utils/serializeRoom";
import { Sentence, StoryThread } from "./state";

export type ErrorEvent = {
  type: "error";
  message: string;
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

export type IterationStartedEvent = {
  type: "iteration_started";
  round: number;
  totalRounds: number;
  timer: number; // ms
};

export type YourTurnEvent = {
  type: "your_turn";
  prevSentence: Sentence | Sentence[] | null;
};

export type PlayerSubmittedEvent = {
  type: "player_submitted";
  playerId: string;
};

export type IterationEndedEvent = {
  type: "iteration_ended";
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
  | IterationStartedEvent
  | YourTurnEvent
  | PlayerSubmittedEvent
  | IterationEndedEvent
  | AllRevealedEvent;
