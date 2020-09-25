import React from "react";
import { Card as CardType } from "../the-crew/card";
import { Card } from "./Card";

export const Hands: React.FunctionComponent<{ hands: CardType[] }> = ({
  hands,
}) => {
  return (
    <div style={{ display: "flex" }}>
      {hands.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};
