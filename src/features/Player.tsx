import React, { useMemo } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { PlayerNames } from "../the-crew/game";
import { Hands } from "./Hands";
import { assertUnreachable } from "../utils";
import { getSequentialNum } from "../the-crew/card";
import { useCommanderName } from "../hooks/useCommanderName";

export const Player: React.FunctionComponent<{
  name: PlayerNames;
}> = ({ name }) => {
  const player = useAppSelector((s) => s.game[name]);
  const commanderName = useCommanderName();
  const hands = useMemo(() => {
    switch (name) {
      case "dewey":
        return player.hands;
      case "player":
      case "huey":
      case "louie":
        return player.hands
          .slice()
          .sort((a, b) => getSequentialNum(a) - getSequentialNum(b));
    }
    assertUnreachable(name);
  }, [name, player.hands]);

  return (
    <div>
      <h3>
        {name} <span>{commanderName === name && "(Commander)"}</span>
      </h3>
      <Hands hands={hands} />
    </div>
  );
};
