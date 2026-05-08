// Client Events

export type JoinRoomEvent = {
  type: "join_room";
  code: string;
  username: string;
  playerId: string;
};

export type SubmitSentenceEvent = {
  type: "submit_sentence";
  content: string;
  twistId?: string;
};

export type DraftSentenceEvent = {
  type: "draft_sentence";
  content?: string;
  twistId?: string;
};

export type EditSentenceEvent = {
  type: "edit_sentence";
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
  | SubmitSentenceEvent
  | DraftSentenceEvent
  | EditSentenceEvent
  | StartGameEvent
  | RestartGameEvent
  | RequestStateEvent;

// Common

export type RoomStatusDto = "lobby" | "writing" | "reveal";

export type TwistDto = {
  id: string;
  content: string;
};

export type SentenceDto = {
  playerId: string;
  content: string;
  wasTimeout: boolean;
  twist?: TwistDto;
};

export type StoryThreadDto = {
  id: string;
  ownerId: string;
  sentences: SentenceDto[];
};

export type PlayerDto = {
  id: string;
  username: string;
  turnOrder: number;
  connected: boolean;
};

export type RoomDto = {
  code: string;
  status: RoomStatusDto;
  hostId: string;
  players: PlayerDto[];
  stories: StoryThreadDto[];
  round: number;
  totalRounds?: number;
  submitted: string[];
  blindMode: boolean;
  config: {
    secondsPerTurn: number;
    blindMode: boolean;
    enableTwists: boolean;
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
  prevSentence: SentenceDto[] | null;
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
  | GameRestartedEvent;
