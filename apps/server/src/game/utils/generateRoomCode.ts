import { ROOM_CODE_LENGTH } from "../consts";

export function generateRoomCode(): string {
  const digits = "0123456789";

  const code = Array.from(
    { length: ROOM_CODE_LENGTH },
    () => digits[Math.floor(Math.random() * digits.length)],
  ).join("");

  return code;
}
