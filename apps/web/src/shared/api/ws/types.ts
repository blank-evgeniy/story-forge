import type {
  PlayerColor,
  PlayerIcon,
} from "@/shared/consts/player-customization";

export type PlayerColorDto = PlayerColor;
export type PlayerIconDto = PlayerIcon;

// Client Events

export type JoinRoomEvent = {
  type: "join_room";
  code: string;
  color: PlayerColorDto;
  icon: PlayerIconDto;
  username: string;
  playerId: string;
};

export type SubmitEntryEvent = {
  type: "submit_entry";
  content: string;
  twistId?: string;
};

export type DraftEntryEvent = {
  type: "draft_entry";
  content?: string;
  twistId?: string;
};

export type EditEntryEvent = {
  type: "edit_entry";
};

export type StartGameEvent = {
  type: "start_game";
};

export type RequestStateEvent = {
  type: "request_state";
};

export type RestartGameEvent = {
  type: "restart_game";
};

export type ClientEvent =
  | JoinRoomEvent
  | SubmitEntryEvent
  | DraftEntryEvent
  | EditEntryEvent
  | StartGameEvent
  | RestartGameEvent
  | RequestStateEvent;

// Common

export type RoomStatusDto = "lobby" | "writing" | "reveal";
export type AiMoodDto =
  | "comedian"
  | "critic"
  | "fan"
  | "philosopher"
  | "teacher";

export type TwistDto = {
  id: string;
  content: string;
};

export type EntryDto = {
  playerId: string;
  content: string;
  wasTimeout: boolean;
  twist?: TwistDto;
};

export type StoryThreadDto = {
  id: string;
  ownerId: string;
  entries: EntryDto[];
};

export type PlayerDto = {
  color: PlayerColorDto;
  connected: boolean;
  icon: PlayerIconDto;
  id: string;
  turnOrder: number;
  username: string;
};

export type RoomDto = {
  code: string;
  status: RoomStatusDto;
  hostId: string;
  players: PlayerDto[];
  stories: StoryThreadDto[];
  round: number;
  totalRounds?: number;
  submittedIds: string[];
  config: {
    secondsPerTurn: number;
    blindMode: boolean;
    enableTwists: boolean;
    aiComment: {
      enable: boolean;
      mood?: AiMoodDto;
    };
  };
};

// Server Events

export type ErrorEvent = {
  type: "error";
  message: string;
  code: string;
};

export type RoomStateEvent = {
  type: "room_state";
  room: RoomDto;
};

export type PlayerJoinedEvent = {
  type: "player_joined";
  color: PlayerColorDto;
  icon: PlayerIconDto;
  playerId: string;
  username: string;
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
  prevEntry: EntryDto[] | null;
  twistsToChoose?: TwistDto[];
};

export type PlayerSubmittedEvent = {
  type: "player_submitted";
  playerId: string;
};

export type PlayerUnsubmittedEvent = {
  type: "player_unsubmitted";
  playerId: string;
};

export type RoundEndedEvent = {
  type: "round_ended";
  nextRound: number;
};

export type AllRevealedEvent = {
  type: "all_revealed";
  stories: StoryThreadDto[];
};

export type AiCommentEvent = {
  type: "ai_comment";
  comment: string;
};

export type GameRestartedEvent = {
  type: "game_restarted";
  room: RoomDto;
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
  | PlayerUnsubmittedEvent
  | RoundEndedEvent
  | AllRevealedEvent
  | AiCommentEvent
  | GameRestartedEvent;
