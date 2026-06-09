export type AiMood = "comedian" | "critic" | "fan" | "philosopher" | "teacher";

export type CreateRoomSchema = {
  roundTime: RoundTime;
  blindMode: boolean;
  enableTwists: boolean;
  enableAiComment: boolean;
  aiMood: AiMood;
};

export type RoundTime = "30" | "60" | "90";

export type ServerHealthStatus = "checking" | "starting" | "error" | "online";
