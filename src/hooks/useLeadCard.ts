import { Card } from "../the-crew/card";
import { PlayerNames } from "../the-crew/game";
import { useAppSelector } from "./useAppSelector";

export const useLeadCard = (): [Card, PlayerNames] | [undefined, undefined] => {
  const leadPlayer = useAppSelector((s) => s.game.leadPlayer);
  const leadCard = useAppSelector((s) => s.game.playingCards[leadPlayer]);

  if (!leadCard) return [undefined, undefined];
  return [leadCard, leadPlayer];
};
