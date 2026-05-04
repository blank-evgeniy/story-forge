export type CreateRoomSchema = {
  roundTime: RoundTime;
  blindMode: boolean;
  enableTwists: boolean;
};

export type RoundTime = "30" | "60" | "90";
