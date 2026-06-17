import type { AiMood, RoomSettings } from "./types";

export const defaultRoomSettings: RoomSettings = {
  blindMode: true,
  enableTwists: true,
  roundTime: 60,
  aiMood: "critic",
};

export const roundTimeOptions = [15, 30, 45, 60, 75, 90, 105, 120];

export const aiMoodOptions: {
  value: AiMood;
  label: string;
  description?: string;
}[] = [
  {
    value: "comedian",
    label: "welcome.createRoom.aiComment.mood.comedian",
    description: "welcome.createRoom.aiComment.mood.description.comedian",
  },
  {
    value: "critic",
    label: "welcome.createRoom.aiComment.mood.critic",

    description: "welcome.createRoom.aiComment.mood.description.critic",
  },
  {
    value: "fan",
    label: "welcome.createRoom.aiComment.mood.fan",

    description: "welcome.createRoom.aiComment.mood.description.fan",
  },
  {
    value: "philosopher",
    label: "welcome.createRoom.aiComment.mood.philosopher",
    description: "welcome.createRoom.aiComment.mood.description.philosopher",
  },
  {
    value: "teacher",
    label: "welcome.createRoom.aiComment.mood.teacher",
    description: "welcome.createRoom.aiComment.mood.description.teacher",
  },
  {
    value: "disabled",
    label: "welcome.createRoom.aiComment.mood.disabled",
  },
];
