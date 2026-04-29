export type CreateRoomSchema = {
  blindMode: boolean;
  roundTime: RoundTime;
};

export type RoundTime = "30" | "60" | "90";
