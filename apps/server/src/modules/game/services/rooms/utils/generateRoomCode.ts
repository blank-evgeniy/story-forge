import { ROOM_CODE_LENGTH } from "../../../model/consts";

export function generateRoomCode(existingCodes: Set<string>): string {
  const digits = "0123456789";

  let code: string;

  do {
    code = Array.from(
      { length: ROOM_CODE_LENGTH },
      () => digits[Math.floor(Math.random() * digits.length)],
    ).join("");
  } while (existingCodes.has(code));

  return code;
}
