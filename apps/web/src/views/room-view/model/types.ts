export type Player = {
  id: string;
  username: string;
};

export type Story = {
  id: string;
  playerName: string;
  sentences: { content: string; playerName: string }[];
};
