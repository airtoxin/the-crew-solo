import React, { useEffect, useMemo } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { gameSlice, PlayerNames } from "../the-crew/game";
import { Hands } from "./Hands";
import { useCommanderName } from "../hooks/useCommanderName";
import { MissionCards } from "./MissionCards";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { getSequentialNum } from "../the-crew/card";
import { assertUnreachable } from "../utils";

const DRONE_SPEED = 10;

export const Player: React.FunctionComponent<{
  name: PlayerNames;
  className?: string;
}> = ({ name, className }) => {
  const dispatch = useAppDispatch();
  const phase = useAppSelector((s) => s.game.phase);
  const missionCards = useAppSelector((s) => s.game[name].missionCards);
  const turnPlayer = useAppSelector((s) => s.game.turnPlayer);
  const commanderName = useCommanderName();
  const nonPickedMissionCards = useAppSelector(
    (s) => s.game.nonPickedMissionCards
  );
  const tricks = useAppSelector((s) => s.game.tricks);

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

  useEffect(() => {
    if (
      name !== "player" &&
      phase === "pickupMissionCards" &&
      turnPlayer === name
    ) {
      setTimeout(() => {
        dispatch(
          gameSlice.actions.selectMissionCard({
            card: nonPickedMissionCards[0],
          })
        );
        dispatch(gameSlice.actions.pickupMissionCards());
      }, DRONE_SPEED);
    }
  }, [name, phase, turnPlayer, nonPickedMissionCards]);

  useEffect(() => {
    if (
      name !== "player" &&
      phase === "started" &&
      turnPlayer === name &&
      tricks <= 10
    ) {
      setTimeout(() => {
        dispatch(gameSlice.actions.playCardByDrone());
      }, DRONE_SPEED);
    }
  }, [name, phase, turnPlayer, tricks]);

  return (
    <div className={className}>
      <h3>
        {name}
        <span>{commanderName === name && "(Commander)"}</span>
        <span>{turnPlayer === name && "(TurnPlayer)"} </span>
      </h3>
      <Hands cards={hands} noInteraction={name !== "player"} />
      <MissionCards missionCards={missionCards} />
    </div>
  );
};
