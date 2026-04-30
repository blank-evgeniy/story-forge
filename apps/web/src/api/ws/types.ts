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
};

export type StartGameEvent = {
  type: "start_game";
};

export type RequestStateEvent = {
  type: "request_state";
};

export type ClientEvent =
  | JoinRoomEvent
  | SubmitSentenceEvent
  | StartGameEvent
  | RequestStateEvent;

// Common

export type RoomStatusDto = "lobby" | "writing" | "reveal";

export type SentenceDto = {
  playerId: string;
  content: string;
  wasTimeout: boolean;
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
  secondsPerTurn: number;
  players: PlayerDto[];
  stories: StoryThreadDto[];
  round: number;
  totalRounds?: number;
  submitted: string[];
  blindMode: boolean;
};

// Server Events

export type ErrorEvent = {
  type: "error";
  message: string;
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

export type IterationStartedEvent = {
  type: "iteration_started";
  round: number;
  totalRounds: number;
  timer: number; // ms
};

export type YourTurnEvent = {
  type: "your_turn";
  prevSentence: SentenceDto | SentenceDto[] | null;
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
  stories: StoryThreadDto[];
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
