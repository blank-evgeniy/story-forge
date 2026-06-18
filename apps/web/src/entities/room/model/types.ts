export type AiMood =
  | "comedian"
  | "critic"
  | "fan"
  | "philosopher"
  | "teacher"
  | "disabled";

export type RoomSettings = {
  roundTime: number;
  blindMode: boolean;
  enableTwists: boolean;
  aiMood: AiMood;
};
