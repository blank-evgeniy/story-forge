export type Player = {
  id: string;
  username: string;
};

export type PlayerSentence = {
  playerId: string;
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
