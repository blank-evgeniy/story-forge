export type CreateRoomDTO = {
  playerId: string;
  roomConfig: {
    secondsPerTurn: number;
    blindMode: boolean;
    enableTwists: boolean;
  };
};

export type CreateRoomResponseDTO = {
  code: string;
};

type RoomStatusDto = "lobby" | "writing" | "reveal";

export type GetRoomDto = { code: string; status: RoomStatusDto };
