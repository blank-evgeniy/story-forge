import type { AiMood } from "./types";

export const aiMoodOptions: {
  value: AiMood;
  label: string;
  description: string;
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
];
