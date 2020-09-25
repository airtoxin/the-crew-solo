import { PlayerNames } from "../the-crew/game";
import { useAppSelector } from "./useAppSelector";
import { useMemo } from "react";

export const useCommanderName = (): PlayerNames | undefined => {
  const phase = useAppSelector((s) => s.game.phase);
  const commander = useAppSelector((s) => s.game.commander);

  return useMemo(() => (phase === "notStarted" ? undefined : commander), [
    phase,
    commander,
  ]);
};
