/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Player } from "./Player";
import { useAppSelector } from "../hooks/useAppSelector";
import { Card } from "../components/Card";
import { DebugDispatcher } from "./DebugDispatcher";
import { PlayingCards } from "./PlayingCards";

export const Game: React.FunctionComponent = () => {
  const phase = useAppSelector((s) => s.game.phase);
  const nonPickedMissionCards = useAppSelector(
    (s) => s.game.nonPickedMissionCards
  );
  const selectingMissionCard = useAppSelector(
    (s) => s.game.selectingMissionCard
  );

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "white",
      }}
    >
      <h2>{phase}</h2>
      <DebugDispatcher />

      {(phase === "swappingCommander" || phase === "pickupMissionCards") && (
        <React.Fragment>
          {phase === "pickupMissionCards" && <h2>Select Mission Cards</h2>}
          <div style={{ display: "flex" }}>
            {nonPickedMissionCards.map((card) => (
              <Card
                key={card.id}
                card={card}
                isMissionCard
                withHighlight={card.id === selectingMissionCard?.id}
                noInteraction={phase !== "pickupMissionCards"}
              />
            ))}
          </div>
        </React.Fragment>
      )}

      <PlayingCards />

      <Player name={"player"} />
      <Player name={"dewey"} />
      <Player name={"huey"} />
      <Player name={"louie"} />
    </div>
  );
};
