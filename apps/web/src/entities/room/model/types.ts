export type AiMood = "comedian" | "critic" | "fan" | "philosopher" | "teacher";

export type RoomSettings = {
  roundTime: number;
  blindMode: boolean;
  enableTwists: boolean;
  enableAiComment: boolean;
  aiMood?: AiMood;
};
