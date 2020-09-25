import React, { useMemo } from "react";
import { getSequentialNum } from "../the-crew/card";
import { Card } from "./Card";
import { assertUnreachable } from "../utils";
import { PlayerNames } from "../the-crew/game";
import { useAppSelector } from "../hooks/useAppSelector";

export const Hands: React.FunctionComponent<{ name: PlayerNames }> = ({
  name,
}) => {
  const player = useAppSelector((s) => s.game[name]);
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
    <div style={{ display: "flex" }}>
      {hands.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};
