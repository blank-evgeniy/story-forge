export type CreateRoomDTO = {
  playerId: string;
  secondsPerTurn: number;
  blindMode: boolean;
};

export type CreateRoomResponseDTO = {
  code: string;
};
