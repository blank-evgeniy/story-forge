export function generateRoomCode(): string {
  const digits = "0123456789";

  const code = Array.from(
    { length: 4 },
    () => digits[Math.floor(Math.random() * digits.length)],
  ).join("");

  return code;
}
