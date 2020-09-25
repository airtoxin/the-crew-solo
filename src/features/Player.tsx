import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { gameSlice, PlayerNames } from "../the-crew/game";
import { Hands } from "./Hands";
import { useCommanderName } from "../hooks/useCommanderName";
import { MissionCards } from "./MissionCards";
import { useAppDispatch } from "../hooks/useAppDispatch";

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
      }, 1000);
    }
  }, [name, phase, turnPlayer, nonPickedMissionCards]);

  useEffect(() => {
    if (name !== "player" && phase === "started" && turnPlayer === name) {
      setTimeout(() => {
        dispatch(gameSlice.actions.playCardByDrone());
      }, 1000);
    }
  }, [name, phase, turnPlayer, tricks]);

  return (
    <div>
      <h3>
        {turnPlayer === name && "*"} {name}{" "}
        <span>{commanderName === name && "(Commander)"}</span>
      </h3>
      <Hands name={name} />
      <MissionCards missionCards={missionCards} />
    </div>
  );
};
