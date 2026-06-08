import type {
  PlayerColor,
  PlayerIcon,
} from "@/shared/consts/player-customization";

export type Player = {
  color: PlayerColor;
  connected: boolean;
  icon: PlayerIcon;
  id: string;
  username: string;
};

export type PlayerEntry = {
  player: {
    username: string;
    color: PlayerColor;
    icon: PlayerIcon;
  };
  content: string;
  type: "player";
};

export type TwistEntry = {
  id: string;
  content: string;
  type: "twist";
};

export type StoryEntry = PlayerEntry | TwistEntry;

export type Story = {
  id: string;
  playerName: string;
  entries: StoryEntry[];
};

export type TwistsSet = {
  id: string;
  content: string;
}[];

export type PrevEntry = {
  entry: string;
  twist?: string;
};
