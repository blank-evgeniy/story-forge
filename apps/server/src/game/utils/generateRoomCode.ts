export function generateRoomCode(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";

  const aa = Array.from(
    { length: 2 },
    () => letters[Math.floor(Math.random() * letters.length)],
  ).join("");

  const nnnn = Array.from(
    { length: 4 },
    () => digits[Math.floor(Math.random() * digits.length)],
  ).join("");

  return `${aa}-${nnnn}`;
}
