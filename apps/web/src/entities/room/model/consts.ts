import type { AiMood, RoomSettings } from "./types";

export const defaultRoomSettings: RoomSettings = {
  blindMode: true,
  enableTwists: true,
  roundTime: 60,
  aiMood: "critic",
};

export const roundTimeOptions = [15, 30, 45, 60, 75, 90, 105, 120];

type AiMoodLabelKey =
  `room.lobby.gameSettings.aiCommentSelect.options.${AiMood}`;

export const aiMoodOptions: {
  value: AiMood;
  label: AiMoodLabelKey;
}[] = [
  {
    value: "comedian",
    label: "room.lobby.gameSettings.aiCommentSelect.options.comedian",
  },
  {
    value: "critic",
    label: "room.lobby.gameSettings.aiCommentSelect.options.critic",
  },
  {
    value: "fan",
    label: "room.lobby.gameSettings.aiCommentSelect.options.fan",
  },
  {
    value: "philosopher",
    label: "room.lobby.gameSettings.aiCommentSelect.options.philosopher",
  },
  {
    value: "teacher",
    label: "room.lobby.gameSettings.aiCommentSelect.options.teacher",
  },
  {
    value: "disabled",
    label: "room.lobby.gameSettings.aiCommentSelect.options.disabled",
  },
];
