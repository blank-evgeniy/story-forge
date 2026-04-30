export type CreateRoomDTO = {
  playerId: string;
  secondsPerTurn: number;
  blindMode: boolean;
};

export type CreateRoomResponseDTO = {
  code: string;
};

type RoomStatusDto = "lobby" | "writing" | "reveal";

export type GetRoomDto = { code: string; status: RoomStatusDto };
