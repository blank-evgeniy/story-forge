import type { PlayerColor, PlayerIcon } from "@/lib/player-customization";

export type Player = {
  color: PlayerColor;
  connected: boolean;
  icon: PlayerIcon;
  id: string;
  username: string;
};

export type PlayerSentence = {
  playerName: string;
  content: string;
  type: "player";
};

export type TwistSentence = {
  id: string;
  content: string;
  type: "twist";
};

export type Sentence = PlayerSentence | TwistSentence;

export type Story = {
  id: string;
  playerName: string;
  sentences: Sentence[];
};

export type TwistsSet = {
  id: string;
  content: string;
}[];

export type PrevSentence = {
  sentence: string;
  twist?: string;
};
