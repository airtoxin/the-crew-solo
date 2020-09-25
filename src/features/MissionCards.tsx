import React from "react";
import { Card as CardType } from "../the-crew/card";
import { Card } from "./Card";

export const MissionCards: React.FunctionComponent<{
  missionCards: CardType[];
}> = ({ missionCards }) => {
  return (
    <div style={{ display: "flex" }}>
      {missionCards.map((card) => (
        <Card key={card.id} card={card} isMissionCard />
      ))}
    </div>
  );
};
