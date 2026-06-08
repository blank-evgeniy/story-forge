import { Locale, Twist } from "../../../model/state";
import { twists } from "../data/twists";

export function getTwistById(
  twistId: string,
  locale: Locale,
): Twist | undefined {
  return twists[locale].find((t) => t.id === twistId);
}

export function pickThreeTwists(locale: Locale): [Twist, Twist, Twist] {
  const shuffled = [...twists[locale]].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1], shuffled[2]];
}

export function shouldShowTwist(
  currentRound: number,
  totalRounds: number,
): boolean {
  return currentRound === Math.floor(totalRounds / 2) + 1;
}
