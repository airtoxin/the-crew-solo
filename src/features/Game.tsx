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
          <div
            css={{
              display: "flex",
              position: "absolute",
              transformOrigin: "top left",
              top: 550,
              left: 600,
            }}
          >
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

      <PlayingCards
        css={{ position: "absolute", transform: "translate(650px, 500px);" }}
      />

      <Player
        name={"player"}
        css={{
          position: "absolute",
          transformOrigin: "top left",
          top: 800,
          left: 500,
          width: 700,
        }}
      />
      <Player
        name={"dewey"}
        css={{
          position: "absolute",
          transformOrigin: "top left",
          top: 300,
          left: 400,
          width: 700,
          transform: "rotate(90deg)",
        }}
      />
      <Player
        name={"huey"}
        css={{
          position: "absolute",
          transformOrigin: "top left",
          top: 0,
          left: 500,
          width: 700,
          transform: "translate(550px, 400px) rotate(180deg)",
        }}
      />
      <Player
        name={"louie"}
        css={{
          position: "absolute",
          transformOrigin: "top left",
          bottom: 0,
          left: 1200,
          width: 700,
          transform: "rotate(-90deg)",
        }}
      />
    </div>
  );
};
