/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { Card as CardType } from "../the-crew/card";
import { Card } from "../components/Card";
import { CARD_WIDTH } from "../constants";
import { useAppSelector } from "../hooks/useAppSelector";

export const Hands: React.FunctionComponent<{
  cards: CardType[];
  noInteraction?: boolean;
}> = ({ cards, noInteraction = false }) => {
  const selectingCard = useAppSelector((s) => s.game.selectingCard);
  return (
    <div css={{ display: "flex" }}>
      {cards.map((card, i) => (
        <div
          css={{
            transform: `translate(${i * -(CARD_WIDTH / 2)}px, 0)`,
          }}
          key={card.id}
        >
          <Card
            card={card}
            noInteraction={noInteraction}
            withHighlight={selectingCard?.id === card.id}
          />
        </div>
      ))}
    </div>
  );
};
