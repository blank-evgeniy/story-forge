import type { RoomDto } from "@/shared/api/ws/types";

import type { RoomSettings } from "../model/types";

export function mapRoomConfigToSettings(data: RoomDto["config"]): RoomSettings {
  return {
    roundTime: data.secondsPerTurn,
    blindMode: data.blindMode,
    enableTwists: data.enableTwists,
    enableAiComment: data.aiComment.enable,
    aiMood: data.aiComment.mood,
  };
}

export function mapRoomSettingsToConfigDto(
  data: RoomSettings,
): RoomDto["config"] {
  return {
    secondsPerTurn: data.roundTime,
    blindMode: data.blindMode,
    enableTwists: data.enableTwists,
    aiComment: {
      enable: data.enableAiComment,
      mood: data.aiMood,
    },
  };
}
