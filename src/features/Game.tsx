import React from "react";
import { Player } from "./Player";
import { useAppSelector } from "../hooks/useAppSelector";
import { Card } from "./Card";
import { DebugDispatcher } from "./DebugDispatcher";
import { PlayingCards } from "./PlayingCards";

export const Game: React.FunctionComponent = () => {
  const phase = useAppSelector((s) => s.game.phase);
  const nonPickedMissionCards = useAppSelector(
    (s) => s.game.nonPickedMissionCards
  );

  return (
    <div>
      <h2>{phase}</h2>
      <DebugDispatcher />

      {(phase === "swappingCommander" || phase === "pickupMissionCards") && (
        <>
          <h2>Select Mission Cards</h2>
          <div style={{ display: "flex" }}>
            {nonPickedMissionCards.map((card) => (
              <Card key={card.id} card={card} isMissionCard />
            ))}
          </div>
        </>
      )}

      <PlayingCards />

      <Player name={"player"} />
      <Player name={"dewey"} />
      <Player name={"huey"} />
      <Player name={"louie"} />
    </div>
  );
};
