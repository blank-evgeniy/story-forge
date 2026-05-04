import { twists } from "../data/twists";
import { Twist } from "../model/state";

export function pickThreeTwists(): [Twist, Twist, Twist] {
  const shuffled = [...twists].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1], shuffled[2]];
}

export function shouldShowTwist(
  currentRound: number,
  totalRounds: number,
): boolean {
  return currentRound === Math.floor(totalRounds / 2) + 1;
}

export function getTwistById(twistId: string): Twist | undefined {
  return twists.find((t) => t.id === twistId);
}
