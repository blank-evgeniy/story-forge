import type { ServerEvent } from "@/api/ws/types";

export type Player = {
  id: string;
  username: string;
};

export type Story = {
  id: string;
  playerName: string;
  sentences: { content: string; playerName: string }[];
};

export type GameState = {
  status: "idle" | "lobby" | "writing" | "reveal";
  players: Player[];
  round: number;
  totalRounds: number;
  submitted: Set<string>;
  prevSentence: string | string[] | null;
  allStories: Story[];
  error: string | null;
  secondsPerTurn: number;

  handleEvent: (event: ServerEvent) => void;
  startGame: (ws: WebSocket) => void;
  submitSentence: (ws: WebSocket, content: string) => void;
};
