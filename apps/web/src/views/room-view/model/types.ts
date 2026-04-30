import type { ServerEvent } from "@/api/ws/types";

export type Player = {
  id: string;
  username: string;
};

export type Story = {
  playerName: string;
  sentences: string[];
}[];

export type GameState = {
  status: "idle" | "lobby" | "writing" | "reveal" | "finished";
  players: Player[];
  round: number;
  totalRounds: number;
  submitted: Set<string>;
  prevSentence: string | null;
  allStories: Story[];
  error: string | null;

  handleEvent: (event: ServerEvent) => void;
  startGame: (ws: WebSocket) => void;
  submitSentence: (ws: WebSocket, content: string) => void;
};
