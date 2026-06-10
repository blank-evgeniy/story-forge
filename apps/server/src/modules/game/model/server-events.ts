import { SerializedRoom } from "../services/ws/utils/serializeRoom";
import { StoryEntry, StoryThread, Twist } from "./state";

export type AiCommentEvent = {
  comment: string;
  type: "ai_comment";
};

export type AiCommentStartedEvent = {
  type: "ai_comment_started";
};

export type AllRevealedEvent = {
  stories: StoryThread[];
  type: "all_revealed";
};

export type ConfigEditedEvent = {
  config: SerializedRoom["config"];
  type: "config_edited";
};

export type ErrorEvent = {
  code: string;
  message: string;
  type: "error";
};

export type GameRestartedEvent = {
  room: SerializedRoom;
  type: "game_restarted";
};

export type GameStartedEvent = {
  totalRounds: number;
  type: "game_started";
};

export type PlayerDisconnectedEvent = {
  playerId: string;
  type: "player_disconnected";
};

export type PlayerJoinedEvent = {
  color: string;
  icon: string;
  playerId: string;
  type: "player_joined";
  username: string;
};

export type PlayerLeftEvent = {
  playerId: string;
  type: "player_left";
};

export type PlayerReconnectedEvent = {
  playerId: string;
  type: "player_reconnected";
};

export type PlayerSubmittedEvent = {
  playerId: string;
  type: "player_submitted";
};

export type PlayerUnsubmittedEvent = {
  playerId: string;
  type: "player_unsubmitted";
};

export type RoomStateEvent = {
  room: SerializedRoom;
  type: "room_state";
};

export type RoundEndedEvent = {
  nextRound: number;
  type: "round_ended";
};

export type RoundStartedEvent = {
  timer: number;
  type: "round_started";
};

export type ServerEvent =
  | AiCommentEvent
  | AiCommentStartedEvent
  | AllRevealedEvent
  | ConfigEditedEvent
  | ErrorEvent
  | GameRestartedEvent
  | GameStartedEvent
  | PlayerDisconnectedEvent
  | PlayerJoinedEvent
  | PlayerLeftEvent
  | PlayerReconnectedEvent
  | PlayerSubmittedEvent
  | PlayerUnsubmittedEvent
  | RoomStateEvent
  | RoundEndedEvent
  | RoundStartedEvent
  | YourTurnEvent;

export type YourTurnEvent = {
  prevEntry: null | StoryEntry[];
  twistsToChoose?: Twist[];
  type: "your_turn";
};
