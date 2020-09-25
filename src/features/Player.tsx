import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { gameSlice, PlayerNames } from "../the-crew/game";
import { Hands } from "./Hands";
import { useCommanderName } from "../hooks/useCommanderName";
import { MissionCards } from "./MissionCards";
import { useAppDispatch } from "../hooks/useAppDispatch";

const DRONE_SPEED = 10;

export const Player: React.FunctionComponent<{
  name: PlayerNames;
}> = ({ name }) => {
  const dispatch = useAppDispatch();
  const phase = useAppSelector((s) => s.game.phase);
  const missionCards = useAppSelector((s) => s.game[name].missionCards);
  const turnPlayer = useAppSelector((s) => s.game.turnPlayer);
  const commanderName = useCommanderName();
  const nonPickedMissionCards = useAppSelector(
    (s) => s.game.nonPickedMissionCards
  );
  const tricks = useAppSelector((s) => s.game.tricks);

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
    <div>
      <h3>
        {name}
        <span>{commanderName === name && "(Commander)"}</span>
        <span>{turnPlayer === name && "(TurnPlayer)"} </span>
      </h3>
      <Hands name={name} />
      <MissionCards missionCards={missionCards} />
    </div>
  );
};
