import i18n from "i18next";

import { ms } from "@/shared/lib/ms";

import type { AiMood, RoomSettings } from "./types";

export const PLAYER_NAME_PLACEHOLDER = i18n.t("room.common.unknownPlayer");
export const ROUND_TRANSITION_DURATION_MS = ms(2000);
export const REVEAL_TRANSITION_DURATION_MS = ms(2000);

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
