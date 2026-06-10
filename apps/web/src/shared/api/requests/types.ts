type AiMoodDto = "comedian" | "critic" | "fan" | "philosopher" | "teacher";

export type CreateRoomDTO = {
  playerId: string;
  locale: string;
  config: {
    secondsPerTurn: number;
    blindMode: boolean;
    aiComment: {
      enable: boolean;
      mood?: AiMoodDto;
    };
    enableTwists: boolean;
  };
};

export type CreateRoomResponseDTO = {
  code: string;
};

type RoomStatusDto = "lobby" | "writing" | "reveal";

export type GetRoomDto = { code: string; status: RoomStatusDto };

export type SaveStoryDTO = {
  roomCode: string;
  storyId: string;
};

export type StoryContentItemDTO = {
  playerName: string;
  entry: string;
  twist?: string;
};

export type SaveStoryResponseDTO = {
  id: number;
  createdAt: number;
  ownerName: string;
  content: StoryContentItemDTO[];
};

export type StoryListItemDTO = {
  id: number;
  createdAt: number;
  ownerName: string;
};

export type GetStoryResponseDTO = SaveStoryResponseDTO;
